const pool = require("../config/db");

// Create a new user
const createUser = async (name, email, hashedPassword, role) => {
  return await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );
};

// Get user by email
const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

// Get all users
const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT id, name, email, role FROM users");
  return rows;
};

// Get user by ID
const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

// Update user
const updateUser = async (id, name, email, role) => {
  return await pool.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id]
  );
};

// Delete user
const deleteUser = async (id) => {
  return await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
