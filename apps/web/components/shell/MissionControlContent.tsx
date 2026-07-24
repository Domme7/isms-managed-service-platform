'use client';

/**
 * Präsentationaler Inhalt des Ortes „Heute" – strategische Ebene 1 mit Detailtiefe
 * (WP-016 Slice 2, umgebaut in WP-020 Slice 3/4 nach DR-0008/DR-0009/DR-0010).
 *
 * Rendert AUSSCHLIESSLICH die in `lib/heute/data.ts` und `lib/heute/dashboard.ts` abgeleiteten
 * Modelle des AKTIVEN Mandanten und die Rollen-/Weltangaben aus `lib/shell/roles.ts`. Es wird
 * nichts hartkodiert, nichts gerechnet und nichts erfunden: Zahlen entstehen im Helfer, Texte
 * benennen ihre Ermittlungsregel.
 *
 * DETAILTIEFE (Dok. 06, Abschnitt „Detailtiefe"; Zuordnung in `lib/heute/detailtiefe.ts`):
 *  - Ebene 1 (immer sichtbar): Klartext-Zustand + Kacheln/Abdeckungen aus belegten Daten
 *    (DR-0008) – „Klartext, Zustand und Handlung"; Handlung ist im read-only-Produkt die
 *    Navigation (jeder Drill-down ist ein Link).
 *  - Ebene 2: die WP-016-Abschnitte „Wo stehe ich?", „Was ist erfasst worden?",
 *    „Was weiß ich über die Datenlage?" (Ursachen & Datenlage).
 *  - Ebene 3: „Wo steige ich ein?" (Rohdaten-Einstiege in Objektlisten/Objekt-360).
 *  Die Ebenen sind KUMULATIV; VERDICHTUNG IST UMORDNUNG, KEIN INFORMATIONSVERLUST: kein
 *  WP-016-Inhalt wurde gelöscht, alles bleibt über die Tiefenwahl erreichbar (per Test belegt).
 *  IMMER sichtbar – unabhängig von der Tiefe: Kontextleiste, Tiefenschalter, Ebene 1,
 *  Ehrlichkeitsblock und Seitenbausteine-Hinweis (Invariante in `lib/heute/detailtiefe.ts`:
 *  es existiert derzeit keine sicherheitskritische Warnung, die eine Tiefe unterdrücken
 *  könnte; künftige Warnungen MÜSSEN außerhalb der Tiefensteuerung gerendert werden).
 *
 * Reihenfolge der WP-016-Abschnitte je Erlebniswelt aus `lib/heute/framing.ts` (reversible
 * Anzeigeentscheidung, dort mit Quelle und OFFENE FRAGE O-WP016-01 belegt). Die Daten sind für
 * alle zwölf Rollen IDENTISCH (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02); die Rolle ändert
 * die REIHENFOLGE der Abschnitte und die Leitfrage der Erlebniswelt – sonst weicht kein Wort
 * ab (per Rollen-Gleichheitstest belegt). Kein Rollen-Gating. Die Ebene 1 ist bewusst
 * ROLLENNEUTRAL gebaut (DR-0009: sie muss später ohne Umbau rollenlos rendern können – die
 * Rolle ist hier nie Datenvoraussetzung, nur Rahmung der tieferen Abschnitte).
 *
 * NICHT enthalten (WP-016 Nicht-Ziele, DR-0008-Grenze): Morning Mission, Veränderungsfeed,
 * Wiederaufnahme, Score, Reifegrad, Trend, Prozentwert, Schwellenwert, Prioritätsrang, Frist,
 * Empfehlung, Serviceangebot, Sortierung nach Schwere. Badges beruhen ausschließlich auf der
 * Positivliste erfasster Lagen (`BADGE_RULES` in `lib/heute/dashboard.ts`).
 *
 * Es werden auf dieser Seite bewusst KEINE Lebenszyklus-Stand-NAMEN angezeigt (Begründung am
 * `LifecycleSummaryTile` in `lib/heute/dashboard.ts`); die Lebenszyklus-Kachel trägt die
 * 08-D07-Glosse. Der seitenweite Rahmungssatz aus `IsmsContent` / `ObjectDetailView` entfällt
 * deshalb weiterhin (WP-016 Acceptance 14) – ein „Prüfergebnis" wird an keiner Stelle
 * behauptet.
 *
 * TIEFEN-ZUSTAND: `tiefe`/`onTiefeChange` kommen von `HeuteView` (dort mit versioniertem
 * localStorage-Schlüssel persistiert, O-WP020-01). Ohne `onTiefeChange` (Alt-Tests, Wächter)
 * verwaltet die Komponente die Tiefe selbst und startet bewusst in VOLLER Tiefe 3: die
 * Wächter (Prozessvokabular, Bewertungsvokabular, Leerzustand-Mandantengrenze) prüfen so den
 * GESAMTEN gerenderten Text; die echte Seite startet über `HeuteView` in der Standardtiefe 1
 * (Dok. 06 P06 „Die erste Ebene bleibt ruhig").
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Abschnitt) > h3 (Block/Kachel) > h4 (Leerzustand im
 * Block). Bestehendes CSS-Vokabular, erweitert um die `db-`/`ht-`-Klassen (DR-0008,
 * Stilleitplanke „nicht absolut übertrieben").
 *
 * Bundle-Grenze (O-WP014-09): Routen und Datumsanzeige kommen fertig aus dem Modell; diese
 * Datei importiert weder `lib/twin/object-detail.ts` noch bildet sie selbst eine Route.
 */
import Link from 'next/link';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import type { DemoTenant } from '@isms/demo-seed';

import {
  anzahl,
  buildMissionControl,
  type DataObservation,
  type MissionControlModel,
  type ObjectEntryPoint,
  type PlaceEntryPoint,
  type RecordingWave,
} from '../../lib/heute/data';
import { buildHeuteDashboard, type HeuteDashboardModel } from '../../lib/heute/dashboard';
import {
  DETAILTIEFEN,
  DETAILTIEFE_STANDARD,
  SECTION_EBENE,
  type Detailtiefe,
} from '../../lib/heute/detailtiefe';
import {
  MISSION_SECTIONS,
  MISSION_SECTION_IDS,
  framingForRole,
  type MissionSectionId,
} from '../../lib/heute/framing';
import {
  KANONISCHE_KACHELORDNUNG,
  fokusBelegtTextFuer,
  fokusLueckenTextFuer,
  varianteForRole,
  type TileId,
} from '../../lib/heute/rollenvarianten';
// KEIN `getPlace('heute')` mehr (WP-028-Fixpass, DR-0013 Nr. 1): Die Seite rendert die
// aspirative Leitfrage des Screenkatalogs nicht mehr. Sie bleibt als Konzeptanker in
// `lib/shell/places.ts` stehen und wird dort begründet – hier wäre sie nur noch ein Satz,
// den die Seite im nächsten Absatz zurücknehmen müsste.
import { worldForRole, type DemoRole, type ExperienceWorld } from '../../lib/shell/roles';
import { rollenReichweiteSatz } from '../../lib/shell/sphaere';
import {
  CoverageKachel,
  EmptyTenantKachel,
  LifecycleSummaryKachel,
  StockKachel,
} from './DashboardKacheln';
import { PageContextBar } from './PageContextBar';
import { ScopeKontextWert } from './ScopeKontext';
import { SeitenbausteineHinweis } from './SeitenbausteineHinweis';

