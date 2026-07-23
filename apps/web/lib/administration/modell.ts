/**
 * Sicherheits-, Rechte-, Integrations- und Betriebsmodell des Ortes „Administration" als
 * STRUKTUR (WP-032 Slice 1, read-only).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen – zitiert wird der Abschnittstitel, weil die
 * Nummerierung abweicht):
 *  - Dok. 19 „Sicherheit, Datenschutz, Rechte & Auditierbarkeit", Abschnitte
 *    „Identitäts-Lifecycle" (Identitätstypen; Joiner, Mover, Leaver),
 *    „Autorisierungsmodell: RBAC, ABAC und Beziehungen" (RBAC als verständliche Basis; ABAC für
 *    Kontext; ReBAC für fachliche Beziehungen), Entscheidung 19-D01,
 *    „Mandantenisolation und Kontextwechsel" (Mehrschichtige Isolation; Kontextwechsel;
 *    Metadatenlecks), „Canonical Audit Records" (Auslöser; Mindestfelder),
 *    „Audit- und Evidence-Integrität" (Manipulationsschutz).
 *  - Dok. 17 „Integrationen, Automatisierung & Workflow-Designer", Abschnitte „Priorisierter
 *    Connector-Katalog", „Connector Health Record", IA16 „Operative Sichtbarkeit".
 *  - Dok. 18 „Technische Architektur & Plattformbetrieb", Abschnitte „Observability-Architektur"
 *    (Telemetriegrenzen), „Logging, Metrics, Tracing und Alerting", „Platform Control Tower und
 *    Betriebsprozesse", TA11 „Observability by Design".
 *
 * WAS DIESE DATEI IST – UND WAS NICHT:
 *  - Sie beschreibt das MODELL, das die Plattform vorsieht. Sie ist KEINE Autorisierung, KEINE
 *    Rechtematrix und KEIN Zustandsbericht (`.claude/rules/security.md`). Nichts davon wird
 *    heute durchgesetzt oder gemessen; die Seite sagt das sichtbar und ruhig.
 *  - Es wird NICHTS erfunden und NICHTS weggelassen (DR-0005 / Regel Null): jede Zeile stammt
 *    aus der genannten Quellstelle, die Anzahl je Liste ist am PDF gezählt (Test).
 *  - SPRACHE (DR-0013 Nr. 2): Wo die Quelle technisches Implementierungsvokabular führt
 *    („PostgreSQL Row Level Security", „Dead Letters", „Correlation ID"), steht im Produkt die
 *    deutsche Domänensprache; der WÖRTLICHE PDF-Text steht dann als Quellkommentar unmittelbar
 *    darüber, damit die Konzepttreue eins zu eins prüfbar bleibt. Wo die Quelle konkrete
 *    Produkt-/Systemfamilien benennt (Connector-Katalog), bleibt der Wortlaut unverändert –
 *    eine Umbenennung wäre eine stille Konzeptänderung.
 *  - Es wird NICHTS bewertet (DR-0008): kein Zustand, keine Ampel, keine Kennzahl. Die Spalte
 *    „Prototyp-Tiefe" des Connector-Katalogs wird deshalb bewusst NICHT übernommen – im Produkt
 *    gelesen wäre sie („vollständig funktionsfähig") eine Zustandszusage über heute.
 *
 * React-frei und statisch, damit die Kardinalitäten deterministisch gegen das PDF testbar sind
 * (Muster `lib/shell/roles.ts` / `lib/shell/seitenbausteine.ts`).
 */

/** Ein benannter Modellpunkt: Titel in Domänensprache + erklärender Satz aus der Quelle. */
export interface ModellPunkt {
  readonly titel: string;
  readonly erlaeuterung: string;
}

/* -----------------------------------------------------------------------------
 * Autorisierung: drei Ebenen (Dok. 19, „Autorisierungsmodell: RBAC, ABAC und Beziehungen")
 * --------------------------------------------------------------------------- */

export interface AutorisierungsEbene extends ModellPunkt {
  /** Ausprägungen der Ebene aus der Quellliste. */
  readonly punkte: readonly string[];
}

