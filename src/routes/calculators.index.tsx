import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/SiteChrome";
import { CALCULATORS } from "@/lib/calculators";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/calculators/")({
  head: () => ({
    meta: [
      { title: `Financial Calculators — ${SITE.name}` },
      { name: "description", content: "Free SIP, lumpsum, EMI, FD, retirement and goal planning calculators." },
      { property: "og:title", content: "Free Financial Calculators" },
      { property: "og:description", content: "SIP, EMI, FD, retirement and goal planning calculators." },
    ],
  }),
  component: List,
});

function List() {
  return (
    <>
      <PageHeader eyebrow="Tools" title="Financial calculators" intro="Quick, free tools to estimate returns, loan payments and how much to save for your goals." />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULATORS.map((c) => (
          <Link key={c.slug} to="/calculators/$slug" params={{ slug: c.slug }} className="group rounded-2xl border border-border p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg">
            <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
            <p className="mt-2 text-muted-foreground">{c.blurb}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">Calculate <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </section>
    </>
  );
}
