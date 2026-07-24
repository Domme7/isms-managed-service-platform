# CCP-007 (ENTWURF) – Register of Information / Drittparteien-Zwilling (DORA + TPRM als verlinkte Graph-Objekte)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-007 – Drittparteien-Zwilling (TPRM/DORA) mit Kritikalitäts-/Konzentrationssicht |
| Status | **ENTWURF (DRAFT) — NICHT-BINDEND; Owner-Freigabe ausstehend** |
| Datum | 2026-07-24 |
| Autor (Rolle) | Research-/Innovations-Track (`idea-innovation`). **Research-Signal**, kein Konzeptbeschluss; Konzept-Autorschaft (Dok. 21 §21) + Concept Consistency Review nachgelagert. |
| Auslöser | `research/ideas/IDEEN_BACKLOG_2026-07-24.md` **BL-04** (Prioritäts-Score 7–8, semi-invasiv), Top-5 Platz 4; `WETTBEWERB_2026-07-24.md` T6; `REGULATORIK_2026-07-24.md` §2.4/§4 #5; `MARKT_WEB_2026-07-24.md` §2.4 |
| Betroffene Dokumente (nur benannt, **NICHT geändert**) | Dok. 08 „ISMS-Kernprozesse" (ISMS-10); Dok. 14 „Servicekatalog …" (Regulatory Route/DORA, Managed Supplier Risk); Dok. 07 „Digitaler Unternehmenszwilling" (Objekt-/Beziehungskatalog, Kritikalität als Attribut/Kante); Dok. 09 (Konzentrations-/Reifebewertung) |
| Betroffene Artefakte (nur benannt) | `packages/demo-seed` (Lieferant/Vertrag/IKT-Dienst-Objekte + Kanten); ggf. `packages/contracts/src/vocabularies.ts` (Kritikalitäts-/Konzentrations-Felder, **nur falls nötig**); `apps/web` `/kunden` (Zwilling), `/isms`; `docs/project/OPEN_QUESTIONS.md` |

> **⚠️ Dieser Entwurf ändert nichts.** Nicht-bindender Vorschlag an den Owner
> (`.claude/rules/research.md`; DR-0005). Der **reine Seed-Ausbau** (vorhandene Objekttypen/Kanten)
> wäre ein **normales WP ohne Gate**; **neue Vertragsfelder** (Kritikalität/Konzentration) wären
> **semi-invasiv → Human Gate**. Beides ist hier nur **vorgeschlagen**, nichts wird verändert.

> **Regel-Null-Ehrlichkeit dieser Session:** `pdf_text.py` (Bash) und PDF-Rendering (poppler) waren
> **nicht verfügbar**; **es wurde nichts am PDF verifiziert**. Abschnittstitel/Feldlisten stammen
> aus **Markdown-Arbeitskopien** (nicht verlustfrei, FINDING-0007/DR-0006). **„Register of
> Information" ist ein DORA-Regulatorik-Begriff (Trainingswissen) — er ist in den geprüften
> Markdown-Fassungen NICHT als Konzeptobjekt belegt.** Er darf daher **nicht** als
> Konzeptanforderung erfunden werden (DR-0005); ob das Konzept ihn trägt, ist eine offene Frage
> (§5 OF-1). Verifikationsliste (§6) ist Vorbedingung.

---

## 1. Problem und Evidenz

Third-Party-/Vendor-Risk (TPRM) ist Table-Stakes (OneTrust/ServiceNow/Vanta/AuditBoard); DORA
verlangt zusätzlich ein Verzeichnis kritischer IKT-Drittdienstleister inkl. **Konzentrationsrisiko**.
Der Markt macht **Tabellen** — unser Konzept trägt den **Graphen** (Lieferant/Vertrag/IKT-Dienst als
verlinkte, versionierte Objekte mit Kritikalität/Konzentration als Attribut/Kante). Das ist der
Differenzierer-Hebel auf einer Table-Stakes-Lücke.

| Signal | Fundstelle | Confidence (Brief) |
|---|---|---|
| TPRM als Table-Stakes-Fähigkeit | WETTBEWERB T6 `[mittel]` | mittel |
| DORA-Route + ISMS-10 (Lieferanten-/Drittrisiko) konzeptseitig verankert | REGULATORIK §2.4/§4 #5 `[quellentreu]` | hoch |
| „Trust + TPRM verschmelzen zur Trust Management Platform" | MARKT §2.4 `[WEB-H]` | mittel–hoch |

