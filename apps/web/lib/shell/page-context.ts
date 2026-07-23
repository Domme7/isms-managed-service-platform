/**
 * Seitenkontext-Fakten für die querschnittliche Kontextleiste (WP-020 Slice 1).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sichtbarer Kontext" – die
 * Kontextleiste jeder Hauptseite zeigt u. a. „Scope oder Objektkontext" und „Datenstand /
 * letzter Synchronisationszeitpunkt". Dieses Modul leitet BEIDE ausschließlich aus belegten
 * Feldern des Datenbestands ab (`scope_ids`, `record_time.recorded_at`); es wird nichts
 * hartkodiert, nichts geschätzt und nichts verdichtet, was eine Bewertung wäre.
 *
 * „Datenstand" ist ausdrücklich die SYSTEMACHSE (`record_time.recorded_at`, Dok. 07 §11) und
 * wird nicht mit der fachlichen Gültigkeit (`valid_time`) vermischt – dasselbe Muster wie in
 * `lib/heute/data.ts` (Erfassungswellen) und `lib/entscheidungen/data.ts`.
 *
 * React-frei und über `(objects, relationships)` pur, damit die Ableitung deterministisch
 * gegen echten Seed UND synthetische Fixtures testbar ist (Muster `lib/twin/data.ts`).
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { calendarDay, formatIsoDateDe } from '../twin/routes';

export interface PageContextFacts {
  /**
   * Verschiedene Scope-Kennungen (`scope_ids`) der übergebenen Objekte, in Reihenfolge des
   * ersten Auftretens. Leer, wenn kein Objekt eine Scope-Zuordnung trägt – die Kontextleiste
   * benennt das dann als „keine Scope-Zuordnung erfasst" statt einen Scope zu erfinden.
   */
  readonly scopeIds: readonly string[];
  /**
   * Jüngster Kalendertag der Systemerfassung über Objekte UND Kanten (ISO-Datum,
   * z. B. „2026-03-16") – `undefined`, wenn nichts erfasst ist. Bewusst OHNE Uhrzeit:
   * ein Tageswert behauptet keine Uhrzeit, die für die Gruppe niemand belegt hat
   * (Muster `RecordingWave.recordedOn`).
   */
  readonly recordedOn?: string;
  /** Deutsches Datum zu `recordedOn` („16.03.2026"), aus `formatIsoDateDe`. */
  readonly recordedOnDisplay?: string;
}

/**
 * Leitet Scope-Kennungen und Datenstand aus den übergebenen, bereits MANDANTENGEBUNDENEN
 * Listen ab. Diese Funktion filtert bewusst NICHT selbst auf einen Mandanten: sie kennt
 * keinen und trifft keine Mandantenaussage – wer fremde Objekte hineingibt, sieht fremde
 * Fakten. Alle Aufrufer übergeben die bereits per `tenant_id` gefilterten Listen der
 * jeweiligen Seite (Aussage über diese Signatur, Muster `buildMissionControlModel`-Kommentar).
 */
export function derivePageContextFacts(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[] = [],
): PageContextFacts {
  const scopeIds: string[] = [];
  for (const object of objects) {
    for (const scope of object.scope_ids) {
      if (!scopeIds.includes(scope.scope_id)) scopeIds.push(scope.scope_id);
    }
  }

  let recordedOn: string | undefined;
  const beobachte = (recordedAt: string): void => {
    const day = calendarDay(recordedAt);
    if (!recordedOn || day > recordedOn) recordedOn = day;
  };
  for (const object of objects) beobachte(object.record_time.recorded_at);
  for (const relationship of relationships) beobachte(relationship.record_time.recorded_at);

  return {
    scopeIds,
    recordedOn,
    recordedOnDisplay: recordedOn ? formatIsoDateDe(recordedOn) : undefined,
  };
}
