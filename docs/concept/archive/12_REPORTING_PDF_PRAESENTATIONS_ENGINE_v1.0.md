# Dokument 12 - Reporting-, PDF- und Präsentations-Engine

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Zweck:** Verbindliches Produkt- und Fachkonzept für die Erzeugung, Prüfung, Freigabe, Ausgabe und Wiederverwendung zielgruppengerechter Reports, PDF-Dokumente, PowerPoint-Präsentationen, Briefings, Auditpakete und Management-Unterlagen aus einer gemeinsamen vertrauenswürdigen Datenbasis.

> **Zentrale Festlegung:** Die Plattform erzeugt nicht einfach schöne Dateien. Sie verwandelt einen nachvollziehbaren Datenstand in eine zielgruppengerechte, handlungsorientierte und freigabefähige Kommunikation. Jede Aussage, Kennzahl, Grafik und Empfehlung bleibt auf Quellen, Methodik, Snapshot, Verantwortliche und Version zurückführbar.

## 1. Dokumentauftrag und Abgrenzung

Dieses Dokument definiert die Reporting- und Kommunikationsartefaktschicht der Plattform. Es konkretisiert insbesondere **M23 Reporting, PDF & Presentation Engine**, die Export- und Briefingteile von **M01 bis M06**, die Zusammenarbeit mit **M21 Team Workspace & Decision Records** sowie die Nutzung von Daten aus Dokument 07 bis 10.

Es beschreibt:

- Report Package als kanonisches Produktobjekt,
- Reportarten und Zielgruppenvarianten,
- Content Blocks, Storylines, Charts, Tabellen und Narrative,
- PowerPoint-, PDF-, Web- und Datenexporte,
- Executive-, CISO-, ISMS-, Audit-, Service- und Beraterunterlagen,
- Template-, Layout-, Branding- und White-Label-Fähigkeit,
- Daten-Snapshots, Herkunft, Methodik und Reproduzierbarkeit,
- Review, Freigabe, Verteilung, Archivierung und Ablauf,
- automatisierte und ereignisgetriebene Reports,
- KI-gestützte Textentwürfe mit Quellen- und Freigabepflicht,
- Sicherheits-, Vertraulichkeits- und Qualitätsregeln,
- messbaren Nutzen für Berater, Kunden und Managed-Service-Betrieb.

Dieses Dokument legt keine konkrete Rendering-Bibliothek, Cloud-Komponente oder Office-API fest. Dokument 18 trifft die technische Architekturentscheidung. Dokument 19 konkretisiert Sicherheit und Datenschutz. Dokument 20A definiert KI-Modelle und Guardrails. Das Dokument ersetzt auch keine juristische Prüfung regulatorischer Berichtspflichten.

## 2. Executive Summary

Die Reporting Engine folgt dem Prinzip **One Source, Many Responsible Narratives**: Ein freigegebener Snapshot derselben Datenbasis kann für unterschiedliche Rollen anders verdichtet und visualisiert werden, ohne Zahlen, Methodik oder Bedeutung still zu verändern.

[[FIGURE:FIG1]]

Ein Geschäftsführer benötigt Entscheidungen, Business Impact und Investitionsoptionen. Ein CISO benötigt Risikoentwicklung, Zielerreichung und Eskalationen. Ein ISMS-Manager benötigt Maßnahmen, Controls, Owner und Evidence. Ein Auditor benötigt Scope, Nachweise, Findings und Historie. Ein Service Lead benötigt SLA, Delivery, Kapazität und Wertnachweis. Diese Sichten verwenden denselben Datenstand, aber eine andere Sprache, Tiefe und Dramaturgie.

Die Engine soll insbesondere den heute hohen manuellen Aufbereitungsaufwand reduzieren. Ein Berater darf einen Kundentermin nicht damit beginnen müssen, mehrere Stunden lang Folien, Tabellen und Statuswerte aus E-Mails, Excel-Dateien und Einzeltools zusammenzutragen. Die Plattform soll in wenigen Schritten einen terminfertigen, editierbaren und nachvollziehbaren Entwurf erzeugen. Der Mensch prüft fachliche Aussage, Schwerpunkt, Vertraulichkeit und Empfehlung; er baut nicht jedes Mal die gleiche Grundstruktur neu.

Der Qualitätsmaßstab lautet daher nicht „Export erfolgreich“, sondern:

- Ist die Kernaussage verständlich?
- Passen Inhalt und Detailtiefe zur Zielgruppe?
- Sind Zahlen und Aussagen reproduzierbar?
- Sind Unsicherheit und Datenlücken sichtbar?
- Ist eine erforderliche Entscheidung oder Folgeaktion eindeutig?
- Kann ein Reviewer die Herkunft prüfen?
- Kann das Artefakt sicher geteilt und später wiedergefunden werden?
- Ist der tatsächlich erzeugte Nutzen messbar?

## 3. Reporting-Verfassung

### 3.1 Globale Prinzipien

- **R01 - Eine Datenbasis, mehrere Sichten:** Zielgruppenvarianten dürfen verdichten und umformulieren, aber keine widersprüchlichen Fakten erzeugen.
- **R02 - Zweck vor Format:** Ein Report beginnt mit Kommunikationsziel, Zielgruppe und gewünschter Handlung, nicht mit der Auswahl „PDF oder PowerPoint“.
- **R03 - Entscheidung vor Datenmenge:** Hauptseiten und Hauptfolien zeigen zuerst Bedeutung, Handlungsbedarf und nächste Entscheidung; Detailtabellen wandern in Drill-down oder Appendix.
- **R04 - Snapshot statt bewegliches Ziel:** Jeder veröffentlichte Report referenziert einen definierten Datenstand, Zeitraum, Filter und Methodenstand.
- **R05 - Quelle am Claim:** Materiale Aussagen, Kennzahlen und Empfehlungen besitzen maschinenlesbare Quellen- und Herleitungslinks.
- **R06 - Unsicherheit ist sichtbar:** Fehlende, veraltete, widersprüchliche oder niedrig-vertrauenswürdige Daten dürfen nicht durch glatte Formulierungen verdeckt werden.
- **R07 - Entwurf ist keine Freigabe:** Generieren, fachlich prüfen, genehmigen, veröffentlichen und verteilen sind unterschiedliche Zustände.
- **R08 - Rollenbezogene Sprache:** Executive-, Fach-, Audit- und Operations-Sichten verwenden kontrolliert unterschiedliche Sprache und Tiefe.
- **R09 - Editierbar, aber nicht unkontrolliert:** PPTX-Texte können bearbeitet werden; manuelle Änderungen sind danach nicht automatisch kanonischer Plattforminhalt.
- **R10 - Corporate Design ist Konfiguration:** Die Plattform besitzt ein neutrales Standarddesign und kann autorisierte Marken-, Kunden- und Beratungstemplates einbinden.
- **R11 - Barrierefreiheit ist Standard:** Struktur, Kontrast, Lesereihenfolge, Alternativtexte, Tabellen und Dokumentnavigation werden mitgedacht.
- **R12 - Wiederverwendung ohne Altlasten:** Vorlagen werden modular wiederverwendet; veraltete Zahlen, Texte oder Kundennamen dürfen nicht mitkopiert werden.
- **R13 - Sicherheit vor Komfort:** Klassifikation, Empfänger, Wasserzeichen, Ablaufdatum und Exportrechte werden vor Veröffentlichung geprüft.
- **R14 - Automatisierung bleibt kontrolliert:** Geplante Reports dürfen automatisch entworfen werden; Veröffentlichung kann je Typ menschliche Freigabe verlangen.
- **R15 - Outcome wird gemessen:** Ein Report ist erst wertvoll, wenn er eine Entscheidung, Handlung, Transparenz oder nachweisbare Zeitersparnis unterstützt.

### 3.2 Was die Engine bewusst verhindert

- PowerPoint-Folien als manuell gepflegte Schatten-Datenbank,
- widersprüchliche Zahlen in PDF, Dashboard und Vorstandspräsentation,
- generische Executive Reports ohne klare Entscheidung,
- nicht belegte KI-Aussagen,
- kopierte Altfolien mit falschem Kunden, Zeitraum oder Branding,
- Charts ohne Definition, Zeitraum oder Datenvertrauen,
- automatisches Versenden vertraulicher Reports ohne Empfängerprüfung,
- „grüne“ Statusdarstellung trotz fehlender Evidence,
- unlesbare Tabellenwände als Hauptstory,
- unversionierte Berichte, deren Inhalt später nicht reproduzierbar ist.

