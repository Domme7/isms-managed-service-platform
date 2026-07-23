/**
 * Mandanten-Detailseite des Digital Twin Explorers (read-only, WP-004).
 *
 * Universelle Seitenanatomie (Dok. 06): eigener Leitfrage-Block, „Was ist das? / Warum wichtig?"
 * (Kontextblock aus Seed-Feldern), „Womit hängt es zusammen?" (Objekte nach Familie + Beziehungen).
 * Für Mandanten ohne Objektgraphen wird ein klarer, aus dem Seed abgeleiteter Empty-State gezeigt
 * (frontend.md-Zustände). Rendert innerhalb des `main`-Landmarks aus dem Twin-Layout.
 *
 * Heading-Hierarchie: h1 (Mandant) > h2 (Objekte/Beziehungen bzw. Objektgraph) > h3 (Familie) > h4 (Objekt).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { getModeledTenants, type TenantDetailModel } from '../../lib/twin/data';
import { tenantDetailHref } from '../../lib/twin/routes';
import { Badge } from './Badge';
import { ObjectCard } from './ObjectCard';
import { RelationshipList } from './RelationshipList';

export function TenantDetailView({ model }: { model: TenantDetailModel }) {
  const { tenant, familyGroups, relationships, objectCount, relationshipCount } = model;
  const hasGraph = objectCount > 0;

  return (
    <>
      <Link className="tw-back" href="/twin">
        ← Alle Mandanten
      </Link>

      <p className="tw-eyebrow">Digitaler Zwilling · {tenant.industry}</p>
      <h1>{tenant.display_name}</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation") */}
      <p className="tw-question">
        Was enthält der digitale Zwilling von {tenant.display_name} und wie hängt es zusammen?
      </p>

      {/* "Was / Warum" – ausschließlich synthetischer Seed-Kontext */}
      <p className="tw-lead">{tenant.description}</p>

      {hasGraph ? (
        <TenantGraph
          familyGroups={familyGroups}
          relationships={relationships}
          objectCount={objectCount}
          relationshipCount={relationshipCount}
          tenantId={tenant.tenant_id}
        />
      ) : (
        <EmptyGraphState tenantName={tenant.display_name} modeledTenants={getModeledTenants()} />
      )}
    </>
  );
}

/**
 * `tenantId` (WP-014 Slice 2): Mandant dieser Route – wird an Objektkarten und Beziehungsliste
 * durchgereicht, damit jeder Objektlink im Mandanten der Seite bleibt (Dok. 07 §17/P09).
 */
function TenantGraph({
  familyGroups,
  relationships,
  objectCount,
  relationshipCount,
  tenantId,
}: Pick<
  TenantDetailModel,
  'familyGroups' | 'relationships' | 'objectCount' | 'relationshipCount'
> & {
  tenantId: string;
}) {
  const familyCount = familyGroups.length;

  return (
    <>
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: Bestandszustand (`aria-label` auf
          generischem `div` ist laut ARIA nicht zugesichert). Eine Korrektur (Rolle ergänzen oder
          Label entfernen) wäre eine Produktänderung außerhalb von WP-018 – als A11y-Befund für
          die sichtbare Abnahme (Slice 2) vorgemerkt, nicht still behoben. */}
      <div className="tw-summary" aria-label="Kennzahlen des Objektgraphen">
        <div className="tw-stat">
          <span className="tw-stat-num">{objectCount}</span>
          <span className="tw-stat-label">Objekte</span>
        </div>
        <div className="tw-stat">
          <span className="tw-stat-num">{familyCount}</span>
          <span className="tw-stat-label">Objektfamilien</span>
        </div>
        <div className="tw-stat">
          <span className="tw-stat-num">{relationshipCount}</span>
          <span className="tw-stat-label">Beziehungen</span>
        </div>
      </div>

      <h2 id="objekte">Objekte nach Familie</h2>
      {familyGroups.map((group) => (
        <section key={group.id} aria-label={`${group.id} ${group.name}`}>
          <div className="tw-family-head">
            <h3>
              <Badge variant="family">{group.id}</Badge> {group.name}
            </h3>
          </div>
          <p className="tw-family-leitfrage">{group.leitfrage}</p>
          <ul className="tw-grid">
            {group.objects.map((object) => (
              <ObjectCard
                key={object.object_id}
                object={object}
                familyId={group.id}
                familyName={group.name}
                tenantId={tenantId}
              />
            ))}
          </ul>
        </section>
      ))}

      <h2 id="beziehungen">Beziehungen</h2>
      <p className="tw-muted">
        Gerichtete Kanten (Quelle —Typ→ Ziel) im kanonischen Beziehungsmodell (Dok. 07 §9).
      </p>
      <RelationshipList relationships={relationships} tenantId={tenantId} />
    </>
  );
}

/** Verbindet Namen deutsch: „A", „A und B", „A, B und C". */
function joinDe(names: readonly string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}`;
}

function EmptyGraphState({
  tenantName,
  modeledTenants,
}: {
  tenantName: string;
  modeledTenants: readonly DemoTenant[];
}) {
  const modeledNames = joinDe(modeledTenants.map((t) => t.display_name));

  return (
    <>
      <h2 id="objektgraph">Objektgraph</h2>
      <div className="tw-empty" role="note">
        {/* AC-24-Korrektur (WP-018): „Demo-Slice" → „Demo" (hier und im Fallback-Zweig
            unten) – „Slice" ist Prozessvokabular; minimale Entfernung, nichts Neues. */}
        <h3>Kein Objektgraph in dieser Demo</h3>
        <p style={{ marginTop: 0 }}>
          Für <strong>{tenantName}</strong> ist im aktuellen Demo-Seed noch kein digitaler Zwilling
          modelliert.{' '}
          {modeledTenants.length > 0
            ? `Ausmodelliert ist bislang ${modeledNames}; die übrigen Mandanten folgen in späteren Ausbaustufen.`
            : 'In dieser Demo ist noch kein Mandant vollständig ausmodelliert.'}
        </p>
        {modeledTenants.length > 0 ? (
          <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
            {modeledTenants.map((t) => (
              <Link key={t.tenant_id} className="tw-cta" href={tenantDetailHref(t.tenant_id)}>
                {t.display_name} ansehen →
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </>
  );
}
