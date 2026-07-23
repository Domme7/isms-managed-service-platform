# Dokument 05 - Produktlandkarte & vollständiger Funktionsumfang

> **Re-Ableitung:** Dieser Block ist Nicht-PDF-Inhalt (Ableitungs-Metadaten aus WP-019).
>
> - **Re-Ableitungsdatum:** 2026-07-23
> - **Quell-PDF:** `docs/concept/pdf/Dokument_05_Produktlandkarte_Funktionsumfang_v1.0.pdf`
> - **Autorität:** Bei jeder Abweichung zwischen dieser Arbeitsfassung und dem PDF gilt das PDF (DR-0006).
> - **Zitierregel:** Immer den Abschnittstitel zitieren, nicht nur die Nummer.
> - **Struktur:** Diese Fassung folgt den PDF-Folientiteln (Abschnitte 1-20, Modulfolien 6.1-6.7). Die bis zum 2026-07-23 gültige Arbeitsfassung hatte eine eigene Nummerierung mit 15 Abschnitten; sie liegt unter `docs/concept/archive/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0_abgeloest_2026-07-23.md`.
> - **PDF-interne Nummerierungskonflikte:** Keine festgestellt. Das PDF nummeriert die Folientitel durchgängig 1-20 (mit Unterfolien 6.1-6.7); eine abweichende Navigationsleisten-/Inhalt-Zählung ist im extrahierten Text nicht vorhanden, und der Abgleichbericht vom 2026-07-23 meldet für Dokument 05 ebenfalls keinen solchen Konflikt.
> - **Benannte PDF-interne Auffälligkeiten (benannt, nicht aufgelöst):**
>   1. Der Abschnitt "Priorisierung ohne Verkleinerung der Produktvision" empfiehlt acht Flagship-Journeys für U1; die offene Frage 05-O01 (Abschnitt "Offene Fragen") fragt nach "fünf bis sieben" vollständig produktiv zu implementierenden Flagship-Journeys.
>   2. Die Domänenbezeichnungen der Übersichtstabelle (Abschnitt "Produktdomänen und Modulübersicht": "F Managed-Service-Betrieb", "G Integration & Plattform") weichen von den Folientiteln 6.6 ("Domäne F - Managed-Service- und Beratungsbetrieb") und 6.7 ("Domäne G - Integration, Plattform & Administration") ab.
>   3. Rollenbezeichnungen variieren im PDF: "Admin" (M07, M29, M30), "Tenant Admin" (M31), "Tenant Administrator" (Abschnitt "Rollen- und Funktionsmatrix").
> - **Ausnahmen (Inhalte ohne PDF-Beleg):** Keine. Nur-im-Markdown-Zusätze der alten Fassung (u. a. Leitsatz, umformulierte ENTSCHEIDUNG, eigene Flagship-Szenarien-Liste, umformulierte Nicht-Ziele, Querschnittsfähigkeit "Suche und Wiederaufnahme") sind entfallen; der Verbleib je Befund wird im Abgleichbericht-Nachtrag zu WP-019 dokumentiert.
>
> **Nummerierungs-Konkordanz alt→neu** (alte Arbeitsfassung → diese PDF-treue Fassung):
>
> | Alt (Arbeitsfassung bis 2026-07-23) | Neu (PDF-Folientitel) |
> |---|---|
> | §1 Dokumentauftrag und Verbindlichkeit | §1 Dokumentauftrag und Verbindlichkeit |
> | §2 Executive Summary | §2 Executive Summary |
> | §3 Produktarchitektur und Betriebsfluss | §3 Produktarchitektur: ein System, kein Feature-Sammelsurium und §4 Betriebsfluss der Plattform |
> | §4 Produktdomänen und Modulübersicht | §5 Produktdomänen und Modulübersicht und §6.1-6.7 Domäne A-G |
> | §5 Cross-Cutting Capabilities | §7 Querschnittsfähigkeiten |
> | §6 Rollen- und Funktionszuordnung | §8 Rollen- und Funktionsmatrix |
> | §7 Kanonische Zustände | §9 Kanonische Zustände und Übergaben |
> | §8 Priorisierung ohne Verkleinerung der Vision | §11 Priorisierung ohne Verkleinerung der Produktvision |
> | §9 Flagship-Szenarien | §11, Unterabschnitt "Empfohlene Flagship-Journeys für U1" (Inhalt weicht ab; die alte Liste war nicht PDF-getragen) |
> | §10 Systemgrenzen und Nicht-Ziele | §13 Fehlerfälle, Sonderfälle und Systemgrenzen, Unterabschnitt "Nicht-Ziele" |
> | §11 Verbindliche Entscheidungen | §15 Verbindliche Entscheidungen |
> | §12 Begründete Annahmen | §16 Begründete Annahmen |
> | §13 Offene Fragen | §17 Offene Fragen |
> | §14 Ideenparkplatz | §18 Ideenparkplatz |
> | §15 Änderungsprotokoll | §20 Änderungsprotokoll |
> | - (keine alte Entsprechung) | §10 Globale Daten-, Ereignis- und Entscheidungsflüsse |
> | - (keine alte Entsprechung) | §12 Demo-Welt und zusammenhängende Produktgeschichte |
> | - (keine alte Entsprechung) | §14 Globale Akzeptanz- und Qualitätskriterien |
> | - (keine alte Entsprechung) | §19 Dokumentabhängigkeiten und nächste Schritte |

## Deckblatt

**DOKUMENT 05 - PRODUKTLANDKARTE & VOLLSTÄNDIGER FUNKTIONSUMFANG**

Modulare Gesamtarchitektur des Zielprodukts - mit 33 Modulen, gemeinsamen Querschnittsfähigkeiten, priorisierten End-to-End-Szenarien und klaren Systemgrenzen.

| Steuerungsfeld | Inhalt |
|---|---|
| Arbeitsbezeichnung | ISMS Managed Service Platform |
| Dokumentstatus | Erstellt - Version 1.0 |
| Stand | 21. Juli 2026 |
| Abhängigkeiten | Dokument 00, 01, 02, 03 und 04 |
| Zweck | Verbindliche Definition der Produktdomänen, Module, Funktionen, Abhängigkeiten, Prioritäten und Nicht-Ziele |

Dieses Dokument beschreibt das vollständige Zielprodukt. Bauphasen priorisieren technische Tiefe und Nachweisbarkeit - nicht die langfristige Produktvision.

## 1. Dokumentauftrag und Verbindlichkeit

Dokument 05 ist die funktionale Brücke zwischen Produktvision, Rollen und Nutzerreisen einerseits sowie UX, Datenmodell, Fachlogik, Technik und Entwicklungsorganisation andererseits. Es beantwortet nicht, wie einzelne Screens pixelgenau aussehen oder welche Technologie gewählt wird. Es legt verbindlich fest, welche Produktbereiche existieren, welche Nutzerfrage sie beantworten und wie sie in einem gemeinsamen System zusammenwirken.

> **ENTSCHEIDUNG** Eine Funktion gehört nur dann in den Produktkern, wenn sie mindestens einer dokumentierten Nutzerreise dient, ein reales Problem löst, einen messbaren Nutzen besitzt und mit Ziel, Risiko, Verantwortung, Wirkung oder Nachweis verbunden ist.

### Das Dokument legt fest

