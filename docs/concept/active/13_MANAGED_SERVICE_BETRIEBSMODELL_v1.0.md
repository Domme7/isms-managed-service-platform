# Dokument 13 - Managed-Service-Betriebsmodell

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00 bis 12  
**Zweck:** Verbindliches Fach- und Betriebsmodell dafür, wie wiederkehrende ISMS-Leistungen ausgewählt, kundenspezifisch konfiguriert, überführt, erbracht, geprüft, gesteuert, verbessert, skaliert und geordnet beendet werden.

> **Zentrale Festlegung:** Ein Managed Service ist keine lose Sammlung von Berateraufgaben und kein automatisch verlängertes Projekt. Er ist eine versionierte, kundenspezifische Service Instance mit eindeutigem Outcome, Scope, Verantwortungen, Betriebsrhythmus, Qualitätsregeln, Leistungsversprechen, Datenbasis, Governance, Wertnachweis und Exit-Fähigkeit.

## 1. Dokumentauftrag und Abgrenzung

Dieses Dokument definiert das Betriebsmodell der Produktdomäne **Managed-Service- und Beratungsbetrieb**. Es konkretisiert vor allem **M25 Service Catalog & Configuration**, **M26 Service Delivery & Value Management** und die servicebezogenen Teile von M07, M21 bis M24, M27, M28 und M30.

Es beschreibt:

- die Serviceverfassung und die kanonischen Serviceobjekte,
- Rollen, Entscheidungsrechte und Shared Responsibility,
- den Lebenszyklus von Bedarf und Qualifizierung bis Exit und Übergabe,
- Service Charter, Transition, Baseline und Operational Readiness,
- wiederkehrende Delivery-Zyklen, Service Runs und Work Packages,
- Governance, Reviews, Quality Gates, Eskalationen und Change Control,
- Leistungs-, Qualitäts-, Vertrauens- und Wertmessung,
- Standardisierung, Konfiguration, Ausnahmen und Multi-Mandanten-Skalierung,
- Wissens- und Verbesserungsprozesse,
- Grenzen von Automatisierung und KI,
- Sicherheits-, Datenschutz- und Nachvollziehbarkeitsanforderungen,
- realistische Demo- und End-to-End-Szenarien.

Dokument 13 legt **keine konkreten Marktpreise, Paketpreise oder finalen SLA-Zahlen** fest. Diese werden in Dokument 14 definiert. Detaillierte Personal-, Skill-, Kalender-, Reise- und Kapazitätsplanung folgt in Dokument 15. Dokument 16 konkretisiert Kunden-Onboarding und Lifecycle. Dokument 17 bis 20C konkretisieren Integrationen, Technik, Sicherheit, KI und Umsetzung.

## 2. Executive Summary

Die Plattform macht Managed Services zu einem systematisch betreibbaren Produkt. Sie verbindet den individuellen Zielzustand des Kunden mit einem klaren Serviceversprechen, wiederholbaren Arbeitsabläufen, prüfbaren Deliverables, gemeinsamer Governance und messbarer Wirkung.

[[FIGURE:FIG1]]

Der Betrieb folgt einem geschlossenen Kreislauf:

1. Bedarf und Ziel werden aus Strategie-DNA, Risiko, Terminen, Datenlage und Kapazität abgeleitet.
2. Ein Service wird als Service Instance kundenspezifisch konfiguriert.
3. Transition und Operational Readiness schaffen eine belastbare Baseline.
4. Delivery erfolgt in planbaren oder ereignisgetriebenen Service Runs.
5. Qualität, SLA/OLA, Vertrauen und Wert werden fortlaufend geprüft.
6. Service Reviews führen zu Entscheidungen, Verbesserungen und gegebenenfalls Scope-Anpassungen.
7. Erkenntnisse werden in Methoden, Templates, Workflows und den nächsten Servicezyklus zurückgeführt.

Der wirtschaftliche Hebel entsteht nicht durch maximale Automatisierung allein. Er entsteht aus **wiederverwendbarer Methode, klarer Verantwortungsverteilung, geringer Koordinationsreibung, hoher Datenqualität, kontrollierter Automatisierung, portfoliofähiger Steuerung und sichtbarem Kundennutzen**. Ein guter Managed Service reduziert nicht nur interne Kosten; er erhöht die Verlässlichkeit und macht den Wert der Zusammenarbeit für den Kunden verständlich.

## 3. Managed-Service-Verfassung

### 3.1 Globale Betriebsprinzipien

- **MS01 - Outcome vor Aktivität:** Ein Service wird über einen verständlichen Ziel- und Ergebnissatz definiert, nicht über eine Liste abrechenbarer Tätigkeiten.
- **MS02 - Kundenziel vor Standardideal:** Servicekonfigurationen richten sich nach Strategie-DNA, Risikobereitschaft, regulatorischem Bedarf, Budget, Kapazität und bewusst gewähltem Zielniveau.
- **MS03 - Shared Responsibility ist sichtbar:** Kunde, Service Provider und Plattform besitzen getrennte, nachvollziehbare Verantwortungen. Unklare Verantwortung darf nicht durch Automatisierung verdeckt werden.
- **MS04 - Standardkern, kontrollierte Konfiguration:** Wiederverwendung ist Standard; kundenspezifische Abweichung braucht Begründung, Owner, Kosten-/Risikowirkung und gegebenenfalls Ablaufdatum.
- **MS05 - Service und Beratung bleiben unterscheidbar:** Wiederkehrende Leistung, einmaliges Projekt, Change Request, Sonderanalyse und Produktfunktion werden fachlich und wirtschaftlich getrennt.
- **MS06 - Ein Service ist versioniert:** Scope, Schwellen, Frequenzen, Rollen, Berichtspakete und Abhängigkeiten können sich ändern, aber nie rückwirkend oder still.
- **MS07 - Datenvertrauen ist Teil der Leistung:** Fehlende, veraltete oder widersprüchliche Daten werden als Servicehindernis sichtbar und nicht als scheinbar belastbares Ergebnis ausgegeben.
- **MS08 - Freigaben bleiben menschlich:** Materiale Risikoakzeptanz, Zieländerung, Scope-Erweiterung, externe Veröffentlichung und kostenkritische Entscheidung benötigen autorisierte Freigabe.
- **MS09 - Automatisierung arbeitet innerhalb eines Vertrags:** Workflows dürfen nur innerhalb genehmigter Parameter, Rechte und Guardrails handeln.
- **MS10 - Qualität wird eingebaut:** Quality Gates liegen vor, während und nach der Delivery; Qualitätsprüfung ist kein später kosmetischer Schritt.
- **MS11 - Wert ist mehrdimensional:** Nutzen umfasst Risikowirkung, Zielerreichung, Verlässlichkeit, Zeitersparnis, Entscheidungsqualität, Transparenz und gegebenenfalls wirtschaftliche Wirkung.
- **MS12 - Eskalation ist kein Versagen:** Frühzeitige Eskalation bei Blockern, Zielkonflikt oder Datenlücke ist gewünschtes Verhalten.
- **MS13 - Exit-Fähigkeit ist Pflicht:** Kunde und Provider können Service, Daten, Entscheidungen und offene Arbeit geordnet übergeben, reduzieren oder beenden.
- **MS14 - Portfolio-Lernen respektiert Mandantentrennung:** Wiederverwendung und Benchmarks erfolgen nur auf freigegebenen, abstrahierten oder anonymisierten Mustern.
- **MS15 - Keine versteckte Verkaufslogik:** Service Opportunities werden fachlich begründet, mit interner Alternative und Nichtstun-Option dargestellt.

### 3.2 Was ein Managed Service nicht ist

- kein dauerhaft offenes Beratungsprojekt ohne Ergebnis- und Scopegrenze,
- keine Ansammlung wiederkehrender Meetings,
- kein Ersatz für Kundenverantwortung oder Risikoakzeptanz,
- kein Versprechen vollständiger Sicherheit oder Zertifizierung,
- kein Ticket-Abarbeitungsmodell ohne Wirkungskontrolle,
- kein Upsell-Banner im Dashboard,
- keine ungeregelte Vollautomatisierung,
- keine stillschweigende Übernahme fachlicher oder regulatorischer Haftung,
- kein individueller Sonderbau, der bei jedem Mandanten neu beginnt,
- kein Servicebericht, der nur Aktivitätsmengen aufzählt.

## 4. Kanonisches Serviceobjektmodell

Das Betriebsmodell trennt wiederverwendbare Definition, kundenspezifische Aktivierung und konkrete Leistungserbringung. Dadurch bleiben Produkt, Vertrag, Delivery und Historie nachvollziehbar.

[[FIGURE:FIG2]]

### 4.1 Service Definition

Die **Service Definition** ist ein versioniertes, mandantenunabhängiges Muster. Sie enthält:

