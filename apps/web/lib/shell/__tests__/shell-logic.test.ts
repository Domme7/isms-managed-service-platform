/**
 * Unit-Tests der React-freien Shell-Logik (WP-011): acht Orte, aktive-Route-Ableitung,
 * kanonisches Rollenmodell (R01–R12) und die defensive Session-Auflösung.
 *
 * Prüft gegen die belegten Quellen (Dok. 06 §4, Dok. 03 §3) und den echten Demo-Seed – keine Mocks.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { NAV_PLACES, activePlaceId, getPlace } from '../places';
import { DEMO_ROLES, getRole, worldForRole } from '../roles';
import {
  defaultSession,
  parseSession,
  resolveSession,
  serializeSession,
  type DemoSession,
} from '../session';

describe('NAV_PLACES – acht stabile Orte (Dok. 06 06-D01)', () => {
  it('enthält genau die acht Orte in kanonischer Reihenfolge', () => {
    expect(NAV_PLACES).toHaveLength(8);
    expect(NAV_PLACES.map((p) => p.label)).toEqual([
      'Heute',
      'Kunden',
      'ISMS',
      'Entscheidungen',
      'Services',
      'Reports',
      'Wissen',
      'Administration',
    ]);
  });

  it('hängt den Twin Explorer unter „Kunden" ein (href /twin, live)', () => {
    const kunden = getPlace('kunden');
    expect(kunden.href).toBe('/twin');
    expect(kunden.live).toBe(true);
  });

  it('markiert „Services" als live (WP-012 Slice 2: echte Seed-Inhalte)', () => {
    expect(getPlace('services').live).toBe(true);
  });

  it('markiert „ISMS" als live (WP-013 Slice 1: Risk & Control-Sicht aus dem Seed)', () => {
    expect(getPlace('isms').live).toBe(true);
  });

  it('markiert „Heute" als live und ohne geplanten Screen (WP-016 Slice 2)', () => {
    const heute = getPlace('heute');
    expect(heute.live).toBe(true);
    // Der Ort ist kein Platzhalter mehr: die Ankündigung eines geplanten Screens entfällt.
    expect(heute.plannedScreen).toBeUndefined();
  });

  it('markiert „Entscheidungen" als live und ohne geplanten Screen (WP-017 Slice 2)', () => {
    const entscheidungen = getPlace('entscheidungen');
    expect(entscheidungen.live).toBe(true);
    // Der Ort ist kein Platzhalter mehr: die Ankündigung eines geplanten Screens entfällt.
    expect(entscheidungen.plannedScreen).toBeUndefined();
    // Die Leitfrage bleibt unverändert erhalten – die Seite beantwortet sie nicht, sondern
    // benennt sichtbar, warum sie auf dieser Datenlage nicht beantwortbar ist (O-WP017-06).
    expect(entscheidungen.question).toBe('Welche Geschäftsentscheidung ist jetzt erforderlich?');
  });

  it('markiert die übrigen Platzhalter-Orte als (noch) nicht live', () => {
    // Live sind bislang „Kunden" (Twin Explorer, WP-004/011), „Services" (WP-012 Slice 2),
    // „ISMS" (WP-013 Slice 1), „Heute" (WP-016 Slice 2) und „Entscheidungen" (WP-017 Slice 2).
    const live: readonly string[] = ['kunden', 'services', 'isms', 'heute', 'entscheidungen'];
    const placeholders = NAV_PLACES.filter((p) => !live.includes(p.id));
    expect(placeholders).toHaveLength(3);
    for (const place of placeholders) {
      expect(place.live).not.toBe(true);
      // Ein Platzhalter-Ort behält seine ehrliche Ankündigung (`PlaceholderPage` zeigt sie).
      expect(place.plannedScreen).toBeTruthy();
    }
  });
});

describe('activePlaceId – aktive-Route-Ableitung', () => {
  it('markiert „Kunden" für den Explorer und seine Detailrouten', () => {
    expect(activePlaceId('/twin')).toBe('kunden');
    expect(activePlaceId(`/twin/${TENANT_ID.NORDWERK}`)).toBe('kunden');
  });

  it('markiert die übrigen Orte an ihrem eigenen Pfad', () => {
    expect(activePlaceId('/heute')).toBe('heute');
    expect(activePlaceId('/isms')).toBe('isms');
    expect(activePlaceId('/administration')).toBe('administration');
  });

  it('liefert für Einstieg/Unbekanntes keinen aktiven Ort', () => {
    expect(activePlaceId('/')).toBeUndefined();
    expect(activePlaceId('/login')).toBeUndefined();
  });
});

describe('DEMO_ROLES – kanonisches Rollenmodell R01–R12 (Dok. 03 §3)', () => {
  it('enthält genau die zwölf Rollen R01–R12', () => {
    expect(DEMO_ROLES).toHaveLength(12);
    expect(DEMO_ROLES.map((r) => r.id)).toEqual([
      'R01',
      'R02',
      'R03',
      'R04',
      'R05',
      'R06',
      'R07',
      'R08',
      'R09',
      'R10',
      'R11',
      'R12',
    ]);
  });

  it('ordnet jede Rolle einer der vier Erlebniswelten zu (Dok. 06 §5)', () => {
    for (const role of DEMO_ROLES) {
      expect(worldForRole(role).name).toMatch(/World/);
    }
    expect(worldForRole(getRole('R01')!).id).toBe('executive');
    expect(worldForRole(getRole('R07')!).id).toBe('assurance');
  });

  it('liefert für unbekannte IDs undefined', () => {
    expect(getRole('R99')).toBeUndefined();
  });
});

describe('Session – defensive Auflösung (KEINE Sicherheitsgrenze)', () => {
  it('serialisiert und parst eine gültige Auswahl verlustfrei', () => {
    const session: DemoSession = { roleId: 'R03', tenantId: TENANT_ID.NORDWERK };
    expect(parseSession(serializeSession(session))).toEqual(session);
  });

  it('verwirft ungültiges/leeres oder unauflösbares JSON', () => {
    expect(parseSession(null)).toBeNull();
    expect(parseSession('nicht-json')).toBeNull();
    expect(parseSession(JSON.stringify({ roleId: 'R99', tenantId: 'tenant-x' }))).toBeNull();
  });

  it('löst Rolle und Mandant zu Anzeigeobjekten auf', () => {
    const resolved = resolveSession({ roleId: 'R01', tenantId: TENANT_ID.NORDWERK });
    expect(resolved?.role.name).toBe('Executive Sponsor');
    expect(resolved?.tenant.display_name).toBe('Nordwerk Manufacturing SE');
  });

  it('defaultSession verweist auf reale erste Rolle + ersten Mandanten', () => {
    const d = defaultSession();
    expect(d.roleId).toBe(DEMO_ROLES[0]!.id);
    expect(d.tenantId).toBe(DEMO_TENANTS[0]!.tenant_id);
    expect(resolveSession(d)).not.toBeNull();
  });
});
