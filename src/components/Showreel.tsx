"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Full-bleed food video, sitting mid-page between the menu and the gallery.
 * The clip is portrait, so it's framed in a tall rounded panel on desktop and
 * fills the width on mobile. It only plays while it's on screen.
 *
 * ── Swap the clip: replace  public/video/hero.mp4  ──
 */
export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;

    // Only play while visible — saves battery and data on mobile
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        frameRef.current,
        { yPercent: 8, scale: 0.94, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    });

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative overflow-hidden py-24 md:py-36"
    >
      {/* olive glow pooling behind the frame */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(168,171,110,0.13),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-center">In the Kitchen</p>
        <h2 className="display-xl glass-text mb-14 text-center font-display md:mb-20">
          Fresh every<span className="glass-text-olive italic"> day.</span>
        </h2>

        <div
          ref={frameRef}
          className="photo-soft relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-[32px] will-change-transform md:aspect-[4/5] md:max-w-3xl"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
