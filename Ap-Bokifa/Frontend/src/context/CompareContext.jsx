import React, { createContext, useState, useContext, useEffect } from "react";

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const savedCompareList = localStorage.getItem("compareList");
    return savedCompareList ? JSON.parse(savedCompareList) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (product) => {
    setCompareList((prevList) => {
      const isInCompare = prevList.some((item) => item.id === product.id);
      if (isInCompare) {
        return prevList.filter((item) => item.id !== product.id);
      } else {
        return [...prevList, product];
      }
    });
  };

  const isInCompare = (productId) => {
    return compareList.some((item) => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, toggleCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
