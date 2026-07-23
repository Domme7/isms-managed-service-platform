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
 *     „Keine Versionshistorie für dieses Objekt" – seit WP-017 in BEIDEN Ausprägungen geprüft
 *     (Objekt ohne Ablösung vs. das belegte Ablösepaar).
 *  5. Datenlücken sichtbar (Partial data): nicht auflösbare Scope-Kennung.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  DEMO_SEED,
  NORDWERK_OBJECT_ID,
  NORDWERK_SERVICE_OBJECT_ID,
  TENANT_ID,
} from '@isms/demo-seed';
import { ObjectDetailView } from '../ObjectDetailView';
import {
  buildObjectDetail,
  type ObjectDetailModel,
  type ObjectEdge,
} from '../../../lib/twin/object-detail';
import { TRUST_LAYER_ANGABEN, countTrustAngaben } from '../../../lib/twin/trust-layer';

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

    expect(
      screen.getByRole('heading', { level: 1, name: 'Auftragsabwicklung' }),
    ).toBeInTheDocument();

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
    expect(screen.getByText('Vertraulichkeit: intern · Schutzbedarf: hoch')).toBeInTheDocument();
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

  it('gibt die fehlende Versionshistorie als abgeleitete Datenlücke aus (Objekt ohne Ablösung)', () => {
    render(<ObjectDetailView model={model} />);

    // Objektbezogen formuliert: der Datenbestand als Ganzes trägt seit WP-017 sehr wohl eine
    // Ablösung – nur dieses Objekt nicht.
    expect(
      screen.getByRole('heading', { name: 'Keine Versionshistorie für dieses Objekt' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keine Ablösungskante \(R24 · löst ab \(supersedes\)\)/),
    ).toBeInTheDocument();
  });

  it('zeigt für das Ablösepaar BEIDE Richtungen statt der Lücke (WP-017)', () => {
    // Zweite Ausprägung derselben Ableitung, aus dem Seed ermittelt statt hartkodiert.
    const ablösung = DEMO_SEED.relationships.find((r) => r.relationship_type === 'supersedes');
    if (!ablösung) throw new Error('Testfixture fehlt: supersedes-Kante');

    const nachfolger = detailOrThrow(TENANT_ID.NORDWERK, ablösung.source_id);
    const vorgaenger = detailOrThrow(TENANT_ID.NORDWERK, ablösung.target_id);

    const { unmount } = render(<ObjectDetailView model={nachfolger} />);
    expect(
      screen.queryByRole('heading', { name: 'Keine Versionshistorie für dieses Objekt' }),
    ).toBeNull();
    // Der Nachfolger verlinkt auf den abgelösten Stand – der bleibt sichtbar, nicht ausgeblendet.
    expect(
      screen.getAllByRole('link', { name: vorgaenger.object.display_name }).length,
    ).toBeGreaterThanOrEqual(1);
    unmount();

    render(<ObjectDetailView model={vorgaenger} />);
    expect(
      screen.queryByRole('heading', { name: 'Keine Versionshistorie für dieses Objekt' }),
    ).toBeNull();
    expect(
      screen.getAllByRole('link', { name: nachfolger.object.display_name }).length,
    ).toBeGreaterThanOrEqual(1);
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

    // Der Link zur Mandantenseite benennt sein Ziel (keine „Zurück"-Aussage, weil der Einstieg
    // auch aus /isms oder /services kommen kann) und hält den Mandantenkontext.
    expect(
      screen.getByRole('link', { name: /Alle Objekte von Nordwerk Manufacturing SE/ }),
    ).toHaveAttribute('href', `/twin/${TENANT_ID.NORDWERK}`);
  });

  it('zeigt je Kante Typ, Richtung, Herkunft der Aussage und Vertrauensgrad', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    render(<ObjectDetailView model={model} />);

    expect(screen.getAllByText('R07 · verarbeitet').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Richtung: eingehend \(gerichtet\)/).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText(/Herkunft der Aussage: assertiert/).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText(/Vertrauensgrad: mittel \(0,7\)/).length).toBeGreaterThanOrEqual(1);
  });

  it('schreibt einen fehlenden Vertrauensgrad aus, statt ihn still wegzulassen', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    // Die processes-Kante (R07) trägt im Seed keinen Vertrauensgrad.
    const ohne = model.connections.incoming.find((e) => e.relationship_type === 'processes');
    expect(ohne?.confidence_display).toBeUndefined();

    render(<ObjectDetailView model={model} />);
    expect(screen.getAllByText(/Vertrauensgrad: nicht erfasst/).length).toBeGreaterThanOrEqual(1);
  });
});

