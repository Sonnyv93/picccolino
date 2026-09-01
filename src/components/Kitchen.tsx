"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Two clips shot in the kitchen. Both are 9:16 portrait and the frames are
 * shown whole — the containers match the source aspect ratio exactly, so
 * nothing gets cropped off. They only play while on screen.
 *
 * Swap a clip: replace the file in public/video/ and keep the name.
 */
const clips = [
  {
    src: "/video/spicy-rigatoni.mp4",
    caption: "Spicy Rigatoni with a Chicken Cutlet",
    sub: "Chicken Special",
  },
  {
    src: "/video/mussels.mp4",
    caption: "Mussels",
    sub: "Appetizer",
  },
];

export default function Kitchen() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const vids = Array.from(
      sectionRef.current?.querySelectorAll("video") ?? []
    ) as HTMLVideoElement[];

    // play only while visible — saves battery and data on phones
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 }
    );
    vids.forEach((v) => io.observe(v));

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".kitchen-clip",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kitchen"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(168,171,110,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-center">On the Line</p>
        <h2 className="display-xl glass-text mb-14 text-center font-display md:mb-20">
          Plated to order<span className="glass-text-olive italic">.</span>
        </h2>

        <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2 md:gap-14">
          {clips.map((c) => (
            <figure key={c.src} className="kitchen-clip">
              {/* container matches the clip's 9:16 exactly — no cropping */}
              <div className="photo-soft relative aspect-[9/16] overflow-hidden rounded-[28px]">
                <video
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={c.src} type="video/mp4" />
                </video>
              </div>
              <figcaption className="mt-5 text-center">
                <span className="block font-display text-lg italic text-cream/90 md:text-xl">
                  {c.caption}
                </span>
                <span className="mt-2 block font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brass">
                  {c.sub}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
