# Dokument 00 - Master-Index & Projektverfassung

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.2  
**Status:** Aktiv - Konzeptbaseline vollständig und Weiterentwicklungsbetrieb ergänzt  
**Stand:** 22.07.2026  
**Zweck:** Navigationssystem, Projektverfassung und Statusquelle der vollständigen Konzeptbibliothek.

> **Zentrale Wahrheit:** Die versionierte Markdown-Dokumentation im GitHub-Repository ist verbindlich. Einstiegspunkt ist `docs/00_master-index/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG.md`. PDFs und DOCX-Dateien sind geprüfte Lesefassungen. Chats, lokale Notizen oder ältere Dateiversionen sind keine aktuelle Projektwahrheit.

## 1. Zweck und Geltungsbereich

Dokument 00 verbindet alle Einzelkonzepte zu einem konsistenten Gesamtsystem. Es hält Struktur, Lesereihenfolge, Status, globale Entscheidungen, Annahmen, offene Fragen, Abhängigkeiten, Versionierungsregeln und den nächsten verbindlichen Projektschritt fest.

Die aktive Konzeptbibliothek umfasst **24 Dokumente**. Mit Version 1.2 liegen alle geplanten Kernkonzepte sowie das ergänzende Research-, Innovations- und Weiterentwicklungsmodell geprüft vor. Dokument 12 wurde auf Version 1.1 erweitert. Die Konzeptbaseline ist damit vollständig; das Projekt wechselt verbindlich in die Repository-, Übergabe- und Umsetzungsphase.

### 1.1 Verbindliche Dokumentenlogik

- Globale Entscheidungen, Bibliotheksstatus und Vorrangregeln werden in Dokument 00 gepflegt.
- Fachspezifische Entscheidungen stehen im jeweils zuständigen nummerierten Konzeptdokument.
- Technische Detailentscheidungen aus der Umsetzung werden als Architecture Decision Records, Decision Records oder freigegebene Repository-Dokumentation festgehalten.
- Widersprüche werden nicht stillschweigend aufgelöst. Sie werden dokumentiert, bewertet und in allen betroffenen Quellen korrigiert.
- Produktentscheidungen dürfen nicht ausschließlich in einem Chat verbleiben.
- Jede freigegebene Nachfolgeversion ersetzt die vorherige aktive Version. Frühere Versionen werden archiviert und nicht gelöscht.

### 1.2 Kennzeichnung von Aussagen

- **ENTSCHEIDUNG:** Verbindlich festgelegt. Claude Code und alle Agenten müssen sich daran halten.
- **ANNAHME:** Plausible Arbeitsgrundlage, die noch validiert oder später angepasst werden darf.
- **OFFENE FRAGE:** Noch nicht entschieden. Muss vor einer davon abhängigen irreversiblen Umsetzung oder Freigabe geklärt werden.
- **IDEE FÜR SPÄTER:** Bewusst nicht Teil der aktuellen Bauphase, bleibt aber im Ideenparkplatz erhalten.

## 2. Zentrale Produktdefinition

**ENTSCHEIDUNG:** Die Plattform ist ein mandantenfähiges, rollenbasiertes Betriebs-, Entscheidungs- und Service-System für den kontinuierlichen Betrieb von Informationssicherheitsmanagement und skalierbaren Managed Services. Sie ist kein klassisches ISMS-Dokumentationswerkzeug und kein Ersatz für operative Quellsysteme.

### 2.1 Kernversprechen

Die Plattform verbindet Unternehmensmodell, ISMS-Fachlogik, aktuelle Bedrohungen, Risiken, Ziele, Controls, Maßnahmen, Nachweise, Zusammenarbeit, Reporting, Automatisierung, Beratung und Managed Services in einem nachvollziehbaren System. Sie beantwortet fortlaufend:

- Wo stehen wir?
- Wo wollen wir hin?
- Warum ist der Zustand so?
- Was ist heute der wirksamste nächste Schritt?
- Welche Wirkung haben Budget, Maßnahmen oder Managed Services?
- Was hat sich verändert und welche Entscheidung wird benötigt?
- Wie sicher und belastbar ist die zugrunde liegende Daten- und Evidenzlage?

### 2.2 Produktprinzipien

