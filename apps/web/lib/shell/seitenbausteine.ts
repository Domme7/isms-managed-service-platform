/**
 * Verbindliche Seitenbausteine – gemeinsame Konvention der Live-Orte (WP-020, DR-0010).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Verbindliche Seitenbausteine" –
 * neun Bausteine mit Zweck und Pflichtinhalt (Tabelle wörtlich übernommen in `SEITENBAUSTEINE`).
 *
 * // OFFENE FRAGE O-WP020-02 (registriert): 06-D03 spricht von einer „fünfteiligen
 * // Seitenanatomie", der Abschnitt „Verbindliche Seitenbausteine" führt neun Bausteine.
 * // Hier wird die Neuner-Liste als normativ behandelt und der Zählungskonflikt benannt,
 * // nicht still harmonisiert.
 *
 * KONVENTION: Für jeden Live-Ort dokumentiert `BAUSTEIN_ABDECKUNG`, WO der Bestand der Seite
 * jeden Baustein trägt – oder WARUM er ihn (noch) nicht trägt. Vier Status:
 *   - 'vorhanden':    der Pflichtinhalt ist auf der Seite aus belegten Daten sichtbar,
 *   - 'teilweise':    ein Teil des Pflichtinhalts ist belegt, der Rest hat keinen Träger,
 *   - 'verweis':      der Baustein lebt nicht auf dieser Seite, sondern erreichbar dahinter
 *                     (Drill-down) – KEINE Datenlücke,
 *   - 'ohne_traeger': der Datenbestand/Objektvertrag trägt den Baustein nicht.
 *
 * SICHTBARKEIT (AC-Vorgabe „keine leeren Attrappen"): Die Seiten rendern über
 * `SeitenbausteineHinweis` ausschließlich die EHRLICHE BENENNUNG der Status 'ohne_traeger'
 * und 'teilweise' (was fehlt und warum) – niemals einen leeren Platzhalter-Baustein.
 * 'vorhanden' und 'verweis' sind hier im Code belegt (Spalte `wo`).
 *
 * WORTWAHL DER SICHTBAREN TEXTE: Die `grund`-/`fehlt`-Texte erscheinen im Produkt und stehen
 * unter den Bewertungs-/Geld-Wächtern der Seiten (kein „Trend", „Priorität", „Frist",
 * „Budget", „Kosten", kein Prozent) – fehlende Pflichtinhalte werden deshalb umschrieben
 * („Veränderungs- und Ursachendaten", „Ziel- und Wirkungsdaten"), die PDF-wörtlichen
 * Pflichtinhalte stehen im Feld `pflichtinhalt` (Code/Doku, bewusst nicht gerendert).
 *
 * Alle Zuordnungen sind reversible ANZEIGE-Dokumentation (keine Daten, keine Rechte);
 * react-frei und per Test auf Vollständigkeit geprüft (je Ort alle neun Bausteine genau
 * einmal, jeder benannte Status mit Begründung).
 */

export type BausteinId =
  | 'question_header'
  | 'context_bar'
  | 'summary_pulse'
  | 'relationship_panel'
  | 'impact_panel'
  | 'decision_card'
  | 'action_rail'
  | 'history_decision_record'
  | 'trust_layer';

export interface Seitenbaustein {
  readonly id: BausteinId;
  /** Name wörtlich aus der PDF-Tabelle. */
  readonly name: string;
  /** Spalte „Zweck" wörtlich aus der PDF-Tabelle (nur Code/Doku). */
  readonly zweck: string;
  /** Spalte „Pflichtinhalt" wörtlich aus der PDF-Tabelle (nur Code/Doku). */
  readonly pflichtinhalt: string;
}

