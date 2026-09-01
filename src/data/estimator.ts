export type BuildTrack = "shopify" | "react" | "custom";

export interface SystemTypeOption {
  id: string;
  label: string;
}

export const buildTracks: { id: BuildTrack; label: string }[] = [
  { id: "shopify", label: "Shopify" },
  { id: "react", label: "React System" },
  { id: "custom", label: "Custom System" },
];

export const systemTypesByTrack: Record<BuildTrack, SystemTypeOption[]> = {
  shopify: [
    { id: "landing", label: "Landing Page" },
    { id: "theme", label: "Theme Customization" },
    { id: "setup", label: "Store Setup" },
    { id: "plus", label: "Shopify Plus Customization" },
    { id: "perf", label: "Performance Optimization" },
    { id: "migration", label: "Migration" },
  ],
  react: [
    { id: "dashboard", label: "Dashboard" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "business", label: "Business Website" },
    { id: "landing", label: "Landing Page" },
  ],
  custom: [
    { id: "pos", label: "POS" },
    { id: "issue-tracking", label: "Issue Tracking" },
    { id: "queueing", label: "Queueing" },
    { id: "custom", label: "Custom" },
  ],
};

export const additionalRequirements = [
  { id: "api-integration", name: "API integration" },
  { id: "payment-gateway", name: "Payment gateway integration" },
  { id: "seo", name: "SEO optimization" },
  { id: "analytics", name: "Analytics setup" },
  { id: "mobile-responsive", name: "Mobile responsiveness" },
];
