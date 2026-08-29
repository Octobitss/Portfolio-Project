import { useState } from "react";
import {
  buildTracks,
  systemTypesByTrack,
  additionalRequirements,
  calculateEstimate,
  type BuildTrack,
} from "../../data/estimator";
import { formatPHP } from "../../data/pricing";
import { AnimatedRange } from "./AnimatedRange";

export function Estimator() {
  const [track, setTrack] = useState<BuildTrack | null>(null);
  const [systemType, setSystemType] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<string[]>([]);

  const estimate = calculateEstimate(track, systemType, requirements);

  const toggleRequirement = (id: string) => {
    setRequirements((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  return (
    <div className="estimator">
      <div className="estimator__step">
        <span className="eyebrow">Step 01 — What are you building?</span>
        <div className="estimator__options">
          {buildTracks.map((t) => (
            <button
              key={t.id}
              className={`estimator__option ${track === t.id ? "is-active" : ""}`}
              onClick={() => {
                setTrack(t.id);
                setSystemType(null);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`estimator__step ${!track ? "is-disabled" : ""}`}>
        <span className="eyebrow">Step 02 — What type of system?</span>
        <div className="estimator__options">
          {(track ? systemTypesByTrack[track] : []).map((option) => (
            <button
              key={option.id}
              className={`estimator__option ${systemType === option.id ? "is-active" : ""}`}
              onClick={() => setSystemType(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="estimator__step">
        <span className="eyebrow">Step 03 — Additional requirements?</span>
        <div className="estimator__options">
          {additionalRequirements.map((req) => (
            <button
              key={req.id}
              className={`estimator__option ${requirements.includes(req.id) ? "is-active" : ""}`}
              onClick={() => toggleRequirement(req.id)}
            >
              {req.name}
              <span className="estimator__option-price">+{formatPHP(req.price)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="estimator__result">
        <span className="eyebrow">Estimated Project Range</span>
        {estimate ? (
          <AnimatedRange min={estimate.min} max={estimate.max} className="estimator__total" />
        ) : (
          <span className="estimator__total estimator__total--empty">Select a build type and system to continue</span>
        )}
        <p className="text-body estimator__disclaimer">
          This is an estimate, not a final quotation. Final pricing depends on project scope,
          requirements, integrations, and technical complexity.
        </p>
      </div>
    </div>
  );
}
