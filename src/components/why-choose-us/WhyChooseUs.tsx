import { TextReveal } from "../../animations/TextReveal";
import { StaggerReveal } from "../../animations/StaggerReveal";

const pillars = [
  {
    index: "01",
    title: "End-to-End Ownership",
    description:
      "We design, build, and ship the whole system ourselves — no outsourced pieces, no hand-offs.",
  },
  {
    index: "02",
    title: "Direct Access, No Middlemen",
    description:
      "You work directly with the engineers building your system, not an account manager relaying messages.",
  },
  {
    index: "03",
    title: "Built To Scale",
    description: "Every system is architected for growth, not just to demo well on day one.",
  },
  {
    index: "04",
    title: "Fast, Focused Delivery",
    description: "A small, senior team means faster iteration and fewer meetings.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section why-choose-us" id="why-us">
      <div className="container why-choose-us__inner">
        <div className="why-choose-us__intro">
          <span className="eyebrow">Why OPNexus</span>
          <TextReveal as="h2" className="h-1 why-choose-us__title" lines={["WHY CHOOSE", "OPNEXUS."]} />
          <p className="text-lead why-choose-us__lead">
            No agencies, no relay chains — just the people who build your system, building it
            right.
          </p>
        </div>

        <StaggerReveal className="why-choose-us__list" y={24}>
          {pillars.map((pillar) => (
            <div className="why-choose-us__row" key={pillar.index}>
              <span className="why-choose-us__row-index">{pillar.index}</span>
              <div className="why-choose-us__row-body">
                <h3 className="h-3 why-choose-us__row-title">{pillar.title}</h3>
                <p className="text-body">{pillar.description}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
