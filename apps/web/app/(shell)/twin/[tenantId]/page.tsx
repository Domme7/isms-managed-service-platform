/**
 * Route `/twin/[tenantId]` – Mandanten-Detail des Digital Twin Explorers (Server Component, WP-004).
 *
 * `params` ist in Next 15 ein Promise. Unbekannte Mandanten -> `notFound()` (sauberer 404-Pfad).
 * Alle Mandanten werden vorab statisch generiert (`generateStaticParams`).
 * Daten aus `@isms/demo-seed` (statischer Import, keine DB/Auth) – Mandantenauswahl ist reine
 * UI-Navigation, KEINE Zugriffslogik.
 */
import { notFound } from 'next/navigation';
import { TenantDetailView } from '../../../../components/twin/TenantDetailView';
import { buildTenantDetail, getTenant, getTenants } from '../../../../lib/twin/data';

export function generateStaticParams() {
  return getTenants().map((tenant) => ({ tenantId: tenant.tenant_id }));
}

export async function generateMetadata({ params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const tenant = getTenant(tenantId);
  return {
    title: tenant ? `${tenant.display_name} – Digital Twin Explorer` : 'Mandant nicht gefunden',
  };
}

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;
  const tenant = getTenant(tenantId);
  if (!tenant) {
    notFound();
  }

  return <TenantDetailView model={buildTenantDetail(tenant)} />;
}
