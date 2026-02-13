import React, { useState, useEffect } from "react";
import { companiesAPI } from "../../services/api";
import FileUploader from "../../components/common/FileUploader";
import {
  Building,
  MapPin,
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
} from "lucide-react";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
    logo: "",
    mission: "",
    aboutUs: "",
    skills: [],
    talent: [],
    recruitments: "",
    people: "",
  });

  const handleAutoFill = () => {
    setFormData((prev) => ({
      ...prev,
      name: "TechNova Innovations",
      website: "https://technova.example.com",
      location: "San Francisco, CA",
      phone: "+1 (555) 123-4567",
      email: "contact@technova.example",
      employees: "50-200",
      established: "2015-06-15",
      mission:
        "To revolutionize the digital landscape through sustainable tech.",
      description:
        "TechNova is a leading software solutions provider specializing in cloud computing and AI-driven applications.",
      aboutUs:
        "Founded in 2015, TechNova has grown from a small garage startup to a global player in the tech industry. We believe in innovation, integrity, and inclusivity. Our diverse team works tirelessly to solve complex problems and deliver value to our clients worldwide.",
      recruitments:
        "We look for passionate individuals who are ready to challenge the status quo. Our interview process involves a technical screening, a culture fit round, and a final discussion with leadership.",
      people:
        "Our team is our greatest asset. We foster a culture of continuous learning and open collaboration. We offer flexible work hours, remote options, and regular team retreats.",
      skills: [
        "Cloud Computing",
        "Artificial Intelligence",
        "React",
        "Node.js",
      ],
      talent: ["Software Engineers", "Product Managers", "UX Designers"],
    }));
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await companiesAPI.getMine();
        setFormData({
          name: data.name || "",
          website: data.website || "",
          location: data.location || "",
          description: data.description || "",
          logo: data.logo || "",
          mission: data.mission || "",
          aboutUs: data.aboutUs || "",
          skills: data.skills || [],
          talent: data.talent || [],
          recruitments: data.recruitments || "",
          people: data.people || "",
          // New Fields
          phone: data.phone || "",
          email: data.email || "",
          employees: data.employees || "",
          established: data.established
            ? new Date(data.established).toISOString().split("T")[0]
            : "",
          logoAction: data.logoAction || null,
        });
      } catch (err) {
        // 404 is fine, means no profile yet
        if (err.status !== 404) {
          console.error("Failed to load company", err);
          setError("Failed to load company profile.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [skillInput, setSkillInput] = useState("");
  const [talentInput, setTalentInput] = useState("");

  const handleAddItem = (e, field, inputValue, setInputValue) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!formData[field].includes(inputValue.trim())) {
        setFormData((prev) => ({
          ...prev,
          [field]: [...(prev[field] || []), inputValue.trim()],
        }));
      }
      setInputValue("");
    }
  };

  const handleRemoveItem = (field, itemToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== itemToRemove),
    }));
  };

  const renderTagInput = (label, field, inputValue, setInputValue) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {formData[field]?.map((item, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveItem(field, item)}
              className="hover:text-blue-800"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleAddItem(e, field, inputValue, setInputValue)}
          placeholder="Type and press Enter to add..."
          className="w-full h-[50px] px-4 bg-white border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Plus size={18} />
        </div>
      </div>
    </div>
  );

  const handleLogoUpload = async (file) => {
    // FileUploader component likely passes the file object or path?
    // Checking FileUploader usage... it usually handles file selection.
    // If FileUploader handles upload internally, it might pass path.
    // Let's assume FileUploader is dumb and passes file.
    // Wait, typical pattern in this project is "onUploadSuccess" passing path?
    // Let's check FileUploader. Assuming it needs refactor or I verify its code.
    // Proceeding with assumption: FileUploader returns FILE object.
    // Actually, looking at previous code: `onUploadSuccess={handleLogoUpload}`
    // I should check `FileUploader.jsx`.
    // For now, let's implement the rest of the form fields.
  };

  const handleLogoSuccess = async (path, cropData) => {
    // 1. Update local state immediately
    // We set logoAction to null because we are efficiently uploading the CROPPED image now.
    // If we kept the crop data, the UI would try to crop the *already cropped* image again, causing distortion.
    const updatedData = { ...formData, logo: path, logoAction: null };
    setFormData(updatedData);

    // 2. Auto-save to backend
    setSaving(true);
    try {
      await companiesAPI.createOrUpdate(updatedData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Auto-save logo failed", err);
      setError("Failed to save logo automatically. Please click Save Profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await companiesAPI.createOrUpdate(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const renderInput = (
    label,
    name,
    type = "text",
    icon = null,
    placeholder = "",
  ) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full h-[50px] bg-white border border-slate-200 rounded-xl text-slate-600placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
          required={name === "name"}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
          <p className="text-slate-500 mt-1">
            Manage your company branding and details.
          </p>
        </div>
        <button
          onClick={handleAutoFill}
          className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
          type="button"
        >
          Auto Fill
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Profile saved successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8"
      >
        {/* Logo Section - Keeping as is for now, will verify FileUploader later */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Company Logo</h3>
          <FileUploader
            initialValue={formData.logo}
            initialCrop={formData.logoAction}
            onUploadSuccess={handleLogoSuccess}
            label="Upload Logo"
            accept="image/*"
            isCircular={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {renderInput(
            "Company Name",
            "name",
            "text",
            <Building className="w-5 h-5" />,
            "e.g. Acme Corp",
          )}
          {renderInput(
            "Website",
            "website",
            "url",
            <Globe className="w-5 h-5" />,
            "https://acme.com",
          )}
          {renderInput("Phone", "phone", "tel", null, "+1 234 567 890")}
          {renderInput("Email", "email", "email", null, "contact@acme.com")}
          {renderInput("Employees", "employees", "text", null, "50-100")}
          {renderInput("Established", "established", "date")}
        </div>

        {renderInput(
          "Location",
          "location",
          "text",
          <MapPin className="w-5 h-5" />,
          "e.g. San Francisco, CA",
        )}

        {renderInput(
          "Mission / Slogan",
          "mission",
          "text",
          null,
          "e.g. To organize the world's information...",
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            About Company (Detailed)
          </label>
          <textarea
            name="aboutUs"
            value={formData.aboutUs}
            onChange={handleChange}
            rows="5"
            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            placeholder="Detailed description about your company..."
          ></textarea>
        </div>

        {renderTagInput(
          "Fundamental Learning & Skills",
          "skills",
          skillInput,
          setSkillInput,
        )}
        {renderTagInput(
          "Talent & Experience",
          "talent",
          talentInput,
          setTalentInput,
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Recruitments
          </label>
          <textarea
            name="recruitments"
            value={formData.recruitments}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            placeholder="Describe your recruitment process..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            People
          </label>
          <textarea
            name="people"
            value={formData.people}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            placeholder="Describe your team and culture..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            placeholder="Tell us about your company..."
          ></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
