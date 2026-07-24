/**
 * Onboarding-/Lifecycle-Strukturen aus dem Konzept (WP-006 Slice 3, read-only, KEINE Erfassung).
 *
 * QUELLE (Regel Null, am PDF gegengelesen – nichts erfunden, nichts weggelassen):
 *   docs/concept/pdf/Dokument_16_Kunden_Onboarding_Zielprofil_Lifecycle_v1.0.pdf
 *   - `LIFECYCLE_PHASEN`      ← Abschnitt „Lifecycle-Modell", Unterabschnitt „Kanonische Phasen"
 *      (Tabelle Phase/Ziel/Zentrale Ergebnisse/Exit Gate): Phasen 0–10, worttreu.
 *   - `QUALIFICATION_FRAGEN`  ← Abschnitt „Qualification und Onboarding Charter", Unterabschnitt
 *      „Mindestfragen der Qualification" (zehn Fragen), worttreu.
 *   - `CHARTER_INHALTE`       ← Abschnitt „Qualification und Onboarding Charter", Unterabschnitt
 *      „Onboarding Charter" („Die Charter enthält mindestens:", zehn Punkte), worttreu.
 *   - `FIRMENANLAGE_MINDEST`  ← Abschnitt „Firmenanlage und Organisationsfundament",
 *      Unterabschnitt „Mindeststruktur" (acht Punkte), worttreu; `UEBERMODELLIERUNG_WARNUNG`
 *      aus Unterabschnitt „Strukturtiefe".
 *   - `SCOPE_DIMENSIONEN`     ← Abschnitt „Scope Discovery und Scope Governance", Unterabschnitt
 *      „Scope-Dimensionen" (neun Dimensionen), worttreu.
 *   - `AUSSCHLUSS_PFLICHT`    ← Abschnitt „Scope Discovery und Scope Governance", Unterabschnitt
 *      „Ein- und Ausschlüsse" („Jeder Ausschluss benötigt:", sechs Angaben), worttreu.
 *   - `STRATEGIE_DNA_DIMENSIONEN` ← Abschnitt „Strategie-DNA", Unterabschnitt „Pflichtdimensionen"
 *      (Tabelle Dimension/Leitfrage/Beispielausprägungen): zwölf Dimensionen, worttreu.
 *   - `ZIELPROFILTYPEN`       ← Abschnitt „Zielprofile", Unterabschnitt „Zielprofiltypen"
 *      (neun Typen mit Beschreibung), worttreu.
 *   - `GUIDED_QUICKSTART`     ← Abschnitt „Guided UX und Einstiegspfade", Unterabschnitt
 *      „Guided Quickstart" (sieben Schritte), worttreu.
 *   - `FREIGABEPFLICHTIG`     ← Entscheidung 16-D07 (Abschnitt „Festgelegte Entscheidungen") /
 *      Prinzip OL07 (Abschnitt „Onboarding- und Lifecycle-Verfassung"), worttreu-nah.
 *
 * READ-ONLY, KEINE ERFASSUNG (16-D01 „Lifecycle, kein Wizard"; OL04 „jede Annahme bleibt
 * sichtbar"; OL06 „Datenminimierung"; OL07/16-D07 „menschliche Freigabe"): Diese Strukturen
 * werden ERKLÄRT, nicht erfasst. Kein Eingabefeld, keine Speicherung, keine Fortschrittsmessung.
 *
 * MATERIALISIERUNGS-LÜCKEN (im Objektvertrag als Typ vorgesehen, im heutigen Seed NICHT
 * materialisiert): ISMS-Scope/Ausschluss (F01), Strategie-DNA (F01), Target Profile (F09). Der
 * Assistent BENENNT das ehrlich, statt leere Objekte oder Beispielwerte zu erfinden (DR-0005;
 * WP-021-Verweis nur im Code, nicht im Produkttext).
 *
 * ⚠️ WÄCHTER-KOLLISIONEN (worttreuer PDF-Text vs. Wächter-Verbotsliste – als Stop Condition
 * gemeldet, nicht still gelöst):
 *   - Phase 10 „Exit Gate" = „Exit Acceptance" kollidiert mit `prozessvokabular` (`/\bAcceptance\b/`).
 *     Behandelt als dokumentierte, quellenbelegte EINZEL-Ausnahme des Wächters (`EXIT_ACCEPTANCE`),
 *     Regel unverändert; Gate-Bestätigung ausstehend (O-WP006-08).
 *   - Phase 0 „Zentrale Ergebnisse" = „synthetischer Account, Demo-Story, …" kollidiert mit
 *     `produktsprache` (`/synthetisch/i`, `/\bDemo\b/i`). Der Assistent steht (noch) NICHT unter
 *     `produktsprache`; die latente Kollision ist gemeldet (O-WP006-09).
 *
 * React-frei und deterministisch testbar (Muster `lib/shell/roles.ts`).
 */

