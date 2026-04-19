// ============================================================
// FILE: tailwind.config.js
// ACTION: REPLACE your existing tailwind.config.js with this
//         (it is in the ROOT of your frontend/ folder)
// ============================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};