/**
 * Struktur-Assistent (`/kunden/struktur`, WP-006 Slice 3) – geführte Read-Ansicht, KEINE Erfassung.
 *
 * QUELLEN (Regel Null, am PDF gegengelesen): Dok. 16, Abschnitte „Lifecycle-Modell",
 * „Qualification und Onboarding Charter", „Firmenanlage und Organisationsfundament", „Identität,
 * Rollen und Zugriff", „Scope Discovery und Scope Governance", „Strategie-DNA", „Zielprofile",
 * „Guided UX und Einstiegspfade". Die worttreuen Strukturen leben als react-freie Konstanten in
 * `lib/kunden/struktur.ts` (Quellkommentar je Konstante).
 *
 * ERKLÄRTE STRUKTUR, KEINE ERFASSUNG (16-D01 „Lifecycle, kein Wizard"; OL04/OL06/OL07): Der
 * Assistent ZEIGT, welche Strukturen ein Kunde beim Aufbau anlegt und entscheidet – Schritt für
 * Schritt. Er hat KEIN Eingabefeld, KEINE Speicherung, KEINEN neuen localStorage-Schlüssel und
 * KEINE Fortschrittsmessung. Menschliche Freigabepflichten (16-D07) werden als Strukturinhalt
 * gezeigt, nicht simuliert.
 *
 * ROLLEN-MAPPING-ANKER: Der Abschnitt Identität/Rollen/Zugriff verweist auf die zwölf kanonischen
 * Produktrollen aus `lib/shell/roles.ts` (Dok. 16: „… auf die kanonischen Produktrollen aus
 * Dokument 03 gemappt") – vorhandene Datenbasis, nichts Neues.
 *
 * MATERIALISIERUNGS-LÜCKEN: ISMS-Scope, Ausschluss, Strategie-DNA und Target Profile sind
 * kanonische Objekttypen, im heutigen Datenbestand aber nicht materialisiert – ehrlich benannt
 * (DR-0005), keine leeren Objekte, keine Beispielwerte.
 *
 * KUNDENSPHÄRE: mandantenneutrale Konzeptstruktur; keine Fremdmandanten-Existenzaussage, keine
 * Betreiber-Portfolio-Inhalte. Erreichbar aus dem Kundenbereich (auch aus dessen Leerzustand).
 *
 * Heading-Hierarchie: h1 (Struktur-Assistent) > h2 (Schritt/Abschnitt) > h3 (Block).
 */
import Link from 'next/link';
import type { DemoTenant } from '@isms/demo-seed';
import { DEMO_ROLES, worldForRole, type DemoRole } from '../../lib/shell/roles';
import {
  AUSSCHLUSS_PFLICHT,
  CHARTER_INHALTE,
  FIRMENANLAGE_MINDEST,
  FREIGABEPFLICHTIG,
  GUIDED_QUICKSTART,
  LIFECYCLE_PHASEN,
  MATERIALISIERUNGS_LUECKEN,
  QUALIFICATION_FRAGEN,
  SCOPE_DIMENSIONEN,
  STRATEGIE_DNA_DIMENSIONEN,
  UEBERMODELLIERUNG_WARNUNG,
  ZIELPROFILTYPEN,
} from '../../lib/kunden/struktur';
import { PageContextBar } from '../shell/PageContextBar';
import { SeitenbausteineHinweis } from '../shell/SeitenbausteineHinweis';

