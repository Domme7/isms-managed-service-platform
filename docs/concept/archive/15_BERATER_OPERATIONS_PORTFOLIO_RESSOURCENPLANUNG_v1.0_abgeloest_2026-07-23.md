# Dokument 15 – Berater-Operations, Portfolio & Ressourcenplanung

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00 bis 14  
**Primäre Nachfolger:** Dokument 16 bis 20C

---

## 1. Auftrag und Abgrenzung

Dokument 15 ist die kanonische Quelle für die operative Steuerung von Beraterportfolios, Kundenmandaten, Skills, Kapazität, Kalendern, Vor-Ort-Terminen, Reise, Vertretung, Delivery-Qualität, Cost-to-Serve und Portfolio-Profitabilität. Es übersetzt das Managed-Service-Betriebsmodell aus Dokument 13 und die kommerzielle Architektur aus Dokument 14 in einen realistisch lieferbaren Arbeitsbetrieb.

Das Dokument beantwortet insbesondere:

- Wie kann ein Berater oder ein Delivery-Team viele Mandanten steuern, ohne Qualität, Gesundheit oder Nachvollziehbarkeit zu verlieren?
- Wie wird aus Servicebedarf ein passendes, terminierbares und prüfbares Arbeitspaket?
- Wie werden Skill, Verfügbarkeit, Kundenkontext, Reise und SLA gemeinsam berücksichtigt?
- Wie erkennt die Plattform Überlastung, Engpässe, Vertretungsrisiken und unwirtschaftliche Delivery frühzeitig?
- Wie werden Vor-Ort-Audits, Workshops und Reisen als echte operative Randbedingungen behandelt?
- Wie wird der wirtschaftliche Nutzen standardisierter Managed Services sichtbar, ohne Berater zu reinen Auslastungsobjekten zu machen?

Nicht Gegenstand dieses Dokuments sind die vollständige technische Integrationsarchitektur, finale Kalender- oder Reisepartner, konkrete KI-Modelle, produktive Datenschutzkonfigurationen und die Claude-Code-Agentenfirma. Diese folgen in Dokument 17 bis 20C.

## 2. Executive Summary

Die Beraterwelt der Plattform ist kein persönlicher Aufgabenplaner und keine klassische Professional-Services-Automation. Sie ist ein **Operations Center für sicherheitsrelevante Kundenarbeit**. Im Zentrum steht nicht maximale Auslastung, sondern die bestmögliche Wirkung unter realen Grenzen: fachliche Eignung, verfügbare Zeit, Kundenpriorität, SLA, Reise, Abhängigkeiten, Qualität, Gesundheit und Wirtschaftlichkeit.

Ein Berater öffnet morgens nicht mehrere Postfächer, Tabellen und Projektpläne. Er sieht eine begründete Mission:

- welche Mandanten heute Aufmerksamkeit brauchen,
- warum diese Themen relevant sind,
- welche Arbeit den größten Kunden- und Risikonutzen erzeugt,
- welche Termine, Reisen oder Freigaben die Route begrenzen,
- welche Arbeit automatisiert, delegiert, gebündelt oder verschoben werden kann,
- wo ein Engagement Manager eingreifen muss.

Ein Engagement Manager sieht sein Portfolio als steuerbares System. Die Plattform verbindet Service Instances, Work Packages, Skills, Kapazität, Kalender, Standort, Reise, Qualität und kommerzielle Baselines. Sie erlaubt Szenarien wie: „Was passiert, wenn der Audit Lead ausfällt?“, „Können wir drei Vor-Ort-Termine in einer Reise bündeln?“, „Welcher Senior besitzt den passenden Branchenkontext?“, „Welche Services sind strukturell unprofitabel, weil zu viel Rework entsteht?“

Das Zielbild ist eine Delivery-Organisation, die skalieren kann, weil sie Arbeit standardisiert, wiederverwendet und intelligent verteilt - nicht weil Menschen dauerhaft mehr Mandanten oder mehr Stunden übernehmen.

[[FIGURE:FIG1]]

## 3. Operations-Verfassung

### 3.1 Verbindliche Grundprinzipien

- **O01 - Wirkung vor Aktivität:** Priorisierung folgt Kundenwirkung, Risiko, Zielpfad und Verpflichtung - nicht bloß Fälligkeit oder Lautstärke.
- **O02 - Qualität vor Auslastung:** Kein Kapazitätsmodell darf Überlastung, fehlende Review-Zeit oder unzureichende Skills als Effizienz verkaufen.
- **O03 - Menschen bleiben verantwortlich:** Die Plattform empfiehlt; Engagement Manager und fachlich verantwortliche Personen entscheiden über sensible Staffing-, Eskalations- und Kundenmaßnahmen.
- **O04 - Kapazität ist mehr als Stunden:** Skill, Kontext, Fokuszeit, Reise, Koordination, Review, Erholung, Sprache und Zeitzone beeinflussen lieferbare Kapazität.
- **O05 - Reise ist Arbeit:** Reisezeit, Vor-Ort-Anforderungen, Kosten, Stornorisiko und Belastung werden explizit geplant und niemals als unsichtbarer Puffer behandelt.
- **O06 - Ein Work Package braucht ein Ergebnis:** Arbeit wird nicht nur als Aktivität, sondern mit Outcome, Scope, Owner, Quality Gate und Nachweis geplant.
- **O07 - Vertretbarkeit ist ein Qualitätsmerkmal:** Kritische Kundenleistung darf nicht von einer einzelnen Person oder einem einzelnen Chat abhängen.
- **O08 - Portfolio-Sicht und Kundensicht bleiben konsistent:** Jede Priorität muss aus denselben freigegebenen Daten, Serviceverpflichtungen und Zielprofilen entstehen.
- **O09 - Wirtschaftlichkeit bleibt erklärbar:** Cost-to-Serve, Marge und Rework werden transparent berechnet; individuelle Mitarbeiterbewertung wird davon getrennt.
- **O10 - Kein automatisches Cross-Selling:** Servicechancen benötigen fachliche Begründung, Alternativen, Konfliktprüfung und menschliche Freigabe.
- **O11 - Standardisierung mit Ausnahmerecht:** Wiederverwendbare Work Packages sind der Normalfall; begründete Kundenabweichungen bleiben möglich und sichtbar.
- **O12 - Planung braucht Reserven:** Kritische Eventarbeit, Findings, Incidents und Krankheit werden durch definierte Kapazitätspuffer berücksichtigt.
- **O13 - Planung ist versioniert:** Änderungen an Staffing, Terminen, Reisen und Commitments erzeugen nachvollziehbare Deltas.
- **O14 - Privatsphäre und Fairness:** Personenbezogene Leistungsdaten werden minimiert, rollenbasiert geschützt und nicht für verdeckte Überwachung genutzt.
- **O15 - Nachhaltige Skalierung:** Wachstum wird an Kundennutzen, Qualität, Teamgesundheit und Deckungsbeitrag gemessen - nicht nur an betreuten Mandanten.

### 3.2 Was ausdrücklich vermieden wird

- eine Ampel, die Berater allein anhand abrechenbarer Stunden bewertet,
- automatische Zuweisung ohne Skill-, Konflikt- oder Belastungsprüfung,
- unrealistische 100-Prozent-Auslastungspläne,
- Reiseplanung, die Arbeits- und Ruhezeiten ignoriert,
- versteckte Überbuchung zur Kompensation unsicherer Forecasts,
- Portfoliooptimierung auf Marge zulasten kritischer Kundenrisiken,
- parallele Bearbeitung desselben Kundenproblems ohne abgestimmten Owner,
- nicht dokumentierte Übergaben bei Urlaub, Krankheit oder Rollenwechsel,
- Cross-Selling-Vorschläge, die aus Angst oder ungeprüften Risikodaten entstehen,
- personenbezogene Ranglisten ohne legitimen Zweck und Governance.

## 4. Kanonische Operations-Objekte

### 4.1 Portfolio

Ein **Portfolio** ist eine gesteuerte Menge von Kunden, Service Instances, Engagements oder Regionen. Es besitzt Owner, Zielsystem, Kapazitätsrahmen, Risikoschwellen, wirtschaftliche Ziele und Governance-Rhythmus. Eine Person kann mehrere Portfolio-Sichten besitzen, etwa eigenes Kundenportfolio, Teamportfolio und regionale Practice-Sicht.

