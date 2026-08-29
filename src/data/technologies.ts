export interface TechGroup {
  id: string;
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  { id: "frontend", label: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "SCSS"] },
  { id: "commerce", label: "Commerce", items: ["Shopify", "Shopify Liquid", "Shopify Markets"] },
  { id: "backend", label: "Backend / Infrastructure", items: ["Node.js", "REST APIs", "AWS", "Cloud Infrastructure"] },
  { id: "tooling", label: "Development", items: ["Git", "GitHub", "VS Code", "Shopify CLI"] },
];

export interface ArchitectureNode {
  id: string;
  label: string;
}

export const architectureFlow: ArchitectureNode[] = [
  { id: "react", label: "React" },
  { id: "api", label: "API" },
  { id: "database", label: "Database" },
  { id: "logic", label: "Business Logic" },
  { id: "dashboard", label: "Dashboard" },
];
