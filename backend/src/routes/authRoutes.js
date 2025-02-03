const express = require("express");
const {
  register,
  login,
  getUsers,
  getUser,
  updateUserDetails,
  removeUser,
} = require("../controllers/authController"); // Ensure correct path

const { authenticate, authorizeRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Ensure the functions are defined before using them
if (!getUsers || !getUser || !updateUserDetails || !removeUser) {
  console.error("❌ ERROR: One or more controller functions are undefined!");
  process.exit(1); // Stop server if functions are missing
}

// Admin-only routes
router.get("/users", getUsers);
router.get("/users/:id", authenticate, authorizeRole("admin"), getUser);
router.put(
  "/users/:id",
  authenticate,
  authorizeRole("admin"),
  updateUserDetails
);
router.delete("/users/:id", authenticate, authorizeRole("admin"), removeUser);

module.exports = router;
