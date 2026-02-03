const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const candidates = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior UI/UX Designer",
    specialization: "Design",
    skills: ["Figma", "Sketch", "Prototyping", "Adobe XD"],
    bio: "Passionate designer with 5+ years of experience creating user-centered digital products.",
    rate: "$60/hr",
    location: "New York, USA",
    experience: "5 Years",
    rating: 4.8,
    reviews: 12,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Full Stack Developer",
    specialization: "Development",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    bio: "Full stack wizard specializing in MERN stack and scalable web applications.",
    rate: "$80/hr",
    location: "San Francisco, USA",
    experience: "7 Years",
    rating: 5.0,
    reviews: 24,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Digital Marketing Specialist",
    specialization: "Marketing",
    skills: ["SEO", "Content Strategy", "Google Analytics", "Social Media"],
    bio: "Data-driven marketer helping brands grow their online presence.",
    rate: "$45/hr",
    location: "London, UK",
    experience: "4 Years",
    rating: 4.6,
    reviews: 8,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Mobile App Developer",
    specialization: "Development",
    skills: ["React Native", "Swift", "iOS", "Android"],
    bio: "Experienced mobile developer building cross-platform apps.",
    rate: "$70/hr",
    location: "Toronto, Canada",
    experience: "6 Years",
    rating: 4.9,
    reviews: 15,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Graphic Designer",
    specialization: "Design",
    skills: ["Photoshop", "Illustrator", "Branding", "Digital Art"],
    bio: "Creative graphic designer with a keen eye for detail and color.",
    rate: "$40/hr",
    location: "Berlin, Germany",
    experience: "3 Years",
    rating: 4.5,
    reviews: 5,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "James Wilson",
    email: "james@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "DevOps Engineer",
    specialization: "Development",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    bio: "Ensuring smooth deployment and scalable infrastructure.",
    rate: "$90/hr",
    location: "Austin, USA",
    experience: "8 Years",
    rating: 5.0,
    reviews: 30,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Sophia Martinez",
    email: "sophia@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Content Writer",
    specialization: "Marketing",
    skills: ["Copywriting", "Blogging", "SEO", "Editing"],
    bio: "Crafting compelling stories and engaging content for brands.",
    rate: "$35/hr",
    location: "Madrid, Spain",
    experience: "2 Years",
    rating: 4.3,
    reviews: 3,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Robert Taylor",
    email: "robert@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Frontend Developer",
    specialization: "Development",
    skills: ["Vue.js", "JavaScript", "HTML/CSS", "Tailwind"],
    bio: "Frontend specialist focusing on responsive and accessible interfaces.",
    rate: "$55/hr",
    location: "Sydney, Australia",
    experience: "4 Years",
    rating: 4.7,
    reviews: 10,
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    name: "Olivia Brown",
    email: "olivia@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Product Manager",
    specialization: "Management",
    skills: ["Agile", "Scrum", "Roadmapping", "Leadership"],
    bio: "Bridging the gap between business requirements and technical solutions.",
    rate: "$95/hr",
    location: "Singapore",
    experience: "9 Years",
    rating: 4.9,
    reviews: 40,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "William Lee",
    email: "william@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Cybersecurity Analyst",
    specialization: "IT",
    skills: ["Network Security", "Penetration Testing", "Python", "Linux"],
    bio: "Protecting digital assets from evolving threats.",
    rate: "$100/hr",
    location: "Tel Aviv, Israel",
    experience: "6 Years",
    rating: 4.8,
    reviews: 18,
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    console.log("Adding candidates...");

    // Check if candidates already exist with these emails to avoid duplicates
    for (const candidate of candidates) {
      const exists = await User.findOne({ email: candidate.email });
      if (!exists) {
        await User.create(candidate);
        console.log(`Created: ${candidate.name}`);
      } else {
        console.log(`Skipped (Exists): ${candidate.name}`);
      }
    }

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
