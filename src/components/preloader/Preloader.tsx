import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, ensureGsap } from "../../lib/gsap";
import { PreloaderMark } from "./PreloaderMark";

const SEEN_KEY = "opnexus-intro-seen";
export const INTRO_COMPLETE_EVENT = "opnexus:intro-complete";
const NAME_CHARS = ["O", "P", ".", "N", "E", "X", "U", "S"] as const;
const DOT_INDEX = NAME_CHARS.indexOf(".");

export function hasSeenIntro() {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

const EASE_OUT = "cubic-bezier(0.25, 1, 0.5, 1)";
const EASE_IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";

const TIMING = {
  dot: 0.28,
  ring: 0.55,
  node: 0.4,
  wipe: 0.6,
  hold: 0.45,
  fade: 0.32,
  collapse: 0.75,
};

export function Preloader() {
  const [active, setActive] = useState(() => !hasSeenIntro());

  const rootRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    if (!active || !rootRef.current) return;

    const root = rootRef.current;
    const rootApp = document.getElementById("root");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    rootApp?.setAttribute("inert", "");

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = prevOverflow;
      rootApp?.removeAttribute("inert");
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setActive(false);
      window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
    };

    const fallback = window.setTimeout(finish, 4500);

    ensureGsap();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = letterRefs.current;
    const tl = gsap.timeline({ onComplete: finish });

    if (reducedMotion) {
      gsap.set(root, { clipPath: "circle(150% at 50% 50%)" });
      gsap.set([dotRef.current, nodeRef.current], { opacity: 1, scale: 1 });
      gsap.set(ringRef.current, { drawSVG: "100%" });
      gsap.set(wordRef.current, { clipPath: "inset(0 0% 0 0)" });
      gsap.set(letters, { opacity: 1, yPercent: 0 });
      tl.to(root, { opacity: 0, duration: 0.4, ease: "power1.inOut", delay: 0.4 });
    } else {
      gsap.set(root, { clipPath: "circle(150% at 50% 50%)" });
      gsap.set(dotRef.current, { transformOrigin: "50% 50%", scale: 0, opacity: 0 });
      gsap.set(ringRef.current, { drawSVG: "0%" });
      gsap.set(nodeRef.current, {
        transformOrigin: "50% 50%",
        scale: 0,
        opacity: 0,
        rotate: -35,
        x: 5,
        y: -4,
      });
      gsap.set(markRef.current, { filter: "blur(6px)" });
      gsap.set(wordRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(letters, { opacity: 0, yPercent: 70 });

      tl.addLabel("dotIn", 0)
        .to(dotRef.current, { scale: 1, opacity: 1, duration: TIMING.dot, ease: "back.out(2.4)" }, "dotIn")
        .addLabel("ringDraw", `dotIn+=0.08`)
        .to(markRef.current, { filter: "blur(0px)", duration: TIMING.ring, ease: EASE_OUT }, "ringDraw")
        .to(ringRef.current, { drawSVG: "100%", duration: TIMING.ring, ease: EASE_OUT }, "ringDraw")
        .addLabel("nodeSnap", `ringDraw+=${TIMING.ring - 0.12}`)
        .to(
          nodeRef.current,
          { scale: 1, opacity: 1, rotate: 0, x: 0, y: 0, duration: TIMING.node, ease: "back.out(1.8)" },
          "nodeSnap"
        )
        .to(
          markRef.current,
          { scale: 1.045, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 },
          "nodeSnap"
        )
        .addLabel("wordIn", `nodeSnap+=${TIMING.node - 0.15}`)
        .to(wordRef.current, { clipPath: "inset(0 0% 0 0)", duration: TIMING.wipe, ease: EASE_IN_OUT }, "wordIn")
        .to(letters, { opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.035, ease: "power3.out" }, "wordIn")
        .to(
          letters[DOT_INDEX],
          { scale: 1.3, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
          "wordIn+=0.15"
        )
        .addLabel("hold", `wordIn+=${TIMING.wipe}`)
        .addLabel("reveal", `hold+=${TIMING.hold}`)
        .to(lockupRef.current, { opacity: 0, duration: TIMING.fade, ease: "power1.in" }, "reveal")
        .to(root, { clipPath: "circle(0% at 50% 50%)", duration: TIMING.collapse, ease: EASE_IN_OUT }, "reveal");
    }

    return () => {
      window.clearTimeout(fallback);
      tl.kill();
      document.body.style.overflow = prevOverflow;
      rootApp?.removeAttribute("inert");
    };
  }, [active]);

  if (!active) return null;

  return createPortal(
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__lockup" ref={lockupRef}>
        <div className="preloader__mark" ref={markRef}>
          <PreloaderMark
            dotRef={dotRef}
            ringRef={ringRef}
            nodeRef={nodeRef}
            className="preloader__mark-svg"
          />
        </div>
        <p className="preloader__word" ref={wordRef}>
          {NAME_CHARS.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className={`preloader__letter${char === "." ? " preloader__letter--dot" : ""}`}
              ref={(el) => {
                if (el) letterRefs.current[i] = el;
              }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>,
    document.body
  );
}