### 4.2 Engagement

Ein **Engagement** bildet den verantworteten Kundenkontext. Es verbindet Vertrag beziehungsweise Commercial Baseline, aktive Service Instances, Stakeholder, Rollen, Datenzugriffe, Standorte, Zielprofil, Delivery-Plan, wirtschaftliche Baseline und Historie.

### 4.3 Demand Item

Ein **Demand Item** ist ein noch nicht vollständig qualifizierter Arbeitsbedarf. Quellen sind unter anderem:

- geplanter Servicezyklus,
- neue Bedrohung oder Schwachstelle,
- Finding, Incident oder Datenlücke,
- Kundenanfrage,
- Managemententscheidung,
- Auditmeilenstein,
- regulatorischer Change,
- Opportunity mit fachlicher Begründung.

Ein Demand Item wird geprüft, priorisiert und anschließend verworfen, zurückgestellt, automatisiert, in ein Work Package überführt oder als Change Request behandelt.

### 4.4 Work Package

Ein **Work Package** ist die kleinste planbare Einheit mit fachlichem Ergebnis. Der Mindestvertrag umfasst:

- erwartetes Outcome und Akzeptanzkriterien,
- Kunden- und Servicekontext,
- Scope und betroffene Objekte,
- benötigte Skills und Seniorität,
- geplanten Aufwand und Unsicherheit,
- Owner, Bearbeiter, Reviewer und Approver,
- frühesten Start, Fälligkeit und Abhängigkeiten,
- Remote-/Vor-Ort-Anforderung,
- Quality Gate und erforderliche Evidence,
- Kosten- und Preisbezug,
- Status, Blocker und Handover-Punkt.

### 4.5 Resource Profile

Ein **Resource Profile** beschreibt lieferrelevante Fähigkeiten und Grenzen einer Person oder eines freigegebenen Agenten. Es enthält nur erforderliche Daten:

- Rollen und erlaubte Tätigkeiten,
- Skills und validierte Proficiency,
- Zertifikate mit Gültigkeit,
- Branchen-, Framework- und Sprachkontext,
- Regionen, Zeitzonen und Reisebereitschaft,
- geplante Verfügbarkeit und Schutzzeiten,
- Interessenkonflikte und Zugriffsbeschränkungen,
- aktuelle Assignments und Vertretungsrollen.

### 4.6 Capacity Ledger

Das **Capacity Ledger** ist die versionierte Kapazitätsrechnung je Person, Team, Skill-Pool und Zeitraum. Es trennt vertragliche Zeit, nicht verfügbare Zeit, geschützte interne Zeit, geplante Delivery, Reserve, Reise und ungeplante Ereignisse.

### 4.7 Assignment

Ein **Assignment** verbindet Resource Profile und Work Package. Es enthält Rolle, Verantwortungsgrad, Zeitraum, reservierte Kapazität, Skill-Fit, Konfliktprüfung, Reisebedarf, Freigabe und Handover-Anforderung.

### 4.8 Visit und Travel Leg

Ein **Visit** beschreibt einen fachlichen Vor-Ort-Termin. Ein **Travel Leg** beschreibt den Reiseabschnitt. Beide bleiben getrennt, damit fachliche Notwendigkeit, Zeit, Auslagen, Storno, Sicherheit und Nachhaltigkeit nachvollziehbar sind.

### 4.9 Coverage Plan

Der **Coverage Plan** definiert Primary, Backup, Eskalationsperson und Handover-Status für kritische Kunden-, Service- und Work-Package-Verantwortung.

### 4.10 Delivery Snapshot

Ein **Delivery Snapshot** friert zu einem Stichtag Commitments, Staffing, Fortschritt, Qualität, Kapazität, Kosten und Risiken ein. Er dient Management Review, Service Review, Forecast-Vergleich und Auditierbarkeit.

## 5. Rollen und operative Entscheidungsrechte

| Rolle | Hauptaufgabe | Darf entscheiden | Benötigt Freigabe |
|---|---|---|---|
| Consultant | Work Packages ausführen, Kundenkontext pflegen, Risiken und Blocker melden | eigene Arbeitsreihenfolge innerhalb freigegebener Mission | Scope-, Preis-, SLA- oder Risikoveränderung |
| Senior Consultant / Work Package Lead | fachlich führen, Review koordinieren, Aufwand nachschätzen | Aufgabenverteilung im Work Package | neue Ressourcen, Kundeneskalation, Ausnahme von Quality Gate |
| Engagement Manager | Kundenportfolio, Commitments, Staffing und Eskalationen steuern | Staffing, Priorisierung, Vertretung innerhalb genehmigter Baseline | kommerzielle Änderung, kritische Risikoakzeptanz, sensible Personalentscheidung |
| Service Owner | Standard, Service Health, QA und Verbesserung verantworten | Service-Methodik und Standard-Work-Packages | Änderung des vertraglichen Serviceversprechens |
| Resource / Practice Manager | Skill-Pools, Verfügbarkeit, Entwicklung und Konflikte steuern | Poolzuweisung und Kapazitätsrahmen | längerfristige Organisations- oder Personaländerung |
| Quality Reviewer | unabhängige fachliche Prüfung | Quality Gate bestehen oder zurückweisen | Ausnahme vom verbindlichen Quality Gate |
| Commercial Owner | Preis-, Scope- und Margenlogik steuern | Angebot und Change innerhalb Freigabegrenzen | Sonderrabatt, ungewöhnliches Risiko oder Haftung |
| Travel / Operations Coordinator | Vor-Ort- und Reiseplanung koordinieren | Buchung innerhalb freigegebener Policy und Budgetgrenze | teure, internationale oder sicherheitsrelevante Reise |
| Customer Stakeholder | Mitwirkung, Freigaben und Terminbestätigung | kundenseitige Zusagen im eigenen Mandat | interne Kundenfreigaben gemäß Rolle |
| Platform Administrator | Stammdaten, Rechte und technische Konfiguration verwalten | zulässige Konfiguration | fachliche oder kommerzielle Entscheidungen |

Eine Person kann mehrere Rollen besitzen. Entscheidungsrechte werden pro Engagement und Work Package geprüft, nicht nur über einen globalen Jobtitel.

## 6. Portfolio-Modell und Portfolio Mission Control

### 6.1 Portfolioebenen

Die Plattform unterstützt mindestens:

1. **My Work:** persönliche Mission und eigene Work Packages.
2. **My Clients:** Kunden, für die die Person operative oder fachliche Verantwortung besitzt.
3. **Team Portfolio:** gemeinsamer Delivery-Bestand eines Teams.
4. **Service Portfolio:** alle Instanzen eines Managed Service über Mandanten hinweg.
5. **Practice Portfolio:** regionen-, branchen- oder skillübergreifende Steuerung.
6. **Executive Operations:** Qualität, Kapazität, Service Health und Wirtschaftlichkeit auf Leitungsebene.

### 6.2 Attention Model

Kunden werden nicht auf einen einzigen Health Score reduziert. Das Portfolio zeigt mehrere erklärbare Signale:

| Dimension | Leitfrage | Beispiele |
|---|---|---|
| Customer Impact | Wo droht geschäftlicher oder sicherheitsbezogener Schaden? | kritischer Prozess, hohes Restrisiko, auslaufende Ausnahme |
| Commitment | Welche Verpflichtung ist gefährdet? | SLA, Auditmeilenstein, Board-Termin, Deliverable |
| Delivery Health | Wo stockt die Ausführung? | Blocker, fehlende Evidence, Rework, überfällige Freigabe |
| Capacity | Ist die Arbeit realistisch lieferbar? | Skill-Lücke, Überlastung, Reise, Urlaub, fehlende Vertretung |
| Data Confidence | Wie belastbar ist die Bewertung? | veraltete Daten, unsichere Schätzung, fehlende Quelle |
| Commercial Health | Wo weicht Cost-to-Serve von der Baseline ab? | Scope Drift, hohe Reise, Custom Work, Rework |
| Relationship | Wo braucht es Kommunikation? | Sponsorwechsel, ungeklärte Entscheidung, niedrige Mitwirkung |

