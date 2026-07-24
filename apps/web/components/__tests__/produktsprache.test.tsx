/**
 * Wächtertest: **keine Demo-/Simulations-Kennzeichnung im gerenderten Produkttext**
 * (WP-028 Slice 4, DR-0011).
 *
 * WARUM MECHANISCH: Die Begriffe „Simulation", „simulierte Anmeldung", „keine echte
 * Sicherheit", „synthetisch", „Demo-Datenbestand", „Demo-Mandant" und der permanente
 * Demo-Banner sind über acht Work Packages hinweg immer wieder neu entstanden — jedes Mal aus
 * derselben gut gemeinten Absicht (dem Nutzer sagen, dass es „nur" ein Aufbaustand ist). Der
 * Owner hat sie mit DR-0011 vollständig aus der Oberfläche genommen. Ohne Wächter kommen sie
 * mit dem nächsten Leerzustand zurück.
 *
 * DIE GRENZE (DR-0011 „Was ausdrücklich BLEIBT") — dieser Test schützt NICHT vor Ehrlichkeit:
 *  - Die **Datenehrlichkeit** bleibt vollständig: „erfasst" ≠ „geprüft", „Lebenszyklus-Stand,
 *    kein Prüfergebnis", „x von y" mit Nenner, benannte Datenlücken. Sie enthält keinen der
 *    verbotenen Begriffe und wird von den bestehenden Wächtern geprüft
 *    (`kontextleiste`, `seitenbausteine`, die Bewertungsvokabular-Blöcke je Ort).
 *  - Die **Mandantengrenze** bleibt vollständig: „nur der aktive Mandant", der angekündigte
 *    Kontextwechsel (`leerzustand-mandantengrenze.test.tsx`).
 * Verboten ist ausschließlich die META-Kennzeichnung des Produkts als Demo/Simulation.
 *
 * DREI DOKUMENTIERTE AUSNAHMEN (Muster „EINE dokumentierte Ausnahme" aus
 * `entscheidungen.test.tsx`: Ausnahme auslassen UND ihre Existenz beweisen — die Regel selbst
 * wird nicht abgeschwächt):
 *
 *  1. **Texte aus dem Datenbestand** (`packages/demo-seed`). Objekt- und Mandantennamen wie
 *     „Consulting Operator Demo" stammen wörtlich aus Dok. 07, Abschnitt „Synthetische
 *     Demodaten" (Regel Null), andere Seed-Texte („… (synthetisch)") sind ein eigener,
 *     bereits geschnittener Textpass (WP-033). Dieser Wächter prüft den TEXT DER OBERFLÄCHE,
 *     nicht den Inhalt des Datenbestands — er maskiert deshalb alle Zeichenketten, die
 *     nachweislich aus `DEMO_SEED` stammen. Die Maskierung ist MECHANISCH aus dem Seed
 *     abgeleitet (kein handgepflegter Freibrief) und schrumpft automatisch, sobald WP-033 die
 *     Seed-Texte nachzieht.
 *  2. **Ein Konzeptzitat**: „kurzlebige Demo- oder Testidentitäten" ist ein wörtlicher
 *     Identitätstyp aus Dok. 19 (Administration, `IDENTITAETSTYPEN`). Ihn umzuformulieren wäre
 *     eine stille Konzeptänderung (Regel Null). Seine Existenz wird unten bewiesen.
 *  3. **Worttreue Lifecycle-Ergebnisse** (Dok. 16, „Kanonische Phasen"): zwei „Zentrale
 *     Ergebnisse"-Zellen tragen legitim ein verbotenes Wort („synthetischer Account, Demo-Story,
 *     …" / „… Simulation …"). MECHANISCH aus `LIFECYCLE_PHASEN.ergebnisse` abgeleitet — nur die
 *     exakte Zell-Zeichenkette, nie ihre Wörter. Owner-Frage offen (O-WP006-09); Existenz und
 *     Enge werden unten bewiesen.
 *
 * REICHWEITE: die Inhaltskomponenten ALLER `live`-Orte (Meta-Assertion gegen `NAV_PLACES`),
 * die Zusatzseiten unter „Kunden", die Objekt-360-Seite, die globale Shell und die Anmeldung —
 * also alles, was ein Nutzer zu sehen bekommt.
 */
