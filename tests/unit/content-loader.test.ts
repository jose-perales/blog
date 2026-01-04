import { describe, expect, it } from "vitest";

import { getPostBySlug, listPosts } from "@/lib/content";

describe("Milestone 2: content loader", () => {
  it("lists posts from content/posts sorted by date desc", async () => {
    const posts = await listPosts();

    expect(posts.length).toBeGreaterThanOrEqual(2);
    expect(posts.map((p) => p.slug)).toContain("hello-world");
    expect(posts.map((p) => p.slug)).toContain("shiki-pretty-code");

    for (const post of posts) {
      expect(post.title).toEqual(expect.any(String));
      expect(post.date).toEqual(expect.any(String));
      expect(post.description).toEqual(expect.any(String));
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.slug).toEqual(expect.any(String));
    }

    // Dates are ISO strings in fixtures, so lexicographic ordering matches.
    for (let i = 1; i < posts.length; i += 1) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("loads a post by slug and returns frontmatter + content", async () => {
    const post = await getPostBySlug("hello-world");
    expect(post).not.toBeNull();
    expect(post!.frontmatter.slug).toBe("hello-world");
    expect(post!.frontmatter.title).toBe("Hello World");
    expect(post!.content).toContain("# Hello World");
  });

  it("returns null for missing posts", async () => {
    const post = await getPostBySlug("does-not-exist");
    expect(post).toBeNull();
  });
});
