"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import OrderQR from "@/components/OrderQR";
import { site } from "@/data/site";

export default function Reservations() {
  const sectionRef = useRef<HTMLElement>(null);

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

          {/* Reservations: phone only, and the line doesn't open until 4pm */}
          <div className="resv-reveal rounded-[24px] border border-brass/50 bg-brass/[0.07] p-7 md:p-8">
            <h3 className="eyebrow mb-4">Reservations</h3>
            <p className="font-display text-2xl leading-snug text-cream md:text-3xl">
              Call us from{" "}
              <span className="glass-text-olive italic">
                {site.reservations.callFrom}
              </span>
              , every day.
            </p>
            <Magnetic>
              <a
                href={site.phoneHref}
                className="mt-6 inline-block bg-brass px-8 py-4 font-display text-2xl text-ink transition-colors duration-300 hover:bg-cream"
              >
                {site.phone}
              </a>
            </Magnetic>
            <p className="mt-5 border-t border-brass/25 pt-4 text-sm leading-relaxed text-stone">
              <span className="text-cream">{site.reservations.lunch}</span>{" "}
              Come on in — we&rsquo;ll find you a table.
            </p>
          </div>

          <div className="resv-reveal">
            <h3 className="eyebrow mb-5">Order takeout</h3>
            <Magnetic>
              <a
                href={site.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brass px-8 py-4 font-sans text-sm uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-cream"
              >
                Order on Toast
              </a>
            </Magnetic>
            <p className="mt-3 text-sm text-stone">
              Ordered direct — no third-party fees.
            </p>
            <OrderQR className="mt-8" />

            {/* Delivery apps, kept visibly secondary to Toast */}
            <p className="mt-8 text-sm text-stone">
              Prefer delivery?{" "}
              {site.delivery.map((d, i) => (
                <span key={d.name}>
                  {i > 0 && " or "}
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-brass"
                  >
                    {d.name}
                  </a>
                </span>
              ))}
              .
            </p>
          </div>

          <div className="resv-reveal">
            <h3 className="eyebrow mb-5">Find us</h3>
            <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="text-stone transition-colors hover:text-cream">
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </a>
          </div>
        </div>

        {/* Right: map */}
        <div className="resv-reveal">
          <div className="photo-soft aspect-[4/5] overflow-hidden rounded-[28px] grayscale-[0.55] contrast-[1.05]">
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
    </section>
  );
}
