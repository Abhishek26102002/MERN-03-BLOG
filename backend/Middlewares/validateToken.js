const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization; // Extract the token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing or invalid",
    });
  }

  // Extract the token value if prefixed with "Bearer "
  const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

  jwt.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
        error: err.message,
      });
    }

    req.user = decoded.user; // Attach the decoded token payload to the request
    next(); // Pass control to the next middleware or route handler
  });
});

module.exports = validateToken;
