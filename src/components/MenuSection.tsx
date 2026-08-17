"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import menu from "@/data/menu.json";

type Category = (typeof menu.categories)[number];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(menu.categories[0].id);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Scrollspy: highlight the category currently in view (runs even with
      // reduced motion — it's state, not animation)
      menu.categories.forEach((cat) => {
        ScrollTrigger.create({
          trigger: `#menu-${cat.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(cat.id),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Stagger each category's items up as it scrolls into view
        menu.categories.forEach((cat) => {
          gsap.fromTo(
            `#menu-${cat.id} .menu-item`,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: { trigger: `#menu-${cat.id}`, start: "top 72%" },
            }
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(`menu-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="menu" className="relative bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6">The Menu</p>
        <h2 className="display-xl glass-text mb-16 font-display md:mb-24">
          Cooked like home,
          <br />
          <span className="glass-text-olive italic">lunch &amp; dinner.</span>
        </h2>

        <div className="gap-16 md:grid md:grid-cols-[200px_1fr]">
          {/* Sticky category nav (horizontal chips on mobile, side rail on desktop) */}
          <nav className="sticky top-[66px] z-20 -mx-6 mb-10 flex gap-6 overflow-x-auto border-b border-cream/10 bg-surface/90 px-6 py-4 backdrop-blur md:top-24 md:mx-0 md:h-fit md:flex-col md:gap-4 md:border-none md:bg-transparent md:p-0 md:backdrop-blur-0">
            {menu.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => jumpTo(cat.id)}
                className={`whitespace-nowrap text-left font-sans text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === cat.id ? "text-brass" : "text-stone hover:text-cream"
                }`}
              >
                {cat.short}
              </button>
            ))}
          </nav>

          {/* Categories */}
          <div className="space-y-24 md:space-y-32">
            {menu.categories.map((cat) => (
              <CategoryBlock key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type MenuItem = {
  name: string;
  description?: string;
  price?: string;
};

function CategoryBlock({ cat }: { cat: Category }) {
  return (
    <div id={`menu-${cat.id}`} className="scroll-mt-28">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-display text-3xl md:text-4xl">{cat.name}</h3>
        <span className="font-display italic text-brass/70">{cat.subtitle}</span>
      </div>
      <p className="mb-10 font-sans text-xs uppercase tracking-[0.25em] text-stone">
        {cat.note}
      </p>

      <ul className="space-y-2">
        {(cat.items as MenuItem[]).map((item) => (
          <li
            key={item.name}
            className="menu-item group -mx-4 rounded px-4 py-4 transition-transform duration-300 will-change-transform hover:-translate-y-1 md:py-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-brass md:text-2xl">
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-cream/15" />
              {item.price && (
                <span className="whitespace-nowrap font-sans text-sm tracking-widest text-brass">
                  {item.price}
                </span>
              )}
            </div>
            {item.description && (
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
