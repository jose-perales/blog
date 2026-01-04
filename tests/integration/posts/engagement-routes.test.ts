// @vitest-environment node

import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

import { prisma } from "@/lib/db";

let mockSession: {
  user?: {
    id?: string;
  };
} | null = null;

vi.mock("@/auth", () => {
  return {
    auth: () => Promise.resolve(mockSession),
  };
});

import { POST as viewPOST } from "@/app/api/posts/[slug]/view/route";
import { GET as likesGET, POST as likesPOST } from "@/app/api/posts/[slug]/likes/route";
import { GET as commentsGET, POST as commentsPOST } from "@/app/api/posts/[slug]/comments/route";

async function createUser(): Promise<{ id: string; email: string }> {
  const email = `m5-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
  const user = await prisma.user.create({
    data: {
      email,
      name: "Test User",
    },
  });
  return { id: user.id, email: user.email };
}

describe("Milestone 5: engagement routes", () => {
  const slug = `m5-post-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  afterEach(async () => {
    mockSession = null;

    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return;

    await prisma.comment.deleteMany({ where: { postId: post.id } });
    await prisma.postLike.deleteMany({ where: { postId: post.id } });
    await prisma.postView.deleteMany({ where: { postId: post.id } });
    await prisma.post.deleteMany({ where: { id: post.id } });
  });

  it("increments viewCount once per viewerKey within TTL", async () => {
    const viewerKey = `viewer-${Date.now()}`;

    const req1 = new NextRequest(
      new Request("http://localhost/api/posts/x/view", {
        method: "POST",
        headers: {
          cookie: `viewerKey=${viewerKey}`,
        },
      }),
    );

    const res1 = await viewPOST(req1, { params: { slug } });
    expect(res1.status).toBe(200);
    const body1 = (await res1.json()) as any;
    expect(body1.ok).toBe(true);
    expect(body1.incremented).toBe(true);
    expect(body1.viewCount).toBe(1);

    const req2 = new NextRequest(
      new Request("http://localhost/api/posts/x/view", {
        method: "POST",
        headers: {
          cookie: `viewerKey=${viewerKey}`,
        },
      }),
    );

    const res2 = await viewPOST(req2, { params: { slug } });
    expect(res2.status).toBe(200);
    const body2 = (await res2.json()) as any;
    expect(body2.ok).toBe(true);
    expect(body2.incremented).toBe(false);
    expect(body2.viewCount).toBe(1);
  });

  it("likes POST requires authentication", async () => {
    mockSession = null;

    const res = await likesPOST(
      new Request("http://localhost/api/posts/x/likes", { method: "POST" }),
      {
        params: { slug },
      },
    );

    expect(res.status).toBe(401);
    const body = (await res.json()) as any;
    expect(body.ok).toBe(false);
    expect(body.error).toBe("unauthorized");
  });

  it("can like/unlike a post and reflects count + likedByMe", async () => {
    const user = await createUser();
    mockSession = { user: { id: user.id } };

    const like1 = await likesPOST(
      new Request("http://localhost/api/posts/x/likes", { method: "POST" }),
      {
        params: { slug },
      },
    );
    expect(like1.status).toBe(200);
    const body1 = (await like1.json()) as any;
    expect(body1.ok).toBe(true);
    expect(body1.likedByMe).toBe(true);
    expect(body1.count).toBe(1);

    const likeState = await likesGET(new Request("http://localhost/api/posts/x/likes"), {
      params: { slug },
    });
    expect(likeState.status).toBe(200);
    const stateBody = (await likeState.json()) as any;
    expect(stateBody.ok).toBe(true);
    expect(stateBody.likedByMe).toBe(true);
    expect(stateBody.count).toBe(1);

    const unlike = await likesPOST(
      new Request("http://localhost/api/posts/x/likes", { method: "POST" }),
      {
        params: { slug },
      },
    );
    expect(unlike.status).toBe(200);
    const body2 = (await unlike.json()) as any;
    expect(body2.ok).toBe(true);
    expect(body2.likedByMe).toBe(false);
    expect(body2.count).toBe(0);
  });

  it("comments POST requires authentication", async () => {
    mockSession = null;

    const res = await commentsPOST(
      new Request("http://localhost/api/posts/x/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ body: "Hello" }),
      }),
      { params: { slug } },
    );

    expect(res.status).toBe(401);
    const body = (await res.json()) as any;
    expect(body.ok).toBe(false);
    expect(body.error).toBe("unauthorized");
  });

  it("lists comments newest-first", async () => {
    const user = await createUser();
    mockSession = { user: { id: user.id } };

    const c1 = await commentsPOST(
      new Request("http://localhost/api/posts/x/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ body: "first" }),
      }),
      { params: { slug } },
    );
    expect(c1.status).toBe(201);

    const c2 = await commentsPOST(
      new Request("http://localhost/api/posts/x/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ body: "second" }),
      }),
      { params: { slug } },
    );
    expect(c2.status).toBe(201);

    const list = await commentsGET(new Request("http://localhost/api/posts/x/comments"), {
      params: { slug },
    });
    expect(list.status).toBe(200);
    const body = (await list.json()) as any;
    expect(body.ok).toBe(true);
    expect(body.comments).toHaveLength(2);
    expect(body.comments[0].body).toBe("second");
    expect(body.comments[1].body).toBe("first");
    expect(body.comments[0].author.name).toBe("Test User");
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
