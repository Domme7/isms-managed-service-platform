# Dokument 05 - Produktlandkarte & vollständiger Funktionsumfang

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00, 01, 02, 03 und 04  
**Zweck:** Verbindliche Landkarte aller Produktdomänen, Module, Kernfunktionen, Abhängigkeiten, Prioritäten und Systemgrenzen.

> **Leitsatz:** Das Produkt ist kein Menü mit Einzelfunktionen. Es ist ein zusammenhängendes Betriebs-, Entscheidungs- und Service-System, in dem jede Aktion auf Ziel, Risiko, Verantwortung, Wirkung und Nachweis zurückgeführt werden kann.

## 1. Dokumentauftrag und Verbindlichkeit

Dokument 05 übersetzt Vision, Marktpositionierung, Rollen und Nutzerreisen in eine vollständige Produktarchitektur. Es legt fest, **welche Produktdomänen und Module existieren**, welche Frage sie beantworten, wie sie zusammenspielen und welche Fähigkeiten quer über das Produkt gelten. Konkrete Screens folgen in Dokument 06, das kanonische Datenmodell in Dokument 07 und die fachliche Tiefenspezifikation in den Dokumenten 08 bis 20.

**ENTSCHEIDUNG:** Eine Funktion gehört nur dann in den Produktkern, wenn sie mindestens einer dokumentierten Nutzerreise dient, mit einem klaren Problem, messbarem Nutzen und nachvollziehbarer Einbettung in das gemeinsame Datenmodell.

## 2. Executive Summary

Die Zielplattform besteht aus sieben Produktdomänen und 33 Modulen. Der digitale Unternehmenszwilling bildet den gemeinsamen Kern. Decision Center, ISMS-Kern, Intelligence, Collaboration, Managed Services, Reporting und Integrationen sind keine getrennten Anwendungen, sondern unterschiedliche Erlebnis- und Arbeitsflächen auf denselben verknüpften Objekten.

Das vollständige Zielprodukt bleibt bewusst groß. Die Bauplanung reduziert nicht die Vision, sondern priorisiert technische Tiefe: Flagship-Journeys werden vollständig ausführbar, unterstützende Bereiche konsistent navigierbar und fortgeschrittene Integrationen zunächst durch realistische Verträge oder Mock-Connectoren repräsentiert.

## 3. Produktarchitektur und Betriebsfluss

Die Plattform folgt dem wiederkehrenden Betriebsfluss **Verbinden -> Verstehen -> Bewerten -> Entscheiden -> Handeln -> Nachweisen -> Lernen**. Jede Wirkung aktualisiert Digital Twin, Zielroute, Prioritäten, Services und Managementsicht.

## 4. Produktdomänen und Modulübersicht

### A. Decision & Navigation

- **M01 - Mission Control / Decision Center:** Was hat sich verändert und was verdient heute Aufmerksamkeit? Rollenbezogene Startseite, Veränderungsfeed, Prioritäten, Entscheidungen, Chancen und Unsicherheiten. *Primäre Rollen: Alle Rollen.*

- **M02 - Morning Mission:** Wo erziele ich heute unter realen Rahmenbedingungen die größte Wirkung? Tagesmission, Warum-Kontext, Impact, empfohlene Reihenfolge, Kapazitäts- und Reiserealität. *Primäre Rollen: ISMS Manager, Consultant.*

- **M03 - Executive Experience:** Welche Geschäftsentscheidung ist jetzt erforderlich? Executive Summary, Top-Risiken, Investitionsoptionen, Zieltrend, Freigaben und Management-Review. *Primäre Rollen: Executive, CISO.*

- **M04 - Portfolio Cockpit:** Welche Mandanten, Services oder Themen kippen - und wo lohnt ein Eingriff? Multi-Mandanten-Gesundheit, SLA, Trends, Auslastung, Opportunity- und Eskalationssicht. *Primäre Rollen: Service Lead, Engagement Manager.*

### B. Kunde, Strategie & Lifecycle

- **M05 - Customer Workspace:** Wie verstehe ich diesen Kunden in einer Minute? Kundendetailansicht mit Strategie, Puls, Veränderungen, Kausalität, Hebeln, Services und Zeitachse. *Primäre Rollen: Alle Kunden- und Beratungsrollen.*

