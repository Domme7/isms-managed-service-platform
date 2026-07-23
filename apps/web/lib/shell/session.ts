/**
 * Simulierte Demo-"Sitzung" (WP-011; rollenloser Zustand seit WP-020 Slice 2, DR-0009) –
 * rein clientseitig, React-frei und deterministisch testbar.
 *
 * ACHTUNG: Dies ist KEINE Authentisierung, KEINE Session und KEINE Sicherheitsgrenze.
 * Es ist eine reine Perspektiv-Wahl (Mandant + optional aktive Rolle) für die Demo-Navigation
 * (`.claude/rules/security.md`, Dok. 19). Serverseitige Authz/Tenant-Isolation folgt in einem
 * späteren Work Package.
 *
 * EINSTIEGSFLUSS (DR-0009): Angemeldet wird NUR mit dem Mandanten; der Einstieg ist die
 * neutrale strategische Ebene 1. Die Rolle ist optional und wird jederzeit IN DER APP gewählt
 * oder abgewählt („neutral"). ZUKUNFTSSICHERHEIT: In einer produktiven Umgebung käme die Rolle
 * aus dem Konto (Dok. 19); die freie Wahl inklusive „neutral" ist eine Demo-Eigenschaft.
 */

import { DEMO_TENANTS, type DemoTenant } from '@isms/demo-seed';
import { getRole } from './roles';
import type { DemoRole } from './roles';

/**
 * Speicherschlüssel – BEWUSST WEITER `v1` (Builder-Entscheidung WP-020 Slice 2, begründet):
 * Das neue Format macht `roleId` OPTIONAL und ist damit eine ECHTE OBERMENGE des alten –
 * jeder gültige Alt-Wert (`{roleId, tenantId}`) ist unverändert ein gültiger neuer Wert mit
 * identischer Bedeutung (gewählte Rolle bleibt gewählt). Ein Schlüsselsprung auf `v2` würde
 * ohne fachlichen Grund jede bestehende Demo-Sitzung verwerfen (stilles „Abmelden"). Die
 * Versionierung bleibt für den Fall einer künftigen NICHT abwärtskompatiblen Änderung.
 */
export const SESSION_STORAGE_KEY = 'isms-demo-session-v1';

/**
 * Was die Simulation "merkt": der gewählte Mandant und – optional – die gewählte Rolle.
 * `roleId` fehlt im NEUTRALEN Zustand (DR-0009: Einstieg ohne Rollenwahl).
 */
export interface DemoSession {
  readonly roleId?: string;
  readonly tenantId: string;
}

/**
 * Auf Anzeigeobjekte aufgelöste Sitzung. `role: null` ist der NEUTRALE Zustand – ein
 * vollwertiger, gültiger Zustand (keine Fehllage): alle Ansichten rendern dieselben Daten,
 * nur ohne Rollen-Rahmung.
 */
export interface ResolvedSession {
  readonly role: DemoRole | null;
  readonly tenant: DemoTenant;
}

function tenantById(tenantId: string): DemoTenant | undefined {
  return DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
}

/**
 * Löst eine rohe Sitzung auf. `null`, falls der Mandant oder eine GESETZTE Rolle (mehr)
 * unbekannt ist – eine veraltete/manipulierte Auswahl wird vollständig verworfen, statt eine
 * erfundene Perspektive anzuzeigen. Bewusst KEINE stille Degradierung einer unbekannten Rolle
 * zu „neutral": das wäre ein unangekündigter Moduswechsel.
 */
export function resolveSession(session: DemoSession | null): ResolvedSession | null {
  if (!session) return null;
  const tenant = tenantById(session.tenantId);
  if (!tenant) return null;
  if (session.roleId === undefined) return { role: null, tenant };
  const role = getRole(session.roleId);
  if (!role) return null;
  return { role, tenant };
}

/**
 * Parst einen rohen Speicherwert defensiv; ungültiges/fehlendes JSON -> `null`.
 * Akzeptiert BEIDE Formate desselben Schlüssels: mit `roleId` (Alt-Format/gewählte Rolle)
 * und ohne `roleId` (neutral) – keine gültige Alt-Sitzung wird verworfen, keine Rolle
 * erfunden (WP-020 AC 8).
 */
export function parseSession(raw: string | null): DemoSession | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (typeof data !== 'object' || data === null) return null;
    const record = data as Record<string, unknown>;
    if (typeof record.tenantId !== 'string') return null;
    if (record.roleId !== undefined && typeof record.roleId !== 'string') return null;

    const candidate: DemoSession =
      typeof record.roleId === 'string'
        ? { roleId: record.roleId, tenantId: record.tenantId }
        : { tenantId: record.tenantId };
    // Nur behalten, wenn die Auswahl real auflösbar ist.
    return resolveSession(candidate) ? candidate : null;
  } catch {
    // fällt auf null zurück
  }
  return null;
}

/** Serialisiert eine Sitzung; im neutralen Zustand wird KEIN `roleId`-Feld geschrieben. */
export function serializeSession(session: DemoSession): string {
  return JSON.stringify(
    session.roleId !== undefined
      ? { roleId: session.roleId, tenantId: session.tenantId }
      : { tenantId: session.tenantId },
  );
}

/**
 * Standard-Vorauswahl der Login-Simulation: erster Mandant, KEINE Rolle (DR-0009 – der
 * Einstieg ist neutral; die Rollenwahl lebt in der App, nicht im Login).
 */
export function defaultSession(): DemoSession {
  return { tenantId: DEMO_TENANTS[0]!.tenant_id };
}
