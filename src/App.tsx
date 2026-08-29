import { SmoothScrollProvider } from "./lib/SmoothScrollProvider";
import { Navigation } from "./components/navigation/Navigation";
import { Hero } from "./components/hero/Hero";
import { Services } from "./components/services/Services";
import { Technology } from "./components/technology/Technology";
import { CaseStudies } from "./components/case-studies/CaseStudies";
import { ShopifyPortfolio } from "./components/shopify-portfolio/ShopifyPortfolio";
import { ProductTours } from "./components/product-tours/ProductTours";
import { Process } from "./components/process/Process";
import { CustomSystems } from "./components/custom-systems/CustomSystems";
import { Investment } from "./components/pricing/Investment";
import { CTA } from "./components/cta/CTA";
import { Footer } from "./components/footer/Footer";

export default function App() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Technology />
        <CaseStudies />
        <ShopifyPortfolio />
        <ProductTours />
        <Process />
        <CustomSystems />
        <Investment />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
