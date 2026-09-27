import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact me — ${SITE.name}` },
      { name: "description", content: `Get in touch with ${SITE.name} for financial planning guidance.` },
      { property: "og:title", content: `Contact ${SITE.name}` },
      { property: "og:description", content: "Reach out for personalised financial guidance." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-accent";
  return (
    <>
      <PageHeader eyebrow="Contact me" title="Let's talk" intro="Share a little about what you'd like help with and I'll get back to you." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">Whether it's your first investment or a full financial plan, I'm happy to help.</p>
          <p className="flex items-center gap-2"><Mail className="h-5 w-5 text-accent" /> {SITE.email}</p>
        </div>
        {sent ? (
          <div className="rounded-3xl bg-secondary p-10">
            <h2 className="font-display text-3xl font-semibold">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">Your message has been received. I'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 rounded-3xl border border-border p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Your name" className={input} maxLength={100} />
              <input required type="email" placeholder="Email" className={input} maxLength={255} />
            </div>
            <input type="tel" placeholder="Phone (optional)" className={input} maxLength={20} />
            <select className={input} defaultValue="">
              <option value="" disabled>What can I help with?</option>
              <option>Mutual funds & SIP</option><option>Insurance</option><option>Retirement planning</option><option>Loans</option><option>Something else</option>
            </select>
            <textarea required rows={5} placeholder="Your message" className={input} maxLength={2000} />
            <button className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground hover:opacity-90">Send message</button>
          </form>
        )}
      </section>
    </>
  );
}
