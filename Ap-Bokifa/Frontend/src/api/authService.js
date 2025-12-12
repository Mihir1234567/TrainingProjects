import { api } from "./api";

const AUTH_URL = "/auth";

/**
 * Register a new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Response data
 */
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post(`${AUTH_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Login a user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Response data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`${AUTH_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Logout Helper (Client-side only for JWT)
 */
export const logoutUser = () => {
  // Ideally this just clears local state, but we ensure it's centralized here
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Sync user data (cart, wishlist, compare)
 * @param {Object} data - { cart, wishlist, compare }
 */
export const syncUserData = async (data) => {
  try {
    const response = await api.post(`${AUTH_URL}/sync`, data);
    return response.data;
  } catch (error) {
    console.error("Sync failed:", error); // Fail silently for UX
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch fresh user data
 */
export const fetchUserData = async () => {
  try {
    const response = await api.get(`${AUTH_URL}/data`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
