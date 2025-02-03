const UserInfo = require("../models/userInfoModel");

// **CREATE User**
const createUser = async (req, res) => {
  try {
    const { name, technology, graduation, experience, skills, aadhar_pan } =
      req.body;
    if (!name || !aadhar_pan) {
      return res
        .status(400)
        .json({ message: "name and Aadhar/PAN are required" });
    }

    await UserInfo.createUser(
      name,
      technology,
      graduation,
      experience,
      skills,
      aadhar_pan
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// **READ All Users**
const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.getAllUsers();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// **READ Single User**
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserInfo.getUserById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// **UPDATE User**
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, technology, graduation, experience, skills, aadhar_pan } =
      req.body;

    const result = await UserInfo.updateUser(
      id,
      name,
      technology,
      graduation,
      experience,
      skills,
      aadhar_pan
    );
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await UserInfo.getUserByName(name); // Fetch all records

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users); // Return array of user records
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};
// **DELETE User**
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserInfo.deleteUser(id);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByName,
  deleteUser,
};
