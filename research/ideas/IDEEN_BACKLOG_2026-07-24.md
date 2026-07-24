# Ideen-Backlog — Synthese aus drei Signal-Briefs (2026-07-24)

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-24 |
| **Rolle** | idea-innovation / Research- & Innovations-Track |
| **Quellen** | `research/briefs/WETTBEWERB_2026-07-24.md`, `research/briefs/REGULATORIK_2026-07-24.md`, `research/briefs/MARKT_WEB_2026-07-24.md` + `docs/project/CURRENT_STATE.md` (Baustand) + Konzept-Markdown `docs/concept/active/` (Provenienz je Aussage im Brief markiert) |
| **Verbindlichkeit** | **NICHT-BINDEND. Owner-gated.** Research-Signal nach `.claude/rules/research.md` / DR-0005 — ändert **keine** aktive Spezifikation, **keinen** Code, **keine** Roadmap. Reiner Vorschlag für den Owner. |
| **Schreibscope** | ausschließlich `research/`. |
| **Regel-Null-Status dieser Session** | Bash/`pdf_text.py` in diesem Kontext **nicht verfügbar** (gleiche Grenze wie in den beiden Konzept-Briefs). Es wurde **nichts** am PDF neu verifiziert. Jede Idee trägt darum einen **Regel-Null-Hinweis**, der die vor Umsetzung am PDF zu prüfende Konzeptaussage (mit Abschnittstitel) benennt. Belege stammen aus den drei Briefs; deren interne Provenienz-Marker (`[Dok02]`, `[Konzept-quellentreu/-unkorrigiert]`, `[WEB-H/M/STAT]`, `[TW]/[TRAIN]`) gelten weiter. |

> **Leitplanke (Auftrag):** Auf unsere Konzept-Stärken bauen, statt jedes Wettbewerber-Feature
> nachzubauen — digitaler Unternehmenszwilling, Decision Center, Managed-Service-Plattform,
> Presentation-as-Code, Evidence/Controls/Risiken, deterministischer Demo-Modus,
> Rollen-/Sphären-Erlebniswelten. Keine Idee soll die Identität verwässern.

---

## 0. Wie zu lesen

- **Kategorie:** `table-stakes-Lücke` (Markt setzt voraus, uns fehlt Gebautes) · `Differenzierer-Ausbau`
  (unsere Stärke schärfen) · `Moonshot` (großer, unbesetzter Wurf, hoher Aufwand/Unsicherheit).
- **Aufwand:** S (Konvention/Positionierung, kein Contract, keine externe Aktion) · M (Seed/Ansicht,
  ggf. kleine Contract-Felder) · L (Engine/neues Subsystem oder Content-/Legal-Abhängigkeit).
- **Prioritäts-Score (1–10):** gewichtete Mischung aus Evidenzstärke, strategischem Wert/Marktdruck,
  Konzeptfit (bereits verankert/teilgebaut), Wert-zu-Aufwand und Nicht-Invasivität. Score ist ein
  Vorschlags-Ranking, keine Zusage.
- **„Invasiv"** = berührt Objektvertrag/`@isms/contracts`, aktive Spezifikation oder braucht ein
  Human Gate. „Nicht-invasiv" = baut auf Gebautem/Konzipiertem ohne Vertrags- oder Außenwirkung.

---

## 1. Ideenkarten

### BL-01 — Trust-/Confidence-Layer sichtbar machen (Provenance-/Confidence-Konvention + Anti-Agentic-Hype-Positionierung)

- **Problem:** Der Markt flutet mit „agentic-AI"-Autonomie-Claims; genau daraus entsteht Käufer- und
  Auditoren-Skepsis. Wer Herkunft, Unsicherheit und menschliche Freigabe sichtbar macht, gewinnt ein
  Kauf- **und** Audit-Argument.
- **Evidenz:** MARKT §2.3/§4/§5.3 — 67 % der GRC-Käufer halten Autonomie-Claims für „overstated",
  42 % hatten Audit-Findings zur AI-Entscheidungsqualität, 31 % der SOC-2-Auditoren prüfen AI-Logs,
  73 % ohne publizierte Accuracy-Benchmarks `[WEB-STAT, mittel]`; WETTBEWERB D7 „Haltung führend"
  `[Dok02]`; REGULATORIK §2.5/§3 „ehrliche Löschung" + Human Authority `[Konzept-unkorrigiert]`.
  **Confidence: hoch** (dreifach konvergent; Einzelzahlen mittel).
- **Kategorie:** Differenzierer-Ausbau (Haltung ist bereits führend — jetzt benennen und einheitlich zeigen).
- **Fit:** **Bereits gebaut** — Antwort-Modus (WP-028: Zahl/Stand zuerst, Lücke als ruhige Zeile,
  deterministischer Demo-Modus, mechanische Wächter), app-weit über alle 8 Orte (`CURRENT_STATE`).
  Konzeptanker: Dok. 20A „KI-Funktionen und Guardrails" (Confidence, Human Gate, „Killable by
  Design"), Dok. 19 „SP16 – Human Authority", Dok. 06 „Datenvisualisierung, Accessibility &
  Responsive" (Vertrauensgrad statt Scheinpräzision).
