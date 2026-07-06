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
    },
  },
];

export default eslintConfig;