- sieben Produktdomänen und 33 fachlich abgegrenzte Module;
- die Kernfrage, den Funktionsumfang und die primären Rollen jedes Moduls;
- gemeinsame Querschnittsfähigkeiten, Zustände und Übergaben;
- die Unterscheidung zwischen vollständiger Produktvision und technischer Umsetzungstiefe;
- Flagship-Szenarien, Systemgrenzen, Qualitäts- und Akzeptanzkriterien;
- Abhängigkeiten zu den Dokumenten 06 bis 20C.

### Abgrenzung

Dokument 06 definiert die konkrete UX/UI und Navigation. Dokument 07 spezifiziert den digitalen Zwilling und das kanonische Informationsmodell. Dokument 08 bis 17 vertiefen Fachlogik, Services und Integrationen. Dokument 18 bis 20C definieren Architektur, Sicherheit, KI und Entwicklungsbetrieb.

## 2. Executive Summary

Die Plattform wird als zusammenhängendes Betriebs-, Entscheidungs- und Service-System entworfen. Der digitale Unternehmenszwilling bildet den gemeinsamen Kern. Decision Center, ISMS-Funktionen, Bedrohungs- und Reifegradlogik, Collaboration, Managed Services, Reporting und Integrationen sind keine getrennten Werkzeuge, sondern unterschiedliche Arbeits- und Entscheidungsperspektiven auf dieselben verknüpften Objekte.

### North-Star-Produkterlebnis

Ein Nutzer gelangt von einer relevanten Veränderung innerhalb weniger Minuten zu einer verantwortbaren Entscheidung, einer realistischen Handlung, einem prüfbaren Nachweis und einer aktualisierten Zielroute - ohne den Zusammenhang zwischen Unternehmen, Risiko, Service, Aufwand und Wirkung zu verlieren.

## 3. Produktarchitektur: ein System, kein Feature-Sammelsurium

Die Produktlandkarte folgt einem einfachen Prinzip: Alle Rollen arbeiten auf einem gemeinsamen Daten- und Entscheidungsmodell. Unterschiede entstehen durch Perspektive, Sprache, Detailgrad und Entscheidungsrecht - nicht durch voneinander getrennte Datenwelten.

### Architekturprinzipien

- **Ein Objekt, mehrere Perspektiven:** Ein Risiko ist für den Executive eine Geschäftsentscheidung, für den ISMS Manager ein Steuerungsobjekt, für den Owner ein Arbeitspaket und für den Auditor eine prüfbare Behauptung.
- **Keine isolierten Scores:** Reifegrad, Risiko, Readiness und Servicewirkung sind bis zu Ursachen, Datenquellen und Annahmen erklärbar.
- **Keine toten Dokumente:** Policies, Nachweise und Reports sind an relevante Objekte und Entscheidungen gebunden.
- **Keine Verkaufsfalle:** Managed-Service-Empfehlungen zeigen interne, unterstützte und vollständig gemanagte Alternativen.
- **Keine KI-Abhängigkeit:** Kritische Kernprozesse bleiben regelbasiert oder manuell ausführbar.

## 4. Betriebsfluss der Plattform

Die Module bilden keine lineare Einbahnstraße. Sie unterstützen einen wiederkehrenden Regelkreis, der aus Veränderungen Entscheidungen und aus Maßnahmen überprüfbare Verbesserung macht.

### Sieben wiederkehrende Schritte

| Phase | Leitfrage | Plattformleistung |
|---|---|---|
| Verbinden | Welche Informationen liegen vor? | Daten aus Integrationen, Importen, Workshops und manueller Erfassung mit Quelle, Zeitpunkt und Vertrauensgrad aufnehmen. |
| Verstehen | Was bedeutet der Zustand? | Objekte und Beziehungen im digitalen Zwilling konsolidieren; Dubletten, Widersprüche und Lücken sichtbar machen. |
| Bewerten | Wie groß ist Handlungsbedarf? | Risiko, Reifegrad, Zielabweichung, SLA, Kapazität und Business Impact nachvollziehbar bestimmen. |
| Entscheiden | Welche Option ist verantwortbar? | Optionen, Wirkung, Aufwand, Nichtstun, Unsicherheit und Freigabepfad gegenüberstellen. |
| Handeln | Wer tut was bis wann? | Maßnahmen, Services, Workflows, Termine, Reise und Verantwortungen auslösen. |
| Nachweisen | Ist Umsetzung und Wirkung belegt? | Evidence, Decision Record, Audit Trail, Report und Wirksamkeitsprüfung erzeugen. |
| Lernen | Was ändert sich dadurch? | Zielroute, Empfehlungen, Services, Benchmarks und nächste Mission aus bestätigter Wirkung aktualisieren. |

## 5. Produktdomänen und Modulübersicht

Die sieben Domänen strukturieren Verantwortung und Entwicklung. Sie sind keine separaten Produkte. Jedes Modul hat eine eindeutige Kernfrage und nutzt gemeinsame Objekte, Rollen, Zustände und Services.

| Domäne | Module | Primärer Wert | Zentrale Abhängigkeit |
|---|---|---|---|
| A Decision & Navigation | M01-M04 | Verdichtung, Priorisierung, Entscheidung | Alle übrigen Domänen liefern Signale und Kontext. |
| B Kunde, Strategie & Lifecycle | M05-M07 | Individuelles Ziel, Kunde und Lebenszyklus | Strategie-DNA steuert Prioritäten, Route und Servicebedarf. |
| C Digitaler Zwilling & ISMS-Kern | M08-M16 | Fachliche Wahrheit und operativer ISMS-Betrieb | Gemeinsames Objekt- und Beziehungsmodell. |
| D Intelligence & Optimierung | M17-M20 | Relevanz, Prognose, Simulation und Empfehlung | Benötigt belastbare Daten und erklärbare Regeln. |
| E Zusammenarbeit & Kommunikation | M21-M24 | Entscheidungen in Arbeit und Kommunikation übersetzen | Nutzt Rollen, Status, Freigaben und Reporting Engine. |
| F Managed-Service-Betrieb | M25-M28 | Wiederkehrende Services skalierbar liefern und messen | Koppelt Servicekatalog, Ressourcen und Kundenwirkung. |
| G Integration & Plattform | M29-M33 | Daten, Automatisierung, Sicherheit und Betrieb | Querschnittliche technische Grundlage. |

### Vollständigkeit versus Umsetzungstiefe

Alle 33 Module gehören zum vollständigen Zielprodukt. Für die erste ausführbare Version wird nicht die sichtbare Produktwelt verkleinert, sondern die technische Tiefe abgestuft. Flagship-Journeys erhalten echte Datenänderungen, Berechnungen, Rechte und Exporte. Weitere Bereiche werden konsistent interaktiv und deterministisch simuliert, bis ihre produktive Vertiefung folgt.

> **VERBINDLICH** Eine simulierte Funktion muss klar als Demo- oder Beispieldatenlogik gekennzeichnet sein. Sie darf keine reale Integration, Live-Bedrohungsbewertung oder garantierte Risikowirkung vortäuschen.

## 6.1 Domäne A - Decision & Navigation

Diese Domäne ist die sichtbare Steuerungsschicht. Sie reduziert Komplexität, zeigt Veränderungen und führt zur nächsten verantwortbaren Entscheidung.

### M01 - Mission Control / Decision Center

*Was hat sich verändert und was verdient heute Aufmerksamkeit?*

Rollenbezogene Startseite, Veränderungsfeed, Prioritäten, Entscheidungen, Chancen und Unsicherheiten.