export function StrukturAssistentContent({
  role,
  tenant,
}: {
  /** `null` = neutraler Einstieg (DR-0009): der Assistent rendert vollständig, ohne Rollen-Rahmung. */
  role: DemoRole | null;
  tenant: DemoTenant;
}) {
  return (
    <>
      <p className="tw-eyebrow">Kunden · Struktur-Assistent</p>
      <h1>Struktur-Assistent</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation"). */}
      <p className="tw-question">
        Welche Strukturen legt ein Kunde beim Aufbau an – und was entscheidet er dabei?
      </p>

      <p className="tw-lead">
        Eine geführte Erklärung der Aufbau-Struktur aus dem Konzept: vom ersten Kundenbild über
        Scope, Rollen und Strategie-DNA bis zum Zielprofil. Das ist eine erklärte Struktur aus dem
        Konzept – keine Erfassung: Es gibt hier kein Eingabefeld, nichts wird gespeichert und kein
        Fortschritt gemessen.
      </p>

      <RollenRahmung role={role} />

      <PageContextBar
        role={role}
        tenant={tenant}
        scopeLabel="Bezug des Struktur-Assistenten"
        scopeValue="erklärte Struktur aus dem Konzept – kein Mandantenbestand"
        datenstandLabel="Datenstand des Struktur-Assistenten"
        datenstandValue="Konzeptstruktur ohne erfassten Stand"
      />

      <LifecycleSection />
      <QualificationSection />
      <FirmenanlageSection />
      <RollenSection />
      <ScopeSection />
      <StrategieDnaSection />
      <ZielprofilSection />
      <QuickstartSection />
      <FreigabeSection />
      <MaterialisierungSection />

      <SeitenbausteineHinweis ort="strukturassistent" />
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
          <strong>Neutraler Einstieg:</strong> Sie sehen den Struktur-Assistenten ohne
          Rollen-Rahmung. Er erklärt die Aufbau-Struktur des Konzepts und erfasst nichts.
        </p>
      </div>
    );
  }
  return (
    <div className="ht-neutral" role="note">
      <p className="ht-neutral-text">
        <strong>Ansehen als {role.name}</strong> ({worldForRole(role).name}): Der Assistent erklärt
        die Struktur; er ändert keine Daten und erfasst nichts.
      </p>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Schritt-Bausteine
 * --------------------------------------------------------------------------- */

function LifecycleSection() {
  return (
    <section aria-labelledby="struktur-lifecycle">
      <h2 id="struktur-lifecycle">Der Phasenweg (Lifecycle)</h2>
      <p className="sv-edge-note">
        Onboarding ist ein Lifecycle, kein einmaliger Ablauf. Elf Phasen (0 bis 10), je mit Ziel,
        zentralen Ergebnissen und einem Exit Gate, das den Übergang freigibt.
      </p>
      <ol className="sv-items">
        {LIFECYCLE_PHASEN.map((phase) => (
          <li key={phase.nummer}>
            <span className="sv-item-name">{`Phase ${phase.nummer}: ${phase.name}`}</span>
            <span className="sv-item-note">
              {`Ziel: ${phase.ziel}. Zentrale Ergebnisse: ${phase.ergebnisse}. Exit Gate: ${phase.exitGate}.`}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function QualificationSection() {
  return (
    <section aria-labelledby="struktur-qualification">
      <h2 id="struktur-qualification">Qualification und Onboarding Charter</h2>
      <p className="sv-edge-note">
        Der Einstieg beginnt mit wenigen Fragen. Zehn Mindestfragen der Qualification:
      </p>
      <ol className="sv-items">
        {QUALIFICATION_FRAGEN.map((frage) => (
          <li key={frage}>
            <span className="sv-item-name">{frage}</span>
          </li>
        ))}
      </ol>
      <h3 className="tw-card-title">Die Onboarding Charter enthält mindestens</h3>
      <ul className="sv-items">
        {CHARTER_INHALTE.map((inhalt) => (
          <li key={inhalt}>
            <span className="sv-item-name">{inhalt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FirmenanlageSection() {
  return (
    <section aria-labelledby="struktur-firmenanlage">
      <h2 id="struktur-firmenanlage">Firmenanlage und Organisationsfundament</h2>
      <p className="sv-edge-note">
        Für eine arbeitsfähige erste Version benötigt die Plattform eine Mindeststruktur – nicht
        mehr:
      </p>
      <ul className="sv-items">
        {FIRMENANLAGE_MINDEST.map((punkt) => (
          <li key={punkt}>
            <span className="sv-item-name">{punkt}</span>
          </li>
        ))}
      </ul>
      <p className="sv-edge-note">{UEBERMODELLIERUNG_WARNUNG}</p>
    </section>
  );
}

function RollenSection() {
  return (
    <section aria-labelledby="struktur-rollen">
      <h2 id="struktur-rollen">Identität, Rollen und Zugriff</h2>
      <p className="sv-edge-note">
        Reale Personen und Gruppen werden auf die zwölf kanonischen Produktrollen gemappt (dieselben
        Rollen wie die Rollenwahl der Kopfleiste). Gearbeitet wird nach Least Privilege und
        Need-to-Know, mit getrennter Kunden- und Provideradministration.
      </p>
      <ul className="sv-items">
        {DEMO_ROLES.map((r) => (
          <li key={r.id}>
            <span className="sv-item-name">{r.name}</span>
            <span className="sv-item-meta">{` · Sphäre: ${r.sphere}`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ScopeSection() {
  return (
    <section aria-labelledby="struktur-scope">
      <h2 id="struktur-scope">Scope Discovery und Scope Governance</h2>
      <p className="sv-edge-note">Ein Scope kann neun Dimensionen beinhalten:</p>
      <ul className="sv-items">
        {SCOPE_DIMENSIONEN.map((dim) => (
          <li key={dim}>
            <span className="sv-item-name">{dim}</span>
          </li>
        ))}
      </ul>
      <h3 className="tw-card-title">Jeder Ausschluss benötigt sechs Angaben</h3>
      <ul className="sv-items">
        {AUSSCHLUSS_PFLICHT.map((angabe) => (
          <li key={angabe}>
            <span className="sv-item-name">{angabe}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StrategieDnaSection() {
  return (
    <section aria-labelledby="struktur-dna">
      <h2 id="struktur-dna">Strategie-DNA</h2>
      <p className="sv-edge-note">
        Die Strategie-DNA beschreibt, wie ein Kunde Sicherheit führen will – zwölf
        Pflichtdimensionen, je mit Leitfrage und Beispielausprägungen. Sie schlägt keine „richtige
        Persönlichkeit" vor, sondern erklärt Konsequenzen.
      </p>
      <ul className="sv-items">
        {STRATEGIE_DNA_DIMENSIONEN.map((d) => (
          <li key={d.dimension}>
            <span className="sv-item-name">{d.dimension}</span>
            <span className="sv-item-note">
              {`Leitfrage: ${d.leitfrage} Beispiele: ${d.beispiele}.`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ZielprofilSection() {
  return (
    <section aria-labelledby="struktur-zielprofil">
      <h2 id="struktur-zielprofil">Zielprofile</h2>
      <p className="sv-edge-note">
        Ein Kunde kann mehrere Zielprofiltypen kombinieren. Maximale Reife oder Zertifizierung ist
        kein automatisches Ziel – neun Typen:
      </p>
      <ul className="sv-items">
        {ZIELPROFILTYPEN.map((typ) => (
          <li key={typ.name}>
            <span className="sv-item-name">{typ.name}</span>
            <span className="sv-item-note">{typ.beschreibung}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickstartSection() {
  return (
    <section aria-labelledby="struktur-quickstart">
      <h2 id="struktur-quickstart">Guided Quickstart</h2>
      <p className="sv-edge-note">
        Für kleine oder wenig komplexe Scopes führt die Plattform in sieben Schritten. Hier als
        Erklärung des Wegs gezeigt – nicht als auszufüllender Ablauf:
      </p>
      <ol className="sv-items">
        {GUIDED_QUICKSTART.map((schritt) => (
          <li key={schritt}>
            <span className="sv-item-name">{schritt}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FreigabeSection() {
  return (
    <section aria-labelledby="struktur-freigabe">
      <h2 id="struktur-freigabe">Menschliche Freigabe</h2>
      <p className="sv-edge-note">
        Diese Gegenstände benötigen eine definierte menschliche Freigabe – der Assistent zeigt sie,
        er löst keine aus:
      </p>
      <ul className="sv-items">
        {FREIGABEPFLICHTIG.map((gegenstand) => (
          <li key={gegenstand}>
            <span className="sv-item-name">{gegenstand}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaterialisierungSection() {
  return (
    <section aria-labelledby="struktur-luecken">
      <h2 id="struktur-luecken">Noch nicht als Daten hinterlegt</h2>
      <p className="sv-edge-note">
        Mehrere dieser Strukturen kennt das Datenmodell als eigene Objekttypen; für den heutigen
        Datenbestand sind sie aber nicht als Objekte hinterlegt. Sie werden hier benannt statt
        erfunden – ein erfundenes Beispiel wäre die schlechtere Antwort:
      </p>
      <ul className="sv-items">
        {MATERIALISIERUNGS_LUECKEN.map((typ) => (
          <li key={typ}>
            <span className="sv-item-name">{typ}</span>
            <span className="sv-item-note">
              als Objekttyp im Datenmodell vorgesehen, im aktuellen Datenbestand nicht hinterlegt.
            </span>
          </li>
        ))}
      </ul>
      <p className="tw-muted">
        Diese Benennung ist eine Aussage über den heutigen Datenbestand, kein Zeitplan.{' '}
        <Link className="tw-cta" href="/kunden">
          Zurück zum Kundenbereich →
        </Link>
      </p>
    </section>
  );
}
