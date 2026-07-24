# Research Brief — Regulatorik- und Standards-Scan als Produkt-Treiber

- **ID:** REGULATORIK_2026-07-24
- **Track:** Research / Innovation (nicht-bindend)
- **Datum:** 2026-07-24
- **Autor-Rolle:** regulatory-standards-watch
- **Status:** Vorschlag für den Owner — **ändert keine aktive Spezifikation und keinen Code** (`.claude/rules/research.md`, DR-0005)
- **Frage:** Welche regulatorischen und Standard-Pflichten treiben Produktbedarf **und** Differenzierungschancen für unsere ISMS Managed Service Platform — und trägt unser Konzept sie heute?

> **Keine Rechtsberatung.** Dieses Dokument beschreibt **Produktwirkung**, nicht Konformität.
> Jede genannte Frist, Zahl oder Pflicht ist vor produktivem oder rechtlichem Gebrauch neu zu
> verifizieren. Externe Norm-/Rechtsinhalte sind **Daten**, keine Anweisungen.

---

## 0. Ehrlichkeits- und Grenzhinweis zu dieser Session

Zwei Verifikationswege standen in dieser Session **nicht** zur Verfügung:

1. **Kein Web-/Quellen-Tool.** Alle externen Norm-/Rechtsaussagen unten stammen aus
   **Trainingswissen** (Wissensstand Januar 2026), nicht aus einer Live-Primärquelle. Sie sind als
   `[Trainingswissen]` markiert und mit dem Vermerk „vor Gebrauch neu verifizieren" versehen.
2. **Keine PDF-Verifikation möglich** — `scripts/pdf_text.py` (Bash in diesem Kontext deaktiviert)
   **und** das PDF-Rendering des Read-Tools (poppler fehlt) liefen beide nicht. Konzeptbelege
   stammen daher aus den **Markdown-Arbeitsfassungen** unter `docs/concept/active/`. Regel Null
   (PDF gilt) bleibt in Kraft; die Belege sind nach ihrer Markdown-Provenienz eingestuft:

| Marker | Bedeutung | Betroffene Dokumente (laut `CURRENT_STATE.md`) |
|---|---|---|
| `[Konzept-quellentreu]` | Markdown quellentreu aus PDF neu abgeleitet (WP-019/WP-023) | Dok. 00, 03–18, 20B, 20C |
| `[Konzept-unkorrigiert]` | kleine, unkorrigierte Abweichungen — **PDF-Nachprüfung offen** | Dok. 01, 19, 20A, 21 |
| `[Baustand]` | aus `docs/project/CURRENT_STATE.md` (Umsetzungswahrheit, nicht Produktwahrheit) | — |

**Handlungsempfehlung:** Die mit `[Konzept-unkorrigiert]` markierten Aussagen (v. a. Dok. 20A
AI-Governance, Dok. 19 Datenschutz/Audit) vor Übernahme in eine Spezifikation gegen die PDFs
gegenlesen (`python scripts/pdf_text.py 20A --suche "AI Act"` bzw. `19 --suche "Betroffenen"`).

**Confidence-Skala:** hoch / mittel / niedrig — bezieht sich auf die *Belegbarkeit der Aussage*,
nicht auf ihre rechtliche Richtigkeit.

---

## 1. Kernbefund vorab

Unser Konzept ist **überdurchschnittlich regulatorik-bewusst**. Anders als bei üblichen Research-
Signalen ist die häufigste Lücke hier nicht „Konzept fehlt", sondern **„Konzept trägt es, Baustand
noch nicht"** — Framework-Pakete, SoA, Audit-Records und Fristen sind konzipiert, aber teils noch
nicht im Seed/UI materialisiert. Die stärkste **Differenzierungschance** liegt nicht darin, jedes
Compliance-Automation-Feature (Vanta/Drata) nachzubauen, sondern die Pflichten über unsere
Kern-Stärken zu bedienen: **digitaler Unternehmenszwilling** (eine Wahrheit für alle Frameworks),
**Decision Center** (Pflicht → Entscheidung → Wirkung), **Managed Service** (Regulatory Change als
buchbare Leistung) und **AI Guardrails** (AIMS/AI-Act nativ statt nachgerüstet).

