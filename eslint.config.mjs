import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "mockups/**",
      "next-env.d.ts",
      ".claude/**",
      "supabase/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Warn against hardcoded hex colors - use Tailwind design tokens instead
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/#[0-9A-Fa-f]{3,8}/]",
          message:
            "Avoid hardcoded hex colors. Use Tailwind design tokens (e.g., bg-sage, text-charcoal) instead.",
        },
      ],
      // Underscore prefix marks intentionally unused vars/args
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Files where raw hex values are unavoidable: the token definitions
    // themselves, the palette audit page, third-party brand colors, PWA/meta
    // theme colors, inline email CSS, and Leaflet marker SVGs
    files: [
      "tailwind.config.ts",
      "src/app/page-audit/**",
      "src/app/layout.tsx",
      "src/components/SocialMediaSection.tsx",
      "src/components/map/**",
      "src/lib/email/**",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
];

export default eslintConfig;
