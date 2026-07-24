# Competitive Brief — ISMS Managed Service Platform vs. ISMS/GRC/Compliance-Automation-Markt

| Feld | Inhalt |
|---|---|
| **Datum** | 2026-07-24 |
| **Rolle** | Competitive Intelligence / Research- & Innovations-Track |
| **Quellenart** | (a) Interne Konzeptwahrheit: Dok. 02 „Markt, Wettbewerber & Differenzierung" (Abgleich 2026-07-23: **TREU** zum PDF, alle H/M/L-Werte zellenweise bestätigt) + Baustand aus `docs/project/CURRENT_STATE.md`. (b) Externe Wettbewerber-Fakten: **Trainingswissen (Cutoff Jan 2026)** — in dieser Umgebung war **kein Web-Tool verfügbar**, es wurde nichts live nachrecherchiert. Jede externe Aussage ist unten als solche markiert. |
| **Verbindlichkeit** | **NICHT-BINDEND. Owner-gated.** Research-Signal nach `.claude/rules/research.md` / DR-0005 — ändert keine aktive Spezifikation, keinen Code, keine Roadmap. Nur Vorschlag für den Owner. |
| **Schreibscope** | ausschließlich `research/`. |

---

## 0. Wie diese Aussagen zu lesen sind (Ehrlichkeit über die Quellenlage)

- **Marktstand-Spalten** stützen sich auf zwei Quellen, die getrennt markiert sind:
  - `[Dok02]` = im internen Konzept Dok. 02 belegt, das selbst öffentliche Herstellerseiten zitiert (S1–S30, Zugriff 21.07.2026). Dok. 02 behandelt Herstelleraussagen ausdrücklich als **öffentliche Selbstdarstellung**, nicht als verifizierte Benchmark — dieselbe Vorsicht gilt hier.
  - `[TW]` = mein **Trainingswissen** (Cutoff Jan 2026), **nicht** live web-verifiziert. Behandeln als plausible, aber ungeprüfte Marktkenntnis.
- **„Unser Stand"** ist der **tatsächliche Baustand** (nicht das Zielbild), belegt aus `CURRENT_STATE.md` und den WP-Notizen. Vokabular:
  - **stark** = gebaut, demonstrierbar, konzeptioneller Vorsprung sichtbar
  - **vorhanden** = im Prototyp gebaut (mindestens Stufe 1), read-only/synthetisch
  - **geplant** = im Konzept spezifiziert, **nicht** gebaut
  - **fehlt** = weder gebaut noch als Eigenbau priorisiert (teils bewusst: integrieren/lizenzieren/partnern)
- Der Prototyp ist heute eine **lauffähige, read-only, synthetische Demo** mit 8 Orten; die Persistenzschicht (`@isms/db`) ist gebaut, aber **bewusst noch nicht ans UI angebunden** (erst nach RLS-Härtung, FINDING-0004). Es gibt **keine** Auth, **keine** externen Konnektoren, **keine** KI-Funktionen und **keine** Report-Engine im Code. Das ist bei jeder „unser Stand"-Zeile mitzudenken.

---

## 1. Wettbewerber-Einordnung (fünf konvergierende Kategorien)

Übernommen aus Dok. 02 Abschnitt „Marktstruktur: fünf konvergierende Produktkategorien" `[Dok02]`, mit externer Ergänzung `[TW]`.

