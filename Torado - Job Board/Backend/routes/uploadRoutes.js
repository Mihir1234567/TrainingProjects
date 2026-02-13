const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { storage } = require("../config/cloudinary"); // Import Cloudinary storage

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  const mimetype = allowedMimes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images or Documents Only!");
  }
}

// Init Upload with Cloudinary Storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @route   POST /api/upload
// @desc    Upload a file to Cloudinary
// @access  Public (or Private)
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Cloudinary storage puts the URL in req.file.path
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: req.file.path, // Cloudinary URL
  });
});

module.exports = router;
