/**
 * Priorisierung aus dem Datenzustand — Eisenhower-Ableitung (Berater-Portfolio).
 *
 * KONZEPT (Owner-gerichtet, 2026-07-25): Der Berater will die Kundenaufgaben nach der
 * Eisenhower-Matrix (Wichtigkeit × Dringlichkeit) sortiert sehen. Der ehrliche Weg: NICHTS erfinden
 * und NICHTS gated Speichern — sondern (Frist, Wichtigkeit, Dringlichkeit) je Objekt aus seinen
 * ECHTEN Feldern ABLEITEN, mit einer offengelegten Regel (genau wie die Deckung „x von y").
 *
 * Damit bleibt der E-02-Riegel gewahrt: es wird KEIN neues Trägerfeld gespeichert, `tags_custom_fields`
 * bleibt leer. Die Priorisierung ist eine reine, transparente Ableitung — kein Score-Ampel-Wert
 * (CCP-008 bleibt gesperrt), keine erfundene Zahl. Die ECHTE Kunden-Frist (Upload/Eingabe) bleibt
 * das spätere E-02-Feature; hier ist die Frist ein aus dem Erfassungsstand abgeleiteter VORSCHLAG.
 *
 * ABLEITUNGSREGEL (sichtbar):
 *  - Wichtigkeit = hoch, wenn `classification.protection_need = 'hoch'` ODER `confidentiality =
 *    'vertraulich'`; sonst niedrig.
 *  - Dringlichkeit = Punktezähler aus dem Offen-/Reifezustand: +2 offener Lebenszyklus, +2 kein Owner
 *    erfasst, +1 Stand „Ungeprüft", +1 Lebenszyklus „überholt/abgelaufen". Summe ≥3 hoch, 1–2 mittel,
 *    0 niedrig.
 *  - Quadrant = Wichtigkeit × (Dringlichkeit = hoch ⇒ dringend).
 *  - Frist (Vorschlag) = Erfassungsdatum (`record_time.recorded_at`) + Horizont (hoch 7 / mittel 30 /
 *    niedrig 90 Tage) — absolutes Datum, deterministisch.
 *
 * React-frei und deterministisch testbar (kein `Date.now()`; Datum wird aus dem Erfassungsdatum
 * gerechnet).
 */
import { DEMO_SEED, DEMO_TENANTS } from '@isms/demo-seed';

import type { DemoRole } from '../shell/roles';
import { kundenSicht } from '../shell/sphaere';
import { objectTypeLabel } from '../twin/data';
import { objectDetailHref } from '../twin/routes';
import { getCustomerTenants } from './data';

type SeedObject = (typeof DEMO_SEED.objects)[number];

export type Wichtigkeit = 'hoch' | 'niedrig';
export type Dringlichkeit = 'hoch' | 'mittel' | 'niedrig';
export type Quadrant = 'sofort' | 'einplanen' | 'delegieren' | 'spaeter';

/** Lebenszyklus-Stände, die einen OFFENEN/unfertigen Zustand bezeichnen (aus dem echten Seed). */
const OFFENE_STATUS: ReadonlySet<string> = new Set([
  'in Arbeit',
  'Entwurf',
  'Beobachtet',
  'bewertet',
  'identifiziert',
  'Vorbereitung',
  'zur Freigabe',
  'Review',
  'In Änderung',
  'abgelaufen',
  'Überholt',
]);
/** Stände, die zusätzliche Dringlichkeit tragen (überholt/abgelaufen = handlungsbedürftig). */
const STALE_STATUS: ReadonlySet<string> = new Set(['abgelaufen', 'Überholt']);

const HORIZONT_TAGE: Readonly<Record<Dringlichkeit, number>> = { hoch: 7, mittel: 30, niedrig: 90 };

export interface Prioritaet {
  readonly wichtigkeit: Wichtigkeit;
  readonly dringlichkeit: Dringlichkeit;
  /** Offengelegter Punktezähler der Dringlichkeit (0 = nichts offen). */
  readonly dringlichkeitScore: number;
  readonly quadrant: Quadrant;
  /** Abgeleitete Frist als absolutes Datum (YYYY-MM-DD), ein Vorschlag aus dem Erfassungsstand. */
  readonly fristIso: string;
  /** Die Signale, die gefeuert haben — für die sichtbare Begründung (kein verstecktes Gewicht). */
  readonly gruende: readonly string[];
}

function istWichtig(o: SeedObject): boolean {
  return (
    o.classification.protection_need === 'hoch' ||
    o.classification.confidentiality === 'vertraulich'
  );
}

function dringlichkeitScore(o: SeedObject): number {
  let score = 0;
  if (OFFENE_STATUS.has(o.lifecycle_status)) score += 2;
  if (o.owner_ids.length === 0) score += 2;
  if (o.quality_state.dimensions.some((d) => d.confirmation_level === 'Ungeprüft')) score += 1;
  if (STALE_STATUS.has(o.lifecycle_status)) score += 1;
  return score;
}

function stufeDringlichkeit(score: number): Dringlichkeit {
  if (score >= 3) return 'hoch';
  if (score >= 1) return 'mittel';
  return 'niedrig';
}

