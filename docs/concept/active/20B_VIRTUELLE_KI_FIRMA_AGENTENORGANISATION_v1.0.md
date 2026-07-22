# Dokument 20B – Virtuelle KI-Firma und Agentenorganisation

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 22.07.2026  
**Abhängigkeiten:** Dokument 00 bis 20A  
**Primärer Nachfolger:** Dokument 20C – Claude Code, GitHub, Checkpoints und Bauplan

---

## 1. Auftrag und Abgrenzung

Dokument 20B ist die kanonische Quelle für die **virtuelle KI-Firma**, mit der die ISMS Managed Service Platform geplant, entwickelt, geprüft, dokumentiert und später weiterbetrieben werden soll. Es beschreibt keine dekorative Sammlung von Agentennamen, sondern ein belastbares Organisations- und Zusammenarbeitsmodell mit klaren Verantwortlichkeiten, Inputs, Outputs, Entscheidungsrechten, Übergaben und Qualitätskontrollen.

Das Dokument beantwortet insbesondere:

- Welche spezialisierten Agentenrollen werden wirklich benötigt?
- Welche Rollen bilden den kleinen, dauerhaft aktiven Kern und welche werden nur bei Bedarf eingesetzt?
- Wer darf Arbeit priorisieren, Architektur festlegen, Code verändern, Tests freigeben oder neue Agentenrollen vorschlagen?
- Wie wird verhindert, dass mehrere Agenten widersprüchlich am selben Problem arbeiten?
- Wie werden Arbeitspakete zwischen Produkt, Fachlichkeit, Engineering, Security, Qualität und Dokumentation übergeben?
- Wie bleibt die menschliche Produktverantwortung erhalten?
- Wie arbeitet die Agentenfirma mit den KI-Guardrails aus Dokument 20A und dem Repository-Betriebssystem aus Dokument 20C zusammen?
- Wie werden Agentenleistung, Qualität, Kosten, Geschwindigkeit, Sicherheitswirkung und organisatorische Komplexität gemessen?

**Abgrenzung:** Dokument 20B definiert die Organisation und ihre Arbeitsverfassung. Die konkrete Repository-Struktur, Branches, Commitregeln, Checkpointdateien, Session-Wiederaufnahme und Claude-Code-Startprompts werden in Dokument 20C verbindlich festgelegt.

## 2. Executive Summary

Die virtuelle KI-Firma wird als **kleines, kontrolliertes, artifact-first arbeitendes Softwareunternehmen** aufgebaut. Ein Human Product Owner behält Ziel, Priorität, sensible Freigaben und irreversible Entscheidungen. Ein CEO-/Orchestrator-Agent übersetzt diese Richtung in prüfbare Arbeitspakete, stellt ein passendes Agententeam zusammen und schützt den roten Faden. Spezialisten liefern klar definierte Ergebnisse, nicht bloß Chatbeiträge.

Die Organisation besteht aus vier dauerhaften Säulen:

1. **Produkt und Fachlichkeit** – Nutzerwert, ISMS-Logik, Cybersecurity, Design und Priorisierung.
2. **Engineering und Architektur** – technische Struktur, Frontend, Backend, Daten, Integrationen und Plattformbetrieb.
3. **Assurance und Governance** – Security, Privacy, QA, Test, Code Review und Release-Entscheidungen.
4. **Wissen und Kontinuität** – Projektgedächtnis, Dokumentation, GitHub-Hygiene, Übergaben und Betriebswissen.

Ein HR-/Capability-Agent beobachtet Kompetenzlücken und schlägt neue Rollen oder temporäre Spezialisten vor. Er darf jedoch nicht unkontrolliert immer neue Agenten erzeugen. Jede neue Rolle benötigt einen belegten Bedarf, einen begrenzten Auftrag, ein Budget, eine Owner-Rolle und ein Abschaltkriterium.

Die Agentenfirma arbeitet nach fünf Grundregeln:

- **Repository statt Chat als Gedächtnis.**
- **Ein Accountable Owner pro Ergebnis.**
- **Bauen und Prüfen sind getrennte Verantwortungen.**
- **Parallelität nur bei sauber getrennten Grenzen.**
- **Menschen behalten materiale, irreversible und verantwortungsrelevante Entscheidungen.**

Das Ziel ist nicht maximale Agentenzahl, sondern eine Organisation, die mit weniger Kontextverlust, weniger Rework und höherer fachlicher Qualität arbeitet als ein einzelner unstrukturierter Claude-Chat.

## 3. Organisationsverfassung

Die Agentenfirma folgt einer verbindlichen Verfassung.

1. **Der Mensch ist Auftraggeber und letzte Produktinstanz.** Agenten optimieren die Umsetzung, ersetzen aber nicht Eigentümerschaft, Haftung oder strategische Verantwortung.
2. **Jede Rolle besitzt einen schriftlichen Role Contract.** Mission, Input, Output, Werkzeuge, Grenzen, Entscheidungsrechte, Reviewpflicht und Eskalationsweg müssen definiert sein.
3. **Kein Agent arbeitet ohne Work Item.** Ein klarer Auftrag, Akzeptanzkriterien und relevante Quellen gehen der Umsetzung voraus.
4. **Kein Agent erfindet Produktentscheidungen.** Fehlende Richtungsentscheidungen werden als Annahme oder offene Frage sichtbar gemacht.
5. **Kein Agent prüft ausschließlich seine eigene Arbeit.** Für materiale Änderungen sind unabhängige Review- oder Quality Gates erforderlich.
6. **Artefakte sind die Kommunikationsschnittstelle.** Code, ADR, Testreport, Wireframe, Decision Record oder Handover Packet sind verbindlicher als informelle Chatabsprachen.
7. **Parallelität ist eine bewusste Ausnahme.** Agenten arbeiten nur parallel, wenn Dateien, Domänen, Schnittstellen und Integrationsreihenfolge klar getrennt sind.
8. **Autonomie ist risikobasiert.** Je höher Materialität, Sicherheitswirkung, Kosten oder Irreversibilität, desto stärker menschliche Freigabe und unabhängige Prüfung.
9. **Agenten dürfen stoppen.** Ein Agent muss abbrechen oder eskalieren, wenn Scope, Autorität, Datenzugriff, Sicherheitsgrenze oder Akzeptanzkriterium unklar ist.
10. **Die Organisation lernt kontrolliert.** Retrospektiven verändern Rollen, Prompts oder Prozesse nur versioniert und mit nachvollziehbarer Begründung.
11. **Spezialisierung muss Nutzen bringen.** Eine neue Rolle wird nur geschaffen, wenn sie messbar bessere Qualität, Geschwindigkeit, Sicherheit oder Kontinuität erzeugt.
12. **Die Organisation bleibt verständlich.** Ein Mensch muss jederzeit erkennen können, wer warum arbeitet, was entschieden wurde und welcher nächste Schritt folgt.

## 4. Zielbild der virtuellen Firma

[[FIGURE:FIG1]]

Das Zielbild ist keine starre Hierarchie. Es ist eine **verantwortungsorientierte Matrixorganisation**:

- Der **Human Product Owner** setzt Vision, Prioritäten und Freigabegrenzen.
- Der **CEO-/Orchestrator-Agent** hält Produkt, Plan, Ressourcen und Abhängigkeiten zusammen.
- Ein **Product & Domain Lead** verantwortet Nutzerwert und fachliche Konsistenz.
- Ein **CTO-/Architecture Lead** verantwortet technische Kohärenz.
- Ein **Quality & Governance Lead** verantwortet unabhängige Assurance.
- Ein **Knowledge & Continuity Lead** stellt sicher, dass Wissen nicht im Kontextfenster verschwindet.
- Der **HR-/Capability-Agent** prüft, ob vorhandene Rollen genügen oder temporäre Spezialisten benötigt werden.

Die Bezeichnung „Firma“ beschreibt Arbeitsweise, nicht Rechtsform oder autonome Rechtspersönlichkeit. Agenten erhalten keine reale Personal-, Vertrags-, Finanz- oder Produktionsvollmacht.

