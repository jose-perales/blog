import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

import { getPostBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = [...(node.properties.className ?? []), "line--highlighted"];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = [...(node.properties.className ?? []), "word--highlighted"];
  },
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.frontmatter.title}</h1>
        <div className="text-sm text-slate-500">{post.frontmatter.date}</div>
        <p className="text-slate-600">{post.frontmatter.description}</p>
      </header>

      <div className="mdx">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </div>

      <section className="rounded-lg border border-slate-200 p-4">
        <div className="text-sm text-slate-600">
          View counts, likes, and comments will be implemented in later milestones.
        </div>
      </section>
    </article>
  );
}
