/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}", // include your app folder
    "./src/**/*.{js,ts,jsx,tsx}"   // optional if you have src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}