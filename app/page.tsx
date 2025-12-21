import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Latest posts</h1>
        <p className="text-slate-600">Posts will be loaded from MDX in Milestone 2.</p>
      </header>

      <section className="rounded-lg border border-slate-200 p-4">
        <p className="text-sm text-slate-600">Example route:</p>
        <Link className="text-sm font-medium underline" href="/posts/hello-world">
          /posts/hello-world
        </Link>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Placeholder list</h2>
        <ul className="space-y-3">
          <li className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm text-slate-500">YYYY-MM-DD</div>
            <div className="font-medium">Post title</div>
            <div className="text-sm text-slate-600">Short description goes here.</div>
            <div className="mt-2 text-xs text-slate-500">tags: tag-a, tag-b</div>
          </li>
        </ul>
      </section>
    </div>
  );
}
