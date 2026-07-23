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
  SESSION_STORAGE_KEY,
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

  it('markiert „Administration" als live und ohne geplanten Screen (WP-032 Slice 1)', () => {
    const administration = getPlace('administration');
    expect(administration.live).toBe(true);
    // Der Ort ist kein Platzhalter mehr: die Ankündigung eines geplanten Screens entfällt.
    expect(administration.plannedScreen).toBeUndefined();
    // KONZEPTANKER: Die Leitfrage des Screenkatalogs bleibt unverändert erhalten. Die Seite
    // rendert sie NICHT als sichtbare Überschrift (sie verlangt ein Sicherheitsurteil, das der
    // heutige Bau nicht fällen kann) und beantwortet die drei Teilfragen stattdessen einzeln
    // und ehrlich – ohne Zusage und ohne Fehlalarm (O-WP032-02/03).
    expect(administration.question).toBe(
      'Ist der Tenant sicher, korrekt konfiguriert und verbunden?',
    );
  });

  it('markiert die übrigen Platzhalter-Orte als (noch) nicht live', () => {
    // Live sind bislang „Kunden" (Twin Explorer, WP-004/011), „Services" (WP-012 Slice 2),
    // „ISMS" (WP-013 Slice 1), „Heute" (WP-016 Slice 2), „Entscheidungen" (WP-017 Slice 2)
    // und „Administration" (WP-032 Slice 1).
    const live: readonly string[] = [
      'kunden',
      'services',
      'isms',
      'heute',
      'entscheidungen',
      'administration',
    ];
    const placeholders = NAV_PLACES.filter((p) => !live.includes(p.id));
    expect(placeholders).toHaveLength(2);
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

  it('trägt je Rolle den WÖRTLICHEN PDF-Text der Spalte „Kernverantwortung" (WP-020 AC 9)', () => {
    // Wortlaut aus Dok. 03, Abschnitt „Kanonisches Rollenmodell" (PDF-Extrakt, Regel Null) –
    // hier festgenagelt, damit die Strings nicht wieder still zu Kurzfassungen driften
    // (Übergabepunkt 9 aus WP-019: die Alt-Fassungen waren gekürzt).
    expect(DEMO_ROLES.map((r) => r.responsibility)).toEqual([
      'Strategische Entscheidungen, Risikoakzeptanz, Budget und Managementkommunikation',
      'Sicherheitssteuerung, Eskalation, Prioritäten und Managementübersetzung',
      'Operativer ISMS-Betrieb, Koordination, Reviews, Maßnahmen und Nachweise',
      'Geschäftsauswirkung, Schutzbedarf, Priorität und Risikoentscheidung',
      'Umsetzung und Wirksamkeit konkreter Assets oder Controls',
      'Nachweise, Statusupdates und fachliche Zuarbeit',
      'Prüfung, Stichprobe, Feststellung und Nachvollziehbarkeit',
      'Serviceportfolio, Qualität, Kapazität, Profitabilität und Eskalation',
      'Mandantenbeziehung, Scope, Termine, Entscheidungen und Delivery-Steuerung',
      'Analyse, Moderation, Maßnahmensteuerung, Reporting und Beratung',
      'Spezialanalyse etwa Cloud, IAM, BCM, Supplier Risk oder Threats',
      'Nutzer, Rollen, Konfiguration, Integrationen und Betriebsfähigkeit',
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

describe('Session – defensive Auflösung (KEINE Sicherheitsgrenze; neutral seit WP-020 Slice 2)', () => {
  it('serialisiert und parst eine gültige Auswahl MIT Rolle verlustfrei', () => {
    const session: DemoSession = { roleId: 'R03', tenantId: TENANT_ID.NORDWERK };
    expect(parseSession(serializeSession(session))).toEqual(session);
  });

  it('serialisiert und parst die NEUTRALE Auswahl (ohne roleId) verlustfrei', () => {
    const session: DemoSession = { tenantId: TENANT_ID.NORDWERK };
    const raw = serializeSession(session);
    // Im neutralen Zustand wird KEIN roleId-Feld geschrieben (kein `roleId: undefined`).
    expect(raw).not.toContain('roleId');
    expect(parseSession(raw)).toEqual(session);
  });

  it('AC 8: verwirft keine gültige Alt-Sitzung – das v1-Format mit Rolle bleibt lesbar', () => {
    // Exakt das Alt-Format, wie es VOR WP-020 Slice 2 im localStorage lag (Literal, damit
    // eine künftige serializeSession-Änderung diesen Beweis nicht still mitzieht).
    const altWert = `{"roleId":"R03","tenantId":"${TENANT_ID.NORDWERK}"}`;
    expect(parseSession(altWert)).toEqual({ roleId: 'R03', tenantId: TENANT_ID.NORDWERK });
    // … und der Schlüssel ist unverändert (Obermengen-Format, Begründung in session.ts).
    expect(SESSION_STORAGE_KEY).toBe('isms-demo-session-v1');
  });

  it('AC 8: erfindet keine Rolle – neutral bleibt neutral, unbekannte Rolle wird verworfen', () => {
    // Neutral wird NICHT zu einer Default-Rolle aufgefüllt …
    expect(resolveSession({ tenantId: TENANT_ID.NORDWERK })?.role).toBeNull();
    // … und eine unbekannte Rolle wird NICHT still zu neutral degradiert (unangekündigter
    // Moduswechsel), sondern die Auswahl wird vollständig verworfen.
    expect(
      parseSession(JSON.stringify({ roleId: 'R99', tenantId: TENANT_ID.NORDWERK })),
    ).toBeNull();
  });

  it('verwirft ungültiges/leeres oder unauflösbares JSON', () => {
    expect(parseSession(null)).toBeNull();
    expect(parseSession('nicht-json')).toBeNull();
    expect(parseSession(JSON.stringify({ roleId: 'R99', tenantId: 'tenant-x' }))).toBeNull();
    expect(parseSession(JSON.stringify({ tenantId: 'tenant-unbekannt' }))).toBeNull();
    expect(parseSession(JSON.stringify({ roleId: 42, tenantId: TENANT_ID.NORDWERK }))).toBeNull();
  });

  it('löst Rolle und Mandant zu Anzeigeobjekten auf; neutral löst mit role null auf', () => {
    const resolved = resolveSession({ roleId: 'R01', tenantId: TENANT_ID.NORDWERK });
    expect(resolved?.role?.name).toBe('Executive Sponsor');
    expect(resolved?.tenant.display_name).toBe('Nordwerk Manufacturing SE');

    const neutral = resolveSession({ tenantId: TENANT_ID.NORDWERK });
    expect(neutral).not.toBeNull();
    expect(neutral?.role).toBeNull();
    expect(neutral?.tenant.display_name).toBe('Nordwerk Manufacturing SE');
  });

  it('defaultSession ist der NEUTRALE Einstieg beim ersten Mandanten (DR-0009)', () => {
    // WP-020 Slice 2 (geplanter Umbau): vorher zeigte die Vorauswahl auf die erste Rolle –
    // seit DR-0009 wird ohne Rolle angemeldet; die Regel „real auflösbar" bleibt geprüft.
    const d = defaultSession();
    expect(d.roleId).toBeUndefined();
    expect(d.tenantId).toBe(DEMO_TENANTS[0]!.tenant_id);
    expect(resolveSession(d)).not.toBeNull();
  });
});
