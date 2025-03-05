import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5A67D8", // Vibrant blue
        secondary: "#48BB78", // Fresh green
        accent: "#F6AD55", // Warm orange for CTAs
        background: "#F7FAFC", // Light grey-white
        textcolor: "#2D3748", // Dark text
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
