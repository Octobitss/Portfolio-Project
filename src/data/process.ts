export interface ProcessStep {
  index: string;
  name: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { index: "01", name: "Discover", description: "Understand the business and workflow." },
  { index: "02", name: "Architect", description: "Design the technical structure." },
  { index: "03", name: "Build", description: "Develop the system." },
  { index: "04", name: "Test", description: "Validate functionality and usability." },
  { index: "05", name: "Deploy", description: "Launch the system." },
  { index: "06", name: "Evolve", description: "Maintain and improve." },
];