- **Entscheidungen statt Datenfriedhof:** Jede Hauptseite beantwortet eine konkrete Nutzerfrage und erklärt Ursache, Wirkung, Unsicherheit und nächsten Schritt.
- **Digitaler Unternehmenszwilling als Kern:** Organisation, Prozesse, Assets, Risiken, Controls, Maßnahmen, Nachweise, Audits, Services und Verantwortliche sind als lebendes Informationsnetz verknüpft.
- **Individuelle Zielnavigation:** Kunden definieren Zielprofil, regulatorische Anforderungen, Reifegrad, Risikobereitschaft, Budget, Zeitrahmen und Managed-Service-Anteil.
- **Rollenbezogene Erlebniswelten:** Executives, Kunden-/ISMS-Teams, Berater, Auditoren und Administratoren arbeiten auf demselben Datenmodell, aber mit unterschiedlichen Entscheidungsansichten.
- **Managed Services als Produktkern:** Wiederkehrende Leistungen werden konfigurierbar, buchbar, steuerbar, messbar und über viele Mandanten skalierbar.
- **Messbarer Nutzen:** Die Plattform weist Zielerreichung, Risikoreduktion, Control-Wirksamkeit, Zeitersparnis, Servicewirkung, Kapazität und - soweit belastbar - wirtschaftlichen Nutzen aus.
- **KI-gestützt, nicht KI-abhängig:** Deterministische Kernprozesse und Fallbacks bleiben ohne generative KI funktionsfähig. Kritische KI-Ergebnisse benötigen nachvollziehbare Quellen und menschliche Freigabe.
- **Repository-first Umsetzung:** Konzept, Entscheidungen, Status, Tests und Übergaben werden im Repository gesichert, damit das Projekt unabhängig von einzelnen Chats fortsetzbar bleibt.
- **Vollständiges Zielprodukt mit synthetischer Demo:** Der Prototyp bildet mehrere Unternehmen, Rollen und End-to-End-Abläufe mit realistischen, vollständig erfundenen Daten ab.

### 2.3 Klare Nicht-Ziele

- Kein Ersatz für SIEM, Schwachstellenscanner, Ticketing, CMDB, ERP, HR- oder Finanzsysteme.
- Kein reiner Audit-Readiness-Tracker; Audit Readiness ist nur eine mögliche Zielgröße.
- Kein proprietäres Produkt einer bestimmten Beratung und keine Nutzung nichtöffentlicher PwC-Daten, interner Preise oder geschützter Vorlagen.
- Kein autonomes System, das kritische Sicherheits-, Rechts-, Budget- oder Freigabeentscheidungen ohne Menschen trifft.
- Kein Feature-Sammelsurium ohne gemeinsames Datenmodell, Nutzerlogik und messbaren Nutzen.

## 3. Übersicht der Konzeptdokumente