- rollenbezogene Zusammenfassung und Veränderungsfeed
- kritische Entscheidungen und überfällige Freigaben
- Erklärung von Priorität, Datenstand und Unsicherheit
- direkte Sprünge in Kunde, Risiko, Service oder Aufgabe

**Primäre Rollen:** Alle Rollen

### M02 - Morning Mission

*Wo erziele ich heute unter realen Rahmenbedingungen die größte Wirkung?*

Tagesmission, Warum-Kontext, Impact, empfohlene Reihenfolge, Kapazitäts- und Reiserealität.

- Mission aus Zielwirkung, Risiko, Frist, SLA und Kapazität
- realistische Reihenfolge unter Reise- und Kalenderbedingungen
- Warum-, Impact- und „Das solltest du wissen“-Bereich
- laufende Anpassung bei neuen Ereignissen und erledigter Arbeit

**Primäre Rollen:** ISMS Manager, Consultant

### M03 - Executive Experience

*Welche Geschäftsentscheidung ist jetzt erforderlich?*

Executive Summary, Top-Risiken, Investitionsoptionen, Zieltrend, Freigaben und Management-Review.

- wenige strategische KPIs mit Trend und Datenvertrauen
- Top-Geschäftsrisiken und Zielabweichungen
- Investitionsoptionen einschließlich Nichtstun
- Freigaben, Management Review und exportierbare Narrative

**Primäre Rollen:** Executive, CISO

### M04 - Portfolio Cockpit

*Welche Mandanten, Services oder Themen kippen - und wo lohnt ein Eingriff?*

Multi-Mandanten-Gesundheit, SLA, Trends, Auslastung, Opportunity- und Eskalationssicht.

- Mandanten-Gesundheit, Trend und Eskalationsstatus
- Service-SLA, Nutzen und Profitabilitätsannahmen
- Kapazitäts-, Reise- und Skillkonflikte
- standardisierbare Muster und fachlich begründete Opportunities

**Primäre Rollen:** Service Lead, Engagement Manager

## 6.2 Domäne B - Kunde, Strategie & Lifecycle

Diese Domäne bildet Kundenrealität, Zielprofil und Lebenszyklus ab. Sie verhindert, dass ein generisches Idealmodell über individuelle Ziele, Budget und Kapazität gestellt wird.

### M05 - Customer Workspace

*Wie verstehe ich diesen Kunden in einer Minute?*

Kundendetailansicht mit Strategie, Puls, Veränderungen, Kausalität, Hebeln, Services und Zeitachse.

- Executive Summary in Klartext
- Strategie-DNA und Zielroute
- Puls, Veränderungen, Kausalität und größte Hebel
- Zeitachse der Zusammenarbeit und nachgewiesener Wert

**Primäre Rollen:** Alle Kunden- und Beratungsrollen

### M06 - Strategie-DNA & Zielprofile

*Welchen Sicherheitszustand will dieses Unternehmen wirklich erreichen?*

Zielarten, Risikobereitschaft, Budget, Zeit, Kapazität, regulatorische Ziele und Managed-Service-Anteil.

- mehrere Zielarten statt Einheits-Readiness
- Risikobereitschaft, Budget, Zeit und interne Kapazität
- gewünschter Managed-Service- und Automatisierungsgrad
- versionierte Zielprofile und Zielkonflikte

**Primäre Rollen:** Executive, CISO, ISMS Manager

### M07 - Onboarding & Lifecycle

*Wie gelangen Kunde, Daten, Rollen und Services kontrolliert in den Betrieb?*

Geführtes Onboarding, Scope, Rollen, Baseline, Aktivierung, Änderungen, Exit und Übergabe.

- Organisation, Rollen und Scope einrichten
- Datenimport, Baseline und Datenlücken
- Serviceaktivierung, Änderungen und Reviewtermine
- Exit Package, Rechteabbau und geordnete Übergabe

**Primäre Rollen:** Admin, Engagement Manager

## 6.3 Domäne C - Digitaler Zwilling & ISMS-Kern

Diese Domäne ist der fachliche Arbeitskern des ISMS. Objekte, Risiken, Controls, Maßnahmen, Dokumente, Evidenzen, Audits und Lieferanten bleiben miteinander verknüpft.

### M08 - Digitaler Unternehmenszwilling

*Was ist das Unternehmen, wie hängt es zusammen und wie verändert es sich?*

Informationsgraph aus Organisation, Prozessen, Assets, Risiken, Controls, Maßnahmen, Nachweisen, Services und Historie.

- kanonische Objekte und Beziehungen
- 360-Grad-Ansicht jedes Objekts
- Historie, Versionen und Kausalitätsketten
- Datenherkunft, Aktualität und Vertrauensgrad

**Primäre Rollen:** Alle Rollen

### M09 - Scope, Organisation & Asset Governance

*Was gehört zum ISMS und wer trägt wofür Verantwortung?*

Scopes, Ausschlüsse, Standorte, Prozesse, Informationen, Anwendungen, Systeme, Owner, Kritikalität und Schutzbedarf.

- mehrere Scopes und Ausschlüsse
- Schutzbedarf, Kritikalität und Abhängigkeiten
- Owner, Vertretung und Verantwortungsmatrix
- Lifecycle von Asset und Geschäftsprozess

**Primäre Rollen:** ISMS Manager, Owner

### M10 - Risk Management

*Welche Risiken bestehen, warum und wie werden sie behandelt?*

Identifikation, Bewertung, Szenarien, Business Impact, Akzeptanz, Behandlung, Rest- und aggregiertes Risiko.

- Szenario- und Ursachenorientierung
- Brutto-, Rest- und aggregiertes Risiko
- Business Impact und Risikobereitschaft
- Behandlung, Akzeptanz, Frist und Review

**Primäre Rollen:** CISO, ISMS Manager, Risk

### M11 - Requirements & Control Management

*Welche Anforderungen gelten und wie wirksam sind die Controls?*

Framework-Mapping, Control-Bibliothek, Applicability, Design/Implementierung/Wirksamkeit, Ausnahmen und Vererbung.

- Framework- und Requirement-Mapping
- Control Design, Umsetzung und Wirksamkeit
- Applicability, Vererbung und Ausnahmen
- gemeinsame Controls für mehrere Anforderungen

**Primäre Rollen:** ISMS Manager, Auditor

### M12 - Maßnahmen & Improvement Projects

*Welche Veränderung erzeugt nachweisbar die größte Wirkung?*

Maßnahmenpakete, Priorisierung, Aufwand, Abhängigkeiten, Definition of Done, Wirkungshypothese und Review.

- Wirkung pro Aufwand priorisieren
- Arbeitspakete, Abhängigkeiten und Definition of Done
- Owner, Ressourcen, Termin und Blocker
- erwartete versus bestätigte Wirkung

**Primäre Rollen:** Owner, Consultant

### M13 - Policies & Document Control

*Welche verbindlichen Regeln gelten und sind sie aktuell?*

Policy-Lifecycle, Review, Freigabe, Version, Geltung, Lesebestätigung und Objektverknüpfung.

- Policy-Vorlagen und kundenspezifische Regeln
- Review-, Freigabe- und Veröffentlichungsprozess
- Geltungsbereich, Verknüpfung und Lesebestätigung
- Version, Überholung und Nachweis der Kommunikation

**Primäre Rollen:** ISMS Manager, Owner

### M14 - Evidence & Assurance

*Welche Behauptung ist womit, wie aktuell und wie belastbar belegt?*

