/**
 * Berichts- und Präsentationsstruktur des Ortes „Reports" (WP-032 Slice 2, read-only).
 *
 * QUELLE (Regel Null, am PDF gegengelesen – zitiert wird der Abschnittstitel, weil die
 * Nummerierung abweicht): Dok. 12 „Reporting-, PDF- & Präsentations-Engine", Abschnitte
 *  - „Kanonisches Report Package" (Pflichtfelder; Lebenszyklus),
 *  - „Report- und Artefakttypen" (fünf Gruppen: Management und Executive; CISO und
 *    ISMS-Betrieb; Audit und Assurance; Managed Services und Beratung; Operative und
 *    zielgruppenspezifische Auszüge),
 *  - „Content-Block-Architektur" (Kanonische Blocktypen mit Funktion und Mindestanforderung),
 *  - „Kanonischer Case-Katalog" (die wiederverwendbaren Presentation Cases),
 *  - „Geschützte manuelle Inhalte" (locked / review-on-change / replaceable),
 *  - „Daten-Snapshots und Reproduzierbarkeit" (Frozen Snapshot; Live Preview versus
 *    freigegebene Fassung),
 *  - „Claims, Quellen und Nachvollziehbarkeit" (Claim-Modell),
 *  - „Reporting-Verfassung" (Was die Engine bewusst verhindert).
 *
 * WAS DIESE DATEI IST – UND WAS NICHT:
 *  - Sie beschreibt die STRUKTUR, die das Produkt vorsieht: welche Berichte es geben wird und
 *    woraus ein Bericht besteht. Sie enthält KEINEN erzeugten Bericht, KEINEN Bericht des
 *    Datenbestands und KEINE Zuordnung „Berichtstyp ↔ Objekt dieses Mandanten" – eine solche
 *    Zuordnung wäre eine Wertung ohne Datenträger (DR-0008).
 *  - Ein „Report Package" ist im heutigen Objektvertrag KEIN Objekt (offene Frage O-WP032-01);
 *    der Katalog lebt deshalb als quellenbelegte Konzeptkonstante (Muster Servicekatalog),
 *    nicht als Bestandsabfrage.
 *  - PREISFREI (O-KUNDE-01): Die Quelle nennt an mehreren Stellen Preis-, Kosten- und
 *    Budgetstellen (Investment Brief, Risk Investment Case, Service Proposal, Route View).
 *    Diese STRUKTURWÖRTER bleiben wörtlich erhalten – es wird aber nirgends ein Betrag, ein
 *    Währungszeichen oder ein Preisband ausgegeben, und die Seite benennt die Preislücke
 *    ausdrücklich. Wörter streichen wäre eine stille Konzeptänderung, Zahlen erfinden wäre
 *    schlimmer.
 *
 * React-frei und statisch, damit die Kardinalitäten deterministisch gegen das PDF testbar sind
 * (Muster `lib/administration/modell.ts`).
 */

/* -----------------------------------------------------------------------------
 * Report- und Artefakttypen (Dok. 12, Abschnitt „Report- und Artefakttypen")
 * --------------------------------------------------------------------------- */

export interface ReportTyp {
  /** Name des Reporttyps, wörtlich. */
  readonly name: string;
  /** Spalte „Ziel" bzw. die Kurzbeschreibung der Quelle; leer, wo die Quelle nur den Namen führt. */
  readonly ziel?: string;
  /** Spalte „Typische Inhalte", wörtlich (nur in der Gruppe „Management und Executive" geführt). */
  readonly inhalte?: string;
}

export interface ReportGruppe {
  /** Gruppentitel, wörtlich aus der Quelle. */
  readonly titel: string;
  readonly typen: readonly ReportTyp[];
}

/**
 * Die fünf Gruppen mit zusammen 43 Berichts- und Artefakttypen, wort- und reihenfolgetreu.
 * Nur die erste Gruppe führt in der Quelle eine Tabelle mit „Ziel" und „Typische Inhalte";
 * die übrigen vier sind Aufzählungen – das wird hier nicht künstlich angeglichen (es würde
 * Inhalt erfinden).
 */
