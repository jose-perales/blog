/**
 * Card component tests
 *
 * Tests that card CSS classes exist in globals.css.
 */

import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Card styles in globals.css", () => {
  describe(".card base class", () => {
    it("defines .card class", () => {
      expect(globalsCss).toMatch(/\.card\s*\{/);
    });

    it("has elevated background", () => {
      expect(globalsCss).toMatch(/\.card\s*\{[^}]*bg-background-elevated/);
    });

    it("has rounded corners", () => {
      expect(globalsCss).toMatch(/\.card\s*\{[^}]*rounded/);
    });

    it("has padding", () => {
      expect(globalsCss).toMatch(/\.card\s*\{[^}]*p-/);
    });
  });

  describe(".card-interactive variant", () => {
    it("defines .card-interactive class", () => {
      expect(globalsCss).toMatch(/\.card-interactive\s*\{/);
    });

    it("has hover state", () => {
      expect(globalsCss).toMatch(/\.card-interactive\s*\{[^}]*hover:/);
    });

    it("has transition", () => {
      expect(globalsCss).toMatch(/\.card-interactive\s*\{[^}]*transition/);
    });
  });
});
