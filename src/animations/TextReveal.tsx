import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../lib/gsap";
import { useMotionPrefs } from "../lib/SmoothScrollProvider";

interface TextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  stagger?: number;
  delay?: number;
  start?: string;
  scrub?: boolean;
}

/**
 * Editorial line-by-line reveal: each line sits in an overflow-hidden mask
 * and translates up from below on scroll — no typing effects.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  style,
  as: Tag = "div",
  stagger = 0.09,
  delay = 0,
  start = "top 88%",
  scrub = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!ref.current) return;
    ensureGsap();
    const inners = ref.current.querySelectorAll<HTMLElement>(".reveal-line__inner");

    if (reducedMotion) {
      gsap.set(inners, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            scrub: scrub || undefined,
            toggleActions: scrub ? undefined : "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, stagger, delay, start, scrub]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <span className={`reveal-line__inner ${lineClassName ?? ""}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
