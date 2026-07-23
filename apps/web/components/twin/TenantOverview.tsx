/**
 * Mandanten-Portfolio des Ortes „Kunden" (read-only, WP-004; Sprache und Sphäre WP-028 Slice 4).
 *
 * WER DIESE SEITE SIEHT: Betreiber-/Beraterrollen, die Administrator-Rolle (Sphäre „Beide") und
 * der neutrale Einstieg. Kundenrollen und der Auditor bekommen statt des Portfolios ihren
 * eigenen Mandanten (`EigenerMandantEinstieg`, Entscheidung und Belege in
 * `lib/shell/sphaere.ts`). Diese Komponente selbst bleibt rein präsentational.
 *
 * EIN LEITBEGRIFF JE KONZEPT (DR-0013 Nr. 9): Die Seite hieß „Digital Twin Explorer", trug den
 * Aufmacher „DIGITALER UNTERNEHMENSZWILLING", listete darunter „Mandanten" und bot „Zwilling
 * ansehen" an – vier Begriffe für zwei Sachen. Festgelegt und hier durchgehalten:
 *   **Mandant** = die Organisation · **Digitaler Zwilling** = ihr Objektgraph.
 * Der Seitentitel ist jetzt das Navigationslabel („Kunden"), durchgängig deutsch.
 *
 * Beantwortet die konkrete Nutzerfrage (Dok. 06, „Frage vor Navigation"): welchen Mandanten
 * man ansieht und was dessen digitaler Zwilling enthält. Reine UI-Navigation, KEINE
 * Autorisierungslogik. Rendert innerhalb des `main`-Landmarks aus dem Shell-Layout.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DemoTenant } from '@isms/demo-seed';
import { tenantDetailHref } from '../../lib/twin/routes';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';
import { Badge } from './Badge';

/**
 * `contextSlot` ergänzt in WP-020 Slice 1: die Route `/twin` bettet hier die Kontextleiste
 * (`TwinContextBar`, Client-Komponente mit Session-Zugriff) ein – diese Komponente selbst
 * bleibt server-renderbar und ohne Session-Abhängigkeit testbar.
 */
export function TenantOverview({
  tenants,
  contextSlot,
}: {
  tenants: readonly DemoTenant[];
  contextSlot?: ReactNode;
}) {
  const mitZwilling = tenants.filter((t) => t.has_object_graph).length;

  return (
    <>
      <p className="tw-eyebrow">Kunden · Mandanten-Portfolio</p>
      {/* Nav-Label = Seitentitel (DR-0013 Nr. 9). */}
      <h1>Kunden</h1>

      {/* „eines", nicht „dieses": diese Seite listet ALLE Mandanten — die mandantenspezifische
          Frage gehört auf die Detailseite (`TenantDetailView`). Vom Owner am Screenshot gefunden;
          der WP-016-Fix-Pass hatte die Detailfrage versehentlich auch hierher gelegt. */}
      <p className="tw-question">
        Was enthält der digitale Zwilling eines Mandanten und wie hängt es zusammen?
      </p>

      {/* ANTWORT ZUERST (DR-0013 Nr. 1): die belegte Lage in einem Satz, aus den Daten gezählt.
          „x von y" mit sichtbarem Nenner – kein Prozentwert, keine Bewertung. */}
      <p className="tw-lead">
        {tenants.length === 0 ? (
          'Es ist kein Mandant erfasst.'
        ) : (
          <>
            <strong>
              {mitZwilling} von {tenants.length} Mandanten
            </strong>{' '}
            {mitZwilling === 1 ? 'trägt' : 'tragen'} einen erfassten digitalen Zwilling. Die Karten
            unten führen in den jeweiligen Mandanten.
          </>
        )}
      </p>

      {contextSlot}

      <h2 id="mandanten">Mandanten</h2>
      <nav aria-labelledby="mandanten">
        <ul className="tw-grid">
          {tenants.map((tenant) => (
            <li key={tenant.tenant_id}>
              <Link className="tw-card tw-card-link" href={tenantDetailHref(tenant.tenant_id)}>
                <span className="tw-card-title">{tenant.display_name}</span>
                <span className="tw-card-sub">{tenant.industry}</span>
                <span className="tw-badge-row">
                  {/* Ein Leitbegriff (DR-0013 Nr. 9): „Objektgraph" und „Zwilling" waren zwei
                      Namen für dieselbe Sache; der Zusatz „(Demo)" war Meta-Kennzeichnung und
                      entfällt mit DR-0011. */}
                  {tenant.has_object_graph ? (
                    <Badge variant="graph">digitaler Zwilling erfasst</Badge>
                  ) : (
                    <Badge variant="nograph">kein digitaler Zwilling erfasst</Badge>
                  )}
                </span>
                <span className="tw-cta" aria-hidden="true">
                  Digitalen Zwilling öffnen →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* BENANNTE LÜCKE, keine Entschuldigung (Dok. 03, Abschnitt „Rollenprinzipien":
          „Serviceanbieter sehen nur Kunden und Daten, für die ein aktiver Auftrag und Scope
          besteht."). Das Portfolio zeigt die erfassten Mandanten – eine Auftrags- oder
          Engagement-Zuordnung, die es darauf einschränken würde, ist nicht hinterlegt. */}
      <p className="tw-muted">
        Eine Auftrags- oder Engagement-Zuordnung, die dieses Portfolio auf beauftragte Mandanten
        einschränkt, ist im Datenbestand nicht hinterlegt.
      </p>

      {/* Seitenbausteine-Konvention (WP-020 Slice 3, Dok. 06 „Verbindliche Seitenbausteine"):
          ehrliche Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
      <SeitenbausteineHinweis ort="kunden" />
    </>
  );
}