/** Stabile DOM-ID je Abschnitt (für `aria-labelledby`). */
function sectionHeadingId(id: MissionSectionId): string {
  return `heute-${id}`;
}

export function MissionControlContent({
  role,
  tenant,
  tiefe,
  onTiefeChange,
}: {
  /**
   * Aktive Produktrolle oder `null` = NEUTRALER Zustand (WP-020 Slice 2, DR-0009): dieselbe
   * Seite, dieselben Daten, kanonische Abschnittsreihenfolge ohne Welt-Leitfrage; die Rolle
   * ist nie Datenvoraussetzung, nur Rahmung.
   */
  role: DemoRole | null;
  tenant: DemoTenant;
  /** Gewählte Detailtiefe – von `HeuteView` gehalten und persistiert (O-WP020-01). */
  tiefe?: Detailtiefe;
  /** Tiefenwechsel-Handler; ohne ihn verwaltet die Komponente die Tiefe selbst (s. Kopfnotiz). */
  onTiefeChange?: (tiefe: Detailtiefe) => void;
}) {
  // Unkontrollierter Fallback NUR für Alt-Tests/Wächter: volle Tiefe, damit der gesamte Text
  // unter den Wächtern steht (Begründung in der Kopfnotiz). Die echte Seite ist kontrolliert.
  const [fallbackTiefe, setFallbackTiefe] = useState<Detailtiefe>(tiefe ?? 3);
  const aktiveTiefe: Detailtiefe = onTiefeChange ? (tiefe ?? DETAILTIEFE_STANDARD) : fallbackTiefe;
  const wechsleTiefe = onTiefeChange ?? setFallbackTiefe;

  const model = buildMissionControl(tenant.tenant_id);
  const dashboard = buildHeuteDashboard(tenant.tenant_id);
  const world = role ? worldForRole(role) : null;
  // Neutral: kanonische Reihenfolge (DR-0009 – „rollenlos in kanonischer Reihenfolge ohne
  // Welt-Leitfrage"). Mit Rolle: Welt-Rahmung; der `?? MISSION_SECTION_IDS`-Zweig dahinter ist
  // NICHT ERREICHBAR, bewusst fail-soft belassen: `parseSession` verwirft unbekannte
  // Rollen-IDs, die Prop trägt eine der zwölf kanonischen Rollen oder `null`.
  const sectionOrder = role
    ? (framingForRole(role.id)?.sectionOrder ?? MISSION_SECTION_IDS)
    : MISSION_SECTION_IDS;

  return (
    <>
      <p className="tw-eyebrow">Heute · Mission Control</p>
      <h1>Heute</h1>

      {/* SICHTBARE LEITFRAGE = DIE FRAGE, DIE DIESE SEITE HEUTE BEANTWORTET (DR-0013 Nr. 1,
          Muster der WP-032-Orte `/reports`, `/wissen`, `/administration` und `/entscheidungen`).

          BIS HIERHER stand hier die aspirative Leitfrage des Screenkatalogs („Was hat sich seit
          meinem letzten Besuch verändert und was verdient Aufmerksamkeit?") – und vier Blöcke
          tiefer dementierte die Seite BEIDE Hälften: „seit meinem letzten Besuch" hat keinen
          Träger (die Anmeldung speichert keinen Besuchszeitpunkt), und „was verdient
          Aufmerksamkeit" wäre eine Priorisierung ohne Frist, Aufwand, Kapazität oder Priorität.
          Genau dieses Muster – Frage stellen, Frage zurücknehmen – nimmt DR-0013 aus der
          Oberfläche. Der KONZEPTANKER bleibt als `question` in `lib/shell/places.ts` erhalten und
          ist dort begründet; ob der Wortlaut selbst überarbeitet wird, ist eine Produkt-/
          Owner-Entscheidung (O-WP032-02) und wird hier nicht vorweggenommen.

          Die Ehrlichkeits-SUBSTANZ ist nicht entfernt, sondern verschoben: die beiden unbelegten
          Teile stehen als ruhige Schlusszeile am Seitenende und ausführlich unter „Was hier
          bewusst nicht steht". */}
      <p className="tw-question">
        Wie ist der Stand von {tenant.display_name} – was ist erfasst und wo sind die Lücken?
      </p>

      {model && dashboard ? (
        <>
          {/* ANTWORT ZUERST, LÜCKE ZULETZT (DR-0013): erst die belegte, orientierende
              Kontextleiste und der kompakte Tiefenschalter, dann SOFORT der Klartext-Stand +
              die Statuskacheln. Über der Falz stehen Zahlen und Stände, nicht Meta-Text. */}
          <ContextBar model={model} role={role} tenant={tenant} world={world} />

          <TiefenSchalter tiefe={aktiveTiefe} onChange={wechsleTiefe} />

          <DashboardSection dashboard={dashboard} role={role} />

          {/* Orientierende Notizen (Ansichtszustand, Kundenbereich) stehen NACH der Antwort,
              damit sie den Statusblock nicht über der Falz nach unten drücken (Antwort-Modus).
              WP-028 Slice 4: Der Ein-Satz-Hinweis zur Reichweite der Rollenwahl erscheint jetzt
              in BEIDEN Zuständen – vorher stand er nur im neutralen Zustand, also genau dort,
              wo er am wenigsten gebraucht wurde (wer eine Rolle gewählt hat, will wissen, was
              sie ändert). */}
          {role === null ? <NeutralerEinstiegHinweis /> : <RollenAnsichtHinweis role={role} />}

          <KundenbereichEinstieg role={role} tenant={tenant} />

          {/* Einstieg in den Cockpit-Varianten-Vergleich (WP-025): drei Entwürfe für diesen
              Startpunkt auf demselben Datenbestand. Kein neuer Hauptnav-Ort – die Seite hängt
              unter „Heute" (`/cockpit`, Nav-Match in `lib/shell/places.ts`). Rollen-neutrale,
              gleiche Zeile für jede Perspektive (eigene Klasse `ht-cockpit`). */}
          <p className="ht-cockpit">
            <Link className="tw-cta" href="/cockpit">
              Drei Cockpit-Varianten für diesen Startpunkt vergleichen →
            </Link>
          </p>

          {sectionOrder
            .filter((id) => SECTION_EBENE[id] <= aktiveTiefe)
            .map((id) => (
              <MissionSection
                key={id}
                id={id}
                model={model}
                role={role}
                tenant={tenant}
                world={world}
              />
            ))}

          <HonestySection model={model} />

          {/* RUHIGE SCHLUSSZEILE (DR-0013 „Antwort zuerst, Lücke zuletzt"). Der frühere
              Intro-Absatz steht jetzt als EINE dezente Zeile hier unten. Die
              Ehrlichkeits-SUBSTANZ bleibt unverändert: die beiden Dinge, die diese Seite NICHT
              beantwortet („seit meinem letzten Besuch", eine Priorisierung), werden weiterhin
              ausdrücklich benannt – ausführlich unmittelbar darüber unter „Was hier bewusst
              nicht steht". Neu ist nur, dass sie keine zuvor gestellte Frage mehr dementieren
              müssen: die Seite stellt seit dem Fixpass die Frage, die sie beantwortet. */}
          <p className="ht-seitenfuss">
            Read-only Startpunkt auf dem Datenbestand des aktiven Mandanten: erfasster Stand,
            Abdeckungen und Einstiege. Nicht belegt und deshalb hier nicht beantwortet: „seit meinem
            letzten Besuch" und eine Priorisierung – beide Lücken sind oben unter „Was hier bewusst
            nicht steht" benannt.
          </p>

          <SeitenbausteineHinweis ort="heute" />
        </>
      ) : (
        /* NICHT ERREICHBAR, bewusst fail-loud: die Prop ist ein `DemoTenant` aus dem Seed, und
           `resolveSession` liefert ausschließlich bekannte Mandanten. Bricht diese Zusicherung
           künftig, zeigt die Seite den Bruch sichtbar an, statt still leer zu bleiben. */
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Mandant im Datenbestand nicht auflösbar
          </h2>
          <p style={{ marginTop: 0 }}>
            Zur aktiven Auswahl existiert im Datenbestand kein Mandant. Es wird bewusst kein
            Ersatzinhalt gezeigt.
          </p>
          <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Querschnittlicher Kontext (Dok. 06 §6 / 06-D04)
 * --------------------------------------------------------------------------- */

/**
 * Kontextleiste über die gemeinsame `PageContextBar` (WP-020 Slice 1, Dok. 06 „Sichtbarer
 * Kontext"): Mandant, Produktrolle, die drei benannten Datenlücken (Vertretung,
 * Vertraulichkeit/Exportrestriktion, Vertrauensgrad – Muster O-WP016-08, dort begründet) sowie
 * seitenspezifisch Scope und Datenstand. „Datenstand" ist ausdrücklich die SYSTEMACHSE
 * (`record_time.recorded_at`, Dok. 07 §11) und wird nicht mit der fachlichen Gültigkeit
 * vermischt. Als Scope erscheinen die belegten Kennungen aus dem Datenbestand – ein
 * Klartextname existiert dazu nicht (O-WP014-03). Die Erlebniswelt bleibt als seitenspezifische
 * Rahmungszeile erhalten (Zusatzeintrag) – im NEUTRALEN Zustand entfällt sie: ohne Rolle gibt
 * es keine Welt, und ein erfundener Weltwert wäre eine falsche Rahmung (die Produktrollen-Zeile
 * der Leiste nennt „neutral", AC-3-Formulierung).
 */
function ContextBar({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  world: ExperienceWorld | null;
}) {
  const waves = model.recordingWaves;
  const letzte = waves.length > 0 ? waves[waves.length - 1] : undefined;
  const scopeIds: string[] = [];
  for (const wave of waves) {
    for (const scopeId of wave.scopeIds) if (!scopeIds.includes(scopeId)) scopeIds.push(scopeId);
  }

  return (
    <PageContextBar
      role={role}
      tenant={tenant}
      scopeLabel="Scopes dieses Mandanten"
      scopeValue={<ScopeKontextWert scopeIds={scopeIds} />}
      datenstandLabel="Datenstand (zuletzt im System erfasst)"
      datenstandValue={
        /* Kalendertag statt vollständigem Zeitstempel: die Anzeige nennt einen Tag, und eine
           Uhrzeit ist für die Tagesgruppe nicht belegt (`RecordingWave.recordedOn`). */
        letzte ? (
          <time dateTime={letzte.recordedOn}>{letzte.dateDisplay}</time>
        ) : (
          'keine Erfassung im Datenbestand'
        )
      }
    >
      {world ? (
        <div>
          <dt>Erlebniswelt</dt>
          <dd>{world.name}</dd>
        </div>
      ) : null}
    </PageContextBar>
  );
}

/* -----------------------------------------------------------------------------
 * Sichtbarer Einstieg in den Kundenbereich (WP-006 Slice 1)
 * --------------------------------------------------------------------------- */

/**
 * Prominenter, IMMER sichtbarer Einstieg in die Kunden-Startseite „verwalten" (`/kunden`) für
 * den aktiven Mandanten. Löst 06-D02 („Kundennutzer können … direkt im eigenen Customer
 * Workspace starten") als sichtbaren Einstieg OHNE erzwungenen Redirect (der neutrale Einstieg
 * nach DR-0009 bleibt; Rest der Frage offen als O-WP006-03). Für Kundensphäre-Rollen (Dok. 03,
 * Sphäre „Kunde") betont der Text „Ihr Unternehmen"; sonst neutral „der aktive Mandant".
 */
function KundenbereichEinstieg({ role, tenant }: { role: DemoRole | null; tenant: DemoTenant }) {
  const kundensphaere = role?.sphere === 'Kunde';
  return (
    <div className="ht-kundenbereich" role="note">
      <p className="ht-kundenbereich-text">
        <strong>Kundenbereich:</strong>{' '}
        {kundensphaere
          ? `Scopes, Ziele, Services und Nachweise von ${tenant.display_name} an einem Ort verwalten.`
          : 'Scopes, Ziele, Services und Nachweise des aktiven Mandanten an einem Ort.'}{' '}
        <Link className="tw-cta" href="/kunden">
          Kundenbereich öffnen →
        </Link>
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Neutraler Einstieg (WP-020 Slice 2, DR-0009)
 * --------------------------------------------------------------------------- */

/**
 * Erstbesuchs-Hinweis der neutralen Ebene 1 (DR-0009; Dok. 04 J01 „Kein erzwungener
 * Rundgang"): kennzeichnet den Zustand als neutralen strategischen Einstieg und benennt die
 * OPTIONALE Rollenwahl in der Topbar – Klartext, kein Zwang, kein Overlay. Er erscheint,
 * solange keine Rolle gewählt ist (der neutrale Zustand IST der Erstbesuchs-Zustand vor der
 * Personalisierung); mit gewählter Rolle verschwindet er, die Abwahl bringt ihn zurück.
 */
function NeutralerEinstiegHinweis() {
  // Zwei Sätze seit dem Review-Pass (Product-Finding: kürzer); der Verzicht auf einen
  // erzwungenen Rundgang (Dok. 04 J01) bleibt EIGENSCHAFT des Hinweises (passiv, optional) –
  // er muss nicht mehr als Satz dabeistehen.
  // Reichweitensatz aus EINER Quelle (`rollenReichweiteSatz`): seit der Sphärenkopplung wäre
  // „ändert nur Betonung und Reihenfolge, nie die Daten" schlicht falsch (WP-028-Fixpass). Der
  // neutrale Einstieg hat die Portfolio-Sphäre (`kundenSicht(null) === 'portfolio'`) – der Satz
  // benennt entsprechend Portfolio-Übersicht und Mandantenwechsel (Nachfix nach Gate-Runde 2).
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>Neutraler strategischer Einstieg:</strong> Sie sehen den vollständigen Überblick
        ohne Rollen-Personalisierung. Optional können Sie oben unter „Rolle" eine Produktrolle
        wählen; sie ist jederzeit wieder abwählbar. {rollenReichweiteSatz(null)}
      </p>
    </div>
  );
}

/**
 * Reichweite der Rollenwahl im ROLLENMODUS – ein Satz (WP-028 Slice 4, DR-0013 Nr. 12).
 *
 * Bis hierher stand die Aussage über die Reichweite der Rollenwahl ausschließlich im neutralen
 * Zustand. Wer eine Rolle wählte, bekam sie nie zu sehen – dabei ist genau dann die Frage
 * offen, was sich gerade geändert hat. Bewusst EIN Satz mit dem Rollennamen (ohne Rollencode)
 * und ohne Design-Theorie; die vollständige Herleitung der Reihenfolge lebt in
 * `lib/heute/rollenvarianten.ts`.
 *
 * WORTLAUT AUS EINER QUELLE (WP-028-Fixpass, Product-Auflage): `rollenReichweiteSatz(role)`. Der
 * frühere Satz („ändert nur Betonung und Reihenfolge, nie die Daten") war seit der
 * Sphärenkopplung unrichtig – die Rolle entscheidet über den Einstieg des Ortes „Kunden" sowie
 * über Portfolio-Übersicht und Mandantenwechsel. Der Satz wird je Sphäre der AKTIVEN Rolle
 * gebildet (Nachfix nach Gate-Runde 2).
 */
function RollenAnsichtHinweis({ role }: { role: DemoRole }) {
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>Ansicht {role.name}:</strong> {rollenReichweiteSatz(role)} Die Rolle ist jederzeit
        oben wieder abwählbar.
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Detailtiefe-Schalter (Dok. 06 „Detailtiefe" / P06, WP-020 Slice 3)
 * --------------------------------------------------------------------------- */

/**
 * Wahl der Detailtiefe als Radiogruppe: Text + Radio-Form (nie nur Farbe, 06-D11). Die drei
 * Stufen samt Kurzbeschreibung kommen aus `DETAILTIEFEN` (eine Quelle). Keine Animation – nichts,
 * was `prefers-reduced-motion` unterdrücken müsste.
 *
 * KOMPAKT (DR-0013 „Detailtiefe als kompakter Umschalter … ohne Erklärabsatz und ohne
 * localStorage-/Datenschutz-Prosa"): Der frühere Erklärabsatz ist entfernt, damit der Schalter
 * den Klartext-Stand nicht nach unten drückt. Gespeichert wird weiterhin STILL (nur die Stufe,
 * mandanten-/rollenfrei – `HeuteView`/`lib/heute/detailtiefe.ts`); dass die Ebenen kumulativ
 * sind, trägt die Kurzbeschreibung jeder Stufe.
 */
function TiefenSchalter({
  tiefe,
  onChange,
}: {
  tiefe: Detailtiefe;
  onChange: (tiefe: Detailtiefe) => void;
}) {
  // Eindeutiger Gruppenname je Instanz (mehrere Renders im Test dürfen nicht koppeln).
  const gruppe = useId();

  return (
    <fieldset className="ht-tiefe ht-tiefe--kompakt">
      <legend>Detailtiefe dieser Ansicht</legend>
      <div className="ht-tiefe-optionen">
        {DETAILTIEFEN.map((stufe) => (
          <label
            key={stufe.stufe}
            className={
              stufe.stufe === tiefe ? 'ht-tiefe-option ht-tiefe-option--aktiv' : 'ht-tiefe-option'
            }
          >
            <input
              type="radio"
              name={gruppe}
              value={stufe.stufe}
              checked={stufe.stufe === tiefe}
              onChange={() => onChange(stufe.stufe)}
            />
            <span className="ht-tiefe-titel">{`Ebene ${stufe.stufe} · ${stufe.titel}`}</span>
            <span className="ht-tiefe-beschreibung">{stufe.beschreibung}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* -----------------------------------------------------------------------------
 * Ebene 1 – verdichteter Klartext-Zustand + Kacheln aus belegten Daten
 * (WP-020 Slice 4, DR-0008; Modelle aus `lib/heute/dashboard.ts`)
 * --------------------------------------------------------------------------- */

function DashboardSection({
  dashboard,
  role,
}: {
  dashboard: HeuteDashboardModel;
  role: DemoRole | null;
}) {
  // Rollenvariante (WP-020 Slice 5): ordnet die Kacheln nach der normativen Tabelle bzw. der
  // Welt-Ableitung – NIE Entzug, nur Betonung. Neutral und Rollen ohne Variante rendern die
  // kanonische Reihenfolge (`lib/heute/rollenvarianten.ts`, dort vollständig begründet).
  const zuordnung = varianteForRole(role?.id ?? null);
  const ordnung = zuordnung.variante?.tileOrder ?? KANONISCHE_KACHELORDNUNG;

  // Kachel-Elemente je Kennung; die Reihenfolge kommt AUSSCHLIESSLICH aus der Variante.
  const kacheln = new Map<TileId, ReactNode>();
  for (const tile of dashboard.stockTiles) kacheln.set(tile.id, <StockKachel tile={tile} />);
  if (dashboard.lifecycleSummary) {
    kacheln.set(
      'lebenszyklus_zaehlung',
      <LifecycleSummaryKachel tile={dashboard.lifecycleSummary} />,
    );
  }
  for (const tile of dashboard.coverage) kacheln.set(tile.id, <CoverageKachel tile={tile} />);
  // Fail-soft, kein Datenverlust: eine Kachel, die in keiner Ordnung stünde, fiele ans Ende
  // statt still zu verschwinden (per Test unerreichbar – jede Ordnung ist vollständig).
  const sichtbar: TileId[] = [
    ...ordnung.filter((id) => kacheln.has(id)),
    ...[...kacheln.keys()].filter((id) => !ordnung.includes(id)),
  ];

  return (
    <section aria-labelledby="heute-stand">
      <h2 id="heute-stand">Wie ist der Stand?</h2>

      {/* Klartext-Zustand (Ebene 1): jeder Satz aus abgeleiteten Zahlen, inkl. der ehrlichen
          Grenze (kein Delta, keine Entwicklung, keine wichtigste Ursache – kein Träger). */}
      <ul className="db-klartext">
        {dashboard.klartext.map((satz) => (
          <li key={satz}>{satz}</li>
        ))}
      </ul>

      {dashboard.isEmpty && dashboard.emptyTile ? (
        /* Leerer Mandant: EINE ehrliche Datenlücken-Kachel statt einer „0 von 0"-Wand.
           Ein Rollenfokus wird hier bewusst NICHT gerendert: ohne Kacheln gibt es nichts zu
           betonen – die Datenlücken-Kachel ist die Aussage. */
        <EmptyTenantKachel tile={dashboard.emptyTile} />
      ) : (
        <>
          {role ? <RollenfokusBlock role={role} dashboard={dashboard} /> : null}
          <ul className="db-grid" aria-label="Kacheln aus belegten Daten">
            {sichtbar.map((id) => (
              <li key={id}>{kacheln.get(id)}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/**
 * Kachellage des aktiven Mandanten für den Rollenfokus (Review-Finding Domain F2): je Kachel,
 * ob sie Bestand trägt – Statuskacheln über ihre Zählwerte, Lebenszyklus-/Abdeckungskacheln
 * über ihre Grundgesamtheit. Reine Ableitung aus dem Dashboard-Modell, nichts Zweites gezählt.
 */
function kachelLage(dashboard: HeuteDashboardModel): ReadonlyMap<TileId, boolean> {
  const lage = new Map<TileId, boolean>();
  for (const tile of dashboard.stockTiles) {
    lage.set(tile.id, tile.values.reduce((summe, value) => summe + value.count, 0) > 0);
  }
  if (dashboard.lifecycleSummary) {
    lage.set('lebenszyklus_zaehlung', dashboard.lifecycleSummary.total > 0);
  }
  for (const tile of dashboard.coverage) lage.set(tile.id, tile.total > 0);
  return lage;
}

/**
 * Rollenfokus der Ebene 1 – ENTSCHLACKT in WP-028 Slice 3 (DR-0013 Nr. 5 „Rollenfokus ohne
 * Beipackzettel").
 *
 * SICHTBAR: genau EIN Nutzen-Satz („Für die Executive-Sicht zuerst: Risiko-Minderung."). Die
 * Umsortierung spricht für sich; sie muss sich nicht erklären.
 *
 * WAS AUS DEM FLIESSTEXT VERSCHWUNDEN IST (nicht aus dem Produkt): die Herkunfts-Sätze („im
 * Konzept normiert" / „reversible Anzeigeentscheidung"), das Wort „gegenstandslos", der Begriff
 * „Betonung" und der aufklappbare „Quelle der Variante"-Block mit den wörtlichen
 * PDF-Spaltenzitaten. Das ist Design- und Konzept-Theorie und lebt jetzt in der Code-Doku von
 * `lib/heute/rollenvarianten.ts` (Quelle, Zuordnungsbegründung, Zitate – dort weiterhin per
 * Test gegen die PDF-Tabelle festgenagelt).
 *
 * WAS BLEIBT (Ehrlichkeits-Substanz, DR-0005): die Fokusinhalte OHNE Träger, ob die betonten
 * Kacheln beim AKTIVEN Mandanten überhaupt Bestand tragen (Review-Finding Domain F2) und die
 * Zusage, dass nichts entzogen wird (eine Wahrheit, Dok. 06 P02) – alle drei vollständig im
 * DOM, nur ruhig im `<details>` statt als drei Absätze über den Kacheln.
 *
 * ROLLEN OHNE VARIANTE (Assurance & Administration World) zeigen GAR KEINEN Fokus mehr: dass
 * das Konzept für sie keine Zeile führt, ist keine Aussage über die Daten des Mandanten
 * (Begründung: `KEINE_VARIANTE_BEGRUENDUNG`). Die Regel selbst bleibt scharf – sie erhalten die
 * kanonische Reihenfolge, und genau das prüft der Wächter weiterhin.
 * Für neutral erscheint stattdessen der Erstbesuchs-Hinweis (Slice 2).
 */
function RollenfokusBlock({ role, dashboard }: { role: DemoRole; dashboard: HeuteDashboardModel }) {
  const { variante } = varianteForRole(role.id);
  if (!variante) return null;

  return (
    <div className="rv-fokus" role="note">
      <p className="rv-fokus-text">{variante.nutzenSatz}</p>
      <details className="rv-details">
        <summary>Was diese Reihenfolge nicht zeigt</summary>
        <p>
          {fokusBelegtTextFuer(variante, kachelLage(dashboard))}{' '}
          {fokusLueckenTextFuer(variante, dashboard.hatReview)}
        </p>
        <p>{variante.ausblendungText}</p>
      </details>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Abschnittsverteiler
 * --------------------------------------------------------------------------- */

function MissionSection({
  id,
  model,
  role,
  tenant,
  world,
}: {
  id: MissionSectionId;
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  world: ExperienceWorld | null;
}) {
  switch (id) {
    case 'standort':
      return <StandortSection model={model} role={role} tenant={tenant} world={world} />;
    case 'erfassung':
      return <ErfassungSection model={model} />;
    case 'datenlage':
      return <DatenlageSection model={model} />;
    case 'einstieg':
      return <EinstiegSection model={model} tenant={tenant} />;
    default: {
      // Exhaustiv: ein fünfter Abschnitt bricht den Typecheck, statt still zu verschwinden.
      const unbekannt: never = id;
      throw new Error(`Unbehandelter Abschnitt: ${String(unbekannt)}`);
    }
  }
}

/* -----------------------------------------------------------------------------
 * (1) Wo stehe ich?
 * --------------------------------------------------------------------------- */

function StandortSection({
  model,
  role,
  tenant,
  world,
}: {
  model: MissionControlModel;
  role: DemoRole | null;
  tenant: DemoTenant;
  world: ExperienceWorld | null;
}) {
  const headingId = sectionHeadingId('standort');
  const standing = model.tenantStanding;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.standort.title}</h2>

      <h3>Aktive Rolle</h3>
      {role && world ? (
        <>
          {/* Rollenangaben vollständig aus `lib/shell/roles.ts` (Dok. 03, Abschnitt
              „Kanonisches Rollenmodell") – nichts übersetzt. Der NAME der Erlebniswelt steht
              bereits querschnittlich in der Kontextzeile und wird hier nicht wiederholt; neu
              ist an dieser Stelle ihre Leitfrage. */}
          {/* KEIN Rollencode im UI (WP-028 Slice 4, DR-0013 Nr. 12): Die Zeile „Rollen-ID: R01"
              war interne Kennung im Produkttext. Die ID bleibt unverändert im Datenmodell
              (`DemoRole.id`) und trägt weiterhin Auswahl und Zuordnung – sie ist Kennung, kein
              Anzeigetext. Die Rolle bleibt mit ihrem NAMEN eindeutig benannt. */}
          <dl className="tw-meta">
            <dt>Produktrolle</dt>
            <dd>{role.name}</dd>
            <dt>Sphäre</dt>
            <dd>{role.sphere}</dd>
            <dt>Kernverantwortung</dt>
            <dd>{role.responsibility}</dd>
            <dt>Leitfrage dieser Erlebniswelt</dt>
            {/* Die Weltleitfrage darf nicht ungerahmt stehen bleiben: sie fragt je nach Welt
                nach Entscheidungen, Kurs oder Portfolio – alles Dinge, die genau diese Seite
                bewusst NICHT beantwortet. Ohne den Zusatz erzeugt sie dieselbe unerfüllte
                Erwartung, die der Lead für die Ortsleitfrage bereits ausräumt (Review-Fix). */}
            <dd>
              {world.leitfrage}
              <span className="sv-item-note">
                Diese Leitfrage rahmt die Erlebniswelt, nicht diese Seite: hier wird gezählt und
                benannt.
              </span>
            </dd>
          </dl>
        </>
      ) : (
        /* NEUTRALER Zustand (WP-020 Slice 2, DR-0009): keine Rolle ist ein vollwertiger
           Zustand – benannt statt leer, ohne erfundene Rollenangaben. */
        <p className="tw-muted">
          Keine Rolle gewählt – Sie arbeiten im neutralen Einstieg. Die Rollenwahl oben in der
          Leiste ist optional. {rollenReichweiteSatz(null)}
        </p>
      )}
      {/* Quelle „eine Wahrheit je Rolle": Dok. 06 06-D05 (Signatur seit dem Review-Pass nur
          im Kommentar – Konzept-Jargon gehört nicht in den Produkttext). */}
      <p className="tw-muted">
        Die Rolle ist eine Perspektive: Sie ordnet die Abschnitte dieser Seite, und diese
        Reihenfolge ist keine Rangfolge. Sie entscheidet nicht über Zugriff – alle zwölf Rollen und
        der neutrale Zustand sehen hier dieselben Daten desselben Mandanten. Geprüfte Rechte und
        eine durchgesetzte Zugriffskontrolle sind hier noch nicht angebunden.
      </p>

      <h3>Aktiver Mandant</h3>
      <dl className="tw-meta">
        <dt>Mandant</dt>
        <dd>{tenant.display_name}</dd>
        <dt>Branche</dt>
        <dd>{tenant.industry}</dd>
      </dl>

      {standing.isEmpty ? (
        <EmptyTenant tenant={tenant} />
      ) : (
        <>
          <div className="tw-summary">
            <div className="tw-stat">
              <span className="tw-stat-num">{standing.objectCount}</span>
              <span className="tw-stat-label">Objekte dieses Mandanten</span>
            </div>
            <div className="tw-stat">
              <span className="tw-stat-num">{standing.relationshipCount}</span>
              <span className="tw-stat-label">Beziehungen dieses Mandanten</span>
            </div>
          </div>
          <p className="sv-item-meta">
            Gezählt wird ausschließlich der aktive Mandant. Objekte und Beziehungen anderer
            Mandanten sind hier weder enthalten noch verlinkt.
          </p>
        </>
      )}
    </section>
  );
}

/**
 * Ehrlicher Leerzustand für Mandanten ohne eigenen Graphen (Dok. 06 §17: Nutzen + nächster
 * Schritt). Nennt bewusst KEINEN anderen Mandanten – weder Name noch Anzahl (Dok. 07 §17/P09).
 */
function EmptyTenant({ tenant }: { tenant: DemoTenant }) {
  return (
    <div className="tw-empty" role="note">
      <h4>Kein Datenbestand für {tenant.display_name}</h4>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im Datenbestand keine Objekte und keine
        Beziehungen modelliert. Deshalb stehen hier keine Zahlen – und es werden auch keine
        erfunden.
      </p>
      <p className="tw-muted">
        Nutzen dieser Seite: Sie zeigt für den aktiven Mandanten Bestand, Erfassung, Datenlage und
        Einstiege. Ohne modellierten Bestand bleibt sie sichtbar leer, statt einen Eindruck zu
        erzeugen, den die Daten nicht tragen. Die Abschnitte darunter bleiben erhalten und weisen
        ihre Zählungen mit 0 aus.
      </p>
      <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
        <Link className="tw-cta" href="/login">
          Mandant wechseln →
        </Link>
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * (2) Was ist erfasst worden?
 * --------------------------------------------------------------------------- */

function ErfassungSection({ model }: { model: MissionControlModel }) {
  const headingId = sectionHeadingId('erfassung');
  const waves = model.recordingWaves;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.erfassung.title}</h2>
      {/* Achsentrennung nach Dok. 07 §11 (Signatur seit dem Review-Pass nur im Kommentar). */}
      <p className="sv-edge-note">
        Gezeigt wird die Systemachse: der Zeitpunkt, zu dem ein Datensatz im System erfasst wurde.
        Die fachliche Gültigkeit ist eine eigene Zeitachse und wird hier nicht damit vermischt.
      </p>

      <h3>Erfassungswellen im Datenbestand</h3>
      {waves.length > 0 ? (
        <>
          <p className="sv-edge-note">
            Die Wellen entstehen durch Gruppierung nach dem Kalendertag der Systemerfassung, in
            zeitlicher Reihenfolge. Eine fachliche Bezeichnung der Welle gibt es im Objektvertrag
            nicht; ausgewiesen werden deshalb die belegten Scope-Kennungen der erfassten Objekte.
          </p>
          <ul className="sv-items">
            {waves.map((wave) => (
              <WaveItem key={wave.recordedOn} wave={wave} />
            ))}
          </ul>
        </>
      ) : (
        <p className="tw-empty" role="note">
          Für diesen Mandanten ist im Datenbestand nichts erfasst: es gibt weder Objekte noch
          Beziehungen und damit auch keinen Erfassungszeitpunkt. Weiter geht es über den Wechsel des
          Mandanten.
        </p>
      )}

      <h3>Ein Erfassungszeitpunkt ist keine Veränderung</h3>
      <p>
        Wann etwas ins System kam, sagt nichts darüber, ob sich fachlich etwas geändert hat. Diese
        Seite macht daraus deshalb kein „neu", kein „geändert" und keinen Verlauf. Ein
        Veränderungsfeed bräuchte Ereignisobjekte – die trägt der Datenbestand nicht. Wo eine
        fachliche Ablösung erfasst ist, verbindet sie zwei eigenständige Objekte und ist damit
        ebenfalls kein Änderungsfeed.
      </p>
      {/* Aus den Daten abgeleitete Aussage (höchste Version, Ersetzungszeitpunkt,
          supersedes-Kanten) – kein konstanter Text, siehe `deriveHistoryState`. */}
      <p className="sv-item-meta">{model.historyState.statement}</p>
    </section>
  );
}

function WaveItem({ wave }: { wave: RecordingWave }) {
  return (
    <li>
      <span className="sv-item-name">
        <time dateTime={wave.recordedOn}>{wave.dateDisplay}</time>
      </span>
      <span className="sv-item-meta">
        {` · ${anzahl(wave.objectCount, 'Objekt', 'Objekte')} · ${anzahl(
          wave.relationshipCount,
          'Beziehung',
          'Beziehungen',
        )} an diesem Tag im System erfasst`}
      </span>
      <span className="sv-item-note">
        {wave.scopeIds.length > 0
          ? `Belegte Scope-Kennungen dieser Welle: ${wave.scopeIds.join(', ')}`
          : 'Keine Scope-Zuordnung an den Objekten dieser Welle erfasst.'}
      </span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * (3) Was weiß ich über die Datenlage?
 * --------------------------------------------------------------------------- */

function DatenlageSection({ model }: { model: MissionControlModel }) {
  const headingId = sectionHeadingId('datenlage');

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.datenlage.title}</h2>

      <h3>Gezählte Beobachtungen</h3>
      <p className="sv-edge-note">
        Jede Beobachtung nennt ihre Zählung, die Menge, auf die sie sich bezieht, und die Regel,
        nach der gezählt wurde. Die Reihenfolge ist eine feste Katalogreihenfolge und sagt nichts
        über Bedeutung aus. Eine Zählung von 0 bleibt sichtbar, weil auch sie eine Aussage über den
        Datenbestand ist.
      </p>
      <ul className="sv-items">
        {model.observations.map((observation) => (
          <ObservationItem key={observation.id} observation={observation} />
        ))}
      </ul>

      <h3>Was diese Zählungen nicht sind</h3>
      <p className="tw-muted">
        Hier wird gezählt und benannt, nicht bewertet: Es gibt keine Gewichtung, keine Sortierung
        nach Bedeutung und keine abgeleitete Handlung. Ob eine fehlende Angabe fachlich zulässig
        ist, sagt der Datenbestand nicht – diese Seite behauptet es deshalb auch nicht.
      </p>
    </section>
  );
}

function ObservationItem({ observation }: { observation: DataObservation }) {
  return (
    <li>
      <span className="sv-item-name">{observation.label}</span>
      <span className="sv-item-meta">
        {` · ${observation.count} von ${observation.total} ${observation.totalLabel}`}
      </span>
      <span className="sv-item-note">{`So wird gezählt: ${observation.method}`}</span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * (4) Wo steige ich ein?
 * --------------------------------------------------------------------------- */

function EinstiegSection({ model, tenant }: { model: MissionControlModel; tenant: DemoTenant }) {
  const headingId = sectionHeadingId('einstieg');

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{MISSION_SECTIONS.einstieg.title}</h2>

      <h3>Orte mit Bestand dieses Mandanten</h3>
      <p className="sv-edge-note">
        {/* Stabile Orte nach Dok. 06 06-D01 (Signatur seit dem Review-Pass nur im Kommentar). */}
        Die Orte der Navigation bleiben stabil: ein Ort ohne Bestand wird benannt, nicht
        ausgeblendet. Die Bestandsangabe zählt ausschließlich den aktiven Mandanten.
      </p>
      <ul className="sv-items">
        {model.placeEntryPoints.map((entry) => (
          <PlaceEntryItem key={entry.placeId} entry={entry} />
        ))}
      </ul>

      <h3>Ein Objekt-Einstieg je Objektfamilie</h3>
      <p className="sv-edge-note">{model.objectEntryRule}</p>
      {model.objectEntryPoints.length > 0 ? (
        <ul className="sv-items">
          {model.objectEntryPoints.map((entry) => (
            <ObjectEntryItem key={entry.objectId} entry={entry} />
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind im Datenbestand keine Objekte modelliert, in die
          eingestiegen werden könnte. Der digitale Zwilling dieses Mandanten bleibt erreichbar und
          zeigt denselben – leeren – Stand.
        </p>
      )}
    </section>
  );
}

/**
 * `.sv-item-meta` ist eine INLINE-Auszeichnung (globals.css: nur Farbe und Schriftgröße),
 * `.sv-item-note` dagegen `display: block`. Je Listeneintrag steht deshalb höchstens EINE
 * Metazeile; jede weitere Zeile ist eine Note. Zwei aufeinanderfolgende Metazeilen liefen im
 * Browser sonst zu einem Fließtext zusammen, weil JSX den reinen Zeilenumbruch zwischen zwei
 * Elementen entfernt (Review-Fix, Muster aus `components/isms/IsmsCards.tsx`).
 */
function PlaceEntryItem({ entry }: { entry: PlaceEntryPoint }) {
  return (
    <li>
      <Link className="sv-item-name" href={entry.href}>
        {entry.label}
      </Link>
      <span className="sv-item-meta">
        {` · ${entry.stock.map((item) => `${item.count} ${item.label}`).join(' · ')}`}
      </span>
      {/* Leitfrage des Ortes – entfällt, wo der Einstieg sie nicht beantwortet (siehe
          `derivePlaceEntryPoints`). */}
      {entry.question ? <span className="sv-item-note">{entry.question}</span> : null}
      {entry.isEmpty ? (
        /* Leerer Ort wird benannt, nicht versteckt (Dok. 06 06-D01 / §17). */
        <span className="sv-item-note">
          Für diesen Mandanten ist an diesem Ort im Datenbestand nichts modelliert. Der Ort bleibt
          erreichbar und zeigt dort denselben Leerzustand.
        </span>
      ) : null}
    </li>
  );
}

function ObjectEntryItem({ entry }: { entry: ObjectEntryPoint }) {
  return (
    <li>
      <span className="sv-item-name">{`${entry.familyName}: `}</span>
      {/* Route ausschließlich aus dem Modell (`objectDetailHref` mit dem aktiven Mandanten). */}
      <Link href={entry.href}>{entry.name}</Link>
      <span className="sv-item-meta">
        {` · ${entry.objectTypeDisplay} · ${anzahl(
          entry.familyObjectCount,
          'Objekt',
          'Objekte',
        )} dieser Familie in diesem Mandanten`}
      </span>
      {/* Leitfrage der Familie als eigene Zeile (`sv-item-note`, block-level) – siehe
          `PlaceEntryItem`: zwei Metazeilen liefen im Browser zusammen. */}
      <span className="sv-item-note">{entry.familyLeitfrage}</span>
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Ehrlichkeitsblock – benannte Datenlücke (Dok. 06 §17 „Partial data")
 * --------------------------------------------------------------------------- */

/**
 * Was auf dieser Seite fehlt und WARUM – als Datenlücke, nicht als Roadmap.
 *
 * Bewusst ohne Termin- und ohne Funktionsversprechen („kommt bald" wäre eine Zusage, die dieses
 * Work Package nicht geben darf). Die Historienaussage ist aus den Daten abgeleitet; die Aussagen
 * über fehlende Aufgabenobjekte (`Task`) und über die fehlenden Vertragsfelder sind Aussagen über
 * Datenbestand und Objektvertrag und werden im Render-Test gegen den Datenbestand festgenagelt,
 * damit sie nicht still veralten.
 */
function HonestySection({ model }: { model: MissionControlModel }) {
  return (
    <section aria-labelledby="heute-luecke">
      <h2 id="heute-luecke">Was hier bewusst nicht steht</h2>
      <p className="sv-edge-note">
        Drei im Konzept beschriebene Bausteine dieses Ortes fehlen. Die Ursache ist je Baustein eine
        andere und steht darunter jeweils dabei – Datenbestand, Datenmodell oder Anmeldung. Sie
        werden hier benannt statt verborgen: ein leerer Platzhalter oder ein erfundener Inhalt wäre
        die schlechtere Antwort.
      </p>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Morning Mission (Tagesmission mit Reihenfolge)</span>
          {/* Kanonischer Typname: für „Task" führt die einzige Quelle deutscher
              Objekttyp-Glossen (`OBJECT_TYPE_LABEL_DE` in `lib/twin/data.ts`) bewusst KEINE
              Übersetzung – hier wird keine erfunden (Review-Fix).

              WP-017: Der Satz nannte vorher auch „Decision Record" als nicht vorhanden. Seit der
              Entscheidungsschicht im Datenbestand wäre das falsch; er ist deshalb auf „Task"
              verengt. Die Begründung trägt weiterhin: es fehlen die Aufgabenobjekte UND die
              Vertragsfelder für Fälligkeit, Aufwand, Kapazität und Priorität. */}
          <span className="sv-item-note">
            Ursache in der Datenlage: Der Datenbestand enthält keine Objekte des Typs „Task" – der
            Typ steht im kanonischen Katalog, ist aber in keinem Mandanten angelegt. Das Datenmodell
            kennt außerdem kein Feld für Fälligkeit, Aufwand, Kapazität oder Priorität. Ohne
            Aufgaben und ohne diese Angaben wäre jede Tagesmission und jede Reihenfolge erfunden.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Veränderungsfeed („neu seit …")</span>
          {/* WP-017: Ablösung ≠ Änderungsfeed. Die Historienaussage darunter kann seit der
              Entscheidungsschicht „belegt" lauten – daraus darf kein Ereignisstrom werden. */}
          <span className="sv-item-note">
            Ursache im Datenmodell: Es gibt kein Ereignis- und kein Änderungsobjekt; die einzige
            Zeitangabe, die die Systemachse überhaupt kennt, ist der Erfassungszeitpunkt – und der
            ist keine Änderung. Eine erfasste fachliche Ablösung verbindet zwei eigenständige
            Objekte und sagt, welcher Stand welchen ersetzt hat; sie ist damit kein Ereignis- und
            kein Änderungsfeed und ergibt kein „neu seit …". Aus den Daten abgeleitete
            Historienlage: {model.historyState.statement}
          </span>
        </li>
        <li>
          <span className="sv-item-name">Wiederaufnahme („seit meinem letzten Besuch")</span>
          <span className="sv-item-note">
            Ursache in der Datenlage: Die Anmeldung speichert ausschließlich den gewählten Mandanten
            und optional eine gewählte Rolle – keinen Besuchszeitpunkt, keinen bestätigten Zustand
            und keinen Entwurf. Ein Vergleich mit einem früheren Besuch wäre damit nicht belegt,
            sondern behauptet.
          </span>
        </li>
      </ul>
      <p className="tw-muted">
        Diese Aufzählung ist eine Aussage über den heutigen Datenbestand, kein Zeitplan: ob und wann
        die genannten Bausteine entstehen, sagt diese Seite bewusst nicht.
      </p>
    </section>
  );
}
