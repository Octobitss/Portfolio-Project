import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

let registered = false;

export function ensureGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  registered = true;
}

export { gsap, ScrollTrigger };