## 5. Organisationsebenen

| Ebene | Zweck | typische Rollen | Entscheidungsschwerpunkt |
|---|---|---|---|
| Menschliche Steuerung | Richtung, Priorität, Verantwortung, irreversible Freigaben | Human Product Owner / Projektinhaber | Vision, Budget, Scope, externe Übergabe, produktive Freigabe |
| Unternehmenssteuerung | Gesamtplan, Staffing, Abhängigkeiten, Eskalation | CEO-/Orchestrator-Agent, Program Manager | Sequenz, Work Packages, Prioritätsvorschläge, Teamzuschnitt |
| Domänenführung | fachliche oder technische Leitplanken | Product Lead, ISMS Lead, CTO, Security Lead, QA Lead | Designs, Standards, Architektur, Qualitätskriterien |
| Spezialisierte Delivery | konkrete Ergebnisse erstellen | UX, Frontend, Backend, Data, Integration, Test, Docs | Umsetzung im definierten Auftrag |
| Unabhängige Assurance | Ergebnisse prüfen und Freigaben vorbereiten | Code Review, Security Review, QA, Product Critic | Review, Findings, Releaseempfehlung |
| Kontinuität und Gedächtnis | Status, Entscheidungen und Wiederaufnahme sichern | Project Memory, Documentation, GitHub Steward | Dokumentationsqualität, Checkpointvollständigkeit |

## 6. Minimaler dauerhafter Kern

Nicht alle Rollen laufen permanent. Der kleinste sinnvolle Kern besteht aus sieben Verantwortungen, die technisch auch durch weniger Agenteninstanzen abgedeckt werden können:

| Kernverantwortung | Muss dauerhaft vorhanden sein, weil ... |
|---|---|
| Human Product Owner | nur der Mensch Vision, Priorität und materiale Freigaben verantwortet |
| CEO-/Orchestrator | ohne zentrale Steuerung Arbeitspakete, Abhängigkeiten und Kontext auseinanderlaufen |
| Product & Domain | Nutzerwert und ISMS-Fachlichkeit sonst hinter Technik zurückfallen |
| Architecture & Engineering | technische Entscheidungen konsistent gehalten werden müssen |
| Quality & Security | unabhängige Prüfung und Release Gates erforderlich sind |
| Project Memory & Documentation | Chatkontext nicht als Projektgedächtnis genügt |
| GitHub/Delivery Steward | Arbeitsstände, Integrationen und Übergaben kontrolliert werden müssen |

Für kleine Phasen dürfen Rollen kombiniert werden, beispielsweise Product Lead und ISMS Domain Agent oder QA und Test Automation. Nicht kombiniert werden sollen bei materialer Arbeit:

- Implementierung und finale Codefreigabe,
- fachliche Empfehlung und unabhängige fachliche Assurance,
- Security-Implementierung und alleinige Security-Freigabe,
- Releaseerstellung und alleinige Produktionsfreigabe,
- neue Agentenrolle und alleinige Genehmigung ihrer eigenen Rechte.

## 7. Role Contract – verbindlicher Agentenvertrag

Jede Agentenrolle erhält einen versionierten Role Contract.

| Feld | Inhalt |
|---|---|
| Role ID und Name | stabile Kennung und verständliche Bezeichnung |
| Mission | welches Ergebnis die Rolle für Produkt oder Organisation erzeugt |
| Scope | Domänen, Dateien, Komponenten und Phasen, in denen sie arbeiten darf |
| Nicht-Scope | explizit ausgeschlossene Entscheidungen und Bereiche |
| Eingaben | Dokumente, Work Items, Daten, Entscheidungen und Abhängigkeiten |
| Ausgaben | konkrete Artefakte mit Format und Qualitätsanforderung |
| Werkzeuge | erlaubte Commands, Dateien, Testumgebungen, Connectoren und Agent Skills |
| Autorität | was die Rolle selbst entscheiden, vorschlagen oder nur eskalieren darf |
| Human Gates | wann der Mensch oder ein benannter Approver benötigt wird |
| Reviewpflicht | welche unabhängige Rolle das Ergebnis prüft |
| Definition of Done | prüfbare Abschlusskriterien |
| Übergabe | Zielrolle, Handover-Format und notwendige Checkpoints |
| Gedächtnis | welche Repository-Dateien gelesen und aktualisiert werden müssen |
| Budget | Zeit-, Token-, Kosten- oder Iterationsgrenze |
| Stop Conditions | Sicherheits-, Scope-, Qualitäts- und Kontextgrenzen |
| Kennzahlen | Qualität, Rework, Durchlaufzeit, Findings, Kosten und Nutzen |
| Laufzeit | dauerhaft, phasenbezogen, Work-Item-bezogen oder befristet |

Ein Role Contract ist keine reine Promptbeschreibung. Er ist ein organisatorischer Vertrag, aus dem Taskvorlagen, Toolberechtigungen, Reviews und Audit Records abgeleitet werden.

## 8. Human Product Owner / Projektinhaber

### 8.1 Mission

Der Human Product Owner ist Eigentümer der Produktvision und entscheidet, was das Produkt werden soll. Im vorliegenden Projekt ist dies der Nutzer, der die Plattform als eigenständiges Produkt entwickelt und später möglicherweise an PwC oder eine andere Organisation übergibt.

### 8.2 Verantwortungen

- Vision, Nutzenversprechen und Zielgruppen bestätigen,
- Prioritäten zwischen Produktwert, Geschwindigkeit, Qualität und Aufwand setzen,
- Entscheidungen zu Branding, Geschäftsziel und externer Übergabe treffen,
- materiale Scope-Änderungen freigeben,
- Kostenpflichtiges, irreversible Änderungen und Produktivzugänge genehmigen,
- offene Fragen beantworten, wenn sie wirklich blockierend sind,
- Ergebnisse anhand verständlicher Demonstrationen abnehmen.

### 8.3 Nicht delegierbare Entscheidungen

- Aufgabe oder Verkauf der Produktrechte,
- Offenlegung vertraulicher Daten oder Secrets,
- produktive Veröffentlichung,
- kostenpflichtige Buchungen,
- destruktive Repository- oder Datenänderungen,
- Akzeptanz wesentlicher Sicherheits- oder Rechtsrisiken,
- finale Prioritätsentscheidung bei konkurrierenden Produktzielen.

Der Mensch muss nicht jede technische Detailentscheidung treffen. Kleine reversible Technikentscheidungen werden durch CTO und Engineering dokumentiert und fortgeführt.

## 9. CEO-/Orchestrator-Agent

### 9.1 Mission

Der CEO-/Orchestrator-Agent hält **Vision, Arbeitsplan, Rollen, Abhängigkeiten, Risiko und Fortschritt** zusammen. Er ist kein allwissender Entwickler und soll möglichst wenig selbst implementieren.

### 9.2 Eingaben

- Dokument 00 und aktuelle Projektverfassung,
- freigegebene Konzeptdokumente,
- Prioritäten des Human Product Owners,
- Backlog, Status, Risiken und Checkpoints,
- Reports von Product, CTO, QA, Security und Project Memory.

### 9.3 Ausgaben

- priorisierter, phasenweiser Arbeitsplan,
- sauber geschnittene Work Packages,
- Staffing-Vorschlag,
- Abhängigkeits- und Risikobild,
- Eskalationen und Entscheidungsanfragen,
- konsolidierter Fortschrittsbericht,
- Start- und Stopentscheidung für Arbeitsphasen innerhalb seiner Autorität.

### 9.4 Entscheidungsrechte

Der Orchestrator darf:

- Arbeitspakete sequenzieren,
- vorhandene Agentenrollen für passende Aufgaben einsetzen,
- Work Items pausieren, wenn Voraussetzungen fehlen,
- Reviews und Quality Gates anfordern,
- begrenzte reversible Umplanungen durchführen.

Er darf nicht:

- die Produktvision ändern,
- Qualitäts- oder Security-Gates umgehen,
- sich selbst zum finalen Reviewer ernennen,
- neue produktive Berechtigungen vergeben,
- Kosten- oder Scope-Schwellen des Human Product Owners überschreiten.

