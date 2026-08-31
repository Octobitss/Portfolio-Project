import { useLayoutEffect, type MutableRefObject, type RefObject } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface UseScrollProgressOptions {
  lengthVh?: number;
  pin?: boolean;
  onUpdate?: (progress: number) => void;
  disabled?: boolean;
  // Populated with the live ScrollTrigger instance so callers can read its
  // absolute `start`/`end` (in page scroll pixels) — e.g. to scroll back to
  // the top of the pin programmatically. Reading position off the trigger
  // element itself doesn't work for that: while pinned it's `position:fixed`,
  // so its rect no longer reflects where it sits in the document.
  triggerRef?: MutableRefObject<ScrollTrigger | undefined>;
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { lengthVh = 300, pin = true, onUpdate, disabled, triggerRef }: UseScrollProgressOptions
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
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${lengthVh}%`,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => onUpdate?.(self.progress),
      });
      if (triggerRef) triggerRef.current = st;
    }, el);

    return () => {
      if (triggerRef) triggerRef.current = undefined;
      ctx.revert();
    };
  }, [reducedMotion, lengthVh, pin, disabled]);
}