export const REPORT_GRUPPEN: readonly ReportGruppe[] = [
  {
    titel: 'Management und Executive',
    typen: [
      {
        name: 'Executive One-Pager',
        ziel: 'Lage und Entscheidungen in unter fünf Minuten erfassen',
        inhalte: 'Zielstatus, Top-Risiken, Trend, Entscheidung, Investition, nächste Meilensteine',
      },
      {
        name: 'Vorstandspräsentation',
        ziel: 'formale Managemententscheidung vorbereiten',
        inhalte: 'Kernbotschaft, Business Impact, Optionen, Empfehlung, Beschlussvorlage, Appendix',
      },
      {
        name: 'Management Review Pack',
        ziel: 'ISMS-Managementreview durchführen und dokumentieren',
        inhalte: 'KPI, Audits, Incidents, Ressourcen, Verbesserungen, Entscheidungen, Actions',
      },
      {
        name: 'Investment Brief',
        ziel: 'Budgetentscheidung vergleichen',
        inhalte: 'Baseline, Optionen, Kostenband, Risikowirkung, Kapazität, Nichtstun-Szenario',
      },
      {
        name: 'Change Brief',
        ziel: 'wesentliche Änderung verständlich machen',
        inhalte: 'Ereignis, betroffene Ziele, Ursache, Route, Entscheidung, Frist',
      },
    ],
  },
  {
    titel: 'CISO und ISMS-Betrieb',
    typen: [
      { name: 'monatlicher oder quartalsweiser ISMS-Statusbericht' },
      { name: 'Risiko- und Toleranzbericht' },
      { name: 'Reifegrad- und Zielpfadbericht' },
      { name: 'Control-Wirksamkeitsbericht' },
      { name: 'Maßnahmen- und Finding-Report' },
      { name: 'Supplier-Risk-Bericht' },
      { name: 'Incident- und Threat-Impact-Briefing' },
      { name: 'Policy- und Dokumentenreviewbericht' },
      { name: 'Evidence-Qualitätsreport' },
      { name: 'kontinuierlicher Verbesserungsbericht' },
    ],
  },
  {
    titel: 'Audit und Assurance',
    typen: [
      { name: 'Audit Readiness Pack' },
      { name: 'Audit Kick-off Deck' },
      { name: 'Scope- und Terminplan' },
      { name: 'Evidence Request List' },
      { name: 'Control Test Pack' },
      { name: 'Findings- und Maßnahmenbericht' },
      { name: 'Management Response Pack' },
      { name: 'Statement-of-Applicability-Auszug' },
      { name: 'Audit Trail und Change Log' },
      { name: 'Abschlussbericht und Follow-up Pack' },
    ],
  },
  {
    titel: 'Managed Services und Beratung',
    typen: [
      { name: 'Service Onboarding Pack' },
      { name: 'Monats- und Quartalsservicebericht' },
      { name: 'SLA- und Delivery-Bericht' },
      { name: 'Service Value Report' },
      { name: 'Kapazitäts- und Reiseplan' },
      { name: 'Kundenmeeting-Deck' },
      { name: 'Workshop-Unterlagen' },
      { name: 'Opportunity- und Erweiterungsvorschlag' },
      { name: 'Handover- und Transition Pack' },
      { name: 'Serviceverbesserungsbericht' },
      { name: 'Portfolio- und Practice-Report' },
    ],
  },
  {
    titel: 'Operative und zielgruppenspezifische Auszüge',
    typen: [
      {
        name: 'Owner Brief',
        ziel: 'Was muss ich tun, warum, bis wann und welcher Nachweis zählt?',
      },
      { name: 'Supplier Request Pack', ziel: 'kontrollierte externe Nachweisanfrage' },
      { name: 'Meeting Handout', ziel: 'aktuelle Decisions, Actions und Kontext' },
      {
        name: 'On-site Audit Pack',
        ziel: 'Agenda, Reise, Ansprechpartner, Scope, offene Evidenzen',
      },
      { name: 'Action Tracker', ziel: 'freigegebener Auszug für Umsetzungsteams' },
      { name: 'Regulatorischer Auszug', ziel: 'definierte Anforderungen, Mapping und Status' },
      {
        name: 'Kundenportal-Update',
        ziel: 'verdichtete sichtbare Fortschritte ohne interne Notizen',
      },
    ],
  },
] as const;