- **Aufwand:** **S** — Badge-/Konventions-Schicht (Quelle · Confidence · Freigabestatus · „menschlich
  freigegeben") plus Positionierungs-Narrativ; kein Contract, keine externe Aktion.
- **Abhängigkeiten / Owner-Gate:** keine harten. Design-Leitplanke DR-0003 („dezent, hochwertig")
  beachten; kein Human Gate nötig, da nichts Externes/Persistentes.
- **Regel-Null-Hinweis:** Vor Umsetzung Dok. 20A Abschnitte „Guardrails/Confidence" und „Killable by
  Design", Dok. 19 „SP16 – Human Authority" sowie Dok. 06 „Datenvisualisierung, Accessibility &
  Responsive" (Vertrauensgrad/Confidence, „keine Scheinpräzision") am **PDF** gegenlesen — **Dok. 20A
  ist `[Konzept-unkorrigiert]`**, also PDF-Nachprüfung ohnehin offen (`python scripts/pdf_text.py 20A --suche "Confidence"`).
- **Prioritäts-Score: 9.** Bestes Wert-zu-Aufwand: nutzt eine **schon gebaute** Stärke, dreifach
  belegter Rückenwind, non-invasiv, schärft die Identität statt sie zu verwässern.

---

### BL-02 — Aufgaben-/Fristen-/Kapazitäts-Fundament (Task + Decision Record materialisieren, Frist-/Aufwand-/Kapazitätsfelder)

- **Problem:** Der Seed trägt keine `Task`-/`Decision-Record`-Objekte, der Objektvertrag keine
  Frist-/Aufwand-/Kapazitätsfelder. Das blockiert **gleichzeitig** Morning Mission (D6), Decision
  Center (D2) und Berater-Operations (D3) — drei unserer eigenen Differenzierer — und die
  Meldefrist-Logik (NIS2/DORA). Höchster Hebel im ganzen Backlog.
- **Evidenz:** WETTBEWERB T8 `[hoch]` + §4 („Lücke mit dem größten Hebel"); REGULATORIK §4 #5
  (Fristen) `[quellentreu hoch]`; `CURRENT_STATE` O-WP016-03/04. **Confidence: hoch.**
- **Kategorie:** table-stakes-Lücke (schaltet zugleich mehrere Differenzierer frei).
- **Fit:** Contract kennt `Task` (F08) und `Decision Record` (F09) bereits, aber unmaterialisiert;
  Orte `/heute`, `/entscheidungen`, `/services` warten darauf. Konzept: Dok. 10 „Decision Center"
  (§9.2 Decision Record), Dok. 11 „Zusammenarbeit, Aufgaben, Kommunikation", Dok. 15 „Berater
  Operations" (Kapazität/Work-Package-Mindestvertrag).
- **Aufwand:** **M** — Seed-Materialisierung + kleine Contract-Felder; kein UI-Neubau für Slice 1.
- **Abhängigkeiten / Owner-Gate:** **invasiv** — berührt `@isms/contracts`. **Bereits owner-greenlit:**
  DR-0007 E-02 = „Ja, nach Gegenlesen von Dok. 10". Pfad steht: Change Proposal → Human Gate →
  Contract-WP. Entwürfe CCP-003 (Wertfelder/Skalen) und CCP-004 (Beziehungs-Zusatzfelder) liegen bereit.
- **Regel-Null-Hinweis:** Dok. 10 Abschnitt „Decision Record" (§9.2: Option, Begründung, Freigabe,
  Bedingungen, erwartete Wirkung, Reviewtermin, spätere Ist-Wirkung — bereits einmal gegengelesen,
  DR-0007) und Dok. 15 „Berater-Operations" (Kapazität, Work-Package-Mindestvertrag) am **PDF**
  prüfen. Frist-/Aufwand-/Kapazitätsfelder existieren im Contract **nicht** → nicht erfinden.
- **Prioritäts-Score: 9.** Höchste Hebelwirkung (entsperrt BL-06/BL-07/BL-09/BL-10). Invasiv, aber
  der Owner-Pfad ist bereits entschieden — nur die Reihenfolge ist offen.

---

### BL-03 — „Regulatory Change Record" + „Regulatory Change Watch" als buchbarer Managed Service

- **Problem:** EU-Regelwerke novellieren laufend; Käufer brauchen „was ändert sich → was heißt das für
  meine Anforderungen/Controls". Der Markt liefert Reporting, nicht die Regulierungsänderung als
  nachvollziehbares Objekt mit Delta und Impact-Hypothese.
- **Evidenz:** REGULATORIK §3/§4 #3 `[Konzept-quellentreu hoch]` — Dok. 14 „SF09 – Compliance &
  Regulatory Change" + eigener buchbarer Service „Regulatory Change Monitoring" (Preisband EUR
  1.500–6.000); Dok. 08 „ISMS-13 – Compliance- und Verpflichtungsmanagement" (Delta-Analyse statt
  Neubewertung, Versionsregel „speichert niemals nur einen Framework-Namen"); MARKT §2.5 (EU-Regulatorik
  treibt Nachfrage) `[WEB-STAT]`. **Confidence: hoch** (konzeptbelegt, geringe Marktverifikation nötig).
