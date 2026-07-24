/**
 * Lebenszyklus-Ampelleiste des Cockpits (WP-025, DR-0008 / Dok. 08, Abschnitt „Lebenszyklus").
 *
 * Rendert AUSSCHLIESSLICH die in `lib/cockpit/lebenszyklus.ts` abgeleitete Verteilung: eine
 * gestapelte Leiste, deren Segmentbreiten die ECHTEN Anteile der erfassten Stände sind, plus eine
 * Legende mit Stand-Name und Anzahl. Die Farben unterscheiden die Stände optisch – sie sind KEIN
 * Urteil: die Pflicht-Glosse „erfasster Stand, kein Prüfergebnis" steht sichtbar, und ein Stand,
 * dessen Wortlaut wie ein Urteil klingt, trägt seinen `STAND_HINWEIS` (Lesart, kein Umbenennen).
 *
 * Die Leiste selbst ist `aria-hidden` (reine Form); die vollständige Aussage steht als Text in der
 * Legendenliste daneben – Screenreader verlieren nichts.
 */
import type { CockpitLifecycleBar } from '../../lib/cockpit/lebenszyklus';

/** Zyklische, NEUTRALE Segmentfarbe (kein Ampel-Urteil) – nur zur optischen Unterscheidung. */
function segmentKlasse(index: number): string {
  return `ck-lz-seg--${(index % 6) + 1}`;
}

export function CockpitLebenszyklusLeiste({ bar }: { bar: CockpitLifecycleBar }) {
  return (
    <section className="ck-lebenszyklus" aria-labelledby="ck-lz-titel">
      <h2 id="ck-lz-titel">Erfasste Lebenszyklus-Stände</h2>
      <p className="ck-lz-glosse">{bar.glosse}</p>

      {/* Gestapelte Leiste – reine Form (aria-hidden); Breiten sind echte Anteile. */}
      <div className="ck-lz-bar" aria-hidden="true">
        {bar.segments.map((segment, index) => (
          <div
            key={segment.status}
            className={`ck-lz-bar-seg ${segmentKlasse(index)}`}
            style={{ width: `${segment.anteil * 100}%` }}
            title={`${segment.status}: ${segment.count} von ${bar.total}`}
          />
        ))}
      </div>

      <ul className="ck-lz-legende">
        {bar.segments.map((segment, index) => (
          <li key={segment.status} className="ck-lz-legende-item">
            <span className={`ck-lz-punkt ${segmentKlasse(index)}`} aria-hidden="true" />
            <span className="ck-lz-stand">{segment.status}</span>
            <span className="ck-lz-zahl">
              {segment.count} von {bar.total}
            </span>
            {segment.hinweis ? <span className="ck-lz-hinweis">{segment.hinweis}</span> : null}
          </li>
        ))}
      </ul>
      <p className="ck-lz-fuss">
        Erfasster Stand, kein Prüfergebnis. Reihenfolge: kanonische Katalogreihenfolge der Stände –
        keine Sortierung nach Häufigkeit oder Bedeutung.
      </p>
    </section>
  );
}
