import { createFileRoute, Link } from "@tanstack/react-router";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
const portrait = portraitAsset.url;
import { PageHeader } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About me — ${SITE.name}` },
      { name: "description", content: `Background, experience and approach of ${SITE.name}, financial services professional.` },
      { property: "og:title", content: `About ${SITE.name}` },
      { property: "og:description", content: "My background, experience and approach to financial planning." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About me" title={`Hello, I'm ${SITE.name}`} />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.4fr]">
        <img src={portrait} alt={SITE.name} className="aspect-[4/5] w-full rounded-3xl object-cover" />
        <div className="space-y-5 text-lg leading-relaxed">
          <p>I work in financial services, helping people make sense of investing, insurance, loans and long-term planning. My goal is simple: to make financial decisions feel clear rather than confusing.</p>
          <p>Over the years I have worked with salaried professionals, business owners and families at every stage of life — from a first SIP to planning retirement income.</p>
          <p>Through this website I share free calculators, articles and videos so you can learn at your own pace. When you're ready for personalised guidance, I'm a message away.</p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[["10+", "Years experience"], ["500+", "Families guided"], ["₹100Cr+", "Assets advised"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-secondary p-5">
                <p className="font-display text-3xl font-semibold text-accent">{n}</p>
                <p className="text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="inline-block rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
