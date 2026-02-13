const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true, // Auto-trim spaces
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      default: "candidate",
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    isFreelancer: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    imageAction: {
      type: Object, // Store crop data { x, y, width, height, ... }
      default: null,
    },

    // --- Employer Fields ---
    companyName: {
      type: String,
      trim: true,
    },

    // --- Candidate/Freelancer Fields ---
    jobTitle: {
      type: String, // e.g. "Senior UI Designer"
      trim: true,
    },
    jobType: {
      type: String, // e.g. "Full Time", "Freelance"
    },
    specialization: {
      type: String, // e.g. "Design", "Development"
    },
    skills: {
      type: [String], // e.g. ["Figma", "React"]
    },
    bio: {
      type: String,
    },
    rate: {
      type: String, // e.g. "$50/hr"
    },
    location: {
      type: String,
    },
    experience: {
      type: String, // e.g. "5 Years"
    },
    expectedSalary: String,
    age: String,
    country: String,
    city: String,
    latitude: Number,
    longitude: Number,
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    resumeUrl: {
      type: String,
    },
    // Extended Profile
    phone: String,
    languages: [String],
    qualification: String,
    workExperience: String, // Simple text for now, could be array of objects later
    fundamentalSkills: [String],

    // Social Links
    socialLinks: {
      linkedin: String,
      twitter: String,
      portfolio: String,
      facebook: String,
      instagram: String,
    },

    // Profile Completion Status
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    // Status & Soft Delete
    status: {
      type: String,
      enum: ["active", "suspended", "banned", "pending"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ roles: 1 });
userSchema.index({ status: 1 });
userSchema.index({ isDeleted: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model("User", userSchema);