/* -----------------------------------------------------------------------------
 * Lifecycle-Modell – Abschnitt „Lifecycle-Modell", Unterabschnitt „Kanonische Phasen"
 * --------------------------------------------------------------------------- */

export interface LifecyclePhase {
  /** Phasennummer 0–10 (Spalte „Phase"). */
  readonly nummer: number;
  /** Phasenname (Spalte „Phase"), worttreu. */
  readonly name: string;
  /** Ziel (Spalte „Ziel"), worttreu. */
  readonly ziel: string;
  /** Zentrale Ergebnisse (Spalte „Zentrale Ergebnisse"), worttreu. */
  readonly ergebnisse: string;
  /** Exit Gate (Spalte „Exit Gate"), worttreu. */
  readonly exitGate: string;
}

/**
 * Der verbatim Exit-Gate-Wert der Phase 10 („Exit Acceptance"). Als benannte Konstante, damit der
 * `prozessvokabular`-Wächter die dokumentierte Einzel-Ausnahme QUELLENBELEGT (nicht als Freitext)
 * maskieren und ihre Existenz gegen `LIFECYCLE_PHASEN` beweisen kann. Regelevolution ausstehend
 * (O-WP006-08).
 */
export const EXIT_ACCEPTANCE = 'Exit Acceptance';

/** Die elf kanonischen Lifecycle-Phasen (0–10), worttreu. */
export const LIFECYCLE_PHASEN: readonly LifecyclePhase[] = [
  {
    nummer: 0,
    name: 'Prospect / Sandbox',
    ziel: 'Produkt und Nutzen sicher demonstrieren',
    ergebnisse: 'synthetischer Account, Demo-Story, unverbindliche Hypothesen',
    exitGate: 'qualifizierter Einstieg oder Abschluss',
  },
  {
    nummer: 1,
    name: 'Qualification',
    ziel: 'Eignung, Ziel und Verantwortliche klären',
    ergebnisse: 'Onboarding Charter, Stakeholder, Scope-Hypothese',
    exitGate: 'Sponsor und Onboarding Owner bestätigt',
  },
  {
    nummer: 2,
    name: 'Foundation',
    ziel: 'Organisation, Rollen, Zugriffe und Datenrahmen anlegen',
    ergebnisse: 'Customer Account, Organization Profile, Rollen, Datenplan',
    exitGate: 'Mindeststruktur vollständig',
  },
  {
    nummer: 3,
    name: 'Discover',
    ziel: 'Scope, Verpflichtungen, Assets und Ist-Zustand verstehen',
    ergebnisse: 'Scope Proposal, Imports, Interviews, Datenlücken',
    exitGate: 'Scope Review möglich',
  },
  {
    nummer: 4,
    name: 'Design',
    ziel: 'Strategie-DNA, Zielprofil, Verantwortung und Route entwerfen',
    ergebnisse: 'Target Profile, Route Options, Service Mix',
    exitGate: 'Entscheidungen vorbereitet',
  },
  {
    nummer: 5,
    name: 'Validate',
    ziel: 'Baseline, Route, Kosten, Kapazität und Risiken prüfen',
    ergebnisse: 'Baseline, Confidence, Simulation, Readiness Plan',
    exitGate: 'Freigaben möglich',
  },
  {
    nummer: 6,
    name: 'Transition',
    ziel: 'Daten, Workflows, Services und Teams betriebsbereit machen',
    ergebnisse: 'Service Charter, Responsibility Blueprint, Runbooks',
    exitGate: 'Operational Readiness bestanden',
  },
  {
    nummer: 7,
    name: 'Activate',
    ziel: 'kontrollierter Go-live',
    ergebnisse: 'aktive Services, Mission Control, Reporting',
    exitGate: 'Hypercare gestartet',
  },
  {
    nummer: 8,
    name: 'Operate & Improve',
    ziel: 'Ziele erreichen und Betrieb verbessern',
    ergebnisse: 'Reviews, neue Snapshots, Value Ledger',
    exitGate: 'fortlaufend',
  },
  {
    nummer: 9,
    name: 'Change',
    ziel: 'Scope, Ziel, Service oder Organisation anpassen',
    ergebnisse: 'Impact Assessment, neue Versionen',
    exitGate: 'Änderung freigegeben',
  },
  {
    nummer: 10,
    name: 'Reduce / Internalize / Exit',
    ziel: 'Leistungen geordnet reduzieren oder übergeben',
    ergebnisse: 'Export, Handover, Revocation, Abschlussbericht',
    exitGate: EXIT_ACCEPTANCE,
  },
] as const;

