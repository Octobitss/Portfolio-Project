import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { getMotionScale } from "../../lib/responsive";
import { TextReveal } from "../../animations/TextReveal";
import { MagneticButton } from "../../animations/MagneticButton";

interface HeroPanel {
  id: string;
  label: string;
  top: string;
  left: string;
  exitX: number;
  exitY: number;
  exitRotate: number;
}

const panels: HeroPanel[] = [
  { id: "shopify", label: "SHOPIFY", top: "25%", left: "17%", exitX: -160, exitY: -70, exitRotate: -8 },
  { id: "react", label: "REACT", top: "18%", left: "75%", exitX: 170, exitY: -50, exitRotate: 9 },
  { id: "api", label: "API", top: "14%", left: "30%", exitX: 10, exitY: -170, exitRotate: 3 },
  { id: "queue", label: "QUEUE", top: "50%", left: "10%", exitX: -220, exitY: 20, exitRotate: -6 },
  { id: "admin", label: "ADMIN", top: "46%", left: "85%", exitX: 210, exitY: 30, exitRotate: 8 },
  { id: "pos", label: "POS", top: "75%", left: "19%", exitX: -180, exitY: 100, exitRotate: -12 },
  { id: "database", label: "DATABASE", top: "87%", left: "35%", exitX: -20, exitY: 170, exitRotate: -4 },
  { id: "ticketing", label: "TICKETING", top: "83%", left: "75%", exitX: 160, exitY: 110, exitRotate: 13 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    ensureGsap();
    gsap.set(panelRefs.current.filter(Boolean), { xPercent: -50, yPercent: -50 });
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      const motionScale = getMotionScale();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(contentRef.current, { y: -130, scale: 0.94, opacity: 0, ease: "none" }, 0);
      tl.to(gridRef.current, { y: -70, opacity: 0.15, ease: "none" }, 0);
      tl.to(scrollCueRef.current, { opacity: 0, ease: "none", duration: 0.25 }, 0);

      panels.forEach((panel, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        tl.to(
          el,
          {
            x: panel.exitX * motionScale,
            y: panel.exitY * motionScale,
            rotate: panel.exitRotate,
            opacity: 0,
            ease: "none",
          },
          0
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="hero" ref={sectionRef} id="top">
      <div className="hero__grid grid-overlay" ref={gridRef} />

      <div className="hero__panels" aria-hidden="true">
        {panels.map((panel, i) => (
          <div
            key={panel.id}
            className={`hero__panel hero__panel--${panel.id}`}
            style={{ top: panel.top, left: panel.left }}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <div className="ui-panel hero__panel-face">
              <span className="ui-panel__dot" />
              {panel.label}
            </div>
          </div>
        ))}
      </div>

      <div className="hero__content" ref={contentRef}>
        <p className="eyebrow hero__eyebrow">Software Engineering Studio</p>
        <TextReveal
          as="h1"
          className="hero__headline"
          lines={["WE BUILD THE SYSTEMS", "BEHIND MODERN", "BUSINESS."]}
        />
        <p className="text-lead hero__lead">
          From Shopify commerce to custom React platforms, we design and engineer
          the software businesses actually need.
        </p>
        <div className="btn-group hero__actions">
          <MagneticButton>
            <a href="#services" className="btn btn--primary">
              View Our Systems
              <ArrowUpRight />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#cta" className="btn btn--ghost">
              Start a Project
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="hero__scroll-cue" ref={scrollCueRef}>
        <span className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  );
}