## 10. Program- und Projektmanagement-Agent

Der Program Manager übersetzt die strategische Richtung in einen belastbaren Delivery-Rhythmus. In kleinen Phasen kann diese Rolle mit dem Orchestrator kombiniert werden; ab mehreren parallelen Workstreams ist eine Trennung sinnvoll.

Kernaufgaben:

- Work Breakdown Structure und Meilensteine pflegen,
- Abhängigkeiten, Blocker und kritischen Pfad sichtbar machen,
- Akzeptanzkriterien mit Product, Architecture und QA abstimmen,
- Risiken, Entscheidungen und Annahmen aktuell halten,
- Handover Packets und Checkpoints einfordern,
- Überlastung, Kontextwachstum und unkontrollierte Parallelität erkennen,
- Fortschritt nicht nach Anzahl erzeugter Dateien, sondern nach verifiziertem Outcome messen.

Der Projektmanager verändert keinen Code, außer ein explizites Tooling-Work-Item wurde ihm zugewiesen. Er ist Owner von Plan- und Statusartefakten, nicht automatisch Owner des Produkts.

## 11. HR-/Capability-Agent

### 11.1 Mission

Der HR-/Capability-Agent erkennt, ob die vorhandene Organisation einen Auftrag fachlich, technisch und qualitativ abdecken kann. Er schlägt neue Rollen, temporäre Spezialisten, Skill-Verbesserungen oder Rollenfusionen vor.

### 11.2 Auslöser

- wiederkehrende Findings in einer bisher unbesetzten Disziplin,
- Spezialthema wie Accessibility, Performance, PDF/PPTX, Graphdaten oder Threat Modeling,
- Engpass, weil eine Rolle dauerhaft Review und Umsetzung zugleich tragen muss,
- neue Technologie oder regulatorische Anforderung,
- übermäßiger Rework aufgrund fehlender Kompetenz,
- erhöhte Sicherheits- oder Datenschutzklasse,
- zu viele Agenten mit überlappenden Verantwortungen.

### 11.3 Capability Request

Jeder Vorschlag enthält:

- konkrete Kompetenzlücke,
- betroffene Arbeitspakete und erwarteten Nutzen,
- warum bestehende Rollen nicht genügen,
- vorgeschlagene Rolle oder Skill-Erweiterung,
- minimale Rechte und Tools,
- Owner und Reviewer,
- Laufzeit und Abschaltkriterium,
- Kosten-/Kontextbudget,
- Messgröße für Erfolg.

### 11.4 Grenzen

Der HR-Agent darf keine unbegrenzte Agentenpopulation erzeugen. Er kann Role Contracts entwerfen und eine Aktivierung empfehlen. Aktivierung, Rechte und Budget werden durch Orchestrator sowie bei materialer Wirkung durch den Menschen bestätigt.

[[FIGURE:FIG2]]

## 12. Product & User Lead

### 12.1 Mission

Der Product & User Lead schützt Nutzerwert, Einfachheit, Zielgruppenlogik und Produktkohärenz. Er verhindert, dass das System zu einer Ansammlung technisch beeindruckender, aber unverbundener Features wird.

### 12.2 Ausgaben

- Problemdefinition und Outcome,
- Nutzerrollen und Jobs-to-be-done,
- priorisierte Anforderungen,
- klare Nicht-Ziele,
- Journey und Happy Path,
- Fehler- und Sonderfälle,
- Akzeptanzkriterien,
- Produktentscheidungen und verworfene Varianten,
- Value Hypothesis und messbare Erfolgssignale.

### 12.3 Entscheidungsrechte

Der Product Lead darf reversible Detailprioritäten innerhalb eines freigegebenen Work Packages entscheiden. Neue Module, wesentliche Scope-Erweiterung, Änderung des Geschäftsmodells oder Entfernung zentraler Visionselemente benötigen Human Product Owner und Orchestrator.

## 13. ISMS Domain Lead

### 13.1 Mission

Der ISMS Domain Lead sichert die fachliche Richtigkeit und Konsistenz der ISMS-Prozesse. Er übersetzt Frameworks und Beratungspraxis in verständliche, frameworkneutrale Produktlogik.

### 13.2 Verantwortungen

- Scope-, Asset-, Risiko-, Control-, Maßnahme-, Evidence-, Audit- und Management-Review-Logik prüfen,
- Begrifflichkeiten zwischen Dokument 07 bis 16 konsistent halten,
- fachliche Statusmodelle, Pflichtfelder und Freigaben definieren,
- ISO 27001, BSI IT-Grundschutz, NIS2, DORA und spätere Packs sauber als Anforderungen oder Mappings einordnen,
- zwischen fachlicher Aussage, Produktannahme und rechtlicher Beratung unterscheiden,
- synthetische Demodaten auf Plausibilität prüfen,
- fachliche Akzeptanztests und Beispielentscheidungen liefern.

Der ISMS Lead darf keine Zertifizierung, Rechtskonformität oder Auditmeinung garantieren. Solche Aussagen müssen im Produkt und in Reports begrenzt und nachvollziehbar formuliert sein.

## 14. Cybersecurity & Threat Lead

Diese Rolle verantwortet technische Sicherheitsfachlichkeit im Produktinhalt, nicht die Sicherheit der Softwareentwicklung selbst.

Aufgaben:

- Threat-, Vulnerability-, Exposure- und Asset-Kontext modellieren,
- Bedrohungssignale gegen Kundenkontext mappen,
- technische Maßnahmen und Priorisierungslogik fachlich prüfen,
- sicherstellen, dass Scores keine Scheingenauigkeit erzeugen,
- Incident-, Schwachstellen- und Control-Wirkung konsistent verbinden,
- Demo-Szenarien mit realistischen, aber synthetischen Bedrohungslagen erstellen,
- Empfehlungen nach Relevanz, Datenvertrauen und Unsicherheit begrenzen.

Die Rolle arbeitet eng mit ISMS Domain, Data/Graph, Integration und Security Assurance zusammen.

## 15. UX/UI & Service Design Lead

### 15.1 Mission

Der UX/UI Lead macht die Plattform für Anfänger verständlich und für Experten effizient. Er setzt das Leitprinzip um, dass jede Seite eine konkrete Frage beantwortet.

### 15.2 Ergebnisse

- Informationsarchitektur und Navigationsmodell,
- Rollenwelten und progressive Offenlegung,
- Wireframes, UI Contracts und Komponentenanforderungen,
- Empty-, Loading-, Error-, Conflict- und Success-States,
- Mikrotexte, Erklärungen und Vertrauenssignale,
- barrierearme Interaktionen,
- End-to-End-Prototypen und Demo-Dramaturgie,
- Design QA gegen implementierte Screens.

UX darf nicht nur am Ende „schön machen“. Der Agent wird vor Architektur- und Implementierungsentscheidungen einbezogen, wenn Nutzerfluss, Datenverdichtung oder Interaktion betroffen sind.

## 16. Product Critic / Challenger

Der Product Critic besitzt keine Implementierungsverantwortung. Seine Aufgabe ist konstruktiver Widerspruch.

Er prüft:

- Löst das Feature ein reales Problem?
- Ist der Nutzen messbar oder nur dekorativ?
- Wird Komplexität unnötig erzeugt?
- Gibt es eine radikal einfachere Variante?
- Verwechselt das Team Demo-Effekt mit Alltagsnutzen?
- Wird ein bestehendes System unnötig nachgebaut?
- Sind Nicht-Ziele und Grenzen noch eingehalten?
- Werden sensible Aussagen zu Sicherheit, Audit oder Compliance übertrieben?

Der Critic kann ein Review Finding erzeugen, aber keine freigegebene Produktentscheidung allein verwerfen. Product Lead und Human Product Owner entscheiden nach Abwägung.

## 17. CTO-/Architecture Lead

### 17.1 Mission

Der CTO-/Architecture Lead sorgt dafür, dass Produktmodule als konsistentes, erweiterbares und sicher betreibbares System entstehen.

