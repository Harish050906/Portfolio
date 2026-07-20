/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#09090b", // Zinc 950
          800: "#18181b", // Zinc 900
          700: "#27272a", // Zinc 800
        },
        brand: {
          purple: "#8b5cf6", // Violet 500
          blue: "#3b82f6", // Blue 500
          cyan: "#06b6d4", // Cyan 500
          magenta: "#ec4899", // Pink 500
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
