/**
 * Wächtertest: **kein Prozessvokabular im gerenderten Produkttext** (WP-018 Slice 3a).
 *
 * Hintergrund — diese Fehlerklasse (Projekt-Interna wie Work-Package-Kennungen im sichtbaren
 * Produkttext) trat in WP-012, WP-013 und WP-016 auf und wurde bisher nur von aufmerksamen
 * Reviewern gefunden. Dok. 20C, Abschnitt „Teststrategie": „Tests werden aus Product Contracts,
 * Risiken und Akzeptanzkriterien abgeleitet" — dieser Test macht die Regel mechanisch.
 *
 * Geprüft wird der GERENDERTE TEXT (nicht der Quelltext — Kommentare dürfen selbstverständlich
 * über Work Packages sprechen) der Inhaltskomponenten ALLER `live`-Orte aus `NAV_PLACES` plus
 * einer Objekt-360-Seite, jeweils mit echtem `DEMO_SEED`:
 *  - mandanten-/rollengebundene Orte mindestens mit Nordwerk und dem Consulting Operator,
 *    zusätzlich mit den leeren Mandanten (Leerzustände sind die Versuchungsstelle — Lektion 12),
 *  - auf „Heute" über ALLE zwölf Rollen (die Rollenrahmung ändert den gerenderten Text je Welt).
 *
 * REICHWEITE (bewusst begrenzt, O-WP018-07): geprüft werden die Inhaltskomponenten der echten
 * Orte — nicht 404-/Fehlerzustände, nicht `aria-*`-Attributwerte, nicht die Platzhalterseiten
 * der nicht-liven Orte. Diese Grenze ist benannt statt Vollständigkeit zu behaupten.
 *
 * META-ASSERTION gegen stilles Veralten (Muster `leerzustand-mandantengrenze.test.tsx`):
 * die geprüfte Ortsliste wird gegen die `live: true`-Orte aus `NAV_PLACES` abgeglichen —
 * ein künftiger echter Ort macht diesen Test rot, bis er hier eingetragen ist.
 *
 * AUSNAHMEN: derzeit KEINE. Würde eine nötig, gilt das dokumentierte Muster aus
 * `entscheidungen.test.tsx` („EINE dokumentierte Ausnahme": Ausnahme auslassen UND ihre
 * Existenz prüfen) — die Regel selbst wird nicht abgeschwächt (Lektion 11).
 */