| Nr. | Dokument | Hauptzweck | Aktiver Stand |
|---|---|---|---|
| 00 | Master-Index & Projektverfassung | Navigation, globale Regeln, Status, Entscheidungen, Abhängigkeiten | **Aktiv v1.2** |
| 01 | Produktvision, Problem und Business Case | Vision, Nutzen, Positionierung, Skalierung, Nicht-Ziele | Erstellt v1.0 |
| 02 | Markt, Wettbewerber und Differenzierung | Marktfakten, Wettbewerber, Lücken, Differenzierung | Erstellt v1.0 |
| 03 | Zielgruppen, Rollen und Arbeitssituationen | Rollen, Jobs-to-be-done, reale Nutzungskontexte | Erstellt v1.0 |
| 04 | Nutzerreisen und Service-Lebenszyklus | End-to-End-Journeys vom Onboarding bis Exit | Erstellt v1.0 |
| 05 | Produktlandkarte und Funktionsumfang | Module, Funktionen, Zustände, Prioritäten | Erstellt v1.0 |
| 06 | UX/UI und rollenbezogene Erlebniswelten | Navigation, Designprinzipien, Seitenmuster, Zustände | Erstellt v1.0 |
| 07 | Digitaler Unternehmenszwilling | Informationsgraph, Objekte, Beziehungen, Historie | Erstellt v1.0 |
| 08 | ISMS-Kernprozesse | Risiken, Controls, Maßnahmen, Policies, Audits, Reviews | Erstellt v1.0 |
| 09 | Reifegrad, Bedrohungen und Control Intelligence | Zielprofile, dynamische Risiken, Wirksamkeit, Benchmarks | Erstellt v1.0 |
| 10 | Decision Center, KPIs und Simulationen | Morning Mission, Routen, Investitions- und Wirkungssimulation | Erstellt v1.0 |
| 11 | Zusammenarbeit, Aufgaben und Kommunikation | Workspaces, Freigaben, Eskalationen, Übergaben | Erstellt v1.0 |
| 12 | Reporting-, PDF- und Präsentations-Engine | Reports, PPTX/PDF, Presentation Repository, Case-Manifeste und Update-Logik | **Aktiv v1.1** |
| 13 | Managed-Service-Betriebsmodell | Servicebetrieb, Shared Responsibility, Governance, Skalierung | Erstellt v1.0 |
| 14 | Servicekatalog, SLAs und Preislogik | Pakete, Service-Level, Preis- und Business-Case-Logik | Erstellt v1.0 |
| 15 | Berater-Operations und Ressourcenplanung | Portfolio, Kapazität, Termine, Reisen, Profitabilität | Erstellt v1.0 |
| 16 | Kunden-Onboarding, Zielprofil und Lifecycle | Strategie-DNA, Baseline, Zielroute, Lifecycle | Erstellt v1.0 |
| 17 | Integrationen, Automatisierung und Workflow-Designer | APIs, Konnektoren, Regeln, Workflow-Bibliothek | Erstellt v1.0 |
| 18 | Technische Architektur und Plattformbetrieb | Multi-Tenancy, Architektur, Datenhaltung, Betrieb | Erstellt v1.0 |
| 19 | Sicherheit, Datenschutz und Auditierbarkeit | Rechte, Datentrennung, Logs, Privacy, Threat Model | Erstellt v1.0 |
| 20A | KI-Funktionen und Guardrails | KI-Use-Cases, AI Control Plane, Grenzen, Fallbacks | Erstellt v1.0 |
| 20B | Virtuelle KI-Firma und Agentenorganisation | Agentenrollen, Skills, Autorität, Reviews, Governance | Erstellt v1.0 |
| 20C | Claude Code, GitHub, Checkpoints und Bauplan | Repository, Context Packs, Sessions, Tests, Roadmap | Erstellt v1.0 |
| 21 | Research, Innovation und kontinuierliche Produktentwicklung | Research-Agenten, Wettbewerbsbeobachtung, Ideenpipeline, Konzeptpflege und Presentation Curator | Erstellt v1.0 |

### 3.1 Bibliotheksstatus

- **24 von 24 Dokumenten erstellt.**
- **Alle aktiven Markdown-Quellen, DOCX-Lesefassungen und PDFs liegen vor.**
- **Dokument 00 v1.2 ist die aktive Bibliotheksnavigation.**
- **Dokument 12 v1.1 ist die aktive Reporting- und Präsentationsspezifikation; v1.0 ist zu archivieren.**
- **Dokument 21 v1.0 ergänzt den dauerhaften Research-, Innovations- und Konzeptpflegebetrieb.**
- **Nächste Phase:** Repository-Paketierung, Claude-Code-Übergabepaket, Capability Check, Phase-0-Setup und erster vertikaler Produktpfad.

### 3.2 Statusdefinitionen

- **AKTIV:** Aktuelle verbindliche Version.
- **ERSTELLT:** Geprüfte Version liegt vor und ist Bestandteil der aktiven Bibliothek.
- **IN ÜBERARBEITUNG:** Nachfolgeversion wird erstellt; die bisherige aktive Version bleibt bis zur Freigabe gültig.
- **ARCHIVIERT:** Frühere Version, nur für Historie und Vergleich; nicht als aktuelle Projektquelle verwenden.
- **ERSETZT:** Durch eine freigegebene Nachfolgeversion abgelöst.

## 4. Empfohlene Lesereihenfolge

### 4.1 Vollständiges Produktverständnis

1. `00 -> 01 -> 02` - Projektverfassung, Vision, Business Case, Markt und Differenzierung.
2. `03 -> 04 -> 05 -> 06` - Nutzer, Journeys, Produktlandkarte und Erlebniswelten.
3. `07 -> 08 -> 09 -> 10 -> 11 -> 12` - Datenmodell, ISMS-Fachlogik, Intelligence, Entscheidungen, Zusammenarbeit und Reporting.
4. `13 -> 14 -> 15 -> 16` - Managed-Service-Betrieb, Servicekatalog, Berater-Operations und Kunden-Lifecycle.
5. `17 -> 18 -> 19 -> 20A` - Integrationen, Architektur, Sicherheit und KI-Guardrails.
6. `20B -> 20C` - virtuelle KI-Firma, Claude Code, GitHub, Checkpoints und Bauplan.
7. `21` - kontinuierlicher Research-, Innovations-, Konzept- und Präsentationspflegebetrieb.

