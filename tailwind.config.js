/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5f6f52',
        secondary: '#f9f1e7',
        navbarcolor:'#B70E16',
        footercolor: '#292A2C',
        bodycolor: '#ECF4FF',
      },
    },
  },
  plugins: [],
}
