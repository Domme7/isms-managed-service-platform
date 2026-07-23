# Dokument 06 - UX/UI, Navigation & rollenbezogene Erlebniswelten

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00 bis 05  
**Zweck:** Verbindliche Definition der Nutzerführung, Informationsarchitektur, Navigationslogik, rollenbezogenen Erlebniswelten, UI-Zustände und Designprinzipien.

> **Leitsatz:** Die Plattform soll nicht erklären, wo eine Funktion liegt, sondern den Nutzer sicher zur nächsten verantwortbaren Entscheidung führen.

## 1. Dokumentauftrag und Abgrenzung

Dokument 06 übersetzt Rollen, Nutzerreisen und Produktmodule in ein konsistentes Nutzungserlebnis. Es beschreibt die Oberfläche fachlich und verhaltensbezogen, nicht pixelgenau. Das kanonische Objekt- und Datenmodell folgt in Dokument 07; technische Rechte und Sicherheit in Dokument 19.

**ENTSCHEIDUNG:** Die UI ist eine entscheidungsorientierte Schicht auf einem gemeinsamen Datenmodell. Rollen erhalten unterschiedliche Verdichtung, Sprache und Startpunkte, aber keine voneinander getrennten Wahrheiten.

## 2. Executive Summary

Die Plattform besitzt eine stabile globale Shell, acht Hauptorte und vier Erlebniswelten. Jede Hauptseite beantwortet eine primäre Nutzerfrage und folgt demselben Denkfluss: Was ist das? Warum ist es wichtig? Womit hängt es zusammen? Wie entwickelt es sich? Was soll als Nächstes passieren?

Die Oberfläche bleibt auf der ersten Ebene ruhig und führt Anfänger in Klartext. Tiefe, Graphen, Rohdaten, Mappings und Bulk-Aktionen werden progressiv geöffnet. Empfehlungen, Scores und Simulationen sind erklärbar, übersteuerbar und mit Datenherkunft sowie Vertrauensgrad versehen.

## 3. UX-Vision und Designprinzipien

- **P01 - Entscheidung vor Navigation:** Die Oberfläche startet mit der Frage, die der Nutzer beantworten muss, nicht mit dem Modulnamen.

- **P02 - Eine Wahrheit, mehrere Perspektiven:** Alle Rollen sehen dieselben verknüpften Objekte, jedoch mit anderer Verdichtung, Sprache und Handlungslogik.

- **P03 - Klartext vor Fachsprache:** Fachbegriffe bleiben verfügbar, werden aber erklärt und nicht als Voraussetzung für Orientierung verwendet.

- **P04 - Ursache vor Score:** Bewertungen zeigen Gründe, Beziehungen, Datenlage und Unsicherheit - nie nur eine Zahl oder Ampelfarbe.

- **P05 - Wirkung vor Aktivität:** Priorität und Fortschritt richten sich nach erwarteter bzw. bestätigter Wirkung, nicht nach Anzahl erledigter Aufgaben.

- **P06 - Progressive Offenlegung:** Die erste Ebene bleibt ruhig. Tiefe, Graphen, Rohdaten und Bulk-Aktionen öffnen sich kontrolliert.

- **P07 - Sichtbarer Kontext:** Mandant, Rolle, Scope, Datenstand und Vertraulichkeit sind bei kritischen Aktionen immer erkennbar.

- **P08 - Sichere Reversibilität:** Entwürfe, Vorschauen, Versionen, Undo und Freigaben schützen vor irreversiblen Fehlaktionen.

- **P09 - Erklärbare Intelligenz:** Empfehlungen besitzen Begründung, Alternativen, Vertrauensgrad und menschliche Übersteuerung.

- **P10 - Wiederaufnahme statt Neustart:** Nach Unterbrechung zeigt die Plattform den letzten bestätigten Zustand und den nächsten sinnvollen Schritt.

