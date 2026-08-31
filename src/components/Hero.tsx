"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, MOTION_OK } from "@/lib/gsap";

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
          className="object-cover opacity-[0.72]"
          sizes="100vw"
        />
        {/* feather the photo's edges into the olive field */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_38%,rgba(15,17,10,0.92)_88%)]" />
      </div>

      {/* Dark scrim — just enough to keep the wordmark readable over the sign */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/45 to-ink" />

      {/* Title */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="eyebrow mb-6"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Toms River · New Jersey
        </motion.p>

        <motion.h1
          className="display-hero glass-text font-display"
          initial={reduced ? false : { opacity: 0, letterSpacing: "0.18em" }}
          animate={{ opacity: 1, letterSpacing: "0.005em" }}
          transition={{ duration: 2.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Piccolino
        </motion.h1>

        <motion.p
          className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-cream/60"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Italian Kitchen
        </motion.p>

        {/* House motto, carried over from the family's first place */}
        <motion.figure
          className="mt-10"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="font-display text-2xl italic text-cream/85 md:text-4xl">
            &ldquo;Love at first bite&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brass">
            — Rockafellas Clam Bar &amp; Grill
          </figcaption>
        </motion.figure>
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/30 pt-2">
          <span className="scroll-hint-dot h-2 w-[3px] rounded-full bg-brass" />
        </span>
      </motion.a>
    </section>
  );
}