Die Startseite erklärt immer, **warum** ein Mandant Aufmerksamkeit benötigt und welche Handlung das Signal verändern würde.

[[FIGURE:FIG2]]

### 6.3 Portfolio-Cluster

Die Plattform kann Kunden nach operativer Ähnlichkeit clustern:

- gemeinsamer Auditzeitraum,
- gleiche Branche oder regulatorisches Profil,
- ähnliche Control-Lücken,
- gleiche Service Offers,
- geografische Nähe,
- identische Technologie- oder Integrationslandschaft,
- wiederverwendbares Work Package,
- gleicher Expertenbedarf.

Clustering dient Wiederverwendung und Reisebündelung. Es darf niemals zu unzulässiger Mandantenvermischung oder Datenoffenlegung führen.

## 7. Demand Intake und Triage

### 7.1 Eingangskanäle

Demand entsteht automatisch oder manuell aus Servicekalender, Decision Center, Risk Engine, Collaboration, Audit Workspace, Customer Request, Integration Event oder Beraterbeobachtung. Jede Quelle wird mit Herkunft, Zeitpunkt und Confidence gespeichert.

### 7.2 Triage-Fragen

1. Ist das Demand Item echt, aktuell und im Scope?
2. Welches Kunden- oder Serviceziel ist betroffen?
3. Ist eine sofortige Reaktion erforderlich?
4. Kann eine bestehende Automation oder ein Standard-Work-Package verwendet werden?
5. Welche Skills, Rollen und Freigaben sind nötig?
6. Ist die Arbeit bereits geplant oder doppelt vorhanden?
7. Verändert sie Scope, Preis, SLA oder Risiko?
8. Welche Daten fehlen vor einer belastbaren Planung?

### 7.3 Triage-Ergebnisse

- **Ignore / Duplicate:** begründet geschlossen oder zusammengeführt.
- **Monitor:** Signal bleibt beobachtet, noch kein Work Package.
- **Automate:** deterministischer Workflow übernimmt definierte Schritte.
- **Standard Work Package:** vorhandene Vorlage wird instanziiert.
- **Expert Review:** Spezialist bewertet vor der Planung.
- **Expedite:** kritischer Pfad mit Eskalation und Kapazitätsfreigabe.
- **Change Request:** außerhalb Commercial Baseline oder Charter.
- **Opportunity Candidate:** fachlich sinnvoll, aber noch kein Verkaufsangebot.

## 8. Work-Package-Bibliothek und Standardisierung

### 8.1 Template-Struktur

Jede wiederkehrende Tätigkeit erhält ein versioniertes Work-Package-Template mit:

- Outcome und Zielgruppe,
- typischem Input,
- Arbeitsschritten und Abhängigkeiten,
- benötigten Skills,
- Aufwandsspanne statt Scheingenauigkeit,
- Remote-/Vor-Ort-Regel,
- Deliverables und Evidence,
- Quality Gates,
- zulässiger Automatisierung,
- Standardrisiken und Abbruchbedingungen,
- Preis- oder Servicebezug,
- Lessons Learned.

### 8.2 Beispiele

| Template | Typischer Outcome | Primäre Skills | Vor-Ort? |
|---|---|---|---|
| WP-AUD-30 | Audit Readiness 30 Tage vor Feldarbeit aktualisiert | Audit, ISMS, Evidence | optional |
| WP-RISK-MONTH | monatlicher Risikoreview abgeschlossen | Risk Management, Business Context | nein |
| WP-CTRL-TEST | Control Design und Wirksamkeit geprüft | Control Assurance, Fachsystem | optional |
| WP-MR-QTR | Management Review vorbereitet und dokumentiert | Governance, Reporting | optional |
| WP-SUP-CRIT | kritischer Lieferant bewertet und Maßnahmen vereinbart | Third-Party Risk, Procurement | nein |
| WP-INC-GOV | Incident in Risiko-, Control- und Verbesserungslogik überführt | Incident Governance, Risk | nein |
| WP-ONSITE-WS | Vor-Ort-Workshop durchgeführt, Entscheidungen dokumentiert | Facilitation, ISMS, Branche | ja |
| WP-BOARD-PACK | freigabefähiges Board Package erzeugt | Executive Reporting, QA | nein |

### 8.3 Wiederverwendung ohne Copy-Paste-Risiko

Vorlagen liefern Struktur, aber keine fremden Kundendaten. Beim Instanziieren werden Mandant, Scope, Methodenstand, Datenquellen und Deliverables neu gebunden. Jede lokale Abweichung wird als Delta zur Standardvorlage gespeichert.

## 9. Capacity Ledger

### 9.1 Kapazitätskomponenten

Die Plattform trennt:

- vertragliche Arbeitszeit,
- Urlaub, Krankheit und Abwesenheit,
- geschützte Lern-, Führungs- und interne Zeit,
- bereits zugesagte Delivery,
- geplante Reviews und Quality Gates,
- Kundenkommunikation und Governance,
- Reisezeit,
- Event- und Incident-Reserve,
- Fokus- und Kontextwechselverlust,
- verbleibende planbare Kapazität.

Eine mögliche, konfigurierbare Grundlogik lautet:

`Planbare Kapazität = Vertragszeit - Abwesenheit - Schutzzeit - feste Commitments - Reise - Reserve`

Die Formel ist keine Mitarbeiterbewertung. Sie ist eine Planungsbasis und muss durch lokale Arbeitszeit-, Betriebsrats-, Datenschutz- und Unternehmensregeln konfiguriert werden.

### 9.2 Planungshorizonte

| Horizont | Zweck | Granularität |
|---|---|---|
| Heute / 48 Stunden | Mission, Blocker und kritische Reaktion | Stunden / Work Package |
| 2 Wochen | konkrete Terminierung und Reise | halber Tag / Tag |
| 6 bis 12 Wochen | Audit-, Workshop- und Serviceplanung | Tag / Woche |
| Quartal | Skill-Pools, Urlaub, Nachfrage und Servicekapazität | Woche / Monat |
| 6 bis 18 Monate | Hiring, Partner, Training und Portfolioentwicklung | Monat / Quartal |

### 9.3 Load Bands

Die Plattform verwendet keine allgemeingültige Auslastungsquote. Betreiber definieren Bandbreiten je Rolle und Arbeitstyp. Ein Audit Lead mit hoher Reise- und Reviewlast benötigt andere Puffer als ein standardisiertes Reporting-Team.

- **Healthy:** Commitments, Review, Reise und Reserve sind realistisch.
- **Watch:** begrenzter Puffer oder mehrere unsichere Schätzungen.
- **At Risk:** SLA, Qualität, Reise oder Gesundheit kann gefährdet sein.
- **Overcommitted:** zugesagte Arbeit übersteigt belastbare Kapazität; Managemententscheidung erforderlich.

[[FIGURE:FIG3]]

### 9.4 Forecast Confidence

Kapazitätsforecast zeigt zusätzlich:

- Datenalter,
- Anteil geschätzter versus bestätigter Arbeit,
- bekannte Scope-Unsicherheit,
- historische Abweichung ähnlicher Work Packages,
- Abhängigkeit von Kundenzulieferung,
- mögliche Incident- oder Auditspitzen.

## 10. Skill- und Kompetenzmodell

### 10.1 Skill Taxonomy

Skills werden mehrdimensional modelliert:

- ISMS- und GRC-Fachlichkeit,
- Frameworks und Regulierung,
- Audit und Assurance,
- Cybersecurity-Domänen,
- Branchenwissen,
- Technologie- und Plattformwissen,
- Daten, Integration und Reporting,
- Moderation, Stakeholder- und Board-Kommunikation,
- Sprache, Region und Kultur,
- Delivery-, Review- und Führungsfähigkeit.

### 10.2 Proficiency und Evidenz

Eine Skill-Stufe braucht nachvollziehbare Evidenz. Mögliche Quellen:

- valide Zertifizierung,
- erfolgreich reviewte Work Packages,
- beobachtete Arbeitsergebnisse,
- Schulung oder Prüfung,
- fachliche Freigabe durch Skill Owner,
- zeitlich begrenzte Anerkennung.

Selbsteinschätzung kann Input sein, ist aber allein keine belastbare Freigabe für kritische Arbeit.

### 10.3 Skill Requirements