- Service-ID, Name, Kategorie und Zweck,
- standardisierten Outcome-Satz,
- fachliche Voraussetzungen,
- Standard-Scope und ausdrückliche Ausschlüsse,
- Standardrollen und Verantwortungsmuster,
- empfohlene Frequenzen und Trigger,
- erforderliche Daten und Integrationen,
- Standard-Workflows, Work Packages und Deliverables,
- Quality Gates und Mindestnachweise,
- mögliche KPI-, SLA- und Value-Metriken,
- bekannte Risiken, Grenzen und Abhängigkeiten,
- kompatible Zielprofile, Branchen- und Framework-Packs,
- zulässige Konfigurationsparameter,
- optionale Zusatzmodule und Exit-Anforderungen.

### 4.2 Service Offer

Ein **Service Offer** ist die kommerzielle und vertriebliche Ausprägung einer Service Definition. Es kann Paketstufe, Mengeneinheit, Leistungsband, optionale Add-ons, Preislogik und Vertragsbedingungen enthalten. Die genaue Ausgestaltung ist Gegenstand von Dokument 14.

### 4.3 Service Instance

Die **Service Instance** ist die aktivierte kundenspezifische Leistung. Pflichtbestandteile:

| Feldgruppe | Inhalt |
|---|---|
| Identität | Service-Instance-ID, Mandant, Service Definition, Version, Status |
| Outcome | kundenspezifischer Ergebnissatz und Zielbezug |
| Scope | Organisation, Prozesse, Assets, Controls, Regionen, Standards, Datenquellen |
| Grenzen | explizite Ausschlüsse, Annahmen und Kundenabhängigkeiten |
| Rollen | Service Owner, Engagement Manager, Delivery Lead, Kunden-Owner, Reviewer, Approver |
| Rhythmus | Frequenzen, Kalender, Trigger, Reviewtermine und Geschäftskritikalität |
| Verpflichtungen | Serviceziele, SLA/OLA, Quality Gates und Mitwirkungspflichten |
| Konfiguration | Schwellen, Berichtsprofil, Sprachen, Eskalationspfade, Integrationen |
| Kapazität | vereinbartes Leistungsband und genehmigte Flexibilität |
| Artefakte | Charter, Baseline, Runbooks, Reports, Decision Records, Exit Pack |
| Wertmodell | Baseline, erwarteter Nutzen, Messpunkte und Value-Ledger-Verknüpfung |
| Historie | Versionen, Änderungen, Reviews, Ausnahmen, Incidents und Entscheidungen |

### 4.4 Service Charter

Die Service Charter ist die verständliche, freigabefähige Betriebsvereinbarung innerhalb der Plattform. Sie übersetzt Service Definition und Vertrag in operative Klarheit. Sie enthält mindestens:

- Warum dieser Service existiert,
- welches Ergebnis erreicht oder aufrechterhalten werden soll,
- was innerhalb und außerhalb des Scopes liegt,
- welche Verantwortung Kunde und Provider besitzen,
- welche Daten, Zugänge und Mitwirkung benötigt werden,
- welche regelmäßigen und ereignisgetriebenen Leistungen erfolgen,
- welche Deliverables und Entscheidungen entstehen,
- wann und wie eskaliert wird,
- wie Qualität, Vertrauen und Wert gemessen werden,
- wie Änderungen, Pause, Exit und Übergabe funktionieren.

### 4.5 Service Run, Deliverable und Outcome Review

Ein **Service Run** repräsentiert eine konkrete Periode oder einen Trigger, etwa Monatszyklus, Quartalsreview, neuer kritischer Threat, Policy Review oder Audit-Vorbereitung. Er bündelt Work Packages, Entscheidungen, Evidence, Deliverables, Quality Gates und Abweichungen.

Ein **Deliverable** ist das prüfbare Ergebnis eines Runs, zum Beispiel:

- freigegebener Risiko-Review,
- Control-Assurance-Paket,
- Management Report,
- aktualisierte Policy,
- Audit Readiness Pack,
- Supplier-Risk-Bewertung,
- Decision Card,
- Maßnahmen- und Verbesserungsplan.

Der **Outcome Review** prüft später, ob das erwartete Ergebnis tatsächlich eingetreten ist. Ein abgeschlossener Run ohne Outcome Review ist vollständig dokumentiert, aber noch nicht als wirksam bestätigt.

## 5. Rollen und Verantwortungsarchitektur

### 5.1 Betreiber- und Delivery-Rollen

| Rolle | Hauptverantwortung | Darf entscheiden | Darf nicht allein entscheiden |
|---|---|---|---|
| Managed Service Lead | Serviceportfolio, Methode, Qualität, Skalierung und Eskalationsrahmen | Standards, Quality Gates, Portfolioverbesserungen innerhalb Mandat | kundenbezogene Risikoakzeptanz oder Scopeausweitung ohne Freigabe |
| Engagement Manager | Kundenbeziehung, Charter, Governance, Scope und Delivery-Erfolg | Priorisierung und Ressourcen innerhalb genehmigtem Serviceband | kommerzielle oder materiale Zieländerung ohne Genehmigung |
| Service Delivery Lead | laufender Betrieb einer Service Instance | Runplanung, Work Packages, operative Eskalation | verbindliche Risikoakzeptanz oder Vertragsänderung |
| ISMS Consultant | Analyse, Empfehlung, Umsetzung und Kommunikation | fachliche Entwürfe und operative Entscheidungen innerhalb Guardrails | unabhängige Freigabe eigener materialer Ergebnisse |
| Specialist Consultant | technischer oder regulatorischer Spezialinput | Spezialbewertung innerhalb Auftrag | Erweiterung des Serviceumfangs |
| Quality Reviewer | unabhängige Qualitätsprüfung | Freigabe oder Rückgabe gemäß Quality Gate | Delivery-Ziele oder Kundenrisiko verändern |
| Platform Operations | technischer Plattformbetrieb | Betriebsmaßnahmen gemäß Runbook | fachliche Serviceentscheidung |
| Service Designer / Product Owner | Service Definitionen und Workflow-Packs | Standardentwicklung nach Governance | kundenspezifische Aktivierung ohne Engagement Owner |

### 5.2 Kundenrollen

- **Executive Sponsor:** bestätigt Ziel, Budget, Risikobereitschaft und materiale Entscheidungen.
- **CISO / Security Lead:** fachlicher Auftraggeber, priorisiert Risiken und Servicewirkung.
- **ISMS Manager:** operativer Kunden-Owner, koordiniert Daten, Owner, Reviews und Maßnahmen.
- **Control / Asset / Process Owner:** liefert Umsetzung, Kontext, Evidence und Freigaben im Zuständigkeitsbereich.
- **Procurement / Vendor Management:** begleitet Vertrag, Leistungsänderung und wirtschaftliche Governance.
- **Data / Tenant Administrator:** stellt Rollen, Zugänge, Datenquellen und Mandantenkonfiguration bereit.
- **Auditor / Reviewer:** unabhängige Prüfung ohne operative Delivery-Verantwortung.

### 5.3 Shared Responsibility

[[FIGURE:FIG3]]

**Festlegung:** Eine Service Instance darf erst aktiviert werden, wenn für jede materiale Aktivität und Entscheidung ein verantwortlicher Owner, eine Mitwirkungspflicht und eine Eskalation definiert sind. „Provider übernimmt“ ist ohne konkreten Scope und Entscheidungsrecht keine gültige Verantwortungsbeschreibung.

### 5.4 RACI+ Modell

Neben Responsible, Accountable, Consulted und Informed verwendet die Plattform zwei zusätzliche Dimensionen:

- **Approver:** besitzt formale Freigabeautorität für Version, Risiko, Scope oder Veröffentlichung.
- **Evidence Owner:** verantwortet Aktualität, Herkunft und Eignung eines benötigten Nachweises.

Die Matrix ist objekt-, mandanten-, service- und schwellenwertbezogen. Ein CISO kann etwa Risikoentscheidungen bis zu einer definierten Grenze freigeben; oberhalb davon wird der Executive Sponsor benötigt.

## 6. Managed-Service-Lebenszyklus

### 6.1 Kanonische Phasen

`Bedarf erkannt -> qualifiziert -> entworfen -> angeboten -> beauftragt -> Transition geplant -> in Transition -> operational ready -> aktiv -> unter Review -> geändert/pausiert -> beendet -> übergeben/archiviert`

Zusatzstatus:

- `blockiert`: notwendige Daten, Zugang, Mitwirkung oder Freigabe fehlt,
- `at risk`: Leistungsziel oder Servicequalität droht zu kippen,
- `suspended`: Service ist kontrolliert pausiert,
- `exit in progress`: Übergabe und Restarbeiten laufen,
- `terminated for cause`: außerordentliche Beendigung mit gesondertem Governancepfad.

### 6.2 Gate-Prinzip

Jeder Phasenwechsel besitzt ein klares Exit-Kriterium. Beispielsweise wird aus „in Transition“ erst „operational ready“, wenn:

- Scope und Charter freigegeben sind,
- Rollen, Zugänge und Kommunikationswege funktionieren,
- Mindestdaten vorhanden und bewertet sind,
- Baseline und bekannte Datenlücken dokumentiert sind,
- Runbooks, Quality Gates und Eskalationswege bereitstehen,
- erster Servicekalender und Reportzyklus geplant sind,
- Datenschutz-, Sicherheits- und Mandantentrennungsprüfung bestanden ist,
- offene Risiken akzeptiert oder mit Maßnahmen versehen sind.

