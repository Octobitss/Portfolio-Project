export interface Project {
  id: string;
  index: string;
  name: string;
  type: string;
  technology: string[];
  description: string;
  visual: "queue" | "screenshot";
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
    screenshot: "/portfolio/taskmaster-dashboard.jpg",
  },
  {
    id: "pos-system",
    index: "02",
    name: "POS System",
    type: "Business Operations",
    technology: ["React", "Node.js", "Express", "MongoDB"],
    description: "A multi-branch point-of-sale system covering inventory, staff, VIP customers, and real-time sales performance.",
    visual: "screenshot",
    screenshot: "/portfolio/pos-system.jpg",
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
