import jobsData from "../data/jobs.json";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock User Storage
const getStoredUsers = () => {
  const users = localStorage.getItem("mock_db_users");
  return users ? JSON.parse(users) : [];
};

const saveUser = (user) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem("mock_db_users", JSON.stringify(users));
};

export const authAPI = {
  login: async ({ email, password }) => {
    await delay(800);
    // Simulate check
    if (email === "candidate@example.com" || email === "employer@example.com") {
      return {
        id: email === "candidate@example.com" ? 1 : 2,
        name: email === "candidate@example.com" ? "John Doe" : "Tech Corp",
        email,
        role: email === "candidate@example.com" ? "candidate" : "employer",
        token: "mock-jwt-token",
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (userData) => {
    await delay(800);
    const newUser = { id: Date.now(), ...userData, token: "mock-jwt-token" };
    saveUser(newUser);
    return newUser;
  },

  logout: async () => {
    await delay(200);
    return true;
  },
};

export const jobsAPI = {
  getAll: async () => {
    await delay(500);
    return jobsData.jobs;
  },

  getById: async (id) => {
    await delay(300);
    return jobsData.jobs.find((j) => j.id === Number(id));
  },

  create: async (jobData) => {
    await delay(600);
    return { id: Date.now(), ...jobData }; // partial mock
  },

  delete: async (id) => {
    await delay(400);
    return true;
  },
};

export const applicationsAPI = {
  getAll: async () => {
    await delay(400);
    return []; // Start empty or mock
  },

  apply: async (jobId, candidateData) => {
    await delay(600);
    return { id: Date.now(), jobId, ...candidateData, status: "Active" };
  },
};
