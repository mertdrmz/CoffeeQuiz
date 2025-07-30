/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          600: '#7c2d12',
          700: '#92400e',
          800: '#78350f',
        }
      }
    },
  },
  plugins: [],
}