/**
 * Die drei Ebenen einer Zugriffsentscheidung. Die Quelle entscheidet ausdrücklich, dass sie
 * ZUSAMMEN wirken: „Das Sicherheitsmodell kombiniert RBAC, ABAC und beziehungsbezogene Regeln;
 * RBAC allein ist nicht ausreichend." (Entscheidung 19-D01) – im Produkt als Klartextsatz,
 * ohne Entscheidungs- oder Dokumentkennung.
 */
export const AUTORISIERUNGS_EBENEN: readonly AutorisierungsEbene[] = [
  {
    titel: 'Rolle',
    /* Quelle „RBAC als verständliche Basis": „Rollen sind keine universellen Rechtepakete,
       sondern innerhalb von Tenant, Scope, Service oder Datenraum gebunden." */
    erlaeuterung:
      'Eine Rolle ist kein universelles Rechtepaket. Sie gilt immer innerhalb eines Mandanten, ' +
      'eines Scopes, eines Services oder eines Datenraums.',
    punkte: [
      'gebunden an den Mandanten',
      'gebunden an den Scope',
      'gebunden an den Service',
      'gebunden an den Datenraum',
    ],
  },
  {
    titel: 'Kontextmerkmale',
    /* Quelle „ABAC für Kontext" (elf Attribute, wörtlich): Datenklasse · Region und Residency ·
       Risikoschwelle · Budget- oder Freigabelimit · Servicevertrag · Auditstatus · Objektstatus ·
       zeitliche Gültigkeit · Unternehmens- oder Organisationseinheit · Session Assurance ·
       Zweck der Verarbeitung. */
    erlaeuterung:
      'Zusätzlich entscheidet der Kontext des Zugriffs: worum es geht, wo die Daten liegen, wie ' +
      'sensibel sie sind und wozu sie gebraucht werden.',
    punkte: [
      'Datenklasse',
      'Region und Speicherort',
      'Risikoschwelle',
      'Budget- oder Freigabegrenze',
      'Servicevertrag',
      'Auditstand',
      'Objektstand',
      'zeitliche Gültigkeit',
      'Unternehmens- oder Organisationseinheit',
      'Sicherheitsniveau der Anmeldung',
      'Zweck der Verarbeitung',
    ],
  },
  {
    titel: 'Beziehung zum Objekt',
    /* Quelle „ReBAC für fachliche Beziehungen" (fünf Beispielfragen, wörtlich): „Ist die Person
       Owner oder Reviewer dieses Controls?" · „Ist der Berater dem Engagement und dem Kunden
       aktiv zugeordnet?" · „Wurde der Auditor für diesen Audit Scope eingeladen?" · „Ist die
       Person Beteiligter am Work Item oder Genehmiger der Decision Card?" · „Gehört ein Evidence
       Artefact zu einem freigegebenen Audit Room?" */
    erlaeuterung:
      'Zuletzt zählt die fachliche Beziehung zum Gegenstand: Wer verantwortet ihn, wer prüft ihn, ' +
      'wer ist dem Auftrag zugeordnet?',
    punkte: [
      'Verantwortet oder prüft die Person dieses Control?',
      'Ist die beratende Person dem Auftrag und dem Kunden aktiv zugeordnet?',
      'Wurde die prüfende Person für diesen Prüfumfang eingeladen?',
      'Ist die Person an der Aufgabe beteiligt oder genehmigt sie die Entscheidung?',
      'Gehört ein Nachweis zu einem freigegebenen Prüfbereich?',
    ],
  },
] as const;

/* -----------------------------------------------------------------------------
 * Identitäten (Dok. 19, Abschnitt „Identitäts-Lifecycle")
 * --------------------------------------------------------------------------- */

/**
 * Die acht Identitätstypen aus „Identitätstypen", WÖRTLICH übernommen. Vollständig, weil ein
 * Weglassen eine stille Konzeptänderung wäre (Regel Null); „kurzlebige Demo- oder
 * Testidentitäten" ist hier ein IDENTITÄTSTYP des Zielprodukts, kein Hinweis auf den
 * Datenbestand dieser Anwendung (Abgrenzung zu DR-0011).
 */
export const IDENTITAETSTYPEN: readonly string[] = [
  'Kundenbenutzer',
  'Berater und Managed-Service-Personal',
  'externe Auditoren und Lieferanten',
  'Plattform- und Security-Administratoren',
  'Service Accounts und Workload Identities',
  'Connector Identities',
  'kurzlebige Demo- oder Testidentitäten',
  'später klar gekennzeichnete KI-/Agentenidentitäten',
] as const;

