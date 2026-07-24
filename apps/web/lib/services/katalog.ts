/**
 * Servicekatalog-Strukturen aus dem Konzept (WP-006 Slice 2, read-only, VOLLSTÄNDIG PREISFREI).
 *
 * QUELLE (Regel Null, am PDF gegengelesen – nichts erfunden, nichts weggelassen):
 *   docs/concept/pdf/Dokument_14_Servicekatalog_Pakete_SLAs_Preislogik_v1.0.pdf
 *   - `SERVICEFAMILIEN`  ← Abschnitt „Servicefamilien und vollständiger Katalog",
 *      Unterabschnitt „Katalogübersicht" (Tabelle ID/Servicefamilie/Primärer Outcome/
 *      Typischer Käufer): SF01–SF12, worttreu.
 *   - `SERVICE_OFFERS`   ← Abschnitt „Servicefamilien und vollständiger Katalog",
 *      Unterabschnitt „Kanonische Service Offers" (Tabelle Offer-ID/Service Offer/
 *      Standardergebnis/Typischer Rhythmus): SO01–SO15, worttreu.
 *   - `SERVICE_TIEFEN`   ← Abschnitt „Service-Tiefen statt starrer Goldpakete"
 *      (Tabelle Tiefe/Kurzbeschreibung/Kunde/Provider/Geeignet für): L1–L4, worttreu.
 *   - `PAKETFAMILIEN`    ← Abschnitt „Paketarchitektur", Unterabschnitt „Empfohlene
 *      Paketfamilien" (Tabelle Paket/Zielbild/Enthaltene Kern-Offers/Typische Tiefe): 6 Pakete.
 *   - `PAKET_BESTANDTEILE` ← Abschnitt „Paketarchitektur", Unterabschnitt „Paketprinzip"
 *      („Jedes Paket enthält:" – acht Punkte).
 *   - `ANGEBOTSKARTE_FRAGEN` ← Abschnitt „Servicefamilien und vollständiger Katalog",
 *      Unterabschnitt „Angebotskarte je Service" (zehn Fragen).
 *   - `LEITPLANKEN` ← Abschnitt „Kommerzielle Verfassung" (CP11) und Abschnitt „Preis- und
 *      Angebots-UX", Unterabschnitt „Opportunity Card" („Verbot der automatischen Buchung");
 *      dazu der Hinweis aus „Service-Tiefen statt starrer Goldpakete".
 *
 * PREISFREIHEIT ABSOLUT (O-KUNDE-01, DR-0008): Keine Zahl, kein Währungszeichen, kein Preisband
 * wird übernommen. Die Preisbestandteile der Quellstruktur – Angebotskarte-Frage 8
 * („Wie wird der Preis gebildet?") und Paketbestandteil „eine illustrative Preisbandbreite" –
 * erscheinen ausschließlich als BENANNTE LÜCKE (`istPreisluecke: true`), nie als Wert. Die
 * Dok.-14-Abschnitte „Preisverfassung und Preisformel", „Illustrative Managed-Service-Pakete",
 * „Illustrative Einzelservice-Bänder", „Öffentliche Marktanker" werden GAR NICHT übernommen;
 * ihre Existenz wird nur als Lücke benannt (siehe UI-Text und O-WP006-05 / O-KUNDE-01).
 *
 * KEIN OBJEKTVERTRAG: Service Family, Service Offer und Package sind KEINE kanonischen
 * Objekttypen (Dok. 07 F01–F09; O-WP006-02 / vgl. O-WP012-01). Der Katalog lebt deshalb als
 * react-freie Code-Konstante, nicht als Seed-Objekt oder Contract-Typ. Er trägt KEINEN Bezug zu
 * den Seed-Service-Instanzen eines Mandanten (kein Mapping Instanz↔Offer).
 *
 * React-frei und deterministisch testbar (Muster `lib/shell/roles.ts`).
 */

/* -----------------------------------------------------------------------------
 * Servicefamilien (SF01–SF12) – Abschnitt „Servicefamilien und vollständiger Katalog",
 * Unterabschnitt „Katalogübersicht"
 * --------------------------------------------------------------------------- */

