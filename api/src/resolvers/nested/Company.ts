import { ApolloError } from 'apollo-server-express';
import Knex from 'knex';
import { CompanyResolvers } from '../../resolver-types';

interface IContext {
  db: Knex;
}

const Company: CompanyResolvers<IContext> = {
  contact: async ({ id: companyId }, args, { db }) => {
    try {
      // get the contact information for company
      const [contact] = await db('contact')
        .where({ companyId })
        .select('*');
      return contact;
    } catch (error) {
      return new ApolloError(error);
    }
  },
  editedBy: async ({ id }, args, { db }) => {
    try {
      // get account id for user who edited company data
      const [foundAccount] = await db('company')
      .where({ id })
      .select('editedBy');
      const { editedBy: accountId } = foundAccount;

      // get the account information for the user who edited company data
      const [account] = await db('account')
      .where({ id: accountId })
      .select('*');

      return account;
    } catch (error) {
      return new ApolloError(error);
    }
  },
};

export default Company;
