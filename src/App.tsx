import { SmoothScrollProvider } from "./lib/SmoothScrollProvider";
import { Preloader } from "./components/preloader/Preloader";
import { Navigation } from "./components/navigation/Navigation";
import { Hero } from "./components/hero/Hero";
import { Services } from "./components/services/Services";
import { Portfolio } from "./components/portfolio/Portfolio";
import { CustomSystems } from "./components/custom-systems/CustomSystems";
import { WhyChooseUs } from "./components/why-choose-us/WhyChooseUs";
import { Investment } from "./components/pricing/Investment";
import { CTA } from "./components/cta/CTA";
import { Footer } from "./components/footer/Footer";
import { WebGLBackground } from "./components/common/WebGLBackground";

export default function App() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <Navigation />
      <WebGLBackground className="connected-bg" />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <CustomSystems />
        <WhyChooseUs />
        <Investment />
        <CTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