/* -----------------------------------------------------------------------------
 * Qualification und Onboarding Charter – Abschnitt „Qualification und Onboarding Charter"
 * --------------------------------------------------------------------------- */

/** Die zehn Mindestfragen der Qualification, worttreu. */
export const QUALIFICATION_FRAGEN: readonly string[] = [
  'Welches konkrete Problem oder Ziel soll die Plattform lösen?',
  'Welche Organisation oder welcher Scope ist betroffen?',
  'Welche geschäftlichen, regulatorischen oder terminlichen Treiber existieren?',
  'Wer ist Sponsor, fachlicher Owner und operativer Ansprechpartner?',
  'Welche Daten sind vorhanden und wie belastbar sind sie?',
  'Welche internen Fähigkeiten und Kapazitäten existieren?',
  'Welche Leistungen sollen intern bleiben, gemeinsam erfolgen oder übernommen werden?',
  'Gibt es Unabhängigkeits-, Interessenkonflikt-, Datenresidenz- oder Sicherheitsgrenzen?',
  'Welcher Einstiegspfad ist angemessen?',
  'Was muss innerhalb der ersten 30 Tage sichtbar erreicht werden?',
] as const;

/** Die Mindestinhalte der Onboarding Charter (zehn Punkte), worttreu. */
export const CHARTER_INHALTE: readonly string[] = [
  'Ziel und Nicht-Ziele',
  'vorläufigen Scope und Ausschlüsse',
  'Sponsor, Onboarding Owner, Customer Owner und Provider Lead',
  'Einstiegspfad und geplante Phasen',
  'erwartete Deliverables',
  'Entscheidungs- und Eskalationsrechte',
  'Daten- und Zugriffsvoraussetzungen',
  'Termin- und Budgetkorridor',
  'Risiken, Annahmen und Abbruchkriterien',
  'Definition of Ready für Foundation',
] as const;

/* -----------------------------------------------------------------------------
 * Firmenanlage und Organisationsfundament – Abschnitt „Firmenanlage und Organisationsfundament"
 * --------------------------------------------------------------------------- */

/** Die Mindeststruktur für eine arbeitsfähige erste Version (acht Punkte), worttreu. */
export const FIRMENANLAGE_MINDEST: readonly string[] = [
  'Kundenname und neutrale Identität',
  'primäre Region und Datenresidenz',
  'mindestens eine Organisationseinheit',
  'mindestens einen kritischen Geschäftsprozess oder Service',
  'Sponsor, ISMS Owner und operative Vertretung',
  'vorläufigen Scope',
  'eine Zielhypothese',
  'Datenowner für importierte oder manuell erfasste Daten',
] as const;

/** Übermodellierungs-Warnung (Unterabschnitt „Strukturtiefe"), worttreu-nah. */
export const UEBERMODELLIERUNG_WARNUNG =
  'Die Plattform zeigt eine Tiefenempfehlung statt maximaler Detailtiefe. Ein Kunde soll nur so ' +
  'viele Einheiten, Standorte und Prozesse anlegen, wie für Entscheidungen und Nachweise ' +
  'erforderlich. Übermodellierung wird als Risiko für Pflegeaufwand und Datenqualität angezeigt.';

/* -----------------------------------------------------------------------------
 * Scope Discovery und Scope Governance – Abschnitt „Scope Discovery und Scope Governance"
 * --------------------------------------------------------------------------- */

