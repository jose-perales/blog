import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Layout - Content Width Constraints", () => {
  it("root layout uses max-w-page for outer container", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");

    // The layout should constrain page width
    expect(content).toMatch(/max-w-page/);
  });

  it("main content area uses max-w-content for prose", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");

    // Main should have content width constraint
    expect(content).toMatch(/max-w-content/);
  });

  it("globals.css defines theme width tokens", () => {
    const cssPath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    expect(content).toContain("--width-content: 42rem");
    expect(content).toContain("--width-page: 72rem");
  });

  it("globals.css updates MDX prose for dark theme", () => {
    const cssPath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    // MDX prose should use foreground colors, not slate
    expect(content).toMatch(/\.mdx p.*text-foreground/s);
    // Should not have slate colors in MDX
    expect(content).not.toMatch(/\.mdx.*text-slate-\d+/s);
  });
});