export interface Servicefamilie {
  /** Katalog-ID SF01–SF12 (Spalte „ID"). */
  readonly id: string;
  /** Servicefamilie (Spalte „Servicefamilie"), worttreu. */
  readonly name: string;
  /** Primärer Outcome (Spalte „Primärer Outcome"), worttreu. */
  readonly outcome: string;
  /** Typischer Käufer (Spalte „Typischer Käufer"), worttreu. */
  readonly kaeufer: string;
}

/** Die zwölf Servicefamilien, worttreu aus der Katalogübersicht (SF01–SF12). */
export const SERVICEFAMILIEN: readonly Servicefamilie[] = [
  {
    id: 'SF01',
    name: 'ISMS Governance & Leadership',
    outcome:
      'Das ISMS besitzt klare Ziele, Entscheidungen, Rollen und einen belastbaren Betriebsrhythmus.',
    kaeufer: 'Executive Sponsor, CISO',
  },
  {
    id: 'SF02',
    name: 'Risk & Treatment',
    outcome: 'Risiken werden aktuell, erklärbar und wirksam behandelt.',
    kaeufer: 'CISO, ISMS Manager',
  },
  {
    id: 'SF03',
    name: 'Control Assurance & Evidence',
    outcome: 'Control-Design, Umsetzung, Betrieb und Wirksamkeit sind nachvollziehbar belegt.',
    kaeufer: 'ISMS Manager, Auditor',
  },
  {
    id: 'SF04',
    name: 'Policy & Documentation',
    outcome: 'Vorgaben sind aktuell, freigegeben, verständlich und tatsächlich anwendbar.',
    kaeufer: 'ISMS Manager, Legal, HR',
  },
  {
    id: 'SF05',
    name: 'Audit & Certification Readiness',
    outcome:
      'Prüfungen werden planbar vorbereitet; Datenlücken und Findings werden früh gesteuert.',
    kaeufer: 'CISO, Audit Lead',
  },
  {
    id: 'SF06',
    name: 'Third-Party & Supply Chain',
    outcome: 'Kritische Lieferanten werden risikobasiert bewertet und überwacht.',
    kaeufer: 'Procurement, CISO',
  },
  {
    id: 'SF07',
    name: 'Threat, Vulnerability & Incident Governance',
    outcome: 'Technische Signale werden in geschäftliche Prioritäten und Governance übersetzt.',
    kaeufer: 'Security Lead, CISO',
  },
  {
    id: 'SF08',
    name: 'Awareness & Competence',
    outcome: 'Zielgruppen besitzen nachweisbare Fähigkeiten und angemessenes Sicherheitsverhalten.',
    kaeufer: 'HR, CISO',
  },
  {
    id: 'SF09',
    name: 'Compliance & Regulatory Change',
    outcome: 'Relevante Anforderungen werden erkannt, bewertet und in konkrete Changes übersetzt.',
    kaeufer: 'Compliance, CISO',
  },
  {
    id: 'SF10',
    name: 'Reporting & Decision Support',
    outcome: 'Management erhält freigabefähige Entscheidungen, Reports und Wirkungssimulationen.',
    kaeufer: 'Vorstand, CISO',
  },
  {
    id: 'SF11',
    name: 'Virtual CISO / ISMS Office',
    outcome: 'Eine fehlende oder überlastete Sicherheitsführungsfunktion wird dauerhaft ergänzt.',
    kaeufer: 'Geschäftsführung',
  },
  {
    id: 'SF12',
    name: 'Platform & Data Operations',
    outcome: 'Plattform, Integrationen, Datenqualität und Automationen bleiben betriebsfähig.',
    kaeufer: 'Tenant Admin, ISMS Manager',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Kanonische Service Offers (SO01–SO15) – Abschnitt „Servicefamilien und vollständiger
 * Katalog", Unterabschnitt „Kanonische Service Offers"
 * --------------------------------------------------------------------------- */

export interface ServiceOffer {
  /** Offer-ID SO01–SO15 (Spalte „Offer-ID"). */
  readonly id: string;
  /** Service Offer (Spalte „Service Offer"), worttreu. */
  readonly name: string;
  /** Standardergebnis (Spalte „Standardergebnis"), worttreu. */
  readonly ergebnis: string;
  /** Typischer Rhythmus (Spalte „Typischer Rhythmus"), worttreu. */
  readonly rhythmus: string;
}

/** Die fünfzehn kanonischen Service Offers, worttreu (SO01–SO15). */
export const SERVICE_OFFERS: readonly ServiceOffer[] = [
  {
    id: 'SO01',
    name: 'Managed ISMS Governance',
    ergebnis:
      'Governance-Kalender, Zielsteuerung, Rollen, Management Review und Decision Records sind aktiv.',
    rhythmus: 'monatlich / quartalsweise',
  },
  {
    id: 'SO02',
    name: 'Managed Risk Management',
    ergebnis:
      'Risikoregister, Reviews, Treatment und Eskalationen bleiben aktuell und entscheidungsfähig.',
    rhythmus: 'monatlich + eventbasiert',
  },
  {
    id: 'SO03',
    name: 'Managed Control Assurance',
    ergebnis: 'Priorisierte Controls werden geplant getestet, belegt und auf Wirksamkeit geprüft.',
    rhythmus: 'monatlich / quartalsweise',
  },
  {
    id: 'SO04',
    name: 'Managed Policy Lifecycle',
    ergebnis:
      'Policies werden entworfen, abgestimmt, freigegeben, kommuniziert und rechtzeitig reviewed.',
    rhythmus: 'laufend + jährliche Zyklen',
  },
  {
    id: 'SO05',
    name: 'Managed Evidence Operations',
    ergebnis: 'Evidence Requests, Validierung, Ablaufdaten und Audit-Pakete werden gesteuert.',
    rhythmus: 'laufend / auditbezogen',
  },
  {
    id: 'SO06',
    name: 'Managed Audit Readiness',
    ergebnis:
      'Auditroute, Readiness, Dry Runs, Evidence Packs, Termine und Findings werden orchestriert.',
    rhythmus: 'T-180 bis Post-Audit',
  },
  {
    id: 'SO07',
    name: 'Managed Supplier Risk',
    ergebnis: 'Kritische Lieferanten werden segmentiert, bewertet, nachverfolgt und eskaliert.',
    rhythmus: 'laufend / jährlich',
  },
  {
    id: 'SO08',
    name: 'Managed Threat & Vulnerability Governance',
    ergebnis:
      'Relevante Threats und Schwachstellen werden auf Assets, Risiken, Controls und Maßnahmen gemappt.',
    rhythmus: 'wöchentlich + eventbasiert',
  },
  {
    id: 'SO09',
    name: 'Managed Findings & Exceptions',
    ergebnis:
      'Findings, Ausnahmen, Akzeptanzen und Corrective Actions bleiben kontrolliert und nachvollziehbar.',
    rhythmus: 'laufend',
  },
  {
    id: 'SO10',
    name: 'Managed Awareness & Competence',
    ergebnis:
      'Kampagnen, Rollenanforderungen, Teilnahme, Wirksamkeit und Verbesserungen werden gesteuert.',
    rhythmus: 'quartalsweise / jährlich',
  },
  {
    id: 'SO11',
    name: 'Regulatory Change Monitoring',
    ergebnis: 'regulatorische Änderungen werden bewertet, gemappt und in Change-Pakete übersetzt.',
    rhythmus: 'monatlich + eventbasiert',
  },
  {
    id: 'SO12',
    name: 'Executive Reporting & Board Advisory',
    ergebnis:
      'Board- und Managementpakete werden aus freigegebenen Snapshots erzeugt und erläutert.',
    rhythmus: 'monatlich / quartalsweise',
  },
  {
    id: 'SO13',
    name: 'Virtual CISO / Strategic Security Office',
    ergebnis:
      'Sicherheitsstrategie, Governance, Board-Kommunikation und priorisierte Roadmap werden geführt.',
    rhythmus: 'monatlicher Retainer',
  },
  {
    id: 'SO14',
    name: 'Platform & Integration Operations',
    ergebnis:
      'Connectoren, Datenqualität, Rechte, Workflow-Packs und Reporting laufen kontrolliert.',
    rhythmus: 'laufend',
  },
  {
    id: 'SO15',
    name: 'ISMS Transition & Target Profile',
    ergebnis:
      'Scope, Strategie-DNA, Baseline, Datenmodell, Roadmap und Operational Readiness werden aufgebaut.',
    rhythmus: 'einmalig / 6-16 Wochen',
  },
] as const;

/* -----------------------------------------------------------------------------
 * Service-Tiefen (L1–L4) – Abschnitt „Service-Tiefen statt starrer Goldpakete"
 * --------------------------------------------------------------------------- */

export interface ServiceTiefe {
  /** Tiefe-ID L1–L4 mit Kurzname (Spalte „Tiefe"), worttreu. */
  readonly id: string;
  /** Kurzname der Tiefe (aus Spalte „Tiefe", z. B. „Guide"). */
  readonly kurzname: string;
  /** Kurzbeschreibung (Spalte „Kurzbeschreibung"), worttreu. */
  readonly beschreibung: string;
  /** Rolle des Kunden (Spalte „Kunde"), worttreu. */
  readonly kunde: string;
  /** Rolle des Providers (Spalte „Provider"), worttreu. */
  readonly provider: string;
  /** Geeignet für (Spalte „Geeignet für"), worttreu. */
  readonly geeignetFuer: string;
}

/**
 * Die vier Service-Tiefen, worttreu (L1 Guide, L2 Co-Manage, L3 Operate, L4 Embedded Office).
 * „Sie beschreiben Verantwortung und Delivery-Intensität, nicht Prestige." (Quelle, Fließtext).
 */
export const SERVICE_TIEFEN: readonly ServiceTiefe[] = [
  {
    id: 'L1',
    kurzname: 'Guide',
    beschreibung: 'Fachliche Führung und Qualitätssicherung',
    kunde: 'führt operativ aus',
    provider: 'analysiert, berät, reviewt',
    geeignetFuer: 'reife interne Teams mit punktuellem Bedarf',
  },
  {
    id: 'L2',
    kurzname: 'Co-Manage',
    beschreibung: 'Gemeinsame operative Leistung',
    kunde: 'teilt Owner und Umsetzung',
    provider: 'übernimmt definierte Work Packages',
    geeignetFuer: 'Teams mit Kapazitäts- oder Skilllücken',
  },
  {
    id: 'L3',
    kurzname: 'Operate',
    beschreibung: 'Provider führt den laufenden Service',
    kunde: 'liefert Mitwirkung und Freigaben',
    provider: 'plant, führt aus, berichtet und verbessert',
    geeignetFuer: 'ausgelagerte oder stark entlastete ISMS-Funktion',
  },
  {
    id: 'L4',
    kurzname: 'Embedded Office',
    beschreibung: 'Integrierte Sicherheitsführungs- und Delivery-Funktion',
    kunde: 'behält Governance und Risikoentscheidung',
    provider: 'stellt Team, Führung, Spezialisten und Betriebsmodell',
    geeignetFuer: 'komplexe, regulierte oder multi-entity Organisationen',
  },
] as const;

/**
 * Hinweis aus dem Abschnitt „Service-Tiefen statt starrer Goldpakete" (Fließtext, worttreu-nah):
 * „Nicht jedes Service Offer unterstützt alle Tiefen." Ein Mapping Offer→zulässige Tiefe steht
 * NICHT als Tabelle im Konzept (nur ein Beispiel im Fließtext) – es wird daher nicht behauptet.
 */
export const TIEFEN_HINWEIS =
  'Nicht jedes Service Offer unterstützt alle Tiefen. Die Plattform zeigt pro Offer nur ' +
  'zulässige Konfigurationen; welche das je Offer sind, ist im Konzept nicht als Tabelle ' +
  'festgelegt und wird hier nicht behauptet.';

/* -----------------------------------------------------------------------------
 * Paketarchitektur – Abschnitt „Paketarchitektur"
 * --------------------------------------------------------------------------- */

export interface Paketfamilie {
  /** Paketname (Spalte „Paket"), worttreu. */
  readonly name: string;
  /** Zielbild (Spalte „Zielbild"), worttreu. */
  readonly zielbild: string;
  /** Enthaltene Kern-Offers (Spalte „Enthaltene Kern-Offers"), worttreu (Kürzel wie im Konzept). */
  readonly kernOffers: string;
  /** Typische Tiefe (Spalte „Typische Tiefe"), worttreu. */
  readonly typischeTiefe: string;
}

/** Die sechs empfohlenen Paketfamilien, worttreu (Tabelle „Empfohlene Paketfamilien"). */
export const PAKETFAMILIEN: readonly Paketfamilie[] = [
  {
    name: 'Navigate',
    zielbild: 'Ein internes Team erhält Struktur, Priorität und seniorige Führung.',
    kernOffers: 'SO01, SO02, SO12, Plattform',
    typischeTiefe: 'L1 Guide',
  },
  {
    name: 'Co-Managed ISMS',
    zielbild: 'Kunde und Provider betreiben das ISMS gemeinsam.',
    kernOffers: 'SO01-05, SO09, SO12, Plattform',
    typischeTiefe: 'L2 Co-Manage',
  },
  {
    name: 'Managed ISMS Office',
    zielbild: 'Der laufende ISMS-Betrieb wird weitgehend übernommen.',
    kernOffers: 'SO01-05, SO07, SO09-12, SO14',
    typischeTiefe: 'L3 Operate',
  },
  {
    name: 'Embedded Security Office',
    zielbild: 'Führung, Delivery und Spezialisten werden als integrierte Funktion bereitgestellt.',
    kernOffers: 'SO01-14 nach Scope',
    typischeTiefe: 'L4 Embedded Office',
  },
  {
    name: 'Audit Route',
    zielbild: 'Ein konkretes Audit- oder Zertifizierungsziel wird kontrolliert vorbereitet.',
    kernOffers: 'SO05, SO06, SO09, SO12, optional SO15',
    typischeTiefe: 'Projekt + Retainer',
  },
  {
    name: 'Regulatory Route',
    zielbild: 'NIS2-, DORA-, TISAX-, BSI- oder andere Zielroute wird operationalisiert.',
    kernOffers: 'SO01, SO02, SO03, SO11, SO12, optional Branchenpack',
    typischeTiefe: 'L1-L3',
  },
] as const;

export interface PaketBestandteil {
  /** Bestandteil, worttreu aus „Jedes Paket enthält:". */
  readonly text: string;
  /**
   * `true` beim Preisbestandteil („eine illustrative Preisbandbreite"): erscheint AUSSCHLIESSLICH
   * als benannte Lücke, nie als Wert (O-KUNDE-01 / O-WP006-05, DR-0008). Der Preis-Guardrail
   * bleibt in Stufe 1 streng.
   */
  readonly istPreisluecke?: boolean;
}

/**
 * Die acht Pflichtbestandteile je Paket (Abschnitt „Paketarchitektur", „Paketprinzip"). Der
 * achte Bestandteil („eine illustrative Preisbandbreite") ist ein Preisbestandteil und wird
 * NICHT als Wert übernommen – er erscheint als benannte Lücke (`istPreisluecke`).
 */
export const PAKET_BESTANDTEILE: readonly PaketBestandteil[] = [
  { text: 'ein Plattformniveau' },
  { text: 'eine Baseline an Governance- und Reporting-Leistungen' },
  { text: 'definierte Service Offers' },
  { text: 'Service-Tiefen und Leistungsbänder' },
  { text: 'ein Zielprofil und geeignete Kundensituationen' },
  { text: 'optionale Add-ons' },
  { text: 'klare Nicht-Enthalten-Punkte' },
  { text: 'eine illustrative Preisbandbreite', istPreisluecke: true },
] as const;

/**
 * „Pakete beschleunigen die Auswahl, ersetzen aber keine Charter." (Abschnitt „Paketarchitektur",
 * „Paketprinzip", worttreu). „Jedes Paket wird vor Aktivierung in einzelne Service Instances
 * aufgelöst" (Abschnitt „Kanonische Katalog- und Preisobjekte", „Package").
 */
export const PAKET_PRINZIP =
  'Pakete beschleunigen die Auswahl, ersetzen aber keine Charter. Ein Paket ist ein Startpunkt, ' +
  'kein Zwang; es wird vor Aktivierung in einzelne Service Instances aufgelöst.';

/* -----------------------------------------------------------------------------
 * Angebotskarte je Service – Abschnitt „Servicefamilien und vollständiger Katalog",
 * Unterabschnitt „Angebotskarte je Service" (zehn Fragen)
 * --------------------------------------------------------------------------- */

export interface AngebotskarteFrage {
  /** Position 1–10 (Reihenfolge des Konzepts). */
  readonly nummer: number;
  /** Fragetext, worttreu. */
  readonly frage: string;
  /**
   * `true` bei Frage 8 („Wie wird der Preis gebildet?"): erscheint als benannte Lücke, nie mit
   * einer Preisangabe (O-KUNDE-01, DR-0008). Der Guardrail bleibt in Stufe 1 streng.
   */
  readonly istPreisluecke?: boolean;
}

/** Die zehn Fragen der einheitlichen Angebotskarte je Service, worttreu. */
export const ANGEBOTSKARTE_FRAGEN: readonly AngebotskarteFrage[] = [
  { nummer: 1, frage: 'Welches Problem löst der Service?' },
  { nummer: 2, frage: 'Welches Ergebnis kauft der Kunde?' },
  { nummer: 3, frage: 'Was ist konkret enthalten?' },
  { nummer: 4, frage: 'Was bleibt beim Kunden?' },
  { nummer: 5, frage: 'Welche Daten und Voraussetzungen werden benötigt?' },
  { nummer: 6, frage: 'Wie häufig und in welchem Service-Level wird gearbeitet?' },
  { nummer: 7, frage: 'Wie wird Qualität und Wirkung gemessen?' },
  { nummer: 8, frage: 'Wie wird der Preis gebildet?', istPreisluecke: true },
  { nummer: 9, frage: 'Welche internen und externen Alternativen bestehen?' },
  { nummer: 10, frage: 'Wie kann der Service reduziert, erweitert oder beendet werden?' },
] as const;

/* -----------------------------------------------------------------------------
 * Leitplanken – Abschnitt „Kommerzielle Verfassung" (CP11) und „Preis- und Angebots-UX"
 * --------------------------------------------------------------------------- */

export interface Leitplanke {
  /** Kurztitel der Leitplanke (Anzeige). */
  readonly titel: string;
  /** Beschreibung, worttreu bzw. worttreu-nah aus dem genannten Abschnitt. */
  readonly beschreibung: string;
}

/**
 * Die sichtbaren Leitplanken des Katalogs (worttreu-nah aus dem Konzept):
 *  - CP11 (Abschnitt „Kommerzielle Verfassung", „Globale Prinzipien"),
 *  - Verbot der automatischen Buchung (Abschnitt „Preis- und Angebots-UX", „Opportunity Card"),
 *  - kein Bronze/Silber/Gold-Zwang (Abschnitt „Kommerzielle Verfassung", „Was ausdrücklich
 *    vermieden wird").
 */
export const LEITPLANKEN: readonly Leitplanke[] = [
  {
    titel: 'Interne Alternative bleibt sichtbar',
    beschreibung:
      'Serviceempfehlungen zeigen auch Selbstbetrieb und Nichtstun-Option, damit die Plattform ' +
      'nicht zur versteckten Verkaufsmaschine wird.',
  },
  {
    titel: 'Verbot der automatischen Buchung',
    beschreibung:
      'Eine Service Opportunity Card benennt benötigte Freigaben und schließt eine automatische ' +
      'Buchung aus – eine Aktivierung braucht eine menschliche Entscheidung.',
  },
  {
    titel: 'Service-Tiefen statt starrer Goldpakete',
    beschreibung:
      'Der Katalog vermeidet starre Bronze/Silber/Gold-Pakete ohne Bezug zum Kundenziel; ' +
      'Service-Tiefen beschreiben Verantwortung und Delivery-Intensität, nicht Prestige.',
  },
] as const;