## 4. Kanonisches Report Package

Ein Report ist in der Plattform kein bloßer Dateianhang. Das kanonische Objekt heißt **Report Package**. Es bündelt Kommunikationsauftrag, Datenstand, Storyline, Inhalte, Governance, Artefakte, Verteilung und Outcome.

[[FIGURE:FIG3]]

### 4.1 Pflichtfelder

| Feld | Bedeutung |
|---|---|
| Identität | Report-ID, Titel, Typ, Mandant, Version, Status und Sprache |
| Kommunikationsziel | Welche Entscheidung, Transparenz, Prüfung oder Handlung soll unterstützt werden? |
| Zielgruppe | primäre und sekundäre Audience, Rollen, Wissensniveau und erwartete Reaktion |
| Scope | Unternehmen, Einheiten, Services, Standards, Audits, Risiken oder Zeitraum |
| Snapshot | Stichtag, Datenzeitraum, Filter, Methoden- und Objektversionen |
| Storyline | Kernaussage, Dramaturgie, Kapitel- oder Folienplan |
| Content Blocks | referenzierte Charts, Tabellen, Claims, Empfehlungen, Evidenzen und Anhänge |
| Owner | fachlich verantwortliche Person oder Rolle |
| Reviewer | Zahlen-, Fach-, Security-, Legal-, Brand- oder Quality-Reviewer nach Regel |
| Approver | autorisierte Freigaberolle für Veröffentlichung oder externe Verteilung |
| Klassifikation | Datenklasse, Vertraulichkeit, Empfänger- und Exportregeln |
| Artefakte | erzeugte PPTX-, PDF-, Web-, Handout-, Appendix- und Datenexportversionen |
| Verteilung | Empfänger, Kanal, Ablaufdatum, Abrufe und Widerrufsmöglichkeiten |
| Historie | Entwürfe, Reviews, Änderungen, Freigaben, Exporte und Verteilungsevents |
| Outcome | besprochene Entscheidung, Folgeaktionen, Feedback und Value-Ledger-Eintrag |

### 4.2 Lebenszyklus

`geplant -> Daten werden geprüft -> Entwurf erzeugt -> in fachlicher Prüfung -> Änderungen erforderlich -> zur Freigabe -> freigegeben -> veröffentlicht -> verteilt -> abgelaufen/ersetzt -> archiviert`

Zusatzstatus:

- `blockiert`: erforderliche Daten, Freigabe oder Klassifikation fehlt,
- `zurückgezogen`: veröffentlichte Fassung darf nicht weiterverwendet werden,
- `fehlgeschlagen`: Rendering oder Verteilung ist technisch gescheitert,
- `manuell abgezweigt`: exportierte Datei wurde außerhalb der Plattform verändert.

### 4.3 Versionierung und Ersetzung

Jede freigegebene Version bleibt unverändert erhalten. Eine Korrektur erzeugt eine neue Version mit:

- Grund der Änderung,
- betroffenem Claim, Chart oder Abschnitt,
- Auswirkung auf Entscheidungen,
- neuer Freigabe,
- Kennzeichnung der ersetzten Fassung,
- optionalem Empfängerhinweis oder Widerruf.

## 5. Report- und Artefakttypen

### 5.1 Management und Executive

| Reporttyp | Ziel | Typische Inhalte |
|---|---|---|
| Executive One-Pager | Lage und Entscheidungen in unter fünf Minuten erfassen | Zielstatus, Top-Risiken, Trend, Entscheidung, Investition, nächste Meilensteine |
| Vorstandspräsentation | formale Managemententscheidung vorbereiten | Kernbotschaft, Business Impact, Optionen, Empfehlung, Beschlussvorlage, Appendix |
| Management Review Pack | ISMS-Managementreview durchführen und dokumentieren | KPI, Audits, Incidents, Ressourcen, Verbesserungen, Entscheidungen, Actions |
| Investment Brief | Budgetentscheidung vergleichen | Baseline, Optionen, Kostenband, Risikowirkung, Kapazität, Nichtstun-Szenario |
| Change Brief | wesentliche Änderung verständlich machen | Ereignis, betroffene Ziele, Ursache, Route, Entscheidung, Frist |

### 5.2 CISO und ISMS-Betrieb

- monatlicher oder quartalsweiser ISMS-Statusbericht,
- Risiko- und Toleranzbericht,
- Reifegrad- und Zielpfadbericht,
- Control-Wirksamkeitsbericht,
- Maßnahmen- und Finding-Report,
- Supplier-Risk-Bericht,
- Incident- und Threat-Impact-Briefing,
- Policy- und Dokumentenreviewbericht,
- Evidence-Qualitätsreport,
- kontinuierlicher Verbesserungsbericht.

### 5.3 Audit und Assurance

- Audit Readiness Pack,
- Audit Kick-off Deck,
- Scope- und Terminplan,
- Evidence Request List,
- Control Test Pack,
- Findings- und Maßnahmenbericht,
- Management Response Pack,
- Statement-of-Applicability-Auszug,
- Audit Trail und Change Log,
- Abschlussbericht und Follow-up Pack.

### 5.4 Managed Services und Beratung

- Service Onboarding Pack,
- Monats- und Quartalsservicebericht,
- SLA- und Delivery-Bericht,
- Service Value Report,
- Kapazitäts- und Reiseplan,
- Kundenmeeting-Deck,
- Workshop-Unterlagen,
- Opportunity- und Erweiterungsvorschlag,
- Handover- und Transition Pack,
- Serviceverbesserungsbericht,
- Portfolio- und Practice-Report.

### 5.5 Operative und zielgruppenspezifische Auszüge

- Owner Brief: Was muss ich tun, warum, bis wann und welcher Nachweis zählt?
- Supplier Request Pack: kontrollierte externe Nachweisanfrage,
- Meeting Handout: aktuelle Decisions, Actions und Kontext,
- On-site Audit Pack: Agenda, Reise, Ansprechpartner, Scope, offene Evidenzen,
- Action Tracker: freigegebener Auszug für Umsetzungsteams,
- Regulatorischer Auszug: definierte Anforderungen, Mapping und Status,
- Kundenportal-Update: verdichtete sichtbare Fortschritte ohne interne Notizen.

## 6. Zielgruppenprisma

Die Engine erzeugt keine bloßen Filter derselben langen Tabelle. Sie transformiert dieselbe vertrauenswürdige Grundlage in eine zielgruppengerechte Kommunikationsform.

[[FIGURE:FIG2]]

### 6.1 Executive

Executive-Artefakte beantworten:

- Sind wir auf Kurs zum vereinbarten Ziel?
- Was hat sich wesentlich verändert?
- Welche Geschäftsprozesse, Verpflichtungen oder Investitionen sind betroffen?
- Welche Entscheidung wird von mir erwartet?
- Was kostet Handeln, Verschieben oder Nichtstun?
- Wie sicher ist die Einschätzung?

Verboten sind technische Detailtiefe ohne Entscheidungskontext, ungewichtete Maßnahmenlisten und scheinpräzise Prognosen ohne Annahmen.

### 6.2 CISO

CISO-Artefakte verbinden:

- Risikobereitschaft und Toleranz,
- Zielerreichung und Reife,
- Threat- und Change-Auswirkungen,
- Investitionsoptionen,
- Eskalationen und Entscheidungen,
- tatsächliche Wirkung früherer Maßnahmen.

### 6.3 ISMS-Manager und Control Owner

Diese Varianten zeigen:

- konkrete Controls, Findings, Maßnahmen und Owner,
- Abhängigkeiten und Blocker,
- Evidence-Qualität und Ablauf,
- relevante Policies und Anforderungen,
- nächste prüfbare Schritte,
- Definition of Done und Reviewstatus.

### 6.4 Auditor

Audit-Artefakte priorisieren:

- Scope und Kriterien,
- nachvollziehbare Population und Stichprobe,
- Evidence mit Zeitraum und Herkunft,
- Testschritte und Ergebnisse,
- Findings, Management Response und Status,
- unveränderbare Historie und klare Datenlücken.

### 6.5 Service Lead und Berater

Diese Reports zeigen zusätzlich:

