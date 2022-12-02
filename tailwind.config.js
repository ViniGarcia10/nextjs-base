/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#c7d0d8",
        jungle: "#1a1d28",
        gunmetal: "#2e3142",
        green: "#43bc70",
        red: "#F25F5C",
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#c7d0d8",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
