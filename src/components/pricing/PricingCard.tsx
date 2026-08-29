import { formatUSDRange, type PricingTier } from "../../data/pricing";
import { ScrollReveal } from "../../animations/ScrollReveal";

export function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <ScrollReveal delay={index * 0.06} y={40} className="pricing-card-wrap">
      <div className="card pricing-card">
        <div className="pricing-card__head">
          <h3 className="h-3 pricing-card__name">{tier.name}</h3>
          <span className="tag">{tier.estimate} {tier.estimateUnit}</span>
        </div>
        <p className="text-body">{tier.description}</p>
        <div className="pricing-card__range">{formatUSDRange(tier.baseMin, tier.baseMax)}</div>
        <div className="pricing-card__addon">
          + {formatUSDRange(tier.addOnMin, tier.addOnMax)} for additional customization
        </div>
      </div>
    </ScrollReveal>
  );
}
