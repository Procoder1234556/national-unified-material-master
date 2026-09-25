// ponytail: API base + Bearer JWT session for MeghRaj demo personas.
// Upgrade path: refresh-token rotation + NIC SSO redirect.

export const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8001"
    : typeof window !== "undefined" &&
        window.location.hostname.includes("onrender.com")
      ? "https://numm-backend.onrender.com"
      : "")
).replace(/\/$/, "");

export type AuthRole =
  "STEWARD" | "PROCUREMENT_OFFICER" | "PLANT_ENGINEER" | "AUDITOR" | "ADMIN";

export interface AuthSession {
  role: AuthRole;
  email: string;
  fullName: string;
  organizationCode: string;
  token: string;
}

type PersonaRow = {
  role: string;
  email: string;
  full_name: string;
  organization_code: string;
  token: string;
  description: string;
};

let accessToken: string | null = null;
let session: AuthSession | null = null;
let personaCache: PersonaRow[] | null = null;

const ROLE_ALIAS: Record<string, string> = {
  STEWARD: "STEWARD",
  PROCUREMENT_OFFICER: "PROCUREMENT_OFFICER",
  PLANT_ENGINEER: "PLANT_ENGINEER",
  AUDITOR: "AUDITOR",
  ADMIN: "ADMIN",
};

export function getAuthToken(): string | null {
  return accessToken;
}

export function getAuthSession(): AuthSession | null {
  return session;
}

export function setAuthSession(next: AuthSession | null): void {
  session = next;
  accessToken = next?.token ?? null;
}

export async function loadDemoPersonas(): Promise<PersonaRow[]> {
  if (personaCache) return personaCache;
  const res = await fetch(`${API_BASE}/api/v1/auth/demo-tokens`);
  if (!res.ok) {
    throw new Error(`demo-tokens failed: ${res.status}`);
  }
  const data = (await res.json()) as { personas: PersonaRow[] };
  personaCache = data.personas || [];
  return personaCache;
}

export async function authenticateAsRole(role: AuthRole): Promise<AuthSession> {
  const personas = await loadDemoPersonas();
  const want = ROLE_ALIAS[role] || role;
  const match =
    personas.find((p) => p.role === want) ||
    (want === "PLANT_ENGINEER"
      ? personas.find((p) => p.role === "PROCUREMENT_OFFICER")
      : undefined) ||
    personas.find((p) => p.role === "STEWARD") ||
    personas[0];

  if (!match) {
    throw new Error("No MeghRaj demo personas available");
  }

  const next: AuthSession = {
    role: (match.role as AuthRole) || role,
    email: match.email,
    fullName: match.full_name,
    organizationCode: match.organization_code,
    token: match.token,
  };
  setAuthSession(next);
  return next;
}

export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  const isForm =
    typeof FormData !== "undefined" && init.body instanceof FormData;
  if (init.body && !isForm && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  return fetch(url, { ...init, headers });
}
