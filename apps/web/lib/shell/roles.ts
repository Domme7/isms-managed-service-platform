/**
 * Kanonisches Rollenmodell der Login-/Rollensimulation (WP-011).
 *
 * QUELLE (verbindlich, nichts erfunden):
 *  - Rollen R01–R12 wörtlich aus Dok. 03 v1.0 §3 ("Kanonisches Rollenmodell").
 *  - Zuordnung Rolle → Erlebniswelt aus Dok. 06 v1.0 §5 ("Rollenbezogene Erlebniswelten").
 *
 * WICHTIG: Diese Datei bildet ausschließlich Demo-Navigation ab. Sie ist KEINE
 * Autorisierung und KEINE Sicherheitsgrenze (Dok. 19 / `.claude/rules/security.md`).
 * Die aktive Rolle ist reine Perspektive auf ein gemeinsames Datenmodell (Dok. 06 P02/06-D05).
 */

/** Die vier rollenbezogenen Erlebniswelten (Dok. 06 §5). */
export type WorldId = 'executive' | 'operations' | 'consulting' | 'assurance';

export interface ExperienceWorld {
  readonly id: WorldId;
  /** Name der Erlebniswelt (Dok. 06 §5). */
  readonly name: string;
  /** Leitfrage der Welt (Dok. 06 §5) – rahmt die Startseite je Rolle. */
  readonly leitfrage: string;
}

/** Wörtlich aus Dok. 06 §5 (Name + Leitfrage je Welt). */
export const EXPERIENCE_WORLDS: Readonly<Record<WorldId, ExperienceWorld>> = {
  executive: {
    id: 'executive',
    name: 'Executive World',
    leitfrage:
      'Bin ich auf Kurs, welche Geschäftsrisiken bedrohen Ziele und was muss ich entscheiden?',
  },
  operations: {
    id: 'operations',
    name: 'Customer Operations World',
    leitfrage: 'Was ist heute zu tun, warum und wie belege ich Wirksamkeit?',
  },
  consulting: {
    id: 'consulting',
    name: 'Consulting & Service World',
    leitfrage: 'Welcher Mandant benötigt Aufmerksamkeit und wie skaliert die Delivery?',
  },
  assurance: {
    id: 'assurance',
    name: 'Assurance & Administration World',
    leitfrage:
      'Ist die Aussage belastbar, der Zugriff kontrolliert und der Betrieb nachvollziehbar?',
  },
};

/** Sphäre einer Rolle (Dok. 03 §3, Spalte "Sphäre"). */
export type RoleSphere = 'Kunde' | 'Betreiber' | 'Unabhängig' | 'Beide';

export interface DemoRole {
  /** Kanonische Rollen-ID R01–R12 (Dok. 03 §3). */
  readonly id: string;
  /** Produktrolle (Dok. 03 §3, Spalte "Produktrolle"). */
  readonly name: string;
  /** Sphäre (Dok. 03 §3). */
  readonly sphere: RoleSphere;
  /** Kernverantwortung (Dok. 03 §3, Spalte "Kernverantwortung"). */
  readonly responsibility: string;
  /** Zugehörige Erlebniswelt (Dok. 06 §5) – nur Verdichtung/Startpunkt, keine Rechte. */
  readonly worldId: WorldId;
}

/**
 * Die zwölf kanonischen Produktrollen (Dok. 03 §3). Vollständig übernommen, damit die
 * Simulation nichts über das Konzept hinaus erfindet oder weglässt.
 */
export const DEMO_ROLES: readonly DemoRole[] = [
  {
    id: 'R01',
    name: 'Executive Sponsor',
    sphere: 'Kunde',
    responsibility: 'Risiko-, Budget- und Zielentscheidungen',
    worldId: 'executive',
  },
  {
    id: 'R02',
    name: 'CISO / Security Lead',
    sphere: 'Kunde',
    responsibility: 'Sicherheitssteuerung und Eskalation',
    worldId: 'executive',
  },
  {
    id: 'R03',
    name: 'ISMS Manager',
    sphere: 'Kunde',
    responsibility: 'operativer ISMS-Betrieb',
    worldId: 'operations',
  },
  {
    id: 'R04',
    name: 'Business / Process Owner',
    sphere: 'Kunde',
    responsibility: 'Business Impact und Risikoentscheidung',
    worldId: 'operations',
  },
  {
    id: 'R05',
    name: 'Asset / Control Owner',
    sphere: 'Kunde',
    responsibility: 'Umsetzung und Wirksamkeit',
    worldId: 'operations',
  },
  {
    id: 'R06',
    name: 'Evidence Contributor',
    sphere: 'Kunde',
    responsibility: 'begrenzte Zuarbeit und Nachweise',
    worldId: 'operations',
  },
  {
    id: 'R07',
    name: 'Auditor / Assurance Reviewer',
    sphere: 'Unabhängig',
    responsibility: 'Prüfung und Nachvollziehbarkeit',
    worldId: 'assurance',
  },
  {
    id: 'R08',
    name: 'Managed Service Lead',
    sphere: 'Betreiber',
    responsibility: 'Serviceportfolio, Qualität und Kapazität',
    worldId: 'consulting',
  },
  {
    id: 'R09',
    name: 'Engagement Manager',
    sphere: 'Betreiber',
    responsibility: 'Kundenbeziehung, Scope und Delivery',
    worldId: 'consulting',
  },
  {
    id: 'R10',
    name: 'ISMS Consultant',
    sphere: 'Betreiber',
    responsibility: 'Analyse, Moderation, Steuerung und Reporting',
    worldId: 'consulting',
  },
  {
    id: 'R11',
    name: 'Specialist Consultant',
    sphere: 'Betreiber',
    responsibility: 'Spezialanalyse und Review',
    worldId: 'consulting',
  },
  {
    id: 'R12',
    name: 'Tenant / Platform Administrator',
    sphere: 'Beide',
    responsibility: 'Nutzer, Rollen, Konfiguration und Betrieb',
    worldId: 'assurance',
  },
] as const;

/** Rolle nach ID; `undefined` bei unbekannter/veralteter ID (z. B. verändertes localStorage). */
export function getRole(roleId: string): DemoRole | undefined {
  return DEMO_ROLES.find((role) => role.id === roleId);
}

/** Erlebniswelt einer Rolle (Dok. 06 §5). */
export function worldForRole(role: DemoRole): ExperienceWorld {
  return EXPERIENCE_WORLDS[role.worldId];
}
