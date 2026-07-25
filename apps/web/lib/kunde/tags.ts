/**
 * Drei Kunden-Tags je Dokument/Objekt (DR-0019 Nr. 3) — das Herzstück des Ein-Produkt-Fokus:
 *   1. FRIST      — Fälligkeitsdatum, einmalig oder wiederkehrend.
 *   2. PRIO       — wichtig / mittelwichtig / eher unwichtig.
 *   3. STEMPEL    — Betreuungsentscheidung: „Wir kümmern uns" / „Ich kümmere mich selbst" /
 *                   „Nur warnen, wenn etwas nicht stimmt".
 *
 * ECHTE KUNDENEINGABE mit ehrlicher Persistenz-Grenze (DR-0019): Bis Backend/DB angebunden sind
 * (FINDING-0004, WP-030), leben die Tags GERÄTELOKAL (localStorage, ein Store je Gerät, geordnet
 * nach Mandant → Objekt). Der Seed-/Contract-Riegel bleibt unangetastet: `tags_custom_fields` im
 * ausgelieferten Datenbestand bleibt leer (Guard in `seed.spec.ts`); diese Client-Schicht ist die
 * bewusst getrennte Vorstufe der echten Contract-Persistenz.
 *
 * VORSCHLAG STATT LEEREM FORMULAR: Für jedes Objekt liefert `vorschlagFuer` eine transparente
 * Ableitung aus den echten Feldern (Eisenhower-Engine `ableitenPrioritaet`) — der Kunde übernimmt
 * sie mit einem Klick (`quelle: 'kunde'`) oder überschreibt einzelne Werte. Es wird NICHTS erfunden.
 *
 * React-frei und deterministisch testbar: kein `Date.now()` — Zeitvergleiche nehmen den heutigen
 * Kalendertag als Parameter.
 */
import type { DEMO_SEED } from '@isms/demo-seed';

import { ableitenPrioritaet } from '../portfolio/prioritaet';

type SeedObject = (typeof DEMO_SEED.objects)[number];

/* ----------------------------------------------------------------------------------------------
 * Tag-Vokabular (fest, klein, deutsch — Anzeige-Labels an EINER Stelle)
 * ---------------------------------------------------------------------------------------------- */

export type TagPrio = 'wichtig' | 'mittel' | 'unwichtig';

export type FristWiederholung =
  | 'einmalig'
  | 'monatlich'
  | 'quartalsweise'
  | 'halbjaehrlich'
  | 'jaehrlich';

export type Verwaltungsstempel = 'wir_kuemmern_uns' | 'selbst' | 'nur_warnen';

export const PRIO_LABEL: Readonly<Record<TagPrio, string>> = {
  wichtig: 'Wichtig',
  mittel: 'Mittelwichtig',
  unwichtig: 'Eher unwichtig',
};

export const WIEDERHOLUNG_LABEL: Readonly<Record<FristWiederholung, string>> = {
  einmalig: 'einmalig',
  monatlich: 'monatlich',
  quartalsweise: 'quartalsweise',
  halbjaehrlich: 'halbjährlich',
  jaehrlich: 'jährlich',
};

export const STEMPEL_LABEL: Readonly<Record<Verwaltungsstempel, string>> = {
  wir_kuemmern_uns: 'Wir kümmern uns',
  selbst: 'Ich kümmere mich selbst',
  nur_warnen: 'Nur warnen',
};

export interface ObjektTags {
  readonly frist: {
    /** Fälligkeitsdatum als Kalendertag (YYYY-MM-DD). */
    readonly faelligAmIso: string;
    readonly wiederholung: FristWiederholung;
  };
  readonly prio: TagPrio;
  readonly stempel: Verwaltungsstempel;
  /** 'kunde' = vom Kunden gesetzt/übernommen · 'vorschlag' = unbestätigte Ableitung. */
  readonly quelle: 'kunde' | 'vorschlag';
}

/* ----------------------------------------------------------------------------------------------
 * Gerätelokaler Store (Mandant → Objekt → Tags)
 * ---------------------------------------------------------------------------------------------- */

export const KUNDE_TAGS_STORAGE_KEY = 'isms.kunde.tags.v1';

export type TagStore = Readonly<Record<string, Readonly<Record<string, ObjektTags>>>>;

const PRIOS: readonly TagPrio[] = ['wichtig', 'mittel', 'unwichtig'];
const WIEDERHOLUNGEN: readonly FristWiederholung[] = [
  'einmalig',
  'monatlich',
  'quartalsweise',
  'halbjaehrlich',
  'jaehrlich',
];
const STEMPEL: readonly Verwaltungsstempel[] = ['wir_kuemmern_uns', 'selbst', 'nur_warnen'];
const ISO_TAG = /^\d{4}-\d{2}-\d{2}$/;

/** Ein einzelner Tag-Eintrag ist nur gültig, wenn ALLE Felder dem Vokabular entsprechen. */
function istGueltig(wert: unknown): wert is ObjektTags {
  if (typeof wert !== 'object' || wert === null) return false;
  const t = wert as Record<string, unknown>;
  const frist = t.frist as Record<string, unknown> | undefined;
  return (
    typeof frist === 'object' &&
    frist !== null &&
    typeof frist.faelligAmIso === 'string' &&
    ISO_TAG.test(frist.faelligAmIso) &&
    WIEDERHOLUNGEN.includes(frist.wiederholung as FristWiederholung) &&
    PRIOS.includes(t.prio as TagPrio) &&
    STEMPEL.includes(t.stempel as Verwaltungsstempel) &&
    (t.quelle === 'kunde' || t.quelle === 'vorschlag')
  );
}

