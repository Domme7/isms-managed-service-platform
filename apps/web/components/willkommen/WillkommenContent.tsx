/**
 * Produkt-Landing VOR der Anmeldung (Owner-Idee, DR-0015 Nr. 7; moderne Bildsprache DR-0014).
 *
 * WARUM EINE EIGENE ROUTE (`/willkommen`) STATT EINES VORSPANNS AUF `/login`:
 * Eine Erklärseite und ein Anmelde-Formular beantworten zwei verschiedene Fragen („Was ist das?"
 * vs. „Wie komme ich rein?"). Eine eigene Route hält beide fokussiert, gibt der Erklärung Raum
 * für die moderne Bildsprache (DR-0014) und ist für Pitch/Portfolio/Investoren die erste,
 * absichtsvolle Fläche. `/` führt Nicht-Angemeldete hierher; von hier führt ein CTA zur
 * Anmeldung. Die Anmeldung selbst trägt die getrennten Berater-/Kunden-Welten (DR-0012/DR-0015).
 *
 * EHRLICHKEIT BLEIBT SUBSTANZ (DR-0011/DR-0013): Der Text nennt ausschließlich, was die Plattform
 * IST und WILL – aus der Produktbeschreibung der `CLAUDE.md`. KEINE erfundenen Zahlen, KEINE
 * Kundenlogos, KEINE Preise, KEINE Impersonation realer Organisationen (DR-0015). Der
 * Differenzierer „Antwort-Modus" ist selbst eine Ehrlichkeits-Aussage: Zahlen mit Nenner,
 * benannte Datenlücken, kein erfundener Score.
 *
 * QUELLEN (Regel Null): Die vier rollenbezogenen Erlebniswelten und ihre Leitfragen kommen
 * WÖRTLICH aus `lib/shell/roles.ts` (`EXPERIENCE_WORLDS`, abgeleitet aus Dok. 06 §5) – nicht
 * hier erfunden. Die Produktbeschreibung ist die der Projektverfassung.
 *
 * Rein präsentational (keine Hooks) – deterministisch in den Wächtern renderbar.
 *
 * Modern & barrierearm: eigene `.wk-*`-Klassen auf den `--ck-*`-Design-Tokens (hell/dunkel-fähig,
 * flach, farbig); jede Farbe steht nie allein, sondern mit Text/Form (06-D11).
 */
import Link from 'next/link';
import { EXPERIENCE_WORLDS, type WorldId } from '../../lib/shell/roles';

/** Reihenfolge der vier Erlebniswelten (Dok. 06 §5) für die „Für wen?"-Fläche. */
const WELT_REIHENFOLGE: readonly WorldId[] = ['executive', 'operations', 'consulting', 'assurance'];

/** Ampel-nahe Akzentklasse je Welt – reine Farbzuordnung, immer mit sichtbarem Text/Titel. */
const WELT_AKZENT: Readonly<Record<WorldId, string>> = {
  executive: 'wk-accent--info',
  operations: 'wk-accent--ok',
  consulting: 'wk-accent--teal',
  assurance: 'wk-accent--warn',
};

interface Differenzierer {
  readonly titel: string;
  readonly text: string;
  readonly akzent: string;
}

/**
 * Die vier ehrlichen Differenzierer aus der Produktverfassung (CLAUDE.md „Produkt"):
 * digitaler Zwilling, Decision Center, Managed-Service-Modell, Ehrlichkeit/Antwort-Modus.
 * Knapp, ohne Marketing-Sprech, ohne Zahlenversprechen.
 */
const DIFFERENZIERER: readonly Differenzierer[] = [
  {
    titel: 'Digitaler Unternehmenszwilling',
    text: 'Prozesse, Assets, Risiken, Controls, Maßnahmen und Nachweise als ein zusammenhängendes Modell – nicht als verstreute Listen. Von jedem Objekt sind seine Beziehungen begehbar.',
    akzent: 'wk-accent--teal',
  },
  {
    titel: 'Decision Center',
    text: 'Entscheidungen als belegte, versionierte und ablösbare Objekte im digitalen Zwilling – nachvollziehbar statt in E-Mails und Folien verstreut.',
    akzent: 'wk-accent--info',
  },
  {
    titel: 'Managed-Service-Modell',
    text: 'Kontinuierlicher Betrieb und skalierbare Services auf demselben Datenmodell: Beratung und Betrieb teilen eine Wahrheit, mehrere Perspektiven.',
    akzent: 'wk-accent--ok',
  },
  {
    titel: 'Ehrlichkeit vor Wirkung',
    text: 'Jede Zahl trägt ihren Nenner, jede Datenlücke wird benannt, „erfasst" bleibt von „geprüft" getrennt. Kein erfundener Score, keine Ampel ohne Grund.',
    akzent: 'wk-accent--warn',
  },
];

