"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK } from "@/lib/gsap";

// Scenes rather than plated dishes — these stay as photographs, softened at the
// edges so they settle into the dark page instead of sitting on top of it.
const scenes = [
  {
    src: "/photos/room/dining-room.webp",
    alt: "The dining room at Piccolino, tables set with white linens",
    caption: "The dining room",
    span: "md:col-span-5 md:mt-16",
  },
  {
    src: "/photos/room/bread-oil.webp",
    alt: "Bread service — olive oil, herbs and grated cheese on a wooden board",
    caption: "Bread & oil, every table",
    span: "md:col-span-4",
  },
  {
    src: "/photos/room/kitchen-line.webp",
    alt: "Pans working on the kitchen line",
    caption: "On the line",
    span: "md:col-span-3 md:mt-24",
  },
  {
    src: "/photos/room/long-table.webp",
    alt: "A long table set for a party at Piccolino",
    caption: "Room for the whole family",
    span: "md:col-span-7",
  },
  {
    src: "/photos/room/roses-tiramisu.webp",
    alt: "Tiramisu and fresh roses by the host stand",
    caption: "Dolci at the door",
    span: "md:col-span-5 md:mt-20",
  },
];

export default function Room() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".room-figure",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
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
    <section
      ref={sectionRef}
      id="room"
      className="mx-auto max-w-6xl px-6 py-28 md:py-40"
    >
      <p className="eyebrow mb-6">The Place</p>
      <h2 className="display-xl glass-text mb-16 font-display md:mb-24">
        Come sit with us<span className="glass-text-olive italic">.</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {scenes.map((s) => (
          <figure key={s.src} className={`room-figure ${s.span}`}>
            <div className="photo-soft relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 90vw"
              />
            </div>
            <figcaption className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-stone">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
