import { api } from "./api";

// Fetch all products with optional query params
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data; // Expected { success: true, data: [...] }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // Expected { success: true, data: {...} }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