- **P11 - Barrierearm und gerätebewusst:** Lesbarkeit, Tastaturbedienung, Screenreader, Kontrast und mobile Kernwege sind Produktanforderungen.

- **P12 - Keine Dark Patterns:** Serviceempfehlungen sind fachlich begründet, optional, vergleichbar und klar von verpflichtenden Maßnahmen getrennt.

## 4. Informationsarchitektur und globale Navigation

Die globale Shell enthält Produkt-/Betreiberidentität, Mandant, aktive Rolle, globale Suche, Benachrichtigungen, Hilfe und Nutzerkonto. Die linke Navigation enthält acht stabile Orte. Kontextuelle Wege entstehen über Deep Links, Objektbeziehungen, Suche, zuletzt bearbeitete Elemente und gespeicherte Sichten.

- **Heute:** Mission Control, Wiederaufnahme, persönliche Entscheidungen und Aufgaben *Hinweis: Rollenabhängig; Standard-Startpunkt.*

- **Kunden:** Portfolio und Customer Workspaces *Hinweis: Für Kundenrollen ggf. direkt der eigene Workspace.*

- **ISMS:** Digital Twin, Scope, Risiken, Controls, Maßnahmen, Policies, Evidence, Audits *Hinweis: Objekt- und zielbezogene Fachnavigation.*

- **Entscheidungen:** Decision Records, Freigaben, Risikoakzeptanz, Investitionsoptionen *Hinweis: Rollen- und scopegefiltert.*

- **Services:** Katalog, aktive Services, Delivery, SLA, Wert und Reviews *Hinweis: Managed-Service-Schicht.*

- **Reports:** Briefings, PDF/PPTX, Management Review, Exporte *Hinweis: Zielgruppen- und freigabebezogen.*

- **Wissen:** Suche, Glossar, Vorlagen, Best Practices, Lernhinweise *Hinweis: Kontextsensitiv und rollenbezogen.*

- **Administration:** Nutzer, Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb *Hinweis: Nur bei entsprechender Berechtigung.*

## 5. Rollenbezogene Erlebniswelten

### Executive World
**Primäre Rollen:** Executive Sponsor, CISO  
**Leitfrage:** Bin ich auf Kurs, welche Geschäftsrisiken bedrohen Ziele und was muss ich entscheiden?  
**Erlebnis:** Klartext, 3-5 Entscheidungen, Business Impact, Optionen, Investitionswirkung, Unsicherheit.  
**Bewusst vermeiden:** Keine Roh-Control-Listen, keine operative Task-Wand.

### Customer Operations World
**Primäre Rollen:** ISMS Manager, Owner, Contributor  
**Leitfrage:** Was ist heute zu tun, warum und wie belege ich Wirksamkeit?  
**Erlebnis:** Morning Mission, Kundenpuls, Maßnahmen, Evidence, Freigaben, Datenlücken, Wiederaufnahme.  
**Bewusst vermeiden:** Keine Portfolio- oder Vertriebsmetriken ohne Zweck.

### Consulting & Service World
**Primäre Rollen:** Service Lead, Engagement Manager, Consultant  
**Leitfrage:** Welcher Mandant benötigt Aufmerksamkeit und wie skaliert die Delivery?  
**Erlebnis:** Portfolio, SLA, Kapazität, Reise, wiederverwendbare Workflows, Deliverables, Opportunity mit Begründung.  
**Bewusst vermeiden:** Keine verdeckte Mitarbeiterüberwachung oder rein umsatzgetriebene Empfehlungen.

### Assurance & Administration World
**Primäre Rollen:** Auditor, Admin, Platform Ops  
**Leitfrage:** Ist die Aussage belastbar, der Zugriff kontrolliert und der Betrieb nachvollziehbar?  
**Erlebnis:** Audit Workspace, Datenherkunft, Versionen, Rechte, Integrationsgesundheit, Logs und Supportzugriff.  
**Bewusst vermeiden:** Kein uneingeschränkter Support- oder Auditorzugriff.

