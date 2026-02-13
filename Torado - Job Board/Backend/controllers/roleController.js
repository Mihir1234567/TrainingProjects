const Role = require("../models/Role");
const { logAction } = require("../utils/auditLogger");

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private/Admin
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new role
// @route   POST /api/roles
// @access  Private/Admin
const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await Role.create({
      name,
      description,
      permissions,
      // isSystem & rank are defaults or manually set by migration
    });

    await logAction({
      action: "ROLE_CREATE",
      performedBy: req.user._id,
      targetRole: role._id,
      changes: { name, description, permissions },
      req,
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a role
// @route   PUT /api/roles/:id
// @access  Private/Admin
const updateRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Prevent renaming system roles
    if (role.isSystem && req.body.name && req.body.name !== role.name) {
      return res.status(400).json({
        message: "Cannot rename system default roles.",
      });
    }

    // Increment version to invalidate old tokens
    req.body.version = (role.version || 0) + 1;

    // Optimistic Locking
    if (req.body.__v !== undefined && role.__v !== req.body.__v) {
      return res.status(409).json({
        message:
          "Conflict: Role has been modified by another admin. Please refresh.",
      });
    }

    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await logAction({
      action: "ROLE_UPDATE",
      performedBy: req.user._id,
      targetRole: updatedRole._id,
      changes: req.body,
      req,
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a role
// @route   DELETE /api/roles/:id
// @access  Private/Admin
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.isSystem) {
      return res.status(400).json({
        message: "Cannot delete system default roles. These are protected.",
      });
    }

    await role.deleteOne();

    await logAction({
      action: "ROLE_DELETE",
      performedBy: req.user._id,
      targetRole: role._id,
      changes: { name: role.name }, // Keep record of what was deleted
      req,
    });

    res.status(200).json({ message: "Role removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