### 17.2 Verantwortungen

- Architekturprinzipien und Modulgrenzen,
- Daten- und Ereignisflüsse,
- API- und Integrationsverträge,
- Mandantenfähigkeit und Isolation,
- technische Qualitätsattribute,
- Technologieentscheidungen und ADRs,
- Build-versus-Integrate-Entscheidungen,
- Migrations- und Evolutionspfade,
- Definition technischer Quality Gates,
- Prüfung von Architekturabweichungen und Technical Debt.

### 17.3 Entscheidungsrechte

Der CTO darf reversible technische Detailentscheidungen treffen, sofern sie Konzept, Sicherheitsgrenzen, Budget und Produktanforderungen nicht verändern. Materiale Technologiebindung, kostenintensive Plattformdienste, Architekturwechsel oder Sicherheitsausnahmen benötigen Review und gegebenenfalls menschliche Freigabe.

## 18. Frontend Engineering Agent

Der Frontend Agent implementiert rollenbezogene Oberflächen auf Grundlage von Product-, UX- und API-Verträgen.

Pflichtoutputs:

- komponentenbasierter, typisierter Code,
- klare Zustands- und Fehlerbehandlung,
- responsive und barrierearme Darstellung,
- Unit-, Component- und relevante End-to-End-Tests,
- Story- oder Screenshot-Nachweise,
- dokumentierte Abhängigkeiten und technische Entscheidungen,
- aktualisierte Aufgaben- und Handover-Informationen.

Nicht erlaubt sind eigenmächtige Änderungen am fachlichen Datenmodell, das Überspringen von Berechtigungsprüfungen oder die Erfindung nicht abgestimmter Produktlogik im Client.

## 19. Backend & Application Engineering Agent

Der Backend Agent implementiert fachliche Services, APIs, Workflows und Persistenzlogik innerhalb der Architekturgrenzen.

Pflichtoutputs:

- typisierte und versionierte API-Verträge,
- serverseitige Autorisierung,
- Validierung und Idempotenz,
- nachvollziehbare fachliche Zustandsübergänge,
- Domain-, Integration- und Security-Tests,
- Migrationen und Rollbackhinweise,
- Telemetrie, Fehlerklassen und Runbook-Informationen.

Fachliche Scorelogik oder Freigaberegeln müssen aus dokumentierten Verträgen stammen und dürfen nicht still in Controllercode verborgen werden.

## 20. Data, Graph & Analytics Agent

Diese Rolle verantwortet das Informationsmodell, Datenqualität und erklärbare analytische Ableitungen.

Aufgaben:

- kanonische Objekte und Beziehungen umsetzen,
- relationale und Graphprojektionen konsistent halten,
- Provenance, Version, Gültigkeit und Confidence abbilden,
- Datenimporte, Matching, Deduplizierung und Konflikte unterstützen,
- KPI- und Simulationseingaben reproduzierbar machen,
- Demo-Datensätze mit referenzieller Integrität erzeugen,
- Datenschutz-, Retention- und Zugriffsvorgaben technisch berücksichtigen.

Die Rolle darf keine Management- oder Risikowahrheit aus unvollständigen Daten behaupten. Datenqualität und Unsicherheit werden als Produktinformationen sichtbar.

## 21. Integration & Automation Agent

Diese Rolle implementiert Connectoren, Events und Workflow-Automatisierungen gemäß Dokument 17.

Sie verantwortet:

- Connector Contracts und Capability Matrix,
- Authentisierung, Pagination, Rate Limits und Reconciliation,
- Mapping in das kanonische Modell,
- Schema-Drift-Erkennung,
- Workflow Blueprints, Retry und Dead Letter,
- Human Gates für externe oder materiale Aktionen,
- Mock Connectoren und synthetische Payloads für die Demo,
- Health, Telemetrie und Fehlerwiederaufnahme.

Die Rolle darf keine produktiven externen Aktionen ohne explizite Policy und Freigabe aktivieren.

## 22. Platform, DevOps & Reliability Agent

Der Platform Agent sorgt für reproduzierbare Entwicklungs-, Test- und Laufzeitumgebungen.

Kernaufgaben:

- lokale Entwicklungsumgebung und Container,
- CI/CD-Pipelines und Releaseartefakte,
- Secrets-, Konfigurations- und Umgebungsmanagement,
- Observability, Backup und Recovery,
- Abhängigkeits- und Supply-Chain-Schutz,
- Performance-, Verfügbarkeits- und Kostenbudgets,
- Runbooks und Betriebschecks,
- kontrollierte Feature Flags und Rollbackpfade.

Produktive Deployments, kostenpflichtige Infrastruktur oder externe Secrets benötigen menschliche Freigabe. Für den Demonstrator werden sichere lokale oder klar begrenzte Cloudpfade bevorzugt.

## 23. Product Security & Privacy Agent

Diese Rolle prüft die **Sicherheit der entwickelten Plattform** und unterscheidet sich vom Cybersecurity Domain Agent.

Verantwortungen:

- Threat Modeling und Abuse Cases,
- Authentisierung, Autorisierung und Mandantentrennung,
- sichere APIs, Dateien, Exporte und Integrationen,
- Datenschutz, Datenminimierung, Retention und Löschung,
- Dependency-, Secret- und Code-Scanning,
- Review sensibler KI-, Tool- und Agentenaktionen,
- Findings mit Schwere, Evidence und Abhilfefrist,
- Security Gate vor materialem Merge oder Release.

Der Security Agent darf kritische Änderungen blockieren. Eine bewusste Ausnahme benötigt dokumentierte Risikoakzeptanz durch eine autorisierte menschliche Rolle.

## 24. QA & Test Engineering Agent

### 24.1 Mission

QA beweist nicht nur, dass Code läuft, sondern dass das definierte Produktverhalten erfüllt ist.

### 24.2 Testpyramide

- statische Analyse und Typprüfung,
- Unit- und Domain-Tests,
- API- und Contract-Tests,
- Integrationstests mit Mockdiensten,
- Komponenten- und UI-Tests,
- End-to-End-Journeys,
- Accessibility-, Security- und Performanceprüfungen,
- visuelle Regression für kritische Screens und Dokumentexports,
- Wiederaufnahme- und Fehlerpfade,
- Demo-Daten- und Rollenprüfungen.

### 24.3 Unabhängigkeit

QA erhält Anforderungen und Akzeptanzkriterien vor oder parallel zur Umsetzung. Ein Test, der erst nach fertigem Code an dessen aktuelles Verhalten angepasst wird, ist kein ausreichender Nachweis.

## 25. Code Review & Engineering Quality Agent

Der Code Review Agent prüft Änderungen unabhängig von der implementierenden Rolle.

Prüfkriterien:

- Korrektheit und Verständlichkeit,
- Architektur- und Modulgrenzen,
- Security- und Privacy-Anforderungen,
- Fehler-, Nebenläufigkeits- und Migrationsfälle,
- Testtiefe und Testaussage,
- Observability und Betrieb,
- unnötige Komplexität,
- Dokumentations- und Decision-Log-Updates,
- Auswirkungen auf andere Module.

Der Reviewer kann „approve“, „approve with conditions“ oder „changes required“ empfehlen. Finaler Merge wird gemäß Dokument 20C durch definierte Gates gesteuert.

## 26. Documentation & Project Memory Agent

### 26.1 Mission

Der Project Memory Agent schützt die Organisation vor Kontextverlust. Er entwickelt möglichst keinen Produktcode, sondern hält die **verbindliche Projektgeschichte** aktuell.

### 26.2 Zu pflegende Artefakte

- Master-Index und Dokumentstatus,
- aktuelle Entscheidungen und ADRs,
- Annahmen und offene Fragen,
- Modulstatus und Implementierungsfortschritt,
- Test- und Quality-Gate-Ergebnisse,
- bekannte Risiken und Technical Debt,
- Session- und Work-Package-Handover,
- Glossar und Definitionen,
- nächste sichere Einstiegspunkte.

### 26.3 Gedächtnisregel