- **M06 - Strategie-DNA & Zielprofile:** Welchen Sicherheitszustand will dieses Unternehmen wirklich erreichen? Zielarten, Risikobereitschaft, Budget, Zeit, Kapazität, regulatorische Ziele und Managed-Service-Anteil. *Primäre Rollen: Executive, CISO, ISMS Manager.*

- **M07 - Onboarding & Lifecycle:** Wie gelangen Kunde, Daten, Rollen und Services kontrolliert in den Betrieb? Geführtes Onboarding, Scope, Rollen, Baseline, Aktivierung, Änderungen, Exit und Übergabe. *Primäre Rollen: Admin, Engagement Manager.*

### C. Digitaler Zwilling & ISMS-Kern

- **M08 - Digitaler Unternehmenszwilling:** Was ist das Unternehmen, wie hängt es zusammen und wie verändert es sich? Informationsgraph aus Organisation, Prozessen, Assets, Risiken, Controls, Maßnahmen, Nachweisen, Services und Historie. *Primäre Rollen: Alle Rollen.*

- **M09 - Scope, Organisation & Asset Governance:** Was gehört zum ISMS und wer trägt wofür Verantwortung? Scopes, Ausschlüsse, Standorte, Prozesse, Informationen, Anwendungen, Systeme, Owner, Kritikalität und Schutzbedarf. *Primäre Rollen: ISMS Manager, Owner.*

- **M10 - Risk Management:** Welche Risiken bestehen, warum und wie werden sie behandelt? Identifikation, Bewertung, Szenarien, Business Impact, Akzeptanz, Behandlung, Rest- und aggregiertes Risiko. *Primäre Rollen: CISO, ISMS Manager, Risk.*

- **M11 - Requirements & Control Management:** Welche Anforderungen gelten und wie wirksam sind die Controls? Framework-Mapping, Control-Bibliothek, Applicability, Design/Implementierung/Wirksamkeit, Ausnahmen und Vererbung. *Primäre Rollen: ISMS Manager, Auditor.*

- **M12 - Maßnahmen & Improvement Projects:** Welche Veränderung erzeugt nachweisbar die größte Wirkung? Maßnahmenpakete, Priorisierung, Aufwand, Abhängigkeiten, Definition of Done, Wirkungshypothese und Review. *Primäre Rollen: Owner, Consultant.*

- **M13 - Policies & Document Control:** Welche verbindlichen Regeln gelten und sind sie aktuell? Policy-Lifecycle, Review, Freigabe, Version, Geltung, Lesebestätigung und Objektverknüpfung. *Primäre Rollen: ISMS Manager, Owner.*

- **M14 - Evidence & Assurance:** Welche Behauptung ist womit, wie aktuell und wie belastbar belegt? Evidence-Anforderung, Herkunft, Aktualität, Prüfung, Wiederverwendung, Lücken, Ablaufdatum und Chain of Custody. *Primäre Rollen: Contributor, Auditor.*

- **M15 - Audits, Findings & Management Review:** Wie wird Prüfung vorbereitet, durchgeführt und in Verbesserung übersetzt? Auditplan, Workspace, Requests, Reise, Findings, Ursachen, Maßnahmen, Abschluss und Management Review. *Primäre Rollen: Auditor, ISMS Manager, Consultant.*

- **M16 - Third-Party & Supply Chain:** Welche Abhängigkeiten zu Lieferanten gefährden Ziele oder Services? Lieferanteninventar, Kritikalität, Fragebögen, Nachweise, Risiken, Verträge, Reviews und Konzentrationsrisiken. *Primäre Rollen: Procurement, ISMS Manager.*

### D. Intelligence & Optimierung

- **M17 - Threat & Change Intelligence:** Welche externe oder interne Veränderung betrifft welche Objekte? Threat-/Regulatory-Signale, Relevanzfilter, Mapping, Vertrauensgrad, Change Impact und Handlungsvorschlag. *Primäre Rollen: CISO, Specialist.*