| Kat. | Kategorie | Anbieter | Was sie sehr gut lösen | Verhältnis zu uns |
|---|---|---|---|---|
| **A** | Enterprise IRM/GRC | ServiceNow IRM/GRC, RSA **Archer**, MetricStream, **OneTrust**, **AuditBoard**, **LogicGate** | Breite Risiko-/Compliance-/Audit-/Workflow-Steuerung, Enterprise-Integration, Konfigurierbarkeit | Nicht in der Breite schlagen (02-D01). Gegenposition: Time-to-Value, Decision-first, Service-native. |
| **B** | Compliance Automation / Trust | **Vanta**, **Drata**, **Secureframe**, **Sprinto**, **Hyperproof**, **Thoropass** | Kontinuierliche Evidenz via Integrationen, Framework-Mapping, Audit Readiness, Trust Center, Questionnaire-Automation | Setzen die **Baseline** für „continuous". Wir müssen breiter als reine Compliance sein. |
| **C** | ISMS-/Europa-Spezialisten | **verinice**, **ISMS.online**, HiScout, (TISAX-/BSI-nahe Tools, **Eramba** als Open-Source-GRC) | ISO 27001, BSI IT-Grundschutz, NIS2, TISAX, Policies, Nachweise, Datenresidenz/Souveränität | BSI-/ISO-Fachnähe + Datenresidenz ist **Pflicht** im DACH-Markt (02-D04), nicht allein Differenzierer. |
| **D** | Service-Provider Enablement | **6clicks** (Hub & Spoke), Secureframe Multi-Tenant, Partnernetze von Vanta/Drata/ISMS.online/Hyperproof | Multi-Client-Verwaltung, Partnerprogramme, wiederholbare Delivery, Content-Verteilung | **Engster Direktvergleich** = 6clicks (02-D02, STRATEGISCHE BEDROHUNG: hoch). Hier entscheidet sich unser White Space. |
| **E** | Cyber Risk Intelligence / Quantification | CyberSaint, SAFE (FAIR), SecurityScorecard | Finanzielle Quantifizierung, Exposure, Threat/Third-Party-Signale | Bewusst **nicht** selbst bauen — integrieren/partnern (02-D05). |

Anbieter aus dem Auftrag, die Dok. 02 **nicht namentlich** führt (Zuordnung `[TW]`, mittlere Confidence): **Sprinto** und **Thoropass** → Kat. B (Compliance Automation, KMU/US-lastig, mit Audit-/Assurance-Nähe); **Eramba** → Kat. C als Open-Source-GRC (ähnliche Nische wie verinice, aber ohne dessen BSI-Grundschutz-Tiefe). RSA **Archer** ist heute als eigenständiges Unternehmen „Archer" unterwegs `[TW]`.

---

## 2. Capability-Delta-Tabelle

Legende Delta: **[TS]** = Table-Stakes-Lücke (Markt setzt es voraus, uns fehlt Gebautes) · **[DIFF]** = Differenzierer-Chance · **[FÜHR]** = konzeptionell/gebaut bereits führend · **[PAR]** = Parität/neutral.
Confidence bezieht sich auf die **Gesamtzeile** (Marktbild + unser Stand zusammen).

### 2a. Table-Stakes — was der Markt voraussetzt

