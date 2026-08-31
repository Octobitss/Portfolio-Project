import { ShoppingCart, TrendingUp, Package, Activity } from "lucide-react";

const shopifyItems = ["Tee", "Hoodie", "Cap", "Tote", "Mug", "Pin"];
const flowSteps = ["Business Process", "System Architecture", "Custom Interface", "Automation", "Production"];

export function ServiceVisual({ variant }: { variant: "shopify" | "react" | "custom" }) {
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
