import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

import { getPostBySlug } from "@/lib/content";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

import { PostEngagement } from "./post-engagement";

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

  const session = await auth();
  const userId = session?.user?.id;

  const postRow = await prisma.post.findUnique({ where: { slug } });
  const viewCount = postRow?.viewCount ?? 0;
  const likeCount = postRow ? await prisma.postLike.count({ where: { postId: postRow.id } }) : 0;
  const likedByMe =
    userId && postRow
      ? Boolean(
          await prisma.postLike.findUnique({
            where: {
              postId_userId: {
                postId: postRow.id,
                userId,
              },
            },
          }),
        )
      : false;
  const comments = postRow
    ? await prisma.comment.findMany({
        where: { postId: postRow.id },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true } },
        },
      })
    : [];

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

      <PostEngagement
        slug={slug}
        viewCount={viewCount}
        likeCount={likeCount}
        likedByMe={likedByMe}
        comments={comments.map((comment) => ({
          id: comment.id,
          body: comment.body,
          createdAt: comment.createdAt.toISOString(),
          author: comment.user,
        }))}
        isAuthenticated={Boolean(userId)}
      />
    </article>
  );
}
