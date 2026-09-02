import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { getMotionScale } from "../../lib/responsive";
import { TextReveal } from "../../animations/TextReveal";
import { MagneticButton } from "../../animations/MagneticButton";
import { ReactMark } from "./BrandMarks";
import { services } from "../../data/services";
import { hasSeenIntro, INTRO_COMPLETE_EVENT } from "../preloader/Preloader";

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
  { id: "saas", label: "SAAS", top: "16%", left: "58%", exitX: 30, exitY: -170, exitRotate: 4 },
  { id: "pos", label: "POS", top: "75%", left: "19%", exitX: -180, exitY: 100, exitRotate: -12 },
  { id: "abtest", label: "A/B TEST", top: "78%", left: "75%", exitX: 170, exitY: 160, exitRotate: 8 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const brandFaceRef = useRef<HTMLImageElement>(null);
  const shopifyFaceRef = useRef<HTMLDivElement>(null);
  const shopifyItemRef = useRef<HTMLImageElement>(null);
  const rechargeItemRef = useRef<HTMLImageElement>(null);
  const klaviyoItemRef = useRef<HTMLImageElement>(null);
  const reactFaceRef = useRef<HTMLDivElement>(null);
  const reactItemRef = useRef<SVGSVGElement>(null);
  const springbootItemRef = useRef<HTMLImageElement>(null);
  const customFaceRef = useRef<HTMLDivElement>(null);
  const customTopRef = useRef<HTMLImageElement>(null);
  const customBottomRef = useRef<HTMLImageElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    ensureGsap();
    gsap.set(panelRefs.current.filter(Boolean), { xPercent: -50, yPercent: -50 });
  }, []);

  // First-load entrance: the headline reveals itself via TextReveal's own
  // scroll trigger (already in view at progress ~0, so it fires immediately),
  // but the rest of the hero previously just appeared with no motion at all.
  // Staggering these in — timed to start only once the preloader intro (if
  // playing this session) has actually cleared, so it isn't wasted underneath
  // the opaque overlay — makes the first paint read as considerably livelier.
  useLayoutEffect(() => {
    if (reducedMotion) return;
    ensureGsap();

    const targets = [eyebrowRef.current, leadRef.current, actionsRef.current].filter(Boolean);
    const panelEls = panelRefs.current.filter(Boolean);
    if (!targets.length && !panelEls.length) return;

    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.set(panelEls, { opacity: 0, scale: 0.7 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(targets, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0);
      tl.to(panelEls, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "back.out(1.6)" }, 0.35);
    };

    if (hasSeenIntro()) {
      play();
    } else {
      window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
    }

    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, play);
  }, [reducedMotion]);

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
    const logo = logoWrapRef.current;
    const brandFace = brandFaceRef.current;
    const shopifyFace = shopifyFaceRef.current;
    const shopifyItem = shopifyItemRef.current;
    const rechargeItem = rechargeItemRef.current;
    const klaviyoItem = klaviyoItemRef.current;
    const reactFace = reactFaceRef.current;
    const reactItem = reactItemRef.current;
    const springbootItem = springbootItemRef.current;
    const customFace = customFaceRef.current;
    const customTop = customTopRef.current;
    const customBottom = customBottomRef.current;
    const servicesEl = document.getElementById("services");
    const glowEl = document.querySelector<HTMLElement>(".services__glow");
    const afterServicesEl = document.getElementById("work");
    if (
      !logo ||
      !brandFace ||
      !shopifyFace ||
      !shopifyItem ||
      !rechargeItem ||
      !klaviyoItem ||
      !reactFace ||
      !reactItem ||
      !springbootItem ||
      !customFace ||
      !customTop ||
      !customBottom ||
      !servicesEl ||
      !glowEl ||
      !afterServicesEl
    )
      return;

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
      const totalSlides = services.length;
      // Two different "ends" matter here, and they're not the same point:
      // - crossfadeEnd is where Services' own pin releases (totalSlides * 100% of
      //   its 100vh trigger). The shopify/react/custom crossfades all happen
      //   *within* this pinned span, so rawIndex must be measured against it —
      //   using the later position below here would lag the logo behind the
      //   slide content it's supposed to track.
      // - combinedEnd is where the next section (#work) actually arrives.
      //   After the pin releases, the now-unpinned Services section still has to
      //   scroll normally out of view (one more full viewport) before that
      //   happens — the logo should stay visible through that stretch too, so
      //   the wrapper's own visibility cutoff has to use this later position,
      //   not crossfadeEnd.
      const crossfadeEnd = heroEnd + totalSlides * window.innerHeight;
      const combinedEnd = afterServicesEl.getBoundingClientRect().top + window.scrollY;
      const aspect = startRect.height / startRect.width;
      const endWidth = glowEl.getBoundingClientRect().width * 0.4;
      const endHeight = endWidth * aspect;
      const baseLeft = window.innerWidth / 2 - endWidth / 2;
      const baseTop = window.innerHeight / 2 - endHeight / 2;
      const assembleGap = endWidth * 0.18;

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

        // Resting states for every logo face. Only one is fully opaque at a time —
        // entryTl and facesTl below cross-fade between them as the two faces they
        // share (shopify) always agree at the handoff, so switching which timeline
        // drives a given frame never causes a visible jump.
        gsap.set(brandFace, { opacity: 1, rotate: 0, scale: 1 });
        gsap.set([shopifyFace, reactFace, customFace], { opacity: 0, rotate: 0, scale: 0.6 });
        gsap.set([customTop, customBottom], { y: 0 });
        gsap.set(shopifyItem, { opacity: 1, rotate: 0, scale: 1 });
        gsap.set([rechargeItem, klaviyoItem], { opacity: 0, rotate: 0, scale: 0.6 });
        gsap.set(reactItem, { opacity: 1, rotate: 0, scale: 1 });
        gsap.set(springbootItem, { opacity: 0, rotate: 0, scale: 0.6 });

        // Brand mark -> Shopify mark, spinning, over the hero-exit travel (p: 0..1).
        const entryTl = gsap.timeline({ paused: true });
        entryTl.to(brandFace, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: 1 }, 0);
        entryTl.fromTo(
          shopifyFace,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: 1 },
          0
        );

        // Shopify -> React -> Custom, spinning at each slide boundary, then the
        // custom mark's two halves snap together once its spin-in has settled.
        // Driven directly in "slide index" units (rawIndex), matching Services.tsx's
        // own slide math so the logo swap lines up with each slide crossfade.
        const CROSS_W = 0.36;
        const CROSS_OFFSET = 0.18;
        const ASSEMBLE_W = 0.3;

        const facesTl = gsap.timeline({ paused: true });

        facesTl.to(shopifyFace, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: CROSS_W }, 1 - CROSS_OFFSET);
        facesTl.fromTo(
          reactFace,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: CROSS_W },
          1 - CROSS_OFFSET
        );

        facesTl.to(reactFace, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: CROSS_W }, 2 - CROSS_OFFSET);
        facesTl.fromTo(
          customFace,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: CROSS_W },
          2 - CROSS_OFFSET
        );
        facesTl.set(customTop, { y: -assembleGap }, 2 - CROSS_OFFSET);
        facesTl.set(customBottom, { y: assembleGap }, 2 - CROSS_OFFSET);

        const assembleStart = 2 - CROSS_OFFSET + CROSS_W;
        facesTl.to(customTop, { y: 0, ease: "power2.out", duration: ASSEMBLE_W }, assembleStart);
        facesTl.to(customBottom, { y: 0, ease: "power2.out", duration: ASSEMBLE_W }, assembleStart);

        // While the visitor is resting on the Shopify slide, cycle its logo through the
        // Shopify-ecosystem stack on a real-time loop (not scroll-linked) — Shopify ->
        // Recharge -> Klaviyo -> back to Shopify. Runs only while shopifyFace itself is
        // the steady, fully-settled face (see the play/pause/reset below), so it always
        // starts and ends on the plain Shopify mark, matching what entryTl/facesTl expect.
        const HOLD = 1.4;
        const SPIN = 0.55;
        const shopifyTickerTl = gsap.timeline({ paused: true, repeat: -1 });
        let tickerT = HOLD;
        shopifyTickerTl.to(shopifyItem, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: SPIN }, tickerT);
        shopifyTickerTl.fromTo(
          rechargeItem,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: SPIN, immediateRender: false },
          tickerT
        );
        tickerT += SPIN + HOLD;
        shopifyTickerTl.to(rechargeItem, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: SPIN }, tickerT);
        shopifyTickerTl.fromTo(
          klaviyoItem,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: SPIN, immediateRender: false },
          tickerT
        );
        tickerT += SPIN + HOLD;
        shopifyTickerTl.to(klaviyoItem, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: SPIN }, tickerT);
        // This one's "from" (opacity 0) would otherwise stomp shopifyItem's real resting
        // opacity (1) the instant the timeline is built, since fromTo renders its start
        // state immediately by default regardless of its position later in the timeline.
        shopifyTickerTl.fromTo(
          shopifyItem,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: SPIN, immediateRender: false },
          tickerT
        );

        let tickerActive = false;
        const setTickerActive = (active: boolean) => {
          if (active === tickerActive) return;
          tickerActive = active;
          if (active) shopifyTickerTl.pause(0).play();
          else shopifyTickerTl.pause(0);
        };

        // Same idea, for the React slide: React <-> SpringBoot (part of its own
        // stack), while resting on that slide only.
        const reactTickerTl = gsap.timeline({ paused: true, repeat: -1 });
        let reactTickerT = HOLD;
        reactTickerTl.to(reactItem, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: SPIN }, reactTickerT);
        reactTickerTl.fromTo(
          springbootItem,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: SPIN, immediateRender: false },
          reactTickerT
        );
        reactTickerT += SPIN + HOLD;
        reactTickerTl.to(springbootItem, { opacity: 0, rotate: -170, scale: 0.6, ease: "power1.in", duration: SPIN }, reactTickerT);
        reactTickerTl.fromTo(
          reactItem,
          { opacity: 0, rotate: 170, scale: 0.6 },
          { opacity: 1, rotate: 0, scale: 1, ease: "power1.out", duration: SPIN, immediateRender: false },
          reactTickerT
        );

        let reactTickerActive = false;
        const setReactTickerActive = (active: boolean) => {
          if (active === reactTickerActive) return;
          reactTickerActive = active;
          if (active) reactTickerTl.pause(0).play();
          else reactTickerTl.pause(0);
        };

        ScrollTrigger.create({
          start: 0,
          end: combinedEnd,
          scrub: true,
          onUpdate: (self) => {
            const scrollPos = self.progress * combinedEnd;
            // Always driven (not just while still in the hero) so it reaches exactly
            // progress 1 once we're past heroEnd, instead of freezing a hair short of
            // it and leaving a faint brand-mark ghost behind the later faces.
            const p = heroEnd > 0 ? gsap.utils.clamp(0, 1, scrollPos / heroEnd) : 1;
            entryTl.progress(p);
            if (scrollPos <= heroEnd) {
              gsap.set(logo, {
                top: gsap.utils.interpolate(startRect.top, baseTop, p),
                left: gsap.utils.interpolate(startRect.left, baseLeft, p),
                width: gsap.utils.interpolate(startRect.width, endWidth, p),
                height: gsap.utils.interpolate(startRect.height, endHeight, p),
                opacity: gsap.utils.interpolate(0.16, 0.4, p),
              });
              setTickerActive(false);
              setReactTickerActive(false);
            } else if (scrollPos >= combinedEnd) {
              // Services (and its glow) is done and scrolled away — cut instantly rather
              // than fading, so the logo never lingers on top of the next section.
              gsap.set(logo, { opacity: 0 });
              setTickerActive(false);
              setReactTickerActive(false);
            } else {
              let top: number;
              let left: number;
              if (scrollPos <= crossfadeEnd) {
                // Still pinned: the glow's screen position is fixed (base) plus
                // only its own live drift transform between slides.
                const glowX = (gsap.getProperty(glowEl, "x") as number) || 0;
                const glowY = (gsap.getProperty(glowEl, "y") as number) || 0;
                top = baseTop + glowY;
                left = baseLeft + glowX;
              } else {
                // Past the pin: Services is unpinned and scrolling away normally,
                // so the glow's on-screen position now changes with scroll too —
                // the base+drift shortcut above no longer accounts for that, so
                // track the glow's real rect directly here instead. This is the
                // only branch where that's worth the extra layout read, since the
                // rest of the range doesn't need it.
                const glowRect = glowEl.getBoundingClientRect();
                top = glowRect.top + glowRect.height / 2 - endHeight / 2;
                left = glowRect.left + glowRect.width / 2 - endWidth / 2;
              }
              gsap.set(logo, { top, left, width: endWidth, height: endHeight, opacity: 0.4 });
              const servicesSpan = crossfadeEnd - heroEnd;
              const servicesP = servicesSpan > 0 ? gsap.utils.clamp(0, 1, (scrollPos - heroEnd) / servicesSpan) : 1;
              const rawIndex = servicesP * totalSlides;
              facesTl.time(rawIndex);
              setTickerActive(rawIndex < 1 - CROSS_OFFSET);
              setReactTickerActive(rawIndex > 1 + CROSS_OFFSET && rawIndex < 2 - CROSS_OFFSET);
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
        <p className="eyebrow hero__eyebrow" ref={eyebrowRef}>Software Engineering Studio</p>
        <TextReveal
          as="h1"
          className="hero__headline"
          lines={["WE BUILD THE SYSTEMS", "BEHIND MODERN", "BUSINESS."]}
        />
        <p className="text-lead hero__lead" ref={leadRef}>
          From Shopify commerce to custom SaaS platforms, we design and engineer
          the software businesses actually need.
        </p>
        <div className="btn-group hero__actions" ref={actionsRef}>
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
        <div className="brand-travel-logo" ref={logoWrapRef}>
          <img
            src="/brand/opnexusNewLogo.png"
            alt=""
            aria-hidden="true"
            className="brand-travel-logo__face brand-travel-logo__face--brand"
            ref={brandFaceRef}
          />
          <div
            className="brand-travel-logo__face brand-travel-logo__face--shopify"
            ref={shopifyFaceRef}
          >
            <img
              src="/brand/shopify-logo.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__shopify-item"
              ref={shopifyItemRef}
            />
            <img
              src="/brand/recharge.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__shopify-item"
              ref={rechargeItemRef}
            />
            <img
              src="/brand/klaviyo-logo.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__shopify-item"
              ref={klaviyoItemRef}
            />
          </div>
          <div className="brand-travel-logo__face brand-travel-logo__face--react" ref={reactFaceRef}>
            <ReactMark className="brand-travel-logo__react-item" ref={reactItemRef} />
            <img
              src="/brand/springboot-logo.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__react-item"
              ref={springbootItemRef}
            />
          </div>
          <div className="brand-travel-logo__face brand-travel-logo__face--custom" ref={customFaceRef}>
            <img
              src="/brand/customLogo.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__custom-half brand-travel-logo__custom-half--top"
              ref={customTopRef}
            />
            <img
              src="/brand/customLogo.png"
              alt=""
              aria-hidden="true"
              className="brand-travel-logo__custom-half brand-travel-logo__custom-half--bottom"
              ref={customBottomRef}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
