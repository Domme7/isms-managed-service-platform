/**
 * Sichtbare Baustein-Ehrlichkeit einer Live-Seite (WP-020, Dok. 06 „Verbindliche
 * Seitenbausteine").
 *
 * Rendert für einen Ort die BENANNTE Lücke: welche der neun verbindlichen Seitenbausteine der
 * Datenbestand dieser Seite nicht ('ohne_traeger') oder nur teilweise ('teilweise') trägt –
 * mit Begründung aus `lib/shell/seitenbausteine.ts` (eine Quelle, per Test vollständig).
 * Bausteine mit Status 'vorhanden'/'verweis' sind dort im Code belegt und werden hier bewusst
 * NICHT als leere Platzhalter gerendert (AC-Vorgabe „keine leeren Attrappen").
 *
 * Als `<details>` mit sichtbarer Summary: die Kennzeichnung ist immer sichtbar, der Inhalt
 * öffnet sich kontrolliert (Dok. 06 P06 progressive Offenlegung). Kein Zustand, keine Daten –
 * server-renderbar (auch für die Objekt-360-Seite und die Mandantenübersicht).
 *
 * ⚠️ VERPACKUNG GEÄNDERT (WP-028-Fixpass + Nachfix, Product-Auflage): Die zugeklappte Zeile lautete
 * „Seitenaufbau: Von den neun verbindlichen Seitenbausteinen trägt der Datenbestand auf dieser
 * Seite 4 nicht, 1 nur teilweise". Das ist eine Aussage über eine KONZEPT-KONVENTION, die kein
 * Nutzer kennt („neun verbindliche Seitenbausteine") – Designtheorie im Produkt, genau das, was
 * DR-0013 Nr. 5 aus der Oberfläche nimmt. Die neue Zeile sagt dasselbe in Nutzerfrage-Form:
 * was diese Seite heute nicht zeigt.
 *
 * NENNER BLEIBT SICHTBAR (Nachfix nach Gate-Runde 2): Der erste Fix strich mit dem Konzeptbegriff
 * versehentlich auch die Grundgesamtheit („5 von 9" → „5 …"). Eine Zahl ohne Nenner ist genau die
 * Sorte Aussage, die das Produkt sonst überall vermeidet (Ehrlichkeits-Substanz: „x von y" mit
 * sichtbarem Nenner). Deshalb steht der Nenner wieder da – als reine Zahl („5 von 9 Angaben"),
 * OHNE den Konzeptbegriff „verbindliche Seitenbausteine" zurück ins UI zu holen. Der Nenner ist die
 * Zahl der dokumentierten Bausteine dieses Ortes (`bausteinAbdeckung(ort).length`), nicht
 * hartkodiert. EIN Begriff durchgehalten – „ohne Datengrundlage" in Summary UND Detailüberschrift.
 * Der Wächter `components/__tests__/seitenbausteine.test.tsx` nagelt Führung und Zahlen fest; der
 * INHALT des Aufklappteils (Bausteinnamen und Begründungen) bleibt unverändert.
 */
import { bausteinAbdeckung, getBaustein, type BausteinOrt } from '../../lib/shell/seitenbausteine';

export function SeitenbausteineHinweis({ ort }: { ort: BausteinOrt }) {
  const zuordnung = bausteinAbdeckung(ort);
  const ohneTraeger = zuordnung.filter((z) => z.status === 'ohne_traeger');
  const teilweise = zuordnung.filter((z) => z.status === 'teilweise');
  // Grundgesamtheit = alle dokumentierten Bausteine dieses Ortes (der „von 9"-Nenner), aus der
  // Datenquelle gelesen statt hartkodiert – driftet die Zuordnung, driftet der Nenner mit.
  const gesamt = zuordnung.length;

  return (
    <section className="pb-hinweis" aria-label="Seitenbausteine dieser Seite">
      <details className="pb-details">
        <summary className="pb-summary">
          Was diese Seite heute nicht zeigt:{' '}
          {ohneTraeger.length > 0
            ? `${ohneTraeger.length} von ${gesamt} Angaben ohne Datengrundlage`
            : `keine von ${gesamt} Angaben ohne Datengrundlage`}
          {teilweise.length > 0 ? `, ${teilweise.length} weitere nur teilweise belegt` : ''} –
          Details öffnen.
        </summary>
        {ohneTraeger.length > 0 ? (
          <>
            <h3 className="pb-block-titel">Ohne Datengrundlage auf dieser Seite</h3>
            <ul className="pb-liste">
              {ohneTraeger.map((z) => (
                <li key={z.baustein}>
                  <span className="pb-baustein-name">{getBaustein(z.baustein).name}</span>
                  <span className="pb-baustein-grund"> – {z.grund}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {teilweise.length > 0 ? (
          <>
            <h3 className="pb-block-titel">Nur teilweise belegt</h3>
            <ul className="pb-liste">
              {teilweise.map((z) => (
                <li key={z.baustein}>
                  <span className="pb-baustein-name">{getBaustein(z.baustein).name}</span>
                  {z.wo ? <span className="pb-baustein-wo"> – belegt: {z.wo}</span> : null}
                  {z.fehlt ? <span className="pb-baustein-grund"> Es fehlt: {z.fehlt}</span> : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <p className="pb-fussnote">
          Diese Benennung ist eine Aussage über den heutigen Datenbestand, kein Zeitplan. Leere
          Platzhalter für fehlende Bausteine werden bewusst nicht gezeigt.
        </p>
      </details>
    </section>
  );
}
