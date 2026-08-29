import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface CounterProps {
  /** target numeric value; e.g. 42 */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Animates a number counting up to `value` once it scrolls into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current) return;
    ensureGsap();
    const el = ref.current;

    const render = (n: number) => {
      el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`;
    };

    if (reducedMotion) {
      render(value);
      return;
    }

    render(0);
    const proxy = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => render(proxy.n),
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, prefix, suffix, decimals, duration, reducedMotion]);

  return <span ref={ref} className={className} />;
}
