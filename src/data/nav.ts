export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Investment", href: "#investment" },
  { label: "Contact", href: "#cta" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Shopify", href: "#services" },
  { label: "SaaS", href: "#services" },
  { label: "Custom Systems", href: "#services" },
];
