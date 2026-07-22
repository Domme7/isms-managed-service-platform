/**
 * Routen- und Datumsdarstellung der Objekt-360-Seite – BEWUSST SEED-FREI (WP-014, Review-Fix).
 *
 * Dieses Modul enthält ausschließlich reine String-Funktionen und importiert weder
 * `@isms/demo-seed` noch `@isms/contracts`. Grund: `objectDetailHref`/`formatIsoDateDe` werden
 * auch aus Client-Komponenten (`IsmsCards`, `ServiceCard`, `PortfolioOverview`) verwendet.
 * Lägen sie weiterhin in `lib/twin/object-detail.ts`, zöge jede solche Nutzung den statischen
 * `DEMO_SEED`-Import (alle Mandanten) in den Client-Bundle-Graphen. Heute ist das unschädlich,
 * ab der ersten bewusst seed-freien Client-Komponente wäre es ein echter Datenabfluss.
 *
 * `lib/twin/object-detail.ts` re-exportiert beide Funktionen unverändert – Signatur und
 * Verhalten bleiben identisch.
 */

/**
 * Pfad der Objekt-360-Detailseite. EINZIGE Stelle, an der die Route gebildet wird (WP-014
 * Slice 2) – Twin-Explorer, ISMS- und Services-Ansicht verlinken über diesen Helfer.
 *
 * Der Mandant ist Pflichtparameter und muss IMMER der Mandant des verlinkten Objekts sein:
 * bei der Twin-Route aus dem Routenparameter, bei den session-gebundenen Ansichten aus dem
 * aktiven Mandanten der Session (WP-011). Ein Link über die Mandantengrenze ist verboten
 * (Dok. 07 §17/P09) und würde auf der Zielseite ohnehin als 404 enden, weil
 * `buildObjectDetail` mandantenfremde Objekte als nicht existent behandelt.
 *
 * Beide Segmente werden URL-kodiert: der Contract erlaubt für `tenant_id`/`object_id` beliebige
 * nichtleere Strings, eine Kennung mit „/", „#" oder „?" würde sonst eine andere oder
 * abgeschnittene Route erzeugen. Next dekodiert Routenparameter beim Lesen wieder, der
 * Mandanten-/Objektvergleich in `buildObjectDetail` bleibt damit unverändert korrekt.
 */
export function objectDetailHref(tenantId: string, objectId: string): string {
  return `/twin/${encodeURIComponent(tenantId)}/objekt/${encodeURIComponent(objectId)}`;
}

/**
 * Pfad der Mandanten-Detailseite des Twin-Explorers (`/twin/[tenantId]`). EINZIGE Stelle, an der
 * diese Route gebildet wird: Mandantenübersicht, Mandanten- und Objekt-360-Seite sowie der
 * Einstieg „Zwilling" des Ortes „Heute" verlinken über diesen Helfer (Review-Fix – vorher setzten
 * vier Aufrufstellen die Route selbst zusammen, ohne die Kodierung).
 * Kodierung und Begründung identisch zu `objectDetailHref` (Segmente dürfen laut Contract
 * beliebige nichtleere Strings sein).
 */
export function tenantDetailHref(tenantId: string): string {
  return `/twin/${encodeURIComponent(tenantId)}`;
}

/** Führendes Kalenderdatum eines ISO-8601-Zeitstempels („2026-01-15T…" -> 2026/01/15). */
const ISO_CALENDAR_DAY = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * ISO-8601-Zeitstempel als deutsches Datum („15.01.2026"). Gelesen wird der KALENDERTAG der
 * Zeichenkette selbst, nicht ein umgerechneter UTC-Tag: der Contract erlaubt Zeitstempel mit
 * Offset (`common.ts`, `z.iso.datetime({ offset: true })`), und eine UTC-Umrechnung würde
 * „2026-01-01T00:00:00+01:00" als „31.12.2025" anzeigen – also die fachliche Gültigkeit
 * verschieben, die diese Seite gerade sichtbar machen soll (Dok. 07 §11/D07).
 *
 * Anzeige, Tests und Build bleiben so zeitzonenunabhängig identisch. Der exakte Zeitpunkt
 * bleibt in der Anzeige über das `dateTime`-Attribut erhalten; ein unlesbarer Wert wird
 * fail-loud roh durchgereicht statt still ersetzt.
 */
export function formatIsoDateDe(iso: string): string {
  const match = ISO_CALENDAR_DAY.exec(iso);
  if (!match) return iso;
  return `${match[3]}.${match[2]}.${match[1]}`;
}
