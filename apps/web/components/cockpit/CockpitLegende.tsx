/**
 * Ampel-Legende des Cockpits (WP-025, DR-0008 / Dok. 06 06-D11).
 *
 * Steht EINMAL oben im Cockpit und erklärt jede Farbe, bevor sie irgendwo als Ring, Balken oder
 * Warnkarte auftaucht. Jeder Eintrag trägt Symbol (Form) + Text + Regel – nie nur Farbe. Die
 * Ehrlichkeitszeile darunter sagt ausdrücklich: Farbe ist erfasste Datenlage, kein Prüfergebnis.
 */
import { AMPEL_HONESTY, AMPEL_LEGENDE } from '../../lib/cockpit/ampel';

export function CockpitLegende() {
  return (
    <section className="ck-legende" aria-label="Farb-Legende dieser Ansicht">
      <h2 className="ck-legende-titel">Was die Farben bedeuten</h2>
      <ul className="ck-legende-liste">
        {AMPEL_LEGENDE.map((eintrag) => (
          <li key={eintrag.status} className={`ck-legende-item ck-status--${eintrag.status}`}>
            <span className="ck-legende-punkt" aria-hidden="true">
              {eintrag.symbol}
            </span>
            <span className="ck-legende-label">{eintrag.label}</span>
            <span className="ck-legende-regel">{eintrag.regel}</span>
          </li>
        ))}
      </ul>
      <p className="ck-legende-ehrlich">{AMPEL_HONESTY}</p>
    </section>
  );
}
