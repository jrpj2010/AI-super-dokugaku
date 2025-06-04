import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for "Meiji Modern" theme
        "wine-red": "#8C274C", // Main key color - A deep, slightly purplish red
        "wine-red-light": "#A84A6C", // Lighter shade for gradients
        "wine-red-dark": "#6F1A37", // Darker shade for gradients or depth
        "light-canvas": "#FBF9F7", // Off-white, slightly warm canvas background
        "accent-gold": "#B68D40", // A muted, antique gold for accents
        "accent-gold-light": "#D0A963",
        "accent-gold-dark": "#9C7739",
        "accent-green": "#5A7D7C", // A muted, traditional Japanese green
        "accent-green-dark": "#3E5655",
        "accent-yellow": "#D4A26A", // A muted, traditional Japanese yellow/ochre
        "accent-yellow-dark": "#B0844F",
        "accent-blue": "#6A8394", // A muted, traditional Japanese blue/grey
        "accent-blue-dark": "#495E6B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        serif: ["var(--font-noto-serif-jp)", "serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      boxShadow: {
        subtle: "var(--card-shadow-subtle)",
        strong: "var(--card-shadow-strong)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
