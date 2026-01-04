/**
 * Navigation component tests
 *
 * Tests that navigation renders with correct styling.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const layoutPath = path.join(process.cwd(), "app/layout.tsx");
const layoutContent = fs.readFileSync(layoutPath, "utf-8");

describe("Navigation in layout.tsx", () => {
  it("nav element exists", () => {
    expect(layoutContent).toMatch(/<nav/);
  });

  it("uses subtle border for nav", () => {
    // Nav should have border-accent-subtle for the bottom border
    expect(layoutContent).toMatch(/border-accent-subtle/);
  });

  it("nav links use secondary foreground color", () => {
    // Links should start with text-foreground-secondary
    expect(layoutContent).toMatch(/text-foreground-secondary/);
  });

  it("nav links have hover state", () => {
    // Links should have hover:text-foreground
    expect(layoutContent).toMatch(/hover:text-foreground/);
  });

  it("site title/logo uses foreground color", () => {
    // Main site link should use text-foreground (not secondary)
    expect(layoutContent).toMatch(/text-foreground[^-]/);
  });
});
