import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Sleek Indigo Blue
        secondary: "#22C55E", // Vibrant Green
        accent: "#FACC15", // Golden Yellow for CTA
        background: "#F8FAFC", // Light Grayish Blue
        text: "#1E293B", // Darker Gray for Readability
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
