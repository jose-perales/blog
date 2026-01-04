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
    },
  },
  plugins: [],
} satisfies Config;
