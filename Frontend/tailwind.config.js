/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px", // Mobile Large
        // 'sm': '640px', // Default
        // 'md': '768px', // Default
        // 'lg': '1024px', // Default
        // 'xl': '1280px', // Default
        "2xl": "1440px", // Desktop
      },
      colors: {
        torado: {
          green: {
            500: "#34d399",
            600: "#10b981",
          },
          brand: {
            primary: "#5b6cf6",
            hover: "#4f5ed9",
          },
        },
      },
    },
  },
  plugins: [],
};
