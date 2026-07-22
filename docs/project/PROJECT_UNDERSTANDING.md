# Projektverständnis – ISMS Managed Service Platform

*Erzeugt am 22.07.2026 durch vollständiges Lesen aller 24 aktiven Konzept-Markdowns. Markante Fachbegriffe wurden stichprobenartig gegen die Quellen verifiziert (F01–F09, R01–R12, S01–S11, J01–J13, P01–P12 existieren real). **Nicht autoritativ** — bei Konflikt gilt `docs/concept/active/`. Dient als schneller, dichter Einstieg für neue Sessions.*

> Destilliertes Gesamtverständnis aus allen 24 aktiven Konzeptdokumenten (Stand 22.07.2026, Master-Index v1.2). Diese Verdichtung ersetzt nicht die Einzeldokumente, gibt aber einer neuen Session ein tiefes, konsistentes Bild von Produkt, Fachlogik, Betriebsmodell, Technik und Umsetzungsverfassung, ohne alle Dokumente laden zu müssen. Quelle der Wahrheit bleibt die versionierte Markdown-Konzeptbibliothek unter `docs/concept/active/`.

## Produkt-Essenz & Kernversprechen

Die ISMS Managed Service Platform ist ein **mandantenfähiges, rollenbasiertes Betriebs-, Entscheidungs- und Service-System** für den kontinuierlichen Betrieb von Informationssicherheitsmanagement und skalierbaren Managed Services. Sie ist ausdrücklich **kein klassisches ISMS-Dokumentationswerkzeug** und **kein Ersatz für operative Quellsysteme** (SIEM, Scanner, CMDB, Ticketing, ERP, HR).

Sie wird als **eigenständiges, neutrales B2B2B-Produkt** konzipiert: Ein Beratungs- bzw. Managed-Service-Anbieter betreibt die Plattform und erbringt darüber wiederkehrende ISMS-Leistungen für mehrere Kundenorganisationen; eine spätere Übernahme/Lizenzierung (z. B. durch PwC) ist möglich, aber nicht vorausgesetzt. Primäres wirtschaftliches Ziel ist **skalierbarer, wiederkehrender Umsatz durch Managed Services** (D-002).

**Kernversprechen:** Die Plattform verbindet Unternehmensmodell, ISMS-Fachlogik, aktuelle Bedrohungen, Risiken, Ziele, Controls, Maßnahmen, Nachweise, Zusammenarbeit, Reporting, Automatisierung, Beratung und Managed Services in einem nachvollziehbaren System und beantwortet fortlaufend: *Wo stehen wir? Wo wollen wir hin? Warum ist der Zustand so? Was ist heute der wirksamste nächste Schritt? Welche Wirkung haben Budget, Maßnahmen oder Services? Was hat sich verändert und welche Entscheidung wird gebraucht? Wie belastbar ist die Datenlage?*

**North Star:** Jeder Nutzer versteht jederzeit, was sich verändert hat, was jetzt zählt und welcher nächste Schritt im Verhältnis zu Ziel, Risiko, Zeit, Budget und Verantwortung die größte Wirkung erzeugt.

**Produktprinzipien:** Entscheidungen statt Datenfriedhof · Digitaler Unternehmenszwilling als Kern · individuelle Zielnavigation (Strategie-DNA) · rollenbezogene Erlebniswelten auf einem Datenmodell · Managed Services als Produktkern · messbarer Nutzen (Value Ledger) · **KI-gestützt, nicht KI-abhängig** (deterministische Fallbacks) · Repository-first Umsetzung · vollständiges Zielprodukt mit synthetischer Demo. Der Betriebsfluss lautet durchgängig: **Verbinden → Verstehen → Bewerten → Entscheiden → Handeln → Nachweisen → Lernen**.

## Zielgruppen, Rollen & Erlebniswelten

**Ökosystem:** Betrieben durch einen Beratungs-/Managed-Service-Anbieter, genutzt von mehreren Kundenorganisationen auf einem gemeinsamen, mandantengetrennten Datenmodell. Fünf Rollenfamilien: Executive & Governance, Kunde/ISMS-Betrieb, Beratung/Managed Service, Assurance & Review, Plattform & Betrieb.

**Primäre Zielgruppen:** Beratungs-/Managed-Service-Anbieter (Betreiber, Käufer, Leistungserbringer; erster Pilotkontext); regulierte/sicherheitskritische Unternehmen; Mittelstand mit begrenzter ISMS-Kapazität; komplexe Unternehmensgruppen.

**Kanonisches Rollenmodell (wenige Produktrollen, konfigurierbare Rechte):**
- R01 Executive Sponsor, R02 CISO/Security Lead, R03 ISMS Manager, R04 Business/Process Owner, R05 Asset/Control Owner, R06 Evidence Contributor (Kundenseite)
- R07 Auditor/Assurance Reviewer (unabhängig, Read-only Audit Workspace)
- R08 Managed Service Lead, R09 Engagement Manager, R10 ISMS Consultant, R11 Specialist Consultant (Betreiberseite)
- R12 Tenant/Platform Administrator (beide)

Rollenprinzipien: eine Person kann mehrere Rollen tragen (aktive Rolle sichtbar); Zugriff folgt Mandant/Einheit/Objekt/Auftrag/Aufgabe/Zweck; Entscheidungsrechte getrennt in *beraten, vorschlagen, bearbeiten, prüfen, freigeben, akzeptieren, administrieren*; Delegation zeitlich begrenzt und protokolliert.

**Vier rollenbezogene Erlebniswelten** (gleiche Wahrheit, andere Verdichtung/Sprache/Startpunkt):
- **Executive World** (Executive, CISO): 3–5 Entscheidungen, Business Impact, Optionen, Investitionswirkung, Unsicherheit – keine Roh-Control-Listen.
- **Customer Operations World** (ISMS Manager, Owner, Contributor): Morning Mission, Kundenpuls, Maßnahmen, Evidence, Freigaben, Datenlücken.
- **Consulting & Service World** (Service Lead, Engagement Manager, Consultant): Portfolio, SLA, Kapazität, Reise, wiederverwendbare Workflows, Opportunities – keine verdeckte Mitarbeiterüberwachung.
- **Assurance & Administration World** (Auditor, Admin, Platform Ops): Audit Workspace, Datenherkunft, Versionen, Rechte, Integrationsgesundheit, Logs.

**UX-Prinzipien (Dok. 06):** Entscheidung vor Navigation; eine Wahrheit/mehrere Perspektiven; Klartext vor Fachsprache; Ursache vor Score; Wirkung vor Aktivität; progressive Offenlegung; erklärbare Intelligenz; sichere Reversibilität; Wiederaufnahme statt Neustart; keine Dark Patterns. Globale Shell mit acht stabilen Orten (**Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen, Administration**). Universelle Seitenanatomie (fünf Fragen): *Was ist das? Warum wichtig? Womit hängt es zusammen? Wie entwickelt es sich? Was als Nächstes?* Screen-Katalog S01–S11 (u. a. Mission Control, Customer Workspace, Executive Experience, Portfolio Cockpit, Digital Twin Explorer, Risk & Control Workspace, Audit Workspace, Reporting Studio).

**Nutzerreisen/Lifecycle (Dok. 04):** Entscheidungsrhythmus *Orientieren → Verstehen → Entscheiden → Handeln → Nachweisen → Lernen*; Kunden-/Service-Lebenszyklus *Entdecken → Onboarden → Baselinen → Aktivieren → Betreiben → Prüfen → Anpassen → Übergeben*; 13 priorisierte End-to-End-Journeys (J01–J13) mit Auslösern, Fehlerpfaden, Gates und Decision Records. Kein Service startet allein durch algorithmischen Vorschlag – Aktivierung braucht menschliche Freigabe.

