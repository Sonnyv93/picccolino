"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK } from "@/lib/gsap";

const photos = [
  { src: "/photos/cutouts/burrata-della-nonna.webp", alt: "Burrata Della Nonna — fresh burrata over crispy eggplant with roasted red peppers and balsamic", caption: "Burrata della Nonna", sub: "Antipasti", w: "w-[72vw] md:w-[34vw]" },
  { src: "/photos/cutouts/steak-shrimp-scampi.webp", alt: "NY strip steak topped with shrimp scampi, linguine aglio e olio, and broccoli rabe", caption: "Steak & Shrimp Scampi", sub: "Secondi", w: "w-[82vw] md:w-[40vw]" },
  { src: "/photos/cutouts/caprese.webp", alt: "Caprese salad — sliced tomato, fresh mozzarella, basil and balsamic glaze", caption: "Caprese", sub: "Insalate", w: "w-[72vw] md:w-[34vw]" },
  { src: "/photos/cutouts/tripe-marinara.webp", alt: "Tripe marinara simmered in tomato sauce with fresh herbs", caption: "Tripe Marinara", sub: "Della Casa", w: "w-[82vw] md:w-[40vw]" },
  { src: "/photos/cutouts/shrimp-crostini.webp", alt: "Shrimp crostini with tomato, garlic, and basil", caption: "Shrimp Crostini", sub: "Lunch", w: "w-[72vw] md:w-[34vw]" },
  { src: "/photos/cutouts/cioppino.webp", alt: "Cioppino — calamari, mussels, and clams in tomato broth", caption: "Cioppino", sub: "Frutti di Mare", w: "w-[82vw] md:w-[40vw]" },
  { src: "/photos/cutouts/eggplant-della-nonna.webp", alt: "Eggplant Della Nonna — breaded eggplant layered with fresh mozzarella, roasted red peppers and herbs over greens", caption: "Eggplant Della Nonna", sub: "Antipasti", w: "w-[82vw] md:w-[40vw]" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      // Pin the section and translate the track horizontally as you scroll
      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Slight parallax inside each frame, driven by the horizontal tween
      gsap.utils.toArray<HTMLElement>(".gallery-parallax").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden">
      <div className="absolute left-6 top-24 z-10 md:left-12 md:top-28">
        <p className="eyebrow mb-3">The Gallery</p>
        <h2 className="glass-text font-display text-4xl md:text-6xl">
          From our kitchen<span className="glass-text-olive italic">.</span>
        </h2>
      </div>

      {/* Horizontal track — falls back to native swipe-scroll for reduced motion */}
      <div className="flex h-[100svh] items-end pb-14 md:items-center md:pb-0 motion-reduce:overflow-x-auto">
        <div ref={trackRef} className="flex w-max gap-5 pl-6 pr-6 will-change-transform md:gap-8 md:pl-12">
          {photos.map((p) => (
            <figure
              key={p.src}
              className={`relative ${p.w} flex h-[62svh] shrink-0 flex-col items-center justify-center md:h-[72svh]`}
            >
              {/* olive glow pool under the plate */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(168,171,110,0.15),transparent_62%)]"
              />
              <div className="gallery-parallax relative h-[78%] w-full will-change-transform">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="dish-cutout object-contain"
                  sizes="(min-width: 768px) 40vw, 82vw"
                />
              </div>
              <figcaption className="relative mt-6 text-center">
                <span className="block font-display text-xl italic text-cream/90 md:text-2xl">
                  {p.caption}
                </span>
                <span className="mt-2 block font-sans text-[0.65rem] uppercase tracking-[0.3em] text-brass">
                  {p.sub}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