---

## 2. Pflicht → Produktfähigkeit → trägt Konzept? → Chance (je Regulierung/Standard)

Legende Spalten: **Pflicht/Anlass** · **verlangte/ermöglichte Produktfähigkeit** · **Trägt unser
Konzept?** (mit Beleg) · **Chance/Differenzierung**.

### 2.1 ISO/IEC 27001:2022 + ISO/IEC 27002:2022
- **Pflicht/Anlass** `[Trainingswissen, mittel — vor Gebrauch verifizieren]`: ISMS einrichten,
  betreiben, aufrechterhalten, verbessern; risikobasierte Behandlung; Statement of Applicability
  (SoA); Wirksamkeitsbewertung, internes Audit, Management Review. 27002:2022 strukturiert die
  Controls neu (4 Themen, 93 Controls, Attribute). Amendment 1:2024 ergänzt Klimabezug.
- **Produktfähigkeit:** versionierte Anforderungen, Control-Katalog mit Attributen, SoA mit
  Begründung/Owner/Status/Abweichung, Evidence-Lebenszyklus, Management-Review-Objekt.
- **Trägt Konzept?** **Ja, tragfähig.** `[Konzept-quellentreu, hoch]` Dok. 08 „ISMS-Kernprozesse",
  Abschnitt „ISMS-06 – Anforderungs-, Control- und SoA-Management" + „versionierte
  Anwendbarkeitserklärung"; Dok. 09 „Control-360 / Control Digital Passport" (Framework-Mappings,
  Design- vs. Operating-Effectiveness). **Baustand:** ISMS-Welt zeigt Controls mit „erfülltem
  Requirement + Framework" `[Baustand, hoch]`, aber SoA/Framework-Pakete sind **noch nicht
  geseedet**.
- **Chance:** SoA nicht als Tabelle, sondern **im Zwilling verankert** (Control ↔ Risiko ↔ Asset ↔
  Evidence) — „ein Datensatz, mehrere Nachweise" (Dok. 08 Prinzip P03). Baseline, aber sauber.

### 2.2 ISO/IEC 42001:2023 (AI-Managementsystem) + EU AI Act (VO (EU) 2024/1689)
- **Pflicht/Anlass** `[Trainingswissen, mittel — Fristen zwingend verifizieren]`: 42001 ist das
  erste zertifizierbare AIMS (AI-Governance, Risikobeurteilung, Impact Assessment, Lifecycle). Der
  **EU AI Act** ist risikobasiert, gestaffelt in Kraft (u. a. Verbote + AI-Literacy früh, GPAI-
  Pflichten, Hochrisiko-Pflichten nach Anhang III **gestaffelt bis 2026/2027**); verlangt
  technische Dokumentation, Transparenz, Governance, Risikomanagement für KI-Systeme.
- **Produktfähigkeit:** KI-Anwendungsfall-Register, Risikoklassifizierung je Use Case, Human Gates,
  Modell-/Provider-Register (AI BOM), Nachvollziehbarkeit (Modell, Prompt, Confidence, Reviewer),
  Kill Switch, Mapping KI-Use-Case → Normpflicht.
