"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Mobile-only sticky bar: Order + Call always within thumb reach.
 * Appears once the hero (which has its own buttons) is scrolled past.
 */
export default function OrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-cream/10 bg-ink/95 px-4 py-3 backdrop-blur transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-brass py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-ink"
      >
        Order Online
      </a>
      <a
        href={site.phoneHref}
        className="flex-1 border border-cream/30 py-3.5 text-center font-sans text-xs uppercase tracking-[0.22em] text-cream"
      >
        Call
      </a>
    </div>
  );
}
