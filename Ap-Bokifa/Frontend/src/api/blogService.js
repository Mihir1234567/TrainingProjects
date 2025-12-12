// blogService.js
import { api } from "./api"; // Assuming api.js exports the configured axios instance

export const fetchBlogs = async (params = {}) => {
  try {
    const response = await api.get("/blogs", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
