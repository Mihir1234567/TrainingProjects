import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import AnimatedButton from "../components/common/AnimatedButton";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const InfoCard = ({ icon: Icon, title, lines, colorClass }) => (
    <div className="bg-white p-8 rounded-lg border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex gap-6 items-start group">
      <div
        className={`p-4 rounded-lg ${colorClass} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-[#5BBB7B]" />{" "}
        {/* Icon checks out as green in image? Or wrapper is colored? Image shows wrapper light blue/green/gray. Let's use light backgrounds. */}
        {/* Actually, looking at the screenshot:
           - Location: Purple tint bg
           - Phone: Green tint bg
           - Email: Gray tint bg
           Let's approximate these pastel backgrounds.
        */}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#05264E] mb-2">{title}</h3>
        {lines.map((line, idx) => (
          <p key={idx} className="text-slate-500 text-sm leading-relaxed">
            {line}
          </p>
        ))}
      </div>
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
        <div className="relative z-10 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl mb-0">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#05264E]">
              Tell Us About Yourself
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-100 focus:border-[#5BBB7B]"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs pl-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-100 focus:border-[#5BBB7B]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs pl-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-100 focus:border-[#5BBB7B]"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs pl-1">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 resize-y ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-100 focus:border-[#5BBB7B]"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs pl-1">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="pt-4 text-center">
              <AnimatedButton type="submit" className="w-full md:w-auto px-10">
                Send Message
              </AnimatedButton>
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