- **Trägt Konzept?** **Kern ja, Mapping-Layer noch Idee.** `[Konzept-unkorrigiert, mittel — PDF
  prüfen]` Dok. 20A „KI-Funktionen und Guardrails": committed sind **„AI Use Case Register" + „AI
  Control Plane"** (§5), **Risikoklassen R1–R4** (§ Risikoklassifizierung), **Model Gateway**,
  **Modellregister/AI Bill of Materials**, „Killable by Design" (AI20), und die Quellen führen
  **S1 = AI Act (VO 2024/1689)** und **S6 = ISO/IEC 42001:2023**. **Wichtige Ehrlichkeit:** das
  konkrete **Mapping auf ISO/IEC 42001, NIST AI RMF und EU-AI-Act-Pflichten steht im Abschnitt 37
  „Ideenparkplatz"** — also **dokumentierte Idee, nicht zugesagte Funktion**. Offene Frage 20A-Q09
  benennt genau diesen Prüfbedarf.
- **Chance (stärkste Differenzierung):** **AI-Governance-Modul / „AI Governance Workspace"** als
  zusätzlich buchbarer Managed Service. Wir betreiben KI ohnehin mit AIMS-tauglichen Guardrails —
  daraus ein **verkaufbares AIMS-Cockpit** zu machen (Use-Case-Register + Risikoklasse + AI-Act-/
  42001-Mapping + Provenance) ist ein White Space, den compliance-getriebene Wettbewerber heute
  nicht besetzen. **Empfehlung:** als Change Proposal prüfen, ob der 42001/AI-Act-Mapping-Layer aus
  dem „Ideenparkplatz" in eine priorisierte Roadmap-Karte gehoben wird (Owner-Entscheidung, kein
  Alleingang).

### 2.3 NIS2 (Richtlinie (EU) 2022/2555)
- **Pflicht/Anlass** `[Trainingswissen, mittel — nationale Umsetzung + Fristen verifizieren]`:
  Leitungsverantwortung/Haftung, Risikomanagementmaßnahmen, **Incident-Meldung mit Fristenkaskade**
  (u. a. Frühwarnung/Meldung/Bericht), Business Continuity, **Lieferkettensicherheit**,
  Wirksamkeitsbewertung, Schulungen, Registrierung. Nationale Umsetzung (DE) war zum Wissensstand
  noch nicht final.
- **Produktfähigkeit:** Governance-/Mandat-Objekt mit Leitungsbezug, Incident-Workflow mit
  Fristen + Human Gate, Lieferanten-/Drittrisiko-Register, Awareness-Wirksamkeit, Meldepfad.
- **Trägt Konzept?** **Ja.** `[Konzept-quellentreu, hoch]` Dok. 08: **„NIS2 verlangt … Leitungs-
  verantwortung, Risikomanagementmaßnahmen, Incident Handling, Business Continuity, Lieferketten-
  sicherheit, Wirksamkeitsbewertung und Schulungen"** (Abschnitt „Normativer Rahmen"); Prozesse
  „ISMS-01 Kontext/Governance/Leitungsverantwortung", „ISMS-10 Lieferanten- und Drittrisiko",
  „ISMS-11 Incident-, Schwachstellen- und Threat-Verknüpfung", „ISMS-12 Awareness". Fristfeld im
  Workflow-Gate ist konzipiert `[Konzept-quellentreu, mittel]` Dok. 17, Gate zeigt „… Rollback und
  **Frist**". **Baustand-Lücke:** Seed trägt **keine Frist-/Aufwand-/Kapazitätsfelder** und keine
  Task/Decision-Objekte (`O-WP016-03/04`, `[Baustand, hoch]`).
- **Chance:** **Meldepflicht-Uhr im Decision Center** — Incident triggert einen Human-Gate-Flow mit
  sichtbarer Fristkaskade und Wirkungsableitung auf Risiken/Controls. Differenziert gegen reine
  Ticket-Weiterleitung.

### 2.4 DORA (VO (EU) 2022/2554) + Delegierte VO (EU) 2024/1774
- **Pflicht/Anlass** `[Trainingswissen, mittel — verifizieren]`: für Finanzunternehmen
  dokumentierter IKT-Risikomanagementrahmen, Governance, IKT-Incident-Meldung, **Resilienztests
  (inkl. bedrohungsgeleitetes Penetrationstesten)**, **Drittparteienmanagement + Informations-
  register** kritischer IKT-Dienstleister, Überwachung.