/** Gesamtzahl der Berichts- und Artefakttypen über alle fünf Gruppen (aus der Struktur gezählt). */
export function reportTypenAnzahl(): number {
  return REPORT_GRUPPEN.reduce((summe, gruppe) => summe + gruppe.typen.length, 0);
}

/* -----------------------------------------------------------------------------
 * Kanonischer Case-Katalog (Dok. 12, Abschnitt „Kanonischer Case-Katalog")
 * --------------------------------------------------------------------------- */

export interface PresentationCase {
  readonly name: string;
  /** Beschreibung, wörtlich aus der Quelle. */
  readonly inhalt: string;
}

/**
 * Die zwölf wiederverwendbaren Presentation Cases, wort- und reihenfolgetreu.
 * Die Quelle sagt „enthält mindestens folgende" – der Katalog ist also nicht abschließend;
 * das steht als Hinweis im Produkt (`CASE_KATALOG_HINWEIS`), damit die Zahl keine Grenze
 * behauptet, die die Quelle nicht zieht.
 */
export const PRESENTATION_CASES: readonly PresentationCase[] = [
  {
    name: 'Executive Board Update',
    inhalt: 'Geschäftsrisiken, Zielerreichung, Entscheidungen und Investitionsoptionen.',
  },
  {
    name: 'CISO Monthly Review',
    inhalt: 'Risiko-, Control-, Incident-, Maßnahmen- und Zieltrend.',
  },
  {
    name: 'ISMS Management Review',
    inhalt: 'Management-Review-Eingaben, Beschlüsse und Folgeaktionen.',
  },
  {
    name: 'Audit Readiness & Kick-off',
    inhalt: 'Scope, Readiness, Evidence-Lücken, Termine, Reisen und Owner.',
  },
  {
    name: 'Risk Investment Case',
    inhalt: 'Optionen, Kostenband, Risikowirkung, Kapazität und Nichtstun-Szenario.',
  },
  {
    name: 'Managed Service Review',
    inhalt: 'Delivery, SLA, Outcome, Automatisierung, Value Ledger und Verbesserungen.',
  },
  {
    name: 'Customer Workshop',
    inhalt: 'Agenda, Ausgangslage, Zielbild, Fragen, Entscheidungs- und Arbeitsfolien.',
  },
  {
    name: 'Incident Executive Update',
    inhalt: 'Lage, Business Impact, Maßnahmen, Entscheidungen und Zeitachse.',
  },
  {
    name: 'Consultant Meeting Prep',
    inhalt: 'automatisch vorbereitetes Kundentermin-Deck mit Prioritäten und Gesprächszielen.',
  },
  {
    name: 'Service Proposal',
    inhalt:
      'empfohlene Servicebausteine, Verantwortungsverteilung, Nutzen und transparente Preisannahmen.',
  },
  {
    name: 'Portfolio Review',
    inhalt: 'mehrere Mandanten, Kapazität, Risiken, Reiseplanung, Qualität und Opportunities.',
  },
  {
    name: 'Handover & Transition Pack',
    inhalt:
      'Service-, Personen-, Anbieter- oder Auditübergabe mit offenen Punkten und Verantwortlichkeiten.',
  },
] as const;

/** Aus „Die erste Produktbibliothek enthält mindestens folgende …" – die Zahl ist kein Deckel. */
export const CASE_KATALOG_HINWEIS =
  'Diese Sammlung ist als erste Produktbibliothek beschrieben und ausdrücklich nicht abschließend.';

/* -----------------------------------------------------------------------------
 * Kanonisches Report Package (Dok. 12, Abschnitt „Kanonisches Report Package")
 * --------------------------------------------------------------------------- */

