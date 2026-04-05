import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      // ── Monochromatic shadows only ──────────────────────────────────
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.40)",
        "glass-lg":
          "0 0 0 1px rgba(255,255,255,0.14), 0 12px 48px rgba(0,0,0,0.55)",
        "glow-sm": "0 0 24px rgba(255,255,255,0.06)",
        "glow-md": "0 0 48px rgba(255,255,255,0.08)",
      },
      // ── Keyframes ──────────────────────────────────────────────────
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-160%) skewX(-20deg)" },
          "100%": { transform: "translateX(360%)  skewX(-20deg)" },
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        float: "float 4s ease-in-out infinite",
        blink: "blink 1.1s step-start infinite",
        "fade-in": "fade-in 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
