/**
 * Sphärengerechter Einstieg des Ortes „Kunden" (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * Geprüft wird die react-freie Regel selbst — vollständig über ALLE zwölf kanonischen Rollen
 * plus den neutralen Zustand, nicht an Stichproben:
 *   1. Kundensphäre (R01–R06) und der unabhängige Auditor (R07) → Ein-Unternehmens-Sicht,
 *   2. Betreibersphäre (R08–R11), „Beide" (R12) und neutral → Portfolio,
 *   3. der Mandantenwechsler folgt derselben Regel,
 *   4. die Navigationsstruktur der acht Orte bleibt unangetastet (06-D01) — es ändert sich
 *      ausschließlich das ZIEL des Ortes „Kunden".
 *
 * QUELLE (Regel Null): Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Kunden"
 * („Für Kundenrollen ggf. direkt der eigene Workspace"); Dok. 03, Abschnitt „Kanonisches
 * Rollenmodell" (Spalte „Sphäre"). Die Ableitung erfolgt über die SPHÄRE, nicht über eine
 * Rollen-ID-Liste — deshalb prüft dieser Test die Sphären-Erwartung ebenfalls gegen die
 * kanonische Tabelle statt gegen eine zweite handgepflegte Liste.
 */
import { describe, expect, it } from 'vitest';

import { NAV_PLACES } from '../places';
import { DEMO_ROLES, getRole } from '../roles';
import {
  KUNDENBEREICH_HREF,
  PORTFOLIO_HREF,
  kundenOrtHref,
  kundenSicht,
  mandantenwechselSichtbar,
  orteFuerRolle,
} from '../sphaere';

/** Rollen der Ein-Unternehmens-Sicht laut Entscheidung: Sphäre „Kunde" oder „Unabhängig". */
const EIN_UNTERNEHMEN = DEMO_ROLES.filter((r) => r.sphere === 'Kunde' || r.sphere === 'Unabhängig');
const PORTFOLIO = DEMO_ROLES.filter((r) => r.sphere === 'Betreiber' || r.sphere === 'Beide');

describe('Sphäre an Rolle gekoppelt (Dok. 06 „Acht stabile Hauptorte", Zeile „Kunden")', () => {
  it('Meta: die beiden Gruppen decken alle zwölf Rollen genau einmal ab', () => {
    expect(EIN_UNTERNEHMEN.length + PORTFOLIO.length).toBe(DEMO_ROLES.length);
    expect(DEMO_ROLES).toHaveLength(12);
    // Der Audit-Fund selbst: R01 (Executive Sponsor) IST eine Kundenrolle.
    expect(EIN_UNTERNEHMEN.map((r) => r.id)).toContain('R01');
    expect(EIN_UNTERNEHMEN.map((r) => r.id)).toContain('R07');
    expect(PORTFOLIO.map((r) => r.id)).toEqual(['R08', 'R09', 'R10', 'R11', 'R12']);
  });

  it('Kundenrollen und der Auditor starten im eigenen Unternehmen – kein Portfolio', () => {
    for (const rolle of EIN_UNTERNEHMEN) {
      expect(kundenSicht(rolle), rolle.id).toBe('ein_unternehmen');
      expect(kundenOrtHref(rolle), rolle.id).toBe(KUNDENBEREICH_HREF);
      expect(mandantenwechselSichtbar(rolle), rolle.id).toBe(false);
    }
  });

  it('Betreiber-/Beraterrollen und der Administrator behalten das Portfolio', () => {
    for (const rolle of PORTFOLIO) {
      expect(kundenSicht(rolle), rolle.id).toBe('portfolio');
      expect(kundenOrtHref(rolle), rolle.id).toBe(PORTFOLIO_HREF);
      expect(mandantenwechselSichtbar(rolle), rolle.id).toBe(true);
    }
  });

  it('neutral nimmt keine Sphäre an: der Ort bleibt in seiner Grundform (Portfolio)', () => {
    expect(kundenSicht(null)).toBe('portfolio');
    expect(kundenOrtHref(null)).toBe(PORTFOLIO_HREF);
    expect(mandantenwechselSichtbar(null)).toBe(true);
  });

  it('die Navigationsstruktur der acht Orte bleibt unverändert (06-D01)', () => {
    for (const rolle of [...DEMO_ROLES, null]) {
      const orte = orteFuerRolle(NAV_PLACES, rolle);
      expect(orte.map((o) => o.id)).toEqual(NAV_PLACES.map((o) => o.id));
      expect(orte.map((o) => o.label)).toEqual(NAV_PLACES.map((o) => o.label));
      // Beide Routen bleiben dem Ort zugeordnet – der Wechsel des Ziels ändert das nicht.
      const kunden = orte.find((o) => o.id === 'kunden');
      expect(kunden?.match).toEqual(['/twin', '/kunden']);
      // Kein anderer Ort ändert sein Ziel.
      for (const ort of orte.filter((o) => o.id !== 'kunden')) {
        expect(ort.href).toBe(NAV_PLACES.find((p) => p.id === ort.id)?.href);
      }
    }
  });

  it('nur der Ort „Kunden" wechselt sein Ziel – und genau nach der Sphäre', () => {
    const kunde = orteFuerRolle(NAV_PLACES, getRole('R01') ?? null).find((o) => o.id === 'kunden');
    const betreiber = orteFuerRolle(NAV_PLACES, getRole('R09') ?? null).find(
      (o) => o.id === 'kunden',
    );
    expect(kunde?.href).toBe('/kunden');
    expect(betreiber?.href).toBe('/twin');
  });

  it('die Eingabeliste wird nicht verändert (reine Ableitung, keine Mutation)', () => {
    const vorher = NAV_PLACES.map((p) => p.href);
    orteFuerRolle(NAV_PLACES, getRole('R01') ?? null);
    expect(NAV_PLACES.map((p) => p.href)).toEqual(vorher);
  });
});
