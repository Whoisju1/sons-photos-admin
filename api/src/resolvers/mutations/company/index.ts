import {
  MutationEditCompanyResolver,
  Company,
  EditCompanyInput,
  Role,
} from '../../../resolver-types';
import { ApolloError } from 'apollo-server-express';
import Knex from 'knex';

interface IUser {
  sub: {
    id: number,
    role: Role,
  };
  iat: number;
}

type EditCompanyResolver = MutationEditCompanyResolver<
  {},
  {},
  { db: Knex, user: IUser }
>;

export const editCompany: EditCompanyResolver = async (root, { input }, { db, user }) => {
  try {
    const { contact, ...companyInfo } = input as EditCompanyInput;
    // update data in company table
    const [editedCompany]: Array<{ id: number }> = await db('company')
      .update({ ...companyInfo, editedBy: user.sub.id })
      .returning(['id']);
    const { id: companyId } = editedCompany;

    // update content in contact table based on company id
    const updatedContact = await db('contact')
      .where({ id: companyId })
      .update(contact, '*');

    // get edited table data
    const [foundCompany]: Company[] = await db('company')
      .where('id', companyId)
      .select('*');

    return foundCompany;
  } catch (error) {
    return new ApolloError(error);
  }
};