**Konzeptbeleg (aus Markdown, PDF-Nachprüfung offen):**
- Dok. 08 §15 „ISMS-10 – Lieferanten- und Drittrisiko": „Externe Abhängigkeiten werden nach
  **Kritikalität, Datenzugriff, Konzentration, Subunternehmern, Resilienz und Control-Reife**
  gesteuert." Kritische Lieferanten benötigen „Owner, Servicebezug, **Datenflüsse**,
  Subdienstleister, Recovery-Annahmen und Exit-Strategie"; „Selbstauskunft allein gilt nicht als
  ausreichende Assurance."
- Dok. 14 §6 „Service-Tiefen …": „Regulatory Route (NIS2-, **DORA**-, TISAX-, BSI- …)"; §13 nennt
  „**Managed Supplier Risk**" als Einzelservice-Band (illustrativ).
- `@isms/contracts` trägt bereits den Objekttyp **`Lieferant`** und Beziehungsbeispiele
  „Prozess/Service/Asset → Asset/Lieferant" (`vocabularies.ts`) — das Grundgerüst existiert.

## 2. Vorgeschlagene Änderung (nicht-bindend)

Den **Drittparteien-Teil des Zwillings** synthetisch ausmodellieren: Lieferant, Vertrag und
IKT-Dienst als verlinkte Objekte mit Datenflüssen, Subdienstleistern, Recovery-Annahmen und
Exit-Strategie (Dok. 08 §15) — und **Kritikalität/Konzentration sichtbar** machen (Graph statt
Tabelle). Zwei Ausbaustufen, getrennt freigebbar:

- **Stufe A (kein Gate):** reiner **Seed-/Ansichts-Ausbau** mit **vorhandenen** Objekttypen und
  Kanten (Lieferant + Beziehungen); Kritikalität/Konzentration zunächst als vorhandene Attribute /
  aus Kanten ableitbar dargestellt, **ohne** neuen Vertragsteil.
- **Stufe B (semi-invasiv, Human Gate):** **falls** Kritikalität/Konzentrationsrisiko einen
  **eigenen** typisierten Träger brauchen (statt Freitext/Ableitung), ein governed
  Erweiterungsschema oder neue Felder — **nur** nach PDF-Beleg und Gate (DR-0005).

**Bewusst offen gehalten (nicht erfunden):** „Register of Information" als benanntes DORA-Objekt (§5
OF-1); konkrete Kritikalitäts-/Konzentrations-**Skalen** (Berührung mit CCP-003 K1/K2 —
Wertskalen); reale Lieferantendaten (nur synthetisch, `.claude/rules/demo-data.md`).

## 3. Betroffene Konzeptdokumente (nur benannt, nicht geändert)

