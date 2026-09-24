// ponytail: Singleton auth manager — auto-fetches STEWARD demo token on first use,
// stores in localStorage, exposes apiFetch() with Bearer header attached.
// Upgrade path: add real OAuth2/SAML SSO flow for production MeghRaj identity.

import { API_BASE } from "./api";

const TOKEN_KEY = "numm_token";
const SESSION_KEY = "numm_session";

export interface DemoPersona {
  role: string;
  email: string;
  full_name: string;
  organization_code: string;
  token: string;
  description: string;
}

let _currentToken: string | null = localStorage.getItem(TOKEN_KEY);
let _currentPersona: DemoPersona | null = (() => {
  const s = localStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
})();

const _listeners: Array<() => void> = [];

export function onAuthChange(cb: () => void) {
  _listeners.push(cb);
  return () => {
    const i = _listeners.indexOf(cb);
    if (i !== -1) _listeners.splice(i, 1);
  };
}

function notify() {
  _listeners.forEach((cb) => cb());
}

export function getToken(): string | null {
  return _currentToken;
}

export function getCurrentPersona(): DemoPersona | null {
  return _currentPersona;
}

export function setPersona(persona: DemoPersona) {
  _currentToken = persona.token;
  _currentPersona = persona;
  localStorage.setItem(TOKEN_KEY, persona.token);
  localStorage.setItem(SESSION_KEY, JSON.stringify(persona));
  notify();
}

export function clearAuth() {
  _currentToken = null;
  _currentPersona = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
  notify();
}

/** Fetches all demo personas from backend. No auth required. */
export async function fetchDemoPersonas(): Promise<DemoPersona[]> {
  const res = await fetch(`${API_BASE}/api/v1/auth/demo-tokens`);
  if (!res.ok) throw new Error("Failed to load demo personas");
  const data = await res.json();
  return data.personas as DemoPersona[];
}

/** Auto-initialize: pick default STEWARD persona if not already authed. */
export async function ensureAuth(): Promise<void> {
  if (_currentToken) return;
  try {
    const personas = await fetchDemoPersonas();
    const steward =
      personas.find((p) => p.role === "STEWARD") ?? personas[0];
    if (steward) setPersona(steward);
  } catch (e) {
    console.warn("[NUMM] Could not auto-auth — backend may be offline:", e);
  }
}

/** Drop-in fetch wrapper that attaches Authorization: Bearer token. */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  await ensureAuth();
  const token = _currentToken;
  // Only inject Content-Type when caller hasn't already set headers (FormData sets its own boundary)
  const callerHeaders = options.headers as Record<string, string> | undefined;
  const hasExplicitHeaders = callerHeaders !== undefined;
  const headers: Record<string, string> = {
    ...(hasExplicitHeaders ? callerHeaders : { "Content-Type": "application/json" }),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch(url, { ...options, headers });
}