import { render, type RenderResult } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  DEMO_SEED,
  DEMO_TENANTS,
  NORDWERK_OBJECT_ID,
  TENANT_ID,
  type DemoTenant,
} from '@isms/demo-seed';
import { AdministrationContent } from '../administration/AdministrationContent';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { IsmsContent } from '../isms/IsmsContent';
import { KundenStartContent } from '../kunden/KundenStartContent';
import { StrukturAssistentContent } from '../kunden/StrukturAssistentContent';
import { ReportsContent } from '../reports/ReportsContent';
import { ServicesContent } from '../services/ServicesContent';
import { ServicekatalogContent } from '../services/ServicekatalogContent';
import { WissenContent } from '../wissen/WissenContent';
import { AppShell } from '../shell/AppShell';
import { MissionControlContent } from '../shell/MissionControlContent';
import { SessionProvider } from '../shell/SessionProvider';
import { EigenerMandantEinstieg } from '../twin/EigenerMandantEinstieg';
import { ObjectDetailView } from '../twin/ObjectDetailView';
import { TenantDetailView } from '../twin/TenantDetailView';
import { TenantOverview } from '../twin/TenantOverview';
import { TwinContextBar } from '../twin/TwinContextBar';
import { IDENTITAETSTYPEN } from '../../lib/administration/modell';
import { LIFECYCLE_PHASEN } from '../../lib/kunden/struktur';
import { NAV_PLACES, type PlaceId } from '../../lib/shell/places';
import { DEMO_ROLES, getRole, type DemoRole } from '../../lib/shell/roles';
import {
  SESSION_STORAGE_KEY,
  resolveSession,
  serializeSession,
  type ResolvedSession,
} from '../../lib/shell/session';
import { buildTenantDetail } from '../../lib/twin/data';
import { buildObjectDetail } from '../../lib/twin/object-detail';
import LoginPage from '../../app/login/page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

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

/* -----------------------------------------------------------------------------
 * Die verbotenen Muster (DR-0011, Abschnitt „Konkret entfernt")
 * --------------------------------------------------------------------------- */

const VERBOTENE_MUSTER: readonly RegExp[] = [
  /\bDemo\b/i,
  /Demo-(Datenbestand|Mandant|Seed|Welt|Sicht|Simulation|Hinweis|Slice)/i,
  /\bSimulation\b/i,
  /simuliert/i,
  /synthetisch/i,
  /keine echte Sicherheit/i,
];

function gefundeneMuster(text: string): string[] {
  return VERBOTENE_MUSTER.filter((m) => m.test(text)).map(String);
}

/* -----------------------------------------------------------------------------
 * Ausnahme 1: Zeichenketten aus dem Datenbestand (mechanisch abgeleitet, WP-033)
 * --------------------------------------------------------------------------- */

/** Alle Zeichenketten des Seeds – rekursiv, ohne Feldnamen zu kennen (kein stilles Veralten). */
function alleSeedTexte(wert: unknown, gesammelt: Set<string> = new Set()): Set<string> {
  if (typeof wert === 'string') {
    gesammelt.add(wert);
  } else if (Array.isArray(wert)) {
    for (const eintrag of wert) alleSeedTexte(eintrag, gesammelt);
  } else if (wert && typeof wert === 'object') {
    for (const eintrag of Object.values(wert)) alleSeedTexte(eintrag, gesammelt);
  }
  return gesammelt;
}

/**
 * Feldnamen, deren Werte KENNUNGEN oder Enum-Werte sind (IDs, Typen, Kinds, Stände) – niemals
 * freier Anzeigetext. Ein Demo-Wort in EINEM dieser Felder, das in der Oberfläche erschiene, wäre
 * ein UI-Fehler und darf deshalb NICHT durch die Seed-Ausnahme weißgewaschen werden.
 */
const KENNUNGSFELDER: ReadonlySet<string> = new Set([
  'object_id',
  'tenant_id',
  'scope_id',
  'source_id',
  'owner_id',
  'source_object_id',
  'target_id',
  'relationship_id',
  'decision_id',
  'service_id',
  'id',
  'object_type',
  'relationship_type',
  'source_kind',
  'owner_kind',
  'assertion_kind',
  'lifecycle_status',
]);

/**
 * Seed-Zeichenketten aus ANZEIGETEXT-Feldern – rekursiv, aber OHNE die Werte der KENNUNGSFELDER.
 *
 * ⚠️ ENG GEZOGEN IM NACHFIX (QA-Auflage, dieselbe Blindheits-Klasse wie beim snake_case-Fund):
 * Bis hierher maskierte `SEED_MASKEN` über `alleSeedTexte` JEDE Seed-Zeichenkette mit einem
 * Demo-Wort – auch die von IDs, Typen und Ständen. Damit hätte der Wächter ein Demo-Wort, das aus
 * einem KENNUNGSFELD in die Oberfläche leakt, weißgewaschen. Die Prosa-Grenze der Snake-Maske
 * (Leerzeichen + Mindestlänge) taugt hier NICHT: der legitime Quellverweis „demo-workshop-nordwerk"
 * ist ein bindestrich-Slug ohne Leerzeichen, der sehr wohl gerendert wird – eine reine
 * Prosa-Grenze würde ihn fälschlich freilegen. Deshalb der Feld-Ansatz: maskiert werden alle
 * Werte AUSSER denen der Kennungs-/Enum-Felder. Neue Anzeigefelder sind automatisch abgedeckt
 * (sie tragen Daten), ein neues Demo-Wort in einer ID/einem Enum wird dagegen wieder geprüft.
 */