Evidence-Anforderung, Herkunft, Aktualität, Prüfung, Wiederverwendung, Lücken, Ablaufdatum und Chain of Custody.

- Evidence Requests und sichere Uploads
- Mapping auf Control, Scope und Zeitraum
- Qualitätsprüfung, Wiederverwendung und Ablauf
- Prüfkette und nachvollziehbare Ablehnung

**Primäre Rollen:** Contributor, Auditor

### M15 - Audits, Findings & Management Review

*Wie wird Prüfung vorbereitet, durchgeführt und in Verbesserung übersetzt?*

Auditplan, Workspace, Requests, Reise, Findings, Ursachen, Maßnahmen, Abschluss und Management Review.

- Auditprogramm und 90/60/30-Tage-Missionen
- Request List, Feldarbeit und Reiseplanung
- Findings, Ursachen und Maßnahmenmapping
- Management Review und Abschlussdeliverables

**Primäre Rollen:** Auditor, ISMS Manager, Consultant

### M16 - Third-Party & Supply Chain

*Welche Abhängigkeiten zu Lieferanten gefährden Ziele oder Services?*

Lieferanteninventar, Kritikalität, Fragebögen, Nachweise, Risiken, Verträge, Reviews und Konzentrationsrisiken.

- Kritikalitäts- und Konzentrationsbewertung
- Fragebogen, Evidence und Vertragsanforderung
- Lieferantenrisiken, Findings und Maßnahmen
- wiederkehrende Reviews und Offboarding

**Primäre Rollen:** Procurement, ISMS Manager

## 6.4 Domäne D - Intelligence & Optimierung

Diese Domäne übersetzt Signale und historische Daten in erklärbare Bewertung, Zielabweichung, Route und Handlungsvorschläge.

### M17 - Threat & Change Intelligence

*Welche externe oder interne Veränderung betrifft welche Objekte?*

Threat-/Regulatory-Signale, Relevanzfilter, Mapping, Vertrauensgrad, Change Impact und Handlungsvorschlag.

- Signalquellen und Vertrauensgrad
- Relevanzfilter nach Branche, Technologie und Scope
- Mapping auf Assets, Risiken, Controls und Kunden
- Decision Record, Handlung und Neubewertung

**Primäre Rollen:** CISO, Specialist

### M18 - Maturity, Readiness & Benchmarking

*Wie nah sind wir dem gewählten Ziel - und wie verlässlich ist die Aussage?*

Reifegrad, Zielerreichung, Audit-Readiness, Trend, Datenvertrauen und anonymisierte Benchmarks.

- Reifegrad je Fähigkeit, Prozess oder Control
- Zielerreichung und Audit-Readiness getrennt
- Trend, Datenvertrauen und Unsicherheit
- datenschutzkonforme Benchmarks und Peer-Gruppen

**Primäre Rollen:** Executive, CISO, Consultant

### M19 - Route Planner & Scenario Simulation

*Welche Route ist unter Zeit, Budget und Risiko am sinnvollsten?*

Schnelle, kosteneffiziente, risikominimierende und servicegestützte Route; What-if und Re-Planning.

- mehrere Routen mit Zeit-, Kosten- und Wirkungsannahmen
- What-if für Maßnahmen, Services und Verschiebung
- Abhängigkeiten und kritischer Pfad
- automatische Neuberechnung nach Veränderung

**Primäre Rollen:** Executive, ISMS Manager

### M20 - Recommendation & Opportunity Engine

*Welche nächste Maßnahme oder Serviceunterstützung ist fachlich sinnvoll?*

Wirkungsbasierte Empfehlungen, Begründung, Alternativen, Evidenz, Unsicherheit und Service Opportunity.

- Maßnahmenvorschläge nach Wirkung und Machbarkeit
- interne, unterstützte und Managed-Service-Alternative
- Begründung, Evidenz und Unsicherheit
- Feedbackschleife aus bestätigter Wirkung

**Primäre Rollen:** Consultant, CISO

## 6.5 Domäne E - Zusammenarbeit & Kommunikation

Diese Domäne macht aus Erkenntnissen koordinierte Arbeit, nachvollziehbare Entscheidungen und zielgruppengerechte Kommunikation.

### M21 - Team Workspace & Decision Records

*Wer muss was entscheiden, liefern oder freigeben?*

Aufgaben, Kommentare, Verantwortungen, Entscheidungsvorlagen, Freigaben, Vertretung und unveränderbare Historie.

- Aufgabe, Diskussion und Entscheidung am Objekt
- Owner, Mitwirkende, Vertretung und Beobachter
- Freigabe mit Gründen und Alternativen
- chronologische, nicht rückwirkend manipulierbare Historie

**Primäre Rollen:** Alle operativen Rollen

### M22 - Workflow, SLA & Escalation Engine

*Wie wird aus einer Entscheidung ein kontrollierter, wiederholbarer Prozess?*

Statusmodelle, Fristen, SLAs, Eskalationen, Wiedervorlagen, Eventregeln und Wiederaufnahme.

- wiederverwendbare Status- und SLA-Modelle
- Eskalation, Erinnerung und Wiedervorlage
- Event-getriebene Folgeaktionen
- sicherer Abbruch, Retry und Wiederaufnahme

**Primäre Rollen:** Service Lead, ISMS Manager

### M23 - Reporting, PDF & Presentation Engine

*Wie wird derselbe Datenstand für Vorstand, CISO, Auditor und Workshop nutzbar?*

Zielgruppenberichte, PPTX/PDF, Vorlagen, Narrative, Datenherkunft, Freigabe, Versionierung und Export.

- Executive-, CISO-, Audit- und Serviceformate
- PPTX, PDF und strukturierte Datenexporte
- Vorlagen, Branding und Inhaltsbausteine
- Freigabe, Version, Quellen und Vertraulichkeit

**Primäre Rollen:** Consultant, CISO, Auditor

### M24 - Briefings, Notifications & Knowledge

*Was muss ich wissen, ohne in Benachrichtigungen zu ertrinken?*

Rollenbezogene Briefings, Digest, In-App Inbox, globale Suche, Best Practices, Vorlagen und Lernhinweise.

- Morning/Weekly/Monthly Digests
- In-App Inbox mit Priorität und Snooze
- globale Suche über Objekte und Inhalte
- Best Practices, Templates und Lernhinweise

**Primäre Rollen:** Alle Rollen

## 6.6 Domäne F - Managed-Service- und Beratungsbetrieb

Diese Domäne macht wiederkehrende Beratung zu einem steuerbaren, messbaren und über viele Mandanten skalierbaren Servicebetrieb.

### M25 - Service Catalog & Configuration

*Welche Leistungen sind buchbar und wie werden sie kundenspezifisch konfiguriert?*

Modulare Services, Scope, Frequenz, SLA, Verantwortungsmatrix, Ergebnis, Preisannahme und Abhängigkeiten.

- Servicebausteine, Pakete und Abhängigkeiten
- Scope, Verantwortungen, Frequenz und SLA
- Ergebnis, Voraussetzungen und Preisannahme
- Konfiguration statt kundenspezifischem Neuentwurf

**Primäre Rollen:** Service Lead, Kunde

### M26 - Service Delivery & Value Management

*Wird der gebuchte Service zuverlässig geliefert und erzeugt er Nutzen?*

Service Charter, Betriebszyklen, Deliverables, SLA, Qualitätskontrolle, Review, Wirkung und Verbesserungsplan.

