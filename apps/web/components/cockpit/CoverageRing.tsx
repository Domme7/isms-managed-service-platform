/**
 * SVG-Deckungsring des Cockpits (WP-025, moderne Dashboard-Sprache).
 *
 * Der Ring ist eine FORM-Ergänzung zur sichtbaren „x von y"-Angabe: er ist `aria-hidden` und
 * verändert keine Aussage – die Zahl steht als Text in der Kachel daneben. Die Füllung ist der
 * echte Anteil `covered/total`; die Farbe folgt dem Ampel-Status (`lib/cockpit/ampel.ts`), also
 * ausschließlich der offengelegten Datenlage-Regel. Kein Prozent-Score im Text, keine Animation.
 */
import type { CockpitStatus } from '../../lib/cockpit/ampel';

export function CoverageRing({
  covered,
  total,
  status,
}: {
  covered: number;
  total: number;
  status: CockpitStatus;
}) {
  const anteil = total > 0 ? Math.max(0, Math.min(1, covered / total)) : 0;
  const radius = 26;
  const umfang = 2 * Math.PI * radius;
  const gefuellt = anteil * umfang;

  return (
    <div className={`ck-ring ck-ring--${status}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="ck-ring-svg" role="presentation">
        <circle className="ck-ring-track" cx="32" cy="32" r={radius} fill="none" />
        <circle
          className="ck-ring-fill"
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeDasharray={`${gefuellt} ${umfang - gefuellt}`}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
      </svg>
      {/* Zahl in der Ringmitte – dekorativ dupliziert; die barrierefreie Angabe steht als Text
          in der Kachel (die Kachel führt „x von y" außerhalb dieses aria-hidden-Blocks). */}
      <span className="ck-ring-zahl">
        {covered}
        <span className="ck-ring-von">/{total}</span>
      </span>
    </div>
  );
}