### 4.2 Context-Packs für Claude Code

Claude Code soll **nicht automatisch alle Dokumente vollständig in einen Chat laden**. Pro Work Package wird ein kleines Context Pack aus Dokument 00, dem fachlich zuständigen Dokument, den notwendigen Abhängigkeiten, relevanten ADRs, aktuellem Status und offenen Tasks zusammengestellt.

Beispiele:

- Decision Center: `00 + 05 + 06 + 07 + 09 + 10 + 18 + 19 + 20C`
- ISMS-Risikopfad: `00 + 07 + 08 + 09 + 11 + 18 + 19 + 20C`
- Managed-Service-Konfiguration: `00 + 13 + 14 + 15 + 16 + 18 + 19 + 20C`
- Reporting und Präsentations-Cases: `00 + 06 + 07 + 10 + 12 + 18 + 19 + 20C + 21`
- Agenten- und Repository-Setup: `00 + 18 + 19 + 20A + 20B + 20C`
- Research und Produktweiterentwicklung: `00 + 01 + 02 + 05 + 12 + 20B + 20C + 21`

## 5. Dokumentenabhängigkeiten und Vorrang

- 01 setzt Vision, Nutzen und Business Case.
- 02 validiert Positionierung und Differenzierung gegen Markt und Wettbewerber.
- 03 und 04 liefern Rollen- und Journey-Anforderungen für 05 und 06.
- 05 ist die zentrale Funktionslandkarte für alle Fachdokumente.
- 07 ist die Datenmodellbasis für 08 bis 12 und 17.
- 08 und 09 definieren Fach- und Berechnungslogik für 10.
- 11 definiert die gemeinsame Arbeits- und Freigabelogik.
- 12 nutzt Daten und Entscheidungen aus 07 bis 11 und definiert zusätzlich das versionierte Presentation Repository.
- 13 bis 16 definieren den Managed-Service-Betrieb und seine kommerzielle Nutzung.
- 17 speist Architektur, Datenflüsse, Automatisierung und externe Systemgrenzen.
- 18 und 19 setzen technische, betriebliche, Datenschutz- und Sicherheitsgrenzen.
- 20A begrenzt KI-Funktionen; 20B organisiert Agenten; 20C übersetzt alles in einen fortsetzbaren Bauprozess.
- 21 betreibt Research, Wettbewerbsbeobachtung, Innovation, Konzeptänderungen und die kontrollierte Aktualisierung von Präsentations-Cases. Es darf Fachdokumente nicht stillschweigend überschreiben, sondern erzeugt prüfbare Change Proposals.

**Vorrangregel bei Konflikten:**

1. aktuelle, ausdrücklich freigegebene Entscheidung im zuständigen Fachdokument;
2. Dokument 00 für projektweite Regeln;
3. freigegebener ADR oder Decision Record für konkrete Umsetzung;
4. ältere Dokumentversionen nur als Historie;
5. Chatverläufe, Auto-Memory und lokale Notizen sind nicht autoritativ.

## 6. Zentrale Begriffe