Ein Work Package kann Pflicht-, Wunsch- und Review-Skills definieren. Beispiel:

- **Pflicht:** ISO-27001-Lead-Auditor-Erfahrung und deutsche Sprache.
- **Wunsch:** Produktion/OT und BSI IT-Grundschutz.
- **Review:** unabhängige Person mit Control-Assurance-Proficiency.

### 10.4 Interessenkonflikt und Unabhängigkeit

Staffing prüft neben Skill auch:

- frühere Implementierungsverantwortung,
- Prüfungs- oder Assurance-Unabhängigkeit,
- konkurrierende Kundeninteressen,
- Zugriff auf sensible Daten,
- regionale oder vertragliche Beschränkungen.

## 11. Staffing und Assignment Engine

### 11.1 Matching-Kriterien

Ein Staffing-Vorschlag berücksichtigt:

1. erforderliche Skills und Seniorität,
2. Verfügbarkeit und Kapazitätsband,
3. vorhandenen Kundenkontext,
4. Zeitzone, Sprache und Region,
5. Remote-/Vor-Ort-Anforderung,
6. Reisezeit und Reisecluster,
7. Interessenkonflikte und Rechte,
8. Kontinuität und Vertretbarkeit,
9. Kosten und Commercial Baseline,
10. Lern- und Entwicklungsziel, sofern Qualität gesichert ist.

### 11.2 Erklärung statt Match Score

Die Plattform darf einen Score anzeigen, muss aber die Gründe sichtbar machen, etwa:

- „passt fachlich, besitzt Kundenkontext, aber nur geringe Kapazitätsreserve“,
- „günstigste Reiseoption, benötigt jedoch Senior Review“,
- „hohe Kontinuität, aber Interessenkonflikt für unabhängige Assurance“,
- „geeignet als Shadow Assignment zur Kompetenzentwicklung“.

### 11.3 Staffing-Modi

- **Manual:** Manager wählt; Plattform prüft Konflikte.
- **Assisted:** Plattform schlägt begründete Kandidaten vor.
- **Rule-based Auto-Assignment:** nur für risikoarme, standardisierte Work Packages mit klaren Regeln.
- **Pool Assignment:** Work Package geht an einen freigegebenen Skill-Pool und wird dort übernommen.
- **Follow-the-Sun:** Übergabe zwischen Regionen mit Handover Packet und Datenzugriffsprüfung.

### 11.4 Human Approval

Kritische Kundenarbeit, externe Zusage, internationale Reise, Überlastungsentscheidung, Ausnahme vom Quality Gate und Interessenkonflikt dürfen nicht autonom zugewiesen werden.

## 12. Kalender- und Terminlogik

### 12.1 Kalenderobjekte

Die Plattform unterscheidet:

- persönlicher Termin,
- Kundenmeeting,
- Servicezyklus,
- Auditmeilenstein,
- Vor-Ort-Besuch,
- Travel Leg,
- Fokusblock,
- Review-/Freigabefenster,
- Bereitschaft beziehungsweise Event Reserve,
- Abwesenheit.

### 12.2 Planungsregeln

- Kalenderdaten sind eine Quelle, nicht automatisch die ganze Wahrheit.
- Fokus- und Reviewzeit werden aktiv reserviert.
- Ein Vor-Ort-Termin beinhaltet Vor- und Nachbereitung sowie Reise.
- Back-to-back-Kundenwechsel ohne Kontextpuffer werden markiert.
- Termine über Zeitzonen zeigen lokale und Heimatzeit.
- Kundenseitige Bestätigung und interne Ressourcenfreigabe bleiben getrennte Zustände.
- Änderungen an kritischen Meilensteinen erzeugen eine Impactanalyse auf Service, Reise und Deliverables.

### 12.3 Terminfindung

Die Plattform schlägt Zeitfenster vor, die gleichzeitig Kundenverfügbarkeit, Skills, Abhängigkeiten, Reise, SLA, Arbeitszeitregeln und Reviewkapazität berücksichtigen. Sie ersetzt nicht die verbindliche Zustimmung der Beteiligten.

## 13. Morning Mission und persönlicher Arbeitsplatz

### 13.1 Aufbau

Die persönliche Mission umfasst:

1. **Mission:** Welche zwei bis fünf Ergebnisse sind heute am wichtigsten?
2. **Warum:** Welcher Kunde, Zielpfad oder Commitment hängt davon ab?
3. **Impact:** Welche Risiko-, Service-, Zeit- oder Wertwirkung entsteht?
4. **Route:** Welche Reihenfolge ist unter Terminen, Reise, Skills und Blockern sinnvoll?
5. **Wissen:** Welche Veränderung, Entscheidung oder Lesson Learned ist relevant?

### 13.2 Tagesrealität

Die Mission zeigt nicht nur Aufgaben, sondern:

- verfügbare Fokuszeit,
- feste Termine und Reise,
- erwartete Reviewfenster,
- wartende Kundenfreigaben,
- kritische Notifications,
- mögliche Delegation oder Automatisierung,
- geplante Übergaben,
- Tagespuffer.

### 13.3 Replanning

Bei Incident, Ausfall, Reiseproblem, neuer Kundenentscheidung oder verschobenem Termin wird die Route neu berechnet. Die Plattform erklärt, welche Commitments betroffen sind und welche Optionen bestehen: verschieben, delegieren, Scope reduzieren, Reserve aktivieren oder eskalieren.

## 14. Audit-, Workshop- und Vor-Ort-Operations

### 14.1 Visit Decision

Vor-Ort wird nicht automatisch als hochwertiger als remote behandelt. Die Entscheidung berücksichtigt:

- fachliche Notwendigkeit,
- Prüfungsanforderung,
- physische Evidence oder Standortzugang,
- Workshop- und Beziehungsnutzen,
- Reisezeit, Kosten und Belastung,
- Sicherheit und regionale Vorgaben,
- mögliche Bündelung mit weiteren Terminen.

### 14.2 Visit Pack

Ein freigegebener Besuch erhält ein Visit Pack:

- Ziel, Agenda und gewünschte Entscheidungen,
- Teilnehmer und Rollen,
- Standort- und Zutrittsinformationen,
- Reiseplan und Notfallkontakte,
- erforderliche Dokumente und Evidence Requests,
- Geräte-, Daten- und Sicherheitsregeln,
- offene Risiken und Gesprächspunkte,
- Capture-Vorlage für Findings, Decisions und Actions,
- Handover und Nachbereitung.

### 14.3 Audit Route

Die Auditplanung verbindet T-180-, T-90-, T-60-, T-30- und Feldarbeitsmeilensteine mit Evidence Requests, Dry Runs, Review, Reise, Kapazität, Findings und Abschlussbericht. Bei Verschiebung eines Meilensteins werden Folgewirkungen auf Staffing, Reisebuchung und Board Reporting sichtbar.

## 15. Reiseplanung, Kosten und Nachhaltigkeit

### 15.1 Reiseprinzipien

- Reisezeit wird als Kapazität und Cost-to-Serve erfasst.
- Reisekosten und Reisezeit werden getrennt ausgewiesen.
- Reisebuchung folgt freigegebenen Policies, Sicherheitsanforderungen und Budgetgrenzen.
- Stornierbarkeit und Änderungsrisiko werden bei unsicheren Auditdaten berücksichtigt.
- Reisebündelung darf Vertraulichkeit und Erholung nicht gefährden.
- Remote ist eine echte Alternative, kein automatischer Qualitätsverlust.

### 15.2 Reisecluster

Die Plattform kann Vorschläge erzeugen, wenn mehrere bestätigte Vor-Ort-Termine geografisch und zeitlich sinnvoll kombinierbar sind. Der Vorschlag zeigt:

- zusätzliche oder eingesparte Reisezeit,
- Kostenänderung,
- CO2-Schätzung als optionale Kennzahl,
- Auswirkung auf Kunden- und Fokuszeit,
- Übernachtung und Arbeitszeitgrenzen,
- Stornorisiko,
- Konflikte und Datenschutzgrenzen.

[[FIGURE:FIG4]]

### 15.3 Reiseausnahmen

