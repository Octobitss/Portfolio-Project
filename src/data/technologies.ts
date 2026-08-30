export interface TechGroup {
  id: string;
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  { id: "frontend", label: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS"] },
  { id: "commerce", label: "Commerce", items: ["Shopify", "Shopify Liquid", "Shopify Markets", "SEO"] },
  { id: "backend", label: "Backend / Infrastructure", items: ["Node.js", "REST APIs", "AWS", "Cloud Infrastructure"] },
  { id: "tooling", label: "Development", items: ["Figma", "Git", "GitHub", "VS Code", "Shopify CLI"] },
];

export interface ArchitectureNode {
  id: string;
  label: string;
  bullets: string[];
}

export const architectureFlow: ArchitectureNode[] = [
  {
    id: "react",
    label: "React",
    bullets: ["Component-driven interface", "Client-side state & routing"],
  },
  {
    id: "api",
    label: "API",
    bullets: ["REST endpoints", "Auth & request validation"],
  },
  {
    id: "database",
    label: "Database",
    bullets: ["Structured data storage", "Query optimization", "Caching"],
  },
  {
    id: "logic",
    label: "Business Logic",
    bullets: ["Core rules & workflows", "Server-side processing"],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    bullets: ["Real-time reporting", "Role-based views"],
  },
];