- vereinbarte Leistungen und Grenzen,
- SLA, Delivery und Servicegesundheit,
- Kapazität, Reise und Skillengpässe,
- wiederkehrende Probleme und Verbesserungen,
- realisierten Kundennutzen,
- potenzielle Serviceergänzungen mit fachlicher Begründung.

## 7. Content-Block-Architektur

Jeder Report wird aus wiederverwendbaren, versionierten **Content Blocks** aufgebaut. Ein Block besitzt Zweck, Datenvertrag, Darstellungsregeln, Zielgruppenfreigabe, Quellen und Qualitätsprüfungen.

### 7.1 Kanonische Blocktypen

| Blocktyp | Funktion | Mindestanforderung |
|---|---|---|
| Key Message | eine klare, begründete Kernaussage | Claim, Quelle, Zeitraum, Owner, Confidence |
| Decision Card | Entscheidung strukturiert vorbereiten | Optionen, Empfehlung, Wirkung, Annahmen, Freigabe |
| KPI Card | einzelne Kennzahl mit Kontext | Definition, Einheit, Ziel, Trend, Aktualität, Datenvertrauen |
| Trend Chart | Entwicklung oder Forecast zeigen | Zeitraum, Baseline, Methode, Ereignismarker, Quelle |
| Risk Landscape | priorisierte Risiko- oder Szenariosicht | Methode, Appetite, Aggregation, Drill-down |
| Route View | Ist-Ziel-Weg und Alternativen | Zielprofil, Meilensteine, Kapazität, Kosten, Annahmen |
| Impact Chain | Ursache-Wirkungs-Zusammenhang | verbundene Objekte, Richtung, Confidence, Erklärung |
| Action Block | nächste Arbeit verbindlich machen | Owner, Fälligkeit, Outcome, DoD, Status |
| Control/Evidence Block | Wirksamkeit und Nachweise darstellen | Control-Version, Test, Evidence, Gültigkeit, Reviewer |
| Service Value Block | Leistung und Nutzen zeigen | Serviceumfang, Aktivität, Outcome, Zeit-/Risikowirkung |
| Timeline | relevante Veränderungen erzählen | Event, Datum, Quelle, Bedeutung, Verknüpfung |
| Recommendation | fachliche Empfehlung formulieren | Problem, Option, Begründung, Grenzen, Owner |
| Data Quality Block | Datenlage transparent machen | Vollständigkeit, Aktualität, Konflikte, Lücken, Konsequenz |
| Methodology Note | Berechnung oder Bewertung erklären | Version, Parameter, Gültigkeit, Owner |
| Evidence Appendix | prüfbare Details bereitstellen | Index, Herkunft, Hash/Version, Zugriff, Klassifikation |

### 7.2 Blockverträge

Ein Content Block besitzt:

- `block_type` und `schema_version`,
- semantischen Zweck,
- erlaubte Zielgruppen,
- erforderliche Datenobjekte,
- Filter- und Aggregationsregeln,
- Visualisierungs- oder Texttemplate,
- Quellen- und Confidence-Regeln,
- Interaktions- und Drill-down-Link,
- Fallback bei fehlenden Daten,
- Accessibility-Metadaten,
- Testfälle und Qualitätsgrenzen.

### 7.3 Wiederverwendung

Derselbe KPI Block kann als:

- kompakte Executive-Kachel,
- detaillierter CISO-Trend,
- Auditmethodik mit Population,
- Service-KPI mit SLA-Bezug,
- PowerPoint-Grafik,
- PDF-Tabelle,
- Web-Widget

ausgegeben werden. Semantik und Datenvertrag bleiben gleich; Layout und Erläuterung variieren.

## 8. Storyline- und Narrative Engine

### 8.1 Storyline vor Folienplan

Vor der Generierung wird ein **Report Plan** erstellt:

1. Kommunikationsziel,
2. Zielgruppe und erwartete Reaktion,
3. zentrale Kernaussage,
4. unterstützende Belege,
5. relevante Abweichungen und Unsicherheiten,
6. Entscheidung oder nächste Handlung,
7. notwendige Detailtiefe und Appendix.

### 8.2 Standarddramaturgie für Management-Präsentationen

[[FIGURE:FIG4]]

Die Standardstory lautet:

1. **Orientierung:** Ziel, Zeitraum und Kernaussage.
2. **Veränderung:** Was hat sich seit dem letzten Stand geändert?
3. **Ursache:** Warum ist es passiert und wie belastbar ist die Erklärung?
4. **Bedeutung:** Was bedeutet es für Geschäft, Risiko, Compliance oder Zielroute?
5. **Entscheidung:** Welche Optionen bestehen, was wird empfohlen und warum?
6. **Weiteres Vorgehen:** Owner, Meilenstein, Abhängigkeiten und Reviewdatum.

### 8.3 Narrative Regeln

- Jede Hauptseite oder Hauptfolie besitzt genau eine dominante Botschaft.
- Der Titel formuliert möglichst die Aussage, nicht nur das Thema.
- Zahlen werden interpretiert, aber nicht dramatisiert.
- Vergleiche nennen Baseline, Zeitraum und Methode.
- Empfehlungen trennen Fakt, Interpretation, Annahme und Vorschlag.
- Datenlücken werden im relevanten Abschnitt gezeigt, nicht nur im Kleingedruckten.
- Detailbelege bleiben erreichbar, ohne die Hauptstory zu überladen.
- Risiken werden nicht automatisch in Angstkommunikation übersetzt.
- Serviceangebote werden als fachlich begründete Option, nicht als versteckte Werbung dargestellt.

### 8.4 „One Click“ ohne Blindflug

Die Plattform bietet Quick Actions wie:

- „Vorstandstermin morgen vorbereiten“,
- „Monatsreport erzeugen“,
- „Audit Pack aktualisieren“,
- „Kundenstatus als PowerPoint erstellen“,
- „Decision Brief zu diesem Risiko erzeugen“.

Ein Klick startet jedoch einen kontrollierten Prozess. Vor dem finalen Export zeigt die Engine:

- Snapshot und Zeitraum,
- Zielgruppe,
- erkannte Datenlücken,
- veraltete Quellen,
- offene Freigaben,
- vorgeschlagene Storyline,
- Klassifikation und Empfängerregeln.

## 9. Report Studio und Nutzererlebnis

### 9.1 Startwege

Ein Report kann gestartet werden aus:

- globalem Report Studio,
- Customer Workspace,
- Executive Decision Center,
- Risiko-, Audit-, Service- oder Control-Objekt,
- Morning Mission,
- Meeting oder Management Review,
- geplantem Reporting-Zyklus,
- Automation oder Event.

### 9.2 Geführter Ablauf

1. **Zweck wählen:** Meeting, Entscheidung, Audit, Status, Service oder Export.
2. **Audience wählen:** Rolle, Erfahrungsniveau, Sprache und erlaubte Tiefe.
3. **Scope und Zeitraum bestätigen:** Mandant, Einheiten, Ziele und Filter.
4. **Snapshot prüfen:** Aktualität, Confidence, fehlende Daten und Methodik.
5. **Storyline bestätigen:** Kernaussagen, Blocks, Reihenfolge und Appendix.
6. **Entwurf erzeugen:** Vorschau mit Quellen- und Warnhinweisen.
7. **Review durchführen:** Kommentare, Änderungsaufträge und Verantwortlichkeiten.
8. **Freigeben:** Version, Scope, Empfänger, Klassifikation und Ablauf bestätigen.
9. **Rendern und verteilen:** Artefakte erzeugen, sicher teilen und archivieren.
10. **Outcome erfassen:** Entscheidung, Actions, Feedback und Nutzen zurückführen.

### 9.3 Vorschau

Die Vorschau ermöglicht:

- Folien- oder Seitenübersicht,
- Inline-Quellen und Datenstand,
- Wechsel zwischen Zielgruppenvarianten,
- Vergleich zur Vorversion,
- Warnungen zu überladenen Seiten,
- Bearbeitung von zugelassenen Textfeldern,
- Austausch eines Content Blocks durch eine genehmigte Variante,
- Verschieben und Ausblenden ohne Datenverlust,
- Prüfung von Länge, Lesbarkeit und Barrierefreiheit.

### 9.4 Beginner Mode und Expert Mode

**Beginner Mode:** Zweck und Audience wählen; Engine schlägt eine freigegebene Struktur vor.  
**Expert Mode:** Storyline, Blocks, Methodenansicht, Appendix, Branding, Sprecherhinweise und Verteilungsregeln gezielt konfigurieren.