## 6. Universelle Seitenanatomie

Jede Hauptseite folgt fünf Fragen: (1) Was ist das? (2) Warum ist es wichtig? (3) Womit hängt es zusammen? (4) Wie entwickelt es sich? (5) Was soll als Nächstes passieren? Querschnittlich sind Rolle, Mandant, Scope, Datenstand, Vertrauensgrad, Version und Hilfe sichtbar.

## 7. Seiten- und Screenkatalog

- **S01 - Mission Control:** Was hat sich seit meinem letzten Besuch verändert und was verdient Aufmerksamkeit? Kerninhalt: Morning Mission, Veränderungsfeed, Entscheidungen, Risiken, Service-/SLA-Signale, Wiederaufnahme. *Primäre Rollen: Alle Rollen, rollenspezifisch.*

- **S02 - Customer Workspace:** Wie verstehe ich diesen Kunden in einer Minute? Kerninhalt: Strategie-DNA, Zielstatus, Puls, Top-Ursachen, Hebel, Zeitachse, Servicewirkung. *Primäre Rollen: Kunde und Beratung.*

- **S03 - Executive Experience:** Welche Geschäftsentscheidung ist jetzt erforderlich? Kerninhalt: Top-Entscheidungen, Business Impact, Optionen, Simulation, Freigabe, Management Narrative. *Primäre Rollen: Executive, CISO.*

- **S04 - Portfolio Cockpit:** Welche Mandanten, Services oder Termine kippen? Kerninhalt: Health Map, SLA, Trends, Audits, Kapazität, Reise, Eskalation, Opportunities. *Primäre Rollen: Service Lead, Engagement Manager.*

- **S05 - Digital Twin Explorer:** Was ist betroffen und wie hängt es zusammen? Kerninhalt: Graph/Listen-Hybrid, Fokusmodus, Beziehungen, Historie, Datenvertrauen, Auswirkungsanalyse. *Primäre Rollen: Power User, Auditor.*

- **S06 - Risk & Control Workspace:** Warum ist das Risiko hoch und welche Controls wirken? Kerninhalt: Szenario, Business Impact, Ursachen, Controls, Evidence, Behandlung, Akzeptanz. *Primäre Rollen: CISO, ISMS Manager.*

- **S07 - Measure / Improvement Workspace:** Welche Veränderung erzeugt die größte Wirkung? Kerninhalt: Definition of Done, Aufwand, Abhängigkeiten, Owner, Evidence, Wirkungsprüfung. *Primäre Rollen: Owner, Consultant.*

- **S08 - Audit Workspace:** Was braucht die Prüfung und wie belastbar ist die Antwort? Kerninhalt: Scope, Requests, Evidence, Sampling, Findings, Reise, Q&A, Abschluss. *Primäre Rollen: Auditor, ISMS Manager.*

- **S09 - Service Workspace:** Was wird geliefert, mit welcher Qualität und welchem Wert? Kerninhalt: Service Charter, Betriebszyklus, SLA, Deliverables, Wirkung, Review, Änderung. *Primäre Rollen: Service Lead, Kunde.*

- **S10 - Reporting Studio:** Welche Geschichte soll aus demselben Datenstand entstehen? Kerninhalt: Zielgruppe, Zeitraum, Narrative, Module, Vorschau, Freigabe, PDF/PPTX. *Primäre Rollen: Consultant, CISO.*

- **S11 - Administration & Integration Health:** Ist der Tenant sicher, korrekt konfiguriert und verbunden? Kerninhalt: Nutzer, Rollen, Scope, Connectoren, Jobs, Fehler, Audit Log, Supportzugriff. *Primäre Rollen: Admin, Platform Ops.*

## 8. Kernscreen: Mission Control & Morning Mission

