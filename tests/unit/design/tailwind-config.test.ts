import { describe, it, expect } from "vitest";
import config from "../../../tailwind.config";

describe("Tailwind Config - Design Tokens", () => {
  describe("Color Palette", () => {
    it("defines background colors", () => {
      const colors = config.theme?.extend?.colors as Record<string, unknown>;
      expect(colors).toBeDefined();

      const background = colors.background as Record<string, string>;
      expect(background.DEFAULT).toBe("#0a0a0a");
      expect(background.elevated).toBe("#141414");
      expect(background.subtle).toBe("#1a1a1a");
    });

    it("defines foreground colors", () => {
      const colors = config.theme?.extend?.colors as Record<string, unknown>;
      const foreground = colors.foreground as Record<string, string>;
      expect(foreground.DEFAULT).toBe("#e5e5e5");
      expect(foreground.secondary).toBe("#a3a3a3");
      expect(foreground.muted).toBe("#525252");
    });

    it("defines accent colors", () => {
      const colors = config.theme?.extend?.colors as Record<string, unknown>;
      const accent = colors.accent as Record<string, string>;
      expect(accent.DEFAULT).toBe("#d4d4d4");
      expect(accent.hover).toBe("#fafafa");
      expect(accent.subtle).toBe("#404040");
    });

    it("defines code colors", () => {
      const colors = config.theme?.extend?.colors as Record<string, unknown>;
      const code = colors.code as Record<string, string>;
      expect(code.bg).toBe("#0d0d0d");
      expect(code.fg).toBe("#c9d1d9");
    });

    it("defines semantic colors", () => {
      const colors = config.theme?.extend?.colors as Record<string, unknown>;
      expect(colors.success).toBe("#4ade80");
      expect(colors.error).toBe("#f87171");
    });
  });

  describe("Spacing Scale", () => {
    it("extends spacing with additional values", () => {
      const spacing = config.theme?.extend?.spacing as Record<string, string>;
      expect(spacing).toBeDefined();
      expect(spacing["18"]).toBe("4.5rem");
      expect(spacing["22"]).toBe("5.5rem");
      expect(spacing["30"]).toBe("7.5rem");
    });
  });

  describe("Font Families", () => {
    it("defines sans-serif font stack", () => {
      const fontFamily = config.theme?.extend?.fontFamily as Record<string, string[]>;
      expect(fontFamily).toBeDefined();
      expect(fontFamily.sans).toContain("Inter");
      expect(fontFamily.sans).toContain("system-ui");
    });

    it("defines monospace font stack", () => {
      const fontFamily = config.theme?.extend?.fontFamily as Record<string, string[]>;
      expect(fontFamily.mono).toContain("JetBrains Mono");
      expect(fontFamily.mono).toContain("monospace");
    });
  });
});
