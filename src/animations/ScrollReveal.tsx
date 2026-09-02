import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";
import { getMotionScale } from "../lib/responsive";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  style,
  y = 56,
  x = 0,
  duration = 1,
  delay = 0,
  start = "top 85%",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current) return;
    ensureGsap();

    if (reducedMotion) {
      gsap.set(ref.current, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const scale = getMotionScale();
      gsap.fromTo(
        ref.current,
        { y: y * scale, x: x * scale, opacity: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, y, x, duration, delay, start, once]);

  return (
    <div ref={ref} className={className} style={style} data-animate>
      {children}
    </div>
  );
}