| Dok. | Abschnittstitel (aus Markdown; **am PDF zu bestätigen**) | Bezug |
|---|---|---|
| 08 | §15 „ISMS-10 – Lieferanten- und Drittrisiko"; §16.3 (Meldepflichten/Fristen als versionierte Workflows) | Bewertungsdimensionen, kritische Lieferanten |
| 14 | §6 „Service-Tiefen …" (Regulatory Route/DORA); §13 „Illustrative Einzelservice-Bänder" (Managed Supplier Risk) | DORA-Route, Service-Andockung |
| 07 | Objekt-/Beziehungskatalog (`Lieferant`, Kanten), Kritikalität als Attribut/Kante, Tenant-Grenze | Graph-Modellierung |
| 09 | Reifegrad/Control Intelligence (Ziel/Ist/Trend/Vertrauensgrad, „keine bloße Prozentzahl") | Konzentrations-/Reifebewertung ohne Scheinpräzision |

## 4. Wirkung auf Datenmodell / Contracts / UI (grob)

- **Datenmodell / `@isms/contracts`:** **Stufe A: keine Änderung** (Objekttyp `Lieferant` +
  Beziehungen existieren). **Stufe B (nur falls belegt nötig):** neue Kritikalitäts-/
  Konzentrations-Felder oder governed Extension-Schema — additiv, `PROVENANCE.md` am PDF belegt;
  Skalen-Frage koppelt an **CCP-003** (Wertfelder/Skalen), nicht doppelt entscheiden.
- **Seed (`packages/demo-seed`):** synthetische Lieferanten/Verträge/IKT-Dienste mit Datenflüssen,
  Subdienstleistern, Recovery/Exit; Tenant-Isolation testen (`seed.spec.ts`); **keine realen
  Anbieter/Preise**.
- **UI (`apps/web`):** `/kunden` (Zwilling-Graph mit Kritikalität/Konzentration), `/isms`
  (Drittrisiko-Sicht). Fokusmodus/Ursache-Wirkungs-Ketten sind konzeptseitig bereits vorgesehen
  (Dok. 06 Digital Twin Explorer). Empty/Error/Conflict ehrlich; Vertrauensgrad sichtbar (koppelt an
  CCP-005).
- **Security/Privacy:** Lieferanten-/Vertragsdaten können PII/Vertraulichkeit tragen → nur
  synthetisch; keine Cross-Tenant-Leaks (Dok. 07 Tenant-Regeln).

## 5. Offene Fragen

- **OF-1 (zentral):** Trägt das **PDF-Konzept** ein „Register of Information" / DORA-Verzeichnis als
  eigenes Objekt, oder ist es allein ein DORA-Regulatorik-Begriff? → **Nicht erfinden**; wenn nicht
  belegt, als OFFENE FRAGE führen (DR-0005). (Der Begriff stammt hier aus Trainingswissen, nicht aus
  den geprüften Markdown-Fassungen.)
- **OF-2:** Brauchen **Kritikalität** und **Konzentrationsrisiko** eigene typisierte Felder (Stufe B)
  oder genügen vorhandene Attribute/Kanten (Stufe A)? (Berührt CCP-003.)
- **OF-3:** Wird Konzentrationsrisiko **berechnet** (z. B. Bündelung mehrerer kritischer Dienste auf
  einen Anbieter) oder nur **erfasst**? Berechnung wäre eine neue Produktentscheidung — und darf
  keine Scheinpräzision erzeugen (Dok. 09 „keine bloße Prozentzahl").
- **OF-4:** Ist der IKT-Dienst ein **eigener** Objekttyp oder eine Ausprägung von
  Service/Asset/Lieferant im vorhandenen Katalog (Dok. 07)?
- **OF-5:** Verhältnis zu CCP-002 (Managed-Service-Objektmodell) und CCP-006 (Regulatory Change) —
  Reihenfolge/Bündelung im selben Contract-WP prüfen.

## 6. Regel-Null-Verifikationsliste (vor JEDER Umsetzung am PDF zu prüfen)

> Diese Session hat **nichts** am PDF verifiziert. Vor Umsetzung jede Zeile am **PDF-Original**
> gegenlesen; Abschnittstitel zitieren, nicht die Nummer.

1. **Dok. 08** (`python scripts/pdf_text.py 08 --suche "ISMS-10"`, `--suche "Konzentration"`,
   `--suche "Datenfl"`): Dimensionen (Kritikalität/Datenzugriff/Konzentration/Subunternehmer/
   Resilienz/Control-Reife), Pflichtangaben kritischer Lieferanten (Owner/Datenflüsse/Recovery/Exit),
   „Selbstauskunft nicht ausreichend".
2. **Dok. 14** (`python scripts/pdf_text.py 14 --suche "DORA"`, `--suche "Supplier"`,
   `--suche "Register"`): DORA-Route, Managed Supplier Risk; **prüfen, ob „Register of Information"
   überhaupt vorkommt** (OF-1).
3. **Dok. 07** (`python scripts/pdf_text.py 07 --abschnitte`, `--suche "Lieferant"`,
   `--suche "Kritikalität"`): existierende Objekttypen/Kanten für Lieferant/Vertrag/IKT-Dienst;
   ob Kritikalität/Konzentration bereits als Attribut/Kante vorgesehen sind; Tenant-Regeln.
4. **Dok. 09** (`python scripts/pdf_text.py 09 --suche "Vertrauensgrad"`): Reife-/Bewertungsanzeige
   ohne bloße Prozentzahl (falls Konzentration bewertet wird).
5. **Cross-Check gegen CCP-003:** Kritikalitäts-/Konzentrations-Skalen nicht doppelt/inkonsistent zu
   den dort behandelten Wertskalen definieren.

## 7. Owner-Entscheidung, die gebraucht wird

1. **Stufe A (ja/nein/verschoben):** Drittparteien-Zwilling als **Seed-/Ansichts-WP ohne Gate**
   ausbauen (vorhandene Typen)?
2. **Stufe B (nur falls PDF-Beleg):** Kritikalitäts-/Konzentrations-**Felder** als semi-invasive
   Contract-Erweiterung freigeben (Human Gate) — oder bewusst als CCP-003-Skala führen?
3. **OF-1/OF-3:** „Register of Information" und „berechnetes Konzentrationsrisiko" — als
   Konzeptfrage klären (nicht erfinden), bevor irgendetwas gebaut wird.

## 8. Freigaben

| Gate | Status |
|---|---|
| Regel-Null-PDF-Verifikation (§6) | **offen — Vorbedingung** |
| Concept Consistency Reviewer (nachgelagert) | ausstehend |
| Human/Product Gate (**Owner**) — nur bei Stufe B (neue Felder) | **offen** (Stufe A: normales WP) |