- Service Charter und wiederkehrende Betriebszyklen
- Deliverables, SLA und Qualitätskontrolle
- Kundenreview und Improvement Plan
- messbarer Beitrag zu Ziel, Risiko und Kapazität

**Primäre Rollen:** Service Lead, Engagement Manager

### M27 - Consultant Operations & Resource Planning

*Wie werden Mandanten, Skills, Termine, Reise und Kapazität realistisch gesteuert?*

Portfolio, Auslastung, Skill Matching, Vor-Ort/Remote, Reisezeit, Reisekosten, Vertretung und Konflikte.

- Portfolio- und Wochenplanung
- Skill Matching, Verfügbarkeit und Vertretung
- Vor-Ort/Remote, Reisezeit und Reisekosten
- Kapazitätskonflikte, Auslastung und Forecast

**Primäre Rollen:** Engagement Manager, Consultant

### M28 - Multi-Tenant Scale & Practice Intelligence

*Was lässt sich über viele Mandanten standardisieren, wiederverwenden und verbessern?*

Mandantentrennung, Template-Bibliotheken, Workflow-Packs, anonymisierte Muster, Benchmarks und Practice KPIs.

- strikte Mandantentrennung bei zentraler Practice-Steuerung
- wiederverwendbare Templates und Workflow Packs
- anonymisierte Muster und Benchmarks
- Practice KPIs, Qualitäts- und Skalierungslernen

**Primäre Rollen:** Service Lead, Product Owner

## 6.7 Domäne G - Integration, Plattform & Administration

Diese Domäne verbindet Quellsysteme, standardisiert Arbeit, schützt Mandanten und stellt den sicheren Plattformbetrieb sicher.

### M29 - Integration Hub

*Welche Daten werden aus welchen Systemen mit welcher Qualität übernommen?*

API, Connectoren, Import/Export, Synchronisation, Mapping, Fehlerbehandlung, Herkunft und Integrationsgesundheit.

- Connector-Katalog und API-Verträge
- Mapping, Synchronisation und Konfliktauflösung
- Datenherkunft, Freshness und Health
- Retry, Quarantäne und manueller Fallback

**Primäre Rollen:** Admin, Architect

### M30 - Automation & Workflow Designer

*Welche wiederkehrende Arbeit kann sicher standardisiert werden?*

Wenn-X-dann-Y, wiederverwendbare Playbooks, Genehmigungen, Dry Run, Mandantenparameter und Wirkungsmetrik.

- visueller Trigger-Condition-Action-Designer
- Dry Run, Freigabe und Rollback
- Mandantenparameter und Versionierung
- Bibliothek wiederverwendbarer Playbooks

**Primäre Rollen:** Consultant, Admin

### M31 - Identity, Rights & Tenant Administration

*Wer darf in welchem Mandanten welche Aktion ausführen?*

SSO, Rollen, Berechtigungen, Delegation, SoD, Freigaben, Tenant Settings, Audit Logs und Datenräume.

- SSO, MFA und Identitätsföderation
- Rollen, Rechte, Delegation und SoD
- Mandant, Datenraum und Objektberechtigung
- Audit Logs, Adminfreigaben und Notfallzugriff

**Primäre Rollen:** Tenant Admin, Platform Ops

### M32 - AI Assistance & Guardrails

*Wo beschleunigt KI, ohne die Plattform von ihr abhängig zu machen?*

Zusammenfassung, Entwurf, Erklärung, Klassifikation, Vorschlag, Quellenbezug, Unsicherheit, Freigabe und Fallback.

- Zusammenfassen, Entwerfen, Erklären und Klassifizieren
- Quellenbezug, Unsicherheit und Human Review
- Mandanten- und Datenklassengrenzen
- regelbasierter oder manueller Fallback

**Primäre Rollen:** Alle Rollen

### M33 - Platform Operations & Observability

*Ist die Plattform sicher, verfügbar, performant und nachvollziehbar betreibbar?*

Monitoring, Jobs, Connectoren, Backups, Fehler, Support, Status, Kostenbeobachtung und Betriebsmetriken.

- Verfügbarkeit, Performance und Job Monitoring
- Connector-, Workflow- und Exportgesundheit
- Backup, Restore, Support und Incidentstatus
- Kosten-, Kapazitäts- und Betriebsmetriken

**Primäre Rollen:** Platform Ops

## 7. Querschnittsfähigkeiten

Querschnittsfähigkeiten verhindern, dass Module unterschiedliche Sprachen, Statuslogiken oder Vertrauensniveaus entwickeln. Sie sind verbindliche Anforderungen an alle Produktbereiche.

| Fähigkeit | Verbindliche Bedeutung | Prüffrage |
|---|---|---|
| Gemeinsame Objektlogik | Identität, Scope, Owner, Status, Historie, Beziehungen, Quelle, Aktualität, Vertrauensgrad und nächste Aktion. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Rollenbezogene Perspektiven | Ein Objekt kann je nach Rolle als Entscheidung, Aufgabe, Prüfung, Service oder Managementsignal erscheinen. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Kausalität und Wirkung | Jede relevante Bewertung erklärt Ursachen, betroffene Objekte, Annahmen und erwartete Wirkung. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Versionierung und Decision Records | Änderungen erzeugen neue Versionen; historische Aussagen und Freigaben bleiben sichtbar. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Datenvertrauen | Vollständigkeit, Aktualität, Widerspruch, Herkunft und Unsicherheit werden nicht versteckt. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Wiederaufnahme | Jede Reise kann nach Unterbrechung, Vertretung oder Gerätewechsel am letzten sicheren Zustand fortgesetzt werden. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Barrierearme Komplexität | Klartext und Führung für Anfänger; Drill-down, Rohdaten und Graphen für Experten. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Exportierbarkeit | Reports, Präsentationen, Daten und Exit Packages sind kontrolliert portabel. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| Observability | Nutzer und Betreiber sehen Gesundheitszustand von Integrationen, Automationen, Jobs und Exporten. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |
| KI-Fallback | Kritische Freigaben und Kernreisen bleiben ohne generative KI funktionsfähig. | Ist dies im Modul sichtbar, testbar und rollen-/mandantensicher umgesetzt? |

## 8. Rollen- und Funktionsmatrix

Die Matrix beschreibt Schwerpunkte, keine pauschalen Berechtigungen. Konkrete Rechte werden in Dokument 19 nach Mandant, Objekt, Aktion, Datenklasse und Freigaberegel spezifiziert.

| Rolle | Modulschwerpunkte | Primäre Entscheidungen / Verantwortung |
|---|---|---|
| Executive Sponsor | M03, M05, M06, M18-M20, M23 | Ziele, Budget, Risikoakzeptanz, strategische Entscheidungen |
| CISO / Security Lead | M01, M03, M05-M20, M23 | Risikosteuerung, Zielprofil, Investition, Eskalation |
| ISMS Manager | M01-M02, M05-M24 | Tagesbetrieb, Datenqualität, Controls, Maßnahmen, Audits |
| Owner / Contributor | M09-M14, M21-M24 | Umsetzung, Nachweise, Rückfragen, Freigaben |
| Auditor / Reviewer | M11, M14-M15, M21, M23 | Prüfung, Requests, Findings, Nachvollziehbarkeit |
| Managed Service Lead | M04, M25-M28, M30, M33 | Portfolio, Servicequalität, Profitabilität, Skalierung |
| Engagement Manager | M04-M07, M21-M28 | Kundensteuerung, Kapazität, Reise, Delivery |
| ISMS Consultant | M01-M02, M04-M30 | Analyse, Empfehlungen, Umsetzung, Kommunikation |
| Specialist Consultant | M08-M20, M29-M30 | Spezialanalyse, Threat/Control/Technik-Input |
| Tenant Administrator | M07, M29-M31 | Rollen, Organisation, Integrationen, Einstellungen |
| Platform Operations | M29-M33 | Betrieb, Support, Sicherheit, Observability |