- **Kategorie:** Differenzierer-Ausbau (+ direkte Geschäftsmodell-Chance; natürliche Heimat dieser Research-Rolle).
- **Fit:** Dok. 14 „Regulatory Route", Dok. 08 ISMS-13; Objekt „Regulatory Change Record" (Quelle,
  Rechtsraum, Gültigkeit, Frist, betroffene Anforderungen/Controls, Impact-Hypothese, Confidence).
  Orte `/services` (Angebot) + `/isms` (Wirkung auf Controls) + `/entscheidungen` (abgeleitete Entscheidung).
- **Aufwand:** **M** — neuer Objekttyp + Service-/Impact-Ansicht; Change-Feed in der Demo manuell/extern
  (kein Live-Recht-Scraper nötig für Stufe 1).
- **Abhängigkeiten / Owner-Gate:** **semi-invasiv** — neuer Objekttyp berührt den Vertrag → Change
  Proposal → Human Gate. **Der REGULATORIK-Brief empfiehlt genau diesen CP-Entwurf explizit** (Q3,
  §6.3, auf CCP-Muster).
- **Regel-Null-Hinweis:** Dok. 14 Abschnitte „SF09 – Compliance & Regulatory Change" und „Regulatory
  Change Monitoring" (Preisband) sowie Dok. 08 „ISMS-13 …" (Delta-Analyse, Versionsregel) am **PDF**
  gegenlesen (beide `[Konzept-quellentreu]`, aber Feldliste/Preisband exakt aus dem PDF ziehen).
- **Prioritäts-Score: 8.** Konzeptnah, geschäftsmodell-relevant, Rollen-Heimat; semi-invasiv, aber der
  CP-Weg ist im Brief schon vorgezeichnet.

---

### BL-04 — Register of Information / Drittparteien-Zwilling (DORA + TPRM als verlinkte Graph-Objekte)

- **Problem:** Third-Party-/Vendor-Risk ist Table-Stakes (OneTrust/ServiceNow/Vanta/AuditBoard);
  DORA verlangt zusätzlich ein „Register of Information" kritischer IKT-Dienstleister inkl.
  Konzentrationsrisiko. Der Markt macht Tabellen — wir haben den Graphen.
- **Evidenz:** WETTBEWERB T6 `[mittel]`; REGULATORIK §2.4/§4 #5 `[quellentreu hoch]` — Dok. 14 DORA-Route
  + Dok. 08 „ISMS-10 – Lieferanten- und Drittrisiko"; MARKT §2.4 „Trust + TPRM verschmelzen zur Trust
  Management Platform" `[WEB-H]`. **Confidence: mittel–hoch.**
- **Kategorie:** table-stakes-Lücke mit Differenzierer-Hebel (Graph statt Register).
- **Fit:** Der Zwilling (D1, **gebaut**) trägt Lieferant/Vertrag/IKT-Dienst als verlinkte Objekte
  (F01–F09), Kritikalität/Konzentrationsrisiko als Kanten/Attribute — genau unser Modell. Konzept:
  Dok. 08 ISMS-10, Dok. 14 „Regulatory Route" (DORA). Orte `/kunden` (Zwilling), `/isms`.
- **Aufwand:** **M** — Seed-Objekte + evtl. Kritikalitäts-/Konzentrations-Felder.
- **Abhängigkeiten / Owner-Gate:** Owner-Gate nur, falls neue Vertragsfelder nötig → Change Proposal;
  reine Seed-Erweiterung ist ein normales WP. Muster: CCP.
- **Regel-Null-Hinweis:** Dok. 08 „ISMS-10 – Lieferanten- und Drittrisiko" und Dok. 14 „Regulatory
  Route" (DORA / Register of Information) am **PDF** prüfen; ob Kritikalität/Konzentrationsrisiko
  **eigene** Felder brauchen → als offene Frage benennen, nicht erfinden (DR-0005).
- **Prioritäts-Score: 7–8.** Deckt eine Table-Stakes-Lücke **und** spielt eine Kern-Stärke aus;
  konzeptnah, mittlerer Aufwand.

---

### BL-05 — AI-Governance-Workspace / AIMS-Cockpit (Use-Case-Register, Risikoklasse, AI-BOM, ISO-42001-/AI-Act-Mapping) als buchbarer Service

- **Problem:** ISO/IEC 42001 (erstes zertifizierbares AIMS) + EU AI Act treiben AIMS-Bedarf.
  Compliance-getriebene Wettbewerber besetzen das **nicht** — echter White Space. Wir betreiben KI
  ohnehin mit AIMS-tauglichen Guardrails; daraus ein verkaufbares Cockpit zu machen liegt nahe.
- **Evidenz:** REGULATORIK §2.2/§4 #1 `[Konzept-unkorrigiert, mittel]` — Dok. 20A committed „AI Use
  Case Register" + „AI Control Plane", Risikoklassen R1–R4, Model Gateway, „AI Bill of Materials",
  „Killable by Design"; **das 42001-/AI-Act-Mapping steht aber im Abschnitt „Ideenparkplatz"** = Idee,
  nicht Zusage (20A-Q09). MARKT §2.2 (AI-Copilots/Agents = Standard-Layer) `[WEB-H]`.
  **Confidence: mittel** (Kern committed, Mapping = dokumentierte Idee).
