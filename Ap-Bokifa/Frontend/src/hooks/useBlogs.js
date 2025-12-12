// useBlogs.js
import { useState, useEffect } from "react";
import { fetchBlogs, fetchBlogById } from "../api/blogService";

export const useBlogs = (params = {}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs(params);
        if (isMounted) {
          // Assuming the API returns { success: true, count: N, data: [...] }
          // If structure is different, adjust here.
          setBlogs(data.data || []);
        }
      } catch (err) {
        if (isMounted) setError(err);
        console.error("Failed to fetch blogs:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]);
  // Note: JSON.stringify(params) is a simple way to deep compare dependancy,
  // but if params are stable, just listing them is fine.
  // For simplicity here, relying on the hook re-running if params object reference changes
  // might be safer if the user doesn't memoize params.
  // But let's stick to simple dependency array or manual reload if needed.
  // Actually, better to just put no dependency if it's "on mount" or check specific keys.
  // Let's assume params are stable or we want to refetch when they change.

  return { blogs, loading, error };
};