### Adaptive Erlebniswelten

- **Executive:** wenige Fragen, Business Impact, Zieltrend, Investition, Freigabe und exportierbare Narrative.
- **Kunden-/ISMS-Team:** operative Steuerung, Ursache-Wirkung, Maßnahmen, Evidenz, Audit und Zusammenarbeit.
- **Beratung/Managed Service:** Portfolio, Standardisierung, Kapazität, Reise, Servicequalität und Opportunity.
- **Assurance/Audit:** kontrollierter Scope, Evidence Requests, Findings, Historie und Unabhängigkeit.
- **Administration/Betrieb:** Identität, Rechte, Integrationen, Konfiguration, Observability und Support.

## 9. Kanonische Zustände und Übergaben

Ein gemeinsames Statusmodell ist entscheidend für Reporting, Workflows, Automatisierung und Auditierbarkeit. Module dürfen zusätzliche Unterzustände besitzen, müssen aber auf die kanonischen Zustände abbildbar bleiben.

| Objekt | Kanonischer Lebenszyklus | Verbindliche Regel |
|---|---|---|
| Information / Objekt | Entwurf -> geprüft -> freigegeben -> überholt | Owner, Aktualität, Quelle und Version sind immer sichtbar. |
| Risiko | identifiziert -> bewertet -> entschieden -> behandelt -> überwacht -> geschlossen | Risikoakzeptanz benötigt zeitliche Begrenzung und Freigabe. |
| Control | nicht bewertet -> geplant -> implementiert -> wirksam -> eingeschränkt -> unwirksam | Implementierung und Wirksamkeit sind getrennte Aussagen. |
| Maßnahme | Idee -> bewertet -> freigegeben -> in Arbeit -> blockiert -> Nachweis -> Wirksamkeitsprüfung -> abgeschlossen | Abschluss ohne überprüfte Wirkung ist kein Erfolg. |
| Evidence | angefordert -> geliefert -> geprüft -> akzeptiert/abgelehnt -> abgelaufen | Wiederverwendung ist nur bei passendem Scope und Aktualität zulässig. |
| Entscheidung | vorbereitet -> zur Freigabe -> genehmigt/abgelehnt -> umgesetzt -> überprüft | Gründe, Optionen, Annahmen und Entscheider bleiben nachvollziehbar. |
| Service | vorgeschlagen -> konfiguriert -> freigegeben -> aktiv -> Review -> geändert/pausiert -> beendet | Verantwortung, Ergebnis, Frequenz und Messung sind verbindlich. |
| Audit | geplant -> Vorbereitung -> Feldarbeit -> Findings -> Nacharbeit -> abgeschlossen | Reise, Vor-Ort und Remote sind explizite Planungsparameter. |

### Übergabeprinzip

Jede Übergabe zwischen Rolle, Modul oder Agent enthält mindestens: Objekt und Scope, Ausgangszustand, erwartetes Ergebnis, Owner, Frist, Entscheidung/Freigabe, Datenbasis, offene Unsicherheit und sicheren Wiederaufnahmepunkt.

### Keine Sackgassen

Abgelehnte Freigaben, fehlende Daten, Integrationsfehler, Rollenwechsel, Abwesenheit oder Budgetmangel erzeugen einen verständlichen Rückkehrpfad und keinen unsichtbaren Endzustand.

## 10. Globale Daten-, Ereignis- und Entscheidungsflüsse

Die Plattform verarbeitet Veränderungen ereignisorientiert. Ein Signal kann aus einem Connector, einer manuellen Eingabe, einem Audit, einer neuen Bedrohung, einer Serviceleistung oder einem Zeitereignis entstehen. Es wird zunächst validiert, dann auf Objekte gemappt, fachlich bewertet und erst danach in Mission, Aufgabe, Entscheidung oder Bericht übersetzt.

| Stufe | Beispiele | Kontrollanforderung |
|---|---|---|
| Quellsignal | Connector, Import, Workshop, Nutzer, Audit, Threat Feed, Frist | Quelle, Zeit, Mandant, Scope, Datenklasse und Vertrauensgrad |
| Normalisierung | Mapping, Dublettenprüfung, Konflikt und Quarantäne | Kein stilles Überschreiben widersprüchlicher Informationen |
| Digital Twin | Objekt-/Beziehungsupdate, Historie, betroffene Scopes | Vorher/Nachher und betroffene Abhängigkeiten |
| Fachliche Bewertung | Risiko, Reifegrad, SLA, Zielabweichung, Business Impact | Regel, Annahmen, Unsicherheit und verantwortliche Rolle |
| Entscheidung | Optionen, Nichtstun, Wirkung, Aufwand und Freigabe | Decision Record mit Begründung |
| Ausführung | Workflow, Maßnahme, Service, Termin, Export | Owner, Status, SLA, Reise/Kapazität und Wiederaufnahme |
| Nachweis & Lernen | Evidence, Wirksamkeit, KPI und aktualisierte Route | Bestätigte Wirkung statt bloßer Aktivität |

### Prioritätslogik

Missionen und Portfolio-Prioritäten dürfen nicht allein aus einem Risikoscore entstehen. Sie kombinieren Zielabweichung, Business Impact, Frist, SLA, Datenvertrauen, Abhängigkeiten, verfügbare Skills, Reise/Standort, Aufwand, erwartete Wirkung und menschliche Übersteuerung.

## 11. Priorisierung ohne Verkleinerung der Produktvision

Der Prototyp soll wie ein vollständiges Zielprodukt wirken. Dafür wird zwischen sichtbarer Produktvollständigkeit und technischer Tiefe unterschieden. Diese Logik verhindert sowohl ein leeres Klickmodell als auch einen unrealistischen Versuch, alle Enterprise-Funktionen sofort produktionsreif umzusetzen.

| Umsetzungsgrad | Bedeutung | Beispiele | Qualitätsgrenze |
|---|---|---|---|
| U1 - Vollständig produktiv | End-to-End mit persistenten Daten, Rechten, Zuständen, Fehlerpfaden und Tests. | Morning Mission, Kundendetail, Risiko-Maßnahme-Evidence, Reportexport. | Keine Sackgassen; alle Änderungen nachvollziehbar. |
| U2 - Konsistent interaktiv | Voll navigierbar und logisch verbunden; einzelne Berechnungen oder externe Daten sind deterministische Demo-Logik. | Portfolio, Route, Auditplanung, Servicekatalog, Workflow Designer. | Keine falschen Live- oder Produktionsbehauptungen. |
| U3 - Contract / Expansion | Schnittstelle, Datenvertrag, UX und Platz im Gesamtsystem sind definiert; produktive Anbindung folgt später. | weitere Connectoren, Echtzeit-Threatfeeds, umfangreiche Benchmarks. | Erweiterung darf Kernmodell nicht brechen. |

### Empfohlene Flagship-Journeys für U1

