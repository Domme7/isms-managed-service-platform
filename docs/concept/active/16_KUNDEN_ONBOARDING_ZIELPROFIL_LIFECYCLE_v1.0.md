# Dokument 16 – Kunden-Onboarding, Zielprofil & Lifecycle

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 22.07.2026  
**Abhängigkeiten:** Dokument 00 bis 15  
**Primäre Nachfolger:** Dokument 17 bis 20C

---

## 1. Auftrag und Abgrenzung

Dokument 16 ist die kanonische Quelle für die Anlage, Qualifizierung, Zieldefinition, Baseline, Transition, Aktivierung, Weiterentwicklung, Reduktion und Beendigung eines Kundenverhältnisses auf der ISMS Managed Service Platform. Es konkretisiert, wie aus einem zunächst unvollständigen Kundenbild ein belastbarer, freigegebener und betreibbarer digitaler Unternehmenszwilling mit individueller Strategie-DNA, Zielprofil, Zielroute, Shared-Responsibility-Modell, Servicekonfiguration und Operational Readiness entsteht.

Das Dokument beantwortet insbesondere:

- Wie wird ein neuer Kunde schnell, verständlich und kontrolliert in die Plattform aufgenommen?
- Welche Daten und Entscheidungen werden wann benötigt, ohne den Einstieg zu einem monatelangen Formularprojekt zu machen?
- Wie werden Scope, regulatorische Ziele, Risikobereitschaft, Reifegradziele, Budget, interne Kapazität und gewünschter Managed-Service-Anteil gemeinsam modelliert?
- Wie entsteht aus unsicheren Startdaten eine belastbare Baseline mit sichtbarer Datenqualität und Confidence?
- Wie werden mehrere realistische Zielrouten erzeugt, verglichen, freigegeben und später neu berechnet?
- Wie leitet die Plattform passende Managed Services ab, ohne automatisches oder angstbasiertes Cross-Selling?
- Wie verändert sich die Plattformoberfläche vom Anfänger-Onboarding zum reifen Regelbetrieb?
- Wie werden Wachstum, Scope-Wechsel, Serviceausbau, Reduktion, Pause, Internalisierung und Exit sauber unterstützt?

Nicht Gegenstand dieses Dokuments sind die vollständige technische Integrationsarchitektur, konkrete Cloud- und Datenbankentscheidungen, produktive Datenschutzkonfigurationen, finale KI-Modelle und die Claude-Code-Agentenfirma. Diese werden in Dokument 17 bis 20C festgelegt. Preise und kommerzielle Bänder werden in Dokument 14 definiert; dieses Dokument beschreibt nur, wann kommerzielle Informationen für die Operational Readiness benötigt werden.

## 2. Executive Summary

Onboarding ist kein einmaliger Datenimport und kein Wizard, der nach dem letzten Schritt verschwindet. Es ist der **kontrollierte Übergang von einer Annahme über den Kunden zu einem betreibbaren Sicherheits- und Service-System**. Die Plattform führt den Kunden und die Beratung von der ersten Orientierung bis zu einem freigegebenen Zielbild und anschließend in einen lernenden Lifecycle.

Der Einstieg beginnt bewusst mit wenigen Fragen: Was muss geschützt werden? Warum? Welche Verpflichtungen und Termine existieren? Welche Risiken akzeptiert das Unternehmen? Welche Kapazität ist intern vorhanden? Was soll selbst gesteuert und was als Managed Service übernommen werden? Erst danach wird die Tiefe schrittweise erhöht.

Aus diesen Angaben entstehen fünf miteinander verbundene Ergebnisse:

1. ein belastbarer Unternehmens- und ISMS-Scope,
2. eine versionierte Strategie-DNA,
3. ein individuelles Zielprofil mit messbaren Zielzuständen,
4. eine Baseline mit Datenqualität und Confidence,
5. eine freigegebene Zielroute inklusive Verantwortungen, Services, Budgetkorridor und Meilensteinen.

Die Plattform bietet drei Einstiegspfade: **Guided Quickstart**, **Collaborative Workshop** und **Structured Import**. Alle Wege enden in denselben kanonischen Objekten und Quality Gates. Ein kleiner Kunde kann innerhalb weniger Stunden eine arbeitsfähige erste Version erhalten; ein komplexer, regulierter Kunde kann mehrere Workshops, Imports, Reviews und Freigaben durchlaufen, ohne dass ein separates Produktmodell entsteht.

Der Lifecycle endet nicht mit „Go-live“. Zielprofil, Scope, Risikobereitschaft, Budget und Serviceanteil werden regelmäßig oder ereignisbezogen überprüft. Bei Akquisitionen, neuen Standorten, Regulierung, Bedrohungen, Budgetkürzungen oder Strategiewechseln berechnet die Plattform Auswirkungen und Routen neu. Der Kunde kann Managed Services ausbauen, reduzieren, internalisieren oder geordnet beenden, ohne seine Daten, Historie oder Entscheidungsnachweise zu verlieren.

[[FIGURE:FIG1]]

## 3. Onboarding- und Lifecycle-Verfassung

### 3.1 Verbindliche Grundprinzipien

- **OL01 – Ziel vor Vollständigkeit:** Der Kunde soll früh einen verständlichen Nutzen und eine erste Route sehen; Daten werden kontrolliert vervollständigt, statt den Nutzen bis zur perfekten Datenlage aufzuschieben.
- **OL02 – Kundenrealität vor Standardideal:** Reifegrad 5, Zertifizierung oder maximale Control-Abdeckung sind keine automatischen Ziele. Zielzustände folgen Geschäft, Risiko, Regulierung, Budget und Kapazität.
- **OL03 – Eine Wahrheit, mehrere Einstiegspfade:** Quickstart, Workshop und Import erzeugen dieselben kanonischen Objekte, Versionen und Freigaben.
- **OL04 – Jede Annahme bleibt sichtbar:** Unbestätigte Scope-, Risiko-, Budget- und Kapazitätsannahmen werden nicht als Fakten dargestellt.
- **OL05 – Progressiver Tiefgang:** Anfänger erhalten Orientierung und kleine Entscheidungen; Experten können Methodik, Gewichtung, Datenherkunft und Abhängigkeiten prüfen.
- **OL06 – Datenminimierung:** Nur für Ziel, Betrieb, Sicherheit, Vertrag oder Nachweis notwendige Daten werden erhoben.
- **OL07 – Menschliche Freigabe:** Scope, Zielprofil, Risikotoleranz, Serviceübernahme, kommerzielle Baseline und Go-live benötigen definierte menschliche Entscheidungen.
- **OL08 – Reversibilität:** Imports, Mappings, Zielprofile und Servicekonfigurationen sind versioniert, prüfbar und kontrolliert rücksetzbar.
- **OL09 – Kein Lock-in:** Der Kunde kann Daten, Nachweise, Entscheidungen und Konfigurationen exportieren und Services reduzieren oder beenden.
- **OL10 – Shared Responsibility ist explizit:** Jede relevante Tätigkeit hat Kunde, Provider, gemeinsame oder automatisierte Verantwortung.
- **OL11 – Operational Readiness vor Go-live:** Ein Service wird nicht aktiv, bevor Daten, Rollen, Zugriff, Verfahren, Quality Gates, Eskalation und Exit-Mindestanforderungen geklärt sind.
- **OL12 – Datenvertrauen vor Scheingenauigkeit:** Baseline, Route und Empfehlungen zeigen Confidence, Datenlücken und verwendete Annahmen.
- **OL13 – Lifecycle statt Projektabschluss:** Onboarding-Ergebnisse werden im Regelbetrieb weitergeführt und ereignisbezogen aktualisiert.
- **OL14 – Kommerzielle Transparenz:** Serviceempfehlungen zeigen fachliche Begründung, Alternativen, erwartete Wirkung, interne Eigenleistung und Kostenlogik.
- **OL15 – Keine stille Scope-Ausweitung:** Neue Einheiten, Assets, Frameworks oder Services erzeugen einen sichtbaren Impact- und Freigabeprozess.
- **OL16 – Wirkung in jeder Phase:** Nutzer sehen, welcher Fortschritt bereits erreicht wurde, welche Entscheidung noch fehlt und welcher nächste Schritt den größten Nutzen bringt.

### 3.2 Was ausdrücklich vermieden wird

