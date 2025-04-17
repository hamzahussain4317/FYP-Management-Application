import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          background: "#F0F0F0",
          surface: "#FFFFFF",
          text: "#1B252B",
          muted: "#7A7A7A",
          primary: "#FFD266",
          "primary-hover": "#E6B94E",
          border: "#D1D1D1",
        },
        dark: {
          background: "#1B252B",
          surface: "#2D343A",
          text: "#F0F0F0",
          muted: "#A0A0A0",
          primary: "#FFD266",
          "primary-hover": "#E6B94E",
          border: "#3D3D3D",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
