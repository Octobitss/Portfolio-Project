import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface UseScrollProgressOptions {
  lengthVh?: number;
  pin?: boolean;
  onUpdate?: (progress: number) => void;
  disabled?: boolean;
}

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
  }, [reducedMotion, lengthVh, pin, disabled]);
}
