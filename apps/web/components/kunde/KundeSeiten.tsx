'use client';

/**
 * Die drei Seiten-Views der Kunde-Welt (DR-0018 Stufe 3). Jede löst den aktiven Mandanten aus der
 * Sitzung auf und rendert einen vorhandenen, getesteten Inhaltsbaustein SEINES Mandanten:
 *   - Mein Dashboard  → `CockpitModulContent` (das ISMS-Cockpit des Kunden)
 *   - Meine Ablage     → `KundeAblageContent` (Verwaltungsordner über seine echten Objekte)
 *   - Services buchen  → `ServicekatalogContent` (Katalog im Kundenrahmen)
 *
 * Der Rahmen (Kopf-Navigation, Sphärengrenze) kommt aus `KundeWeltShell`; hier steht nur der
 * Inhalt. Ein doppelter Hydration-Schutz ist bewusst schlank – der Rahmen fängt den
 * Nicht-gewählt-Fall bereits ab.
 */
import { useSession } from '../shell/SessionProvider';
import { CockpitModulContent } from '../cockpit/CockpitModulContent';
import { ServicekatalogContent } from '../services/ServicekatalogContent';
import { KundeAblageContent } from './KundeAblageContent';

function useResolvedOrNull() {
  const { resolved, hydrated } = useSession();
  return hydrated ? resolved : null;
}

export function KundeDashboardView() {
  const resolved = useResolvedOrNull();
  if (!resolved) return null;
  return <CockpitModulContent role={resolved.role} tenant={resolved.tenant} />;
}

export function KundeAblageView() {
  const resolved = useResolvedOrNull();
  if (!resolved) return null;
  return <KundeAblageContent tenant={resolved.tenant} />;
}

export function KundeServicesView() {
  const resolved = useResolvedOrNull();
  if (!resolved) return null;
  return <ServicekatalogContent role={resolved.role} tenant={resolved.tenant} />;
}
