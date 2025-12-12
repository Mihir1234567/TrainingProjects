// src/hooks/useRecentlyViwed.jsx

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recentlyViewedItems";
const MAX_ITEMS = 5; // Limits the number of items stored

const useRecentlyViewed = () => {
  // Initialize state from local storage or an empty array
  const [viewedItems, setViewedItems] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      const parsed = item ? JSON.parse(item) : [];
      // Deduplicate on load to fix legacy data issues
      const uniqueMap = new Map();
      parsed.forEach((p) => {
        if (p && p.id && !uniqueMap.has(p.id)) {
          uniqueMap.set(p.id, p);
        }
      });
      return Array.from(uniqueMap.values());
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return [];
    }
  });

  // Effect to update local storage whenever viewedItems changes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedItems));
    } catch (error) {
      console.error("Error writing to local storage:", error);
    }
  }, [viewedItems]);

  // Function to add a product to the recently viewed list
  const addRecentlyViewed = useCallback((product) => {
    // Use updater form to compute newItems and persist immediately
    // Compute new items using functional updater but avoid dispatching
    // events or performing side-effects synchronously *inside* the
    // state updater, because that can trigger other components to set
    // state while this component is rendering. Instead, schedule the
    // side-effects to run asynchronously after state is queued.
    setViewedItems((currentItems) => {
      const filtered = currentItems.filter((item) => item.id !== product.id);
      const newItems = [product, ...filtered].slice(0, MAX_ITEMS);

      // Persist to localStorage synchronously is still safe here
      // because it's not triggering React updates. Keep it but in a
      // try/catch to avoid breaking execution.
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      } catch (error) {
        console.error("Error writing to local storage:", error);
      }

      // Schedule broadcast asynchronously to avoid triggering
      // setState calls in other components during this render.
      setTimeout(() => {
        try {
          const event = new CustomEvent("recently-viewed-updated", {
            detail: newItems,
          });
          window.dispatchEvent(event);
        } catch (e) {
          // ignore
        }
      }, 0);

      return newItems;
    });
  }, []);

  // 🌟 NEW: Helper boolean for conditional rendering
  const hasViewedItems = viewedItems.length > 0;

  // Listen for broadcasts inside the same window so different components using this hook
  // update instantly when any component adds a recently viewed item.
  useEffect(() => {
    const handler = (e) => {
      if (e && e.detail) {
        setViewedItems(e.detail);
      }
    };

    window.addEventListener("recently-viewed-updated", handler);
    return () => window.removeEventListener("recently-viewed-updated", handler);
  }, []);

  return {
    viewedItems,
    addRecentlyViewed,
    MAX_ITEMS,
    hasViewedItems, // 🌟 EXPORT NEW HELPER
  };
};

export default useRecentlyViewed;
