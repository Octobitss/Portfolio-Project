import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  from?: number;
  to?: number;
  scrub?: boolean;
}

export function ScrollScale({
  children,
  className,
  style,
  from = 0.85,
  to = 1,
  scrub = true,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current) return;
    ensureGsap();

    if (reducedMotion) {
      gsap.set(ref.current, { scale: 1, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: from },
        {
          scale: to,
          ease: "none",
          scrollTrigger: scrub
            ? {
                trigger: ref.current,
                start: "top bottom",
                end: "center center",
                scrub: true,
              }
            : {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, from, to, scrub]);

  return (
    <div ref={ref} className={className} style={style} data-animate>
      {children}
    </div>
  );
}