- **Managed ISMS:** Kontinuierlich betriebene und ganz oder teilweise durch einen Dienstleister erbrachte ISMS-Leistungen.
- **Managed Service:** Wiederkehrende Leistung mit Scope, Verantwortung, Rhythmus, Ergebnis, Leistungsversprechen und messbarem Nutzen.
- **Decision Center:** Rollenbezogene Steuerungsansicht, die Veränderungen, Prioritäten, Ursachen, Entscheidungen, Wirkung und nächste Schritte verdichtet.
- **Morning Mission:** Täglich aktualisierte, realistisch machbare Arbeitsmission, priorisiert nach Wirkung, Kapazität, Fristen und Rahmenbedingungen.
- **Digitaler Unternehmenszwilling:** Lebendes Modell des Kundenunternehmens mit Organisation, Prozessen, Assets, Risiken, Controls, Maßnahmen, Evidenzen, Services und Historie.
- **Informationsgraph:** Fachliche und technische Struktur, die Objekte, Beziehungen, Herkunft, Zeitbezug und Wirkungsketten nachvollziehbar verbindet.
- **Strategie-DNA:** Kundenspezifisches Zielprofil aus Sicherheitszielen, Regulatorik, Risikobereitschaft, Budget, Zeit, Automatisierung und Managed-Service-Anteil.
- **Zielroute:** Priorisierter, bei Veränderungen neu berechenbarer Pfad vom Ist-Zustand zum kundenspezifischen Zielzustand.
- **Control Intelligence:** Evidenzbasierte Bewertung von Design, Implementierung, Betrieb und Wirksamkeit eines Controls.
- **Decision Card / Decision Record:** Aufbereitete Entscheidungsvorlage und dauerhaft dokumentierter Entscheidungsnachweis.
- **Service Charter:** Kundenspezifische, versionierte Betriebsvereinbarung für eine Service Instance.
- **Value Ledger:** Nachweis erwarteter und realisierter Wirkung, etwa Risikoreduktion, Zielerreichung, Zeitersparnis und Servicewert.
- **AI Control Plane:** Zentrale Steuerung für Modelle, Prompts, RAG, Policies, Kosten, Evaluierung, Audit und Fallbacks.
- **Agentenfirma:** Struktur spezialisierter KI-Agenten mit Rollenverträgen, Skills, Inputs, Outputs, Autorität, Übergaben und unabhängigen Reviews.
- **Context Pack:** Kuratierte, work-package-spezifische Auswahl der notwendigen Projektquellen.
- **Checkpoint:** Gesicherter Zwischenstand aus Code, Dokumentation, Tests, Entscheidungen, offenen Aufgaben und exaktem Wiedereinstiegspunkt.
- **Single Source of Truth:** Versioniertes Repository-Dokumentensystem; nicht ein einzelner Chat, eine PDF oder Auto-Memory.
- **Presentation Case:** Versionierter, zielgruppenbezogener Präsentationsanwendungsfall mit Storyline, Datenvertrag, Template, Freigaben und Aktualisierungsregeln.
- **Presentation Manifest:** Maschinenlesbare Spezifikation einer Präsentation, einschließlich Zielgruppe, Daten-Snapshot, Sections, Template-Version, geschützter Inhalte und Veröffentlichungsstatus.
- **Research Signal:** Quellenbelegtes Markt-, Regulierungs-, Technologie-, Nutzer- oder Bedrohungssignal mit Datum, Relevanz, Confidence und möglicher Produktauswirkung.
- **Concept Change Proposal:** Prüffähiger Änderungsvorschlag, der betroffene Dokumente, Begründung, Abhängigkeiten, Risiken, Validierung und Freigaben benennt.
- **Innovation Backlog:** Priorisierte Sammlung noch nicht freigegebener Chancen, Ideen, Experimente und Konzeptänderungen.
- **Synthetische Demodaten:** Realistische, vollständig erfundene Unternehmens-, Nutzer-, Risiko-, Service- und Integrationsdaten.

## 7. Globale Entscheidungen

