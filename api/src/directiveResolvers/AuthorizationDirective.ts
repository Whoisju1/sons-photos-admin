import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql';
import db from '../db/knex';
import { Role } from '../typeDefs';

interface IExtendedType extends GraphQLObjectType {
  _requiredAuthRole: string[];
  [x: string]: any;
}

interface IExtendedField extends GraphQLField<any, any> {
  [x: string]: any;
}

export interface IUser {
  sub: {
    accountID: number;
    role: Role;
   };
   iat: number;
}

export class AuthorizationDirective extends SchemaDirectiveVisitor {
  public visitObject(type: GraphQLObjectType) {
    this.ensureFieldsWrapped(type as IExtendedType);
  }

  public visitFieldDefinition(field: GraphQLField<any, any>, details: any) {
    details._requiredAuthRole = this.args.scope;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (root, args, ctx, info) => {
      try {
        const { user = null }: { user: IUser | null } = ctx;
        if (!user) return new Error('Unauthorized!');
        const { accountID, role } = user.sub;

        const foundUser = await this.getUser(accountID);
        // user doesn't exist in database return an error of Unauthorized
        if (!foundUser) return new Error('User not found');
        const isPermitted = (this.args.scope as Role[]).includes(role);

        if (isPermitted) {
          return await resolve.apply(this, [root, args, ctx, info]);
        } else {
          return new Error('Unauthorized!');
        }
      } catch (err) {
        return err;
      }
    };
  }

  public ensureFieldsWrapped(objectType: IExtendedType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field: IExtendedField = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (root, args, context, info) => {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        if (! requiredRole) {
          return resolve.apply(this, [root, args, context, info]);
        }

        const user = await this.getUser(context.user.sub.accountID);
        if (! user.hasRole(requiredRole)) {
          throw new Error('not authorized');
        }

        return resolve.apply(this, [root, args, context, info]);
      };
    });
  }

  private getUser = async (accountID: number) => {
    const [foundUser] = await db
          .select('accountID')
          .where({ accountID })
          .from('account');
    return foundUser;
  }
}