/**
 * Aussagerichtung (Review-Fix): eine eingehende Kante darf nicht als „Typ → Nachbar" gerendert
 * werden – gelesen wäre das die Umkehrung der Seed-Kante. Muster wie `RelationshipList`:
 * Quelle —Typ→ Ziel.
 */
describe('ObjectDetailView – Leserichtung der Kanten folgt der Seed-Kante', () => {
  /** Die Zeile (div.tw-rel-line), in der ein bestimmter Kantentyp gerendert wird. */
  function kantenzeilen(container: HTMLElement, primary: string): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>('div.tw-rel-line')).filter((line) =>
      Array.from(line.querySelectorAll('.tw-rel-type')).some((el) => el.textContent === primary),
    );
  }

  it('stellt bei einer EINGEHENDEN Kante den Nachbarn voran und dieses Objekt ans Ende', () => {
    // Seed: Threat --R09 threatens--> Information Asset. Auf der Asset-Seite ist das eingehend.
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    const { container } = render(<ObjectDetailView model={model} />);

    const zeilen = kantenzeilen(container, 'R09 · bedroht');
    expect(zeilen.length).toBeGreaterThanOrEqual(1);
    for (const zeile of zeilen) {
      const knoten = Array.from(zeile.querySelectorAll('.tw-rel-node')).map((el) => el.textContent);
      expect(knoten[0]).toBe('Ransomware-Angriff auf Produktionsnetz');
      expect(knoten[knoten.length - 1]).toBe('dieses Objekt');
    }
  });

  it('lässt eine AUSGEHENDE Kante unverändert als „Typ → Nachbar" stehen', () => {
    // Seed: Threat --R09 threatens--> …; auf der Threat-Seite ist dieselbe Kante ausgehend.
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.THREAT_RANSOMWARE);
    const { container } = render(<ObjectDetailView model={model} />);

    const zeilen = kantenzeilen(container, 'R09 · bedroht');
    expect(zeilen.length).toBeGreaterThanOrEqual(1);
    for (const zeile of zeilen) {
      const knoten = Array.from(zeile.querySelectorAll('.tw-rel-node')).map((el) => el.textContent);
      expect(knoten).not.toContain('dieses Objekt');
      expect(zeile.textContent?.startsWith('R09 · bedroht')).toBe(true);
    }
  });
});

/**
 * Fail-loud an der Mandantengrenze (Sicherheits-Review): ein nicht auflösbarer Nachbar darf
 * NICHT verlinkt werden – ein Link würde eine Existenz behaupten, die im Mandanten nicht belegt
 * ist. Der Zweig ist mit dem echten Seed unerreichbar (keine Dangling-Kanten) und wird deshalb
 * mit einer synthetischen, handgebauten Kante belegt – Muster `twin.test.tsx` (RelationshipList).
 */
