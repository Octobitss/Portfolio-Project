import { reactPricing, shopifyPricing, extraServices, type PricingTier } from "./pricing";

export type BuildTrack = "shopify" | "react" | "custom";

export interface SystemTypeOption {
  id: string;
  label: string;
  tierId: string;
}

const findTier = (list: PricingTier[], id: string) => {
  const tier = list.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown pricing tier id: ${id}`);
  return tier;
};

export const buildTracks: { id: BuildTrack; label: string }[] = [
  { id: "shopify", label: "Shopify" },
  { id: "react", label: "React System" },
  { id: "custom", label: "Custom System" },
];

export const systemTypesByTrack: Record<BuildTrack, SystemTypeOption[]> = {
  shopify: shopifyPricing.map((t) => ({ id: t.id, label: t.name.replace(/^Shopify /, ""), tierId: t.id })),
  react: [
    { id: "dashboard", label: "Dashboard", tierId: "react-dashboard" },
    { id: "ecommerce", label: "E-commerce", tierId: "react-ecommerce" },
    { id: "business", label: "Business Website", tierId: "react-business" },
    { id: "landing", label: "Landing Page", tierId: "react-landing" },
  ],
  custom: [
    { id: "pos", label: "POS", tierId: "react-pos" },
    { id: "issue-tracking", label: "Issue Tracking", tierId: "react-dashboard" },
    { id: "queueing", label: "Queueing", tierId: "react-custom" },
    { id: "custom", label: "Custom", tierId: "react-custom" },
  ],
};

export const additionalRequirements = [
  extraServices.find((s) => s.id === "api-integration")!,
  extraServices.find((s) => s.id === "payment-gateway")!,
  extraServices.find((s) => s.id === "seo")!,
  extraServices.find((s) => s.id === "analytics")!,
  extraServices.find((s) => s.id === "mobile-responsive")!,
];

export function getTierForSystemType(track: BuildTrack, systemTypeId: string): PricingTier {
  const option = systemTypesByTrack[track].find((o) => o.id === systemTypeId);
  if (!option) throw new Error(`Unknown system type ${systemTypeId} for track ${track}`);
  const source = track === "shopify" ? shopifyPricing : reactPricing;
  return findTier(source, option.tierId);
}

export function calculateEstimate(
  track: BuildTrack | null,
  systemTypeId: string | null,
  requirementIds: string[]
): { min: number; max: number } | null {
  if (!track || !systemTypeId) return null;
  const tier = getTierForSystemType(track, systemTypeId);
  const extrasTotal = requirementIds.reduce((sum, id) => {
    const service = extraServices.find((s) => s.id === id);
    return sum + (service?.price ?? 0);
  }, 0);
  return { min: tier.baseMin + extrasTotal, max: tier.baseMax + extrasTotal };
}