function seedAnzeigeTexte(
  wert: unknown,
  key: string | null,
  gesammelt: Set<string> = new Set(),
): Set<string> {
  if (typeof wert === 'string') {
    if (key === null || !KENNUNGSFELDER.has(key)) gesammelt.add(wert);
  } else if (Array.isArray(wert)) {
    for (const eintrag of wert) seedAnzeigeTexte(eintrag, key, gesammelt);
  } else if (wert && typeof wert === 'object') {
    for (const [k, v] of Object.entries(wert)) seedAnzeigeTexte(v, k, gesammelt);
  }
  return gesammelt;
}

/**
 * Genau die ANZEIGETEXT-Seed-Texte, die einen verbotenen Begriff tragen – absteigend nach Länge,
 * damit längere Texte vor ihren Teilstücken maskiert werden. Die vollständige, mechanisch erzeugte
 * Ausnahmemenge; sie schrumpft mit dem Seed-Textpass (WP-033) von selbst.
 */
const SEED_MASKEN: readonly string[] = [...seedAnzeigeTexte(DEMO_SEED, null)]
  .filter((s) => gefundeneMuster(s).length > 0)
  .sort((a, b) => b.length - a.length);

/* -----------------------------------------------------------------------------
 * Ausnahme 2: ein wörtliches Konzeptzitat (Dok. 19, Identitätstypen)
 * --------------------------------------------------------------------------- */

const KONZEPTZITATE: readonly string[] = ['kurzlebige Demo- oder Testidentitäten'];

/* -----------------------------------------------------------------------------
 * Ausnahme 3: worttreue Lifecycle-Phasen-Ergebnisse (Dok. 16, „Kanonische Phasen")
 * --------------------------------------------------------------------------- */

/**
 * Zwei „Zentrale Ergebnisse"-Zellen des Lifecycle-Modells tragen legitim ein verbotenes Wort,
 * WORTTREU aus Dok. 16 (Abschnitt „Lifecycle-Modell", Unterabschnitt „Kanonische Phasen"):
 * Phase 0 „synthetischer Account, Demo-Story, …" und Phase 5 „Baseline, Confidence, Simulation,
 * …". Umschreiben wäre eine stille Konzeptänderung (Regel Null). Der Struktur-Assistent
 * (`/kunden/struktur`) zeigt sie worttreu; er steht seit O-WP006-09 unter diesem Wächter.
 *
 * MECHANISCH und ENG (dasselbe Muster wie SEED_MASKEN und die prozessvokabular-Ausnahme
 * `EXIT_ACCEPTANCE`): maskiert wird AUSSCHLIESSLICH die exakte, aus `LIFECYCLE_PHASEN.ergebnisse`
 * abgeleitete Zell-Zeichenkette – nie ihre blanken Wörter. Die Menge schrumpft/wächst automatisch
 * mit der Konstante, ist kein handgepflegter Freibrief und wird unten gegen die Quelle geprüft.
 * Die DR-0011-vs-Regel-Null-Owner-Frage bleibt offen (Interim = worttreu belassen, Muster
 * O-WP032-11: PDF-wörtlicher Produktinhalt, kein Disclaimer über unsere Daten).
 */
const LIFECYCLE_KONZEPT_MASKEN: readonly string[] = LIFECYCLE_PHASEN.map((p) => p.ergebnisse)
  .filter((s) => gefundeneMuster(s).length > 0)
  .sort((a, b) => b.length - a.length);

/** Entfernt die drei dokumentierten Ausnahmen aus dem gerenderten Text. */
function ohneAusnahmen(text: string): string {
  let rest = text;
  for (const maske of [...SEED_MASKEN, ...KONZEPTZITATE, ...LIFECYCLE_KONZEPT_MASKEN])
    rest = rest.split(maske).join(' ');
  return rest;
}

/* -----------------------------------------------------------------------------
 * Prüfroutine
 * --------------------------------------------------------------------------- */

interface Variante {
  readonly kontext: string;
  readonly render: () => RenderResult;
}