/** Die neun Bausteine, wörtlich aus Dok. 06, Abschnitt „Verbindliche Seitenbausteine". */
export const SEITENBAUSTEINE: readonly Seitenbaustein[] = [
  {
    id: 'question_header',
    name: 'Question Header',
    zweck: 'Orientiert über die primäre Nutzerfrage.',
    pflichtinhalt: 'Frage, Objekt/Scope, Status, Owner.',
  },
  {
    id: 'context_bar',
    name: 'Context Bar',
    zweck: 'Verhindert Fehlkontext.',
    pflichtinhalt: 'Mandant, Rolle, Scope, Datenstand, Vertraulichkeit.',
  },
  {
    id: 'summary_pulse',
    name: 'Summary / Pulse',
    zweck: 'Verdichtet Zustand in Klartext.',
    pflichtinhalt: 'Trend, Veränderung, wichtigste Ursache.',
  },
  {
    id: 'relationship_panel',
    name: 'Relationship Panel',
    zweck: 'Zeigt Kausalität und Abhängigkeit.',
    pflichtinhalt: 'Verknüpfte Objekte, Richtung, Herkunft.',
  },
  {
    id: 'impact_panel',
    name: 'Impact Panel',
    zweck: 'Erklärt Business- und Zielwirkung.',
    pflichtinhalt: 'Ziel, Risiko, Zeit, Budget, Services.',
  },
  {
    id: 'decision_card',
    name: 'Decision Card',
    zweck: 'Bereitet verantwortbare Wahl vor.',
    pflichtinhalt: 'Optionen, Nichtstun, Annahmen, Unsicherheit.',
  },
  {
    id: 'action_rail',
    name: 'Action Rail',
    zweck: 'Bündelt kontextuelle Aktionen.',
    pflichtinhalt: 'Freigeben, delegieren, simulieren, exportieren.',
  },
  {
    id: 'history_decision_record',
    name: 'History / Decision Record',
    zweck: 'Erhält Nachvollziehbarkeit.',
    pflichtinhalt: 'Version, Änderung, Entscheider, Review.',
  },
  {
    id: 'trust_layer',
    name: 'Trust Layer',
    zweck: 'Macht Aussagequalität sichtbar.',
    pflichtinhalt: 'Quelle, Aktualität, Vollständigkeit, Konflikte.',
  },
] as const;

export function getBaustein(id: BausteinId): Seitenbaustein {
  const baustein = SEITENBAUSTEINE.find((b) => b.id === id);
  // Statisch vollständig – dieser Fall kann nicht eintreten (Muster `getPlace`).
  if (!baustein) throw new Error(`Unbekannter Baustein: ${id}`);
  return baustein;
}

/**
 * Orte der Konvention: die Live-Hauptseiten (`heute`/`kunden`/`isms`/`entscheidungen`/
 * `services`/`administration`) plus zwei Detailseiten UNTER bestehenden Orten (Muster: eigene
 * Zuordnung, kein neuer Nav-Ort). `objekt360` liegt unter „Kunden"/„ISMS"/„Services";
 * `kundenstart` ist die
 * Kunden-Startseite „verwalten" unter dem Ort „Kunden" (WP-006 Slice 1). Beide sind KEINE
 * `NAV_PLACES`-Orte – der Wächter behandelt sie wie dokumentierte Zusatzseiten (Meta-Assertion).
 */
export type BausteinOrt =
  | 'heute'
  | 'kunden'
  | 'isms'
  | 'entscheidungen'
  | 'services'
  | 'administration'
  | 'objekt360'
  | 'kundenstart';

export type BausteinStatus = 'vorhanden' | 'teilweise' | 'verweis' | 'ohne_traeger';

export interface BausteinZuordnung {
  readonly baustein: BausteinId;
  readonly status: BausteinStatus;
  /** Bei 'vorhanden'/'teilweise'/'verweis': WO der (Teil-)Inhalt lebt (Code-Doku + Anzeige). */
  readonly wo?: string;
  /** Bei 'teilweise': WAS fehlt (sichtbarer Text – Wortwahl s. Kopfkommentar). */
  readonly fehlt?: string;
  /** Bei 'ohne_traeger': WARUM (sichtbarer Text – Wortwahl s. Kopfkommentar). */
  readonly grund?: string;
}

