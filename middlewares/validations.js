const jwt = require("jsonwebtoken");
require("dotenv").config();

const isValidToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return !!decoded;
  } catch (err) {
    console.error("Token validation failed:", err.message);
    return null;
  }
};

module.exports = { isValidToken };
