import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const MeetOurTeam = () => {
  // --- Team Data ---
  const teamMembers = [
    {
      id: 1,
      name: "Mary Simens",
      role: "Manager",
      phone: "+(123) 1800-567-8990",
      email: "yourname@example.com",
      image: "/src/assets/TeamM5.jpg",
    },
    {
      id: 2,
      name: "Jenny Wilson",
      role: "Creative Director",
      phone: "+(123) 1800-567-8990",
      email: "jenny@example.com",
      image: "/src/assets/TeamM1.jpg",
    },
    {
      id: 3,
      name: "Robert Fox",
      role: "Senior Designer",
      phone: "+(123) 1800-567-8990",
      email: "robert@example.com",
      image: "/src/assets/TeamM4.jpg",
    },
    {
      id: 4,
      name: "Cody Fisher",
      role: "Developer",
      phone: "+(123) 1800-567-8990",
      email: "cody@example.com",
      image: "/src/assets/TeamM3.jpg",
    },
    {
      id: 5,
      name: "Esther Howard",
      role: "Marketing",
      phone: "+(123) 1800-567-8990",
      email: "esther@example.com",
      image: "/src/assets/TeamM6.jpg",
    },
    {
      id: 6,
      name: "Kristin Watson",
      role: "Sales Manager",
      phone: "+(123) 1800-567-8990",
      email: "kristin@example.com",
      image: "/src/assets/TeamM7.jpg",
    },
    {
      id: 7,
      name: "Guy Hawkins",
      role: "Architect",
      phone: "+(123) 1800-567-8990",
      email: "guy@example.com",
      image: "/src/assets/TeamM2.jpg",
    },
  ];

  return (
    <div className="w-full font-sans bg-white">
      {/* ==========================================
          1. HERO SECTION
      ========================================== */}
      <div className="relative w-full h-64 md:h-80 bg-[#1a1a1a] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
          Meet Our Team
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Meet Our Team</span>
        </div>
      </div>

      {/* ==========================================
          2. CONTENT SECTION
      ========================================== */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h4 className="text-md font-bold uppercase tracking-widest text-gray-800 mb-4">
              Creative team
            </h4>
            <h2 className="text-6xl font-serif text-gray-900">
              We are a professional <br />
              <span
                className="text-5xl md:text-6xl font-bold"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                creative team
              </span>
            </h2>
          </div>

          {/* Team Grid */}
          {/* Changed gap to gap-4 for a tighter gallery look and added lg:grid-cols-4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                // ADDED: 'aspect-square' makes the container a perfect box
                className="group relative w-full aspect-square overflow-hidden  bg-gray-100"
              >
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  // ADDED: 'object-cover' ensures image fills the square without distortion
                  // ADDED: 'object-top' ensures heads aren't cut off if the image is tall
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay Container */}
                <div className="absolute bottom-0 left-0 flex items-end opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-10 w-full max-w-[90%]">
                  {/* White Info Box */}
                  <div className="bg-white p-7 flex-grow shadow-lg">
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      {member.role}
                    </p>
                    <h3 className="text-xl font-serif text-[#005c35] font-medium mb-3">
                      {member.name}
                    </h3>

                    <div className="space-y-1">
                      <p className="text-gray-500 text-sm">{member.phone}</p>
                      <p className="text-gray-500 text-sm break-all">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Green Social Sidebar */}
                  <div className="bg-[#053322] flex flex-col gap-0 w-12 items-center">
                    <a
                      href="#"
                      className="w-full p-3 hover:bg-[#005c35] transition-colors text-white border-b border-white/10 flex justify-center"
                    >
                      <Facebook size={15} />
                    </a>
                    <a
                      href="#"
                      className="w-full p-3 hover:bg-[#005c35] transition-colors text-white border-b border-white/10 flex justify-center"
                    >
                      <Twitter size={15} />
                    </a>
                    <a
                      href="#"
                      className="w-full p-3 hover:bg-[#005c35] transition-colors text-white border-b border-white/10 flex justify-center"
                    >
                      <Instagram size={15} />
                    </a>
                    <a
                      href="#"
                      className="w-full p-3 hover:bg-[#005c35] transition-colors text-white flex justify-center"
                    >
                      <Linkedin size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetOurTeam;
