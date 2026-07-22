/**
 * Rollenrahmung des Ortes „Heute" (WP-016 Slice 1, read-only).
 *
 * Dieselbe Seite, dieselben Daten – nur Sprache, Betonung und Reihenfolge unterscheiden sich je
 * Erlebniswelt (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02). Diese Datei erzeugt AUSSCHLIESSLICH
 * Anzeige-Metadaten. Sie liefert keine Daten, filtert keine Daten und ist KEINE Autorisierung:
 * es gibt kein Rollen-Gating, keine Rolle sieht mehr oder weniger als eine andere (Dok. 19 folgt
 * als eigenes Work Package, `.claude/rules/security.md`).
 *
 * QUELLEN (nichts erfunden):
 *  - Rollen R01–R12, Weltzuordnung, Weltname und Leitfrage stehen bereits vollständig in
 *    `lib/shell/roles.ts` (Dok. 03 §3 / Dok. 06 §5) und werden von dort GELESEN, nicht kopiert.
 *  - Die Felder „Erlebnis" und „Bewusst vermeiden" je Welt sind unten WÖRTLICH aus
 *    `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` §5 zitiert; die jeweilige
 *    Quellzeile steht am Zitat.
 *
 * NUR QUELLBELEG, BEWUSST NICHT GERENDERT: `experienceQuote`, `avoidQuote`, `quoteSource` und
 * `orderRationale` belegen im Code, WORAUS die Reihenfolge abgeleitet ist (WP-016 Acceptance 10),
 * und werden von keiner Komponente angezeigt. Das ist Absicht: `orderRationale` enthält Begriffe
 * wie „Empfehlung" und „Serviceangebot", die im Produkt nicht erscheinen dürfen (WP-016
 * Nicht-Ziele, Dok. 13 MS15) – sie stehen hier als Zitat der Quelle, nicht als Aussage der Seite.
 * Wirksam gerendert wird ausschließlich `sectionOrder`.
 *
 * // OFFENE FRAGE O-WP016-01: Dok. 06 §7 S01/§8 beschreibt die INHALTE von Mission Control,
 * // aber KEINE rollen- oder weltabhängige Reihenfolge. Rollenbezogen dokumentiert sind nur
 * // „Erlebnis" und „Bewusst vermeiden" je WELT (§5), nicht je Rolle. Die unten festgelegte
 * // Abschnittsreihenfolge ist deshalb eine bewusst REVERSIBLE Anzeigeentscheidung: sie ist aus
 * // den beiden zitierten §5-Feldern abgeleitet, ändert weder Datenmenge noch Rechte und kann
 * // ohne Datenwirkung revidiert werden. Es werden KEINE rollenspezifischen Inhalte erzeugt.
 */

import {
  EXPERIENCE_WORLDS,
  getRole,
  worldForRole,
  type ExperienceWorld,
  type WorldId,
} from '../shell/roles';

/* -----------------------------------------------------------------------------
 * Die vier Abschnitte der Seite
 * --------------------------------------------------------------------------- */

/** Kennungen der vier Abschnitte (WP-016 Ziel, abgeleitet aus Dok. 06 §7 S01). */
export type MissionSectionId = 'standort' | 'erfassung' | 'datenlage' | 'einstieg';

export interface MissionSection {
  readonly id: MissionSectionId;
  /** Sichtbare Überschrift – jede Überschrift ist selbst eine Nutzerfrage (Dok. 06 §6). */
  readonly title: string;
}

/** Kanonische (unrollierte) Grundreihenfolge und Beschriftung der vier Abschnitte. */
export const MISSION_SECTIONS: Readonly<Record<MissionSectionId, MissionSection>> = {
  standort: { id: 'standort', title: 'Wo stehe ich?' },
  erfassung: { id: 'erfassung', title: 'Was ist erfasst worden?' },
  datenlage: { id: 'datenlage', title: 'Was weiß ich über die Datenlage?' },
  einstieg: { id: 'einstieg', title: 'Wo steige ich ein?' },
};

/** Alle vier Abschnittskennungen in kanonischer Grundreihenfolge. */
export const MISSION_SECTION_IDS = ['standort', 'erfassung', 'datenlage', 'einstieg'] as const;

/* -----------------------------------------------------------------------------
 * Rahmung je Erlebniswelt
 * --------------------------------------------------------------------------- */

export interface WorldFraming {
  readonly worldId: WorldId;
  /** Name + Leitfrage der Welt – gelesen aus `lib/shell/roles.ts` (Dok. 06 §5). */
  readonly world: ExperienceWorld;
  /** Feld „Erlebnis" der Welt, WÖRTLICH aus Dok. 06 §5. */
  readonly experienceQuote: string;
  /** Feld „Bewusst vermeiden" der Welt, WÖRTLICH aus Dok. 06 §5. */
  readonly avoidQuote: string;
  /** Quellzeile beider Zitate (Nachvollziehbarkeit im Code und im Review). */
  readonly quoteSource: string;
  /**
   * Reihenfolge der vier Abschnitte für diese Welt. Enthält IMMER alle vier Kennungen genau
   * einmal – es wird kein Abschnitt ausgeblendet (Dok. 06 06-D01: Orte/Inhalte bleiben stabil,
   * Leeres wird benannt statt versteckt).
   */
  readonly sectionOrder: readonly MissionSectionId[];
  /** Ableitung der Reihenfolge im Klartext, mit Bezug auf die beiden Zitate (nur Quellbeleg). */
  readonly orderRationale: string;
}