function stufeQuadrant(w: Wichtigkeit, d: Dringlichkeit): Quadrant {
  const dringend = d === 'hoch';
  if (w === 'hoch') return dringend ? 'sofort' : 'einplanen';
  return dringend ? 'delegieren' : 'spaeter';
}

function gruende(o: SeedObject): string[] {
  const g: string[] = [];
  if (OFFENE_STATUS.has(o.lifecycle_status)) g.push(`offener Stand „${o.lifecycle_status}"`);
  if (o.owner_ids.length === 0) g.push('kein Owner erfasst');
  if (o.quality_state.dimensions.some((d) => d.confirmation_level === 'Ungeprüft'))
    g.push('Stand ungeprüft');
  if (o.classification.protection_need === 'hoch') g.push('hoher Schutzbedarf');
  else if (o.classification.confidentiality === 'vertraulich') g.push('vertraulich');
  return g;
}

/** Addiert `tage` auf ein ISO-Datum und gibt YYYY-MM-DD zurück (deterministisch, kein `Date.now()`). */
function plusTage(iso: string, tage: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + tage);
  return d.toISOString().slice(0, 10);
}

/** Leitet (Frist, Wichtigkeit, Dringlichkeit, Quadrant) eines Objekts aus seinen echten Feldern ab. */
export function ableitenPrioritaet(o: SeedObject): Prioritaet {
  const wichtigkeit: Wichtigkeit = istWichtig(o) ? 'hoch' : 'niedrig';
  const score = dringlichkeitScore(o);
  const dringlichkeit = stufeDringlichkeit(score);
  return {
    wichtigkeit,
    dringlichkeit,
    dringlichkeitScore: score,
    quadrant: stufeQuadrant(wichtigkeit, dringlichkeit),
    fristIso: plusTage(o.record_time.recorded_at, HORIZONT_TAGE[dringlichkeit]),
    gruende: gruende(o),
  };
}

export interface EisenhowerItem {
  readonly objectId: string;
  readonly tenantId: string;
  readonly tenantName: string;
  readonly name: string;
  readonly typLabel: string;
  readonly href: string;
  readonly prioritaet: Prioritaet;
}

export const QUADRANT_LABEL: Readonly<Record<Quadrant, string>> = {
  sofort: 'Sofort erledigen',
  einplanen: 'Einplanen',
  delegieren: 'Delegieren',
  spaeter: 'Später prüfen',
};

export interface EisenhowerBoard {
  /** Aufgaben je Quadrant, sortiert (Frist aufsteigend, dann Dringlichkeit, dann Name). */
  readonly quadranten: Readonly<Record<Quadrant, readonly EisenhowerItem[]>>;
  readonly gesamt: number;
}

function tenantName(tenantId: string): string {
  return DEMO_TENANTS.find((t) => t.tenant_id === tenantId)?.display_name ?? tenantId;
}

/** Sichtbare Mandanten je Sphäre (DR-0012): Portfolio = alle Kunden, sonst der aktive Mandant. */
function sichtbareTenantIds(role: DemoRole | null, aktiverMandantId: string): readonly string[] {
  if (kundenSicht(role) === 'portfolio') return getCustomerTenants().map((t) => t.tenant_id);
  return [aktiverMandantId];
}

/**
 * Baut das Eisenhower-Board über die sichtbaren Mandanten. Es werden nur Objekte mit OFFENEM Signal
 * aufgenommen (`dringlichkeitScore > 0`) — vollständig erfasste, stabile Objekte tragen keine offene
 * Aufgabe und stehen bewusst nicht im Board.
 */
export function buildEisenhower(role: DemoRole | null, aktiverMandantId: string): EisenhowerBoard {
  const sichtbar = new Set(sichtbareTenantIds(role, aktiverMandantId));

  const items: EisenhowerItem[] = DEMO_SEED.objects
    .filter((o) => sichtbar.has(o.tenant_id) && dringlichkeitScore(o) > 0)
    .map((o) => ({
      objectId: o.object_id,
      tenantId: o.tenant_id,
      tenantName: tenantName(o.tenant_id),
      name: o.display_name,
      typLabel: objectTypeLabel(o.object_type) ?? o.object_type,
      href: objectDetailHref(o.tenant_id, o.object_id),
      prioritaet: ableitenPrioritaet(o),
    }));

  const quadranten: Record<Quadrant, EisenhowerItem[]> = {
    sofort: [],
    einplanen: [],
    delegieren: [],
    spaeter: [],
  };
  for (const item of items) quadranten[item.prioritaet.quadrant].push(item);

  for (const q of Object.keys(quadranten) as Quadrant[]) {
    quadranten[q].sort((a, b) => {
      if (a.prioritaet.fristIso !== b.prioritaet.fristIso)
        return a.prioritaet.fristIso.localeCompare(b.prioritaet.fristIso);
      if (b.prioritaet.dringlichkeitScore !== a.prioritaet.dringlichkeitScore)
        return b.prioritaet.dringlichkeitScore - a.prioritaet.dringlichkeitScore;
      return a.name.localeCompare(b.name, 'de');
    });
  }

  return { quadranten, gesamt: items.length };
}
