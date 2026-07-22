/**
 * Render-Tests der Objekt-360-Detailseite (WP-014 Slice 1, Acceptance).
 *
 * Verifiziert gegen den echten `DEMO_SEED` (keine Mocks, nur belegte Daten):
 *  1. Alle fünf Abschnitte der universellen Seitenanatomie sind als h2 belegt (Dok. 06 §6).
 *  2. Jede Kante ist ein Link auf die Detailseite des Nachbarobjekts – korrekt adressiert.
 *  3. Navigationsvertrag (Dok. 07 §10/§21): vom Geschäftsprozess sind Information Asset,
 *     Risiko, Control, Evidence, Maßnahme und Managed Service ausschließlich über gerenderte
 *     Links erreichbar, ohne dass der Mandant wechselt.
 *  4. Empty-Texte („keine Kante … im Demo-Seed") und die abgeleitete Aussage
 *     „Keine Versionshistorie im Demo-Seed".
 *  5. Datenlücken sichtbar (Partial data): nicht auflösbare Scope-Kennung.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, NORDWERK_OBJECT_ID, TENANT_ID } from '@isms/demo-seed';
import { ObjectDetailView } from '../ObjectDetailView';
import { buildObjectDetail, type ObjectDetailModel } from '../../../lib/twin/object-detail';

const O = NORDWERK_OBJECT_ID;

function detailOrThrow(tenantId: string, objectId: string): ObjectDetailModel {
  const model = buildObjectDetail(tenantId, objectId);
  if (!model) throw new Error(`Testfixture fehlt: ${tenantId}/${objectId}`);
  return model;
}

const DIE_FUENF_FRAGEN = [
  'Was ist das?',
  'Warum ist es wichtig?',
  'Womit hängt es zusammen?',
  'Wie entwickelt es sich?',
  'Was als Nächstes?',
];

describe('ObjectDetailView – Seitenanatomie', () => {
  const model = detailOrThrow(TENANT_ID.NORDWERK, O.PROC_AUFTRAGSABWICKLUNG);

  it('rendert h1 = Objektname und die fünf Fragen als h2 in fester Reihenfolge', () => {
    render(<ObjectDetailView model={model} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Auftragsabwicklung' })).toBeInTheDocument();

    const h2 = screen.getAllByRole('heading', { level: 2 }).map((el) => el.textContent);
    expect(h2).toEqual(DIE_FUENF_FRAGEN);
  });

  it('zeigt die Kontextzeile mit Mandant, Objekttyp, Familie und Datenstand', () => {
    render(<ObjectDetailView model={model} />);
    const context = screen.getByLabelText('Kontext dieser Objektseite');

    expect(within(context).getByText('Nordwerk Manufacturing SE')).toBeInTheDocument();
    expect(within(context).getByText('Geschäftsprozess')).toBeInTheDocument();
    expect(within(context).getByText('F03 · Geschäft & Information')).toBeInTheDocument();
    // Datenstand ist die Systemerfassung – nicht die fachliche Gültigkeit (2026-01-01).
    expect(within(context).getByText('15.01.2026')).toBeInTheDocument();
  });

  it('zeigt Identität, Lebenszyklus, Klassifikation und aufgelösten Owner', () => {
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText(O.PROC_AUFTRAGSABWICKLUNG)).toBeInTheDocument();
    expect(screen.getAllByText('Freigegeben').length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText('Vertraulichkeit: intern · Schutzbedarf: hoch'),
    ).toBeInTheDocument();
    // Der Name erscheint zusätzlich als Endpunkt der owns-Kante (R03) – daher getAllByText.
    expect(
      screen.getAllByText('Prozessverantwortung Auftragsabwicklung').length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('benennt die nicht auflösbare Scope-Kennung als Datenlücke (Partial data)', () => {
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText('scope-nordwerk-isms-core')).toBeInTheDocument();
    expect(
      screen.getByText(/Zu dieser Scope-Kennung existiert im Demo-Seed kein eigenes Objekt/),
    ).toBeInTheDocument();
  });

  it('trennt fachliche Gültigkeit und Systemerfassung sichtbar voneinander', () => {
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText('fachlich gültig ab')).toBeInTheDocument();
    expect(screen.getByText('im System erfasst am')).toBeInTheDocument();
    expect(screen.getByText('offen – kein Enddatum erfasst')).toBeInTheDocument();
    expect(
      screen.getByText('nicht erfasst – dieser Stand wurde nicht ersetzt'),
    ).toBeInTheDocument();
  });

  it('gibt die fehlende Versionshistorie als abgeleitete Datenlücke aus', () => {
    render(<ObjectDetailView model={model} />);

    expect(
      screen.getByRole('heading', { name: 'Keine Versionshistorie im Demo-Seed' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keine Ablösungskante \(R24 · löst ab \(supersedes\)\)/),
    ).toBeInTheDocument();
  });
});

describe('ObjectDetailView – Kanten als Links auf das Nachbarobjekt', () => {
  it('verlinkt jede auflösbare Kante auf /twin/<tenant>/objekt/<id>', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.PROC_AUFTRAGSABWICKLUNG);
    const { container } = render(<ObjectDetailView model={model} />);

    const asset = screen.getAllByRole('link', { name: 'Kundenauftragsdaten' })[0];
    expect(asset).toHaveAttribute(
      'href',
      `/twin/${TENANT_ID.NORDWERK}/objekt/${O.ASSET_KUNDENAUFTRAGSDATEN}`,
    );

    // Jede gerenderte Objekt-Kante bleibt im Mandanten der Seite (kein Kontextverlust).
    const objectLinks = Array.from(container.querySelectorAll('a[href*="/objekt/"]'));
    expect(objectLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of objectLinks) {
      expect(link.getAttribute('href')).toMatch(
        new RegExp(`^/twin/${TENANT_ID.NORDWERK}/objekt/[^/]+$`),
      );
    }

    // Rücklink hält den Mandantenkontext.
    expect(screen.getByRole('link', { name: /Zurück zu Nordwerk Manufacturing SE/ })).toHaveAttribute(
      'href',
      `/twin/${TENANT_ID.NORDWERK}`,
    );
  });

  it('zeigt je Kante Typ, Richtung, Herkunft der Aussage und Vertrauensgrad', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    render(<ObjectDetailView model={model} />);

    expect(screen.getAllByText('R07 · verarbeitet').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Richtung: eingehend \(gerichtet\)/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Herkunft der Aussage: assertiert/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Vertrauensgrad: mittel \(0,7\)/).length).toBeGreaterThanOrEqual(1);
  });
});

describe('ObjectDetailView – Zustände nach Dok. 06 §17', () => {
  it('erklärt leere Kantenlisten statt sie wegzulassen', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    render(<ObjectDetailView model={model} />);

    expect(
      screen.getByText('Keine ausgehende Kante dieses Objekts im Demo-Seed.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/^Keine Kante dieses Typs im Demo-Seed/)).toBeInTheDocument();
  });

  it('nennt den fehlenden Nachweis als Beobachtung, nicht als Empfehlung', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText('Kein Nachweis verweist auf dieses Objekt.')).toBeInTheDocument();
    expect(
      screen.getByText(/keine eingehende Nachweiskante \(R15 · belegt \(evidences\)\) im Demo-Seed/),
    ).toBeInTheDocument();
  });

  it('zeigt Maßnahme, Managed Service und Nachweis mit Status und Beleg', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP);
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText('Im Umfang des Managed Service:')).toBeInTheDocument();
    // Das Control trägt im Seed zwei Nachweiskanten (Restore-Test-Protokoll und
    // Evidence-Pack-Deliverable) – beide werden als eigene Beobachtung gezeigt.
    expect(screen.getAllByText('Verknüpfter Nachweis:')).toHaveLength(2);
    expect(
      screen.getAllByText(/Beleg: R22 · abgedeckt durch \(covered_by\)/).length,
    ).toBeGreaterThanOrEqual(1);
  });
});

/**
 * Navigationsvertrag (Dok. 07 §10/§21): „Ein Nutzer kann von Prozess zu Asset, Risiko, Control,
 * Evidence, Maßnahme, Entscheidung und Service navigieren, ohne den Kontext zu verlieren."
 *
 * Der Test läuft den Graphen ausschließlich über GERENDERTE Links ab (Breitensuche): jede
 * besuchte Seite wird gerendert, ihre Objekt-Links werden ausgelesen und weiterverfolgt.
 * Damit ist belegt, dass die Kette real klickbar ist – nicht nur im Modell vorhanden.
 */
