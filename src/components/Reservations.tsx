"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import { site } from "@/data/site";

const inputClass =
  "w-full border-b border-cream/20 bg-transparent py-3 text-cream placeholder:text-stone/60 focus:border-brass focus:outline-none transition-colors duration-300";

export default function Reservations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".resv-reveal",
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  // UI only for now — no backend wired up yet
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={sectionRef} id="reservations" className="mx-auto max-w-6xl px-6 py-28 md:py-44">
      <p className="eyebrow resv-reveal mb-6">Visit Us</p>
      <h2 className="display-xl glass-text resv-reveal mb-16 font-display md:mb-24">
        Pull up a chair<span className="glass-text-olive italic">.</span>
      </h2>

      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        {/* Left: hours, phone, address, map */}
        <div className="space-y-12">
          <div className="resv-reveal">
            <h3 className="eyebrow mb-5">Hours</h3>
            {site.hours.map((h) => (
              <div key={h.days + h.label} className="flex items-baseline justify-between border-b border-cream/10 py-3">
                <span className="text-cream">
                  {h.days} <span className="italic text-stone">· {h.label}</span>
                </span>
                <span className="text-stone">{h.time}</span>
              </div>
            ))}
          </div>

          <div className="resv-reveal">
            <h3 className="eyebrow mb-5">Call for reservations</h3>
            <Magnetic>
              <a
                href={site.phoneHref}
                className="inline-block border border-brass/50 px-8 py-4 font-display text-2xl text-cream transition-colors duration-300 hover:bg-brass hover:text-ink"
              >
                {site.phone}
              </a>
            </Magnetic>
          </div>

          <div className="resv-reveal">
            <h3 className="eyebrow mb-5">Find us</h3>
            <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="text-stone transition-colors hover:text-cream">
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </a>
            <div className="mt-5 aspect-[4/3] overflow-hidden border border-cream/10 grayscale-[0.6] contrast-[1.05]">
              <iframe
                src={site.mapEmbedSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to Piccolino Italian Kitchen"
              />
            </div>
          </div>
        </div>

        {/* Right: contact form (UI only) */}
        <div className="resv-reveal">
          <h3 className="eyebrow mb-8">Send us a note</h3>
          {sent ? (
            <div className="border border-brass/40 p-10 text-center">
              <p className="font-display text-3xl italic text-brass">Grazie!</p>
              <p className="mt-4 text-stone">
                We got your note. For same-day reservations, please call{" "}
                <a href={site.phoneHref} className="text-cream underline underline-offset-4">
                  {site.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-7">
              <div className="grid grid-cols-2 gap-6">
                <input required name="name" placeholder="Name" className={inputClass} />
                <input required type="tel" name="phone" placeholder="Phone" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input type="date" name="date" aria-label="Date" className={inputClass} />
                <select name="party" aria-label="Party size" className={inputClass}>
                  <option value="" className="bg-surface">Party size</option>
                  {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-surface">{n} guests</option>
                  ))}
                  <option value="9+" className="bg-surface">9+ (call us)</option>
                </select>
              </div>
              <textarea name="message" rows={4} placeholder="Anything we should know? Occasions, allergies, the good corner table…" className={inputClass} />
              <Magnetic>
                <button
                  type="submit"
                  className="border border-brass/50 px-10 py-4 font-sans text-sm uppercase tracking-[0.25em] text-cream transition-colors duration-300 hover:bg-brass hover:text-ink"
                >
                  Send
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