- ein 200-Felder-Formular als erster Kontakt,
- erzwungene Zertifizierungsziele für jeden Kunden,
- Reifegradwerte ohne Scope, Methodik, Evidence oder Confidence,
- automatisch gebuchte Managed Services,
- versteckte Preis- oder Scopeänderungen,
- Datenimporte ohne Herkunft, Mapping und Validierung,
- ein Zielprofil, das nur im Onboarding existiert und im Betrieb nicht verwendet wird,
- pauschale Empfehlungen ohne Budget- und Kapazitätsbezug,
- Go-live trotz ungeklärter Rollen, Zugriffe oder Eskalationswege,
- stilles Überschreiben historischer Baselines,
- Exit-Prozesse, bei denen Daten oder Nachweise verloren gehen,
- eine Demo, die produktive Unternehmensdaten oder interne Beratungsvorlagen benötigt.

## 4. Kanonische Onboarding- und Lifecycle-Objekte

### 4.1 Customer Account

Der **Customer Account** ist der oberste Mandantenkontext. Er enthält rechtliche und operative Identität, zulässige Datenregion, primäre Stakeholder, Vertrags- und Servicebezug, Status, Lifecycle-Phase und Verweise auf alle untergeordneten Scopes und Engagements.

### 4.2 Organization Profile

Das **Organization Profile** beschreibt die für Sicherheitssteuerung relevante Unternehmensstruktur: Einheiten, Standorte, Regionen, Geschäftsmodelle, kritische Produkte, Prozesse, Verantwortungen, Sprachen und Zeitzonen. Es ersetzt kein HR- oder ERP-System, sondern referenziert nur benötigte Strukturen.

### 4.3 Onboarding Case

Der **Onboarding Case** ist der versionierte Arbeitscontainer für einen Einstieg, eine Erweiterung oder eine wesentliche Re-Transition. Er enthält Ziel, Einstiegspfad, Owner, Teilnehmer, Aufgaben, Imports, Annahmen, Entscheidungen, Quality Gates, Timeline, Risiken und Status.

### 4.4 Scope Proposal und Approved Scope

Ein **Scope Proposal** ist ein noch nicht freigegebener Vorschlag mit Ein- und Ausschlüssen, Begründung, Abhängigkeiten, Datenlücken und Auswirkungen. Nach Freigabe entsteht eine versionierte **Approved Scope**-Version. Historische Versionen bleiben rekonstruierbar.

### 4.5 Strategy DNA

Die **Strategie-DNA** ist die versionierte Sicherheits- und Betriebsphilosophie des Kunden. Sie beeinflusst Priorisierung, Schwellenwerte, Zieltiefe, Nachweisintensität, Kommunikationsform, Automatisierungsgrad und Managed-Service-Anteil.

### 4.6 Target Profile

Das **Target Profile** beschreibt den gewünschten Zielzustand für definierte Capabilities, Risiken, Controls, Prozesse, Verpflichtungen und Termine. Es kann mehrere Zielarten kombinieren und muss nicht auf Audit- oder Zertifizierungsbereitschaft ausgerichtet sein.

### 4.7 Baseline Assessment

Die **Baseline Assessment** ist die freigegebene Ausgangsbewertung mit Stichtag, Scope, Methodik, Datenquellen, Findings, Reife, Risiken, Control-Abdeckung, Datenqualität und Confidence. Sie ist kein unveränderlicher Wahrheitsanspruch, sondern ein nachvollziehbarer Startpunkt.

### 4.8 Target Route

Eine **Target Route** ist ein versionierter Weg vom Ausgangszustand zum Zielprofil. Sie enthält Meilensteine, Work Packages, Abhängigkeiten, Verantwortungen, Services, Zeit, Budgetkorridor, erwartete Wirkung, Risiken und Confidence.

### 4.9 Responsibility Blueprint

Der **Responsibility Blueprint** ordnet Capabilities, Prozesse, Work Packages und Entscheidungen dem Kunden, Provider, gemeinsamen Teams oder deterministischen Automationen zu. Er ist die onboardingbezogene Ausprägung des Shared-Responsibility-Modells aus Dokument 13.

### 4.10 Operational Readiness Record

Der **Operational Readiness Record** dokumentiert, ob Daten, Rollen, Zugriff, Verfahren, Service Charter, Quality Gates, Eskalation, Reporting, Sicherheit und Exit-Mindestanforderungen für Go-live erfüllt sind.

### 4.11 Lifecycle Event

Ein **Lifecycle Event** ist eine Veränderung mit möglicher Auswirkung auf Scope, Ziel, Baseline, Route, Services oder Verantwortung. Beispiele sind Akquisition, Standorteröffnung, neue Regulierung, Budgetänderung, Providerwechsel, Incident, Reorganisation oder Auditentscheidung.

### 4.12 Customer Snapshot

Ein **Customer Snapshot** friert zu einem Stichtag Scope, Strategie-DNA, Zielprofil, Baseline, Route, Services, Verantwortungen, Confidence und offene Entscheidungen ein. Er dient Vergleich, Management Review, Export, Transition und Auditierbarkeit.

## 5. Lifecycle-Modell

### 5.1 Kanonische Phasen

| Phase | Ziel | Zentrale Ergebnisse | Exit Gate |
|---|---|---|---|
| 0. Prospect / Sandbox | Produkt und Nutzen sicher demonstrieren | synthetischer Account, Demo-Story, unverbindliche Hypothesen | qualifizierter Einstieg oder Abschluss |
| 1. Qualification | Eignung, Ziel und Verantwortliche klären | Onboarding Charter, Stakeholder, Scope-Hypothese | Sponsor und Onboarding Owner bestätigt |
| 2. Foundation | Organisation, Rollen, Zugriffe und Datenrahmen anlegen | Customer Account, Organization Profile, Rollen, Datenplan | Mindeststruktur vollständig |
| 3. Discover | Scope, Verpflichtungen, Assets und Ist-Zustand verstehen | Scope Proposal, Imports, Interviews, Datenlücken | Scope Review möglich |
| 4. Design | Strategie-DNA, Zielprofil, Verantwortung und Route entwerfen | Target Profile, Route Options, Service Mix | Entscheidungen vorbereitet |
| 5. Validate | Baseline, Route, Kosten, Kapazität und Risiken prüfen | Baseline, Confidence, Simulation, Readiness Plan | Freigaben möglich |
| 6. Transition | Daten, Workflows, Services und Teams betriebsbereit machen | Service Charter, Responsibility Blueprint, Runbooks | Operational Readiness bestanden |
| 7. Activate | kontrollierter Go-live | aktive Services, Mission Control, Reporting | Hypercare gestartet |
| 8. Operate & Improve | Ziele erreichen und Betrieb verbessern | Reviews, neue Snapshots, Value Ledger | fortlaufend |
| 9. Change | Scope, Ziel, Service oder Organisation anpassen | Impact Assessment, neue Versionen | Änderung freigegeben |
| 10. Reduce / Internalize / Exit | Leistungen geordnet reduzieren oder übergeben | Export, Handover, Revocation, Abschlussbericht | Exit Acceptance |

Phasen können überlappen, aber Quality Gates dürfen nicht still übersprungen werden. Ein kleiner Kunde kann Foundation, Discover und Design in einem geführten Workshop durchlaufen; ein regulierter Konzern kann mehrere Scopes und parallele Onboarding Cases besitzen.

[[FIGURE:FIG2]]

### 5.2 Status eines Onboarding Case

`Draft → Qualified → In Discovery → In Design → In Validation → In Transition → Ready for Activation → Active → Closed`

Querschnittsstatus sind `Blocked`, `On Hold`, `Rework Required`, `Cancelled` und `Superseded`. Jeder Statuswechsel benötigt Owner, Zeitpunkt, Grund und nächsten erwarteten Schritt.

## 6. Qualification und Onboarding Charter

### 6.1 Mindestfragen der Qualification

1. Welches konkrete Problem oder Ziel soll die Plattform lösen?
2. Welche Organisation oder welcher Scope ist betroffen?
3. Welche geschäftlichen, regulatorischen oder terminlichen Treiber existieren?
4. Wer ist Sponsor, fachlicher Owner und operativer Ansprechpartner?
5. Welche Daten sind vorhanden und wie belastbar sind sie?
6. Welche internen Fähigkeiten und Kapazitäten existieren?
7. Welche Leistungen sollen intern bleiben, gemeinsam erfolgen oder übernommen werden?
8. Gibt es Unabhängigkeits-, Interessenkonflikt-, Datenresidenz- oder Sicherheitsgrenzen?
9. Welcher Einstiegspfad ist angemessen?
10. Was muss innerhalb der ersten 30 Tage sichtbar erreicht werden?

### 6.2 Onboarding Charter

Die Charter enthält mindestens:

- Ziel und Nicht-Ziele,
- vorläufigen Scope und Ausschlüsse,
- Sponsor, Onboarding Owner, Customer Owner und Provider Lead,
- Einstiegspfad und geplante Phasen,
- erwartete Deliverables,
- Entscheidungs- und Eskalationsrechte,
- Daten- und Zugriffsvoraussetzungen,
- Termin- und Budgetkorridor,
- Risiken, Annahmen und Abbruchkriterien,
- Definition of Ready für Foundation.

