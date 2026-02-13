const express = require("express");
const router = express.Router();
const {
  getCandidates,
  getFreelancers,
  getUserById,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, checkPermission } = require("../middleware/authMiddleware");

router.get("/candidates", getCandidates);
router.get("/freelancers", getFreelancers);
router.get("/admin/all", protect, checkPermission("user.read"), getAllUsers);
router.put("/profile", protect, updateProfile);
router
  .route("/:id")
  .get(getUserById)
  .put(protect, checkPermission("user.update"), updateUser)
  .delete(protect, checkPermission("user.delete"), deleteUser);

module.exports = router;