## Digitaler Unternehmenszwilling & Informationsgraph (Kernobjekte + Beziehungen)

Der **digitale Unternehmenszwilling** ist der versionierte semantische Kern (nicht optionale Visualisierung), aus dem Rollenansichten, Entscheidungen, Workflows, Reports, Simulationen und Managed Services gespeist werden. Er modelliert nur die für Sicherheit, Governance, Resilienz, Entscheidungen und Servicebetrieb relevanten Objekte – **kein CMDB-Ersatz, kein Data Lake, kein SIEM**.

**Grundprinzipien (P01–P12):** Semantik vor Speichertechnik · stabile unveränderliche IDs · Beziehungen sind erstklassige Daten · Historie wird nicht überschrieben · Beobachtung/Ableitung/Entscheidung getrennt · eine Wahrheit/mehrere Perspektiven · Unsicherheit sichtbar · Kausalität nur mit Begründung · Mandantentrennung ohne Metadatenleck · erweiterbar ohne Schema-Chaos · menschliche Verantwortung explizit · handlungsorientiert.

**Objektfamilien F01–F09:** F01 Tenant & Unternehmenskontext (Tenant, Organisation, Rechtseinheit, ISMS-Scope, Ausschluss, Strategie-DNA); F02 Organisation & Verantwortung; F03 Geschäft & Information (Business Capability, Prozess, Information Asset, Datenklasse, Kritikalität); F04 Technologie & Infrastruktur; F05 Dritte & Lieferkette; F06 Governance & Anforderungen (Framework, Requirement, Control Objective, Control, Control Implementation, Policy, Ausnahme); F07 Risiko & Veränderung (Threat, Vulnerability, Weakness, Risk Scenario, Risk, Incident, Finding, Change Signal); F08 Arbeit, Nachweis & Assurance (Measure, Task, Evidence, Control Test, Assessment, Audit, Remediation); F09 Ziele, Entscheidungen & Services (Target Profile, Objective, KPI, Decision Record, Managed Service, SLA, Deliverable, Review).

**Objektvertrag (Pflichtfelder):** `object_id`, `tenant_id`, `object_type`, `display_name`, `lifecycle_status`, `scope_ids`, `owner_ids`, `classification`, `source_refs`, `valid_time`, `record_time`, `version`, `quality_state`, konfigurierbare Erweiterungen. **Bitemporalität:** fachliche Gültigkeit (`valid_time`) getrennt vom Systemerfassungszeitpunkt (`record_time`) → historische Stichtagszustände rekonstruierbar.

**Beziehungen R01–R25** (eigenständige, versionierte Datensätze mit Typ, Richtung, Gültigkeit, Quelle, Vertrauen; gekennzeichnet als **assertiert/importiert/abgeleitet/freigegeben**): u. a. `part_of`, `owns`, `operates`, `depends_on`, `processes`, `exposes`, `threatens`, `affects`, `caused_by`, `mitigates` (Control→Risk), `implements`, `satisfies` (Control/Evidence→Requirement), `evidences`, `tests`, `finds`, `remediates`, `requires`, `contributes_to`, `delivered_by`, `covered_by`, `decided_in`, `supersedes`; `related_to` nur als temporärer Fallback.

**Datenqualität/Vertrauen (Dimensionen, nie ein einzelner Score):** Herkunft, Aktualität, Vollständigkeit, Konsistenz, Bestätigung, Verlässlichkeit, Zweckeignung. Ein verdichteter Vertrauensindikator ist erlaubt, ersetzt aber nie die sichtbaren Dimensionen. **Objekt-360**-Navigationsvertrag pro Objektseite. Dateneingang: aufnehmen → normalisieren → identifizieren → validieren → Beziehungen bilden → Konflikte markieren → prüfen/freigeben → veröffentlichen (Rohdaten und kanonischer Zustand getrennt; Golden Record ohne stilles Überschreiben). Cross-Tenant grundsätzlich verboten außer zu versionierten Plattformreferenzen (Frameworks, öffentliche Bedrohungsobjekte).

**Synthetische Demo-Tenants:** Nordwerk Manufacturing SE, Finovia Digital Bank AG, MediCore Health Services GmbH, Consulting Operator Demo – jeweils konsistente Prozess-/Asset-/Risiko-/Control-/Audit-/Serviceketten.

## Modul-/Funktionslandkarte (die Hauptmodule aus Dok. 05)

**Sieben Produktdomänen, 33 Module (M01–M33)** auf gemeinsamem Datenmodell:

**A. Decision & Navigation:** M01 Mission Control/Decision Center · M02 Morning Mission · M03 Executive Experience · M04 Portfolio Cockpit.

**B. Kunde, Strategie & Lifecycle:** M05 Customer Workspace · M06 Strategie-DNA & Zielprofile · M07 Onboarding & Lifecycle.

**C. Digitaler Zwilling & ISMS-Kern:** M08 Digitaler Unternehmenszwilling · M09 Scope, Organisation & Asset Governance · M10 Risk Management · M11 Requirements & Control Management · M12 Maßnahmen & Improvement Projects · M13 Policies & Document Control · M14 Evidence & Assurance · M15 Audits, Findings & Management Review · M16 Third-Party & Supply Chain.

**D. Intelligence & Optimierung:** M17 Threat & Change Intelligence · M18 Maturity, Readiness & Benchmarking · M19 Route Planner & Scenario Simulation · M20 Recommendation & Opportunity Engine.

**E. Zusammenarbeit & Kommunikation:** M21 Team Workspace & Decision Records · M22 Workflow, SLA & Escalation Engine · M23 Reporting, PDF & Presentation Engine · M24 Briefings, Notifications & Knowledge.

**F. Managed-Service- & Beratungsbetrieb:** M25 Service Catalog & Configuration · M26 Service Delivery & Value Management · M27 Consultant Operations & Resource Planning · M28 Multi-Tenant Scale & Practice Intelligence.

**G. Integration, Plattform & Administration:** M29 Integration Hub · M30 Automation & Workflow Designer · M31 Identity, Rights & Tenant Administration · M32 AI Assistance & Guardrails · M33 Platform Operations & Observability.

**Cross-Cutting Capabilities:** gemeinsame Objektlogik, rollenbezogene Perspektiven, Kausalität/Wirkung, Versionierung/Decision Records, Suche/Wiederaufnahme, Datenvertrauen, barrierearme Komplexität, Exportierbarkeit, Observability, KI-Fallback. **Umsetzungsgrade** (Vision bleibt vollständig): vollständig produktive Flagship-Journeys · konsistent interaktive Produktflächen · klar gekennzeichnete deterministisch simulierte Erweiterungen.

**Kanonische Zustände:** Objekt (`Entwurf → geprüft → freigegeben → überholt`); Risiko (`identifiziert → bewertet → entschieden → behandelt → überwacht → geschlossen`); Control (`nicht bewertet → geplant → implementiert → wirksam → eingeschränkt → unwirksam`); Maßnahme (`Idee → bewertet → freigegeben → in Arbeit → blockiert → Nachweis → Wirksamkeitsprüfung → abgeschlossen`); Evidence (`angefordert → geliefert → geprüft → akzeptiert/abgelehnt → abgelaufen`); Entscheidung, Service, Audit analog.

