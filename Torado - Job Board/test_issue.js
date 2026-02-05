const API_URL = "http://127.0.0.1:5001/api";

async function test() {
  try {
    console.log("Testing connection to 127.0.0.1:5001...");
    // Check root first
    try {
      const rootRes = await fetch("http://127.0.0.1:5001/");
      const rootText = await rootRes.text();
      console.log("Root response:", rootText.substring(0, 100)); // Log first 100 chars
    } catch (e) {
      console.log("❌ Port 5001 not reachable:", e.message);
      return;
    }

    const timestamp = Date.now();
    const email = `testcomp_${timestamp}@example.com`;
    const password = "password123";

    // 1. Register
    console.log("Registering user:", email);
    // Correct route: /auth/register
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email,
        password,
        role: "employer",
      }),
    });

    const regText = await regRes.text();
    let regData;
    try {
      regData = JSON.parse(regText);
    } catch (e) {
      throw new Error(
        `Registration returned non-JSON: ${regText.substring(0, 200)}`,
      );
    }

    if (!regRes.ok)
      throw new Error(`Registration failed: ${JSON.stringify(regData)}`);

    // 2. Login
    console.log("Logging in...");
    // Correct route: /auth/login
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok)
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    const token = loginData.token;
    console.log("Logged in.");

    // 3. Post Job with Company Details
    console.log("Posting job with Company Details...");
    const jobData = {
      title: "Company Test Job",
      description: "Job desc",
      companyMission: "Test Mission String",
      companyAbout: "Test About String",
      companySkills: ["Skill1", "Skill2"],
      companyTalent: ["Talent1"],
      companyRecruitments: "Recruitment Info",
      companyPeople: "People Info",
      companyEstablished: "2020-01-01",
      companyPhone: "1234567890",
      companyEmail: "comp@test.com",
      category: "Design",
      type: "Full Time",
      deadline: "2026-12-31",
      location: "NYC",
      salaryRange: { min: 50000, max: 80000 },
      minSalary: 50000,
      maxSalary: 80000,
      jobTypes: "Full Time",
    };

    const jobRes = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    const jobResData = await jobRes.json();
    if (!jobRes.ok)
      throw new Error(`Post Job failed: ${JSON.stringify(jobResData)}`);
    console.log("Job Created, ID:", jobResData._id);

    // 4. Fetch Company Details
    const companyId = jobResData.companyId;
    console.log("Company ID associated with job:", companyId);

    if (!companyId) throw new Error("No companyId returned in job response");

    const compRes = await fetch(`${API_URL}/companies/${companyId}`);
    const compData = await compRes.json();

    console.log("--- Company Data Retrieved ---");
    console.log("Mission:", compData.mission);
    console.log("About:", compData.aboutUs);
    console.log("Skills:", compData.skills);

    if (compData.mission === "Test Mission String") {
      console.log("✅ SUCCESS: Mission matches.");
    } else {
      console.log("❌ FAILURE: Mission mismatch. Found:", compData.mission);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
