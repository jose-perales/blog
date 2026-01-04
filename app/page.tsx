import Link from "next/link";

import { listPosts } from "@/lib/content";

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Latest posts</h1>
        <p className="text-foreground-secondary text-lg">
          Thoughts on software, learning, and building things.
        </p>
      </header>

      <section>
        <ul className="divide-accent-subtle divide-y">
          {posts.map((post) => (
            <li key={post.slug} className="group py-8 first:pt-0">
              <Link href={`/posts/${post.slug}`} className="block">
                <h2 className="text-foreground group-hover:text-accent-hover text-xl font-semibold transition-colors">
                  {post.title}
                </h2>
                <time className="text-foreground-muted mt-1 block text-sm">{post.date}</time>
                <p className="text-foreground-secondary mt-3 leading-relaxed">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
