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

    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      return NextResponse.json({ ok: true, comments: [] });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({
      ok: true,
      comments: comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        author: comment.user,
      })),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
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

    const bodyJson = (await request.json()) as unknown;
    const body = typeof (bodyJson as any)?.body === "string" ? (bodyJson as any).body.trim() : "";

    if (!body) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    if (body.length > 5000) {
      return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
    }

    const created = await prisma.$transaction(async (tx) => {
      const post = await tx.post.upsert({
        where: { slug },
        update: {},
        create: { slug },
      });

      return tx.comment.create({
        data: {
          postId: post.id,
          userId,
          body,
        },
        include: {
          user: { select: { id: true, name: true } },
        },
      });
    });

    return NextResponse.json(
      {
        ok: true,
        comment: {
          id: created.id,
          body: created.body,
          createdAt: created.createdAt.toISOString(),
          author: created.user,
        },
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
