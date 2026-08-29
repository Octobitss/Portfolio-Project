import { metrics } from "../../data/results";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { Counter } from "../../animations/Counter";

export function Results() {
  return (
    <section className="section results" id="results">
      <div className="grid-overlay" />
      <div className="container results__inner">
        <div className="results__intro">
          <TextReveal as="h2" className="h-2" lines={["WE DON'T JUST", "SHIP SOFTWARE."]} />
          <TextReveal
            as="p"
            className="text-lead results__statement"
            lines={["We build systems that move", "the business forward."]}
            delay={0.15}
          />
        </div>

        <div className="results__grid">
          {metrics.map((metric, i) => (
            <ScrollReveal
              key={metric.id}
              y={i % 2 === 0 ? 60 : 90}
              x={i % 2 === 0 ? -20 : 20}
              delay={i * 0.08}
              className="results__card-wrap"
            >
              <div className="metric-card metric-card--placeholder">
                <span className="metric-card__value">
                  {metric.value !== null ? (
                    <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                  ) : (
                    <span className="mono">XX{metric.suffix}</span>
                  )}
                </span>
                <span className="metric-card__label">{metric.label}</span>
                {metric.value === null && <span className="tag">{metric.placeholder}</span>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