### 6.3 Eignungs- und Risikoprüfung

Die Plattform markiert frühzeitig:

- fehlenden Sponsor oder fehlende Entscheidungsfähigkeit,
- unrealistische Termine oder Budgets,
- regulatorische Ziele ohne erforderliche Rollen und Evidence,
- Services, die wegen Unabhängigkeit oder Interessenkonflikt nicht zulässig sind,
- Daten, die außerhalb unterstützter Regionen oder Schutzklassen liegen,
- Erwartungen, die außerhalb des Produkt- oder Serviceumfangs liegen.

Ein negativer Befund führt nicht automatisch zur Ablehnung. Die Plattform schlägt Alternativen, Vorbedingungen, kleinere Scopes oder einen Discovery-Only-Modus vor.

## 7. Firmenanlage und Organisationsfundament

### 7.1 Anlagewege

- **Manuell geführt:** für kleine Organisationen und Demo-Accounts.
- **Strukturimport:** CSV, standardisierte Tabellen, API oder spätere Connectoren.
- **Klonen einer neutralen Vorlage:** nur Strukturen und Workflowvorlagen, niemals fremde Kundendaten.
- **Konzernstruktur:** Parent-Account mit rechtlich und datenmäßig getrennten Scopes.

### 7.2 Mindeststruktur

Für eine arbeitsfähige erste Version benötigt die Plattform:

- Kundenname und neutrale Identität,
- primäre Region und Datenresidenz,
- mindestens eine Organisationseinheit,
- mindestens einen kritischen Geschäftsprozess oder Service,
- Sponsor, ISMS Owner und operative Vertretung,
- vorläufigen Scope,
- eine Zielhypothese,
- Datenowner für importierte oder manuell erfasste Daten.

### 7.3 Strukturtiefe

Die Plattform zeigt eine Tiefenempfehlung statt maximaler Detailtiefe. Ein Kunde soll nur so viele Einheiten, Standorte und Prozesse anlegen, wie für Entscheidungen und Nachweise erforderlich. Übermodellierung wird als Risiko für Pflegeaufwand und Datenqualität angezeigt.

## 8. Identität, Rollen und Zugriff

### 8.1 Rollen-Mapping

Beim Onboarding werden reale Personen und Gruppen auf die kanonischen Produktrollen aus Dokument 03 gemappt. Die Plattform erkennt fehlende Pflichtrollen, Mehrfachbelastungen und Single Points of Failure.

### 8.2 Zugriffsprinzipien

- Least Privilege und Need-to-Know,
- getrennte Kunden- und Provideradministration,
- zeitlich begrenzte Projekt- und Auditorenzugriffe,
- explizite Freigabe für sensible Risiko-, Incident- und Personaldaten,
- protokollierte Rollen- und Rechteänderungen,
- vorbereitete Entzugs- und Exit-Prozesse.

### 8.3 Access Readiness Gate

Vor Transition müssen mindestens Authentifizierung, Rollen, Vertretungen, kritische Freigaben, technische Zugriffspfade und Notfallkontakte getestet sein. Ein Tabellenimport ersetzt keinen Zugriffstest.

## 9. Scope Discovery und Scope Governance

### 9.1 Scope-Dimensionen

Ein Scope kann beinhalten:

- rechtliche Einheiten,
- Standorte und Regionen,
- Produkte und Services,
- Geschäftsprozesse,
- Informationen und Datenklassen,
- Anwendungen, Infrastruktur und Cloud-Umgebungen,
- Lieferanten und ausgelagerte Prozesse,
- regulatorische und vertragliche Verpflichtungen,
- organisatorische Funktionen und Personengruppen.

### 9.2 Ein- und Ausschlüsse

Jeder Ausschluss benötigt:

- Begründung,
- verantwortliche Entscheidung,
- Abhängigkeiten und Schnittstellen,
- verbleibendes Risiko,
- Überprüfungstermin,
- Auswirkung auf Zielprofil, Auditfähigkeit und Serviceumfang.

### 9.3 Scope-Qualitätsprüfung

Die Plattform prüft unter anderem:

- kritischer Prozess ohne unterstützende Systeme,
- Asset ohne Owner,
- ausgelagerter Prozess ohne Lieferantenbezug,
- regulatorische Verpflichtung außerhalb des Scopes,
- Standort oder Tochterunternehmen mit unklarer Daten- und Servicegrenze,
- Scope, der nur wegen eines gewünschten Scores künstlich eng gefasst wurde.

### 9.4 Scope-Versionierung

Änderungen erzeugen eine neue Version mit Delta: hinzugefügte und entfernte Objekte, neue Verpflichtungen, betroffene Risiken, Controls, Work Packages, Services, Kosten, Termine und Reports.

## 10. Datenaufnahme, Import und Migration

### 10.1 Datenquellen

- strukturierte Kundeninterviews,
- bestehende ISMS- oder GRC-Exporte,
- Asset- und CMDB-Daten,
- Ticket- und Maßnahmenlisten,
- Auditberichte und Findings,
- Policy- und Dokumentenregister,
- Risiko- und Lieferantenregister,
- Cloud-, Identity- und Security-Tools,
- Tabellen, Dokumente und manuelle Erfassung.

### 10.2 Import Pipeline

1. Quelle registrieren und Berechtigung bestätigen.
2. Datei oder Verbindung technisch prüfen.
3. Felder auf kanonische Objekte und Beziehungen mappen.
4. Vorschau mit Konflikten, Dubletten und Datenverlust anzeigen.
5. Validierungsregeln ausführen.
6. verantwortliche Person freigeben lassen.
7. Import in isoliertem Batch durchführen.
8. Ergebnis, Fehler und Herkunft protokollieren.
9. Reconciliation Report erzeugen.
10. Rücksetzung innerhalb definierter Frist ermöglichen.

### 10.3 Migration aus Altsystemen

Migration wird nicht als einmaliges Copy-Paste verstanden. Für jedes Objekt wird entschieden:

- übernehmen und als bestätigt markieren,
- übernehmen und als unbestätigt markieren,
- zusammenführen,
- archivieren,
- bewusst nicht übernehmen,
- in Evidence oder historische Referenz umwandeln.

### 10.4 Datenminimierung und Altlasten

Die Plattform warnt vor ungenutzten personenbezogenen Daten, veralteten Maßnahmen, duplizierten Controls, nicht mehr gültigen Policies und Findings ohne Kontext. „Alles importieren“ ist keine Standardempfehlung.

[[FIGURE:FIG3]]

## 11. Strategie-DNA

### 11.1 Zweck

Die Strategie-DNA beschreibt, **wie** der Kunde Sicherheit führen will. Sie ist keine unveränderliche Typisierung, sondern eine versionierte Konfiguration, die Entscheidungen und Empfehlungen erklärt.

### 11.2 Pflichtdimensionen

| Dimension | Leitfrage | Beispielausprägungen |
|---|---|---|
| Geschäftskritikalität | Welche Ausfälle oder Vertrauensverluste sind existenziell? | moderat, hoch, sehr hoch; pro Prozess differenziert |
| Risikophilosophie | Wie vorsichtig oder chancenorientiert soll gesteuert werden? | konservativ, ausgewogen, selektiv risikobereit |
| Regulierungsintensität | Welche verbindlichen Anforderungen prägen den Zielzustand? | freiwillig, vertraglich, reguliert, mehrfach reguliert |
| Zielambition | Welches Niveau ist wirtschaftlich und strategisch gewollt? | Mindestniveau, definierte Reife, Zertifizierung, Resilienz |
| Geschwindigkeit | Wie schnell soll der Zielzustand erreicht werden? | stabil, beschleunigt, ereignisgetrieben |
| Budgetflexibilität | Wie eng sind Investitionskorridore? | fix, priorisierbar, szenariobasiert |
| Interne Kapazität | Was kann das Unternehmen selbst zuverlässig leisten? | gering, selektiv, stark, Center of Excellence |
| Managed-Service-Anteil | Welche Verantwortung soll extern unterstützt oder übernommen werden? | Guide, Co-Manage, Operate, Embedded Office |
| Automatisierungsgrad | Wie weit dürfen deterministische Workflows handeln? | assistiert, teilautomatisiert, weitgehend automatisiert |
| Nachweistiefe | Wie viel Evidence ist für Ziel und Risiko nötig? | pragmatisch, kontrolliert, auditintensiv |
| Entscheidungsstil | Wie werden sensible Entscheidungen vorbereitet und freigegeben? | zentral, föderiert, mehrstufig |
| Kommunikationsstil | Wie sollen Management und operative Rollen informiert werden? | komprimiert, detailliert, ereignisbezogen |

