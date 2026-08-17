import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Media query GSAP animations should respect. Use inside gsap.matchMedia():
//   mm.add(MOTION_OK, () => { ...scroll-triggered tweens... })
// so users with prefers-reduced-motion get static content.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
