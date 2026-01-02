const fs = require("fs");
const path = require("path");

const jobsFilePath = path.join("Frontend", "src", "data", "jobs.json");

// List of Recruiter Names (Person Names)
const recruiterNames = [
  "Tanya Lang",
  "John Smith",
  "Sarah Connor",
  "Mike Ross",
  "Jessica Pearson",
  "Harvey Specter",
  "Louis Litt",
  "Donna Paulsen",
  "Rachel Zane",
  "Alex Williams",
  "Samantha Wheeler",
  "Robert Zane",
  "Katrina Bennett",
  "Sheila Sazs",
  "Harold Gunderson",
];

try {
  const rawData = fs.readFileSync(jobsFilePath, "utf8");
  const data = JSON.parse(rawData);

  // Update Recruiters
  if (data.recruiters) {
    data.recruiters = data.recruiters.map((recruiter, index) => {
      const newName = recruiterNames[index % recruiterNames.length];
      // Store original name (Company) as 'company' if not present, rename 'name' to the Person Name
      return {
        ...recruiter,
        company: recruiter.name, // "Exela Movers" becomes company
        name: newName, // "Tanya Lang" becomes name
        // postedBy is kept (e.g. "Torado Corp")
      };
    });
  }

  // Update Jobs
  if (data.jobs) {
    data.jobs = data.jobs.map((job, index) => {
      const newRecruiterName = recruiterNames[index % recruiterNames.length];
      return {
        ...job,
        recruiterName: newRecruiterName,
        recruiterId: index + 1, // Assuming 1-to-1 mapping roughly
      };
    });
  }

  fs.writeFileSync(jobsFilePath, JSON.stringify(data, null, 2), "utf8");
  console.log("Successfully updated jobs.json with Recruiter Names and IDs.");
} catch (error) {
  console.error("Error updating jobs.json:", error);
}