Mission Control beantwortet Veränderungen, Priorität, Wirkung und Wiederaufnahme. Die Morning Mission ist keine To-do-Liste, sondern ein dynamischer Vorschlag, wo knappe Zeit heute die größte Ziel- oder Risikowirkung erzeugt. Sie enthält Mission, Warum-Kontext, erwarteten Impact, empfohlene Reihenfolge, reale Kapazität/Reise und „Das solltest du wissen“.

## 9. Kernscreen: Customer Workspace

Die Kundendetailansicht vermittelt in einer Minute Strategie-DNA, Zielstatus, Puls, Veränderungen, Kausalität, Hebel, Servicewirkung und Historie. Ein Rollenfilter verdichtet dieselbe Wahrheit für Executive, ISMS, Beratung oder Audit.

## 10. Executive Experience

Die Executive Experience zeigt höchstens drei bis fünf entscheidungsreife Themen. Jede Entscheidung enthält Business Impact, Optionen einschließlich Nichtstun, Zeit-/Budgetannahmen, erwartete Wirkung, Unsicherheit, Verantwortlichkeit und Freigabe. Technische Details sind verfügbar, aber nicht Einstiegspunkt.

## 11. Consulting & Portfolio Experience

Portfolio Cockpit, Mandantenpriorität, Audit-/Reiseplanung, SLA, Kapazität, Skill Matching, Deliverables und begründete Service Opportunities bilden eine Operations-Welt. Personenmetriken dürfen nicht zu verdeckter Überwachung werden.

## 12. Digital Twin, ISMS Workspaces und Graphnavigation

Graph und Liste sind gleichberechtigte Darstellungen. Fokusmodi zeigen Beziehungen eines ausgewählten Prozesses, Assets, Risikos, Controls, Services oder Audits. Jede Beziehung besitzt Typ, Richtung, Herkunft, Aktualität und ggf. Vertrauensgrad.

## 13. Collaboration, Entscheidungen und Freigaben

Kommentare, Aufgaben und Freigaben leben am fachlichen Objekt. Kritische Entscheidungen werden als strukturierte Decision Records mit Optionen, Begründung, Datenstand, Unsicherheit, Entscheider und Review-Datum geführt.

## 14. Reporting-, PDF- und Präsentationserlebnis

Reporting Studio startet mit Anlass und Zielgruppe, nicht mit einem leeren Dokument. Nutzer wählen Zeitraum, Scope, Narrative, Module, Sprache, Vertraulichkeit und Format. Eine Vorschau zeigt Datenherkunft, Stand und offene Unsicherheiten. Export benötigt passende Freigabe und wird versioniert.

## 15. Onboarding, adaptive Komplexität und Hilfe

Anfänger erhalten geführte Aufgaben, Klartext, Beispiele, „Ich weiß es nicht“, Glossar und sichere Rückfrage. Power User erhalten gespeicherte Sichten, Bulk-Aktionen, Tastatursteuerung und Rohdaten. Die Plattform passt Dichte vorsichtig an, ohne Navigation unvorhersehbar zu verändern.

## 16. Suche, Benachrichtigungen und Wiederaufnahme

Globale Suche findet Objekte, Personen, Risiken, Controls, Services, Dokumente und Entscheidungen. Benachrichtigungen werden nach Dringlichkeit und Rolle gebündelt. Der universelle Wiederaufnahmepunkt zeigt letzten bestätigten Zustand, Änderungen seitdem, offenen Entwurf, Blocker und nächsten Schritt.

## 17. UI-Zustände, Fehler und Vertrauen

- **Loading:** Skeletons statt springender Layouts; Fortschritt und erwartete Dauer bei langen Jobs.

- **Empty:** Erklärt Nutzen, nächsten Schritt, Beispiel und verantwortliche Rolle; keine leere Tabellenwüste.

- **Partial data:** Datenlücken, Quelle, Aktualität und Auswirkungen auf Aussagen sichtbar.

- **Success:** Bestätigt Ergebnis, Wirkung, erzeugte Folgeaktionen und Rückgängig-/Versionierungsoption.

