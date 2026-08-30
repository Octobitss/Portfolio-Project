interface KlaviyoApi {
  identify: (attributes: Record<string, unknown>) => void;
  track: (event: string, properties?: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    klaviyo: KlaviyoApi;
    _klOnsite: unknown[];
  }
}

let initialized = false;

export function initKlaviyo(): void {
  const companyId = import.meta.env.VITE_KLAVIYO_COMPANY_ID;
  if (!companyId || initialized) return;
  initialized = true;

  window._klOnsite = window._klOnsite || [];

  const script = document.createElement("script");
  script.async = true;
  script.type = "text/javascript";
  script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${companyId}`;
  document.head.appendChild(script);
}

export function identifyKlaviyo(attributes: Record<string, unknown>): void {
  if (!initialized || typeof window.klaviyo?.identify !== "function") return;
  window.klaviyo.identify(attributes);
}

export function trackKlaviyo(event: string, properties?: Record<string, unknown>): void {
  if (!initialized || typeof window.klaviyo?.track !== "function") return;
  window.klaviyo.track(event, properties);
}
