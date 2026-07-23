'use client';

/**
 * Kontextleiste der Mandantenübersicht `/twin` (WP-020 Slice 1, Dok. 06 „Sichtbarer Kontext").
 *
 * Die Übersicht ist die BEWUSST mandantenübergreifende Portfolio-Seite des Ortes „Kunden"
 * (Dok. 06 §4: „Portfolio und Customer Workspaces") und wird serverseitig gerendert. Der
 * SICHTBARE KONTEXT (aktiver Mandant + aktive Rolle der Session-Simulation) ist dagegen
 * Client-Zustand – deshalb liegt er in dieser kleinen Client-Komponente, die die Seite als
 * Slot einbettet. Der Objektkontext der Seite bleibt ehrlich benannt: eine Übersicht ALLER
 * Demo-Mandanten; der aktive Mandant ändert daran nichts, er bleibt nur sichtbar.
 *
 * „Datenstand" bezieht sich ausdrücklich NUR auf den AKTIVEN Mandanten (Systemachse
 * `record_time.recorded_at`, Dok. 07 §11) – ein mandantenübergreifend zusammengefasster
 * Datenstand wäre eine neue Cross-Tenant-Aussage und wird bewusst nicht gebildet.
 *
 * BEWUSSTE DEMO-ENTSCHEIDUNG (Muster O-WP014-09, wie `/heute`/`/isms`/`/services`):
 * session-abhängig client-gerendert; dadurch landet der synthetische Seed-Anteil im
 * Client-Bundle dieser Route. Für die Demo akzeptiert und dokumentiert.
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { PageContextBar } from '../shell/PageContextBar';
import { derivePageContextFacts } from '../../lib/shell/page-context';
import { getObjectsForTenant, getRelationshipsForTenant } from '../../lib/twin/data';

export function TwinContextBar() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return <p className="tw-muted">Lade Kontext …</p>;
  }

  if (!resolved) {
    // Die Übersicht ist auch ohne Simulation erreichbar – dann gibt es keinen aktiven
    // Kontext, und genau das wird gesagt, statt einen zu erfinden.
    return (
      <p className="tw-muted">
        Kein aktiver Kontext: Es ist kein Mandant gewählt. Die Übersicht bleibt sichtbar; für den
        sichtbaren Kontext <Link href="/login">einen Mandanten wählen</Link>.
      </p>
    );
  }

  // Datenstand des AKTIVEN Mandanten – über Objekte UND Kanten seines Graphen (dieselbe
  // Systemachse wie die Erfassungswellen auf „Heute").
  const facts = derivePageContextFacts(
    getObjectsForTenant(resolved.tenant.tenant_id),
    getRelationshipsForTenant(resolved.tenant.tenant_id),
  );

  return (
    <PageContextBar
      role={resolved.role}
      tenant={resolved.tenant}
      scopeLabel="Objektkontext dieser Seite"
      scopeValue={'Mandanten-Portfolio des Ortes „Kunden"'}
      datenstandLabel="Datenstand des aktiven Mandanten (zuletzt im System erfasst)"
      datenstandValue={
        facts.recordedOn && facts.recordedOnDisplay ? (
          <time dateTime={facts.recordedOn}>{facts.recordedOnDisplay}</time>
        ) : (
          'keine Erfassung im Datenbestand'
        )
      }
    />
  );
}
