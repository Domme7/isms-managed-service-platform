/**
 * Route `/twin/[tenantId]/objekt/[objectId]` – Objekt-360-Detailseite (Server Component, WP-014).
 *
 * `params` ist in Next 15 ein Promise. Alle (Mandant, Objekt)-Paare des Seeds werden vorab
 * statisch generiert (`generateStaticParams`). Daten aus `@isms/demo-seed` (statischer Import,
 * keine DB/Auth).
 *
 * TENANT-ISOLATION (Sicherheitsgrenze, Dok. 07 §17/P09): Eine unbekannte Objekt-ID UND eine
 * gültige Objekt-ID unter einem fremden Mandanten führen beide zu exakt derselben Antwort –
 * `notFound()`. Es gibt keine abweichende Meldung, keinen Sonderfall und keine Existenzaussage;
 * `buildObjectDetail` liefert in beiden Fällen `undefined`. Auch die Metadaten dürfen deshalb
 * keinen fremden Objektnamen tragen.
 */
import { notFound } from 'next/navigation';
import { ObjectDetailView } from '../../../../../../components/twin/ObjectDetailView';
import { buildObjectDetail, getObjectRouteParams } from '../../../../../../lib/twin/object-detail';

export function generateStaticParams() {
  return getObjectRouteParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenantId: string; objectId: string }>;
}) {
  const { tenantId, objectId } = await params;
  const model = buildObjectDetail(tenantId, objectId);
  return {
    title: model
      ? `${model.object.display_name} – Objekt-360 · ${model.tenant.display_name}`
      : 'Objekt nicht gefunden',
  };
}

export default async function ObjectDetailPage({
  params,
}: {
  params: Promise<{ tenantId: string; objectId: string }>;
}) {
  const { tenantId, objectId } = await params;
  const model = buildObjectDetail(tenantId, objectId);
  if (!model) {
    notFound();
  }

  return <ObjectDetailView model={model} />;
}
