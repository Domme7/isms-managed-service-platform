/**
 * Navigationsvertrag Ende-zu-Ende (WP-014 Slice 2, Acceptance 5/10).
 *
 * Dok. 07 §10/§21: „Ein Nutzer kann von Prozess zu Asset, Risiko, Control, Evidence, Maßnahme,
 * Entscheidung und Service navigieren, ohne den Kontext zu verlieren."
 *
 * Dieser Test läuft den Weg AUSSCHLIESSLICH über gerenderte Links ab:
 *  1. Einstieg über den Twin-Explorer (Mandantenseite) – der Objektname der Objektkarte ist der
 *     erste Link; der Geschäftsprozess wird aus dem Modell ermittelt, nicht hartkodiert.
 *  2. Danach wird von Objektseite zu Objektseite gesprungen: jede Seite wird gerendert, ihre
 *     Objekt-Links werden ausgelesen und als Sprungziele verwendet (echte Kanten-Linkziele,
 *     keine hartkodierten IDs).
 *  3. Zusätzlich: Einstieg aus der ISMS- und der Services-Ansicht (session-gebunden).
 *
 * DATENBEFUND (nicht erfunden, aus dem Seed abgeleitet): Der Demo-Seed enthält KEINE direkte
 * Kante zwischen Nachweis (Evidence) und Maßnahme (Measure). Die geforderte Reihenfolge ist
 * daher nur mit Zwischenschritten begehbar – der Test sucht je Etappe den kürzesten Weg über
 * echte Links und weist die Zwischenschritte aus, statt eine Kante zu behaupten, die es nicht
 * gibt.
 *
 * Mandantentreue: jeder verfolgte Link muss im Mandanten der Startseite bleiben; kein besuchtes
 * Objekt darf zu einem anderen Mandanten gehören (Dok. 07 §17/P09).
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { IsmsContent } from '../isms/IsmsContent';
import { ServicesContent } from '../services/ServicesContent';
import { ObjectDetailView } from '../twin/ObjectDetailView';
import { TenantDetailView } from '../twin/TenantDetailView';
import { buildTenantDetail, getTenant } from '../../lib/twin/data';
import { buildObjectDetail, type ObjectDetailModel } from '../../lib/twin/object-detail';
import { resolveSession, type ResolvedSession } from '../../lib/shell/session';

const TENANT = TENANT_ID.NORDWERK;
const PREFIX = `/twin/${TENANT}/objekt/`;

/** Die Etappen des Navigationsvertrags in der vom WP geforderten Reihenfolge. */
const ETAPPEN = [
  'Information Asset',
  'Risk',
  'Control',
  'Evidence',
  'Measure',
  'Managed Service',
] as const;

function detailOrThrow(objectId: string): ObjectDetailModel {
  const model = buildObjectDetail(TENANT, objectId);
  if (!model) throw new Error(`Testfixture fehlt: ${TENANT}/${objectId}`);
  return model;
}

function tenantOrThrow(tenantId: string) {
  const tenant = getTenant(tenantId);
  if (!tenant) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return tenant;
}

function sessionOrThrow(roleId: string, tenantId: string): ResolvedSession {
  const resolved = resolveSession({ roleId, tenantId });
  if (!resolved) throw new Error(`Testfixture nicht auflösbar: ${roleId}/${tenantId}`);
  return resolved;
}

/** Alle Objekt-Linkziele eines gerenderten Containers – inkl. Mandantentreue-Prüfung. */
function objektLinkZiele(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map((a) => {
    const href = a.getAttribute('href') ?? '';
    // Kontextverlust ausgeschlossen: jeder verfolgte Link bleibt im selben Mandanten.
    expect(href.startsWith(PREFIX)).toBe(true);
    return href.slice(PREFIX.length);
  });
}

/**
 * Linkziele EINER Objektseite (gerendert). Ergebnis wird gecacht, damit die Wegsuche nicht
 * dieselbe Seite mehrfach rendert – das Ergebnis ist deterministisch.
 */
const linkCache = new Map<string, readonly string[]>();
function zieleVon(objectId: string): readonly string[] {
  const gecacht = linkCache.get(objectId);
  if (gecacht) return gecacht;

  const { container, unmount } = render(<ObjectDetailView model={detailOrThrow(objectId)} />);
  const ziele = objektLinkZiele(container);
  unmount();

  linkCache.set(objectId, ziele);
  return ziele;
}

/**
 * Kürzester Weg von `startId` zum nächstgelegenen Objekt des gesuchten Typs – ausschließlich
 * über gerenderte Links (Breitensuche). Liefert die besuchten Objekt-IDs OHNE den Start.
 */
