/**
 * Tests des ROUTENMODULS `/twin/[tenantId]/objekt/[objectId]` (WP-014, Acceptance 8).
 *
 * Bisher war die Tenant-Isolation nur im View-Helfer belegt; die eigentliche Leak-Oberfläche
 * ist aber die Route selbst – insbesondere `generateMetadata` (der Seitentitel verlässt die
 * Seite auch dann, wenn nichts gerendert wird) und `generateStaticParams` (welche Paare
 * überhaupt vorgeneriert werden).
 *
 * Geprüft wird (Dok. 07 §17/P09 – identische Antwort, keine Existenzaussage):
 *  (a) `generateMetadata` liefert für ein mandantenfremdes Paar EXAKT denselben Titel wie für
 *      eine unbekannte ID und enthält weder Objekt- noch Mandantennamen,
 *  (b) der Default-Export wirft in beiden Fällen den notFound-Fehler von Next,
 *  (c) `generateStaticParams` enthält kein Paar über die Mandantengrenze und deckt jedes
 *      (Mandant, Objekt)-Paar des Seeds genau einmal ab.
 *
 * Nur synthetische Seed-Daten, keine Mocks.
 */
import { describe, expect, it } from 'vitest';
import { notFound } from 'next/navigation';

import { DEMO_SEED, NORDWERK_OBJECT_ID, OPERATOR_OBJECT_ID, TENANT_ID } from '@isms/demo-seed';
import ObjectDetailPage, { generateMetadata, generateStaticParams } from '../[objectId]/page';

const O = NORDWERK_OBJECT_ID;

/** Paare, die beide zu „nicht gefunden" führen müssen – ohne unterscheidbare Antwort. */
const MANDANTENFREMD = { tenantId: TENANT_ID.CONSULTING_OPERATOR, objectId: O.CTRL_BACKUP };
const UNBEKANNT = { tenantId: TENANT_ID.CONSULTING_OPERATOR, objectId: 'gibt-es-nicht' };

/**
 * Der Fehler, den `notFound()` in dieser Next-Version wirft – als Referenz aus der Bibliothek
 * selbst gelesen statt als String hartkodiert (Next 15.5 nutzt die HTTP-Access-Fallback-Kennung
 * `NEXT_HTTP_ERROR_FALLBACK;404`, ältere Versionen `NEXT_NOT_FOUND`).
 */
function notFoundDigest(): string {
  try {
    notFound();
  } catch (error) {
    const digest = (error as { digest?: string }).digest;
    if (typeof digest === 'string') return digest;
    throw new Error('notFound() hat keinen digest gesetzt');
  }
  throw new Error('notFound() hat nicht geworfen');
}

async function digestOf(params: { tenantId: string; objectId: string }): Promise<string> {
  try {
    await ObjectDetailPage({ params: Promise.resolve(params) });
  } catch (error) {
    return (error as { digest?: string }).digest ?? '';
  }
  throw new Error(`Route hat für ${params.tenantId}/${params.objectId} NICHT 404 geliefert`);
}

describe('Route /twin/[tenantId]/objekt/[objectId] – Tenant-Isolation im Routing', () => {
  it('gibt für mandantenfremde und unbekannte IDs exakt denselben Titel aus', async () => {
    const fremd = await generateMetadata({ params: Promise.resolve(MANDANTENFREMD) });
    const unbekannt = await generateMetadata({ params: Promise.resolve(UNBEKANNT) });

    expect(fremd.title).toBe(unbekannt.title);

    // Keine Existenzaussage: weder der Objekt- noch der Mandantenname des fremden Objekts.
    const objekt = DEMO_SEED.objects.find((o) => o.object_id === MANDANTENFREMD.objectId);
    const mandant = DEMO_SEED.tenants.find((t) => t.tenant_id === TENANT_ID.NORDWERK);
    expect(objekt).toBeDefined();
    expect(mandant).toBeDefined();
    expect(fremd.title).not.toContain(objekt?.display_name);
    expect(fremd.title).not.toContain(mandant?.display_name);

    // Positiv-Kontrolle: im eigenen Mandanten trägt der Titel den Objektnamen.
    const eigen = await generateMetadata({
      params: Promise.resolve({ tenantId: TENANT_ID.NORDWERK, objectId: O.CTRL_BACKUP }),
    });
    expect(eigen.title).toContain(objekt?.display_name);
    expect(eigen.title).not.toBe(fremd.title);
  });

  it('wirft für mandantenfremde und unbekannte IDs denselben notFound-Fehler', async () => {
    const erwartet = notFoundDigest();

    expect(await digestOf(MANDANTENFREMD)).toBe(erwartet);
    expect(await digestOf(UNBEKANNT)).toBe(erwartet);
    expect(await digestOf({ tenantId: 'gibt-es-nicht', objectId: O.CTRL_BACKUP })).toBe(erwartet);
    // Auch in die Gegenrichtung (Operator-Objekt unter Nordwerk).
    expect(
      await digestOf({
        tenantId: TENANT_ID.NORDWERK,
        objectId: OPERATOR_OBJECT_ID.SERVICE_AUDIT_READINESS,
      }),
    ).toBe(erwartet);
  });

  it('rendert das Objekt des eigenen Mandanten (Positiv-Kontrolle)', async () => {
    const element = await ObjectDetailPage({
      params: Promise.resolve({ tenantId: TENANT_ID.NORDWERK, objectId: O.CTRL_BACKUP }),
    });
    expect(element).toBeDefined();
  });

  it('generiert ausschließlich mandantentreue Paare – und jedes Seed-Paar genau einmal', () => {
    const params = generateStaticParams();
    const objektMandant = new Map(DEMO_SEED.objects.map((o) => [o.object_id, o.tenant_id]));

    expect(params).toHaveLength(DEMO_SEED.objects.length);
    for (const { tenantId, objectId } of params) {
      // Kein Paar zeigt auf ein Objekt eines anderen Mandanten.
      expect(objektMandant.get(objectId)).toBe(tenantId);
    }

    const paare = new Set(params.map((p) => `${p.tenantId}::${p.objectId}`));
    expect(paare.size).toBe(DEMO_SEED.objects.length);
    for (const object of DEMO_SEED.objects) {
      expect(paare.has(`${object.tenant_id}::${object.object_id}`)).toBe(true);
    }
  });
});