- **Kategorie:** Differenzierer-Ausbau, Richtung Moonshot (großer, unbesetzter Wurf).
- **Fit:** Dok. 20A „KI-Funktionen und Guardrails". Neuer Workspace, andockbar an `/administration`
  bzw. `/services`. Verstärkt BL-01 (Trust-Layer) inhaltlich.
- **Aufwand:** **L** (volles Mapping) — **phasenbar auf M**: Cockpit-Shell (Use-Case-Register +
  Risikoklasse + AI-BOM) zuerst, Mapping-Layer später.
- **Abhängigkeiten / Owner-Gate:** **invasiv/gated** — Mapping aus dem „Ideenparkplatz" zu heben ist
  eine Produktentscheidung → Change Proposal + Owner-Gate (20A-Q09). KI-Funktionen selbst sind noch
  nicht gebaut.
- **Regel-Null-Hinweis:** **Dok. 20A ist `[Konzept-unkorrigiert]` → zwingend PDF gegenlesen**:
  Abschnitte „AI Use Case Register / AI Control Plane", „Risikoklassifizierung" (R1–R4),
  „Modellregister / AI Bill of Materials", „Killable by Design", Quellen S1 (AI Act 2024/1689) / S6
  (ISO 42001) und v. a. **„Ideenparkplatz"** — prüfen, ob das 42001-/AI-Act-Mapping dort als **Idee**
  oder als zugesagte Funktion steht (`python scripts/pdf_text.py 20A --suche "Ideenparkplatz"`).
- **Prioritäts-Score: 8.** Stärkster unbesetzter regulatorischer White Space; Aufwand L, aber
  phasenbar, und der Konzeptstatus „Idee" verlangt ohnehin ein Owner-Gate.

---

### BL-06 — Presentation-as-Code / Communication Factory (PDF/PPTX aus einer Datenbasis, Claims mit Quelle/Methodik/Confidence/Freigabe)

- **Problem:** Der Markt macht „auto-report"/Board-Dashboards; **niemand** in den geprüften Quellen
  liefert ein reproduzierbares, quellen-/confidence-/freigabe-getaggtes „Deck-as-Code" mit
  Snapshot/Manifest.
- **Evidenz:** MARKT §4 „überwiegend UNBESETZT" `[WEB-M]` + §5.3 (stärkster Moat, wenn mit Zwilling +
  Human-Gate gekoppelt); WETTBEWERB D4/T10 `[Dok02, mittel]` — Dok. 12 v1.1 spezifiziert Report
  Packages/Presentation Repository/Manifest/Update-Diff/geschützte Regionen, **keine Engine im Code**.
  **Confidence: mittel.**
- **Kategorie:** Differenzierer-Ausbau.
- **Fit:** Dok. 12 v1.1 (aktive Fassung), `.claude/rules/reporting.md`. Ort `/reports` (Stufe-1-Ansicht
  live). Nährt sich aus dem Zwilling (BL-01/BL-04 als Datenbasis) — „eine Datenbasis, viele Narrative".
- **Aufwand:** **L** — echte PDF/PPTX-Engine ist ein neues Subsystem.
- **Abhängigkeiten / Owner-Gate:** kein Gate für den Bau; Reporting-Regeln (Case/Template/Snapshot/
  Manifest, Claims mit Quelle/Confidence/Freigabe, geschützte Blöcke). Profitiert stark von einer
  belegten Datenbasis (Zwilling + BL-02-Entscheidungen).
- **Regel-Null-Hinweis:** **Dok. 12 v1.1** (nicht v1.0!) Abschnitte „Report Package", „Presentation
  Repository", „Manifest", „Update-Diff", „geschützte Regionen (locked / review-on-change /
  replaceable)" am **PDF** prüfen — die Claim-Pflichtfelder exakt übernehmen (`scripts/pdf_text.py 12`).
- **Prioritäts-Score: 7.** Hoher, klar unbesetzter Differenzierungswert, aber Aufwand L → mittleres
  Wert-zu-Aufwand; entfaltet sich erst mit einer reichen Datenbasis.

---

### BL-07 — Decision Center bauen (Decision Card, 3 vergleichbare Handlungsrouten, Simulation, Datenvertrauen, Freigabe)

- **Problem:** `/entscheidungen` ist heute ein read-only Register; von 14 Decision-Card-Pflichtfeldern
  (Dok. 10) haben **9 keinen Datenträger**, Simulationen fehlen. Der Markt liefert Kennzahlen fürs
  Entscheiden, nicht die Entscheidung selbst als versioniertes, belegtes, ablösbares Artefakt.
