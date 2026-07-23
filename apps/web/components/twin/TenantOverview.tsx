/**
 * Mandantenübersicht des Digital Twin Explorers (read-only, WP-004).
 *
 * Beantwortet die konkrete Nutzerfrage (Dok. 06, "Frage vor Navigation"):
 * „Wessen digitalen Zwilling möchte ich ansehen?" – die vier Demo-Mandanten mit
 * `has_object_graph`-Badge; die Auswahl navigiert zur Detailseite. Reine UI-Navigation,
 * KEINE Autorisierungslogik. Rendert innerhalb des `main`-Landmarks aus dem Twin-Layout.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DemoTenant } from '@isms/demo-seed';
import { tenantDetailHref } from '../../lib/twin/routes';
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
  return (
    <>
      <p className="tw-eyebrow">Digitaler Unternehmenszwilling</p>
      <h1>Digital Twin Explorer</h1>
      <p className="tw-lead">
        Read-only-Blick in die synthetische Demo-Welt: welche Objekte der digitale Zwilling eines
        Mandanten enthält und wie sie zusammenhängen. Alle Werte stammen aus dem Demo-Seed.
      </p>
      {/* „eines", nicht „dieses": diese Seite listet ALLE Mandanten — die mandantenspezifische
          Frage gehört auf die Detailseite (`TenantDetailView`). Vom Owner am Screenshot gefunden;
          der WP-016-Fix-Pass hatte die Detailfrage versehentlich auch hierher gelegt. */}
      <p className="tw-question">
        Was enthält der digitale Zwilling eines Mandanten und wie hängt es zusammen?
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
                  {/* AC-24-Korrektur (WP-018): „Demo-Slice" → „Demo" – „Slice" ist
                      Prozessvokabular (Wächter `prozessvokabular.test.tsx`), nur die
                      Prozesskennung entfernt, keine Umformulierung darüber hinaus. */}
                  {tenant.has_object_graph ? (
                    <Badge variant="graph">Objektgraph vorhanden</Badge>
                  ) : (
                    <Badge variant="nograph">kein Objektgraph (Demo)</Badge>
                  )}
                </span>
                <span className="tw-cta" aria-hidden="true">
                  Zwilling ansehen →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
