import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ================= FONTS ================= */
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        epilogue: ["Epilogue", "sans-serif"],
      },

      /* ================= TEXT TOKENS ================= */
      colors: {
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",

        /* ================= BRAND COLORS ================= */
        brand: {
          primary: "#016656",
          "primary-dark": "#014D42",
          gold: "#C1A230",
          cream: "#F7F5F2",
          beige: "#FBF0D2",
          teal: "#81B1AA",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};

export default config;