- **Evidenz:** WETTBEWERB D2 `[hoch]` („stärkste Chance, größte Baulücke"); MARKT §4/§5.2 „Entscheidung
  als auditierbares First-Class-Objekt — überwiegend UNBESETZT", während NIS2/DORA/AI Act board-level
  Rechenschaft verlangen `[WEB-M/Annahme]`. **Confidence: hoch** (für die Lücke; Umsetzungsaufwand hoch).
- **Kategorie:** Differenzierer-Ausbau (Kern-Identität).
- **Fit:** `/entscheidungen` + Ablösekette (WP-017) gebaut; Antwort-Modus-UX (WP-028) vorhanden.
  Konzept: Dok. 10 „Decision Center, KPIs, Simulationen".
- **Aufwand:** **L** — Decision Card + Simulationen sind substanziell.
- **Abhängigkeiten / Owner-Gate:** **hängt an BL-02** (Frist-/Aufwand-/Kapazitäts-/Entscheidungsdaten);
  Simulationsfelder berühren den Vertrag → Owner-Gate. O-WP017-01..12 dokumentiert die Feldlücke.
- **Regel-Null-Hinweis:** Dok. 10 Abschnitte „Decision Card" (14 Pflichtfelder), „Simulationen",
  „KPIs" am **PDF** prüfen; die feldweise Lücke ist als O-WP017-* benannt — **nicht füllen ohne
  Datenträger** (DR-0005).
- **Prioritäts-Score: 8.** Höchster strategischer Identitäts-Wert, aber Aufwand L **und** Abhängigkeit
  von BL-02 → nicht der beste Wert-zu-Aufwand-Einstieg, aber das Zielbild dahinter.

---

### BL-08 — Multi-Framework-Pakete + SoA im Zwilling („prove once, satisfy many", ohne versteckte Gleichsetzung)

- **Problem:** Kein lizenzierter Normkatalog, keine SoA/Framework-Pakete geseedet — das ist die
  Eintrittskarte in Kategorie B (Compliance Automation), und sie fehlt.
- **Evidenz:** WETTBEWERB T1 `[hoch]`; REGULATORIK §2.1/§4 #2 `[quellentreu hoch]` — Dok. 08 §3.1
  „Produktregel für Frameworks" + §3.2 „keine versteckte Gleichsetzung" + „ISMS-06 …
  SoA-Management", Dok. 09 „Control Digital Passport"; MARKT §2.5 (Crosswalks, „40–60 % Kostensenkung")
  `[WEB-STAT]`. **Confidence: hoch.**
- **Kategorie:** table-stakes-Lücke.
- **Fit:** Contract `Requirement`/Framework (F02); ISMS-Welt zeigt bereits „Control + erfülltes
  Requirement + Framework". Ort `/isms`. Konzept Dok. 08/09.
- **Aufwand:** **L** — plus Content-/Lizenz-/Legal-Strategie (nicht kopieren, lizenzieren/verlinken).
- **Abhängigkeiten / Owner-Gate:** Owner-/Legal-Gate für Content-Beschaffung (08-A06, 08-O02;
  02-D04). Ohne geklärte Lizenz begrenzt „vollständig" in der Demo.
- **Regel-Null-Hinweis:** Dok. 08 „Produktregel für Frameworks" (§3.1), „keine versteckte
  Gleichsetzung" (§3.2), „ISMS-06 – Anforderungs-, Control- und SoA-Management" (versionierte
  Anwendbarkeitserklärung) am **PDF** prüfen; 08-O02 (welche Pakete rechtlich vollständig) offenhalten.
- **Prioritäts-Score: 7.** Strategisch hoch (Markteintritt), aber Aufwand L + Content-/Legal-Abhängigkeit.

---

### BL-09 — Incident-/Meldepflicht-Uhr im Decision Center (NIS2-Kaskade, DORA-Incident, GDPR-Breach mit Human Gate)

- **Problem:** Meldefristen (NIS2 Frühwarnung/Meldung/Bericht, DORA, GDPR-Breach) sollten als
  sichtbare Fristkaskade mit Wirkungsableitung auf Risiken/Controls erscheinen — nicht als bloße
  Ticket-Weiterleitung.
- **Evidenz:** REGULATORIK §2.3/§4 #5 `[quellentreu hoch]` — Dok. 08 „ISMS-11 …", Dok. 17
  Workflow-Gate mit „Rollback und Frist", Dok. 19 „SP16 – Human Authority". **Confidence: mittel–hoch.**
- **Kategorie:** Differenzierer-Ausbau (Table-Stakes-Kern, über das Decision Center gespielt).
- **Fit:** Dok. 08 ISMS-11, Dok. 17 „Integrationen/Automatisierung/Workflow-Designer" (Gate mit Frist),
  Dok. 19 Human Authority. Hängt an BL-02 (Fristfelder) und BL-07 (Decision-Flow).
- **Aufwand:** **M** (auf BL-02/BL-07 aufsetzend).
- **Abhängigkeiten / Owner-Gate:** BL-02 zuerst; **echte** Meldung nach außen = externe Schreibaktion
  → Policy + Human Gate (`.claude/rules/integrations.md`).
- **Regel-Null-Hinweis:** Dok. 08 „ISMS-11", Dok. 17 Abschnitt Workflow-Gate („Rollback und Frist"),
  Dok. 19 „SP16 – Human Authority" am **PDF** prüfen. NIS2-Fristzahlen sind `[Trainingswissen]` → vor
  Gebrauch verifizieren, nicht als Konstante seeden.
- **Prioritäts-Score: 6–7.** Starker regulatorischer Zug, aber Folgeidee (hängt an BL-02/BL-07).

---

### BL-10 — Managed-Service Value-Proof + Kapazität/Reise/Profitabilität (der 6clicks-White-Space)

- **Problem:** Beraterkapazität, Reise, Serviceökonomie und Value Proof sind bei **allen**
  Wettbewerbern (inkl. 6clicks) öffentlich schwach (Benchmark 6.6: alle ≤ M). Unser klarster
  struktureller White Space.
- **Evidenz:** WETTBEWERB D3 `[hoch]` + §5.2; MARKT §4 „native Plattform-Service-Einheit ist
  Differenzierungsraum" `[WEB-M]`. **Confidence: hoch.**
- **Kategorie:** Differenzierer-Ausbau.
- **Fit:** `/services` Stufe 1 gebaut (Outcome-Karten, SLA/Deliverables/Wirkungsbeitrag); Kapazität/
  Reise/Profitabilität fehlen. Konzept Dok. 13/15. **CCP-002/003/004 liegen bereits als
  Human-Gate-Vorlagen bereit.**
- **Aufwand:** **M–L** — Objektmodell (CCP-002) + Wertfelder (CCP-003) + Seed.
- **Abhängigkeiten / Owner-Gate:** BL-02 + CCP-002/003/004 → Human Gate (Objektvertrag).
- **Regel-Null-Hinweis:** Dok. 15 „Berater-Operations, Portfolio, Ressourcenplanung" (Kapazität,
  Work-Package-Mindestvertrag) und Dok. 13 „Managed-Service-Betriebsmodell" (Service Run / Outcome
  Review) am **PDF** prüfen.
