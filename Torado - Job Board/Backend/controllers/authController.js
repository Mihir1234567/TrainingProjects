const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
// Generate JWT with Role Versions
const generateToken = (user) => {
  const roleVersions = {};
  if (user.roles) {
    user.roles.forEach((r) => {
      if (r && r._id) {
        roleVersions[r._id] = r.version || 0;
      }
    });
  }

  return jwt.sign(
    {
      id: user._id,
      roleVersions,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName, jobTitle } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "candidate", // Legacy
      companyName: role === "employer" ? companyName : undefined,
      jobTitle: role === "candidate" ? jobTitle : undefined,
    });

    // Assign Role Object (RBAC)
    try {
      const Role = require("../models/Role");
      const roleName = role || "candidate";
      const roleDoc = await Role.findOne({ name: roleName });

      if (roleDoc) {
        user.roles = [roleDoc._id];
        await user.save();
      }
    } catch (err) {
      console.error("Failed to assign role object during register", err);
      // Continue without failing registration
    }

    // Re-fetch to populate if needed or just construct response
    // For now we just return what we have, frontend can hit /me for full details if strictly needed
    // or we can populate manually

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roles: user.roles, // Include new roles
        roles: user.roles, // Include new roles
        token: generateToken(user),
        companyName: user.companyName,
        companyName: user.companyName,
        jobTitle: user.jobTitle,
        isProfileComplete: user.isProfileComplete,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email: email.toLowerCase() })
    .select("+password")
    .populate("roles");

  if (user && (await user.matchPassword(password))) {
    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // Log Login Action
    const { logAction } = require("../utils/auditLogger");
    await logAction({
      action: "USER_LOGIN",
      performedBy: user._id,
      targetUser: user._id,
      details: `User logged in from ${req.ip}`,
      req,
    });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      roles: user.roles, // Return populated roles
      token: generateToken(user),
      companyName: user.companyName,
      jobTitle: user.jobTitle,
      isProfileComplete: user.isProfileComplete,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};
// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide current and new password" });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/auth/delete-account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide your password to confirm deletion" });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Import models for cascading deletes
    const Job = require("../models/Job");
    const Application = require("../models/Application");
    const Bookmark = require("../models/Bookmark");
    const Message = require("../models/Message");

    // Delete associated data
    await Job.deleteMany({ recruiterId: req.user.id });
    await Application.deleteMany({ userId: req.user.id });
    await Bookmark.deleteMany({ userId: req.user.id });
    await Message.deleteMany({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }],
    });

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Account Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  deleteAccount,
};
