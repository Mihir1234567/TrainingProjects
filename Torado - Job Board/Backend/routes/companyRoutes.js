const express = require("express");
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createOrUpdateCompany,
  getMyCompany,
} = require("../controllers/companyController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getCompanies).post(protect, createOrUpdateCompany);
router.route("/mine").get(protect, getMyCompany);
router.route("/:id").get(getCompanyById);

module.exports = router;