Internationale Reise, erhöhte Sicherheitslage, Visum, besondere Gesundheitserfordernisse, sensible Kundendaten oder ungewöhnliche Kosten benötigen gesonderte Freigabe. Persönliche Gesundheitsinformationen werden nicht unnötig in der Plattform gespeichert; es genügt eine freigegebene Einschränkung oder Operations-Anweisung.

## 16. Workload, Gesundheit und verantwortungsvolle Planung

### 16.1 Schutzmechanismen

Die Plattform unterstützt:

- maximale planbare Belastungsbänder je Rolle,
- Mindestpuffer vor kritischen Deliverables,
- Reise- und Zeitzonenbelastung,
- Schutzzeiten für Lernen, Führung und Review,
- Warnung vor zu vielen parallelen Kundenkontexten,
- Vertretung bei Urlaub und Krankheit,
- Verbot automatischer negativer Personenrankings.

### 16.2 Context Switching

Viele kleine Assignments können belastender sein als ein großes Work Package. Die Planung bewertet daher neben Stunden:

- Zahl paralleler Mandanten,
- Zahl aktiver Work Packages,
- Wechsel zwischen Branchen oder Frameworks,
- Meetingfragmentierung,
- ungeplante Interruptions,
- Reise- und Zeitzonenwechsel.

### 16.3 Eskalation ohne Stigma

Berater können „Kapazität nicht belastbar“, „Skill-Unterstützung nötig“ oder „Kundenabhängigkeit blockiert“ melden, ohne dies als persönliches Versagen darzustellen. Die Eskalation löst Optionen und Managementverantwortung aus.

## 17. Coverage, Vertretung und Handover

### 17.1 Coverage-Level

| Level | Bedeutung | Mindestanforderung |
|---|---|---|
| C0 | keine Vertretung | nur für risikoarme, kurzlebige Arbeit zulässig |
| C1 | benannte Backup-Person | Zugriff und Kontext vorhanden |
| C2 | aktive Shadow Coverage | regelmäßige Übergabe und gemeinsame Reviews |
| C3 | Team Coverage | standardisierte Work Packages, Pool und dokumentierter Wiedereinstieg |
| C4 | Follow-the-Sun / High Availability | regionale Übergabe, klare OLA, sichere Daten- und Kommunikationswege |

### 17.2 Handover Packet

Das Handover Packet enthält:

- aktuellen Kunden- und Servicezustand,
- Mission und nächste Handlung,
- offene Entscheidungen und Blocker,
- Commitments, Termine und SLA-Risiken,
- relevante Artefakte und Links,
- Ansprechpartner und Kommunikationskontext,
- durchgeführte und ausstehende Quality Gates,
- Zugriffsvoraussetzungen,
- eindeutigen Wiedereinstiegspunkt.

### 17.3 Übergabearten

- geplante Urlaubsübergabe,
- kurzfristige Krankheitsvertretung,
- Rollen- oder Teamwechsel,
- Follow-the-Sun-Handover,
- externer Spezialist,
- Agenten- oder Claude-Sessionwechsel,
- Kunden- oder Provider-Offboarding.

## 18. Delivery-Qualität und Review-Planung

### 18.1 Review ist Kapazität

Reviewzeit wird von Beginn an reserviert. Ein Work Package gilt nicht als vollständig geplant, wenn fachlicher Reviewer, Freigabezeit oder Quality Gate fehlen.

### 18.2 Risk-based Review

Die Reviewtiefe hängt ab von:

- Kunden- und Geschäftsimpact,
- regulatorischer oder Audit-Relevanz,
- Neuheit und Customization,
- Datenunsicherheit,
- Erfahrung des Bearbeiters,
- möglicher Außenwirkung,
- KI- oder Automatisierungsanteil.

### 18.3 Rework Loop

Rework wird mit Ursache erfasst:

- unklare Anforderung,
- fehlende Kundendaten,
- Skill-Mismatch,
- Methodendefekt,
- Qualitätsmangel,
- Scope Change,
- technischer Fehler,
- verspätete Freigabe.

Die Daten dienen Serviceverbesserung und Planung, nicht automatischer Schuldzuweisung.

## 19. Cost-to-Serve

### 19.1 Kostenkomponenten

`Cost-to-Serve = Deliveryzeit + Review + Governance + Reisezeit + Reiseauslagen + Tools + Drittanbieter + Rework + zurechenbarer Overhead`

Die konkrete Bewertungsmethode wird durch den Betreiber konfiguriert. Interne Kostensätze und sensible Vergütungsdaten sind besonders geschützt und nicht für alle Rollen sichtbar.

### 19.2 Plan, Forecast und Ist

Jede Service Instance und jedes Engagement zeigt:

- Commercial Baseline,
- geplanten Cost-to-Serve,
- aktuellen Forecast,
- realisierten Ist-Aufwand,
- Delta und Hauptursachen,
- erwartete Restkosten,
- mögliche Gegenmaßnahmen.

### 19.3 Cost Driver

Typische Treiber:

- hoher Customization-Anteil,
- schlechte Datenqualität,
- viele kleine Unterbrechungen,
- unnötige Vor-Ort-Termine,
- fehlende Kundenmitwirkung,
- Rework,
- Skill-Engpass,
- späte Scope-Änderungen,
- parallele Tools und manuelle Reports,
- unklare Verantwortlichkeiten.

## 20. Portfolio-Profitabilität und wirtschaftliche Steuerung

### 20.1 Kennzahlen

| Kennzahl | Zweck | Guardrail |
|---|---|---|
| Revenue / Recurring Revenue | kommerzieller Umfang | niemals alleinige Priorität |
| Direct Cost-to-Serve | lieferbezogene Kosten | keine verdeckte Personenüberwachung |
| Contribution Margin | Deckungsbeitrag vor zentralem Overhead | zusammen mit Qualität und Risiko lesen |
| Forecast Accuracy | Planungsqualität | Unsicherheit sichtbar halten |
| Rework Cost | vermeidbarer Qualitäts- und Prozessverlust | Ursachen statt Schuldige steuern |
| Travel Ratio | Reiseanteil an Zeit und Kosten | fachliche Notwendigkeit berücksichtigen |
| Standard Work Ratio | Anteil wiederverwendbarer Delivery | keine erzwungene Standardisierung |
| Automation Yield | tatsächlich eingesparte und qualitätsgesicherte Arbeit | keine fiktiven Stundenersparnisse |
| Renewal / Expansion Health | Kundenbindung und sinnvoller Ausbau | nicht durch manipulative Upsells |

### 20.2 Portfolio Views

- Kunden mit positiver Wirkung und gesunder Delivery,
- strategisch wichtige Kunden mit akzeptierter niedrigerer Marge,
- Services mit strukturellem Rework,
- Kunden mit Scope Drift,
- Reise- oder Skillkosten außerhalb Baseline,
- wiederverwendbare Best Practices,
- notwendige Preis-, Scope- oder Prozesskorrektur.

### 20.3 Keine automatische Kündigungsentscheidung

Die Plattform darf unwirtschaftliche Engagements markieren und Optionen simulieren. Kündigung, Leistungsreduktion oder harte kommerzielle Eskalation bleibt menschliche Entscheidung mit Kunden-, Risiko- und Reputationskontext.

## 21. Opportunity Detection und ethische Serviceentwicklung

### 21.1 Opportunity Candidate

Eine Servicechance entsteht, wenn ein belegter Bedarf vorliegt, beispielsweise:

- wiederkehrende interne Kapazitätslücke,
- nicht ausreichend wirksame Controls,
- hohe Audit- oder Reportinglast,
- dauerhaft schlechte Datenqualität,
- fehlende Spezialskills,
- repetitive Arbeit mit Standardisierungspotenzial.

### 21.2 Pflichtinformationen

Jeder Vorschlag zeigt:

- Problem und Evidenz,
- Kunden- und Zielwirkung,
- interne Selbstbetriebsoption,
- Prozess- oder Automatisierungsoption,
- mögliches Managed Service Offer,
- Kosten- und Nutzenannahme,
- Risiken und Interessenkonflikte,
- benötigte menschliche Freigabe.

### 21.3 Trennung von Delivery und Verkauf

Berater dürfen einen fachlichen Bedarf markieren. Kommerzielle Kontaktaufnahme, Preis und Angebot folgen separater Governance. Die Plattform verhindert, dass ein ungeprüfter Risikoscore direkt zu automatischem Verkauf führt.

