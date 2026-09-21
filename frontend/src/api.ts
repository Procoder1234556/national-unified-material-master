// ponytail: Centralized API URL resolution for dev proxy and cloud deployments.
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/$/,
  ""
);
