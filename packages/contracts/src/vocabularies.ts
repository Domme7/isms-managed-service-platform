/**
 * Kanonische Vokabulare des digitalen Unternehmenszwillings.
 *
 * QUELLE (verbindlich): Dokument 07 – Digitaler Unternehmenszwilling & Informationsgraph, v1.0
 *   docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md
 * QUELLE (nur Lifecycle je Objektklasse): Dokument 05 – Produktlandkarte & Funktionsumfang, v1.0, Abschnitt 7
 *   docs/concept/active/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md
 *
 * Regel: Jeder Wert ist wörtlich einer Fundstelle entnommen (siehe PROVENANCE.md).
 * Nichts wird erfunden; Unklarheiten sind als "OFFENE FRAGE" markiert.
 */

/* =============================================================================
 * Objektfamilien F01–F09 und kanonische Objekttypen
 * Quelle: Dok. 07, Abschnitt 6 ("Objektfamilien und kanonischer Katalog"), Tabelle F01–F09.
 * Die Objekttypen sind wörtlich der Spalte "Kernobjekte" entnommen.
 * ============================================================================= */

export const OBJECT_TYPES_F01 = [
  'Tenant',
  'Organisation',
  'Rechtseinheit',
  'ISMS-Scope',
  'Ausschluss',
  'Strategie-DNA',
] as const;

export const OBJECT_TYPES_F02 = [
  'Organisationseinheit',
  'Standort',
  'Team',
  'Person',
  'Produktrolle',
  'fachliche Rolle',
  'Vertretung',
] as const;

export const OBJECT_TYPES_F03 = [
  'Business Capability',
  'Geschäftsprozess',
  'Produkt/Service',
  'Information Asset',
  'Datenklasse',
  'Kritikalität',
] as const;

export const OBJECT_TYPES_F04 = [
  'Anwendung',
  'IT-Service',
  'System',
  'Komponente',
  'Cloud-Ressource',
  'Endpoint',
  'Netzwerkzone',
  'Schnittstelle',
] as const;

export const OBJECT_TYPES_F05 = [
  'Lieferant',
  'Unterauftragnehmer',
  'Vertrag',
  'externe Leistung',
  'Datenverarbeitung',
  'Abhängigkeit',
] as const;

export const OBJECT_TYPES_F06 = [
  'Framework',
  'Requirement',
  'Control Objective',
  'Control',
  'Control Implementation',
  'Policy',
  'Ausnahme',
] as const;

export const OBJECT_TYPES_F07 = [
  'Threat',
  'Vulnerability',
  'Weakness',
  'Risk Scenario',
  'Risk',
  'Incident',
  'Finding',
  'Change Signal',
] as const;

export const OBJECT_TYPES_F08 = [
  'Measure',
  'Task',
  'Evidence',
  'Control Test',
  'Assessment',
  'Audit',
  'Finding',
  'Remediation',
] as const;

export const OBJECT_TYPES_F09 = [
  'Target Profile',
  'Objective',
  'KPI',
  'Decision Record',
  'Managed Service',
  'SLA',
  'Deliverable',
  'Review',
] as const;

export const OBJECT_FAMILY_ID = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09'] as const;
export type ObjectFamilyId = (typeof OBJECT_FAMILY_ID)[number];

/**
 * Objektfamilien-Registry: Name, Leitfrage und zugehörige Objekttypen je Familie.
 * Name/Leitfrage wörtlich aus Dok. 07, Abschnitt 6.
 */
export const OBJECT_FAMILIES = {
  F01: {
    id: 'F01',
    name: 'Tenant & Unternehmenskontext',
    leitfrage: 'Abgrenzung der Daten, Ziele und Verantwortung.',
    types: OBJECT_TYPES_F01,
  },
  F02: {
    id: 'F02',
    name: 'Organisation & Verantwortung',
    leitfrage: 'Wer trägt wofür Verantwortung und in welchem Kontext?',
    types: OBJECT_TYPES_F02,
  },
  F03: {
    id: 'F03',
    name: 'Geschäft & Information',
    leitfrage: 'Was erzeugt Wert und was muss geschützt werden?',
    types: OBJECT_TYPES_F03,
  },
  F04: {
    id: 'F04',
    name: 'Technologie & Infrastruktur',
    leitfrage: 'Welche technischen Abhängigkeiten tragen das Geschäft?',
    types: OBJECT_TYPES_F04,
  },
  F05: {
    id: 'F05',
    name: 'Dritte & Lieferkette',
    leitfrage: 'Welche externen Parteien und Leistungen beeinflussen Sicherheit und Resilienz?',
    types: OBJECT_TYPES_F05,
  },
  F06: {
    id: 'F06',
    name: 'Governance & Anforderungen',
    leitfrage: 'Welche Vorgaben gelten und wie werden sie umgesetzt?',
    types: OBJECT_TYPES_F06,
  },
  F07: {
    id: 'F07',
    name: 'Risiko & Veränderung',
    leitfrage: 'Was kann passieren, warum und mit welcher Auswirkung?',
    types: OBJECT_TYPES_F07,
  },
  F08: {
    id: 'F08',
    name: 'Arbeit, Nachweis & Assurance',
    leitfrage: 'Was wird getan, geprüft und belegt?',
    types: OBJECT_TYPES_F08,
  },
  F09: {
    id: 'F09',
    name: 'Ziele, Entscheidungen & Services',
    leitfrage: 'Wohin soll sich das Unternehmen entwickeln und wer unterstützt dabei?',
    types: OBJECT_TYPES_F09,
  },
} as const;