- **D-001 - Eigenständiges Produkt:** Neutraler Produktentwurf; spätere Übernahme, Lizenzierung oder Anpassung durch Beratungen ist möglich, aber nicht vorausgesetzt.
- **D-002 - Managed-Service-Ziel:** Primäres wirtschaftliches Ziel ist skalierbarer, wiederkehrender Umsatz durch Managed Services.
- **D-003 - Vollständige Produktvision:** Die Bibliothek beschreibt ein ausgereiftes Zielprodukt; die Umsetzung erfolgt phasenweise ohne Verlust der Gesamtvision.
- **D-004 - Einheitliches Datenmodell:** Alle Erlebniswelten arbeiten auf demselben mandantengetrennten Informationsmodell.
- **D-005 - Digitaler Zwilling:** Der digitale Unternehmenszwilling ist fachlicher Kern und verbindende Grundlage.
- **D-006 - Individuelle Ziele:** Kunden konfigurieren Zielprofil und Serviceanteil; Audit Readiness ist optional.
- **D-007 - Decision-first UX:** Ursache, Wirkung, Unsicherheit, Entscheidung und nächster Schritt haben Vorrang vor Datenlisten.
- **D-008 - Messbarer Mehrwert:** Nutzen wird über fachliche, operative und wirtschaftliche Kennzahlen sichtbar gemacht.
- **D-009 - Reporting Engine:** PDF-, PPTX- und sichere Webausgaben für unterschiedliche Zielgruppen gehören zum Kernprodukt.
- **D-010 - Integration statt Ersatz:** Quellsysteme werden angebunden; die Plattform übersetzt ihre Daten in ISMS-Kontext und Entscheidungen.
- **D-011 - Modulare Referenzarchitektur:** Start als modularer Monolith mit getrennten Workern und klaren Evolutionsgrenzen.
- **D-012 - Security und Privacy by Design:** Mandantentrennung, Least Privilege, Auditierbarkeit, Datenminimierung und Human Gates sind verbindlich.
- **D-013 - KI-Prinzip:** KI ist providerneutral, kontrolliert, evaluierbar und besitzt deterministische Fallbacks.
- **D-014 - Demoumgebung:** Mehrere Unternehmen, Rollen, Integrationen und Journeys werden mit synthetischen Daten demonstriert.
- **D-015 - Keine vertraulichen Firmendaten:** Keine nichtöffentlichen PwC- oder Kundendaten, internen Preise oder geschützten Vorlagen.
- **D-016 - Repository als Gedächtnis:** Markdown, ADRs, Status, Tests und Checkpoints im Repository sind die fortsetzbare Projektquelle.
- **D-017 - Häufige Zwischen-Checkpoints:** Claude Code sichert auch innerhalb langer Arbeitsschritte und nicht erst am Sessionende.
- **D-018 - Kontrollierte Agentenfirma:** Spezialisierte Agenten arbeiten mit klaren Rollen, begrenztem Kontext, Builder-Reviewer-Pairs und menschlichen Stop Gates.
- **D-019 - Dokumentformate:** Markdown ist die verbindliche Arbeitsquelle; DOCX und PDF sind synchronisierte Lesefassungen.
- **D-020 - Versionserhalt:** Frühere freigegebene Dokumentversionen werden archiviert und nicht gelöscht.
- **D-021 - Kontinuierlicher Research-Betrieb:** Markt, Wettbewerber, Regulierung, Technologie, Nutzerfeedback und Bedrohungslage werden strukturiert beobachtet; Änderungen gelangen nur über nachvollziehbare Research- und Freigabeartefakte in das Produkt.
- **D-022 - Presentation-as-Code:** Wiederkehrende PowerPoint- und PDF-Cases werden als versionierte Manifeste, Templates, Snapshots und Build-Artefakte im Repository gepflegt und kontrolliert aktualisiert.
- **D-023 - Kreativität mit Zielgruppen-Governance:** Humorvolle oder meme-ähnliche Visuals sind nur optionale, rechtegeprüfte und zielgruppenabhängige Elemente. Formale Executive-, Audit- und regulatorische Ausgaben bleiben standardmäßig ohne Humor.

## 8. Globale Annahmen

- **A-001:** Die Zielplattform wird als browserbasierte, cloudfähige Enterprise-Anwendung umgesetzt.
- **A-002:** PostgreSQL ist die führende transaktionale Datenquelle; Graphbeziehungen werden zunächst im gleichen Plattformkern modelliert.
- **A-003:** ISO/IEC 27001, BSI IT-Grundschutz, NIS2 und DORA sind relevante Startbezüge; weitere Frameworks bleiben ergänzbar.
- **A-004:** Öffentliche oder lizenzierbare Threat-Intelligence-Quellen können über Connectoren eingebunden werden.
- **A-005:** PDF- und editierbare PPTX-Erzeugung ist mit marktüblichen Bibliotheken technisch realisierbar.
- **A-006:** Öffentliche Marktpreise dienen nur als illustrative Anker und ersetzen keine interne Kalkulation.
- **A-007:** Berater-Workflows, Reiseplanung, Scoring-Modelle und Servicekalkulation müssen mit realen Praktikern validiert werden.
- **A-008:** Der erste Build darf komplexe Berechnungen transparent mit synthetischen Daten und gekennzeichneten Simulationsregeln darstellen.
- **A-009:** Providerneutrale KI-Integration über ein Model Gateway ist technisch und wirtschaftlich sinnvoll.
- **A-010:** Corporate Design, White Label und kundenspezifische Templates werden konfigurierbar, ohne die neutrale Produktidentität aufzugeben.
- **A-011:** Ausreichend belastbare öffentliche Primärquellen und lizenzierbare Datenquellen stehen für einen fortlaufenden Research- und Wettbewerbsbeobachtungsprozess zur Verfügung.
- **A-012:** Presentation Manifests und gesperrte manuelle Inhaltsblöcke ermöglichen reproduzierbare Aktualisierungen, ohne redaktionelle Beiträge unbeabsichtigt zu überschreiben.

