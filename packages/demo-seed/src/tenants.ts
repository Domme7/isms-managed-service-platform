/**
 * Vier synthetische Demo-Mandanten des digitalen Zwillings.
 *
 * QUELLE (kanonische Demo-Welt, verbindlich): Dok. 16 §34.1 „Demo-Unternehmen" — die fünf
 * Kundenfirmen Nordstern Manufacturing SE, AlpenCloud GmbH, Rheinbank Digital AG,
 * MediNova Clinics Holding und GreenGrid Energy Services, plus der Provider „Consulting
 * Operator Demo" (Dok. 07 §20 / Dok. 13–15).
 *
 * DR-0005-Spannung (benannt, nicht still aufgelöst): Dok. 07 §20 nennt eine ältere Vierer-Liste
 * (Nordwerk / Finovia / MediCore / Consulting Operator). Die kanonische Demo-Dramaturgie steht in
 * Dok. 16 §34.1; sie gilt (DR-0006 + WP-021 Human Gate „Dok-16-Fünferliste"). Auflösung wie beim
 * Flaggschiff (Nordwerk→Nordstern): der `tenant_id` bleibt stabil (P02, nicht identitätsstiftend),
 * nur `display_name`/Inhalt wandern auf das Dok-16-Profil. Umbau inkrementell über WP-021
 * (Slice 1 Nordstern ✓; Slice 3 AlpenCloud neu; Slice 4 Finovia-Slot→Rheinbank; Slice 5
 * MediCore-Slot→MediNova; Slice 6 GreenGrid neu, bleibt leer). Solange ein Slot noch den alten
 * Dok-07-Anzeigenamen trägt, ist das der dokumentierte Zwischenstand, kein Widerspruch.
 *
 * INHALT (bewusst synthetisch, Demo-Datenregel `.claude/rules/demo-data.md`):
 * Branche und Kontextbeschreibung sind frei erfunden. KEINE realen Unternehmen,
 * Personen, Preise oder Prozesse.
 *
 * Stabile, unveränderliche `tenant_id` (P02) – dient als harte Mandantengrenze (P09, Dok. 19).
 */

/** Leichtgewichtige Mandantendefinition (Seed-Metadaten, kein Objekt-Envelope). */
export interface DemoTenant {
  /** Stabile, unveränderliche Mandanten-ID (P02); harte Sicherheitsgrenze (P09, Dok. 19). */
  readonly tenant_id: string;
  /** Anzeigename gemäß Dok. 07 §20 (feststehend, nicht identitätsstiftend). */
  readonly display_name: string;
  /** Synthetische Branchenzuordnung (frei erfunden). */
  readonly industry: string;
  /** Kurze, synthetische Kontextbeschreibung des Demo-Mandanten. */
  readonly description: string;
  /** Ob dieser Mandant im aktuellen Seed bereits eigene Objekte im Zwilling besitzt. */
  readonly has_object_graph: boolean;
}

export const TENANT_ID = {
  NORDWERK: 'tenant-nordwerk',
  FINOVIA: 'tenant-finovia',
  MEDICORE: 'tenant-medicore',
  ALPENCLOUD: 'tenant-alpencloud',
  GREENGRID: 'tenant-greengrid',
  CONSULTING_OPERATOR: 'tenant-consulting-operator',
} as const;

/**
 * Die sechs Demo-Mandanten (fünf Dok-16-Kundenfirmen + Provider). Ausmodelliert sind derzeit
 * Nordstern/Nordwerk (ISMS-Kerngraph + Managed-Service- + Entscheidungsschicht) und der Consulting
 * Operator Demo (Managed-Service-Schicht, WP-012 Slice 1). Die übrigen Kundenfirmen folgen in
 * WP-021 Slices 3–5: AlpenCloud (✓) und Rheinbank (✓, Slot `tenant-finovia`) tragen eigene
 * ISMS-Graphen; der MediNova-Slot (`tenant-medicore`) folgt in Slice 5. GreenGrid bleibt bewusst
 * OHNE Objektgraph (getrennter, noch nicht erhobener Discovery-Scope + Owner-Direktive „ein Mandant
 * bleibt leer"). Bis dahin belegt der MediCore-Slot den Empty-State.
 */
