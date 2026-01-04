import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

type RouteContext = {
  params: { slug: string } | Promise<{ slug: string }>;
};

async function getSlug(context: RouteContext): Promise<string> {
  const params = await context.params;
  return params.slug;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const slug = await getSlug(context);
    if (!slug) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const session = await auth();

    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      return NextResponse.json({ ok: true, count: 0, likedByMe: false });
    }

    const [count, liked] = await Promise.all([
      prisma.postLike.count({ where: { postId: post.id } }),
      session?.user?.id
        ? prisma.postLike.findUnique({
            where: {
              postId_userId: {
                postId: post.id,
                userId: session.user.id,
              },
            },
          })
        : Promise.resolve(null),
    ]);

    return NextResponse.json({ ok: true, count, likedByMe: Boolean(liked) });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export async function POST(_request: Request, context: RouteContext) {
  try {
    const slug = await getSlug(context);
    if (!slug) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const post = await tx.post.upsert({
        where: { slug },
        update: {},
        create: { slug },
      });

      const existing = await tx.postLike.findUnique({
        where: {
          postId_userId: {
            postId: post.id,
            userId,
          },
        },
      });

      if (existing) {
        await tx.postLike.delete({ where: { id: existing.id } });
        const count = await tx.postLike.count({ where: { postId: post.id } });
        return { likedByMe: false, count };
      }

      await tx.postLike.create({
        data: {
          postId: post.id,
          userId,
        },
      });

      const count = await tx.postLike.count({ where: { postId: post.id } });
      return { likedByMe: true, count };
    });

    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
