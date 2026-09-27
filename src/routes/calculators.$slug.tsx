import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/SiteChrome";
import { CALCULATORS, inr } from "@/lib/calculators";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/calculators/$slug")({
  loader: ({ params }) => {
    const calc = CALCULATORS.find((c) => c.slug === params.slug);
    if (!calc) throw notFound();
    return { slug: calc.slug, name: calc.name, blurb: calc.blurb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${SITE.name}` },
          { name: "description", content: loaderData.blurb },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.blurb },
        ]
      : [],
  }),
  component: CalcPage,
});

function CalcPage() {
  const { slug } = Route.useLoaderData();
  const calc = CALCULATORS.find((c) => c.slug === slug)!;
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(calc.fields.map((f) => [f.key, f.value])));
  const results = useMemo(() => calc.compute(vals), [calc, vals]);

  return (
    <>
      <PageHeader eyebrow="Calculator" title={calc.name} intro={calc.blurb} />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          {calc.fields.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between">
                <label className="font-medium">{f.label}</label>
                <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1">
                  {f.suffix === "₹" && <span className="text-muted-foreground">₹</span>}
                  <input type="number" value={vals[f.key]} min={f.min} max={f.max} step={f.step}
                    onChange={(e) => setVals({ ...vals, [f.key]: Number(e.target.value) })}
                    className="w-28 bg-transparent text-right font-semibold outline-none" />
                  {f.suffix && f.suffix !== "₹" && <span className="text-muted-foreground">{f.suffix}</span>}
                </div>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={vals[f.key]}
                onChange={(e) => setVals({ ...vals, [f.key]: Number(e.target.value) })}
                className="mt-3 w-full accent-[var(--accent)]" />
            </div>
          ))}
        </div>
        <div className="h-fit space-y-4 rounded-3xl bg-primary p-8 text-primary-foreground">
          {results.map((r) => (
            <div key={r.label} className={r.highlight ? "border-t border-primary-foreground/20 pt-4" : ""}>
              <p className="text-sm opacity-70">{r.label}</p>
              <p className={r.highlight ? "font-display text-4xl font-semibold text-accent" : "text-2xl font-semibold"}>{inr(r.value)}</p>
            </div>
          ))}
          <p className="pt-2 text-xs opacity-60">Estimates only. Actual returns may vary.</p>
          <Link to="/contact" className="block rounded-full bg-accent py-3 text-center font-medium text-accent-foreground">Discuss your plan</Link>
        </div>
      </section>
    </>
  );
}
