const express = require("express");
const { authenticate, authorizeAdmin } = require("../middleware/auth");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByName,
  updateUser,
  deleteUser,
} = require("../controllers/userInfoController");

const router = express.Router();

router.post("/", authenticate, createUser);
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.get("/name/:name", authenticate, getUserByName);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
