"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, MOTION_OK } from "@/lib/gsap";
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
      {/* ── Video background ──────────────────────────────────────────────
          The food video lives in its own section mid-page (see Showreel.tsx) —
          the hero stays a quiet olive field so the wordmark carries it. */}
      <div ref={videoRef} className="absolute inset-0 -bottom-[22%]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#232a17_0%,#151a0e_45%,#0f110a_100%)]" />
      </div>

      {/* Dark cinematic gradient overlay — keeps the wordmark readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

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
          className="mt-5 font-display text-lg italic text-cream/70 md:text-2xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Italian Kitchen — {site.tagline.toLowerCase()}
        </motion.p>
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
