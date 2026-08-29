import { useLayoutEffect, useRef } from "react";
import { techGroups, architectureFlow } from "../../data/technologies";
import { gsap, ensureGsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { TextReveal } from "../../animations/TextReveal";
import { StaggerReveal } from "../../animations/StaggerReveal";

export function Technology() {
  const archRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useMotionPrefs();

  useLayoutEffect(() => {
    if (!archRef.current) return;
    ensureGsap();

    if (reducedMotion) {
      gsap.set(lineRef.current, { scaleX: 1 });
      gsap.set(nodeRefs.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: archRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: architectureFlow.length }, 0);

      architectureFlow.forEach((_, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 22, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, ease: "none", duration: 0.7 },
          i
        );
      });
    }, archRef);

    return () => ctx.revert();
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

        <div className="architecture" ref={archRef}>
          <span className="eyebrow architecture__eyebrow">System Architecture</span>
          <div className="architecture__flow">
            <div className="architecture__line" ref={lineRef} />
            {architectureFlow.map((node, i) => (
              <div
                className="architecture__node"
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
              >
                <span className="architecture__node-dot" />
                <span className="architecture__node-label">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