### 11.3 Konfigurationsregeln

- Dimensionen können pro Scope oder Capability abweichen.
- Widersprüche werden sichtbar gemacht, etwa hohe Ambition bei niedrigem Budget und geringer Kapazität.
- Die Plattform schlägt keine „richtige Persönlichkeit“ vor, sondern erklärt Konsequenzen.
- Änderungen benötigen Owner, Grund, erwartete Wirkung und gegebenenfalls neue Freigaben.
- Historische Bewertungen bleiben auf die damals gültige Strategie-DNA bezogen.

[[FIGURE:FIG4]]

## 12. Zielprofile

### 12.1 Zielprofiltypen

Ein Kunde kann mehrere Typen kombinieren:

- **Minimum Viable Security:** priorisierte Mindestfähigkeiten für kritische Risiken.
- **Capability Target:** definierte Reifegrade je Capability.
- **Regulatory Compliance:** Erfüllung ausgewählter gesetzlicher oder vertraglicher Verpflichtungen.
- **Certification Readiness:** Vorbereitung auf eine konkrete Zertifizierung oder Prüfung.
- **Risk Reduction:** Reduktion definierter Risikoexpositionen auf tolerierte Werte.
- **Operational Resilience:** Wiederanlauf-, Krisen- und Abhängigkeitsziele.
- **Customer Trust:** Nachweise für Kunden, Lieferketten oder Ausschreibungen.
- **Transformation Enablement:** Sicherheitsziel für Cloud-, M&A-, Produkt- oder Digitalprogramme.
- **Managed Capability:** verlässlicher Betriebszustand für ausgewählte ausgelagerte Fähigkeiten.

### 12.2 Zielprofil-Vertrag

Jedes Zielprofil enthält:

- Scope und Zielgruppen,
- Zielart und Geschäftstreiber,
- Zielwerte je Capability, Risiko, Control oder Meilenstein,
- akzeptierte Toleranzen,
- Zeithorizont und Stichtage,
- erforderliche Evidence und Confidence,
- Budget- und Kapazitätskorridor,
- interne und externe Verantwortungen,
- Abhängigkeiten, Annahmen und Ausschlüsse,
- Erfolgskriterien und Review-Rhythmus,
- Freigaben und Version.

### 12.3 Mehrere Zielprofile

Ein Unternehmen kann ein übergeordnetes strategisches Profil und mehrere operative Profile besitzen, etwa:

- Mindestniveau für alle Einheiten,
- Zertifizierungsbereitschaft für einen Produktscope,
- hohe Resilienz für kritische Produktion,
- regulatorische Pflichterfüllung für eine Tochtergesellschaft.

Die Plattform zeigt Konflikte und gemeinsame Maßnahmen, ohne Werte unzulässig zu vermischen.

## 13. Risikobereitschaft und Toleranzen

### 13.1 Appetite versus Tolerance

**Risikobereitschaft** beschreibt die grundsätzliche Haltung. **Toleranzen** sind messbare Grenzen für konkrete Risiken, Prozesse, Ausfallzeiten, Datenverluste oder Control-Lücken.

### 13.2 Erfassung

Die Plattform bietet:

- qualitative Workshops,
- referenzierte Skalen,
- Prozess- und Capability-spezifische Toleranzen,
- Entscheidungsvorlagen für das Management,
- Beispiele für Konsequenzen,
- Simulationen mit Alternativen.

### 13.3 Konflikte

Beispiele:

- niedrige Ausfalltoleranz, aber keine Bereitschaft für Redundanzinvestitionen,
- hohe regulatorische Ambition, aber unbesetzte Pflichtrollen,
- schnelle Zertifizierung, aber fehlende Evidence-Historie,
- geringer Managed-Service-Anteil bei dauerhaft fehlender interner Kapazität.

Die Plattform darf solche Konflikte nicht „wegrechnen“. Sie erzeugt eine Decision Card mit Optionen, Auswirkungen und benötigter Freigabe.

## 14. Regulatorische, vertragliche und Framework-Ziele

### 14.1 Requirement Packs

Standards und Regulierungen werden als versionierte Requirement Packs eingebunden. Onboarding legt fest:

- welche Packs relevant sind,
- welche Version und Region gilt,
- ob das Ziel Verpflichtung, Mapping, Nachweis oder Zertifizierung ist,
- welche Scopes und Einheiten betroffen sind,
- welche Termine und Übergangsfristen gelten.

### 14.2 Kein Framework-first-Onboarding

Die Plattform startet nicht zwingend mit einer vollständigen Normcheckliste. Sie verbindet Anforderungen mit Geschäftsprozessen, Risiken, Controls und Zielprofil. So kann ein Kunde zunächst ein risikobasiertes Mindestniveau aufbauen und später einen Zertifizierungspfad ergänzen.

### 14.3 Mehrfach-Mapping

Gemeinsame Controls, Evidence und Work Packages können mehrere Requirements bedienen. Die Plattform zeigt Wiederverwendung, aber auch abweichende Nachweistiefe oder Scope-Grenzen.

## 15. Budget, Kapazität und Zeithorizont

### 15.1 Budgetkorridor

Budget wird als Korridor und Entscheidungsschwelle modelliert, nicht als einzelner vermeintlich exakter Betrag. Komponenten sind:

- Plattform und Lizenzen,
- interne Personalkapazität,
- Managed Services,
- Projekte und technische Maßnahmen,
- Integrationen und Datenmigration,
- Audit-, Reise- und Drittanbieterkosten,
- Reserve für Findings und Ereignisse.

### 15.2 Interne Kapazität

Erfasst werden Rollen, verfügbare Zeit, Skill, Vertretung, Betriebsfähigkeit und realistische Veränderungskapazität. Nominale Stellenzahlen reichen nicht aus.

### 15.3 Zeithorizont

Ziele besitzen kurzfristige, mittelfristige und strategische Horizonte. Die Plattform verhindert, dass alle Maßnahmen künstlich auf ein Auditdatum optimiert werden, wenn nachhaltiger Betrieb andere Sequenzen erfordert.

## 16. Managed-Service-Anteil und Responsibility Blueprint

### 16.1 Verantwortungsmodi

| Modus | Kunde | Provider | Plattform |
|---|---|---|---|
| Guide | entscheidet und führt aus | Methodik, Review, Coaching | Orientierung, Workflows, Nachweis |
| Co-Manage | gemeinsame Ausführung | definierte Work Packages und Qualität | Koordination, Automatisierung, Transparenz |
| Operate | behält Governance und Freigabe | führt definierte Capability im Betrieb | Servicekalender, Evidence, SLA, Reporting |
| Embedded Office | gemeinsame Steuerungsfunktion | integriertes ISMS-Team | Portfolio, Aufgaben, Entscheidungen, Value Ledger |

### 16.2 Responsibility Mapping

Für jede Capability oder Service Instance wird festgelegt:

- Accountable Owner,
- ausführende Rollen,
- Reviewer und Approver,
- Daten- und Evidence-Lieferanten,
- Eskalations- und Vertretungsrollen,
- zulässige Automation,
- Kundenmitwirkung und Fristen,
- Exit- und Übergabepflichten.

### 16.3 Verantwortungs-Lücken

Die Plattform erkennt Aufgaben ohne Owner, doppelte Accountability, unklare Freigaben, fehlende Vertretung und Services, die Governance-Entscheidungen unzulässig an den Provider übertragen würden.

## 17. Baseline Assessment

### 17.1 Bewertungsquellen

- vorhandene Policies, Prozesse und Records,
- Interviews und Workshops,
- Asset-, Risiko- und Control-Daten,
- technische Integrationen,
- Findings und Auditberichte,
- Stichproben und Evidence,
- beobachtete Betriebsdaten,
- Selbsteinschätzungen mit Kennzeichnung.

### 17.2 Baseline-Methodik

Die Baseline bewertet nicht nur „vorhanden / nicht vorhanden“, sondern mindestens:

- Design,
- Implementierung,
- Betrieb,
- Wirksamkeit,
- Coverage,
- Evidence,
- Aktualität,
- Confidence.

### 17.3 Fast Baseline und Assured Baseline

- **Fast Baseline:** schnelle Orientierung mit klar markierten Annahmen und begrenzter Evidence.
- **Assured Baseline:** vertiefte Prüfung mit Stichproben, Reviews und höherer Confidence.

Beide können sinnvoll sein. Die Plattform darf Fast Baseline nicht wie eine unabhängige Auditfeststellung darstellen.

### 17.4 Baseline Freeze

