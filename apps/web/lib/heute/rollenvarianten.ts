/**
 * Rollenvarianten der Ebene 1 auf „Heute" (WP-020 Slice 5; DR-0009: „Rolle verändert Betonung
 * und Ausblendung, nicht die Wahrheit").
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Mission Control & Morning
 * Mission", Tabelle „Rollenvarianten" – NORMIERT sind genau vier Zeilen:
 *
 *   | Rolle        | Missionsfokus                                               | Ausblendung |
 *   | Executive    | Freigaben, Top-Risiken, Zielabweichung, Investition         | Operative Taskdetails |
 *   | ISMS Manager | Risiken, Maßnahmen, Evidence, Reviews, Datenlücken          | Portfolio-/Umsatzsicht |
 *   | Consultant   | Mandantenpriorität, Audits, Deliverables, Kapazität, Reise  | Unbegründete Vertriebsimpulse |
 *   | Service Lead | SLA, Eskalationen, Qualität, Auslastung, Profitabilität     | Objektdetails ohne Eskalationsbezug |
 *
 * Die Spalten „Missionsfokus"/„Ausblendung" stehen unten WÖRTLICH als Quellbeleg
 * (`missionsfokusQuote`/`ausblendungQuote`, Muster `framing.ts`: NUR Code-Doku, bewusst nicht
 * gerendert – gerendert werden die kuratierten Sätze `fokusBelegtText`/`fokusLueckenText`/
 * `ausblendungText`).
 *
 * ZUORDNUNG TABELLENZEILE → ROLLE (Dok. 03, Abschnitt „Kanonisches Rollenmodell";
 * Builder-Entscheidung, reversibel, im Abschlussbericht ausgewiesen):
 *  - „Executive"    → R01 Executive Sponsor (wörtliche Entsprechung).
 *  - „ISMS Manager" → R03 ISMS Manager (wörtliche Entsprechung).
 *  - „Consultant"   → R10 ISMS Consultant: Dok. 06, Abschnitt „Rollenbezogene Erlebniswelten"
 *    führt die Consulting & Service World mit den Personas „Service Lead, Engagement Manager,
 *    Consultant" – „Consultant" ist dort eine EIGENE Persona neben dem Engagement Manager, und
 *    Dok. 03 führt als generische Beraterrolle R10 „ISMS Consultant" (R11 „Specialist
 *    Consultant" ist die Spezialisierung, R09 „Engagement Manager" die eigene Persona ohne
 *    eigene Tabellenzeile). R09/R11 laufen deshalb über die Welt-Ableitung.
 *  - „Service Lead" → R08 Managed Service Lead (Dok. 06 nennt die Persona „Service Lead").
 *
 * // OFFENE FRAGE O-WP020-03 (registriert): Für die übrigen acht Rollen (R02, R04–R07, R09,
 * // R11, R12) ist KEINE Variante normiert. Umgang hier (Muster O-WP016-01, reversible
 * // Anzeigeentscheidung): Rollen der Executive World erhalten die Executive-Variante, der
 * // Customer Operations World die ISMS-Manager-Variante, der Consulting & Service World die
 * // Consultant-Variante (außer R08, direkt normiert). Für die Assurance & Administration
 * // World (R07, R12) existiert KEINE Tabellenzeile – dort wird keine Betonung erfunden:
 * // kanonische Reihenfolge, sichtbar benannt.
 *
 * „AUSBLENDUNG" HEISST NIE ENTZUG (WP-Zuschnitt; Dok. 06, Abschnitt „Rollenwechsel",
 * Designregel: keine getrennten Dashboards; P02 eine Wahrheit): Jede Variante ORDNET alle
 * Kacheln – `tileOrder` enthält jede Kachel-Kennung genau einmal (per Test erzwungen). Die
 * normierten Ausblendungen sind im heutigen read-only-Datenbestand zudem gegenstandslos
 * (keine Taskdetails, keine Umsatzsicht, keine Vertriebsimpulse, kein Eskalationsbezug) –
 * das sagen die sichtbaren Texte, statt etwas zu verstecken.
 *
 * ABLEITUNGSREGEL DER REIHENFOLGE (einheitlich, Code-Doku je Variante in `orderRationale`):
 * Kacheln, deren Inhalt einen im Missionsfokus genannten Punkt BELEGT trägt, rücken in der
 * Reihenfolge ihrer Nennung nach vorn; alle übrigen folgen in kanonischer Reihenfolge.
 * Fokusinhalte OHNE Träger werden sichtbar als Lücke benannt (DR-0005) – nichts wird erfunden.
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/framing.ts`).
 */

