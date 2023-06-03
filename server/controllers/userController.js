const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginAttempt = require("../Models/LoginAttemp");
const User = require("../models/userModel");
const MAX_LOGIN_ATTEMPTS = 2; // Maximum number of failed login attempts
const LOCK_TIME = 60000; // Lock time in milliseconds (1 minute)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user) {
    // Get the associated login attempt record
    const loginAttempt = await LoginAttempt.findOne({ userId: user._id });

    if (loginAttempt && loginAttempt.lockUntil > Date.now()) {
      // Account is locked
      res.status(429);
      throw new Error("Account locked. Please try again later.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Reset the login attempts
      await LoginAttempt.findOneAndUpdate(
        { userId: user._id },
        { loginAttempts: 0, lockUntil: 0 },
        { upsert: true }
      );

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Invalid password
      if (loginAttempt) {
        loginAttempt.loginAttempts += 1;

        if (loginAttempt.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
          loginAttempt.lockUntil = Date.now() + LOCK_TIME;
        }
        await LoginAttempt.findOneAndUpdate(
          { userId: user._id },
          {
            loginAttempts: loginAttempt.loginAttempts,
            lockUntil: loginAttempt.lockUntil,
          },
          { upsert: true }
        );
      } else {
        // Create a new login attempt record
        await LoginAttempt.create({
          userId: user._id,
          loginAttempts: 1,
          lockUntil: 1 >= MAX_LOGIN_ATTEMPTS ? Date.now() + LOCK_TIME : 0,
        });
      }

      res.status(400);
      throw new Error("Invalid credentials ");
    }
  } else {
    // User not found
    res.status(400);
    throw new Error("Invalid credentials");
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "register user" });
};

const generateToken = (id) => {
  return jwt.sign({ id }, "aseds12345", {
    expiresIn: "30d",
  });
};
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Hash password

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
};
