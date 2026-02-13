import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Trash2,
  Edit,
  Eye,
  Clock,
  Download,
  Upload,
  Star,
  Check,
} from "lucide-react";
import { resumeAPI, uploadAPI } from "../../services/api";

const Tooltip = ({ children, text }) => (
  <div className="relative group/tooltip w-fit">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3.5 py-2 bg-black text-white text-[12px] font-bold rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-20 pointer-events-none shadow-[0_4px_25px_rgba(0,0,0,0.4)] transform scale-95 group-hover/tooltip:scale-100 origin-bottom">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black"></div>
    </div>
  </div>
);

const ManageResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const fetchResumes = async () => {
    try {
      const data = await resumeAPI.getAll();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await resumeAPI.delete(id);
        setResumes((prev) => prev.filter((resume) => resume._id !== id));
      } catch (error) {
        console.error("Failed to delete resume:", error);
        alert("Failed to delete resume");
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type (PDF/Doc)
    if (
      !file.type.includes("pdf") &&
      !file.type.includes("word") &&
      !file.type.includes("document")
    ) {
      alert("Please upload a PDF or Word document.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload File
      const filePath = await uploadAPI.uploadFile(file);

      // 2. Get User Email (from local storage for now)
      const userStr =
        localStorage.getItem("torado_user") ||
        sessionStorage.getItem("torado_user");
      const user = userStr ? JSON.parse(userStr) : {};

      // 3. Create Resume Record
      await resumeAPI.create({
        name: file.name.split(".")[0], // Remove extension
        email: user.email || "no-email@provided.com", // Fallback if needed
        fileUrl: filePath,
        fileName: file.name,
        type: "Upload",
        jobCategory: "General",
        professionalTitle: "Resume",
      });

      // 4. Refresh List
      fetchResumes();
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetDefault = async (id) => {
    try {
      // Optimistic update
      setResumes((prev) =>
        prev.map((r) => ({
          ...r,
          isDefault: r._id === id,
        })),
      );

      await resumeAPI.setDefault(id);

      // Refresh to ensure sync (optional)
      // fetchResumes();
    } catch (error) {
      console.error("Failed to set default:", error);
      alert("Failed to set default resume");
      fetchResumes(); // Revert on error
    }
  };

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">Manage Resumes</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="text-[13px] text-slate-400 font-medium flex items-center">
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
            <span className="text-[#5BBB7B]">Manage Resumes</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-[#002333] text-white rounded-lg text-[13px] font-bold hover:bg-[#00334d] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload size={16} /> Upload Resume
                </>
              )}
            </button>
            <Link
              to="/user-dashboard/create-resumes"
              className="px-4 py-2 bg-[#5BBB7B] text-white rounded-lg text-[13px] font-bold hover:bg-[#4a9b65] transition-all shadow-lg shadow-[#5BBB7B]/30 flex items-center gap-2 whitespace-nowrap"
            >
              <FileText size={16} /> Create New
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 px-8 py-5 bg-slate-50/50 border-b border-slate-100 text-[12px] font-bold text-[#002333] uppercase tracking-wider">
          <div className="col-span-6">Resume Title</div>
          <div className="col-span-2 text-center">Category</div>
          <div className="col-span-2 text-center">Date Created</div>
          <div className="col-span-2 text-right pr-4">Action</div>
        </div>

        {/* Resume List */}
        <div className="divide-y divide-slate-100 min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <span className="text-slate-400">Loading resumes...</span>
            </div>
          ) : resumes.length > 0 ? (
            resumes.map((resume) => (
              <div
                key={resume._id}
                className="group grid grid-cols-1 md:grid-cols-12 px-8 py-6 items-center hover:bg-slate-50/30 transition-all duration-300"
              >
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#5BBB7B]/10 text-[#5BBB7B] flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white relative">
                    {resume.type === "Upload" ? (
                      <Upload size={24} />
                    ) : (
                      <FileText size={24} />
                    )}
                    {resume.isDefault && (
                      <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm border-2 border-white">
                        <Star size={10} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors line-clamp-1">
                        {resume.name}
                      </h4>
                      {resume.isDefault && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full border border-yellow-200 uppercase tracking-wide">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-slate-400 font-medium">
                      <span className="text-[#002333] font-bold">
                        {resume.professionalTitle || "No Title"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 flex md:justify-center items-center">
                  <span className="px-4 py-1.5 bg-yellow-50 text-yellow-600 text-[12px] font-bold rounded-full border border-yellow-100">
                    {resume.jobCategory || "General"}
                  </span>
                </div>

                <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 flex md:justify-center items-center text-slate-400 text-[13px] font-medium">
                  <Clock size={14} className="mr-1.5" />
                  {new Date(resume.createdAt).toLocaleDateString()}
                </div>

                <div className="col-span-12 md:col-span-2 mt-6 md:mt-0 flex justify-end items-center gap-2">
                  <Tooltip
                    text={
                      resume.isDefault ? "Current Default" : "Set as Default"
                    }
                  >
                    <button
                      onClick={() => handleSetDefault(resume._id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
                        resume.isDefault
                          ? "bg-yellow-50 text-yellow-500 shadow-sm"
                          : "bg-slate-50 text-slate-300 hover:bg-yellow-50 hover:text-yellow-500"
                      }`}
                    >
                      <Star
                        size={18}
                        fill={resume.isDefault ? "currentColor" : "none"}
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text="View Resume">
                    {resume.type === "Upload" ? (
                      <a
                        href={
                          resume.fileUrl?.startsWith("http")
                            ? `https://docs.google.com/viewer?url=${encodeURIComponent(
                                resume.fileUrl,
                              )}&embedded=false`
                            : `http://localhost:5001${resume.fileUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95"
                      >
                        <Eye size={18} />
                      </a>
                    ) : (
                      <Link
                        to={`/user-dashboard/edit-resume/${resume._id}`}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95"
                      >
                        <Eye size={18} />
                      </Link>
                    )}
                  </Tooltip>
                  {resume.type !== "Upload" && (
                    <Tooltip text="Edit Resume">
                      <Link
                        to={`/user-dashboard/edit-resume/${resume._id}`}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                      >
                        <Edit size={18} />
                      </Link>
                    </Tooltip>
                  )}
                  <Tooltip text="Delete Resume">
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <FileText size={40} />
              </div>
              <h5 className="text-[18px] font-bold text-[#002333]">
                No resumes found
              </h5>
              <p className="text-slate-400 mt-1 mb-6">
                You haven't created any resumes yet.
              </p>
              <Link
                to="/user-dashboard/create-resumes"
                className="px-6 py-3 bg-[#5BBB7B] text-white rounded-xl text-[14px] font-bold hover:bg-[#4a9b65] transition-all shadow-lg shadow-[#5BBB7B]/30"
              >
                Create New Resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageResumes;