- **Warning:** Erklärt Konsequenz, Schwellenwert und sichere Alternative.

- **Error:** Diagnose in Klartext, was gespeichert wurde, Wiederholung, Fallback und Supportpfad.

- **Blocked:** Blocker, Owner, Abhängigkeit, Eskalation und mögliche Zwischenlösung.

- **Conflict:** Widersprüchliche Daten nebeneinander; Quelle, Zeitpunkt, Owner und Auflösungsworkflow.

- **Permission denied:** Zweck und zuständige Rolle erklären, ohne vertrauliche Inhalte zu leaken.

- **AI unavailable:** Regelbasierter/manueller Kernweg bleibt funktionsfähig; Entwurf wird nicht als Ergebnis ausgegeben.

- **Offline / poor connection:** Lesezustand und sichere lokale Entwürfe für ausgewählte Auditwege; klare Sync-Anzeige.

- **Stale:** Überholte Bewertung nicht still weiterverwenden; Review anfordern und Wirkung auf Reports markieren.

## 18. Visuelles Designsystem

Das neutrale Enterprise-Design verwendet ruhige Flächen, starke Typografie, großzügige Abstände und wenige Akzentfarben. Navy steht für Struktur, Teal für aktive Orientierung und Wirkung. Warnfarben werden sparsam genutzt. Status benötigt zusätzlich Text/Symbol. Komponenten umfassen Question Header, Context Bar, Insight Card, Decision Card, Confidence Badge, Timeline, Relationship Panel, Action Rail, Table/List, Filter, Drawer, Modal, Toast und Export Preview.

## 19. Datenvisualisierung, Barrierefreiheit und Responsive Design

Diagramme müssen eine konkrete Frage beantworten, Achsen/Skalen nennen und eine Textalternative besitzen. Tabellen sind filterbar, tastaturbedienbar und exportierbar. Mobile fokussiert Briefing, Entscheidungen, Aufgaben, Evidence Capture und Auditbegleitung; komplexe Modellierung bleibt Desktop-first.

## 20. Demo- und Prototyp-Spezifikation

Der Demonstrator enthält mehrere synthetische Unternehmen, vollständige Konten je Rolle, realistische Datenstände, Veränderungen, Entscheidungen, Audits, Reisen, Services und Exporte. Rollenwechsel, Mandantenwechsel und Demo-Kennzeichnung sind sichtbar. Flagship-Wege funktionieren durchgängig; fortgeschrittene Datenquellen dürfen deterministisch simuliert sein.

## 21. Globale Akzeptanzkriterien

- Ein Erstnutzer kann innerhalb von zwei Minuten aktive Rolle, Mandant, Produktzweck und nächsten Schritt erklären.

- Jede Hauptseite besitzt eine eindeutige Leitfrage, sichtbaren Kontext und mindestens einen nachvollziehbaren nächsten Schritt.

- Keine kritische Bewertung wird ausschließlich durch Farbe oder einen unerklärten Score dargestellt.

- Jede Empfehlung zeigt mindestens Begründung, erwartete Wirkung, Datenstand, Unsicherheit und Übersteuerungsmöglichkeit.

- Jede kritische Aktion besitzt Vorschau, Freigabe oder Reversibilität gemäß Risiko.

- Rollen- und Mandantenwechsel sind sichtbar; Cross-Tenant-Fehlaktionen werden technisch und visuell verhindert.

- Leere, teilweise, fehlerhafte und veraltete Datenzustände sind produktiv gestaltet.

- Die wichtigsten Wege sind per Tastatur nutzbar und für Screenreader semantisch strukturiert.

- PDF/PPTX-Exporte sind zielgruppengerecht, versioniert und zeigen Scope, Datenstand und Vertraulichkeit.

- Kernreisen funktionieren ohne generative KI und besitzen dokumentierte Fallbacks.

