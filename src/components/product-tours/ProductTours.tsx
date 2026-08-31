import { useRef, useState } from "react";
import { productTours } from "../../data/productTours";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { TourVisual } from "./TourVisual";

const REVEAL_WINDOW = 0.14;

export function ProductTours() {
  const [tourId, setTourId] = useState(productTours[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hasRevealedRef = useRef(false);
  const triggerRef = useRef<ScrollTrigger | undefined>(undefined);
  const { lenis, reducedMotion } = useMotionPrefs();

  const tour = productTours.find((t) => t.id === tourId) ?? productTours[0];

  useScrollProgress(sectionRef, {
    lengthVh: tour.steps.length * 90,
    triggerRef,
    onUpdate: (progress) => {
      const idx = Math.min(tour.steps.length - 1, Math.floor(progress * tour.steps.length));
      setStepIndex((prev) => (prev === idx ? prev : idx));

      // The pin has no scroll-linked buildup otherwise, so the fully-formed,
      // vertically-centered content just appears the instant it engages —
      // easing it in over the first slice of scroll softens that snap. Plays
      // once (on the genuine first entrance) and then locks fully visible:
      // switching tabs re-scrolls to progress 0 within this same pin (see
      // handleTabSelect below), and re-running this from raw progress would
      // hide the content again right when it should just stay put.
      if (frameRef.current && !reducedMotion && !hasRevealedRef.current) {
        const reveal = gsap.utils.clamp(0, 1, progress / REVEAL_WINDOW);
        gsap.set(frameRef.current, {
          opacity: gsap.utils.interpolate(0, 1, reveal),
          y: gsap.utils.interpolate(28, 0, reveal),
        });
        if (reveal >= 1) hasRevealedRef.current = true;
      }
    },
  });

  // Each tour's steps live at a scroll progress *within this same pin*, so
  // switching tabs without also resetting scroll position leaves the display
  // showing whatever step the old scroll position maps to on the new tour —
  // the next scroll event then snaps it to that (often wrong) step, which is
  // what reads as "stuck" or jumping toward the next section.
  const handleTabSelect = (id: string) => {
    setTourId(id);
    setStepIndex(0);
    // Read before the tour switch above tears down and rebuilds the
    // ScrollTrigger (its lengthVh depends on the tour's step count) — `start`
    // itself doesn't change between tours (same trigger, same "top top"
    // condition), so the outgoing instance's value is still the right target.
    const targetY = triggerRef.current?.start;
    if (targetY === undefined) return;
    if (lenis && !reducedMotion) {
      lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section className="section product-tours" ref={sectionRef} id="product-tours">
      <div className="container product-tours__frame" ref={frameRef}>
        <div className="product-tours__header">
          <span className="eyebrow">See The System In Action</span>
          <div className="product-tours__tabs">
            {productTours.map((t) => (
              <button
                key={t.id}
                className={`product-tours__tab ${t.id === tourId ? "is-active" : ""}`}
                onClick={() => handleTabSelect(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="product-tours__stage">
          <div className="browser product-tours__browser tilt">
            <div className="browser__chrome">
              <div className="browser__dots"><span /><span /><span /></div>
              <div className="browser__url">{tour.url}</div>
            </div>
            <div className="browser__body">
              <TourVisual tourId={tour.id} stepIndex={stepIndex} />
            </div>
          </div>

          <ol className="product-tours__steps">
            {tour.steps.map((step, i) => (
              <li key={step.label} className={`product-tours__step ${i === stepIndex ? "is-active" : ""}`}>
                <span className="index-number">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="product-tours__step-label">{step.label}</p>
                  <p className="text-body">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