/**
 * Liest den Store defensiv: unlesbares JSON oder fremde Formen ergeben `{}` statt eines Fehlers,
 * einzelne ungültige Einträge werden verworfen (fail-quiet je Eintrag, nie je Store).
 */
export function parseTagStore(raw: string | null): TagStore {
  if (!raw) return {};
  let daten: unknown;
  try {
    daten = JSON.parse(raw);
  } catch {
    return {};
  }
  if (typeof daten !== 'object' || daten === null || Array.isArray(daten)) return {};
  const store: Record<string, Record<string, ObjektTags>> = {};
  for (const [tenantId, objekte] of Object.entries(daten as Record<string, unknown>)) {
    if (typeof objekte !== 'object' || objekte === null || Array.isArray(objekte)) continue;
    for (const [objectId, tags] of Object.entries(objekte as Record<string, unknown>)) {
      if (!istGueltig(tags)) continue;
      store[tenantId] ??= {};
      store[tenantId][objectId] = tags;
    }
  }
  return store;
}

export function serializeTagStore(store: TagStore): string {
  return JSON.stringify(store);
}

/** Vom Kunden gesetzte Tags eines Objekts (oder `undefined`). */
export function getObjektTags(
  store: TagStore,
  tenantId: string,
  objectId: string,
): ObjektTags | undefined {
  return store[tenantId]?.[objectId];
}

/** Setzt Tags immutabel (neuer Store); `quelle` wird auf 'kunde' gehoben — Speichern IST Bestätigen. */
export function mitObjektTags(
  store: TagStore,
  tenantId: string,
  objectId: string,
  tags: ObjektTags,
): TagStore {
  return {
    ...store,
    [tenantId]: { ...store[tenantId], [objectId]: { ...tags, quelle: 'kunde' } },
  };
}

/* ----------------------------------------------------------------------------------------------
 * Vorschlag aus der echten Ableitung (Eisenhower-Engine)
 * ---------------------------------------------------------------------------------------------- */

/**
 * Transparenter Tag-Vorschlag je Objekt:
 *  - PRIO aus dem Quadranten: sofort/einplanen (wichtig×…) → wichtig · delegieren → mittel ·
 *    später → eher unwichtig.
 *  - FRIST = abgeleitete Frist der Engine, Wiederholung 'einmalig' (Wiederkehr ist eine bewusste
 *    Kundenentscheidung, kein Ratespiel).
 *  - STEMPEL: trägt das Objekt ein offenes Signal (Score > 0) → 'nur_warnen', sonst 'selbst'.
 *    „Wir kümmern uns" wird NIE vorgeschlagen — Betreuung ist eine Buchungsentscheidung des Kunden.
 */
export function vorschlagFuer(o: SeedObject): ObjektTags {
  const p = ableitenPrioritaet(o);
  const prio: TagPrio =
    p.quadrant === 'sofort' || p.quadrant === 'einplanen'
      ? 'wichtig'
      : p.quadrant === 'delegieren'
        ? 'mittel'
        : 'unwichtig';
  return {
    frist: { faelligAmIso: p.fristIso, wiederholung: 'einmalig' },
    prio,
    stempel: p.dringlichkeitScore > 0 ? 'nur_warnen' : 'selbst',
    quelle: 'vorschlag',
  };
}

/** Wirksame Tags eines Objekts: Kundeneingabe, sonst der Vorschlag. */
export function effektiveTags(store: TagStore, o: SeedObject): ObjektTags {
  return getObjektTags(store, o.tenant_id, o.object_id) ?? vorschlagFuer(o);
}

/* ----------------------------------------------------------------------------------------------
 * Fristen-Rechnung (deterministisch: „heute" kommt als Parameter)
 * ---------------------------------------------------------------------------------------------- */

export type FristZustand = 'ueberfaellig' | 'faellig_bald' | 'ok';

/** Zustand einer Frist relativ zum Kalendertag `heuteIso` (fällig-bald = binnen 7 Tagen). */
export function fristZustand(faelligAmIso: string, heuteIso: string): FristZustand {
  if (faelligAmIso < heuteIso) return 'ueberfaellig';
  const faellig = new Date(`${faelligAmIso}T00:00:00Z`).getTime();
  const heute = new Date(`${heuteIso}T00:00:00Z`).getTime();
  const tage = Math.round((faellig - heute) / 86_400_000);
  return tage <= 7 ? 'faellig_bald' : 'ok';
}

/**
 * Nächste Fälligkeit einer WIEDERKEHRENDEN Frist ab dem Kalendertag `heuteIso`: das Fälligkeits-
 * datum wird so lange um den Rhythmus verschoben, bis es nicht mehr in der Vergangenheit liegt
 * (einmalige Fristen bleiben unverändert — überfällig bleibt überfällig).
 */
export function naechsteFaelligkeit(frist: ObjektTags['frist'], heuteIso: string): string {
  if (frist.wiederholung === 'einmalig') return frist.faelligAmIso;
  const monate: Record<Exclude<FristWiederholung, 'einmalig'>, number> = {
    monatlich: 1,
    quartalsweise: 3,
    halbjaehrlich: 6,
    jaehrlich: 12,
  };
  const schritt = monate[frist.wiederholung];
  const datum = new Date(`${frist.faelligAmIso}T00:00:00Z`);
  let iso = frist.faelligAmIso;
  // Begrenzt statt endlos: 240 Monate Vorlauf reichen für jede reale Wiederkehr.
  for (let i = 0; iso < heuteIso && i < 240 / schritt; i++) {
    datum.setUTCMonth(datum.getUTCMonth() + schritt);
    iso = datum.toISOString().slice(0, 10);
  }
  return iso;
}
