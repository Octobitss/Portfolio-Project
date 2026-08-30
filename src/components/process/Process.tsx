import { useLayoutEffect, useRef, useState } from "react";
import { Search, Compass, Code2, CheckCircle2, Rocket, RefreshCw } from "lucide-react";
import { processSteps } from "../../data/process";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { TextReveal } from "../../animations/TextReveal";

const stepIcons = [Search, Compass, Code2, CheckCircle2, Rocket, RefreshCw];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();
  const [activeStep, setActiveStep] = useState(0);

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

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          end: "bottom 25%",
          toggleClass: { targets: el, className: "is-active" },
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
      });

      if (visualRef.current && window.matchMedia("(min-width: 1080px)").matches) {
        const visualHeight = visualRef.current.offsetHeight;
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 140px",
          end: () => `+=${containerRef.current!.offsetHeight - visualHeight}`,
          pin: visualRef.current,
          pinSpacing: false,
        });
      }
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

          <div className="process__visual" aria-hidden="true">
            <div className="process__visual-sticky" ref={visualRef}>
              {processSteps.map((step, i) => {
                const Icon = stepIcons[i % stepIcons.length];
                return (
                  <div
                    className={`process__visual-frame ${activeStep === i ? "is-active" : ""}`}
                    key={step.index}
                  >
                    <span className="process__visual-number">{step.index}</span>
                    <Icon className="process__visual-icon" strokeWidth={1.25} />
                    <span className="process__visual-label">{step.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