## ISMS-Fachlogik (Risiken, Controls, Maßnahmen, Evidence, Audits, Reifegrad, Control Intelligence)

**Frameworkneutraler Prozesskern mit versionierten Mappings** (Dok. 08). Startbezüge: ISO/IEC 27001:2022 (+Amd. 1:2024 Klimabezug), BSI IT-Grundschutz, NIS2, DORA – nicht als identische Checklisten, sondern getrennt nach Managementsystem-Anforderungen, regulatorischen Pflichten, technischen/organisatorischen Controls, Nachweis-/Meldepflichten, Zertifizierungskriterien und kundenspezifischen Risikoentscheidungen.

**ISMS-Betriebsmodell (5 Phasen):** Ausrichten → Verstehen & Bewerten → Entscheiden & Umsetzen → Betreiben & Überwachen → Assuren & Verbessern (ereignis- statt jahresgetrieben).

**18 kanonische Kernprozesse ISMS-01…ISMS-18:** Kontext/Governance/Leitungsverantwortung; Scope- & Zielprofilmanagement; Struktur-/Asset-/Abhängigkeit; Schutzbedarf/Kritikalität; Risikomanagement; Anforderungs-/Control-/SoA-Management; Maßnahmen/Verbesserung; Policy-/Dokumentenlenkung; Evidence-/Control-Assurance; Lieferanten-/Drittrisiko; Incident-/Schwachstellen-/Threat-Verknüpfung; Awareness/Kompetenz; Compliance-/Verpflichtungsmanagement; Audit-/Assessmentmanagement; Findings/Abweichungen/Ausnahmen; Ziele/KPIs/Management Review; Change-/Projekt-/Scope-Impact; kontinuierliche Verbesserung/Lessons Learned.

**Prozessprinzipien (P01–P15):** Zielorientierung (kundenspezifisches Zielprofil statt Maximalreife) · Geschäftsbezug · ein Datensatz/mehrere Nachweise · Nachvollziehbarkeit · Trennung Erstellung/Freigabe · menschliche Verantwortung · Proportionalität · Evidenz statt Behauptung · Ausnahme mit Ablaufdatum · versionierte Wahrheit · Kernfunktion ohne generative KI.

**Intelligence-Schicht (Dok. 09) – vier getrennte Dimensionen** (nie eine „magische Sicherheitszahl“): **Reife**, **Risiko**, **Control Intelligence** (tatsächliche Schutzwirkung im Scope), **Vertrauen/Confidence**. Threat-Pfad: *Signal → Relevanz → Risikoszenario → Control-Impact → Entscheidung → Maßnahme/Managed Service → Wirksamkeitsprüfung* (Bedrohungen nicht pauschal auf alle Kunden).

- **Strategie-DNA:** versionierte Steuerungskonfiguration (Pflichtdimensionen u. a. Geschäftsziel, Scope, Zielart, Risikobereitschaft, Zeithorizont, Ressourcenrealität, Delivery-Modell, Nachweistiefe, Änderungsdynamik, Kommunikationsstil).
- **Zielprofiltypen:** Baseline, Maturity, Readiness, Risk-Reduction, Resilience, Transformation, Hybrid – ein **primäres Steuerungsprofil** ist erforderlich; Audit-Readiness ist nur *eine* Zielart.
- **Reifegradmodell:** je Capability im Scope, Skala 0–5 (Nicht vorhanden → Initial → Wiederholbar → Definiert → Gesteuert → Adaptiv), vier Facetten Design/Implementierung/Betrieb/Wirksamkeit. Referenzformel: `Maturity = 0,20·Design + 0,25·Implementierung + 0,20·Betrieb + 0,35·Wirksamkeit` (versioniert konfigurierbar; fehlende Facette senkt Confidence, wird nicht still 0). Roll-up gewichtet nach Kritikalität/Scope/Zielrelevanz plus niedrigste kritische Capability, Anteil unter Ziel, unbewertete kritische Capabilities.
- **Modellprinzipien M01–M15:** keine Einzahl-Wahrheit · Ziel vor Score · Evidence vor Selbstauskunft · erklärbare Berechnung (Methode, Version, Inputs, Gewichtung) · Confidence getrennt · ereignisgetriebene Neubewertung · menschliche Übersteuerung · keine automatische Risikoakzeptanz · Proportionalität · historische Rekonstruktion · kein verstecktes Upselling · Kernlogik ohne generative KI · keine Scheingenauigkeit · Kalibrierung statt Dogma · Vergleich nur bei Vergleichbarkeit.

Modelle sind **konfigurierbare Managementhilfen**, keine naturwissenschaftliche Messung; numerische Werte dienen Vergleich/Priorisierung/Trend/Simulation, nie als Garantie oder Zertifizierungsurteil.

## Decision Center, KPIs, Morning Mission & Simulationen

Das **Decision Center** ist die tägliche Bedienlogik über alle Module (kein dekoratives Dashboard) und übersetzt Veränderungen im Zwilling in wenige, erklärbare, handlungsfähige Entscheidungen mit Zielbezug, Ursache, erwarteter Wirkung, Aufwand, Unsicherheit, Abhängigkeiten, Alternativen, Verantwortlichen und späterer Ergebnisprüfung.

**Vier Erlebniswelten:** Morning Mission (persönliche Tagessteuerung) · Customer Decision Center (ein Unternehmen) · Portfolio Mission Control (mehrere Mandanten) · Executive Decision Center (geschäftsrelevante, freigabefähige Entscheidungen).

**Morning Mission** (keine To-do-Liste, sondern Outcome-Mission), fünf Ebenen: **Mission · Warum heute · Impact · Strategie · „Das solltest du wissen"**. Priorisierungssignale (Referenzlogik, sichtbare Top-3-Gründe): Kritikalität, Zielabweichung/Restzeit, Risikoveränderung, Control-/Evidence-Lücke, Frist, Blockerwirkung, erwarteter Impact, benötigte/verfügbare Kapazität, Reversibilität, Confidence/Datenalter, Eskalation, Reise-/Terminrealität. Mission-Zustände: Vorgeschlagen → Bestätigt → In Arbeit → Blockiert → Neu berechnet → Erreicht/Teilweise erreicht/Verworfen.

**Steuerungsprinzipien D01–D15:** Entscheidung vor Datenmenge · Rolle/Situation bestimmen Verdichtung · keine Black-Box-Priorität · Zielprofil vor generischem Ideal · Wirkung vor Fälligkeit · Mensch entscheidet Wesentliches · Baseline bleibt sichtbar · Bandbreite statt Scheingenauigkeit · Nutzen wird nachgemessen · kein verstecktes Upselling · Reproduzierbarkeit · Kernsteuerung ohne generative KI · Datenlücken sind ein Ergebnis · realistische Kapazität (inkl. Reise) · jede Seite beantwortet eine Frage.

**Simulationen** (M19 Route Planner/Scenario Simulation): Managementhilfen mit sichtbarer Baseline (Nichtstun/aktuelle Route) und mehreren Optionen; jede Option mit Kosten, Zeit, interner/externer Kapazität, erwarteter Ziel-/Risikowirkung, Confidence, Abhängigkeiten und nicht-monetären Konsequenzen. Routentypen: schnell, kosteneffizient, risikominimierend, servicegestützt; What-if und Re-Planning. **Value Ledger** weist erwartete und realisierte Wirkung (Risikoreduktion, Zielerreichung, Zeitersparnis, Servicewert) aus.

## Zusammenarbeit, Reporting & Presentation-as-Code

