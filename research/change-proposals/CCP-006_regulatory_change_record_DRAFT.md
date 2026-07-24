# CCP-006 (ENTWURF) – „Regulatory Change Record" + „Regulatory Change Watch" als buchbarer Managed Service

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-006 – Regulatory Change Record (neuer Objekttyp) + Watch-Service |
| Status | **ENTWURF (DRAFT) — NICHT-BINDEND; Owner-Freigabe ausstehend** |
| Datum | 2026-07-24 |
| Autor (Rolle) | Research-/Innovations-Track (`idea-innovation`). **Research-Signal**, kein Konzeptbeschluss; Konzept-Autorschaft (Dok. 21 §21) + Concept Consistency Review nachgelagert. |
| Auslöser | `research/ideas/IDEEN_BACKLOG_2026-07-24.md` **BL-03** (Prioritäts-Score 8, semi-invasiv), Top-5 Platz 3; `REGULATORIK_2026-07-24.md` §3/§4 #3 + §6.3 Q3 (empfiehlt diesen CP-Entwurf ausdrücklich); `MARKT_WEB_2026-07-24.md` §2.5 |
| Betroffene Dokumente (nur benannt, **NICHT geändert**) | Dok. 14 „Servicekatalog, Pakete, SLAs & Preislogik"; Dok. 08 „ISMS-Kernprozesse"; Dok. 07 „Digitaler Unternehmenszwilling" (Objekt-/Beziehungskatalog, Tenant-Grenze); Dok. 10 „Decision Center" (abgeleitete Entscheidung); Dok. 09 (Impact auf Controls/Risiken) |
| Betroffene Artefakte (nur benannt) | `packages/contracts/src/vocabularies.ts` (Objekttyp-/Beziehungskatalog), `packages/contracts/PROVENANCE.md`; `packages/demo-seed` (synthetischer Change-Feed); `apps/web` `/services` (Angebot), `/isms` (Control-Wirkung), `/entscheidungen` (abgeleitete Entscheidung); `docs/project/OPEN_QUESTIONS.md` |

> **⚠️ Dieser Entwurf ändert nichts.** Nicht-bindender Vorschlag an den Owner
> (`.claude/rules/research.md`; DR-0005). Ein **neuer Objekttyp berührt `@isms/contracts`** →
> **Human Gate zwingend** vor Umsetzung. Keine aktive Konzeptdatei, kein Contract, kein Seed wird
> durch dieses Dokument verändert.

> **Regel-Null-Ehrlichkeit dieser Session:** `pdf_text.py` (Bash) und PDF-Rendering (poppler) waren
> **nicht verfügbar**; **es wurde nichts am PDF verifiziert**. Alle Abschnittstitel, Feldlisten und
> **insbesondere das Preisband** unten stammen aus den **Markdown-Arbeitskopien** (nicht
> verlustfrei, FINDING-0007/DR-0006). Preisbänder sind laut Dok. 14 ausdrücklich **illustrativ** —
> keine Preiszahl darf ohne PDF-Beleg **und** Owner-Freigabe in Seed/Produkt gelangen (Pricing =
> Owner-Hoheit). Die Verifikationsliste (§7) ist Vorbedingung.

---

## 1. Problem und Evidenz

EU-Regelwerke novellieren laufend; Käufer brauchen die Kette „**was ändert sich → was heißt das für
meine Anforderungen/Controls → welche Entscheidung folgt**". Der Markt liefert Reporting über
Compliance-Stände, aber die **Regulierungsänderung selbst** ist selten ein nachvollziehbares Objekt
mit Delta und Impact-Hypothese. Genau dort ist unsere Research-Rolle die natürliche Heimat, und das
Konzept trägt die Substanz bereits.

| Signal | Fundstelle | Confidence (Brief) |
|---|---|---|
| Dok. 14 führt „Compliance & Regulatory Change" als Servicefamilie und einen buchbaren Service „Regulatory Change Monitoring" | REGULATORIK §3/§4 #3 `[Konzept-quellentreu]` | hoch |
| Dok. 08 ISMS-13 verlangt Delta-Analyse statt Neubewertung + Trennung juristische Quelle/Interpretation/interne Anforderung/technische Umsetzung | REGULATORIK §3 `[quellentreu]` | hoch |
| EU-Regulatorik treibt die Nachfrage | MARKT §2.5 `[WEB-STAT]` | mittel |

**Konzeptbeleg (aus Markdown, PDF-Nachprüfung offen):**
- Dok. 14 §5.1 „Katalogübersicht": **SF09 „Compliance & Regulatory Change"** — „Relevante
  Anforderungen werden erkannt, bewertet und in konkrete Changes übersetzt."
- Dok. 14 §5.2 „Kanonische Service Offers": **SO11 „Regulatory Change Monitoring"** — „regulatorische
  Änderungen werden bewertet, gemappt und in Change-Pakete übersetzt" (Rhythmus „monatlich +
  eventbasiert").
