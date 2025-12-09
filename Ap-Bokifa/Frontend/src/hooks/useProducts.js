import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/productService";

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (params = initialParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts(params);
      setProducts(response.data || []);
    } catch (err) {
      setError(err);
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refetch: loadProducts };
};
