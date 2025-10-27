import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        sage: {
          "50": "#f6f7f6",
          "100": "#e3e6e3",
          "200": "#c7cdc7",
          "300": "#a1aba1",
          "400": "#7d887d",
          "500": "#5b6960",
          "600": "#495449",
          "700": "#3c443c",
          "800": "#323732",
          "900": "#2b2f2b",
        },
        warm: {
          "50": "#fefaf7",
          "100": "#fdf2e7",
          "200": "#fbe4c4",
          "300": "#f7d197",
          "400": "#f2b968",
          "500": "#eda145",
          "600": "#de8b2a",
          "700": "#b96f23",
          "800": "#955925",
          "900": "#7a4b22",
        },
        coral: {
          "50": "#f1e9de",
          "100": "#d4cbb8",
          "200": "#c2b5a0",
          "300": "#b09f88",
          "400": "#9e8970",
          "500": "#9c604d",
          "600": "#8a5545",
          "700": "#784a3d",
          "800": "#663f35",
          "900": "#54342d",
        },
        cream: {
          "50": "#f1e9de",
          "100": "#ebe1d4",
          "200": "#d4cbb8",
          "300": "#c7bba6",
          "400": "#baab94",
          "500": "#ad9b82",
          "600": "#9c8a70",
          "700": "#8b795e",
          "800": "#7a684c",
          "900": "#69573a",
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
          "800": "#2a2f32",
          "900": "#212529",
        },
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