## 22. Szenario- und Resilienzplanung

Die Operations Engine unterstützt mindestens:

- Ausfall einer Schlüsselperson,
- neue kritische Bedrohung über mehrere Mandanten,
- Auditverschiebung oder kurzfristiger Vor-Ort-Bedarf,
- Budget- oder Scope-Reduktion,
- Verlust eines Drittanbieters,
- starke Nachfrage nach einem Engpass-Skill,
- regionale Reiseeinschränkung,
- hohe Krankheits- oder Urlaubsquote,
- neue große Kunden-Transition,
- Wechsel von Remote zu Onsite,
- ungeplantes Rework in mehreren Engagements.

Ein Szenario zeigt betroffene Commitments, Kunden, Skills, Termine, Reise, Kosten, Qualität und mögliche Maßnahmen. Es verändert nicht automatisch die Baseline.

## 23. Dashboards und rollenbezogene Sichten

### 23.1 Consultant Workspace

- Morning Mission,
- Work Packages und nächste Schritte,
- Kalender, Fokus- und Reiseblöcke,
- wartende Kundeninputs,
- Reviews und Freigaben,
- Handover und Coverage,
- persönliche Lern- und Skillziele.

### 23.2 Engagement Manager Mission Control

- Mandanten mit Handlungsbedarf,
- Commitments und Delivery Health,
- Teamkapazität und Skill-Lücken,
- Reisen und Vor-Ort-Termine,
- Forecast, Cost-to-Serve und Scope Drift,
- Eskalationen, Quality Gates und Coverage,
- fachlich begründete Opportunity Candidates.

### 23.3 Practice / Service Owner

- Nachfrage und Kapazität je Service/Skill,
- Qualitäts- und Reworkmuster,
- Standard Work Ratio,
- Service Health und Portfolio Value,
- Trainings-, Hiring- und Partnerbedarf,
- Methoden- und Workflowverbesserung.

### 23.4 Operations Executive

- skalierbare wiederkehrende Umsätze,
- Kundennutzen und Servicequalität,
- Kapazitäts- und Engpassrisiken,
- Portfolio-Profitabilität,
- Reise- und Delivery-Risiko,
- Resilienz und Coverage,
- strategische Investitionsentscheidungen.

## 24. Notifications und Attention Management

Benachrichtigungen werden nach Handlung statt nach Ereignismenge priorisiert:

- **Now:** kritische SLA-, Kunden-, Sicherheits- oder Reiseentscheidung.
- **Today:** Mission oder Blocker mit Tageswirkung.
- **This Week:** Planungs-, Review- oder Kapazitätsentscheidung.
- **Digest:** Trends, Lessons Learned und Portfolioveränderungen.
- **Silent Log:** Ereignisse ohne direkte Aktion.

Mehrere gleichartige Signale werden gebündelt. Ein Manager erhält keine 40 Einzelnachrichten, wenn eine gemeinsame Skill-Lücke zehn Kunden betrifft.

## 25. Integrationsgrenzen

Dokument 15 definiert benötigte fachliche Integrationsdaten, nicht die technische Implementierung.

| Systemklasse | Benötigte Daten | System of Record |
|---|---|---|
| Kalender | Verfügbarkeit, Termine, Zeitzone, Abwesenheit | Kalender-/HR-System gemäß Betreiberentscheidung |
| HR / Skills | Rolle, Beschäftigungsstatus, Skillfreigabe, organisatorische Zuordnung | HR-/Skill-System |
| PSA / Finance | Vertrag, Umsatz, Kosten, Buchung, Rechnung | PSA/ERP/Finance |
| Travel | Buchung, Kosten, Status, Storno | Travel-System |
| Ticketing | technische Tasks und Incidents | Ticketing/SecOps |
| ISMS Platform | Work Packages, Zielwirkung, Service, Decisions, Evidence | diese Plattform |

Die Plattform darf keine vollständige HR-, Lohn-, Reisebuchungs- oder ERP-Lösung nachbauen. Sie orchestriert und übersetzt relevante Daten in Delivery-Entscheidungen.

## 26. Automatisierung und KI-Unterstützung

### 26.1 Deterministische Automatisierung

Geeignet sind:

- Work Packages aus Servicekalender erzeugen,
- bekannte Abhängigkeiten und Quality Gates anlegen,
- SLA- und Terminrisiken berechnen,
- fehlende Coverage erkennen,
- Kalenderkonflikte markieren,
- Reise- und Vor-Ort-Anforderungen in Kapazität übernehmen,
- Handover Packet aus strukturierten Daten zusammenstellen,
- Forecast-Deltas und Rework-Ursachen aggregieren.

### 26.2 KI-gestützte Funktionen

Mögliche, nicht zwingende Erweiterungen:

- unstrukturierte Kundenanfrage in Demand Item überführen,
- Work-Package-Vorlage vorschlagen,
- Staffing-Optionen verständlich erklären,
- Handover und Morning Briefing formulieren,
- ähnliche Delivery-Muster und Lessons Learned finden,
- Scope-Drift- oder Reworkmuster zur Prüfung markieren,
- Szenarien und Managementnarrative entwerfen.

### 26.3 Guardrails

KI darf nicht autonom:

- Personal negativ bewerten,
- kritische Arbeit endgültig zuweisen,
- Kunden- oder Preisverpflichtungen eingehen,
- Reise buchen,
- Interessenkonflikte freigeben,
- Quality Gates bestehen lassen,
- Mitarbeiterüberwachung oder Kündigungsentscheidungen unterstützen.

## 27. Sicherheit, Datenschutz und Fairness

### 27.1 Datenminimierung

Gespeichert werden nur operative Daten, die für Delivery, Skill, Rechte, Planung, Sicherheit oder Governance erforderlich sind. Gesundheitsdaten, private Reisegründe, Vergütungsdetails und persönliche Kommunikation gehören nicht in das Operations-Modell, sofern keine ausdrückliche rechtliche Grundlage besteht.

### 27.2 Rollenbasierte Sichtbarkeit

- Consultant sieht eigene Assignments und notwendigen Kundenkontext.
- Engagement Manager sieht Team- und Kundenplanung, aber nicht automatisch sensible HR- oder Kostendetails.
- Commercial Owner sieht Kosten und Marge gemäß Berechtigung.
- HR-/Practice-Funktion sieht Entwicklung und Verfügbarkeit, aber nicht unnötige Kundendetails.
- Kunde sieht zugesagte Rollen, Termine und Delivery - keine internen Personalkosten oder vertrauliche Staffing-Erwägungen.

### 27.3 Auditierbarkeit

Staffing, Overrides, Scope Changes, Reise- und Kapazitätsentscheidungen, Quality-Gate-Ausnahmen und kommerzielle Eskalationen werden versioniert protokolliert.

### 27.4 Fairness Review

Matching- und Priorisierungslogik wird auf systematische Benachteiligung geprüft, etwa durch Region, Teilzeit, Elternzeit, Behinderung, Reiseeinschränkung oder fehlende Sichtbarkeit im Netzwerk. Erklärbarkeit und menschlicher Einspruch sind Pflicht.

## 28. Fehler-, Sonder- und Krisenfälle

### 28.1 Schlüsselperson fällt aus

Coverage Plan aktivieren, Handover Packet freigeben, kritische Commitments neu bewerten, Kundenkommunikation vorbereiten und nötigenfalls Scope oder SLA eskalieren.

### 28.2 Kalenderdaten fehlen oder sind falsch

Confidence sinkt, Auto-Assignment wird gesperrt und betroffene Personen bestätigen Verfügbarkeit manuell.

### 28.3 Reise fällt kurzfristig aus

Remote-Ersatz, Terminverschiebung, lokale Vertretung oder Reiseumbuchung werden als Optionen mit Wirkung auf Audit, Kosten und Kunde gezeigt.

### 28.4 Skill ist vorhanden, aber Zertifikat abgelaufen

Person kann je nach Policy als Bearbeiter, nicht aber als freigabeverantwortlicher Lead vorgeschlagen werden. Ausnahme benötigt dokumentierte Freigabe.

### 28.5 Kunde liefert Daten nicht

Work Package wird nicht still als verspätet dem Berater zugerechnet. Kundenabhängigkeit, Reminder, Eskalation, Forecast und mögliche Scope-/SLA-Auswirkung werden getrennt behandelt.