export interface ReportPackageFeld {
  /** Spalte „Feld", wörtlich. */
  readonly feld: string;
  /** Spalte „Bedeutung", wörtlich. */
  readonly bedeutung: string;
}

/** Die fünfzehn Pflichtfelder, wort- und reihenfolgetreu. */
export const REPORT_PACKAGE_FELDER: readonly ReportPackageFeld[] = [
  { feld: 'Identität', bedeutung: 'Report-ID, Titel, Typ, Mandant, Version, Status und Sprache' },
  {
    feld: 'Kommunikationsziel',
    bedeutung: 'Welche Entscheidung, Transparenz, Prüfung oder Handlung soll unterstützt werden?',
  },
  {
    feld: 'Zielgruppe',
    bedeutung: 'primäre und sekundäre Audience, Rollen, Wissensniveau und erwartete Reaktion',
  },
  {
    feld: 'Scope',
    bedeutung: 'Unternehmen, Einheiten, Services, Standards, Audits, Risiken oder Zeitraum',
  },
  { feld: 'Snapshot', bedeutung: 'Stichtag, Datenzeitraum, Filter, Methoden- und Objektversionen' },
  { feld: 'Storyline', bedeutung: 'Kernaussage, Dramaturgie, Kapitel- oder Folienplan' },
  {
    feld: 'Content Blocks',
    bedeutung: 'referenzierte Charts, Tabellen, Claims, Empfehlungen, Evidenzen und Anhänge',
  },
  { feld: 'Owner', bedeutung: 'fachlich verantwortliche Person oder Rolle' },
  {
    feld: 'Reviewer',
    bedeutung: 'Zahlen-, Fach-, Security-, Legal-, Brand- oder Quality-Reviewer nach Regel',
  },
  {
    feld: 'Approver',
    bedeutung: 'autorisierte Freigaberolle für Veröffentlichung oder externe Verteilung',
  },
  {
    feld: 'Klassifikation',
    bedeutung: 'Datenklasse, Vertraulichkeit, Empfänger- und Exportregeln',
  },
  {
    feld: 'Artefakte',
    bedeutung: 'erzeugte PPTX-, PDF-, Web-, Handout-, Appendix- und Datenexportversionen',
  },
  {
    feld: 'Verteilung',
    bedeutung: 'Empfänger, Kanal, Ablaufdatum, Abrufe und Widerrufsmöglichkeiten',
  },
  {
    feld: 'Historie',
    bedeutung: 'Entwürfe, Reviews, Änderungen, Freigaben, Exporte und Verteilungsevents',
  },
  {
    feld: 'Outcome',
    bedeutung: 'besprochene Entscheidung, Folgeaktionen, Feedback und Value-Ledger-Eintrag',
  },
] as const;

/**
 * Die elf Stationen des Lebenszyklus, wörtlich und in Reihenfolge (Abschnitt „Kanonisches
 * Report Package", Lebenszyklus).
 */
export const REPORT_LEBENSZYKLUS: readonly string[] = [
  'geplant',
  'Daten werden geprüft',
  'Entwurf erzeugt',
  'in fachlicher Prüfung',
  'Änderungen erforderlich',
  'zur Freigabe',
  'freigegeben',
  'veröffentlicht',
  'verteilt',
  'abgelaufen/ersetzt',
  'archiviert',
] as const;

