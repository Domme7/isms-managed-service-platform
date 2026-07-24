/**
 * SVG-Radar-/Web-Chart des Cockpits (WP-034, Bento-Mosaik, DR-0016 / DR-0008).
 *
 * Der Radar ist eine FORM-Ergänzung: das `<svg>` ist `aria-hidden`, die Aussage steht als
 * barrierefreie „x von y"-Liste daneben (Screenreader verlieren nichts, nie nur Farbe – Dok. 06
 * 06-D11). Achsen und Werte kommen ausschließlich aus `buildCockpitRadar` (die vier erfassten
 * Abdeckungen); hier wird nur Geometrie gezeichnet, nichts gerechnet oder bewertet. Farben sind
 * die Ampel-Tokens (`--ck-ok/-warn/-alert/-info`), also die offengelegte Datenlage-Regel.
 */
import type { CockpitRadarModel, CockpitRadarAxis } from '../../lib/cockpit/radar';

/** Punkt auf der Achse `i` im Radius `r` (0…R), Startachse oben (−90°), im Uhrzeigersinn. */
function punkt(i: number, r: number, n: number, cx: number, cy: number): [number, number] {
  const winkel = ((-90 + (i * 360) / n) * Math.PI) / 180;
  return [
    Math.round((cx + r * Math.cos(winkel)) * 10) / 10,
    Math.round((cy + r * Math.sin(winkel)) * 10) / 10,
  ];
}

function polygon(punkte: readonly [number, number][]): string {
  return punkte.map(([x, y]) => `${x},${y}`).join(' ');
}

/** CSS-Variablenname der Punktfarbe je Ampel-Status (Datenlage-Regel, kein Urteil). */
const STATUS_VAR: Readonly<Record<CockpitRadarAxis['status'], string>> = {
  ok: 'var(--ck-ok)',
  warn: 'var(--ck-warn)',
  alert: 'var(--ck-alert)',
  info: 'var(--ck-info)',
};

export function CockpitRadar({ radar }: { radar: CockpitRadarModel }) {
  const axes = radar.axes;
  const n = axes.length;
  const cx = 100;
  const cy = 100;
  const R = 68;
  const ringe = [0.25, 0.5, 0.75, 1];

  return (
    <div className="ck-radar">
      <svg viewBox="0 0 200 200" className="ck-radar-svg" aria-hidden="true" role="presentation">
        {ringe.map((g) => (
          <polygon
            key={g}
            className="ck-radar-gitter"
            points={polygon(axes.map((_, i) => punkt(i, R * g, n, cx, cy)))}
            fill="none"
          />
        ))}
        {axes.map((axis, i) => {
          const [x, y] = punkt(i, R, n, cx, cy);
          return <line key={axis.id} className="ck-radar-achse" x1={cx} y1={cy} x2={x} y2={y} />;
        })}
        <polygon
          className="ck-radar-flaeche"
          points={polygon(axes.map((axis, i) => punkt(i, R * axis.anteil, n, cx, cy)))}
        />
        {axes.map((axis, i) => {
          const [x, y] = punkt(i, R * axis.anteil, n, cx, cy);
          return (
            <circle
              key={axis.id}
              className="ck-radar-punkt"
              cx={x}
              cy={y}
              r={3.2}
              style={{ fill: STATUS_VAR[axis.status] }}
            />
          );
        })}
      </svg>
      {/* Barrierefreie Textalternative: die reale „x von y"-Lage je Achse (der Radar selbst ist
          aria-hidden). Auch visuell nützlich als Kurzlegende unter dem Chart. */}
      <ul className="ck-radar-werte">
        {axes.map((axis) => (
          <li key={axis.id} className={`ck-status--${axis.status}`}>
            <span className="ck-radar-punktmarke" aria-hidden="true" />
            <span className="ck-radar-wert-label">{axis.label}</span>
            <span className="ck-radar-wert-zahl">
              {axis.isEmpty ? 'keine Grundgesamtheit' : `${axis.covered} von ${axis.total}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