## 10. PowerPoint-Engine

### 10.1 Zielbild

Die PowerPoint-Ausgabe ist ein terminfähiger, editierbarer Entwurf - nicht nur ein Screenshot des Dashboards. Sie enthält strukturierte Folienlayouts, editierbare Titel und Narrative, hochwertige Visualisierungen, Sprecherhinweise, Quellen und einen kontrollierten Appendix.

### 10.2 Kanonische Folientypen

- Titelfolie,
- Executive Summary,
- Decision Slide,
- KPI- und Trendfolie,
- Risiko- und Business-Impact-Folie,
- Zielroute und Meilensteine,
- Option Comparison,
- Maßnahmen- und Owner-Folie,
- Control-/Evidence-Folie,
- Service- und Value-Folie,
- Zeitachse oder Change Story,
- Audit Scope und Status,
- Roadmap,
- Methodik- und Datenqualitätsfolie,
- Appendix- und Quellenfolie.

### 10.3 Folienregeln

- eine Kernaussage pro Folie,
- aussageorientierter Titel,
- maximal eine dominante Visualisierung,
- klare nächste Handlung auf Decision Slides,
- Quellen in Notes oder sichtbarer Fußzeile je Klassifikation,
- keine unlesbaren Tabellen mit dutzenden Spalten,
- Appendix für Belege und Detaildaten,
- einheitliche Begriffe und Statusfarben gemäß Designsystem,
- editierbare Textinhalte; Grafiken je Technologie als editierbare Formen oder hochauflösende, verknüpfte Visualisierung,
- optionale Sprecherhinweise mit Kontext, Caveats und Fragen.

### 10.4 Manuelle Bearbeitung und Forking

Nach Download kann der Nutzer die PPTX bearbeiten. Die Plattform behandelt dies als **externen Fork**:

- Originalexport bleibt archiviert.
- Manuelle Änderungen aktualisieren nicht automatisch die Plattformdaten.
- Eine geänderte Datei kann als Anhang oder neue Artefaktversion hochgeladen werden.
- Semantischer Round-trip ist eine spätere Option und darf in Version 1 nicht vorgetäuscht werden.
- Bei erneutem Generieren wird klar angezeigt, welche Version kanonisch und welche manuell verändert ist.

## 11. PDF-Engine

### 11.1 PDF-Arten

- layoutstabiler Managementbericht,
- ausführlicher ISMS- oder Servicebericht,
- Audit- und Evidence Pack,
- freigabefähige Beschlussunterlage,
- Meeting-Handout,
- exportierbarer Kundenstatus,
- archivfähige Record-Fassung,
- barriereärmere Lesefassung.

### 11.2 PDF-Anforderungen

- stabile Seitenumbrüche,
- Kopf-/Fußzeile mit Titel, Version, Stichtag und Klassifikation,
- Inhaltsverzeichnis und Bookmarks bei längeren Dokumenten,
- wiederholte Tabellenköpfe,
- lesbare Diagramme und Alternativtexte,
- klare Trennung von Hauptteil, Methodik und Evidence Appendix,
- interne Links und Objektverweise,
- PDF-Metadaten,
- optional Wasserzeichen, Ablaufdatum und digitale Signatur,
- keine abgeschnittenen Tabellen oder versteckten Daten,
- Rendering- und visuelle QA vor Veröffentlichung.

### 11.3 Lange Tabellen und Anhänge

Große Evidenz-, Maßnahmen- oder Control-Listen werden nicht in die Hauptstory gezwungen. Die Engine kann:

- Zusammenfassung und Top-Ausnahmen im Hauptteil zeigen,
- vollständige Tabelle als Appendix einfügen,
- zusätzliche CSV-/XLSX-Datei referenzieren,
- Tabellen nach Status, Owner, Risiko oder Scope gliedern,
- Zeilen-IDs und Objektlinks erhalten,
- Datenklassifikation je Anhang anwenden.

## 12. Weitere Ausgabe- und Nutzungsformen

Neben PDF und PowerPoint unterstützt das Zielbild:

- sichere Web-Ansicht mit Drill-down,
- Meeting Mode oder Presenter View,
- DOCX-Ausgabe für weiterverarbeitbare Textberichte,
- CSV/XLSX-Datenexport für zulässige Tabellen,
- JSON/API-Export für Systemintegration,
- Druck- und Handoutversion,
- E-Mail-/Teams-Preview ohne vertrauliche Vollinhalte,
- Kundenportal-Veröffentlichung,
- Snapshot-Link mit Ablauf und Widerruf.

PDF und PPTX sind priorisierte Flagship-Ausgaben. Weitere Formate werden nur implementiert, wenn Daten- und Governanceverträge wiederverwendet werden können.

## 13. Template-, Branding- und White-Label-Konzept

### 13.1 Ebenen

1. **Plattform-Standardtheme:** neutrales, professionelles Enterprise-Design.
2. **Betreiber-Theme:** Logo, Farben, Schriften, Disclaimer und Standardlayouts eines Beratungs- oder Serviceanbieters.
3. **Mandanten-Theme:** freigegebene Kundenmarke und kundenspezifische Titelseiten.
4. **Artefakt-Theme:** kontrollierte Variante für Vorstand, Audit, Workshop oder externen Versand.

### 13.2 Design Tokens

Templates verwenden Tokens für:

- Logo und Position,
- Primär- und Akzentfarben,
- Typografie,
- Raster, Abstände und Seitenformat,
- Chartfarben und Statussemantik,
- Kopf-/Fußzeilen,
- Klassifikation,
- Disclaimer und Rechtshinweise,
- Titel- und Kapitelstile,
- Quellen- und Notes-Darstellung.

### 13.3 Template-Import und Governance

Die privat entwickelte Plattform enthält keine vertraulichen internen Vorlagen eines späteren Betreibers. Sie liefert eigene neutrale, hochwertige Templates. Später können autorisierte Unternehmen ihre Mastervorlagen importieren oder technisch anbinden.

Jedes Template besitzt:

- Owner und freigebende Stelle,
- Version und Gültigkeit,
- erlaubte Reporttypen und Zielgruppen,
- Pflichtfolien/-seiten,
- zulässige Content Blocks,
- Branding- und Disclaimerregeln,
- Testset für Rendering,
- Ablauf- und Reviewdatum.

## 14. Daten-Snapshots und Reproduzierbarkeit

### 14.1 Frozen Snapshot

Ein veröffentlichter Report verwendet einen eingefrorenen Snapshot mit:

- Objekt- und Beziehungsversionen,
- Stichtag und Datenzeitraum,
- angewendeten Filtern,
- Bewertungs- und KPI-Methoden,
- Zielprofil und Appetite-Version,
- verfügbaren Evidence- und Confidence-Werten,
- verwendeten Threat- oder externen Datenständen,
- Währungs-, Zeit- und Lokalisierungsparametern.

### 14.2 Live Preview versus freigegebene Fassung

- **Live Preview:** aktualisiert sich mit aktuellen Daten und ist klar als dynamisch markiert.
- **Frozen Draft:** stabiler Datenstand für Review.
- **Released Artifact:** unveränderbarer, freigegebener Snapshot.
- **Current Web View:** zeigt aktuelle Daten und verweist auf die letzte freigegebene Fassung.

### 14.3 Reproduzierbarkeit

Ein berechtigter Reviewer muss später nachvollziehen können:

- welche Daten verwendet wurden,
- welche Transformationen und Aggregationen erfolgten,
- welche Methodenversion galt,
- welche manuellen Aussagen ergänzt wurden,
- wer geprüft und freigegeben hat,
- welche Datei an welche Empfänger ging.

## 15. Claims, Quellen und Nachvollziehbarkeit

### 15.1 Claim-Modell

Eine materiale Aussage wird als **Claim** modelliert:

- Aussage,
- Typ: Fakt, Interpretation, Prognose, Empfehlung oder Annahme,
- unterstützende Daten/Objekte,
- Methode oder Regel,
- Gültigkeitszeitraum,
- Confidence,
- Owner und Reviewer,
- erlaubte Zielgruppen,
- letzte Aktualisierung.

### 15.2 Quellenanzeige

Je Format können Quellen gezeigt werden als:

- Objektlink in Webansicht,
- Quellenfußnote,
- Sprecherhinweis,
- Methodik-Appendix,
- QR-/Deep-Link bei gedruckten Unterlagen,
- Evidence Index,
- maschinenlesbare Reportmanifest-Datei.