- Dok. 14 §6 „Service-Tiefen …": „**Regulatory Route** (NIS2-, DORA-, TISAX-, BSI- …)"
  operationalisiert u. a. SO11; L1–L3.
- Dok. 14 §13 „Illustrative Einzelservice-Bänder": „Regulatory Change Monitoring | **EUR
  1.500–6.000** | Rechtsräume, Frameworks, Change-Frequenz" — **ausdrücklich illustrativ** (§13/§15.3).
- Dok. 08 §18 „ISMS-13 – Compliance- und Verpflichtungsmanagement": Ablauf „Quelle aufnehmen →
  Anwendbarkeit prüfen → Verpflichtung interpretieren → Owner → Control-Mapping → Gap → Maßnahme →
  Nachweis → regelmäßige Rechts-/Versionsprüfung"; „Änderungen an einem Regelwerk erzeugen
  **Delta-Analyse** statt vollständiger Neubewertung"; „Juristische Interpretation benötigt
  menschliche Freigabe und wird nicht als automatische Rechtsberatung dargestellt."

## 2. Vorgeschlagene Änderung (nicht-bindend)

Einen **„Regulatory Change Record"** als eigenständiges, versioniertes Zwillingsobjekt einführen,
das eine konkrete Regulierungsänderung fasst — mit Delta und Impact-**Hypothese** (nicht
Automatik-Urteil) — und ihn als Wirkungsanker zwischen Verpflichtung, Control/Requirement und
abgeleiteter Entscheidung verlinkt. Der buchbare Service **„Regulatory Change Watch/Monitoring"**
(Dok. 14 SO11) nutzt diesen Objekttyp als Delivery-Ergebnis.

