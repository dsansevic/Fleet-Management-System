/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkText: '#3b82f6',
        errorText: '#ef4444'
      }
    },
  },
  plugins: [],
};