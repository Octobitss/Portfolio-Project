/**
 * Scales down large scroll-driven transform distances on narrow viewports.
 * A GSAP-transformed element still counts toward document scrollWidth even at
 * opacity:0, so fixed pixel offsets tuned for desktop can cause horizontal
 * overflow on phones unless scaled down.
 */
export function getMotionScale(): number {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 640) return 0.35;
  if (w < 900) return 0.6;
  return 1;
}