- **M18 - Maturity, Readiness & Benchmarking:** Wie nah sind wir dem gewählten Ziel - und wie verlässlich ist die Aussage? Reifegrad, Zielerreichung, Audit-Readiness, Trend, Datenvertrauen und anonymisierte Benchmarks. *Primäre Rollen: Executive, CISO, Consultant.*

- **M19 - Route Planner & Scenario Simulation:** Welche Route ist unter Zeit, Budget und Risiko am sinnvollsten? Schnelle, kosteneffiziente, risikominimierende und servicegestützte Route; What-if und Re-Planning. *Primäre Rollen: Executive, ISMS Manager.*

- **M20 - Recommendation & Opportunity Engine:** Welche nächste Maßnahme oder Serviceunterstützung ist fachlich sinnvoll? Wirkungsbasierte Empfehlungen, Begründung, Alternativen, Evidenz, Unsicherheit und Service Opportunity. *Primäre Rollen: Consultant, CISO.*

### E. Zusammenarbeit & Kommunikation

- **M21 - Team Workspace & Decision Records:** Wer muss was entscheiden, liefern oder freigeben? Aufgaben, Kommentare, Verantwortungen, Entscheidungsvorlagen, Freigaben, Vertretung und unveränderbare Historie. *Primäre Rollen: Alle operativen Rollen.*

- **M22 - Workflow, SLA & Escalation Engine:** Wie wird aus einer Entscheidung ein kontrollierter, wiederholbarer Prozess? Statusmodelle, Fristen, SLAs, Eskalationen, Wiedervorlagen, Eventregeln und Wiederaufnahme. *Primäre Rollen: Service Lead, ISMS Manager.*

- **M23 - Reporting, PDF & Presentation Engine:** Wie wird derselbe Datenstand für Vorstand, CISO, Auditor und Workshop nutzbar? Zielgruppenberichte, PPTX/PDF, Vorlagen, Narrative, Datenherkunft, Freigabe, Versionierung und Export. *Primäre Rollen: Consultant, CISO, Auditor.*

- **M24 - Briefings, Notifications & Knowledge:** Was muss ich wissen, ohne in Benachrichtigungen zu ertrinken? Rollenbezogene Briefings, Digest, In-App Inbox, globale Suche, Best Practices, Vorlagen und Lernhinweise. *Primäre Rollen: Alle Rollen.*

### F. Managed-Service- und Beratungsbetrieb

- **M25 - Service Catalog & Configuration:** Welche Leistungen sind buchbar und wie werden sie kundenspezifisch konfiguriert? Modulare Services, Scope, Frequenz, SLA, Verantwortungsmatrix, Ergebnis, Preisannahme und Abhängigkeiten. *Primäre Rollen: Service Lead, Kunde.*

- **M26 - Service Delivery & Value Management:** Wird der gebuchte Service zuverlässig geliefert und erzeugt er Nutzen? Service Charter, Betriebszyklen, Deliverables, SLA, Qualitätskontrolle, Review, Wirkung und Verbesserungsplan. *Primäre Rollen: Service Lead, Engagement Manager.*

- **M27 - Consultant Operations & Resource Planning:** Wie werden Mandanten, Skills, Termine, Reise und Kapazität realistisch gesteuert? Portfolio, Auslastung, Skill Matching, Vor-Ort/Remote, Reisezeit, Reisekosten, Vertretung und Konflikte. *Primäre Rollen: Engagement Manager, Consultant.*

- **M28 - Multi-Tenant Scale & Practice Intelligence:** Was lässt sich über viele Mandanten standardisieren, wiederverwenden und verbessern? Mandantentrennung, Template-Bibliotheken, Workflow-Packs, anonymisierte Muster, Benchmarks und Practice KPIs. *Primäre Rollen: Service Lead, Product Owner.*

### G. Integration, Plattform & Administration

- **M29 - Integration Hub:** Welche Daten werden aus welchen Systemen mit welcher Qualität übernommen? API, Connectoren, Import/Export, Synchronisation, Mapping, Fehlerbehandlung, Herkunft und Integrationsgesundheit. *Primäre Rollen: Admin, Architect.*

