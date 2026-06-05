import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        graphite: "#141210",
        porcelain: "#f7f2e8",
        pearl: "#fbf8f1",
        champagne: "#d6ad57",
        ember: "#8a6423"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        cinematic: "0 40px 120px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
