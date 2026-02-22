/**
 * Test: CTA Dead-End Coverage (T003)
 *
 * Asserts:
 * - uber-uns/page.tsx contains data-cta="primary" (has a contextual CTA — FR-014)
 * - veranstaltungen/page.tsx contains data-cta="primary" (has a contextual CTA — FR-015)
 * - Pages that already have inherent actions do NOT gain new data-cta markers
 *   (kontakt, spenden, mitglied-werden, public-landing)
 *
 * Strategy: Source-file scan (avoids complex Next.js page rendering mocks).
 * Scan the raw source text of each page file.
 *
 * These tests MUST FAIL initially (no data-cta attributes exist yet).
 * They pass after T013 (uber-uns) and T015 (veranstaltungen) are implemented.
 */

import * as fs from "fs";
import * as path from "path";

const PAGES_DIR = path.resolve(process.cwd(), "src/app");

function readPage(relativePath: string): string {
  return fs.readFileSync(path.join(PAGES_DIR, relativePath), "utf-8");
}

const CTA_MARKER = 'data-cta="primary"';

// Pages that are dead ends and MUST receive a single CTA
const DEAD_END_PAGES: { label: string; file: string }[] = [
  { label: "uber-uns", file: "uber-uns/page.tsx" },
  { label: "veranstaltungen", file: "veranstaltungen/page.tsx" },
];

// Pages that already have inherent actions — MUST NOT gain new CTAs
const NO_NEW_CTA_PAGES: { label: string; file: string }[] = [
  { label: "kontakt", file: "kontakt/page.tsx" },
  { label: "spenden", file: "spenden/page.tsx" },
  { label: "mitglied-werden", file: "mitglied-werden/page.tsx" },
];

describe("CTA dead-end coverage (FR-014, FR-015, Section C principle)", () => {
  describe("Dead-end pages MUST have data-cta='primary'", () => {
    DEAD_END_PAGES.forEach(({ label, file }) => {
      it(`${label} renders at least one element with data-cta="primary"`, () => {
        const source = readPage(file);
        expect(source).toContain(CTA_MARKER);
      });
    });
  });

  describe("Pages with inherent actions MUST NOT gain new data-cta markers", () => {
    NO_NEW_CTA_PAGES.forEach(({ label, file }) => {
      it(`${label} does not contain data-cta="primary" (no CTA spam)`, () => {
        const source = readPage(file);
        expect(source).not.toContain(CTA_MARKER);
      });
    });
  });
});
