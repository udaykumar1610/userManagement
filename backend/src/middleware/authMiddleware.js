const jwt = require("jsonwebtoken");

// Hardcode JWT Secret
const JWT_SECRET = "mysecretkey"; // Replace this with your secret key

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Use the hardcoded JWT_SECRET
    req.user = decoded; // Store the decoded user info in request object
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ message: "Access Denied" });
  next();
};

module.exports = { authenticate, authorizeRole };
