export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-slate-600">Auth will be implemented in Milestone 4.</p>
      </header>

      <form className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
