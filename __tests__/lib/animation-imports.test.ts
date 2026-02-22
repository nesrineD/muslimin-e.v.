/**
 * Test: Animation Import Compliance (T006)
 *
 * Asserts that no public page defines containerVariants or itemVariants locally.
 * All pages MUST import from `@/lib/animations` (FR-005).
 *
 * Local definitions cause drift over time: if the shared variants change,
 * locally-defined copies diverge silently.
 *
 * These tests MUST FAIL initially because uber-uns/page.tsx defines
 * containerVariants and itemVariants locally (around lines 14–33).
 * They pass after T013 (uber-uns) and T017 (mitglied-werden) remove local defs.
 */

import * as fs from "fs";
import * as path from "path";

const PAGES_DIR = path.resolve(process.cwd(), "src/app");

const PAGES_UNDER_TEST: { label: string; file: string }[] = [
  { label: "uber-uns", file: "uber-uns/page.tsx" },
  { label: "mitglied-werden", file: "mitglied-werden/page.tsx" },
  { label: "kontakt", file: "kontakt/page.tsx" },
  { label: "veranstaltungen", file: "veranstaltungen/page.tsx" },
  { label: "spenden", file: "spenden/page.tsx" },
  { label: "public-landing", file: "public-landing/page.tsx" },
];

const LOCAL_DEFINITION_PATTERNS = [
  // const containerVariants = {
  /const\s+containerVariants\s*=/,
  // const itemVariants = {
  /const\s+itemVariants\s*=/,
];

describe("Animation import compliance (FR-005)", () => {
  describe("No page may define containerVariants or itemVariants locally", () => {
    PAGES_UNDER_TEST.forEach(({ label, file }) => {
      it(`${label}/page.tsx does not define containerVariants locally`, () => {
        const source = fs.readFileSync(path.join(PAGES_DIR, file), "utf-8");
        expect(LOCAL_DEFINITION_PATTERNS[0].test(source)).toBe(false);
      });

      it(`${label}/page.tsx does not define itemVariants locally`, () => {
        const source = fs.readFileSync(path.join(PAGES_DIR, file), "utf-8");
        expect(LOCAL_DEFINITION_PATTERNS[1].test(source)).toBe(false);
      });
    });
  });
});
