import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        canvas: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          deep:    "rgb(var(--canvas-deep) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          strong:  "var(--ink-strong)",
          mid:     "var(--ink-mid)",
          muted:   "var(--ink-muted)",
          subtle:  "var(--ink-subtle)",
          faint:   "var(--ink-faint)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          violet:  "rgb(var(--accent-violet) / <alpha-value>)",
          cyan:    "rgb(var(--accent-cyan) / <alpha-value>)",
          soft:    "rgb(var(--accent) / 0.16)",
          glow:    "rgb(var(--accent) / 0.40)",
        },
        glass: {
          DEFAULT: "var(--glass-bg)",
          strong:  "var(--glass-bg-strong)",
          soft:    "var(--glass-bg-soft)",
          border:  "var(--glass-border)",
        },
      },
      boxShadow: {
        "glow-blue": "0 0 36px rgb(var(--accent) / 0.40)",
        "glow-soft": "0 0 60px rgb(var(--accent) / 0.22)",
      },
      backdropBlur: {
        xs: "4px",
        glass: "22px",
        dense: "34px",
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
        "bloom-drift": {
          "0%, 100%": { transform: "translate3d(-2%, 1%, 0) scale(1.06)" },
          "50%":      { transform: "translate3d(3%, -4%, 0) scale(1.18)" },
        },
        "bloom-drift-alt": {
          "0%, 100%": { transform: "translate3d(3%, -2%, 0) scale(1.12)" },
          "50%":      { transform: "translate3d(-4%, 3%, 0) scale(1)"    },
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
        "bloom-drift":     "bloom-drift 22s ease-in-out infinite",
        "bloom-drift-alt": "bloom-drift-alt 28s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
