import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, User, Type, FileText } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted", formData);
      // Handle actual submission logic here
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const renderInput = (id, label, Icon, type = "text", props = {}) => (
    <div className="relative group/field">
      <input
        id={id}
        name={id}
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
        <p className="text-red-500 text-xs mt-1.5 ml-1">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-white py-16 text-center shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-[#05264E] mb-3">
          Contact Us
        </h1>
        <p className="text-slate-500">
          <Link
            to="/"
            className="text-[#05264E] hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>{" "}
          / <span className="text-[#5BBB7B]">Contact Us</span>
        </p>
      </div>

      <div className="flex-grow container mx-auto px-4 lg:px-12 py-16">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-300 flex gap-6 items-start group">
            <div className="p-4 rounded bg-indigo-50 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#05264E] mb-2">
                Location
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Flot Torado Street, United <br /> States of America
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-300 flex gap-6 items-start group">
            <div className="p-4 rounded bg-emerald-50 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 text-[#5BBB7B]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#05264E] mb-2">Phone</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                +21 456 78546 <br /> +123 456 7890
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-300 flex gap-6 items-start group">
            <div className="p-4 rounded bg-slate-100 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#05264E] mb-2">Email</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                support@torado.com <br /> hello@torado.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] border border-slate-100/50 mb-0">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#05264E]">
              Tell Us About Yourself
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6">
              {renderInput("name", "Your Name", User)}
              {renderInput("email", "Email Address", Mail, "email")}
              {renderInput("subject", "Subject", Type)}

              <div className="relative group/field">
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  rows="6"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`peer w-full h-44 pl-16 pr-5 py-6 bg-white border ${
                    errors.message
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-slate-100 ring-4 ring-transparent"
                  } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow resize-none`}
                ></textarea>
                <div
                  className={`absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    errors.message
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
                  }`}
                >
                  <FileText size={18} strokeWidth={2.5} />
                </div>
                <label
                  htmlFor="message"
                  className={`absolute left-16 top-6 ${
                    errors.message ? "text-red-400" : "text-slate-400"
                  } text-[15px] font-bold transition-all pointer-events-none
                             peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                             peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
                >
                  Message
                </label>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="relative px-10 py-4 bg-[#5BBB7B] text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-[#5BBB7B]/30 text-[15px] group w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                <span className="relative z-10">Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-7xl mx-auto h-[400px] md:h-[600px] bg-slate-200 mt-0 md:-mt-60 relative z-0 px-4 md:px-0 mb-10 md:mb-0">
        <div className="w-full h-full rounded-lg overflow-hidden shadow-sm">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?q=St.+James'+Court,+A+Taj+Hotel,+London&t=&z=15&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
