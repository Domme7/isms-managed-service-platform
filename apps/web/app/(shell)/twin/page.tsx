/**
 * Route `/twin` – Mandantenübersicht des Digital Twin Explorers (Server Component, WP-004).
 * Daten kommen als statischer Import aus `@isms/demo-seed` (kein Client-Fetch).
 *
 * WP-020 Slice 1: Die Kontextleiste (Dok. 06 „Sichtbarer Kontext") ist Session-abhängig und
 * damit Client-Zustand – sie wird als `contextSlot` eingebettet, die Übersicht selbst bleibt
 * eine Server Component.
 */
import { TenantOverview } from '../../../components/twin/TenantOverview';
import { TwinContextBar } from '../../../components/twin/TwinContextBar';
import { getTenants } from '../../../lib/twin/data';

export const metadata = {
  title: 'Digital Twin Explorer',
  description: 'Read-only Übersicht der Demo-Mandanten des digitalen Zwillings.',
};

export default function TwinOverviewPage() {
  return <TenantOverview tenants={getTenants()} contextSlot={<TwinContextBar />} />;
}