- **Produktfähigkeit:** IKT-Risikorahmen als Zielprofil, Drittparteien-/Register-Objekt,
  Continuity-/Resilienz-Nachweise, Incident-Meldeprozess, Testprogramm.
- **Trägt Konzept?** **Ja.** `[Konzept-quellentreu, hoch]` Dok. 08 nennt DORA explizit inkl. der
  **Delegierten VO 2024/1774** in den Quellen und im „Normativen Rahmen"; „ISMS-10 Lieferanten- und
  Drittrisiko" + „ISMS-14 Audit-/Assessmentmanagement" (regulatorische Prüfungen) tragen den
  Kern. Dok. 14 „Servicekatalog" führt eine **„Regulatory Route" (NIS2-, DORA-, TISAX-, BSI-
  Zielroute)** und **„DORA/NIS2/BSI/TISAX-Fachberatung"**.
- **Chance:** **Register of Information + Drittparteien-Zwilling** — Lieferant, Vertrag, IKT-Dienst,
  Kritikalität und Konzentrationsrisiko als verlinkte Zwillingsobjekte statt Tabelle. Passt exakt
  zu unserem Graph-Modell und ist für DORA-Adressaten stark.

### 2.5 DSGVO/GDPR
- **Pflicht/Anlass** `[Trainingswissen, hoch für Prinzipien / mittel für Details — verifizieren]`:
  Verzeichnis von Verarbeitungstätigkeiten, Rechtsgrundlage/Zweckbindung, Datenminimierung,
  Sicherheit der Verarbeitung, **Meldung von Datenschutzverletzungen (Fristen)**, DSFA bei hohem
  Risiko, **Betroffenenrechte** (Auskunft, Löschung, Portabilität), Aufbewahrung/Löschkonzept.
- **Produktfähigkeit:** Verarbeitungsverzeichnis, Privacy-Impact-Check/DSFA-Vorbereitung, Retention
  Schedule + Legal Hold, verifizierte Löschung, Betroffenenexport ohne Fremddaten, Datenklassen.
- **Trägt Konzept?** **Ja, ausführlich.** `[Konzept-unkorrigiert, mittel — PDF prüfen]` Dok. 19
  „Sicherheit, Datenschutz, Rechte & Auditierbarkeit": „Datenschutz-Lifecycle" (Zweck,
  Datenkategorien, Empfänger, Aufbewahrung; Privacy Impact Check; DSFA-Vorbereitung), „Betroffenen-
  rechte, Auskunft und Datenportabilität", „Retention, Legal Hold und verifizierte Löschung"
  (ehrliche Aussage: keine sofortige physische Backup-Entfernung behaupten), Datenklassen inkl.
  „Highly Confidential/Restricted". **Baustand:** Persistenzschicht `@isms/db` vorhanden, **bewusst
  noch nicht ans UI angebunden** (erst nach FINDING-0004/RLS) `[Baustand, hoch]`.
- **Chance:** **„Ehrliche Löschung/Retention"** als Trust-Merkmal — das System zeigt den
  *tatsächlichen* Zustand und das späteste Ablaufdatum statt eine unhaltbare „sofort gelöscht"-
  Behauptung. Diese Ehrlichkeitsschicht ist eine bereits gelebte Produkt-Stärke (Antwort-Modus,
  WP-028) und differenziert gegen Compliance-Theater.

### 2.6 BSI IT-Grundschutz
- **Pflicht/Anlass** `[Trainingswissen, mittel — verifizieren]`: Managementsystem + Struktur-
  analyse, Schutzbedarfsfeststellung, Modellierung, IT-Grundschutz-Check, ergänzende Risikoanalyse;
  BSI-Standards 200-1/-2/-3, Grundschutz-Kompendium.