Nach Freigabe wird ein Snapshot erzeugt. Spätere Erkenntnisse korrigieren nicht still die Historie, sondern erzeugen eine neue Version oder eine dokumentierte Korrektur.

## 18. Datenqualität, Confidence und offene Lücken

### 18.1 Qualitätsdimensionen

- Vollständigkeit,
- Aktualität,
- Konsistenz,
- Herkunft,
- fachliche Bestätigung,
- technische Validierung,
- Scope-Abdeckung,
- Reproduzierbarkeit.

### 18.2 Confidence Levels

- **Low:** überwiegend Annahmen, Selbstauskunft oder veraltete Daten.
- **Moderate:** mehrere Quellen, aber wesentliche Lücken oder geringe Stichprobe.
- **High:** aktuelle, konsistente Daten mit fachlicher Bestätigung und Evidence.
- **Assured:** definierte unabhängige oder methodisch vertiefte Prüfung; keine Garantie absoluter Richtigkeit.

### 18.3 Data Improvement Plan

Offene Datenlücken werden nach Entscheidungsrelevanz priorisiert. Nicht jede Lücke muss vor Go-live geschlossen sein. Kritisch sind Lücken, die Scope, Risiko, Servicepflicht, Sicherheit, Preis oder Managemententscheidung wesentlich verändern können.

## 19. Zielrouten und Routenoptionen

### 19.1 Route-Typen

Die Plattform erzeugt mindestens:

- **Fastest Responsible Route:** schnellster verantwortbarer Weg zum Ziel.
- **Cost-Efficient Route:** größter Fortschritt pro Budgeteinheit.
- **Capacity-Aware Route:** an interner Veränderungskapazität ausgerichtet.
- **Managed-Service Route:** stärkerer Provideranteil bei geringer interner Kapazität.
- **Risk-First Route:** priorisiert die stärkste Risikoreduktion.
- **Audit-Date Route:** berücksichtigt einen festen Prüf- oder Zertifizierungstermin.

### 19.2 Route-Bausteine

- Meilensteine,
- Work Packages,
- Maßnahmen und Controls,
- Service Instances,
- Abhängigkeiten,
- Owner und Quality Gates,
- Zeit- und Budgetkorridor,
- erwartete Risiko- und Reifegradwirkung,
- Datenverbesserung,
- Reise und Vor-Ort-Bedarf,
- Annahmen und Confidence.

### 19.3 Route-Vergleich

Die Oberfläche zeigt keine scheinbar objektive „beste Route“, sondern Unterschiede:

- Zieltermin,
- Investition,
- interne Belastung,
- Provideranteil,
- Risikoexposition während der Umsetzung,
- Abhängigkeiten,
- Reversibilität,
- Confidence.

### 19.4 Recalculation

Neue Lifecycle Events können eine Neuberechnung auslösen. Bestehende Freigaben bleiben erhalten; die Plattform erstellt einen Änderungsvorschlag und erklärt das Delta.

## 20. Serviceempfehlung und Servicekonfiguration

### 20.1 Auslöser

Serviceempfehlungen können aus folgenden Mustern entstehen:

- dauerhaft fehlende interne Kapazität,
- wiederkehrende überfällige Work Packages,
- hohe Rework- oder Koordinationslast,
- kritische Capability ohne vertretbaren Owner,
- regulatorische oder terminliche Anforderungen,
- fehlende Spezialskills,
- Wunsch nach planbarer Qualität und Reporting,
- wirtschaftlicher Vorteil gegenüber individueller Projektarbeit.

### 20.2 Pflichtinhalt einer Empfehlung

- fachliches Problem und betroffene Ziele,
- Datenquellen und Confidence,
- interne Alternative,
- Co-Managed- und Operate-Option,
- erwartete Wirkung,
- Kundenmitwirkung,
- Grenzen und Restrisiken,
- Preis- und Kapazitätslogik,
- Unabhängigkeits- und Konfliktprüfung,
- menschliche Freigabe.

### 20.3 Kein Dark Pattern

Die Plattform darf keine Angstbotschaften, künstliche Dringlichkeit oder voreingestellte kostenpflichtige Services verwenden. Eine Empfehlung kann abgelehnt oder zurückgestellt werden, ohne dass sachfremde Nachteile entstehen.

## 21. Kundensimulation und Zielbild-Vorschau

### 21.1 Simulation vor Freigabe

Vor der Aktivierung kann der Kunde mehrere Szenarien durchspielen:

- Budget erhöhen oder reduzieren,
- Zieltermin verschieben,
- Managed-Service-Anteil verändern,
- Scope erweitern oder verkleinern,
- interne Rollen besetzen,
- technische Maßnahme früher oder später umsetzen,
- Audit- oder Zertifizierungsziel ergänzen.

### 21.2 Vorschau

Die Simulation zeigt:

- erwartete Zielnähe,
- Risikoverlauf,
- Kapazitätsbelastung,
- Servicekosten und interne Kosten,
- kritische Abhängigkeiten,
- Datenunsicherheit,
- wahrscheinliche Engpässe,
- Entscheidungen, die nicht automatisiert werden dürfen.

### 21.3 Simulation ist keine Zusage

Prognosen werden mit Methodik, Annahmen, Bandbreite und Confidence dargestellt. Termine, Risiko- oder Einsparwerte sind keine Garantie.

## 22. Commercial und Operational Readiness

### 22.1 Commercial Readiness

Vor Serviceaktivierung müssen mindestens geklärt sein:

- ausgewählte Service Offers und Tiefe,
- Scope und Mengengerüst,
- Preis- und Kostenbasis,
- Kundenmitwirkung,
- Reise- und Drittanbieterkosten,
- Laufzeit, Change- und Exit-Regeln,
- Freigabegrenzen,
- Unabhängigkeits- und Interessenkonfliktprüfung.

### 22.2 Operational Readiness Checklist

| Bereich | Mindestnachweis |
|---|---|
| Scope | freigegebene Scope-Version und Ausschlüsse |
| Rollen | Owner, Backup, Reviewer, Approver und Eskalation |
| Daten | Quellen, Importstatus, Datenqualität und kritische Lücken |
| Zugriff | getestete Rollen, Authentifizierung und erforderliche Connectoren |
| Methodik | Zielprofil, Bewertungs- und Priorisierungslogik |
| Service | Charter, Work Packages, Kalender, SLA/SLO und Quality Gates |
| Kommunikation | Meeting- und Reportingrhythmus, Kontakte, Eskalationskanal |
| Sicherheit | Datenklassifizierung, Residenz, Logging und Incident-Kontakt |
| Commercial | Baseline, Mengengerüst und Change-Regeln |
| Exit | Export, Handover, Widerruf und Verantwortungen |

### 22.3 Readiness-Entscheidung

Mögliche Ergebnisse:

- **Ready:** alle kritischen Gates erfüllt.
- **Ready with Conditions:** begrenzte Lücken mit Owner, Frist und Restrisiko.
- **Not Ready:** kritische Voraussetzung fehlt.
- **Pilot Ready:** begrenzter Scope und kontrollierte Lernphase.

## 23. Onboarding Workspace und rollenbezogene Sichten

### 23.1 Customer Sponsor View

- Ziel, Fortschritt und offene Managemententscheidungen,
- Budget- und Kapazitätskonflikte,
- Route- und Serviceoptionen,
- erwartete Wirkung,
- Freigaben und nächste Meilensteine.

### 23.2 ISMS Manager View

- detaillierter Scope,
- Datenlücken,
- Rollen, Work Packages und Evidence,
- Baseline und Zielprofil,
- operative Entscheidungen und Blocker.

### 23.3 Consultant / Onboarding Lead View

- Case Mission,
- Workshops, Interviews, Imports und Reviews,
- Quality Gates,
- wiederverwendbare Templates,
- Daten- und Entscheidungsrisiken,
- Transition und Handover.

### 23.4 Managed-Service Lead View

- Eignung und Service Fit,
- Responsibility Blueprint,
- Delivery- und Kapazitätsvoraussetzungen,
- Cost-to-Serve,
- Operational Readiness und Startdatum.

### 23.5 Platform Administrator View

- Tenant, Region, Identität, Rollen, Connectoren,
- Importjobs und Fehler,
- technische Readiness,
- Sicherheits- und Auditlogs.

## 24. Guided UX und Einstiegspfade

### 24.1 Guided Quickstart

Für kleine oder wenig komplexe Scopes:

1. Ziel in Alltagssprache auswählen.
2. Organisation und kritische Prozesse skizzieren.
3. vorhandene Rollen und Kapazität erfassen.
4. Daten oder Dokumente optional importieren.
5. erste Strategie-DNA und Zielroute erzeugen.
6. Annahmen bestätigen.
7. nächsten sinnvollen Schritt starten.

