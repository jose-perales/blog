import { NewsletterForm } from "./newsletter-form";

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Newsletter</h1>
        <p className="text-slate-600">Get occasional updates when new posts are published.</p>
      </header>

      <NewsletterForm />
    </div>
  );
}
