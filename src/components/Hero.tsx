"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, MOTION_OK } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import { site } from "@/data/site";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Parallax: video layer drifts slower than the scroll (transform-only, scrubbed)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.to(videoRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative h-[100svh] overflow-hidden">
      {/* ── Hero backdrop ────────────────────────────────────────────────
          The storefront at night, sitting behind the wordmark as a faint
          watermark. The food video lives mid-page (see Showreel.tsx). */}
      <div ref={videoRef} className="absolute inset-0 -bottom-[22%]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#232a17_0%,#151a0e_45%,#0f110a_100%)]" />
        <Image
          src="/photos/room/storefront-night.webp"
          alt="Piccolino Italian Kitchen storefront at night"
          fill
          priority
          className="object-cover opacity-95"
          sizes="100vw"
        />
        {/* feather the photo's edges into the olive field */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_46%,rgba(15,17,10,0.88)_92%)]" />
      </div>

      {/* Scrim weighted to the lower half — keeps the sign bright up top while
          the motto and buttons stay readable below */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/35 to-ink" />

      {/* Title */}
      <div className="relative z-20 flex h-full flex-col items-center justify-end px-6 pb-28 text-center md:pb-32">
        <motion.p
          className="eyebrow mb-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Toms River · New Jersey
        </motion.p>

        {/* The name is carried by the sign in the photograph — no wordmark here.
            Screen readers still need it, so it lives in a visually-hidden h1. */}
        <h1 className="sr-only">
          Piccolino Italian Kitchen — Toms River, New Jersey
        </h1>

        {/* House motto, carried over from the family's first place */}
        <motion.figure
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="font-display text-2xl italic text-cream/85 md:text-4xl">
            &ldquo;Love at first bite&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brass">
            — Rockafellas Clam Bar &amp; Grill
          </figcaption>
        </motion.figure>

        {/* Primary call to action */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic>
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brass px-10 py-4 font-sans text-sm uppercase tracking-[0.25em] text-ink transition-colors duration-300 hover:bg-cream"
            >
              Order Online
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.phoneHref}
              className="inline-block border border-cream/30 px-10 py-4 font-sans text-sm uppercase tracking-[0.25em] text-cream transition-colors duration-300 hover:border-cream/70"
            >
              Call {site.phone}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/30 pt-2">
          <span className="scroll-hint-dot h-2 w-[3px] rounded-full bg-brass" />
        </span>
      </motion.a>
    </section>
  );
}