**Zusammenarbeit (Dok. 11):** kontextgebundene Arbeit statt isolierter Chats/E-Mail; einheitliches **Work-Item-Modell** (Task, Evidence Request, Approval, Meeting Action, Eskalation als Typen einer gemeinsamen Basishülle). Pflichtfelder u. a. Identität, fachlicher Kontext, Zweck/Outcome, genau **ein Owner**, Bearbeitung/Beteiligte, Status, Zeit/SLA, Priorität (aus Dok. 10), Definition of Done, Abhängigkeiten, Kommunikations-Thread, Artefakte, Vertraulichkeit, Audit Trail, Outcome Review. Prinzipien C01–C15: Kontext vor Kanal · Outcome vor Aktivität · ein verantwortlicher Owner · Verantwortung bleibt menschlich · Entscheidungen sind eigene Objekte · granulare Freigaben · kein stilles Überschreiben · Attention ist knapp · Eskalation erhöht Entscheidungskompetenz · Übergabe ist Produktobjekt · Evidence getrennt von Behauptung · Mandantengrenzen sichtbar · Wiederaufnahme als Hauptweg.

**Reporting/Presentation-Engine (Dok. 12 v1.1):** Prinzip **One Source, Many Responsible Narratives** – ein freigegebener Snapshot, mehrere zielgruppengerechte Sichten ohne widersprüchliche Fakten. Kanonisches Objekt **Report Package** (Kommunikationsziel, Zielgruppe, Scope, Snapshot, Storyline, Content Blocks, Owner/Reviewer/Approver, Klassifikation, Artefakte, Verteilung, Historie, Outcome). Lebenszyklus `geplant → Daten geprüft → Entwurf → fachliche Prüfung → zur Freigabe → freigegeben → veröffentlicht → verteilt → abgelaufen/ersetzt → archiviert`. Reporttypen: Executive One-Pager, Vorstandspräsentation, Management Review Pack, Investment Brief, Change Brief; CISO-/ISMS-/Audit-/Service-Unterlagen. Prinzipien R01–R15: eine Datenbasis/mehrere Sichten · Zweck vor Format · Entscheidung vor Datenmenge · Snapshot statt bewegliches Ziel · Quelle am Claim · Unsicherheit sichtbar · Entwurf ist keine Freigabe · rollenbezogene Sprache · editierbar aber kontrolliert · Corporate Design als Konfiguration/White-Label · Barrierefreiheit · Sicherheit vor Komfort · Automatisierung kontrolliert · Outcome wird gemessen.

**Presentation-as-Code (D-022):** wiederkehrende PPTX/PDF-Cases als versionierte **Presentation Cases** mit **Presentation Manifest** (Zielgruppe, Daten-Snapshot, Sections, Template-Version, geschützte manuelle Inhalte, Veröffentlichungsstatus), Update-Diff und Update Requests statt Neuerstellung. **Kreativität mit Zielgruppen-Governance (D-023):** humorvolle/meme-ähnliche Visuals nur optional, rechtegeprüft, zielgruppenabhängig; formale Executive-/Audit-/regulatorische Ausgaben standardmäßig ohne Humor.

## Managed-Service-Modell (Betriebsmodell, Servicekatalog/SLAs/Preise, Berater-Ops, Onboarding/Lifecycle)

**Betriebsmodell (Dok. 13):** Ein Managed Service ist eine **versionierte, kundenspezifische Service Instance** mit Outcome, Scope, Verantwortungen, Betriebsrhythmus, Qualitätsregeln, Leistungsversprechen, Datenbasis, Governance, Wertnachweis und Exit-Fähigkeit – kein offenes Beratungsprojekt. Objektmodell: **Service Definition** (versioniertes, mandantenunabhängiges Muster) → **Service Offer** (kommerzielle Ausprägung) → **Service Instance** (aktivierte, freigegebene Leistung) → **Service Run** (konkrete Erbringung). Kreislauf: Bedarf/Ziel → Konfiguration → Transition & Operational Readiness (Baseline) → Delivery in Service Runs → Qualität/SLA/OLA/Wert prüfen → Service Review → Rückführung in Methoden/Templates. Prinzipien MS01–MS15: Outcome vor Aktivität · Kundenziel vor Standardideal · **Shared Responsibility** sichtbar (Kunde/Provider/Plattform) · Standardkern + kontrollierte Konfiguration · Service ≠ Projekt · versioniert · Datenvertrauen als Leistungsteil · menschliche Freigaben · Automatisierung nur im Vertrag · eingebaute Quality Gates · mehrdimensionaler Wert · Eskalation kein Versagen · **Exit-Fähigkeit Pflicht** · Portfolio-Lernen respektiert Mandantentrennung · keine versteckte Verkaufslogik.

**Servicekatalog/SLAs/Preise (Dok. 14):** Vier kommerzielle Ebenen: **Platform Subscription · Service Offer · Service Instance · Change/Usage**. Objekte: Service Family, Service Definition, Service Offer, **Package**, **Price Book** (versionierte Preisregeln), **Quote** → **Commercial Baseline**. Preistreiber: Scope/Rechtseinheiten, Zielprofil/regulatorische Komplexität, Objekt-/Control-Menge, Datenqualität/Integrationsgrad, Service-Tiefe, Frequenz/Reaktionszeit, Skill Mix, Vor-Ort-Anteil/Reise, Risikoreserve. Prinzipien CP01–CP15: Outcome vor Stunden · Plattform/Service getrennt · modular aber kohärent · transparenter Mengentreiber · kein „Unlimited" ohne Guardrail · SLA misst Beherrschbares (Reaktions-/Bearbeitungs-/Lieferziele getrennt) · keine Zertifizierungsgarantie · versionierte Preisänderungen · Wert ≠ Preis · Rabatt ändert keinen Scope · interne Alternative sichtbar · Exit möglich · Marktanker ≠ Preisliste · Marge folgt Standardisierung · maschinenlesbare Pricing Rules. Alle Preise sind **synthetische Annahmen/öffentliche Marktanker**, keine internen PwC-Preise.

**Berater-Operations (Dok. 15):** „Operations Center für sicherheitsrelevante Kundenarbeit" – nicht maximale Auslastung, sondern Wirkung unter realen Grenzen. Objekte: Portfolio, Engagement, Demand Item, **Work Package** (kleinste planbare Einheit mit Outcome, Skills, Aufwand, Owner/Reviewer/Approver, Remote-/Vor-Ort). Prinzipien O01–O15: Wirkung vor Aktivität · Qualität vor Auslastung · Menschen bleiben verantwortlich · Kapazität > Stunden · **Reise ist Arbeit** · Vertretbarkeit als Qualitätsmerkmal · erklärbare Wirtschaftlichkeit (Cost-to-Serve/Marge/Rework getrennt von Mitarbeiterbewertung) · kein automatisches Cross-Selling · Standardisierung mit Ausnahmerecht · Kapazitätspuffer · versionierte Planung · Privatsphäre/Fairness · nachhaltige Skalierung.

