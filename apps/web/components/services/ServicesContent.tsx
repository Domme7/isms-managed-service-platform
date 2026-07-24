/**
 * Präsentationaler Inhalt des Ortes „Services" (WP-012 Slice 2, read-only).
 *
 * Mandanten-Sicht: Managed Services des aktiven Mandanten, vollständig aus `DEMO_SEED`
 * abgeleitet (nichts hartkodiert/erfunden; keine Preise – der Seed enthält bewusst keine).
 * Empty-State für Mandanten ohne Services (Dok. 06 §17).
 *
 * EINE SPHÄREN-QUELLE (WP-028-Fixpass, Code- und Security-Auflage; DR-0013 Nr. 11 / DR-0012):
 * Ob eine mandantenÜBERGREIFENDE Verdichtung überhaupt erscheint, entscheidet AUSSCHLIESSLICH
 * `kundenSicht(role)` aus `lib/shell/sphaere.ts` – dieselbe Funktion, die den Ort „Kunden"
 * steuert. Bis hierher galt an dieser Stelle eine zweite, eigene Regel (`role.worldId ===
 * 'consulting'`), und die beiden Regeln liefen auseinander:
 *  - R12 (Sphäre „Beide") bekam auf `/twin` das Portfolio, auf `/services` nicht;
 *    der neutrale Einstieg genau umgekehrt.
 *  - Schwerer wog der Text des `else`-Zweigs: JEDE Kundenrolle las auf ihrer eigenen
 *    Serviceseite „Die mandantenübergreifende Portfolio-Sicht ist der Service-Organisation
 *    vorbehalten" – eine Reichweiten- und Existenzaussage über einen mandantenübergreifenden
 *    Bestand, ausgerechnet in der Sphäre, die davon frei sein soll (Dok. 06, Abschnitt
 *    „Sichtbarer Kontext", Kasten CROSS-TENANT-SCHUTZ; FINDING-0009-Klasse).
 * In der Ein-Unternehmens-Sicht wird der Abschnitt deshalb GAR NICHT gerendert: keine
 * Portfolio-Liste und kein Satz über sie. Was diese Rollensicht zeigt, sagt der Ort „Kunden"
 * einmal ruhig (`EigenerMandantEinstieg`) – es muss nicht auf jeder Seite wiederholt werden.
 *
 * DAS IST WEITERHIN KEINE AUTORISIERUNG: eine Anzeige-Verdichtung je Perspektive, keine
 * Sicherheitsgrenze. Serverseitig durchgesetzte Rechte entstehen erst mit Dok. 19.
 *
 * Heading-Hierarchie: h1 (Ort) > h2 (Sektion) > h3 (Service-/Mandantenkarte) > h4 (Karteninhalt).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import type { DemoRole } from '../../lib/shell/roles';
import { kundenSicht, mandantenwechselSichtbar } from '../../lib/shell/sphaere';
import {
  buildPortfolioOverview,
  buildServicesPageContext,
  getManagedServicesForTenant,
} from '../../lib/services/data';
import { PageContextBar } from '../shell/PageContextBar';
import { ScopeKontextWert } from '../shell/ScopeKontext';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';
import { PortfolioOverview } from './PortfolioOverview';
import { ServiceCard } from './ServiceCard';

export function ServicesContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Zustand (DR-0009): Mandanten-Sicht identisch, Portfolio bleibt zu. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  const services = getManagedServicesForTenant(tenant.tenant_id);
  const context = buildServicesPageContext(tenant.tenant_id);
  // EINE Quelle für die Sphäre (s. Kopfnotiz): dieselbe Funktion wie am Ort „Kunden".
  // Ein-Unternehmens-Sicht (Kundenrollen R01–R06, Auditor R07) ⇒ kein mandantenübergreifender
  // Abschnitt, auch nicht als Satz über ihn.
  const zeigtPortfolio = kundenSicht(role) === 'portfolio';

  return (
    <>
      <p className="tw-eyebrow">Services · Managed-Service-Schicht</p>
      <h1>Services</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation", S09). */}
      <p className="tw-question">
        Welche Services laufen für {tenant.display_name} und was liefern sie?
      </p>

      {/* Quellanker der Verkaufslogik-Grenze: Dok. 13 MS15 (Signatur seit dem Review-Pass nur
          noch hier im Kommentar – Konzept-Jargon gehört nicht in den Produkttext). */}
      <p className="tw-lead">
        Read-only Blick auf die Managed-Service-Daten des aktiven Mandanten: Leistungsversprechen,
        SLA, Deliverables und Wirkungsbeitrag – aus demselben Datenmodell wie der digitale Zwilling.
        Ohne Preise, ohne Buchung, ohne Verkaufslogik.
      </p>

      {/* Verweis auf die Katalogstruktur des Konzepts (WP-006 Slice 2, `/services/katalog`):
          Servicefamilien, Offers, Service-Tiefen und Pakete zum Ansehen – preisfrei, ohne Buchung. */}
      <p className="sv-edge-note">
        <Link className="tw-cta" href="/services/katalog">
          Servicekatalog ansehen (Familien, Offers, Tiefen, Pakete) →
        </Link>
      </p>

      {/* Kontextleiste (WP-020 Slice 1, Dok. 06 „Sichtbarer Kontext"): Scope und Datenstand
          beziehen sich ausdrücklich auf die HIER GEZEIGTEN Managed Services des aktiven
          Mandanten – die Leiste widerspricht damit nie dem Seiteninhalt. */}
      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Scopes der Managed Services"
        scopeValue={<ScopeKontextWert scopeIds={context.scopeIds} />}
        datenstandLabel="Datenstand der Managed Services (zuletzt im System erfasst)"
        datenstandValue={
          context.recordedOn && context.recordedOnDisplay ? (
            <time dateTime={context.recordedOn}>{context.recordedOnDisplay}</time>
          ) : (
            'kein Managed Service erfasst'
          )
        }
      />

      <section aria-labelledby="mandanten-services">
        {/* Zustandstreue (UX-Review MINOR-1): auch „Review"/„konfiguriert" werden gelistet –
            daher neutral „Managed Services", der Status steht je Karte daneben. */}
        <h2 id="mandanten-services">Managed Services für {tenant.display_name}</h2>
        {services.length > 0 ? (
          <ul className="sv-list">
            {services.map((view) => (
              // Objekt-Links dieser Karte (WP-014 Slice 2) tragen ausschließlich den AKTIVEN
              // Mandanten der Session-Simulation – denselben, aus dem die Services stammen.
              <ServiceCard key={view.service.object_id} view={view} tenantId={tenant.tenant_id} />
            ))}
          </ul>
        ) : (
          <EmptyServices tenant={tenant} mandantwechselSichtbar={mandantenwechselSichtbar(role)} />
        )}
      </section>

      {/* Mandantenübergreifende Verdichtung NUR in der Portfolio-Sphäre. In der
          Ein-Unternehmens-Sicht steht hier nichts – kein Abschnitt, keine Überschrift, kein
          Satz über einen mandantenübergreifenden Bestand (s. Kopfnotiz). */}
      {zeigtPortfolio ? <PortfolioOverview entries={buildPortfolioOverview()} /> : null}

      {/* Seitenbausteine-Konvention (WP-020, Dok. 06 „Verbindliche Seitenbausteine"):
          ehrliche Benennung der Bausteine, die der Datenbestand hier (noch) nicht trägt. */}
      <SeitenbausteineHinweis ort="services" />
    </>
  );
}

