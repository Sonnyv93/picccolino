"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#room", label: "The Place" },
  { href: "#catering", label: "Catering" },
  { href: "#reservations", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg tracking-wide">
          Piccolino
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-xs uppercase tracking-[0.22em] text-stone transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden border border-cream/25 px-4 py-2 font-sans text-xs uppercase tracking-[0.22em] text-cream/80 transition-colors duration-300 hover:border-cream/50 hover:text-cream sm:inline-block"
          >
            Call
          </a>
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brass px-5 py-2.5 font-sans text-xs uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-cream"
          >
            Order Online
          </a>
        </div>
      </nav>
    </header>
  );
}
