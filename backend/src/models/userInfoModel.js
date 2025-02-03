const pool = require("../config/db");

// **CREATE User**
const createUser = async (
  name,
  technology,
  graduation,
  experience,
  skills,
  aadhar_pan
) => {
  return await pool.query(
    "INSERT INTO usersinfo (name, technology, graduation, experience, skills, aadhar_pan) VALUES (?, ?, ?, ?, ?, ?)",
    [name, technology, graduation, experience, skills, aadhar_pan]
  );
};

// **GET All Users**
const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM usersinfo");
  return rows;
};

// **GET User by ID**
const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM usersinfo WHERE id = ?", [id]);
  return rows[0];
};

// **UPDATE User**
const updateUser = async (
  id,
  name,
  technology,
  graduation,
  experience,
  skills,
  aadhar_pan
) => {
  return await pool.query(
    "UPDATE usersinfo SET name=?, technology=?, graduation=?, experience=?, skills=?, aadhar_pan=? WHERE id=?",
    [name, technology, graduation, experience, skills, aadhar_pan, id]
  );
};

// Fetch user by name
// const getUserByName = async (name) => {
//   const [rows] = await pool.query("SELECT * FROM usersinfo WHERE name = ?", [
//     name,
//   ]);
//   return rows[0];
// };
const getUserByName = async (name) => {
  const [rows] = await pool.query("SELECT * FROM usersinfo WHERE name = ?", [
    name,
  ]);
  return rows; // Return all matching records
};

// **DELETE User**
const deleteUser = async (id) => {
  return await pool.query("DELETE FROM usersinfo WHERE id = ?", [id]);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByName,
  getUserById,
  updateUser,
  deleteUser,
};
