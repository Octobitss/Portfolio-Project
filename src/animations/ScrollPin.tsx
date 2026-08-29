import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface ScrollPinProps {
  children: ReactNode;
  className?: string;
  lengthVh?: number;
}

export function ScrollPin({ children, className, lengthVh = 150 }: ScrollPinProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current || reducedMotion) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: `+=${lengthVh}%`,
        pin: true,
        pinSpacing: true,
      });
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, lengthVh]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
