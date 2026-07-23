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
 * (`missionsfokusQuote`/`ausblendungQuote`, Muster `framing.ts`).
 *
 * SICHTBARER TEXT SEIT WP-028 SLICE 3 (DR-0013 Nr. 5 „Rollenfokus ohne Beipackzettel"):
 * Die Personalisierung sortiert STILL um. Sichtbar bleibt HÖCHSTENS EIN Nutzen-Satz
 * (`nutzenSatz`, z. B. „Für die Executive-Sicht zuerst: Risiko-Minderung."). Aus der
 * Oberfläche verschwunden sind die Design-Theorie-Sätze („im Konzept normiert", „reversible
 * Anzeigeentscheidung", „gegenstandslos", „Betonung") und der aufklappbare „Quelle der
 * Variante"-Block mit den wörtlichen Spaltenzitaten – beides lebt ab jetzt in dieser
 * Code-Doku, wo es hingehört. Die Zitat-Felder bleiben als QUELLBELEG erhalten (per Test gegen
 * die PDF-Tabelle festgenagelt), werden aber nicht mehr gerendert.
 *
 * WAS NICHT VERSCHWINDET (Ehrlichkeits-Substanz, DR-0005/DR-0013-Grenze): welche Fokusinhalte
 * KEINEN Träger haben (`fokusLueckenText`, mandantenabhängig über `fokusLueckenTextFuer`), ob
 * die betonten Kacheln für den aktiven Mandanten überhaupt Bestand tragen
 * (`fokusBelegtTextFuer`) und die Zusage, dass nichts entzogen wird (`ausblendungText`).
 * Diese drei Aussagen stehen weiterhin vollständig im DOM – nur ruhig, in einem
 * `<details>`-Element statt als dreiabsätziger Beipackzettel über den Kacheln.
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
 * normierten Ausblendungen haben im heutigen read-only-Datenbestand ohnehin keinen Gegenstand
 * (keine Taskdetails, keine Umsatzsicht, keine Vertriebsimpulse, kein Eskalationsbezug); der
 * sichtbare `ausblendungText` sagt das seit WP-028 Slice 3 in Datensprache („der Datenbestand
 * enthält keine …") statt in Konzeptsprache („die normierte Ausblendung ist gegenstandslos").
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
  /**
   * Spalte „Missionsfokus" WÖRTLICH – reiner Quellbeleg. Seit WP-028 Slice 3 NICHT mehr
   * gerendert (DR-0013 Nr. 5); der Wächter von „Heute" prüft ausdrücklich, dass das Zitat nicht
   * im Produkttext auftaucht. Es bleibt hier, weil ein Test es gegen die PDF-Tabelle festnagelt.
   */
  readonly missionsfokusQuote: string;
  /** Spalte „Ausblendung" wörtlich – Quellbeleg, nicht gerendert (s. `missionsfokusQuote`). */
  readonly ausblendungQuote: string;
  /** Quellzeile beider Zitate – Code-Doku, nicht gerendert. */
  readonly quoteSource: string;
  /** Kachel-Reihenfolge der Ebene 1: JEDE Kachel genau einmal – Betonung, kein Entzug. */
  readonly tileOrder: readonly TileId[];
  /** Die vom Missionsfokus nach vorn gezogenen Kacheln (die Köpfe der `tileOrder`). */
  readonly fokusKacheln: readonly TileId[];
  /**
   * DER EINE sichtbare Satz der Variante (DR-0013 Nr. 5): Nutzen statt Design-Theorie –
   * „Für die Executive-Sicht zuerst: Risiko-Minderung." Er beschreibt, WAS oben steht, nicht
   * WARUM das Konzept es so vorsieht. Nennt keine Konzept-Normativität und keinen Feldnamen.
   */
  readonly nutzenSatz: string;
  /**
   * RUHIG SICHTBAR (Aufklappteil): welche Fokus-Kacheln nach vorn rücken. Bewusst TRÄGER-neutral
   * formuliert („die Kachel zu …"), weil die Kachel je Mandant auch leer sein kann – ob sie für
   * den AKTIVEN Mandanten Bestand trägt, ergänzt `fokusBestandHinweisFuer` aus der echten
   * Kachellage (Review-Finding: der statische Text behauptete Belegtheit, die z. B. der
   * Consulting Operator nicht hat).
   */
  readonly fokusBelegtText: string;
  /** RUHIG SICHTBAR: welche Fokusinhalte keinen Träger haben (benannte Lücke, DR-0005). */
  readonly fokusLueckenText: string;
  /** RUHIG SICHTBAR: was heute an Ausblendbarem erfasst ist + Erreichbarkeits-Zusage. */
  readonly ausblendungText: string;
  /** Ableitung der Reihenfolge im Klartext (nur Code-Doku). */
  readonly orderRationale: string;
}

const QUOTE_SOURCE =
  'Dok. 06, Abschnitt „Mission Control & Morning Mission", Tabelle „Rollenvarianten"';

/**
 * Erreichbarkeits-Zusage – die EINE Wahrheit je Rolle (Dok. 06 P02): kein Entzug, nur
 * Reihenfolge. Wortlaut seit WP-028 Slice 3 ohne den Design-Begriff „Betonung" (DR-0013 Nr. 5);
 * die Aussage selbst bleibt unverändert und weiterhin per Test erzwungen.
 */
const ERREICHBARKEIT =
  'Es wird nichts entzogen – jede Kachel, jede Tiefe und jeder Weg bleibt erreichbar; ' +
  'unterschiedlich ist allein die Reihenfolge.';

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
    fokusKacheln: ['risiken_minderung'],
    nutzenSatz: 'Für die Executive-Sicht zuerst: Risiko-Minderung.',
    fokusBelegtText:
      'Nach vorn gezogen: die Kachel zum Minderungs-Stand der Risiken – der einzige Punkt ' +
      'des Missionsfokus mit einem Kachel-Träger.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand und deshalb als Lücke ' +
      'benannt statt erfunden: Freigaben, Zielabweichung, Investition – und eine „Top"-Auswahl ' +
      'der Risiken (es gibt keine erfasste Reihung nach Bedeutung).',
    ausblendungText: `${ERREICHBARKEIT} Operative Aufgabenobjekte enthält der Datenbestand nicht.`,
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
    fokusKacheln: [
      'risiken_minderung',
      'isms_kern',
      'controls_nachweis',
      'objekte_owner',
      'kanten_vertrauensgrad',
    ],
    nutzenSatz:
      'Für die ISMS-Sicht zuerst: Risiko-Minderung, ISMS-Kernobjekte, Nachweise und Datenlücken.',
    fokusBelegtText:
      'Nach vorn gezogen: die Kacheln zu Risiko-Minderung, ISMS-Kernobjekten (darunter die ' +
      'Maßnahmen), Nachweis-Stand der Controls und den beiden Datenlücken-Zählungen ' +
      '(Owner je Objekt, Vertrauensgrad je Beziehung).',
    // MANDANT-INVARIANTER Kern (wahr für JEDEN Mandanten): keine Ebene-1-Kachel zeigt Reviews,
    // und ein ISMS-Review-Vorgang als eigener Typ ist nicht erfasst. Die mandantenspezifische
    // Existenzaussage über einen vorhandenen Service-Outcome-Review ergänzt `fokusLueckenTextFuer`
    // NUR, wenn der aktive Mandant wirklich ein `Review`-Objekt trägt (Domain-Review 2. Runde:
    // der statische Satz war für den Consulting Operator – ohne Review – eine Fehlbehauptung).
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne eigene Kachel: Reviews – auf Ebene 1 zeigt keine ' +
      'Kachel Reviews; ein ISMS-Review-Vorgang mit Person, Zeitpunkt und Ergebnis ist nicht als ' +
      'eigener Typ erfasst.',
    ausblendungText: `${ERREICHBARKEIT} Eine Portfolio- oder Umsatzdarstellung enthält diese Seite ohnehin nicht.`,
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
    fokusKacheln: ['services'],
    nutzenSatz: 'Für die Beratungs-Sicht zuerst: die Managed Services mit ihren Deliverables.',
    fokusBelegtText:
      'Nach vorn gezogen: die Kachel der Managed Services – an ihnen hängen die Deliverables.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Mandantenpriorität, ' +
      'Audits, Kapazität und Reise.',
    ausblendungText: `${ERREICHBARKEIT} Vertriebsinhalte enthält diese Seite ohnehin nicht.`,
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
    fokusKacheln: ['services'],
    nutzenSatz: 'Für die Service-Sicht zuerst: die Managed Services mit ihren SLA-Angaben.',
    fokusBelegtText:
      'Nach vorn gezogen: die Kachel der Managed Services – an ihnen stehen die SLA-Angaben ' +
      'je Service.',
    fokusLueckenText:
      'Vom Missionsfokus dieser Variante ohne Träger im Datenbestand: Eskalationen, ' +
      'Servicequalität als erfasster Messwert, Auslastung und Profitabilität.',
    ausblendungText: `${ERREICHBARKEIT} Ein Eskalationsbezug ist im Datenbestand nicht erfasst.`,
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

/**
 * RUHIG SICHTBARER Reihenfolge-Satz FÜR DEN AKTIVEN MANDANTEN (Review-Finding Domain F2): der
 * statische Varianten-Text beschreibt, WELCHE Kacheln der Fokus nach vorn zieht; ob sie für den
 * aktiven Mandanten Bestand tragen, entscheidet die echte Kachellage (`hatDaten`, abgeleitet aus
 * dem Dashboard-Modell: Grundgesamtheit bzw. Zählwerte > 0). Tragen Fokus-Kacheln keinen
 * Bestand, wird das gesagt statt behauptet – die Kacheln selbst benennen ihre Lücke zusätzlich.
 *
 * Seit WP-028 Slice 3 (DR-0013 Nr. 5) steht dieser Satz im Aufklappteil des Rollenfokus, nicht
 * mehr als Absatz über den Kacheln. Die AUSSAGE ist unverändert – nur ihre Dosierung.
 */
export function fokusBelegtTextFuer(
  variante: Rollenvariante,
  hatDaten: ReadonlyMap<TileId, boolean>,
): string {
  const leere = variante.fokusKacheln.filter((id) => hatDaten.get(id) === false);
  if (leere.length === 0) return variante.fokusBelegtText;
  const alleLeer = leere.length === variante.fokusKacheln.length;
  return (
    variante.fokusBelegtText +
    (alleLeer
      ? ' Für den aktiven Mandanten tragen diese Kacheln derzeit keinen Bestand – sie benennen ihre Lücke selbst.'
      : ' Für den aktiven Mandanten tragen nicht alle diese Kacheln Bestand – die betroffenen benennen ihre Lücke selbst.')
  );
}

/**
 * SICHTBARER Fokus-Lückentext FÜR DEN AKTIVEN MANDANTEN (Domain-Review 2. Runde): der
 * `fokusLueckenText` ist mandant-invariant. Nur der ISMS-Manager benennt zusätzlich einen
 * konkret VORHANDENEN Service-Outcome-Review – und das ausschließlich, wenn der aktive Mandant
 * wirklich ein `Review`-Objekt trägt (`hatReview`). Sonst bliebe es eine Fehlbehauptung
 * (Consulting Operator hat keinen Review). Der Zusatz hängt hinten an, damit der Basistext
 * Präfix bleibt (bestehende `toContain`-Prüfungen greifen unverändert).
 */
export function fokusLueckenTextFuer(variante: Rollenvariante, hatReview: boolean): string {
  if (variante.id !== 'isms_manager' || !hatReview) return variante.fokusLueckenText;
  return (
    `${variante.fokusLueckenText} Der Datenbestand dieses Mandanten trägt einen ` +
    'Service-Outcome-Review (Ort „Services") und Bestätigungsstufen je Datensatz – auf Ebene 1 ' +
    'erscheint er nicht.'
  );
}

/**
 * Warum Rollen ohne normierte Variante GAR KEINEN Rollenfokus zeigen (WP-028 Slice 3,
 * DR-0013 Nr. 5) – Code-Doku, nicht mehr gerendert.
 *
 * Bis WP-020 stand für die Assurance & Administration World ein sichtbarer Kasten auf der
 * Seite: „Für diese Rolle ist keine Variante normiert, und ihre Erlebniswelt hat in der
 * Konzept-Tabelle der Rollenvarianten keine Zeile. Die Kacheln stehen deshalb in der
 * kanonischen Reihenfolge – es wird keine Betonung erfunden."
 *
 * Das ist eine Aussage über die KONZEPT-Tabelle und über eine Design-Entscheidung, keine
 * Aussage über die Daten des Mandanten – genau die Sorte Selbstkommentar, die DR-0013
 * aus der Oberfläche nimmt. Die REGEL bleibt scharf und ist unverändert testbar: Rollen ohne
 * Tabellenzeile erhalten die KANONISCHE Reihenfolge, es wird keine Reihenfolge erfunden
 * (`kachelOrdnungForRole` + Test „Assurance-Rollen erhalten BEWUSST keine Betonung").
 * Sichtbar ist das Ergebnis: dieselbe Reihenfolge wie im neutralen Zustand, ohne Fokus-Kasten.
 */
export const KEINE_VARIANTE_BEGRUENDUNG =
  'Assurance & Administration World: keine Zeile in der Tabelle „Rollenvarianten" – ' +
  'kanonische Reihenfolge, keine erfundene Reihenfolge, kein sichtbarer Rollenfokus.';
