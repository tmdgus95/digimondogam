import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        headerColor: "#14b8a6",
        headerText: "#99f624",
        cardBg: "#bfdbfe",

        level: {
          baby: "#FFD700",
          child: "#1E90FF",
          adult: "#DC143C",
          perfect: "#32CD32",
          ultimate: "#9370DB",
          unknown: "#9CA3AF",
        },

        attribute: {
          vaccine: "#2E8B57",
          virus: "#FF4500",
          data: "#4169E1",
          free: "#FFA500",
          unknown: "#6B7280",
        },
      },
    },
  },
  plugins: [],
};

export default config;