- Mobile Nutzer können Briefings lesen, freigeben, Aufgaben bearbeiten und Evidence erfassen, ohne Desktop-UI zu quetschen.

- Keine Service Opportunity wird ohne fachliche Begründung oder als verpflichtende Maßnahme dargestellt.

## 22. Verbindliche Entscheidungen

- **06-D01:** Die Hauptnavigation besteht aus acht stabilen Orten: Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen und Administration.

- **06-D02:** Mission Control ist der Standard-Startpunkt; Kundennutzer können tenantbezogen direkt im eigenen Customer Workspace starten.

- **06-D03:** Jede Hauptseite beantwortet eine primäre Nutzerfrage und folgt der fünfteiligen Seitenanatomie.

- **06-D04:** Mandant, aktive Rolle, Scope, Datenstand und Vertraulichkeit sind bei kritischen Aktionen sichtbar.

- **06-D05:** Die Plattform besitzt vier rollenbezogene Erlebniswelten, aber nur ein gemeinsames Daten- und Objektmodell.

- **06-D06:** Executive Experience zeigt wenige entscheidbare Optionen mit Business Impact und keine technische Detailwand.

- **06-D07:** Einsteiger- und Expertenmodus sind keine getrennten Produkte; progressive Offenlegung steuert Tiefe und Dichte.

- **06-D08:** Scores, Empfehlungen und Simulationen zeigen Ursache, Datenherkunft, Annahmen und Vertrauensgrad.

- **06-D09:** Globale Suche, Deep Links und universelle Wiederaufnahme sind Kernnavigation und keine spätere Komfortfunktion.

- **06-D10:** PDF/PPTX-Generierung besitzt eine Vorschau- und Freigabestrecke; Exporte zeigen Scope, Stand und Vertraulichkeit.

- **06-D11:** Farbe ist nie alleiniger Informationsträger; Status wird zusätzlich durch Text, Form oder Symbol vermittelt.

- **06-D12:** Mobile Nutzung fokussiert Briefing, Freigaben, Aufgaben, Evidence Capture und Reise-/Auditbegleitung; komplexe Modellierung bleibt Desktop-first.

- **06-D13:** Serviceempfehlungen werden fachlich begründet und visuell von verpflichtenden Compliance-/Risikomaßnahmen unterschieden.

- **06-D14:** Die Demo zeigt vollständige rollenbezogene Produktwelten mit synthetischen Unternehmen und realistischen Zuständen.

- **06-D15:** Alle kritischen Nutzerwege besitzen Fehler-, Abbruch-, Wiederaufnahme- und sichere Fallback-Zustände.

## 23. Begründete Annahmen

- **06-A01:** Desktop-Web ist die primäre Arbeitsoberfläche für Power User; mobile Nutzung ergänzt ausgewählte Kernmomente.

- **06-A02:** Die erste Produktfassung verwendet Deutsch und Englisch, wobei konkrete Sprachen noch bestätigt werden müssen.

- **06-A03:** ISMS Manager und Consultants arbeiten häufig mit mehreren Tabs, Filtern und gespeicherten Sichten.

- **06-A04:** Executives nutzen die Plattform unregelmäßig und müssen Kontext ohne Schulung innerhalb weniger Minuten erfassen.

- **06-A05:** Kunden starten mit unvollständigen Daten; die UI muss Unsicherheit produktiv darstellen können.

- **06-A06:** Ein neutrales Designsystem wird später mandanten- oder betreiberbezogen gebrandet, ohne Informationsarchitektur zu verändern.

- **06-A07:** Graphvisualisierungen sind hilfreich, dürfen aber nie der einzige Zugang zu Beziehungen sein.

- **06-A08:** Tastaturbedienung, Screenreader-Kompatibilität und hohe Kontraste sind für Enterprise-Tauglichkeit relevant.

- **06-A09:** Bei langen Report-, Import- oder Simulationsjobs ist asynchrone Verarbeitung mit Status und Benachrichtigung notwendig.