- **M30 - Automation & Workflow Designer:** Welche wiederkehrende Arbeit kann sicher standardisiert werden? Wenn-X-dann-Y, wiederverwendbare Playbooks, Genehmigungen, Dry Run, Mandantenparameter und Wirkungsmetrik. *Primäre Rollen: Consultant, Admin.*

- **M31 - Identity, Rights & Tenant Administration:** Wer darf in welchem Mandanten welche Aktion ausführen? SSO, Rollen, Berechtigungen, Delegation, SoD, Freigaben, Tenant Settings, Audit Logs und Datenräume. *Primäre Rollen: Tenant Admin, Platform Ops.*

- **M32 - AI Assistance & Guardrails:** Wo beschleunigt KI, ohne die Plattform von ihr abhängig zu machen? Zusammenfassung, Entwurf, Erklärung, Klassifikation, Vorschlag, Quellenbezug, Unsicherheit, Freigabe und Fallback. *Primäre Rollen: Alle Rollen.*

- **M33 - Platform Operations & Observability:** Ist die Plattform sicher, verfügbar, performant und nachvollziehbar betreibbar? Monitoring, Jobs, Connectoren, Backups, Fehler, Support, Status, Kostenbeobachtung und Betriebsmetriken. *Primäre Rollen: Platform Ops.*

## 5. Cross-Cutting Capabilities

- **Gemeinsame Objektlogik:** Jedes Objekt besitzt Identität, Scope, Owner, Status, Historie, Beziehungen, Datenherkunft, Vertrauensgrad und nächste sinnvolle Aktion.

- **Rollenbezogene Perspektiven:** Dieselben Daten werden je nach Rolle als Entscheidung, Arbeitspaket, Prüfanforderung, Serviceleistung oder Betriebsinformation dargestellt.

- **Kausalität und Wirkung:** Scores müssen durch Ursachen, betroffene Objekte, Annahmen und erwartete Wirkungswege erklärt werden.

- **Versionierung und Decision Records:** Scope, Ziel, Risiko, Control, Service und Freigabe werden nicht überschrieben, sondern versioniert und historisch nachvollziehbar gehalten.

- **Suche und Wiederaufnahme:** Globale Suche, zuletzt bearbeiteter Kontext und universeller Wiederaufnahmepunkt verhindern Orientierungsverlust.

- **Datenvertrauen:** Quelle, Aktualität, Vollständigkeit, Widersprüche und Unsicherheit sind Bestandteil jeder relevanten Aussage.

- **Barrierearme Komplexität:** Anfänger erhalten Führung und Klartext; erfahrene Nutzer können Details, Graphen und Rohdaten öffnen.

- **Exportierbarkeit:** Berichte, Präsentationen, Daten, Entscheidungen und Exit Packages sind kontrolliert portabel.

- **Observability:** Systemzustand, Connectoren, Automationen, Jobs und Fehler sind transparent betreibbar.

- **KI-Fallback:** Kein kritischer Kernprozess darf ausschließlich von generativer KI abhängen.

## 6. Rollen- und Funktionszuordnung

- **Executive Sponsor:** Schwerpunkt M03, M05, M06, M18-M20, M23. Entscheidet/verantwortet: Ziele, Budget, Risikoakzeptanz, strategische Entscheidungen.

- **CISO / Security Lead:** Schwerpunkt M01, M03, M05-M20, M23. Entscheidet/verantwortet: Risikosteuerung, Zielprofil, Investition, Eskalation.

- **ISMS Manager:** Schwerpunkt M01-M02, M05-M24. Entscheidet/verantwortet: Tagesbetrieb, Datenqualität, Controls, Maßnahmen, Audits.

- **Owner / Contributor:** Schwerpunkt M09-M14, M21-M24. Entscheidet/verantwortet: Umsetzung, Nachweise, Rückfragen, Freigaben.

- **Auditor / Reviewer:** Schwerpunkt M11, M14-M15, M21, M23. Entscheidet/verantwortet: Prüfung, Requests, Findings, Nachvollziehbarkeit.

- **Managed Service Lead:** Schwerpunkt M04, M25-M28, M30, M33. Entscheidet/verantwortet: Portfolio, Servicequalität, Profitabilität, Skalierung.