export const DEMO_TENANTS: readonly DemoTenant[] = [
  {
    // Flaggschiff der Demo-Welt. Anzeigename nach Dok. 16 §34.1 („Demo-Unternehmen"): der
    // `display_name` ist „änderbar, nicht identitätsstiftend" (Dok. 07 §7), die STABILE
    // `tenant_id` bleibt `tenant-nordwerk` — so bricht keine der bestehenden ID-Referenzen
    // (WP-021 Slice 1, minimal-disruptiv).
    tenant_id: TENANT_ID.NORDWERK,
    display_name: 'Nordstern Manufacturing SE',
    industry: 'Industrielle Fertigung / Maschinenbau (synthetisch)',
    description:
      'Synthetischer europäischer Produzent mit vernetzter Fertigung an zwei Standorten und ' +
      'einem bevorstehenden Kunden-Audit (Dok. 16 §34.1: Zielreife 3, begrenzte interne ' +
      'Kapazität). ISMS-Fokus auf Verfügbarkeit der Fertigung, Schutz von Auftrags- und ' +
      'Konstruktionsdaten sowie Resilienz gegen Ransomware im Produktionsnetz.',
    has_object_graph: true,
  },
  {
    // Dok. 16 §34.1 Nr. 3: stark regulierter Finanzdienstleister, mehrere Zielprofile, hohe
    // Nachweistiefe, strikte Datenresidenz. Slot `tenant-finovia` (stabile ID), Anzeige→Rheinbank
    // (WP-021 Slice 4); eigener ISMS-Graph. Die stabile `tenant_id` bleibt `tenant-finovia`.
    tenant_id: TENANT_ID.FINOVIA,
    display_name: 'Rheinbank Digital AG',
    industry: 'Regulierter Finanzdienstleister / Direktbank (synthetisch)',
    description:
      'Synthetischer, stark regulierter Finanzdienstleister mit mehreren Zielprofilen, hoher ' +
      'Nachweistiefe und strikter Datenresidenz. ISMS-Fokus auf Vertraulichkeit der Konto- und ' +
      'Zahlungsverkehrsdaten, Verbleib der Daten in der Residenzregion und lückenlose ' +
      'Nachweisführung gegenüber der Aufsicht.',
    has_object_graph: true,
  },
  {
    tenant_id: TENANT_ID.MEDICORE,
    display_name: 'MediCore Health Services GmbH',
    industry: 'Gesundheitsdienstleistung / eHealth (synthetisch)',
    description:
      'Synthetischer Gesundheitsdienstleister mit besonders schützenswerten ' +
      'Gesundheitsdaten. ISMS-Fokus auf Datenschutz, Zugriffskontrolle und ' +
      'Verfügbarkeit patientennaher Systeme.',
    has_object_graph: false,
  },
  {
    // Dok. 16 §34.1 Nr. 2: Cloud-Softwareanbieter, schnelles Wachstum, Zertifizierungsziel,
    // hohe Automatisierungsbereitschaft. Neuer Mandant (WP-021 Slice 3); eigener ISMS-Graph.
    tenant_id: TENANT_ID.ALPENCLOUD,
    display_name: 'AlpenCloud GmbH',
    industry: 'Cloud-Softwareanbieter / SaaS (synthetisch)',
    description:
      'Synthetischer Cloud-Softwareanbieter mit schnellem Wachstum und einem ' +
      'Zertifizierungsziel. ISMS-Fokus auf Automatisierung der Nachweisführung, Absicherung ' +
      'der Cloud-Ressourcen und Schritthalten der Kontrollabdeckung mit dem Wachstum.',
    has_object_graph: true,
  },
  {
    // Dok. 16 §34.1 Nr. 5: M&A-Szenario mit neu erworbener Tochtergesellschaft und getrenntem
    // Discovery-Scope. Neuer Mandant (WP-021 Slice 6); bleibt bewusst OHNE Objektgraph — der
    // getrennte Erhebungsumfang der erworbenen Tochter ist noch nicht aufgenommen, der ehrliche
    // Leerzustand (kein erfundener Zwilling) ist hier die Aussage (Owner-Direktive „ein Mandant
    // bleibt leer").
    tenant_id: TENANT_ID.GREENGRID,
    display_name: 'GreenGrid Energy Services',
    industry: 'Energiedienstleistung (synthetisch)',
    description:
      'Synthetischer Energiedienstleister in einem Zusammenschluss-Szenario: eine neu ' +
      'erworbene Tochtergesellschaft mit getrenntem Erhebungsumfang. ISMS-Fokus auf die ' +
      'getrennte Aufnahme der Tochter, bevor Objekte, Risiken und Nachweise erfasst sind.',
    has_object_graph: false,
  },
  {
    tenant_id: TENANT_ID.CONSULTING_OPERATOR,
    display_name: 'Consulting Operator Demo',
    industry: 'Managed-Service-/Beratungsbetreiber (synthetisch)',
    description:
      'Synthetischer Managed-Service-Betreiber, der ISMS-Dienstleistungen für ' +
      'mehrere Mandanten erbringt. Dient als Demo-Kontext für Serviceverantwortung, ' +
      'Deliverables und mandantenübergreifende, ausschließlich anonymisierte Benchmarks.',
    // WP-012 Slice 1: eigene Managed-Service-Objekte vorhanden (Service, SLA, Deliverable).
    has_object_graph: true,
  },
] as const;
