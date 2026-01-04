import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.join(process.cwd(), "app/globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

describe("Code & syntax styles (Design Milestone 4)", () => {
  describe("Code blocks via rehype-pretty-code", () => {
    it("styles the pretty-code figure container", () => {
      expect(globalsCss).toMatch(/\.mdx\s+figure\[data-rehype-pretty-code-figure\]\s*\{/);
      expect(globalsCss).toMatch(
        /\.mdx\s+figure\[data-rehype-pretty-code-figure\]\s*\{[^}]*bg-code-bg/,
      );
      expect(globalsCss).toMatch(
        /\.mdx\s+figure\[data-rehype-pretty-code-figure\]\s*\{[^}]*rounded-lg/,
      );
    });

    it("styles the <pre> inside the pretty-code figure", () => {
      expect(globalsCss).toMatch(
        /\.mdx\s+figure\[data-rehype-pretty-code-figure\]\s+pre\s*\{/, // specific selector
      );
      expect(globalsCss).toMatch(/figure\[data-rehype-pretty-code-figure\][^{]*pre\s*\{[^}]*p-6/);
      expect(globalsCss).toMatch(/background-color:\s*transparent\s*!important\s*;/);
    });

    it("styles code block titles/filenames via figcaption", () => {
      expect(globalsCss).toMatch(
        /\.mdx\s+figure\[data-rehype-pretty-code-figure\]\s+figcaption\s*\{/,
      );
      expect(globalsCss).toMatch(
        /figure\[data-rehype-pretty-code-figure\][^{]*figcaption\s*\{[^}]*font-mono/,
      );
    });

    it("styles highlighted lines using the data attribute", () => {
      expect(globalsCss).toMatch(/\[data-highlighted-line\]\s*\{/);
      expect(globalsCss).toMatch(/\[data-highlighted-line\]\s*\{[^}]*bg-background-subtle/);
      expect(globalsCss).toMatch(/\[data-highlighted-line\]\s*\{[^}]*-mx-6/);
      expect(globalsCss).toMatch(/\[data-highlighted-line\]\s*\{[^}]*px-6/);
    });
  });

  describe("Inline code", () => {
    it("styles inline code inside MDX prose", () => {
      expect(globalsCss).toMatch(/\.mdx\s+code:not\(\[data-language\]\)\s*\{/);
      expect(globalsCss).toMatch(/code:not\(\[data-language\]\)\s*\{[^}]*bg-code-bg/);
    });

    it("styles inline code outside MDX context", () => {
      expect(globalsCss).toMatch(/code:not\(\[data-language\]\):not\(\.mdx\s+code\)\s*\{/);
      expect(globalsCss).toMatch(
        /code:not\(\[data-language\]\):not\(\.mdx\s+code\)\s*\{[^}]*bg-code-bg/,
      );
    });
  });

  describe("Shiki theme configuration", () => {
    it("uses a muted dark Shiki theme (github-dark-dimmed)", () => {
      const postPagePath = path.join(process.cwd(), "app/posts/[slug]/page.tsx");
      const postPageContent = fs.readFileSync(postPagePath, "utf-8");

      expect(postPageContent).toContain('theme: "github-dark-dimmed"');
      expect(postPageContent).toContain("keepBackground: false");
    });
  });
});
