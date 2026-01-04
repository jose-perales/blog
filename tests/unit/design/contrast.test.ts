import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function parseHexColor(input: string): { r: number; g: number; b: number } {
  const match = /^#([0-9a-f]{6})$/i.exec(input.trim());
  if (!match) throw new Error(`Invalid hex color: ${input}`);

  const value = Number.parseInt(match[1], 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function srgbToLinear(channel: number): number {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(parseHexColor(foreground));
  const l2 = relativeLuminance(parseHexColor(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function readRootVar(css: string, varName: string): string {
  const re = new RegExp(`${varName}:\\s*(#[0-9a-fA-F]{6})\\s*;`);
  const match = css.match(re);
  if (!match) throw new Error(`Missing CSS var: ${varName}`);
  return match[1];
}

describe("Accessibility - color contrast", () => {
  const cssPath = path.join(process.cwd(), "app/globals.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  const bg = readRootVar(css, "--bg-primary");
  const fgPrimary = readRootVar(css, "--fg-primary");
  const fgSecondary = readRootVar(css, "--fg-secondary");
  const accentHover = readRootVar(css, "--accent-hover");
  const fgMuted = readRootVar(css, "--fg-muted");

  it("body text meets WCAG AA against background (>= 4.5:1)", () => {
    expect(contrastRatio(fgPrimary, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("secondary text meets WCAG AA against background (>= 4.5:1)", () => {
    expect(contrastRatio(fgSecondary, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("link hover color remains readable against background (>= 4.5:1)", () => {
    expect(contrastRatio(accentHover, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("muted text is intended for non-essential UI (>= 2.5:1)", () => {
    // This is used for metadata/de-emphasized text; we keep it readable but clearly subdued.
    expect(contrastRatio(fgMuted, bg)).toBeGreaterThanOrEqual(2.5);
  });
});
