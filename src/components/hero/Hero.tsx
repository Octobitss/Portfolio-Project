import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const logoMarkRef = useRef<HTMLImageElement>(null);
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

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const logo = logoMarkRef.current;
    const servicesEl = document.getElementById("services");
    const glowEl = document.querySelector<HTMLElement>(".services__glow");
    const afterServicesEl = document.getElementById("technology");
    if (!logo || !servicesEl || !glowEl || !afterServicesEl) return;

    ensureGsap();
    let ctx: gsap.Context | undefined;
    let rafId: number;

    // The logo never moves in the DOM — it stays fixed-position, portaled to <body>,
    // for its whole life. Past the hero, instead of re-parenting it into .services__glow
    // (which, empirically, causes React to recreate the node on each container change and
    // wipe every GSAP-applied inline style), we just add the glow's own live transform to
    // its base position each frame, so it visually tracks the glow without ever moving house.
    const build = () => {
      ctx?.revert();

      const startRect = logo.getBoundingClientRect();
      if (startRect.width === 0) return;

      const heroEnd = servicesEl.getBoundingClientRect().top + window.scrollY;
      const combinedEnd = afterServicesEl.getBoundingClientRect().top + window.scrollY;
      const aspect = startRect.height / startRect.width;
      const endWidth = glowEl.getBoundingClientRect().width * 0.4;
      const endHeight = endWidth * aspect;
      const baseLeft = window.innerWidth / 2 - endWidth / 2;
      const baseTop = window.innerHeight / 2 - endHeight / 2;

      ctx = gsap.context(() => {
        gsap.set(logo, {
          position: "fixed",
          top: startRect.top,
          left: startRect.left,
          right: "auto",
          marginLeft: 0,
          marginRight: 0,
          width: startRect.width,
          height: startRect.height,
          opacity: 0.16,
        });

        ScrollTrigger.create({
          start: 0,
          end: combinedEnd,
          scrub: true,
          onUpdate: (self) => {
            const scrollPos = self.progress * combinedEnd;
            if (scrollPos <= heroEnd) {
              const p = heroEnd > 0 ? gsap.utils.clamp(0, 1, scrollPos / heroEnd) : 1;
              gsap.set(logo, {
                top: gsap.utils.interpolate(startRect.top, baseTop, p),
                left: gsap.utils.interpolate(startRect.left, baseLeft, p),
                width: gsap.utils.interpolate(startRect.width, endWidth, p),
                height: gsap.utils.interpolate(startRect.height, endHeight, p),
                opacity: gsap.utils.interpolate(0.16, 0.4, p),
              });
            } else {
              const glowX = (gsap.getProperty(glowEl, "x") as number) || 0;
              const glowY = (gsap.getProperty(glowEl, "y") as number) || 0;
              // Fade out over the last stretch of Services' own pin so the logo doesn't
              // stay frozen on screen, overlapping the section that scrolls in after it.
              const servicesProgress = gsap.utils.clamp(0, 1, (scrollPos - heroEnd) / (combinedEnd - heroEnd));
              const fadeStart = 0.85;
              const fadeOpacity =
                servicesProgress <= fadeStart
                  ? 0.4
                  : gsap.utils.interpolate(0.4, 0, (servicesProgress - fadeStart) / (1 - fadeStart));
              gsap.set(logo, {
                top: baseTop + glowY,
                left: baseLeft + glowX,
                width: endWidth,
                height: endHeight,
                opacity: fadeOpacity,
              });
            }
          },
        });
      });
    };

    // Deferred one frame so Services' own pin (a sibling component, mounted after this
    // one) has already inserted its pin-spacer by the time we measure distances past it.
    rafId = requestAnimationFrame(build);

    const onResize = () => {
      build();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
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

      {createPortal(
        <img
          src="/brand/opnexus-mark.webp"
          alt=""
          aria-hidden="true"
          className="brand-travel-logo"
          ref={logoMarkRef}
        />,
        document.body
      )}
    </section>
  );
}
