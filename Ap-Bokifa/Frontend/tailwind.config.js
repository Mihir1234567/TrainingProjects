export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundOpacity: ["active"],

      animation: {
        // RENAME: Use a single-use slide-in animation
        "slide-in-up":
          "slide-in-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        // DEFINE: The custom keyframes for the slide animation
        "slide-in-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
