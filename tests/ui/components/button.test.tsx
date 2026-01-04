/**
 * Button component tests
 *
 * Tests that button CSS classes exist in globals.css and apply correct styling.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Button styles in globals.css", () => {
  describe(".btn base class", () => {
    it("defines .btn class", () => {
      expect(globalsCss).toMatch(/\.btn\s*\{/);
    });

    it("includes rounded corners", () => {
      // Should have rounded-md or similar
      expect(globalsCss).toMatch(/\.btn\s*\{[^}]*rounded/);
    });

    it("includes transition for hover states", () => {
      expect(globalsCss).toMatch(/\.btn\s*\{[^}]*transition/);
    });
  });

  describe(".btn-ghost variant", () => {
    it("defines .btn-ghost class", () => {
      expect(globalsCss).toMatch(/\.btn-ghost\s*\{/);
    });

    it("has transparent background", () => {
      expect(globalsCss).toMatch(/\.btn-ghost\s*\{[^}]*bg-transparent/);
    });

    it("uses foreground text color", () => {
      expect(globalsCss).toMatch(/\.btn-ghost\s*\{[^}]*text-foreground/);
    });
  });

  describe(".btn-solid variant", () => {
    it("defines .btn-solid class", () => {
      expect(globalsCss).toMatch(/\.btn-solid\s*\{/);
    });

    it("uses foreground as background", () => {
      expect(globalsCss).toMatch(/\.btn-solid\s*\{[^}]*bg-foreground/);
    });

    it("uses background as text color", () => {
      expect(globalsCss).toMatch(/\.btn-solid\s*\{[^}]*text-background/);
    });
  });
});