function pruefe(varianten: readonly Variante[]): void {
  for (const variante of varianten) {
    const ergebnis = variante.render();
    const roh = ergebnis.container.textContent ?? '';
    // Blindheitsschutz: ohne gerenderten Text wäre jede Negativassertion trivial erfüllt.
    expect(
      roh.length,
      `${variante.kontext}: leerer Render – der Wächter wäre blind`,
    ).toBeGreaterThan(80);
    expect(
      gefundeneMuster(ohneAusnahmen(roh)),
      `${variante.kontext}: Demo-/Simulations-Kennzeichnung im Produkttext`,
    ).toEqual([]);
    ergebnis.unmount();
  }
}

/** Rollen-/Mandantenmatrix: alle Rollen + neutral auf Nordwerk, dazu die leeren Mandanten. */
function matrix(
  ort: string,
  renderOrt: (r: DemoRole | null, t: DemoTenant) => RenderResult,
): Variante[] {
  const varianten: Variante[] = [];
  for (const demoRole of [...DEMO_ROLES, null]) {
    varianten.push({
      kontext: `${ort} · ${demoRole?.id ?? 'neutral'} · nordwerk`,
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

const RENDERER_JE_LIVE_ORT = {
  heute: matrix('/heute', (r, t) => render(<MissionControlContent role={r} tenant={t} />)),
  kunden: [
    {
      kontext: '/twin · Portfolio',
      render: () => render(<TenantOverview tenants={DEMO_TENANTS} />),
    },
    {
      kontext: '/twin · Kontextleiste (R08 · nordwerk)',
      render: () => {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          serializeSession({ roleId: 'R08', tenantId: TENANT_ID.NORDWERK }),
        );
        return render(
          <SessionProvider>
            <TwinContextBar />
          </SessionProvider>,
        );
      },
    },
    ...DEMO_TENANTS.map((t) => ({
      kontext: `/twin/${t.tenant_id} · Mandantenseite`,
      render: () => render(<TenantDetailView model={buildTenantDetail(t)} />),
    })),
    // Ein-Unternehmens-Einstieg (WP-028 Slice 4): voller UND leerer Mandant.
    {
      kontext: '/twin · Ein-Unternehmens-Einstieg (R01 · nordwerk)',
      render: () =>
        render(
          <EigenerMandantEinstieg
            role={role('R01')}
            tenant={tenant(TENANT_ID.NORDWERK)}
            objectCount={34}
            relationshipCount={51}
            scopeIds={['scope-nordwerk-isms-core']}
            recordedOn="2026-03-16"
            recordedOnDisplay="16.03.2026"
          />,
        ),
    },
    {
      kontext: '/twin · Ein-Unternehmens-Einstieg (R07 · finovia, leer)',
      render: () =>
        render(
          <EigenerMandantEinstieg
            role={role('R07')}
            tenant={tenant(TENANT_ID.FINOVIA)}
            objectCount={0}
            relationshipCount={0}
            scopeIds={[]}
            recordedOn={null}
            recordedOnDisplay={null}
          />,
        ),
    },
    ...matrix('/kunden', (r, t) => render(<KundenStartContent role={r} tenant={t} />)),
    // Struktur-Assistent (`/kunden/struktur`, WP-006 Slice 3): Unterseite des Ortes „Kunden",
    // trägt worttreue Lifecycle-Ergebnisse mit einem verbotenen Wort (enge Ausnahme oben).
    ...matrix('/kunden/struktur', (r, t) =>
      render(<StrukturAssistentContent role={r} tenant={t} />),
    ),
  ],
  isms: matrix('/isms', (r, t) => render(<IsmsContent role={r} tenant={t} />)),
  entscheidungen: matrix('/entscheidungen', (r, t) =>
    render(<EntscheidungenContent role={r} tenant={t} />),
  ),
  services: [
    ...matrix('/services', (r, t) => render(<ServicesContent role={r} tenant={t} />)),
    // Servicekatalog (`/services/katalog`, WP-006 Slice 2): Unterseite des Ortes „Services".
    ...matrix('/services/katalog', (r, t) => render(<ServicekatalogContent role={r} tenant={t} />)),
  ],
  reports: matrix('/reports', (r, t) => render(<ReportsContent role={r} tenant={t} />)),
  wissen: matrix('/wissen', (r, t) => render(<WissenContent role={r} tenant={t} />)),
  administration: matrix('/administration', (r, t) =>
    render(<AdministrationContent role={r} tenant={t} />),
  ),
} satisfies Partial<Record<PlaceId, readonly Variante[]>>;

describe('Produktsprache: keine Demo-/Simulations-Kennzeichnung im Produkttext (DR-0011)', () => {
  it('Meta: das Register deckt exakt die live-Orte aus NAV_PLACES ab (neuer echter Ort ⇒ hier eintragen)', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(RENDERER_JE_LIVE_ORT).sort()).toEqual(liveOrte);
  });

  for (const [ort, varianten] of Object.entries(RENDERER_JE_LIVE_ORT)) {
    it(`Ort „${ort}" rendert ohne Demo-Kennzeichnung (${varianten.length} Varianten)`, () => {
      expect(varianten.length, `${ort}: leerer Register-Eintrag`).toBeGreaterThan(0);
      pruefe(varianten);
    });
  }

  it('die Objekt-360-Seite rendert ohne Demo-Kennzeichnung', () => {
    const model = buildObjectDetail(
      TENANT_ID.NORDWERK,
      NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG,
    );
    if (!model) throw new Error('Testfixture fehlt: Objekt-360-Modell');
    pruefe([{ kontext: 'Objekt-360', render: () => render(<ObjectDetailView model={model} />) }]);
  });

  it('die globale Kopfleiste und die Anmeldung rendern ohne Demo-Kennzeichnung', () => {
    const session = resolveSession({
      roleId: 'R08',
      tenantId: TENANT_ID.NORDWERK,
    }) as ResolvedSession;
    pruefe([
      {
        kontext: 'AppShell (Kopfleiste, Navigation)',
        render: () =>
          render(
            <AppShell
              places={NAV_PLACES}
              activeId="heute"
              session={session}
              hydrated
              roles={DEMO_ROLES}
              tenants={DEMO_TENANTS}
              onSwitchRole={vi.fn()}
              onSwitchTenant={vi.fn()}
              onSignOut={vi.fn()}
            >
              <p>
                Ein Seiteninhalt mit genügend Text, damit der Blindheitsschutz greift und der
                Wächter wirklich etwas zu prüfen bekommt.
              </p>
            </AppShell>,
          ),
      },
      {
        kontext: '/login',
        render: () =>
          render(
            <SessionProvider>
              <LoginPage />
            </SessionProvider>,
          ),
      },
    ]);
  });

  /* ---------------------------------------------------------------------------
   * Negativbeweise – ohne sie wäre der Wächter blind
   * ------------------------------------------------------------------------- */

  it('Negativbeweis: jeder verbotene Begriff würde im gerenderten Text erkannt', () => {
    const { container, unmount } = render(
      <p>
        Demo-Simulation: simulierte Anmeldung, keine echte Sicherheit – ein synthetischer
        Demo-Datenbestand mit einem Demo-Mandanten aus dem Demo-Seed.
      </p>,
    );
    expect(gefundeneMuster(container.textContent ?? '')).toHaveLength(VERBOTENE_MUSTER.length);
    unmount();
  });

  it('Negativbeweis: der Wächter schlägt bei ehrlicher Produktsprache NICHT an', () => {
    // Genau die Substanz, die DR-0011 ausdrücklich behält – sie darf nie als Verstoß gelten.
    for (const legitim of [
      'Lebenszyklus-Stand aus dem Datenbestand – kein Prüfergebnis.',
      '3 von 17 Objekten tragen die Beziehung; die Datenlücke ist benannt.',
      'Angezeigt wird ausschließlich der aktive Mandant.',
      'Geprüfte Rechte und eine durchgesetzte Zugriffskontrolle sind hier noch nicht angebunden.',
    ]) {
      expect(gefundeneMuster(legitim), legitim).toEqual([]);
    }
  });

  /* ---------------------------------------------------------------------------
   * Zweiter Wächter derselben Familie: keine technischen Feldnamen im Produkttext
   * ------------------------------------------------------------------------- */

  /**
   * DR-0013 Nr. 2 („Kein internes Vokabular im UI") nennt ausdrücklich Feldnamen wie
   * `delivered_by`, `owner_ids`, `confidence`. WP-028 Slice 2 hat sie in Domänensprache
   * überführt, und WP-028 Slice 4 die letzten zwei Fundstellen (`covered_by`,
   * `contributes_to` im gerenderten Seitenbausteine-Hinweis, O-WP032-19). Bis hierher galt
   * die Regel mechanisch nur für `/wissen`; sie gilt für JEDEN Ort.
   *
   * AUSNAHME wie oben: Zeichenketten aus dem Datenbestand (Seed-Beschreibungen zitieren
   * Kantennamen) – mechanisch maskiert, Existenzbeweis unten.
   *
   * ⚠️ ENG GEZOGEN IM WP-028-FIXPASS (QA-Auflage, der Wächter war blind): Die Maske entstand
   * bis hierher aus ALLEN Seed-Zeichenketten mit snake_case – darunter die BLANKEN
   * Beziehungstyp-Werte (`part_of`, `covered_by`, `delivered_by` …), weil `relationship_type`
   * ein Seed-Feld ist. Damit hätte der Wächter ausgerechnet das wörtliche DR-0013-Beispiel
   * durchgelassen: ein UI-Text „Beziehung: delivered_by" wäre vor der Prüfung weggeschnitten
   * worden. Die Ausnahme gilt jetzt nur noch für PROSA – Seed-BESCHREIBUNGEN, die einen
   * Kantennamen im Satz zitieren. Kriterium mechanisch (kein handgepflegter Freibrief):
   * snake_case UND mindestens ein Leerzeichen UND länger als ein blanker Enum-Wert. Der blanke
   * Enum-Wert erfüllt keines der beiden Zusatzkriterien und wird damit wieder geprüft;
   * der Negativbeweis unten führt das ÜBER DIE PIPELINE, nicht nur an der Regex.
   */
  const SNAKE_CASE = /[a-z]{2,}_[a-z]{2,}/;

  /** Untergrenze der Prosa-Ausnahme; der längste blanke Kantenname liegt deutlich darunter. */
  const PROSA_MINDESTLAENGE = 25;

  const SEED_SNAKE_MASKEN: readonly string[] = [...alleSeedTexte(DEMO_SEED)]
    .filter((s) => SNAKE_CASE.test(s) && /\s/.test(s) && s.length > PROSA_MINDESTLAENGE)
    .sort((a, b) => b.length - a.length);

  function ohneSeedSnake(text: string): string {
    let rest = text;
    for (const maske of SEED_SNAKE_MASKEN) rest = rest.split(maske).join(' ');
    return rest;
  }

  for (const [ort, varianten] of Object.entries(RENDERER_JE_LIVE_ORT)) {
    it(`Ort „${ort}" rendert keinen technischen Feldnamen (snake_case)`, () => {
      for (const variante of varianten) {
        const ergebnis = variante.render();
        const rest = ohneSeedSnake(ergebnis.container.textContent ?? '');
        expect(rest.length, `${variante.kontext}: leerer Render`).toBeGreaterThan(80);
        const treffer = rest.match(new RegExp(SNAKE_CASE.source, 'g')) ?? [];
        expect(treffer, `${variante.kontext}: technischer Feldname im Produkttext`).toEqual([]);
        ergebnis.unmount();
      }
    });
  }

  /**
   * NEGATIVBEWEIS ÜBER DIE GESAMTE PIPELINE (WP-028-Fixpass, QA-Auflage).
   *
   * Der frühere Beweis prüfte NUR die Regex – und verdeckte damit genau das Loch, das die
   * Maskierung riss: `SNAKE_CASE.test(...)` schlägt selbstverständlich an, aber der Wächter
   * prüft nicht die Regex, sondern `ohneSeedSnake(text)`. Deshalb läuft der Beweis jetzt durch
   * dieselbe Maskierung wie der Produkttext.
   */
  it('Negativbeweis: ein Feldname im UI-Text überlebt die Maskierung und wird erkannt', () => {
    // Das wörtliche DR-0013-Beispiel: ein blanker Kantenname im Produkttext MUSS auffallen.
    expect(ohneSeedSnake('Beziehung: delivered_by')).toMatch(SNAKE_CASE);
    // Gegenprobe mit weiteren blanken Enum-Werten aus dem Seed – keiner ist maskiert.
    for (const kante of ['part_of', 'covered_by', 'contributes_to', 'lifecycle_status']) {
      expect(ohneSeedSnake(`Vertragsfeld im UI: ${kante}`), kante).toMatch(SNAKE_CASE);
    }
    // Produktsprache und Kennungen mit Bindestrich schlagen weiterhin NICHT an.
    expect(SNAKE_CASE.test('erbracht durch das Managed-Service-Team')).toBe(false);
    expect(SNAKE_CASE.test('scope-nordwerk-isms-core')).toBe(false);

    // Die Prosa-Ausnahme existiert wirklich, ist mechanisch aus dem Seed abgeleitet und
    // enthält KEINEN blanken Enum-Wert (sonst wäre sie wieder der alte Freibrief).
    expect(SEED_SNAKE_MASKEN.length).toBeGreaterThan(0);
    const seedTexte = alleSeedTexte(DEMO_SEED);
    for (const maske of SEED_SNAKE_MASKEN) {
      expect(seedTexte.has(maske)).toBe(true);
      expect(maske, `Maske ohne Prosa-Charakter: ${maske}`).toMatch(/\s/);
      expect(maske.length).toBeGreaterThan(PROSA_MINDESTLAENGE);
    }
    // Und der Seed trägt tatsächlich blanke Kantennamen – die Maske schneidet sie NICHT weg.
    const blankeKanten = [...seedTexte].filter((s) => SNAKE_CASE.test(s) && !/\s/.test(s));
    expect(
      blankeKanten.length,
      'Seed ohne blanke Kantennamen – Beweis wäre trivial',
    ).toBeGreaterThan(0);
    for (const kante of blankeKanten) expect(SEED_SNAKE_MASKEN).not.toContain(kante);
  });

  /* ---------------------------------------------------------------------------
   * Dritter Wächter derselben Familie: keine Familiencodes F01–F09 im Produkttext
   * ------------------------------------------------------------------------- */

  /**
   * DR-0013 Nr. 2 nennt „Muster-/Familiencodes (F01, R12, SO02, MS01)" NAMENTLICH unter „weg".
   *
   * WARUM APP-WEIT (WP-028-Fixpass, Code-/Product-Auflage): Die Regel galt mechanisch nur für
   * `/wissen`, `/reports` und `/administration` – ausgerechnet die Mandantenseite des digitalen
   * Zwillings, auf der die Codes am häufigsten standen, war ungeprüft. Dort trug jeder
   * Familienabschnitt ein Badge „F01", der `aria-label` denselben Code und JEDE Objektkarte die
   * Zeile „F01 · Tenant & Unternehmenskontext". Der Negativbeweis aus `wissen.test.tsx` ist
   * deshalb hier hochgezogen und gilt jetzt für alle live-Orte, die Objekt-360-Seite und die
   * globale Shell.
   *
   * KEINE AUSNAHME: Familiencodes stehen nirgends im Seed als Anzeigetext – die Kennung lebt
   * ausschließlich im Vertrag (`OBJECT_FAMILY_ID`) und in `lib/twin/data.ts` als technischer
   * Schlüssel. Ein Treffer ist also immer ein UI-Fehler, nie eine Datenlage.
   *
   * Muster bewusst weiter gefasst als `\bF0[1-9]\b`: auch „F01·" oder „3F012" wären Kennung im
   * Text, und die Wortgrenze würde die zweite Form durchlassen.
   */
  const FAMILIENCODE = /(^|[^A-Za-z])F0[1-9]([^A-Za-z]|$)/;

  for (const [ort, varianten] of Object.entries(RENDERER_JE_LIVE_ORT)) {
    it(`Ort „${ort}" rendert keinen Familiencode (F01–F09)`, () => {
      for (const variante of varianten) {
        const ergebnis = variante.render();
        const text = ergebnis.container.textContent ?? '';
        expect(text.length, `${variante.kontext}: leerer Render`).toBeGreaterThan(80);
        expect(text, `${variante.kontext}: Familiencode im Produkttext`).not.toMatch(FAMILIENCODE);
        // Auch nicht in Attributen: der `aria-label` der Familienabschnitte trug den Code, war
        // aber in `textContent` unsichtbar – genau so blieb er zwei Reviewrunden unentdeckt.
        for (const el of Array.from(ergebnis.container.querySelectorAll('[aria-label]'))) {
          expect(
            el.getAttribute('aria-label') ?? '',
            `${variante.kontext}: Familiencode in aria-label`,
          ).not.toMatch(FAMILIENCODE);
        }
        ergebnis.unmount();
      }
    });
  }

  it('die Objekt-360-Seite rendert keinen Familiencode', () => {
    const model = buildObjectDetail(
      TENANT_ID.NORDWERK,
      NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG,
    );
    if (!model) throw new Error('Testfixture fehlt: Objekt-360-Modell');
    const { container, unmount } = render(<ObjectDetailView model={model} />);
    expect(container.textContent ?? '').not.toMatch(FAMILIENCODE);
    unmount();
  });

  it('Negativbeweis: ein Familiencode im Text würde erkannt, der Familienname nicht', () => {
    // Genau die drei Formen, die im Produkt standen.
    for (const treffer of ['F01 · Prozesse', 'F01 Tenant & Unternehmenskontext', 'Familie: F09']) {
      expect(FAMILIENCODE.test(treffer), treffer).toBe(true);
    }
    // Und die zulässige Produktsprache schlägt NICHT an (sonst wäre der Wächter unbrauchbar).
    for (const legitim of [
      'Tenant & Unternehmenskontext',
      'Arbeit, Nachweis & Assurance',
      'Ziele, Entscheidungen & Services',
      'Objekte nach Familie',
    ]) {
      expect(FAMILIENCODE.test(legitim), legitim).toBe(false);
    }
  });

  it('Meta: die Ausnahmen sind belegt und eng – kein Freibrief', () => {
    // (1) Die Seed-Maskierung ist nicht leer (sonst wäre sie toter Code) und stammt
    // vollständig aus dem Datenbestand. Sie schrumpft mit WP-033 von selbst.
    expect(SEED_MASKEN.length).toBeGreaterThan(0);
    const seedTexte = alleSeedTexte(DEMO_SEED);
    for (const maske of SEED_MASKEN) expect(seedTexte.has(maske)).toBe(true);

    // (2) Das Konzeptzitat existiert wirklich als Identitätstyp (Dok. 19) – wird es dort
    // umbenannt oder entfernt, fällt die Ausnahme hier auf, statt still weiterzuleben.
    for (const zitat of KONZEPTZITATE) expect(IDENTITAETSTYPEN).toContain(zitat);

    // (3) Die Maskierung darf keine ganze Prüfung aushebeln: sie entfernt nur Teilstücke,
    // nie den gesamten Text (ein leerer Rest wäre ein blinder Wächter).
    const beispiel = 'Für Consulting Operator Demo ist im Datenbestand nichts erfasst.';
    expect(ohneAusnahmen(beispiel).trim().length).toBeGreaterThan(20);

    // (4) DE-BLINDUNG (Nachfix nach Gate-Runde 2): Ein Demo-Wort in einem KENNUNGSFELD wird
    // NICHT in die Ausnahmemenge aufgenommen (anders als der alte `alleSeedTexte`-Ansatz). Sonst
    // könnte ein aus einer ID/einem Enum geleaktes Demo-Wort still weißgewaschen werden.
    const probe = seedAnzeigeTexte(
      { object_id: 'demo-leak-id', display_name: 'Ein synthetisches Anzeige-Objekt' },
      null,
    );
    expect(probe.has('demo-leak-id'), 'ID-Feld darf nicht maskiert werden').toBe(false);
    expect(probe.has('Ein synthetisches Anzeige-Objekt'), 'Anzeigefeld muss maskiert werden').toBe(
      true,
    );
    // Der reale, gerenderte Quellverweis-Slug bleibt trotzdem gedeckt (er ist ein Anzeige-Feld).
    expect(SEED_MASKEN).toContain('demo-workshop-nordwerk');

    // (5) Die Lifecycle-Ausnahme (O-WP006-09) ist quellenbelegt und eng:
    //   (a) sie ist nicht leer (sonst wäre sie toter Code – der Assistent zeigt sie worttreu).
    expect(LIFECYCLE_KONZEPT_MASKEN.length).toBeGreaterThan(0);
    //   (b) jede Maske ist wörtlich ein `ergebnisse`-Wert aus `LIFECYCLE_PHASEN`. Wird die
    //       Konstante umformuliert, veraltet die Ausnahme nicht still, sondern fällt hier auf.
    const ergebnisWerte = LIFECYCLE_PHASEN.map((p) => p.ergebnisse);
    for (const maske of LIFECYCLE_KONZEPT_MASKEN) expect(ergebnisWerte).toContain(maske);
    //   (c) NEGATIVBEWEIS: die BLANKEN verbotenen Wörter überleben die Maskierung und bleiben
    //       verboten – maskiert wird nur die exakte, vollständige Zell-Zeichenkette, nie ihre
    //       Wörter. Erste Assertion: die Maskierung entfernt aus dieser Probe NICHTS.
    const blank = 'Ein synthetischer Demo-Datenbestand, reine Simulation';
    expect(gefundeneMuster(ohneAusnahmen(blank))).toEqual(gefundeneMuster(blank));
    expect(gefundeneMuster(blank)).toEqual([
      String(/\bDemo\b/i),
      String(/Demo-(Datenbestand|Mandant|Seed|Welt|Sicht|Simulation|Hinweis|Slice)/i),
      String(/\bSimulation\b/i),
      String(/synthetisch/i),
    ]);
    //   (d) die Maske schneidet nur das exakte Zell-Teilstück, nie den ganzen Satz (ein leerer
    //       Rest wäre ein blinder Wächter).
    const satz = `Zentrale Ergebnisse: ${LIFECYCLE_PHASEN[0].ergebnisse}. Exit Gate: qualifizierter Einstieg.`;
    const restSatz = ohneAusnahmen(satz);
    expect(restSatz).not.toContain(LIFECYCLE_PHASEN[0].ergebnisse);
    expect(restSatz).toContain('Zentrale Ergebnisse:');
    expect(restSatz.trim().length).toBeGreaterThan(20);
    expect(gefundeneMuster(restSatz)).toEqual([]);
  });
});
