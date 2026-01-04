"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";

type CommentAuthor = {
  id: string;
  name: string;
};

type CommentItem = {
  id: string;
  body: string;
  createdAt: string;
  author: CommentAuthor;
};

type PostEngagementProps = {
  slug: string;
  viewCount: number;
  likeCount: number;
  likedByMe: boolean;
  comments: CommentItem[];
  isAuthenticated: boolean;
};

function formatDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleString();
}

export function PostEngagement(props: PostEngagementProps) {
  const [viewCount, setViewCount] = useState(props.viewCount);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [likedByMe, setLikedByMe] = useState(props.likedByMe);
  const [comments, setComments] = useState<CommentItem[]>(props.comments);
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const signInHref = useMemo(() => `/auth/sign-in?callbackUrl=/posts/${props.slug}`, [props.slug]);

  useEffect(() => {
    let cancelled = false;

    async function incrementView() {
      try {
        const response = await fetch(`/api/posts/${props.slug}/view`, { method: "POST" });
        if (!response.ok) return;
        const json = (await response.json()) as unknown;
        const nextViewCount =
          typeof (json as any)?.viewCount === "number" ? (json as any).viewCount : null;
        if (!cancelled && nextViewCount !== null) {
          setViewCount(nextViewCount);
        }
      } catch {
        // ignore
      }
    }

    void incrementView();

    return () => {
      cancelled = true;
    };
  }, [props.slug]);

  function onToggleLike() {
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/posts/${props.slug}/likes`, { method: "POST" });
        const json = (await response.json()) as any;

        if (!response.ok) {
          setError(
            json?.error === "unauthorized"
              ? "Please sign in to like posts."
              : "Could not update like.",
          );
          return;
        }

        if (typeof json?.count === "number") setLikeCount(json.count);
        if (typeof json?.likedByMe === "boolean") setLikedByMe(json.likedByMe);
      } catch {
        setError("Could not update like.");
      }
    });
  }

  function onSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const body = commentBody.trim();
    if (!body) {
      setError("Comment cannot be empty.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/posts/${props.slug}/comments`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ body }),
        });

        const json = (await response.json()) as any;

        if (!response.ok) {
          setError(
            json?.error === "unauthorized"
              ? "Please sign in to comment."
              : "Could not post comment.",
          );
          return;
        }

        const next = json?.comment as CommentItem | undefined;
        if (next?.id) {
          setComments((prev) => [next, ...prev]);
          setCommentBody("");
        }
      } catch {
        setError("Could not post comment.");
      }
    });
  }

  return (
    <section className="border-accent-subtle space-y-6 rounded-lg border p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-foreground-secondary text-sm">
          <span className="text-foreground font-medium">{viewCount}</span> views
        </div>

        <div className="flex items-center gap-3">
          <div className="text-foreground-secondary text-sm">
            <span className="text-foreground font-medium">{likeCount}</span> likes
          </div>

          {props.isAuthenticated ? (
            <button
              type="button"
              onClick={onToggleLike}
              disabled={isPending}
              className="border-accent-subtle text-foreground hover:bg-background-subtle rounded-md border px-3 py-1.5 text-sm disabled:opacity-60"
            >
              {likedByMe ? "Unlike" : "Like"}
            </button>
          ) : (
            <Link
              href={signInHref}
              className="border-accent-subtle text-foreground hover:bg-background-subtle rounded-md border px-3 py-1.5 text-sm"
            >
              Sign in to like
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-foreground text-base font-semibold">Comments</h2>

        {!props.isAuthenticated ? (
          <div className="text-foreground-secondary text-sm">
            <Link href={signInHref} className="underline">
              Sign in
            </Link>{" "}
            to add a comment.
          </div>
        ) : (
          <form onSubmit={onSubmitComment} className="space-y-2">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              rows={3}
              className="border-accent-subtle bg-background-elevated text-foreground placeholder:text-foreground-muted w-full rounded-md border p-2 text-sm"
              placeholder="Write a comment…"
              disabled={isPending}
            />
            <div className="flex items-center justify-between">
              <div className="text-foreground-muted text-xs">Max 5000 characters.</div>
              <button
                type="submit"
                disabled={isPending}
                className="bg-foreground text-background rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-60"
              >
                Post comment
              </button>
            </div>
          </form>
        )}

        {error ? <div className="text-error text-sm">{error}</div> : null}

        {comments.length === 0 ? (
          <div className="text-foreground-secondary text-sm">No comments yet.</div>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-accent-subtle bg-background-elevated rounded-md border p-3"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="text-foreground text-sm font-medium">{comment.author.name}</div>
                  <div className="text-foreground-muted text-xs" suppressHydrationWarning>
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                <p className="text-foreground-secondary mt-2 text-sm whitespace-pre-wrap">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
