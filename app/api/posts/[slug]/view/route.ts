import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

const VIEW_DEDUPE_TTL_MS = 30 * 60 * 1000;
const VIEWER_KEY_COOKIE = "viewerKey";

type RouteContext = {
  params: { slug: string } | Promise<{ slug: string }>;
};

async function getSlug(context: RouteContext): Promise<string> {
  const params = await context.params;
  return params.slug;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const slug = await getSlug(context);
    if (!slug) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const existing = request.cookies.get(VIEWER_KEY_COOKIE)?.value;
    const viewerKey = existing ?? randomUUID();

    const now = new Date();

    const result = await prisma.$transaction(async (tx) => {
      const post = await tx.post.upsert({
        where: { slug },
        update: {},
        create: { slug },
      });

      const view = await tx.postView.findUnique({
        where: {
          postId_viewerKey: {
            postId: post.id,
            viewerKey,
          },
        },
      });

      if (!view) {
        await tx.postView.create({
          data: {
            postId: post.id,
            viewerKey,
            lastViewedAt: now,
          },
        });

        const updated = await tx.post.update({
          where: { id: post.id },
          data: { viewCount: { increment: 1 } },
        });

        return { viewCount: updated.viewCount, incremented: true };
      }

      const isDedupeHit = now.getTime() - view.lastViewedAt.getTime() < VIEW_DEDUPE_TTL_MS;
      if (isDedupeHit) {
        return { viewCount: post.viewCount, incremented: false };
      }

      await tx.postView.update({
        where: {
          postId_viewerKey: {
            postId: post.id,
            viewerKey,
          },
        },
        data: { lastViewedAt: now },
      });

      const updated = await tx.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });

      return { viewCount: updated.viewCount, incremented: true };
    });

    const response = NextResponse.json({
      ok: true,
      viewCount: result.viewCount,
      incremented: result.incremented,
    });

    if (!existing) {
      response.cookies.set({
        name: VIEWER_KEY_COOKIE,
        value: viewerKey,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