## 9. Globale offene Fragen

- **O-001:** Endgültiger Produktname, Marke und rechtliche Produktidentität.
- **O-002:** Erster kommerzieller Primärmarkt: Beratungsplattform, direkter Unternehmenskauf oder hybrides Modell.
- **O-003:** Verbindlicher Scope des ersten lauffähigen Releases und Tiefe echter gegenüber simulierten Funktionen.
- **O-004:** Endgültiger Cloud-Provider, Hostingregion, Datenresidenz und Betriebsverantwortung.
- **O-005:** Erste produktive Framework-, Branchen- und Sprachpakete.
- **O-006:** Threat-Intelligence-, Schwachstellen- und Benchmark-Datenquellen einschließlich Lizenzmodell.
- **O-007:** Fachliche Validierung der Risiko-, Reifegrad-, Control-, ROI- und Prognosemodelle.
- **O-008:** Finales Price Book, Zielmargen, Rabatte, Mindestlaufzeiten und kommerzielle Freigaben.
- **O-009:** Priorisierte produktive Connectoren und notwendige Herstellervereinbarungen.
- **O-010:** Rechtlicher und datenschutzkonformer Rahmen für anonymisiertes Cross-Client-Benchmarking.
- **O-011:** Auswahl des ersten Pilotkunden beziehungsweise des verbindlichen Demo-Portfolios.
- **O-012:** IP-, Eigentums-, Lizenz- und Übergaberegeln bei einer späteren Einbringung in PwC oder eine andere Organisation.
- **O-013:** Verbindliche KI-Provider, Datenverarbeitungsbedingungen, Budgetgrenzen und Freigabeprozesse.
- **O-014:** Konkrete Claude-Code-Capabilities, Agent-Team-Funktionen und Repository-Integrationen zum Startzeitpunkt.
- **O-015:** Rechts-, Datenschutz-, Security- und Qualitätsfreigaben vor Pilot- oder Produktivbetrieb.
- **O-016:** Verbindliche Research-Kadenz, Quellenbudgets, Abonnements und Owner für Competitive Intelligence und Regulatory Watch.
- **O-017:** Freigaberegeln und Corporate-Design-Vorgaben für die produktive Präsentationsbibliothek, insbesondere bei automatisch aktualisierten Aussagen und humorvollen Visuals.
- **O-018:** Kriterien, ab wann ein Research-Signal nur das Backlog verändert, eine bestehende Spezifikation aktualisiert oder ein neues Konzeptdokument auslöst.

## 10. Ideenparkplatz

- Branchenspezifische Lösungspakete für Gesundheitswesen, Finanzbranche, Produktion und öffentliche Verwaltung.
- Anonymisiertes Cross-Client-Benchmarking mit Wirkungsmustern und bewährten Maßnahmen.
- Partner- und Erweiterungsmarktplatz für Connectoren, Workflows, Controls, Reports und Servicepakete.
- Mobile Companion App für Freigaben, Vor-Ort-Audits, Evidenzaufnahme und kritische Benachrichtigungen.
- Lernzentrum für neue ISMS-Verantwortliche mit kontextbezogenen Erklärungen und geführten Lernpfaden.
- Erweiterte Reise-, Termin- und Portfoliooptimierung.
- Kontrollierte autonome Agenten-Workflows für risikoarme Routineaufgaben.
- Reifegradmodell für die Nutzung und den Betrieb der Plattform selbst.
- Zertifizierte öffentliche und private Connector-Bibliothek.
- Interaktive Boardroom-, Krisen- und Budgetsimulationen.
- Privacy-preserving Benchmarking mit föderierten oder aggregierten Lernverfahren.
- Marketplace für geprüfte Branchen- und Regulatorikpakete.
- Automatisch gepflegte Competitive Battlecards und Produkt-Differenzierungslandkarten.
- Experiment-Lab für synthetische Markt-, Bedrohungs- und Nutzer-Szenarien.
- Rechtegeprüfte Bibliothek eigener visueller Analogien und subtiler Workshop-Humor-Elemente.