- **Prioritäts-Score: 7.** Klarster struktureller White Space gegen 6clicks; CCP-Vorlagen existieren,
  aber Aufwand M–L und mehrere Gates.

---

### BL-11 — Kontinuierliche Evidenz über (Mock-)Konnektoren, Schema-Drift sichtbar

- **Problem:** „Continuous evidence via integrations" ist die definierende Stärke von Vanta/Drata/
  Secureframe und Markt-Table-Stakes; im Code existiert **kein** Konnektor. Größte Baseline-Lücke.
- **Evidenz:** WETTBEWERB T2 `[hoch]` + §4; MARKT §2.1 „von Compliance-Nachweis zu Continuous/Agentic
  Assurance — Table-Stakes" `[WEB-H]`. **Confidence: hoch.**
- **Kategorie:** table-stakes-Lücke.
- **Fit:** Dok. 17 „Integrationen/Automatisierung/Workflow-Designer"; `.claude/rules/integrations.md`
  (Mock-Konnektoren, Schema-Drift, Idempotenz, Reconciliation). Ort `/administration`/`/isms`.
- **Aufwand:** **L** (echte Konnektoren) — **S–M** für ein Mock-Connector-Framework mit synthetischen
  Payloads zuerst.
- **Abhängigkeiten / Owner-Gate:** echte, persistente Evidenz braucht DB→UI (**FINDING-0004/RLS**) und
  Auth (WP-005). Dok. 02: strategisch eher „integrieren" als alles selbst bauen.
- **Regel-Null-Hinweis:** Dok. 17 Abschnitte „Integrationen", „Workflow-Designer", Gate-Mechanik am
  **PDF** prüfen (Idempotenz/Reconciliation/Dead Letter aus `.claude/rules/integrations.md`).
- **Prioritäts-Score: 6.** Hoher Marktdruck, aber Aufwand L + Auth/DB-Voraussetzungen; strategisch
  teils bewusst „integrieren statt bauen".

---

### BL-12 — Strategie-DNA / Zielnavigator (Ziel, Reifegrad, Budget, Risikobereitschaft → Route statt statischer Checkliste)

- **Problem:** Frameworks sind meist statische Checklisten; eine kundenindividuelle Route (aus
  Zielprofil abgeleitet) fehlt im Markt.
- **Evidenz:** WETTBEWERB D5 `[mittel]` — Dok. 16 (Onboarding/Zielprofil) + Dok. 09 (Reifegrad).
  **Confidence: mittel.**
- **Kategorie:** Differenzierer-Ausbau.
- **Fit:** **Steht ohnehin als nächster Sprint-Schritt an** — Kundenwelt Slice 2/3 (Zielprofil/
  Struktur-Assistent), `CURRENT_STATE` „Nächster Sprint-Schritt". Konzept Dok. 16/09.
- **Aufwand:** **M** (fügt sich in laufenden Kundenwelt-Sprint).
- **Abhängigkeiten / Owner-Gate:** kein neues Gate; reiht sich in den laufenden Plan ein (danach STOPP
  für visuelle Owner-Freigabe, DR-0010).
- **Regel-Null-Hinweis:** Dok. 16 „Kunden-Onboarding, Zielprofil, Lifecycle" (Zielprofil-Felder) und
  Dok. 09 „Reifegrad, Risiken, Bedrohungen, Control Intelligence" (Ziel/Ist/Trend/Vertrauensgrad,
  **keine bloße Prozentzahl**) am **PDF** prüfen.
