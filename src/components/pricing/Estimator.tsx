import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { buildTracks, systemTypesByTrack, additionalRequirements, type BuildTrack } from "../../data/estimator";
import { trackEvent } from "../../lib/analytics";
import { gmailComposeUrl } from "../../lib/email";

export function Estimator() {
  const [track, setTrack] = useState<BuildTrack | null>(null);
  const [systemType, setSystemType] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<string[]>([]);

  const toggleRequirement = (id: string) => {
    setRequirements((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  const trackLabel = buildTracks.find((t) => t.id === track)?.label;
  const systemLabel = track ? systemTypesByTrack[track].find((o) => o.id === systemType)?.label : undefined;
  const requirementNames = requirements
    .map((id) => additionalRequirements.find((r) => r.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  const canContact = Boolean(track && systemType);
  const emailBody = `What type of system: ${trackLabel} — ${systemLabel}\nAdditional requirements: ${
    requirementNames.length ? requirementNames.join(", ") : "None"
  }`;

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
            </button>
          ))}
        </div>
      </div>

      {canContact && (
        <div className="estimator__contact">
          <p className="text-body estimator__disclaimer">
            Send us what you're building and we'll follow up with next steps and pricing.
          </p>
          <a
            href={gmailComposeUrl("Choosen what are you building", emailBody)}
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary"
            onClick={() => trackEvent("cta_click", { location: "estimator_contact" })}
          >
            Contact Us
            <ArrowUpRight />
          </a>
        </div>
      )}
    </div>
  );
}
