/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: '#3b2f2f',
        mocha: '#5a3825',
        cocoa: '#4b2e05',
        creme: '#f8e8d0',
        latte: '#d9c3a6',
        beige: '#f5f0e6',
      },
    },
  },
  plugins: [],
}