**Onboarding/Lifecycle (Dok. 16):** kontrollierter Übergang von einer Annahme zu einem betreibbaren System; drei Einstiegspfade (**Guided Quickstart, Collaborative Workshop, Structured Import**) → gleiche kanonische Objekte. Fünf Ergebnisse: Scope, Strategie-DNA, Target Profile, Baseline (mit Confidence), freigegebene Zielroute. Objekte: Customer Account, Organization Profile, Onboarding Case, Scope Proposal → Approved Scope, Strategy DNA, Target Profile, Baseline Assessment, Target Route. Prinzipien OL01–OL16: Ziel vor Vollständigkeit · Kundenrealität vor Standardideal · eine Wahrheit/mehrere Pfade · Annahmen sichtbar · progressiver Tiefgang · Datenminimierung · menschliche Freigabe · Reversibilität · **kein Lock-in** · explizite Shared Responsibility · **Operational Readiness vor Go-live** · Datenvertrauen vor Scheingenauigkeit · Lifecycle statt Projektabschluss · kommerzielle Transparenz · keine stille Scope-Ausweitung · Wirkung in jeder Phase.

## Integrationen, Automatisierung & Workflow-Designer

**Zielbild (Dok. 17):** Plattform als **Nervensystem** – externe Signale in Sicherheitsentscheidungen übersetzen, Quellsysteme nicht ersetzen. Fünf Schritte: **Verbinden → Verstehen → Übersetzen → Abgleichen → Aktivieren**. Sieben logische Ebenen: External Systems, Connector Gateway, Staging & Validation, Mapping & Reconciliation, Canonical Graph & Event Backbone, Workflow & Automation Engine, Experience & Decisions. Sechs Integrationsmuster: manuelle Eingabe, Dateiimport, geplante Sync, Delta-Sync, Webhooks, Event-/Datenstreams.

**Kanonische Integrationsobjekte:** Connector Definition, Connection Instance, **Credential Reference** (nie Klartext-Secrets; Verweis auf Secret Store), Data Contract, Mapping Profile, Sync Job, Event Subscription, **Event Envelope** (vereinheitlicht, mit Correlation/Causation ID, Idempotenz).

**Prinzipien IA01–IA18:** Quellsysteme bleiben Quellen · **Canonical First** (über versionierte Datenverträge in Dok.-07-Objekte) · Herkunft bleibt erhalten · **Least Privilege / read-only Standard** · Event vor Polling (mit Reconciliation-Fallback) · **Idempotenz** · keine stille Überschreibung · **Human Gates** für kritische/irreversible Aktionen · Erklärbarkeit · Reversibilität (Preview/Testmodus/Rollback) · Fehler als Betriebszustände · Mandantentrennung · Datenminimierung · Konfiguration vor Code · Standards vor Sonderwegen · operative Sichtbarkeit (Connector Health, Datenfrische) · kein Automations-Theater · Demo ohne Produktivdaten.

**Workflow-Designer:** Workflow als versioniertes, testbares, erklärbares Produktobjekt (Trigger, Scope, Bedingungen, Kontextanreicherung, Aktionen, Human Gates, Fehlerpfade, Evidenz, Erfolgskriterien, Rollback). Strikte Trennung: deterministische Automatisierung · regelbasierte Empfehlung · KI-gestützte Assistenz · menschliche Entscheidung. Beratungen erstellen geprüfte **Workflow Blueprints** zur mandantenübergreifenden Wiederverwendung (Kunden erben/konfigurieren/pausieren/ablehnen). Keine Automation darf ohne Freigabe Services buchen, Risiken akzeptieren, kritische Findings schließen, externe Systeme destruktiv ändern oder Entscheidungen vortäuschen.

## Technische Architektur (Kurzfassung, konsistent mit ADR-0001)

**Referenzarchitektur (Dok. 18):** **Modularer Monolith mit getrennten Laufzeit-Workern** (bewusst kein früher Microservice-Zoo), **API-first, event-aware, tenant-aware**. Führender Store **PostgreSQL** (Fachzustand, Workflowzustand, Tenantkonfiguration, Audit, Outbox); Graph als relationales Node-/Edge-Modell mit Graph-Repository-Abstraktion; Cache/Queue via **Redis + BullMQ** (nie führende Wahrheit); **S3-kompatibler Object Storage** (MinIO lokal); **Search Index/Graphprojektion sind ableitbare Projektionen**. Zuverlässigkeitsmuster **Transaction + Outbox + Idempotent Worker + Checkpoint**; checkpointfähige, Postgres-gestützte Workflow Runtime. Prozesse des ersten Builds: Web Frontend, Application API, General/Workflow/Connector/Report Worker, PostgreSQL, Redis, Object Storage, Observability Collector (OpenTelemetry). Container via Docker/OCI Compose.

**Architekturprinzipien TA01–TA20:** modularer Kern vor Microservices · PostgreSQL führend · Projektionen ersetzbar/rebuildbar · **Tenant Context Pflicht** · **Deny by Default** · Contracts vor Kopplung · sync für Antwort/async für Dauer · durable state nicht in Redis · atomare Veröffentlichung · Idempotenz Standard · Observability by Design · Sicherheit ist Architektur · Datenminimierung · Portabilität ohne Abstraktionstheater · IaC · Rebuild statt Handarbeit · Migrationen sind Produktänderungen · Demo/Produktion getrennt · echte Human Gates · Betriebsfähigkeit gehört zur DoD. **Bounded Contexts:** Identity & Tenancy, Customer Lifecycle, Digital Twin, ISMS Core, Intelligence, Decision Center, Collaboration, Reporting, Managed Services, Portfolio Operations, Integration, Automation, Platform Administration (keine Direktzugriffe zwischen Modultabellen; Kommunikation über Commands/Queries/Domain Events).

**Verbindlicher Stack (ADR-0001, Accepted):** durchgängig **TypeScript** · Frontend **React + Next.js (App Router)** · Backend **Node.js + NestJS** (modularer Monolith, getrennte Worker) · **PostgreSQL** (Graph als Node/Edge + Repository-Abstraktion) · **Redis + BullMQ** · Docker/OCI · Monorepo **pnpm Workspaces + Turborepo** · Tests **Vitest** (Unit), **Playwright** (E2E ab UI-Flows) · ESLint + Prettier. Reversibel/offen: ORM (Prisma vs. Drizzle, entschieden ab WP-003 mit DB-Bedarf). Docker aktuell nicht installiert – minimales WP-002-Gerüst (Health-Endpoint, Web-Shell, Smoke-Test) läuft ohne Docker; Postgres/Redis ab WP-003. Repo-Struktur: `apps/web`, `apps/api`, `packages/*`, `workers/`.

## Sicherheit, Datenschutz, Auditierbarkeit

**Modell (Dok. 19):** **Defense-in-Depth & Zero Trust** – jeder Zugriff serverseitig bewertet nach Identität, Mandant, Objekt, Beziehung, Zweck, Sensitivität, Sessionrisiko, Delegation, ggf. menschlicher Freigabe. Kombination aus föderierten Enterprise-Identitäten (OIDC/SAML), phishingresistenter MFA/Passkeys für privilegierte Aktionen, kurzlebigen Sessions, **RBAC + ABAC + beziehungsbezogenen Regeln**, Step-up Authentication, mehrschichtiger Mandantenisolation (App, DB/RLS, Queue, Storage, Search, Reporting, Observability), Datenklassifikation, Verschlüsselung in Transit/at Rest, Key Management.

**Prinzipien SP01–SP20:** **Deny by Default** · Server-side Enforcement · **Tenant First** · Least Privilege · **No Standing Privilege** (zeitlich aktivierte Rechte) · **Separation of Duties** · Explicit Purpose · Data Minimisation · **Privacy by Design & Default** · Strong/phishingresistente Auth · Continuous Verification · Cryptographic Agility · Immutable Intent (atomare Audit-Absicht) · Explainable Authorization · Secure Failure · **Human Authority** (KI/Agenten finalisieren keine kritische Risikoakzeptanz/Löschung/Break-Glass/Produktivfreigabe) · Evidence over Assertion · Customer Visibility · Safe Demonstration · Security as Code.

