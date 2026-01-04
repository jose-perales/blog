import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Theme - Dark Mode Foundation", () => {
  it("layout.tsx applies dark background class to html element", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");

    // The html element should have bg-background class
    expect(layoutContent).toContain('className="bg-background');
  });

  it("layout.tsx applies light text color class", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");

    expect(layoutContent).toContain("text-foreground");
  });

  it("globals.css sets color-scheme to dark", () => {
    const cssPath = path.join(process.cwd(), "app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain("color-scheme: dark");
  });

  it("globals.css defines CSS custom properties", () => {
    const cssPath = path.join(process.cwd(), "app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain("--bg-primary: #0a0a0a");
    expect(cssContent).toContain("--fg-primary: #e5e5e5");
    expect(cssContent).toContain("--accent-primary: #d4d4d4");
  });
});