## 7. Bedarfserkennung und Servicequalifizierung

Servicebedarf kann aus folgenden Signalen entstehen:

- Zielroute zeigt dauerhaft fehlende interne Kapazität,
- Controls oder Policies werden wiederholt überfällig,
- Evidence-Qualität ist strukturell zu niedrig,
- kritischer Audit- oder regulatorischer Termin nähert sich,
- Bedrohungs- oder Schwachstellensignale übersteigen die Bearbeitungsfähigkeit,
- wiederkehrende Management- oder Reportingpflichten binden hohe Zeit,
- Servicezustand eines bestehenden Services ist unzureichend,
- Kunde möchte bewusst einen höheren Managed-Service-Anteil,
- Benchmark oder Portfolioanalyse zeigt ein geeignetes Standardmuster.

### 7.1 Qualifizierungsfragen

1. Welches konkrete Outcome soll erreicht oder aufrechterhalten werden?
2. Ist die Ursache fehlende Fähigkeit, Kapazität, Methode, Datenqualität oder Entscheidungsfähigkeit?
3. Kann der Kunde das Ziel intern erreichen? Welche Alternative besteht?
4. Ist ein Managed Service geeigneter als Projekt, Produktfunktion, Schulung oder einmalige Beratung?
5. Welche Verantwortung muss zwingend beim Kunden verbleiben?
6. Sind Daten, Zugänge, Owner und Budget realistisch verfügbar?
7. Ist das Leistungsmuster standardisierbar und wiederholbar?
8. Wie wird Wirkung später überprüft?

### 7.2 Service Opportunity Card

Eine Opportunity Card enthält:

- fachlichen Auslöser und Datenquellen,
- betroffene Ziele, Risiken und Prozesse,
- interne Umsetzungsoption,
- Managed-Service-Option,
- Nichtstun-Option,
- erwartete Wirkung und Unsicherheit,
- erforderliche Mitwirkung,
- potenzielle Abhängigkeiten,
- Hinweis, ob es sich nur um einen Vorschlag handelt.

Sie darf keine Verkaufsentscheidung automatisch auslösen.

## 8. Service Design und Konfiguration

### 8.1 Konfigurationsdimensionen

- Mandant, Organisation, Standorte und Scope,
- Zielprofil und Risikotoleranzen,
- Standards, Regulierungen und Branchenanforderungen,
- Servicefrequenz und ereignisbasierte Trigger,
- Servicezeiten und kritische Kalender,
- Mengentreiber und Komplexitätsband,
- Rollen, Freigaben und Eskalationsstufen,
- Datenquellen, Integrationen und Aktualität,
- Report- und Meetingprofil,
- Sprache, Region und Zeitzone,
- Automatisierungsgrad,
- Quality Gates und Stichprobenumfang,
- zulässige Flexibilität und Change-Schwellen,
- Exit- und Übergabeanforderungen.

### 8.2 Standard, Konfiguration und Customization

[[FIGURE:FIG4]]

Die Plattform unterscheidet vier Ebenen:

1. **Standardkern:** wiederverwendbare Methode, Datenobjekte, Quality Gates, Rollen und Basisworkflows.
2. **Konfiguration:** Parameter, Schwellen, Frequenzen, Integrationen, Sprache und Berichtspaket.
3. **Kundenspezifische Erweiterung:** begründete, versionierte Ergänzung innerhalb Produktarchitektur.
4. **Custom Build / Ausnahme:** gesondert bewertete Entwicklung oder Leistung außerhalb Standardbetriebs.

Eine Ausnahme wird nicht still zum neuen Standard. Erst nach wiederholtem Nutzen, Quality Review und Product-Governance-Entscheidung kann sie als wiederverwendbare Fähigkeit aufgenommen werden.

### 8.3 Service Blueprint

Jede Service Definition besitzt einen Blueprint mit:

- Frontstage: sichtbare Kundenerlebnisse, Meetings, Reports und Entscheidungen,
- Backstage: Analysen, Prüfungen, Workflows und Quality Gates,
- Plattformautomation: Trigger, Datenvalidierung, Aufgaben und Reportentwürfe,
- Kundenmitwirkung: Daten, Freigaben, Maßnahmen und Fachkontext,
- Failover: manuelle Ersatzprozesse bei Integrations- oder KI-Ausfall,
- Messpunkte: Flow, Qualität, Vertrauen, Outcome und Wert.

## 9. Transition und Operational Readiness

### 9.1 Transition Plan

Der Transition Plan bündelt:

- bestätigten Scope und Service Charter,
- Stakeholder- und Rollenplan,
- Daten- und Integrationsinventar,
- Zugangs- und Berechtigungsplan,
- Baseline und Datenqualitätsbewertung,
- offene Risiken und Abhängigkeiten,
- initiale Work Packages,
- Kommunikations- und Meetingkalender,
- Reportingprofil,
- Schulung und Adoption,
- Cutover- und Rückfallplan,
- Operational-Readiness-Check.

### 9.2 Baseline

Eine Baseline ist kein behaupteter Nullpunkt, sondern ein versionierter Snapshot mit:

- aktuellem Ziel- und Reifegradstatus,
- offenem Risiko- und Maßnahmenbestand,
- Control- und Evidence-Zustand,
- vorhandenen Service- und Prozessmetriken,
- Datenquellen, Aktualität und Confidence,
- bekannten Lücken und manuellen Annahmen,
- initialer Kapazitäts- und Aufwandsannahme,
- erwarteter Servicewirkung und Messzeitpunkt.

### 9.3 Operational Readiness Review

Vor Aktivierung bestätigen Kunde und Provider:

- Was wird ab Tag 1 geliefert?
- Was ist noch nicht verfügbar?
- Welche Risiken bestehen in der Anlaufphase?
- Welche Mitwirkung ist bis wann erforderlich?
- Welche Deliverables entstehen im ersten Zyklus?
- Welche Schwellen lösen Eskalation aus?
- Wann wird die Transition formell abgeschlossen?

## 10. Steady-State Delivery

### 10.1 Delivery als Service Runs

Der Regelbetrieb besteht aus planbaren und ereignisgetriebenen Service Runs.

| Run-Typ | Auslöser | Beispiel |
|---|---|---|
| periodisch | Kalender | monatlicher Risk Review, quartalsweises Management Review |
| ereignisgetrieben | Signal oder Schwelle | kritische Schwachstelle, neue regulatorische Anforderung |
| meilensteinbezogen | Zielroute oder Projektfortschritt | Audit T-90, Policy Rollout, Control Go-live |
| kundeninitiiert | Request oder Entscheidung | neue Gesellschaft, Scope-Erweiterung, Ausnahmeprüfung |
| providerinitiiert | Qualitäts- oder Verbesserungsbedarf | Datenbereinigung, Methodenanpassung, Service Recovery |

### 10.2 Run-Plan

Jeder Run enthält:

- Ziel und erwartetes Outcome,
- Scope und Daten-Snapshot,
- benötigte Work Packages,
- verantwortliche Rollen,
- Abhängigkeiten und Kundenmitwirkung,
- Fälligkeiten, SLA/OLA und Geschäftskalender,
- Quality Gates,
- geplante Deliverables,
- relevante Risiken und Eskalationspfade,
- Outcome-Review-Datum.

### 10.3 Work Packages

Wiederkehrende Arbeit wird nicht als unstrukturierte Taskliste modelliert. Ein Work Package bündelt:

- Ergebnis und Definition of Done,
- standardisierte Tasks und Prüfschritte,
- benötigte Evidence und Entscheidungen,
- Rollen und Reviewanforderungen,
- Automatisierungsschritte,
- Zeit-/Kapazitätsannahme,
- Varianten und Fehlerpfade,
- Wiederverwendungs- und Lernhinweise.

### 10.4 Delivery-Handovers

Bei Urlaub, Reise, Rollenwechsel oder Agenten-/Sessionwechsel wird ein Handover Packet erzeugt. Es enthält aktuellen Stand, nächste Handlung, offene Entscheidungen, Kundenkontext, SLA-Risiken, relevante Artefakte und Wiedereinstiegspunkt.

## 11. Betriebsrhythmen und Servicekalender

### 11.1 Empfohlene Rhythmen

| Rhythmus | Zweck | Typische Teilnehmer |
|---|---|---|
| kontinuierlich | Signale, Integrationen, Schwellen und Automationen überwachen | Plattform, Delivery Lead |
| täglich / bei Bedarf | Mission, Blocker und kritische Events steuern | Consultant, Delivery Lead |
| wöchentlich | Work Packages, Entscheidungen, Datenlücken und Kapazität prüfen | Delivery Team, ISMS Manager |
| monatlich | Servicebericht, SLA/Qualität, Risiko, Wert und nächste Prioritäten | Engagement Manager, CISO/ISMS |
| quartalsweise | Zielroute, Servicefit, Verbesserungen und Scope überprüfen | Service Lead, Executive Sponsor |
| jährlich / anlassbezogen | Charter, Methodik, Vertrag, Zielprofil und Exit-Fähigkeit prüfen | Kunde, Provider, Procurement |

