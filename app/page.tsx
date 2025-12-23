import Link from "next/link";

import { listPosts } from "@/lib/content";

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Latest posts</h1>
        <p className="text-slate-600">Posts are loaded from in-repo MDX.</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Posts</h2>
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.slug} className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-500">{post.date}</div>
              <Link className="mt-1 block font-medium hover:underline" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
              <div className="mt-1 text-sm text-slate-600">{post.description}</div>
              <div className="mt-2 text-xs text-slate-500">
                tags: {post.tags.length ? post.tags.join(", ") : "—"}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
