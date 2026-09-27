import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/about", label: "About me" },
  { to: "/calculators", label: "Calculators" },
  { to: "/blog", label: "Blog" },
  { to: "/videos", label: "Videos" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          {SITE.name}<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Contact me</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-5 py-4 md:hidden">
          {[...NAV, { to: "/contact", label: "Contact me" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm md:flex-row md:justify-between">
        <p className="font-display text-lg">{SITE.name}</p>
        <p className="opacity-70">Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
        <p className="opacity-70">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