/**
 * Stationen des Identitäts-Lebenswegs aus „Joiner, Mover, Leaver" (fünf Einträge). Im Produkt
 * in Domänensprache; die englischen Stationsnamen der Quelle stehen als Kommentar.
 */
export const IDENTITAETS_STATIONEN: readonly ModellPunkt[] = [
  {
    /* Joiner: „Einladung oder Föderation erzeugt keine Fachrechte, bevor Membership und Tenant
       bestätigt wurden." */
    titel: 'Eintritt',
    erlaeuterung:
      'Eine Einladung erzeugt noch keine fachlichen Rechte – erst die bestätigte Mitgliedschaft ' +
      'im Mandanten tut das.',
  },
  {
    /* Mover: „Rollen-, Team-, Service- oder Kundenwechsel werden als Versionen mit
       Gültigkeitszeit modelliert; alte Rechte enden explizit." */
    titel: 'Wechsel',
    erlaeuterung:
      'Rollen-, Team-, Service- oder Kundenwechsel entstehen als Versionen mit Gültigkeitszeit; ' +
      'alte Rechte enden ausdrücklich.',
  },
  {
    /* Leaver: „Sessions, Refresh Tokens, API Keys, Delegationen, offene Freigaben und
       persönliche Links werden widerrufen." */
    titel: 'Austritt',
    erlaeuterung:
      'Sitzungen, Zugangsschlüssel, Delegationen, offene Freigaben und persönliche Links werden ' +
      'widerrufen.',
  },
  {
    /* Dormant Account: „Inaktive Konten werden nach konfigurierter Frist gesperrt und einem
       Review zugeführt." */
    titel: 'Ruhendes Konto',
    erlaeuterung: 'Ein inaktives Konto wird nach einer festgelegten Frist gesperrt und geprüft.',
  },
  {
    /* Orphaned Account: „Service Accounts ohne aktiven Owner werden deaktiviert oder
       eskaliert." */
    titel: 'Konto ohne Verantwortung',
    erlaeuterung:
      'Ein Dienstkonto ohne aktive verantwortliche Person wird deaktiviert oder eskaliert.',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Mandantentrennung (Dok. 19, Abschnitt „Mandantenisolation und Kontextwechsel")
 * --------------------------------------------------------------------------- */

/**
 * Die zehn Schichten aus „Mehrschichtige Isolation" in Domänensprache.
 *
 * WÖRTLICHE QUELLLISTE (eins zu eins, gleiche Reihenfolge): serverseitig abgeleiteter Tenant
 * Context · tenantbewusste Repositories und Query Services · PostgreSQL Row Level Security ·
 * tenantbezogene Storage-Prefixes und Zugriffspolicies · tenantbezogene Queue- und Jobmetadaten ·
 * getrennte Connector Connections und Secret References · tenantgefilterte Search- und
 * Graphprojektionen · tenantbezogene Report Snapshots und Cache Keys · Telemetrie ohne
 * unzulässige Cross-Tenant-Inhalte · tenantselektiven Export, Löschung und Restore.
 *
 * Das ist das ZIELBILD der Trennung. Die Seite behauptet NICHT, dass diese Schichten heute
 * greifen – die serverseitige Durchsetzung gehört zur echten Anmeldung und wird im Produkt als
 * Sach-Lücke benannt, nicht als Alarm.
 */
export const ISOLATIONS_SCHICHTEN: readonly string[] = [
  'Der Mandantenkontext wird serverseitig abgeleitet, nicht aus dem Browser übernommen',
  'Datenzugriffe und Abfragen kennen den Mandanten',
  'Zeilenbezogene Zugriffsregeln in der Datenbank',
  'Getrennte Dateiablage je Mandant',
  'Mandantenbezogene Warteschlangen und Hintergrundaufträge',
  'Getrennte Verbindungen und Zugangsverweise je angebundenem System',
  'Mandantengefilterte Suche und Beziehungsgraph',
  'Mandantenbezogene Berichtsstände und Zwischenspeicher',
  'Betriebsdaten ohne unzulässige mandantenübergreifende Inhalte',
  'Export, Löschung und Wiederherstellung je Mandant',
] as const;

/**
 * Die elf Flächen aus „Metadatenlecks", über die eine Trennung unbemerkt undicht wird.
 *
 * WÖRTLICHE QUELLLISTE (gleiche Reihenfolge): Trefferzahlen · Autocomplete · Graphkanten ·
 * Fehlertexte · IDs und URLs · Downloadgrößen und Dateinamen · Timingunterschiede ·
 * Benachrichtigungen · Caches · Reportvorschauen · Dead Letters und Operations Screens.
 *
 * Genau diese Klasse prüfen die Wächtertests dieser Anwendung an den Leerzuständen.
 */
export const METADATEN_FLAECHEN: readonly string[] = [
  'Trefferzahlen',
  'Autovervollständigung',
  'Beziehungskanten',
  'Fehlertexte',
  'Kennungen und Adressen',
  'Downloadgrößen und Dateinamen',
  'Antwortzeiten',
  'Benachrichtigungen',
  'Zwischenspeicher',
  'Berichtsvorschauen',
  'liegengebliebene Verarbeitungen und Betriebsansichten',
] as const;

/* -----------------------------------------------------------------------------
 * Angebundene Systeme (Dok. 17, Abschnitt „Priorisierter Connector-Katalog")
 * --------------------------------------------------------------------------- */

export interface SystemFamilie {
  /** Spalte „Priorität" der Quelltabelle (P0–P3), unverändert. */
  readonly prioritaet: 'P0' | 'P1' | 'P2' | 'P3';
  /** Spalte „Connector-Familie", wörtlich. */
  readonly familie: string;
  /** Spalte „Nutzen im Zielprodukt", wörtlich. */
  readonly nutzen: string;
}

/**
 * Die vierzehn Systemfamilien aus „Priorisierter Connector-Katalog" – wort- und
 * reihenfolgetreu, weil die Tabelle konkrete Produkt- und Standardfamilien benennt (eine
 * Eindeutschung wäre eine stille Konzeptänderung).
 *
 * BEWUSST NICHT ÜBERNOMMEN: die Spalte „Prototyp-Tiefe" („vollständig funktionsfähig", „echter
 * Sandbox-Connector" …). Sie beschreibt geplante Bautiefe; im Produkt gelesen wäre sie eine
 * Zustandszusage über heute. Ebenso entsteht hier KEIN Zustand je Familie (DR-0008).
 */
export const SYSTEM_FAMILIEN: readonly SystemFamilie[] = [
  {
    prioritaet: 'P0',
    familie: 'Identity / Entra / SCIM',
    nutzen: 'Nutzer, Gruppen, Rollen, Joiner-Mover-Leaver',
  },
  {
    prioritaet: 'P0',
    familie: 'Ticketing / Jira',
    nutzen: 'Tasks, Findings, Status, Kommentare, Links',
  },
  {
    prioritaet: 'P0',
    familie: 'Microsoft Defender XDR',
    nutzen: 'Incidents, Alerts, betroffene Entities',
  },
  {
    prioritaet: 'P0',
    familie: 'Dateiimport CSV/XLSX/JSON',
    nutzen: 'universeller Einstieg und Migration',
  },
  {
    prioritaet: 'P0',
    familie: 'Webhook- und Generic REST Connector',
    nutzen: 'Erweiterbarkeit und Erprobung',
  },
  {
    prioritaet: 'P1',
    familie: 'ServiceNow / CMDB / ITSM',
    nutzen: 'CIs, Incidents, Changes, Tasks',
  },
  {
    prioritaet: 'P1',
    familie: 'Cloud Security / AWS Security Hub',
    nutzen: 'Findings, Ressourcen, Controls',
  },
  {
    prioritaet: 'P1',
    familie: 'Dokumente / SharePoint / Drive',
    nutzen: 'Policies, Evidence, Reviewdaten',
  },
  {
    prioritaet: 'P1',
    familie: 'Kalender / Teams',
    nutzen: 'Termine, Reviews, Auditbesuche',
  },
  {
    prioritaet: 'P1',
    familie: 'Vulnerability Management',
    nutzen: 'Findings, Assets, Remediation',
  },
  {
    prioritaet: 'P2',
    familie: 'SIEM / SOAR / Sentinel / Splunk',
    nutzen: 'Signale, Incidents, Response',
  },
  {
    prioritaet: 'P2',
    familie: 'PSA / Finance / Travel',
    nutzen: 'Aufwand, Kosten, Reisen, Profitabilität',
  },
  {
    prioritaet: 'P2',
    familie: 'HRIS',
    nutzen: 'Organisation, Rollen, Skills, Abwesenheit',
  },
  {
    prioritaet: 'P3',
    familie: 'Branchen- und Spezialtools',
    nutzen: 'individuelle Ökosysteme',
  },
] as const;

/**
 * Wörtlich aus „Priorisierter Connector-Katalog" (Schlusssatz unter der Tabelle) – die
 * wichtigste Ehrlichkeitszeile dieses Katalogs und deshalb im Produkt sichtbar.
 */
export const SYSTEM_FAMILIEN_HINWEIS =
  'Die Priorisierung beschreibt die Produktentwicklung, nicht eine Aussage über kommerzielle ' +
  'Partnerschaften oder bereits implementierte Herstellerintegration.';

/**
 * Die neun Merkmale, die ein Zustand je angebundenem System zusammenfassen WÜRDE – aus
 * „Connector Health Record" (wörtlich: Authentifizierung · Erreichbarkeit · Datenfrische ·
 * Fehlerquote · Rate-Limit-Nähe · Subscription-Status · Schemaabweichungen · Backlog ·
 * Reconciliation Queue), ergänzt um die Sichtbarkeitsforderung aus IA16 „Operative
 * Sichtbarkeit".
 *
 * Es ist kein System angebunden, also entsteht hier KEIN Zustand: die Merkmale stehen als
 * Struktur, ohne Wert und ohne Ampel (DR-0008).
 */
export const SYSTEM_ZUSTAND_MERKMALE: readonly string[] = [
  'Anmeldung am Zielsystem',
  'Erreichbarkeit',
  'Datenfrische',
  'Fehlerquote',
  'Nähe zur Aufrufgrenze',
  'Stand der Ereignis-Abonnements',
  'Abweichungen im Datenaufbau',
  'Rückstand offener Daten',
  'Warteschlange für den Abgleich',
] as const;

/* -----------------------------------------------------------------------------
 * Nachvollziehbare Ereignisse (Dok. 19, Abschnitt „Canonical Audit Records")
 * --------------------------------------------------------------------------- */

/**
 * Die zwölf Auslöser, für die mindestens ein Audit-Eintrag entsteht – Domänensprache.
 *
 * WÖRTLICHE QUELLLISTE (gleiche Reihenfolge): Login-, MFA-, Recovery- und
 * Sessionwiderrufsereignisse · Membership-, Rollen-, Delegations- und Policyänderungen ·
 * Mandanten- oder Kundenkontextwechsel bei kritischen Aktionen · Risikoakzeptanz und
 * Managemententscheidung · Control-, Finding-, Evidence- und Auditstatusänderung · Datei-Upload,
 * Download, Export, Freigabe und Löschung · Support- und Break-Glass-Zugriff · Connector- und
 * Workflowänderungen · produktive Konfigurations-, Schlüssel- und Retentionänderungen · Report
 * Snapshot, Freigabe, Veröffentlichung und Korrektur · Incident-, Recovery- und
 * Restoremaßnahmen · Agenten- oder Automationsaktionen mit fachlicher Wirkung.
 */
export const AUDIT_AUSLOESER: readonly string[] = [
  'Anmeldung, zweiter Faktor, Wiederherstellung und Widerruf einer Sitzung',
  'Änderungen an Mitgliedschaft, Rolle, Vertretung und Regelwerk',
  'Mandanten- oder Kundenwechsel vor kritischen Aktionen',
  'Risikoakzeptanz und Managemententscheidung',
  'Änderungen an Control, Feststellung, Nachweis und Auditstand',
  'Hochladen, Herunterladen, Exportieren, Freigeben und Löschen von Dateien',
  'Support- und Notfallzugriff',
  'Änderungen an angebundenen Systemen und Abläufen',
  'produktive Änderungen an Konfiguration, Schlüsseln und Aufbewahrung',
  'Berichtsstand, Freigabe, Veröffentlichung und Korrektur',
  'Maßnahmen bei Vorfällen, Wiederherstellung und Rücksicherung',
  'Aktionen von Agenten oder Automatisierungen mit fachlicher Wirkung',
] as const;

/**
 * Die dreizehn Mindestfelder eines Audit-Eintrags – Domänensprache, keine technischen
 * Feldnamen (DR-0013 Nr. 2).
 *
 * WÖRTLICHE QUELLLISTE (gleiche Reihenfolge): Record ID und Sequenz · Tenant und Datenraum ·
 * Actor und Actor Type · Identity Assurance und Sessionreferenz · Aktion, Objekt und
 * Objektversion · vorheriger und neuer Zustand oder Delta · Grund, Ticket, Decision oder
 * Workflow · Policy-/Methodenversion · Zeit in UTC und gegebenenfalls Clientzeit · Correlation
 * und Causation ID · Ergebnis und Fehlercode · Integritätsreferenz · Klassifikation und
 * Retention.
 */
export const AUDIT_MINDESTFELDER: readonly string[] = [
  'Kennung und Reihenfolge des Eintrags',
  'Mandant und Datenraum',
  'handelnde Person oder System samt Art',
  'Sicherheitsniveau der Anmeldung und Bezug zur Sitzung',
  'Aktion, Objekt und Objektversion',
  'Zustand vorher und nachher',
  'Grund, Vorgang oder Entscheidung',
  'Version der geltenden Regel und Methode',
  'Zeitpunkt in koordinierter Weltzeit und gegebenenfalls Ortszeit',
  'Verknüpfung zusammenhängender Vorgänge',
  'Ergebnis und Fehlercode',
  'Integritätsnachweis',
  'Klassifikation und Aufbewahrung',
] as const;

/**
 * Aus „Audit- und Evidence-Integrität" (Manipulationsschutz): „Canonical Audit Records werden
 * append-only behandelt. Korrekturen erzeugen neue Records statt Überschreiben."
 */
export const AUDIT_INTEGRITAET =
  'Audit-Einträge werden nur angehängt. Eine Korrektur erzeugt einen neuen Eintrag, statt einen ' +
  'bestehenden zu überschreiben.';

/* -----------------------------------------------------------------------------
 * Betriebsfähigkeit (Dok. 18, Abschnitte „Observability-Architektur",
 * „Logging, Metrics, Tracing und Alerting", „Platform Control Tower und Betriebsprozesse")
 * --------------------------------------------------------------------------- */

/**
 * Was Betriebsfähigkeit im Zielbild bedeutet – vier Punkte, je aus einer benannten Quellstelle.
 * KEINE Kennzahl, KEIN Zustand: im heutigen Bestand gibt es keine Betriebsdaten (DR-0008).
 */
export const BETRIEBS_FAEHIGKEITEN: readonly ModellPunkt[] = [
  {
    /* „Platform Control Tower und Betriebsprozesse": globale und tenantbezogene Service Health,
       SLO und Error Budget. */
    titel: 'Betriebszustand und Fehlerbudget',
    erlaeuterung:
      'Der Betrieb misst Verfügbarkeit gegen ein vereinbartes Ziel und führt ein Fehlerbudget ' +
      'mit – für die Plattform insgesamt und je Mandant.',
  },
  {
    /* TA11 „Observability by Design": „Correlation ID, Causation ID, Tenant ID, Actor, Module,
       Version und Ergebnis werden … mitgeführt." */
    titel: 'Durchgängig verknüpfte Signale',
    erlaeuterung:
      'Jedes Signal trägt Vorgangsbezug, Auslöser, Mandant, handelnde Person, Modul, Version und ' +
      'Ergebnis, damit eine Wirkung bis zu ihrer Ursache verfolgbar bleibt.',
  },
  {
    /* „Logging, Metrics, Tracing und Alerting": „Jeder Alarm besitzt Owner, Severity, Runbook,
       Deduplication und Escalation." */
    titel: 'Alarme mit Verantwortung',
    erlaeuterung:
      'Ein Alarm hat eine verantwortliche Person, eine Einstufung, eine Handlungsanweisung und ' +
      'einen Eskalationsweg – sonst entsteht er nicht.',
  },
  {
    /* „Observability-Architektur" (Telemetriegrenzen): keine Secrets oder vollständigen
       Dokumentinhalte; personenbezogene und tenantbezogene Felder werden minimiert. */
    titel: 'Grenzen der Betriebsdaten',
    erlaeuterung:
      'Betriebsdaten enthalten keine Zugangsgeheimnisse und keine vollständigen Dokumentinhalte; ' +
      'personen- und mandantenbezogene Angaben werden auf das Nötige verkleinert.',
  },
] as const;
