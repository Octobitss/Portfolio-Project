import { useRef, useState } from "react";
import { productTours } from "../../data/productTours";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { TourVisual } from "./TourVisual";

export function ProductTours() {
  const [tourId, setTourId] = useState(productTours[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const tour = productTours.find((t) => t.id === tourId) ?? productTours[0];

  useScrollProgress(sectionRef, {
    lengthVh: tour.steps.length * 90,
    onUpdate: (progress) => {
      const idx = Math.min(tour.steps.length - 1, Math.floor(progress * tour.steps.length));
      setStepIndex((prev) => (prev === idx ? prev : idx));
    },
  });

  return (
    <section className="section product-tours" ref={sectionRef} id="product-tours">
      <div className="container product-tours__frame">
        <div className="product-tours__header">
          <span className="eyebrow">See The System In Action</span>
          <div className="product-tours__tabs">
            {productTours.map((t) => (
              <button
                key={t.id}
                className={`product-tours__tab ${t.id === tourId ? "is-active" : ""}`}
                onClick={() => {
                  setTourId(t.id);
                  setStepIndex(0);
                }}
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
