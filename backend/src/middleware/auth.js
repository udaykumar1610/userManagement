const jwt = require("jsonwebtoken");

// Hardcoded JWT Secret
const JWT_SECRET = "mysecretkey"; // Replace this with your actual secret key

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET); // Remove "Bearer " before verification
    req.user = decoded; // Store user data in request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to authorize admin role
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
