export interface Project {
  id: string;
  index: string;
  name: string;
  type: string;
  technology: string[];
  description: string;
  visual: "pos" | "queue" | "screenshot";
  url?: string;
  screenshot?: string;
}

export const projects: Project[] = [
  {
    id: "task-master",
    index: "01",
    name: "Task Master",
    type: "React System",
    technology: ["React", "TypeScript", "REST API"],
    description: "A team task and project management platform for organizing sprints and tracking workflow progress.",
    visual: "screenshot",
    url: "https://taskmasteropnexus.xyz/",
    screenshot: "/portfolio/taskmaster.jpg",
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
    id: "queueing-system",
    index: "03",
    name: "Queueing System",
    type: "Customer Experience",
    technology: ["React", "API", "Real-time updates"],
    description: "A live queue management system spanning customer-facing displays and staff controls.",
    visual: "queue",
  },
];
