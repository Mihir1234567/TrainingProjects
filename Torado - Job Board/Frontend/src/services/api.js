export const API_BASE_URL = "http://localhost:5001";
const API_URL = `${API_BASE_URL}/api`;

const getHeaders = () => {
  const userStr =
    localStorage.getItem("torado_user") ||
    sessionStorage.getItem("torado_user");
  const headers = {
    "Content-Type": "application/json",
  };
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    throw error;
  }
  return data;
};

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async () => {
    // No backend call needed for JWT usually, unless blacklisting
    return true;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },

  deleteAccount: async (password) => {
    const response = await fetch(`${API_URL}/auth/delete-account`, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify({ password }),
    });
    return handleResponse(response);
  },
};

export const jobsAPI = {
  getAll: async (filters = {}) => {
    // filters can include keyword, location, category, type, sort, recruiterId
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/jobs?${query}`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    return handleResponse(response);
  },

  getMyJobs: async () => {
    const response = await fetch(`${API_URL}/jobs/my-jobs`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (jobData) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    return handleResponse(response);
  },

  update: async (id, jobData) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify({}),
    });
    return handleResponse(response);
  },
};

export const applicationsAPI = {
  getAll: async () => {
    // This might need to adjust based on role (candidate vs employer)
    // For now, let's assume this gets "my applications" for candidate
    const response = await fetch(`${API_URL}/applications/me`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  apply: async (jobId, candidateData) => {
    // candidateData might contain resume link etc.
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ jobId, ...candidateData }),
    });
    return handleResponse(response);
  },

  getByJobId: async (jobId) => {
    const response = await fetch(`${API_URL}/applications/job/${jobId}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getRecruiterApplications: async () => {
    const response = await fetch(`${API_URL}/applications/recruiter/all`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export const companiesAPI = {
  getMine: async () => {
    const response = await fetch(`${API_URL}/companies/mine`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  createOrUpdate: async (companyData) => {
    const response = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(companyData),
    });
    return handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/companies`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/companies/${id}`);
    return handleResponse(response);
  },
};

export const uploadAPI = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      // Content-Type header not needed for FormData, fetch sets it automatically with boundary
      headers: {
        Authorization: getHeaders().Authorization,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Upload failed");
    }

    // Upload endpoint returns JSON { message, filePath }
    const data = await response.json();
    return data.filePath;
  },
};

export const dashboardAPI = {
  getStats: async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  getPublicStats: async () => {
    const response = await fetch(`${API_URL}/dashboard/public-stats`);
    return handleResponse(response);
  },
};

export const userAPI = {
  getCandidates: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/users/candidates?${query}`);
    return handleResponse(response);
  },
  getFreelancers: async () => {
    const response = await fetch(`${API_URL}/users/freelancers`);
    return handleResponse(response);
  },
  getById: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return handleResponse(response);
  },
  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  updateProfile: async (userData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

export const blogAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/blogs`);
    return handleResponse(response);
  },
  getById: async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    return handleResponse(response);
  },
};

export const faqAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/faqs`);
    return handleResponse(response);
  },
};

export const contactAPI = {
  submit: async (data) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

export const bookmarkAPI = {
  toggle: async (targetId, targetModel) => {
    const response = await fetch(`${API_URL}/bookmarks`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ targetId, targetModel }),
    });
    return handleResponse(response);
  },
  getAll: async () => {
    const response = await fetch(`${API_URL}/bookmarks`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export const messageAPI = {
  send: async (receiverId, content, replyTo = null) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ receiverId, content, replyTo }),
    });
    return handleResponse(response);
  },
  getInbox: async () => {
    const response = await fetch(`${API_URL}/messages/inbox`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  getConversation: async (userId) => {
    const response = await fetch(`${API_URL}/messages/${userId}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  delete: async (messageId) => {
    const response = await fetch(`${API_URL}/messages/${messageId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export const resumeAPI = {
  create: async (resumeData) => {
    const response = await fetch(`${API_URL}/resumes`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(resumeData),
    });
    return handleResponse(response);
  },
  getAll: async (userId) => {
    let url = `${API_URL}/resumes`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  getById: async (id) => {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  update: async (id, resumeData) => {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(resumeData),
    });
    return handleResponse(response);
  },
  delete: async (id) => {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  setDefault: async (id) => {
    const response = await fetch(`${API_URL}/resumes/${id}/default`, {
      method: "PUT",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
export const adminAPI = {
  // Role Management
  getRoles: async () => {
    const response = await fetch(`${API_URL}/roles`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  createRole: async (roleData) => {
    const response = await fetch(`${API_URL}/roles`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(roleData),
    });
    return handleResponse(response);
  },
  updateRole: async (id, roleData) => {
    const response = await fetch(`${API_URL}/roles/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(roleData),
    });
    return handleResponse(response);
  },
  deleteRole: async (id) => {
    const response = await fetch(`${API_URL}/roles/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // User Management (Admin specific)
  getAllUsers: async (filters = {}) => {
    // We might need to implement this endpoint in backend userController
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/users/admin/all?${query}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  updateUser: async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // --- Extended Admin System ---
  // Jobs
  getJobs: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/admin/jobs?${query}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  updateJobStatus: async (id, status, featured) => {
    const response = await fetch(`${API_URL}/admin/jobs/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status, featured }),
    });
    return handleResponse(response);
  },
  deleteJob: async (id) => {
    const response = await fetch(`${API_URL}/admin/jobs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Applications
  getApplications: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/admin/applications?${query}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  updateApplicationStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/admin/applications/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  // Employers
  getEmployers: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/admin/employers?${query}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Logs
  getLogs: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/admin/logs?${query}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