- **Engagement Manager:** Schwerpunkt M04-M07, M21-M28. Entscheidet/verantwortet: Kundensteuerung, Kapazität, Reise, Delivery.

- **ISMS Consultant:** Schwerpunkt M01-M02, M04-M30. Entscheidet/verantwortet: Analyse, Empfehlungen, Umsetzung, Kommunikation.

- **Specialist Consultant:** Schwerpunkt M08-M20, M29-M30. Entscheidet/verantwortet: Spezialanalyse, Threat/Control/Technik-Input.

- **Tenant Administrator:** Schwerpunkt M07, M29-M31. Entscheidet/verantwortet: Rollen, Organisation, Integrationen, Einstellungen.

- **Platform Operations:** Schwerpunkt M29-M33. Entscheidet/verantwortet: Betrieb, Support, Sicherheit, Observability.

## 7. Kanonische Zustände

- **Information / Objekt:** `Entwurf -> geprüft -> freigegeben -> überholt`. Owner, Aktualität, Quelle und Version sind immer sichtbar.

- **Risiko:** `identifiziert -> bewertet -> entschieden -> behandelt -> überwacht -> geschlossen`. Risikoakzeptanz benötigt zeitliche Begrenzung und Freigabe.

- **Control:** `nicht bewertet -> geplant -> implementiert -> wirksam -> eingeschränkt -> unwirksam`. Implementierung und Wirksamkeit sind getrennte Aussagen.

- **Maßnahme:** `Idee -> bewertet -> freigegeben -> in Arbeit -> blockiert -> Nachweis -> Wirksamkeitsprüfung -> abgeschlossen`. Abschluss ohne überprüfte Wirkung ist kein Erfolg.

- **Evidence:** `angefordert -> geliefert -> geprüft -> akzeptiert/abgelehnt -> abgelaufen`. Wiederverwendung ist nur bei passendem Scope und Aktualität zulässig.

- **Entscheidung:** `vorbereitet -> zur Freigabe -> genehmigt/abgelehnt -> umgesetzt -> überprüft`. Gründe, Optionen, Annahmen und Entscheider bleiben nachvollziehbar.

- **Service:** `vorgeschlagen -> konfiguriert -> freigegeben -> aktiv -> Review -> geändert/pausiert -> beendet`. Verantwortung, Ergebnis, Frequenz und Messung sind verbindlich.

- **Audit:** `geplant -> Vorbereitung -> Feldarbeit -> Findings -> Nacharbeit -> abgeschlossen`. Reise, Vor-Ort und Remote sind explizite Planungsparameter.

## 8. Priorisierung ohne Verkleinerung der Vision

Die Produktvision wird nicht auf ein einzelnes Feature-MVP reduziert. Stattdessen gelten drei Umsetzungsgrade: **vollständig produktive Flagship-Journeys**, **konsistent interaktive Produktflächen** und **klar gekennzeichnete, deterministisch simulierte Erweiterungen**. Alle Module bleiben im Zielbild sichtbar und fachlich verbunden.

## 9. Flagship-Szenarien

- Berater öffnet Morning Mission, erkennt kritischen Mandanten, versteht die Ursache und startet eine priorisierte Intervention.

- CISO öffnet Kundendetail, vergleicht drei Zielrouten und bereitet eine Investitionsentscheidung vor.

- Neue Bedrohung wird auf Assets, Risiken, Controls und Kunden gemappt und in nachvollziehbare Maßnahmen übersetzt.

- Maßnahme wird vom Vorschlag über Umsetzung und Evidenz bis zur Wirksamkeitsprüfung durchgängig gesteuert.

- Audit wird 90/60/30 Tage vorbereitet, inklusive Requests, Reise, Findings, Maßnahmen und Abschlussbericht.

- Managed Service wird konfiguriert, aktiviert, geliefert und im Wertbeitrag gemessen.

- Berater erzeugt aus aktuellem Datenstand eine zielgruppengerechte Vorstandspräsentation und PDF.

- Executive sieht Fortschritt, Top-Risiken, Servicewirkung und zwei freigabepflichtige Entscheidungen.

