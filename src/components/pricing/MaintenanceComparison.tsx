import { useState } from "react";
import { Check } from "lucide-react";
import { maintenancePlans, formatPHP } from "../../data/pricing";

export function MaintenanceComparison() {
  const [selected, setSelected] = useState(maintenancePlans[2].id);

  return (
    <div className="maintenance-grid">
      {maintenancePlans.map((plan) => (
        <button
          key={plan.id}
          className={`maintenance-card ${selected === plan.id ? "is-selected" : "is-dimmed"}`}
          onClick={() => setSelected(plan.id)}
          onMouseEnter={() => setSelected(plan.id)}
        >
          <span className="eyebrow">{plan.name}</span>
          <span className="maintenance-card__price">
            {formatPHP(plan.price)}
            <span className="unit">/mo</span>
          </span>
          <ul className="maintenance-card__list">
            {plan.inclusions.map((item) => (
              <li key={item}>
                <Check size={14} /> {item}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
