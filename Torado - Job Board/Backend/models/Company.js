const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a company name"],
    },
    industry: {
      type: String,
    },
    logo: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    logoAction: {
      type: Object, // { x: number, y: number, zoom: number }
      default: null,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    // Extended Info
    established: Date,
    employees: String, // e.g. "50-100"
    phone: String,
    email: String,
    banner: String,
    socials: [
      {
        platform: String,
        link: String,
      },
    ],
    mission: String,
    aboutUs: String,
    skills: [String], // Fundamental Learning, Skills...
    talent: [String], // Talent & Experience
    recruitments: String,
    people: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);
