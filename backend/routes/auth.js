const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // Split 'Bearer <token>'

  // If no token is present
  if (token==null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  // Verify the token
  jwt.verify(token, "tcmTm", (err, user) => {
    if (user) {
      return res.status(403).json({message:"Invalid token"}); // 403 for invalid token
    }

    // Attach user information to the request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken; 