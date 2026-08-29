import { useLayoutEffect, useRef } from "react";
import { processSteps } from "../../data/process";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { TextReveal } from "../../animations/TextReveal";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    ensureGsap();

    if (reducedMotion) {
      gsap.set(lineRef.current, { scaleY: 1 });
      gsap.set(stepRefs.current, { className: "+=is-active" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      stepRefs.current.forEach((el) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          end: "bottom 25%",
          toggleClass: { targets: el, className: "is-active" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="section process" id="process">
      <div className="container">
        <TextReveal as="h2" className="h-1 process__title" lines={["FROM IDEA TO", "SYSTEM."]} />

        <div className="process__timeline" ref={containerRef}>
          <div className="process__line-track">
            <div className="process__line" ref={lineRef} />
          </div>

          <div className="process__steps">
            {processSteps.map((step, i) => (
              <div
                className="process__step"
                key={step.index}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <span className="process__step-index">{step.index}</span>
                <div className="process__step-body">
                  <h3 className="h-3 process__step-name">{step.name}</h3>
                  <p className="text-body">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
