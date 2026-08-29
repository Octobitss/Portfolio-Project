export type EstimateUnit = "days" | "hours";

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  estimate: string;
  estimateUnit: EstimateUnit;
  baseMin: number;
  baseMax: number;
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
    baseMin: 350,
    baseMax: 600,
    addOnMin: 85,
    addOnMax: 170,
  },
  {
    id: "react-business",
    name: "Business Website",
    description: "Corporate or company website",
    estimate: "40–80",
    estimateUnit: "days",
    baseMin: 700,
    baseMax: 1375,
    addOnMin: 170,
    addOnMax: 350,
  },
  {
    id: "react-dashboard",
    name: "Admin Dashboard",
    description: "Analytics dashboard with charts and tables",
    estimate: "80–150",
    estimateUnit: "days",
    baseMin: 1375,
    baseMax: 2600,
    addOnMin: 250,
    addOnMax: 525,
  },
  {
    id: "react-ecommerce",
    name: "E-commerce Frontend",
    description: "Product catalog, cart, checkout",
    estimate: "100–200",
    estimateUnit: "days",
    baseMin: 1725,
    baseMax: 4300,
    addOnMin: 350,
    addOnMax: 850,
  },
  {
    id: "react-pos",
    name: "Web POS System",
    description: "Point-of-sale management system",
    estimate: "150–300",
    estimateUnit: "days",
    baseMin: 2600,
    baseMax: 8600,
    addOnMin: 525,
    addOnMax: 1200,
  },
  {
    id: "react-custom",
    name: "Custom Web Application",
    description: "SaaS or enterprise application",
    estimate: "200–500",
    estimateUnit: "days",
    baseMin: 4300,
    baseMax: 17250,
    addOnMin: 850,
    addOnMax: 2600,
  },
];

export const shopifyPricing: PricingTier[] = [
  {
    id: "shopify-landing",
    name: "Shopify Landing Page",
    description: "Simple responsive Shopify landing/product page",
    estimate: "15–25",
    estimateUnit: "hours",
    baseMin: 250,
    baseMax: 525,
    addOnMin: 35,
    addOnMax: 85,
  },
  {
    id: "shopify-theme",
    name: "Shopify Theme Customization",
    description: "Customize an existing Shopify theme's design and layout",
    estimate: "25–50",
    estimateUnit: "hours",
    baseMin: 425,
    baseMax: 1025,
    addOnMin: 50,
    addOnMax: 140,
  },
  {
    id: "shopify-setup",
    name: "Shopify Store Setup",
    description: "Full store setup incl. products, payments, shipping",
    estimate: "40–80",
    estimateUnit: "hours",
    baseMin: 700,
    baseMax: 1725,
    addOnMin: 85,
    addOnMax: 250,
  },
  {
    id: "shopify-plus",
    name: "Shopify Plus Customization",
    description: "Advanced customization for Shopify Plus merchants",
    estimate: "100–200",
    estimateUnit: "hours",
    baseMin: 1725,
    baseMax: 5150,
    addOnMin: 250,
    addOnMax: 700,
  },
  {
    id: "shopify-perf",
    name: "Shopify Performance Optimization",
    description: "Speed and performance optimization for an existing store",
    estimate: "20–40",
    estimateUnit: "hours",
    baseMin: 350,
    baseMax: 850,
    addOnMin: 35,
    addOnMax: 85,
  },
  {
    id: "shopify-migration",
    name: "Shopify Migration",
    description: "Migrate a store from another platform to Shopify",
    estimate: "40–100",
    estimateUnit: "hours",
    baseMin: 850,
    baseMax: 2600,
    addOnMin: 85,
    addOnMax: 250,
  },
];

export const customSystemTierIds = ["react-pos", "react-custom"];

export interface ExtraService {
  id: string;
  name: string;
  price: number;
}

export const extraServices: ExtraService[] = [
  { id: "extra-page", name: "Additional page", price: 50 },
  { id: "mobile-responsive", name: "Mobile responsiveness", price: 85 },
  { id: "seo", name: "SEO optimization", price: 170 },
  { id: "api-integration", name: "API integration", price: 250 },
  { id: "payment-gateway", name: "Payment gateway integration", price: 350 },
  { id: "analytics", name: "Analytics setup", price: 85 },
  { id: "bug-fixes", name: "Bug fixes", price: 15 },
  { id: "emergency-support", name: "Emergency support", price: 85 },
  { id: "hosting-setup", name: "Hosting setup", price: 85 },
  { id: "domain-setup", name: "Domain setup", price: 35 },
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
    price: 700,
    inclusions: ["Bug fixes", "Content updates"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 775,
    inclusions: ["Bug fixes", "Content updates", "Security updates"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 1025,
    inclusions: ["Priority support", "Optimization", "Backups", "Feature updates"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1200,
    inclusions: ["Dedicated support", "Monitoring", "Unlimited bug fixes"],
  },
];

export function formatUSD(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatUSDRange(min: number, max: number): string {
  return `${formatUSD(min)} – ${formatUSD(max)}`;
}
