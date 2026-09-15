"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import { site } from "@/data/site";

/**
 * Holiday / special hours band.
 *
 * Deliberately has no dates in it — holiday hours change year to year, so
 * instead of a list that goes stale, this points people at the phone and the
 * socials, which the restaurant already keeps current.
 */
export default function Holidays() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".holiday-reveal",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const socials = site.socials.filter((s) => s.href);

  return (
    <section
      ref={sectionRef}
      id="holidays"
      className="relative overflow-hidden border-y border-brass/25 bg-surface py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(168,171,110,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow holiday-reveal mb-6">Holidays &amp; Special Hours</p>

        <h2 className="holiday-reveal glass-text mb-6 font-display text-3xl leading-snug md:text-5xl">
          Give us a call before
          <br className="hidden sm:block" />{" "}
          <span className="glass-text-olive italic">the holidays.</span>
        </h2>

        <p className="holiday-reveal mx-auto mb-10 max-w-xl leading-relaxed text-stone">
          {site.holidays.line}
        </p>

        <div className="holiday-reveal flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={site.phoneHref}
              className="inline-block bg-brass px-9 py-4 font-display text-2xl text-ink transition-colors duration-300 hover:bg-cream"
            >
              {site.phone}
            </a>
          </Magnetic>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream/25 px-5 py-3 font-sans text-xs uppercase tracking-[0.22em] text-cream/85 transition-colors duration-300 hover:border-brass hover:text-brass"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