/**
 * Ehrlicher Empty-State für Mandanten ohne Services (Finovia/MediCore, Dok. 06 §17).
 *
 * MANDANTENLOKAL (WP-020 Slice 1). Hier stand bis 2026-07-23: „Services laufen derzeit für
 * <Namen fremder Mandanten>; weitere Mandanten folgen in späteren Ausbaustufen." Das war eine
 * Existenzaussage über FREMDE Mandanten und damit eine Mandantengrenzverletzung (Dok. 07,
 * Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" / P09) – dieselbe Fehlerklasse, die
 * auf `/isms` (WP-013) und `/entscheidungen` (WP-017) bereits behoben wurde; dieses dritte
 * Vorkommen bestand seit WP-012 unbemerkt und wurde im Cross-Tenant-Umbau gefunden. Der
 * Leerzustand sagt jetzt ausschließlich etwas über DIESEN Mandanten; der Wächter
 * `components/__tests__/leerzustand-mandantengrenze.test.tsx` prüft das mechanisch.
 * (Die Portfolio-Übersicht der Consulting & Service World bleibt davon getrennt: eine
 * dokumentierte mandantenübergreifende Verdichtung, kein Leerzustand – O-WP012-03.)
 */
function EmptyServices({
  tenant,
  mandantwechselSichtbar,
}: {
  tenant: DemoTenant;
  /** Sphärengerecht (Nachfix nach Gate-Runde 2): steht der Mandantenwechsel überhaupt zur Verfügung? */
  mandantwechselSichtbar: boolean;
}) {
  return (
    <div className="tw-empty" role="note">
      <h3>Keine Managed Services für {tenant.display_name}</h3>
      <p style={{ marginTop: 0 }}>
        Für <strong>{tenant.display_name}</strong> sind im aktuellen Datenbestand keine Managed
        Services modelliert. Der Ort bleibt erreichbar und zeigt hier ausschließlich, was für diesen
        Mandanten belegt ist.
      </p>
      <p className="tw-muted">
        Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Datenbestand
        abgeleitete Services – keine erfundenen Angebote und keine Preise.
      </p>
      {/* Nächster Schritt im Empty-State (Dok. 06 §17, UX-Review MINOR-3). SPHÄRENGERECHT
          (Nachfix nach Gate-Runde 2): Die „Mandant wechseln"-CTA erscheint nur, wenn der
          Mandantenwechsel für diese Sicht überhaupt angeboten wird (`mandantenwechselSichtbar`) –
          in der Ein-Unternehmens-Sicht (Kundenrollen, Auditor) gäbe es keinen Wechsel, den die CTA
          anbieten könnte, deshalb entfällt sie ersatzlos (kein Ersatzlink, keine Behauptung). */}
      {mandantwechselSichtbar ? (
        <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
          <Link className="tw-cta" href="/login">
            Mandant wechseln →
          </Link>
        </p>
      ) : null}
    </div>
  );
}
