import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteChrome";
import { POSTS, SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog — ${SITE.name}` },
      { name: "description", content: "Articles on mutual funds, insurance, loans and personal finance." },
      { property: "og:title", content: `Blog — ${SITE.name}` },
      { property: "og:description", content: "Plain-language articles on personal finance." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Notes on money" intro="Practical articles on investing, protection and planning." />
      <section className="mx-auto max-w-4xl divide-y divide-border px-5 py-10">
        {POSTS.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block py-8">
            <p className="text-xs uppercase tracking-wider text-accent">{p.category} · {new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold group-hover:text-accent">{p.title}</h2>
            <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
