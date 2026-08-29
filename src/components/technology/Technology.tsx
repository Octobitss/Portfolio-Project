import { useLayoutEffect, useRef } from "react";
import { techGroups, architectureFlow } from "../../data/technologies";
import { gsap, ScrollTrigger, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { TextReveal } from "../../animations/TextReveal";
import { StaggerReveal } from "../../animations/StaggerReveal";

const START_SKEW = -18;
const END_SKEW = -4;

export function Technology() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    const roadmap = roadmapRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!roadmap || !svg || !path) return;
    ensureGsap();

    let ctx: gsap.Context | undefined;

    const build = () => {
      ctx?.revert();

      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      if (!cards.length) return;

      const width = roadmap.clientWidth;
      const height = roadmap.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const points = cards.map((card, i) => {
        const isLeft = i % 2 === 0;
        return {
          x: isLeft ? card.offsetLeft + card.offsetWidth : card.offsetLeft,
          y: card.offsetTop + card.offsetHeight / 2,
        };
      });
      const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      path.setAttribute("d", d);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      if (reducedMotion) {
        path.style.strokeDashoffset = "0";
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: roadmap,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });

        tl.to(path, { strokeDashoffset: 0, ease: "none", duration: cards.length }, 0);

        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 26, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, ease: "none", duration: 0.7 },
            i
          );
        });
      }, roadmap);
    };

    build();

    const onResize = () => {
      build();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="section technology" id="technology">
      <div className="container">
        <div className="technology__header">
          <TextReveal as="h2" className="h-1" lines={["BUILT WITH THE", "TOOLS THAT SCALE."]} />
        </div>

        <StaggerReveal className="technology__groups" y={30}>
          {techGroups.map((group) => (
            <div className="technology__group" key={group.id}>
              <span className="eyebrow">{group.label}</span>
              <div className="technology__tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </StaggerReveal>

        <div className="tech-roadmap-wrap">
          <span className="eyebrow tech-roadmap__eyebrow">System Architecture</span>

          <div className="tech-roadmap" ref={roadmapRef}>
            <svg className="tech-roadmap__svg" ref={svgRef} aria-hidden="true">
              <defs>
                <linearGradient id="tech-roadmap-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tech-roadmap-line)" stopOpacity="0" />
                  <stop offset="15%" stopColor="var(--tech-roadmap-line)" stopOpacity="1" />
                  <stop offset="85%" stopColor="var(--tech-roadmap-line)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--tech-roadmap-line)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="tech-roadmap__path"
                ref={pathRef}
                fill="none"
                stroke="url(#tech-roadmap-gradient)"
              />
            </svg>

            {architectureFlow.map((node, i) => {
              const t = architectureFlow.length > 1 ? i / (architectureFlow.length - 1) : 0;
              const skew = START_SKEW + (END_SKEW - START_SKEW) * t;
              return (
                <div
                  className={`tech-roadmap__card ${i % 2 === 0 ? "tech-roadmap__card--left" : "tech-roadmap__card--right"}`}
                  key={node.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{ transform: `skewY(${skew}deg) scale(1.0001)` }}
                >
                  <span className="index-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tech-roadmap__card-title">{node.label}</span>
                  <ul className="tech-roadmap__card-list">
                    {node.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