### 28.6 Engagement wird unwirtschaftlich

Ursachenanalyse, Serviceverbesserung, Scope- oder Preis-Change, Standardisierung und Kundenentscheidung werden vorbereitet. Keine automatische Leistungsreduktion.

### 28.7 Kritische Bedrohung betrifft viele Mandanten

Portfolio Incident Mode aktiviert gemeinsame Analyse, Standard-Work-Package, Skill-Pool, Kundenpriorisierung, getrennte Mandantendaten und zentrale Quality Assurance.

## 29. KPIs und Anti-KPIs

### 29.1 Operative KPIs

| Kategorie | KPI | Interpretation |
|---|---|---|
| Wirkung | risikorelevante Outcomes abgeschlossen | nicht bloß Task-Zahl |
| Commitments | termingerecht und qualitätsgesichert geliefert | mit Kundenabhängigkeiten getrennt |
| Kapazität | belastbare Coverage und Puffer | nicht maximale Auslastung |
| Qualität | First-Time-Right und Review-Ergebnis | Reworkursache sichtbar |
| Resilienz | kritische Rollen mit aktiver Coverage | nicht nur benannte Backup-Person |
| Reise | geplante versus ungeplante Reise, Bündelung, Ausfall | zusammen mit fachlicher Notwendigkeit |
| Standardisierung | Wiederverwendung freigegebener Work Packages | Delta und Ausnahme sichtbar |
| Wirtschaft | Forecast, Cost-to-Serve, Contribution Margin | gemeinsam mit Kundennutzen und Qualität |
| Kunde | Mitwirkung, Entscheidungen, Service Health | keine simplistische Zufriedenheitsampel |
| Lernen | Skill-Lücke geschlossen, Lessons Learned umgesetzt | nicht Anzahl Trainingsstunden allein |

### 29.2 Anti-KPIs

Nicht als primäre Erfolgskennzahlen verwenden:

- betreute Mandanten pro Berater ohne Komplexitätskontext,
- abrechenbare Stunden als alleinige Leistung,
- Anzahl geschlossener Tasks,
- niedrige Reisekosten ohne Qualitätskontext,
- Marge ohne Risiko- und Servicequalität,
- KI-generierte oder automatisierte Outputs ohne Wirksamkeitsnachweis,
- durchschnittlicher Health Score über heterogene Kunden.

## 30. Synthetische Demo-Daten und Demo-Dramaturgie

### 30.1 Demo-Portfolio

Die Demonstration enthält ausschließlich synthetische Unternehmen und Personen. Beispiel:

| Mandant | Situation | Ziel | Operations-Signal |
|---|---|---|---|
| Rheinwerk Manufacturing SE | drei Standorte, Audit in 42 Tagen | ISO 27001, Reifegrad 3,5 | Vor-Ort-Audit, Skill- und Reisecluster |
| Nordhafen Health GmbH | kritische Lieferanten und knappe interne Kapazität | regulatorische Mindestsicherheit | Managed Supplier Risk und Coverage-Lücke |
| Elbfin Digital Bank AG | hohe regulatorische und Board-Reporting-Last | Reifegrad 4 | Senior Review und Board Pack |
| HanseCloud Services GmbH | neue kritische Schwachstelle | risikobasierte Stabilisierung | Portfolio Incident Mode |
| Südlicht Mobility KG | mehrere kleine Work Packages und Scope Drift | kosteneffiziente Route | Rework- und Cost-to-Serve-Warnung |

### 30.2 Demo-Rollen

- Engagement Manager „Mara Klein“ mit fünf Mandanten,
- Consultant „Jonas Weber“ mit Morning Mission und Reiseblock,
- Audit Lead „Leila Haddad“ mit Skill- und Unabhängigkeitsanforderung,
- Quality Reviewer „Dr. Eva Sommer“,
- Practice Manager „Daniel Ortiz“,
- Customer CISO „Nina Hartmann“.

Alle Namen, Unternehmen, Preise, Reisen und Termine sind synthetisch.

### 30.3 Zehn verbindliche Demo-Szenen

1. Engagement Manager öffnet Portfolio Mission Control und sieht drei begründete Prioritäten.
2. Eine neue Schwachstelle erzeugt Demand Items für mehrere Mandanten, ohne Daten zu vermischen.
3. Standard-Work-Package und Skill-Pool werden vorgeschlagen.
4. Staffing Engine erklärt drei Kandidaten und markiert einen Interessenkonflikt.
5. Capacity Ledger zeigt, dass ein scheinbar freier Senior durch Reise und Review nicht belastbar verfügbar ist.
6. Zwei Vor-Ort-Termine werden als Reisecluster simuliert; Kosten, Zeit und Belastung sind sichtbar.
7. Ein Audit Lead fällt aus; Coverage und Handover Packet stabilisieren die Delivery.
8. Scope Drift erhöht Cost-to-Serve; Plattform bereitet Service- und Commercial Review vor.
9. Consultant erzeugt aus dem Kundenkontext ein freigabefähiges Meeting-/Board-Paket über Dokument 12.
10. Practice Manager sieht, dass wiederkehrendes Rework einen neuen Workflow oder Training statt mehr Personal erfordert.

## 31. Globale Akzeptanzkriterien

| ID | Kriterium |
|---|---|
| D15-01 | Jede operative Priorität besitzt Kunden-, Service- oder Zielbezug und eine verständliche Begründung. |
| D15-02 | Work Packages besitzen Outcome, Scope, Skills, Aufwand, Owner, Quality Gate und Evidence-Anforderung. |
| D15-03 | Kapazität berücksichtigt mindestens Abwesenheit, Commitments, Review, Reise und Reserve. |
| D15-04 | Kritische Arbeit kann nicht ohne zulässige Skills, Rechte, Konfliktprüfung und Coverage freigegeben werden. |
| D15-05 | Vor-Ort-Termine enthalten Vor-/Nachbereitung, Reisezeit, Kosten und Bestätigung. |
| D15-06 | Reise- und Staffing-Vorschläge sind erklärbar und benötigen bei kritischen Fällen menschliche Freigabe. |
| D15-07 | Kundenabhängigkeiten und interne Delivery-Verzögerungen werden getrennt ausgewiesen. |
| D15-08 | Cost-to-Serve und Profitabilität sind versioniert, rollenbasiert und mit Ursachen erklärbar. |
| D15-09 | Personenbezogene Daten und individuelle Leistungsdaten sind minimiert und geschützt. |
| D15-10 | Handover und Coverage erlauben Wiederaufnahme ohne Chat- oder Einzelpersonenabhängigkeit. |
| D15-11 | Portfolio-Szenarien verändern keine Baseline ohne Freigabe. |
| D15-12 | Opportunity Candidates enthalten interne Alternativen und führen nicht automatisch zu Verkauf. |
| D15-13 | Demo-Daten sind vollständig synthetisch und zeigen mehrere Unternehmen, Rollen, Reisen und Servicezustände. |
| D15-14 | Anti-KPIs verhindern eine Optimierung ausschließlich auf Auslastung, Task-Zahl oder Marge. |
| D15-15 | Das Modul bleibt auch ohne KI funktionsfähig; KI-Unterstützung ist ergänzend und kontrolliert. |

## 32. Festgelegte Entscheidungen

