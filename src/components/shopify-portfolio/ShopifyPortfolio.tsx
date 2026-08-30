import { ArrowUpRight } from "lucide-react";
import { shopifyStores } from "../../data/shopifyStores";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";

export function ShopifyPortfolio() {
  return (
    <section className="section shopify-portfolio" id="shopify-work">
      <div className="container">
        <TextReveal as="h2" className="h-1 shopify-portfolio__title" lines={["SHOPIFY STORES WE'VE BUILT"]} />
        <p className="text-lead shopify-portfolio__lead">
          Real Shopify storefronts we've designed, built, and optimized for online, in-store, and
          B2B commerce.
        </p>

        <div className="shopify-grid">
          {shopifyStores.map((store, i) => (
            <ScrollReveal key={store.id} delay={(i % 3) * 0.08} y={40} className="shopify-card-wrap">
              <a
                className="card card--interactive shopify-card"
                href={store.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="shopify-card__image">
                  <img src={store.screenshot} alt={`${store.name} homepage`} loading="lazy" />
                </div>
                <div className="shopify-card__body">
                  <h3 className="h-3 shopify-card__name">{store.name}</h3>
                  <p className="text-body">{store.description}</p>
                  <span className="link-arrow">
                    Visit site
                    <ArrowUpRight />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