Rhythmus ist konfigurierbar. Ein kleiner Kunde mit bewusstem Zielniveau benötigt möglicherweise einen anderen Takt als eine regulierte Bank. Häufigkeit allein ist kein Qualitätsmerkmal.

### 11.2 Integrierter Kalender

Der Servicekalender verknüpft:

- Service Runs und Reviews,
- Audit- und Regulatoriktermine,
- Policy- und Evidence-Fälligkeiten,
- Kundengremien,
- Abwesenheiten, Skills und Vertretungen,
- Vor-Ort-Termine, Reisezeit und Reisekosten,
- kritische Geschäftsperioden und Change Freezes,
- geplante Report- und Entscheidungszeitpunkte.

Detaillierte Ressourcen- und Reiseoptimierung folgt in Dokument 15.

## 12. Leistungsversprechen, SLA und OLA

Dokument 13 definiert die Semantik, nicht die finalen Zahlen.

### 12.1 Ebenen des Leistungsversprechens

- **Outcome Commitment:** welches Ergebnis der Service unterstützen oder aufrechterhalten soll.
- **Deliverable Commitment:** welches prüfbare Artefakt oder welche Entscheidung entsteht.
- **Flow Commitment:** Reaktions-, Bearbeitungs- oder Durchlaufzeit.
- **Quality Commitment:** Mindestqualität, Reviewtiefe und Evidence-Anforderungen.
- **Availability Commitment:** Verfügbarkeit von Plattform oder Servicekanal, sofern relevant.
- **Customer OLA:** Mitwirkung, Daten, Freigaben und Reaktionszeiten auf Kundenseite.
- **Dependency Commitment:** Annahmen zu Drittanbietern, Integrationen und Datenquellen.

### 12.2 Messregeln

Jede Metrik braucht:

- klare Definition und Einheit,
- Start- und Endereignis,
- Geschäftskalender und Pausenlogik,
- Datenquelle und Methodenversion,
- Ausschluss- und Ausnahmebehandlung,
- Owner und Reviewer,
- Schwellen und Eskalation,
- Visualisierung und Reportingfrequenz.

### 12.3 SLA-Pause und Kundenabhängigkeit

Eine SLA-Uhr darf nur pausieren, wenn ein dokumentierter Kundeninput objektiv erforderlich ist. Die Plattform zeigt:

- fehlenden Input,
- Zeitpunkt und Verantwortlichen der Anfrage,
- Auswirkung auf Outcome und Termin,
- automatische Erinnerung und Eskalation,
- erneuten Start der Uhr.

Der Provider darf fehlende interne Kapazität nicht als Kundenabhängigkeit klassifizieren.

## 13. Service Health und Betriebssteuerung

### 13.1 Service-Health-Dimensionen

| Dimension | Leitfrage |
|---|---|
| Outcome | Erreicht oder stabilisiert der Service das vereinbarte Ergebnis? |
| Delivery | Werden Runs und Deliverables verlässlich geliefert? |
| Qualität | Bestehen Review, Evidence und fachliche Plausibilität? |
| Vertrauen | Sind Daten, Methoden und Aussagen belastbar? |
| Flow | Wo entstehen Wartezeit, Rework oder Blocker? |
| Beziehung | Funktionieren Zusammenarbeit, Mitwirkung und Eskalation? |
| Kapazität | Ist die vereinbarte Leistung mit vorhandenen Skills realistisch? |
| Wirtschaftlichkeit | Liegt Aufwand innerhalb des vorgesehenen Leistungsbands? |
| Zukunftsfähigkeit | Verbessert sich der Service oder akkumuliert er technische/fachliche Schulden? |

### 13.2 Health States

`stabil -> beobachten -> at risk -> kritisch -> recovery -> stabilisiert`

Ein Status ist immer mit Ursache, Datenvertrauen, Owner, Handlung und nächstem Review verbunden. „Rot“ ohne Erklärung ist kein gültiger Servicezustand.

### 13.3 Service Recovery Plan

Bei kritischem Zustand wird ein Recovery Plan erzeugt:

- bestätigte Ursache,
- Sofortmaßnahme,
- Kunden- und Providerbeitrag,
- temporäre Priorisierung oder Kapazitätsanpassung,
- erwarteter Stabilisierungspunkt,
- Kommunikationsrhythmus,
- Quality- und Outcome-Review,
- Entscheidung über strukturelle Verbesserung oder Scopeänderung.

## 14. Qualitätsmanagement und Service Assurance

### 14.1 Quality Gates

- **Design Gate:** Outcome, Scope, Rollen und Voraussetzungen sind klar.
- **Readiness Gate:** Daten, Zugänge, Baseline und Runbooks sind bereit.
- **Run Gate:** Inputs und Verantwortungen für einen Service Run sind vollständig.
- **Technical / Fach Review:** Analyse, Methode und Evidence sind plausibel.
- **Communication Review:** Report oder Empfehlung ist zielgruppengerecht und nachvollziehbar.
- **Approval Gate:** autorisierte Freigabe liegt vor.
- **Outcome Gate:** tatsächliche Wirkung wird nach angemessener Zeit überprüft.
- **Exit Gate:** Daten, offene Arbeit und Verantwortung sind übergeben.

### 14.2 Unabhängigkeit

Materiale Ergebnisse können ein Vier-Augen-Prinzip verlangen. Der Reviewer darf nicht ausschließlich die eigene Arbeit bestätigen. Rollen- und Schwellenlogik bestimmt, wann unabhängige Fach-, Security-, Audit- oder Managementfreigabe erforderlich ist.

### 14.3 Stichproben und Portfolio-QA

Nicht jeder Run benötigt gleiche Tiefe. Die Plattform unterstützt:

- risikobasierte Stichprobe,
- zufällige Stichprobe,
- Vollprüfung bei kritischem Scope,
- erhöhte Prüfung in Transition oder Recovery,
- thematische Portfolio-Reviews,
- Review von manuellen Overrides und Ausnahmen,
- Trendanalyse von Rework, Findings und Datenlücken.

### 14.4 Definition of Done für Services

Ein Run gilt nicht allein deshalb als fertig, weil alle Tasks geschlossen sind. Er ist fertig, wenn:

- erwartetes Deliverable vorliegt,
- Quality Gates bestanden sind,
- offene Abweichungen sichtbar sind,
- erforderliche Freigaben bestehen,
- Kundenkommunikation erfolgt ist,
- Folgeaktionen und Owner angelegt sind,
- Messpunkt für Outcome Review feststeht,
- Dokumentation und Value Ledger aktualisiert sind.

## 15. Governance und Service Reviews

### 15.1 Governance-Ebenen

| Ebene | Fokus | Typische Entscheidungen |
|---|---|---|
| Operational Delivery | aktueller Run, Blocker, Evidence, Tasks | umplanen, eskalieren, Input anfordern |
| Service Management | Qualität, SLA/OLA, Kapazität, Reporting | Recovery, Priorität, Verbesserungsmaßnahme |
| Customer Governance | Ziel, Risiko, Wert, Scope und Beziehung | Zielroute, Serviceänderung, Investition |
| Portfolio / Practice | Standards, Wiederverwendung, Profitabilität, Qualität | Template verbessern, Paket ändern, Capability aufbauen |
| Product Governance | Plattformfähigkeit und Roadmap | Feature, Integration, Automatisierung oder Custom Build |

### 15.2 Monthly Service Review

Ein monatliches Review beantwortet:

1. Was wurde erreicht und was blieb offen?
2. Welche material relevanten Änderungen traten ein?
3. Wie steht es um SLA/OLA, Qualität und Datenvertrauen?
4. Welche Wirkung ist sichtbar und welche noch unbewiesen?
5. Wo bestehen Blocker oder Kundenabhängigkeiten?
6. Welche Entscheidungen und Freigaben sind erforderlich?
7. Welche Verbesserung ist im nächsten Zyklus am wertvollsten?

### 15.3 Quarterly Value & Strategy Review

Das Quartalsreview verbindet Service und Kundenstrategie:

- Zielroute und Reifegradentwicklung,
- Risiko- und Control-Wirkung,
- tatsächliche versus erwartete Servicewirkung,
- interne Kapazität und Managed-Service-Anteil,
- Budget- und Investitionsoptionen,
- Servicefit, Scope und zukünftige Prioritäten,
- Entscheidung, fortsetzen, verändern, erweitern, reduzieren oder beenden.

### 15.4 Governance-Artefakte

- Service Review Pack,
- Decision Cards und Decision Records,
- Risk and Issue Log,
- Improvement Backlog,
- Change Requests,
- Action Register,
- Value Ledger,
- aktualisierte Charter und Roadmap.

## 16. Issue, Incident, Problem und Eskalation

