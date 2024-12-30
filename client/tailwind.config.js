/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", 
        foreground: "var(--foreground)",

        brand: {
          light: "var(--brand-light)", 
          base: "var(--brand-base)",  
          dark: "var(--brand-dark)",  
        },

        text: {
          primary: "var(--text-primary)", 
          secondary: "var(--text-secondary)",
        },

        error: "var(--error)", 
      },
    },
  },
  plugins: [],
};