/** Die vier Zusatzstatus, wörtlich (Bezeichnung + Bedeutung). */
export const REPORT_ZUSATZSTATUS: readonly ReportPackageFeld[] = [
  { feld: 'blockiert', bedeutung: 'erforderliche Daten, Freigabe oder Klassifikation fehlt' },
  {
    feld: 'zurückgezogen',
    bedeutung: 'veröffentlichte Fassung darf nicht weiterverwendet werden',
  },
  { feld: 'fehlgeschlagen', bedeutung: 'Rendering oder Verteilung ist technisch gescheitert' },
  {
    feld: 'manuell abgezweigt',
    bedeutung: 'exportierte Datei wurde außerhalb der Plattform verändert',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Content-Block-Architektur (Dok. 12, Abschnitt „Content-Block-Architektur")
 * --------------------------------------------------------------------------- */

export interface ContentBlockTyp {
  /** Spalte „Blocktyp", wörtlich. */
  readonly name: string;
  /** Spalte „Funktion", wörtlich. */
  readonly funktion: string;
  /** Spalte „Mindestanforderung", wörtlich – das ist die Ehrlichkeitsspalte des Modells. */
  readonly mindestanforderung: string;
}

/** Die fünfzehn kanonischen Blocktypen, wort- und reihenfolgetreu. */
export const CONTENT_BLOCK_TYPEN: readonly ContentBlockTyp[] = [
  {
    name: 'Key Message',
    funktion: 'eine klare, begründete Kernaussage',
    mindestanforderung: 'Claim, Quelle, Zeitraum, Owner, Confidence',
  },
  {
    name: 'Decision Card',
    funktion: 'Entscheidung strukturiert vorbereiten',
    mindestanforderung: 'Optionen, Empfehlung, Wirkung, Annahmen, Freigabe',
  },
  {
    name: 'KPI Card',
    funktion: 'einzelne Kennzahl mit Kontext',
    mindestanforderung: 'Definition, Einheit, Ziel, Trend, Aktualität, Datenvertrauen',
  },
  {
    name: 'Trend Chart',
    funktion: 'Entwicklung oder Forecast zeigen',
    mindestanforderung: 'Zeitraum, Baseline, Methode, Ereignismarker, Quelle',
  },
  {
    name: 'Risk Landscape',
    funktion: 'priorisierte Risiko- oder Szenariosicht',
    mindestanforderung: 'Methode, Appetite, Aggregation, Drill-down',
  },
  {
    name: 'Route View',
    funktion: 'Ist-Ziel-Weg und Alternativen',
    mindestanforderung: 'Zielprofil, Meilensteine, Kapazität, Kosten, Annahmen',
  },
  {
    name: 'Impact Chain',
    funktion: 'Ursache-Wirkungs-Zusammenhang',
    mindestanforderung: 'verbundene Objekte, Richtung, Confidence, Erklärung',
  },
  {
    name: 'Action Block',
    funktion: 'nächste Arbeit verbindlich machen',
    mindestanforderung: 'Owner, Fälligkeit, Outcome, DoD, Status',
  },
  {
    name: 'Control/Evidence Block',
    funktion: 'Wirksamkeit und Nachweise darstellen',
    mindestanforderung: 'Control-Version, Test, Evidence, Gültigkeit, Reviewer',
  },
  {
    name: 'Service Value Block',
    funktion: 'Leistung und Nutzen zeigen',
    mindestanforderung: 'Serviceumfang, Aktivität, Outcome, Zeit-/Risikowirkung',
  },
  {
    name: 'Timeline',
    funktion: 'relevante Veränderungen erzählen',
    mindestanforderung: 'Event, Datum, Quelle, Bedeutung, Verknüpfung',
  },
  {
    name: 'Recommendation',
    funktion: 'fachliche Empfehlung formulieren',
    mindestanforderung: 'Problem, Option, Begründung, Grenzen, Owner',
  },
  {
    name: 'Data Quality Block',
    funktion: 'Datenlage transparent machen',
    mindestanforderung: 'Vollständigkeit, Aktualität, Konflikte, Lücken, Konsequenz',
  },
  {
    name: 'Methodology Note',
    funktion: 'Berechnung oder Bewertung erklären',
    mindestanforderung: 'Version, Parameter, Gültigkeit, Owner',
  },
  {
    name: 'Evidence Appendix',
    funktion: 'prüfbare Details bereitstellen',
    mindestanforderung: 'Index, Herkunft, Hash/Version, Zugriff, Klassifikation',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Nachvollziehbarkeit: Claim, Snapshot, Fassungen, geschützte Inhalte
 * --------------------------------------------------------------------------- */

/**
 * Die neun Bestandteile einer materialen Aussage (Abschnitt „Claims, Quellen und
 * Nachvollziehbarkeit", Claim-Modell), wörtlich und in Reihenfolge.
 */
export const CLAIM_BESTANDTEILE: readonly string[] = [
  'Aussage',
  'Typ: Fakt, Interpretation, Prognose, Empfehlung oder Annahme',
  'unterstützende Daten und Objekte',
  'Methode oder Regel',
  'Gültigkeitszeitraum',
  'Confidence',
  'Owner und Reviewer',
  'erlaubte Zielgruppen',
  'letzte Aktualisierung',
] as const;

/**
 * Die acht Bestandteile eines eingefrorenen Datenstands (Abschnitt „Daten-Snapshots und
 * Reproduzierbarkeit", Frozen Snapshot), wörtlich und in Reihenfolge.
 */
export const SNAPSHOT_BESTANDTEILE: readonly string[] = [
  'Objekt- und Beziehungsversionen',
  'Stichtag und Datenzeitraum',
  'angewendete Filter',
  'Bewertungs- und KPI-Methoden',
  'Zielprofil und Appetite-Version',
  'verfügbare Evidence- und Confidence-Werte',
  'verwendete Threat- oder externe Datenstände',
  'Währungs-, Zeit- und Lokalisierungsparameter',
] as const;

/** Die vier Fassungen aus „Live Preview versus freigegebene Fassung", wörtlich. */
export const REPORT_FASSUNGEN: readonly ReportPackageFeld[] = [
  {
    feld: 'Live Preview',
    bedeutung: 'aktualisiert sich mit aktuellen Daten und ist klar als dynamisch markiert',
  },
  { feld: 'Frozen Draft', bedeutung: 'stabiler Datenstand für Review' },
  { feld: 'Released Artifact', bedeutung: 'unveränderbarer, freigegebener Snapshot' },
  {
    feld: 'Current Web View',
    bedeutung: 'zeigt aktuelle Daten und verweist auf die letzte freigegebene Fassung',
  },
] as const;

/** Die drei Schutzklassen manueller Inhalte (Abschnitt „Geschützte manuelle Inhalte"), wörtlich. */
export const MANUELLE_INHALTE: readonly ReportPackageFeld[] = [
  {
    feld: 'locked',
    bedeutung:
      'bleibt bei automatischen Updates unverändert; Änderung nur durch berechtigten Owner',
  },
  {
    feld: 'review-on-change',
    bedeutung:
      'bleibt erhalten, wird aber bei relevanten Datenänderungen zur fachlichen Prüfung markiert',
  },
  { feld: 'replaceable', bedeutung: 'darf aus aktuellem Snapshot und Template neu erzeugt werden' },
] as const;

/**
 * Die zehn Dinge, die die Engine bewusst verhindert (Abschnitt „Reporting-Verfassung",
 * „Was die Engine bewusst verhindert"), wörtlich und in Reihenfolge. Der achte Punkt
 * („grüne" Statusdarstellung trotz fehlender Evidence) ist die Konzeptverankerung der
 * Ehrlichkeitsgrenze, nach der diese Anwendung gebaut ist.
 */
export const ENGINE_VERHINDERT: readonly string[] = [
  'PowerPoint-Folien als manuell gepflegte Schatten-Datenbank',
  'widersprüchliche Zahlen in PDF, Dashboard und Vorstandspräsentation',
  'generische Executive Reports ohne klare Entscheidung',
  'nicht belegte KI-Aussagen',
  'kopierte Altfolien mit falschem Kunden, Zeitraum oder Branding',
  'Charts ohne Definition, Zeitraum oder Datenvertrauen',
  'automatisches Versenden vertraulicher Reports ohne Empfängerprüfung',
  '„grüne" Statusdarstellung trotz fehlender Evidence',
  'unlesbare Tabellenwände als Hauptstory',
  'unversionierte Berichte, deren Inhalt später nicht reproduzierbar ist',
] as const;