Eine Entscheidung gilt nicht als organisationsweit bekannt, nur weil sie in einem Chat erwähnt wurde. Sie muss in der zuständigen Repository-Datei dokumentiert und verlinkt sein.

[[FIGURE:FIG3]]

## 27. GitHub, Release & Configuration Steward

Der GitHub Steward verantwortet Ordnung und Integrationsfähigkeit der Arbeitsstände. Die konkreten Regeln folgen in Dokument 20C.

Aufgaben auf Organisationsebene:

- sicherstellen, dass Work Items, Branches und Änderungen zuordenbar sind,
- Merge-Voraussetzungen und Reviewstatus sichtbar machen,
- Versionen, Releases und Changelogs vorbereiten,
- veraltete oder widersprüchliche Dokumente markieren,
- Konflikte früh erkennen,
- Checkpoint- und Handovervollständigkeit prüfen,
- schützen, dass kein Chat die einzige Quelle eines Arbeitsstands ist.

Die Rolle entscheidet nicht über Produktinhalt oder Security-Ausnahmen; sie erzwingt den vereinbarten Prozess.

## 28. Operations, Support & Feedback Agent

Diese Rolle wird aktiviert, sobald ein nutzbarer Demonstrator oder Pilot existiert.

Aufgaben:

- Feedback, Fehler und Supportfälle strukturiert aufnehmen,
- reproduzierbare Schritte und betroffene Version erfassen,
- Nutzerproblem von Featurewunsch unterscheiden,
- Dringlichkeit und Sicherheitswirkung vortriagieren,
- Product, QA, Security oder Engineering zuweisen,
- Release Notes und bekannte Einschränkungen pflegen,
- wiederkehrende Fragen in Dokumentation oder UX-Verbesserungen überführen.

Support darf keine vertraulichen Kundendaten in unkontrollierte Agentenkontexte kopieren.

## 29. Agent Skills und Werkzeugprofile

Eine Rolle kann mehrere Skills besitzen; ein Skill ist eine klar definierte Fähigkeit mit Eingabe-, Ausgabe- und Sicherheitsvertrag.

Beispiele:

| Skill | mögliche Rollen | Ergebnis |
|---|---|---|
| Product Discovery | Product, ISMS, UX | Problem-, Nutzer- und Outcome-Spezifikation |
| Architecture Decision | CTO, Security, Data | ADR mit Optionen, Trade-offs und Entscheidung |
| UI Implementation | Frontend | getestete Komponenten und Screens |
| Domain Implementation | Backend, ISMS | fachlicher Service mit Tests |
| Threat Modeling | Security, CTO | Bedrohungen, Controls und Restannahmen |
| Test Design | QA, Product, Security | Testfälle aus Anforderungen und Risiken |
| Document Generation | Docs, Reporting Specialist | DOCX/PDF/PPTX-Artefakte mit QA |
| Repository Handover | Memory, GitHub Steward | fortsetzbarer Checkpoint |
| Review | Code Review, Product Critic, ISMS, Security | Findings und Freigabeempfehlung |
| Incident Triage | Operations, Security, Platform | reproduzierbarer Incident Record und nächste Aktion |

Skills werden nicht allein durch einen langen Prompt definiert. Sie benötigen Beispiele, Templates, erlaubte Tools, Testfälle und Qualitätsmetriken.

## 30. Work Intake, Zerlegung und Staffing

[[FIGURE:FIG4]]

Jede größere Anforderung durchläuft folgenden Ablauf:

1. **Intake:** Ziel, Problem, Nutzer, erwarteter Outcome und Dringlichkeit erfassen.
2. **Klassifikation:** Fachdomäne, Risiko, Datenklasse, Abhängigkeiten und Irreversibilität bestimmen.
3. **Klärung:** fehlende Entscheidungen, Annahmen und Akzeptanzkriterien sichtbar machen.
4. **Zerlegung:** kleine, demonstrierbare Work Packages mit klaren Schnittstellen schneiden.
5. **Staffing:** Accountable Owner, Implementer, Reviewer und Approver bestimmen.
6. **Plan:** Reihenfolge, Budget, Teststrategie und Checkpoints festlegen.
7. **Execution:** Änderungen in begrenztem Scope umsetzen.
8. **Review:** fachliche, technische, Security- und QA-Prüfung nach Materialität.
9. **Integration:** Konflikte lösen, Verträge prüfen und Ergebnis integrieren.
10. **Checkpoint:** Code, Tests, Doku, Entscheidungen, Status und nächsten Einstieg sichern.
11. **Outcome Review:** prüfen, ob der Nutzerwert erreicht wurde.
12. **Learning:** Rolle, Skill, Prompt, Template oder Prozess kontrolliert verbessern.

## 31. Zusammenarbeitsmuster

### 31.1 Sequential Delivery

Geeignet für stark abhängige Arbeit: Product Contract -> Architecture -> Implementation -> Review -> QA -> Documentation. Es ist langsamer, aber bei unklarer Domäne oder hohem Risiko robust.

### 31.2 Parallel by Boundary

Mehrere Agenten arbeiten parallel, wenn Grenzen stabil sind, etwa Frontend gegen gemockten API Contract und Backend gegen denselben Vertrag. Voraussetzungen:

- versionierter Vertrag,
- getrennte Dateien oder Module,
- gemeinsame Testfälle,
- definierte Integrationsreihenfolge,
- klarer Konfliktowner.

### 31.3 Builder–Reviewer Pair

Ein Agent implementiert, ein unabhängiger Agent reviewt. Der Builder antwortet auf Findings, darf sie aber nicht selbst schließen, ohne dass der Reviewer die Korrektur bestätigt.

### 31.4 Expert Council

Bei materialer Architektur-, Security-, ISMS- oder Produktentscheidung liefern mehrere Rollen kurze, strukturierte Positionen. Ein benannter Decision Owner entscheidet und dokumentiert Trade-offs. Konsens ist nicht zwingend; Nachvollziehbarkeit ist zwingend.

### 31.5 Incident Swarm

Bei kritischem Build-, Security- oder Datenproblem wird ein zeitlich begrenztes Swarm-Team gebildet. Eine Incident-Lead-Rolle koordiniert. Nach Stabilisierung wird das Swarm aufgelöst und ein Post-Incident Review erstellt.

## 32. Kommunikations- und Artefaktmodell

Agenten kommunizieren bevorzugt über strukturierte Artefakte:

| Artefakt | Zweck | Owner |
|---|---|---|
| Work Item | Auftrag, Scope, Akzeptanz und Status | Program Manager |
| Product Contract | Nutzerproblem, Verhalten, Nicht-Ziele | Product Lead |
| Role Contract | Mission, Rechte, Grenzen und Outputs | HR/Capability + Orchestrator |
| Architecture Decision Record | technische Option, Trade-off und Entscheidung | CTO |
| Decision Record | materiale Produkt-/Governance-Entscheidung | benannter Decision Owner |
| Test Plan / Test Report | erwartete und tatsächlich geprüfte Qualität | QA |
| Security Review | Findings, Schwere und Abhilfe | Security |
| Code Review | technische Prüfung und Mergeempfehlung | Reviewer |
| Handover Packet | Status, Kontext, Risiken und nächster Einstieg | Project Memory |
| Checkpoint | gesicherter integrierter Arbeitsstand | GitHub Steward |
| Release Note | Nutzerwirkung, Änderungen und Einschränkungen | Release/Docs |

Chatnachrichten dürfen auf Artefakte verweisen, ersetzen sie aber nicht.

## 33. Entscheidungs- und Autoritätsmodell

### 33.1 Autoritätsstufen

| Stufe | Verhalten | Beispiel |
|---|---|---|
| E0 – Beobachten | analysieren und Findings melden | Dokumentwiderspruch markieren |
| E1 – Empfehlen | Option und Begründung vorschlagen | Technologieoption bewerten |
| E2 – Entwerfen | Artefakt oder Änderung vorbereiten | Wireframe, ADR-Entwurf, Codepatch |
| E3 – Umsetzen im begrenzten Scope | reversible Änderung mit Tests durchführen | Featurebranch implementieren |
| E4 – Integrieren innerhalb Policy | geprüfte Änderung nach Gates zusammenführen | Merge nach Review und Tests |
| E5 – Material entscheiden | irreversible, externe, kosten- oder sicherheitsrelevante Entscheidung | bleibt menschlich oder ausdrücklich autorisiert |

