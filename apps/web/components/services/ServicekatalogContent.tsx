/**
 * Servicekatalog ansehen (`/services/katalog`, WP-006 Slice 2) – read-only, VOLLSTÄNDIG PREISFREI.
 *
 * QUELLEN (Regel Null, am PDF gegengelesen): Dok. 14, Abschnitte „Servicefamilien und
 * vollständiger Katalog", „Service-Tiefen statt starrer Goldpakete", „Paketarchitektur",
 * „Kommerzielle Verfassung" (CP11) und „Preis- und Angebots-UX". Die worttreuen Strukturen
 * leben als react-freie Konstanten in `lib/services/katalog.ts` (Quellkommentar je Konstante).
 *
 * ZWEI HERKÜNFTE, SICHTBAR GETRENNT, KEIN ERFUNDENES MAPPING:
 *  (a) „Katalogstruktur aus dem Konzept" – SF/SO/Tiefen/Pakete aus Dok. 14 (Code-Konstanten).
 *  (b) „Aktive Services dieses Mandanten aus dem Datenbestand" – Seed-Service-Instanzen
 *      (`lib/services/data.ts`, ausschließlich der aktive Mandant). Die Seed-Services tragen
 *      KEINEN Offer-Bezug; es wird keine Zuordnung Instanz↔Offer behauptet.
 *
 * ANSEHEN, NICHT BUCHEN: kein Buchungs-/Aktivierungs-Element, keine Empfehlung, kein Dark
 * Pattern. Buchung/Aktivierung folgt in einer späteren Stufe nach menschlicher Freigabe (Dok. 04
 * J05; Dok. 16 16-AC09/16-D12; Dok. 14, Abschnitt „Preis- und Angebots-UX").
 *
 * PREISFREIHEIT ABSOLUT (O-KUNDE-01, DR-0008): kein Währungszeichen, kein Betrag, kein Band.
 * Die Preisstellen der Quellstruktur (Angebotskarte-Frage 8; Paketbestandteil „illustrative
 * Preisbandbreite") erscheinen als BENANNTE Lücke.
 *
 * KUNDENSPHÄRE (Sicherheit): Der Katalog ist mandantenneutral; die „aktiven Services"-Hälfte
 * zeigt AUSSCHLIESSLICH den aktiven Mandanten – keine mandantenübergreifende Aggregation, keine
 * Betreiber-Portfolio-Inhalte (Dok. 03, „Zugriff, Datenschutz und Vertrauensgrenzen").
 *
 * Heading-Hierarchie: h1 (Servicekatalog) > h2 (Abschnitt) > h3 (Karte/Block).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { worldForRole, type DemoRole } from '../../lib/shell/roles';
import {
  ANGEBOTSKARTE_FRAGEN,
  LEITPLANKEN,
  PAKETFAMILIEN,
  PAKET_BESTANDTEILE,
  PAKET_PRINZIP,
  SERVICEFAMILIEN,
  SERVICE_OFFERS,
  SERVICE_TIEFEN,
  TIEFEN_HINWEIS,
} from '../../lib/services/katalog';
import { buildServicesPageContext, getManagedServicesForTenant } from '../../lib/services/data';
import { objectDetailHref } from '../../lib/twin/routes';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

/** Sichtbarer Text der Preis-Lücke – EINE Quelle (O-KUNDE-01, kein Betrag, keine Zahl). */
const PREIS_LUECKE_TEXT =
  'in dieser Stufe nicht hinterlegt – der Katalog ist bewusst ohne Preise. Wie ein Preis ' +
  'gebildet wird, entsteht erst mit einem freigegebenen Angebot in einer späteren Stufe.';

export function ServicekatalogContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Einstieg (DR-0009): der Katalog rendert vollständig, ohne Rollen-Rahmung. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const services = getManagedServicesForTenant(tenant.tenant_id);
  const context = buildServicesPageContext(tenant.tenant_id);

  return (
    <>
      <p className="tw-eyebrow">Services · Katalog</p>
      <h1>Servicekatalog</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation"). */}
      <p className="tw-question">
        Welche Servicefamilien, Offers, Service-Tiefen und Pakete sieht der Katalog vor?
      </p>

      <p className="tw-lead">
        Zum Ansehen: die Katalogstruktur aus dem Konzept – ohne Preise, ohne Buchung. Eine Buchung
        oder Aktivierung folgt in einer späteren Stufe erst nach menschlicher Freigabe; hier gibt es
        keine Auswahl, keine Empfehlung und keinen Warenkorb.
      </p>

      <RollenRahmung role={role} />

      {/* Kontextleiste: Scope und Datenstand beziehen sich ausdrücklich auf die „aktiven
          Services"-Hälfte des aktiven Mandanten – die Katalogstruktur selbst ist mandantenneutral. */}
      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scopes der aktiven Services dieses Mandanten"
        scopeValue={<ScopeKontextWert scopeIds={context.scopeIds} />}
        datenstandLabel="Datenstand der aktiven Services (zuletzt im System erfasst)"
        datenstandValue={
          context.recordedOn && context.recordedOnDisplay ? (
            <time dateTime={context.recordedOn}>{context.recordedOnDisplay}</time>
          ) : (
            'kein aktiver Service erfasst'
          )
        }
      />

      <HerkunftHinweis />

      {/* Herkunft (a): Katalogstruktur aus dem Konzept. */}
      <ServicefamilienSection />
      <ServiceOffersSection />
      <ServiceTiefenSection />
      <PaketarchitekturSection />
      <AngebotskarteSection />
      <LeitplankenSection />

      {/* Herkunft (b): aktive Services dieses Mandanten aus dem Datenbestand – klar getrennt. */}
      <AktiveServicesSection tenant={tenant} services={services} />

      <SeitenbausteineHinweis ort="servicekatalog" />
    </>
  );
}

