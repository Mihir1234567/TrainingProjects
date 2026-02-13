const User = require("../models/User");
const { logAction } = require("../utils/auditLogger");

// @desc    Get all candidates
// @route   GET /api/users/candidates
// @access  Public
const getCandidates = async (req, res) => {
  try {
    // Basic filter: role 'candidate'
    // Can extend with req.query for search
    const { keyword, location, specialization } = req.query;

    let query = { role: "candidate" };

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { skills: { $in: [new RegExp(keyword, "i")] } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    const candidates = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all freelancers (subset of candidates with rate? or same?)
// @route   GET /api/users/freelancers
// @access  Public
const getFreelancers = async (req, res) => {
  try {
    // For now, return candidates who have a 'rate' set, or just all candidates
    const freelancers = await User.find({
      role: "candidate",
      rate: { $exists: true, $ne: "" },
    })
      .select("-password")
      .sort({ rating: -1 });
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID (Public Profile)
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile (Self)
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    user.imageAction = req.body.imageAction || user.imageAction;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.jobType = req.body.jobType || user.jobType;
    user.specialization = req.body.specialization || user.specialization;
    user.skills = req.body.skills || user.skills;
    user.bio = req.body.bio || user.bio;
    user.rate = req.body.rate || user.rate;
    user.experience = req.body.experience || user.experience;
    user.location = req.body.location || user.location;
    user.resumeUrl = req.body.resumeUrl || user.resumeUrl;

    // New Fields
    user.expectedSalary = req.body.expectedSalary || user.expectedSalary;
    user.age = req.body.age || user.age;
    user.country = req.body.country || user.country;
    user.city = req.body.city || user.city;
    user.latitude = req.body.latitude || user.latitude;
    user.longitude = req.body.longitude || user.longitude;

    // Extended Profile
    user.phone = req.body.phone || user.phone;
    user.languages = req.body.languages || user.languages;
    user.qualification = req.body.qualification || user.qualification;
    user.workExperience = req.body.workExperience || user.workExperience;
    user.fundamentalSkills =
      req.body.fundamentalSkills || user.fundamentalSkills;

    // Social Links (Merge or Replace)
    if (req.body.socialLinks) {
      user.socialLinks = { ...user.socialLinks, ...req.body.socialLinks };
    }

    // Profile Completion & Confirmation
    if (req.body.isProfileComplete !== undefined) {
      user.isProfileComplete = req.body.isProfileComplete;
    }

    if (req.body.isFreelancer !== undefined) {
      user.isFreelancer = req.body.isFreelancer;
    }

    // Handle password update if needed
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: req.token, // If we want to return token again
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { keyword, role } = req.query;
    let query = { isDeleted: { $ne: true } };

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password")
      .populate("roles") // Populate roles for admin view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCandidates,
  getFreelancers,
  getUserById,
  updateProfile,
  getAllUsers, // Exporting it here now
};

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    // Populate roles to check hierarchy
    const targetUser = await User.findById(req.params.id).populate("roles");

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Role Hierarchy Check
    const getRank = (u) => {
      if (u.role === "admin") return 100; // Legacy fallback
      if (!u.roles || u.roles.length === 0) return 0;
      return Math.max(...u.roles.map((r) => r.rank || 0));
    };

    const actorRank = getRank(req.user);
    const targetRank = getRank(targetUser);

    if (
      actorRank <= targetRank &&
      req.user._id.toString() !== targetUser._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to modify this user (insufficient rank)",
      });
    }

    // Update fields
    if (req.body.name) targetUser.name = req.body.name;
    if (req.body.email) targetUser.email = req.body.email;
    if (req.body.role) targetUser.role = req.body.role; // Legacy
    if (req.body.roles) targetUser.roles = req.body.roles; // New RBAC

    const updatedUser = await targetUser.save();

    await logAction({
      action: "USER_UPDATE",
      performedBy: req.user._id,
      targetUser: updatedUser._id,
      changes: req.body,
      req,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("roles");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Role Hierarchy Check
    const getRank = (u) => {
      if (u.role === "admin") return 100; // Legacy fallback
      if (!u.roles || u.roles.length === 0) return 0;
      return Math.max(...u.roles.map((r) => r.rank || 0));
    };

    const actorRank = getRank(req.user);
    const targetRank = getRank(user);

    if (actorRank <= targetRank) {
      return res.status(403).json({
        message: "Not authorized to delete this user (insufficient rank)",
      });
    }

    // Soft Delete
    user.isDeleted = true;
    user.deletedAt = new Date();
    user.status = "suspended"; // Optional: mark as suspended
    await user.save();

    await logAction({
      action: "USER_SOFT_DELETE",
      performedBy: req.user._id,
      targetUser: user._id,
      req,
    });

    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCandidates,
  getFreelancers,
  getUserById,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
};