describe('ObjectDetailView – nicht auflösbarer Nachbar wird nicht verlinkt', () => {
  it('rendert die rohe Kennung mit Hinweis statt eines Links', () => {
    const basis = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    const geisterkante: ObjectEdge = {
      relationship_id: 'test-dangling',
      relationship_type: 'processes',
      relationship_type_id: 'R07',
      relationship_type_label: 'verarbeitet',
      orientation: 'ausgehend',
      direction: 'gerichtet',
      neighbor_id: 'geist-ziel',
      neighbor_name: 'geist-ziel',
      neighbor_type: 'unbekannt',
      neighbor_resolved: false,
      assertion_kind: 'assertiert',
      valid_from: '2026-01-01T00:00:00.000Z',
      valid_to: null,
    };
    const model: ObjectDetailModel = {
      ...basis,
      importance: { ...basis.importance, edges: [] },
      connections: { outgoing: [geisterkante], incoming: [] },
      next_observations: [],
    };

    const { container } = render(<ObjectDetailView model={model} />);

    // Kein einziger Objekt-Link – insbesondere keiner auf ein nicht belegtes Objekt.
    expect(container.querySelectorAll('a[href*="/objekt/"]')).toHaveLength(0);
    expect(screen.getByText('geist-ziel')).toBeInTheDocument();
    expect(screen.getByText(/Nachbarobjekt im Mandanten nicht auflösbar/)).toBeInTheDocument();
  });
});

/**
 * Ehrlichkeit der Status-Sprache (UX-Review): „wirksam" ist ein Lebenszyklus-Stand, kein
 * Prüfergebnis. Die Rahmung ist wortgleich aus `IsmsContent` übernommen.
 */
describe('ObjectDetailView – Status-Angaben sind gerahmt', () => {
  it('rahmt die OBJEKT-Status als Lebenszyklus-Stände und ordnet den Kantenstatus getrennt ein', () => {
    render(<ObjectDetailView model={detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP)} />);

    const rahmung = screen.getByText(
      /Alle hier gezeigten Status-Angaben der Objekte sind\s+Lebenszyklus-Stände/,
    );
    expect(rahmung).toBeInTheDocument();
    expect(within(rahmung).getByText('keine Prüfergebnisse')).toBeInTheDocument();

    // Review-Fix: „Status der Beziehung: geprüft" (R15) ist KEIN Objekt-Lebenszyklus. Die
    // Rahmung darf ihn deshalb nicht mit „keine Prüfergebnisse" bestreiten.
    expect(rahmung.textContent).toMatch(
      /Der „Status der Beziehung" ist dagegen ein Feld der Beziehung selbst und kann je nach Beziehungstyp auch einen Prüfstatus tragen/,
    );
    expect(rahmung.textContent).toMatch(/R15/);
  });

  it('beschriftet Kanten-Metadaten neutral (Lebenszyklus-Stand, Status der Beziehung)', () => {
    const { container } = render(
      <ObjectDetailView model={detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP)} />,
    );

    expect(screen.getAllByText(/Lebenszyklus-Stand: /).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Status der Beziehung: geprüft/).length).toBeGreaterThanOrEqual(1);
    expect(container.textContent).not.toContain('Prüfstand der Beziehung');
  });
});

/**
 * Frage 2 gibt eine eigene Antwort (UX-Review): verdichtete Bezüge mit Verweis auf Frage 3,
 * statt denselben Block ein zweites Mal in identischer Detailtiefe.
 */
describe('ObjectDetailView – „Warum ist es wichtig?" ist verdichtet', () => {
  it('zeigt die Bezüge ohne Metazeile und verweist auf „Womit hängt es zusammen?"', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    render(<ObjectDetailView model={model} />);

    const abschnitt = screen.getByRole('region', { name: 'Warum ist es wichtig?' });
    expect(model.importance.edges.length).toBeGreaterThanOrEqual(1);
    // Bezüge sind da (Nachbarname als Link), Metazeile und Gültigkeitsdatum aber nicht.
    expect(within(abschnitt).getAllByRole('link').length).toBeGreaterThanOrEqual(1);
    expect(abschnitt.querySelectorAll('.tw-rel-meta')).toHaveLength(0);
    expect(abschnitt.textContent).not.toContain('Fachlich gültig ab');
    expect(
      within(abschnitt).getByText(/Alle Beziehungen mit Herkunft, Vertrauensgrad und Gültigkeit/),
    ).toBeInTheDocument();
    // Die Überschrift nennt auch „Voraussetzungen" (requires/R19 ist kein Risiko-/Zielbezug).
    expect(
      within(abschnitt).getByRole('heading', {
        name: 'Belegte Bezüge zu Risiken, Zielen und Voraussetzungen',
      }),
    ).toBeInTheDocument();
  });

  it('sagt bei fehlender Klassifikation einen klaren Satz statt „nicht erfasst, nicht erfasst"', () => {
    // Die Maßnahme trägt im Seed keine Klassifikation (Review-Fix).
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.MEASURE_PATCH);
    expect(model.importance.has_classification).toBe(false);
    render(<ObjectDetailView model={model} />);

    const abschnitt = screen.getByRole('region', { name: 'Warum ist es wichtig?' });
    expect(abschnitt.textContent).toContain(
      'Im Demo-Datenbestand ist für dieses Objekt keine Klassifikation erfasst',
    );
    expect(abschnitt.textContent).not.toContain('Schutzbedarf nicht erfasst');
  });
});

