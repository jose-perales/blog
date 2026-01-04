import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0a",
          elevated: "#141414",
          subtle: "#1a1a1a",
        },
        foreground: {
          DEFAULT: "#e5e5e5",
          secondary: "#a3a3a3",
          muted: "#525252",
        },
        accent: {
          DEFAULT: "#d4d4d4",
          hover: "#fafafa",
          subtle: "#404040",
        },
        code: {
          bg: "#0d0d0d",
          fg: "#c9d1d9",
        },
        success: "#4ade80",
        error: "#f87171",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Text", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "SF Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1.125rem", { lineHeight: "1.9125rem" }],
        lg: ["1.25rem", { lineHeight: "1.75rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.4375rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.925rem" }],
        "4xl": ["3rem", { lineHeight: "3.9rem" }],
      },
      letterSpacing: {
        tighter: "-0.02em",
      },
      maxWidth: {
        content: "42rem",
        wide: "56rem",
        page: "72rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
