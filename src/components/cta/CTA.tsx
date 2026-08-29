import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { MagneticButton } from "../../animations/MagneticButton";

export function CTA() {
  return (
    <section className="section cta" id="cta">
      <div className="cta__glow" aria-hidden="true" />
      <div className="container cta__inner">
        <TextReveal
          as="h2"
          className="h-display cta__headline"
          lines={["LET'S BUILD YOUR", "NEXT SYSTEM."]}
        />
        <ScrollReveal delay={0.15} className="cta__lead-wrap">
          <p className="text-lead cta__lead">
            Whether you need a Shopify storefront, internal platform, POS, ticketing
            system, or something completely custom — we'll build around your business.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25} className="btn-group cta__actions">
          <MagneticButton>
            <a href="mailto:hello@sasssystems.dev" className="btn btn--primary">
              Start a Project
              <ArrowUpRight />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#work" className="btn btn--ghost">
              View Our Work
            </a>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
