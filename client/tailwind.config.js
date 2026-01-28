/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b9e7ff',
          300: '#89daff',
          400: '#52c4ff',
          500: '#2aa6ff',
          600: '#1489f8',
          700: '#0d6fe4',
          800: '#1259b9',
          900: '#154c91',
        }
      }
    },
  },
  plugins: [],
}