/* -----------------------------------------------------------------------------
 * Wiederkehrende Begründungen (eine Quelle, keine still auseinanderlaufenden Texte)
 * --------------------------------------------------------------------------- */

const GRUND_IMPACT =
  'Der Objektvertrag kennt keine Ziel-, Zeit- und Wirkungsfelder für diese Seite; ein ' +
  'Wirkungsversprechen wäre erfunden.';
const GRUND_DECISION_CARD =
  'Für Optionen, Nichtstun-Vergleich, Annahmen und Unsicherheit einer Entscheidungsvorlage ' +
  'gibt es im Datenbestand keine Träger.';
const GRUND_ACTION_RAIL =
  'Das Produkt ist in dieser Ausbaustufe read-only: es gibt keine auslösbaren Aktionen, also ' +
  'wird auch keine Aktionsleiste als leere Attrappe gezeigt.';
const GRUND_SUMMARY =
  'Für Veränderungs- und Ursachenaussagen gibt es keine Träger im Datenbestand; ein ' +
  'verdichteter Puls würde mehr behaupten, als erfasst ist.';
const FEHLT_SUMMARY =
  'Veränderungs- und Ursachenaussagen (nicht erfasst – der Klartext-Zustand zählt und benennt).';

/* -----------------------------------------------------------------------------
 * Zuordnung je Live-Ort (reversible Anzeige-Dokumentation)
 * --------------------------------------------------------------------------- */

