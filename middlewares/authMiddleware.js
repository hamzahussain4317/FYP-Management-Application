const isAdmin = (req, res, next) => {
  if (req.body.user && req.body.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = { isAdmin };
