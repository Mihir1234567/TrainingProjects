const Company = require("../models/Company");
const User = require("../models/User");

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or Update Company Profile
// @route   POST /api/companies
// @access  Private (Employer)
const createOrUpdateCompany = async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const {
    name,
    industry,
    logo,
    description,
    location,
    website,
    phone,
    email,
    employees,
    established,
    banner,
    socials,
    mission,
    aboutUs,
    recruitments,
    people,
    skills,
    talent,
    logoAction,
  } = req.body;

  const companyFields = {
    userId: req.user.id,
    name,
    industry,
    logo,
    description,
    location,
    website,
    phone,
    email,
    employees,
    established,
    banner,
    socials,
    mission,
    aboutUs,
    recruitments,
    people,
    skills,
    talent,
    logoAction,
  };

  try {
    let company = await Company.findOne({ userId: req.user.id });

    if (company) {
      // Update
      company = await Company.findOneAndUpdate(
        { userId: req.user.id },
        { $set: companyFields },
        { new: true },
      );
      return res.json(company);
    }

    // Create
    company = await Company.create(companyFields);

    // Optional: Link company back to User if we want bi-directional ref
    // await User.findByIdAndUpdate(req.user.id, { companyId: company._id });

    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get My Company
// @route   GET /api/companies/mine
// @access  Private (Employer)
const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ message: "No company profile found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createOrUpdateCompany,
  getMyCompany,
};