### 15.3 Widerspruch und Datenlücke

Bei widersprüchlichen Quellen darf die Engine nicht automatisch eine bequeme Zahl auswählen. Sie zeigt:

- Konflikt,
- betroffene Aussage,
- Datenquellen und Aktualität,
- vorgeschlagene Klärung,
- erlaubte vorläufige Formulierung,
- Freigabebedarf.

## 16. Visualisierungen und Chart-Governance

### 16.1 Erlaubte Visualisierungsfamilien

- KPI und Delta,
- Zeitreihe und Forecast,
- Ziel-gegen-Ist,
- Risiko- oder Prioritätsmatrix,
- Portfolioverteilung,
- Zielroute und Meilensteine,
- Wasserfall für Wirkung oder Investition,
- Ursache-Wirkungs-Kette,
- Graph-/Netzwerkausschnitt,
- Heatmap mit definierter Semantik,
- Audit- oder Service-Fortschritt,
- Gantt/Timeline,
- geografische Reise- oder Standortübersicht, sofern erforderlich.

### 16.2 Chart-Vertrag

Jedes Chart zeigt oder hinterlegt:

- Fragestellung,
- Kennzahlendefinition,
- Zeitraum,
- Einheit und Skalierung,
- Baseline und Ziel,
- Filter,
- Datenquelle,
- Confidence/Qualität,
- relevante Ereignisse,
- erlaubte Interpretation.

### 16.3 Anti-Patterns

- abgeschnittene Achsen ohne Kennzeichnung,
- dekorative 3D-Charts,
- Ampelfarben ohne zugängliche Zusatzcodierung,
- zu viele Kategorien,
- Risiko-Heatmap ohne Methode,
- Forecast ohne Annahmen,
- kumulierte Werte mit unklarer Population,
- vermischte Zeiträume,
- Erfolgskommunikation ohne Baseline,
- Diagramm als Bild ohne Daten- oder Objektlink.

## 17. Review-, Freigabe- und Veröffentlichungsprozess

### 17.1 Reviewarten

| Review | Prüft insbesondere |
|---|---|
| Data Review | Vollständigkeit, Aktualität, Filter, Reconciliation und Snapshot |
| Fachreview | Aussage, Methodik, Priorisierung, Empfehlung und Caveats |
| Audience Review | Verständlichkeit, Detailtiefe, Ton und erwartete Handlung |
| Security/Privacy Review | Klassifikation, Empfänger, Redaction und vertrauliche Inhalte |
| Brand Review | Theme, Layout, Sprache, Disclaimer und Markennutzung |
| Legal/Regulatory Review | nur bei definierten verpflichtenden oder externen Aussagen |
| Quality Review | Rendering, Konsistenz, Links, Barrierefreiheit und Fehlerfreiheit |

### 17.2 Freigabematrix

Die erforderliche Freigabe hängt ab von:

- interner oder externer Nutzung,
- Zielgruppe und Materialität,
- Datenklassifikation,
- regulatorischem Zweck,
- KI-generiertem Narrativ,
- finanzieller oder Risikoempfehlung,
- Marken- oder Kundenbezug,
- automatischer Verteilung.

### 17.3 Veröffentlichung

Vor Veröffentlichung zeigt ein Gate:

- finalen Snapshot,
- offene Warnungen,
- Reviewergebnisse,
- Freigabestatus,
- Klassifikation,
- Empfänger und Kanal,
- Ablaufdatum,
- erzeugte Formate,
- Diff zur Vorversion.

## 18. Planung, Abonnements und Event-Reports

### 18.1 Wiederkehrende Reports

Beispiele:

- monatlicher ISMS-Bericht,
- quartalsweises Management Review,
- wöchentlicher Audit-Readiness-Status,
- monatlicher Managed-Service-Report,
- jährliche Policy- und Control-Zusammenfassung,
- periodischer Supplier-Risk-Bericht.

Ein Zeitplan definiert Snapshot-Zeitpunkt, Daten-Freshness, Owner, Reviewfenster, Freigabe, Verteilung und Ausfallbehandlung.

### 18.2 Ereignisgetriebene Briefings

Mögliche Auslöser:

- wesentliches Risiko überschreitet Toleranz,
- relevante Bedrohung betrifft kritische Assets,
- Audit- oder Zertifizierungstermin rückt näher,
- Managemententscheidung wird fällig,
- Service-SLA oder Kapazität kippt,
- Zielroute wird neu berechnet,
- kritische Datenlücke entsteht,
- wesentliche Veränderung im Scope.

Ereignisse erzeugen zunächst einen Entwurf oder Briefing-Vorschlag. Externe Verteilung erfolgt nur gemäß Freigaberegel.

## 19. Verteilung, Zugriff und Archivierung

### 19.1 Verteilungskanäle

- direkter Download,
- sichere Plattformfreigabe,
- Kundenportal,
- Meeting/Presenter Mode,
- kontrollierte E-Mail- oder Teams-Zustellung,
- API-Übergabe,
- DMS-/Records-Archiv,
- Audit-Datenraum.

### 19.2 Empfängersteuerung

Vor der Verteilung werden geprüft:

- Mandant und Organisation,
- Empfängerrolle und Berechtigung,
- Klassifikation,
- erlaubte Anhänge,
- Ablaufdatum,
- Weitergabe- und Downloadrecht,
- externe Domain,
- Wasserzeichen oder Passwortanforderung,
- Widerrufsmöglichkeit.

### 19.3 Archiv

Das Archiv speichert:

- freigegebene Artefakte,
- Reportmanifest,
- Snapshot- und Methodereferenz,
- Freigaben und Reviewergebnisse,
- Verteilungshistorie,
- Ersetzungs- und Widerrufsinformation,
- Aufbewahrungs- und Löschstatus.

## 20. Sicherheit, Datenschutz und Redaction

Dieses Kapitel definiert fachliche Mindestregeln; Dokument 19 konkretisiert die technische Umsetzung.

- Datenklassifikation wird pro Package und bei Bedarf pro Block/Anhang geführt.
- Interne Beratungsnotizen werden nie automatisch in kundenfreigabefähige Reports übernommen.
- Personenbezogene Daten werden minimiert und rollenbezogen dargestellt.
- Exporte können Namen pseudonymisieren oder technische Details redigieren.
- Vorschauen und E-Mail-Benachrichtigungen zeigen keine sensiblen Inhalte ohne Berechtigung.
- Temporäre Rendering-Dateien werden geschützt und nach Regel gelöscht.
- Wasserzeichen, Ablauf und Downloadbegrenzung sind für vertrauliche Exporte konfigurierbar.
- Jede externe Veröffentlichung wird protokolliert.
- Hochgeladene Templates und geänderte Dateien werden auf Malware und aktive Inhalte geprüft.
- Metadaten, Kommentare und versteckte Folien/Elemente werden vor externem Versand geprüft.
- PDF- und PPTX-Ausgaben dürfen keine versteckten Mandantendaten aus wiederverwendeten Templates enthalten.

## 21. KI-Unterstützung und Guardrails

### 21.1 Zulässige KI-Assistenz

- Storyline-Entwurf aus freigegebenen Content Blocks,
- zielgruppengerechte Zusammenfassung,
- Formulierung von Folientiteln und Key Messages,
- Erklärung von KPI- oder Risikoänderungen,
- Vorschlag von Decision-, Recommendation- und Caveat-Texten,
- Verdichtung langer Findings oder Meetinghistorien,
- sprachliche Lokalisierung und Tonanpassung,
- Erkennung widersprüchlicher Aussagen,
- Vorschlag geeigneter Blocks und Appendices,
- Speaker Notes und Fragen für ein Meeting.

### 21.2 Nicht zulässig ohne menschliche Freigabe

- Erfinden fehlender Zahlen, Quellen oder Ursachen,
- verbindliche Risikoakzeptanz,
- rechtsverbindliche regulatorische Aussage,
- finanzielle Zusage oder Preisfreigabe,
- externe Veröffentlichung,
- Entfernung von Caveats oder Unsicherheiten,
- eigenmächtige Änderung von KPI- oder Risikomethoden,
- Nutzung mandantenfremder vertraulicher Inhalte,
- Behauptung eines Audit- oder Zertifizierungsstatus ohne Beleg.

### 21.3 KI-Provenance

KI-generierte oder wesentlich umformulierte Inhalte speichern:

