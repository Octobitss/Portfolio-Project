import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Subtly pulls its contents toward the cursor on hover — desktop pointer only. */
export function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner || reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, strength]);

  return (
    <div ref={wrapRef} className={`magnetic ${className ?? ""}`}>
      <div ref={innerRef} className="magnetic__inner">
        {children}
      </div>
    </div>
  );
}