- Portfolio Lead erkennt über viele Mandanten wiederkehrende Muster, Kapazitätsengpässe und standardisierbare Workflows.

- Kunde ändert Zielprofil oder Scope; Auswirkungen auf Route, Risiken, Services und Reports werden versioniert neu berechnet.

## 10. Systemgrenzen und Nicht-Ziele

- Kein SIEM-, EDR-, Schwachstellenscanner-, Ticketing-, CMDB- oder ERP-Ersatz.

- Kein reiner Dokumentenspeicher oder Audit-Tracker.

- Keine automatisierte Risikofreigabe ohne verantwortlichen Menschen.

- Keine Black-Box-Empfehlung ohne Datenbasis, Unsicherheit und Alternativen.

- Keine erfundenen PwC-internen Preise, Kundendaten oder geschützten Templates.

- Keine verdeckte Leistungskontrolle einzelner Mitarbeiter.

- Keine parallelen Modulwelten mit widersprüchlichen Rollen, Scores oder Statuslogiken.

## 11. Verbindliche Entscheidungen

- **05-D01:** Die Produktlandkarte ist modular, verwendet aber ein gemeinsames Daten-, Rollen- und Entscheidungsmodell.

- **05-D02:** Der digitale Unternehmenszwilling ist fachlicher Kern und keine optionale Visualisierung.

- **05-D03:** Jedes Hauptmodul beantwortet eine zentrale Nutzerfrage und zeigt Ursache, Wirkung und nächsten Schritt.

- **05-D04:** Audit-Readiness ist eine Zielperspektive unter mehreren und darf die Produktlogik nicht dominieren.

- **05-D05:** Managed Services sind in Datenmodell, Workflow, Reporting und Wertmessung eingebaut - nicht nur als Verkaufskatalog.

- **05-D06:** Das Zielprodukt umfasst alle beschriebenen Module; Bauphasen priorisieren technische Tiefe, nicht die langfristige Vision.

- **05-D07:** Der Demonstrator zeigt eine vollständige Produktwelt mit synthetischen Unternehmen, Rollen und Daten.

- **05-D08:** Flagship-Journeys müssen durchgängig funktionieren; ergänzende Bereiche dürfen im frühen Demonstrator deterministisch simuliert sein.

- **05-D09:** KI-Funktionen besitzen transparente Guardrails und einen manuellen oder regelbasierten Fallback.

- **05-D10:** Kritische Aktionen sind rollen-, mandanten- und freigabebezogen; Berechtigung wird nie nur über Navigation gelöst.

- **05-D11:** Alle Exporte, Simulationen und Empfehlungen zeigen Datenstand, Scope, Annahmen und Vertrauensgrad.

- **05-D12:** Die Plattform ersetzt keine operativen Quellsysteme, sondern verbindet und übersetzt sie in Governance und Entscheidungen.

- **05-D13:** Reisezeit, Vor-Ort-Anforderungen, Kapazität und Vertretung sind Bestandteile der Berater- und Serviceplanung.

- **05-D14:** PDF- und PPTX-Erzeugung ist Kernfunktion, weil Kommunikation ein wesentlicher Teil von ISMS- und Beratungsarbeit ist.

- **05-D15:** Änderungen an Scope, Zielprofil, Risiko oder Service erzeugen versionierte Decision Records und nachvollziehbare Auswirkungen.

## 12. Begründete Annahmen

- **05-A01:** Der erste glaubwürdige Einsatzkontext ist ein Serviceanbieter mit mehreren Mandanten und gemischten Reifegraden.

- **05-A02:** Microsoft-zentrierte Identität, Dokumente und Collaboration sind für viele Zielkunden relevant; die Architektur bleibt herstellerneutral.

- **05-A03:** Kunden beginnen häufig mit unvollständigen Daten. Datenvertrauen und Lückensteuerung sind deshalb produktiv wichtiger als perfekte Erstbefüllung.

- **05-A04:** ISMS Manager und Consultants sind tägliche Power User; Executives und Owner nutzen die Plattform ereignis- oder entscheidungsbezogen.

- **05-A05:** Der größte frühe Nutzennachweis entsteht durch schnellere Priorisierung, wiederverwendbare Workflows und automatische Deliverables.

