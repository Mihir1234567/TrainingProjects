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

import { userAPI, uploadAPI } from "../../services/api";
import FileUploader from "../../components/common/FileUploader";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
  const { updateUser } = useAuth();
  const [profileImage, setProfileImage] = useState(USER_PROFILE.avatar);
  const [imageAction, setImageAction] = useState(null); // Local state for crop data
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
          isFreelancer: user.isFreelancer || false, // New field
        });
        if (user.image) setProfileImage(user.image);
        if (user.imageAction) setImageAction(user.imageAction);
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
    // const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`; // Dont overwrite email

    setFormData({
      ...formData, // Keep existing fields (like email)
      fullName: `${firstName} ${lastName}`,
      // email: email, // Keep existing email
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

  const handleImageSuccess = (path, cropData) => {
    setProfileImage(path);
    setImageAction(cropData);
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
        imageAction: imageAction,
        isFreelancer: formData.isFreelancer, // Include in update
        socialLinks: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
        },
      };

      await userAPI.updateProfile(payload);

      // Update global auth state to refresh Navbar
      updateUser({
        name: formData.fullName,
        image: profileImage,
      });

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
            <div className="w-40 h-40 md:w-52 md:h-52 mx-auto lg:mx-0">
              <FileUploader
                initialValue={profileImage}
                initialCrop={imageAction}
                onUploadSuccess={handleImageSuccess}
                label="Profile Photo"
                accept="image/*"
                isCircular={true}
              />
            </div>
          </div>

          {/* Freelancer Toggle Section */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${formData.isFreelancer ? "bg-[#5BBB7B]/10 text-[#5BBB7B]" : "bg-slate-200 text-slate-400"}`}
                  >
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#002333]">
                      Freelance Status
                    </h4>
                    <p className="text-[13px] text-slate-500">
                      Are you open to freelance projects?
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isFreelancer}
                    onChange={(e) =>
                      handleChange("isFreelancer", e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5BBB7B]"></div>
                </label>
              </div>

              {formData.isFreelancer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-fade-in-up">
                  {renderDropdown(
                    "currentSalary",
                    "Hourly Rate ($/hr)",
                    DollarSign,
                    ["$10-$30", "$30-$60", "$60-$100", "$100+"],
                  )}
                  {renderDropdown(
                    "jobCategory",
                    "Core Service",
                    Wand2,
                    dropdownOptions.categories,
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

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
    </div>
  );
};

export default MyProfile;