### 24.2 Collaborative Workshop

Die Plattform unterstützt moderierte Sessions mit:

- vorbereiteten Fragen,
- Live-Entscheidungen,
- sichtbaren Konflikten,
- Parking Lot,
- Aufgaben und Ownern,
- automatisch erzeugtem Workshop Record,
- anschließender Freigabe statt stiller Übernahme.

### 24.3 Structured Import

Für reife Kunden oder Migrationen:

- Datenraum und Importplan,
- Mapping-Workshop,
- Batch-Validierung,
- Sampling und fachliche Bestätigung,
- Baseline-Vergleich,
- kontrollierte Umschaltung.

### 24.4 Adaptive Guidance

Die Plattform passt Tiefe, Begriffserklärung und nächste Schritte an Rolle und Reife an. Ein Anfänger sieht „Was muss ich entscheiden?“. Ein Experte kann Methodik, Objektbeziehungen und Rohdaten öffnen.

## 25. Zusammenarbeit, Workshops und Entscheidungen

### 25.1 Onboarding Mission

Die tägliche oder wöchentliche Mission beantwortet:

- Was fehlt noch für einen belastbaren Zielzustand?
- Welche Entscheidung blockiert den größten Fortschritt?
- Welche Datenlücke verändert Route oder Service wesentlich?
- Wo droht Termin- oder Budgetüberschreitung?
- Welche Aufgabe kann standardisiert oder automatisiert werden?

### 25.2 Decision Records

Scope, Zielprofil, Risikotoleranz, Route, Service, Budget, Go-live und Exit erzeugen strukturierte Decision Records mit Optionen, Begründung, Datenbasis, Confidence, Freigabe und Review-Datum.

### 25.3 Workshop Outputs

Jeder Workshop erzeugt:

- bestätigte Erkenntnisse,
- Annahmen,
- offene Fragen,
- Konflikte,
- Entscheidungen,
- Aufgaben,
- Änderungen an Scope oder Zielprofil,
- Teilnehmer und Freigabebedarf.

## 26. Transition, Go-live und Hypercare

### 26.1 Transition Plan

Der Plan verbindet:

- Datenmigration,
- Rollen und Zugriffe,
- Workflows und Integrationen,
- Servicekalender,
- Reporting,
- Quality Gates,
- Schulung,
- Handover,
- Fallback und Exit.

### 26.2 Go-live Gate

Go-live ist eine bewusste Entscheidung. Die Plattform erzeugt eine kompakte Freigabeseite:

- Was ist bereit?
- Was ist nur unter Bedingungen bereit?
- Welche Restrisiken bleiben?
- Wer übernimmt ab wann welche Verantwortung?
- Was passiert in den ersten 30 Tagen?
- Wie wird bei Problemen zurückgefallen oder eskaliert?

### 26.3 Hypercare

Für die erste Betriebsphase gelten erhöhte Review-, Support- und Datenqualitätsrhythmen. Hypercare endet erst nach definierten Kriterien, nicht nur nach Kalenderdatum.

## 27. Regelbetrieb und Lifecycle Reviews

### 27.1 Review-Rhythmen

- 30-/60-/90-Tage-Review nach Aktivierung,
- monatliche operative Reviews,
- quartalsweise Ziel- und Service-Reviews,
- jährliche Strategie-DNA- und Scope-Überprüfung,
- anlassbezogene Reviews bei Lifecycle Events.

### 27.2 Review-Fragen

- Ist das Zielprofil noch geschäftlich relevant?
- Stimmen Scope, Verantwortungen und Serviceanteil?
- Sind Budget und Kapazität realistisch?
- Haben sich Risiken, Regulierung oder Technologie verändert?
- Welche Services erzeugen nachweisbaren Nutzen?
- Welche Leistungen können reduziert, standardisiert oder internalisiert werden?
- Welche Daten oder Controls haben dauerhaft geringe Confidence?

### 27.3 Customer Snapshot

Jeder wesentliche Review erzeugt einen vergleichbaren Snapshot und eine Change Story: Was hat sich seit dem letzten Stand verändert, warum, mit welcher Wirkung und welcher Entscheidung?

## 28. Zielprofil-, Scope- und Strategieänderungen

### 28.1 Change Trigger

- neue Geschäftsstrategie,
- M&A oder Carve-out,
- neue Produkte, Regionen oder Standorte,
- regulatorische Änderung,
- Incident oder Bedrohung,
- neues Audit- oder Zertifizierungsziel,
- Budget- oder Personaländerung,
- Provider- oder Technologiewechsel.

### 28.2 Impact Assessment

Die Plattform zeigt Auswirkungen auf:

- Scope und Objektgraph,
- Risiken, Controls und Evidence,
- Zielwerte und Route,
- Services und Verantwortungen,
- Zeit, Budget, Kapazität und Reise,
- Verträge, SLA/SLO und Reporting,
- Datenresidenz und Sicherheit,
- offene Entscheidungen.

### 28.3 Re-Baseline

Eine Re-Baseline ist erforderlich, wenn die Ausgangsannahmen wesentlich verändert sind. Die alte Baseline bleibt erhalten und wird nicht überschrieben.

## 29. Serviceausbau, Reduktion und Internalisierung

### 29.1 Ausbau

Ein Ausbau kann aus Zieländerung, Kapazitätsengpass oder Leistungsnachweis entstehen. Er benötigt fachliche Begründung, Commercial Impact, Responsibility Update und Operational Readiness.

### 29.2 Reduktion

Services können reduziert werden, wenn interne Fähigkeiten gewachsen sind, Ziele erreicht wurden oder der Scope kleiner wird. Die Plattform erstellt einen kontrollierten Reduktionsplan statt stiller Abschaltung.

### 29.3 Internalisierung

Bei Internalisierung werden Runbooks, Work Packages, Evidenz, Historie, offene Risiken, Zugriffe und Skill-Anforderungen übergeben. Erfolg ist nicht „Provider weniger“, sondern ein belastbarer interner Betrieb.

### 29.4 Pause

Eine Pause besitzt Start, Grund, Mindestkontrollen, offene Pflichten, Daten- und Zugriffstatus, Reaktivierungsbedingungen und Risikoakzeptanz.

## 30. Konzernveränderung, M&A und Carve-out

### 30.1 Akquisition

Eine neue Einheit kann zunächst als isolierter Discovery Scope angelegt werden. Die Plattform vergleicht Strategie-DNA, Zielprofile, Controls und Datenmodelle, bevor eine Zusammenführung erfolgt.

### 30.2 Carve-out

Bei Trennung werden Objekte, Rechte, Evidence, Services und Historie nach definierten Regeln separiert. Gemeinsame Controls oder Nachweise benötigen eine neue Ownership- und Nutzungsentscheidung.

### 30.3 Reorganisation

Strukturänderungen dürfen fachliche Historie nicht zerstören. Organisationseinheiten werden versioniert; Beziehungen zu Prozessen, Risiken und Verantwortungen bleiben zeitlich nachvollziehbar.

## 31. Offboarding, Exit und Datenübergabe

### 31.1 Exit-Prinzipien

- frühzeitig vorbereitet,
- kein künstlicher Lock-in,
- nachvollziehbare Verantwortungsübergabe,
- sichere Daten- und Rechtebehandlung,
- Fortführung kritischer Kontrollen,
- Abschluss offener Findings und Entscheidungen.

### 31.2 Exit Package

- aktueller Scope und Target Profile,
- Baseline und letzte Snapshots,
- Risiken, Controls, Maßnahmen und Evidence,
- Service- und Work-Package-Historie,
- offene Verpflichtungen und Eskalationen,
- Runbooks und Responsibility Blueprint,
- Datenexport und Prüfsummen,
- Zugriffs- und Widerrufsprotokoll,
- Abschluss- und Handover Record.

### 31.3 Exit Acceptance

Kunde und Provider bestätigen Übergabe, offene Restrisiken, Verantwortungswechsel, Datenaufbewahrung, Löschung, Zugriffsentzug und verbleibende Verpflichtungen.

## 32. Fehler-, Sonder- und Krisenfälle

### 32.1 Sponsor oder Owner fällt aus

Der Case wechselt in `Blocked` oder nutzt freigegebene Vertretung. Ziel- oder Go-live-Entscheidungen dürfen nicht automatisch übernommen werden.

### 32.2 Datenimport ist unvollständig oder falsch

Import wird isoliert, Reconciliation Report erstellt und betroffene Bewertungen markiert. Ein Rollback oder Korrekturbatch bleibt möglich.

### 32.3 Kunde will sofort go-live

Die Plattform bietet Pilot Ready oder Ready with Conditions, aber überspringt keine kritischen Sicherheits-, Rollen- oder Servicegates.

