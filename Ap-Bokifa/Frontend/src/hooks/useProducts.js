import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/productService";

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    count: 0,
  });

  const loadProducts = useCallback(
    async (params = initialParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProducts(params);

        // Handle wrapped response with metadata (Standard for our API)
        if (response && Array.isArray(response.data)) {
          setProducts(response.data);
          setPagination({
            page: response.page || 1,
            totalPages: response.totalPages || 1,
            total: response.total || 0,
            count: response.count || 0,
          });
        }
        // Handle legacy direct array response (fallback)
        else if (Array.isArray(response)) {
          setProducts(response);
          setPagination({
            page: 1,
            totalPages: 1,
            total: response.length,
            count: response.length,
          });
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    },
    // FIX: Depend on stringified params to prevent infinite loop on new object references
    [JSON.stringify(initialParams)]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, pagination, refetch: loadProducts };
};
