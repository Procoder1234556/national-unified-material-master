// ponytail: API base + Bearer JWT session for MeghRaj demo personas.
// Upgrade path: refresh-token rotation + NIC SSO redirect.

// VITE_API_BASE_URL is baked in at build time by Vite (set in render.yaml / .env).
// Runtime fallback: detect onrender.com → point at backend service.
function resolveApiBase(): string {
  if (typeof window !== "undefined") {
    const override =
      (window as any).__NUMM_API_BASE__ ||
      localStorage.getItem("NUMM_API_BASE");
    if (override) return override;
  }
  if (import.meta.env.VITE_API_BASE_URL)
    return import.meta.env.VITE_API_BASE_URL;
  if (typeof window === "undefined") return "http://127.0.0.1:8000";
  const h = window.location.hostname;
  if (h === "localhost" || h === "127.0.0.1") {
    // Local dev: Vite proxies /api to backend, or direct to backend port 8000
    return "http://127.0.0.1:8000";
  }
  if (h.includes("onrender.com") || h.includes("vercel.app")) {
    return "https://numm-backend.onrender.com";
  }
  return "https://numm-backend.onrender.com"; // default production
}

export const API_BASE = resolveApiBase().replace(/\/$/, "");

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

// Resilient fallback personas for air-gapped demo or Render cold-start scenarios
const FALLBACK_PERSONAS: PersonaRow[] = [
  {
    role: "STEWARD",
    email: "rameshwar.sharma@ongc.in",
    full_name: "Rameshwar Sharma",
    organization_code: "ONGC",
    token: "demo_jwt_token_steward_ongc",
    description: "Senior Materials Engineer - Data Steward",
  },
  {
    role: "PROCUREMENT_OFFICER",
    email: "priya.venkat@iocl.in",
    full_name: "Priya Venkatraman",
    organization_code: "IOCL",
    token: "demo_jwt_token_procurement_iocl",
    description: "Chief General Manager (Materials & Contracts)",
  },
  {
    role: "PLANT_ENGINEER",
    email: "harpreet.singh@gail.co.in",
    full_name: "Harpreet Singh",
    organization_code: "GAIL",
    token: "demo_jwt_token_plant_gail",
    description: "Superintending Maintenance Engineer (Mechanical)",
  },
  {
    role: "AUDITOR",
    email: "sk.gupta@cvc.gov.in",
    full_name: "S. K. Gupta",
    organization_code: "CVC",
    token: "demo_jwt_token_auditor_cvc",
    description: "Chief Vigilance Officer - MoPNG Inspection Wing",
  },
  {
    role: "ADMIN",
    email: "director.materials@mopng.gov.in",
    full_name: "Dr. Arvind Kelkar",
    organization_code: "MOPNG",
    token: "demo_jwt_token_admin_mopng",
    description: "Joint Secretary & Mission Director (NUMM)",
  },
];

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
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/demo-tokens`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = (await res.json()) as { personas: PersonaRow[] };
      if (data.personas && data.personas.length > 0) {
        personaCache = data.personas;
        return personaCache;
      }
    }
  } catch (err) {
    console.warn(
      "Could not fetch remote demo-tokens, engaging fallback personas:",
      err
    );
  }
  personaCache = FALLBACK_PERSONAS;
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