- **Produktfähigkeit:** Strukturmodell (Assets/Abhängigkeiten), Schutzbedarfsklassen, Baustein-
  Modellierung, Check-Status, Risikoanalyse.
- **Trägt Konzept?** **Ja.** `[Konzept-quellentreu, hoch]` Dok. 08 „Normativer Rahmen": „BSI
  IT-Grundschutz verbindet Managementsystem, Strukturanalyse, Schutzbedarfsfeststellung,
  Modellierung, IT-Grundschutz-Check und ergänzende Risikoanalyse"; Prozesse „ISMS-03 Struktur-,
  Asset- und Abhängigkeitsmanagement" + „ISMS-04 Schutzbedarf und Kritikalität". Dok. 02 stuft BSI
  als **notwendige Marktanforderung** (europäische/digitale Souveränität), **nicht** als alleinige
  Differenzierung ein. **Baustand:** Zwilling führt Objekte nach Familie F01–F09 mit Schutzbedarf-
  Semantik `[Baustand, mittel]`; Bausteine/Kompendium nicht geseedet.
- **Chance:** Grundschutz-Modellierung **im selben Zwilling** wie ISO/NIS2/DORA — „keine versteckte
  Gleichsetzung" (Dok. 08 §3.2) macht sichtbar, wo Grundschutz vom ISO-Ziel abweicht.

### 2.7 TISAX (VDA ISA / ENX)
- **Pflicht/Anlass** `[Trainingswissen, mittel — verifizieren]`: automobile Lieferkette; VDA-ISA-
  Katalog, Assessment/Label-Austausch über ENX; strukturell an ISO 27001 angelehnt, mit Prototypen-
  /Datenschutz-Modulen.
- **Produktfähigkeit:** ISA-Katalog als Framework-Paket, Reifegrad je Anforderung, Label-/Scope-
  Verwaltung, Lieferanten-Sicht.
- **Trägt Konzept?** **Teilweise, als Zielroute.** `[Konzept-quellentreu, mittel]` Dok. 14
  „Regulatory Route" nennt TISAX explizit; „SF09 Compliance & Regulatory Change" deckt die
  Change-Seite. Ein **eigenes TISAX-/VDA-ISA-Framework-Paket** ist konzeptionell als „Branchenpack"
  vorgesehen (Dok. 08 §3.1), aber **inhaltlich nicht ausgearbeitet** — Offene Frage 08-O02 (welche
  Pakete rechtlich/inhaltlich vollständig für die Demo).
- **Chance:** **Branchenpack Automotive** als abgrenzbares, lizenzierbares Add-on — passt in die
  „zusätzlich buchbare"-Logik und adressiert einen scharf umrissenen Käuferkreis.

### 2.8 SOC 2 (AICPA Trust Services Criteria)
- **Pflicht/Anlass** `[Trainingswissen, mittel — verifizieren]`: Trust Services Criteria (Security
  verpflichtend; Availability, Processing Integrity, Confidentiality, Privacy optional); Typ-I/-II-
  Berichte; kontinuierliche Evidenz über einen Zeitraum.
- **Produktfähigkeit:** Kriterien als Framework-Paket, kontinuierliche Evidence-Sammlung,
  Kontrollnachweise über Zeit, auditfähige Berichte/Trust-Sicht.
- **Trägt Konzept?** **Ja, generisch.** `[Konzept-quellentreu, mittel]` Kein SOC-2-Spezialpaket
  genannt, aber Dok. 08 §3.1 „Produktregel für Frameworks" ist bewusst framework-agnostisch, und
  Dok. 12 „Reporting/Presentation-Engine" trägt Claim-Modell + Snapshot für auditfähige Berichte.
  Dok. 02 verortet SOC-2-nahe „Compliance Automation / Trust" (Vanta/Drata/Secureframe) als
  **Baseline-Erwartung**, nicht als Differenzierung.