- **06-A10:** Synthetische Demodaten dürfen dramatische, aber logisch konsistente Veränderungen zeigen, wenn sie eindeutig als Demo markiert sind.

## 24. Offene Fragen

- **06-O01:** Welche konkrete visuelle Markenrichtung und welcher Produktname werden für den neutralen Demonstrator gewählt?

- **06-O02:** Welche Sprachen sind in der ersten präsentierbaren Version vollständig unterstützt?

- **06-O03:** Welches Zielniveau der Barrierefreiheit wird verbindlich festgelegt, z. B. WCAG 2.2 AA?

- **06-O04:** Welche Offline-Tiefe benötigt der Audit Companion für Vor-Ort-Einsätze?

- **06-O05:** Wie stark darf die UI automatisch an Rolle, Reifegrad und Nutzungshäufigkeit angepasst werden, ohne Vorhersehbarkeit zu verlieren?

- **06-O06:** Welche Diagrammtypen werden als verbindliche Referenz für Risiko, Reifegrad, Zielroute und Portfolio genutzt?

- **06-O07:** Welche mobilen Freigaben gelten als sicherheits- oder haftungsrelevant und benötigen zusätzliche Bestätigung?

- **06-O08:** Wie werden Cross-Tenant-Ansichten für Beratungen gestaltet, ohne Datenvermischung oder Fehlkontext zu riskieren?

- **06-O09:** Welche Personalisierung darf ein Nutzer speichern: Layout, Filter, Briefing, Benachrichtigungen, Startseite?

- **06-O10:** Welche UI-Komponenten werden als eigene Designbibliothek gebaut und welche aus einem Framework übernommen?

- **06-O11:** Wie werden regulatorisch oder vertraglich eingeschränkte Serviceempfehlungen visuell behandelt?

- **06-O12:** Welche Datenvisualisierungen sind in PDF/PPTX identisch zur Webansicht und welche werden exportoptimiert neu gesetzt?

## 25. Ideenparkplatz

- **Focus Mode:** Blendet alles außer einer Entscheidung, ihrer Ursache-Wirkungs-Kette und den nötigen Freigaben aus.

- **Role Lens:** Wechselt dieselbe Kundenseite live zwischen Executive-, ISMS-, Berater- und Auditorperspektive.

- **Journey Replay:** Spielt zeitlich ab, wie ein Risiko erkannt, bewertet, entschieden, behandelt und wirksam bestätigt wurde.

- **Command Palette:** Tastaturgeste für Suche, Navigation, Objektanlage und häufige Aktionen.

- **Voice Briefing:** 30-Sekunden-Briefing mit optionaler Rückfrage; erzeugt danach schriftlichen Kontext.

- **Presentation Mode:** Verwandelt eine Kundenseite in eine moderierbare Managementansicht ohne sensible Betriebsdetails.

- **Evidence Capture Mobile:** Foto/Scan/Notiz mit Klassifikation, Objektzuordnung und späterer Prüfung im Audit Companion.

- **Explain This View:** Erklärt die Seite, Begriffe, Scores und nächsten Schritte in der Sprache der aktiven Rolle.

- **Trust Overlay:** Einblendbare Ebene, die Quelle, Aktualität, Datenlücken und Unsicherheit aller Kernaussagen hervorhebt.

- **Service Sandbox:** Vergleicht visuell interne, unterstützte und vollständig gemanagte Delivery-Routen.

- **Cross-Customer Pattern Cards:** Zeigt anonymisierte Muster und bewährte Maßnahmen als klar gekennzeichnete Inspiration.

- **Ambient Status:** Sehr ruhige visuelle Signale für Stabilität oder Veränderung, ohne Ampelwand und Alarmmüdigkeit.

## 26. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming und Dokument 00 bis 05. |

## Nächster Schritt
Dokument 07 - Digitaler Unternehmenszwilling und Informationsgraph.
