import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#ffffff",
        primary: "#ffffff", // Pure white neon glow
        accent1: "#cbd5e1", // Silver Slate (Zinc 300)
        accent2: "#71717a", // Muted Charcoal (Zinc 500)
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
