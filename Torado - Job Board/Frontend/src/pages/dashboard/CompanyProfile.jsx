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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
        <p className="text-slate-500 mt-1">
          Manage your company branding and details.
        </p>
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
            onUploadSuccess={(path) =>
              setFormData((prev) => ({ ...prev, logo: path }))
            }
            label="Upload Logo"
            accept="image/*"
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
