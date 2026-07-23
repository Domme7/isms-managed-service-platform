/**
 * Kunden-Startseite „verwalten" – Stufe-1-Näherung an den Customer Workspace (WP-006 Slice 1).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen):
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Kunden" („Portfolio und Customer
 *    Workspaces — Für Kundenrollen ggf. direkt der eigene Workspace") und Abschnitt „Customer
 *    Workspace" bzw. Screenkatalog S02 „Customer Workspace" (Leitfrage „Wie verstehe ich diesen
 *    Kunden in einer Minute?").
 *  - Dok. 03, Abschnitt „Kanonisches Rollenmodell" (Kundensphäre R01–R06, Spalte „Sphäre")
 *    und Abschnitt „Zugriff, Datenschutz und Vertrauensgrenzen" (Scope-basiert, Need-to-know)
 *    sowie „Anfängererlebnis" (Leerzustand = Einladung, keine leere Plattform).
 *
 * PERSPEKTIVE, KEINE AUTORISIERUNG: Die Kundensphäre ist hier Rahmung und wird auf DIESER Seite
 * strikt eingehalten (nur der aktive Mandant, keine mandantenübergreifende Auswertung, keine
 * Betreiber-Inhalte). Die technische Erzwingung produktweit ist Auth-Territorium (Dok. 19,
 * O-WP006-04). Rollen sind Perspektive, keine Rechte (`roles.ts`-Grundsatz).
 *
 * READ-ONLY, EHRLICH, KEINE ERFINDUNG: Es werden ausschließlich belegte Objekte des aktiven
 * Mandanten gezeigt (`lib/kunden/data.ts`). Der Customer-Workspace-Kopf aus Dok. 06 (Strategie-
 * DNA, Zielprofil, Managed-Service-Anteil, Trend, Puls, Ursache-Wirkungs-Ketten, Hebel,
 * Zeitachse) hat heute keinen Datenträger und wird BENANNT statt simuliert (DR-0008-Grenze:
 * keine Bewertung ohne Datenträger). Keine Preise (Preis-Guardrail bleibt streng, O-KUNDE-01).
 *
 * Heading-Hierarchie: h1 (Kundenbereich) > h2 (Abschnitt) > h3 (Karte/Block) > h4 (Leerzustand).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { worldForRole, type DemoRole } from '../../lib/shell/roles';
import { ROLLEN_REICHWEITE_SATZ } from '../../lib/shell/sphaere';
import { buildCustomerWorkspace, type WorkspaceObjectRef } from '../../lib/kunden/data';
import type { ManagedServiceView } from '../../lib/services/data';
import { objectDetailHref } from '../../lib/twin/routes';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

export function KundenStartContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Einstieg (DR-0009): die Seite rendert vollständig, ohne Rollen-Rahmung. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const model = buildCustomerWorkspace(tenant);

  return (
    <>
      <p className="tw-eyebrow">Kunden · Kundenbereich</p>
      <h1>Kundenbereich</h1>

      {/* Leitfrage aus Kundensicht (O-WP006-07): Die S02-Leitfrage „Wie verstehe ich diesen
          Kunden in einer Minute?" ist aus Beraterperspektive formuliert – für Kundenrollen ist
          „dieser Kunde" das eigene Unternehmen. Sinngemäße, kundengerechte Formulierung; bewusst
          NICHT als PDF-Zitat ausgegeben. */}
      <p className="tw-question">
        Was verwalte ich für {tenant.display_name} – welche Scopes, Ziele, Services und Nachweise
        sind erfasst?
      </p>

      {/* ANTWORT ZUERST (WP-028-Fixpass, DR-0013 Nr. 1 – Product-Auflage): Über der Falz stand
          bis hierher ausschließlich Meta-Text („Alles an einem Ort … Read-only und ohne Preise;
          Buchung und Aktivierung folgen …") – vier Zeilen Vorbehalt, bevor eine einzige Zahl
          erschien, obwohl `buildCustomerWorkspace` alle vier Zählwerte längst bereitstellt.
          Jetzt führt die gezählte Antwort; die Grenze „ohne Preise, keine Buchung" steht
          unverändert und ausführlicher unter „Noch nicht hinterlegt" am Seitenende, die
          Mandantengrenze im Satz darunter. Nichts entfernt, nur umgestellt. */}
      <p className="tw-lead">
        {model.isEmpty ? (
          <>
            Für <strong>{tenant.display_name}</strong> sind bisher keine Scopes, Ziele, Services
            oder Nachweise erfasst.
          </>
        ) : (
          <>
            Für <strong>{tenant.display_name}</strong> sind{' '}
            <strong>{anzahl(model.scopeIds.length, 'Scope', 'Scopes')}</strong>,{' '}
            <strong>
              {anzahl(model.objectives.length, 'Ziel oder Kennzahl', 'Ziele und Kennzahlen')}
            </strong>
            ,{' '}
            <strong>{anzahl(model.services.length, 'Managed Service', 'Managed Services')}</strong>{' '}
            und <strong>{anzahl(model.evidence.length, 'Nachweis', 'Nachweise')}</strong> erfasst
            {model.context.recordedOn && model.context.recordedOnDisplay ? (
              <>
                , zuletzt im System erfasst am{' '}
                <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
              </>
            ) : null}
            . Gezählt wird ausschließlich der aktive Mandant.
          </>
        )}
      </p>

      <RollenRahmung role={role} />

      {/* Kontextleiste (Dok. 06, Abschnitt „Sichtbarer Kontext"): Scope und Datenstand beziehen
          sich ausdrücklich auf den aktiven Mandanten – die Leiste widerspricht dem Inhalt nie. */}
      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scopes des Kundenbereichs"
        scopeValue={<ScopeKontextWert scopeIds={model.scopeIds} />}
        datenstandLabel="Datenstand des Kundenbereichs (zuletzt im System erfasst)"
        datenstandValue={
          model.context.recordedOn && model.context.recordedOnDisplay ? (
            <time dateTime={model.context.recordedOn}>{model.context.recordedOnDisplay}</time>
          ) : (
            'keine Erfassung hinterlegt'
          )
        }
      />

      {model.isEmpty ? (
        <EinladungLeererMandant tenant={tenant} />
      ) : (
        <>
          <ScopesSection tenant={tenant} scopeIds={model.scopeIds} />
          <ZieleSection tenant={tenant} objectives={model.objectives} />
          <ServicesSection tenant={tenant} services={model.services} />
          <NachweiseSection tenant={tenant} evidence={model.evidence} />
          <EntscheidungenSection tenant={tenant} decisionCount={model.decisionCount} />
        </>
      )}

      <NochNichtHinterlegt />

      {/* Seitenbausteine-Konvention (Dok. 06, Abschnitt „Verbindliche Seitenbausteine"): ehrliche
          Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
      <SeitenbausteineHinweis ort="kundenstart" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Kundenrollen-Rahmung (Dok. 03, Abschnitt „Kanonisches Rollenmodell", Sphäre)
 * --------------------------------------------------------------------------- */

/**
 * Rahmt die Seite je nach aktiver Sphäre – Hervorhebung, keine Bedingung (die Seite rendert in
 * jedem Fall vollständig). Kundensphäre-Rollen (R01–R06) bekommen die Kundenperspektive; für
 * Betreiber-/Unabhängig-Rollen wird ehrlich gesagt, dass dieser Bereich die Kundensphäre zeigt
 * und die Rolle Perspektive und keine Zugriffsgrenze ist (O-WP006-04). Neutral bleibt neutral.
 */
function RollenRahmung({ role }: { role: DemoRole | null }) {
  if (role === null) {
    return (
      <div className="ht-neutral" role="note">
        <p className="ht-neutral-text">
          <strong>Neutraler Einstieg:</strong> Sie sehen den Kundenbereich ohne Rollen-Rahmung.
          Optional können Sie oben eine Produktrolle wählen; sie ist jederzeit wieder abwählbar.{' '}
          {ROLLEN_REICHWEITE_SATZ}
        </p>
      </div>
    );
  }

  if (role.sphere === 'Kunde') {
    return (
      <div className="ht-neutral" role="note">
        <p className="ht-neutral-text">
          <strong>Kundensphäre – Ihr Unternehmen:</strong> Sie sehen diesen Bereich als {role.name}{' '}
          ({role.responsibility}). Angezeigt wird ausschließlich der aktive Mandant – keine Inhalte
          anderer Mandanten und keine mandantenübergreifende Auswertung.
        </p>
      </div>
    );
  }

  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>Kundensphäre:</strong> Dieser Bereich zeigt ausschließlich den aktiven Mandanten.
        Ihre aktive Rolle {role.name} gehört zur Sphäre „{role.sphere}" ({worldForRole(role).name});
        die Rolle ist hier Perspektive und keine Zugriffsgrenze.
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Scopes (rohe Kennungen – Scopes sind keine Objekte, O-WP014-03)
 * --------------------------------------------------------------------------- */

function ScopesSection({ tenant, scopeIds }: { tenant: DemoTenant; scopeIds: readonly string[] }) {
  return (
    <section aria-labelledby="kunden-scopes">
      <h2 id="kunden-scopes">Scopes</h2>
      <p className="sv-edge-note">
        Scopes ordnen, was zum ISMS gehört. Im Datenmodell sind Scopes keine eigenständigen Objekte;
        angezeigt werden die belegten Scope-Kennungen des aktiven Mandanten.
      </p>
      {scopeIds.length > 0 ? (
        <ul className="sv-items">
          {scopeIds.map((scopeId) => (
            <li key={scopeId}>
              <span className="sv-item-name sv-tech">{scopeId}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} ist keine Scope-Zuordnung erfasst.
        </p>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Ziele und Kennzahlen (Objective / KPI)
 * --------------------------------------------------------------------------- */

function ZieleSection({
  tenant,
  objectives,
}: {
  tenant: DemoTenant;
  objectives: readonly WorkspaceObjectRef[];
}) {
  return (
    <section aria-labelledby="kunden-ziele">
      <h2 id="kunden-ziele">Ziele und Kennzahlen</h2>
      <p className="sv-edge-note">
        Ziele und Kennzahlen des aktiven Mandanten. Ein Zielstatus oder Zielkorridor ist nicht als
        eigener Wert hinterlegt; der Lebenszyklus-Stand ist ein erfasster Stand, kein Prüfergebnis.
      </p>
      {objectives.length > 0 ? (
        <ul className="sv-items">
          {objectives.map((objective) => (
            <WorkspaceObjectItem key={objective.object_id} tenant={tenant} object={objective} />
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind keine Ziele oder Kennzahlen erfasst.
        </p>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Services (mandantenlokal – Wiederverwendung der Managed-Service-Ableitung)
 * --------------------------------------------------------------------------- */

function ServicesSection({
  tenant,
  services,
}: {
  tenant: DemoTenant;
  services: readonly ManagedServiceView[];
}) {
  return (
    <section aria-labelledby="kunden-services">
      <h2 id="kunden-services">Services</h2>
      <p className="sv-edge-note">
        Services, die für den aktiven Mandanten laufen, mit Leistungsversprechen (SLA) und
        Ergebnissen (Deliverables). Ohne Preise. Der vollständige Blick je Service liegt am Ort
        „Services".
      </p>
      {services.length > 0 ? (
        <>
          <ul className="sv-items">
            {services.map((view) => (
              <li key={view.service.object_id}>
                <Link
                  className="sv-item-name"
                  href={objectDetailHref(tenant.tenant_id, view.service.object_id)}
                >
                  {view.service.display_name}
                </Link>
                <span className="sv-item-meta">{` · Stand: ${view.service.lifecycle_status}`}</span>
                <span className="sv-item-note">
                  {`${anzahl(view.slas.length, 'Leistungsversprechen (SLA)', 'Leistungsversprechen (SLA)')} · ${anzahl(
                    view.deliverables.length,
                    'Ergebnis (Deliverable)',
                    'Ergebnisse (Deliverables)',
                  )} erfasst.`}
                </span>
              </li>
            ))}
          </ul>
          <p className="sv-edge-note">
            <Link className="tw-cta" href="/services">
              Alle Services ansehen →
            </Link>
          </p>
        </>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind keine Services erfasst.{' '}
          <Link href="/services">Zum Servicekatalog</Link>.
        </p>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Nachweise (Evidence)
 * --------------------------------------------------------------------------- */

function NachweiseSection({
  tenant,
  evidence,
}: {
  tenant: DemoTenant;
  evidence: readonly WorkspaceObjectRef[];
}) {
  return (
    <section aria-labelledby="kunden-nachweise">
      <h2 id="kunden-nachweise">Nachweise</h2>
      <p className="sv-edge-note">
        Nachweise des aktiven Mandanten mit ihrem Lebenszyklus-Stand – ein erfasster Stand, kein
        Prüfergebnis.
      </p>
      {evidence.length > 0 ? (
        <ul className="sv-items">
          {evidence.map((item) => (
            <WorkspaceObjectItem key={item.object_id} tenant={tenant} object={item} />
          ))}
        </ul>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind keine Nachweise erfasst.
        </p>
      )}
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Entscheidungen (Verweis auf den Ort „Entscheidungen")
 * --------------------------------------------------------------------------- */

function EntscheidungenSection({
  tenant,
  decisionCount,
}: {
  tenant: DemoTenant;
  decisionCount: number;
}) {
  return (
    <section aria-labelledby="kunden-entscheidungen">
      <h2 id="kunden-entscheidungen">Entscheidungen</h2>
      <p>
        {decisionCount > 0
          ? `${anzahl(decisionCount, 'Entscheidung', 'Entscheidungen')} für ${tenant.display_name} erfasst.`
          : `Für ${tenant.display_name} sind keine Entscheidungen erfasst.`}{' '}
        <Link className="tw-cta" href="/entscheidungen">
          Zu den Entscheidungen →
        </Link>
      </p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Gemeinsame Objektzeile (Ziel/Kennzahl/Nachweis) mit Objekt-360-Verweis
 * --------------------------------------------------------------------------- */

/**
 * Verlinkt auf die Objekt-360-Seite AUSSCHLIESSLICH im aktiven Mandanten (`objectDetailHref` mit
 * `tenant.tenant_id`) – ein Link über die Mandantengrenze ist verboten (Dok. 07 §17/P09).
 */
function WorkspaceObjectItem({
  tenant,
  object,
}: {
  tenant: DemoTenant;
  object: WorkspaceObjectRef;
}) {
  return (
    <li>
      <Link className="sv-item-name" href={objectDetailHref(tenant.tenant_id, object.object_id)}>
        {object.name}
      </Link>
      <span className="sv-item-meta">
        {` · ${object.object_type_display} · Stand: ${object.lifecycle_status}`}
      </span>
      {/* Die ausführliche Beschreibung steht auf der Objekt-360-Seite (Verweis über den Namen) –
          hier bleibt die Zeile bewusst knapp (Name, Typ-Glosse, Lebenszyklus-Stand). */}
    </li>
  );
}

/* -----------------------------------------------------------------------------
 * Leerzustand = Einladung (Dok. 03, Abschnitt „Anfängererlebnis"), MANDANTENLOKAL
 * --------------------------------------------------------------------------- */

/**
 * Ehrliche, MANDANTENLOKALE Einladung für Mandanten ohne erfasste Struktur (Dok. 03, Abschnitt
 * „Anfängererlebnis": „Neue Nutzer sehen keine leere Plattform, sondern … eine klare Einladung").
 *
 * KEINE EXISTENZAUSSAGE ÜBER FREMDE MANDANTEN (FINDING-0009-Klasse, Wächter
 * `leerzustand-mandantengrenze`): dieser Text sagt ausschließlich etwas über DIESEN Mandanten.
 * Nächste Schritte verweisen auf den Servicekatalog (Ort „Services") und den geführten
 * Struktur-Assistenten des Kundenbereichs.
 */
function EinladungLeererMandant({ tenant }: { tenant: DemoTenant }) {
  return (
    <section aria-labelledby="kunden-einladung">
      <h2 id="kunden-einladung">Kundenbereich für {tenant.display_name} einrichten</h2>
      <div className="tw-empty" role="note">
        <p style={{ marginTop: 0 }}>
          Für <strong>{tenant.display_name}</strong> sind noch keine Scopes, Ziele, Services oder
          Nachweise hinterlegt. Der Kundenbereich bleibt erreichbar und zeigt ausschließlich, was
          für diesen Mandanten erfasst ist.
        </p>
        <p>
          Nächste Schritte, um {tenant.display_name} aufzubauen: den geführten Struktur-Assistenten
          durchgehen (Scopes, Zielprofil und Rollen) und den Servicekatalog ansehen.
        </p>
        <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
          <Link className="tw-cta" href="/services">
            Servicekatalog ansehen →
          </Link>{' '}
          <Link className="tw-cta" href="/login">
            Mandant wechseln →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Benannte Lücken des Customer Workspace (Dok. 06, Abschnitt „Customer Workspace")
 * --------------------------------------------------------------------------- */

/**
 * Was der Customer Workspace laut Dok. 06 zusätzlich vorsieht und heute keinen Datenträger hat –
 * benannt statt simuliert (DR-0008-Grenze: keine Bewertung ohne Datenträger; DR-0010 Nr. 2:
 * fehlende Träger sichtbar benennen). Bewusst OHNE Termin- oder Funktionsversprechen.
 */
function NochNichtHinterlegt() {
  return (
    <section aria-labelledby="kunden-luecken">
      <h2 id="kunden-luecken">Noch nicht hinterlegt</h2>
      <p className="sv-edge-note">
        Der Kundenbereich soll ein Unternehmen auf einen Blick verständlich machen. Mehrere dafür
        vorgesehene Bausteine haben heute keinen hinterlegten Wert. Sie werden hier benannt statt
        erfunden – ein erfundener Wert wäre die schlechtere Antwort.
      </p>
      <ul className="sv-items">
        <li>
          <span className="sv-item-name">Strategie-DNA und Zielprofil</span>
          <span className="sv-item-note">
            Das Datenmodell kennt diese Strukturen als Typen; für den aktiven Mandanten sind sie
            noch nicht hinterlegt. Sie entstehen im geführten Aufbau (Struktur-Assistent).
          </span>
        </li>
        <li>
          <span className="sv-item-name">Managed-Service-Anteil, Trend und Unternehmenspuls</span>
          <span className="sv-item-note">
            Diese verdichteten Aussagen brauchen einen erfassten Verlauf. Ein solcher Wert ist nicht
            hinterlegt und wird hier nicht errechnet.
          </span>
        </li>
        <li>
          <span className="sv-item-name">
            Ursache-Wirkungs-Ketten, Hebel mit größter Wirkung und Zeitachse
          </span>
          <span className="sv-item-note">
            Sie setzen bewertete Beziehungen und einen Zeitverlauf voraus, die für den aktiven
            Mandanten noch nicht erfasst sind.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Preise und Buchung</span>
          <span className="sv-item-note">
            Preise sind hier nicht hinterlegt. Buchung und Aktivierung folgen in einer späteren
            Stufe nach menschlicher Freigabe.
          </span>
        </li>
        <li>
          <span className="sv-item-name">Eigener Kundenlogin</span>
          <span className="sv-item-note">
            Ein eigener Kundenlogin folgt; heute wählen Sie den Kundenbereich über die Anmeldung.
          </span>
        </li>
      </ul>
      <p className="tw-muted">
        Diese Benennung ist eine Aussage über den heutigen Stand, kein Zeitplan.
      </p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Kleiner Zähl-Helfer (lokal, keine Abhängigkeit zu „Heute")
 * --------------------------------------------------------------------------- */

/** „1 X" / „n Y" – deterministische Ein-/Mehrzahl für belegte Zählungen. */
function anzahl(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
