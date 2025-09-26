/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#e50914", // Accent color (red)
        background: "#0a0a0a", // Custom background
        surface: "#141414", // Section surface background
      },
      fontFamily: {
        mono: [
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(229, 9, 20, 0.25)", // Glow effect
      },
      borderRadius: {
        xl: "15px", // Larger border radius
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeup: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        fadeup: "fadeup 600ms ease-out both",
      },
    },
  },
  plugins: [],
};
