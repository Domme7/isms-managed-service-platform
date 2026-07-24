/**
 * Globale Suche über den digitalen Zwilling (WP-027, react-frei & deterministisch).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Suche, Benachrichtigungen &
 * Wiederaufnahme": „Globale Suche ist ein primärer Navigationsweg. Sie findet Unternehmen,
 * Einheiten, Prozesse, Assets, Risiken, Controls, Services, Dokumente, Personen und
 * Entscheidungen. Ergebnisse werden mandanten- und rollenbezogen gruppiert; VERTRAULICHE TREFFER
 * WERDEN NICHT ÜBER SNIPPETS GELEAKT."
 *
 * Drei Pflichten setzt dieses Modul um:
 *  1. SPHÄRENGRENZE (DR-0012): Ergebnisse nur aus den für die Rolle sichtbaren Mandanten —
 *     Betreiber/Portfolio über alle Kundenmandanten, Kundensicht ausschließlich im eigenen
 *     Mandanten. Ein Treffer aus einem fremden Mandanten ist kein Treffer.
 *  2. SNIPPET-LEAK-SCHUTZ: Ein vertraulicher Treffer (`classification.confidentiality`
 *     === `'vertraulich'`, das einzige „höhere" Vertraulichkeitswort im Datenbestand neben
 *     `'intern'`) erscheint mit Name und Typ, aber OHNE Vorschautext (`snippet === null`). Die
 *     Suche matcht zudem NUR über Name/Typ, NIE über die `description` — so kann auch die Query
 *     selbst keinen vertraulichen Beschreibungstext herausziehen.
 *  3. Deterministisch & react-frei (Muster `lib/services/katalog.ts`), damit der Leak-Schutz
 *     ohne Mock testbar ist.
 *
 * Der Name (`display_name`) ist laut Dok. 07 „änderbar, nicht identitätsstiftend" und steht
 * ohnehin auf der Objektseite; nur der potenziell sensible Klartext (`description`) wird für
 * vertrauliche Objekte als Snippet zurückgehalten.
 */
import { DEMO_SEED, DEMO_TENANTS } from '@isms/demo-seed';

import { getCustomerTenants } from '../portfolio/data';
import type { DemoRole } from '../shell/roles';
import { kundenSicht } from '../shell/sphaere';
import { objectTypeLabel } from '../twin/data';
import { objectDetailHref } from '../twin/routes';

/** Kürzeste sinnvolle Query; darunter liefert die Suche bewusst keinen Treffer. */
export const SUCHE_MIN_LAENGE = 2;

const SNIPPET_MAX_LAENGE = 140;
/** Das einzige „höhere" Vertraulichkeitswort im Datenbestand (neben `'intern'`). */
const VERTRAULICH = 'vertraulich';

export interface SuchTreffer {
  readonly objectId: string;
  readonly tenantId: string;
  /** Deutsches Typ-Label, sonst der kanonische Typ. */
  readonly typLabel: string;
  readonly name: string;
  /** `true`, wenn der Treffer vertraulich ist (dann ist `snippet === null`). */
  readonly vertraulich: boolean;
  /** Kurzer Vorschautext – `null` bei vertraulichen Treffern (Leak-Schutz). */
  readonly snippet: string | null;
  readonly href: string;
}

export interface SuchGruppe {
  readonly tenantId: string;
  readonly tenantName: string;
  readonly treffer: readonly SuchTreffer[];
}

export interface SuchErgebnis {
  readonly query: string;
  /** `true`, wenn die Query kürzer als `SUCHE_MIN_LAENGE` ist (kein Treffer). */
  readonly zuKurz: boolean;
  readonly trefferGesamt: number;
  /** Nach Mandant gruppiert (Dok. 06: „mandanten- und rollenbezogen gruppiert"). */
  readonly gruppen: readonly SuchGruppe[];
}

/**
 * Für die Rolle sichtbare Mandanten (DR-0012). Betreiber-/Portfolio-Sicht: alle Kundenmandanten.
 * Kundensicht/neutral: ausschließlich der aktive Mandant.
 */
export function sichtbareMandantenIds(
  role: DemoRole | null,
  aktiverMandantId: string,
): readonly string[] {
  if (kundenSicht(role) === 'portfolio') {
    return getCustomerTenants().map((t) => t.tenant_id);
  }
  return [aktiverMandantId];
}

function tenantName(tenantId: string): string {
  return DEMO_TENANTS.find((t) => t.tenant_id === tenantId)?.display_name ?? tenantId;
}

function kuerze(text: string): string {
  const clean = text.trim();
  if (clean.length <= SNIPPET_MAX_LAENGE) return clean;
  return `${clean.slice(0, SNIPPET_MAX_LAENGE).trimEnd()}…`;
}

/**
 * Globale Objektsuche. Matcht case-insensitiv über `display_name` und Typ (Label + kanonischer
 * Typ) – NICHT über die `description` (kein Query-Leak). Ergebnisse sind sphärengescoped, nach
 * Mandant gruppiert und alphabetisch stabil sortiert (deterministisch).
 */
export function sucheObjekte(
  rohQuery: string,
  role: DemoRole | null,
  aktiverMandantId: string,
): SuchErgebnis {
  const query = rohQuery.trim();
  const q = query.toLowerCase();
  if (q.length < SUCHE_MIN_LAENGE) {
    return { query, zuKurz: true, trefferGesamt: 0, gruppen: [] };
  }

  const sichtbar = new Set(sichtbareMandantenIds(role, aktiverMandantId));

  const treffer: SuchTreffer[] = DEMO_SEED.objects
    .filter((o) => {
      if (!sichtbar.has(o.tenant_id)) return false;
      const label = objectTypeLabel(o.object_type)?.toLowerCase();
      return (
        o.display_name.toLowerCase().includes(q) ||
        o.object_type.toLowerCase().includes(q) ||
        (label?.includes(q) ?? false)
      );
    })
    .map((o) => {
      const vertraulich = o.classification.confidentiality === VERTRAULICH;
      return {
        objectId: o.object_id,
        tenantId: o.tenant_id,
        typLabel: objectTypeLabel(o.object_type) ?? o.object_type,
        name: o.display_name,
        vertraulich,
        // Leak-Schutz: vertrauliche Treffer tragen KEINEN Vorschautext.
        snippet: vertraulich || !o.description ? null : kuerze(o.description),
        href: objectDetailHref(o.tenant_id, o.object_id),
      };
    });

  // Nach Mandant gruppieren, Gruppen und Treffer stabil (alphabetisch) sortieren.
  const proMandant = new Map<string, SuchTreffer[]>();
  for (const t of treffer) {
    const liste = proMandant.get(t.tenantId) ?? [];
    liste.push(t);
    proMandant.set(t.tenantId, liste);
  }
  const gruppen: SuchGruppe[] = [...proMandant.entries()]
    .map(([tenantId, liste]) => ({
      tenantId,
      tenantName: tenantName(tenantId),
      treffer: [...liste].sort((a, b) => a.name.localeCompare(b.name, 'de')),
    }))
    .sort((a, b) => a.tenantName.localeCompare(b.tenantName, 'de'));

  return { query, zuKurz: false, trefferGesamt: treffer.length, gruppen };
}
