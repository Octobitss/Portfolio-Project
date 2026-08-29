/**
 * SOURCE OF TRUTH: client-provided spreadsheet ("Untitled spreadsheet.xlsx"),
 * sheets: "React Projects Pricing", "Shopify Projects Pricing", "Extra Services",
 * "Maintenance Plans". Values below are transcribed as-is — do not invent or
 * round figures when editing this file.
 *
 * ⚠ DATA FLAG (please review): on the "Shopify Projects Pricing" sheet, the
 * human-readable "Base Price (PHP)" column does not match the numeric
 * "Base Min" / "Base Max" columns for 4 of the 6 rows:
 *   - Theme Customization:      text says ₱40,000–₱60,000, numeric cols say ₱25,000–₱60,000
 *   - Store Setup:               text says ₱40,000–₱70,000, numeric cols say ₱40,000–₱100,000
 *   - Plus Customization:        text says ₱70,000–₱100,000, numeric cols say ₱100,000–₱300,000
 *   - Migration:                 text says ₱40,000–₱60,000, numeric cols say ₱50,000–₱150,000
 * This file uses the numeric Base Min/Max columns (they're the fields the sheet
 * structures for calculation), but the two disagree — confirm which is correct.
 */

export type EstimateUnit = "days" | "hours";

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  estimate: string;
  estimateUnit: EstimateUnit;
  baseMin: number;
  baseMax: number;
  /** project-specific additional-customization range (distinct from the flat Extra Services list) */
  addOnMin: number;
  addOnMax: number;
}

export const reactPricing: PricingTier[] = [
  {
    id: "react-landing",
    name: "Landing Page",
    description: "Responsive React landing page",
    estimate: "20–40",
    estimateUnit: "days",
    baseMin: 20000,
    baseMax: 35000,
    addOnMin: 5000,
    addOnMax: 10000,
  },
  {
    id: "react-business",
    name: "Business Website",
    description: "Corporate or company website",
    estimate: "40–80",
    estimateUnit: "days",
    baseMin: 40000,
    baseMax: 80000,
    addOnMin: 10000,
    addOnMax: 20000,
  },
  {
    id: "react-dashboard",
    name: "Admin Dashboard",
    description: "Analytics dashboard with charts and tables",
    estimate: "80–150",
    estimateUnit: "days",
    baseMin: 80000,
    baseMax: 150000,
    addOnMin: 15000,
    addOnMax: 30000,
  },
  {
    id: "react-ecommerce",
    name: "E-commerce Frontend",
    description: "Product catalog, cart, checkout",
    estimate: "100–200",
    estimateUnit: "days",
    baseMin: 100000,
    baseMax: 250000,
    addOnMin: 20000,
    addOnMax: 50000,
  },
  {
    id: "react-pos",
    name: "Web POS System",
    description: "Point-of-sale management system",
    estimate: "150–300",
    estimateUnit: "days",
    baseMin: 150000,
    baseMax: 500000,
    addOnMin: 30000,
    addOnMax: 70000,
  },
  {
    id: "react-custom",
    name: "Custom Web Application",
    description: "SaaS or enterprise application",
    estimate: "200–500",
    estimateUnit: "days",
    baseMin: 250000,
    baseMax: 1000000,
    addOnMin: 50000,
    addOnMax: 150000,
  },
];

export const shopifyPricing: PricingTier[] = [
  {
    id: "shopify-landing",
    name: "Shopify Landing Page",
    description: "Simple responsive Shopify landing/product page",
    estimate: "15–25",
    estimateUnit: "hours",
    baseMin: 15000,
    baseMax: 30000,
    addOnMin: 2000,
    addOnMax: 5000,
  },
  {
    id: "shopify-theme",
    name: "Shopify Theme Customization",
    description: "Customize an existing Shopify theme's design and layout",
    estimate: "25–50",
    estimateUnit: "hours",
    baseMin: 25000,
    baseMax: 60000,
    addOnMin: 3000,
    addOnMax: 8000,
  },
  {
    id: "shopify-setup",
    name: "Shopify Store Setup",
    description: "Full store setup incl. products, payments, shipping",
    estimate: "40–80",
    estimateUnit: "hours",
    baseMin: 40000,
    baseMax: 100000,
    addOnMin: 5000,
    addOnMax: 15000,
  },
  {
    id: "shopify-plus",
    name: "Shopify Plus Customization",
    description: "Advanced customization for Shopify Plus merchants",
    estimate: "100–200",
    estimateUnit: "hours",
    baseMin: 100000,
    baseMax: 300000,
    addOnMin: 15000,
    addOnMax: 40000,
  },
  {
    id: "shopify-perf",
    name: "Shopify Performance Optimization",
    description: "Speed and performance optimization for an existing store",
    estimate: "20–40",
    estimateUnit: "hours",
    baseMin: 20000,
    baseMax: 50000,
    addOnMin: 2000,
    addOnMax: 5000,
  },
  {
    id: "shopify-migration",
    name: "Shopify Migration",
    description: "Migrate a store from another platform to Shopify",
    estimate: "40–100",
    estimateUnit: "hours",
    baseMin: 50000,
    baseMax: 150000,
    addOnMin: 5000,
    addOnMax: 15000,
  },
];

/** Curated subset of reactPricing surfaced under the "Custom Systems" investment tab. */
export const customSystemTierIds = ["react-pos", "react-custom"];

export interface ExtraService {
  id: string;
  name: string;
  price: number;
}

export const extraServices: ExtraService[] = [
  { id: "extra-page", name: "Additional page", price: 3000 },
  { id: "mobile-responsive", name: "Mobile responsiveness", price: 5000 },
  { id: "seo", name: "SEO optimization", price: 10000 },
  { id: "api-integration", name: "API integration", price: 15000 },
  { id: "payment-gateway", name: "Payment gateway integration", price: 20000 },
  { id: "analytics", name: "Analytics setup", price: 5000 },
  { id: "bug-fixes", name: "Bug fixes", price: 1000 },
  { id: "emergency-support", name: "Emergency support", price: 5000 },
  { id: "hosting-setup", name: "Hosting setup", price: 5000 },
  { id: "domain-setup", name: "Domain setup", price: 2000 },
];

export interface MaintenancePlan {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
}

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 40000,
    inclusions: ["Bug fixes", "Content updates"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 45000,
    inclusions: ["Bug fixes", "Content updates", "Security updates"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 60000,
    inclusions: ["Priority support", "Optimization", "Backups", "Feature updates"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 70000,
    inclusions: ["Dedicated support", "Monitoring", "Unlimited bug fixes"],
  },
];

export function formatPHP(value: number): string {
  return `₱${Math.round(value).toLocaleString("en-PH")}`;
}

export function formatPHPRange(min: number, max: number): string {
  return `${formatPHP(min)} – ${formatPHP(max)}`;
}
