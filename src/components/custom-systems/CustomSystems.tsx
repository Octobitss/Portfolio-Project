import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { getMotionScale } from "../../lib/responsive";

const fragments = [
  { label: "YOUR WORKFLOW", x: -260, y: -130 },
  { label: "YOUR DATA", x: 260, y: -130 },
  { label: "YOUR USERS", x: -260, y: 130 },
  { label: "YOUR SYSTEM", x: 260, y: 130 },
];

export function CustomSystems() {
  const sectionRef = useRef<HTMLElement>(null);
  const genericRef = useRef<HTMLDivElement>(null);
  const fragmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      const motionScale = getMotionScale();
      gsap.set(fragmentRefs.current, { opacity: 0, x: 0, y: 0, xPercent: -50, yPercent: -50, scale: 0.6 });
      gsap.set(finalRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(genericRef.current, { opacity: 0, scale: 0.7, filter: "blur(6px)", ease: "none", duration: 0.8 }, 0.7);

      fragments.forEach((f, i) => {
        const el = fragmentRefs.current[i];
        if (!el) return;
        tl.to(
          el,
          { opacity: 1, x: f.x * motionScale, y: f.y * motionScale, scale: 1, ease: "none", duration: 0.8 },
          0.75 + i * 0.05
        );
      });

      tl.to(finalRef.current, { opacity: 1, scale: 1, ease: "none", duration: 0.8 }, 1.7);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="custom-systems" ref={sectionRef}>
      <div className="custom-systems__stage">
        <p className="eyebrow custom-systems__eyebrow">If Your Business Doesn't Fit The Software...</p>

        <div className="custom-systems__generic" ref={genericRef}>
          <span className="h-1">GENERIC SOFTWARE</span>
        </div>

        <div className="custom-systems__fragments">
          {fragments.map((f, i) => (
            <div
              className="custom-systems__fragment"
              key={f.label}
              ref={(el) => {
                fragmentRefs.current[i] = el;
              }}
            >
              {f.label}
            </div>
          ))}
        </div>

        <div className="custom-systems__final" ref={finalRef}>
          <span className="h-display text-gradient">CUSTOM SOFTWARE</span>
          <span className="text-lead">We build the software.</span>
        </div>
      </div>
    </section>
  );
}