### 32.4 Ziel ist widersprüchlich

Konflikte zwischen Termin, Budget, Kapazität und Ambition werden als Decision Card dargestellt. Die Plattform wählt nicht still eine Dimension aus.

### 32.5 Regulatorische Frist ändert sich

Route und Prioritäten werden neu berechnet; bestehende Freigaben und historische Prognosen bleiben nachvollziehbar.

### 32.6 Service ist kommerziell verkauft, aber operativ nicht lieferbar

Operational Readiness blockiert Aktivierung und eskaliert an Commercial Owner und Service Owner.

### 32.7 Kunde liefert Mitwirkung nicht

Auswirkungen auf Termine, Risiko, SLA und Preis werden transparent; Erinnerungen, Eskalation und Change-Prozess werden ausgelöst.

### 32.8 M&A erzeugt Daten- oder Mandantenkonflikt

Ein separater Scope und technische Isolation bleiben bestehen, bis rechtliche, datenschutzrechtliche und fachliche Freigaben vorliegen.

### 32.9 Kunde beendet kurzfristig

Exit-Minimum wird aktiviert: Zugriffssicherung, Datenexport, offene Risikoübergabe, Widerruf und Abschlussprotokoll.

## 33. KPIs und Anti-KPIs

### 33.1 Onboarding-KPIs

| KPI | Aussage |
|---|---|
| Time to First Value | Zeit bis zur ersten nutzbaren Mission, Baseline oder Route |
| Time to Qualified Scope | Zeit bis zu einem freigabefähigen Scope |
| Decision Lead Time | Zeit von benötigter bis getroffener Entscheidung |
| Import Reconciliation Rate | Anteil korrekt gemappter und bestätigter Importobjekte |
| Baseline Confidence | Qualität und Belastbarkeit des Ausgangszustands |
| Operational Readiness Pass Rate | Anteil aktivierungsfähiger Services ohne kritisches Rework |
| Onboarding Rework Rate | Aufwand durch unklare Anforderungen, Fehler oder späte Änderungen |
| Customer Effort | erforderliche Kundenzeit je Phase und Rolle |
| Role Coverage | Anteil kritischer Verantwortungen mit Primary und Backup |
| Route Acceptance | Anteil vorgeschlagener Routen, die nach Review freigegeben werden |
| Time to Active Service | Zeit von Serviceentscheidung bis kontrollierter Aktivierung |
| Data Improvement Velocity | Geschwindigkeit, mit der entscheidungsrelevante Datenlücken geschlossen werden |

### 33.2 Lifecycle-KPIs

- Aktualität von Scope und Zielprofil,
- Anteil rechtzeitig durchgeführter Reviews,
- erkannte versus verspätet erkannte Lifecycle Events,
- Zeit bis zur Re-Baseline,
- realisierte versus erwartete Route-Wirkung,
- Serviceausbau und -reduktion mit dokumentiertem Nutzen,
- Exit Readiness,
- erfolgreiche Internalisierungen,
- Zahl kritischer Verantwortungs- oder Datenlücken.

### 33.3 Anti-KPIs

Nicht als alleinige Erfolgskennzahlen verwenden:

- Anzahl erhobener Felder,
- Anzahl importierter Assets,
- maximale Reifegradzahl,
- Zahl verkaufter Services,
- Geschwindigkeit ohne Quality Gates,
- Anzahl erzeugter Tasks,
- 100 Prozent Datenvollständigkeit unabhängig von Entscheidungsnutzen.

## 34. Synthetische Demo-Daten und Demo-Dramaturgie

### 34.1 Demo-Unternehmen

1. **Nordstern Manufacturing SE:** europäischer Produzent, Zielreife 3, begrenzte interne Kapazität, zwei Standorte und bevorstehender Kunden-Audit.
2. **AlpenCloud GmbH:** Cloud-Softwareanbieter, schnelles Wachstum, Zertifizierungsziel, hohe Automatisierungsbereitschaft.
3. **Rheinbank Digital AG:** stark regulierter Finanzdienstleister, mehrere Zielprofile, hohe Nachweistiefe und strikte Datenresidenz.
4. **MediNova Clinics Holding:** dezentrale Gesundheitsgruppe, kritische Verfügbarkeit, Lieferanten- und Standortkomplexität.
5. **GreenGrid Energy Services:** M&A-Szenario mit neu erworbener Tochtergesellschaft und getrenntem Discovery Scope.

Alle Personen, Preise, Risiken, Termine, Dokumente, Standorte und Unternehmensdaten der Demo sind synthetisch.

### 34.2 Zwölf verbindliche Demo-Szenen

1. Neuen Customer Account in weniger als zwei Minuten anlegen.
2. Guided Quickstart mit Ziel, kritischem Prozess und Rollen durchführen.
3. Bestehende Asset- und Maßnahmenliste importieren und Mapping-Vorschau zeigen.
4. Scope-Konflikt erkennen und als Decision Card vorbereiten.
5. Strategie-DNA mit Budget, Kapazität und Managed-Service-Anteil konfigurieren.
6. Drei Zielrouten vergleichen und eine Route freigeben.
7. Fast Baseline mit sichtbarer Confidence erzeugen.
8. Serviceempfehlung mit interner Alternative und Wirkung anzeigen.
9. Operational Readiness prüfen und einen blockierenden Zugriff erkennen.
10. Go-live freigeben und 30-Tage-Hypercare starten.
11. M&A-Lifecycle-Event auslösen und Route neu berechnen.
12. Managed Service reduzieren und vollständiges Handover Package erzeugen.

## 35. Globale Akzeptanzkriterien

- **16-AC01:** Ein neuer synthetischer Kunde kann ohne externe Systeme als vollständiger Demo-Account angelegt werden.
- **16-AC02:** Quickstart, Workshop und Import erzeugen dieselben kanonischen Kernobjekte.
- **16-AC03:** Scope-Ein- und Ausschlüsse sind begründet, versioniert und freigabefähig.
- **16-AC04:** Strategie-DNA beeinflusst Route, Priorisierung und Kommunikation nachvollziehbar.
- **16-AC05:** Ein Zielprofil kann ohne Audit- oder Zertifizierungsziel betrieben werden.
- **16-AC06:** Budget, interne Kapazität und Managed-Service-Anteil werden gemeinsam betrachtet.
- **16-AC07:** Baseline-Werte zeigen Datenquelle, Stichtag, Methodik und Confidence.
- **16-AC08:** Zielrouten können nach Zeit, Kosten, Kapazität, Risiko und Provideranteil verglichen werden.
- **16-AC09:** Keine kostenpflichtige Servicekonfiguration wird ohne menschliche Freigabe aktiv.
- **16-AC10:** Responsibility Blueprint weist kritische Tätigkeiten eindeutig zu und erkennt Lücken.
- **16-AC11:** Operational Readiness kann Go-live blockieren oder an Bedingungen knüpfen.
- **16-AC12:** Lifecycle Events erzeugen ein Impact Assessment statt stiller Datenänderung.
- **16-AC13:** Alte Baselines, Scopes und Zielprofile bleiben historisch rekonstruierbar.
- **16-AC14:** Serviceausbau, Reduktion, Pause und Internalisierung sind als kontrollierte Prozesse modelliert.
- **16-AC15:** Exit erzeugt vollständigen Daten-, Verantwortungs- und Zugriffsabschluss.
- **16-AC16:** Anfänger sehen verständliche nächste Schritte; Experten können Methodik und Rohdaten prüfen.
- **16-AC17:** Datenimporte sind vorschau-, validierungs-, protokoll- und rücksetzbar.
- **16-AC18:** Rollen, Zugriffe und Vertretung werden vor Aktivierung getestet.
- **16-AC19:** Alle Demo-Daten sind synthetisch und als solche gekennzeichnet.
- **16-AC20:** Jede wesentliche Empfehlung enthält fachliche Begründung, Alternative, Wirkung und Confidence.

## 36. Festgelegte Entscheidungen

