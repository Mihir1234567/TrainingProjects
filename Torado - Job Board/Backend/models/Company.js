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
    logo: {
      type: String,
      default: "https://via.placeholder.com/150",
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);