describe('ObjectDetailView – Zustände nach Dok. 06 §17', () => {
  it('erklärt leere Kantenlisten – ohne den Mandanten-Link zu wiederholen', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    render(<ObjectDetailView model={model} />);

    const leer = screen.getByText(/^Keine ausgehende Kante dieses Objekts im Demo-Seed/);
    expect(leer).toBeInTheDocument();
    expect(screen.getByText(/^Keine Kante dieses Typs im Demo-Seed/)).toBeInTheDocument();

    // Review-Fix: der Weg zur Mandantenseite steht als Kopfzeile der Seite und einmal unter
    // „Was als Nächstes?" – nicht zusätzlich in jedem Kanten-Empty-State.
    expect(within(leer).queryByRole('link')).toBeNull();
    expect(
      screen.getAllByRole('link', {
        name: 'allen modellierten Objekten und Beziehungen dieses Mandanten',
      }),
    ).toHaveLength(1);
  });

  it('nennt den fehlenden Nachweis als Beobachtung, nicht als Empfehlung', () => {
    // Maßnahme: laut Dok. 07 §9 R15 ein möglicher Nachweiszielt-Typ, im Seed ohne Nachweiskante.
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.MEASURE_PATCH);
    render(<ObjectDetailView model={model} />);

    expect(screen.getByText('Kein Nachweis verweist auf dieses Objekt.')).toBeInTheDocument();
    expect(
      screen.getByText(
        /keine eingehende Nachweiskante \(R15 · belegt \(evidences\)\) im Demo-Seed/,
      ),
    ).toBeInTheDocument();
  });

  it('zeigt „Was als Nächstes?" leer, wenn das Modell für den Objekttyp nichts belegt', () => {
    // Für die Organisation gibt es weder Maßnahme noch Servicebezug – und ein Nachweisbezug ist
    // für diesen Typ laut R15 nicht vorgesehen. Der Abschnitt ist damit real leer (Review-Fix:
    // vorher war dieser Empty-Zweig unerreichbar, weil „kein Nachweis" IMMER erschien).
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    render(<ObjectDetailView model={model} />);

    expect(screen.queryByText('Kein Nachweis verweist auf dieses Objekt.')).not.toBeInTheDocument();
    const leer = screen.getByText(/^Kein belegter Verweis im Demo-Seed/);
    expect(leer).toBeInTheDocument();
    expect(
      within(leer).getByRole('link', {
        name: 'allen modellierten Objekten und Beziehungen dieses Mandanten',
      }),
    ).toHaveAttribute('href', `/twin/${TENANT_ID.NORDWERK}`);
  });

  it('zeigt auf der Managed-Service-Seite die eingehenden Deckungsbezüge statt des Leersatzes', () => {
    // Review-Fix: die Serviceseite widersprach sich selbst – Abschnitt 3 listete mehrere
    // eingehende R22-Kanten, „Was als Nächstes?" behauptete „weder Maßnahme noch Servicebezug".
    const model = detailOrThrow(
      TENANT_ID.NORDWERK,
      NORDWERK_SERVICE_OBJECT_ID.SERVICE_RISK_CONTROL_MONITORING,
    );
    render(<ObjectDetailView model={model} />);

    const abschnitt = screen.getByRole('region', { name: 'Was als Nächstes?' });
    const deckung = within(abschnitt).getAllByText('Deckt im Serviceumfang ab:');
    expect(deckung).toHaveLength(
      model.connections.incoming.filter((e) => e.relationship_type === 'covered_by').length,
    );

    // Nachbarname als Link, Lebenszyklus-Stand des Nachbarn und der Beleg (R22) stehen dabei.
    expect(
      within(abschnitt).getByRole('link', { name: 'Backup & Recovery Control' }),
    ).toHaveAttribute('href', `/twin/${TENANT_ID.NORDWERK}/objekt/${O.CTRL_BACKUP}`);
    expect(
      within(abschnitt).getAllByText(/Beleg: R22 · abgedeckt durch \(covered_by\)/).length,
    ).toBeGreaterThanOrEqual(1);
    expect(within(abschnitt).getAllByText(/Lebenszyklus-Stand: /).length).toBeGreaterThanOrEqual(1);

    // Der Leersatz erscheint nicht mehr.
    expect(abschnitt.textContent).not.toContain('Kein belegter Verweis im Demo-Seed');
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

/* -----------------------------------------------------------------------------
 * Trust-Layer-Abgleich (WP-020 Slice 5 – AC 19)
 * --------------------------------------------------------------------------- */

describe('ObjectDetailView – Trust-Layer-Abgleich (Dok. 06 „Sonder-, Fehler- und Vertrauenszustände")', () => {
  it('ordnet die acht Trust-Layer-Angaben sichtbar zu und benennt die unbelegten als Lücke', () => {
    render(
      <ObjectDetailView model={detailOrThrow(TENANT_ID.NORDWERK, O.RISK_BETRIEBSUNTERBRECHUNG)} />,
    );

    const abschnitt = screen
      .getByRole('heading', { level: 3, name: 'Trust-Layer-Abgleich' })
      .closest('section') as HTMLElement;
    const liste = abschnitt.querySelector('#objekt-trust-abgleich') as HTMLElement;
    expect(liste).not.toBeNull();

    // Alle acht Angaben mit Deckungsgrad (als Text, nie nur Farbe) und Trägertext.
    expect(TRUST_LAYER_ANGABEN).toHaveLength(8);
    for (const angabe of TRUST_LAYER_ANGABEN) {
      expect(within(liste).getByText(angabe.angabe)).toBeInTheDocument();
      expect(within(liste).getByText(angabe.traeger)).toBeInTheDocument();
    }
    expect(within(liste).getAllByText(/im heutigen Datenbestand: kein Träger/)).toHaveLength(
      countTrustAngaben('kein Träger'),
    );
    expect(within(liste).getAllByText(/im heutigen Datenbestand: teilweise/)).toHaveLength(
      countTrustAngaben('teilweise'),
    );

    // Die Kopfzeile nennt Quelle (Abschnittstitel) und die GEZÄHLTEN Anzahlen – und sagt
    // ausdrücklich, dass nichts berechnet wird (kein verdichteter Vertrauenswert).
    const text = abschnitt.textContent ?? '';
    expect(text).toContain('Sonder-, Fehler- und Vertrauenszustände');
    expect(text).toContain(`${countTrustAngaben('belegt')} Angaben sind belegt`);
    expect(text).toMatch(/nichts\s+berechnet/);
    expect(text).toMatch(/nichts\s+verdichtet/);
  });

  it('verspricht nichts: der Abgleich ist eine Aussage über den heutigen Datenbestand', () => {
    const { container } = render(
      <ObjectDetailView model={detailOrThrow(TENANT_ID.NORDWERK, O.RISK_BETRIEBSUNTERBRECHUNG)} />,
    );
    const liste = container.querySelector('#objekt-trust-abgleich') as HTMLElement;
    expect(liste.textContent ?? '').not.toMatch(
      /kommt bald|in Kürze|demnächst|geplant für|wird künftig|Roadmap/i,
    );
  });
});
