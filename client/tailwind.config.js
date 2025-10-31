/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0c75ff",
        secondary: "#0aa1c5",
        dark: "#0f172a",
      },
    },
  },
  plugins: [],
};
