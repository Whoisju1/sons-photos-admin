const createCompany = async (root, { input }, { request, db }) => {
  try {
    console.log(request.user);
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
    console.log(JSON.stringify(err, null, 3));
    return err;
  }
};

export default createCompany;