function wegZuTyp(startId: string, zielTyp: string): string[] {
  const vorgaenger = new Map<string, string | null>([[startId, null]]);
  const warteschlange: string[] = [startId];

  while (warteschlange.length > 0) {
    const aktuell = warteschlange.shift() as string;
    if (aktuell !== startId && detailOrThrow(aktuell).identity.object_type === zielTyp) {
      const weg: string[] = [];
      for (let id: string | null = aktuell; id && id !== startId; id = vorgaenger.get(id) ?? null) {
        weg.unshift(id);
      }
      return weg;
    }
    for (const ziel of zieleVon(aktuell)) {
      if (vorgaenger.has(ziel)) continue;
      vorgaenger.set(ziel, aktuell);
      warteschlange.push(ziel);
    }
  }

  throw new Error(`Über gerenderte Links nicht erreichbar: Objekttyp „${zielTyp}" ab ${startId}`);
}

describe('Navigationsvertrag – vom Geschäftsprozess bis zum Managed Service (nur über Links)', () => {
  it('erreicht Asset, Risiko, Control, Nachweis, Maßnahme und Service in dieser Reihenfolge', () => {
    // Schritt 1: Einstieg über den Twin-Explorer – der Objektname der Karte ist der Link.
    const { container, unmount } = render(
      <TenantDetailView model={buildTenantDetail(tenantOrThrow(TENANT))} />,
    );
    const einstiegsziele = objektLinkZiele(container);
    unmount();

    // Startobjekt aus dem Modell bestimmt (nicht hartkodiert): der Geschäftsprozess.
    const startId = einstiegsziele.find(
      (id) => detailOrThrow(id).identity.object_type === 'Geschäftsprozess',
    );
    expect(startId).toBeDefined();

    // Schritt 2: Etappe für Etappe weiter – jeweils über die Linkziele der Objektseite.
    const gesamtweg: string[] = [startId as string];
    let aktuell = startId as string;
    for (const typ of ETAPPEN) {
      const teilweg = wegZuTyp(aktuell, typ);
      expect(teilweg.length).toBeGreaterThanOrEqual(1);
      gesamtweg.push(...teilweg);
      aktuell = teilweg[teilweg.length - 1];
      expect(detailOrThrow(aktuell).identity.object_type).toBe(typ);
    }

    // Der Weg trifft die geforderten Typen in der geforderten Reihenfolge.
    const typenAufDemWeg = gesamtweg.map((id) => detailOrThrow(id).identity.object_type);
    expect(typenAufDemWeg[0]).toBe('Geschäftsprozess');
    let position = 0;
    for (const typ of ETAPPEN) {
      const gefunden = typenAufDemWeg.indexOf(typ, position);
      expect(gefunden).toBeGreaterThan(position - 1);
      position = gefunden;
    }

    // Mandant bleibt konstant: kein besuchtes Objekt gehört zu einem anderen Mandanten.
    const fremd = DEMO_SEED.objects.filter(
      (o) => o.tenant_id !== TENANT && gesamtweg.includes(o.object_id),
    );
    expect(fremd).toEqual([]);
  });

  it('lässt den letzten Schritt real anklicken (Link auf der vorletzten Seite vorhanden)', () => {
    // Gegenprobe zur Wegsuche: der Übergang existiert als gerenderter Link, nicht nur im Modell.
    const startId = buildTenantDetail(tenantOrThrow(TENANT))
      .familyGroups.flatMap((g) => g.objects)
      .find((o) => o.object_type === 'Geschäftsprozess')?.object_id;
    expect(startId).toBeDefined();

    const weg = wegZuTyp(startId as string, 'Managed Service');
    const vorletzte = weg.length > 1 ? weg[weg.length - 2] : (startId as string);
    const letzte = weg[weg.length - 1];

    render(<ObjectDetailView model={detailOrThrow(vorletzte)} />);
    const links = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => Boolean(href));
    expect(links).toContain(`${PREFIX}${letzte}`);
  });
});

describe('Einstieg in die Objekt-360-Seite aus den session-gebundenen Ansichten', () => {
  it('führt aus der ISMS-Ansicht in den Mandanten der aktiven Session', () => {
    const { role, tenant } = sessionOrThrow('R03', TENANT);

    const { container } = render(<IsmsContent role={role} tenant={tenant} />);
    const ziele = objektLinkZiele(container);

    expect(ziele.length).toBeGreaterThanOrEqual(1);
    // Jedes Ziel ist eine real existierende Objektseite DIESES Mandanten.
    for (const id of ziele) {
      expect(buildObjectDetail(TENANT, id)).toBeDefined();
    }
  });

  it('führt aus der Services-Ansicht in den Mandanten der aktiven Session', () => {
    const { role, tenant } = sessionOrThrow('R03', TENANT);
    // R03 sieht die Portfolio-Sicht nicht – geprüft wird hier nur die Mandanten-Sicht.
    const { container } = render(<ServicesContent role={role} tenant={tenant} />);
    const ziele = objektLinkZiele(container);

    expect(ziele.length).toBeGreaterThanOrEqual(1);
    for (const id of ziele) {
      expect(buildObjectDetail(TENANT, id)).toBeDefined();
    }
  });
});