/**
 * Flache Liste aller kanonischen Objekttypen (Union über F01–F09).
 * Hinweis: "Finding" ist in Dok. 07 sowohl in F07 als auch in F08 gelistet
 * (dokumentierte Überschneidung, kein Fehler dieses Vertrags).
 */
export const OBJECT_TYPE = [
  ...OBJECT_TYPES_F01,
  ...OBJECT_TYPES_F02,
  ...OBJECT_TYPES_F03,
  ...OBJECT_TYPES_F04,
  ...OBJECT_TYPES_F05,
  ...OBJECT_TYPES_F06,
  ...OBJECT_TYPES_F07,
  ...OBJECT_TYPES_F08,
  ...OBJECT_TYPES_F09,
] as const;
export type ObjectType = (typeof OBJECT_TYPE)[number];

/* =============================================================================
 * Lebenszyklus / Lifecycle-Zustände
 * ============================================================================= */

/**
 * Generischer Objekt-Lebenszyklus.
 * Quelle: Dok. 07, Abschnitt 8 ("Lebenszyklus und Status"), 8 kanonische Zustände.
 *
 * OFFENE FRAGE (Dok.-interne Inkonsistenz): Die Feldtabelle in Dok. 07 Abschnitt 7 nennt
 * lifecycle_status verkürzt als "Entwurf, aktiv, in Review, stillgelegt, archiviert" –
 * das weicht von den 8 Zuständen in Abschnitt 8 ab. Abschnitt 8 (dedizierter Abschnitt)
 * wird hier als kanonisch behandelt; die Kurzform ist nicht abgebildet.
 */
export const OBJECT_LIFECYCLE_STATUS = [
  'Entwurf',
  'Beobachtet',
  'Geprüft',
  'Freigegeben',
  'In Änderung',
  'Überholt',
  'Stillgelegt',
  'Archiviert',
] as const;

/**
 * Objektklassen-spezifische Lebenszyklen.
 * Quelle: Dok. 05, Abschnitt 7 ("Kanonische Zustände").
 *
 * OFFENE FRAGE (Casing): Dok. 05 schreibt z. B. "geprüft"/"freigegeben"/"überholt" klein,
 * Dok. 07 Abschnitt 8 dagegen "Geprüft"/"Freigegeben"/"Überholt". Beide Schreibweisen bleiben
 * hier bewusst erhalten (keine stille Vereinheitlichung, siehe .claude/rules/docs.md).
 * Ein kanonischer Casing-Entscheid steht aus.
 *
 * OFFENE FRAGE (Slash-Zustände): Dok. 05 nennt kombinierte Zustände
 * "akzeptiert/abgelehnt" (Evidence), "genehmigt/abgelehnt" (Entscheidung),
 * "geändert/pausiert" (Service). Diese werden hier je in zwei Einzelzustände aufgeteilt.
 */
