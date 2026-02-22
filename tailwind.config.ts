import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mandatory Brand Colors - Sage-dominant palette
        sage: {
          "50": "#f6f7f6",
          "100": "#e3e6e3",
          "200": "#c7cdc7",
          "300": "#a1aba1",
          "400": "#7d887d",
          "500": "#5b6960", // Primary - Sage
          "600": "#495449",
          "700": "#3c443c",
          "800": "#323732",
          "900": "#2b2f2b",
          DEFAULT: "#5b6960",
        },
        sand: {
          "50": "#faf8f5",
          "100": "#f5f1ec",
          "200": "#ebe4d9",
          "300": "#e0d6c6",
          "400": "#d4cbb8", // Sand/Cream background
          "500": "#c9bfaa",
          "600": "#b5a892",
          "700": "#9a8b74",
          "800": "#7d7159",
          "900": "#635b48",
          DEFAULT: "#d4cbb8",
        },
        cream: {
          "50": "#f1e9de",
          "100": "#ebe1d4",
          "200": "#d4cbb8", // Matches Sand 400
          "300": "#c7bba6",
          "400": "#baab94",
          "500": "#ad9b82",
          "600": "#9c8a70",
          "700": "#8b795e",
          "800": "#7a684c",
          "900": "#69573a",
          DEFAULT: "#d4cbb8",
        },
        charcoal: {
          "50": "#f8f9fa",
          "100": "#e9ecef",
          "200": "#dee2e6",
          "300": "#ced4da",
          "400": "#adb5bd",
          "500": "#6c757d",
          "600": "#495057",
          "700": "#343a40",
          "800": "#2a2f32", // Text/contrast
          "900": "#212529",
          DEFAULT: "#2a2f32",
        },
        clay: {
          "50": "#faf5f2",
          "100": "#f4ebe5",
          "200": "#e8d6ca",
          "300": "#dcc2af",
          "400": "#d0ad94",
          "500": "#9c604d", // CTA/accent
          "600": "#8d5644",
          "700": "#7d4c3b",
          "800": "#6e4232",
          "900": "#5e3829",
          DEFAULT: "#9c604d",
        },
        coral: {
          "50": "#faf5f2",
          "100": "#f4ebe5",
          "200": "#e8d6ca",
          "300": "#dcc2af",
          "400": "#d0ad94",
          "500": "#9c604d", // Matches Clay 500
          "600": "#8a5545",
          "700": "#784a3d",
          "800": "#663f35",
          "900": "#54342d",
          DEFAULT: "#9c604d",
        },
        // Warm tones - ONLY for passive membership status
        warm: {
          "50": "#fefaf7",
          "100": "#fdf2e7",
          "200": "#fbe4c4",
          "300": "#f7d197",
          "400": "#E6A15C", // Passive membership
          "500": "#D9893F", // Passive membership hover
          "600": "#de8b2a",
          "700": "#B86A2E", // Passive membership active
          "800": "#955925",
          "900": "#7a4b22",
        },
        // Semantic aliases - shadcn/ui compatible
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Newsreader", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      boxShadow: {
        "card-standard": "0 4px 12px rgba(0, 0, 0, 0.05)", // Standard card shadow
        "sage-sm": "0 1px 2px 0 rgb(91 105 96 / 0.05)",
        sage: "0 1px 3px 0 rgb(91 105 96 / 0.1), 0 1px 2px -1px rgb(91 105 96 / 0.1)",
        "sage-md":
          "0 4px 6px -1px rgb(91 105 96 / 0.1), 0 2px 4px -2px rgb(91 105 96 / 0.1)",
        "sage-lg":
          "0 10px 15px -3px rgb(91 105 96 / 0.1), 0 4px 6px -4px rgb(91 105 96 / 0.1)",
        "sage-xl":
          "0 20px 25px -5px rgb(91 105 96 / 0.1), 0 8px 10px -6px rgb(91 105 96 / 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
