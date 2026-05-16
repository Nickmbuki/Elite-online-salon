import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#fffaf5",
        champagne: "#f5dfc6",
        blush: "#f4c7c5",
        roseGold: "#b77b6b",
        espresso: "#3f2a24",
        cocoa: "#6b4a40",
        sage: "#7e8f75",
        softWhite: "#fffdf9"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(183, 123, 107, 0.22)",
        soft: "0 20px 45px rgba(63, 42, 36, 0.12)"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