export const BAUSTEIN_ABDECKUNG: Readonly<Record<BausteinOrt, readonly BausteinZuordnung[]>> = {
  heute: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage und ehrliche Grenze am Seitenkopf; Scope in der Kontextleiste.',
      fehlt:
        'Ein Seiten-Status und ein Seiten-Owner (die Seite ist kein Objekt und trägt beides nicht).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter dem Seitenkopf.' },
    {
      baustein: 'summary_pulse',
      status: 'teilweise',
      wo: 'Klartext-Zustand der Ebene 1 (gezählte, belegte Aussagen).',
      fehlt: FEHLT_SUMMARY,
    },
    {
      baustein: 'relationship_panel',
      status: 'verweis',
      wo: 'Beziehungen je Objekt auf der Objektseite (Drill-down der Kacheln und Einstiege).',
    },
    { baustein: 'impact_panel', status: 'ohne_traeger', grund: GRUND_IMPACT },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'teilweise',
      wo: 'Abgeleitete Historienlage in Ebene 2 (Versionen, Ersetzungszeitpunkte, Ablösungen).',
      fehlt: 'Entscheider- und Review-Angaben je Änderung (kein Träger im Objektvertrag).',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo: 'Gezählte Beobachtungen zur Datenlage in Ebene 2; benannte Lücke in der Kontextleiste.',
      fehlt:
        'Ein seitenweiter Vertrauenswert (belegte Einzelwerte stehen an Beziehungen und Objekten).',
    },
  ],
  kunden: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage am Seitenkopf.',
      fehlt: 'Ein Seiten-Status und ein Seiten-Owner (die Übersicht ist kein Objekt).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter der Leitfrage.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'verweis',
      wo: 'Beziehungen auf der Mandanten-Detailseite und den Objektseiten.',
    },
    { baustein: 'impact_panel', status: 'ohne_traeger', grund: GRUND_IMPACT },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'verweis',
      wo: 'Version und Ablösung je Objekt auf der Objektseite.',
    },
    {
      baustein: 'trust_layer',
      status: 'verweis',
      wo: 'Vertrauensgrad je Beziehung und Datenqualität je Objekt auf den Detailseiten.',
    },
  ],
  isms: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage am Seitenkopf; Status je Objekt an den Karten.',
      fehlt:
        'Ein Seiten-Owner (die Sicht ist kein Objekt; Owner stehen je Objekt auf der Objektseite).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter dem Seitenkopf.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'teilweise',
      wo: 'Belegte Kanten mit Richtung an jeder Karte (Herkunfts-Kette, Nachweis-Stand).',
      fehlt: 'Eine Herkunftsangabe je Kante über die Erfassungsart hinaus.',
    },
    {
      baustein: 'impact_panel',
      status: 'teilweise',
      wo: 'Belegter Servicebezug (Serviceumfang) an Karten mit „covered_by"-Kante.',
      fehlt: 'Ziel-, Zeit- und Wirkungsdaten (kein Träger im Objektvertrag).',
    },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'verweis',
      wo: 'Version und Ablösung je Objekt auf der Objektseite.',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo: 'Vertrauensgrad belegter Kanten an den Karten (qualitativ + Wert).',
      fehlt: 'Ein seitenweiter Vertrauenswert (benannte Lücke in der Kontextleiste).',
    },
  ],
  entscheidungen: [
    {
      baustein: 'question_header',
      status: 'vorhanden',
      wo: 'Leitfrage mit ehrlicher Grenze am Seitenkopf; Stand und Verantwortung je Entscheidung.',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter dem Seitenkopf.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'vorhanden',
      wo: 'Bezugsobjekte, Nachweise und Ablösung je Entscheidung mit Richtung der Kante.',
    },
    { baustein: 'impact_panel', status: 'ohne_traeger', grund: GRUND_IMPACT },
    {
      baustein: 'decision_card',
      status: 'teilweise',
      wo: 'Erfasste Felder je Entscheidung und der sichtbare Feldabgleich der Seite.',
      fehlt:
        'Optionen, Nichtstun-Vergleich, Annahmen und Unsicherheit (kein Träger im Datenbestand).',
    },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'vorhanden',
      wo: 'Erfasste Ablösung („supersedes") zwischen Ständen samt getrennter Zeitachsen.',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo: 'Nachweisbezug und Kantenstatus je Entscheidung.',
      fehlt: 'Ein seitenweiter Vertrauenswert (benannte Lücke in der Kontextleiste).',
    },
  ],
  services: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage am Seitenkopf; Stand je Service an den Karten.',
      fehlt: 'Ein Seiten-Owner (Delivery-Verantwortung steht, wo belegt, an der Servicekarte).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter dem Seitenkopf.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'teilweise',
      wo: 'SLA, Deliverables, Serviceumfang und Voraussetzungen je Karte (belegte Kanten).',
      fehlt: 'Eine Herkunftsangabe je Kante über die Erfassungsart hinaus.',
    },
    {
      baustein: 'impact_panel',
      status: 'teilweise',
      wo: 'Belegter Wirkungsbeitrag („contributes_to") mit Vertrauensgrad je Karte.',
      fehlt: 'Ziel- und Zeitwirkung als eigene Datenfelder (kein Träger im Objektvertrag).',
    },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'verweis',
      wo: 'Version und Ablösung je Objekt auf der Objektseite.',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo: 'Vertrauensgrad des Wirkungsbeitrags an den Karten.',
      fehlt: 'Ein seitenweiter Vertrauenswert (benannte Lücke in der Kontextleiste).',
    },
  ],
  administration: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage am Seitenkopf; Gegenstand der Seite sind die erfassten Scopes des aktiven Mandanten.',
      fehlt:
        'Ein Seiten-Status und ein Seiten-Owner (der Konfigurationsstand ist kein Objekt und trägt beides nicht).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter dem Seitenkopf.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'ohne_traeger',
      grund:
        'Der Konfigurationsstand ist kein Objekt mit Beziehungen; diese Seite zeigt deshalb keine ' +
        'verknüpften Objekte und keine Richtung.',
    },
    { baustein: 'impact_panel', status: 'ohne_traeger', grund: GRUND_IMPACT },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'ohne_traeger',
      grund:
        'Änderungen an Konfiguration, Rollen und Rechten würden als nachvollziehbare Ereignisse ' +
        'entstehen; solche Ereignisse gibt es hier nicht, und erfundene Einträge würden ' +
        'Nachvollziehbarkeit vortäuschen.',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo: 'Herkunft und Aktualität des Konfigurationsstands (nur der aktive Mandant, zuletzt erfasster Stand).',
      fehlt:
        'Eine Vollständigkeitsaussage über die Einrichtung und ein seitenweiter Vertrauenswert ' +
        '(kein Träger im Datenbestand).',
    },
  ],
  objekt360: [
    {
      baustein: 'question_header',
      status: 'vorhanden',
      wo: 'Objektname, Leitfrage, Lebenszyklus-Stand und Verantwortung (Owner) der Seite.',
    },
    {
      baustein: 'context_bar',
      status: 'vorhanden',
      wo: 'Objektbezogene Kontextzeile (Mandant, Typ, Familie, Datenstand, Version, Bestätigung).',
    },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'vorhanden',
      wo: 'Beziehungsabschnitte mit Kante, Richtung, Gültigkeit und Erfassungsart.',
    },
    {
      baustein: 'impact_panel',
      status: 'teilweise',
      wo: 'Abschnitt „Warum ist es wichtig?" (belegte Bezüge, Klassifikation, Serviceumfang).',
      fehlt: 'Ziel-, Zeit- und Wirkungsdaten (kein Träger im Objektvertrag).',
    },
    { baustein: 'decision_card', status: 'ohne_traeger', grund: GRUND_DECISION_CARD },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'teilweise',
      wo: 'Abschnitt „Wie entwickelt es sich?" (Version, Erfassung, Ablösung).',
      fehlt: 'Entscheider- und Review-Angaben je Änderung (kein Träger im Objektvertrag).',
    },
    {
      baustein: 'trust_layer',
      status: 'teilweise',
      wo:
        'Datenvertrauen der Seite (Bestätigungsstufe, Qualitätsdimensionen, ' +
        'Kanten-Vertrauensgrad) samt Abgleich mit den acht Trust-Layer-Angaben unter ' +
        '„Wie entwickelt es sich?".',
      fehlt: 'Widerspruchs- und Vollständigkeitsangaben über die erfassten Dimensionen hinaus.',
    },
  ],
  kundenstart: [
    {
      baustein: 'question_header',
      status: 'teilweise',
      wo: 'Leitfrage am Seitenkopf; Lebenszyklus-Stand je Ziel, Nachweis und Service an den Karten.',
      fehlt: 'Ein Seiten-Status und ein Seiten-Owner (der Kundenbereich ist kein Objekt).',
    },
    { baustein: 'context_bar', status: 'vorhanden', wo: 'Kontextleiste unter der Leitfrage.' },
    { baustein: 'summary_pulse', status: 'ohne_traeger', grund: GRUND_SUMMARY },
    {
      baustein: 'relationship_panel',
      status: 'verweis',
      wo: 'Beziehungen je Ziel, Nachweis und Service auf der Objektseite (Objekt-360-Drill-down).',
    },
    { baustein: 'impact_panel', status: 'ohne_traeger', grund: GRUND_IMPACT },
    {
      baustein: 'decision_card',
      status: 'verweis',
      wo: 'Erfasste Entscheidungen am Ort „Entscheidungen" (Drill-down des Verweises).',
    },
    { baustein: 'action_rail', status: 'ohne_traeger', grund: GRUND_ACTION_RAIL },
    {
      baustein: 'history_decision_record',
      status: 'verweis',
      wo: 'Version und Ablösung je Objekt auf der Objektseite.',
    },
    {
      baustein: 'trust_layer',
      status: 'verweis',
      wo: 'Vertrauensgrad je Beziehung und Datenqualität je Objekt auf den Detailseiten.',
    },
  ],
} as const;

/** Zuordnung eines Ortes; wirft bei unbekanntem Ort (statisch vollständig). */
export function bausteinAbdeckung(ort: BausteinOrt): readonly BausteinZuordnung[] {
  const zuordnung = BAUSTEIN_ABDECKUNG[ort];
  if (!zuordnung) throw new Error(`Unbekannter Baustein-Ort: ${String(ort)}`);
  return zuordnung;
}
