import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure you include all necessary files for purging unused styles
  theme: {
    extend: {
      colors: {
        // You can add custom colors here
        primary: "#ff6347", // Example custom primary color
        secondary: "#6a5acd", // Example custom secondary color
      },
      fontFamily: {
        // Custom fonts can be added here
        sans: ['"Open Sans"', "Arial", "sans-serif"],
        heading: ['"Roboto Slab"', "serif"],
      },
      boxShadow: {
        // Custom box shadows
        "outline-primary": "0 0 0 2px rgba(255, 99, 71, 0.5)", // example shadow
      },
      spacing: {
        // Custom spacing (padding, margin, etc.)
        18: "4.5rem", // Example custom spacing value
      },
      animation: {
        // Custom animations
        "fade-in": "fadeIn 0.5s ease-in",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      // Add any custom themes here
    ],
    // Optional: Set a default theme
    defaultTheme: "light", // You can set this to any theme from the list
  },
};
