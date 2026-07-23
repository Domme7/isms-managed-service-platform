/**
 * Ein-Unternehmens-Einstieg des Ortes „Kunden" (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile
 * „Kunden", Navigationsregel **„Für Kundenrollen ggf. direkt der eigene Workspace."** – dazu
 * Dok. 06, Screenkatalog „Customer Workspace" (Leitfrage „Wie verstehe ich diesen Kunden in
 * einer Minute?"). Sphäre je Rolle: Dok. 03, Abschnitt „Kanonisches Rollenmodell".
 * Die Zuordnung Rolle → Sicht (inklusive der begründeten Einordnung des Auditors) steht in
 * `lib/shell/sphaere.ts`.
 *
 * MANDANTENGRENZE (Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten CROSS-TENANT-SCHUTZ;
 * FINDING-0009-Klasse): Diese Seite sagt AUSSCHLIESSLICH etwas über den aktiven Mandanten –
 * keine Zahl, kein Name, keine Existenzaussage über andere Mandanten. Auch nicht negativ
 * („Sie sehen die anderen nicht"), denn auch das wäre eine Aussage über ihre Existenz.
 *
 * PERSPEKTIVE, KEINE ZUGRIFFSGRENZE: Der Einstieg ist rollenbezogene Darstellung. Serverseitig
 * durchgesetzte Zugriffsrechte entstehen erst mit der Anmeldung nach Dok. 19; gesagt wird das
 * einmal beim Einstieg (`/login`), nicht auf jeder Seite (DR-0013 Nr. 12).
 *
 * Präsentational: Rolle, Mandant und die gezählte Lage kommen als Props herein.
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import type { DemoRole } from '../../lib/shell/roles';
import { KUNDENBEREICH_HREF } from '../../lib/shell/sphaere';
import { tenantDetailHref } from '../../lib/twin/routes';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

export function EigenerMandantEinstieg({
  role,
  tenant,
  objectCount,
  relationshipCount,
  scopeIds,
  recordedOn,
  recordedOnDisplay,
}: {
  /** Aktive Rolle der Ein-Unternehmens-Sicht (Kundensphäre oder Auditor). */
  role: DemoRole;
  tenant: DemoTenant;
  objectCount: number;
  relationshipCount: number;
  scopeIds: readonly string[];
  /** ISO-Datum des zuletzt erfassten Stands (Systemachse) oder `null`. */
  recordedOn: string | null;
  recordedOnDisplay: string | null;
}) {
  const leer = objectCount === 0 && relationshipCount === 0;

  return (
    <>
      <p className="tw-eyebrow">Kunden · {tenant.display_name}</p>
      {/* Nav-Label = Seitentitel (DR-0013 Nr. 9); der Mandant steht im Aufmacher darüber. */}
      <h1>Kunden</h1>

      <p className="tw-question">
        Was ist für {tenant.display_name} erfasst und wo steige ich ein?
      </p>

      {/* ANTWORT ZUERST (DR-0013 Nr. 1): der belegte Stand in einem Satz – auch im Leerfall. */}
      <p className="tw-lead">
        {leer ? (
          <>
            Für <strong>{tenant.display_name}</strong> ist noch nichts erfasst: keine Objekte und
            keine Beziehungen.
          </>
        ) : (
          <>
            Für <strong>{tenant.display_name}</strong> sind{' '}
            <strong>{anzahl(objectCount, 'Objekt', 'Objekte')}</strong> und{' '}
            <strong>{anzahl(relationshipCount, 'Beziehung', 'Beziehungen')}</strong> erfasst
            {recordedOn && recordedOnDisplay ? (
              <>
                , zuletzt im System erfasst am{' '}
                <time dateTime={recordedOn}>{recordedOnDisplay}</time>
              </>
            ) : null}
            .
          </>
        )}
      </p>

      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Objektkontext dieser Seite"
        scopeValue={
          scopeIds.length > 0
            ? `${tenant.display_name} · ${scopeIds.join(' · ')}`
            : `${tenant.display_name} · keine Scope-Zuordnung erfasst`
        }
        datenstandLabel="Datenstand dieses Mandanten (zuletzt im System erfasst)"
        datenstandValue={
          recordedOn && recordedOnDisplay ? (
            <time dateTime={recordedOn}>{recordedOnDisplay}</time>
          ) : (
            'keine Erfassung hinterlegt'
          )
        }
      />

      <section aria-labelledby="kunden-einstiege">
        <h2 id="kunden-einstiege">Einstiege</h2>
        <ul className="tw-grid">
          <li>
            <Link className="tw-card tw-card-link" href={KUNDENBEREICH_HREF}>
              <span className="tw-card-title">Kundenbereich</span>
              <span className="tw-card-sub">Scopes, Ziele, Services und Nachweise</span>
              <span className="tw-cta" aria-hidden="true">
                Kundenbereich öffnen →
              </span>
            </Link>
          </li>
          <li>
            <Link className="tw-card tw-card-link" href={tenantDetailHref(tenant.tenant_id)}>
              <span className="tw-card-title">Digitaler Zwilling</span>
              <span className="tw-card-sub">
                Objekte nach Familie und ihre gerichteten Beziehungen
              </span>
              <span className="tw-cta" aria-hidden="true">
                Digitalen Zwilling öffnen →
              </span>
            </Link>
          </li>
        </ul>
        {/* Sagt, WAS diese Ansicht zeigt – nicht, was sie verbirgt. Keine Existenzaussage über
            andere Mandanten (Mandantengrenze). */}
        <p className="tw-muted">
          In dieser Rollensicht zeigt der Ort „Kunden" das eigene Unternehmen: ausschließlich{' '}
          {tenant.display_name}.
        </p>
      </section>

      <SeitenbausteineHinweis ort="kunden" />
    </>
  );
}

/** „1 X" / „n Y" – deterministische Ein-/Mehrzahl für belegte Zählungen. */
function anzahl(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