| # | Fähigkeit | Marktstand | Unser Stand (Beleg) | Delta | Confidence |
|---|---|---|---|---|---|
| T1 | **Multi-Framework-Control-Bibliothek + Cross-Mapping** (ISO 27001, SOC 2, NIST, BSI Grundschutz, TISAX, DORA, NIS2) | Kernversprechen von Vanta/Drata/Secureframe/Sprinto/Hyperproof; BSI/TISAX bei verinice/HiScout `[Dok02][TW]` | **fehlt (Content).** Objektvertrag kennt `Requirement`/Framework als Typ (F02, `@isms/contracts`), aber **kein lizenzierter Normkatalog**; Dok. 02-D04 sagt: lizenzieren/verlinken, nicht kopieren | **[TS]** | hoch |
| T2 | **Kontinuierliche Evidenz über Integrationen** (Cloud, IdP, MDM, Ticketing → automatische Tests/Monitoring) | Definierende Stärke von Vanta/Drata/Secureframe (>150 Integrationen bei Secureframe), ServiceNow-Vuln-Response `[Dok02][TW]` | **fehlt gebaut / geplant.** Dok. 17 spezifiziert Integrationen/Workflow-Designer; **kein Konnektor im Code**, App ist read-only synthetisch (CURRENT_STATE) | **[TS]** | hoch |
| T3 | **Authentisierung / SSO / SAML / RBAC / Audit-Log** | Universell vorausgesetzt `[TW]` | **fehlt.** Nur Rollen-**Simulation** in der Shell (WP-011); echte Auth ist WP-005, offen. Autorisierung serverseitig erst mit DB→UI | **[TS]** | hoch |
| T4 | **Mandantentrennung serverseitig erzwungen** | 6clicks/Secureframe Multi-Tenant, alle mit Client-Isolation `[Dok02]` | **vorhanden (Backend).** `@isms/db` tenant-scoped Repos mit **Negativbeweisen**; UI-Routing-Isolation getestet (WP-014). **Aber:** RLS/least-privilege fehlt (FINDING-0004, blockiert DB→UI), UI läuft noch auf Seed | **[PAR]** (Backend solide, End-to-End offen) | hoch |
| T5 | **Policy-Management** (Templates, Versionierung, Attestation) | Standard bei ISMS.online/Vanta/Drata `[Dok02][TW]` | **geplant.** Dok. 05/08 sehen Policies vor; im Prototyp nicht als eigener Ort gebaut | **[TS]** | mittel |
| T6 | **Third-Party-/Vendor-Risk (TPRM)** | Stärke von OneTrust/ServiceNow/AuditBoard/SecurityScorecard `[Dok02][TW]` | **geplant.** Dritte/Lieferanten im Konzept präsent; kein TPRM-Workflow gebaut | **[TS]** | mittel |
| T7 | **Audit-Management + Auditor-Zugang** | Kern von AuditBoard, Vanta/Drata Audit-Hub `[Dok02][TW]` | **teilweise.** Auditor-Rolle in Rollenmodell (R01–R12), Nachweise/Evidence in `/isms` (WP-013); kein Audit-Projekt-/Prüfer-Workflow | **[TS]** | mittel |
| T8 | **Aufgaben/Workflow, Owner, Fristen, Erinnerungen** | Universell `[TW]` | **fehlt (Daten).** `Task` (F08) im Vertrag, aber **in keinem Mandanten materialisiert**; **keine Frist-/Aufwand-/Kapazitätsfelder** (O-WP016-03/04). Blockiert Morning Mission + Decision Center | **[TS]** | hoch |
| T9 | **Trust Center / Questionnaire-Automation** | Vanta/Drata/Secureframe verschmelzen Trust + Vertrieb `[Dok02]` | **fehlt / nicht priorisiert.** Im Konzept Randthema | **[TS]** (im Zielsegment „Trust sells") | mittel |
| T10 | **Reporting/Dashboards + Export** | Alle; ServiceNow/OneTrust/MetricStream Executive-Reporting stark `[Dok02][TW]` | **teilweise.** `/heute`-Dashboard aus belegten Daten (WP-020), Reports-**Ort** live (WP-032); aber **keine** PDF/PPTX-Engine im Code (Dok. 12 nur Konzept) | **[TS]** für PDF/PPTX-Deliverables | hoch |

### 2b. Differenzierer — wo unser Konzept über die Baseline hinausgeht

| # | Fähigkeit | Marktstand | Unser Stand (Beleg) | Delta | Confidence |
|---|---|---|---|---|---|
| D1 | **Digitaler Unternehmenszwilling / Informationsgraph** (Prozesse↔Assets↔Risiken↔Controls↔Maßnahmen↔Nachweise↔Services in einem navigierbaren Graph) | LogicGate hat Graph-DB `[Dok02]`; sonst überwiegend register-/tabellenzentriert. Ein durchgängiger, begehbarer Business-Twin ist **öffentlich selten** `[Dok02][TW]` | **vorhanden → stark.** Gebaut: Twin Explorer `/twin` (WP-004) + **Objekt-360 für jedes der ~43 Seed-Objekte** (WP-014), richtungstreue Kanten, Bitemporalität, Datenqualität. Read-only synthetisch | **[FÜHR]** (Konzept + Stufe-1-Bau) | hoch |
| D2 | **Decision-first UX / Decision Center** (Ursache-Wirkungs-Kette, 3 vergleichbare Handlungsrouten, Datenvertrauen, Freigabe) | ServiceNow/LogicGate/MetricStream stark bei „Decision Intelligence"-**Quantifizierung**; „Jede Seite beantwortet eine Frage" als UX-Prinzip ist **White Space** `[Dok02]` | **geplant (Kern noch nicht gebaut).** `/entscheidungen` ist ein **read-only Register**; **Decision Card bewusst NICHT gebaut** — 9 von 14 Pflichtfeldern (Dok. 10) haben keinen Datenträger, Simulationen fehlen (WP-017). Antwort-Modus-UX aber app-weit gebaut (WP-028) | **[DIFF]** (stärkste Chance, größte Baulücke) | hoch |
| D3 | **Managed-Service Operating Model** (Serviceobjekte, SLA, Deliverables, **Kapazität, Reise, Vertretung, Quality Gates, Profitabilität, Value Proof**) | 6clicks/Secureframe/Partnernetze verwalten **Multi-Client**, aber Beraterkapazität/Reisen/Serviceökonomie sind öffentlich **kaum sichtbar** (Benchmark 6.6: alle ≤ M bei Ressourcen/Ökonomie) `[Dok02]` | **vorhanden Stufe 1 → Rest geplant.** `/services` mit Outcome-Karten, SLA/Deliverables/Wirkungsbeitrag, Portfolio (WP-012). **Kapazität/Reise/Profitabilität nicht gebaut** (Seed ohne Kapazitätsfelder) | **[DIFF]** | hoch |
| D4 | **Presentation-as-Code / Communication Factory** (aus einer Datenbasis PPTX + PDF + Audit-Pack + Board-Deck mit Herkunft/Stichtag/Freigabe) | OneTrust/ServiceNow bieten Report-Export; **editierbare, markenkonforme PPTX-Generierung aus Live-ISMS-Daten** ist selten `[Dok02][TW]` | **geplant.** Dok. 12 v1.1 spezifiziert Report Packages, Presentation Repository, Manifest, Update-Diff, geschützte Regionen sehr detailliert; **im Code keine Engine**, Reports-Ort ist Stufe-1-Ansicht | **[DIFF]** | mittel |
| D5 | **Strategie-DNA / kundenindividueller Zielnavigator** (Ziel, Reifegrad, Budget, Risikobereitschaft, Managed-Service-Anteil bestimmen die Route statt statischer Checkliste) | Frameworks sind meist statische Checklisten `[Dok02][TW]` | **geplant.** Dok. 16 (Onboarding/Zielprofil) + Dok. 09 (Reifegrad); nicht gebaut, Kundenwelt Slice 2/3 (Zielprofil/Struktur-Assistent) ist nächster Sprint-Schritt | **[DIFF]** | mittel |
| D6 | **Morning Mission / Portfolio Intelligence** (priorisierte, kapazitätsrealistische Tagesmission über alle Mandanten) | 6clicks/Vanta Portfolio-Sichten; kapazitätsrealistische Priorisierung über Beraterportfolio öffentlich kaum belegt `[Dok02]` | **teilweise.** `/heute` beantwortet Standort + gezählte Beobachtungen aus belegten Daten (WP-016/020); **Morning Mission bewusst nicht gebaut** (kein Task/Frist/Kapazität) | **[DIFF]** | hoch |
| D7 | **Explainable Risk-to-Action + Confidence + deterministischer Fallback** (KI-optional; jede Empfehlung mit Datenbasis, Unsicherheit, Datenlücke, Freigabe) | LogicGate/Vanta/Drata betten KI-Agenten ein → **KI allein differenziert kaum mehr** `[Dok02]` | **teilweise/geplant.** Deterministischer Demo-Modus + „ehrliche Datenlücken"-Haltung sind **app-weit gebaut** (WP-020/028, mechanische Wächter); KI-Funktionen selbst nicht gebaut (Dok. 20A Guardrails) | **[DIFF]** (Haltung führend, KI-Feature offen) | mittel |
| D8 | **Souveränität / API-first / Deployment-Wahl / AI-Modellwahl** | 6clicks (sovereign/self-hosted/Appliance), verinice (Cloud/on-prem/Open Source) `[Dok02]` | **geplant.** Stack entschieden (ADR-0001: TS/Next/Nest/Postgres); Deployment-Wahl/Datenresidenz als Architekturprinzip dokumentiert, nicht ausgebaut | **[PAR]** (Pflicht im DACH, kein Alleinstellungsmerkmal) | mittel |
| D9 | **Rollen-/Sphären-Erlebniswelten auf einem Datenmodell** (Executive/CISO/Berater/Kunde/Auditor ohne Datenbruch) | Rollen-Dashboards üblich; **gekoppelte Sphäre an Rolle mit demselben Twin** als durchgängiges Erlebnis seltener explizit `[TW]` | **vorhanden.** 8 Orte live, Rollen R01–R12, Sphäre an Rolle gekoppelt, Rollen-/Mandantenwechsel (WP-011/028); alle Rollen auf demselben Seed getestet | **[DIFF]** (leicht) | mittel |
| D10 | **Cyber-Risk-Quantifizierung (CRQ/FAIR, €-Wirkung)** | Stärke von SAFE/CyberSaint/MetricStream/LogicGate `[Dok02][TW]` | **geplant (bewusst integrieren).** 02-D05: nicht selbst bauen, sondern integrieren/partnern; Ergebnis in Maßnahme/Service/Budget übersetzen | **[PAR]** (Markt-Baseline via Integration, nicht Eigen-USP) | mittel |

---

## 3. Wo wir echt differenzieren (Kern-These)

Dok. 02 KERNTHESIS `[Dok02]`: Der Markt hat starke Systeme für **je eine** Ecke (GRC-Breite, Continuous Compliance, BSI-Fachnähe, Quantifizierung, Multi-Client). **Kein** betrachteter Anbieter ist öffentlich in **allen** acht Zielkriterien stark. Unsere Chance ist die **bewusste Kombination**, nicht die Featurebreite:

1. **Digitaler Unternehmenszwilling als gemeinsame Wahrheit** (D1) — heute **gebaut** (Stufe 1) und schon demonstrierbar. Das ist der Unterbau, der Decision Center, Kausalität und Value Proof überhaupt möglich macht. **Stärkster real vorzeigbarer Vorsprung.**
2. **Managed-Service-Betriebssystem** (D3) — Kapazität, Reise, Serviceökonomie, Value Proof als **native Kernobjekte**. Genau die Spalten, in denen die Benchmark-Matrix 6.6 **alle** Wettbewerber bei ≤ M zeigt und nur das Zielprodukt bei H. **Gegen 6clicks der entscheidende Hebel.**
3. **Decision Center + Presentation-as-Code** (D2 + D4) — von „hoher Score" zu „Ursache → 3 Routen → Entscheidung → adressatengerechtes Deliverable aus einer Datenbasis". Konzeptionell am schärfsten differenziert, aber **noch nicht gebaut** — hier liegt Chance **und** größte Umsetzungslücke beieinander.

**Ehrliche Einordnung:** Der Vorsprung ist heute **überwiegend konzeptionell**. Real gebaut und vorzeigbar ist vor allem der Zwilling (D1) plus die Stufe-1-Service-/ISMS-/Heute-Welten. Decision Center, Simulation, Report-Engine, Berater-Operations, Strategie-DNA sind spezifiziert, aber Code-seitig offen. Gegen einen Live-Wettbewerber gewinnt heute die **Erzählung** und die **Ehrlichkeitsschicht**, nicht die Funktionsparität.

---

## 4. Drei größte Table-Stakes-Lücken (Markt setzt voraus, uns fehlt Gebautes)

1. **Kontinuierliche Evidenz über Integrationen (T2) + Framework-Content (T1).** Der gesamte Compliance-Automation-Cluster (Vanta/Drata/Secureframe/Sprinto/Hyperproof) *ist* im Kern genau das. Ohne Konnektoren und ohne lizenzierten Normkatalog fehlt uns die Eintrittskarte in Kat. B — genau darum sagt Dok. 02 „integrieren/lizenzieren", aber gebaut ist nichts. **Größte Baseline-Lücke.**
2. **Authentisierung/Autorisierung End-to-End (T3, T4-RLS).** Heute nur Rollen-**Simulation**; echte Auth (WP-005) und RLS (FINDING-0004) fehlen. Ohne das ist keine der anderen Fähigkeiten produktreif — und es blockiert die DB→UI-Anbindung.
3. **Aufgaben-/Fristen-/Kapazitätsmodell (T8).** Kein `Task`/`Decision Record` materialisiert, keine Frist-/Aufwand-/Kapazitätsfelder. Das blockiert **gleichzeitig** Morning Mission (D6), Decision Center (D2) und Berater-Operations (D3) — also drei unserer eigenen Differenzierer. Das ist die Lücke mit dem größten Hebel, weil sie Table-Stakes **und** Differenzierer freischaltet.

*(Ebenfalls TS, knapp dahinter: PDF/PPTX-Report-Engine T10/D4, Policy-Management T5.)*

---

## 5. Drei stärkste Differenzierer (spitz)

1. **Digitaler Unternehmenszwilling (D1)** — gebaut, begehbar, richtungstreu, mit Datenqualität/Bitemporalität. Der einzige Differenzierer, der **heute schon** demonstrierbar über der Marktbaseline liegt, und der Enabler für alles Weitere.
2. **Managed-Service Operating Model mit Value Proof (D3)** — die Spalte, in der die Konkurrenz (inkl. 6clicks) öffentlich schwach ist. Beraterkapazität/Reise/Profitabilität/Wertnachweis als native Domäne ist der klarste strukturelle White Space.
3. **Decision-first UX + Presentation-as-Code aus einer Datenbasis (D2 + D4)** — „eine Datenbasis, viele verantwortungsvolle Narrative": von der Zahl zur begründeten Entscheidung zum freigabefähigen Board-/Audit-Deliverable ohne manuelle Folienarbeit. Konzeptionell am weitesten vom Markt entfernt.

---

## 6. Signale / nicht-bindende Empfehlungen an den Owner

- **Battlecard 6clicks priorisieren** (R2 in Dok. 02: „6clicks wird unterschätzt"). Es ist der einzige Anbieter, der Provider-native Architektur *und* Souveränität *und* Content-Verteilung öffentlich bei H zeigt. Unsere Demo muss in den ersten Minuten zeigen, warum wir „mehr als ein schöneres Hub-&-Spoke-GRC" sind (Dok. 02, STRATEGISCHE BEDROHUNG).
- **Nicht in Kat.-A-Breite investieren.** Kein Wettlauf gegen ServiceNow/MetricStream/Archer-Featurebreite (02-D01).
- **Die drei TS-Lücken sind Reihenfolge-Kandidaten**, aber alle Owner-/Gate-behaftet: T8 (Task/Kapazität → berührt Objektvertrag, Concept Author + Human Gate, vgl. CCP-002..004) schaltet die meisten Differenzierer frei; T3/T4-RLS ist die Produktreife-Voraussetzung (FINDING-0004); T2/T1 ist strategisch (integrieren/lizenzieren statt bauen — braucht Content-/Legal-Strategie, Dok. 02 V4).
- **Diese Marktanalyse ist alterungsanfällig.** Dok. 02 selbst verlangt Aktualisierung vor Pilot/Pricing (02-D10), Stichtag 21.07.2026; die externen `[TW]`-Aussagen hier sind Cutoff Jan 2026 und **nicht** live verifiziert. Vor jeder Owner-Entscheidung mit Marktbezug: Hands-on-Demos (V1) + Web-Recherche mit Quellen nachziehen.

---

### Offene Annahmen / Grenzen dieses Briefs

- Kein Web-Tool verfügbar → **keine** Live-Verifikation der Wettbewerber-Fakten; `[TW]`-Zeilen sind ungeprüft.
- „Marktstand" = **öffentliche Selbstdarstellung** der Anbieter, keine unabhängige Qualitätsbewertung (Leseregel Dok. 02).
- „Unser Stand" = Baustand 2026-07-24 aus `CURRENT_STATE.md`; das Konzept-**Zielbild** liegt in allen Fällen höher und gilt unverändert (DR-0005) — dieser Brief bewertet Gebautes, nicht das Zielbild.
- Zuordnung von Sprinto/Thoropass/Eramba zu den Kategorien ist meine Ergänzung `[TW]`, nicht aus Dok. 02.
