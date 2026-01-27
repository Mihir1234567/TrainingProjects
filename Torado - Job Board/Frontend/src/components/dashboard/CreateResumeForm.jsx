import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Briefcase,
  Layout,
  FileText,
  GraduationCap,
  Calendar,
  Building2,
  Percent,
  Plus,
  XCircle,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import CustomDropdown from "../common/CustomDropdown";
import Toast from "../common/Toast";
import DashboardButton from "../common/DashboardButton";

const CreateResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobCategory: "",
    professionalTitle: "",
    resumeContent: "",
    education: [
      {
        id: Date.now(),
        schoolName: "",
        qualification: "",
        eduStartDate: "",
        eduEndDate: "",
        eduNotes: "",
      },
    ],
    experience: [
      {
        id: Date.now() + 1,
        employer: "",
        jobTitle: "",
        expStartDate: "",
        expEndDate: "",
        expNotes: "",
      },
    ],
    skills: [
      {
        id: Date.now() + 2,
        skillName: "",
        skillPercentage: "",
      },
    ],
  });

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  const [status, setStatus] = useState("idle");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  // Calculate Progress
  useEffect(() => {
    const calculateProgress = () => {
      const coreFields = [
        "name",
        "email",
        "jobCategory",
        "professionalTitle",
        "resumeContent",
      ];
      let filledFields = coreFields.filter(
        (field) => formData[field]?.length > 0,
      ).length;

      // Check if at least one entry has some data in arrays
      const hasEdu = formData.education.some(
        (edu) => edu.schoolName || edu.qualification,
      );
      const hasExp = formData.experience.some(
        (exp) => exp.employer || exp.jobTitle,
      );
      const hasSkills = formData.skills.some((skill) => skill.skillName);

      if (hasEdu) filledFields++;
      if (hasExp) filledFields++;
      if (hasSkills) filledFields++;
      if (selectedFile) filledFields++;

      const totalRequired = coreFields.length + 4; // core + edu + exp + skills + photo
      const newProgress = Math.round((filledFields / totalRequired) * 100);
      setProgress(newProgress);
    };
    calculateProgress();
  }, [formData, selectedFile]);

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

  const handleArrayChange = (section, id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => {
        if (item.id === id) {
          const newItem = { ...item, [field]: value };

          // Date Range Protection
          if (field === "eduEndDate" || field === "eduStartDate") {
            const start = field === "eduStartDate" ? value : item.eduStartDate;
            const end = field === "eduEndDate" ? value : item.eduEndDate;
            if (start && end && new Date(end) < new Date(start)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                [`${section}-${id}-date`]:
                  "End date cannot be before start date",
              }));
            } else {
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[`${section}-${id}-date`];
                return newErrors;
              });
            }
          }

          if (field === "expEndDate" || field === "expStartDate") {
            const start = field === "expStartDate" ? value : item.expStartDate;
            const end = field === "expEndDate" ? value : item.expEndDate;
            if (start && end && new Date(end) < new Date(start)) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                [`${section}-${id}-date`]:
                  "End date cannot be before start date",
              }));
            } else {
              setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[`${section}-${id}-date`];
                return newErrors;
              });
            }
          }

          return newItem;
        }
        return item;
      }),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          schoolName: "",
          qualification: "",
          eduStartDate: "",
          eduEndDate: "",
          eduNotes: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    if (formData.education.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          employer: "",
          jobTitle: "",
          expStartDate: "",
          expEndDate: "",
          expNotes: "",
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    if (formData.experience.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now(),
          skillName: "",
          skillPercentage: "",
        },
      ],
    }));
  };

  const removeSkill = (id) => {
    if (formData.skills.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "jobCategory",
      "professionalTitle",
      "resumeContent",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email Check
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Check for date errors (Start Date > End Date)
    formData.education.forEach((edu) => {
      if (
        edu.eduStartDate &&
        edu.eduEndDate &&
        new Date(edu.eduStartDate) > new Date(edu.eduEndDate)
      ) {
        newErrors[`education-${edu.id}-date`] =
          "End date cannot be before start date";
      }
    });

    formData.experience.forEach((exp) => {
      if (
        exp.expStartDate &&
        exp.expEndDate &&
        new Date(exp.expStartDate) > new Date(exp.expEndDate)
      ) {
        newErrors[`experience-${exp.id}-date`] =
          "End date cannot be before start date";
      }
    });

    // Skill Percentage Check (0-100)
    formData.skills.forEach((skill) => {
      if (skill.skillPercentage) {
        const pct = parseInt(skill.skillPercentage);
        if (isNaN(pct) || pct < 0 || pct > 100) {
          newErrors[`skill-${skill.id}-pct`] = "0-100";
        }
      }
    });

    // Check for existing date errors from state
    Object.keys(errors).forEach((errKey) => {
      if (errKey.includes("-date")) {
        newErrors[errKey] = errors[errKey];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (status !== "idle") return;

    if (!validateForm()) {
      // Auto-scroll to first error
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
        message: "Resume saved successfully!",
        type: "success",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setToast({
          isVisible: true,
          message: "File is too large (Max 2MB)",
          type: "error",
        });
        return;
      }
      setSelectedFile({
        name: file.name,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const options = {
    categories: [
      "Development",
      "Web Design",
      "Multimedia",
      "Marketing",
      "Finance",
    ],
  };

  const renderInput = (id, label, Icon, type = "text", props = {}) => {
    const { value, onChange, error, ...restProps } = props;
    const finalValue = value !== undefined ? value : formData[id];
    const finalError = error !== undefined ? error : errors[id];
    const finalOnChange = onChange
      ? onChange
      : (e) => handleChange(id, e.target.value);

    return (
      <div className="relative group/field">
        <input
          id={id}
          type={type}
          placeholder=" "
          value={finalValue}
          onChange={finalOnChange}
          className={`peer w-full h-[60px] pl-16 pr-5 bg-white border ${
            finalError
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-slate-100 ring-4 ring-transparent"
          } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
          {...restProps}
        />
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            finalError
              ? "bg-red-50 text-red-400"
              : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
          }`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <label
          htmlFor={id}
          className={`absolute left-16 top-1/2 -translate-y-1/2 ${
            finalError ? "text-red-400" : "text-slate-400"
          } text-[15px] font-bold transition-all pointer-events-none
                     peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
        >
          {label}
        </label>
        {finalError && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
            <XCircle size={12} /> {finalError}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-transparent p-0 border-none relative">
      {/* Visual Progress Tracker */}
      <div className="fixed top-[72px] left-0 right-0 z-[100] h-1.5 bg-slate-100 xl:relative xl:top-0 xl:mb-10 xl:rounded-full xl:overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-[#5BBB7B] to-[#40a362] shadow-[0_0_15px_rgba(91,187,123,0.5)]"
        />
        <div className="absolute right-0 -bottom-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest xl:hidden">
          {progress}% Complete
        </div>
      </div>

      <div className="hidden xl:flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5BBB7B]/10 flex items-center justify-center text-[#5BBB7B]">
            {progress === 100 ? (
              <CheckCircle2 size={24} />
            ) : (
              <div className="text-sm font-bold">{progress}%</div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#002333]">
              Profile Completion
            </h4>
            <p className="text-xs text-slate-400">
              Fill all details for a better reach
            </p>
          </div>
        </div>
      </div>

      <form
        className="space-y-8 md:space-y-12"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Basic Information Section */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-12 border border-slate-100/50 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Create Resume
            </h3>

            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="mb-6">
                <p className="text-[15px] font-medium text-[#002333] mb-4">
                  Upload Photo
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {selectedFile ? (
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-slate-300" size={32} />
                    )}
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <input
                      type="file"
                      id="photo-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="photo-upload"
                      className="relative overflow-hidden group inline-flex items-center gap-2 px-6 py-2.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg font-bold text-sm transition-all cursor-pointer shadow-sm group-hover/section:bg-[#5BBB7B] group-hover/section:text-white"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <Upload size={16} />
                        Upload Photo
                      </span>
                    </label>
                    <p className="text-xs text-slate-400 mt-2">
                      Max file size: 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput("name", "Your Name", User)}
                {renderInput("email", "Email", Mail, "email")}
              </div>

              {/* Category & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="jobCategory" className="space-y-1.5">
                  <CustomDropdown
                    options={options.categories}
                    placeholder="Job Category"
                    value={formData.jobCategory}
                    onChange={(val) => handleChange("jobCategory", val)}
                    icon={Layout}
                    error={errors.jobCategory}
                  />
                  {errors.jobCategory && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.jobCategory}
                    </p>
                  )}
                </div>
                {renderInput(
                  "professionalTitle",
                  "Professional Title",
                  Briefcase,
                )}
              </div>

              {/* Resume Content */}
              <div className="relative group/field pb-1">
                <textarea
                  id="resumeContent"
                  placeholder=" "
                  value={formData.resumeContent}
                  maxLength={2000}
                  onChange={(e) =>
                    handleChange("resumeContent", e.target.value)
                  }
                  className={`peer w-full h-44 pl-16 pr-5 py-6 bg-white border ${
                    errors.resumeContent
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-slate-100 ring-4 ring-transparent"
                  } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
                ></textarea>
                <div
                  className={`absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    errors.resumeContent
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                  }`}
                >
                  <FileText size={18} strokeWidth={2.5} />
                </div>
                <label
                  htmlFor="resumeContent"
                  className={`absolute left-16 top-6 ${
                    errors.resumeContent ? "text-red-400" : "text-slate-400"
                  } text-[15px] font-bold transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                >
                  Resume Content
                </label>
                <div className="absolute right-4 bottom-2 text-[10px] font-bold text-slate-300">
                  {formData.resumeContent.length}/2000
                </div>
                {errors.resumeContent && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
                    <XCircle size={12} /> {errors.resumeContent}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Details */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-12 border border-slate-100/50 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Education Details
            </h3>

            <div className="space-y-12">
              <AnimatePresence>
                {formData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative pt-8 first:pt-0 border-t first:border-t-0 border-slate-100 space-y-6"
                  >
                    {index > 0 && (
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute right-0 top-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        {renderInput(
                          `schoolName-${edu.id}`,
                          "School Name",
                          Building2,
                          "text",
                          {
                            value: edu.schoolName,
                            onChange: (e) =>
                              handleArrayChange(
                                "education",
                                edu.id,
                                "schoolName",
                                e.target.value,
                              ),
                          },
                        )}
                      </div>

                      <div className="md:col-span-2">
                        {renderInput(
                          `qualification-${edu.id}`,
                          "Qualification",
                          GraduationCap,
                          "text",
                          {
                            value: edu.qualification,
                            onChange: (e) =>
                              handleArrayChange(
                                "education",
                                edu.id,
                                "qualification",
                                e.target.value,
                              ),
                          },
                        )}
                      </div>

                      {renderInput(
                        `eduStartDate-${edu.id}`,
                        "Start Date",
                        Calendar,
                        "text",
                        {
                          value: edu.eduStartDate,
                          onChange: (e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "eduStartDate",
                              e.target.value,
                            ),
                          onFocus: (e) => (e.target.type = "date"),
                          onBlur: (e) => (e.target.type = "text"),
                        },
                      )}

                      {renderInput(
                        `eduEndDate-${edu.id}`,
                        "End Date",
                        Calendar,
                        "text",
                        {
                          value: edu.eduEndDate,
                          onChange: (e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "eduEndDate",
                              e.target.value,
                            ),
                          onFocus: (e) => (e.target.type = "date"),
                          onBlur: (e) => (e.target.type = "text"),
                          error: errors[`education-${edu.id}-date`],
                        },
                      )}

                      <div className="relative group/field md:col-span-2">
                        <textarea
                          id={`eduNotes-${edu.id}`}
                          placeholder=" "
                          value={edu.eduNotes}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "eduNotes",
                              e.target.value,
                            )
                          }
                          className="peer w-full h-32 pl-14 pr-5 py-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                        ></textarea>
                        <div className="absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                          <FileText size={18} strokeWidth={2.5} />
                        </div>
                        <label
                          htmlFor={`eduNotes-${edu.id}`}
                          className="absolute left-16 top-6 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                        >
                          Notes (Optional)
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addEducation}
                className="relative overflow-hidden group flex items-center gap-2 px-8 py-3.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-xl font-bold text-sm transition-all shadow-sm group-hover/section:bg-[#5BBB7B] group-hover/section:text-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Plus size={18} />
                  Add Education
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Experience Details */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-12 border border-slate-100/50 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Experience Details
            </h3>

            <div className="space-y-12">
              <AnimatePresence>
                {formData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative pt-8 first:pt-0 border-t first:border-t-0 border-slate-100 space-y-6"
                  >
                    {index > 0 && (
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute right-0 top-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        {renderInput(
                          `employer-${exp.id}`,
                          "Employer",
                          Building2,
                          "text",
                          {
                            value: exp.employer,
                            onChange: (e) =>
                              handleArrayChange(
                                "experience",
                                exp.id,
                                "employer",
                                e.target.value,
                              ),
                          },
                        )}
                      </div>

                      <div className="md:col-span-2">
                        {renderInput(
                          `jobTitle-${exp.id}`,
                          "Job Title",
                          Briefcase,
                          "text",
                          {
                            value: exp.jobTitle,
                            onChange: (e) =>
                              handleArrayChange(
                                "experience",
                                exp.id,
                                "jobTitle",
                                e.target.value,
                              ),
                          },
                        )}
                      </div>

                      {renderInput(
                        `expStartDate-${exp.id}`,
                        "Start Date",
                        Calendar,
                        "text",
                        {
                          value: exp.expStartDate,
                          onChange: (e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "expStartDate",
                              e.target.value,
                            ),
                          onFocus: (e) => (e.target.type = "date"),
                          onBlur: (e) => (e.target.type = "text"),
                        },
                      )}

                      {renderInput(
                        `expEndDate-${exp.id}`,
                        "End Date",
                        Calendar,
                        "text",
                        {
                          value: exp.expEndDate,
                          onChange: (e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "expEndDate",
                              e.target.value,
                            ),
                          onFocus: (e) => (e.target.type = "date"),
                          onBlur: (e) => (e.target.type = "text"),
                          error: errors[`experience-${exp.id}-date`],
                        },
                      )}

                      <div className="relative group/field md:col-span-2">
                        <textarea
                          id={`expNotes-${exp.id}`}
                          placeholder=" "
                          value={exp.expNotes}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "expNotes",
                              e.target.value,
                            )
                          }
                          className="peer w-full h-32 pl-14 pr-5 py-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
                        ></textarea>
                        <div className="absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                          <FileText size={18} strokeWidth={2.5} />
                        </div>
                        <label
                          htmlFor={`expNotes-${exp.id}`}
                          className="absolute left-16 top-6 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
                        >
                          Notes (Optional)
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addExperience}
                className="relative overflow-hidden group flex items-center gap-2 px-8 py-3.5 bg-[#1967D2]/10 text-[#1967D2] rounded-xl font-bold text-sm transition-all shadow-sm group-hover/section:bg-[#1967D2] group-hover/section:text-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Plus size={18} />
                  Add Experience
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skills Details */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-12 border border-slate-100/50 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group/section"
        >
          <div className="text-left">
            <h3 className="text-[18px] font-bold text-[#002333] mb-6 md:mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
              Skills Details
            </h3>

            <div className="space-y-6">
              <AnimatePresence>
                {formData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row gap-6 relative group/skill"
                  >
                    <div className="flex-1">
                      {renderInput(
                        `skillName-${skill.id}`,
                        "Skills Name",
                        Briefcase,
                        "text",
                        {
                          value: skill.skillName,
                          onChange: (e) =>
                            handleArrayChange(
                              "skills",
                              skill.id,
                              "skillName",
                              e.target.value,
                            ),
                        },
                      )}
                    </div>

                    <div className="sm:w-48">
                      {renderInput(
                        `skillPercentage-${skill.id}`,
                        "Percentage",
                        Percent,
                        "text",
                        {
                          value: skill.skillPercentage,
                          onChange: (e) =>
                            handleArrayChange(
                              "skills",
                              skill.id,
                              "skillPercentage",
                              e.target.value,
                            ),
                          error: errors[`skill-${skill.id}-pct`],
                        },
                      )}
                    </div>

                    {index > 0 && (
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="self-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addSkill}
                className="relative overflow-hidden group flex items-center gap-2 px-8 py-3.5 bg-[#1967D2]/10 text-[#1967D2] rounded-xl font-bold text-sm transition-all shadow-sm group-hover/section:bg-[#1967D2] group-hover/section:text-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Plus size={18} />
                  Add Skills
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-start">
          <DashboardButton
            onClick={handleSave}
            status={status}
            defaultText="Save & Preview"
            successText="Saved!"
          />
        </div>
      </form>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default CreateResumeForm;
