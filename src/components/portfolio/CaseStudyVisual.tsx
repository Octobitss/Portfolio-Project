import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import type { Project } from "../../data/projects";

const queueNumbers = ["A001", "A002", "A003", "A004"];

export function CaseStudyVisual({ project }: { project: Project }) {
  if (project.visual === "screenshot" && project.screenshot) {
    const domain = project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const body = (
      <>
        <div className="browser__chrome">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">{domain ?? "currently offline"}</div>
        </div>
        <div className="browser__body browser__body--image">
          <img src={project.screenshot} alt={`${project.name} homepage`} loading="lazy" />
        </div>
      </>
    );

    if (!project.url) {
      return <div className="browser tilt">{body}</div>;
    }

    return (
      <a className="browser tilt browser--link" href={project.url} target="_blank" rel="noreferrer">
        {body}
      </a>
    );
  }

  return <QueuePanel />;
}

function QueuePanel() {
  const [index, setIndex] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => setIndex((v) => (v + 1) % queueNumbers.length), 1800);
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [reducedMotion]);

  return (
    <div className="browser tilt" ref={wrapRef}>
      <div className="browser__chrome">
        <div className="browser__dots"><span /><span /><span /></div>
        <div className="browser__url">queue.opnexus.dev</div>
      </div>
      <div className="browser__body">
        <div className="queue-display">
          <span className="queue-display__label">Now Serving</span>
          <span className="queue-display__number">{queueNumbers[index]}</span>
          <div className="queue-display__meta">
            <span>Counter 0{(index % 3) + 1}</span>
            <span>{queueNumbers.length - index - 1} Waiting</span>
          </div>
          <div className="queue-list">
            {queueNumbers.map((n, i) => (
              <span className={`queue-chip ${i === index ? "is-current" : ""}`} key={n}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
