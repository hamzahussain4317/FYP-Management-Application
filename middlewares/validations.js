const jwt = require("jsonwebtoken");
require("dotenv").config(); // To load environment variables

// Function to validate the token
const isValidToken = (token) => {
  try {
    // verifying the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; //returning the decoded payload
    //If we want to return true or false return !!decoded;
  } catch (err) {
    console.error("Token validation failed:", err.message);
    return null;
  }
};

module.exports = { isValidToken };
