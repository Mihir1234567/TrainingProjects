const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const { protect, checkPermission } = require("../middleware/authMiddleware");

// All routes are protected and require admin access or specific role management permissions
// For simplicity in Phase 3, we'll use checkPermission('role.manage') or just rely on 'admin' role check via middleware if we haven't assigned permissions yet.
// But per plan: "requirePermission('permission.name')"

// We will assume 'role.read', 'role.create', 'role.update', 'role.delete'
router
  .route("/")
  .get(protect, checkPermission("role.read"), getRoles)
  .post(protect, checkPermission("role.create"), createRole);

router
  .route("/:id")
  .put(protect, checkPermission("role.update"), updateRole)
  .delete(protect, checkPermission("role.delete"), deleteRole);

module.exports = router;