export const LIFECYCLE_STATUS_INFORMATION = ['Entwurf', 'geprüft', 'freigegeben', 'überholt'] as const;
export const LIFECYCLE_STATUS_RISK = [
  'identifiziert',
  'bewertet',
  'entschieden',
  'behandelt',
  'überwacht',
  'geschlossen',
] as const;
export const LIFECYCLE_STATUS_CONTROL = [
  'nicht bewertet',
  'geplant',
  'implementiert',
  'wirksam',
  'eingeschränkt',
  'unwirksam',
] as const;
export const LIFECYCLE_STATUS_MEASURE = [
  'Idee',
  'bewertet',
  'freigegeben',
  'in Arbeit',
  'blockiert',
  'Nachweis',
  'Wirksamkeitsprüfung',
  'abgeschlossen',
] as const;
export const LIFECYCLE_STATUS_EVIDENCE = [
  'angefordert',
  'geliefert',
  'geprüft',
  'akzeptiert',
  'abgelehnt',
  'abgelaufen',
] as const;
export const LIFECYCLE_STATUS_DECISION = [
  'vorbereitet',
  'zur Freigabe',
  'genehmigt',
  'abgelehnt',
  'umgesetzt',
  'überprüft',
] as const;
export const LIFECYCLE_STATUS_SERVICE = [
  'vorgeschlagen',
  'konfiguriert',
  'freigegeben',
  'aktiv',
  'Review',
  'geändert',
  'pausiert',
  'beendet',
] as const;
export const LIFECYCLE_STATUS_AUDIT = [
  'geplant',
  'Vorbereitung',
  'Feldarbeit',
  'Findings',
  'Nacharbeit',
  'abgeschlossen',
] as const;

/** Lifecycle je Objektklasse (Dok. 05, Abschnitt 7). */
export const LIFECYCLE_BY_CLASS = {
  object_information: LIFECYCLE_STATUS_INFORMATION,
  risk: LIFECYCLE_STATUS_RISK,
  control: LIFECYCLE_STATUS_CONTROL,
  measure: LIFECYCLE_STATUS_MEASURE,
  evidence: LIFECYCLE_STATUS_EVIDENCE,
  decision: LIFECYCLE_STATUS_DECISION,
  service: LIFECYCLE_STATUS_SERVICE,
  audit: LIFECYCLE_STATUS_AUDIT,
} as const;

/**
 * Gesamtmenge aller kanonischen Lifecycle-Zustände (generisch + je Objektklasse).
 * Dok. 07 Abschnitt 7 erlaubt ausdrücklich: "Typspezifische Status dürfen ergänzen, nicht
 * widersprechen." Deshalb akzeptiert der Objekt-Envelope die Union.
 * Enthält bewusst mehrfach vorkommende Werte (z. B. Casing-Varianten von Dok. 05/07);
 * ein Test (vocabularies.spec.ts) verifiziert die deduplizierte Herkunft gegen die Quellen.
 */
export const ALL_LIFECYCLE_STATUS = [
  ...OBJECT_LIFECYCLE_STATUS,
  ...LIFECYCLE_STATUS_INFORMATION,
  ...LIFECYCLE_STATUS_RISK,
  ...LIFECYCLE_STATUS_CONTROL,
  ...LIFECYCLE_STATUS_MEASURE,
  ...LIFECYCLE_STATUS_EVIDENCE,
  ...LIFECYCLE_STATUS_DECISION,
  ...LIFECYCLE_STATUS_SERVICE,
  ...LIFECYCLE_STATUS_AUDIT,
] as const;
export type LifecycleStatus = (typeof ALL_LIFECYCLE_STATUS)[number];

/* =============================================================================
 * Klassifikation
 * Quelle: Dok. 07, Abschnitt 7 ("classification": "Vertraulichkeit und Schutzbedarf").
 *
 * OFFENE FRAGE: Dok. 07 nennt die beiden Dimensionen "Vertraulichkeit" und "Schutzbedarf",
 * aber KEINE konkreten Stufen (z. B. öffentlich/intern/vertraulich/streng vertraulich).
 * Eine feste Klassifikationsskala ist hier daher NICHT erfunden; sie wird in Dok. 19
 * (Sicherheit/Datenschutz/Rechte) erwartet. Bis dahin bleibt classification strukturiert,
 * aber wertoffen (freie Strings).
 * ============================================================================= */

/* =============================================================================
 * Datenqualitäts-/Vertrauensdimensionen
 * Quelle: Dok. 07, Abschnitt 12 ("Herkunft, Datenqualität und Vertrauen"), Tabelle.
 * ============================================================================= */

export const DATA_QUALITY_DIMENSION = [
  'Herkunft',
  'Aktualität',
  'Vollständigkeit',
  'Konsistenz',
  'Bestätigung',
  'Verlässlichkeit',
  'Zweckeignung',
] as const;
export type DataQualityDimension = (typeof DATA_QUALITY_DIMENSION)[number];

