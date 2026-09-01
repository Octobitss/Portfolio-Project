import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import { shopifyStores } from "../../data/shopifyStores";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { ScrollScale } from "../../animations/ScrollScale";
import { CaseStudyVisual } from "./CaseStudyVisual";

type PortfolioTab = "custom" | "shopify";

const tabs: { id: PortfolioTab; label: string }[] = [
  { id: "custom", label: "Custom SaaS Systems" },
  { id: "shopify", label: "Shopify Stores We've Built" },
];

export function Portfolio() {
  const [tab, setTab] = useState<PortfolioTab>("custom");

  return (
    <section className="section portfolio" id="work">
      <div className="container portfolio__inner">
        <TextReveal as="h2" className="h-1 portfolio__title" lines={["SELECTED SYSTEMS"]} />

        <div className="portfolio__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`portfolio__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div key={tab} className="portfolio__panel">
          {tab === "custom" ? (
            <div className="case-studies__list">
              {projects.map((project, i) => (
                <article
                  className={`case-study ${i % 2 === 1 ? "case-study--reverse" : ""}`}
                  key={project.id}
                >
                  <ScrollReveal x={i % 2 === 1 ? 40 : -40} y={30} className="case-study__copy">
                    <span className="index-number">{project.index}</span>
                    <h3 className="h-2 case-study__name">{project.name}</h3>
                    <span className="tag tag--accent">{project.type}</span>
                    <p className="text-body">{project.description}</p>
                    <div className="btn-group">
                      {project.technology.map((tech) => (
                        <span className="tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollScale from={0.86} to={1} className="case-study__visual">
                    <CaseStudyVisual project={project} />
                  </ScrollScale>
                </article>
              ))}
            </div>
          ) : (
            <>
              <p className="text-lead portfolio__lead">
                Real Shopify storefronts we've designed, built, and optimized for online, in-store,
                and B2B commerce.
              </p>
              <div className="shopify-showcase">
                {shopifyStores.map((store, i) => {
                  const domain = store.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
                  return (
                    <ScrollReveal
                      key={store.id}
                      delay={(i % 3) * 0.08}
                      y={40}
                      className="shopify-tile-wrap"
                    >
                      <a className="shopify-tile" href={store.url} target="_blank" rel="noreferrer">
                        <div className="browser tilt shopify-tile__browser">
                          <div className="browser__chrome">
                            <div className="browser__dots">
                              <span />
                              <span />
                              <span />
                            </div>
                            <div className="browser__url">{domain}</div>
                          </div>
                          <div className="browser__body browser__body--image">
                            <img src={store.screenshot} alt={`${store.name} homepage`} loading="lazy" />
                          </div>
                        </div>
                        <div className="shopify-tile__info">
                          <h3 className="h-3 shopify-tile__name">{store.name}</h3>
                          <p className="text-body">{store.description}</p>
                          <span className="link-arrow">
                            Visit site
                            <ArrowUpRight />
                          </span>
                        </div>
                      </a>
                    </ScrollReveal>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