import { render, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, NORDWERK_OBJECT_ID, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { AdministrationContent } from '../administration/AdministrationContent';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { IsmsContent } from '../isms/IsmsContent';
import { KundenStartContent } from '../kunden/KundenStartContent';
import { ServicesContent } from '../services/ServicesContent';
import { ReportsContent } from '../reports/ReportsContent';
import { WissenContent } from '../wissen/WissenContent';
import { MissionControlContent } from '../shell/MissionControlContent';
import { SessionProvider } from '../shell/SessionProvider';
import { ObjectDetailView } from '../twin/ObjectDetailView';
import { TenantDetailView } from '../twin/TenantDetailView';
import { TenantOverview } from '../twin/TenantOverview';
import { TwinContextBar } from '../twin/TwinContextBar';
import { NAV_PLACES, type PlaceId } from '../../lib/shell/places';
import { DEMO_ROLES, getRole, type DemoRole } from '../../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../../lib/shell/session';
import { buildTenantDetail } from '../../lib/twin/data';
import { buildObjectDetail } from '../../lib/twin/object-detail';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

/**
 * Die verbotenen Muster (Wortlaut aus dem Work-Package-Zuschnitt): offene Fragen, Findings,
 * Work Packages, Change Proposals sowie die Prozesswörter „Slice" und „Acceptance".
 * `\b` greift auch in Komposita wie „Demo-Slice" — gewollt: der Bindestrich macht ein
 * Prozesswort nicht zu Produktsprache.
 */
const VERBOTENE_MUSTER: readonly RegExp[] = [
  /O-WP\d/,
  /FINDING-/,
  /WP-\d{3}/,
  /CCP-\d/,
  /\bSlice\b/,
  /\bAcceptance\b/,
];

/** Alle Muster, die im Text greifen (als String, für lesbare Fehlermeldungen). */
function gefundeneMuster(text: string): string[] {
  return VERBOTENE_MUSTER.filter((muster) => muster.test(text)).map((muster) => String(muster));
}

interface RenderVariante {
  /** Menschlich lesbarer Kontext für die Fehlermeldung (Ort, Rolle, Mandant). */
  readonly kontext: string;
  readonly render: () => RenderResult;
}

/** Prüft jede Variante: erst Blindheitsschutz (es wurde etwas gerendert), dann die Muster. */
function pruefeVarianten(varianten: readonly RenderVariante[]): void {
  for (const variante of varianten) {
    const ergebnis = variante.render();
    const text = ergebnis.container.textContent ?? '';
    // Blindheitsschutz: ohne gerenderten Text wäre jede Negativassertion trivial erfüllt.
    expect(
      text.length,
      `${variante.kontext}: leerer Render – der Wächter wäre blind`,
    ).toBeGreaterThan(80);
    expect(
      gefundeneMuster(text),
      `${variante.kontext}: Prozessvokabular im gerenderten Produkttext`,
    ).toEqual([]);
    ergebnis.unmount();
  }
}

/** Mandantenmatrix der rollen-/mandantengebundenen Orte: alle Rollen PLUS der neutrale
 * Zustand (WP-020 Slice 2, DR-0009 – auch seine Texte stehen unter dem Wächter) auf Nordwerk
 * (die Rahmung ändert den Text je Erlebniswelt), dazu Kunden- und Betreiberrolle sowie
 * neutral auf dem zweiten ausmodellierten Mandanten und den beiden leeren Mandanten
 * (Leerzustands-Text). */
function rollenMandantenMatrix(
  ort: string,
  renderOrt: (r: DemoRole | null, t: DemoTenant) => RenderResult,
): RenderVariante[] {
  const varianten: RenderVariante[] = [];
  for (const demoRole of [...DEMO_ROLES, null]) {
    varianten.push({
      kontext: `${ort} · ${demoRole?.id ?? 'neutral'} · ${TENANT_ID.NORDWERK}`,
      render: () => renderOrt(demoRole, tenant(TENANT_ID.NORDWERK)),
    });
  }
  for (const tenantId of [TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    for (const roleId of ['R01', 'R08', null]) {
      varianten.push({
        kontext: `${ort} · ${roleId ?? 'neutral'} · ${tenantId}`,
        render: () => renderOrt(roleId ? role(roleId) : null, tenant(tenantId)),
      });
    }
  }
  return varianten;
}

/**
 * REGISTER der geprüften live-Orte. Ein neuer `live: true`-Ort in `NAV_PLACES` macht die
 * Meta-Assertion unten rot, bis er hier mit seinen Inhaltskomponenten eingetragen ist.
 */
const RENDERER_JE_LIVE_ORT = {
  heute: rollenMandantenMatrix('/heute', (r, t) =>
    render(<MissionControlContent role={r} tenant={t} />),
  ),
  kunden: [
    {
      kontext: '/twin · Mandantenübersicht',
      render: () => render(<TenantOverview tenants={DEMO_TENANTS} />),
    },
    {
      // Die Kontextleiste der Übersicht ist eine eigene Client-Komponente (WP-020 Slice 1) und
      // wird hier mit echter Session-Simulation gerendert, damit auch ihr Text unter dem
      // Wächter steht.
      kontext: '/twin · Kontextleiste (R01 · nordwerk)',
      render: () => {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          serializeSession({ roleId: 'R01', tenantId: TENANT_ID.NORDWERK }),
        );
        return render(
          <SessionProvider>
            <TwinContextBar />
          </SessionProvider>,
        );
      },
    },
    ...DEMO_TENANTS.map((t) => ({
      kontext: `/twin/${t.tenant_id} · Detailseite`,
      render: () => render(<TenantDetailView model={buildTenantDetail(t)} />),
    })),
    // Kunden-Startseite „verwalten" (`/kunden`, WP-006 Slice 1): Kundenrolle, Betreiberrolle und
    // neutral über volle UND leere Mandanten – Leerzustände sind die Versuchungsstelle (Lektion 12).
    {
      kontext: '/kunden · R03 · nordwerk (voll)',
      render: () =>
        render(<KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />),
    },
    {
      kontext: '/kunden · neutral · nordwerk (voll)',
      render: () =>
        // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
        render(<KundenStartContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />),
    },
    {
      kontext: '/kunden · R08 · consulting-operator',
      render: () =>
        render(
          <KundenStartContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
        ),
    },
    {
      kontext: '/kunden · R03 · finovia (leer)',
      render: () =>
        render(<KundenStartContent role={role('R03')} tenant={tenant(TENANT_ID.FINOVIA)} />),
    },
    {
      kontext: '/kunden · neutral · medicore (leer)',
      render: () =>
        // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
        render(<KundenStartContent role={null} tenant={tenant(TENANT_ID.MEDICORE)} />),
    },
  ],
  // Rolle seit WP-020 Slice 1 (Kontextleiste zeigt die aktive Produktrolle): eine Kunden- und
  // eine Betreiberrolle sowie der NEUTRALE Zustand (Slice 2) je Mandant – die Rolle ändert auf
  // /isms keine Daten (06-D05), wohl aber den gerenderten Rollentext in der Leiste.
  isms: DEMO_TENANTS.flatMap((t) =>
    (['R03', 'R08', null] as const).map((roleId) => ({
      kontext: `/isms · ${roleId ?? 'neutral'} · ${t.tenant_id}`,
      render: () => render(<IsmsContent role={roleId ? role(roleId) : null} tenant={t} />),
    })),
  ),
  entscheidungen: rollenMandantenMatrix('/entscheidungen', (r, t) =>
    render(<EntscheidungenContent role={r} tenant={t} />),
  ),
  services: rollenMandantenMatrix('/services', (r, t) =>
    render(<ServicesContent role={r} tenant={t} />),
  ),
  // Reports (WP-032 Slice 2): trägt lange, wörtlich aus der Quelle übernommene Strukturtexte –
  // volle Rollen-/Mandantenmatrix inklusive der leeren Mandanten.
  reports: rollenMandantenMatrix('/reports', (r, t) =>
    render(<ReportsContent role={r} tenant={t} />),
  ),
  // Wissen (WP-032 Slice 3): der Glossar ist mandantenunabhängig, die Kontextleiste jedoch
  // nicht – deshalb steht auch dieser Ort mit der vollen Matrix unter dem Wächter.
  wissen: rollenMandantenMatrix('/wissen', (r, t) => render(<WissenContent role={r} tenant={t} />)),
  // Administration (WP-032 Slice 1): sicherheitsnaher Ort mit langen Struktur- und Lückentexten –
  // volle Rollen-/Mandantenmatrix inklusive der leeren Mandanten (Leerzustand ist die
  // Versuchungsstelle, Lektion 12).
  administration: rollenMandantenMatrix('/administration', (r, t) =>
    render(<AdministrationContent role={r} tenant={t} />),
  ),
} satisfies Partial<Record<PlaceId, readonly RenderVariante[]>>;

describe('Kein Prozessvokabular im gerenderten Produkttext (WP-018-Wächter)', () => {
  it('Meta: das Register deckt exakt die live-Orte aus NAV_PLACES ab (neuer echter Ort ⇒ hier eintragen)', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(RENDERER_JE_LIVE_ORT).sort()).toEqual(liveOrte);
  });

  for (const [ort, varianten] of Object.entries(RENDERER_JE_LIVE_ORT)) {
    it(`Ort „${ort}" rendert ohne Prozessvokabular (${varianten.length} Varianten)`, () => {
      // Blindheitsschutz auf Registerebene: ein leerer Eintrag bliebe sonst still grün.
      expect(
        varianten.length,
        `${ort}: leerer Register-Eintrag – der Wächter hätte nichts zu prüfen`,
      ).toBeGreaterThan(0);
      pruefeVarianten(varianten);
    });
  }

  it('die Objekt-360-Seite rendert ohne Prozessvokabular', () => {
    const model = buildObjectDetail(
      TENANT_ID.NORDWERK,
      NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG,
    );
    if (!model) throw new Error('Testfixture fehlt: Objekt-360-Modell Risk Betriebsunterbrechung');
    pruefeVarianten([
      {
        kontext: `/twin/${TENANT_ID.NORDWERK}/objekt/${NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG}`,
        render: () => render(<ObjectDetailView model={model} />),
      },
    ]);
  });

  it('Negativbeweis: jedes der sechs Muster würde im gerenderten Text erkannt', () => {
    // Fixture mit je einem Vertreter pro Muster – bewusst inklusive einer fiktiven Kennung
    // (O-WP018-99), damit der Beweis nicht von echten Projektartefakten abhängt.
    const { container, unmount } = render(
      <p>Hinweis O-WP018-99 aus FINDING-0042 zu WP-018, CCP-3, Slice 3, Acceptance 24.</p>,
    );
    expect(gefundeneMuster(container.textContent ?? '')).toHaveLength(VERBOTENE_MUSTER.length);
    unmount();

    // Komposita lösen aus (der historische Bestandsverstoß „Demo-Slice", AC 24) …
    expect(gefundeneMuster('kein Objektgraph (Demo-Slice)')).toEqual([String(/\bSlice\b/)]);
    // … unauffällige Produktsprache dagegen nicht (Wächter schlägt nicht blind an).
    expect(gefundeneMuster('Risiko Betriebsunterbrechung, Nachweis und Maßnahme')).toEqual([]);
  });
});
