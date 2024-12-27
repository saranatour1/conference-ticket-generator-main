const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        neutral: {
          0: "hsl(0, 0%, 100%)",
          300: "hsl(252, 6%, 83%)",
          500: "hsl(245, 15%, 58%)",
          700: "hsl(245, 19%, 35%)",
          900: "hsl(248, 70%, 10%)",
        },
        orange: {
          500: "hsl(7, 88%, 67%)",
          700: "hsl(7, 71%, 60%)",
        },
        gradient: {
          text: "hsl(7, 86%, 67%) to hsl(0, 0%, 100%)",
        },
      },
      fontFamily:{
        "inconsolata":['Inconsolata Variable', 'monospace']
      },
      backgroundImage:{
        desktop:"url('./src/assets/background-desktop.png')",
        tablet:"url('./src/assets/background-tablet.png')",
        mobile:"url('./src/assets/background-mobile.png')",
        "top-squiggly":"url('./src/assets/pattern-squiggly-line-top.svg')",
        "bottom-squiggly":"url('./src/assets/pattern-squiggly-line-bottom.svg')",
        "lines":"url('./src/assets/pattern-lines.svg')"
      }
    },
  },
  plugins: [animate],
}
