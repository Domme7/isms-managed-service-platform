/**
 * Präsentationaler Inhalt des Ortes „Administration" (WP-032 Slice 1, read-only).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen – Abschnittstitel, nicht Nummer):
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Administration" („Nutzer, Rechte,
 *    Integrationen, Konfiguration, Audit Logs, Betrieb — Nur bei entsprechender Berechtigung")
 *    und Abschnitt „Seiten- und Screenkatalog" (Administration & Integration Health).
 *  - Dok. 03, Abschnitt „Kanonisches Rollenmodell" (zwölf Produktrollen mit Sphäre und
 *    Kernverantwortung; Quelle im Code: `lib/shell/roles.ts`, PDF-wörtlich).
 *  - Dok. 19, Abschnitte „Identitäts-Lifecycle", „Autorisierungsmodell: RBAC, ABAC und
 *    Beziehungen", „Mandantenisolation und Kontextwechsel", „Canonical Audit Records";
 *    Dok. 17, Abschnitte „Priorisierter Connector-Katalog", „Connector Health Record";
 *    Dok. 18, Abschnitte rund um Observability und Betrieb. Alle als react-freie Konstanten in
 *    `lib/administration/modell.ts` mit Quellkommentar je Liste.
 *
 * ANTWORT-MODUS (DR-0013): Über der Falz steht, was die Seite HEUTE beantwortet – der erfasste
 * Konfigurationsstand des aktiven Mandanten und die Zuständigkeiten. Die sichtbare Leitfrage ist
 * deshalb NICHT die aspirative Frage aus dem Screenkatalog („Ist der Tenant sicher, korrekt
 * konfiguriert und verbunden?"), die im nächsten Satz zurückgenommen werden müsste; der
 * Konzeptanker bleibt in `lib/shell/places.ts` erhalten. Die Sicherheitsfrage wird nicht
 * verschwiegen, sondern am Seitenende ruhig und sachlich beantwortet: Sie ist heute nicht
 * beurteilbar, weil Konten, geprüfte Rechte, Ereignisse, angebundene Systeme und Betriebsdaten
 * nicht angebunden sind. Es entsteht dadurch WEDER eine Sicherheitszusage NOCH ein Fehlalarm
 * (offene Frage O-WP032-03, im Code begründet).
 *
 * SICHERHEITSRAHMEN (`.claude/rules/security.md`, Dok. 19):
 *  - READ-ONLY: Diese Seite enthält KEIN Bedienelement mit Schreibsemantik – kein Formular,
 *    kein Eingabefeld, keinen Button. Nutzer anlegen, Rechte ändern, Systeme schalten sind
 *    Schreibaktionen und gehören zur echten Anmeldung, nicht hierher.
 *  - KEINE ECHTEN RECHTE: Das Rollenmodell ist Perspektive und Verantwortungsbeschreibung, keine
 *    Autorisierung (`roles.ts`-Grundsatz). Es wird bewusst KEINE Rechtematrix gerendert, die
 *    eine Durchsetzung nahelegen würde.
 *  - MANDANTENGRENZE: mandantenbezogene Aussagen entstehen ausschließlich aus Objekten mit der
 *    `tenant_id` des aktiven Mandanten; über andere Mandanten sagt die Seite nichts – auch nicht
 *    im Leerzustand (FINDING-0009-Klasse). Das Rollen- und Strukturmodell ist mandantenneutral
 *    und wird nie als „Nutzer dieses Mandanten" ausgegeben.
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Block) > h4 (Unterblock).
 */
import type { DemoTenant } from '@isms/demo-seed';
import { buildAdministrationModel } from '../../lib/administration/data';
import {
  AUDIT_AUSLOESER,
  AUDIT_INTEGRITAET,
  AUDIT_MINDESTFELDER,
  AUTORISIERUNGS_EBENEN,
  BETRIEBS_FAEHIGKEITEN,
  IDENTITAETSTYPEN,
  IDENTITAETS_STATIONEN,
  ISOLATIONS_SCHICHTEN,
  METADATEN_FLAECHEN,
  SYSTEM_FAMILIEN,
  SYSTEM_FAMILIEN_HINWEIS,
  SYSTEM_ZUSTAND_MERKMALE,
} from '../../lib/administration/modell';
import { DEMO_ROLES, type DemoRole, type RoleSphere } from '../../lib/shell/roles';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

