import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in forwards",
        "fade-grow": "fadeGrow 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeGrow: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
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
  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".global-text-size": {
          fontSize: "0.75rem",
          "@screen sm": { fontSize: "0.875rem" },
          "@screen md": { fontSize: "1rem" },
          "@screen lg": { fontSize: "1.125rem" },
          "@screen xl": { fontSize: "1.25rem" },
        },
        ".global-bg": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        ".global-margin": {
          margin: "1rem",
        },
      });
    },
  ],
};

export default config;
