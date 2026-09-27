import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, BookOpen, PlayCircle } from "lucide-react";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
const portrait = portraitAsset.url;
import { SITE, POSTS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.role}` },
      { name: "description", content: "Financial calculators, blogs and videos to help you plan investments, loans and retirement." },
      { property: "og:title", content: `${SITE.name} — ${SITE.role}` },
      { property: "og:description", content: "Financial calculators, blogs and videos to help you plan your money." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{SITE.role}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">{SITE.tagline}</h1>
            <p className="mt-6 max-w-lg text-lg opacity-80">Hi, I'm {SITE.name}. I help individuals and families invest with purpose, protect what matters and plan for the years ahead.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">Book a conversation <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/calculators" className="rounded-full border border-primary-foreground/30 px-6 py-3 font-medium">Try calculators</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-3xl border-2 border-accent" />
            <img src={portrait} alt={SITE.name} className="relative aspect-[4/5] w-full rounded-3xl object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-3">
        {[
          { to: "/calculators", icon: Calculator, t: "Calculators", d: "SIP, EMI, retirement and goal planners." },
          { to: "/blog", icon: BookOpen, t: "Blog", d: "Plain-language articles on money decisions." },
          { to: "/videos", icon: PlayCircle, t: "Videos", d: "Watch explainers from my YouTube channel." },
        ].map(({ to, icon: Icon, t, d }) => (
          <Link key={to} to={to} className="group rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg">
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-5 font-display text-2xl font-semibold">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold">Latest from the blog</h2>
          <Link to="/blog" className="text-sm font-medium text-accent">All posts →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="rounded-2xl border border-border p-6 hover:border-accent">
              <p className="text-xs uppercase tracking-wider text-accent">{p.category}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
