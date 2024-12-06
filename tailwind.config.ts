// import { WrappedNextRouterError } from "next/dist/server/route-modules/app-route/module";
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
        primary: {
          light: "#93c5fd", // Light Blue
          DEFAULT: "#3b82f6", // Default Blue
          dark: "#1e3a8a", // Dark Blue
        },
        secondary: {
          light: "#fde68a", // Light Yellow
          DEFAULT: "#f59e0b", // Default Yellow
          dark: "#b45309", // Dark Yellow
        },
        customGray: {
          light: "#d1d5db",
          DEFAULT: "#6b7280",
          dark: "#4b5563",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
