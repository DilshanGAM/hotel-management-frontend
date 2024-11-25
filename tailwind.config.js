/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adminTextHover: "#2275fc",
        adminText: "#111111",
      },
    },
  },
  plugins: [],
}