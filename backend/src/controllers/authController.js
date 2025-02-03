const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../models/userModel");

// Hardcoded JWT Secret
const JWT_SECRET = "mysecretkey"; // Replace this with your actual secret key

const register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const existingUser = await getUserByEmail(email);
  if (existingUser)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(name, email, hashedPassword, role || "user");

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!JWT_SECRET) {
    console.error("JWT Secret is missing");
    return res.status(500).json({ message: "JWT secret key is missing" });
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, role: user.role, name: user.name });
};

// GET all users (Admin only)
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// GET user by ID (Admin only)
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// UPDATE user details (Admin only)
const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updated = await updateUser(id, name, email, role);
    if (updated.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// DELETE user (Admin only)
const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUser(id);
    if (deleted.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  updateUserDetails,
  removeUser,
};
