/**
 * Vier synthetische Demo-Mandanten des digitalen Zwillings.
 *
 * QUELLE (Namen, verbindlich): Dok. 07 v1.0, Abschnitt 20 ("Synthetische Demodaten"):
 *   "Die Demoumgebung nutzt Nordwerk Manufacturing SE, Finovia Digital Bank AG,
 *    MediCore Health Services GmbH und Consulting Operator Demo."
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
  /** Ob dieser Mandant in Slice 2 bereits einen kohärenten Objektgraphen besitzt. */
  readonly has_object_graph: boolean;
}

export const TENANT_ID = {
  NORDWERK: 'tenant-nordwerk',
  FINOVIA: 'tenant-finovia',
  MEDICORE: 'tenant-medicore',
  CONSULTING_OPERATOR: 'tenant-consulting-operator',
} as const;

/**
 * Die vier Demo-Mandanten. Nur Nordwerk erhält in Slice 2 einen ausmodellierten
 * Objektgraphen; die übrigen drei sind als stabile Mandantendefinitionen angelegt
 * (Graphen folgen in späteren Work Packages, konsistent zu Dok. 07 §20).
 */
export const DEMO_TENANTS: readonly DemoTenant[] = [
  {
    tenant_id: TENANT_ID.NORDWERK,
    display_name: 'Nordwerk Manufacturing SE',
    industry: 'Industrielle Fertigung / Maschinenbau (synthetisch)',
    description:
      'Synthetischer Industriekonzern mit vernetzter Produktion. ISMS-Fokus auf ' +
      'Verfügbarkeit der Fertigung, Schutz von Auftrags- und Konstruktionsdaten sowie ' +
      'Resilienz gegen Ransomware im Produktionsnetz.',
    has_object_graph: true,
  },
  {
    tenant_id: TENANT_ID.FINOVIA,
    display_name: 'Finovia Digital Bank AG',
    industry: 'Digitale Bank / Finanzdienstleistung (synthetisch)',
    description:
      'Synthetische Direktbank mit hoher Regulierungsdichte. ISMS-Fokus auf ' +
      'Vertraulichkeit von Kundendaten, Zahlungsintegrität und Nachweisführung ' +
      'gegenüber Aufsicht und Auditoren.',
    has_object_graph: false,
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
    tenant_id: TENANT_ID.CONSULTING_OPERATOR,
    display_name: 'Consulting Operator Demo',
    industry: 'Managed-Service-/Beratungsbetreiber (synthetisch)',
    description:
      'Synthetischer Managed-Service-Betreiber, der ISMS-Dienstleistungen für ' +
      'mehrere Mandanten erbringt. Dient als Demo-Kontext für Serviceverantwortung, ' +
      'Deliverables und mandantenübergreifende, ausschließlich anonymisierte Benchmarks.',
    has_object_graph: false,
  },
] as const;
