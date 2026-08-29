export interface Metric {
  id: string;
  value: number | null;
  prefix: string;
  suffix: string;
  label: string;
  placeholder: string;
}

/**
 * Placeholder metrics — no client figures have been verified yet.
 * When real results are available, set `value` (number) and remove `placeholder`.
 */
export const metrics: Metric[] = [
  { id: "conversion", value: null, prefix: "+", suffix: "%", label: "Conversion improvement", placeholder: "Add verified metric" },
  { id: "manual-processing", value: null, prefix: "−", suffix: "%", label: "Manual processing", placeholder: "Add verified metric" },
  { id: "efficiency", value: null, prefix: "+", suffix: "%", label: "Operational efficiency", placeholder: "Add verified metric" },
  { id: "systems-shipped", value: null, prefix: "", suffix: "+", label: "Systems shipped", placeholder: "Add verified metric" },
];