- **Prioritäts-Score: 7.** Gutes Wert-zu-Aufwand, weil es im laufenden Sprint andockt — aber weniger
  dringlich/marktkritisch als die Top-Ideen, daher unter Top-5.

---

### BL-13 — Trust Center / Questionnaire-Automation (Trust-Sicht + Fragebogen-Auto-Antwort aus Evidenz)

- **Problem:** Vanta/Drata/Secureframe verschmelzen Trust Center + Vertrieb („Trust sells");
  Fragebögen werden agentisch aus Evidenz beantwortet. Bei uns Randthema.
- **Evidenz:** WETTBEWERB T9 `[mittel]`; MARKT §2.4 „Trust Management Platform" `[WEB-H]`.
  **Confidence: mittel.**
- **Kategorie:** table-stakes-Lücke (im Zielsegment), **aber schwacher Konzept-Anker**.
- **Fit:** **Schwach** — im Konzept Randthema. Evidence/Controls existieren als Datenquelle.
- **Aufwand:** **M**.
- **Abhängigkeiten / Owner-Gate:** Konzeptlücke → Concept Author; echte Evidenz braucht DB→UI.
- **Regel-Null-Hinweis:** **zuerst prüfen, ob Dok. 05/12 ein Trust-Center überhaupt vorsehen** — wenn
  nicht, als OFFENE FRAGE dokumentieren, **nicht** füllen (DR-0005). Nicht in ein weiteres
  Trust-Center-Klischee laufen (WETTBEWERB/REGULATORIK §2.8: unsere Chance liegt **oberhalb**
  kontinuierlicher Evidenz).
- **Prioritäts-Score: 5.** Marktrelevant, aber dünner Konzept-Anker → Risiko der Identitätsverwässerung;
  bewusst niedrig.

---

### BL-14 — Packaging „Plattform + laufender Betrieb" gebündelt (vs. Tool-only), als Positionierungs-Notiz

- **Problem:** Der Markt bepreist „Plattform" getrennt von „Service" und „Audit". Unser
  Managed-Service-Modell kann Plattform + laufenden Betrieb **bündeln** — ein Packaging-Feld, das
  reine Tool-Anbieter strukturell offenlassen.
- **Evidenz:** MARKT §3 (Preis-/Packaging-Beobachtungen) `[WEB-M]` + Implikation `[TRAIN]`.
  **Confidence: niedrig–mittel.**
- **Kategorie:** Differenzierer-Ausbau (Geschäftsmodell/Positionierung, **kein Bau**).
- **Fit:** Dok. 14 „Preislogik/Pakete", Dok. 13 „Betriebsmodell".
- **Aufwand:** **S** (Positionierungs-/Pricing-Konzept, kein Code).
- **Abhängigkeiten / Owner-Gate:** **Pricing ist Owner-Hoheit** — nie autonom (CLAUDE.md „Sicherheit
  und Daten"); Dok. 02 verlangt Marktaktualisierung vor Pricing (02-D10).
- **Regel-Null-Hinweis:** Dok. 14 Abschnitt „Preislogik/Pakete" am **PDF** prüfen; keine Preiszahl
  ohne Owner setzen.
- **Prioritäts-Score: 5.** Wertvoll als Positionierungs-Input, aber Pricing gehört dem Owner — hier nur
  festhalten, nicht ausarbeiten.

---

## 2. Scoring-Übersicht

| ID | Idee | Kategorie | Aufwand | Invasiv? | Score |
|---|---|---|---|---|---|
| BL-01 | Trust-/Confidence-Layer + Anti-Hype-Positionierung | Differenzierer-Ausbau | S | nein | **9** |
| BL-02 | Aufgaben-/Fristen-/Kapazitäts-Fundament | table-stakes | M | ja (Contract, owner-greenlit) | **9** |
| BL-03 | Regulatory Change Record + Watch-Service | Differenzierer-Ausbau | M | semi (Contract) | **8** |
| BL-05 | AI-Governance-Workspace / AIMS-Cockpit | Differenzierer→Moonshot | L (phasenbar M) | ja (Gate) | **8** |
| BL-07 | Decision Center (Decision Card, Simulation) | Differenzierer-Ausbau | L | ja (hängt an BL-02) | **8** |
| BL-04 | Register of Information / Drittparteien-Zwilling | table-stakes + Diff | M | semi | **7–8** |
| BL-06 | Presentation-as-Code / Communication Factory | Differenzierer-Ausbau | L | nein (Bau) | **7** |
| BL-08 | Multi-Framework-Pakete + SoA im Zwilling | table-stakes | L + Content/Legal | Gate | **7** |
| BL-10 | Managed-Service Value-Proof / Kapazität | Differenzierer-Ausbau | M–L | ja (CCP-002/003) | **7** |
| BL-12 | Strategie-DNA / Zielnavigator | Differenzierer-Ausbau | M | nein (läuft ohnehin) | **7** |
| BL-09 | Incident-/Meldepflicht-Uhr | Differenzierer-Ausbau | M | ja (Folge BL-02) | **6–7** |
| BL-11 | Kontinuierliche Evidenz über (Mock-)Konnektoren | table-stakes | L (Mock S–M) | Gate (DB/Auth) | **6** |
| BL-13 | Trust Center / Questionnaire-Automation | table-stakes | M | Konzeptlücke | **5** |
| BL-14 | Packaging „Plattform + Betrieb" (Positionierung) | Differenzierer-Ausbau | S | Owner (Pricing) | **5** |

---

## 3. Ranking — Top-5 nach Wert-zu-Aufwand

> „Wert-zu-Aufwand" priorisiert hier bewusst **hebelstarke, evidenzsichere, konzept-verankerte**
> Ideen. BL-07 (Decision Center) und BL-08 (Framework-Pakete) haben höheren *strategischen* Wert,
> fallen aber wegen Aufwand L / Content-Abhängigkeit aus dem besten *Verhältnis*.

1. **BL-01 — Trust-/Confidence-Layer sichtbar machen** *(Score 9, Aufwand S, non-invasiv)*
   Macht eine **bereits gebaute** Stärke zum dreifach-belegten Kauf- und Audit-Argument gegen den
   Agentic-Hype — bestes Verhältnis, keine Vertrags- oder Außenwirkung.
2. **BL-02 — Aufgaben-/Fristen-/Kapazitäts-Fundament** *(Score 9, Aufwand M, invasiv aber owner-greenlit)*
   Der höchste Hebel im Backlog: entsperrt Morning Mission, Decision Center, Berater-Operations und
   die Meldefrist-Logik in einem Zug — und der Owner-Pfad (DR-0007 E-02) steht bereits.
3. **BL-03 — Regulatory Change Record + „Regulatory Change Watch"-Service** *(Score 8, Aufwand M, semi-invasiv)*
   Verwandelt die natürliche Heimat dieser Research-Rolle in ein konzept-verankertes, buchbares
   Geschäftsmodell (Change → Delta → Impact) — der REGULATORIK-Brief empfiehlt den CP-Entwurf explizit.
4. **BL-04 — Register of Information / Drittparteien-Zwilling** *(Score 7–8, Aufwand M, semi-invasiv)*
   Schließt die TPRM-Table-Stakes-Lücke **und** bedient DORA, indem es unsere Kern-Stärke (Graph)
   gegen die tabellenzentrierte Konkurrenz ausspielt.
5. **BL-05 — AI-Governance-Workspace / AIMS-Cockpit** *(Score 8, Aufwand L→phasenbar M, gated)*
   Der stärkste unbesetzte regulatorische White Space (ISO 42001 / EU AI Act), aufsetzend auf unsere
   ohnehin AIMS-tauglichen Guardrails — phasenbar über eine Cockpit-Shell.

### Kandidaten für Change-Proposal-Entwürfe (nicht-invasiv / konzeptnah, aus den Top-5)

- **BL-01 (Trust-/Confidence-Layer)** — **primärer** CP-/WP-Kandidat: vollständig non-invasiv,
  konzeptnah (Dok. 20A/19/06), baut auf Gebautem. Ein CP formalisiert nur die Badge-Konvention +
  Positionierung; könnte auch direkt als kleines WP laufen.
- **BL-03 (Regulatory Change Record)** — CP-Kandidat: konzeptnah (Dok. 14 SF09 / Dok. 08 ISMS-13);
  der REGULATORIK-Brief empfiehlt den CP-Entwurf ausdrücklich (Q3). Semi-invasiv (neuer Objekttyp),
  daher genau der richtige, gated Weg über einen **Entwurf** statt Bau.
- **BL-04 (Register of Information / Drittparteien-Zwilling)** — optionaler dritter CP-Kandidat:
  konzeptnah (Dok. 08 ISMS-10 / Dok. 14 DORA-Route), spielt den Graphen aus; semi-invasiv (Seed +
  ggf. kleine Felder), gut auf CCP-Muster abbildbar.

> **Nicht als CP-Entwurf markiert (bewusst):** BL-02 ist invasiv, hat aber bereits seinen Owner-Pfad
> (DR-0007 E-02 → CP → Human Gate → Contract-WP); BL-05 verlangt zuerst die größere Owner-Entscheidung,
> das ISO-42001/AI-Act-Mapping aus dem „Ideenparkplatz" (20A-Q09) zu heben.

---

## 4. Annahmen, Grenzen, Nicht-Scope

- **Keine PDF-Verifikation in dieser Session** (Bash/`pdf_text.py` nicht verfügbar) — jede Zahl,
  jedes Pflichtfeld, jedes Preisband ist vor Umsetzung am PDF gegenzulesen (Regel-Null-Hinweis je Idee).
- Externe Marktzahlen sind `[WEB-STAT]`/`[TW]`/`[TRAIN]` und teils sekundär zitiert → als Richtwert,
  nicht als Konstante behandeln (US-Suchbias in MARKT, keine Live-Verifikation in WETTBEWERB/REGULATORIK).
- Scores sind ein **Vorschlags-Ranking**, keine Roadmap. Reihenfolge, Zuschnitt und jedes Human Gate
  entscheidet der Owner.
- **Nicht-Scope:** Rechtsberatung, Pricing-Festlegung, Konzeptänderung, Codeänderung. Umsetzung nur
  über Change Proposal + Human Gate oder ein Work Package (DR-0005).