## 11. Dokumenten-Governance und Aktualisierung

### 11.1 Aktive und archivierte Versionen

- Pro Dokument gibt es genau **eine aktive Version**.
- Eine neue Version wird zunächst als Entwurf erstellt und geprüft.
- Nach Freigabe ersetzt sie die bisher aktive Version.
- Die vorherige Version wird nach `docs/<dokument>/archive/` verschoben.
- Archivierte Versionen werden nicht gelöscht, nicht still überschrieben und nicht als aktuelle Quelle geladen.
- Links im Master-Index zeigen immer auf die aktive Markdown-Datei ohne Versionsnummer; versionierte Dateien bleiben im Archiv erhalten.

Empfohlene Struktur:

```text
docs/
  00_master-index/
    00_MASTER_INDEX_UND_PROJEKTVERFASSUNG.md
    archive/
      00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.0.md
      00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.1.md
  01_product-vision/
    01_PRODUKTVISION_PROBLEM_BUSINESS_CASE.md
    archive/
```

### 11.2 Aktualisierungsregeln

- Jede globale Änderung aktualisiert Dokument 00 und alle betroffenen Fachdokumente.
- Research- oder Innovationssignale ändern keine aktive Spezifikation direkt; sie erzeugen zunächst einen Research Brief, Idea Card oder Concept Change Proposal.
- Jede Version enthält ein Änderungsprotokoll mit hinzugefügt, geändert, entfernt und offen.
- Offene Fragen erhalten Owner, Zieltermin oder auslösende Bedingung.
- PDFs und DOCX-Dateien werden erst nach Render- und Inhaltsprüfung veröffentlicht.
- Markdown, DOCX und PDF tragen dieselbe Dokumentnummer und Version.
- Vor einem Work Package liest Claude Code Dokument 00, den aktuellen Status, relevante ADRs und ein kuratiertes Context Pack.
- Nach jedem sinnvollen Arbeitsschritt werden Code, Tests, Dokumentation, Status, Risiken und nächster Einstieg als Checkpoint gesichert.

### 11.3 Definition of Done für die Konzeptbibliothek

- Alle 24 Dokumente liegen in Markdown, DOCX und PDF vor.
- Dokument 00 zeigt den korrekten Status und die aktive Version aller Dokumente.
- Dokument 12 v1.1 und Dokument 21 v1.0 sind in Abhängigkeiten, Lesereihenfolge und Context Packs aufgenommen.
- Querverweise, Vorrang, offene Fragen und Abhängigkeiten sind nachvollziehbar.
- Die Bibliothek enthält keine vertraulichen PwC- oder Kundendaten.
- Die Umsetzung kann mit einem kleinen Context Pack begonnen und über neue Sessions fortgesetzt werden.

## 12. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung der Projektverfassung und geplanten Dokumentenarchitektur. |
| 1.1 | 22.07.2026 | Archiviert | Alle damals geplanten 23 Konzeptdokumente als erstellt markiert; Produktdefinition, Context-Packs sowie Versionierungs- und Archivierungsregeln aktualisiert. |
| 1.2 | 22.07.2026 | **Aktiv** | Dokument 21 aufgenommen; Dokument 12 v1.1 als aktive Fassung gesetzt; Bibliotheksumfang auf 24 Dokumente erweitert; Research-, Innovations-, Presentation-as-Code- und Change-Proposal-Regeln ergänzt; nächster Schritt auf das Claude-Code-Übergabepaket gesetzt. |

## 13. Nächster verbindlicher Schritt

1. Dokument 00 v1.2, Dokument 12 v1.1 und Dokument 21 v1.0 als aktive Quellen in das Repository übernehmen; abgelöste Versionen archivieren.
2. Alle aktiven Markdown-Dateien in die Zielstruktur aus Dokument 20C überführen und maschinenlesbare Status-, Decision- und Context-Pack-Dateien anlegen.
3. Das vollständige Claude-Code-Übergabepaket erstellen: Startprompt, `CLAUDE.md`, Agentenverträge, Capability Check, initiales Backlog, Phase-0-Setup und erstes vertikales Work Package.
4. Repository, synthetische Demo-Daten, Demo-Accounts und Presentation Repository initialisieren.
5. Den Context-Loss-, Session-Resume- und Presentation-Rebuild-Drill als frühe Abnahmebedingungen ausführen.