### 16.1 Begriffe

- **Issue:** aktuelle Abweichung, die Delivery, Qualität oder Outcome beeinträchtigt.
- **Incident:** ungeplantes Ereignis mit unmittelbarer Auswirkung auf Service oder Sicherheit.
- **Problem:** zugrunde liegende Ursache eines oder mehrerer Issues/Incidents.
- **Risk:** mögliches zukünftiges Ereignis oder Unsicherheit.
- **Escalation:** bewusste Verlagerung an eine Rolle mit höherer Autorität oder zusätzlicher Fähigkeit.

### 16.2 Eskalationsstufen

| Stufe | Beispiel | Reaktion |
|---|---|---|
| Hinweis | kleinere Datenlücke ohne Terminwirkung | im Run bearbeiten |
| Warnung | SLA- oder Qualitätsrisiko | Delivery Lead und Kunden-Owner informieren |
| material | Ziel, Audit, Risiko oder Deliverable gefährdet | Engagement Manager und CISO entscheiden |
| kritisch | erhebliche Sicherheits-/Vertrags-/Reputationswirkung | Service Lead, Executive Sponsor, Security/Legal je Bedarf |
| Krise | schwerwiegender Incident oder Vertrauensverlust | definierter Krisen- und Kommunikationsprozess |

### 16.3 Blameless Problem Review

Nach materialem Fehler wird nicht nur gefragt „Wer hat es verursacht?“, sondern:

- Welche Bedingungen machten den Fehler möglich?
- Welche Guardrails oder Signale fehlten?
- Warum erkannte ein Quality Gate ihn nicht?
- Muss Methode, Automatisierung, Training, Datenvertrag oder Charter angepasst werden?
- Ist der Fehler mandantenspezifisch oder portfolioübergreifend?

Personelle Verantwortlichkeit und arbeitsrechtliche Fragen bleiben außerhalb der Produktlogik; die Plattform unterstützt sachliche Ursachen- und Verbesserungsanalyse.

## 17. Change-, Scope- und Ausnahme-Management

### 17.1 Change-Arten

- Konfigurationsänderung innerhalb genehmigter Parameter,
- Service Change mit Auswirkung auf Scope, Frequenz oder Commitment,
- Notfalländerung,
- kundenspezifische Erweiterung,
- Custom Build / Sonderprojekt,
- temporäre Ausnahme,
- Servicepause oder Reduktion,
- Ziel- oder Strategieänderung.

### 17.2 Change Request

Ein Change Request enthält:

- Auslöser und gewünschtes Ergebnis,
- betroffene Service Instance und Version,
- fachliche, technische und wirtschaftliche Auswirkung,
- Kapazitäts- und Terminwirkung,
- Risiko und Datenschutzwirkung,
- Alternative und Nichtstun-Option,
- erforderliche Freigaben,
- Rollback- oder Exit-Plan,
- Wirksamkeitsreview.

### 17.3 Scope Creep Guardrail

Wiederkehrende Zusatzarbeit wird automatisch sichtbar, wenn sie:

- außerhalb des Charter-Scopes liegt,
- wiederholt als „kleine Ausnahme“ auftritt,
- Kapazitätsband überschreitet,
- neue Skills oder Integrationen erfordert,
- zugesagte Deliverables gefährdet.

Die Plattform schlägt nicht automatisch eine Rechnung vor, sondern fordert eine transparente Entscheidung: stoppen, priorisieren, tauschen, Change Request, Projekt oder Serviceerweiterung.

## 18. Customer Responsibilities und Mitwirkungsmanagement

Kundenmitwirkung ist Teil der Servicequalität und wird respektvoll, transparent und nicht als Schuldzuweisung behandelt.

### 18.1 Typische Kundenpflichten

- Ziel, Risikobereitschaft und Priorität bestätigen,
- benannte Owner und Entscheider bereitstellen,
- Daten und Zugänge fristgerecht liefern,
- fachlichen Kontext und Ausnahmen erklären,
- Maßnahmen im eigenen Verantwortungsbereich umsetzen,
- Risiko-, Budget- und Scopeentscheidungen treffen,
- interne Kommunikation und Stakeholderzugang ermöglichen,
- Datenschutz- und Betriebsanforderungen mitteilen,
- Reports und Deliverables prüfen und freigeben.

### 18.2 Mitwirkungs-Dashboard

Es zeigt:

- ausstehende Kundeninputs,
- Auswirkung auf Serviceziel und Termin,
- Owner und Eskalationspfad,
- SLA-Pausen mit Begründung,
- wiederkehrende Engpässe,
- Vorschläge zur Vereinfachung oder Automatisierung.

### 18.3 Fairnessprinzip

Die Plattform darf Kunden nicht durch künstlich komplexe Requests überlasten. Evidence Requests und Freigaben müssen klar, gebündelt, kontextbezogen und nach Wirkung priorisiert sein.

## 19. Provider Responsibilities und Delivery Governance

Der Provider verpflichtet sich zu:

- methodisch konsistenter und fachlich kompetenter Leistung,
- klarer Kommunikation von Grenzen und Unsicherheit,
- qualifizierten Rollen und Vertretungen,
- Einhaltung von Security-, Datenschutz- und Mandantentrennungsregeln,
- nachvollziehbarer Dokumentation und Versionierung,
- frühzeitiger Eskalation,
- unabhängiger Qualitätssicherung nach Schwelle,
- Transparenz über Abhängigkeiten, Automatisierung und manuelle Overrides,
- geordneter Übergabe und Exit-Unterstützung,
- kontinuierlicher Verbesserung ohne ungefragte Scopeausweitung.

## 20. Value Management und Nutzenbeweis

### 20.1 Value Hypothesis

Vor Aktivierung wird festgelegt, welche Wirkung plausibel erwartet wird. Beispiele:

- geringere Aufbereitungszeit für Management Reviews,
- höhere Termintreue bei Evidence und Maßnahmen,
- schnellere Reaktion auf kritische Risikosignale,
- stabilere Control-Wirksamkeit,
- geringerer Koordinationsaufwand,
- bessere Entscheidungsqualität,
- höhere Transparenz über Zielroute und Verantwortung,
- reduzierte Abhängigkeit von Einzelpersonen.

### 20.2 Value Ledger

Das Value Ledger trennt:

- erwarteten Nutzen,
- beobachteten Proxy,
- bestätigten tatsächlichen Nutzen,
- monetäre Annahme,
- Confidence und Datenquelle,
- verantwortlichen Reviewer,
- mögliche negative Nebenwirkung.

### 20.3 Aktivität, Output, Outcome, Impact

| Ebene | Beispiel |
|---|---|
| Aktivität | 40 Evidence Requests bearbeitet |
| Output | vollständiges Control-Assurance-Paket |
| Outcome | Management kann Control-Wirksamkeit belastbar entscheiden |
| Impact | Zielrisiko sinkt, Auditvorbereitung wird planbarer |

Serviceberichte dürfen Aktivität nicht als Impact ausgeben.

### 20.4 Nutzenreview

Nach angemessener Zeit wird geprüft:

- Ist die erwartete Wirkung eingetreten?
- Welche andere Ursache könnte die Veränderung erklären?
- War Aufwand höher oder niedriger als erwartet?
- Entstanden unerwünschte Nebenwirkungen?
- Soll Service, Route oder Messmethode angepasst werden?

## 21. Service Improvement System

### 21.1 Improvement Backlog

Verbesserungen können aus Reviews, Incidents, Kundenfeedback, Qualitätsprüfungen, Benchmarks oder Delivery-Daten entstehen. Jeder Eintrag enthält:

- Problem oder Chance,
- betroffene Service Definition / Instances,
- erwarteten Nutzen,
- Aufwand und Risiko,
- Datenbasis und Confidence,
- Priorität,
- Owner,
- Experiment oder Umsetzung,
- Reviewdatum.

### 21.2 Verbesserungsarten

- Methode oder Guidance verbessern,
- Workflow vereinfachen,
- Automation ergänzen,
- Datenvertrag oder Integration stabilisieren,
- Quality Gate anpassen,
- Template oder Reporting verbessern,
- Rollen oder Skill Mix verändern,
- Service Scope oder Paket neu schneiden,
- Kundenmitwirkung vereinfachen,
- veraltete Fähigkeit entfernen.

### 21.3 Experiment statt ungeprüfter Standardänderung

Neue Automationen oder Methoden können zunächst als begrenztes Experiment laufen. Erfolgs- und Stopkriterien werden vorher definiert. Erst nach Review wird entschieden, ob sie Standard, optionale Konfiguration oder verworfene Idee werden.

## 22. Multi-Mandanten-Skalierung und Practice Intelligence

### 22.1 Skalierungslogik

Skalierung entsteht durch:

- wiederverwendbare Service Definitions,
- parametrisierte Workflows und Work Packages,
- gemeinsame Objekt- und Datenverträge,
- automatisierte Vorprüfung und Aufgabenerzeugung,
- Portfolio-Mission-Control,
- risikobasierte Quality Assurance,
- Template- und Wissensbibliotheken,
- Skill- und Kapazitätssteuerung,
- anonymisierte Muster und Benchmarks,
- klare Trennung von Standard und Ausnahme.

