// ponytail: Centralized API URL resolution with Render cloud fallback.
// Upgrade path: read from window.__NUMM_CONFIG__ for runtime-injected envs.
export const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" &&
  window.location.hostname.includes("onrender.com")
    ? "https://numm-backend.onrender.com"
    : "")
).replace(/\/$/, "");