/** Die neun Scope-Dimensionen („Ein Scope kann beinhalten:"), worttreu. */
export const SCOPE_DIMENSIONEN: readonly string[] = [
  'rechtliche Einheiten',
  'Standorte und Regionen',
  'Produkte und Services',
  'Geschäftsprozesse',
  'Informationen und Datenklassen',
  'Anwendungen, Infrastruktur und Cloud-Umgebungen',
  'Lieferanten und ausgelagerte Prozesse',
  'regulatorische und vertragliche Verpflichtungen',
  'organisatorische Funktionen und Personengruppen',
] as const;

/** Die sechs Pflichtangaben je Ausschluss („Jeder Ausschluss benötigt:"), worttreu. */
export const AUSSCHLUSS_PFLICHT: readonly string[] = [
  'Begründung',
  'verantwortliche Entscheidung',
  'Abhängigkeiten und Schnittstellen',
  'verbleibendes Risiko',
  'Überprüfungstermin',
  'Auswirkung auf Zielprofil, Auditfähigkeit und Serviceumfang',
] as const;

/* -----------------------------------------------------------------------------
 * Strategie-DNA – Abschnitt „Strategie-DNA", Unterabschnitt „Pflichtdimensionen"
 * --------------------------------------------------------------------------- */

export interface StrategieDnaDimension {
  /** Dimension (Spalte „Dimension"), worttreu. */
  readonly dimension: string;
  /** Leitfrage (Spalte „Leitfrage"), worttreu. */
  readonly leitfrage: string;
  /** Beispielausprägungen (Spalte „Beispielausprägungen"), worttreu. */
  readonly beispiele: string;
}