describe('ObjectDetailView – Navigationspfad über gerenderte Links', () => {
  it('erreicht vom Geschäftsprozess aus Asset, Risiko, Control, Evidence, Maßnahme und Service', () => {
    const prefix = `/twin/${TENANT_ID.NORDWERK}/objekt/`;

    const besucht = new Set<string>();
    const warteschlange: string[] = [O.PROC_AUFTRAGSABWICKLUNG];

    while (warteschlange.length > 0) {
      const objectId = warteschlange.shift() as string;
      if (besucht.has(objectId)) continue;
      besucht.add(objectId);

      const model = detailOrThrow(TENANT_ID.NORDWERK, objectId);
      const { container, unmount } = render(<ObjectDetailView model={model} />);
      const hrefs = Array.from(container.querySelectorAll('a[href]'))
        .map((a) => a.getAttribute('href') ?? '')
        .filter((href) => href.includes('/objekt/'));
      unmount();

      for (const href of hrefs) {
        // Kontextverlust ausgeschlossen: jeder Objekt-Link bleibt im selben Mandanten.
        expect(href.startsWith(prefix)).toBe(true);
        warteschlange.push(href.slice(prefix.length));
      }
    }

    const erreichteTypen = new Set(
      [...besucht].map((id) => detailOrThrow(TENANT_ID.NORDWERK, id).identity.object_type),
    );
    for (const typ of [
      'Geschäftsprozess',
      'Information Asset',
      'Risk',
      'Control',
      'Evidence',
      'Measure',
      'Managed Service',
    ]) {
      expect(erreichteTypen).toContain(typ);
    }

    // Kein besuchtes Objekt gehört zu einem fremden Mandanten.
    const fremd = DEMO_SEED.objects.filter(
      (o) => o.tenant_id !== TENANT_ID.NORDWERK && besucht.has(o.object_id),
    );
    expect(fremd).toEqual([]);
  });
});
