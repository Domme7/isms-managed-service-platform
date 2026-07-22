/**
 * Simulierte Demo-"Sitzung" (WP-011) – rein clientseitig, React-frei und deterministisch testbar.
 *
 * ACHTUNG: Dies ist KEINE Authentisierung, KEINE Session und KEINE Sicherheitsgrenze.
 * Es ist eine reine Perspektiv-Wahl (aktive Rolle + Mandant) für die Demo-Navigation
 * (`.claude/rules/security.md`, Dok. 19). Serverseitige Authz/Tenant-Isolation folgt in einem
 * späteren Work Package.
 */

import { DEMO_ROLES, getRole } from './roles';
import { DEMO_TENANTS, type DemoTenant } from '@isms/demo-seed';
import type { DemoRole } from './roles';

/** Speicherschlüssel (versioniert, damit Formatänderungen alte Werte nicht still fehldeuten). */
export const SESSION_STORAGE_KEY = 'isms-demo-session-v1';

/** Was die Simulation "merkt": nur die gewählte Rolle und der gewählte Mandant. */
export interface DemoSession {
  readonly roleId: string;
  readonly tenantId: string;
}

/** Auf Anzeigeobjekte aufgelöste Sitzung (Rolle + Mandant). */
export interface ResolvedSession {
  readonly role: DemoRole;
  readonly tenant: DemoTenant;
}

function tenantById(tenantId: string): DemoTenant | undefined {
  return DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
}

/**
 * Löst eine rohe Sitzung auf gültige Rolle+Mandant auf. `null`, falls Rolle oder Mandant
 * (mehr) unbekannt sind – so wird eine veraltete/manipulierte Auswahl sauber verworfen,
 * statt eine erfundene Perspektive anzuzeigen.
 */
export function resolveSession(session: DemoSession | null): ResolvedSession | null {
  if (!session) return null;
  const role = getRole(session.roleId);
  const tenant = tenantById(session.tenantId);
  if (!role || !tenant) return null;
  return { role, tenant };
}

/** Parst einen rohen Speicherwert defensiv; ungültiges/fehlendes JSON -> `null`. */
export function parseSession(raw: string | null): DemoSession | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as Record<string, unknown>).roleId === 'string' &&
      typeof (data as Record<string, unknown>).tenantId === 'string'
    ) {
      const candidate: DemoSession = {
        roleId: (data as Record<string, string>).roleId,
        tenantId: (data as Record<string, string>).tenantId,
      };
      // Nur behalten, wenn die Auswahl real auflösbar ist.
      return resolveSession(candidate) ? candidate : null;
    }
  } catch {
    // fällt auf null zurück
  }
  return null;
}

/** Serialisiert eine Sitzung für den Speicher. */
export function serializeSession(session: DemoSession): string {
  return JSON.stringify({ roleId: session.roleId, tenantId: session.tenantId });
}

/** Sinnvolle Standard-Vorauswahl der Login-Simulation (erste Rolle, erster Mandant). */
export function defaultSession(): DemoSession {
  return { roleId: DEMO_ROLES[0]!.id, tenantId: DEMO_TENANTS[0]!.tenant_id };
}
