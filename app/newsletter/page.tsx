export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Newsletter</h1>
        <p className="text-slate-600">Newsletter persistence will be added in a later milestone.</p>
      </header>

      <form className="space-y-3">
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="you@example.com"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