- **ENTSCHEIDUNG 15-01:** Die Beraterwelt wird als Operations Center und nicht als persönliche To-do-App definiert.
- **ENTSCHEIDUNG 15-02:** Portfolio-Priorisierung nutzt mehrere erklärbare Dimensionen statt eines einzigen Health Scores.
- **ENTSCHEIDUNG 15-03:** Demand Item, Work Package, Resource Profile, Capacity Ledger, Assignment, Visit, Travel Leg, Coverage Plan und Delivery Snapshot sind kanonische Objekte.
- **ENTSCHEIDUNG 15-04:** Reisezeit ist Kapazität und Cost-to-Serve; Vor-Ort-Termine enthalten Vor- und Nachbereitung.
- **ENTSCHEIDUNG 15-05:** Kapazitätsplanung reserviert Review-, Governance-, Lern- und Event-Puffer.
- **ENTSCHEIDUNG 15-06:** Staffing berücksichtigt Skill, Kontext, Verfügbarkeit, Rechte, Reise, Kontinuität, Konflikte und Kosten.
- **ENTSCHEIDUNG 15-07:** Kritische Assignments und Personal-/Kundenentscheidungen benötigen menschliche Freigabe.
- **ENTSCHEIDUNG 15-08:** Coverage und Handover sind verpflichtende Qualitätsmerkmale für kritische Services.
- **ENTSCHEIDUNG 15-09:** Cost-to-Serve wird von personenbezogener Leistungsbewertung getrennt.
- **ENTSCHEIDUNG 15-10:** Opportunity Detection bleibt fachlich begründet, transparent und von kommerzieller Freigabe getrennt.
- **ENTSCHEIDUNG 15-11:** Work-Package-Vorlagen sind versioniert, mandantenneutral und Delta-fähig.
- **ENTSCHEIDUNG 15-12:** Die Plattform bildet keine vollständige HR-, ERP-, PSA- oder Reisebuchungslösung nach.
- **ENTSCHEIDUNG 15-13:** Die Operations Engine muss ohne KI funktionsfähig sein.
- **ENTSCHEIDUNG 15-14:** Mitarbeitergesundheit, Fairness und Datenschutz sind harte Planungs- und Designgrenzen.
- **ENTSCHEIDUNG 15-15:** Alle Demo-Personen, Kunden, Termine, Preise und Reisen sind synthetisch.

## 33. Begründete Annahmen

- **ANNAHME 15-A01:** Ein Engagement Manager kann je nach Komplexität deutlich mehr Kunden überblicken als heute, wenn Signale, Standards und Handover belastbar sind; eine feste Kundenzahl wird nicht als Produktversprechen gesetzt.
- **ANNAHME 15-A02:** Kalender-, HR-, PSA- und Travel-Daten können in einer ersten Produktfassung teilweise synthetisch oder manuell gepflegt werden.
- **ANNAHME 15-A03:** Viele wiederkehrende ISMS-Tätigkeiten lassen sich als versionierte Work Packages modellieren.
- **ANNAHME 15-A04:** Kapazitäts- und Cost-to-Serve-Transparenz verbessert Planung und Servicegestaltung, sofern sie nicht zur Überwachung missbraucht wird.
- **ANNAHME 15-A05:** Reisecluster erzeugen in geeigneten Situationen Zeit-, Kosten- und Nachhaltigkeitsvorteile, müssen aber individuell freigegeben werden.
- **ANNAHME 15-A06:** Skill-Daten brauchen menschliche Governance und können nicht zuverlässig allein aus Lebenslauf oder Chatverlauf abgeleitet werden.
- **ANNAHME 15-A07:** Kunden akzeptieren sichtbare Rollen- und Coverage-Modelle, wenn interne Personalkosten und vertrauliche Daten geschützt bleiben.
- **ANNAHME 15-A08:** Ein belastbarer Handover-Standard reduziert Single-Point-of-Failure und Wiederanlaufzeit.
- **ANNAHME 15-A09:** Standardisierung steigert Marge vor allem durch weniger Rework und schnelleren Kontextaufbau, nicht durch Qualitätsreduktion.
- **ANNAHME 15-A10:** Arbeitszeit-, Betriebsrats- und Datenschutzanforderungen unterscheiden sich nach Betreiber und Region und müssen konfigurierbar bleiben.

## 34. Offene Fragen

1. Welche Kalender-, HR-, PSA-, Finance- und Travel-Systeme sind für die erste reale Zielumgebung relevant?
2. Welche personenbezogenen Kapazitätsdaten dürfen in welchen Ländern und Organisationsmodellen verarbeitet werden?
3. Welche Rollen dürfen interne Kostensätze, Marge und individuelle Forecasts sehen?
4. Welche Load Bands gelten je Rolle, Service und Betriebsmodell?
5. Wie wird Context Switching empirisch bewertet, ohne Scheingenauigkeit zu erzeugen?
6. Welche Work Packages eignen sich für regelbasiertes Auto-Assignment?
7. Welche Unabhängigkeitsregeln gelten zwischen Beratung, Implementierung und Audit/Assurance?
8. Welche Reisezeit ist in welchen Servicepaketen enthalten und wie wird sie bewertet?
9. Welche Buchungs- und Stornopolicies sollen technisch erzwungen oder nur angezeigt werden?
10. Wie werden externe Spezialisten und Partner in Skill, Zugriff, QA und Cost-to-Serve integriert?
11. Welche Daten darf ein Kunde über Staffing, Backup und Teamwechsel sehen?
12. Wie werden Arbeitszeit, Teilzeit, Reiseeinschränkung und Barrierefreiheit fair in Matching berücksichtigt?
13. Welche Portfolio-Profitabilitätsmetriken werden produktiv genutzt und welche bleiben Finance-Systemen vorbehalten?
14. Welche Mindest-Coverage ist für einzelne Service Offers und SLA-Bänder verbindlich?
15. Welche Teile der Ressourcenplanung sind Produktkern und welche primär Integration?

## 35. Ideen für später

- Privacy-preserving Benchmarking von Work-Package-Aufwänden,
- CO2- und Nachhaltigkeitsoptimierung für Reise und Cloud-Delivery,
- simulationsgestütztes Hiring- und Partnernetzwerk,
- Kompetenzentwicklung durch Shadow Assignments und Lernrouten,
- regionales Follow-the-Sun-Servicezentrum,
- automatisierte, aber menschlich freigegebene Reisebuchung,
- mobile Visit-App für sichere Vor-Ort-Erfassung,
- Offline-Modus für Audits an Standorten mit eingeschränkter Verbindung,
- adaptive Work-Package-Schätzung aus historischen, anonymisierten Daten,
- Team- und Kundensentiment als freiwilliges, datenschutzsensibles Signal,
- Optimierung auf Wert, Qualität, Gesundheit, Kosten und Nachhaltigkeit als Multi-Objective-Simulation,
- Partner-Marktplatz für seltene Skills mit standardisierter QA und Handover.

## 36. Dokumentenabhängigkeiten

- **Dokument 03:** Rollen, Ziele, Frustpunkte und reale Arbeitssituationen.
- **Dokument 04:** Nutzerreisen vom Morning Briefing bis Audit, Reporting und Serviceänderung.
- **Dokument 05:** Module M02, M15, M27 und vollständige Produktlandkarte.
- **Dokument 06:** Beraterwelt, Navigation, Mission Control und Trust Layer.
- **Dokument 07:** Unternehmenszwilling, Objektbeziehungen und Datenherkunft.
- **Dokument 08:** fachliche ISMS-Prozesse und Audit-/Management-Review-Rhythmen.
- **Dokument 09:** Risiko-, Threat-, Control- und Confidence-Signale.
- **Dokument 10:** Morning Mission, Route Engine, KPIs und Simulationen.
- **Dokument 11:** Work Items, Collaboration, Escalation und Handover.
- **Dokument 12:** PDF-, PowerPoint- und Reporting-Deliverables.
- **Dokument 13:** Service Instance, Delivery-Zyklen, Service Health und Betriebsmodell.
- **Dokument 14:** Service Offers, Commercial Baseline, Preis-, SLA-, Reise- und Unit-Economics-Logik.
- **Dokument 16:** Kunden-Onboarding, initiale Staffing-/Serviceplanung und Lifecycle.
- **Dokument 17:** technische Kalender-, HR-, PSA-, Travel-, Ticketing- und Datenintegrationen.
- **Dokument 18:** Architektur, Events, Datenhaltung, Skalierung und Plattformbetrieb.
- **Dokument 19:** Rechte, Datenschutz, Mandantentrennung, Auditierbarkeit und Sicherheitsanforderungen.
- **Dokument 20A:** KI-Funktionen und Guardrails.
- **Dokument 20B:** Agentenfirma und Rollenorganisation.
- **Dokument 20C:** Claude Code, GitHub, Checkpoints und Umsetzungsbetrieb.

## 37. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstfassung mit Portfolio Mission Control, Demand/Work Packages, Capacity Ledger, Skills, Staffing, Kalender, Audit/Vor-Ort, Reise, Coverage, Qualität, Cost-to-Serve, Profitabilität, Fairness, Demo und Governance | Erstellt |
