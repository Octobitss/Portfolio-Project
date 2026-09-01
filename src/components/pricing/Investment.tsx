import { TextReveal } from "../../animations/TextReveal";
import { Estimator } from "./Estimator";

export function Investment() {
  return (
    <section className="section investment" id="investment">
      <div className="container investment__inner">
        <div className="investment__header">
          <TextReveal as="h2" className="h-1" lines={["INVESTMENT"]} />
          <p className="text-lead investment__lead">
            Every system is different — tell us what you're building and we'll follow up with next
            steps.
          </p>
        </div>

        <div className="investment__estimator">
          <h3 className="h-2 investment__estimator-title">Choose what you need to be built</h3>
          <Estimator />
        </div>
      </div>
    </section>
  );
}
