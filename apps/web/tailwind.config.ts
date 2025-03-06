import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",  // Sleek Bright Blue
        secondary: "#1E1E2E",  // Deep Navy
        accent: "#F5A623",  // Warm Amber
        background: "#F8F9FA",  // Off-White
        text: "#2D3748",  // Slate Gray
        success: "#48BB78",  // Success Green
        error: "#E53E3E",  // Error Red
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
