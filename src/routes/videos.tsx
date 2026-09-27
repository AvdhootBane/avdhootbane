import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { PageHeader } from "@/components/SiteChrome";
import { SITE, VIDEOS } from "@/lib/site";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: `Videos — ${SITE.name}` },
      { name: "description", content: "Watch finance explainer videos from my YouTube channel." },
      { property: "og:title", content: `Videos — ${SITE.name}` },
      { property: "og:description", content: "Finance explainer videos on YouTube." },
    ],
  }),
  component: Videos,
});

function Videos() {
  return (
    <>
      <PageHeader eyebrow="YouTube" title="Videos" intro="Click any video to watch it on YouTube." />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v) => (
          <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="group">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" className="aspect-video w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20 transition group-hover:bg-primary/40">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground"><Play className="h-6 w-6 fill-current" /></span>
              </div>
            </div>
            <h3 className="mt-3 font-semibold group-hover:text-accent">{v.title}</h3>
          </a>
        ))}
      </section>
    </>
  );
}
