import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  MapPin,
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Layout,
  Star,
  GraduationCap,
  DollarSign,
  Calendar,
  Languages,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Building2,
  XCircle,
  Wand2,
} from "lucide-react";
import { USER_PROFILE } from "../../constants/userProfile";
import CustomDropdown from "../../components/common/CustomDropdown";
import DashboardButton from "../../components/common/DashboardButton";
import Toast from "../../components/common/Toast"; // Assuming Toast exists or using simple alert for now

// Optimization: Move static options outside component
const dropdownOptions = {
  jobTypes: [
    "Development",
    "Web Design",
    "Multimedia",
    "Marketing",
    "Resources",
    "Financing",
    "Software",
    "Programming",
    "Accounting",
    "Finance",
  ],
  categories: [
    "Development",
    "Web Design",
    "Multimedia",
    "Marketing",
    "Resources",
    "Financing",
    "Software",
    "Programming",
    "Accounting",
    "Finance",
  ],
  experience: ["HTML", "Php", "javascript", "Wordpress"],
  education: ["SSC", "HSC", "B.A"],
  salary: [
    "$500 - $800",
    "$600 - $1200",
    "$700 - $1400",
    "$800 - $1600",
    "$900 - $1800",
    "$1000 - $2000",
  ],
  age: ["18", "20", "22", "24", "26", "28", "30"],
  languages: [
    "English",
    "Italiana",
    "Portuguese",
    "简体中文",
    "Deutsche",
    "Bangla",
  ],
  countries: ["United States", "United Kingdom", "Canada"],
  cities: ["London", "New York", "Paris"],
};

import { userAPI, uploadAPI } from "../../services/api"; // Added API imports

