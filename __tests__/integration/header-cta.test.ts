/**
 * Test: Header "Mitglied werden" CTA (T007)
 *
 * Asserts that the header source file contains a "Mitglied werden" button or link
 * pointing to /mitglied-werden (FR-012).
 *
 * This test MUST FAIL initially — no such element exists in header.tsx.
 * It passes after T010 adds the "Mitglied werden" button to the header.
 */

import * as fs from "fs";
import * as path from "path";

const HEADER_PATH = path.resolve(
  process.cwd(),
  "src/components/layout/header.tsx",
);

describe("Header CTA — Mitglied werden (FR-012, FR-025)", () => {
  let source: string;

  beforeAll(() => {
    source = fs.readFileSync(HEADER_PATH, "utf-8");
  });

  it('header.tsx contains a link to "/mitglied-werden"', () => {
    expect(source).toContain("/mitglied-werden");
  });

  it('header.tsx contains the label "Mitglied werden" for the CTA button', () => {
    expect(source).toMatch(/Mitglied werden/);
  });

  it('header "Spenden" uses a defined Button variant (not custom inline classes)', () => {
    // After T010: should use variant="secondary" or variant="outline"
    // Before T010: uses custom bg-sage-700 classes — this should NOT be present
    expect(source).not.toMatch(
      /className="[^"]*bg-sage-700[^"]*"[^>]*>(\s*|{[^}]*})Spenden/,
    );
  });
});