/**
 * Bestätigungsstufen – die einzige in Dok. 07 explizit aufgezählte Werteskala einer Dimension.
 * Quelle: Dok. 07, Abschnitt 12, Zeile "Bestätigung":
 * "Ungeprüft, maschinell plausibilisiert, reviewed, freigegeben."
 *
 * OFFENE FRAGE: Für die übrigen 6 Dimensionen (Herkunft, Aktualität, Vollständigkeit,
 * Konsistenz, Verlässlichkeit, Zweckeignung) nennt Dok. 07 nur "sichtbare Nachweise",
 * keine feste Werteskala. Diese werden daher wertoffen modelliert (kein erfundenes Enum).
 */
export const CONFIRMATION_LEVEL = [
  'Ungeprüft',
  'maschinell plausibilisiert',
  'reviewed',
  'freigegeben',
] as const;
export type ConfirmationLevel = (typeof CONFIRMATION_LEVEL)[number];

/* =============================================================================
 * Provenance / Assertion-Art
 * Quelle: Dok. 07, Abschnitt 9: "Jede Beziehung wird als assertiert, importiert,
 * abgeleitet oder freigegeben gekennzeichnet." (vgl. P05, D05, Abschnitt 21).
 * ============================================================================= */

export const ASSERTION_KIND = ['assertiert', 'importiert', 'abgeleitet', 'freigegeben'] as const;
export type AssertionKind = (typeof ASSERTION_KIND)[number];

/* =============================================================================
 * Quellenarten (source_refs)
 * Quelle: Dok. 07, Abschnitt 7 ("source_refs": "Quellsystem, Import, Datei oder Nutzer")
 *          + Abschnitt 12, Zeile "Herkunft" ("Quelle, Connector, Importjob, Nutzer,
 *          Dokument, Extraktionsregel").
 * ============================================================================= */

export const SOURCE_KIND = [
  'Quellsystem',
  'Import',
  'Datei',
  'Nutzer',
  'Connector',
  'Importjob',
  'Dokument',
  'Extraktionsregel',
] as const;
export type SourceKind = (typeof SOURCE_KIND)[number];

/* =============================================================================
 * Owner-Art
 * Quelle: Dok. 07, Abschnitt 7 ("owner_ids": "Fachlicher und ggf. technischer Owner").
 * ============================================================================= */

export const OWNER_KIND = ['fachlich', 'technisch'] as const;
export type OwnerKind = (typeof OWNER_KIND)[number];

/* =============================================================================
 * Beziehungstypen R01–R25
 * Quelle: Dok. 07, Abschnitt 9 ("Beziehungsmodell"), Tabelle R01–R25.
 * Typ (snake_case), Beispiel und semantische Regel wörtlich übernommen.
 * ============================================================================= */

