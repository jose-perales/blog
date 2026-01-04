import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Tailwind v4 uses CSS-first configuration via @theme in globals.css
// We test the CSS file directly

describe("Design Tokens (CSS @theme)", () => {
  const cssPath = path.join(process.cwd(), "app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  describe("Color Palette", () => {
    it("defines background colors", () => {
      expect(cssContent).toContain("--color-background: #0a0a0a");
      expect(cssContent).toContain("--color-background-elevated: #141414");
      expect(cssContent).toContain("--color-background-subtle: #1a1a1a");
    });

    it("defines foreground colors", () => {
      expect(cssContent).toContain("--color-foreground: #e5e5e5");
      expect(cssContent).toContain("--color-foreground-secondary: #a3a3a3");
      expect(cssContent).toContain("--color-foreground-muted: #525252");
    });

    it("defines accent colors", () => {
      expect(cssContent).toContain("--color-accent: #d4d4d4");
      expect(cssContent).toContain("--color-accent-hover: #fafafa");
      expect(cssContent).toContain("--color-accent-subtle: #404040");
    });

    it("defines code colors", () => {
      expect(cssContent).toContain("--color-code-bg: #0d0d0d");
      expect(cssContent).toContain("--color-code-fg: #c9d1d9");
    });

    it("defines semantic colors", () => {
      expect(cssContent).toContain("--color-success: #4ade80");
      expect(cssContent).toContain("--color-error: #f87171");
    });
  });

  describe("Spacing Scale", () => {
    it("extends spacing with additional values", () => {
      expect(cssContent).toContain("--spacing-18: 4.5rem");
      expect(cssContent).toContain("--spacing-22: 5.5rem");
      expect(cssContent).toContain("--spacing-30: 7.5rem");
    });
  });

  describe("Font Families", () => {
    it("defines sans-serif font stack", () => {
      expect(cssContent).toMatch(/--font-sans:.*Inter/);
      expect(cssContent).toMatch(/--font-sans:.*system-ui/);
    });

    it("defines monospace font stack", () => {
      expect(cssContent).toMatch(/--font-mono:.*JetBrains Mono/);
      expect(cssContent).toMatch(/--font-mono:.*monospace/);
    });
  });
});
