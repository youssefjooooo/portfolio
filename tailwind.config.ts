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
        sans:  ["var(--font-cairo)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B1020",
          strong: "rgba(11,16,32,0.92)",
          mid:    "rgba(11,16,32,0.62)",
          muted:  "rgba(11,16,32,0.42)",
          subtle: "rgba(11,16,32,0.22)",
          faint:  "rgba(11,16,32,0.10)",
        },
        glass: {
          DEFAULT:  "rgba(255,255,255,0.55)",
          soft:     "rgba(255,255,255,0.40)",
          strong:   "rgba(255,255,255,0.72)",
          tinted:   "rgba(255,255,255,0.62)",
          hover:    "rgba(255,255,255,0.78)",
          border:   "rgba(255,255,255,0.70)",
          edge:     "rgba(11,16,32,0.06)",
        },
        accent: {
          DEFAULT: "#4E7BFF",
          soft:    "rgba(78,123,255,0.18)",
          glow:    "rgba(78,123,255,0.35)",
        },
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.85) inset, 0 12px 40px -8px rgba(8,22,58,0.18), 0 4px 14px -4px rgba(8,22,58,0.10)",
        "glass-lg":
          "0 1px 0 0 rgba(255,255,255,0.95) inset, 0 24px 64px -12px rgba(8,22,58,0.24), 0 8px 24px -6px rgba(8,22,58,0.14)",
        "glass-sm":
          "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 6px 18px -6px rgba(8,22,58,0.14)",
        "glow-blue": "0 0 32px rgba(78,123,255,0.35)",
        "glow-soft": "0 0 60px rgba(255,255,255,0.55)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "22px",
        dense: "32px",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-160%) skewX(-18deg)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateX(360%) skewX(-18deg)", opacity: "0" },
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "float-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%":      { transform: "translateX(10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%":      { opacity: "1",    transform: "scale(1.06)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "ring-ripple": {
          "0%":   { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0"  },
        },
      },
      animation: {
        shimmer:           "shimmer 2.6s ease-in-out infinite",
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "float-y":         "float-y 6s ease-in-out infinite",
        "float-x":         "float-x 8s ease-in-out infinite",
        blink:             "blink 1.1s step-start infinite",
        "fade-in":         "fade-in 0.5s ease forwards",
        "gradient-shift":  "gradient-shift 10s ease-in-out infinite",
        "pulse-soft":      "pulse-soft 2.4s ease-in-out infinite",
        "spin-slow":       "spin-slow 22s linear infinite",
        "ring-ripple":     "ring-ripple 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
