const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

// Freelancers data matching Frontend/src/data/freelancers.json
const freelancers = [
  {
    name: "Chelsea Parisian",
    email: "chelsea.parisian@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior Frontend Developer",
    specialization: "Creative",
    skills: ["React", "Vue.js", "Tailwind", "Programming"],
    bio: "Chelsea is a passionate Frontend Developer with over 5 years of experience in building responsive and accessible web applications.",
    rate: "$85/hr",
    location: "New York, USA",
    experience: "5 Years",
    rating: 4.8,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    phone: "+1 202 555 0101",
    languages: ["English", "French"],
    qualification: "Master's Degree in CS",
  },
  {
    name: "Bertrand Proffer",
    email: "bertrand.proffer@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Lead UI/UX Designer",
    specialization: "Design",
    skills: ["Figma", "Sketch", "Prototyping", "UX/UI", "Adobe XD", "Design"],
    bio: "Bertrand creates intuitive and visually stunning user interfaces. With a background in psychology, he focuses on user-centered design principles.",
    rate: "$95/hr",
    location: "London, UK",
    experience: "4 Years",
    rating: 4.5,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    phone: "+44 20 7946 0958",
    languages: ["English", "Spanish"],
    qualification: "Bachelor's in Design",
  },
  {
    name: "Madison Kohler",
    email: "madison.kohler@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior SEO Strategist",
    specialization: "Marketing",
    skills: ["SEO", "Content Strategy", "Analytics", "Digital"],
    bio: "Madison helps businesses grow their organic traffic through data-driven SEO strategies.",
    rate: "$65/hr",
    location: "Berlin, Germany",
    experience: "6 Years",
    rating: 4.9,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    phone: "+49 30 123456",
    languages: ["English", "German"],
    qualification: "MBA in Marketing",
  },
  {
    name: "Wilford Johns",
    email: "wilford.johns@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Creative Brand Designer",
    specialization: "Creative",
    skills: ["Illustrator", "Photoshop", "Branding", "Design"],
    bio: "Wilford is a versatile graphic designer with a unique artistic style. He specializes in branding, illustration, and print design.",
    rate: "$55/hr",
    location: "Paris, France",
    experience: "3 Years",
    rating: 4.2,
    reviews: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    phone: "+33 1 23 45 67 89",
    languages: ["English", "French"],
    qualification: "Diploma in Graphic Design",
  },
  {
    name: "Lana Steiner",
    email: "lana.steiner@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Principal Software Engineer",
    specialization: "Development",
    skills: ["Node.js", "React", "MongoDB", "APP", "Programming"],
    bio: "Lana is a full-stack wizard capable of building complex web applications from scratch. She writes clean, maintainable code and is an expert in the MERN stack.",
    rate: "$110/hr",
    location: "Toronto, Canada",
    experience: "8 Years",
    rating: 5.0,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    phone: "+1 416 555 0199",
    languages: ["English", "Russian"],
    qualification: "B.Sc in Computer Science",
  },
  {
    name: "David Smith",
    email: "david.smith@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior Product Designer",
    specialization: "Design",
    skills: ["UX Research", "Figma", "Design Systems", "UX/UI", "Design"],
    bio: "David bridges the gap between business goals and user needs. He specializes in building comprehensive design systems and conducting in-depth user research.",
    rate: "$120/hr",
    location: "Austin, USA",
    experience: "6 Years",
    rating: 4.7,
    reviews: 19,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    phone: "+1 512 555 0122",
    languages: ["English"],
    qualification: "Master's in HCI",
  },
  {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Social Media Specialist",
    specialization: "Marketing",
    skills: ["Instagram", "Content Creation", "Strategy", "Digital"],
    bio: "Sarah turns followers into customers. She creates engaging content strategies that resonate with audiences and drive real business results across social platforms.",
    rate: "$50/hr",
    location: "Chicago, USA",
    experience: "4 Years",
    rating: 4.6,
    reviews: 14,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    phone: "+1 312 555 0144",
    languages: ["English"],
    qualification: "BA in Communications",
  },
  {
    name: "Michael Chen",
    email: "michael.chen.freelancer@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior Mobile Architect",
    specialization: "Development",
    skills: ["React Native", "iOS", "Android", "APP", "Programming"],
    bio: "Michael builds silky smooth mobile experiences. Whether it's native iOS/Android or cross-platform with React Native, he delivers high-performance apps that users love.",
    rate: "$135/hr",
    location: "San Francisco, USA",
    experience: "7 Years",
    rating: 4.9,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    phone: "+1 415 555 0188",
    languages: ["English", "Mandarin"],
    qualification: "M.Sc in Software Engineering",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Creative Copywriter",
    specialization: "Creative",
    skills: ["Copywriting", "Editing", "Blogging", "Digital"],
    bio: "Emma crafts compelling narratives that convert. From punchy headlines to in-depth blog posts, she finds the right words to tell your brand's story.",
    rate: "$70/hr",
    location: "Sydney, Australia",
    experience: "5 Years",
    rating: 4.4,
    reviews: 9,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    phone: "+61 2 9876 5432",
    languages: ["English"],
    qualification: "BA in English Literature",
  },
  {
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Digital Illustrator",
    specialization: "Design",
    skills: [
      "Digital Art",
      "Illustration",
      "Character Design",
      "Design",
      "PSD",
    ],
    bio: "James brings ideas to life through vibrant and imaginative illustrations. Specializing in character design and editorial illustration, his work adds personality to any project.",
    rate: "$80/hr",
    location: "Barcelona, Spain",
    experience: "6 Years",
    rating: 4.8,
    reviews: 27,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    phone: "+34 93 123 4567",
    languages: ["English", "Spanish"],
    qualification: "Fine Arts Degree",
  },
  {
    name: "Olivia Thompson",
    email: "olivia.thompson@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Email Lifecycle Expert",
    specialization: "Marketing",
    skills: ["Mailchimp", "Automation", "Copywriting", "Digital"],
    bio: "Olivia designs high-converting email flows. From welcome series to retention campaigns, she ensures your message reaches the right inbox at the right time.",
    rate: "$60/hr",
    location: "London, UK",
    experience: "4 Years",
    rating: 4.3,
    reviews: 11,
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
    phone: "+44 20 1234 5678",
    languages: ["English"],
    qualification: "B.Sc in Marketing",
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    password: "password123",
    role: "candidate",
    jobTitle: "Senior Backend Developer",
    specialization: "Development",
    skills: ["Python", "Django", "PostgreSQL", "Programming", "APP"],
    bio: "Daniel architects robust backend systems. He loves solving hard algorithmic problems and ensuring APIs are fast, secure, and document-ready.",
    rate: "$100/hr",
    location: "Seoul, South Korea",
    experience: "6 Years",
    rating: 4.9,
    reviews: 36,
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop",
    phone: "+82 10 1234 5678",
    languages: ["Korean", "English"],
    qualification: "Master's in Computer Science",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    console.log("Adding freelancers to database...");

    // Check if freelancers already exist with these emails to avoid duplicates
    for (const freelancer of freelancers) {
      const exists = await User.findOne({ email: freelancer.email });
      if (!exists) {
        await User.create(freelancer);
        console.log(`Created: ${freelancer.name}`);
      } else {
        console.log(`Skipped (Exists): ${freelancer.name}`);
      }
    }

    console.log("Freelancers seed complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
