/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
