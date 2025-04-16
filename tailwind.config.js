/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B4073", // dark blue
        secondary: "#7094B7", // medium blue
        accent: "#D6E2EA", // light blue
        background: "#F9FAFB",
        text: "#1F2937",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        sans: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
