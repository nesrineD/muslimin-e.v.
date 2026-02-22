/**
 * Test: Footer Structure — No Erkunden Column (T008)
 *
 * Asserts that:
 * - The footer source does NOT contain an "Erkunden" navigation column (FR-024).
 *   Duplicating header navigation in the footer is redundant visual noise.
 * - Legal links (Impressum, Datenschutz) are still present.
 * - The footer still contains a contact link.
 *
 * This test MUST FAIL initially because footer.tsx has an "Erkunden" nav column.
 * It passes after T011 removes the column.
 */

import * as fs from "fs";
import * as path from "path";

const FOOTER_PATH = path.resolve(
  process.cwd(),
  "src/components/layout/footer.tsx",
);

describe("Footer structure (FR-024)", () => {
  let source: string;

  beforeAll(() => {
    source = fs.readFileSync(FOOTER_PATH, "utf-8");
  });

  it('footer.tsx does NOT contain an "Erkunden" heading', () => {
    // The Erkunden nav column must be removed entirely
    expect(source).not.toMatch(/Erkunden/);
  });

  it("footer.tsx does NOT render NAV_LINKS (header navigation duplication removed)", () => {
    // After T011: NAV_LINKS should no longer be imported or used in footer
    // (footer only contains brand, contact, social, legal)
    expect(source).not.toContain("NAV_LINKS");
  });

  it('footer.tsx still contains a link to "/kontakt"', () => {
    expect(source).toContain("/kontakt");
  });

  it("footer.tsx still imports LEGAL_LINKS (legal section preserved)", () => {
    expect(source).toContain("LEGAL_LINKS");
  });
});