### 22.2 Portfolio-Sichten

Service Leads sehen mandantenübergreifend nur steuerungsrelevante Informationen:

- Service Health und Eskalationen,
- SLA/OLA-Risiken,
- Qualitäts- und Datenvertrauenstrends,
- Kapazitäts- und Skillengpässe,
- wiederkehrende Ursachen und Rework,
- Serviceprofitabilitätsindikatoren,
- Value-Ledger-Entwicklung,
- geeignete Standardisierungs- oder Verbesserungsmuster.

Mandantendetails bleiben getrennt und rollenbasiert geschützt.

### 22.3 Practice Intelligence

Zulässige Erkenntnisse können sein:

- häufige Control-Lücken je Branche,
- typischer Aufwand eines Work Packages,
- wiederkehrende Datenqualitätsprobleme,
- Wirkung bestimmter Maßnahmen,
- geeignete Report- und Workflow-Templates,
- Frühwarnsignale für Service Recovery.

Nicht zulässig ist die unkontrollierte Nutzung identifizierbarer Kundendaten für andere Mandanten.

## 23. Wissensmanagement und Service Assets

### 23.1 Service Asset Library

- Service Definitions und Charters,
- Runbooks und Work Packages,
- Decision- und Evidence-Templates,
- Quality Checklists,
- Report Packages,
- Integrationsmappings,
- Branchen- und Framework-Packs,
- Lessons Learned,
- Handover- und Exit-Pakete,
- genehmigte Automationen.

### 23.2 Asset Governance

Jedes Asset besitzt Owner, Version, Gültigkeit, Zielgruppe, Einsatzgrenzen, Reviewdatum und Nutzungshistorie. Veraltete Assets werden als überholt markiert und nicht still weiterverwendet.

### 23.3 Wiederverwendung mit Kontext

Ein Template ist kein unveränderliches Rezept. Vor Nutzung prüft die Plattform:

- passt das Zielprofil,
- sind regulatorischer und organisatorischer Kontext vergleichbar,
- sind Datenquellen vorhanden,
- gelten dieselben Schwellen,
- ist eine menschliche Anpassung erforderlich?

## 24. Automatisierung und KI im Servicebetrieb

### 24.1 Deterministische Automatisierung

Geeignete Funktionen:

- Service Runs und Work Packages nach Kalender/Trigger erzeugen,
- Datenaktualität und Pflichtfelder prüfen,
- Evidence Requests und Reminder vorbereiten,
- SLA/OLA-Uhren berechnen,
- Eskalationen nach genehmigter Regel auslösen,
- Report Snapshots und Entwürfe erzeugen,
- Quality Checklists anwenden,
- Handover Packets und Review Agendas zusammenstellen.

### 24.2 KI-gestützte Unterstützung

Mögliche Funktionen:

- Veränderungen und Ursachen zusammenfassen,
- Entwürfe für Serviceberichte und Decision Cards erzeugen,
- wiederkehrende Muster und potenzielle Verbesserungen vorschlagen,
- Datenlücken oder Widersprüche markieren,
- Work Packages oder Service Opportunities vorschlagen,
- Lessons Learned klassifizieren.

### 24.3 Guardrails

KI darf nicht eigenständig:

- Service Scope oder Preis verändern,
- Risiko akzeptieren,
- materiale Kundenaussage veröffentlichen,
- personenbezogene oder mandantenübergreifende Daten unzulässig verwenden,
- SLA-Ausnahme genehmigen,
- Qualitätsreview der eigenen Ausgabe ersetzen,
- Kundenverantwortung oder menschliche Freigabe fingieren.

Jeder KI-Vorschlag zeigt Quelle, Confidence, Modell-/Prompthistorie soweit erforderlich und verantwortliche menschliche Prüfstelle. Dokument 20A konkretisiert diese Regeln.

## 25. Sicherheit, Datenschutz und Mandantentrennung

### 25.1 Mindestprinzipien

- strikte Tenant- und Datenraumtrennung,
- Least Privilege und zeitlich begrenzte Zugänge,
- getrennte Rollen für Delivery, Review, Administration und Freigabe,
- nachvollziehbare Audit Logs,
- Datenklassifikation und Exportkontrolle,
- sichere Behandlung von Credentials und Kundenzugängen,
- definierte Aufbewahrung und Löschung,
- kontrollierte Support- und Break-Glass-Zugriffe,
- keine mandantenübergreifende Lernnutzung ohne Rechts- und Governancegrundlage,
- Exit und Datenrückgabe ohne versteckte Abhängigkeit.

### 25.2 Service-spezifisches Security Review

Vor Aktivierung werden bewertet:

- verarbeitete Datenklassen,
- externe Systeme und Integrationen,
- mögliche Administratorrechte,
- Regionen und Datenresidenz,
- Unterauftragnehmer,
- Export- und Reportingkanäle,
- Notfall- und Widerrufsprozesse,
- Zugriff im Rahmen von Vor-Ort-Audits oder Reisen.

## 26. Wirtschaftlichkeit und Profitabilitätslogik

Dokument 13 definiert die Betriebslogik; konkrete Preise folgen in Dokument 14.

### 26.1 Unit-Economics-Treiber

- Frequenz und Zahl der Service Runs,
- Scope- und Objektmenge,
- Datenqualität und Integrationsgrad,
- Automatisierungsgrad,
- benötigter Skill Mix,
- Review- und Freigabetiefe,
- Kundenmitwirkungsgrad,
- Reise- und Vor-Ort-Anteil,
- regulatorische oder sprachliche Komplexität,
- Ausnahme- und Customization-Anteil,
- Rework, Blocker und Eskalationen.

### 26.2 Profitabilität ohne Qualitätsverlust

Die Plattform soll Profitabilität nicht durch weniger notwendige Prüfung erzeugen, sondern durch:

- geringeren Such- und Aufbereitungsaufwand,
- Wiederverwendung genehmigter Service Assets,
- bessere Daten und weniger Rework,
- planbare Work Packages,
- risikobasierte statt pauschale Reviewtiefe,
- intelligente Bündelung über Termine, Skills und Reisen,
- frühe Scope- und Abhängigkeitsklarheit,
- Portfolio-Lernen und Automation.

### 26.3 Margin Guardrails

Warnsignale:

- dauerhaft höherer Ist-Aufwand als Serviceband,
- hoher Anteil ungebuchter Zusatzarbeit,
- übermäßige Senior-/Spezialistennutzung,
- wiederholte manuelle Datenbereinigung,
- hohe Reise- oder Abstimmungslast,
- steigendes Rework,
- häufige SLA-Pausen und Eskalationen,
- negative oder nicht belegbare Kundenwirkung.

Ein Margin-Problem darf nicht still durch Qualitätsreduktion gelöst werden. Es erfordert Verbesserung, Scopeklärung, Automatisierung, Kapazitätsanpassung oder kommerziellen Change.

## 27. Pause, Reduktion, Exit und Übergabe

### 27.1 Exit-Grundsätze

- Kunde behält Zugriff auf vereinbarte Daten und freigegebene Artefakte.
- Offene Entscheidungen, Risiken und Work Items bleiben nachvollziehbar.
- Rollen und Zugänge werden kontrolliert entzogen.
- Datenexport, Löschung und Aufbewahrung werden protokolliert.
- Transferwissen wird in einem Exit Pack gebündelt.
- Abhängigkeiten von proprietären Automationen oder Methoden werden erklärt.
- Provider unterstützt eine geordnete Übergabe innerhalb vereinbarter Grenzen.

### 27.2 Exit Pack

- aktuelle Service Charter und Scope,
- Status und letzte Baseline,
- offene Risks, Issues, Decisions und Work Packages,
- relevante Runbooks und Konfigurationen,
- Reports, Evidence und Historie gemäß Recht,
- Integrations- und Datenquellenübersicht,
- Zugangs- und Berechtigungsplan,
- offene Verpflichtungen und Fristen,
- Handover Notes und empfohlene nächste Schritte,
- Datenlösch- und Archivierungsnachweis.

### 27.3 Service Reduction

Ein Service kann auch reduziert oder teilweise internalisiert werden. Die Plattform unterstützt einen gestuften Übergang:

- Shadowing,
- gemeinsames Delivery,
- Kunde führt aus / Provider reviewt,
- Kunde übernimmt vollständig,
- optionaler Assurance- oder Review-Service bleibt bestehen.

## 28. Fehler-, Sonder- und Krisenfälle

### 28.1 Unvollständige Transition

Problem: Service soll starten, aber Zugänge und Baseline fehlen.  
Verhalten: Operational Readiness bleibt blockiert; erlaubte Teilservices werden klar gekennzeichnet; keine scheinbare Vollaktivierung.

### 28.2 Kundenmitwirkung fehlt wiederholt

Problem: Evidence und Freigaben bleiben aus.  
Verhalten: gebündelte Requests, Auswirkungen sichtbar, OLA/Eskalation, Governanceentscheidung über Route, Scope oder Unterstützung.

