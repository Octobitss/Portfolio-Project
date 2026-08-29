import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { formatPHP } from "../../data/pricing";

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
      minEl.textContent = formatPHP(min);
      maxEl.textContent = formatPHP(max);
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
        minEl.textContent = formatPHP(proxy.min);
        maxEl.textContent = formatPHP(proxy.max);
      },
      onComplete: () => {
        stateRef.current = { min, max };
      },
    });
  }, [min, max, reducedMotion]);

  return (
    <span className={className}>
      <span ref={minRef}>{formatPHP(min)}</span>
      {" – "}
      <span ref={maxRef}>{formatPHP(max)}</span>
    </span>
  );
}
