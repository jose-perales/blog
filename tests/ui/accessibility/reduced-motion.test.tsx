import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Accessibility - prefers-reduced-motion", () => {
  it("disables animations and transitions when reduced motion is enabled", () => {
    expect(globalsCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(globalsCss).toContain("animation-duration: 0.01ms !important");
    expect(globalsCss).toContain("animation-iteration-count: 1 !important");
    expect(globalsCss).toContain("transition-duration: 0.01ms !important");
    expect(globalsCss).toContain("scroll-behavior: auto !important");
  });
});
