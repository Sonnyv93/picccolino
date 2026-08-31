"use client";

import Image from "next/image";
import { site } from "@/data/site";

/**
 * Scannable QR to the Toast ordering page.
 *
 * Useful two ways: a guest on a laptop can scan it with their phone and carry
 * the order with them, and the same SVG can be printed for the counter, the
 * tables, or takeout bags — it's vector, so it scales to any size cleanly.
 *
 * Regenerate if the ordering URL ever changes:
 *   see scripts/make-qr.py
 */
export default function OrderQR({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a
        href={site.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block shrink-0 rounded-2xl bg-cream p-3 transition-transform duration-300 hover:scale-[1.03]"
        aria-label="Scan or click to order online from Piccolino"
      >
        <Image
          src="/qr/order-toast.svg"
          alt="QR code linking to Piccolino's online ordering on Toast"
          width={128}
          height={128}
          className="h-28 w-28 text-ink md:h-32 md:w-32"
        />
      </a>
      <div>
        <p className="font-display text-xl italic text-cream">Scan to order</p>
        <p className="mt-1.5 max-w-[15rem] text-sm leading-relaxed text-stone">
          Point your phone at the code — it opens our Toast menu for pickup.
        </p>
      </div>
    </div>
  );
}