- Login, Rollen-/Mandantenwechsel und Morning Mission;
- Portfolio -> kritischer Kunde -> Kundendetail -> Ursache-Wirkungs-Kette;
- Risiko -> Option -> Entscheidung -> Maßnahme -> Evidence -> Wirksamkeit;
- Zielprofil -> drei Zielrouten -> What-if -> Freigabe;
- Bedrohungssignal -> Mapping -> Risikoneubewertung -> Maßnahmenvorschlag;
- Auditvorbereitung -> Evidence Requests -> Reise/Feldarbeit -> Findings -> Bericht;
- Service Opportunity -> Konfiguration -> Aktivierung -> Delivery -> Wertreview;
- Executive Decision Center -> Investitionsentscheidung -> PPTX/PDF-Export.

## 12. Demo-Welt und zusammenhängende Produktgeschichte

Der Demonstrator verwendet mehrere synthetische Unternehmen und Rollen, damit Portfolio, Mandantentrennung, unterschiedliche Zielprofile und Managed-Service-Skalierung glaubwürdig erlebbar werden. Alle Werte, Namen, Preise und Ereignisse sind als Beispiele gekennzeichnet.

| Demo-Unternehmen | Ausgangslage | Produktstory |
|---|---|---|
| Nordstern Bank AG | reguliert, hoher Reifegrad | DORA/ISO-orientiert; Investitionssimulation und Drittparteienrisiko |
| Mittelwerk Produktion GmbH | mittlerer Reifegrad | OT/IT-Abhängigkeit; begrenzte Kapazität; Managed-Service-Route |
| CloudMosaic Software SE | schnell wachsend | Cloud-/Identity-Fokus; Integrationen und Continuous Evidence |
| GesundPlus Klinikverbund | heterogen | Standorte, Lieferanten, Datenschutz und Vor-Ort-Audit |
| EcoLogistik Gruppe | frühe Aufbauphase | geführtes Onboarding, Strategie-DNA und einfache Zielroute |

### Fünf-Minuten-Demo-Dramaturgie

1. Berater loggt sich ein: Morning Mission zeigt sechs priorisierte Signale über sein Portfolio.
2. Ein Kunde kippt: Kundendetail erklärt in Klartext, warum und welche Geschäftsprozesse betroffen sind.
3. Der Berater öffnet die Wirkungskette und vergleicht interne, unterstützte und Managed-Service-Optionen.
4. Ein What-if zeigt Zeit, Budgetannahme, Zielwirkung und Datenvertrauen; eine Entscheidung wird vorbereitet.
5. Maßnahme und Service werden aktiviert; Zuständigkeit, SLA, Reise und Evidence entstehen automatisch.
6. Die Perspektive wechselt zum Executive: zwei Entscheidungen, Fortschritt und Business Impact.
7. Ein Klick erzeugt eine geprüfte Vorstandspräsentation und einen Monatsbericht aus demselben Datenstand.

## 13. Fehlerfälle, Sonderfälle und Systemgrenzen

Enterprise-Vertrauen entsteht nicht nur im Idealweg. Das Produkt muss Unsicherheit, Datenlücken, abgelehnte Empfehlungen, fehlende Kapazität und technische Störungen sichtbar und sicher behandeln.

| Fall | Verbindliches Produktverhalten |
|---|---|
| Integrationsausfall | Letzten erfolgreichen Stand und Alter zeigen; Retry, Quarantäne und manuellen Fallback anbieten. |
| Widersprüchliche Daten | Beide Quellen erhalten; Konflikt markieren; zuständige Rolle entscheidet oder begründet Priorität. |
| Unklare Risikowirkung | Keine Scheingenauigkeit; Bandbreite, Annahmen und Datenlücken zeigen. |
| Abgelehnte Empfehlung | Grund dokumentieren; Alternative oder neue Reviewfrist anbieten; keine verdeckte Eskalation. |
| Owner reagiert nicht | Vertretung, Eskalationsweg und SLA nutzen; keine automatische Freigabe. |
| Rollen-/Mandantenwechsel | Kontext klar anzeigen; ungespeicherte Arbeit sichern; Rechte erneut prüfen. |
| KI/API nicht verfügbar | Regelbasierter oder manueller Modus bleibt erreichbar. |
| Reise-/Kapazitätskonflikt | Mission neu planen, Remote-/Vertretungsoptionen zeigen und Auswirkungen erklären. |
| Sensibler Export | Datenklasse, Zielgruppe, Freigabe, Watermark/Vertraulichkeit und Audit Log anwenden. |
| Scope-/Zieländerung | Auswirkungsanalyse und neue Version; historische Bewertung bleibt unverändert. |

### Nicht-Ziele

- kein Ersatz für SIEM, EDR, Scanner, Ticketing, CMDB oder ERP;
- kein reiner Dokumentenfriedhof oder Audit-Readiness-Tracker;
- keine autonome Risikoakzeptanz oder Managementfreigabe;
- keine Black-Box-Empfehlung ohne Quelle, Annahme und Unsicherheit;
- keine Nutzung nichtöffentlicher PwC-Daten, interner Preise oder geschützter Templates;
- keine verdeckte Mitarbeiterüberwachung;
- keine voneinander getrennten Modulwelten mit widersprüchlichen Scores oder Statuslogiken.

## 14. Globale Akzeptanz- und Qualitätskriterien

Die Kriterien gelten für jedes Modul und werden später in detaillierte Tests und Definition of Done überführt.

| Dimension | Mindestkriterium | Beispielnachweis |
|---|---|---|
| Nutzerwert | Kernfrage, Zielgruppe, Problem und messbarer Nutzen sind dokumentiert. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Kohärenz | Objekte, Rollen, Zustände und Begriffe entsprechen dem gemeinsamen Modell. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Nachvollziehbarkeit | Ursache, Datenbasis, Annahme, Änderung und Entscheidung sind erklärbar. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Mandanten- und Rechtesicherheit | Zugriff wird serverseitig nach Mandant, Rolle, Objekt und Aktion geprüft. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Fehlerverhalten | Fehlende Daten, Ablehnung, Abbruch und Ausfall besitzen sichere Rückkehrpfade. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Wiederaufnahme | Letzter bestätigter Zustand, offene Entscheidung und nächster Schritt sind rekonstruierbar. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| KI-Resilienz | Kritische Kernreise funktioniert ohne generative KI. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Export und Portabilität | Relevante Daten, Entscheidungen und Nachweise können kontrolliert exportiert werden. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Performance | Hauptansichten reagieren bei realistischer Demo- und Pilotdatenmenge flüssig; lange Jobs zeigen Fortschritt. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Barrierefreiheit | Tastatur, Kontrast, Struktur, verständliche Sprache und Statusfeedback werden berücksichtigt. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Testbarkeit | Happy Path, Rechtefall, Fehlerfall, Datenqualitätsfall und Wiederaufnahmefall sind testbar. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |
| Dokumentation | Funktion, Daten, Abhängigkeiten, Entscheidungen und offene Risiken sind im Repository dokumentiert. | Testfall, Screenshot/Flow, Decision Record und aktualisierte Spezifikation. |

## 15. Verbindliche Entscheidungen

