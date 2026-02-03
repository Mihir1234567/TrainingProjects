const fetch = require("node-fetch"); // Need to install node-fetch or use built-in fetch if node 18+

const API_URL = "http://localhost:5001/api";

const runTest = async () => {
  try {
    console.log("Starting Integration Test...");

    // 1. Register Employer
    const employerEmail = `emp_${Date.now()}@test.com`;
    console.log(`Registering Employer: ${employerEmail}`);
    const empRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Employer",
        email: employerEmail,
        password: "password123",
        role: "employer",
        companyName: "Test Corp",
      }),
    });
    const employer = await empRes.json();
    if (!empRes.ok) throw new Error(employer.message);
    const empToken = employer.token;
    console.log("Employer Registered. Token received.");

    // 2. Post a Job
    console.log("Posting a Job...");
    const jobRes = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${empToken}`,
      },
      body: JSON.stringify({
        title: "Integration Test Developer",
        description: "Testing the backend integration.",
        category: "Technology",
        location: "Remote",
        salaryRange: { min: 50000, max: 80000 },
      }),
    });
    const job = await jobRes.json();
    if (!jobRes.ok) throw new Error(job.message);
    console.log(`Job Posted. ID: ${job._id}`);

    // 3. Register Candidate
    const candidateEmail = `cand_${Date.now()}@test.com`;
    console.log(`Registering Candidate: ${candidateEmail}`);
    const candRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Candidate",
        email: candidateEmail,
        password: "password123",
        role: "candidate",
        jobTitle: "Software Engineer",
      }),
    });
    const candidate = await candRes.json();
    if (!candRes.ok) throw new Error(candidate.message);
    const candToken = candidate.token;
    console.log("Candidate Registered. Token received.");

    // 4. Apply to Job
    console.log("Applying to Job...");
    const appRes = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candToken}`,
      },
      body: JSON.stringify({
        jobId: job._id,
        resume: "https://example.com/resume.pdf",
      }),
    });
    const application = await appRes.json();
    if (!appRes.ok) throw new Error(application.message);
    console.log(`Applied to Job. Status: ${application.status}`);

    // 5. Verify Application for Emloyer
    console.log("Verifying Application for Employer...");
    const verifyRes = await fetch(`${API_URL}/applications/job/${job._id}`, {
      headers: { Authorization: `Bearer ${empToken}` },
    });
    const apps = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(apps.message);

    if (apps.length > 0 && apps[0].candidateId._id === candidate._id) {
      console.log("SUCCESS: Application found for employer.");
    } else {
      throw new Error("Application not found or mismatch.");
    }

    console.log("Integration Test Passed!");
  } catch (error) {
    console.error("Test Failed:", error.message);
    process.exit(1);
  }
};

runTest();
