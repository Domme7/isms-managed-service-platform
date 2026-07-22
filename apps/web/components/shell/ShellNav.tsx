/**
 * Seitennavigation der acht stabilen Orte (WP-011, Dok. 06 §4 / 06-D01).
 *
 * Rein präsentational: bekommt Orte + aktiven Ort als Props (leicht testbar, keine Router-Hooks).
 * Der aktive Ort wird per `aria-current="page"` UND sichtbar (Klasse) markiert – Farbe ist nie
 * alleiniger Träger (Dok. 06 06-D11): das aktive Item trägt zusätzlich einen Marker.
 */
import Link from 'next/link';
import type { NavPlace, PlaceId } from '../../lib/shell/places';

export function ShellNav({
  places,
  activeId,
  id = 'shell-nav',
  onNavigate,
}: {
  places: readonly NavPlace[];
  activeId?: PlaceId;
  id?: string;
  /** Optionaler Hook, um z. B. das mobile Menü nach Klick zu schließen. */
  onNavigate?: () => void;
}) {
  return (
    <nav id={id} className="shell-nav" aria-label="Hauptnavigation">
      <ul className="shell-nav-list">
        {places.map((place) => {
          const active = place.id === activeId;
          return (
            <li key={place.id}>
              <Link
                href={place.href}
                className={`shell-nav-item${active ? ' shell-nav-item--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={onNavigate}
              >
                <span className="shell-nav-marker" aria-hidden="true" />
                <span className="shell-nav-label">{place.label}</span>
                {place.live ? null : (
                  <span className="shell-nav-soon" aria-hidden="true">
                    bald
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