/** Die zwölf Pflichtdimensionen der Strategie-DNA, worttreu. */
export const STRATEGIE_DNA_DIMENSIONEN: readonly StrategieDnaDimension[] = [
  {
    dimension: 'Geschäftskritikalität',
    leitfrage: 'Welche Ausfälle oder Vertrauensverluste sind existenziell?',
    beispiele: 'moderat, hoch, sehr hoch; pro Prozess differenziert',
  },
  {
    dimension: 'Risikophilosophie',
    leitfrage: 'Wie vorsichtig oder chancenorientiert soll gesteuert werden?',
    beispiele: 'konservativ, ausgewogen, selektiv risikobereit',
  },
  {
    dimension: 'Regulierungsintensität',
    leitfrage: 'Welche verbindlichen Anforderungen prägen den Zielzustand?',
    beispiele: 'freiwillig, vertraglich, reguliert, mehrfach reguliert',
  },
  {
    dimension: 'Zielambition',
    leitfrage: 'Welches Niveau ist wirtschaftlich und strategisch gewollt?',
    beispiele: 'Mindestniveau, definierte Reife, Zertifizierung, Resilienz',
  },
  {
    dimension: 'Geschwindigkeit',
    leitfrage: 'Wie schnell soll der Zielzustand erreicht werden?',
    beispiele: 'stabil, beschleunigt, ereignisgetrieben',
  },
  {
    dimension: 'Budgetflexibilität',
    leitfrage: 'Wie eng sind Investitionskorridore?',
    beispiele: 'fix, priorisierbar, szenariobasiert',
  },
  {
    dimension: 'Interne Kapazität',
    leitfrage: 'Was kann das Unternehmen selbst zuverlässig leisten?',
    beispiele: 'gering, selektiv, stark, Center of Excellence',
  },
  {
    dimension: 'Managed-Service-Anteil',
    leitfrage: 'Welche Verantwortung soll extern unterstützt oder übernommen werden?',
    beispiele: 'Guide, Co-Manage, Operate, Embedded Office',
  },
  {
    dimension: 'Automatisierungsgrad',
    leitfrage: 'Wie weit dürfen deterministische Workflows handeln?',
    beispiele: 'assistiert, teilautomatisiert, weitgehend automatisiert',
  },
  {
    dimension: 'Nachweistiefe',
    leitfrage: 'Wie viel Evidence ist für Ziel und Risiko nötig?',
    beispiele: 'pragmatisch, kontrolliert, auditintensiv',
  },
  {
    dimension: 'Entscheidungsstil',
    leitfrage: 'Wie werden sensible Entscheidungen vorbereitet und freigegeben?',
    beispiele: 'zentral, föderiert, mehrstufig',
  },
  {
    dimension: 'Kommunikationsstil',
    leitfrage: 'Wie sollen Management und operative Rollen informiert werden?',
    beispiele: 'komprimiert, detailliert, ereignisbezogen',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Zielprofile – Abschnitt „Zielprofile", Unterabschnitt „Zielprofiltypen"
 * --------------------------------------------------------------------------- */

export interface Zielprofiltyp {
  /** Typname, worttreu. */
  readonly name: string;
  /** Beschreibung, worttreu. */
  readonly beschreibung: string;
}

/** Die neun Zielprofiltypen („Ein Kunde kann mehrere Typen kombinieren:"), worttreu. */
export const ZIELPROFILTYPEN: readonly Zielprofiltyp[] = [
  {
    name: 'Minimum Viable Security',
    beschreibung: 'priorisierte Mindestfähigkeiten für kritische Risiken.',
  },
  { name: 'Capability Target', beschreibung: 'definierte Reifegrade je Capability.' },
  {
    name: 'Regulatory Compliance',
    beschreibung: 'Erfüllung ausgewählter gesetzlicher oder vertraglicher Verpflichtungen.',
  },
  {
    name: 'Certification Readiness',
    beschreibung: 'Vorbereitung auf eine konkrete Zertifizierung oder Prüfung.',
  },
  {
    name: 'Risk Reduction',
    beschreibung: 'Reduktion definierter Risikoexpositionen auf tolerierte Werte.',
  },
  {
    name: 'Operational Resilience',
    beschreibung: 'Wiederanlauf-, Krisen- und Abhängigkeitsziele.',
  },
  {
    name: 'Customer Trust',
    beschreibung: 'Nachweise für Kunden, Lieferketten oder Ausschreibungen.',
  },
  {
    name: 'Transformation Enablement',
    beschreibung: 'Sicherheitsziel für Cloud-, M&A-, Produkt- oder Digitalprogramme.',
  },
  {
    name: 'Managed Capability',
    beschreibung: 'verlässlicher Betriebszustand für ausgewählte ausgelagerte Fähigkeiten.',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Guided Quickstart – Abschnitt „Guided UX und Einstiegspfade"
 * --------------------------------------------------------------------------- */

/** Die sieben Schritte des Guided Quickstart, worttreu. */
export const GUIDED_QUICKSTART: readonly string[] = [
  'Ziel in Alltagssprache auswählen.',
  'Organisation und kritische Prozesse skizzieren.',
  'vorhandene Rollen und Kapazität erfassen.',
  'Daten oder Dokumente optional importieren.',
  'erste Strategie-DNA und Zielroute erzeugen.',
  'Annahmen bestätigen.',
  'nächsten sinnvollen Schritt starten.',
] as const;

/* -----------------------------------------------------------------------------
 * Menschliche Freigabe – Entscheidung 16-D07 / Prinzip OL07
 * --------------------------------------------------------------------------- */

/**
 * Die Gegenstände, die eine menschliche Freigabe benötigen (16-D07), worttreu. Werden als
 * Strukturinhalt GEZEIGT, nicht simuliert – der Assistent löst keine Freigabe aus.
 */
export const FREIGABEPFLICHTIG: readonly string[] = [
  'Scope',
  'Zielprofil',
  'Risikotoleranz',
  'Serviceübernahme',
  'Go-live',
] as const;

/* -----------------------------------------------------------------------------
 * Materialisierungs-Lücken (kanonische Objekttypen, im heutigen Seed nicht materialisiert)
 * --------------------------------------------------------------------------- */

/**
 * Kanonische Objekttypen, die der Objektvertrag kennt, aber der heutige Datenbestand NICHT
 * materialisiert (DR-0005/DR-0010 Nr. 2: benennen statt erfinden; WP-021-Verweis nur im Code).
 * Der sichtbare Text trägt KEINE internen Codes (kein „F01"/„F09"/WP-Kennung).
 */
export const MATERIALISIERUNGS_LUECKEN: readonly string[] = [
  'ISMS-Scope',
  'Ausschluss',
  'Strategie-DNA',
  'Target Profile',
] as const;
