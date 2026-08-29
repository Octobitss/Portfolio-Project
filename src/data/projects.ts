export interface Project {
  id: string;
  index: string;
  name: string;
  type: string;
  technology: string[];
  description: string;
  visual: "shopify" | "pos" | "tickets" | "queue";
}

export const projects: Project[] = [
  {
    id: "commerce-platform",
    index: "01",
    name: "Shopify Commerce Platform",
    type: "Ecommerce",
    technology: ["Shopify", "Liquid", "JavaScript", "SCSS"],
    description: "A custom Shopify storefront built for conversion, speed, and merchandising control.",
    visual: "shopify",
  },
  {
    id: "pos-system",
    index: "02",
    name: "POS System",
    type: "Business Operations",
    technology: ["React", "TypeScript", "API"],
    description: "A point-of-sale system unifying products, cart, orders, payments, and inventory.",
    visual: "pos",
  },
  {
    id: "issue-tracker",
    index: "03",
    name: "Issue Tracking System",
    type: "Internal Operations",
    technology: ["React", "TypeScript", "REST API"],
    description: "A ticketing workflow built around priority, status, assignee, and activity history.",
    visual: "tickets",
  },
  {
    id: "queueing-system",
    index: "04",
    name: "Queueing System",
    type: "Customer Experience",
    technology: ["React", "API", "Real-time updates"],
    description: "A live queue management system spanning customer-facing displays and staff controls.",
    visual: "queue",
  },
];