**Feldkandidaten (Vorschlag, final aus PDF + Gate):** Quelle (juristisch), Rechtsraum, Regelwerk +
**Version** (Dok. 08 „speichert niemals nur einen Framework-Namen"-Geist), Gültigkeit/Inkrafttreten,
**Delta** zur Vorversion, betroffene Verpflichtungen/Requirements/Controls (Kanten), **Impact-
Hypothese** + Confidence, menschlicher Freigabe-/Interpretationsstatus, Frist(en), abgeleitete
Entscheidung/Maßnahme.

**Stufe 1 (Demo):** Change-Feed **manuell/synthetisch** (kein Live-Recht-Scraper). Juristische
Interpretation bleibt **menschlich freigegeben** (Dok. 08 §18) — **keine automatische
Rechtsberatung** und keine reale Rechtsquelle als Datum seeden.

## 3. Betroffene Konzeptdokumente (nur benannt, nicht geändert)

| Dok. | Abschnittstitel (aus Markdown; **am PDF zu bestätigen**) | Bezug |
|---|---|---|
| 14 | §5.1 „Katalogübersicht" (SF09), §5.2 „Kanonische Service Offers" (SO11), §6 „Service-Tiefen …" (Regulatory Route), §13 „Illustrative Einzelservice-Bänder" (Preisband) | Servicedefinition + illustratives Preisband |
| 08 | §18 „ISMS-13 – Compliance- und Verpflichtungsmanagement"; §3.1 „Produktregel für Frameworks"; §3.2 „Keine versteckte Gleichsetzung"; §16.3 (Meldepflichten/Fristen = versionierte regulatorische Workflows) | Delta-Analyse, Versionsregel, Fristbezug |
| 07 | Objekt-/Beziehungskatalog; Tenant-Grenze (Cross-Tenant nur zu versionierten Plattformreferenzen) | neuer Objekttyp; Regelwerk als Plattformreferenz |
| 10 | „Decision Record"/Decision Center | abgeleitete Entscheidung |
| 09 | Reifegrad/Risiken/Control Intelligence | Wirkung auf Controls/Risiken |

## 4. Wirkung auf Datenmodell / Contracts / UI (grob)

- **Datenmodell / `@isms/contracts` (semi-invasiv):** neuer **Objekttyp** „Regulatory Change Record"
  im kanonischen Katalog (`vocabularies.ts`; `Framework`/`Requirement` existieren bereits als
  Objekttypen — der neue Typ **verlinkt** sie, ersetzt sie nicht). Mögliche **neue Beziehungstypen**
  (z. B. „ändert/betrifft" Requirement/Control) — **falls** kein vorhandener Typ (R-Katalog) trägt,
  ist das eine Produktentscheidung (nicht erfinden → §6). Additiv, kein Bruch; `PROVENANCE.md`
  belegt jede neue Vokabel am PDF.
- **Tenant/Security:** Ein Regelwerk/Change gilt tenantübergreifend → Kandidat für **versionierte
  Plattformreferenz** (Dok. 07 Tenant-Regel: Cross-Tenant nur zu Plattformreferenzen wie
  Frameworks). Berührt die 07-D11-Ausnahmeliste → **Security-Review** nötig; verwandt mit
  offener Plattformreferenz-Governance (07-O06, vgl. CCP-002 K1-B).
- **Seed:** synthetischer Change-Feed (z. B. eine fiktive NIS2/DORA-Novelle) mit Delta + Impact-
  Hypothese; **keine** realen Rechtstexte, **keine** Preiszahl ohne Owner.
- **UI (`apps/web`):** `/services` (Angebotskarte SO11), `/isms` (Change → betroffene
  Controls/Requirements), `/entscheidungen` (abgeleitete Entscheidung). Loading/Empty/Error/Conflict
  ehrlich; Confidence sichtbar (koppelt an CCP-005).

## 5. Offene Fragen

- **OF-1:** Ist „Regulatory Change Record" im PDF ein **eigenständiger Objekttyp** oder nur ein
  Delivery-Artefakt des Service SO11? (Dok. 08 §18 beschreibt den Prozess, nennt aber keinen
  Objekttyp-Vertrag.) → am PDF prüfen; Objekttyp nicht ohne Beleg schaffen (DR-0005).
- **OF-2:** Trägt der R-Beziehungskatalog (Dok. 07) bereits einen Typ für „Change betrifft
  Requirement/Control", oder braucht es einen neuen? → nicht erfinden.
- **OF-3:** Regelwerk/Change als **Plattformreferenz** (tenantübergreifend) vs. tenant-lokale Kopie —
  Security-/Governance-Entscheidung (07-D11/07-O06).
- **OF-4:** Verhältnis zur „Verpflichtung" aus Dok. 08 ISMS-13: Ist der Change ein Ereignis **an**
  einer Verpflichtung oder ein eigenes Objekt? (Delta-Analyse-Kette.)
- **OF-5 (Pricing = Owner-Hoheit):** Das Band „EUR 1.500–6.000" ist illustrativ (Dok. 14 §13/§15.3)
  — **keine Preiszahl in Seed/Produkt** ohne PDF-Beleg **und** Owner-Freigabe; Dok. 02 verlangt
  Marktaktualisierung vor Pricing.

## 6. Regel-Null-Verifikationsliste (vor JEDER Umsetzung am PDF zu prüfen)

> Diese Session hat **nichts** am PDF verifiziert. Vor Umsetzung jede Zeile am **PDF-Original**
> gegenlesen; Abschnittstitel zitieren, nicht die Nummer.

1. **Dok. 14** (`python scripts/pdf_text.py 14 --suche "Regulatory Change"`, `--suche "SF09"`,
   `--suche "SO11"`, `--suche "Regulatory Route"`, `--suche "1.500"`): Servicefamilie SF09, Offer
   SO11, Regulatory Route, **Preisband exakt** — und den Illustrativ-Vorbehalt („Illustrative
   Einzelservice-Bänder", „Grenzen der Marktanker").
2. **Dok. 08** (`python scripts/pdf_text.py 08 --suche "ISMS-13"`, `--suche "Delta"`,
   `--suche "Framework"`): ISMS-13-Ablauf, Delta-Analyse-Regel, Trennung juristische
   Quelle/Interpretation, „Produktregel für Frameworks", „Keine versteckte Gleichsetzung",
   Versionsregel.
3. **Dok. 07** (`python scripts/pdf_text.py 07 --suche "Plattformreferenz"`, `--suche "Cross-Tenant"`,
   `--abschnitte`): kanonischer Objektkatalog (existiert „Regulatory Change Record"?), R-Katalog
   (existiert eine passende Beziehung?), Tenant-Ausnahmeliste (07-D11).
4. **Dok. 10** (`python scripts/pdf_text.py 10 --suche "Decision Record"`): abgeleitete Entscheidung.
5. **Dok. 08** (`--suche "Meldepflicht"`, `--suche "Frist"`): Frist-/Meldebezug (Berührung zu BL-09,
   nicht Teil dieses Entwurfs) — NIS2/DORA-Fristzahlen sind Trainingswissen → **nicht** als
   Konstante seeden.

## 7. Owner-Entscheidung, die gebraucht wird

1. **Grundsatz (ja/nein/verschoben):** „Regulatory Change Record" als neuen Objekttyp + SO11-Service
   in die Roadmap aufnehmen (semi-invasiv, Human Gate)?
2. **Objekttyp vs. Artefakt (OF-1):** eigener kanonischer Objekttyp oder Delivery-Artefakt des
   Service?
3. **Plattformreferenz vs. tenant-lokal (OF-3):** Cross-Tenant-Governance-Richtung — inkl.
   erforderlichem Security-Review.
4. **Pricing (OF-5):** ob und mit welchem (belegten) Band der Service in der Demo überhaupt bepreist
   erscheint — **Owner-Hoheit**.

## 8. Freigaben

| Gate | Status |
|---|---|
| Regel-Null-PDF-Verifikation (§6) | **offen — Vorbedingung** |
| Concept Consistency Reviewer (nachgelagert) | ausstehend |
| Security/Privacy Review (Plattformreferenz/Cross-Tenant) | ausstehend (nur bei Plattformreferenz-Variante) |
| Human/Product Gate (**Owner**, inkl. Pricing) | **offen** |