/* -----------------------------------------------------------------------------
 * Rollen-Rahmung (Perspektive, keine Autorisierung)
 * --------------------------------------------------------------------------- */

function RollenRahmung({ role }: { role: DemoRole | null }) {
  if (role === null) {
    return (
      <div className="ht-neutral" role="note">
        <p className="ht-neutral-text">
          <strong>Neutraler Einstieg:</strong> Sie sehen den Servicekatalog ohne Rollen-Rahmung. Der
          Katalog erklärt, was das Produkt vorsieht – er verkauft nichts und aktiviert nichts.
        </p>
      </div>
    );
  }
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>Ansehen als {role.name}</strong> ({worldForRole(role).name}): Der Katalog ist eine
        Erklärung des Konzepts. Er ändert keine Daten, bucht nichts und ist keine Empfehlung.
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Herkunfts-Hinweis: zwei getrennte Herkünfte, kein Mapping
 * --------------------------------------------------------------------------- */

function HerkunftHinweis() {
  return (
    <div className="tw-empty" role="note">
      <p style={{ marginTop: 0 }}>
        Diese Seite zeigt <strong>zwei getrennte Herkünfte</strong>:
      </p>
      <ul className="sv-items" style={{ marginBottom: 0 }}>
        <li>
          <span className="sv-item-name">Katalogstruktur aus dem Konzept</span>
          <span className="sv-item-note">
            Servicefamilien, Service Offers, Service-Tiefen und Pakete – eine Konzeptstruktur, kein
            Datenbestand eines Mandanten.
          </span>
        </li>
        <li>
          <span className="sv-item-name">
            Aktive Services dieses Mandanten aus dem Datenbestand
          </span>
          <span className="sv-item-note">
            Die tatsächlich erfassten Services des aktiven Mandanten. Sie tragen keinen Bezug zu den
            Offers des Konzepts; eine Zuordnung wird nicht behauptet.
          </span>
        </li>
      </ul>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Servicefamilien (SF01–SF12)
 * --------------------------------------------------------------------------- */

function ServicefamilienSection() {
  return (
    <section aria-labelledby="katalog-familien">
      <h2 id="katalog-familien">Servicefamilien</h2>
      <p className="sv-edge-note">
        Zwölf Familien gruppieren fachlich verwandte Services (Navigation und Portfolio-Struktur).
        Eine Familie ist noch nicht kaufbar. Je Familie: primärer Outcome und typischer Käufer.
      </p>
      <ul className="sv-items">
        {SERVICEFAMILIEN.map((familie) => (
          <li key={familie.id}>
            <span className="sv-item-name">{familie.name}</span>
            <span className="sv-item-meta">{` · Käufer: ${familie.kaeufer}`}</span>
            <span className="sv-item-note">{familie.outcome}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Kanonische Service Offers (SO01–SO15)
 * --------------------------------------------------------------------------- */

function ServiceOffersSection() {
  return (
    <section aria-labelledby="katalog-offers">
      <h2 id="katalog-offers">Kanonische Service Offers</h2>
      <p className="sv-edge-note">
        Fünfzehn kaufbare Offers. Je Offer: Standardergebnis und typischer Rhythmus. Der Preis ist
        hier bewusst nicht Teil der Karte (siehe Angebotskarte, Frage 8).
      </p>
      <ul className="sv-items">
        {SERVICE_OFFERS.map((offer) => (
          <li key={offer.id}>
            <span className="sv-item-name">{offer.name}</span>
            <span className="sv-item-meta">{` · Rhythmus: ${offer.rhythmus}`}</span>
            <span className="sv-item-note">{offer.ergebnis}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Service-Tiefen (L1–L4)
 * --------------------------------------------------------------------------- */

function ServiceTiefenSection() {
  return (
    <section aria-labelledby="katalog-tiefen">
      <h2 id="katalog-tiefen">Service-Tiefen</h2>
      <p className="sv-edge-note">
        Vier Tiefen statt starrer Goldpakete: sie beschreiben Verantwortung und Delivery-Intensität,
        nicht Prestige. Je Tiefe: Rolle von Kunde und Provider und wofür sie geeignet ist.
      </p>
      <ul className="sv-items">
        {SERVICE_TIEFEN.map((tiefe) => (
          <li key={tiefe.id}>
            <span className="sv-item-name">{`${tiefe.kurzname} — ${tiefe.beschreibung}`}</span>
            <span className="sv-item-note">
              {`Kunde: ${tiefe.kunde}. Provider: ${tiefe.provider}. Geeignet für: ${tiefe.geeignetFuer}.`}
            </span>
          </li>
        ))}
      </ul>
      <p className="sv-edge-note">{TIEFEN_HINWEIS}</p>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Paketarchitektur (6 Paketfamilien + Paketbestandteile mit Preis-Lücke)
 * --------------------------------------------------------------------------- */

function PaketarchitekturSection() {
  return (
    <section aria-labelledby="katalog-pakete">
      <h2 id="katalog-pakete">Paketarchitektur</h2>
      <p className="sv-edge-note">{PAKET_PRINZIP}</p>

      <h3 className="tw-card-title">Empfohlene Paketfamilien</h3>
      <ul className="sv-items">
        {PAKETFAMILIEN.map((paket) => (
          <li key={paket.name}>
            <span className="sv-item-name">{paket.name}</span>
            <span className="sv-item-meta">{` · Typische Tiefe: ${paket.typischeTiefe}`}</span>
            <span className="sv-item-note">
              {paket.zielbild}
              {` Enthaltene Kern-Offers: ${paket.kernOffers}.`}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="tw-card-title">Was jedes Paket enthält</h3>
      <ul className="sv-items">
        {PAKET_BESTANDTEILE.map((teil) => (
          <li key={teil.text}>
            {teil.istPreisluecke ? (
              <>
                <span className="sv-item-name">Eine Preisangabe</span>
                <span className="sv-item-note">{PREIS_LUECKE_TEXT}</span>
              </>
            ) : (
              <span className="sv-item-name">{teil.text}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Angebotskarte je Service (10 Fragen, Frage 8 = Preis-Lücke)
 * --------------------------------------------------------------------------- */

function AngebotskarteSection() {
  return (
    <section aria-labelledby="katalog-angebotskarte">
      <h2 id="katalog-angebotskarte">Angebotskarte je Service</h2>
      <p className="sv-edge-note">
        Jeder Service wird im Katalog mit derselben Struktur beschrieben – zehn Fragen. Frage 8
        (Preisbildung) ist in dieser Stufe eine benannte Lücke: der Katalog bleibt preisfrei.
      </p>
      <ol className="sv-items">
        {ANGEBOTSKARTE_FRAGEN.map((frage) => (
          <li key={frage.nummer}>
            <span className="sv-item-name">{frage.frage}</span>
            {frage.istPreisluecke ? (
              <span className="sv-item-note">{PREIS_LUECKE_TEXT}</span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Leitplanken (CP11, Verbot der automatischen Buchung, keine Goldpakete)
 * --------------------------------------------------------------------------- */

function LeitplankenSection() {
  return (
    <section aria-labelledby="katalog-leitplanken">
      <h2 id="katalog-leitplanken">Leitplanken des Katalogs</h2>
      <p className="sv-edge-note">
        Was der Katalog ausdrücklich einhält, damit er kein Verkaufswerkzeug wird.
      </p>
      <ul className="sv-items">
        {LEITPLANKEN.map((planke) => (
          <li key={planke.titel}>
            <span className="sv-item-name">{planke.titel}</span>
            <span className="sv-item-note">{planke.beschreibung}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -----------------------------------------------------------------------------
 * Aktive Services dieses Mandanten (Datenbestand, KEIN Offer-Mapping)
 * --------------------------------------------------------------------------- */

function AktiveServicesSection({
  tenant,
  services,
}: {
  tenant: DemoTenant;
  services: ReturnType<typeof getManagedServicesForTenant>;
}) {
  return (
    <section aria-labelledby="katalog-aktive">
      <h2 id="katalog-aktive">Aktive Services dieses Mandanten</h2>
      <p className="sv-edge-note">
        Aus dem Datenbestand des aktiven Mandanten – getrennt von der Katalogstruktur oben. Diese
        Services tragen keinen Bezug zu den Offers des Konzepts; eine Zuordnung wird nicht
        behauptet. Ohne Preise.
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
                  {`${view.slas.length} Leistungsversprechen (SLA) · ${view.deliverables.length} Ergebnisse (Deliverables) erfasst.`}
                </span>
              </li>
            ))}
          </ul>
          <p className="sv-edge-note">
            <Link className="tw-cta" href="/services">
              Alle Services des Mandanten ansehen →
            </Link>
          </p>
        </>
      ) : (
        <p className="tw-empty" role="note">
          Für {tenant.display_name} sind keine aktiven Services erfasst. Die Katalogstruktur oben
          bleibt sichtbar; sie ist eine Erklärung des Konzepts, kein Datenbestand.
        </p>
      )}
    </section>
  );
}
