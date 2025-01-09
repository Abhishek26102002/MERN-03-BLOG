const asyncHandler = require("express-async-handler");
const Users = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = asyncHandler(async (req, res) => {
  if (req.user.is_Admin !== true) {
    return res.status(403).json({
      success: false,
      message: "User not Authorized",
    });
  }

  try {
    // Retrieve all users from the database
    const users = await Users.find();

    // Check if users are found
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    // Respond with all users
    res.status(200).json({
      success: true,
      data: users, // This will return all user details
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc register a user
// @route POST /api/register
// @access public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, pass } = req.body;

  // Validate input fields
  if (!name || !email || !pass) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  // Validate name
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid name: Must be at least 2 characters and contain only letters and spaces",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email: Must be a valid email address",
    });
  }

  // Validate password
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passRegex.test(pass)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid pass: Must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // Check if user already exists
  const userAvailable = await Users.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  // Hash the password
  const hashPass = await bcrypt.hash(pass, 10);

  // Create the user
  const user = await Users.create({
    name,
    email,
    pass: hashPass,
  });

  if (user) {
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: user.id,
        email: user.email,
      },
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
});

// @desc login a user
// @route POST /api/login
// @access public
const userLogin = asyncHandler(async (req, res) => {
  const { email, pass } = req.body;

  // Validate input fields
  if (!email || !pass) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  // Check if user exists
  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(pass, user.pass))) {
    // Generate access token
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
          is_Admin: user.is_Admin,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59min" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: accessToken,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Login failed: Invalid email or password",
    });
  }
});

const userupdate = asyncHandler(async (req, res) => {
  const { email, name, pass } = req.body;

  // Validate input fields
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required to update user details",
    });
  }

  if (!name && !pass) {
    return res.status(400).json({
      success: false,
      message: "At least one field (name or pass) must be provided for update",
    });
  }

  // Check if the user exists
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Verify permissions: Only allow if the logged-in user is the same user
  // req.user.email is comming from validate token where req.user = decoded.user
  if (req.user.email !== email) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You are not allowed to update this user",
    });
  }

  // Update fields
  if (name) user.name = name;
  if (pass) {
    const hashPass = await bcrypt.hash(pass, 10);
    user.pass = hashPass;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

const userdelete = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Validate input fields
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required to update user details",
    });
  }
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.user.email !== email) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You are not allowed to update this user",
    });
  }

  await Users.deleteOne({ email });

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

// CRUD post

module.exports = {
  userRegister,
  userLogin,
  userupdate,
  userdelete,
  getUsers,
};