- verwendete Quellenobjekte,
- Prompt-/Aufgabenklasse,
- Modell- und Konfigurationsversion,
- Erstellzeit,
- Confidence bzw. Prüfhinsweise,
- menschliche Änderungen,
- Reviewer und Freigabe.

Kernreports müssen mit deterministischen Templates und manuellen Textfeldern auch ohne generative KI erzeugbar sein.

## 22. Lokalisierung, Sprache und Zugänglichkeit

### 22.1 Mehrsprachigkeit

- Inhalt und Template können getrennte Sprachen besitzen.
- Fachbegriffe verwenden ein freigegebenes Glossar.
- Zahlen-, Datums-, Währungs- und Zeitzonenformate werden lokalisiert.
- Übersetzungen markieren, ob sie fachlich geprüft wurden.
- Original und Übersetzung bleiben verknüpft.
- Kundenspezifische Terminologie ist als Glossarprofil konfigurierbar.

### 22.2 Zugänglichkeit

- aussagekräftige Titel und Überschriften,
- sinnvolle Lesereihenfolge,
- Alternativtexte für Visualisierungen,
- tabellarische Datenalternative für Charts,
- Kontrast und zusätzliche Statuscodierung,
- verständliche Sprache je Audience,
- Tags/Bookmarks in PDFs soweit technisch möglich,
- keine Information ausschließlich durch Farbe,
- ausreichend große Schrift und druckbare Darstellung.

## 23. Reporting als Managed Service

Die Reporting Engine ist nicht nur Produktfunktion, sondern eine zentrale Delivery-Komponente für Managed Services.

### 23.1 Servicefähigkeiten

- standardisierte Monats- und Quartalszyklen,
- kundenspezifische Reportpakete,
- gemeinsamer Review- und Freigabeprozess,
- wiederverwendbare Practice Templates,
- automatische Datenvorbereitung,
- Beraterkommentar und Empfehlung,
- Executive Briefing als Zusatzleistung,
- Audit- oder Management-Review-Pakete,
- Value- und SLA-Nachweis,
- skalierbare Erstellung über ein Kundenportfolio.

### 23.2 Trennung von Aktivität und Wert

Ein Servicebericht zeigt nicht nur:

- Anzahl Meetings,
- Anzahl geschlossener Tasks,
- Anzahl gesammelter Evidenzen.

Er zeigt vor allem:

- welche Risiken oder Ziele sich verändert haben,
- welche Entscheidungen ermöglicht wurden,
- welcher Aufwand vermieden wurde,
- welche Controls verlässlich betrieben werden,
- welche Datenqualität verbessert wurde,
- welche Kapazität beim Kunden entlastet wurde,
- welche nächsten Hebel den größten Nutzen bieten.

### 23.3 Monetarisierbare Bausteine

- Reporting Automation,
- Executive Reporting,
- Management Review as a Service,
- Audit Pack Preparation,
- Board Presentation Support,
- Service Value Analytics,
- regulatorische Berichtspakete,
- Template- und Brand-Administration,
- kundenspezifische KPI-/Methodenpakete,
- Portfolio Reporting für Gruppen oder Beteiligungen.

Preise und konkrete Paketgrenzen werden in Dokument 14 marktbasiert modelliert.

## 24. Nutzen- und Qualitätskennzahlen

### 24.1 Produkt- und Delivery-KPIs

| Familie | Beispiele | Zweck |
|---|---|---|
| Effizienz | Zeit bis Erstentwurf, manuelle Aufbereitungszeit, Wiederverwendungsquote | Beraterproduktivität messen |
| Qualität | Datenfehler, Review-Rework, Renderfehler, abgelehnte Reports | Ergebnisqualität sichern |
| Vertrauen | Claims mit Quellen, Confidence-Abdeckung, reproduzierbare Kennzahlen | Nachvollziehbarkeit messen |
| Nutzung | erzeugte/abgerufene Reports, aktive Zielgruppen, Presenter- und Downloadnutzung | Relevanz erkennen |
| Entscheidung | Zeit von Report zu Beschluss, Decision-Card-Konversion, offene Actions | Entscheidungswirkung messen |
| Aktualität | Freshness, verspätete Zyklen, veraltete Blocks | Betriebsfähigkeit zeigen |
| Sicherheit | Fehlversand, widerrufene Links, Klassifikationswarnungen | Vertraulichkeit überwachen |
| Geschäftswert | eingesparte Stunden, Service-Adoption, Value-Ledger-Beitrag | Business Case belegen |

### 24.2 Anti-KPIs

Nicht als primäres Ziel verwenden:

- Anzahl erzeugter Folien,
- Länge eines Reports,
- Zahl der Downloads ohne Wirkung,
- minimale Erstellzeit bei sinkender Reviewqualität,
- möglichst viele Charts,
- vollautomatische Veröffentlichung als Selbstzweck,
- hohe Templatezahl ohne Nutzung und Governance.

## 25. Vollständige End-to-End-Szenarien

### 25.1 CISO erzeugt Vorstandspräsentation

1. CISO startet „Vorstandstermin vorbereiten“ im Customer Workspace.
2. Plattform schlägt Zielgruppe, letzten freigegebenen Report und aktuellen Snapshot vor.
3. Zwei Datenlücken und eine geänderte Risikomethode werden sichtbar.
4. CISO bestätigt Storyline: Zielstatus, wesentliche Änderung, Investitionsentscheidung, nächste Schritte.
5. Engine erzeugt PPTX-Entwurf und PDF-Handout mit Quellenappendix.
6. Berater ergänzt Empfehlung und Speaker Notes.
7. Data Review und CISO-Freigabe werden dokumentiert.
8. Nach dem Termin wird die Entscheidung als Decision Record übernommen.
9. Actions und Value-Ledger-Erwartung werden zurück in die Plattform geschrieben.

### 25.2 Berater bereitet kurzfristigen Kundentermin vor

1. Morning Mission meldet sinkende Zielerreichung bei einem Mandanten.
2. Berater öffnet „Kundenmeeting-Deck erzeugen“.
3. Plattform zeigt Ursache: drei überfällige Maßnahmen, neue Threat-Relevanz, fehlende Evidence.
4. Ein 8-Folien-Deck wird mit Executive Summary, Ursache, Route und drei Optionen erzeugt.
5. Reise- und Termininfo erscheint in Speaker Notes und nicht im Kundenreport.
6. Berater prüft, exportiert PPTX und teilt einen sicheren PDF-Link.
7. Im Termin wird Option B gewählt; die Entscheidung aktualisiert Zielroute und Work Package.

### 25.3 Monatlicher Managed-Service-Report

1. Am Stichtag wird automatisch ein Frozen Draft erzeugt.
2. Delivery-Daten, SLA, Risiken, Decisions, Controls und Value Ledger werden gebündelt.
3. Service Lead erhält Warnungen zu Datenlücken und ungeprüften Claims.
4. Berater ergänzt Kontext zu zwei Abweichungen.
5. Kunde prüft im Workspace und stellt eine Rückfrage am Service Value Block.
6. Freigegebene PDF- und Webfassung werden veröffentlicht.
7. Reportabruf, Meetingentscheidung und Folgeaktionen werden gemessen.

### 25.4 Audit Evidence Pack

1. Audit Lead wählt Audit, Scope und Stichtag.
2. Engine erzeugt Evidence Index, Control-Mapping, offene Requests und Findingsstatus.
3. Veraltete Evidence wird nicht als gültig ausgewiesen.
4. Auditoransicht enthält Quellen und Population; Managementfassung enthält nur Status und Risiken.
5. Nach Review wird ein geschütztes PDF-Paket plus sichere Datenraumlinks erzeugt.
6. Spätere Evidenz ändert den freigegebenen Pack nicht; sie führt zu Version 1.1.

### 25.5 Korrektur nach Veröffentlichung

1. Nach Versand wird ein falscher Zeitraum in einer KPI-Visualisierung entdeckt.
2. Package wird als korrekturbedürftig markiert; betroffener Claim und Empfängerkreis werden ermittelt.
3. Korrigierter Snapshot erzeugt Version 1.1.
4. Reviewer bestätigt, dass Entscheidungsempfehlung unverändert bleibt.
5. Alte sichere Links werden ersetzt oder widerrufen.
6. Empfänger erhalten nachvollziehbaren Korrekturhinweis.

### 25.6 KI-Ausfall