**Drei getrennte Auditierbarkeitsebenen:** **Canonical Audit Records** (fachliche Zustandsänderungen, Freigaben, privilegierte Zugriffe, manipulationsgeschützt) · **Technical Logs** (Diagnose/Detection, begrenzte Retention, keine Secrets) · **Evidence Artefacts** (Umsetzungs-/Wirksamkeitsnachweise mit Quelle, Hash, Version, Gültigkeit, Freigabe). Schutzgüter, Trust Boundaries und Threat Model definiert; **Break Glass**, zeitlich begrenzter Supportzugriff, Legal Hold, nachweisbare Löschung. Cross-Client-Benchmarks nur aggregiert/anonymisiert (nicht durch bloßes Entfernen des Firmennamens). Der Demonstrator implementiert **echte** Authentisierung, Rollen, Tenant Context, serverseitige Autorisierung, Audit Records und sichere Datei-/Exportpfade – keine Sicherheitsentscheidung nur im Frontend.

## KI-Funktionen, Guardrails & virtuelle Agentenorganisation

**KI-Produktverfassung (Dok. 20A):** **KI-gestützt, aber nicht KI-abhängig** – Reifegrad, Risikologik, Control-Wirksamkeit, Routen, Status, Berechtigungen, Freigaben, Audit Records, SLAs bleiben deterministisch; KI erklärt/verdichtet/klassifiziert/entwirft/sucht/schlägt vor. Jeder Use Case im **AI Use Case Register** (Owner, Zweck, Datenklassen, Autonomiestufe, Risikoklasse, erlaubte Modelle, Human Gate, Qualitätsziele, Testsets, Kostenbudget, Fallback, Kill Switch). Zentraler **AI Control Plane** erzwingt Verträge vor jedem Modellaufruf; **Model Gateway** providerneutral; **deterministischer Demo Adapter** wenn kein Provider verfügbar.

**Prinzipien AI01–AI20:** Purpose before Model · Core without Generative AI · Proposal not Truth · Tenant & Purpose Bound · Minimum Necessary Context · Evidence over Eloquence · Human Authority · Structured by Default · Explainable Operation · Safe Retrieval (Rechteprüfung, keine Instruktionsübernahme aus Dokumenten) · Provider Portability · Bounded Agency · Test before Trust · Graceful Degradation · No Silent Learning (keine Kundendaten fürs Training) · Continuous Assurance · Visible AI · Correctability · Proportional Control · Killable by Design. **Fähigkeitsfamilien:** Language/Knowledge/Analytical/Action Assistance. **Autonomiestufen A0–A4** (A4 bewusst eng: nur risikoarme reversible Aktionen). Priorisierte Use Cases AI-UC01…: Customer Executive Summary, Risk Explanation, Measure Drafting, Evidence Classification, Control-Evidence Mapping, Management Narrative, PowerPoint Storyline, Tenant-scoped Q&A, Morning Mission Explanation, Threat Signal Triage, Workflow Draft – jeweils mit Human Gate und deterministischem Fallback.

**Virtuelle KI-Firma (Dok. 20B):** kleines, kontrolliertes, **artifact-first** arbeitendes „Softwareunternehmen". Human Product Owner behält Vision/Priorität/materiale & irreversible Freigaben; CEO-/Orchestrator-Agent plant/zerlegt/stafft. Vier Säulen: Produkt & Fachlichkeit · Engineering & Architektur · Assurance & Governance · Wissen & Kontinuität. Grundregeln: Repository statt Chat als Gedächtnis · ein Accountable Owner pro Ergebnis · Bauen und Prüfen getrennt · Parallelität nur bei sauberer Isolation · Menschen behalten materiale Entscheidungen. Jede Rolle hat einen versionierten **Role Contract** (Mission, Scope/Nicht-Scope, Inputs/Outputs, Tools, Autorität, Human Gates, Reviewpflicht, DoD, Übergabe, Budget, Stop Conditions). Minimaler Dauerkern: Human Product Owner, CEO/Orchestrator, Product & Domain, Architecture & Engineering, Quality & Security, Project Memory & Documentation, GitHub/Delivery Steward. HR-/Capability-Agent schlägt nur Rollen vor (mit belegtem Bedarf, Budget, Owner, Abschaltkriterium).

## Research-, Innovations- & Konzeptpflegebetrieb

**Kontinuierliches Research- und Innovationsbetriebssystem (Dok. 21, D-021):** geschlossener Lernkreislauf **Observe → Verify → Interpret → Imagine → Decide → Specify → Deliver → Measure → Learn** (9 Phasen, je mit verbindlichem Artefakt und Exit-Kriterium: Signal Record, Evidence Note, Research Brief, Idea Set, Portfolio Decision, Concept Change Proposal, Work Package/PR, Outcome Review, Learning Record).

**Dauerhafte Research-Agenten:** Research Orchestrator, Competitive-Intelligence-Agent, Regulatory-&-Standards-Watch, Threat-&-Technology-Signal, User-&-Service-Research, Idea-&-Innovation, **Concept Author** (arbeitet genehmigte Änderungen als neue/aktualisierte Konzeptdokumente aus), **Concept Consistency Reviewer** (prüft Abhängigkeiten, Begriffe, Datenmodell, Entscheidungen auf Widersprüche), Roadmap-&-Portfolio-Agent, **Presentation Curator**.

**Verfassung:** Research beginnt mit einer Frage · eine Quelle ≠ Beweis · Fakt/Interpretation/Idee getrennt · Wettbewerber legal/respektvoll beobachten · Neuheit ≠ Nutzen · keine Feature-Akkumulation ohne Kohärenz · Repository ist Gedächtnis · jede Konzeptänderung mit Impactanalyse · neue Dokumente sind Ausnahme (erst Erweiterung/ADR/Feature Spec prüfen) · Concept Author entscheidet nicht über eigene Wahrheit · Mensch bleibt Produktverantwortlicher. Sechs Signalarten (Regulierung/Standards, Cyberbedrohung/Schwachstellen, Wettbewerber/Markt, Technologie/Plattform, Nutzer/Delivery, Geschäft/Ökosystem) über versionierte **Source Registry**; Primärquellen u. a. BSI, ENISA, EUR-Lex, CISA KEV, NVD, MITRE ATT&CK. Externe Signale ändern nie direkt eine aktive Spezifikation – nur über nachvollziehbare **Concept Change Proposals** mit menschlicher/delegierter Freigabe.

## Roadmap-Phasen (0–9)

Die Phasen priorisieren die **Integrationsreihenfolge**, nicht den Vision-Umfang (Bauplan Dok. 20C):

