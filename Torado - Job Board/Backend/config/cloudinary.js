const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource type based on mimetype
    const isRaw =
      file.mimetype.includes("pdf") ||
      file.mimetype.includes("word") ||
      file.mimetype.includes("document");

    return {
      folder: "torado-jobs",
      resource_type: isRaw ? "raw" : "auto",
      public_id: file.originalname.split(".")[0] + "-" + Date.now(), // Ensure unique names
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf", "doc", "docx"],
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