- **05-D01** - Die Produktlandkarte ist modular, verwendet aber ein gemeinsames Daten-, Rollen- und Entscheidungsmodell.
- **05-D02** - Der digitale Unternehmenszwilling ist fachlicher Kern und keine optionale Visualisierung.
- **05-D03** - Jedes Hauptmodul beantwortet eine zentrale Nutzerfrage und zeigt Ursache, Wirkung und nächsten Schritt.
- **05-D04** - Audit-Readiness ist eine Zielperspektive unter mehreren und darf die Produktlogik nicht dominieren.
- **05-D05** - Managed Services sind in Datenmodell, Workflow, Reporting und Wertmessung eingebaut - nicht nur als Verkaufskatalog.
- **05-D06** - Das Zielprodukt umfasst alle beschriebenen Module; Bauphasen priorisieren technische Tiefe, nicht die langfristige Vision.
- **05-D07** - Der Demonstrator zeigt eine vollständige Produktwelt mit synthetischen Unternehmen, Rollen und Daten.
- **05-D08** - Flagship-Journeys müssen durchgängig funktionieren; ergänzende Bereiche dürfen im frühen Demonstrator deterministisch simuliert sein.
- **05-D09** - KI-Funktionen besitzen transparente Guardrails und einen manuellen oder regelbasierten Fallback.
- **05-D10** - Kritische Aktionen sind rollen-, mandanten- und freigabebezogen; Berechtigung wird nie nur über Navigation gelöst.
- **05-D11** - Alle Exporte, Simulationen und Empfehlungen zeigen Datenstand, Scope, Annahmen und Vertrauensgrad.
- **05-D12** - Die Plattform ersetzt keine operativen Quellsysteme, sondern verbindet und übersetzt sie in Governance und Entscheidungen.
- **05-D13** - Reisezeit, Vor-Ort-Anforderungen, Kapazität und Vertretung sind Bestandteile der Berater- und Serviceplanung.
- **05-D14** - PDF- und PPTX-Erzeugung ist Kernfunktion, weil Kommunikation ein wesentlicher Teil von ISMS- und Beratungsarbeit ist.
- **05-D15** - Änderungen an Scope, Zielprofil, Risiko oder Service erzeugen versionierte Decision Records und nachvollziehbare Auswirkungen.

## 16. Begründete Annahmen

- **05-A01** - Der erste glaubwürdige Einsatzkontext ist ein Serviceanbieter mit mehreren Mandanten und gemischten Reifegraden.
- **05-A02** - Microsoft-zentrierte Identität, Dokumente und Collaboration sind für viele Zielkunden relevant; die Architektur bleibt herstellerneutral.
- **05-A03** - Kunden beginnen häufig mit unvollständigen Daten. Datenvertrauen und Lückensteuerung sind deshalb produktiv wichtiger als perfekte Erstbefüllung.
- **05-A04** - ISMS Manager und Consultants sind tägliche Power User; Executives und Owner nutzen die Plattform ereignis- oder entscheidungsbezogen.
- **05-A05** - Der größte frühe Nutzennachweis entsteht durch schnellere Priorisierung, wiederverwendbare Workflows und automatische Deliverables.
- **05-A06** - Ein neutraler Produktentwurf kann später durch eine Beratung gebrandet, erweitert und mit eigenen Templates/Preisen versehen werden.
- **05-A07** - Für den Demonstrator sind berechnete und synthetische Werte zulässig, wenn sie eindeutig gekennzeichnet und logisch konsistent sind.
- **05-A08** - Nicht jede Integration muss im ersten Bau produktiv sein; Integrationsverträge und realistische Mock-Connectoren müssen jedoch sichtbar sein.
- **05-A09** - Anonymisierte Benchmarks benötigen später rechtliche, vertragliche und statistische Validierung.
- **05-A10** - Service Opportunities werden nur akzeptiert, wenn sie fachlich begründet, optional und nicht manipulierend dargestellt werden.

## 17. Offene Fragen

- **05-O01** - Welche fünf bis sieben Flagship-Journeys werden für die erste ausführbare Version vollständig produktiv implementiert?
- **05-O02** - Welche Branchen- und Regulierungsprofile werden im ersten Demo-Datensatz gezeigt?
- **05-O03** - Welche Framework-Inhalte dürfen aus Lizenzgründen vollständig mitgeliefert oder nur referenziert werden?
- **05-O04** - Welches Graph-/Datenmodell wird technisch gewählt und welche Beziehungen sind kanonisch?
- **05-O05** - Welche Score- und Reifegradlogik wird im Demonstrator als nachvollziehbare Referenz verwendet?
- **05-O06** - Welche Integrationen werden real, welche als Mock und welche nur als Contract demonstriert?
- **05-O07** - Welche Freigaben und Schwellenwerte sind global, tenant-spezifisch oder service-spezifisch konfigurierbar?
- **05-O08** - Wie werden Preise im neutralen Demonstrator dargestellt: Marktband, Beispielkatalog oder vollständig konfigurierbar?
- **05-O09** - Welche Daten dürfen für Cross-Customer-Benchmarking genutzt werden und wie wird Re-Identifikation verhindert?
- **05-O10** - Welche Offline-Funktionen sind für Vor-Ort-Audits zwingend?
- **05-O11** - Welche Sprachen und Barrierefreiheitsstufen sind für die erste Präsentationsfassung erforderlich?
- **05-O12** - Welche Personen- und Leistungsmetriken sind zulässig, ohne verdeckte Mitarbeiterüberwachung zu erzeugen?

## 18. Ideenparkplatz

| Idee | Nutzen / spätere Vertiefung |
|---|---|
| Product Graph Explorer | Zoombare visuelle Unternehmenslandkarte mit Fokusmodi für Prozess, Risiko, Control, Service oder Audit. |
| Executive Scenario Room | Gemeinsamer Entscheidungsraum für Investitionsoptionen, Annahmen, Abstimmung und Freigabe. |
| Journey Replay | Zeitliche Wiedergabe, wie ein Risiko erkannt, entschieden, behandelt und nachgewiesen wurde. |
| Voice Briefing | Gesprochenes Morning Briefing mit Rückfragen und anschließendem schriftlichem Decision Record. |
| Offline Audit Companion | Lokaler Auditmodus für Checklisten, Notizen, Evidence Capture und spätere Synchronisation. |
| Service Sandbox | Simulation, wie sich ein Managed Service auf Kapazität, SLA, Risiko und Kosten auswirken würde. |
| Cross-Customer Pattern Lab | Datenschutzkonforme Mustererkennung für wiederkehrende Lücken, Maßnahmenwirkung und Templates. |
| Control Digital Passport | Portables Profil eines Controls mit Scope, Owner, Wirksamkeit, Evidence, Ausnahmen und Historie. |
| Regulatory Change Route | Neue Vorgabe wird automatisch auf betroffene Kunden, Controls, Services und Roadmaps abgebildet. |
| Trust Narrative Builder | Erzeugt aus verifizierten Daten eine zielgruppengerechte Geschichte über Fortschritt und verbleibende Risiken. |

## 19. Dokumentabhängigkeiten und nächste Schritte

- Dokument 06 übersetzt Module und Rollen in Navigation, Seitenmuster, Interaktionen und Designzustände.
- Dokument 07 definiert das kanonische Datenmodell des digitalen Unternehmenszwillings.
- Dokument 08 bis 17 vertiefen fachliche Module, Services, Beraterbetrieb und Integrationen.
- Dokument 18 bis 20C definieren technische Architektur, Sicherheit, KI und Entwicklungsbetrieb.
- Dokument 00 wird nach Freigabe um Status „Dokument 05 erstellt“ und neue globale Entscheidungen aktualisiert.

## 20. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Dokument 00-04, Marktanalyse und freiem Brainstorming. |

### Nächster Schritt

Dokument 06 - UX/UI, Navigation und rollenbezogene Erlebniswelten.