- **Phase 0 – Repository Bootstrap:** fortsetzbares, getestetes Claude-/GitHub-Setup (Struktur, `CLAUDE.md`, `.claude/`-Konfig, Templates, Checkpoint-/Context-Pack-Skripte, Basis-CI). Abnahme = **Context-Loss-Drill** (Session B setzt ohne alten Chat fort).
- **Phase 1 – Product Shell & Demo Foundation:** Web-Shell, neutrales Enterprise-Designsystem, Login/Rollenwechsel, mehrere synthetische Unternehmen, Mandantenkontext, Navigation/Seitenmuster, Seed Reset, Feature Flags, Accessibility-/Visual-/E2E-Baseline.
- **Phase 2 – Digitaler Unternehmenszwilling:** kanonische Objekt-/Beziehungstypen, 360°-Ansichten, Historie, Graphprojektion, Confidence/Data Quality, Impact Path.
- **Phase 3 – ISMS Core:** Zielprofil/Scope/Schutzbedarf, Risiko-/Control-Lifecycle, Maßnahmen/Evidence, Policy-Lenkung, Lieferanten/Findings/Ausnahmen, Audit-/Management-Review-Grundlagen.
- **Phase 4 – Intelligence & Decision Center:** Reifegrad, Threat-/Control Intelligence, Morning Mission, Customer/Portfolio Decision Center, KPI Contracts, Routen-/Investitionssimulation, Decision Cards, Value Ledger.
- **Phase 5 – Collaboration & Reporting:** Work Items, Freigaben/Decision Records, Notification Center, Management Reports, PPTX-/PDF-Engine, Executive Experience, nachvollziehbare Claims/Quellen/Snapshots.
- **Phase 6 – Managed-Service-Betrieb:** Service Definition/Offer/Instance/Run, Shared Responsibility, Servicekatalog/Paketkonfiguration, SLA-/SLO-Logik, Value Ledger, Service Review, Kunden-Lifecycle (Expansion/Reduction/Exit).
- **Phase 7 – Berater- & Portfolio-Operations:** Portfolio Mission Control, Ressourcen-/Skill-/Kapazitätsplanung, Vor-Ort-/Audit-/Reise-/Kostenplanung, Coverage/Vertretung/Handover, Cost-to-Serve, ethische Opportunity-Erkennung.
- **Phase 8 – Integrationen & Automatisierung:** Connector Framework (Entra/Ticketing/Security/Cloud/Dokumenten-Mocks), Sync/Webhook/Reconciliation/Health, Workflow Designer, Human Gates/Retry/Dead Letter/Replay.
- **Phase 9 – KI & Hardening:** Model Gateway & AI Control Plane, guarded Summaries/Reports/Risikoerklärungen/Empfehlungen, RAG mit Quellen/Tenant Scope, Deterministic Demo Mode, Security-/Privacy-/Performance-/Resilience-Hardening, vollständige 5–10-Minuten-Demo-Story, Übergabe-/Betreiberpaket.

## Globale Entscheidungen D-001…D-023 (je 1 Zeile)

- **D-001 – Eigenständiges Produkt:** neutraler Entwurf; spätere Übernahme/Lizenzierung möglich, nicht vorausgesetzt.
- **D-002 – Managed-Service-Ziel:** primäres wirtschaftliches Ziel ist skalierbarer, wiederkehrender Umsatz.
- **D-003 – Vollständige Produktvision:** ausgereiftes Zielprodukt, phasenweise Umsetzung ohne Visionsverlust.
- **D-004 – Einheitliches Datenmodell:** alle Erlebniswelten auf demselben mandantengetrennten Modell.
- **D-005 – Digitaler Zwilling:** fachlicher Kern und verbindende Grundlage.
- **D-006 – Individuelle Ziele:** Kunden konfigurieren Zielprofil/Serviceanteil; Audit Readiness optional.
- **D-007 – Decision-first UX:** Ursache, Wirkung, Unsicherheit, Entscheidung, nächster Schritt vor Datenlisten.
- **D-008 – Messbarer Mehrwert:** Nutzen über fachliche, operative und wirtschaftliche Kennzahlen sichtbar.
- **D-009 – Reporting Engine:** PDF/PPTX/sichere Webausgaben als Kernprodukt.
- **D-010 – Integration statt Ersatz:** Quellsysteme anbinden, ihre Daten in ISMS-Kontext übersetzen.
- **D-011 – Modulare Referenzarchitektur:** Start als modularer Monolith mit getrennten Workern.
- **D-012 – Security & Privacy by Design:** Mandantentrennung, Least Privilege, Auditierbarkeit, Datenminimierung, Human Gates verbindlich.
- **D-013 – KI-Prinzip:** providerneutral, kontrolliert, evaluierbar, deterministische Fallbacks.
- **D-014 – Demoumgebung:** mehrere Unternehmen, Rollen, Integrationen, Journeys mit synthetischen Daten.
- **D-015 – Keine vertraulichen Firmendaten:** keine nichtöffentlichen PwC-/Kundendaten, internen Preise, geschützten Vorlagen.
- **D-016 – Repository als Gedächtnis:** Markdown, ADRs, Status, Tests, Checkpoints sind die fortsetzbare Projektquelle.
- **D-017 – Häufige Zwischen-Checkpoints:** Sicherung auch innerhalb langer Arbeitsschritte, nicht erst am Sessionende.
- **D-018 – Kontrollierte Agentenfirma:** klare Rollen, begrenzter Kontext, Builder-Reviewer-Pairs, menschliche Stop Gates.
- **D-019 – Dokumentformate:** Markdown verbindliche Arbeitsquelle; DOCX/PDF synchronisierte Lesefassungen.
- **D-020 – Versionserhalt:** frühere freigegebene Versionen werden archiviert, nicht gelöscht.
- **D-021 – Kontinuierlicher Research-Betrieb:** strukturierte Beobachtung; Änderungen nur über nachvollziehbare Research-/Freigabeartefakte.
- **D-022 – Presentation-as-Code:** wiederkehrende PPTX/PDF-Cases als versionierte Manifeste/Templates/Snapshots/Build-Artefakte.
- **D-023 – Kreativität mit Zielgruppen-Governance:** Humor/Meme-Visuals nur optional, rechtegeprüft, zielgruppenabhängig; formale Ausgaben ohne Humor.

## Klare Nicht-Ziele

- Kein Ersatz für SIEM, EDR, Schwachstellenscanner, Ticketing, CMDB, ERP, HR- oder Finanzsysteme.
- Kein reiner Audit-Readiness-Tracker; Audit Readiness ist nur *eine* mögliche Zielgröße.
- Kein proprietäres Produkt einer bestimmten Beratung; keine Nutzung nichtöffentlicher PwC-Daten, interner Preise oder geschützter Vorlagen.
- Kein autonomes System, das kritische Sicherheits-, Rechts-, Budget- oder Freigabeentscheidungen ohne Menschen trifft.
- Kein Feature-Sammelsurium ohne gemeinsames Datenmodell, Nutzerlogik und messbaren Nutzen.
- Keine Black-Box-Empfehlung ohne Datenbasis, Unsicherheit und Alternativen; keine automatische Risikofreigabe.
- Keine verdeckte Leistungskontrolle einzelner Mitarbeiter; keine parallelen Modulwelten mit widersprüchlichen Rollen/Scores.
- Die Plattform verhindert keine Cyberangriffe und ersetzt keine technischen Sicherheitskontrollen – sie verbessert Verbinden, Verstehen, Priorisieren, Steuern, Nachweisen.
- Kein KI-abhängiger Kernprozess; keine stille KI-Ersetzung fachlicher Wahrheiten; kein Training mit Kundendaten als Standard.

## Kurzsummary je Dokument (00–21, je 1–2 Sätze)

