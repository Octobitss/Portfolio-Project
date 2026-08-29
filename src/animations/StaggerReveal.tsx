import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  stagger?: number;
  start?: string;
  targets?: string;
}

export function StaggerReveal({
  children,
  className,
  style,
  y = 40,
  stagger = 0.1,
  start = "top 82%",
  targets,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current) return;
    ensureGsap();
    const items = targets
      ? ref.current.querySelectorAll(targets)
      : ref.current.children;

    if (reducedMotion) {
      gsap.set(items, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, y, stagger, start, targets]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
