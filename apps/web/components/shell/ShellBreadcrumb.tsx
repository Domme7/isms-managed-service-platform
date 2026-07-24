/**
 * Brotkrume der Shell (DR-0017 Stage 4): ersetzt die Seitennavigation der acht Orte.
 *
 * DR-0017 (drill-only IA, Owner-akzeptiert): „Keine Klick-Reiter an den Seiten mehr." Die acht
 * Bereiche sind KEINE Sidebar mehr, sondern Kacheln im Cockpit (`BereichKacheln`); man taucht von
 * dort in einen Bereich ein. Die Shell trägt deshalb nur noch den DRILL-PFAD zurück:
 *   [Portfolio ›] Cockpit › [aktueller Bereich]
 * — mit Rückkehr-Links ins Portfolio (nur Portfolio-Sicht) und ins Cockpit (der Drill-Anker).
 *
 * KONZEPT-TENSION (DR-0005, benannt): Dok. 06-D01 legt die acht Orte als feste Sidebar-Navigation
 * fest. DR-0017 löst diese Mechanik ab (Owner geht vor Konzept, DR-0006) – die acht Bereiche bleiben
 * navigierbar (Cockpit-Kacheln), nur der Weg ist Eintauchen statt Reiter.
 *
 * Rein präsentational: Orte + aktiver Ort kommen als Props (leicht testbar, keine Router-Hooks).
 */
import Link from 'next/link';

import type { NavPlace, PlaceId } from '../../lib/shell/places';

export function ShellBreadcrumb({
  places,
  activeId,
  zeigePortfolio = false,
}: {
  places: readonly NavPlace[];
  activeId?: PlaceId;
  /** Der Portfolio-Rücksprung erscheint nur in der Portfolio-Sicht (Berater), nicht für Kunden. */
  zeigePortfolio?: boolean;
}) {
  const aktiv = activeId ? places.find((p) => p.id === activeId) : undefined;

  return (
    <nav className="shell-breadcrumb" aria-label="Navigationspfad">
      {zeigePortfolio ? (
        <>
          <Link className="shell-breadcrumb-link" href="/portfolio">
            Portfolio
          </Link>
          <span className="shell-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
        </>
      ) : null}
      <Link className="shell-breadcrumb-link" href="/cockpit">
        Cockpit
      </Link>
      {aktiv ? (
        <>
          <span className="shell-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span className="shell-breadcrumb-current" aria-current="page">
            {aktiv.label}
          </span>
        </>
      ) : null}
    </nav>
  );
}