/**
 * `role` ist reine Anzeige (Kontextleiste) und ändert weder Daten noch Sichtbarkeit – der Ort
 * ist heute für jede gewählte Perspektive erreichbar, was die Seite sichtbar benennt.
 * `null` = neutraler Zustand (DR-0009): dieselbe Seite, derselbe Inhalt.
 */
export function AdministrationContent({
  role,
  tenant,
}: {
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const model = buildAdministrationModel(tenant);

  return (
    <>
      <p className="tw-eyebrow">Administration · Konfiguration und Zuständigkeiten</p>
      <h1>Administration</h1>

      {/* Sichtbare Leitfrage = die Frage, die diese Seite heute beantwortet (DR-0013 Nr. 1). */}
      <p className="tw-question">
        Wie ist {tenant.display_name} eingerichtet – welche Scopes sind erfasst und wer ist wofür
        zuständig?
      </p>

      {/* ANTWORT ZUERST: der belegte Stand in einem Satz, auch (und gerade) im Leerzustand. */}
      <p className="tw-lead">
        {model.isEmpty ? (
          <>
            Für {tenant.display_name} ist bisher nichts erfasst: keine Scopes und kein Datenstand.
            Die Zuständigkeiten unten gelten unabhängig davon – sie beschreiben das Rollenmodell des
            Produkts, nicht Konten dieses Mandanten.
          </>
        ) : (
          <>
            Für {tenant.display_name} {model.scopeIds.length === 1 ? 'ist' : 'sind'}{' '}
            {anzahl(model.scopeIds.length, 'Scope', 'Scopes')} erfasst
            {model.context.recordedOn && model.context.recordedOnDisplay ? (
              <>
                , zuletzt erfasster Stand:{' '}
                <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
              </>
            ) : null}
            . Wer wofür zuständig ist, beschreibt das Rollenmodell mit zwölf Produktrollen in vier
            Sphären – Verantwortung, keine geprüften Rechte.
          </>
        )}
      </p>

      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Erfasste Scope-Kennungen dieses Mandanten"
        scopeValue={
          model.scopeIds.length > 0 ? model.scopeIds.join(' · ') : 'keine Scope-Zuordnung erfasst'
        }
        datenstandLabel="Datenstand der Konfiguration (zuletzt im System erfasst)"
        datenstandValue={
          model.context.recordedOn && model.context.recordedOnDisplay ? (
            <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
          ) : (
            'keine Erfassung hinterlegt'
          )
        }
      />

      <KonfigurationsstandSection model={model} tenant={tenant} />
      <ZustaendigkeitenSection />
      <MandantentrennungSection tenant={tenant} />
      <SicherheitsurteilSection tenant={tenant} />

      {/* Seitenbausteine-Konvention (Dok. 06, Abschnitt „Verbindliche Seitenbausteine"). */}
      <SeitenbausteineHinweis ort="administration" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * 1. Konfigurationsstand des aktiven Mandanten (der belegte Teil der Seite)
 * --------------------------------------------------------------------------- */

function KonfigurationsstandSection({
  model,
  tenant,
}: {
  model: ReturnType<typeof buildAdministrationModel>;
  tenant: DemoTenant;
}) {
  return (
    <section aria-labelledby="adm-konfiguration">
      <h2 id="adm-konfiguration">Konfigurationsstand von {tenant.display_name}</h2>
      <p className="sv-edge-note">
        Was für diesen Mandanten erfasst ist. Angezeigt wird ausschließlich der aktive Mandant.
      </p>

      {model.isEmpty ? (
        <div className="tw-empty" role="note">
          <h3 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Noch keine Konfiguration erfasst
          </h3>
          <p style={{ marginTop: 0 }}>
            Für <strong>{tenant.display_name}</strong> sind keine Scopes zugeordnet und kein
            Datenstand hinterlegt. Der Ort bleibt erreichbar und zeigt weiterhin ausschließlich, was
            für diesen Mandanten erfasst ist.
          </p>
          <p className="tw-muted" style={{ marginBottom: 0 }}>
            Scopes und Konfiguration entstehen beim Aufbau des Mandanten. Bis dahin wird hier nichts
            angenommen und nichts hochgerechnet.
          </p>
        </div>
      ) : (
        <>
          <h3>Erfasste Scopes</h3>
          <p className="sv-edge-note">
            Scopes ordnen, was zum Informationssicherheits-Management gehört. Im Datenmodell sind
            Scopes keine eigenständigen Objekte – angezeigt werden die erfassten Kennungen selbst,
            ohne erfundenen Steckbrief.
          </p>
          <ul className="sv-items">
            {model.scopeIds.map((scopeId) => (
              <li key={scopeId}>
                <span className="sv-item-name sv-tech">{scopeId}</span>
              </li>
            ))}
          </ul>

          <h3>Umfang und Datenstand</h3>
          <ul className="sv-items">
            <li>
              <span className="sv-item-name">
                {anzahl(model.objectCount, 'Objekt', 'Objekte')} und{' '}
                {anzahl(model.relationshipCount, 'Beziehung', 'Beziehungen')} dieses Mandanten
              </span>
              <span className="sv-item-note">
                Gezählt wird ausschließlich der aktive Mandant. Die Zahl beschreibt den erfassten
                Bestand, nicht seine Vollständigkeit oder Qualität.
              </span>
            </li>
            <li>
              <span className="sv-item-name">
                Zuletzt erfasst:{' '}
                {model.context.recordedOn && model.context.recordedOnDisplay ? (
                  <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
                ) : (
                  'keine Erfassung hinterlegt'
                )}
              </span>
              <span className="sv-item-note">
                Jüngster Zeitpunkt, zu dem etwas für diesen Mandanten im System erfasst wurde –
                nicht der Zeitpunkt, zu dem etwas fachlich gültig wurde.
              </span>
            </li>
          </ul>
        </>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 2. Zuständigkeiten: das Rollenmodell (mandantenneutral, Modell statt Konten)
 * --------------------------------------------------------------------------- */

/**
 * Reihenfolge der Sphären wie in der Quelltabelle (Kunde → Unabhängig → Betreiber → Beide).
 *
 * WICHTIG (Regel Null): Die Quelle führt „Sphäre" ausschließlich als SPALTENWERT und definiert
 * die vier Werte nirgends aus. Die Überschrift zeigt deshalb den WÖRTLICHEN Wert; die
 * `erlaeuterung` ist eine erkennbare Lesehilfe des Produkts, keine Quellaussage – sie steht
 * bewusst getrennt darunter und ist als Vorschlag zur Prüfung gemeldet (Konzepttreue-Gate).
 */
const SPHAEREN: readonly { sphere: RoleSphere; erlaeuterung: string }[] = [
  {
    sphere: 'Kunde',
    erlaeuterung: 'Rollen im Unternehmen, dessen Informationssicherheit gesteuert wird.',
  },
  {
    sphere: 'Unabhängig',
    erlaeuterung: 'Rollen, die bewerten müssen, ohne Teil der Steuerung zu sein.',
  },
  {
    sphere: 'Betreiber',
    erlaeuterung: 'Rollen der Organisation, die Beratung und Services erbringt.',
  },
  {
    sphere: 'Beide',
    erlaeuterung: 'Rollen, die es auf Kunden- wie auf Betreiberseite gibt.',
  },
] as const;

/** Die für diesen Ort vorgesehene Rolle (Dok. 03: Nutzer, Rollen, Konfiguration, Integrationen
 *  und Betriebsfähigkeit). Aus dem Rollenmodell gelesen, nicht hartkodiert. */
const ADMIN_ROLLE: DemoRole | undefined = DEMO_ROLES.find(
  (r) => r.name === 'Tenant / Platform Administrator',
);

function ZustaendigkeitenSection() {
  return (
    <section aria-labelledby="adm-rollen">
      <h2 id="adm-rollen">Zuständigkeiten: das Rollenmodell</h2>
      <p className="sv-edge-note">
        Zwölf Produktrollen beschreiben, wer im Produkt wofür verantwortlich ist. Sie sind eine
        Perspektive auf dieselben Daten – <strong>kein Verzeichnis von Personen</strong> und keine
        geprüften Rechte. Konten sind in diesem Bestand nicht erfasst, deshalb steht hier das Modell
        und keine Nutzerliste.
      </p>
      <p className="sv-edge-note">
        Die Sphäre sagt, auf welcher Seite eine Rolle steht: beim Kunden, beim Betreiber der
        Plattform, unabhängig prüfend – oder in beiden.
      </p>

      {SPHAEREN.map((gruppe) => {
        const rollen = DEMO_ROLES.filter((r) => r.sphere === gruppe.sphere);
        return (
          <div key={gruppe.sphere}>
            <h3>Sphäre: {gruppe.sphere}</h3>
            <p className="sv-edge-note">{gruppe.erlaeuterung}</p>
            <ul className="sv-items">
              {rollen.map((rolle) => (
                <li key={rolle.name}>
                  <span className="sv-item-name">{rolle.name}</span>
                  <span className="sv-item-note">{rolle.responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {ADMIN_ROLLE ? (
        <p className="sv-edge-note">
          <strong>Für diesen Ort vorgesehen:</strong> {ADMIN_ROLLE.name} –{' '}
          {ADMIN_ROLLE.responsibility}. Sichtbar ist der Ort heute unabhängig von der gewählten
          Perspektive, weil Rechte in dieser Ausbaustufe nicht geprüft werden. Das ist eine Aussage
          über den heutigen Stand, keine Aussage darüber, wer den Ort später sehen darf.
        </p>
      ) : null}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 3. Mandantentrennung: gelebte Praxis und vorgesehenes Modell
 * --------------------------------------------------------------------------- */

function MandantentrennungSection({ tenant }: { tenant: DemoTenant }) {
  return (
    <section aria-labelledby="adm-trennung">
      <h2 id="adm-trennung">Mandantentrennung</h2>

      <h3>Was heute gilt</h3>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Nur der aktive Mandant</span>
          <span className="sv-item-note">
            Jede mandantenbezogene Angabe dieser Seite stammt aus {tenant.display_name}. Was nicht
            zu diesem Mandanten gehört, erscheint hier nicht – weder als Name noch als Zahl.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Der Wechsel wird angekündigt</span>
          <span className="sv-item-note">
            Ein Wechsel des aktiven Mandanten verlangt eine Bestätigung, wird sichtbar
            zurückgemeldet und lässt danach keinen Anzeigezustand des vorherigen Mandanten stehen.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Auch Leerstellen verraten nichts</span>
          <span className="sv-item-note">
            Ein leerer Bereich erklärt sich aus dem aktiven Mandanten heraus und verweist nie
            darauf, dass es woanders Daten gäbe. Diese Regel gehört zu den automatisierten Prüfungen
            der Anwendung.
          </span>
        </li>
      </ul>

      <h3>Was das Modell zusätzlich vorsieht</h3>
      <p className="sv-edge-note">
        Die Trennung ist im Zielbild mehrschichtig angelegt – sie soll nicht an einer einzelnen
        Stelle hängen.
      </p>
      <details className="sv-details">
        <summary>Die zehn vorgesehenen Schichten der Trennung</summary>
        <ul className="sv-items">
          {ISOLATIONS_SCHICHTEN.map((schicht) => (
            <li key={schicht}>
              <span className="sv-item-name">{schicht}</span>
            </li>
          ))}
        </ul>
      </details>
      <details className="sv-details">
        <summary>Stellen, an denen eine Trennung unbemerkt undicht wird</summary>
        <p className="sv-desc">
          Nicht nur Datensätze verraten etwas. Geprüft werden muss auch, was nebenbei sichtbar wird:
        </p>
        <ul className="sv-items">
          {METADATEN_FLAECHEN.map((flaeche) => (
            <li key={flaeche}>
              <span className="sv-item-name">{flaeche}</span>
            </li>
          ))}
        </ul>
      </details>

      <p className="sv-edge-note">
        Eine serverseitige Prüfung dieser Trennung setzt eine Anmeldung mit echten Konten voraus und
        ist hier noch nicht angebunden.
      </p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * 4. Die Sicherheitsfrage – ruhig und sachlich beantwortet (O-WP032-03)
 * --------------------------------------------------------------------------- */

/**
 * Der heikelste Abschnitt der Seite. Er löst die Spannung der Screenkatalog-Leitfrage („Ist der
 * Tenant sicher, korrekt konfiguriert und verbunden?") auf, indem er die drei Teilfragen
 * einzeln und ehrlich beantwortet: konfiguriert = belegt (oben), verbunden = nichts angebunden,
 * sicher = nicht beurteilbar. Formuliert als SACH-LÜCKE („ist hier noch nicht angebunden"),
 * nicht als Warnung und nicht als Entschuldigung – weder Zusage noch Fehlalarm (DR-0013,
 * DR-0011, `.claude/rules/security.md`).
 */
function SicherheitsurteilSection({ tenant }: { tenant: DemoTenant }) {
  return (
    <section aria-labelledby="adm-sicherheit">
      <h2 id="adm-sicherheit">Was ein Sicherheitsurteil zusätzlich braucht</h2>
      <p className="sv-edge-note">
        Diese Seite sagt, wie {tenant.display_name} eingerichtet ist und wer wofür zuständig ist.
        Ein Urteil über die Sicherheit des Mandanten trifft sie nicht – dafür fehlen die Grundlagen.
        Was das Produkt dafür vorsieht, steht unten als Struktur.
      </p>

      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Korrekt konfiguriert?</span>
          <span className="sv-item-note">
            Erfasste Scopes, Umfang und Datenstand stehen oben – belegt für diesen Mandanten. Ob die
            Einrichtung fachlich richtig ist, bewertet die Anwendung nicht.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Verbunden?</span>
          <span className="sv-item-note">
            Es ist kein externes System angebunden. Deshalb steht hier kein Zustand je System –
            weder ein guter noch ein schlechter. Welche Systemfamilien vorgesehen sind, steht unten.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Sicher?</span>
          <span className="sv-item-note">
            Diese Frage braucht Konten, geprüfte Rechte, nachvollziehbare Ereignisse und
            Betriebsdaten. Nichts davon ist hier angebunden, deshalb steht auf dieser Seite kein
            Sicherheitsurteil – weder ein beruhigendes noch ein alarmierendes.
          </span>
        </li>
      </ul>

      <KontenBlock />
      <ZugriffsentscheidungBlock />
      <AngebundeneSystemeBlock />
      <EreignisseBlock />
      <BetriebBlock />
    </section>
  );
}

function KontenBlock() {
  return (
    <>
      <h3>Konten und Identitäten</h3>
      <p className="sv-edge-note">
        In diesem Bestand sind keine Konten erfasst. Die Rollen oben beschreiben Verantwortung,
        nicht Personen. Konten, Anmeldung und Lebensweg einer Identität sind hier noch nicht
        angebunden.
      </p>
      <details className="sv-details">
        <summary>Welche Arten von Identitäten vorgesehen sind</summary>
        <ul className="sv-items">
          {IDENTITAETSTYPEN.map((typ) => (
            <li key={typ}>
              <span className="sv-item-name">{typ}</span>
            </li>
          ))}
        </ul>
      </details>
      <details className="sv-details">
        <summary>Der vorgesehene Lebensweg einer Identität</summary>
        <ul className="sv-items">
          {IDENTITAETS_STATIONEN.map((station) => (
            <li key={station.titel}>
              <span className="sv-item-name">{station.titel}</span>
              <span className="sv-item-note">{station.erlaeuterung}</span>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function ZugriffsentscheidungBlock() {
  return (
    <>
      <h3>Wie ein Zugriff entschieden werden soll</h3>
      <p className="sv-edge-note">
        Eine Zugriffsentscheidung entsteht im Zielbild aus drei Ebenen, die zusammenwirken – die
        Rolle allein genügt nicht. Beschrieben ist das Modell; geprüft wird hier heute nichts.
        Deshalb steht auf dieser Seite bewusst <strong>keine Rechtematrix</strong>: Sie würde eine
        Durchsetzung nahelegen, die es noch nicht gibt.
      </p>
      {AUTORISIERUNGS_EBENEN.map((ebene) => (
        <div key={ebene.titel}>
          <h4>{ebene.titel}</h4>
          <p className="sv-desc">{ebene.erlaeuterung}</p>
          <details className="sv-details">
            <summary>Woran sich das festmacht</summary>
            <ul className="sv-items">
              {ebene.punkte.map((punkt) => (
                <li key={punkt}>
                  <span className="sv-item-name">{punkt}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </>
  );
}

function AngebundeneSystemeBlock() {
  const nachPrioritaet = ['P0', 'P1', 'P2', 'P3'] as const;
  return (
    <>
      <h3>Angebundene Systeme</h3>
      <p className="sv-edge-note">
        Es ist kein externes System angebunden – weder lesend noch schreibend. Deshalb steht hier
        kein Zustand, keine Datenfrische und kein Zeitpunkt einer letzten Übernahme. Vorgesehen ist
        der folgende Katalog von Systemfamilien.
      </p>
      <details className="sv-details">
        <summary>Vorgesehene Systemfamilien ({SYSTEM_FAMILIEN.length})</summary>
        {nachPrioritaet.map((prio) => {
          const familien = SYSTEM_FAMILIEN.filter((f) => f.prioritaet === prio);
          if (familien.length === 0) return null;
          return (
            <div key={prio}>
              <h4>Priorität {prio}</h4>
              <ul className="sv-items">
                {familien.map((familie) => (
                  <li key={familie.familie}>
                    <span className="sv-item-name">{familie.familie}</span>
                    <span className="sv-item-note">{familie.nutzen}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <p className="sv-desc">{SYSTEM_FAMILIEN_HINWEIS}</p>
      </details>
      <details className="sv-details">
        <summary>Woraus sich der Zustand eines angebundenen Systems ergeben würde</summary>
        <p className="sv-desc">
          Diese Merkmale ergeben zusammen den Zustand einer Anbindung. Solange nichts angebunden
          ist, bleibt jedes davon leer – ein angenommener Wert wäre hier schlimmer als keiner.
        </p>
        <ul className="sv-items">
          {SYSTEM_ZUSTAND_MERKMALE.map((merkmal) => (
            <li key={merkmal}>
              <span className="sv-item-name">{merkmal}</span>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function EreignisseBlock() {
  return (
    <>
      <h3>Nachvollziehbare Ereignisse</h3>
      <p className="sv-edge-note">
        Die Anwendung ist in dieser Ausbaustufe lesend: Es entstehen keine Aktionen, die
        festzuhalten wären. Deshalb gibt es keine Ereignisliste – erfundene Einträge wären wertlos
        und würden Nachvollziehbarkeit vortäuschen.
      </p>
      <details className="sv-details">
        <summary>Wofür ein Eintrag entstehen soll ({AUDIT_AUSLOESER.length} Auslöser)</summary>
        <ul className="sv-items">
          {AUDIT_AUSLOESER.map((ausloeser) => (
            <li key={ausloeser}>
              <span className="sv-item-name">{ausloeser}</span>
            </li>
          ))}
        </ul>
      </details>
      <details className="sv-details">
        <summary>Was ein Eintrag mindestens festhalten soll</summary>
        <ul className="sv-items">
          {AUDIT_MINDESTFELDER.map((feld) => (
            <li key={feld}>
              <span className="sv-item-name">{feld}</span>
            </li>
          ))}
        </ul>
        <p className="sv-desc">{AUDIT_INTEGRITAET}</p>
      </details>
    </>
  );
}

function BetriebBlock() {
  return (
    <>
      <h3>Betriebszustand</h3>
      <p className="sv-edge-note">
        Es werden keine Betriebsdaten erhoben. Deshalb steht hier keine Verfügbarkeitsangabe, keine
        Fehlerquote und kein Zeitpunkt einer letzten Prüfung.
      </p>
      <details className="sv-details">
        <summary>Was Betriebsfähigkeit im Zielbild bedeutet</summary>
        <ul className="sv-items">
          {BETRIEBS_FAEHIGKEITEN.map((punkt) => (
            <li key={punkt.titel}>
              <span className="sv-item-name">{punkt.titel}</span>
              <span className="sv-item-note">{punkt.erlaeuterung}</span>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Kleiner Zähl-Helfer (lokal, Muster `KundenStartContent`)
 * --------------------------------------------------------------------------- */

/** „1 X" / „n Y" – deterministische Ein-/Mehrzahl für belegte Zählungen. */
function anzahl(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
