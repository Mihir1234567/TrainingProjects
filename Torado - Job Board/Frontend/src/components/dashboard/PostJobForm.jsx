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
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import CustomDropdown from "../common/CustomDropdown";
import Toast from "../common/Toast";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../../context/MockDataContext";
import DashboardButton from "../common/DashboardButton";

const PostJobForm = () => {
  const navigate = useNavigate();
  const { addJob } = useMockData();

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

  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;
    let stepFields = [];

    if (step === 1) {
      stepFields = [
        "jobTitle",
        "category",
        "jobTypes",
        "description",
        "deadline",
      ];
    } else if (step === 2) {
      stepFields = [
        "companyName",
        "companyCategory",
        "companyType",
        "gender",
        "jobApplyType",
        "salaryType",
      ];
    } else if (step === 3) {
      stepFields = [
        "minSalary",
        "maxSalary",
        "experience",
        "qualification",
        "careerLevel",
        "address",
        "location",
        "industry",
      ];

      // Logical Validation (Min Salary <= Max Salary)
      if (formData.minSalary && formData.maxSalary) {
        const min = parseFloat(formData.minSalary);
        const max = parseFloat(formData.maxSalary);
        if (!isNaN(min) && !isNaN(max) && min > max) {
          newErrors.minSalary = "Min > Max";
          newErrors.maxSalary = "Min > Max";
          isValid = false;
        }
      }
      // URL Validation
      if (formData.videoUrl) {
        const urlPattern =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlPattern.test(formData.videoUrl)) {
          newErrors.videoUrl = "Invalid URL";
          isValid = false;
        }
      }
    }

    stepFields.forEach((field) => {
      // Check for empty string or empty array (if applicable)
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] = "Required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublish = () => {
    if (status !== "idle") return;

    if (!validateStep(3)) {
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      // Mock Data Save
      addJob(formData);

      setStatus("success");
      setToast({
        isVisible: true,
        message: "Your job has been published successfully!",
        type: "success",
      });
      setTimeout(() => {
        setStatus("idle");
        navigate("/jobs"); // Redirect to Job Listing
      }, 2000);
    }, 1500);
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

  const renderInput = (id, label, Icon, type = "text", props = {}) => (
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
        {...props}
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
    <div className="space-y-1.5">
      <CustomDropdown
        options={options}
        placeholder={label}
        value={formData[field]}
        onChange={(val) => handleChange(field, val)}
        icon={Icon}
        error={errors[field]}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-fade-in">
          <XCircle size={12} /> {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-transparent p-0 border-none max-w-5xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-12 relative">
        <div className="flex justify-between items-center relative z-10">
          {[
            { id: 1, label: "Job Details", icon: Briefcase },
            { id: 2, label: "Company Info", icon: Building2 },
            { id: 3, label: "Salary & More", icon: DollarSign },
          ].map((step, idx) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-3 relative"
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      isCompleted || isActive ? "#5BBB7B" : "#fff",
                    borderColor:
                      isCompleted || isActive ? "#5BBB7B" : "#e2e8f0",
                    color: isCompleted || isActive ? "#fff" : "#94a3b8",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                    isActive
                      ? "shadow-[#5BBB7B]/20 ring-4 ring-[#5BBB7B]/10"
                      : ""
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <StepIcon size={20} />
                  )}
                </motion.div>
                <div className="text-center">
                  <p
                    className={`text-[12px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                      isActive ? "text-[#5BBB7B]" : "text-slate-400"
                    }`}
                  >
                    Step {step.id}
                  </p>
                  <p
                    className={`text-[14px] font-bold transition-colors duration-500 hidden sm:block ${
                      isActive ? "text-[#002333]" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {/* Connector Line */}
                {idx < 2 && (
                  <div className="absolute left-[calc(100%+1rem)] top-6 w-[calc(100vw/5)] hidden lg:block -translate-y-1/2">
                    <div className="h-[2px] bg-slate-100 w-full relative">
                      <motion.div
                        initial={false}
                        animate={{ width: isCompleted ? "100%" : "0%" }}
                        className="absolute h-full bg-[#5BBB7B] transition-all duration-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form
        className="space-y-8 md:space-y-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section">
                <div className="text-left">
                  <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                    Job Information
                  </h3>

                  <div className="space-y-6">
                    {renderInput("jobTitle", "Job Title", Briefcase)}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderDropdown(
                        "category",
                        "Category",
                        Layout,
                        options.categories,
                      )}
                      {renderDropdown(
                        "jobTypes",
                        "Job Types",
                        Clock,
                        options.jobTypes,
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput(
                        "deadline",
                        "Application Deadline",
                        Calendar,
                        "text",
                        {
                          onFocus: (e) => (e.target.type = "date"),
                          onBlur: (e) => (e.target.type = "text"),
                        },
                      )}
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
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        className={`peer w-full h-44 pl-16 pr-5 py-6 bg-white border ${
                          errors.description
                            ? "border-red-500 ring-1 ring-red-500/20"
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
                        <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
                          <XCircle size={12} /> {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section">
                <div className="text-left">
                  <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                    Company Information
                  </h3>

                  <div className="space-y-6">
                    {renderInput("companyName", "Company Name", Building2)}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput(
                        "companyCategory",
                        "Category",
                        Layout,
                        "text",
                      )}
                      {renderDropdown(
                        "companyType",
                        "Type",
                        Type,
                        options.companyTypes,
                      )}
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
                      {renderDropdown(
                        "gender",
                        "Gender",
                        User,
                        options.genders,
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput("jobApplyType", "Job Apply Type", Globe)}
                      {renderDropdown(
                        "salaryType",
                        "Salary Type",
                        DollarSign,
                        options.salaryTypes,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section">
                <div className="text-left">
                  <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                    Salary & Requirements
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput("minSalary", "Min. Salary", DollarSign)}
                    {renderInput("maxSalary", "Max. Salary", DollarSign)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {renderDropdown(
                      "experience",
                      "Experience",
                      Star,
                      options.experience,
                    )}
                    {renderInput("careerLevel", "Career Level", BarChart)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {renderInput(
                      "qualification",
                      "Qualification",
                      GraduationCap,
                    )}
                    {renderInput("videoUrl", "Intro Video URL", Youtube)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {renderInput("address", "Friendly Address", MapPin)}
                    {renderInput("location", "Location", MapPin)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {renderInput("industry", "Company Industry", Globe)}
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="bg-white rounded-[30px] shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14 border border-slate-50 transition-all hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] group/section">
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
                              <div className="space-y-1">
                                <p className="text-red-600 text-sm md:text-[16px] font-bold">
                                  {fileError}
                                </p>
                                <p className="text-red-400 text-xs md:text-sm">
                                  Please select a smaller file.
                                </p>
                              </div>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="pt-12 flex items-center justify-center gap-6 border-t border-slate-100">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-8 h-14 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-10 h-14 rounded-2xl bg-[#5BBB7B] text-white font-bold hover:bg-[#4a9d66] hover:shadow-lg transition-all shadow-[#5BBB7B]/20 flex items-center gap-2"
            >
              Next Step
              <ArrowRight size={18} />
            </button>
          ) : (
            <DashboardButton
              onClick={handlePublish}
              status={status}
              defaultText="Publish Job"
              successText="Job Published!"
              className="!w-auto px-12"
            />
          )}
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
