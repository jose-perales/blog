/**
 * Input component tests
 *
 * Tests that form input CSS classes exist in globals.css with dark styling.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Input styles in globals.css", () => {
  describe(".input base class", () => {
    it("defines .input class", () => {
      expect(globalsCss).toMatch(/\.input\s*\{/);
    });

    it("has elevated background for dark theme", () => {
      expect(globalsCss).toMatch(/\.input\s*\{[^}]*bg-background-elevated/);
    });

    it("uses foreground text color", () => {
      expect(globalsCss).toMatch(/\.input\s*\{[^}]*text-foreground/);
    });

    it("has subtle border", () => {
      expect(globalsCss).toMatch(/\.input\s*\{[^}]*border-accent-subtle/);
    });

    it("includes focus ring styling", () => {
      expect(globalsCss).toMatch(/\.input\s*\{[^}]*focus-visible:/);
    });

    it("has placeholder styling", () => {
      expect(globalsCss).toMatch(/\.input\s*\{[^}]*placeholder:/);
    });
  });

  describe(".input-error variant", () => {
    it("defines .input-error class", () => {
      expect(globalsCss).toMatch(/\.input-error\s*\{/);
    });

    it("uses error color for border", () => {
      expect(globalsCss).toMatch(/\.input-error\s*\{[^}]*border-error/);
    });
  });

  describe(".label class", () => {
    it("defines .label class", () => {
      expect(globalsCss).toMatch(/\.label\s*\{/);
    });

    it("uses secondary foreground color", () => {
      expect(globalsCss).toMatch(/\.label\s*\{[^}]*text-foreground/);
    });
  });
});