- **Chance:** **kein** Wettlauf um ein weiteres Trust-Center-Klischee; unsere Chance ist die
  **Entscheidungs- und Wirkungslogik oberhalb** kontinuierlicher Evidenz (Dok. 02 §4.1).

---

## 3. Querschnitt: Auditierbarkeit, Change-Watch, Human Gates

Drei Fähigkeiten wirken **über alle** obigen Regelwerke und sind darum die hebelstärksten:

- **Canonical Audit Records + Nachweis-Integrität** — `[Konzept-unkorrigiert, mittel — PDF prüfen]`
  Dok. 19 „Canonical Audit Records" (Actor, Zeit, Begründung, Quelle, Freigabe; getrennt von
  technischen Logs). Bedient ISO-Kap-9-Nachweis, NIS2/DORA-Nachweispflicht, GDPR-Rechenschaft und
  SOC-2-Prüfspur **mit einem Mechanismus**.
- **Regulatory Change Watch als Managed Service** — `[Konzept-quellentreu, hoch]` Dok. 14 „SF09 –
  Compliance & Regulatory Change" (Anforderungen erkennen, bewerten, in konkrete Changes
  übersetzen) + eigener buchbarer Service **„Regulatory Change Monitoring" (Preisband EUR
  1.500–6.000)**; Dok. 08 „ISMS-13 – Compliance- und Verpflichtungsmanagement" mit **„Delta-Analyse
  statt vollständiger Neubewertung"** und **Versionsregel** („speichert niemals nur einen Framework-
  Namen"). **Das ist exakt der Produktkern dieser Research-Rolle** und die natürliche Heimat eines
  „Regulatory Change Record → Impact-Hypothese"-Objekts.
- **Human Authority / Human Gates** — `[Konzept-unkorrigiert, hoch]` Dok. 19 „SP16 – Human
  Authority" + Dok. 20A „AI06/Human Gate": kritische regulatorische Aktionen (Risikoakzeptanz,
  Meldung, Export, Löschung) bleiben menschlich freigabepflichtig. Deckt die Governance-/
  Verantwortungsanforderung, die in NIS2 (Leitungsverantwortung), DORA (Governance) und AI Act
  (menschliche Aufsicht) wiederkehrt.

---

## 4. Die 5 wirkungsstärksten regulatorischen Feature-Treiber (Priorisierung)

| # | Feature-Treiber | Getrieben von | Konzept heute | Hebel |
|---|---|---|---|---|
| 1 | **AI-Governance-Modul** (Use-Case-Register, Risikoklasse, AI-BOM, 42001/AI-Act-Mapping) | ISO/IEC 42001 + EU AI Act | Kern committed (Dok. 20A §5), **Mapping noch „Ideenparkplatz"** | Echter White Space; unsere KI-Guardrails werden zum verkaufbaren AIMS-Cockpit |
| 2 | **Multi-Framework-Mapping + SoA/Control-Applicability** ohne versteckte Gleichsetzung | ISO 27001:2022, NIS2, DORA, BSI, TISAX | tragfähig (Dok. 08 §3.1/§3.2, ISMS-06; Dok. 09 Control-Passport); **Framework-Pakete/SoA nicht geseedet** | Baseline sauber im Zwilling; „ein Datensatz, mehrere Nachweise" |
| 3 | **Regulatory Change Watch als Managed Service** (Change Record → Delta → Impact) | alle EU-Regelwerke, laufende Novellen | konzipiert (Dok. 14 SF09 + Regulatory Change Monitoring; Dok. 08 ISMS-13, Versionsregel) | Direkte Geschäftsmodell-Chance + Heimat dieser Research-Rolle |
| 4 | **Auditierbarkeit + Evidence-/Retention-/Betroffenen-Lebenszyklus** | GDPR, ISO Kap. 9, SOC 2, NIS2/DORA-Nachweis | konzipiert (Dok. 19); **DB bewusst noch nicht am UI (FINDING-0004/RLS)** | Ein Audit-Mechanismus bedient viele Pflichten; „ehrliche Löschung" als Trust-Merkmal |
| 5 | **Incident-/Meldepflicht-Uhr + Lieferketten-/Drittrisiko-Register mit Fristen & Human Gate** | NIS2 (Meldekaskade), DORA (Incident + Register of Information + TLPT), GDPR-Breach | Prozesse da (Dok. 08 ISMS-10/-11; Dok. 17 Gate mit Frist); **Seed ohne Frist-/Task-Felder (O-WP016-03/04)** | Meldepflicht im Decision Center statt bloßer Ticket-Weiterleitung |

