export interface TourStep {
  label: string;
  description: string;
}

export interface ProductTour {
  id: string;
  label: string;
  url: string;
  steps: TourStep[];
}

export const productTours: ProductTour[] = [
  {
    id: "pos",
    label: "POS",
    url: "app.opnexus.dev/pos",
    steps: [
      { label: "Click Product", description: "Staff selects an item from the live catalog grid." },
      { label: "Add to Cart", description: "Item and quantity are added to the running order." },
      { label: "Checkout", description: "Payment is captured and inventory updates instantly." },
    ],
  },
  {
    id: "issues",
    label: "Issue Tracker",
    url: "app.opnexus.dev/issues",
    steps: [
      { label: "Create Issue", description: "A new ticket is logged with priority and context." },
      { label: "Assign", description: "The ticket is routed to the right team member." },
      { label: "Update Status", description: "Progress moves the card across the board." },
      { label: "Resolve", description: "The issue is closed and the activity log is updated." },
    ],
  },
  {
    id: "queue",
    label: "Queueing",
    url: "app.opnexus.dev/queue",
    steps: [
      { label: "Take a Number", description: "A customer joins the queue from a kiosk or link." },
      { label: "Join Queue", description: "Position and estimated wait update in real time." },
      { label: "Called", description: "The display and counter both update the moment they're called." },
      { label: "Counter Assigned", description: "The customer is routed to an open counter." },
    ],
  },
  {
    id: "shopify",
    label: "Shopify",
    url: "shop.opnexus.dev",
    steps: [
      { label: "Product", description: "A merchandised product page with fast image loading." },
      { label: "Cart", description: "Cart drawer updates without a full page reload." },
      { label: "Checkout", description: "A streamlined, high-conversion checkout flow." },
    ],
  },
];
