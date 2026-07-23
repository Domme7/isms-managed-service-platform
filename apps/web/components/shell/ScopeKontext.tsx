/**
 * Scope-Wert der Kontextleiste (WP-028-Fixpass, DR-0013 Nr. 2 – Code-Auflage).
 *
 * DER BEFUND: DR-0013 Nr. 2 nennt **Scope-IDs** ausdrücklich unter „weg" (kein internes
 * Vokabular im UI). Trotzdem standen sie prominent über der Falz – in der Kontextleiste jeder
 * Hauptseite und im Ein-Unternehmens-Einstieg, teils als lange Kette
 * („scope-nordwerk-isms-core · scope-nordwerk-managed-service").
 *
 * DIE LÖSUNG OHNE INFORMATIONSVERLUST: Über der Falz steht die ZÄHLUNG („2 Scopes erfasst") –
 * die Aussage, die ein Mensch an dieser Stelle braucht. Die Kennungen selbst bleiben
 * vollständig im DOM, nur ruhig im Aufklappteil (progressive Offenlegung, Dok. 06 P06).
 * Es wird nichts entfernt und nichts erfunden.
 *
 * WARUM KEIN KLARTEXTNAME: Scopes sind im Objektvertrag KEINE eigenständigen Objekte – es
 * gibt nur die rohe `scope_id` an den Objekten, keinen Anzeigenamen (OFFENE FRAGE O-WP014-03).
 * Einen Namen zu erfinden wäre eine Produktentscheidung ohne Datenträger (DR-0005). Deshalb:
 * zählen, was belegt ist, und die Kennung dort zeigen, wo sie hilft statt zu stören.
 *
 * Rein präsentational: jede Seite reicht ihre belegten Kennungen und ihren eigenen Leerwert-
 * Text herein (der Leerwert ist seitenspezifisch, damit die Leiste dem Seiteninhalt nie
 * widerspricht – dieselbe Regel wie beim Datenstand).
 */
import type { ReactNode } from 'react';

/** „1 X" / „n Y" – deterministische Ein-/Mehrzahl (Muster `lib/heute/data.ts`). */
function anzahl(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function ScopeKontextWert({
  scopeIds,
  leerText = 'keine Scope-Zuordnung erfasst',
  praefix,
}: {
  /** Belegte Scope-Kennungen der Seite – ausschließlich des aktiven Mandanten. */
  scopeIds: readonly string[];
  /** Seitenspezifischer Text ohne belegte Zuordnung (ehrlicher Leerwert, kein erfundener). */
  leerText?: string;
  /** Optionaler vorangestellter Kontext (z. B. der Mandantenname im Objektkontext). */
  praefix?: ReactNode;
}) {
  if (scopeIds.length === 0) {
    return (
      <>
        {praefix ? <>{praefix} · </> : null}
        {leerText}
      </>
    );
  }

  return (
    <>
      {praefix ? <>{praefix} · </> : null}
      {anzahl(scopeIds.length, 'Scope erfasst', 'Scopes erfasst')}
      <details className="od-context-details">
        <summary>Kennungen anzeigen</summary>
        <ul>
          {scopeIds.map((scopeId) => (
            <li key={scopeId} className="sv-tech">
              {scopeId}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
