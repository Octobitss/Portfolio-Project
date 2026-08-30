export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Process", href: "#process" },
  { label: "Investment", href: "#investment" },
  { label: "Contact", href: "#cta" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Shopify", href: "#services" },
  { label: "React", href: "#services" },
  { label: "Custom Systems", href: "#services" },
  { label: "Ticketing & Queueing", href: "#services" },
];
