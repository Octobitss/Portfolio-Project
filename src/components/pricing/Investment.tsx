import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { reactPricing, shopifyPricing, customSystemTierIds } from "../../data/pricing";
import { TextReveal } from "../../animations/TextReveal";
import { PricingCard } from "./PricingCard";
import { MaintenanceComparison } from "./MaintenanceComparison";
import { Estimator } from "./Estimator";
import { trackEvent } from "../../lib/analytics";

type Tab = "shopify" | "react" | "custom" | "maintenance";

const tabs: { id: Tab; label: string }[] = [
  { id: "shopify", label: "Shopify" },
  { id: "react", label: "React" },
  { id: "custom", label: "Custom Systems" },
  { id: "maintenance", label: "Maintenance" },
];

const reactStandardTiers = reactPricing.filter((t) => !customSystemTierIds.includes(t.id));
const customTiers = reactPricing.filter((t) => customSystemTierIds.includes(t.id));

export function Investment() {
  const [tab, setTab] = useState<Tab>("shopify");

  const tiers = tab === "shopify" ? shopifyPricing : tab === "react" ? reactStandardTiers : tab === "custom" ? customTiers : [];

  return (
    <section className="section investment" id="investment">
      <div className="container">
        <div className="investment__header">
          <TextReveal as="h2" className="h-1" lines={["INVESTMENT"]} />
          <p className="text-lead investment__lead">
            Every system is different. Our pricing provides a starting point based on the
            complexity, scope, and requirements of your project.
          </p>
        </div>

        <div className="investment__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`investment__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div key={tab} className="investment__panel">
          {tab === "maintenance" ? (
            <MaintenanceComparison />
          ) : (
            <div className="investment__grid">
              {tiers.map((tier, i) => (
                <PricingCard tier={tier} index={i} key={tier.id} />
              ))}
            </div>
          )}
        </div>

        <div className="investment__estimator">
          <h3 className="h-2 investment__estimator-title">Build Your Estimate</h3>
          <Estimator />
        </div>

        <div className="investment__custom">
          <div>
            <h3 className="h-3 investment__custom-title">None of these numbers fit?</h3>
            <p className="text-body">
              Every business is different — if the estimate doesn't match your budget or your
              project doesn't fit a standard tier, tell us what you're building and we'll price
              it directly.
            </p>
          </div>
          <a
            href="mailto:king.op.nexus@gmail.com?subject=Custom%20Project%20Inquiry"
            className="btn btn--ghost"
            onClick={() => trackEvent("cta_click", { location: "investment_custom_quote" })}
          >
            Request a Custom Quote
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
