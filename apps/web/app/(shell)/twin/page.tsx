/**
 * Route `/twin` – Mandantenübersicht des Digital Twin Explorers (Server Component, WP-004).
 * Daten kommen als statischer Import aus `@isms/demo-seed` (kein Client-Fetch).
 */
import { TenantOverview } from '../../../components/twin/TenantOverview';
import { getTenants } from '../../../lib/twin/data';

export const metadata = {
  title: 'Digital Twin Explorer',
  description: 'Read-only Übersicht der Demo-Mandanten des digitalen Zwillings.',
};

export default function TwinOverviewPage() {
  return <TenantOverview tenants={getTenants()} />;
}