import { getRole, worldForRole, type WorldId } from '../shell/roles';

/** Kachel-Kennungen der Ebene 1 (identisch zu den `data-tile-id`-Werten der Kacheln). */
export type TileId =
  | 'bestand'
  | 'isms_kern'
  | 'entscheidungen'
  | 'services'
  | 'lebenszyklus_zaehlung'
  | 'controls_nachweis'
  | 'risiken_minderung'
  | 'objekte_owner'
  | 'kanten_vertrauensgrad';

/** Kanonische (unpersonalisierte) Kachel-Reihenfolge – exakt die Render-Reihenfolge seit
 *  Slice 4: Statuskacheln, Lebenszyklus-Zählung, Abdeckungen. Neutral nutzt genau diese. */
export const KANONISCHE_KACHELORDNUNG: readonly TileId[] = [
  'bestand',
  'isms_kern',
  'entscheidungen',
  'services',
  'lebenszyklus_zaehlung',
  'controls_nachweis',
  'risiken_minderung',
  'objekte_owner',
  'kanten_vertrauensgrad',
] as const;

export type VariantId = 'executive' | 'isms_manager' | 'consultant' | 'service_lead';

export interface Rollenvariante {
  readonly id: VariantId;
  /** Zeilenname wörtlich aus der PDF-Tabelle „Rollenvarianten". */
  readonly name: string;
  /** Spalte „Missionsfokus" wörtlich (NUR Quellbeleg, nicht gerendert – Muster framing.ts). */
  readonly missionsfokusQuote: string;
  /** Spalte „Ausblendung" wörtlich (NUR Quellbeleg, nicht gerendert). */
  readonly ausblendungQuote: string;
  /** Quellzeile beider Zitate. */
  readonly quoteSource: string;
  /** Kachel-Reihenfolge der Ebene 1: JEDE Kachel genau einmal – Betonung, kein Entzug. */
  readonly tileOrder: readonly TileId[];
  /** SICHTBAR: welche Fokus-Kacheln belegt sind und nach vorn rücken. */
  readonly fokusBelegtText: string;
  /** SICHTBAR: welche Fokusinhalte keinen Träger haben (benannte Lücke, DR-0005). */
  readonly fokusLueckenText: string;
  /** SICHTBAR: was die normierte Ausblendung heute bedeutet + Erreichbarkeits-Zusage. */
  readonly ausblendungText: string;
  /** Ableitung der Reihenfolge im Klartext (nur Code-Doku). */
  readonly orderRationale: string;
}

const QUOTE_SOURCE =
  'Dok. 06, Abschnitt „Mission Control & Morning Mission", Tabelle „Rollenvarianten"';

const ERREICHBARKEIT =
  'Grundsätzlich wird nichts entzogen – jede Kachel, jede Tiefe und jeder Weg bleibt ' +
  'erreichbar; die Reihenfolge ist reine Betonung.';

