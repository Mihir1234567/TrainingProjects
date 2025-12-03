// src/components/ContactPage.jsx
import React from "react";
import { Mail, Phone, Clock, MapPin, Globe } from "lucide-react"; // Importing icons

const ContactPage = () => {
  // --- Office Data ---
  const offices = [
    {
      name: "Europe Office",
      address: "751 Echo Park Ave, Los Angeles, CA 90026",
      phone: "(213) 250-3678",
      img: "/src//assets/Ship.svg",
    },
    {
      name: "Asia Office",
      address: "1115 Wilshire Blvd, Santa Monica, CA 90401",
      phone: "(310) 394-1406",
      img: "/src//assets/warehouse.svg",
    },
    {
      name: "West Hollywood",
      address: "6250 Hollywood Blvd, Hollywood, Los Angeles, CA 90028",
      phone: "(323) 728-1500",
      img: "/src//assets/Plane.svg",
    },
    {
      name: "Silver Lake",
      address: "2246 Silver Lake Blvd, Los Angeles, CA 90026",
      phone: "(323) 669-1536",
      img: "/src//assets/Truck.svg",
    },
  ];

  return (
    <div className="w-full font-sans text-gray-900 bg-white">
      {/* ==========================================
            1. GOOGLE MAPS EMBED
            ========================================== */}
      <section className="w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Replace this iframe with your actual Google Maps embed code.
                    You can get this from Google Maps by searching for a location,
                    clicking 'Share', then 'Embed a map', and copying the iframe code.
                    Make sure to adjust width/height if needed, though Tailwind's
                    classes should handle the parent container.
                */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12095.341142588046!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259837a7f4571%3A0xf6d7d5a5e3c8a92!2sBroadway%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map of Broadway, New York"
        ></iframe>
      </section>

      {/* ==========================================
            2. WORLDWIDE OFFICE SECTION
            ========================================== */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gray-900 mb-4">
              Our worldwide office
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg mx-auto leading-relaxed">
              Worldwide logistics group now has 38 offices in 20 countries.
              "We’ve always had a strong top management. But it’s our excellent
              talent retention."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-md"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <img src={office.img} alt="" />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-3">
                  {office.name}
                </h3>
                <p className="text-lg text-gray-600 mb-2">{office.address}</p>
                <p className="text-lg font-bold text-gray-700">
                  {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
            3. GET IN TOUCH & CONTACT FORM SECTION
            ========================================== */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Get In Touch */}
          <div className="pr-0 lg:pr-12">
            <h2 className="text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Get in touch and we'll help your business
            </h2>
            <p className="text-gray-600 text-xl mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              eu, velit rutrum dictum lobortis. Turpis justo duc tor quam, eu
              auctor lorem dolo in nunc.
            </p>

            {/* Contact Info Items */}
            <div className="space-y-8">
              {/* Contact Us */}
              <div className="flex items-start">
                <div className=" rounded-full flex-shrink-0 mr-4">
                  <img src="/src/assets/Mail.svg" alt="" />
                </div>
                <div>
                  <h4 className="text-2xl  text-gray-900 mb-1">Contact Us</h4>
                  <p className="text-gray-900 text-lg">
                    Call Us:{" "}
                    <span className="font-medium text-green-700">
                      +(406) 555-0120
                    </span>
                  </p>
                  <p className="text-gray-900 text-lg">
                    Email:{" "}
                    <span className="font-medium">support@example.com</span>
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start">
                <div className=" rounded-full flex-shrink-0 mr-4">
                  <img src="/src/assets/Clock.svg" alt="" />
                </div>
                <div>
                  <h4 className="text-2xl text-gray-900 mb-1">Opening Hours</h4>
                  <p className="text-gray-900 text-lg">
                    Mon - Sat:{" "}
                    <span className="font-medium">7:00 am - 6:00 pm</span>
                  </p>
                  <p className="text-gray-900 text-lg">
                    Sunday:{" "}
                    <span className="font-medium">8:00 am - 6:00 pm</span>
                  </p>
                </div>
              </div>

              {/* Our Office */}
              <div className="flex items-start">
                <div className=" rounded-full flex-shrink-0 mr-4">
                  <img src="/src/assets/Location.svg" alt="" />
                </div>
                <div>
                  <h4 className="text-2xl text-gray-900 mb-1">Our Office</h4>
                  <p className="text-gray-900 text-lg">
                    2972 Westheimer Rd. Santa Ana,
                    <br /> Illinois, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Need Help? Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl  border border-gray-100">
            <h3 className="text-4xl font-serif text-gray-900 mb-3">
              Need Help?
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              eu, velit rutrum dictum lobortis.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Let us know what you need.
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Let us know what you need."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-gray-900 text-sm resize-y"
                ></textarea>
              </div>

              {/* Centered Button Container */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black hover:bg-black hover:text-white font-medium rounded-full  transition-colors duration-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