/**
 * Rahmung je Welt. Zitate wörtlich aus Dok. 06 v1.0 §5 („Rollenbezogene Erlebniswelten").
 *
 * ABLEITUNGSREGEL (einheitlich, reversibel – siehe OFFENE FRAGE O-WP016-01):
 *  1. „Wo stehe ich?" steht immer zuerst (Dok. 06 §6: Rolle, Mandant, Scope und Datenstand
 *     querschnittlich sichtbar).
 *  2. Danach folgt der Abschnitt, den das Feld „Erlebnis" der Welt am deutlichsten benennt.
 *  3. Was das Feld „Bewusst vermeiden" adressiert, rückt nach hinten.
 * In diesem Work Package gibt es nichts, was eine Welt NICHT sehen dürfte – die Regel ordnet,
 * sie entzieht nicht.
 */
export const WORLD_FRAMINGS: Readonly<Record<WorldId, WorldFraming>> = {
  executive: {
    worldId: 'executive',
    world: EXPERIENCE_WORLDS.executive,
    experienceQuote:
      'Klartext, 3-5 Entscheidungen, Business Impact, Optionen, Investitionswirkung, Unsicherheit.',
    avoidQuote: 'Keine Roh-Control-Listen, keine operative Task-Wand.',
    quoteSource: 'Dok. 06 v1.0 §5, „Executive World" (Felder „Erlebnis" / „Bewusst vermeiden")',
    sectionOrder: ['standort', 'datenlage', 'erfassung', 'einstieg'],
    orderRationale:
      'Von den im Feld „Erlebnis" genannten Punkten ist im Demo-Datenbestand allein ' +
      '„Unsicherheit" belegt – Entscheidungen, Impact, Optionen und Investitionswirkung sind ' +
      'es nicht. Deshalb steht die Datenlage vorn. „Keine Roh-Control-Listen" rückt die ' +
      'Objektliste des Einstiegs ans Ende.',
  },
  operations: {
    worldId: 'operations',
    world: EXPERIENCE_WORLDS.operations,
    experienceQuote:
      'Morning Mission, Kundenpuls, Maßnahmen, Evidence, Freigaben, Datenlücken, Wiederaufnahme.',
    avoidQuote: 'Keine Portfolio- oder Vertriebsmetriken ohne Zweck.',
    quoteSource:
      'Dok. 06 v1.0 §5, „Customer Operations World" (Felder „Erlebnis" / „Bewusst vermeiden")',
    sectionOrder: ['standort', 'datenlage', 'einstieg', 'erfassung'],
    orderRationale:
      'Das Feld „Erlebnis" nennt „Datenlücken" ausdrücklich; Morning Mission und Wiederaufnahme ' +
      'sind im Datenbestand nicht belegt und werden auf dieser Seite offen als Lücke benannt. ' +
      'Danach folgt der Einstieg in die konkrete Arbeit; die Erfassung schließt ab.',
  },
  consulting: {
    worldId: 'consulting',
    world: EXPERIENCE_WORLDS.consulting,
    experienceQuote:
      'Portfolio, SLA, Kapazität, Reise, wiederverwendbare Workflows, Deliverables, Opportunity mit Begründung.',
    avoidQuote: 'Keine verdeckte Mitarbeiterüberwachung oder rein umsatzgetriebene Empfehlungen.',
    quoteSource:
      'Dok. 06 v1.0 §5, „Consulting & Service World" (Felder „Erlebnis" / „Bewusst vermeiden")',
    sectionOrder: ['standort', 'einstieg', 'datenlage', 'erfassung'],
    orderRationale:
      'Belegt sind von den im Feld „Erlebnis" genannten Punkten die Einstiege in Services und ' +
      'Deliverables, nicht Kapazität, Reise oder Opportunity. Deshalb steht der Einstieg vorn. ' +
      '„Rein umsatzgetriebene Empfehlungen" schließt jede Empfehlung und jedes Serviceangebot ' +
      'auf dieser Seite aus – gezeigt werden nur belegte Bestände.',
  },
  assurance: {
    worldId: 'assurance',
    world: EXPERIENCE_WORLDS.assurance,
    experienceQuote:
      'Audit Workspace, Datenherkunft, Versionen, Rechte, Integrationsgesundheit, Logs und Supportzugriff.',
    avoidQuote: 'Kein uneingeschränkter Support- oder Auditorzugriff.',
    quoteSource:
      'Dok. 06 v1.0 §5, „Assurance & Administration World" (Felder „Erlebnis" / „Bewusst vermeiden")',
    sectionOrder: ['standort', 'erfassung', 'datenlage', 'einstieg'],
    orderRationale:
      'Das Feld „Erlebnis" nennt „Datenherkunft" und „Versionen" – genau das beantwortet der ' +
      'Erfassungsabschnitt (record_time und die abgeleitete Versionsaussage, Dok. 07 §11). ' +
      '„Kein uneingeschränkter Zugriff" ändert hier nichts an der Datenmenge: die Seite zeigt ' +
      'in jeder Welt ausschließlich den aktiven Mandanten.',
  },
};

/** Rahmung einer Welt. */
export function framingForWorld(worldId: WorldId): WorldFraming {
  return WORLD_FRAMINGS[worldId];
}

/**
 * Rahmung für eine Rollen-ID (R01–R12). `undefined` bei unbekannter/veralteter ID – dann rahmt
 * die Seite nicht rollenbezogen, zeigt aber dieselben Daten (Muster aus `getRole`).
 */
export function framingForRole(roleId: string): WorldFraming | undefined {
  const role = getRole(roleId);
  if (!role) return undefined;
  return framingForWorld(worldForRole(role).id);
}
