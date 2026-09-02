import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { services } from "../../data/services";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { getMotionScale } from "../../lib/responsive";
import { ServiceVisual } from "./ServiceVisual";

const SEGMENT = 1;
const TOTAL = services.length * SEGMENT;
const DIRECTION = [1, -1, 1];
const CROSS_OFFSET = SEGMENT * 0.18;
const CROSS_WIDTH = SEGMENT * 0.36;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion, lenis } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      const motionScale = getMotionScale();
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === 0 ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, scale: 1.06 });
      });
      if (glowRef.current) {
        gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${TOTAL * 100}%`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const idx = Math.min(services.length - 1, Math.floor(self.progress * services.length));
            setActiveIndex((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      services.forEach((_, i) => {
        if (i === 0) return;
        const outEl = slideRefs.current[i - 1];
        const inEl = slideRefs.current[i];
        const dir = DIRECTION[i % DIRECTION.length];
        const at = i * SEGMENT - CROSS_OFFSET;

        if (outEl) {
          tl.to(
            outEl,
            { opacity: 0, scale: 0.92, x: -60 * dir * motionScale, rotate: -4 * dir, ease: "none", duration: CROSS_WIDTH },
            at
          );
        }
        if (inEl) {
          tl.fromTo(
            inEl,
            { opacity: 0, scale: 1.06, x: 70 * dir * motionScale, rotate: 4 * dir },
            { opacity: 1, scale: 1, x: 0, rotate: 0, ease: "none", duration: CROSS_WIDTH },
            at
          );
        }
        if (glowRef.current) {
          const glowShift = 140 * motionScale;
          tl.to(
            glowRef.current,
            {
              x: i % 2 === 0 ? -glowShift : glowShift,
              y: i % 2 === 0 ? glowShift * 0.7 : -glowShift * 0.7,
              ease: "none",
              duration: CROSS_WIDTH,
            },
            at
          );
        }
      });

      tl.set({}, {}, TOTAL);

      triggerRef.current = tl.scrollTrigger;
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      triggerRef.current = undefined;
      ctx.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !lenis) return;

    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleSettle = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const y = window.scrollY;
        if (y < trigger.start || y > trigger.end) return;
        const span = trigger.end - trigger.start;
        if (span <= 0) return;
        const rawIndex = ((y - trigger.start) / span) * services.length;

        for (let i = 1; i < services.length; i++) {
          const windowStart = i - CROSS_OFFSET;
          const windowEnd = i + CROSS_OFFSET;
          if (rawIndex > windowStart && rawIndex < windowEnd) {
            const targetIndex = rawIndex < i ? windowStart : windowEnd;
            const targetY = trigger.start + (targetIndex / services.length) * span;
            lenis.scrollTo(targetY, { duration: 0.4, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
            return;
          }
        }
      }, 160);
    };

    lenis.on("scroll", scheduleSettle);
    return () => {
      if (settleTimer) clearTimeout(settleTimer);
      lenis.off("scroll", scheduleSettle);
    };
  }, [reducedMotion, lenis]);

  return (
    <section className="section services" ref={sectionRef} id="services">
      <div className="services__glow" ref={glowRef}>
        {reducedMotion && (
          <img src="/brand/opnexusNewLogo.webp" alt="" aria-hidden="true" className="services__glow-mark" />
        )}
      </div>
      <div className="container services__frame">
        <div className="services__header">
          <span className="eyebrow">What We Build</span>
          <div className="services__index">
            {services.map((s, i) => (
              <span key={s.id} className={`services__dot ${i === activeIndex ? "is-active" : ""}`}>
                {s.index}
              </span>
            ))}
          </div>
        </div>

        <div className="services__stage">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="services__slide"
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
            >
              <div className="services__copy">
                <span className="index-number">{service.index}</span>
                <h2 className="h-1 services__name">{service.name}</h2>
                <p className="text-lead">{service.headline}</p>
                <p className="text-body">{service.description}</p>
                <div className="btn-group services__stack">
                  {service.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="services__visual">
                <ServiceVisual variant={service.visual} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
