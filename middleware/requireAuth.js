const requireAuth = (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    if (!user) return res.status(401).json('Unauthorized');
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default requireAuth;