export const RELATIONSHIP_TYPES = {
  R01: { id: 'R01', type: 'part_of', example: 'Organisationseinheit -> Organisation', rule: 'Hierarchie; verhindert Zyklen innerhalb derselben Hierarchie.' },
  R02: { id: 'R02', type: 'located_at', example: 'Asset/Team -> Standort', rule: 'Physische oder primäre Betriebszuordnung.' },
  R03: { id: 'R03', type: 'owns', example: 'Person/Rolle/Einheit -> Objekt', rule: 'Fachliche Verantwortung mit Gültigkeitszeitraum.' },
  R04: { id: 'R04', type: 'operates', example: 'Team/Lieferant -> System/Service', rule: 'Operative Verantwortung; kann von Ownership abweichen.' },
  R05: { id: 'R05', type: 'supports', example: 'Capability/Prozess/Asset -> Capability/Prozess', rule: 'Unterstützungsbeziehung ohne harte Laufzeitabhängigkeit.' },
  R06: { id: 'R06', type: 'depends_on', example: 'Prozess/Service/Asset -> Asset/Lieferant', rule: 'Ausfall oder Qualitätsverlust kann Zielobjekt beeinträchtigen.' },
  R07: { id: 'R07', type: 'processes', example: 'Prozess/System/Lieferant -> Information Asset', rule: 'Datenverarbeitung mit Zweck und Datenklasse.' },
  R08: { id: 'R08', type: 'exposes', example: 'Schwäche/Vulnerability -> Asset', rule: 'Angriffs- oder Fehlermöglichkeit am Zielobjekt.' },
  R09: { id: 'R09', type: 'threatens', example: 'Threat -> Risk Scenario/Asset', rule: 'Relevante Bedrohung für einen konkreten Kontext.' },
  R10: { id: 'R10', type: 'affects', example: 'Risk/Incident/Change -> Prozess/Information/Objective', rule: 'Beschreibt mögliche oder bestätigte Wirkung.' },
  R11: { id: 'R11', type: 'caused_by', example: 'Risk/Finding/Incident -> Ursache', rule: 'Kausale Hypothese oder bestätigte Ursache, mit Vertrauensgrad.' },
  R12: { id: 'R12', type: 'mitigates', example: 'Control/Measure -> Risk Scenario/Risk', rule: 'Erwartete oder bestätigte Risikowirkung.' },
  R13: { id: 'R13', type: 'implements', example: 'Control Implementation -> Control', rule: 'Lokale Umsetzung eines generischen Controls.' },
  R14: { id: 'R14', type: 'satisfies', example: 'Control/Evidence -> Requirement', rule: 'Beitrag zur Anforderungserfüllung; partiell oder vollständig.' },
  R15: { id: 'R15', type: 'evidences', example: 'Evidence -> Control/Measure/Decision', rule: 'Nachweisbezug mit Zeitraum und Prüfstatus.' },
  R16: { id: 'R16', type: 'tests', example: 'Control Test/Assessment -> Control Implementation', rule: 'Prüft Design, Umsetzung oder Wirksamkeit.' },
  R17: { id: 'R17', type: 'finds', example: 'Audit/Assessment -> Finding', rule: 'Herkunft eines Findings.' },
  R18: { id: 'R18', type: 'remediates', example: 'Measure -> Finding/Weakness', rule: 'Behandelt konkrete Feststellung oder Schwäche.' },
  R19: { id: 'R19', type: 'requires', example: 'Objective/Service/Audit -> Control/Measure/Evidence', rule: 'Verbindliche Abhängigkeit im jeweiligen Scope.' },
  R20: { id: 'R20', type: 'contributes_to', example: 'Measure/Control/Service -> Objective/KPI', rule: 'Begründeter Wirkungsbeitrag ohne Garantie.' },
  R21: { id: 'R21', type: 'delivered_by', example: 'Managed Service/Deliverable -> Provider Team', rule: 'Delivery-Verantwortung und Servicekontext.' },
  R22: { id: 'R22', type: 'covered_by', example: 'Object -> Managed Service/Contract', rule: 'Zeigt, welche Objekte im Serviceumfang liegen.' },
  R23: { id: 'R23', type: 'decided_in', example: 'Risk/Change/Service -> Decision Record', rule: 'Verknüpft fachlichen Zustand mit menschlicher Entscheidung.' },
  R24: { id: 'R24', type: 'supersedes', example: 'Version/Policy/Decision -> Vorgänger', rule: 'Explizite Ablösung ohne historische Überschreibung.' },
  R25: { id: 'R25', type: 'related_to', example: 'Objekt -> Objekt', rule: 'Nur als zeitlich begrenzter Fallback; muss später typisiert werden.' },
} as const;

export const RELATIONSHIP_TYPE_ID = [
  'R01', 'R02', 'R03', 'R04', 'R05', 'R06', 'R07', 'R08', 'R09', 'R10',
  'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20',
  'R21', 'R22', 'R23', 'R24', 'R25',
] as const;
export type RelationshipTypeId = (typeof RELATIONSHIP_TYPE_ID)[number];

/** Flache Liste der kanonischen Beziehungstyp-Namen (snake_case). */
export const RELATIONSHIP_TYPE = [
  'part_of',
  'located_at',
  'owns',
  'operates',
  'supports',
  'depends_on',
  'processes',
  'exposes',
  'threatens',
  'affects',
  'caused_by',
  'mitigates',
  'implements',
  'satisfies',
  'evidences',
  'tests',
  'finds',
  'remediates',
  'requires',
  'contributes_to',
  'delivered_by',
  'covered_by',
  'decided_in',
  'supersedes',
  'related_to',
] as const;
export type RelationshipType = (typeof RELATIONSHIP_TYPE)[number];

/**
 * Richtung einer Beziehung.
 * Quelle: Dok. 07, Abschnitt 9 nennt "Richtung" als Pflichtattribut, enumeriert aber KEINE
 * Werte. Die primäre Richtung ergibt sich aus source_id -> target_id.
 *
 * OFFENE FRAGE: Dok. 07 legt keine Richtungs-Werteliste fest. Modellierungsentscheidung
 * (reversibel): {gerichtet, ungerichtet}, Default "gerichtet". "related_to" (R25) ist der
 * typische ungerichtete Fallback.
 */
export const RELATIONSHIP_DIRECTION = ['gerichtet', 'ungerichtet'] as const;
export type RelationshipDirection = (typeof RELATIONSHIP_DIRECTION)[number];
