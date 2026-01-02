const fs = require("fs");
const path = require("path");

const jobsFilePath = path.join("Frontend", "src", "data", "jobs.json");

// Helper to get random rating between 3.5 and 5.0
const getRandomRating = () => (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 50) + 2;

const masterRecruiters = [
  {
    id: 1,
    name: "Tanya Lang",
    company: "Exela Movers",
    logo: "/src/assets/Jobs/companyLogo/companyLogo1.png",
    companyDetails: {
      category: "Design & Technology",
      established: "2015",
      employees: "120",
      location: "New York, USA",
      phone: "+1 234 567 890",
      email: "contact@exelamovers.com",
    },
  },
  {
    id: 2,
    name: "John Smith",
    company: "Oliver Bins",
    logo: "/src/assets/Jobs/companyLogo/companyLogo2.png",
    companyDetails: {
      category: "Software Development",
      established: "2018",
      employees: "85",
      location: "Austin, TX",
      phone: "+1 555 123 4567",
      email: "hr@oliverbins.com",
    },
  },
  {
    id: 3,
    name: "Sarah Connor",
    company: "Carmel Flatley",
    logo: "/src/assets/Jobs/companyLogo/companyLogo3.png",
    companyDetails: {
      category: "Market Research",
      established: "2010",
      employees: "45",
      location: "Chicago, USA",
      phone: "+1 312 987 6543",
      email: "careers@carmelflatley.com",
    },
  },
  {
    id: 4,
    name: "Mike Ross",
    company: "Eunice Borer",
    logo: "/src/assets/Jobs/companyLogo/companyLogo4.png",
    companyDetails: {
      category: "Financial Services",
      established: "2005",
      employees: "250",
      location: "Dallas, USA",
      phone: "+1 214 555 7890",
      email: "careers@euniceborer.com",
    },
  },
  {
    id: 5,
    name: "Jessica Pearson",
    company: "Sincere Boehm",
    logo: "/src/assets/Jobs/companyLogo/companyLogo5.png",
    companyDetails: {
      category: "Technology & Design",
      established: "2020",
      employees: "30",
      location: "San Francisco, USA",
      phone: "+1 415 555 1234",
      email: "hr@sincereboehm.com",
    },
  },
  {
    id: 6,
    name: "Harvey Specter",
    company: "Abel Gaylord",
    logo: "/src/assets/Jobs/companyLogo/companyLogo6.png",
    companyDetails: {
      category: "Enterprise Solutions",
      established: "1995",
      employees: "500",
      location: "New York, USA",
      phone: "+1 202 555 0199",
      email: "exec@abelgaylord.com",
    },
  },
  {
    id: 7,
    name: "Louis Litt",
    company: "Alivia Pollich",
    logo: "/src/assets/Jobs/companyLogo/companyLogo1.png",
    companyDetails: {
      category: "Marketing",
      established: "2012",
      employees: "60",
      location: "Chicago, USA",
      phone: "+1 312 555 6789",
      email: "contact@aliviapollich.com",
    },
  },
  {
    id: 8,
    name: "Donna Paulsen",
    company: "Mark Huel",
    logo: "/src/assets/Jobs/companyLogo/companyLogo2.png",
    companyDetails: {
      category: "Market Research",
      established: "2016",
      employees: "90",
      location: "New York, USA",
      phone: "+1 212 555 4321",
      email: "hr@markhuel.com",
    },
  },
  {
    id: 9,
    name: "Rachel Zane",
    company: "Marcelo Wolff",
    logo: "/src/assets/Jobs/companyLogo/companyLogo3.png",
    companyDetails: {
      category: "E-commerce",
      established: "2014",
      employees: "150",
      location: "Los Angeles, USA",
      phone: "+1 213 555 8765",
      email: "careers@marcelowolff.com",
    },
  },
  {
    id: 10,
    name: "Alex Williams",
    company: "Sim Howell",
    logo: "/src/assets/Jobs/companyLogo/companyLogo4.png",
    companyDetails: {
      category: "Digital Marketing",
      established: "2019",
      employees: "40",
      location: "New York, USA",
      phone: "+1 202 555 0122",
      email: "hr@simhowell.com",
    },
  },
];

// Assign random realistic ratings to masters once
masterRecruiters.forEach((m) => {
  m.rating = parseFloat(getRandomRating());
  m.reviews = getRandomReviews();
});

// Uneven distribution of 30 jobs to 10 recruiters
// R1:6, R2:2, R3:4, R4:1, R5:3, R6:5, R7:2, R8:3, R9:1, R10:3 = 30
const distribution = [
  1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 8, 8, 8,
  9, 10, 10, 10,
];

try {
  const rawData = fs.readFileSync(jobsFilePath, "utf8");
  const data = JSON.parse(rawData);

  if (data.jobs) {
    // Shuffle the distribution slightly or keep ordered?
    // Data.jobs has 30 items. We'll just assigning cleanly.

    data.jobs = data.jobs.map((job, index) => {
      const recruiterId = distribution[index] || 1; // Fallback to 1 if out of bounds
      const master = masterRecruiters.find((m) => m.id === recruiterId);

      return {
        ...job,
        recruiterId: master.id,
        recruiterName: master.name,
        company: master.company,
        logo: master.logo,
        rating: master.rating, // Job inherits recruiter rating for display consistency
        reviewsCount: master.reviews,
        companyDetails: master.companyDetails,
      };
    });
  }

  // Update legacy recruiters array too, just in case
  data.recruiters = masterRecruiters.map((r) => ({
    id: r.id,
    name: r.name,
    company: r.company,
    postedBy: "Torado Corp",
    logo: r.logo,
    rating: r.rating,
    reviews: r.reviews,
    location: r.companyDetails.location,
    openJobs: data.jobs.filter((j) => j.recruiterId === r.id).length,
    details: r.companyDetails,
  }));

  fs.writeFileSync(jobsFilePath, JSON.stringify(data, null, 2), "utf8");
  console.log("Updated jobs.json with variable ratings and job counts.");
} catch (error) {
  console.error("Error updating jobs.json:", error);
}
