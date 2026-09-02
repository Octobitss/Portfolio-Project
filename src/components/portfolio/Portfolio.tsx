import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../../data/projects";
import { shopifyStores } from "../../data/shopifyStores";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { ScrollScale } from "../../animations/ScrollScale";
import { CaseStudyVisual } from "./CaseStudyVisual";
import { ScrollTrigger, ensureGsap } from "../../lib/gsap";

type PortfolioTab = "custom" | "shopify";

const tabs: { id: PortfolioTab; label: string }[] = [
  { id: "custom", label: "Custom SaaS Systems" },
  { id: "shopify", label: "Shopify Stores We've Built" },
];

const SHOPIFY_PAGE_SIZE = 6;

export function Portfolio() {
  const [tab, setTab] = useState<PortfolioTab>("custom");
  const [shopifyPage, setShopifyPage] = useState(0);

  const shopifyPageCount = Math.ceil(shopifyStores.length / SHOPIFY_PAGE_SIZE);
  const pagedStores = shopifyStores.slice(
    shopifyPage * SHOPIFY_PAGE_SIZE,
    shopifyPage * SHOPIFY_PAGE_SIZE + SHOPIFY_PAGE_SIZE
  );

  useEffect(() => {
    ensureGsap();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [tab, shopifyPage]);

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
              <div key={shopifyPage} className="shopify-showcase">
                {pagedStores.map((store, i) => {
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

              {shopifyPageCount > 1 && (
                <div className="portfolio__pagination">
                  <button
                    className="portfolio__page-btn"
                    onClick={() => setShopifyPage((p) => Math.max(0, p - 1))}
                    disabled={shopifyPage === 0}
                    aria-label="Previous stores"
                  >
                    <ChevronLeft />
                    Previous
                  </button>
                  <span className="portfolio__page-indicator">
                    {String(shopifyPage + 1).padStart(2, "0")} / {String(shopifyPageCount).padStart(2, "0")}
                  </span>
                  <button
                    className="portfolio__page-btn"
                    onClick={() => setShopifyPage((p) => Math.min(shopifyPageCount - 1, p + 1))}
                    disabled={shopifyPage === shopifyPageCount - 1}
                    aria-label="Next stores"
                  >
                    Next
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
