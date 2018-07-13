const createCompany = async (root, { input }, { request, db }) => {
  try {
    const { user } = request;
    if (!user) return new Error('Please sign in');
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

export default createCompany;