- **05-A06:** Ein neutraler Produktentwurf kann später durch eine Beratung gebrandet, erweitert und mit eigenen Templates/Preisen versehen werden.

- **05-A07:** Für den Demonstrator sind berechnete und synthetische Werte zulässig, wenn sie eindeutig gekennzeichnet und logisch konsistent sind.

- **05-A08:** Nicht jede Integration muss im ersten Bau produktiv sein; Integrationsverträge und realistische Mock-Connectoren müssen jedoch sichtbar sein.

- **05-A09:** Anonymisierte Benchmarks benötigen später rechtliche, vertragliche und statistische Validierung.

- **05-A10:** Service Opportunities werden nur akzeptiert, wenn sie fachlich begründet, optional und nicht manipulierend dargestellt werden.

## 13. Offene Fragen

- **05-O01:** Welche fünf bis sieben Flagship-Journeys werden für die erste ausführbare Version vollständig produktiv implementiert?

- **05-O02:** Welche Branchen- und Regulierungsprofile werden im ersten Demo-Datensatz gezeigt?

- **05-O03:** Welche Framework-Inhalte dürfen aus Lizenzgründen vollständig mitgeliefert oder nur referenziert werden?

- **05-O04:** Welches Graph-/Datenmodell wird technisch gewählt und welche Beziehungen sind kanonisch?

- **05-O05:** Welche Score- und Reifegradlogik wird im Demonstrator als nachvollziehbare Referenz verwendet?

- **05-O06:** Welche Integrationen werden real, welche als Mock und welche nur als Contract demonstriert?

- **05-O07:** Welche Freigaben und Schwellenwerte sind global, tenant-spezifisch oder service-spezifisch konfigurierbar?

- **05-O08:** Wie werden Preise im neutralen Demonstrator dargestellt: Marktband, Beispielkatalog oder vollständig konfigurierbar?

- **05-O09:** Welche Daten dürfen für Cross-Customer-Benchmarking genutzt werden und wie wird Re-Identifikation verhindert?

- **05-O10:** Welche Offline-Funktionen sind für Vor-Ort-Audits zwingend?

- **05-O11:** Welche Sprachen und Barrierefreiheitsstufen sind für die erste Präsentationsfassung erforderlich?

- **05-O12:** Welche Personen- und Leistungsmetriken sind zulässig, ohne verdeckte Mitarbeiterüberwachung zu erzeugen?

## 14. Ideenparkplatz

- **Product Graph Explorer:** Zoombare visuelle Unternehmenslandkarte mit Fokusmodi für Prozess, Risiko, Control, Service oder Audit.

- **Executive Scenario Room:** Gemeinsamer Entscheidungsraum für Investitionsoptionen, Annahmen, Abstimmung und Freigabe.

- **Journey Replay:** Zeitliche Wiedergabe, wie ein Risiko erkannt, entschieden, behandelt und nachgewiesen wurde.

- **Voice Briefing:** Gesprochenes Morning Briefing mit Rückfragen und anschließendem schriftlichem Decision Record.

- **Offline Audit Companion:** Lokaler Auditmodus für Checklisten, Notizen, Evidence Capture und spätere Synchronisation.

- **Service Sandbox:** Simulation, wie sich ein Managed Service auf Kapazität, SLA, Risiko und Kosten auswirken würde.

- **Cross-Customer Pattern Lab:** Datenschutzkonforme Mustererkennung für wiederkehrende Lücken, Maßnahmenwirkung und Templates.

- **Control Digital Passport:** Portables Profil eines Controls mit Scope, Owner, Wirksamkeit, Evidence, Ausnahmen und Historie.

- **Regulatory Change Route:** Neue Vorgabe wird automatisch auf betroffene Kunden, Controls, Services und Roadmaps abgebildet.

- **Trust Narrative Builder:** Erzeugt aus verifizierten Daten eine zielgruppengerechte Geschichte über Fortschritt und verbleibende Risiken.

## 15. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Dokument 00-04, Marktanalyse und Brainstorming. |

## Nächster Schritt
Dokument 06 - UX/UI, Navigation und rollenbezogene Erlebniswelten.
