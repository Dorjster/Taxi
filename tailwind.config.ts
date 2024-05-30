import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      slideIn1: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut1: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      slideIn2: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut2: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      slideIn3: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut3: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      slideIn4: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut4: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
    animation: {
      slideIn: "slideIn 0.3s forwards",
      slideOut: "slideOut 0.3s forwards",
      slideIn1: "slideIn 0.5s forwards",
      slideOut1: "slideOut 0.5s forwards",
      slideIn2: "slideIn 0.7s forwards",
      slideOut2: "slideOut 0.7s forwards",
      slideIn3: "slideIn 0.9s forwards",
      slideOut3: "slideOut 0.9s forwards",
      slideIn4: "slideIn 1.1s forwards",
      slideOut4: "slideOut 1.1s forwards",
    },
  },

  plugins: [],
};
export default config;
