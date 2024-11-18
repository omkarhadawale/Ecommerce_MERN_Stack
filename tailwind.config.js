/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './frontend/pages/**/*.{js,ts,jsx,tsx}',     // All files in the pages directory
    './frontend/components/**/*.{js,ts,jsx,tsx}', // All components
    './frontend/utils/**/*.{js,ts,jsx,tsx}',    // Utility files if they contain class names
    './public/**/*.html',              
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