export function WillkommenContent() {
  return (
    <div className="wk-page">
      {/* HERO: was es ist, in 30 Sekunden – Produktname, ein beschreibender Titel, der Lead
          aus der Produktverfassung, ein klarer CTA zur Anmeldung. */}
      <section className="wk-hero" aria-labelledby="wk-titel">
        <p className="wk-eyebrow">ISMS Managed Service Platform</p>
        <h1 id="wk-titel" className="wk-title">
          Ein digitaler Zwilling für kontinuierliches Informationssicherheits-Management.
        </h1>
        <p className="wk-lead">
          Ein mandantenfähiges, rollenbasiertes Betriebs-, Entscheidungs- und Service-System, das
          Informationssicherheitsmanagement und skalierbare Managed Services auf einem digitalen
          Unternehmenszwilling verbindet – von Risiken, Controls und Nachweisen über das Decision
          Center bis zu Reporting und Beratung.
        </p>
        <p className="wk-cta-row">
          <Link className="wk-cta" href="/login">
            Plattform ansehen<span aria-hidden="true"> →</span>
          </Link>
          <span className="wk-cta-note">
            Berater- und Kundeneinstieg getrennt, ohne echtes Konto.
          </span>
        </p>
      </section>

      {/* FÜR WEN: die vier rollenbezogenen Erlebniswelten (Dok. 06 §5, aus roles.ts) mit ihren
          Leitfragen – Kunden (Executive, CISO, ISMS-Manager …) und Berater/Betreiber teilen ein
          Datenmodell, sehen es aber aus ihrer Frage heraus. */}
      <section className="wk-section" aria-labelledby="wk-fuerwen">
        <h2 id="wk-fuerwen" className="wk-h2">
          Für wen – eine Wahrheit, mehrere Perspektiven
        </h2>
        <p className="wk-section-lead">
          Kundenrollen und Berater arbeiten auf demselben Datenmodell. Jede Rolle betritt die
          Plattform durch ihre eigene Leitfrage:
        </p>
        <ul className="wk-welten" aria-label="Rollenbezogene Erlebniswelten">
          {WELT_REIHENFOLGE.map((id) => {
            const welt = EXPERIENCE_WORLDS[id];
            return (
              <li key={id} className={`wk-welt ${WELT_AKZENT[id]}`}>
                <h3 className="wk-welt-name">{welt.name}</h3>
                <p className="wk-welt-frage">„{welt.leitfrage}"</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* DIFFERENZIERER: was die Plattform anders macht – ehrlich, ohne Zahlenversprechen. */}
      <section className="wk-section" aria-labelledby="wk-diff">
        <h2 id="wk-diff" className="wk-h2">
          Was die Plattform anders macht
        </h2>
        <ul className="wk-diff-grid" aria-label="Differenzierer">
          {DIFFERENZIERER.map((d) => (
            <li key={d.titel} className={`wk-card ${d.akzent}`}>
              <span className="wk-card-chip" aria-hidden="true" />
              <h3 className="wk-card-titel">{d.titel}</h3>
              <p className="wk-card-text">{d.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* EHRLICHE GRENZE (CLAUDE.md „Produkt"): was die Plattform NICHT ist – das ist Substanz,
          kein Kleingedrucktes. */}
      <section className="wk-section wk-grenze" aria-labelledby="wk-grenze-titel">
        <h2 id="wk-grenze-titel" className="wk-h2">
          Und was sie bewusst nicht ist
        </h2>
        <p className="wk-grenze-text">
          Kein Dokumentenfriedhof – und kein Ersatz für operative Quellsysteme wie SIEM, CMDB,
          Ticketing oder Schwachstellenscanner. Die Plattform macht deren Ergebnisse steuerbar,
          entscheidbar und belegbar, statt sie zu ersetzen.
        </p>
        <p className="wk-cta-row">
          <Link className="wk-cta" href="/login">
            Zur Anmeldung<span aria-hidden="true"> →</span>
          </Link>
        </p>
      </section>
    </div>
  );
}
