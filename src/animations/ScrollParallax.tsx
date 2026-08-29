import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  axis?: "x" | "y";
}

export function ScrollParallax({
  children,
  className,
  style,
  speed = 0.3,
  axis = "y",
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current || reducedMotion) return;
    ensureGsap();

    const distance = 200 * speed;
    const from = axis === "y" ? { y: -distance } : { x: -distance };
    const to = axis === "y" ? { y: distance } : { x: distance };

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, speed, axis]);

  return (
    <div ref={ref} className={className} style={style} data-animate>
      {children}
    </div>
  );
}
