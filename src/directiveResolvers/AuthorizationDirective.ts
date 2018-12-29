import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import db from '../db/knex';
import jwt from 'jsonwebtoken';
import { Role } from '../typeDefs';

export interface IUser {
  sub: {
    accountID: number;
    role: Role;
   };
   iat: number;
}

export class AuthorizationDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (root, args, ctx, info) => {
      try {
        const { user = null }: { user: IUser | null } = ctx;
        if (!user) return new Error('Unauthorized!');
        const { accountID, role } = user.sub;

        const [foundUser] = await db
          .select('accountID')
          .where({ accountID })
          .from('account');
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
}
