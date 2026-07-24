/**
 * Warnungen-Panel des Cockpits (WP-025, DR-0008 – „nichts nur Show").
 *
 * Rendert AUSSCHLIESSLICH die in `lib/cockpit/warnungen.ts` (`buildCockpitWarnungen`) abgeleiteten
 * Warnungen des aktiven Mandanten. Jede Karte trägt Titel + Kurzbegründung + funktionalen
 * „→ ansehen"-Weg zum echten Ziel; bei Objekt-Lücken zusätzlich die betroffenen Objekte, je mit
 * direktem Weg auf ihre Objekt-360-Seite (U-09: die Deckung führt ZU den Lückenobjekten).
 *
 * Farbe folgt dem Ampel-Status (nie nur Farbe: jede Karte trägt Symbol + Text). Ein leerer
 * Mandant liefert keine Warnungen – dann steht hier ein ehrlicher Leerzustand, keine erfundene
 * Warnung und kein Wort über einen fremden Mandanten.
 */
import Link from 'next/link';
import { AMPEL_LEGENDE } from '../../lib/cockpit/ampel';
import type { CockpitWarnung } from '../../lib/cockpit/warnungen';
import { anzahl } from '../../lib/heute/data';

/** Form-Symbol je Status (aus der Legende – eine Quelle, nie nur Farbe). */
function statusSymbol(status: CockpitWarnung['status']): string {
  return AMPEL_LEGENDE.find((e) => e.status === status)?.symbol ?? '■';
}

export function CockpitWarnungen({ warnungen }: { warnungen: readonly CockpitWarnung[] }) {
  return (
    <section className="ck-warnungen" aria-labelledby="ck-warnungen-titel">
      <h2 id="ck-warnungen-titel">Offene Datenlücken</h2>
      {warnungen.length === 0 ? (
        <p className="ck-warnungen-leer" role="note">
          Aus dem Datenbestand dieses Mandanten leitet sich keine Datenlücke als Warnung ab. Es wird
          bewusst keine erfunden – die leere Lage ist das Ergebnis.
        </p>
      ) : (
        <>
          <p className="ck-warnungen-lead">
            {anzahl(warnungen.length, 'erfasste Datenlücke', 'erfasste Datenlücken')} des aktiven
            Mandanten – jede aus einer gezählten Lage, kein Sicherheits- oder Wirksamkeitsurteil.
          </p>
          <ul className="ck-warnungen-liste">
            {warnungen.map((warnung) => (
              <li
                key={warnung.id}
                className={`ck-warnung ck-status--${warnung.status}`}
                data-warnung-id={warnung.id}
              >
                <p className="ck-warnung-kopf">
                  <span className="ck-warnung-symbol" aria-hidden="true">
                    {statusSymbol(warnung.status)}
                  </span>
                  <span className="ck-warnung-titel">{warnung.titel}</span>
                </p>
                <p className="ck-warnung-grund">{warnung.begruendung}</p>
                {warnung.objekte.length > 0 ? (
                  <ul className="ck-warnung-objekte">
                    {warnung.objekte.map((objekt) => (
                      <li key={objekt.href}>
                        <Link className="ck-warnung-objekt-link" href={objekt.href}>
                          {objekt.name} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="ck-warnung-ziel">
                  <Link className="ck-warnung-link" href={warnung.ziel.href}>
                    {warnung.ziel.label} →
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
