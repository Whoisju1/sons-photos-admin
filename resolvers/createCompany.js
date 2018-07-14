import requireAuth from '../resolverMiddleware/requireAuth';

const createCompany = async (root, { input }, { request, db }) => {
  try {
    const { user } = request;
    const { account_id } = user.sub; // eslint-disable-line

    input.account_id = account_id; // eslint-disable-line

    const [companyID] = await db('company')
      .insert(input)
      .returning('company_id');

    const [company] = await db('company_view')
      .select()
      .where({ companyID });

    return company;
  } catch (err) {
    return err;
  }
};

export default requireAuth(createCompany);
