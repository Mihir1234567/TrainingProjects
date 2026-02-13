import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Plus, Trash2, Eye, ArrowLeft } from "lucide-react";

import { resumeAPI, userAPI } from "../../services/api";
import FileUploader from "../../components/common/FileUploader";
import ResumePreview from "../../components/dashboard-pages/ResumePreview"; // Import shared component

const CreateResumes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get resume ID from URL for editing
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobCategory: "",
    professionalTitle: "",
    resumeContent: "",
    education: [],
    experience: [],
    skills: [],
    image: "",
    imageAction: null,
  });

  // Check valid preview state from navigation (e.g. after creating new resume)
  useEffect(() => {
    if (location.state?.showPreview) {
      setShowPreview(true);
      // Clear state so refresh doesn't keep showing it?
      // Actually, standard behavior is fine.
    }
  }, [location.state]);

  // Fetch User Profile to pre-fill data (Only if NOT in edit mode)
  useEffect(() => {
    if (id) return; // Skip profile pre-fill if editing an existing resume

    const fetchProfile = async () => {
      try {
        const user = await userAPI.getProfile();
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          jobCategory: user.specialization || "",
          professionalTitle: user.jobTitle || "",
          image: user.image || "",
          imageAction: user.imageAction || null,
          education: user.qualification
            ? [
                {
                  school: "",
                  qualification: user.qualification,
                  startDate: "",
                  endDate: "",
                  notes: "",
                },
              ]
            : [],
          experience: user.experience
            ? [
                {
                  employer: "",
                  jobTitle: "",
                  startDate: "",
                  endDate: "",
                  notes: `Experience: ${user.experience}`,
                },
              ]
            : [],
        }));
      } catch (err) {
        console.error("Failed to fetch profile for pre-fill:", err);
      }
    };
    fetchProfile();
  }, [id]);

  // Fetch existing resume data if in edit mode
  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      setLoading(true);
      try {
        const resume = await resumeAPI.getById(id);
        if (resume) {
          // Ensure arrays exist and merge with default structure to prevent errors
          setFormData((prev) => ({
            ...prev,
            ...resume,
            education: resume.education || [],
            experience: resume.experience || [],
            skills: resume.skills || [],
          }));
        }
      } catch (err) {
        console.error("Failed to fetch resume:", err);
        alert("Failed to load resume details.");
        navigate("/user-dashboard/manage-resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  const handleImageSuccess = (path, cropData) => {
    setFormData((prev) => ({ ...prev, image: path, imageAction: cropData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Education Handlers ---
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          qualification: "",
          startDate: "",
          endDate: "",
          notes: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  // --- Experience Handlers ---
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          employer: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          notes: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData((prev) => ({ ...prev, experience: newExperience }));
  };

  // --- Skills Handlers ---
  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", percentage: "" }],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData((prev) => ({ ...prev, skills: newSkills }));
  };

  // --- Auto Fill Handler (Temporary) ---
  const handleAutoFill = () => {
    setFormData((prev) => ({
      ...prev,
      professionalTitle: "Senior Software Engineer",
      resumeContent:
        "Experienced software engineer with a proven track record of delivering high-quality web applications. Skilled in React, Node.js, and cloud technologies. Passionate about writing clean, maintainable code and mentoring junior developers.",
      skills: [
        { name: "JavaScript", percentage: "95" },
        { name: "React", percentage: "90" },
        { name: "Node.js", percentage: "85" },
        { name: "MongoDB", percentage: "80" },
        { name: "AWS", percentage: "75" },
      ],
      experience: [
        {
          employer: "Tech Corp Inc.",
          jobTitle: "Senior Developer",
          startDate: "2020-01",
          endDate: "Present",
          notes:
            "Led a team of 5 developers in building a scalable e-commerce platform. Improved site performance by 40% through code optimization and caching strategies.",
        },
        {
          employer: "Web Solutions LLC",
          jobTitle: "Full Stack Developer",
          startDate: "2018-03",
          endDate: "2019-12",
          notes:
            "Developed and maintained client websites using the MERN stack. Collaborated with designers to implement responsive user interfaces.",
        },
      ],
      education: [
        {
          school: "University of Technology",
          qualification: "Bachelor of Science in Computer Science",
          startDate: "2014-09",
          endDate: "2018-05",
          notes:
            "Graduated with Honors. Member of the Coding Club and Hackathon Team.",
        },
      ],
    }));
  };

  // --- Handle Preview Trigger ---
  const handlePreview = async (e) => {
    e.preventDefault();

    if (id) {
      // Already editing an existing resume
      setShowPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Creating a new resume -> Save first, then redirect to edit page with preview
      setLoading(true);
      try {
        const newResume = await resumeAPI.create(formData);
        if (newResume && newResume._id) {
          // Redirect to edit page with state to show preview immediately
          navigate(`/user-dashboard/edit-resume/${newResume._id}`, {
            state: { showPreview: true },
          });
        } else {
          // Fallback if no ID returned (shouldn't happen with standard API)
          setShowPreview(true);
        }
      } catch (error) {
        console.error("Failed to create resume directly from preview:", error);
        alert("Please fix form errors before previewing.");
      } finally {
        setLoading(false);
      }
    }
  };

  // --- Final Submit / Save ---
  const handleSubmit = async (shouldNavigate = true) => {
    setLoading(true);
    try {
      if (id) {
        // Update existing
        await resumeAPI.update(id, formData);
      } else {
        // Create new
        await resumeAPI.create(formData);
      }

      if (shouldNavigate) {
        navigate("/user-dashboard/manage-resumes");
      }
    } catch (error) {
      console.error("Failed to save resume:", error);
      alert(error.message || "Failed to save resume");
      throw error; // Re-throw to stop download if save fails
    } finally {
      setLoading(false);
    }
  };

  // Logic to save before download
  const handleSaveAndDownload = async () => {
    await handleSubmit(false); // Save but DO NOT navigate
  };

  if (showPreview) {
    return (
      <ResumePreview
        formData={formData}
        onEdit={() => setShowPreview(false)}
        onSave={() => handleSubmit(true)}
        loading={loading}
        onDownload={handleSaveAndDownload}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">
          {id ? "Edit Resume" : "Create Resume"}
        </h2>
        <div className="flex items-center gap-4">
          {!id && (
            <button
              type="button"
              onClick={handleAutoFill}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Auto Fill (Demo)
            </button>
          )}
          <div className="text-[13px] text-slate-400 font-medium">
            <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/user-dashboard"
              className="hover:text-[#5BBB7B] transition-colors"
            >
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5BBB7B]">
              {id ? "Edit Resume" : "Create Resume"}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePreview} className="space-y-6">
        {/* Create Resume Section */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h3 className="text-[16px] font-bold text-[#002333] mb-6 border-l-4 border-[#5BBB7B] pl-3">
            Resume Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Image Upload */}
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-2">
              <div className="w-40 shrink-0">
                <FileUploader
                  initialValue={formData.image}
                  initialCrop={formData.imageAction}
                  onUploadSuccess={handleImageSuccess}
                  label={null}
                  accept="image/*"
                  isCircular={true}
                />
              </div>
              <div className="space-y-1 pt-2 text-center sm:text-left">
                <h4 className="font-bold text-[#002333]">Profile Photo</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  This photo will be used on your resume. Upload a professional
                  picture (Max 800x800px).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#002333]">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#002333]">
                Professional Title
              </label>
              <input
                type="text"
                name="professionalTitle"
                value={formData.professionalTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Product Designer"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#002333]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#002333]">
                Job Category
              </label>
              <input
                type="text"
                name="jobCategory"
                value={formData.jobCategory}
                onChange={handleChange}
                placeholder="e.g. Design, Development"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[14px] font-bold text-[#002333]">
                Resume Content / Summary
              </label>
              <textarea
                name="resumeContent"
                value={formData.resumeContent}
                onChange={handleChange}
                rows={6}
                placeholder="Write a brief summary about your professional background and key achievements..."
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h3 className="text-[16px] font-bold text-[#002333] mb-6 border-l-4 border-[#5BBB7B] pl-3">
            Education
          </h3>

          <div className="space-y-6">
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl relative group"
              >
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    School / University
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                    placeholder="e.g. Harvard University"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={edu.qualification}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "qualification",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Bachelor of Science"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Dates
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                      placeholder="Start (YYYY-MM)"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleEducationChange(index, "endDate", e.target.value)
                      }
                      placeholder="End (YYYY-MM)"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Notes
                  </label>
                  <textarea
                    value={edu.notes}
                    onChange={(e) =>
                      handleEducationChange(index, "notes", e.target.value)
                    }
                    rows={2}
                    placeholder="Additional details..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none resize-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="flex items-center gap-2 px-6 py-3 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-xl text-[14px] font-bold hover:bg-[#5BBB7B] hover:text-white transition-all duration-300"
            >
              <Plus size={18} />
              Add Education
            </button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h3 className="text-[16px] font-bold text-[#002333] mb-6 border-l-4 border-[#5BBB7B] pl-3">
            Work Experience
          </h3>

          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl relative group"
              >
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Employer
                  </label>
                  <input
                    type="text"
                    value={exp.employer}
                    onChange={(e) =>
                      handleExperienceChange(index, "employer", e.target.value)
                    }
                    placeholder="e.g. Google"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobTitle", e.target.value)
                    }
                    placeholder="e.g. Senior Developer"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Dates
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                      placeholder="Start (YYYY-MM)"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleExperienceChange(index, "endDate", e.target.value)
                      }
                      placeholder="End (YYYY-MM) or Present"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    value={exp.notes}
                    onChange={(e) =>
                      handleExperienceChange(index, "notes", e.target.value)
                    }
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none resize-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="flex items-center gap-2 px-6 py-3 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-xl text-[14px] font-bold hover:bg-[#5BBB7B] hover:text-white transition-all duration-300"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h3 className="text-[16px] font-bold text-[#002333] mb-6 border-l-4 border-[#5BBB7B] pl-3">
            Skills
          </h3>

          <div className="space-y-6">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl relative group"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(index, "name", e.target.value)
                    }
                    placeholder="e.g. React"
                    className="w-full bg-slatenone rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={skill.percentage}
                    onChange={(e) =>
                      handleSkillChange(index, "percentage", e.target.value)
                    }
                    placeholder="e.g. 90"
                    min="0"
                    max="100"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-[#002333] placeholder:text-slate-400 focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="w-full md:w-auto h-[48px] flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-2 px-6 py-3 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-xl text-[14px] font-bold hover:bg-[#5BBB7B] hover:text-white transition-all duration-300"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-4 bg-[#5BBB7B] text-white rounded-xl text-[15px] font-bold hover:bg-[#4a9b65] transition-all duration-300 shadow-lg shadow-[#5BBB7B]/30"
          >
            <Eye size={18} />
            Preview PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateResumes;