- **16-D01:** Onboarding wird als Lifecycle-Funktion und nicht als einmaliger Wizard gebaut.
- **16-D02:** Es gibt drei Einstiegspfade: Guided Quickstart, Collaborative Workshop und Structured Import.
- **16-D03:** Alle Einstiegspfade enden in denselben kanonischen Objekten und Quality Gates.
- **16-D04:** Strategie-DNA, Zielprofil und Baseline sind getrennte, versionierte Objekte.
- **16-D05:** Audit-Readiness ist nur eine mögliche Zielart.
- **16-D06:** Zielwerte werden pro Scope und Capability festgelegt; maximale Reife ist kein Standardziel.
- **16-D07:** Scope, Zielprofil, Risikotoleranz, Serviceübernahme und Go-live benötigen menschliche Freigabe.
- **16-D08:** Budget wird als Korridor mit Unsicherheit, nicht als Scheingenauigkeit modelliert.
- **16-D09:** Interne Kapazität und gewünschter Managed-Service-Anteil sind Pflichtdimensionen der Zielgestaltung.
- **16-D10:** Baselines zeigen Confidence und dürfen historische Versionen nicht still überschreiben.
- **16-D11:** Die Plattform erzeugt mehrere Routenoptionen statt einer vermeintlich objektiven Best Route.
- **16-D12:** Serviceempfehlungen benötigen interne Alternativen und dürfen nicht automatisch gebucht werden.
- **16-D13:** Operational Readiness ist ein verbindliches Gate vor Serviceaktivierung.
- **16-D14:** Der Lifecycle unterstützt Ausbau, Reduktion, Internalisierung, Pause und Exit.
- **16-D15:** Der Kunde kann seine Daten und Konfigurationen in einem geordneten Exit exportieren.
- **16-D16:** Demo-Accounts, Preise, Personen und Unternehmensinformationen sind synthetisch.
- **16-D17:** Lifecycle Events erzeugen versionierte Impact Assessments und gegebenenfalls Re-Baselining.
- **16-D18:** Die Oberfläche passt Erklärungstiefe und nächsten Schritt an Rolle und Reife an.

## 37. Begründete Annahmen

- **16-A01:** Kunden akzeptieren einen progressiven Einstieg eher als einen vollständigen Fragebogen vor dem ersten Nutzen.
- **16-A02:** Ein großer Teil des Onboardings lässt sich standardisieren, ohne individuelle Zielprofile aufzugeben.
- **16-A03:** Kunden verfügen häufig über heterogene Tabellen, Dokumente und Tools, deren Qualität stark variiert.
- **16-A04:** Eine Fast Baseline ist für frühe Entscheidungen nützlich, wenn Unsicherheit transparent bleibt.
- **16-A05:** Die gemeinsame Betrachtung von Ziel, Budget, Kapazität und Serviceanteil verbessert Umsetzbarkeit und Vertrauen.
- **16-A06:** Reife Kunden wünschen mehr Daten- und Methodentiefe als Anfänger, benötigen aber dieselbe Grundnavigation.
- **16-A07:** Serviceempfehlungen werden eher akzeptiert, wenn interne Alternativen und Nutzen transparent sind.
- **16-A08:** Scope- und Zieländerungen treten im Regelbetrieb regelmäßig auf und benötigen ein eigenes Modell.
- **16-A09:** Ein geordneter Exit erhöht Vertrauen und kann die Kaufentscheidung erleichtern.
- **16-A10:** Für die erste Produktversion können Connectoren teilweise simuliert oder durch kontrollierte Imports ersetzt werden.

## 38. Offene Fragen

- **16-Q01:** Welche minimale Datentiefe ist je Kundentyp für Time to First Value erforderlich?
- **16-Q02:** Welche Strategy-DNA-Dimensionen sind Pflicht und welche optional?
- **16-Q03:** Welche Zielprofilvorlagen werden für die erste Demo vollständig implementiert?
- **16-Q04:** Welche Bewertungsmethodik dient als Referenz für Fast Baseline und Assured Baseline?
- **16-Q05:** Welche Importformate und Altsysteme werden zuerst unterstützt?
- **16-Q06:** Wie werden Konzernmandanten, rechtliche Einheiten und Datenresidenzen technisch getrennt?
- **16-Q07:** Welche Readiness-Gates dürfen im Pilotmodus unter Bedingungen offen bleiben?
- **16-Q08:** Welche Rollen dürfen Strategie-DNA und Risikotoleranz final freigeben?
- **16-Q09:** Wie tief soll der Guided Configurator kommerzielle Preislogik aus Dokument 14 einblenden?
- **16-Q10:** Welche Lifecycle Events werden automatisch erkannt und welche manuell erfasst?
- **16-Q11:** Welche Daten und Templates gehören zum standardisierten Exit Package?
- **16-Q12:** Wie lange bleibt ein Importbatch technisch rücksetzbar?
- **16-Q13:** Welche Vergleichs- und Benchmarkwerte dürfen in der Demo gezeigt werden?
- **16-Q14:** Welche Funktionen müssen auf mobilen Geräten verfügbar sein?
- **16-Q15:** Welche regionalen Datenschutz- und Datenaufbewahrungsvarianten werden zuerst unterstützt?

## 39. Ideen für später

- selbstlernende, anonymisierte Onboarding-Benchmarks nach Branche und Zielprofil,
- interaktiver Workshop-Modus mit anonymer Live-Abstimmung,
- automatische Erkennung von Organisations- und Scope-Veränderungen aus verbundenen Systemen,
- M&A-Onboarding-Paket mit kontrolliertem Merge von Unternehmenszwillingen,
- digital signierte Customer Snapshots und Exit Packages,
- Marketplace für geprüfte Branchen-, Framework- und Onboarding-Packs,
- Kunden-Sandbox zum risikofreien Testen neuer Zielprofile,
- generative Erklärungen in Sprache und Detailtiefe der jeweiligen Rolle,
- simulationsgestützte Verhandlung von Budget, Termin und Serviceanteil,
- „Onboarding Health Coach“ für Sponsor und Onboarding Lead,
- anonymisierte Muster für typische Scope- und Datenqualitätsfehler,
- mobile Vor-Ort-Erfassung mit Offline-Synchronisation,
- automatisierte Skill- und Trainingsroute für die spätere Internalisierung.

## 40. Dokumentenabhängigkeiten

### 40.1 Eingehende Abhängigkeiten

- **Dokument 00:** Projektverfassung, Begriffe, Status und zentrale Wahrheit.
- **Dokument 01:** Produktvision, Nutzen und Business Case.
- **Dokument 03:** Nutzerrollen und reale Arbeitssituationen.
- **Dokument 04:** End-to-End-Journeys und Service-Lebenszyklus.
- **Dokument 05:** Produktmodule und Funktionslandkarte.
- **Dokument 06:** UX, Navigation und rollenbezogene Erlebniswelten.
- **Dokument 07:** Unternehmenszwilling, Objekte, Beziehungen und Historie.
- **Dokument 08:** ISMS-Kernprozesse, Governance und Scope.
- **Dokument 09:** Strategie-DNA, Zielprofile, Reife, Risiko und Confidence.
- **Dokument 10:** Zielrouten, KPIs, Simulationen und Decision Center.
- **Dokument 11:** Aufgaben, Freigaben, Workshops und Decision Records.
- **Dokument 12:** Onboarding-, Baseline- und Management-Reports.
- **Dokument 13:** Service Lifecycle, Charter, Shared Responsibility und Readiness.
- **Dokument 14:** Service Offers, Pakete, SLA und Preislogik.
- **Dokument 15:** Kapazität, Staffing, Reise, Handover und Berater-Operations.

### 40.2 Ausgehende Abhängigkeiten

- **Dokument 17:** Connectoren, Imports, Automatisierung und Workflow-Designer müssen die hier definierten Onboarding Cases, Batches und Lifecycle Events unterstützen.
- **Dokument 18:** Mandantenfähigkeit, Versionierung, Datenmodell, Events und Deployment konkretisieren die Lifecycle-Architektur.
- **Dokument 19:** Rollen, Datenschutz, Mandantentrennung, Auditierbarkeit, Export und Löschung sichern Onboarding und Exit ab.
- **Dokument 20A:** KI-Funktionen unterstützen Zusammenfassung, Mapping, Datenqualitätsprüfung und Routenvorschläge mit Guardrails.
- **Dokument 20B:** Agentenrollen für Product, ISMS, Data, Security, QA und Documentation müssen Lifecycle-Arbeit kontrolliert unterstützen.
- **Dokument 20C:** Claude Code implementiert Onboarding in modularen, checkpointfähigen Arbeitspaketen mit synthetischen Demo-Daten.

### 40.3 Änderungsregel

Änderungen an kanonischen Objekten, Lifecycle-Phasen, Strategy-DNA, Target Profile, Baseline, Route, Responsibility Blueprint, Readiness oder Exit-Semantik benötigen eine versionierte Impactanalyse gegen Dokument 07 bis 20C und eine Aktualisierung des Master-Index in Dokument 00.

## 41. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 22.07.2026 | Erstfassung für Kundenanlage, Qualification, Scope, Strategie-DNA, Zielprofil, Datenaufnahme, Baseline, Zielroute, Serviceempfehlung, Operational Readiness, Go-live, Lifecycle Change, Reduktion, Internalisierung und Exit | Erstellt |
