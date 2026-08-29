import { ShoppingCart, GitBranch, Users, TrendingUp, Package, Activity } from "lucide-react";

const shopifyItems = ["Tee", "Hoodie", "Cap", "Tote", "Mug", "Pin"];
const flowSteps = ["Business Process", "System Architecture", "Custom Interface", "Automation", "Production"];

export function ServiceVisual({ variant }: { variant: "shopify" | "react" | "custom" | "queue" }) {
  if (variant === "shopify") {
    return (
      <div className="browser tilt">
        <div className="browser__chrome">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">shop.opnexus.dev</div>
        </div>
        <div className="browser__body">
          <div className="pos-grid">
            {shopifyItems.map((item, i) => (
              <div className={`pos-item ${i === 1 ? "is-active" : ""}`} key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="btn btn--primary" style={{ marginTop: 16, width: "fit-content" }}>
            <ShoppingCart size={14} /> Add to Cart
          </div>
        </div>
      </div>
    );
  }

  if (variant === "react") {
    return (
      <div className="browser tilt">
        <div className="browser__chrome">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">app.opnexus.dev/admin</div>
        </div>
        <div className="browser__body">
          <div className="results__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 20 }}>
            {[
              { label: "Revenue", Icon: TrendingUp },
              { label: "Orders", Icon: Package },
              { label: "Uptime", Icon: Activity },
            ].map(({ label, Icon }) => (
              <div className="metric-card" key={label} style={{ padding: 16 }}>
                <span className="metric-card__value" style={{ fontSize: "1.5rem" }}>
                  <Icon size={16} />
                </span>
                <span className="metric-card__label">{label}</span>
              </div>
            ))}
          </div>
          <div className="kanban">
            {["Todo", "In Progress", "Resolved"].map((col) => (
              <div className="kanban__col" key={col}>
                <span className="kanban__col-title">{col}</span>
                <div className="kanban__card">Onboarding flow</div>
                <div className="kanban__card">Sync job</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "custom") {
    return (
      <div className="flow-diagram">
        {flowSteps.map((step, i) => (
          <div className="flow-diagram__step" key={step}>
            <span className="flow-diagram__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="flow-diagram__label">{step}</span>
            {i < flowSteps.length - 1 && <span className="flow-diagram__arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="browser tilt">
      <div className="browser__chrome">
        <div className="browser__dots"><span /><span /><span /></div>
        <div className="browser__url">queue.opnexus.dev</div>
      </div>
      <div className="browser__body">
        <div className="queue-display">
          <span className="queue-display__label">Now Serving</span>
          <span className="queue-display__number">A002</span>
          <div className="queue-display__meta">
            <span><Users size={14} style={{ display: "inline", marginRight: 4 }} />Counter 03</span>
            <span><GitBranch size={14} style={{ display: "inline", marginRight: 4 }} />4 Waiting</span>
          </div>
          <div className="queue-list">
            {["A001", "A002", "A003", "A004"].map((n) => (
              <span className={`queue-chip ${n === "A002" ? "is-current" : ""}`} key={n}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
