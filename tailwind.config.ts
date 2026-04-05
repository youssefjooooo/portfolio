import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        chroma: {
          sky: '#38bdf8',
          green: '#4ade80',
          purple: '#a78bfa',
          amber: '#fbbf24',
        },
      },
      boxShadow: {
        // Chroma-shadows: large blur, low opacity, functional color per category
        'chroma-sky': '0 0 60px 20px rgba(56, 189, 248, 0.15)',
        'chroma-green': '0 0 60px 20px rgba(74, 222, 128, 0.15)',
        'chroma-purple': '0 0 60px 20px rgba(167, 139, 250, 0.15)',
        'chroma-amber': '0 0 60px 20px rgba(251, 191, 36, 0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-dense': '0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.14)',
      },
      animation: {
        // CTA shimmer: diagonal light streak on 3s loop
        'shimmer': 'shimmer 3s ease-in-out infinite',
        // Tech stack ticker
        'infinite-scroll': 'infinite-scroll 35s linear infinite',
        // Availability pulse
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { transform: 'translateX(-160%) skewX(-20deg)' },
          '100%': { transform: 'translateX(360%) skewX(-20deg)' },
        },
        'infinite-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
