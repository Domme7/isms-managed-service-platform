/**
 * Mandantenübergreifende Portfolio-Übersicht (WP-012 Slice 2) – read-only Vorstufe des
 * Portfolio Cockpits (Dok. 06 §7 S04: „Welche Mandanten, Services oder Termine kippen?").
 *
 * WICHTIG: reine Aggregation JE Mandant nebeneinander aus demselben Datenbestand – es gibt
 * KEINE mandantenübergreifende Kante (OFFENE FRAGE O-WP012-03, Dok. 07 P09). Wer diesen
 * Abschnitt überhaupt sieht, entscheidet seit dem WP-028-Fixpass ausschließlich
 * `kundenSicht(role)` (`lib/shell/sphaere.ts`) – dieselbe Quelle wie am Ort „Kunden", nicht mehr
 * ein zweites Welt-Mapping dieser Seite. Das bleibt eine reine Anzeige-Verdichtung, KEINE
 * Sicherheitsgrenze. Status immer als Text, nie nur Farbe (Dok. 06 06-D11).
 *
 * WP-014 Slice 2: Jeder Servicename verlinkt auf seine Objekt-360-Seite. Der Mandant des Links
 * ist IMMER `entry.tenant.tenant_id`, also der Mandant, aus dessen Objekten die Zeile gebildet
 * wurde – es entsteht kein Link über die Mandantengrenze (Dok. 07 §17/P09). Die Mandantenkarte
 * selbst bleibt unverlinkt: ein Mandant ist kein Graph-Objekt und hat keine Objektseite.
 *
 * Heading-Ebene: h2 (Sektion) > h3 (Mandantenkarte).
 */
import Link from 'next/link';
import type { PortfolioTenantEntry } from '../../lib/services/data';
// Seed-freies Routenmodul (Review-Fix): diese Datei landet über `ServicesView` im Client-Bundle
// und darf den statischen DEMO_SEED-Import von `lib/twin/object-detail.ts` nicht mitziehen.
import { objectDetailHref } from '../../lib/twin/routes';

export function PortfolioOverview({ entries }: { entries: readonly PortfolioTenantEntry[] }) {
  return (
    <section aria-labelledby="portfolio">
      <h2 id="portfolio">Portfolio: Alle Mandanten</h2>
      {/* Klartext ohne interne Arbeits-IDs (UX-Review MINOR-2); fachlicher Hintergrund der
          rein mandantenweisen Aggregation: OFFENE FRAGE O-WP012-03, Dok. 07 P09.
          KEIN ERFUNDENER WELTBEGRIFF (Nachfix nach Gate-Runde 2): „Portfolio-Arbeitswelt" war ein
          im Konzept nicht belegter Weltbegriff – die vier Erlebniswelten heißen anders (Dok. 06
          §5). Der Satz sagt jetzt nur, was diese Übersicht TUT (Ansicht ordnen, nicht Zugriff
          entscheiden), ohne eine Welt zu benennen. */}
      <p className="tw-muted">
        Welche Mandanten haben welche Services? Aggregation je Mandant nebeneinander – ohne
        mandantenübergreifende Verknüpfung. Diese Übersicht ordnet die Ansicht und entscheidet nicht
        über Zugriff.
      </p>
      <ul className="tw-grid">
        {entries.map((entry) => (
          <li key={entry.tenant.tenant_id} className="tw-card">
            <h3 className="tw-card-title">{entry.tenant.display_name}</h3>
            <p className="tw-card-sub">
              {entry.service_count === 1
                ? '1 Managed Service'
                : `${entry.service_count} Managed Services`}
            </p>
            {entry.services.length > 0 ? (
              <ul className="sv-items">
                {entry.services.map((service) => (
                  <li key={service.object_id}>
                    <Link
                      className="sv-item-name"
                      href={objectDetailHref(entry.tenant.tenant_id, service.object_id)}
                    >
                      {service.name}
                    </Link>
                    <span className="sv-item-meta">
                      {' '}
                      · Lebenszyklus-Stand: {service.lifecycle_status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sv-item-meta">Keine Managed Services im aktuellen Datenbestand.</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