### 28.3 Integration liefert falsche Daten

Problem: automatisierte Auswertung basiert auf fehlerhaftem Connector.  
Verhalten: betroffene Ergebnisse erhalten Warnung, Reportveröffentlichung wird gegebenenfalls blockiert, Snapshot/Claims werden identifiziert, Correction Workflow startet.

### 28.4 Provider-Kapazität reicht nicht

Problem: Team kann Verpflichtung voraussichtlich nicht erfüllen.  
Verhalten: frühzeitige interne Eskalation, Vertretung/Skill Matching, transparente Kundenkommunikation, Recovery Plan; keine falsche SLA-Pause.

### 28.5 Kritischer Security Incident beim Kunden

Problem: Regelbetrieb wird durch Incident überlagert.  
Verhalten: definierter Incident- und Krisenpfad, Schutz vor Scopeverwirrung, Prioritätsentscheidung, spezielle Reports und spätere Lessons Learned.

### 28.6 Automatisierung erzeugt falsche Aufgaben

Problem: Regel oder KI interpretiert Trigger falsch.  
Verhalten: Dry Run/Review, Batch Stop, betroffene Objekte markieren, Ursache korrigieren, keine automatische Löschung der Historie.

### 28.7 Service scheint SLA-konform, aber Outcome scheitert

Problem: Aktivität und Fristen stimmen, Zielwirkung bleibt aus.  
Verhalten: Outcome Review, Methodenanalyse, Service Improvement oder Scope-/Zielentscheidung. SLA-Erfüllung darf das Problem nicht verdecken.

### 28.8 Beziehung oder Vertrauen kippt

Problem: Kunde zweifelt an Transparenz oder Unabhängigkeit.  
Verhalten: nachvollziehbarer Daten-/Entscheidungsreview, unabhängige QA, klare Darstellung von Unsicherheit und Interessen, gegebenenfalls Governance-Eskalation.

## 29. End-to-End-Szenarien

### 29.1 Managed Risk Management wird aktiviert

1. Zielroute zeigt wiederholte Überfälligkeit und fehlende interne Kapazität.
2. Plattform erzeugt fachlich begründete Service Opportunity Card.
3. Kunde vergleicht interne, Managed-Service- und Nichtstun-Option.
4. Service Definition wird mit Scope, Frequenz und Schwellen konfiguriert.
5. Charter, RACI+, Baseline und Operational Readiness werden freigegeben.
6. Monatliche Risk Runs und ereignisgetriebene Reviews starten.
7. Reports und Decision Cards werden erzeugt und geprüft.
8. Quartalsreview vergleicht erwartete und tatsächliche Wirkung.
9. Workflow und Scope werden gezielt verbessert.

### 29.2 Managed Audit Preparation

1. Audit T-120 wird erkannt.
2. Service Instance erzeugt 120/90/60/30-Tage-Runs.
3. Evidence Requests, Owner, Reise und Vor-Ort-Termine werden geplant.
4. Readiness, Datenvertrauen und Blocker werden wöchentlich geprüft.
5. Quality Reviewer prüft kritische Evidence-Pakete.
6. Audit Pack, PowerPoint und Management Brief werden generiert.
7. Findings fließen in Maßnahmen und Service Improvement.
8. Post-Audit Review misst Wirkung und Rework.

### 29.3 Service Recovery

1. SLA, Datenvertrauen und Kundenzufriedenheit verschlechtern sich.
2. Service Health wechselt zu at risk.
3. Ursache zeigt wiederkehrende Datenlücke und überlasteten Kunden-Owner.
4. Recovery Plan bündelt vereinfachte Requests, temporäre Priorität und zusätzliche Reviewkapazität.
5. Kunde genehmigt angepassten Rhythmus.
6. Vier Wochen später werden Health und Outcome neu geprüft.
7. Erfolgreiche Vereinfachung wird als Standardverbesserung bewertet.

### 29.4 Geordnete Internalisierung

1. Kunde möchte einen Teilservice intern übernehmen.
2. Scope Reduction und Zielbetriebsmodell werden beschlossen.
3. Kunde durchläuft Shadowing und gemeinsames Delivery.
4. Plattform erzeugt Training, Runbook und Handover Packet.
5. Kunde führt aus; Provider übernimmt vorübergehend Review.
6. Nach Quality Gate wird operative Verantwortung übertragen.
7. Assurance-Service bleibt optional aktiv.

### 29.5 Portfolio-Lernen

1. Mehrere Mandanten zeigen ähnliche Evidence-Engpässe.
2. Practice Intelligence erkennt abstrahiertes Muster.
3. Product Governance prüft Datenschutz, Relevanz und Wiederholbarkeit.
4. Neues Work Package und eine Connector-Verbesserung werden als Experiment entwickelt.
5. Pilotkunden zeigen geringeres Rework.
6. Asset wird versioniert in Standardkern übernommen.

## 30. Demo-Spezifikation

Der Demonstrator muss eine glaubwürdige, vollständig bedienbare Servicewelt zeigen. Empfohlene Szenen:

1. Service Lead sieht Portfolio Health, kritische Instanzen und eine Recovery-Situation.
2. Engagement Manager öffnet eine Service Instance mit Charter, Outcome, Scope, Rollen und nächstem Review.
3. Kunde vergleicht interne Umsetzung, Managed Service und Nichtstun.
4. Operational-Readiness-Check zeigt erfüllte und blockierende Voraussetzungen.
5. Ein monatlicher Service Run erzeugt Work Packages, Evidence Requests und Quality Gates.
6. Service Report und Executive PowerPoint werden aus demselben Snapshot erzeugt.
7. Service Review zeigt SLA, Datenvertrauen, Wert und offene Entscheidung.
8. Change Request erweitert Scope kontrolliert.
9. Value Ledger trennt Aktivität, Outcome und bestätigte Wirkung.
10. Exit Pack demonstriert Datenportabilität und geordnete Übergabe.

Alle Preise, Unternehmensnamen, SLA-Werte, Personen, Incidents und Servicekennzahlen sind synthetisch oder als externe Marktannahme gekennzeichnet.

## 31. Kennzahlen für Managed-Service-Betrieb

### 31.1 Outcome und Wert

- Zielerreichungsfortschritt,
- verifizierte Risiko- oder Control-Wirkung,
- bestätigte Zeitersparnis,
- Entscheidungsdurchlaufzeit,
- Value-Ledger-Confidence,
- Outcome-Erreichungsquote.

### 31.2 Delivery und Flow

- On-time Delivery,
- SLA/OLA-Erfüllung,
- Run-Durchlaufzeit,
- Blockerzeit,
- Rework-Anteil,
- Handover-Erfolgsquote,
- offene Work Packages nach Alter und Wirkung.

### 31.3 Qualität und Vertrauen

- Quality-Gate-Passrate,
- Finding- und Korrekturquote,
- Datenaktualität und Confidence,
- Anteil materialer Claims mit vollständiger Provenance,
- unabhängige Reviewabdeckung,
- Zahl manueller Overrides und Ausnahmen.

### 31.4 Skalierung und Wirtschaftlichkeit

- Wiederverwendungsgrad von Work Packages und Templates,
- Standard-/Konfigurations-/Custom-Anteil,
- Automatisierungswirkung,
- Aufwand je Service Run und Outcome,
- Skill-Mix und Senioritätsanteil,
- Reise- und Koordinationsanteil,
- Servicebandabweichung,
- Portfolio-Health.

### 31.5 Anti-KPIs

Nicht als primäre Erfolgskennzahl verwenden:

- reine Ticket- oder Taskanzahl,
- Folien- oder Reportmenge,
- ausgelastete Stunden ohne Outcome,
- Anzahl ausgelöster Notifications,
- künstlich hohe SLA-Erfüllung durch Pausen,
- Umsatz ohne Kundennutzen oder Qualitätskontext.

## 32. Globale Akzeptanzkriterien

- Jede aktive Service Instance besitzt Outcome, Scope, Charter, Owner, RACI+, Rhythmus, Quality Gates, Messmodell und Exit-Regel.
- Service Runs sind versioniert und mit Work Packages, Decisions, Evidence und Deliverables verknüpft.
- Kunde und Provider sehen dieselbe Verantwortungsverteilung und deren Historie.
- Operational Readiness kann objektiv blockieren; ein Service wird nicht scheinbar aktiv geschaltet.
- SLA/OLA-Messung ist reproduzierbar und zeigt Pausenursachen.
- Service Health erklärt Ursache, Vertrauen, Handlung und nächsten Review.
- Qualität und Outcome werden getrennt von Aktivitätsmenge bewertet.
- Scopeänderungen und Ausnahmen benötigen kontrollierten Change-Prozess.
- Reports, Reviews und Value Ledger verwenden einen nachvollziehbaren Snapshot.
- Automatisierung kann pausiert, geprüft und rückverfolgt werden.
- Mandantendaten bleiben getrennt; Portfolio-Lernen nutzt nur zulässige Abstraktion.
- Pause, Reduktion und Exit sind ohne Daten- oder Wissensverlust ausführbar.
- Demo-Szenarien funktionieren vollständig mit synthetischen Daten.

