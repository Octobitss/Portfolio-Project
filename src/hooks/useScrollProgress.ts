import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface UseScrollProgressOptions {
  /** how many viewport-heights of scroll distance the pin should consume */
  lengthVh?: number;
  pin?: boolean;
  onUpdate?: (progress: number) => void;
  disabled?: boolean;
}

/**
 * Pins a section for `lengthVh` viewport-heights of scroll and reports
 * normalized progress (0–1) through that pinned span on every tick.
 * Powers the sticky storytelling sections (Services, Product Tours, Process).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { lengthVh = 300, pin = true, onUpdate, disabled }: UseScrollProgressOptions
) {
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current || disabled) return;

    if (reducedMotion) {
      onUpdate?.(0);
      return;
    }

    ensureGsap();
    const el = ref.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${lengthVh}%`,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => onUpdate?.(self.progress),
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, lengthVh, pin, disabled]);
}
