/**
 * Detailtiefe-Ebenen des Ortes „Heute" (WP-020, Verdichtungs-Gerüst; DR-0010-Reihenfolge).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Detailtiefe" (wörtlich):
 * „Ebene 1 zeigt Klartext, Zustand und Handlung. Ebene 2 öffnet Ursachen, Beziehungen und
 * Alternativen. Ebene 3 zeigt Rohdaten, Mappings, Historie und technische Nachweise. Nutzer
 * können eine bevorzugte Tiefe speichern; sicherheitskritische Warnungen bleiben jedoch immer
 * sichtbar." Außerdem Abschnitt „Zwölf verbindliche Designprinzipien", P06 („Progressive
 * Offenlegung: Die erste Ebene bleibt ruhig.") und 06-D07 (Einsteiger-/Expertenmodus sind
 * keine getrennten Produkte).
 *
 * UMSETZUNG IM HEUTIGEN READ-ONLY-STAND:
 *  - Ebene 1: verdichteter Klartext-Zustand + Kacheln aus belegten Daten („Handlung" ist im
 *    read-only-Produkt die Navigation: jeder Drill-down ist ein Link).
 *  - Ebene 2: Ursachen & Datenlage – die WP-016-Abschnitte (Standort, Erfassungswellen,
 *    Beobachtungen). „Alternativen" haben keinen Datenträger und werden nicht erfunden.
 *  - Ebene 3: Rohdaten-Einstiege – Objekt-Einstiege je Familie und Orte mit Bestand; die
 *    eigentlichen Rohdaten liegen auf den Objektlisten/Objektseiten (Drill-down-Ziele).
 *  - Die Ebenen sind KUMULATIV (P06: Tiefe öffnet sich kontrolliert): Ebene n zeigt alles bis
 *    einschließlich n. Kein Inhalt wird gelöscht – Verdichtung ist Umordnung.
 *
 * INVARIANTE (Dok. 06 „Detailtiefe", letzter Satz): „sicherheitskritische Warnungen bleiben
 * jedoch immer sichtbar." Im heutigen Produkt existiert KEINE sicherheitskritische Warnung,
 * die eine Tiefe unterdrücken könnte. Unabhängig von der Tiefe sichtbar bleiben die Artefakte,
 * die es wirklich gibt (Nachfix nach Gate-Runde 2 – der frühere „permanente Demo-Hinweis der
 * Shell" wurde mit DR-0011 entfernt und existiert nicht mehr):
 *   1. die querschnittliche Kontextleiste (Mandant, Rolle, Scope, Datenstand),
 *   2. der Reichweiten-/Ansichtshinweis der Rollenwahl (`rollenReichweiteSatz`,
 *      Ansicht-≠-Berechtigung),
 *   3. die Ehrlichkeitsblöcke (Seitenbausteine-Hinweis, benannte Datenlücken, 08-D07-Rahmung).
 * Jedes künftige WP, das sicherheitskritische Warnungen einführt, MUSS sie außerhalb der
 * Tiefensteuerung rendern.
 *
 * // OFFENE FRAGE O-WP020-01 (registriert): Wo und wie granular die bevorzugte Tiefe
 * // gespeichert wird (je Ort? je Nutzer?), lässt das Konzept offen (06-O09). Hier: EINE
 * // einfache lokale Voreinstellung je Gerät (versionierter localStorage-Schlüssel) – eine
 * // reversible Anzeigeentscheidung ohne Datenwirkung.
 *
 * MANDANTENFREI (Cross-Tenant-Schutz, Dok. 06 Kasten CROSS-TENANT-SCHUTZ): Der gespeicherte
 * Wert ist AUSSCHLIESSLICH die Stufe („1" | „2" | „3") – er enthält keinen Mandanten-, Rollen-
 * oder Objektbezug und ist damit beim Mandantenwechsel gefahrlos: es lebt kein Zustand des
 * alten Mandanten weiter (per Wächtertest belegt).
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/data.ts`).
 */

import type { MissionSectionId } from './framing';

export type Detailtiefe = 1 | 2 | 3;

/** Versionierter Speicherschlüssel (Muster `SESSION_STORAGE_KEY`, WP-011). */
export const DETAILTIEFE_STORAGE_KEY = 'isms-demo-detailtiefe-v1';

/** Standardtiefe: die erste Ebene bleibt ruhig (Dok. 06 P06). */
export const DETAILTIEFE_STANDARD: Detailtiefe = 1;

export interface DetailtiefeStufe {
  readonly stufe: Detailtiefe;
  /** Sichtbares Kurzlabel des Schalters. */
  readonly titel: string;
  /** Sichtbare Kurzbeschreibung, abgeleitet aus Dok. 06 „Detailtiefe" (s. Kopfkommentar). */
  readonly beschreibung: string;
}

export const DETAILTIEFEN: readonly DetailtiefeStufe[] = [
  {
    stufe: 1,
    titel: 'Überblick',
    beschreibung: 'Klartext-Zustand und Kacheln des aktiven Mandanten.',
  },
  {
    stufe: 2,
    titel: 'Ursachen & Datenlage',
    beschreibung: 'Standort, Erfassungswellen und gezählte Beobachtungen.',
  },
  {
    stufe: 3,
    titel: 'Rohdaten & Einstiege',
    beschreibung: 'Objekt-Einstiege je Familie und Orte mit Bestand.',
  },
] as const;

/**
 * Zuordnung der vier WP-016-Abschnitte zu den Detailtiefe-Ebenen (Dok. 06 „Detailtiefe"):
 * „Ebene 2 öffnet Ursachen, Beziehungen und Alternativen" → Standort (Kontext der Zählungen),
 * Erfassungswellen und gezählte Beobachtungen; „Ebene 3 zeigt Rohdaten, Mappings, Historie und
 * technische Nachweise" → die Einstiege in Objektlisten und Objekt-360 (dort liegen die
 * Rohdaten). Ebene 1 selbst trägt keinen WP-016-Abschnitt – sie ist der verdichtete
 * Klartext-Zustand mit Kacheln (DR-0008). Die Ebenen sind KUMULATIV: sichtbar ist ein
 * Abschnitt, wenn seine Ebene <= der gewählten Tiefe ist.
 */
export const SECTION_EBENE: Readonly<Record<MissionSectionId, Detailtiefe>> = {
  standort: 2,
  erfassung: 2,
  datenlage: 2,
  einstieg: 3,
} as const;

/**
 * Parst einen gespeicherten Wert defensiv: nur „1", „2", „3" sind gültig, alles andere
 * (fehlend, veraltet, manipuliert) fällt auf `null` – die Seite nutzt dann die Standardtiefe,
 * statt einen ungültigen Zustand zu übernehmen (Muster `parseSession`).
 */
export function parseDetailtiefe(raw: string | null): Detailtiefe | null {
  if (raw === '1') return 1;
  if (raw === '2') return 2;
  if (raw === '3') return 3;
  return null;
}

/** Serialisiert die Stufe für den Speicher – bewusst NUR die Ziffer (mandantenfrei, s. o.). */
export function serializeDetailtiefe(tiefe: Detailtiefe): string {
  return String(tiefe);
}