- **00 – Master-Index & Projektverfassung (v1.2, aktiv):** Navigationssystem, globale Regeln, Status, Begriffe, Entscheidungen (D-001…D-023), Annahmen (A-001…A-012), offene Fragen (O-001…O-018), Abhängigkeiten und Vorrangregeln der 24-Dokumente-Bibliothek. Setzt die zentrale Produktdefinition und den nächsten verbindlichen Schritt (Repository-/Übergabe-/Umsetzungsphase).
- **01 – Produktvision, Problem & Business Case (v1.0):** strategisches „Warum": B2B2B-Managed-ISMS-Plattform, fünf strategische Fragen, drei Erlebniswelten, sechs Nutzenversprechen, North Star. Übersetzt fragmentierte Sicherheits-/Servicekette in Entscheidungen, Services und messbaren Wert.
- **02 – Markt, Wettbewerber & Differenzierung (v1.0):** Marktfakten, Wettbewerberlücken und Differenzierung (Decision-first UX, Zielnavigator, Digital Twin, Service-Native Design, Wirkungslogik). Positionierung gegen reine Dokumentations-/Audit-Tools.
- **03 – Zielgruppen, Rollen & Arbeitssituationen (v1.0):** kanonisches Rollenmodell R01–R12, Jobs-to-be-done, reale Nutzungskontexte (Zeitdruck, Reisen, Audits), getrennte Entscheidungsrechte, adaptive Komplexität.
- **04 – Nutzerreisen & Service-Lebenszyklus (v1.0):** Entscheidungsrhythmus, 8-Phasen-Lifecycle (Entdecken…Übergeben), 13 End-to-End-Journeys mit Auslösern/Fehlerpfaden/Gates; kein Service ohne menschliche Freigabe.
- **05 – Produktlandkarte & Funktionsumfang (v1.0):** sieben Produktdomänen, 33 Module M01–M33, Cross-Cutting Capabilities, kanonische Zustände, Flagship-Szenarien, Priorisierung ohne Visionsverkleinerung (15 Entscheidungen 05-D01…D15).
- **06 – UX/UI, Navigation & Erlebniswelten (v1.0):** globale Shell mit acht Orten, vier Erlebniswelten, universelle Seitenanatomie, Screen-Katalog S01–S11, 12 Designprinzipien (Entscheidung vor Navigation, Ursache vor Score, keine Dark Patterns).
- **07 – Digitaler Unternehmenszwilling & Informationsgraph (v1.0):** kanonisches Objekt-/Beziehungs-/Historien-/Vertrauensmodell (F01–F09, R01–R25, Objektvertrag, Bitemporalität, Datenqualitätsdimensionen), semantischer Vertrag unabhängig von der Speichertechnik; vier Demo-Tenants.
- **08 – ISMS-Kernprozesse (v1.0):** frameworkneutraler Prozesskern mit versionierten Mappings (ISO 27001, BSI, NIS2, DORA), 5-Phasen-Betriebsmodell, 18 Kernprozesse ISMS-01…ISMS-18, 15 Prozessprinzipien.
- **09 – Reifegrad, Risiken, Bedrohungen & Control Intelligence (v1.0):** vier getrennte Dimensionen (Reife/Risiko/Control Intelligence/Vertrauen), Strategie-DNA, Zielprofiltypen, Reifegradmodell 0–5 mit vier Facetten und Referenzformel, Threat-Relevanzpfad, 15 Modellprinzipien.
- **10 – Decision Center, KPIs & Simulationen (v1.0):** vier Erlebniswelten, Morning Mission (fünf Ebenen, Priorisierungssignale, Zustände), einheitliches Seitenmuster, KPI-/Simulationslogik mit sichtbarer Baseline und Bandbreiten, 15 Steuerungsprinzipien.
- **11 – Zusammenarbeit, Aufgaben & Kommunikation (v1.0):** einheitliches Work-Item-Modell, ein Owner pro Item, Decision Records als eigene Objekte, SLA-/Eskalations-/Übergabelogik, Attention Management, 15 Prinzipien C01–C15.
- **12 – Reporting-, PDF- & Präsentations-Engine (v1.1, aktiv):** One Source/Many Responsible Narratives, kanonisches Report Package mit Snapshot/Storyline/Governance, Presentation Repository mit Manifests/geschützten Inhalten/Update-Diff, audience-gesteuerte Creative-/Humor-Modi.
- **13 – Managed-Service-Betriebsmodell (v1.0):** Service Definition/Offer/Instance/Run, Shared Responsibility, geschlossener Betriebskreislauf, Service Charter, Quality Gates, Value-Messung, Exit-Fähigkeit, 15 Prinzipien MS01–MS15.
- **14 – Servicekatalog, Pakete, SLAs & Preislogik (v1.0):** vier kommerzielle Ebenen, Katalog-/Preisobjekte (Service Family, Offer, Package, Price Book, Quote → Commercial Baseline), transparente Preistreiber, illustrative Marktanker, 15 Prinzipien CP01–CP15.
- **15 – Berater-Operations, Portfolio & Ressourcenplanung (v1.0):** Operations Center für Kundenarbeit (Portfolio, Engagement, Demand Item, Work Package), Skill-/Kapazitäts-/Reise-/Kostenplanung, Cost-to-Serve, Wirkung vor Auslastung, 15 Prinzipien O01–O15.
- **16 – Kunden-Onboarding, Zielprofil & Lifecycle (v1.0):** drei Einstiegspfade zu gleichen kanonischen Objekten, Strategie-DNA/Target Profile/Baseline/Zielroute, Operational Readiness vor Go-live, lernender Lifecycle mit Expansion/Reduction/Internalisierung/Exit, 16 Prinzipien OL01–OL16.
- **17 – Integrationen, Automatisierung & Workflow-Designer (v1.0):** Plattform als Nervensystem, sieben Integrationsebenen, sechs Muster, kanonische Integrationsobjekte, Workflow als versioniertes Produktobjekt mit Human Gates, wiederverwendbare Blueprints, 18 Prinzipien IA01–IA18.
- **18 – Technische Architektur & Plattformbetrieb (v1.0):** modularer Monolith mit Workern, PostgreSQL führend, Redis/Object Storage, Outbox+Checkpoint-Muster, Bounded Contexts, Referenztechnologien, 20 Architekturprinzipien TA01–TA20.
- **19 – Sicherheit, Datenschutz, Rechte & Auditierbarkeit (v1.0):** Defense-in-Depth/Zero Trust, RBAC+ABAC+Beziehungsregeln, Deny by Default, Mandantenisolation, drei Auditierbarkeitsebenen, Threat Model/Break Glass, 20 Prinzipien SP01–SP20.
- **20A – KI-Funktionen & Guardrails (v1.0):** KI-gestützt nicht KI-abhängig, AI Use Case Register + AI Control Plane, Model Gateway, Autonomiestufen A0–A4, priorisierter Use-Case-Katalog mit Human Gates/Fallbacks, 20 Prinzipien AI01–AI20.
- **20B – Virtuelle KI-Firma & Agentenorganisation (v1.0):** artifact-first Softwareorganisation mit Human Product Owner, CEO/Orchestrator, vier Säulen, minimalem Dauerkern, Role Contracts, Builder-Reviewer-Trennung und kontrolliertem HR-/Capability-Prozess.
- **20C – Claude Code, GitHub, Checkpoints & Bauplan (v1.0):** Repository-first Truth Model, Kontextpakete pro Work Package, Micro-/Verified-/Handover-/Release-Checkpoints, Session-Boot-Sequenz, Branch-/Worktree-/PR-/CI-Strategie, DoD und **Roadmap-Phasen 0–9**.
- **21 – Research, Innovation & kontinuierliche Produktentwicklung (v1.0):** dauerhafter Lernkreislauf (Observe…Learn), Research-Agenten inkl. Concept Author/Consistency Reviewer/Presentation Curator, Source Registry, Concept Change Proposals mit Impactanalyse und Human Gates.