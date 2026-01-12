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
        (field) => formData[field]?.length > 0
      ).length;

      // Check if at least one entry has some data in arrays
      const hasEdu = formData.education.some(
        (edu) => edu.schoolName || edu.qualification
      );
      const hasExp = formData.experience.some(
        (exp) => exp.employer || exp.jobTitle
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

    // Check for date errors
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
      setToast({
        isVisible: true,
        message: "Please correct the errors before saving.",
        type: "error",
      });
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
                <div className="relative group/field">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`peer w-full h-14 pl-14 pr-5 bg-white border ${
                      errors.name
                        ? "border-red-500 ring-1 ring-red-500/20"
                        : "border-slate-200"
                    } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                  />
                  <User
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      errors.name ? "text-red-400" : "text-slate-400"
                    } peer-focus:text-[#5BBB7B] transition-colors`}
                    size={20}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-14 top-1/2 -translate-y-1/2 ${
                      errors.name ? "text-red-400" : "text-slate-400"
                    } text-[15px] transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
                  >
                    Your Name
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="relative group/field">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`peer w-full h-14 pl-14 pr-5 bg-white border ${
                      errors.email
                        ? "border-red-500 ring-1 ring-red-500/20"
                        : "border-slate-200"
                    } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                  />
                  <Mail
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      errors.email ? "text-red-400" : "text-slate-400"
                    } peer-focus:text-[#5BBB7B] transition-colors`}
                    size={20}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-14 top-1/2 -translate-y-1/2 ${
                      errors.email ? "text-red-400" : "text-slate-400"
                    } text-[15px] transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
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
                <div className="relative group/field">
                  <input
                    id="professionalTitle"
                    type="text"
                    placeholder=" "
                    value={formData.professionalTitle}
                    onChange={(e) =>
                      handleChange("professionalTitle", e.target.value)
                    }
                    className={`peer w-full h-14 pl-14 pr-5 bg-white border ${
                      errors.professionalTitle
                        ? "border-red-500 ring-1 ring-red-500/20"
                        : "border-slate-200"
                    } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                  />
                  <Briefcase
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      errors.professionalTitle
                        ? "text-red-400"
                        : "text-slate-400"
                    } peer-focus:text-[#5BBB7B] transition-colors`}
                    size={20}
                  />
                  <label
                    htmlFor="professionalTitle"
                    className={`absolute left-14 top-1/2 -translate-y-1/2 ${
                      errors.professionalTitle
                        ? "text-red-400"
                        : "text-slate-400"
                    } text-[15px] transition-all pointer-events-none
                               peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                               peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
                  >
                    Professional Title
                  </label>
                  {errors.professionalTitle && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
                      <XCircle size={12} /> {errors.professionalTitle}
                    </p>
                  )}
                </div>
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
                  className={`peer w-full h-40 pl-14 pr-5 py-5 bg-white border ${
                    errors.resumeContent
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-slate-200"
                  } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                ></textarea>
                <FileText
                  className={`absolute left-5 top-6 ${
                    errors.resumeContent ? "text-red-400" : "text-slate-400"
                  } peer-focus:text-[#5BBB7B] transition-colors`}
                  size={20}
                />
                <label
                  htmlFor="resumeContent"
                  className={`absolute left-14 top-6 ${
                    errors.resumeContent ? "text-red-400" : "text-slate-400"
                  } text-[15px] transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
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
                      <div className="relative group/field md:col-span-2">
                        <input
                          id={`schoolName-${edu.id}`}
                          type="text"
                          placeholder=" "
                          value={edu.schoolName}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "schoolName",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <Building2
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`schoolName-${edu.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          School Name
                        </label>
                      </div>

                      <div className="relative group/field md:col-span-2">
                        <input
                          id={`qualification-${edu.id}`}
                          type="text"
                          placeholder=" "
                          value={edu.qualification}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "qualification",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <GraduationCap
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`qualification-${edu.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          Qualification
                        </label>
                      </div>

                      <div className="relative group/field">
                        <input
                          id={`eduStartDate-${edu.id}`}
                          type="text"
                          placeholder=" "
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={edu.eduStartDate}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "eduStartDate",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <Calendar
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`eduStartDate-${edu.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          Start Date
                        </label>
                      </div>

                      <div className="relative group/field">
                        <input
                          id={`eduEndDate-${edu.id}`}
                          type="text"
                          placeholder=" "
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={edu.eduEndDate}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              edu.id,
                              "eduEndDate",
                              e.target.value
                            )
                          }
                          className={`peer w-full h-14 pl-14 pr-5 bg-white border ${
                            errors[`education-${edu.id}-date`]
                              ? "border-red-500"
                              : "border-slate-200"
                          } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                        />
                        <Calendar
                          className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                            errors[`education-${edu.id}-date`]
                              ? "text-red-400"
                              : "text-slate-400"
                          } peer-focus:text-[#5BBB7B] transition-colors`}
                          size={20}
                        />
                        <label
                          htmlFor={`eduEndDate-${edu.id}`}
                          className={`absolute left-14 top-1/2 -translate-y-1/2 ${
                            errors[`education-${edu.id}-date`]
                              ? "text-red-400"
                              : "text-slate-400"
                          } text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
                        >
                          End Date
                        </label>
                        {errors[`education-${edu.id}-date`] && (
                          <div className="absolute left-1 top-[calc(100%+4px)] flex items-center gap-1 text-red-500 text-[10px] font-bold animate-fade-in">
                            <AlertCircle size={10} />{" "}
                            {errors[`education-${edu.id}-date`]}
                          </div>
                        )}
                      </div>

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
                              e.target.value
                            )
                          }
                          className="peer w-full h-32 pl-14 pr-5 py-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        ></textarea>
                        <FileText
                          className="absolute left-5 top-6 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`eduNotes-${edu.id}`}
                          className="absolute left-14 top-6 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
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
                      <div className="relative group/field md:col-span-2">
                        <input
                          id={`employer-${exp.id}`}
                          type="text"
                          placeholder=" "
                          value={exp.employer}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "employer",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <Building2
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`employer-${exp.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          Employer
                        </label>
                      </div>

                      <div className="relative group/field md:col-span-2">
                        <input
                          id={`jobTitle-${exp.id}`}
                          type="text"
                          placeholder=" "
                          value={exp.jobTitle}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "jobTitle",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <Briefcase
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`jobTitle-${exp.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          Job Title
                        </label>
                      </div>

                      <div className="relative group/field">
                        <input
                          id={`expStartDate-${exp.id}`}
                          type="text"
                          placeholder=" "
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={exp.expStartDate}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "expStartDate",
                              e.target.value
                            )
                          }
                          className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        />
                        <Calendar
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`expStartDate-${exp.id}`}
                          className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                        >
                          Start Date
                        </label>
                      </div>

                      <div className="relative group/field">
                        <input
                          id={`expEndDate-${exp.id}`}
                          type="text"
                          placeholder=" "
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={exp.expEndDate}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              exp.id,
                              "expEndDate",
                              e.target.value
                            )
                          }
                          className={`peer w-full h-14 pl-14 pr-5 bg-white border ${
                            errors[`experience-${exp.id}-date`]
                              ? "border-red-500"
                              : "border-slate-200"
                          } rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow`}
                        />
                        <Calendar
                          className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                            errors[`experience-${exp.id}-date`]
                              ? "text-red-400"
                              : "text-slate-400"
                          } peer-focus:text-[#5BBB7B] transition-colors`}
                          size={20}
                        />
                        <label
                          htmlFor={`expEndDate-${exp.id}`}
                          className={`absolute left-14 top-1/2 -translate-y-1/2 ${
                            errors[`experience-${exp.id}-date`]
                              ? "text-red-400"
                              : "text-slate-400"
                          } text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2`}
                        >
                          End Date
                        </label>
                        {errors[`experience-${exp.id}-date`] && (
                          <div className="absolute left-1 top-[calc(100%+4px)] flex items-center gap-1 text-red-500 text-[10px] font-bold animate-fade-in">
                            <AlertCircle size={10} />{" "}
                            {errors[`experience-${exp.id}-date`]}
                          </div>
                        )}
                      </div>

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
                              e.target.value
                            )
                          }
                          className="peer w-full h-32 pl-14 pr-5 py-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                        ></textarea>
                        <FileText
                          className="absolute left-5 top-6 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                          size={20}
                        />
                        <label
                          htmlFor={`expNotes-${exp.id}`}
                          className="absolute left-14 top-6 text-slate-400 text-[15px] transition-all pointer-events-none
                                     peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
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
                    <div className="relative group/field flex-1">
                      <input
                        id={`skillName-${skill.id}`}
                        type="text"
                        placeholder=" "
                        value={skill.skillName}
                        onChange={(e) =>
                          handleArrayChange(
                            "skills",
                            skill.id,
                            "skillName",
                            e.target.value
                          )
                        }
                        className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                      />
                      <Briefcase
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                        size={20}
                      />
                      <label
                        htmlFor={`skillName-${skill.id}`}
                        className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                   peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                      >
                        Skills Name
                      </label>
                    </div>

                    <div className="relative group/field sm:w-48">
                      <input
                        id={`skillPercentage-${skill.id}`}
                        type="text"
                        placeholder=" "
                        value={skill.skillPercentage}
                        onChange={(e) =>
                          handleArrayChange(
                            "skills",
                            skill.id,
                            "skillPercentage",
                            e.target.value
                          )
                        }
                        className="peer w-full h-14 pl-14 pr-5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] focus-glow"
                      />
                      <Percent
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#5BBB7B] transition-colors"
                        size={20}
                      />
                      <label
                        htmlFor={`skillPercentage-${skill.id}`}
                        className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] transition-all pointer-events-none
                                   peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                      >
                        Percentage
                      </label>
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

        <button
          onClick={handleSave}
          disabled={status === "loading" || status === "success"}
          className={`relative overflow-hidden group w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#5BBB7B]/25
            ${
              status === "success"
                ? "bg-green-500 hover:shadow-green-500/40"
                : "bg-[#5BBB7B] hover:shadow-green-500/40"
            }
          `}
        >
          <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
          <span className="relative z-10">
            {status === "loading"
              ? "Saving..."
              : status === "success"
              ? "Saved!"
              : "Save & Preview"}
          </span>
        </button>
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