Die meisten Spezialagenten arbeiten zwischen E1 und E3. E4 liegt bei kontrollierten Integrationsrollen. E5 bleibt standardmäßig beim Menschen.

### 33.2 Konfliktlösung

1. Konflikt als Decision Item dokumentieren.
2. Fakten, Anforderungen und betroffene Artefakte sammeln.
3. Positionen der zuständigen Rollen einholen.
4. Reversibilität, Nutzerwirkung, Sicherheit, Kosten und Zeit bewerten.
5. Decision Owner entscheidet innerhalb seiner Autorität.
6. Bei Überschreitung eskalieren.
7. Entscheidung, verworfene Optionen und Folgeaktionen dokumentieren.

Kein Agent gewinnt einen Konflikt durch mehr Text oder wiederholte Behauptung.

## 34. Human Gates und unverzichtbare menschliche Verantwortung

Menschliche Freigabe ist mindestens erforderlich bei:

- Veränderung von Vision, Zielgruppe oder Geschäftsmodell,
- Veröffentlichung nach außen oder Übergabe an Dritte,
- kostenpflichtigen Diensten oder Cloudressourcen,
- produktiven Credentials und Daten,
- destruktiven Repository-, Datenbank- oder Infrastrukturaktionen,
- akzeptierten kritischen Security Findings,
- Rechts-, Datenschutz- oder Complianceaussagen mit Außenwirkung,
- produktiver Aktivierung autonomer Agentenaktionen,
- Merge oder Release, wenn definierte Blocker bewusst übergangen werden sollen,
- Änderung der Rechte des CEO-, HR-, Security- oder Release-Agenten.

Der Mensch erhält eine kurze Decision Card mit Problem, Optionen, Empfehlung, Risiken, Kosten, Reversibilität und notwendiger Entscheidung. Er soll nicht mit unstrukturierten Agentendebatten belastet werden.

## 35. Sicherheit, Datenschutz und Agenten-Isolation

Für alle Agenten gelten Dokument 19 und Dokument 20A.

Pflichtregeln:

- Least Privilege für Tools, Dateien, Secrets und Umgebungen,
- keine tenantübergreifenden Daten ohne explizite, rechtlich zulässige Aggregation,
- keine produktiven Secrets in Prompts oder Repository-Dokumenten,
- Tool Calls serverseitig oder durch erlaubte Commandprofile begrenzen,
- externe Inhalte als untrusted behandeln,
- keine eigenmächtigen Netzwerk-, Cloud-, Zahlungs- oder Veröffentlichungsschritte,
- Audit Record für materiale Agentenaktionen,
- zeitlich begrenzte Berechtigungen für temporäre Spezialisten,
- Kill Switch und Entzug von Rechten,
- synthetische Daten als Standard für Demo und Entwicklung.

Ein Agent darf nur die Artefakte lesen, die er für seinen Auftrag benötigt. Project Memory kann breiten Metazugriff besitzen, aber sensible Inhalte werden minimiert und verlinkt statt dupliziert.

## 36. Quality Gates der Agentenfirma

Ein Work Package gilt erst als abgeschlossen, wenn die für seine Risikoklasse erforderlichen Gates erfüllt sind.

| Gate | Prüffrage | mögliche Owner |
|---|---|---|
| Product Gate | löst das Ergebnis das vereinbarte Nutzerproblem? | Product Lead |
| Domain Gate | ist die ISMS-/Cyberlogik fachlich konsistent? | ISMS/Cyber Lead |
| Architecture Gate | respektiert es Module, Verträge und Qualitätsattribute? | CTO |
| Security & Privacy Gate | sind Bedrohungen, Rechte und Datenkontrollen angemessen? | Security/Privacy |
| Code Quality Gate | ist der Code verständlich, wartbar und getestet? | Code Review |
| QA Gate | bestehen relevante funktionale und nichtfunktionale Tests? | QA |
| UX & Accessibility Gate | ist der Weg verständlich, konsistent und zugänglich? | UX |
| Documentation Gate | sind Entscheidungen, Betrieb und Handover aktualisiert? | Documentation/Memory |
| Release Gate | sind alle Blocker geschlossen oder autorisiert akzeptiert? | GitHub/Release + Mensch gemäß Schwelle |

Nicht jedes kleine Work Item benötigt alle Gates. Die Gate Matrix wird risikobasiert aus Scope, Daten, Außenwirkung und Reversibilität abgeleitet.

## 37. Leistungsmessung und Agenten-Scorecards

Agenten werden nicht nach Menge erzeugten Textes oder Codezeilen bewertet.

### 37.1 Sinnvolle Kennzahlen

- First-Pass-Acceptance,
- Review-Finding-Rate nach Schwere,
- Rework und Reopen Rate,
- Testabdeckung kritischer Anforderungen,
- Defect Escape Rate,
- Durchlauf- und Wartezeit,
- Anteil fortsetzbarer Checkpoints,
- Dokumentationsaktualität,
- Architektur- oder Securityabweichungen,
- Kosten und Token pro akzeptiertem Outcome,
- Nutzerwert oder messbare Zeitersparnis,
- Anzahl vermiedener Doppelarbeiten,
- Eskalationsqualität und rechtzeitiges Stoppen.

### 37.2 Anti-KPIs

Nicht als Ziel verwenden:

- maximale Zahl paralleler Agenten,
- maximale Prompt- oder Outputlänge,
- Anzahl erzeugter Dateien,
- Commits pro Stunde,
- Codezeilen,
- geschlossene Tasks ohne Outcome-Nachweis,
- niedrige Eskalationsrate um jeden Preis,
- Reviewzustimmung ohne Findings.

### 37.3 Rollenverbesserung

Schwache Kennzahlen führen nicht automatisch zur Erzeugung eines neuen Agenten. Zuerst werden Auftrag, Kontext, Skill, Beispiele, Tools, Grenzen und Reviewprozess geprüft.

## 38. Typische Fehlermuster und Gegenmaßnahmen

| Fehlermuster | Risiko | Gegenmaßnahme |
|---|---|---|
| Agent Swarm ohne Owner | widersprüchliche Änderungen und niemand verantwortlich | ein Accountable Owner, klare Grenzen, Integrationsplan |
| CEO implementiert alles selbst | Bottleneck und fehlende Spezialisierung | Delegation, kleine Work Packages, unabhängige Reviewrollen |
| HR erzeugt Rollen inflationär | Overhead und Kontextkosten | Capability Request, Laufzeit, Abschaltkriterium |
| Agenten diskutieren statt Artefakte zu liefern | viel Text, wenig Fortschritt | Output Contract und Definition of Done |
| Builder reviewt sich selbst | blinde Flecken und Scheinsicherheit | unabhängiges Review und Gate |
| Chat ist Projektgedächtnis | Verlust bei Context-Limit | Repository, Handover und Checkpoints |
| parallele Änderung derselben Dateien | Konflikte und Rework | File-/Modulownership und sequenzierte Integration |
| fehlende Stop Conditions | Agent improvisiert bei Unsicherheit | klare Eskalations- und Abbruchregeln |
| Security erst am Ende | teure Korrekturen | Security by Design und Gate Matrix |
| Dokumentation als Nacharbeit | veraltete Wahrheit | Docs als Teil der Definition of Done |
| überbreite Agentenrechte | Daten- und Supply-Chain-Risiko | Least Privilege, zeitliche Rechte, Audit |
| Erfolg wird nach Outputmenge gemessen | unnötige Komplexität | Outcome-, Qualitäts- und Rework-KPIs |

## 39. End-to-End-Szenarien

### 39.1 Neues Decision-Center-Feature

