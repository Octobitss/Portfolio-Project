import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import type { Project } from "../../data/projects";

const queueNumbers = ["A001", "A002", "A003", "A004"];

export function CaseStudyVisual({ project }: { project: Project }) {
  if (project.visual === "shopify") {
    return (
      <div className="browser tilt">
        <div className="browser__chrome">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">shop.sasssystems.dev</div>
        </div>
        <div className="browser__body">
          <div className="pos-grid">
            {["Jacket", "Sneaker", "Watch", "Bag", "Sunglasses", "Belt"].map((item, i) => (
              <div className={`pos-item ${i === 2 ? "is-active" : ""}`} key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "pos") {
    return (
      <div className="browser tilt">
        <div className="browser__chrome">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">app.sasssystems.dev/pos</div>
        </div>
        <div className="browser__body">
          <div className="pos-mockup">
            <div className="pos-grid">
              {["Espresso", "Latte", "Croissant", "Bagel", "Water", "Juice"].map((item, i) => (
                <div className={`pos-item ${i === 0 ? "is-active" : ""}`} key={item}>
                  {item}
                </div>
              ))}
            </div>
            <div className="pos-cart">
              <span className="eyebrow">Order #248</span>
              <div className="pos-cart__row"><span>Espresso ×2</span><span>₱240</span></div>
              <div className="pos-cart__row"><span>Croissant ×1</span><span>₱120</span></div>
              <div className="pos-cart__total"><span>Total</span><span>₱360</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "tickets") {
    return <TicketBoard />;
  }

  return <QueuePanel />;
}

const ticketStages = ["Todo", "In Progress", "Resolved"];

function TicketBoard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => setStage((v) => (v + 1) % ticketStages.length), 1600);
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
        <div className="browser__url">app.sasssystems.dev/issues</div>
      </div>
      <div className="browser__body">
        <div className="kanban ticket-board">
          {ticketStages.map((col) => (
            <div className="kanban__col" key={col}>
              <span className="kanban__col-title">{col}</span>
              <div className="kanban__card">Refactor auth</div>
            </div>
          ))}
          <div
            className="kanban__card ticket-board__floating"
            style={{ left: `calc(${stage} * (100% / 3))` }}
          >
            #142 Checkout bug
          </div>
        </div>
      </div>
    </div>
  );
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
        <div className="browser__url">queue.sasssystems.dev</div>
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
