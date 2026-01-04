import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Tailwind v4 uses CSS-first configuration via @theme in globals.css
// We test the CSS file directly instead of tailwind.config.ts

describe("Typography Scale (CSS @theme)", () => {
  const cssPath = path.join(process.cwd(), "app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  describe("Font Sizes (1.25 ratio, 18px base)", () => {
    it("defines xs size (12px / 0.75rem)", () => {
      expect(cssContent).toContain("--text-xs: 0.75rem");
    });

    it("defines sm size (14px / 0.875rem)", () => {
      expect(cssContent).toContain("--text-sm: 0.875rem");
    });

    it("defines base size (18px / 1.125rem)", () => {
      expect(cssContent).toContain("--text-base: 1.125rem");
    });

    it("defines lg size (20px / 1.25rem)", () => {
      expect(cssContent).toContain("--text-lg: 1.25rem");
    });

    it("defines xl size (24px / 1.5rem)", () => {
      expect(cssContent).toContain("--text-xl: 1.5rem");
    });

    it("defines 2xl size (30px / 1.875rem)", () => {
      expect(cssContent).toContain("--text-2xl: 1.875rem");
    });

    it("defines 3xl size (36px / 2.25rem)", () => {
      expect(cssContent).toContain("--text-3xl: 2.25rem");
    });

    it("defines 4xl size (48px / 3rem)", () => {
      expect(cssContent).toContain("--text-4xl: 3rem");
    });
  });

  describe("Line Heights", () => {
    it("base has line-height 1.7 (1.9125rem for 18px)", () => {
      expect(cssContent).toContain("--text-base--line-height: 1.9125rem");
    });

    it("headings have line-height 1.3", () => {
      expect(cssContent).toContain("--text-2xl--line-height: 2.4375rem");
      expect(cssContent).toContain("--text-3xl--line-height: 2.925rem");
      expect(cssContent).toContain("--text-4xl--line-height: 3.9rem");
    });
  });

  describe("Letter Spacing", () => {
    it("defines tighter letter spacing for headings", () => {
      expect(cssContent).toContain("--tracking-tighter: -0.02em");
    });
  });
});

describe("Content Width Constraints (CSS @theme)", () => {
  const cssPath = path.join(process.cwd(), "app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  it("defines content width (42rem / 672px)", () => {
    expect(cssContent).toContain("--width-content: 42rem");
  });

  it("defines wide width (56rem / 896px)", () => {
    expect(cssContent).toContain("--width-wide: 56rem");
  });

  it("defines page width (72rem / 1152px)", () => {
    expect(cssContent).toContain("--width-page: 72rem");
  });
});
