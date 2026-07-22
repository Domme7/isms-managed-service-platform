/**
 * Mandantenübersicht des Digital Twin Explorers (read-only, WP-004).
 *
 * Beantwortet die konkrete Nutzerfrage (Dok. 06, "Frage vor Navigation"):
 * „Wessen digitalen Zwilling möchte ich ansehen?" – die vier Demo-Mandanten mit
 * `has_object_graph`-Badge; die Auswahl navigiert zur Detailseite. Reine UI-Navigation,
 * KEINE Autorisierungslogik. Rendert innerhalb des `main`-Landmarks aus dem Twin-Layout.
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { tenantDetailHref } from '../../lib/twin/routes';
import { Badge } from './Badge';

export function TenantOverview({ tenants }: { tenants: readonly DemoTenant[] }) {
  return (
    <>
      <p className="tw-eyebrow">Digitaler Unternehmenszwilling</p>
      <h1>Digital Twin Explorer</h1>
      <p className="tw-lead">
        Read-only-Blick in die synthetische Demo-Welt: welche Objekte der digitale Zwilling eines
        Mandanten enthält und wie sie zusammenhängen. Alle Werte stammen aus dem Demo-Seed.
      </p>
      <p className="tw-question">
        Was enthält der digitale Zwilling dieses Mandanten und wie hängt es zusammen?
      </p>

      <h2 id="mandanten">Mandanten</h2>
      <nav aria-labelledby="mandanten">
        <ul className="tw-grid">
          {tenants.map((tenant) => (
            <li key={tenant.tenant_id}>
              <Link className="tw-card tw-card-link" href={tenantDetailHref(tenant.tenant_id)}>
                <span className="tw-card-title">{tenant.display_name}</span>
                <span className="tw-card-sub">{tenant.industry}</span>
                <span className="tw-badge-row">
                  {tenant.has_object_graph ? (
                    <Badge variant="graph">Objektgraph vorhanden</Badge>
                  ) : (
                    <Badge variant="nograph">kein Objektgraph (Demo-Slice)</Badge>
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