1. Narrative Service ist nicht verfügbar.
2. Engine erzeugt deterministische Blocks, Charts und vordefinierte Textbausteine.
3. Manuelle Summary-Felder werden dem Owner angeboten.
4. Report kann geprüft und veröffentlicht werden.
5. Kein Kernprozess wird durch KI-Ausfall blockiert.

## 26. Demonstrator und synthetische Daten

Der Demonstrator muss mindestens folgende Szenen glaubwürdig unterstützen:

1. CISO lädt eine fertige Vorstandspräsentation für einen synthetischen Kunden herunter.
2. Berater erzeugt aus derselben Datenbasis ein detaillierteres Kundenmeeting-Deck.
3. Auditor erhält einen Evidence Pack mit anderer Tiefe und klarer Quellenlage.
4. Executive One-Pager zeigt Investitionsoptionen und Nichtstun-Szenario.
5. Monatsservicebericht weist Outcome und eingesparte Aufbereitungszeit aus.
6. Report Studio zeigt Datenlücke und verhindert unbeaufsichtigte Veröffentlichung.
7. Wechsel des neutralen Plattformthemes auf ein synthetisches Betreiber- und Kundentheme.
8. Vergleich von Reportversionen und Rücksprung zu Datenobjekten.
9. Geplante Reportgenerierung mit Review-Inbox.
10. Export als PPTX und PDF sowie sichere Webfreigabe.

Synthetische Inhalte enthalten keine realen PwC-Daten, internen Preise oder geschützten Templates. Sie dürfen öffentlich recherchierbare Marktmechaniken und vollständig erfundene Unternehmen, Kennzahlen und Brandings verwenden.

## 27. Fehler- und Sonderfälle

- **Leerer Scope:** Generierung wird blockiert; Nutzer erhält eine verständliche Scope-Auswahl.
- **Veraltete Daten:** Preview zeigt Freshness-Warnung und betroffene Claims.
- **Widersprüchliche KPI-Werte:** kein stiller Mittelwert; Reconciliation Request wird erzeugt.
- **Template fehlt:** neutrales Standardtheme wird angeboten; kein Rendering mit beschädigtem Layout.
- **Rendering scheitert:** technische Diagnose, Retry und keine Veröffentlichung eines defekten Artefakts.
- **Chart ist zu komplex:** Engine schlägt Split, Appendix oder Tabellenalternative vor.
- **Report überschreitet Längengrenze:** Hauptstory wird verdichtet; Details wandern in Appendix oder separates Datenartefakt.
- **Freigaber abwesend:** Vertretungs- oder Eskalationsregel aus Dokument 11 greift.
- **Empfänger nicht berechtigt:** Verteilung wird blockiert und protokolliert.
- **Manuell geänderte PPTX hochgeladen:** als externer Fork gespeichert; kein automatischer Rückschreibvorgang.
- **KI-Text ohne Quellen:** Block bleibt ungeprüft und kann nicht extern freigegeben werden.
- **Mehrsprachige Versionen weichen ab:** Übersetzungsdiff und fachliche Reviewanforderung.
- **Abgelaufener Link:** Zugriff endet; Package bleibt archiviert.
- **Widerruf:** sicherer Link wird deaktiviert, Downloadhistorie bleibt sichtbar.
- **Große Evidence-Anhänge:** werden als verknüpfte Datenraumobjekte statt unkontrolliert in PDF eingebettet.

## 28. Nicht-Ziele

Die Reporting Engine ist nicht:

- ein vollwertiger Ersatz für allgemeine Office-Suiten,
- ein freies Grafik- oder Präsentationsdesignprogramm,
- eine Business-Intelligence-Plattform für beliebige Unternehmensdaten,
- ein rechtsverbindlicher regulatorischer Einreichungsdienst ohne Fachprüfung,
- eine autonome Presse- oder Krisenkommunikation,
- ein Mechanismus zum Verbergen unsicherer Daten,
- ein Schattenarchiv außerhalb des digitalen Zwillings,
- ein Ersatz für DMS/Records Management, sondern eine integrierte Erzeugungs- und Übergabeschicht,
- ein Versprechen semantischer Rücksynchronisation beliebig bearbeiteter Office-Dateien in Version 1.

## 29. Globale Akzeptanzkriterien

- Jeder veröffentlichte Report besitzt Kommunikationsziel, Audience, Scope, Snapshot, Owner, Version und Klassifikation.
- Zahlen und materiale Claims sind auf Datenobjekte und Methodik zurückführbar.
- Executive-, CISO-, ISMS-, Audit- und Servicevarianten können aus demselben Snapshot erzeugt werden, ohne Faktenwiderspruch.
- Preview zeigt Datenlücken, Aktualität, Confidence und offene Freigaben.
- Entwurf, Review, Freigabe, Veröffentlichung und Verteilung sind getrennte Zustände.
- PPTX-Ausgaben sind terminfähig, editierbar und besitzen eine klare Storyline.
- PDF-Ausgaben werden vor Veröffentlichung gerendert und visuell geprüft.
- Lange Tabellen werden lesbar behandelt und überladen nicht die Hauptstory.
- Freigegebene Versionen bleiben reproduzierbar und unverändert.
- Manuell veränderte Exporte werden als Fork, nicht als kanonische Plattformversion behandelt.
- Templates besitzen Version, Owner, erlaubte Nutzung und Renderingtests.
- Vertrauliche Inhalte werden vor externer Verteilung berechtigungs- und klassifikationsgeprüft.
- KI-generierte Aussagen zeigen Quellen und benötigen abhängig von Materialität menschliche Freigabe.
- Kernreporting funktioniert auch ohne generative KI.
- Wiederkehrende und ereignisgetriebene Reports besitzen Ausfall- und Reviewlogik.
- Reportoutcomes können in Decisions, Work Items und Value Ledger zurückgeführt werden.
- Der Demonstrator kann mindestens PPTX, PDF und sichere Webansicht mit synthetischen Daten zeigen.

## 30. Festgelegte Entscheidungen

- **ENTSCHEIDUNG 12-01:** Das Report Package ist das kanonische Objekt für Planung, Snapshot, Inhalte, Governance, Artefakte, Verteilung und Outcome.
- **ENTSCHEIDUNG 12-02:** Reporting folgt „One Source, Many Responsible Narratives“.
- **ENTSCHEIDUNG 12-03:** Zweck, Zielgruppe und gewünschte Handlung werden vor Format und Layout festgelegt.
- **ENTSCHEIDUNG 12-04:** Veröffentlichte Reports verwenden einen eingefrorenen, reproduzierbaren Daten- und Methodenstand.
- **ENTSCHEIDUNG 12-05:** Materiale Aussagen werden als Claims mit Quellen, Typ, Confidence, Owner und Gültigkeit modelliert.
- **ENTSCHEIDUNG 12-06:** Content Blocks sind wiederverwendbare, versionierte und getestete Bausteine mit Datenvertrag.
- **ENTSCHEIDUNG 12-07:** PDF, PPTX und sichere Webansicht sind priorisierte Ausgaben des Zielprodukts.
- **ENTSCHEIDUNG 12-08:** PPTX ist editierbar; manuelle Änderungen erzeugen jedoch keinen stillen Round-trip in kanonische Plattformdaten.
- **ENTSCHEIDUNG 12-09:** Die Plattform liefert ein neutrales Standarddesign und unterstützt später autorisierte Betreiber- und Kundentemplates.
- **ENTSCHEIDUNG 12-10:** Generieren, fachlich prüfen, genehmigen, veröffentlichen und verteilen sind getrennte Zustände.
- **ENTSCHEIDUNG 12-11:** Datenlücken, Unsicherheiten und Konflikte bleiben im relevanten Kommunikationskontext sichtbar.
- **ENTSCHEIDUNG 12-12:** Lange Nachweis- und Datentabellen werden in Appendices oder verknüpfte Datenartefakte ausgelagert.
- **ENTSCHEIDUNG 12-13:** Wiederkehrende Reports dürfen automatisch entworfen, aber nur gemäß Freigaberegel veröffentlicht werden.
- **ENTSCHEIDUNG 12-14:** KI darf Narrative vorbereiten, aber keine nicht belegten Aussagen oder autonome externe Veröffentlichung erzeugen.
- **ENTSCHEIDUNG 12-15:** Reporting-Nutzen wird über Zeitersparnis, Qualität, Entscheidung und Outcome gemessen - nicht über Folienzahl.

