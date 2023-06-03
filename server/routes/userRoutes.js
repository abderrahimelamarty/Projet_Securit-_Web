const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../Middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, updateUserProfile);

module.exports = router;
