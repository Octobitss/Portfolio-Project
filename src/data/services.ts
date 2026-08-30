export interface Service {
  id: string;
  index: string;
  name: string;
  headline: string;
  description: string;
  stack: string[];
  visual: "shopify" | "react" | "custom" | "queue";
}

export const services: Service[] = [
  {
    id: "shopify",
    index: "01",
    name: "Shopify Stores",
    headline: "Commerce, engineered.",
    description:
      "Commerce experiences engineered for conversion, performance, and scale.",
    stack: ["Shopify", "Liquid", "JavaScript", "SCSS", "Shopify Markets", "Custom Sections"],
    visual: "shopify",
  },
  {
    id: "react",
    index: "02",
    name: "React Systems",
    headline: "Software that fits the team.",
    description: "Business software designed around the way your team actually works.",
    stack: ["React", "JavaScript", "REST APIs", "Node.js", "SPRINGBOOT", "POSTGRESQL"],
    visual: "react",
  },
  {
    id: "custom",
    index: "03",
    name: "Custom Business Systems",
    headline: "Built around your workflow.",
    description: "Your workflow is unique. Your software should be too.",
    stack: ["Business Process", "System Architecture", "Custom Interface", "Automation", "Production"],
    visual: "custom",
  },
  {
    id: "queueing",
    index: "04",
    name: "Ticketing & Queueing",
    headline: "Customer flow, systemized.",
    description: "Turn customer flow into a system.",
    stack: ["Real-time Sync", "Queue Logic", "Staff Interfaces", "Digital Displays"],
    visual: "queue",
  },
];
