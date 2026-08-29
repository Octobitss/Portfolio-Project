import { Check, MousePointer2 } from "lucide-react";

const cursorPositions: Record<string, { top: string; left: string }[]> = {
  pos: [
    { top: "38%", left: "30%" },
    { top: "70%", left: "78%" },
    { top: "82%", left: "78%" },
  ],
  issues: [
    { top: "30%", left: "18%" },
    { top: "30%", left: "18%" },
    { top: "30%", left: "50%" },
    { top: "30%", left: "82%" },
  ],
  queue: [
    { top: "60%", left: "50%" },
    { top: "45%", left: "50%" },
    { top: "20%", left: "50%" },
    { top: "80%", left: "70%" },
  ],
  shopify: [
    { top: "40%", left: "50%" },
    { top: "20%", left: "85%" },
    { top: "80%", left: "78%" },
  ],
};

export function TourVisual({ tourId, stepIndex }: { tourId: string; stepIndex: number }) {
  const cursor = cursorPositions[tourId]?.[stepIndex];

  return (
    <div className="tour-visual">
      <div key={`${tourId}-${stepIndex}`} className="tour-visual__frame">
        {tourId === "pos" && <PosStep step={stepIndex} />}
        {tourId === "issues" && <IssuesStep step={stepIndex} />}
        {tourId === "queue" && <QueueStep step={stepIndex} />}
        {tourId === "shopify" && <ShopifyStep step={stepIndex} />}
      </div>
      {cursor && (
        <div className="tour-cursor" style={{ top: cursor.top, left: cursor.left }}>
          <MousePointer2 size={18} />
        </div>
      )}
    </div>
  );
}

function PosStep({ step }: { step: number }) {
  return (
    <div className="pos-mockup">
      <div className="pos-grid">
        {["Espresso", "Latte", "Croissant", "Bagel", "Water", "Juice"].map((item, i) => (
          <div className={`pos-item ${i === 0 && step >= 0 ? "is-active" : ""}`} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="pos-cart">
        <span className="eyebrow">Order #319</span>
        {step >= 1 ? (
          <div className="pos-cart__row"><span>Espresso ×1</span><span>$4</span></div>
        ) : (
          <span className="text-body">Cart is empty</span>
        )}
        {step >= 2 && (
          <>
            <div className="pos-cart__total"><span>Total</span><span>$4</span></div>
            <span className="tag tag--accent"><Check size={12} /> Payment captured</span>
          </>
        )}
      </div>
    </div>
  );
}

function IssuesStep({ step }: { step: number }) {
  const columns = ["Todo", "In Progress", "Resolved"];
  const cardColumn = step <= 1 ? 0 : step === 2 ? 1 : 2;
  return (
    <div className="kanban">
      {columns.map((col, i) => (
        <div className="kanban__col" key={col}>
          <span className="kanban__col-title">{col}</span>
          {cardColumn === i && (
            <div className="kanban__card">
              #241 Checkout redirect
              {step >= 1 && <div className="tag" style={{ marginTop: 6 }}>Assigned: J. Cruz</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QueueStep({ step }: { step: number }) {
  const labels = ["Waiting", "Waiting", "Called", "Counter Assigned"];
  return (
    <div className="queue-display">
      <span className="queue-display__label">{labels[step]}</span>
      <span className="queue-display__number">A00{Math.min(step + 1, 4)}</span>
      <div className="queue-display__meta">
        <span>{step >= 3 ? "Counter 02" : "Position " + (4 - step)}</span>
      </div>
    </div>
  );
}

function ShopifyStep({ step }: { step: number }) {
  return (
    <div className="pos-mockup">
      <div className="pos-grid">
        {["Jacket", "Sneaker", "Watch", "Bag"].map((item, i) => (
          <div className={`pos-item ${i === 0 ? "is-active" : ""}`} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="pos-cart">
        <span className="eyebrow">{step === 0 ? "Product" : step === 1 ? "Cart" : "Checkout"}</span>
        {step >= 1 && <div className="pos-cart__row"><span>Jacket ×1</span><span>$120</span></div>}
        {step >= 2 && (
          <>
            <div className="pos-cart__total"><span>Total</span><span>$120</span></div>
            <span className="tag tag--accent"><Check size={12} /> Order confirmed</span>
          </>
        )}
      </div>
    </div>
  );
}