---

## 5. Annahmen, offene Fragen, Nicht-Scope

**Annahmen (benannt, nicht als Entscheidung gesetzt):**
- A1 `[mittel]` Käufersegmente (Dok. 02 „Mittelstand/ISO/NIS2"; „Beratungen/MSPs/vCISOs") priori-
  sieren EU-Regulatorik (NIS2/DORA/AI Act) höher als US-zentrierte Frameworks. → mit Owner prüfen.
- A2 `[mittel]` Framework-Pakete werden lizenz-/urheberrechtlich beschafft (Dok. 08 §Annahmen
  08-A06) — Norm-Volltexte werden **nicht** frei mitgeliefert; das begrenzt, wie „vollständig" ein
  Paket in der Demo sein darf (08-O02).

**Offene Fragen (nicht füllen, DR-0005):**
- Q1 Wird das **ISO-42001/AI-Act-Mapping** aus dem „Ideenparkplatz" (Dok. 20A §37) zu einer
  priorisierten Roadmap-Karte erhoben? → Change Proposal + Owner-Gate (verweist auf 20A-Q09).
- Q2 Welche **Framework-Pakete** sind für Demo/Erstprodukt rechtlich + inhaltlich vollständig
  verfügbar (08-O02)? Reihenfolge z. B. ISO 27001:2022 → NIS2 → DORA → BSI → TISAX/SOC 2?
- Q3 Braucht das „Regulatory Change Record"-Objekt eigene Felder (Quelle, Rechtsraum, Gültigkeit,
  Frist, betroffene Anforderungen/Controls, Impact-Hypothese, Confidence)? → Objektvertrag berührt
  → Concept Author + Human Gate (analog CCP-Muster).

**Nicht-Scope dieses Briefs:** Rechtsberatung, Konformitätsgarantie, Änderung aktiver Spezifikation
oder Code. Jede Umsetzung erst nach Owner-Freigabe über den regulären Change-/Gate-Weg.

---

## 6. Empfohlene nächste Research-Schritte (nicht-bindend)

1. **PDF-Gegenlesen** der `[Konzept-unkorrigiert]`-Belege (Dok. 20A, Dok. 19) sobald `pdf_text.py`
   verfügbar ist — Regel-Null-Konformität dieses Briefs herstellen.
2. **Web-verifizierter Fristen-Anhang** (AI Act Staffelung, NIS2 nationale Umsetzung DE, DORA-
   Anwendbarkeit, ISO-Übergangsfristen) sobald ein Quellen-Tool bereitsteht — die
   `[Trainingswissen]`-Marker durch Primärquellen ersetzen.
3. **Change-Proposal-Entwurf „Regulatory Change Record"** (Q3) als Bindeglied zwischen dieser Rolle
   und dem Objektvertrag — auf CCP-Muster aufsetzen.

---

*Quellenlage dieses Dokuments: Konzept-Markdown `docs/concept/active/` (Provenienz je Aussage
markiert), `docs/project/CURRENT_STATE.md` (Baustand), externes Regulatorikwissen aus Trainingsdaten
(Stand Jan 2026, unverifiziert). Kein Web-Zugriff, keine PDF-Verifikation in dieser Session möglich —
siehe §0.*
