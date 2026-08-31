"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        // Dish floats up and settles as it scrolls into view
        gsap.fromTo(
          ".about-image",
          { opacity: 0, y: 70, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-image", start: "top 78%" },
          }
        );
        // Text column: staggered fade-up
        gsap.fromTo(
          ".about-copy > *",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-copy", start: "top 78%" },
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
      id="about"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:gap-20 md:py-44"
    >
      <div className="about-image relative aspect-[9/10] will-change-transform">
        {/* soft olive glow behind the floating dish */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(168,171,110,0.16),transparent_66%)]"
        />
        <Image
          src="/photos/cutouts/red-snapper-shrimp.webp"
          alt="Red snapper special over creamy rice with herb cream sauce and shrimp"
          fill
          className="dish-cutout object-contain"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </div>

      <div className="about-copy">
        <p className="eyebrow mb-6">Our Story</p>
        <h2 className="display-xl glass-text font-display">
          A little kitchen,
          <br />
          <span className="glass-text-olive italic">a big family.</span>
        </h2>
        <p className="mt-8 max-w-md leading-relaxed text-stone">
          Piccolino means &ldquo;little one&rdquo; — and that&rsquo;s how this
          place started. A few tables, one stove, and recipes carried across
          the ocean and down the Parkway to the Jersey Shore.
        </p>
        <p className="mt-5 max-w-md leading-relaxed text-stone">
          Our family has been feeding this shore for{" "}
          <span className="text-cream">more than 35 years</span>. It started
          right here on Fischer Blvd as{" "}
          <span className="text-cream">Rockafellas Clam Bar &amp; Grill</span>,
          and grew into{" "}
          <span className="text-cream">Rockafellas By The Sea</span> in Ortley
          Beach — a summer institution for locals and down-the-shore regulars
          alike. Piccolino is where that kitchen lives now, open all year.
        </p>
        <p className="mt-5 max-w-md leading-relaxed text-stone">
          It&rsquo;s a cozy little spot — the kind of place where the sauce
          simmers all morning, the bread and oil hit the table before you ask,
          and somebody always wants to know how your mother is doing. Come for
          lunch, come back for dinner, stay like family.
        </p>
        <p className="mt-10 font-display text-2xl italic text-cream/80">
          &ldquo;Mangia, mangia.&rdquo;
        </p>
      </div>
    </section>
  );
}