## 31. Begründete Annahmen

- **ANNAHME 12-A1:** Berater und ISMS-Teams verbringen heute einen relevanten Anteil ihrer Zeit mit wiederkehrender Datenaufbereitung und Folienerstellung.
- **ANNAHME 12-A2:** Ein gemeinsamer Content-Block- und Datenvertrag reduziert Inkonsistenzen zwischen Dashboard, PDF und Präsentation.
- **ANNAHME 12-A3:** Zielgruppengerechte Reports werden häufiger genutzt und führen schneller zu Entscheidungen als universelle Langberichte.
- **ANNAHME 12-A4:** Kunden akzeptieren automatisierte Reportentwürfe, wenn Quellen, Snapshot und menschliche Freigabe sichtbar sind.
- **ANNAHME 12-A5:** Ein neutrales hochwertiges Template reicht für den privaten Demonstrator und kann später durch Betreiberbranding ersetzt werden.
- **ANNAHME 12-A6:** PPTX- und PDF-Rendering kann im Prototyp mit kontrollierten Layouts zuverlässig umgesetzt werden.
- **ANNAHME 12-A7:** Ein vollständiger semantischer Round-trip manuell bearbeiteter PowerPoints ist für die erste Produktfassung nicht erforderlich.
- **ANNAHME 12-A8:** Report Packages und Value Ledger schaffen eine belastbare Grundlage, Managed-Service-Nutzen sichtbar zu machen.
- **ANNAHME 12-A9:** Ein kleiner Satz sehr guter Folien-/Seitenlayouts ist wertvoller als eine große ungoverned Templatebibliothek.
- **ANNAHME 12-A10:** Mindestens drei synthetische Zielgruppenvarianten desselben Kundenfalls erzeugen einen starken Vorführeffekt.

## 32. Offene Fragen

- **OFFENE FRAGE 12-Q1:** Welche Rendering-Technologien liefern die beste Balance aus editierbarer PPTX, Layouttreue und Wartbarkeit?
- **OFFENE FRAGE 12-Q2:** Welche Reporttypen werden in der ersten produktiven Version nativ und welche über konfigurierbare Templates umgesetzt?
- **OFFENE FRAGE 12-Q3:** Welche Office-Formate neben PDF und PPTX sind für den ersten Demonstrator erforderlich?
- **OFFENE FRAGE 12-Q4:** Welche Freigabematrix gilt je Reporttyp, Zielgruppe und Klassifikation?
- **OFFENE FRAGE 12-Q5:** Welche digitalen Signatur-, PDF/A- oder Records-Anforderungen sind je Zielbranche relevant?
- **OFFENE FRAGE 12-Q6:** Welche Betreiber- oder Kundentemplates können technisch importiert werden, ohne versteckte Inhalte oder Layoutfehler zu übernehmen?
- **OFFENE FRAGE 12-Q7:** Welche Charts müssen als editierbare Office-Objekte und welche dürfen als verknüpfte Grafiken erzeugt werden?
- **OFFENE FRAGE 12-Q8:** Welche Sprachmodelle und Übersetzungsdienste sind für vertrauliche Inhalte zulässig?
- **OFFENE FRAGE 12-Q9:** Wie werden regulatorische Pflichttexte, Disclaimer und länderspezifische Anforderungen versioniert?
- **OFFENE FRAGE 12-Q10:** Welche Wasserzeichen-, Ablauf- und Widerrufsfunktionen werden im ersten Release umgesetzt?
- **OFFENE FRAGE 12-Q11:** Welche Berichtsdaten dürfen als CSV/XLSX exportiert werden und welche nur in geschützten Ansichten?
- **OFFENE FRAGE 12-Q12:** Wie werden manuelle Textänderungen in einem Report mit späteren Neugenerierungen zusammengeführt?
- **OFFENE FRAGE 12-Q13:** Welche Accessibility-Ziele gelten verbindlich für PDF und PPTX?
- **OFFENE FRAGE 12-Q14:** Welche Reportnutzungsmetriken sind datenschutz- und mitbestimmungsrechtlich zulässig?
- **OFFENE FRAGE 12-Q15:** Welche marktüblichen Zeit- und Kosteneinsparungen können später im Business Case belastbar validiert werden?

## 33. Ideen für später

- interaktiver Board Mode mit Live-Entscheidungen,
- Sprach- oder Meetingaufnahme zu freigabefähigem Decision Brief,
- semantischer PPTX-Round-trip für ausgewählte Text- und Datenfelder,
- automatisches „Slide Quality Review“ für Überladung und unklare Botschaften,
- digitale Signatur und zertifizierte Archivfassung,
- personalisierte Executive Audio Briefings,
- interaktive PDF- oder Web-Anhänge mit Drill-down,
- Benchmark-Reportpacks für Branchen und Peergroups,
- automatische Übersetzung mit terminologischer Quality Gate,
- Narrative A/B-Varianten für unterschiedliche Entscheidungssituationen,
- regulatorische Submission Packs,
- integrierte Kundenkommentierung auf Folien-/Seitenebene,
- Presenter Copilot mit Quellen und erwartbaren Fragen,
- „Was hat sich seit der letzten Version geändert?“-Video oder Story,
- automatisches Redaction Preview für externe Empfänger,
- Report Marketplace mit genehmigten Branchen- und Servicevorlagen,
- chart-spezifische Daten- und Accessibility-Tests,
- ROI-Tracker für Reportautomatisierung,
- Portfolio-Decks für Unternehmensgruppen und Beteiligungen,
- dynamische Handover Packs für Reisen, Audits und Personalwechsel,
- generierte Workshop-Canvas und Arbeitsblätter,
- Executive Narrative Simulator: Wie verändert sich die Story bei anderer Zielgruppe oder Entscheidung?

## 34. Dokumentenabhängigkeiten

- **Dokument 00:** Master-Index, zentrale Wahrheit, Status und Änderungssteuerung.
- **Dokument 01:** Produktvision, Nutzenversprechen und Business Case.
- **Dokument 02:** Markt- und Wettbewerbsdifferenzierung durch Reporting, Decision Support und Managed Services.
- **Dokument 03:** Zielgruppen, Rollen, Sprache, Arbeitssituationen und Entscheidungsrechte.
- **Dokument 04:** Nutzerreisen für Meetings, Reports, Audits, Reviews und Servicezyklen.
- **Dokument 05:** Modul M23 und angrenzende Produktfunktionen.
- **Dokument 06:** UX/UI, Seitenlogik, Designsystem, Accessibility und rollenbezogene Erlebniswelten.
- **Dokument 07:** digitaler Zwilling, Objektgraph, Historie, Provenance und Snapshots.
- **Dokument 08:** ISMS-Prozesse, Audits, Evidenzen, Management Review und Maßnahmen.
- **Dokument 09:** Risiko-, Reife-, Threat-, Control-, Confidence- und Methodensemantik.
- **Dokument 10:** Decision Cards, KPIs, Simulationen, Zielrouten und Value Ledger.
- **Dokument 11:** Review, Freigabe, Kommentare, Work Items, Benachrichtigungen und Handover.
- **Dokument 13:** Reporting als Managed-Service-Betriebsprozess.
- **Dokument 14:** Report- und Briefingservices, Pakete, SLAs und Preislogik.
- **Dokument 15:** Beraterkapazität, Termin-, Reise- und Portfolio-Reporting.
- **Dokument 16:** Onboarding, Strategie-DNA, Reportprofil und Lifecycle.
- **Dokument 17:** Datenintegrationen, Reportautomatisierung, Trigger und Workflow Designer.
- **Dokument 18:** technische Reporting-, Rendering-, Storage-, Event- und API-Architektur.
- **Dokument 19:** Rechte, Datenschutz, Klassifikation, Exportkontrolle, Audit Logs und sichere Artefakte.
- **Dokument 20A:** KI-Funktionen, Modellwahl, Provenance und Guardrails.
- **Dokument 20B:** Agentenrollen für Reportplanung, Fachreview, Design, QA und Governance.
- **Dokument 20C:** Claude-Code-Umsetzung, Renderingtests, Repository, Checkpoints und Dokumentation.

## 35. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstfassung der Reporting-, PDF-, PowerPoint-, Content-Block-, Storyline-, Template-, Snapshot-, Review-, Freigabe-, Verteilungs- und Outcome-Architektur | Erstellt |
