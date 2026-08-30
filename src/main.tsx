import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import { initKlaviyo } from "./lib/klaviyo";

initAnalytics();
initKlaviyo();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
