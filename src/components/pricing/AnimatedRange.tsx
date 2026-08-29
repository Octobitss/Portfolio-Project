import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { formatUSD } from "../../data/pricing";

export function AnimatedRange({ min, max, className }: { min: number; max: number; className?: string }) {
  const minRef = useRef<HTMLSpanElement>(null);
  const maxRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({ min, max });
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    const minEl = minRef.current;
    const maxEl = maxRef.current;
    if (!minEl || !maxEl) return;

    if (reducedMotion) {
      minEl.textContent = formatUSD(min);
      maxEl.textContent = formatUSD(max);
      stateRef.current = { min, max };
      return;
    }

    const proxy = { ...stateRef.current };
    gsap.to(proxy, {
      min,
      max,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        minEl.textContent = formatUSD(proxy.min);
        maxEl.textContent = formatUSD(proxy.max);
      },
      onComplete: () => {
        stateRef.current = { min, max };
      },
    });
  }, [min, max, reducedMotion]);

  return (
    <span className={className}>
      <span ref={minRef}>{formatUSD(min)}</span>
      {" – "}
      <span ref={maxRef}>{formatUSD(max)}</span>
    </span>
  );
}
