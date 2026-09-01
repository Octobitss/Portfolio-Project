import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

let registered = false;

export function ensureGsap() {
  console.log("[diag] ensureGsap called, registered=", registered);
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  registered = true;
  // TEMP DIAGNOSTIC — remove before committing.
  (window as unknown as { __gsap: unknown; __ScrollTrigger: unknown }).__gsap = gsap;
  (window as unknown as { __gsap: unknown; __ScrollTrigger: unknown }).__ScrollTrigger = ScrollTrigger;
  console.log("[diag] window.__ScrollTrigger set:", typeof (window as { __ScrollTrigger?: unknown }).__ScrollTrigger);
}

export { gsap, ScrollTrigger };
