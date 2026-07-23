'use client';

/**
 * Sphärengerechter Einstieg des Ortes „Kunden" (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * DER BEHOBENE FEHLER: Bis hierher führte `/twin` für JEDE Perspektive in das
 * Mandanten-Portfolio – auch für eine Kundenrolle. Der Usability-Audit fand genau das
 * (Executive Sponsor, eine KUNDENrolle, in einer mandantenübergreifenden Liste). Das ist kein
 * Darstellungsdetail: die Kundensphäre arbeitet in EINEM Unternehmen.
 *
 * QUELLE (Regel Null): Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Kunden" –
 * Navigationsregel **„Für Kundenrollen ggf. direkt der eigene Workspace."** Die Zuordnung
 * Sphäre → Sicht samt Belegen und der begründeten Einordnung des Auditors steht in
 * `lib/shell/sphaere.ts` (eine Quelle, react-frei getestet).
 *
 * KEINE ZUGRIFFSGRENZE: Die Umschaltung ist Darstellung. Sie hält niemanden von einer Route
 * ab und ersetzt keine Autorisierung (Dok. 19, `.claude/rules/security.md`); die Ehrlichkeit
 * dazu steht einmal beim Einstieg (`/login`), nicht auf jeder Seite.
 *
 * BEWUSSTE ENTSCHEIDUNG (Muster O-WP014-09, wie `/heute`/`/isms`/`/services`): Die Auswahl ist
 * Client-Zustand, deshalb ist dieser Einstieg client-gerendert; dadurch landet der Seed-Anteil
 * im Client-Bundle dieser Route. Akzeptiert und dokumentiert.
 */
import { useSession } from '../shell/SessionProvider';
import { derivePageContextFacts } from '../../lib/shell/page-context';
import { kundenSicht } from '../../lib/shell/sphaere';
import { getObjectsForTenant, getRelationshipsForTenant } from '../../lib/twin/data';
import type { DemoTenant } from '@isms/demo-seed';
import { EigenerMandantEinstieg } from './EigenerMandantEinstieg';
import { TenantOverview } from './TenantOverview';
import { TwinContextBar } from './TwinContextBar';

export function KundenOrtView({ tenants }: { tenants: readonly DemoTenant[] }) {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Kunden</p>
        <h1>Kunden</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  // Ohne aktive Auswahl bleibt der Ort in seiner Grundform erreichbar (Portfolio); der
  // fehlende Kontext wird in der Kontextleiste benannt, nicht erfunden.
  if (resolved && kundenSicht(resolved.role) === 'ein_unternehmen' && resolved.role) {
    const objects = getObjectsForTenant(resolved.tenant.tenant_id);
    const relationships = getRelationshipsForTenant(resolved.tenant.tenant_id);
    const facts = derivePageContextFacts(objects, relationships);
    return (
      <EigenerMandantEinstieg
        role={resolved.role}
        tenant={resolved.tenant}
        objectCount={objects.length}
        relationshipCount={relationships.length}
        scopeIds={facts.scopeIds}
        recordedOn={facts.recordedOn ?? null}
        recordedOnDisplay={facts.recordedOnDisplay ?? null}
      />
    );
  }

  return <TenantOverview tenants={tenants} contextSlot={<TwinContextBar />} />;
}
