const requireAuth = (req, res, next) => {
  try {
    const { user } = req;
    if (!user) return res.status(401).json('Please sign in.');
    return next();
  } catch (err) {
    if (err.name === 'UnauthorizedError') res.status(401).json('Unauthorized!');
    return res.status(500).json(err);
  }
};

export default requireAuth;
