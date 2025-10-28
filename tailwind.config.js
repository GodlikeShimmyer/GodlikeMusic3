/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'godlike-green': '#00FF9D',
        'godlike-blue': '#00B7FF',
        'godlike-cyan': '#00FFF7',
        border: '#1f2937', // fix: define safe color for border-border
      },
    },
  },
  plugins: [],
}
