export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Post</h1>
        <p className="text-slate-600">Slug: {slug}</p>
      </header>

      <section className="rounded-lg border border-slate-200 p-4">
        <div className="text-sm text-slate-600">
          MDX rendering, view counts, likes, and comments will be implemented in later milestones.
        </div>
      </section>
    </div>
  );
}
