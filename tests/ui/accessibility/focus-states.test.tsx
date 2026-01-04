import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Accessibility - focus states", () => {
  it("defines global :focus-visible outline", () => {
    expect(globalsCss).toContain(":focus-visible");
    expect(globalsCss).toContain("outline: 2px solid var(--accent-primary)");
    expect(globalsCss).toContain("outline-offset: 2px");
  });

  it("removes focus outline for mouse users", () => {
    expect(globalsCss).toContain(":focus:not(:focus-visible)");
    expect(globalsCss).toContain("outline: none");
  });

  it("uses focus-visible ring styles for .btn", () => {
    const btnBlock = globalsCss.match(/\.btn\s*\{[^}]*\}/s)?.[0] ?? "";

    expect(btnBlock).toContain("focus-visible");
    expect(btnBlock).not.toContain("focus:ring-");
  });

  it("uses focus-visible ring styles for .input", () => {
    const inputBlock = globalsCss.match(/\.input\s*\{[^}]*\}/s)?.[0] ?? "";

    expect(inputBlock).toContain("focus-visible");
    expect(inputBlock).not.toContain("focus:ring-");
  });

  it("defines a focus-visible treatment for links", () => {
    expect(globalsCss).toMatch(/a:focus-visible/);
  });

  it("standardizes MDX link hover transitions to 150ms ease", () => {
    const mdxLinkBlock = globalsCss.match(/\.mdx\s+a\s*\{[^}]*\}/s)?.[0] ?? "";

    expect(mdxLinkBlock).toContain("transition-duration: 150ms");
    expect(mdxLinkBlock).toContain("transition-timing-function: ease");
  });
});
