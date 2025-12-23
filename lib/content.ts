import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
};

export type PostListItem = PostFrontmatter;

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function assertFrontmatter(data: unknown, fileName: string): PostFrontmatter {
  if (typeof data !== "object" || data === null) {
    throw new Error(`Invalid frontmatter in ${fileName}: expected an object.`);
  }

  const record = data as Record<string, unknown>;
  const { title, date, description, tags, slug } = record;

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error(`Invalid frontmatter in ${fileName}: missing 'title'.`);
  }

  if (typeof date !== "string" || date.trim() === "") {
    throw new Error(`Invalid frontmatter in ${fileName}: missing 'date'.`);
  }

  if (typeof description !== "string" || description.trim() === "") {
    throw new Error(`Invalid frontmatter in ${fileName}: missing 'description'.`);
  }

  if (typeof slug !== "string" || slug.trim() === "") {
    throw new Error(`Invalid frontmatter in ${fileName}: missing 'slug'.`);
  }

  if (!Array.isArray(tags) || !tags.every((t) => typeof t === "string")) {
    throw new Error(`Invalid frontmatter in ${fileName}: 'tags' must be a string array.`);
  }

  return {
    title,
    date,
    description,
    tags,
    slug,
  };
}

function compareByDateDesc(a: { date: string }, b: { date: string }) {
  return b.date.localeCompare(a.date);
}

export async function listPosts(): Promise<PostListItem[]> {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const mdxFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".mdx")).map((e) => e.name);

  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const fullPath = path.join(POSTS_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      return assertFrontmatter(parsed.data, fileName);
    }),
  );

  return posts.sort(compareByDateDesc);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(POSTS_DIR, fileName);

  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);
    const frontmatter = assertFrontmatter(parsed.data, fileName);

    if (frontmatter.slug !== slug) {
      throw new Error(
        `Frontmatter slug mismatch in ${fileName}: expected '${slug}', got '${frontmatter.slug}'.`,
      );
    }

    return {
      frontmatter,
      content: parsed.content,
    };
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as any).code === "ENOENT") {
      return null;
    }
    throw err;
  }
}
