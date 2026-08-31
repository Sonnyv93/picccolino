"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import catering from "@/data/catering.json";
import { site } from "@/data/site";

type Tray = (typeof catering.trays)[number];
type TrayItem = {
  name: string;
  note?: string;
  price?: string;
  half?: string;
  full?: string;
};

export default function Catering() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openTrays, setOpenTrays] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".cat-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: ".cat-grid", start: "top 78%" },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catering"
      className="relative bg-surface py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6">Private Parties &amp; Catering</p>
        <h2 className="display-xl glass-text mb-6 font-display">
          Feed everybody
          <span className="glass-text-olive italic">.</span>
        </h2>
        <p className="mb-16 max-w-lg leading-relaxed text-stone md:mb-24">
          Showers, birthdays, rehearsal dinners, the office party — book the
          room or let us send the trays. {catering.note}
        </p>

        {/* Per-person packages */}
        <div className="cat-grid grid gap-6 md:grid-cols-3 md:gap-8">
          {catering.packages.map((p) => (
            <article
              key={p.price}
              className={`cat-card flex flex-col rounded-[24px] border p-7 md:p-8 ${
                p.featured
                  ? "border-brass/50 bg-brass/[0.06]"
                  : "border-cream/10"
              }`}
            >
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-display text-5xl text-cream">
                  ${p.price}
                </span>
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-stone">
                  per person
                </span>
              </div>
              <p className="mb-6 font-display text-xl italic text-brass">
                {p.name}
              </p>

              <div className="flex-1 space-y-5">
                {p.courses.map((c) => (
                  <div key={c.title}>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-cream/80">
                      {c.title}
                      {c.choice && (
                        <span className="text-stone"> · {c.choice}</span>
                      )}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone">
                      {c.items}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 border-t border-cream/10 pt-4 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-brass">
                {p.included}
              </p>
            </article>
          ))}
        </div>

        {/* Catering trays — collapsed by default so the page stays scannable */}
        <div className="mt-16 md:mt-20">
          <button
            onClick={() => setOpenTrays((v) => !v)}
            aria-expanded={openTrays}
            className="flex w-full items-center justify-between border-y border-cream/10 py-6 text-left transition-colors hover:border-brass/40"
          >
            <span>
              <span className="block font-display text-2xl text-cream md:text-3xl">
                Catering trays
              </span>
              <span className="mt-1 block font-sans text-[0.65rem] uppercase tracking-[0.25em] text-stone">
                {catering.trayNote}
              </span>
            </span>
            <span
              className={`ml-4 shrink-0 font-sans text-xs uppercase tracking-[0.22em] text-brass transition-transform duration-300 ${
                openTrays ? "rotate-180" : ""
              }`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {openTrays && (
            <div className="grid gap-x-14 gap-y-12 pt-10 md:grid-cols-2">
              {catering.trays.map((cat: Tray) => (
                <div key={cat.name}>
                  <h3 className="mb-5 font-display text-xl text-brass">
                    {cat.name}
                  </h3>
                  <ul className="space-y-3">
                    {(cat.items as TrayItem[]).map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-3">
                          <span className="text-cream">{item.name}</span>
                          <span className="flex-1 border-b border-dotted border-cream/15" />
                          <span className="whitespace-nowrap font-sans text-sm tracking-wide text-brass">
                            {item.half
                              ? `${item.half} / ${item.full}`
                              : item.price}
                          </span>
                        </div>
                        {item.note && (
                          <p className="mt-1 text-xs leading-relaxed text-stone">
                            {item.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-stone md:col-span-2">
                Half / full tray pricing · Menu updated {catering.updated}
              </p>
            </div>
          )}
        </div>

        {/* Booking CTA */}
        <div className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Magnetic>
            <a
              href={site.phoneHref}
              className="inline-block bg-brass px-9 py-4 font-sans text-sm uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-cream"
            >
              Call to book
            </a>
          </Magnetic>
          <p className="text-sm text-stone">
            {site.phone} — ask for party planning
          </p>
        </div>
      </div>
    </section>
  );
}
