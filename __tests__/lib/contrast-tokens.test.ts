/**
 * Test: Contrast Token Compliance (T004)
 *
 * Asserts that `text-sage-600` does not co-occur with light background tokens
 * on the same HTML element in any public page source file (FR-018).
 *
 * `text-sage-600` on light backgrounds fails WCAG AA (~3.8:1 contrast).
 * Body/paragraph text must use `text-sage-700` or `text-charcoal-700` instead.
 *
 * Strategy: Regex scan of raw source files.
 *
 * This test MUST FAIL initially because uber-uns/page.tsx has many `text-sage-600`
 * occurrences on light backgrounds.
 * It passes after T009 (globals.css fix) and T013 (uber-uns page fix).
 */

import * as fs from "fs";
import * as path from "path";

const PAGES_DIR = path.resolve(process.cwd(), "src/app");

const PUBLIC_PAGES = [
  "public-landing/page.tsx",
  "uber-uns/page.tsx",
  "spenden/page.tsx",
  "veranstaltungen/page.tsx",
  "kontakt/page.tsx",
  "mitglied-werden/page.tsx",
];

// Light background tokens that should NOT be paired with text-sage-600
const LIGHT_BACKGROUND_TOKENS = [
  "bg-white",
  "bg-sand-50",
  "bg-cream-50",
  "bg-sage-50",
  "from-cream-50",
  "from-sage-50",
  "via-white",
];

/**
 * Looks for className strings that contain BOTH text-sage-600 AND a light
 * background token on a single JSX element (same className value).
 */
function findSage600OnLightBackground(source: string): string[] {
  const violations: string[] = [];

  // Match className="..." or className={`...`} strings
  const classAttrRegex = /className=["'`]([^"'`]+)["'`]/g;
  let match: RegExpExecArray | null;

  while ((match = classAttrRegex.exec(source)) !== null) {
    const classes = match[1];
    if (
      classes.includes("text-sage-600") &&
      LIGHT_BACKGROUND_TOKENS.some((bg) => classes.includes(bg))
    ) {
      violations.push(classes);
    }
  }

  return violations;
}

describe("Contrast token compliance — text-sage-600 on light backgrounds (FR-018)", () => {
  PUBLIC_PAGES.forEach((relativePath) => {
    const filePath = path.join(PAGES_DIR, relativePath);
    const pageName = relativePath.replace("/page.tsx", "");

    it(`${pageName} has no text-sage-600 paired with light background on same element`, () => {
      const source = fs.readFileSync(filePath, "utf-8");
      const violations = findSage600OnLightBackground(source);

      expect(violations).toHaveLength(0);
    });
  });

  it("uber-uns/page.tsx has no standalone text-sage-600 on paragraph body text", () => {
    const source = fs.readFileSync(
      path.join(PAGES_DIR, "uber-uns/page.tsx"),
      "utf-8",
    );
    // Paragraphs with className containing text-sage-600 (body text violation)
    const bodyTextViolation = /<p[^>]*className="[^"]*text-sage-600[^"]*"/.test(
      source,
    );
    expect(bodyTextViolation).toBe(false);
  });
});