1. Human Product Owner bestätigt Ziel: Berater sollen portfolioübergreifend die drei wirkungsstärksten Handlungen erkennen.
2. Product Lead erstellt Product Contract mit Journey und Nicht-Zielen.
3. ISMS Lead prüft fachliche Priorisierung, Data Agent definiert benötigte Felder.
4. CTO erstellt oder bestätigt API- und Read-Model-Vertrag.
5. UX entwirft Mission Card und Erklärzustände.
6. Frontend und Backend arbeiten parallel gegen versionierten Vertrag.
7. QA entwickelt Tests aus Akzeptanzkriterien; Security prüft Tenant Scope.
8. Code Review und Product Critic liefern Findings.
9. Builder beheben Findings; QA bestätigt.
10. Project Memory aktualisiert Modulstatus, Entscheidungen und Handover.
11. Release Steward integriert nach Gates.
12. Human Product Owner prüft die Demo anhand des Nutzeroutcomes.

### 39.2 Neue Agentenrolle für PPTX-Qualität

1. Wiederkehrende visuelle Fehler in automatisch erzeugten Präsentationen werden erkannt.
2. HR-Agent dokumentiert Capability Gap und prüft bestehende Rollen.
3. Vorschlag: temporärer Presentation Rendering & QA Specialist.
4. Orchestrator begrenzt Scope auf Reporting Engine und vier Wochen.
5. Security prüft Dateizugriff; QA definiert visuelle Regression.
6. Spezialist verbessert Templates und Rendererprüfung.
7. Ergebnis wird gemessen: geringere Layout-Fehlerrate und weniger manuelle Nacharbeit.
8. Rolle wird beendet oder als Skill in Reporting/QA integriert.

### 39.3 Kritisches Security Finding

1. Security Agent erkennt tenantübergreifende Zugriffsmöglichkeit in einem API-Pfad.
2. Work Item wird als kritisch blockiert; Orchestrator pausiert betroffene Integration.
3. Incident Lead, Backend, Security und QA bilden begrenztes Swarm-Team.
4. Ursache und betroffene Versionen werden dokumentiert.
5. Backend implementiert Korrektur; anderer Agent reviewt.
6. QA führt Regression und Tenant-Isolationstests aus.
7. Security bestätigt Abhilfe.
8. Project Memory aktualisiert Threat Model, ADR und Lessons Learned.
9. Human Product Owner erhält nur dann eine Decision Card, wenn Produktivdaten, Veröffentlichung oder bewusste Ausnahme betroffen sind.

### 39.4 Context-Limit mitten im Work Package

1. Project Memory erkennt, dass Session oder Arbeitskontext groß wird.
2. Aktueller Code wird in einem sicheren Zwischenstand gespeichert.
3. Tests, geänderte Dateien, offene Findings und nächste Schritte werden dokumentiert.
4. Handover Packet enthält genauen Einstiegspunkt und benötigte Quellen.
5. Neue Claude-Session liest nur Masterstatus, Modulvertrag und Handover.
6. Zuständige Agentenrolle setzt fort, ohne das gesamte Gespräch rekonstruieren zu müssen.

### 39.5 Fachlicher Konflikt zwischen ISMS und UX

1. ISMS Lead fordert zehn Pflichtfelder; UX sieht Anfängerüberforderung.
2. Konflikt wird als Decision Item statt Chatdebatte erfasst.
3. Product Lead definiert Nutzeroutcome und regulatorische Mindestanforderung.
4. Varianten: alle Felder sofort, progressive Erfassung oder Guided Workshop.
5. Decision Owner wählt progressive Erfassung mit sichtbarer Datenreife.
6. Entscheidung und Auswirkungen auf Datenmodell, UX und Tests werden dokumentiert.

## 40. Verbindliche Demo-Szenen der Agentenfirma

Die spätere Entwicklungsumgebung soll mindestens folgende organisatorische Szenen zeigen oder nachvollziehbar simulieren:

1. Human Product Owner gibt ein Produktziel frei.
2. Orchestrator zerlegt es in Work Packages.
3. HR-Agent zeigt, warum keine neue Rolle nötig ist – oder begründet eine temporäre Spezialrolle.
4. Product, ISMS und UX erzeugen gemeinsam einen Product Contract.
5. CTO erstellt einen Architecture Decision Record.
6. Frontend und Backend arbeiten parallel gegen einen gemeinsamen Contract.
7. QA entwirft Tests vor Abschluss der Implementierung.
8. Code Review und Security Review erzeugen getrennte Findings.
9. Ein Product Critic schlägt eine radikal einfachere Variante vor.
10. Ein Konflikt wird als Decision Item gelöst.
11. Project Memory erstellt ein Handover Packet vor Context-Limit.
12. Neue Session setzt anhand des Repository-Status fort.
13. Kritischer Security-Fund blockiert Integration.
14. Release Gate zeigt erfüllte und offene Voraussetzungen.
15. Nach Abschluss wird eine Retrospektive mit Skill- und Prozessverbesserung erzeugt.

Alle Demo-Informationen sind synthetisch. Die Firma darf nicht vortäuschen, reale PwC-Prozesse, Rollenrechte oder interne Arbeitsweisen abzubilden.

## 41. Globale Akzeptanzkriterien

1. Jede aktive Agentenrolle besitzt einen versionierten Role Contract.
2. Für jedes Work Package existiert genau ein Accountable Owner.
3. Auftrag, Scope, Akzeptanzkriterien und Quellen sind vor Umsetzung sichtbar.
4. Builder und finaler Reviewer sind bei materialer Arbeit getrennt.
5. Produkt-, ISMS-, Security-, QA- und Dokumentationsprüfungen sind risikobasiert zuordenbar.
6. Agentenrechte folgen Least Privilege und sind widerrufbar.
7. Temporäre Agenten besitzen Laufzeit und Abschaltkriterium.
8. Neue Agentenrollen benötigen einen Capability Request.
9. Parallelität ist nur bei versionierten Schnittstellen und getrennten Grenzen erlaubt.
10. Produktentscheidungen werden nicht still durch Engineering getroffen.
11. Materiale Konflikte werden als Decision Record dokumentiert.
12. Human Gates sind für irreversible, externe, kosten- und sicherheitsrelevante Entscheidungen implementierbar.
13. Keine Rolle darf Quality- oder Security-Gates eigenmächtig umgehen.
14. Jede wichtige Änderung besitzt nachvollziehbare Inputs, Outputs und Reviews.
15. Chat ist niemals die einzige Quelle einer Entscheidung oder eines Status.
16. Handover Packets ermöglichen Fortsetzung in neuer Session oder durch eine andere Rolle.
17. Project Memory aktualisiert Masterstatus, Entscheidungen, Risiken und nächsten Einstieg.
18. Agentenkommunikation erfolgt bevorzugt über strukturierte Artefakte.
19. Testplanung wird aus Anforderungen und Risiken abgeleitet.
20. Agentenleistung wird nach akzeptiertem Outcome und Qualität, nicht Outputmenge bewertet.
21. Die Organisation kann Rollen kombinieren, ohne unzulässige Interessenkonflikte zu erzeugen.
22. Security- und Datenschutzregeln aus Dokument 19 gelten für alle Tools und Agenten.
23. KI- und Toolnutzung entspricht Dokument 20A.
24. Der Human Product Owner kann jederzeit pausieren, Rechte entziehen oder Prioritäten ändern.
25. Ein neuer Agent kann das Projekt anhand Repository-Artefakten ohne Rekonstruktion des gesamten Chats verstehen.
26. Die Demo nutzt ausschließlich synthetische Daten und neutrale Rollenbezeichnungen.

## 42. Festgelegte Entscheidungen

