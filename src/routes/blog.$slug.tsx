import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS, SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — ${SITE.name}` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: PostPage,
});

function PostPage() {
  const p = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/blog" className="text-sm text-accent">← All posts</Link>
      <p className="mt-8 text-xs uppercase tracking-wider text-accent">{p.category} · {new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{p.title}</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