const MyProfile = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [profileImage, setProfileImage] = useState(USER_PROFILE.avatar);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    experience: "",
    education: "", // qualification
    currentSalary: "",
    expectedSalary: "",
    age: "", // Not in backend yet, maybe ignored or store in bio/extra?
    language: "", // languages array in backend
    about: "", // bio
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    country: "",
    city: "",
    latitude: "",
    longitude: "",
    address: "",
  });

  // Fetch Profile on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await userAPI.getProfile();
        setFormData({
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          jobTitle: user.jobTitle || "",
          jobType: user.jobType || "",
          jobCategory: user.specialization || "",
          experience: user.experience || "",
          education: user.qualification || "",
          currentSalary: user.rate || "", // Mapping rate to currentSalary approx
          expectedSalary: user.expectedSalary || "",
          age: user.age || "",
          language: user.languages?.[0] || "",
          about: user.bio || "",
          facebook: user.socialLinks?.facebook || "",
          twitter: user.socialLinks?.twitter || "",
          linkedin: user.socialLinks?.linkedin || "",
          instagram: user.socialLinks?.instagram || "",
          country: user.country || "",
          city: user.city || "",
          latitude: user.latitude || "",
          longitude: user.longitude || "",
          address: user.location || "",
        });
        if (user.image) setProfileImage(user.image);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  /* State for Toast */
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Auto-fill test data for development
  const autoFillTestData = () => {
    const firstNames = [
      "John",
      "Jane",
      "Michael",
      "Sarah",
      "David",
      "Emily",
      "Chris",
      "Amanda",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Davis",
      "Miller",
      "Wilson",
      "Taylor",
    ];
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const firstName = random(firstNames);
    const lastName = random(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    setFormData({
      fullName: `${firstName} ${lastName}`,
      email: email,
      phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      jobTitle: random([
        "Senior Developer",
        "UI Designer",
        "Product Manager",
        "Data Analyst",
        "DevOps Engineer",
      ]),
      jobType: random(dropdownOptions.jobTypes),
      jobCategory: random(dropdownOptions.categories),
      experience: random(dropdownOptions.experience),
      education: random(dropdownOptions.education),
      currentSalary: random(dropdownOptions.salary),
      expectedSalary: random(dropdownOptions.salary),
      age: random(dropdownOptions.age),
      language: random(dropdownOptions.languages),
      about: `Passionate professional with ${Math.floor(Math.random() * 10 + 2)}+ years of experience in the tech industry. Skilled in problem-solving, team collaboration, and delivering high-quality results. Always eager to learn new technologies and contribute to innovative projects.`,
      facebook: `https://facebook.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      twitter: `https://twitter.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      instagram: `https://instagram.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      country: random(dropdownOptions.countries),
      city: random(dropdownOptions.cities),
      latitude: (40 + Math.random() * 10).toFixed(6),
      longitude: (-74 + Math.random() * 10).toFixed(6),
      address: `${Math.floor(Math.random() * 9000 + 1000)} ${random(["Main St", "Oak Ave", "Tech Blvd", "Innovation Way"])}, Suite ${Math.floor(Math.random() * 900 + 100)}`,
    });

    setToast({
      isVisible: true,
      message: "Profile auto-filled with test data!",
      type: "success",
    });
  };

  const handleImageClick = () => {
    setUploadError(""); // Reset error on open
    setIsUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");

    // 1. Size Check (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      setUploadError("File size exceeds 1MB limit.");
      return;
    }

    // 2. Type Check
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file type. Please upload JPG, PNG, or GIF.");
      return;
    }

    try {
      const serverPath = await uploadAPI.uploadFile(file);
      // Prepend server URL if needed, or store relative path.
      // Frontend usually needs full URL to display.
      // "http://localhost:5001" + serverPath
      // Ideally API returns full URL or we handle it.
      // For now, assuming serverPath is "/uploads/filename.jpg"
      const fullUrl = `http://localhost:5001${serverPath}`;

      setProfileImage(fullUrl);
      setIsUploadModalOpen(false);
    } catch (err) {
      setUploadError("Upload failed: " + err.message);
    }
  };

  const handleSave = async () => {
    if (status !== "idle") return;

    // Validation
    const requiredFields = ["fullName", "email", "phone"];
    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setStatus("loading");
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        jobType: formData.jobType,
        specialization: formData.jobCategory,
        experience: formData.experience,
        qualification: formData.education,
        rate: formData.currentSalary,
        expectedSalary: formData.expectedSalary,
        age: formData.age,
        languages: [formData.language], // Array in backend
        bio: formData.about,
        location: formData.address, // Simplifying address/location
        country: formData.country,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        image: profileImage,
        socialLinks: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
        },
      };

      await userAPI.updateProfile(payload);

      setStatus("success");
      setToast({
        isVisible: true,
        message: "Profile updated successfully!",
        type: "success",
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Update failed", err);
      setStatus("idle");
      // Show error toast?
    }
  };

  const renderInput = (id, label, Icon, type = "text") => (
    <div className="relative group/field">
      <input
        id={id}
        type={type}
        placeholder=" "
        value={formData[id]}
        onChange={(e) => handleChange(id, e.target.value)}
        className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
          errors[id]
            ? "border-red-500 ring-1 ring-red-500/20"
            : "border-slate-100 ring-4 ring-transparent"
        } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
      />
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          errors[id]
            ? "bg-red-50 text-red-400"
            : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
        }`}
      >
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <label
        htmlFor={id}
        className={`absolute left-16 top-1/2 -translate-y-1/2 ${
          errors[id] ? "text-red-400" : "text-slate-400"
        } text-[15px] font-bold transition-all pointer-events-none
                   peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
          <XCircle size={12} /> {errors[id]}
        </p>
      )}
    </div>
  );

  const renderDropdown = (field, label, Icon, options) => (
    <div className="relative">
      <CustomDropdown
        options={options}
        placeholder={label}
        value={formData[field]}
        onChange={(val) => handleChange(field, val)}
        icon={Icon}
        error={errors[field]}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
          <XCircle size={12} /> {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl mx-auto px-4 md:px-0">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-bold text-[#002333]">My Profile</h2>
          <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/user-dashboard"
              className="hover:text-[#5BBB7B] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#5BBB7B]">My Profile</span>
          </div>
        </div>
        {/* Auto-Fill Button for Development */}
        <button
          type="button"
          onClick={autoFillTestData}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-bold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
        >
          <Wand2 size={16} />
          Auto-Fill Test Data
        </button>
      </div>

      {/* Section 1: My Account */}
      <div className="bg-white rounded-[24px] md:rounded-[30px] border border-slate-50 shadow-[0_0_80px_rgba(0,0,0,0.03)] p-5 sm:p-10 xl:p-12 hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] transition-all group/section">
        <h3 className="text-[18px] font-bold text-[#002333] mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
          My Account
        </h3>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Profile Picture Upload */}
          <div className="shrink-0 flex flex-col gap-3">
            <div
              onClick={handleImageClick}
              className="w-28 h-28 md:w-32 md:h-32 xl:w-40 xl:h-40 rounded-3xl overflow-hidden relative group cursor-pointer ring-4 ring-slate-50 shadow-lg mx-auto lg:mx-0"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#002333]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Upload size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("fullName", "Full Name", User)}
            {renderInput("email", "Email", Mail, "email")}
            {renderInput("phone", "Phone", Phone)}
            {renderInput("jobTitle", "Job Title", Briefcase)}

            {renderDropdown(
              "jobType",
              "Job Type",
              Briefcase,
              dropdownOptions.jobTypes,
            )}

            {renderDropdown(
              "jobCategory",
              "Job Category",
              Layout,
              dropdownOptions.categories,
            )}

            {renderDropdown(
              "experience",
              "Experience",
              Star,
              dropdownOptions.experience,
            )}

            {renderDropdown(
              "education",
              "Education",
              GraduationCap,
              dropdownOptions.education,
            )}

            {renderDropdown(
              "currentSalary",
              "Current Salary",
              DollarSign,
              dropdownOptions.salary,
            )}

            {renderDropdown(
              "expectedSalary",
              "Expected Salary",
              DollarSign,
              dropdownOptions.salary,
            )}

            {renderDropdown("age", "Age", Calendar, dropdownOptions.age)}

            {renderDropdown(
              "language",
              "Language",
              Languages,
              dropdownOptions.languages,
            )}

            <div className="md:col-span-2 relative group/field">
              <textarea
                id="about"
                placeholder=" "
                value={formData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className="peer w-full min-h-[150px] pl-16 pr-5 py-6 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow resize-y"
              ></textarea>
              <div className="absolute left-5 top-6 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                <User size={18} strokeWidth={2.5} />
              </div>
              <label
                htmlFor="about"
                className="absolute left-16 top-6 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
              >
                About Info
              </label>
            </div>

            <div className="md:col-span-2 mt-4">
              <DashboardButton onClick={handleSave} status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Social Accounts */}
      <div className="bg-white rounded-[24px] md:rounded-[30px] border border-slate-50 shadow-[0_0_80px_rgba(0,0,0,0.03)] p-5 sm:p-10 xl:p-12 hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] transition-all group/section">
        <h3 className="text-[18px] font-bold text-[#002333] mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
          Social Accounts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("facebook", "Facebook Link", Facebook)}
          {renderInput("twitter", "Twitter Link", Twitter)}
          {renderInput("linkedin", "LinkedIn Link", Linkedin)}
          {renderInput("instagram", "Instagram Link", Instagram)}

          <div className="md:col-span-2 mt-4">
            <DashboardButton onClick={handleSave} status={status} />
          </div>
        </div>
      </div>

      {/* Section 3: Your Address */}
      <div className="bg-white rounded-[24px] md:rounded-[30px] border border-slate-50 shadow-[0_0_80px_rgba(0,0,0,0.03)] p-5 sm:p-10 xl:p-12 mb-8 hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] transition-all group/section">
        <h3 className="text-[18px] font-bold text-[#002333] mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
          Your Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown(
            "country",
            "Country",
            Globe,
            dropdownOptions.countries,
          )}

          {renderDropdown("city", "City", Building2, dropdownOptions.cities)}

          {renderInput("latitude", "Latitude", MapPin)}
          {renderInput("longitude", "Longitude", MapPin)}

          <div className="md:col-span-2">
            {renderInput("address", "Full Address", MapPin)}
          </div>

          <div className="md:col-span-2 mt-4">
            <DashboardButton onClick={handleSave} status={status} />
          </div>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#002333]">
                Upload Profile Image
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#5BBB7B]/10 flex items-center justify-center text-[#5BBB7B] mb-2 shadow-inner">
                <Upload size={32} />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-[#002333]">
                  Upload your photo
                </h4>
                <p className="text-sm font-medium text-slate-500">
                  Supports: JPG, PNG, GIF (Max 1MB)
                </p>
                {uploadError && (
                  <p className="text-sm font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                    {uploadError}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  type="file"
                  className="hidden"
                  id="modal-upload"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="modal-upload"
                  className="flex items-center justify-center w-full px-6 py-4 bg-[#5BBB7B] text-white text-base font-bold rounded-xl cursor-pointer hover:bg-[#4a9b65] transition-all shadow-lg shadow-[#5BBB7B]/20 transform active:scale-95"
                >
                  Choose File
                </label>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