## 33. Festgelegte Entscheidungen

- **ENTSCHEIDUNG 13-01:** Managed Services werden als versionierte Service Instances modelliert, nicht als lose Aufgabenbündel.
- **ENTSCHEIDUNG 13-02:** Jede Service Instance besitzt eine freigabefähige Service Charter.
- **ENTSCHEIDUNG 13-03:** Outcome, Scope, Shared Responsibility, Quality, Wert und Exit sind Pflichtbestandteile.
- **ENTSCHEIDUNG 13-04:** Service Definition, Offer, Instance, Run, Deliverable und Outcome Review sind getrennte Objekte.
- **ENTSCHEIDUNG 13-05:** Operational Readiness ist ein echtes Aktivierungsgate.
- **ENTSCHEIDUNG 13-06:** Kunde bleibt Owner von Ziel, Risikoakzeptanz und materialer Freigabe, sofern nichts rechtlich und fachlich anders geregelt ist.
- **ENTSCHEIDUNG 13-07:** Standardkern und Konfiguration werden gegenüber kundenspezifischer Erweiterung und Custom Build getrennt.
- **ENTSCHEIDUNG 13-08:** SLA/OLA-, Qualitäts-, Vertrauens- und Outcome-Metriken werden getrennt geführt.
- **ENTSCHEIDUNG 13-09:** Serviceberichte zeigen Aktivität, Output, Outcome und Impact getrennt.
- **ENTSCHEIDUNG 13-10:** Service Recovery und frühe Eskalation sind integrierte Normalprozesse.
- **ENTSCHEIDUNG 13-11:** Portfolio-Lernen darf Mandantentrennung und Vertraulichkeit nicht aufweichen.
- **ENTSCHEIDUNG 13-12:** Automatisierung und KI handeln nur innerhalb genehmigter Service- und Rechteparameter.
- **ENTSCHEIDUNG 13-13:** Exit-, Reduktions- und Internalisierungsfähigkeit sind Teil des Produktdesigns.
- **ENTSCHEIDUNG 13-14:** Profitabilität wird durch Standardisierung, Datenqualität, Flow und Wiederverwendung verbessert, nicht durch verdeckte Qualitätsreduktion.
- **ENTSCHEIDUNG 13-15:** Service Opportunities zeigen immer interne Alternative und Nichtstun-Option.

## 34. Begründete Annahmen

- **ANNAHME 13-A1:** Kunden akzeptieren ein stärker standardisiertes Betriebsmodell, wenn Konfiguration und Transparenz ausreichend sind.
- **ANNAHME 13-A2:** Ein Service-Objektmodell reduziert Koordinations- und Reportingaufwand signifikant.
- **ANNAHME 13-A3:** Value Ledger und Outcome Reviews erhöhen Verlängerungs- und Erweiterungsbereitschaft, wenn Claims belastbar sind.
- **ANNAHME 13-A4:** Wiederverwendbare Work Packages können einen relevanten Anteil wiederkehrender ISMS-Arbeit abdecken.
- **ANNAHME 13-A5:** Kundenmitwirkung ist einer der größten Engpässe und muss als gestaltbarer Prozess behandelt werden.
- **ANNAHME 13-A6:** Portfolio-QA kann Qualität erhöhen, ohne jeden Run vollständig manuell zu prüfen.
- **ANNAHME 13-A7:** Service Reduction und Internalisierung stärken Vertrauen statt Kundenbindung zu schwächen.
- **ANNAHME 13-A8:** Automatisierung liefert den größten Nutzen bei Vorbereitung, Validierung, Koordination und Reporting; materiale Entscheidungen bleiben menschlich.
- **ANNAHME 13-A9:** Synthetische Demo-Daten reichen aus, um das Betriebsmodell glaubwürdig zu demonstrieren.
- **ANNAHME 13-A10:** Einheitliche Servicebegriffe erleichtern spätere Preis-, SLA-, Ressourcen- und Architekturdefinition.

## 35. Offene Fragen

- **OFFENE FRAGE 13-Q1:** Welche Service Definitions müssen als erste vollständig modelliert werden?
- **OFFENE FRAGE 13-Q2:** Welche Service Health Schwellen sind global und welche kundenspezifisch?
- **OFFENE FRAGE 13-Q3:** Welche Freigaben können vertraglich delegiert werden?
- **OFFENE FRAGE 13-Q4:** Welche Mindestdaten sind je Service für Operational Readiness erforderlich?
- **OFFENE FRAGE 13-Q5:** Wie werden SLA-Pausen und OLA-Verletzungen kommerziell behandelt?
- **OFFENE FRAGE 13-Q6:** Welche Quality Gates benötigen unabhängige Reviewer oder Fachspezialisten?
- **OFFENE FRAGE 13-Q7:** Welche Portfolio-Benchmarks sind datenschutzrechtlich und methodisch zulässig?
- **OFFENE FRAGE 13-Q8:** Wie viel Customization ist zulässig, bevor ein separates Projekt entsteht?
- **OFFENE FRAGE 13-Q9:** Welche Value Claims dürfen monetär ausgewiesen werden?
- **OFFENE FRAGE 13-Q10:** Welche Exit-Artefakte sind standardmäßig und welche vertraglich optional?
- **OFFENE FRAGE 13-Q11:** Wie werden Reise- und Vor-Ort-Pflichten in Service Commitments eingepreist?
- **OFFENE FRAGE 13-Q12:** Welche Serviceobjekte werden technisch im Kern und welche über Erweiterungen modelliert?

## 36. Ideenparkplatz

- Service Sandbox zur Simulation von Scope, Kapazität, SLA, Kosten und Outcome vor Aktivierung,
- „Service Digital Twin“ mit Live-Zustand, Abhängigkeiten und Prognose,
- Outcome-basierte Servicevarianten zusätzlich zu klassischen Kapazitätsmodellen,
- Marketplace für genehmigte Service Definitions, Work Packages und Branchenpacks,
- autonom vorbereitete Service Runs mit menschlicher Freigabe,
- Kunden-Akademie für schrittweise Internalisierung,
- Peer Benchmark Circles mit explizitem Opt-in,
- Sustainability-Metriken für Reise, Infrastruktur und Delivery,
- Service Reliability Score mit erklärbarer Ursache,
- Contract-to-Configuration-Import für strukturierte Serviceparameter,
- digitale Abnahme und Signatur von Charters und Reviewentscheidungen,
- Simulation „Was passiert, wenn wir diesen Service reduzieren oder ausbauen?“.

## 37. Dokumentenabhängigkeiten

- **Dokument 00:** Master-Index, globale Entscheidungen und zentrale Wahrheit.
- **Dokument 01:** Produktvision, wirtschaftliches Ziel und Service-Native Positionierung.
- **Dokument 02:** Markt- und Wettbewerbsdifferenzierung.
- **Dokument 03:** Rollen, Arbeitssituationen und Entscheidungsrechte.
- **Dokument 04:** Service-Lebenszyklus und End-to-End-Nutzerreisen.
- **Dokument 05:** Module M25 bis M28 und vollständige Produktlandkarte.
- **Dokument 06:** Rollenwelten, Navigation und Service UX.
- **Dokument 07:** digitale Objekte, Beziehungen, Historie und Provenance.
- **Dokument 08:** ISMS-Kernprozesse als fachliche Delivery-Basis.
- **Dokument 09:** Reifegrad-, Risiko-, Threat-, Control- und Confidence-Logik.
- **Dokument 10:** Decision Center, Zielrouten, KPIs, Simulationen und Value Ledger.
- **Dokument 11:** Work Items, Freigaben, SLAs, Eskalationen und Handover.
- **Dokument 12:** Reporting als Deliverable- und Kommunikationsschicht.
- **Dokument 14:** Servicekatalog, Pakete, konkrete SLA- und Preislogik.
- **Dokument 15:** Beraterportfolio, Skills, Kapazität, Termine, Reise und Profitabilität.
- **Dokument 16:** Kunden-Onboarding, Strategie-DNA und Lifecycle.
- **Dokument 17:** Integration, Workflow Designer und Automatisierung.
- **Dokument 18:** technische Architektur der Serviceobjekte, Events und Multi-Tenancy.
- **Dokument 19:** Sicherheit, Datenschutz, Rechte, Auditierbarkeit und Exit-Daten.
- **Dokument 20A:** KI-Funktionen und Guardrails.
- **Dokument 20B:** virtuelle KI-Firma und Agentenrollen für Service Design, Delivery und QA.
- **Dokument 20C:** Claude-Code-Umsetzung, Repository, Checkpoints, Tests und Dokumentation.

## 38. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstfassung des Managed-Service-Betriebsmodells mit Serviceobjekten, Charter, Shared Responsibility, Lifecycle, Transition, Delivery, Governance, Quality, Value, Skalierung, Improvement und Exit | Erstellt |