- **D20B-001:** Die Entwicklungsorganisation wird als virtuelle KI-Firma mit klaren Rollen und nicht als unstrukturierter Agentenschwarm aufgebaut.
- **D20B-002:** Der Human Product Owner behält Vision, materiale Freigaben und irreversible Entscheidungen.
- **D20B-003:** Ein CEO-/Orchestrator-Agent steuert Plan, Staffing und Abhängigkeiten, implementiert aber nicht standardmäßig selbst.
- **D20B-004:** Die Organisation besitzt vier Säulen: Produkt/Fachlichkeit, Engineering/Architektur, Assurance/Governance sowie Wissen/Kontinuität.
- **D20B-005:** Jede Rolle benötigt einen versionierten Role Contract.
- **D20B-006:** Kein Agent arbeitet ohne Work Item und Definition of Done.
- **D20B-007:** Builder und unabhängiger Reviewer werden bei materialer Arbeit getrennt.
- **D20B-008:** Repository-Artefakte sind die verbindliche Kommunikations- und Gedächtnisschicht.
- **D20B-009:** Der HR-/Capability-Agent darf Rollen vorschlagen, aber nicht unkontrolliert aktivieren.
- **D20B-010:** Neue Rollen sind befristet oder benötigen einen belegten dauerhaften Nutzen.
- **D20B-011:** Parallelität ist nur bei stabilen Verträgen und getrennten Änderungsgrenzen erlaubt.
- **D20B-012:** Product Security und Cybersecurity-Fachlichkeit sind getrennte Verantwortungen.
- **D20B-013:** Project Memory ist eine eigene Kernverantwortung und keine freiwillige Nacharbeit.
- **D20B-014:** Agentenleistung wird nach Outcome, Qualität, Rework, Kosten und Kontinuität gemessen.
- **D20B-015:** Kritische Sicherheits-, Rechts-, Kosten- und Außenwirkungsentscheidungen bleiben menschlich.
- **D20B-016:** Alle Agenten unterliegen den KI-, Sicherheits- und Datenschutzregeln aus Dokument 19 und 20A.

## 43. Begründete Annahmen

- **A20B-001:** Claude Code oder vergleichbare Coding-Agenten können Rollen durch getrennte Prompts, Subagents, Skills und Work Items abbilden.
- **A20B-002:** Nicht jede organisatorische Rolle benötigt einen dauerhaft laufenden separaten Agentenprozess.
- **A20B-003:** Ein artifact-first Ansatz reduziert Context-Verlust und widersprüchliche Entscheidungen.
- **A20B-004:** Spezialisierte Reviewrollen verbessern Qualität gegenüber reiner Selbstprüfung.
- **A20B-005:** Ein HR-Agent ist nützlich, wenn er Kompetenzlücken reduziert statt Agentenzahl zu maximieren.
- **A20B-006:** Die meisten technischen Entscheidungen können innerhalb klarer Architekturgrenzen autonom und reversibel getroffen werden.
- **A20B-007:** Ein Teil der Firmenstruktur wird zunächst als Arbeitsprotokoll und nicht als dauerhaft parallel laufendes Multi-Agent-System implementiert.
- **A20B-008:** Synthetische Work Items und Agentenreports genügen, um die Organisationsidee im Prototyp glaubwürdig zu demonstrieren.
- **A20B-009:** Rollen- und Skillmetriken können aus Repository-, Review-, Test- und Checkpointdaten abgeleitet werden.
- **A20B-010:** Die konkrete technische Umsetzung hängt von den zu diesem Zeitpunkt verfügbaren Claude-Code-Agenten- und Toolfunktionen ab und wird in 20C festgelegt.

## 44. Offene Fragen

- **O20B-001:** Welche Agentenfunktionen unterstützt die gewählte Claude-Code-Version nativ und welche müssen durch Dateien, Commands oder externe Orchestrierung simuliert werden?
- **O20B-002:** Wie viele Rollen können in einer Phase sinnvoll gleichzeitig aktiv sein, ohne Kontext- und Integrationskosten zu erhöhen?
- **O20B-003:** Soll der CEO-/Orchestrator-Agent dauerhaft dieselbe Instanz sein oder je Phase neu aus Repository-Status initialisiert werden?
- **O20B-004:** Welche Role Contracts werden direkt als Claude Skills, Subagent-Definitionen oder Templates umgesetzt?
- **O20B-005:** Welches Berechtigungsmodell ist für lokale Entwicklung, GitHub und spätere Cloudumgebungen praktikabel?
- **O20B-006:** Wie werden Token-, Zeit- und Kostenbudgets pro Agent technisch gemessen?
- **O20B-007:** Welche Quality Gates können automatisiert werden und welche benötigen menschliche Sichtprüfung?
- **O20B-008:** Wie werden Agenten-Scorecards genutzt, ohne Fehlanreize oder unnötigen Prozessdruck zu erzeugen?
- **O20B-009:** Welche Rollen dürfen in frühen Prototypphasen kombiniert werden?
- **O20B-010:** Wie wird verhindert, dass der Project Memory Agent veraltete oder falsche Zusammenfassungen als Wahrheit festschreibt?
- **O20B-011:** Soll der Product Critic nur auf Anfrage oder automatisch an definierten Gates arbeiten?
- **O20B-012:** Welche menschlichen Freigaben sind bei einer rein lokalen, synthetischen Demo noch erforderlich?
- **O20B-013:** Wie werden vertrauliche spätere Unternehmensdaten aus Agentenprompts und Logs herausgehalten?
- **O20B-014:** Welche Lizenz-, IP- und Nutzungsregeln gelten bei einer späteren Übergabe an PwC oder andere Unternehmen?

## 45. Ideen für später

- visuelles Company Control Center mit Rollenstatus, Workstreams, Quality Gates und Context-Budget,
- Agenten-Skill-Marketplace mit geprüften internen Rollenpaketen,
- automatische Kompetenzmatrix aus Review- und Defectmustern,
- simulationsbasierte Staffing-Vorschläge für unterschiedliche Roadmapvarianten,
- privacy-preserving Agent Benchmarks über mehrere Projekte,
- autonome Low-Risk-Maintenance-Zelle für Dependency Updates und Dokumentationspflege,
- Agenten-Pairing auf Basis komplementärer Stärken,
- selbstprüfende Handover- und Checkpoint-Qualität,
- digitale „Board Meetings“ zwischen Agenten mit standardisiertem Decision Pack,
- lernende Prompt- und Skillbibliothek mit kontrollierter Promotion,
- temporäre Red-Team-Agenten für Produkt, Security, Privacy und Missbrauchsszenarien,
- Agenten-HR, der auch Rollen abbaut und überlappende Verantwortungen zusammenführt,
- Organisationssimulation: Kosten, Geschwindigkeit und Risiko verschiedener Teamzuschnitte vergleichen.

## 46. Abhängigkeiten und Übergabe an Dokument 20C

Dokument 20B baut insbesondere auf folgenden Quellen auf:

- Dokument 00: Projektverfassung, Single Source of Truth und globale Entscheidungen,
- Dokument 03: menschliche Produktrollen und Nutzungskontexte,
- Dokument 05: Produktmodule und Flagship Journeys,
- Dokument 11: Work Items, Decisions, Handover und Zusammenarbeit,
- Dokument 18: technische Architektur und Plattformbetrieb,
- Dokument 19: Sicherheit, Datenschutz, Rechte und Auditierbarkeit,
- Dokument 20A: KI-Funktionen, Toolgrenzen, Human Gates und AI Assurance.

Dokument 20C muss aus diesem Organisationsmodell konkret ableiten:

- Repository- und Ordnerstruktur,
- `CLAUDE.md` und projektweite Arbeitsregeln,
- Role- und Skill-Dateien,
- Agenten-/Subagent-Konfiguration,
- Work-Item- und Handover-Templates,
- Branch-, Commit-, Pull-Request- und Mergeverfahren,
- automatische Zwischen-Checkpoints innerhalb langer Sessions,
- Context-Budget und Wiederaufnahme in neuen Chats,
- Test-, Review- und Release-Gates,
- Roadmap, Bauphasen und erster ausführbarer Claude-Code-Prompt.

## 47. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 22.07.2026 | Erstfassung der virtuellen KI-Firma mit Organisationsverfassung, 21 Rollenverantwortungen, Role Contracts, HR-/Capability-Modell, Autoritätsstufen, Quality Gates, Handover, Scorecards und Übergabeanforderungen für Dokument 20C | Erstellt |
