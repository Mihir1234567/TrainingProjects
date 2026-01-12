import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Building2,
  Tag,
  MapPin,
  Globe,
  Youtube,
  GraduationCap,
  Star,
  BarChart,
  Clock,
  Layout,
  User,
  Type,
  FileText,
  X,
  Loader2,
  Check,
  File,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import CustomDropdown from "../common/CustomDropdown";
import Toast from "../common/Toast";

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    jobTypes: "",
    deadline: "",
    salaryCurrency: "",
    description: "",
    companyName: "",
    companyCategory: "",
    companyType: "",
    tags: [],
    gender: "",
    jobApplyType: "",
    salaryType: "",
    minSalary: "",
    maxSalary: "",
    experience: "",
    careerLevel: "",
    qualification: "",
    videoUrl: "",
    deadlineDate: "",
    address: "",
    location: "",
    industry: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  const [status, setStatus] = useState("idle");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");

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

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "jobTitle",
      "category",
      "jobTypes",
      "deadline",
      "description",
      "companyName",
      "companyCategory",
      "companyType",
      "address",
      "location",
    ];

    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (status !== "idle") return;

    if (!validateForm()) {
      setToast({
        isVisible: true,
        message: "Please fill in all required fields marked in red.",
        type: "error",
      });
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setToast({
        isVisible: true,
        message: "Your job has been published successfully!",
        type: "success",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File is too large (Max 2MB)");
        return;
      }
      setSelectedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      });
    }
  };

  const options = {
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
    jobTypes: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
    currencies: ["USD", "EUR", "GBP", "INR", "BTC"],
    companyTypes: [
      "Private",
      "Public",
      "Government",
      "Non-Profit",
      "Self-Employed",
    ],
    genders: ["Male", "Female", "Both"],
    salaryTypes: ["Hourly", "Monthly", "Yearly"],
    experience: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years", "10+ Years"],
  };

  return (
    <div className="bg-transparent p-0 border-none">
      <form className="space-y-8 md:space-y-12">
        {/* Job Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Job Information
            </h3>

            <div className="space-y-6">
              <div className="relative group/field">
                <input
                  id="jobTitle"
                  type="text"
                  placeholder=" "
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                    errors.jobTitle
                      ? "border-red-400 ring-4 ring-red-400/5"
                      : "border-slate-100 ring-4 ring-transparent"
                  } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                />
                <div
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    errors.jobTitle
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                  }`}
                >
                  <Briefcase size={18} strokeWidth={2.5} />
                </div>
                <label
                  htmlFor="jobTitle"
                  className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                    errors.jobTitle ? "text-red-400" : "text-slate-400"
                  } text-[15px] font-bold transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                >
                  Job Title
                </label>
                {errors.jobTitle && (
                  <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                    <XCircle size={14} /> {errors.jobTitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="category" className="space-y-1.5">
                  <CustomDropdown
                    options={options.categories}
                    placeholder="Category"
                    value={formData.category}
                    onChange={(val) => handleChange("category", val)}
                    icon={Layout}
                    error={errors.category}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.category}
                    </p>
                  )}
                </div>
                <div id="jobTypes" className="space-y-1.5">
                  <CustomDropdown
                    options={options.jobTypes}
                    placeholder="Job Types"
                    value={formData.jobTypes}
                    onChange={(val) => handleChange("jobTypes", val)}
                    icon={Clock}
                    error={errors.jobTypes}
                  />
                  {errors.jobTypes && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.jobTypes}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="deadline"
                    type="text"
                    placeholder=" "
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={formData.deadline}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                      errors.deadline
                        ? "border-red-400 ring-4 ring-red-400/5"
                        : "border-slate-100 ring-4 ring-transparent"
                    } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                  />
                  <div
                    className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      errors.deadline
                        ? "bg-red-50 text-red-400"
                        : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                    }`}
                  >
                    <Calendar size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="deadline"
                    className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                      errors.deadline ? "text-red-400" : "text-slate-400"
                    } text-[15px] font-bold transition-all pointer-events-none
                                peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                  >
                    Application Deadline
                  </label>
                  {errors.deadline && (
                    <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                      <XCircle size={14} /> {errors.deadline}
                    </p>
                  )}
                </div>
                <CustomDropdown
                  options={options.currencies}
                  placeholder="Salary Currency"
                  value={formData.salaryCurrency}
                  onChange={(val) => handleChange("salaryCurrency", val)}
                  icon={DollarSign}
                />
              </div>

              <div className="relative group/field">
                <textarea
                  id="description"
                  placeholder=" "
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`peer w-full h-44 pl-16 pr-5 py-6 bg-white border ${
                    errors.description
                      ? "border-red-400 ring-4 ring-red-400/5"
                      : "border-slate-100 ring-4 ring-transparent"
                  } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow resize-none`}
                ></textarea>
                <div
                  className={`absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    errors.description
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                  }`}
                >
                  <FileText size={18} strokeWidth={2.5} />
                </div>
                <label
                  htmlFor="description"
                  className={`absolute left-16 top-6 ${
                    errors.description ? "text-red-400" : "text-slate-400"
                  } text-[15px] font-bold transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                >
                  Job Description
                </label>
                {errors.description && (
                  <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                    <XCircle size={14} /> {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Company Information
            </h3>

            <div className="space-y-6">
              <div className="relative group/field">
                <input
                  id="companyName"
                  type="text"
                  placeholder=" "
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                    errors.companyName
                      ? "border-red-400 ring-4 ring-red-400/5"
                      : "border-slate-100 ring-4 ring-transparent"
                  } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                />
                <div
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    errors.companyName
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                  }`}
                >
                  <Building2 size={18} strokeWidth={2.5} />
                </div>
                <label
                  htmlFor="companyName"
                  className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                    errors.companyName ? "text-red-400" : "text-slate-400"
                  } text-[15px] font-bold transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                >
                  Company Name
                </label>
                {errors.companyName && (
                  <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                    <XCircle size={14} /> {errors.companyName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="companyCategory" className="space-y-1.5">
                  <div className="relative group/field">
                    <input
                      id="companyCategory"
                      type="text"
                      placeholder=" "
                      value={formData.companyCategory}
                      onChange={(e) =>
                        handleChange("companyCategory", e.target.value)
                      }
                      className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                        errors.companyCategory
                          ? "border-red-400 ring-4 ring-red-400/5"
                          : "border-slate-100 ring-4 ring-transparent"
                      } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                    />
                    <div
                      className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        errors.companyCategory
                          ? "bg-red-50 text-red-400"
                          : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                      }`}
                    >
                      <Layout size={18} strokeWidth={2.5} />
                    </div>
                    <label
                      htmlFor="companyCategory"
                      className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                        errors.companyCategory
                          ? "text-red-400"
                          : "text-slate-400"
                      } text-[15px] font-bold transition-all pointer-events-none
                                 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                    >
                      Category
                    </label>
                  </div>
                  {errors.companyCategory && (
                    <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                      <XCircle size={14} /> {errors.companyCategory}
                    </p>
                  )}
                </div>
                <div id="companyType" className="space-y-1.5">
                  <CustomDropdown
                    options={options.companyTypes}
                    placeholder="Type"
                    value={formData.companyType}
                    onChange={(val) => handleChange("companyType", val)}
                    icon={Type}
                    error={errors.companyType}
                  />
                  {errors.companyType && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.companyType}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/tag">
                  <Tag
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/tag:text-[#5BBB7B] transition-colors"
                    size={20}
                  />
                  <div className="w-full min-h-14 pl-14 pr-5 py-2.5 bg-white border border-slate-200 rounded-xl flex flex-wrap gap-2 items-center focus-within:border-[#5BBB7B] focus-within:ring-1 focus-within:ring-[#5BBB7B] transition-all">
                    {formData.tags.map((tag, index) => (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF2FC] text-[#5569CC] rounded-full text-[13px] font-semibold border border-[#5569CC]/10 hover:bg-[#5569CC] hover:text-white transition-all cursor-default"
                      >
                        {tag}
                        <X
                          size={14}
                          className="cursor-pointer hover:scale-120 transition-transform"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </motion.span>
                    ))}
                    <input
                      type="text"
                      placeholder={
                        formData.tags.length === 0
                          ? "Add Tags (Press Enter)"
                          : ""
                      }
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="flex-1 min-w-[120px] h-8 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none text-[15px]"
                    />
                  </div>
                </div>
                <CustomDropdown
                  options={options.genders}
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={(val) => handleChange("gender", val)}
                  icon={User}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="jobApplyType"
                    type="text"
                    placeholder=" "
                    value={formData.jobApplyType}
                    onChange={(e) =>
                      handleChange("jobApplyType", e.target.value)
                    }
                    className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                  />
                  <Globe
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                    size={20}
                  />
                  <label
                    htmlFor="jobApplyType"
                    className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                  >
                    Job Apply Type
                  </label>
                </div>
                <CustomDropdown
                  options={options.salaryTypes}
                  placeholder="Salary Type"
                  value={formData.salaryType}
                  onChange={(val) => handleChange("salaryType", val)}
                  icon={DollarSign}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="minSalary"
                    type="text"
                    placeholder=" "
                    value={formData.minSalary}
                    onChange={(e) => handleChange("minSalary", e.target.value)}
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <DollarSign size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="minSalary"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Min. Salary
                  </label>
                </div>
                <div className="relative group/field">
                  <input
                    id="maxSalary"
                    type="text"
                    placeholder=" "
                    value={formData.maxSalary}
                    onChange={(e) => handleChange("maxSalary", e.target.value)}
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <DollarSign size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="maxSalary"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Max. Salary
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomDropdown
                  options={options.experience}
                  placeholder="Experience"
                  value={formData.experience}
                  onChange={(val) => handleChange("experience", val)}
                  icon={Star}
                />
                <div className="relative group/field">
                  <input
                    id="careerLevel"
                    type="text"
                    placeholder=" "
                    value={formData.careerLevel}
                    onChange={(e) =>
                      handleChange("careerLevel", e.target.value)
                    }
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <BarChart size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="careerLevel"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Career Level
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="qualification"
                    type="text"
                    placeholder=" "
                    value={formData.qualification}
                    onChange={(e) =>
                      handleChange("qualification", e.target.value)
                    }
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <GraduationCap size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="qualification"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Qualification
                  </label>
                </div>
                <div className="relative group/field">
                  <input
                    id="videoUrl"
                    type="text"
                    placeholder=" "
                    value={formData.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <Youtube size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="videoUrl"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Intro Video URL
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="deadlineDate"
                    type="text"
                    placeholder=" "
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={formData.deadlineDate}
                    onChange={(e) =>
                      handleChange("deadlineDate", e.target.value)
                    }
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <Calendar size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="deadlineDate"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Deadline Date
                  </label>
                </div>
                <div className="relative group/field">
                  <input
                    id="address"
                    type="text"
                    placeholder=" "
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                      errors.address
                        ? "border-red-400 ring-4 ring-red-400/5"
                        : "border-slate-100 ring-4 ring-transparent"
                    } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                  />
                  <div
                    className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      errors.address
                        ? "bg-red-50 text-red-400"
                        : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                    }`}
                  >
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="address"
                    className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                      errors.address ? "text-red-400" : "text-slate-400"
                    } text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                  >
                    Friendly Address
                  </label>
                  {errors.address && (
                    <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                      <XCircle size={14} /> {errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group/field">
                  <input
                    id="location"
                    type="text"
                    placeholder=" "
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
                      errors.location
                        ? "border-red-400 ring-4 ring-red-400/5"
                        : "border-slate-100 ring-4 ring-transparent"
                    } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                  />
                  <div
                    className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      errors.location
                        ? "bg-red-50 text-red-400"
                        : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                    }`}
                  >
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="location"
                    className={`absolute left-16 top-1/2 -translate-y-1/2 ${
                      errors.location ? "text-red-400" : "text-slate-400"
                    } text-[15px] font-bold transition-all pointer-events-none
                                peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                  >
                    Location
                  </label>
                  {errors.location && (
                    <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider animate-shake">
                      <XCircle size={14} /> {errors.location}
                    </p>
                  )}
                </div>
                <div className="relative group/field">
                  <input
                    id="industry"
                    type="text"
                    placeholder=" "
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                    <Globe size={18} strokeWidth={2.5} />
                  </div>
                  <label
                    htmlFor="industry"
                    className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                  >
                    Company Industry
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upload Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section"
        >
          <div className="text-left">
            <h4 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Upload Resume
            </h4>

            <div className="relative">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />

              <AnimatePresence mode="wait">
                {!selectedFile ? (
                  <motion.label
                    key="upload-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    htmlFor="resume-upload"
                    className={`w-full h-40 md:h-48 border-2 border-dashed ${
                      fileError
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 bg-slate-50"
                    } rounded-2xl flex flex-col items-center justify-center hover:bg-white hover:border-[#5BBB7B] transition-all cursor-pointer group/upload`}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-3 md:mb-4 group-hover/upload:scale-110 transition-transform">
                      <Upload
                        className={
                          fileError
                            ? "text-red-500"
                            : "text-[#5BBB7B] animate-pulse-subtle"
                        }
                        size={24}
                      />
                    </div>
                    <div className="text-center px-4">
                      {fileError ? (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-1"
                        >
                          <p className="text-red-600 text-sm md:text-[16px] font-bold">
                            {fileError}
                          </p>
                          <p className="text-red-400 text-xs md:text-sm">
                            Please select a smaller file.
                          </p>
                        </motion.div>
                      ) : (
                        <>
                          <p className="text-[#002333] text-sm md:text-[16px] font-bold mb-1">
                            Click here or drop files to upload
                          </p>
                          <p className="text-slate-400 text-xs md:text-sm">
                            Support for PDF, DOC, DOCX (Max 2MB)
                          </p>
                        </>
                      )}
                    </div>
                  </motion.label>
                ) : (
                  <motion.div
                    key="file-preview"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="w-full p-6 bg-[#F5F7FC] rounded-2xl border border-[#5BBB7B]/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <File className="text-[#5BBB7B]" size={24} />
                      </div>
                      <div>
                        <h5 className="font-bold text-[#002333] text-[15px]">
                          {selectedFile.name}
                        </h5>
                        <p className="text-slate-400 text-xs font-medium">
                          {selectedFile.size}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <div className="pt-8 flex justify-center">
          <button
            type="button"
            onClick={handlePublish}
            disabled={status !== "idle"}
            className={`relative w-full sm:min-w-[280px] sm:w-auto h-16 text-white font-bold rounded-[20px] overflow-hidden shadow-2xl transition-all duration-300 flex items-center justify-center group/btn-main ${
              status !== "idle"
                ? "bg-slate-400 cursor-default"
                : "bg-[#5BBB7B] hover:shadow-[#5BBB7B]/40 translate-y-0 hover:-translate-y-1"
            }`}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 relative z-10"
                >
                  <span className="text-[16px] tracking-wide">Publish Job</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn-main:rotate-12 transition-transform">
                    <Check size={18} strokeWidth={3} />
                  </div>
                </motion.div>
              )}
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="relative z-10"
                >
                  <Loader2 className="animate-spin" size={28} strokeWidth={3} />
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-3 relative z-10"
                >
                  <Check size={28} strokeWidth={3} />
                  <span className="text-[16px] tracking-wide">
                    Job Published!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Door Animation Background */}
            <span className="absolute inset-x-0 bottom-0 h-0 bg-[#002333] transition-all duration-500 ease-soft-bounce group-hover/btn-main:h-full -z-0"></span>
            <span className="absolute inset-0 border-2 border-white/20 rounded-[20px] -z-0"></span>
          </button>
        </div>
      </form>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default PostJobForm;