export const ROLLENVARIANTEN: Readonly<Record<VariantId, Rollenvariante>> = {
  executive: {
    id: 'executive',
    name: 'Executive',
    missionsfokusQuote: 'Freigaben, Top-Risiken, Zielabweichung, Investition',
    ausblendungQuote: 'Operative Taskdetails',
    quoteSource: QUOTE_SOURCE,
    tileOrder: [
      'risiken_minderung',
      'bestand',
      'isms_kern',
      'entscheidungen',
      'services',
      'lebenszyklus_zaehlung',
      'controls_nachweis',
      'objekte_owner',
      'kanten_vertrauensgrad',
    ],
    fokusBelegtText:
      'Nach vorn gezogen: der erfasste Minderungs-Stand der Risiken – die einzige Kachel, ' +
      'die einen Punkt des Missionsfokus belegt trägt.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand und deshalb als Lücke ' +
      'benannt statt erfunden: Freigaben, Zielabweichung, Investition – und eine „Top"-Auswahl ' +
      'der Risiken (es gibt keine erfasste Reihung nach Bedeutung).',
    ausblendungText:
      'Die normierte Ausblendung („operative Taskdetails") ist heute gegenstandslos: der ' +
      `Datenbestand enthält keine Aufgabenobjekte. ${ERREICHBARKEIT}`,
    orderRationale:
      'Vom Missionsfokus „Freigaben, Top-Risiken, Zielabweichung, Investition" ist allein der ' +
      'Risiko-Bezug belegt (Minderungs-Abdeckung) – er rückt nach vorn; der Rest bleibt ' +
      'kanonisch. Freigaben/Zielabweichung/Investition haben keinen Träger (Lückentext).',
  },
  isms_manager: {
    id: 'isms_manager',
    name: 'ISMS Manager',
    missionsfokusQuote: 'Risiken, Maßnahmen, Evidence, Reviews, Datenlücken',
    ausblendungQuote: 'Portfolio-/Umsatzsicht',
    quoteSource: QUOTE_SOURCE,
    tileOrder: [
      'risiken_minderung',
      'isms_kern',
      'controls_nachweis',
      'objekte_owner',
      'kanten_vertrauensgrad',
      'bestand',
      'entscheidungen',
      'services',
      'lebenszyklus_zaehlung',
    ],
    fokusBelegtText:
      'Nach vorn gezogen: der Minderungs-Stand der Risiken, die ISMS-Kernobjekte (darunter ' +
      'die Maßnahmen), der Nachweis-Stand der Controls sowie die beiden Abdeckungen, die ' +
      'Datenlücken zählen (Owner je Objekt, Vertrauensgrad je Beziehung).',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Reviews (es ist kein ' +
      'Review-Vorgang erfasst).',
    ausblendungText:
      'Die normierte Ausblendung („Portfolio-/Umsatzsicht") ist heute gegenstandslos: diese ' +
      `Seite enthält weder eine Portfolio- noch eine Umsatzdarstellung. ${ERREICHBARKEIT}`,
    orderRationale:
      'Fokus-Nennungsreihenfolge: Risiken → Minderungs-Abdeckung; Maßnahmen → ISMS-Kernobjekte; ' +
      'Evidence → Nachweis-Abdeckung; Datenlücken → Owner- und Vertrauensgrad-Abdeckung. ' +
      '„Reviews" hat keinen Träger (Lückentext). Rest kanonisch.',
  },
  consultant: {
    id: 'consultant',
    name: 'Consultant',
    missionsfokusQuote: 'Mandantenpriorität, Audits, Deliverables, Kapazität, Reise',
    ausblendungQuote: 'Unbegründete Vertriebsimpulse',
    quoteSource: QUOTE_SOURCE,
    tileOrder: [
      'services',
      'bestand',
      'isms_kern',
      'entscheidungen',
      'lebenszyklus_zaehlung',
      'controls_nachweis',
      'risiken_minderung',
      'objekte_owner',
      'kanten_vertrauensgrad',
    ],
    fokusBelegtText:
      'Nach vorn gezogen: die Managed Services dieses Mandanten – an ihnen hängen die ' +
      'erfassten Deliverables.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Mandantenpriorität, ' +
      'Audits, Kapazität und Reise.',
    ausblendungText:
      'Die normierte Ausblendung („unbegründete Vertriebsimpulse") ist heute gegenstandslos: ' +
      `diese Seite enthält keine Vertriebsinhalte. ${ERREICHBARKEIT}`,
    orderRationale:
      'Vom Missionsfokus ist allein „Deliverables" belegt (an den Managed Services) – die ' +
      'Service-Kachel rückt nach vorn; der Rest bleibt kanonisch. ' +
      'Mandantenpriorität/Audits/Kapazität/Reise haben keinen Träger (Lückentext).',
  },
  service_lead: {
    id: 'service_lead',
    name: 'Service Lead',
    missionsfokusQuote: 'SLA, Eskalationen, Qualität, Auslastung, Profitabilität',
    ausblendungQuote: 'Objektdetails ohne Eskalationsbezug',
    quoteSource: QUOTE_SOURCE,
    tileOrder: [
      'services',
      'bestand',
      'isms_kern',
      'entscheidungen',
      'lebenszyklus_zaehlung',
      'controls_nachweis',
      'risiken_minderung',
      'objekte_owner',
      'kanten_vertrauensgrad',
    ],
    fokusBelegtText:
      'Nach vorn gezogen: die Managed Services dieses Mandanten – an ihnen stehen die ' +
      'erfassten SLA-Angaben.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Eskalationen, ' +
      'Servicequalität als erfasster Messwert, Auslastung und Profitabilität.',
    ausblendungText:
      'Die normierte Ausblendung („Objektdetails ohne Eskalationsbezug") ist heute ' +
      `gegenstandslos: ein Eskalationsbezug ist im Datenbestand nicht erfasst. ${ERREICHBARKEIT}`,
    orderRationale:
      'Vom Missionsfokus ist allein „SLA" belegt (an den Managed Services) – die ' +
      'Service-Kachel rückt nach vorn; der Rest bleibt kanonisch. ' +
      'Eskalationen/Qualität/Auslastung/Profitabilität haben keinen Träger (Lückentext).',
  },
};

/** Direkt normierte Rollen (Zuordnungsbegründung im Kopfkommentar). */
export const NORMIERTE_ROLLEN: Readonly<Record<string, VariantId>> = {
  R01: 'executive',
  R03: 'isms_manager',
  R10: 'consultant',
  R08: 'service_lead',
} as const;

/**
 * Welt-Ableitung der übrigen Rollen (O-WP020-03, reversible Anzeigeentscheidung):
 * `null` = keine Variante (Assurance & Administration World hat keine Tabellenzeile;
 * es wird keine Betonung erfunden).
 */
export const WELT_VARIANTE: Readonly<Record<WorldId, VariantId | null>> = {
  executive: 'executive',
  operations: 'isms_manager',
  consulting: 'consultant',
  assurance: null,
} as const;

/** Herkunft der angewendeten Variante – sichtbar benannt (normiert vs. abgeleitet vs. keine). */
export type VariantHerkunft = 'normiert' | 'welt' | 'keine';

export interface VariantZuordnung {
  readonly variante: Rollenvariante | null;
  readonly herkunft: VariantHerkunft;
}

/**
 * Variante einer Rolle. `null`-Rolle (neutral) und unbekannte IDs erhalten KEINE Variante –
 * neutral bleibt die kanonische Reihenfolge (DR-0009), Unbekanntes wird nicht gedeutet.
 */
export function varianteForRole(roleId: string | null): VariantZuordnung {
  if (roleId === null) return { variante: null, herkunft: 'keine' };
  const normiert = NORMIERTE_ROLLEN[roleId];
  if (normiert) return { variante: ROLLENVARIANTEN[normiert], herkunft: 'normiert' };
  const role = getRole(roleId);
  if (!role) return { variante: null, herkunft: 'keine' };
  const abgeleitet = WELT_VARIANTE[worldForRole(role).id];
  if (abgeleitet) return { variante: ROLLENVARIANTEN[abgeleitet], herkunft: 'welt' };
  return { variante: null, herkunft: 'keine' };
}

/** Kachel-Reihenfolge einer Rolle (bzw. kanonisch für neutral/ohne Variante). */
export function kachelOrdnungForRole(roleId: string | null): readonly TileId[] {
  return varianteForRole(roleId).variante?.tileOrder ?? KANONISCHE_KACHELORDNUNG;
}

/** SICHTBARER Text für Rollen ohne normierte Variante (Assurance & Administration World). */
export const KEINE_VARIANTE_TEXT =
  'Für diese Rolle ist keine Variante normiert, und ihre Erlebniswelt hat in der ' +
  'Konzept-Tabelle der Rollenvarianten keine Zeile. Die Kacheln stehen deshalb in der ' +
  'kanonischen Reihenfolge – es wird keine Betonung erfunden.';
