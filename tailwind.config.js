/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      borderWidth: {
        "3": "3px"
      },
      colors: {
        green: {
          450: "#538D4E"
        },
        yellow: {
          450: "#B59F3B"
        }
      },
      height: {
        "18": "4.5rem"
      }
    },
  },
  plugins: [],
};
