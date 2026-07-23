# Dokument 10 - Decision Center, KPIs und Simulationen

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Zweck:** Verbindliches Steuerungs-, KPI-, Priorisierungs- und Simulationskonzept für rollenbezogene Entscheidungen im Kunden-, Berater- und Executive-Kontext.

> **Zentrale Festlegung:** Das Decision Center ist kein dekoratives Dashboard und keine Sammlung möglichst vieler Kennzahlen. Es übersetzt Veränderungen im digitalen Unternehmenszwilling in wenige, erklärbare und handlungsfähige Entscheidungen. Jede Entscheidung zeigt Zielbezug, Ursache, erwartete Wirkung, Aufwand, Unsicherheit, Abhängigkeiten, Alternativen, Verantwortliche und spätere Ergebnisprüfung.

## 1. Dokumentauftrag und Abgrenzung

Dieses Dokument definiert die fachliche Steuerungsschicht der Plattform. Es beschreibt, wie Daten aus dem digitalen Unternehmenszwilling, den ISMS-Kernprozessen sowie dem Reife-, Risiko-, Threat- und Control-Modell in rollenbezogene Missionen, Prioritäten, KPIs, Trends, Decision Cards, Zielrouten, Simulationen und Wertnachweise übersetzt werden.

Dokument 10 baut verbindlich auf Dokument 07 bis 09 auf. Es verändert deren Objekt-, Risiko-, Reife-, Control- oder Confidence-Semantik nicht. Es legt außerdem keine endgültige technische Rechenarchitektur, konkrete Datenbanktechnologie, Integrationsprodukte, Preislisten oder KI-Modelle fest. Diese folgen in Dokument 14, 17, 18 und 20A.

Simulationen sind Managementhilfen. Sie zeigen nachvollziehbare Szenarien und Bandbreiten, aber keine Garantie für künftige Schäden, Auditresultate, Umsätze oder Sicherheitszustände. Die Plattform muss diese Grenze sichtbar kommunizieren.

## 2. Executive Summary

Das Decision Center beantwortet für jede Rolle dieselbe Grundlogik in unterschiedlicher Tiefe:

1. **Was hat sich verändert?**
2. **Warum ist es für mein Ziel relevant?**
3. **Was muss ich heute entscheiden oder veranlassen?**
4. **Welche Option liefert unter realen Grenzen die beste Wirkung?**
5. **Was geschieht voraussichtlich, wenn wir handeln, warten oder die Route ändern?**
6. **Wie messen wir danach, ob die erwartete Wirkung tatsächlich eingetreten ist?**

Daraus entstehen vier zusammenhängende Produktoberflächen:

- **Morning Mission** für die tägliche persönliche Steuerung,
- **Customer Decision Center** für ein einzelnes Unternehmen,
- **Portfolio Mission Control** für Berater und Serviceverantwortliche über mehrere Mandanten,
- **Executive Decision Center** für geschäftsrelevante Entscheidungen, Investitionen und Zielerreichung.

Die Plattform zeigt nicht nur Zustände, sondern Ursache-Wirkungs-Ketten. Ein roter KPI wird nicht isoliert dargestellt, sondern mit betroffenen Geschäftsservices, Risiken, Controls, Datenqualität, offenen Maßnahmen und Handlungsoptionen verbunden. Simulationen vergleichen mindestens eine Baseline und mehrere Optionen. Jede Option besitzt Kosten, Zeit, interne und externe Kapazität, erwartete Zielwirkung, Risikowirkung, Confidence, Abhängigkeiten und nicht monetäre Konsequenzen.

[[FIGURE:FIG1]]

## 3. Verbindliche Steuerungsprinzipien

- **D01 - Entscheidung vor Datenmenge:** Die Startansicht zeigt wenige priorisierte Entscheidungen und nicht ungefilterte Datensammlungen.
- **D02 - Rolle und Situation bestimmen die Verdichtung:** Executive, CISO, ISMS-Manager, Berater und Auditor sehen unterschiedliche Fragen auf demselben Datenmodell.
- **D03 - Keine Black-Box-Priorität:** Jede Priorität erklärt Ursache, Regelversion, Datenstand, Zielbezug und Confidence.
- **D04 - Zielprofil vor generischem Ideal:** Empfehlungen orientieren sich an Strategie-DNA, Scope, Risikobereitschaft, Zieltermin und Delivery-Modell des Kunden.
- **D05 - Wirkung vor Fälligkeit:** Dringlichkeit ist wichtig, aber hohe Wirkung, Abhängigkeiten und drohende Eskalation können eine spätere Fälligkeit überstimmen.
- **D06 - Mensch entscheidet Wesentliches:** Die Plattform darf vorbereiten, simulieren und empfehlen; Risikoakzeptanz, Budgetfreigaben und wesentliche Serviceentscheidungen bleiben autorisierten Menschen vorbehalten.
- **D07 - Baseline bleibt sichtbar:** Jede Simulation zeigt den Vergleich zum Nichtstun oder zur aktuell genehmigten Route.
- **D08 - Bandbreite statt Scheingenauigkeit:** Unsichere Wirkungen werden als Range oder Szenario dargestellt, nicht als scheinbar exakter Wert.
- **D09 - Nutzen wird nachgemessen:** Erwarteter Impact wird nach Umsetzung durch Outcome und Evidence überprüft.
- **D10 - Kein verstecktes Upselling:** Managed Services sind eine Option neben interner Umsetzung, Risikovermeidung, Transfer oder bewusster Akzeptanz.
- **D11 - Reproduzierbarkeit:** Historische Missionen, KPI-Werte, Simulationen und Entscheidungen müssen mit damaliger Daten- und Methodenversion rekonstruierbar sein.
- **D12 - Kernsteuerung ohne generative KI:** Priorisierung, Schwellen, KPI-Berechnung und Simulation funktionieren deterministisch; KI darf erklären, zusammenfassen und Varianten vorschlagen.
- **D13 - Datenlücken sind ein Ergebnis:** Fehlende oder veraltete Daten werden nicht versteckt, sondern als Entscheidungsrisiko und mögliche Mission angezeigt.
- **D14 - Realistische Kapazität:** Routen und Tagesmissionen berücksichtigen Skills, interne Kapazität, Servicekapazität, Termine, Reisezeit und Abhängigkeiten.
- **D15 - Jede Seite beantwortet eine Frage:** Seiten sind nach Nutzerintention benannt und strukturiert, nicht nach internen Datenbankobjekten.

## 4. Decision Center als Produktbetriebssystem

Das Decision Center verbindet Beobachtung, Bewertung, Entscheidung, Ausführung und Wirkung. Es ist keine zusätzliche Schicht neben dem ISMS, sondern die tägliche Bedienlogik über alle Module.

### 4.1 Vier Erlebniswelten

| Erlebniswelt | Primäre Frage | Typische Nutzer | Ergebnis |
|---|---|---|---|
| Morning Mission | Wo bringt meine knappe Zeit heute den größten Nutzen? | Berater, ISMS-Manager, Control Owner | priorisierter Tagesplan mit Begründung |
| Customer Decision Center | Wo steht dieses Unternehmen und was ist der beste nächste Schritt? | CISO, ISMS-Manager, Lead-Berater | verständlicher Kundenpuls, Ursachen und Optionen |
| Portfolio Mission Control | Welche Mandanten, Services und Teams brauchen Aufmerksamkeit? | Berater, Delivery Lead, Portfolio Lead | portfolioübergreifende Steuerung und Kapazitätsentscheidung |
| Executive Decision Center | Welche geschäftsrelevante Entscheidung muss ich treffen? | Geschäftsführung, Vorstand, CISO | wenige freigabefähige Entscheidungen mit Business Impact |

### 4.2 Einheitliches Seitenmuster

Jede zentrale Seite folgt einem stabilen Interaktionsmodell:

- **Was ist die Lage?** Klartext, Zielstatus, Trend und Confidence.
- **Warum ist das wichtig?** Ursache, betroffene Geschäftsziele, Scope und Frist.
- **Was hat sich verändert?** neue Signale, Entscheidungen, Datenlücken und Abweichungen.
- **Welche Optionen gibt es?** mindestens Baseline und realistische Handlungsalternativen.
- **Was sollte als Nächstes geschehen?** priorisierte Aktion mit Owner, Termin und Freigabe.
- **Wie wird Wirkung belegt?** Erfolgsindikator, Evidence und Reviewtermin.

## 5. Morning Mission

Die Morning Mission ist die persönliche Startseite eines Arbeitstages. Sie ersetzt keine Aufgabenverwaltung, sondern verdichtet Aufgaben, Fristen, Veränderungen und Abhängigkeiten zu einer handlungsfähigen Mission.

[[FIGURE:FIG2]]

### 5.1 Fünf Ebenen

1. **Mission:** Ein kurzer Ergebnissatz, der einen sinnvollen Tageserfolg beschreibt.
2. **Warum heute:** Frist, Eskalation, Zielabweichung, neue Bedrohung, blockierter Service oder Managemententscheidung.
3. **Impact:** erwartete Risiko-, Ziel-, Zeit-, Qualitäts- oder Servicewirkung.
4. **Strategie:** empfohlene Reihenfolge unter Berücksichtigung von Kapazität, Reise, Skills und Abhängigkeiten.
5. **Das solltest du wissen:** relevante Änderungen, Datenlücken, Learnings, Nachrichten und Entscheidungen anderer Rollen.

### 5.2 Mission statt To-do-Liste

Eine Mission darf mehrere Tasks bündeln, wenn sie gemeinsam ein Outcome erzeugen. Beispiel:

> **Mission heute:** Stabilisiere die Auditroute von Nordstern Health, entscheide über die blockierte IAM-Maßnahme und sichere die Evidence für zwei kritische Controls. Erwartete Wirkung: Readiness +6 bis +9 Prozentpunkte, zwei rote Findings aus dem kritischen Pfad entfernt, zwölf Beraterstunden vor dem Audit geschützt.

Die Mission verlinkt in die Einzelaufgaben, zwingt Nutzer aber nicht, zuerst alle Details zu lesen.

### 5.3 Priorisierungssignale

Die Referenzlogik kombiniert:

- geschäftliche Kritikalität,
- Zielabweichung und Restzeit,
- Risikoveränderung,
- Control- oder Evidence-Lücke,
- regulatorische oder vertragliche Frist,
- Blockerwirkung auf andere Aufgaben,
- erwarteten Impact,
- benötigte und verfügbare Kapazität,
- Reversibilität einer Entscheidung,
- Confidence und Datenalter,
- Kunden- und Serviceeskalation,
- Reise- und Terminrealität.

Der resultierende Prioritätswert ist kein unsichtbares Ranking. Die Plattform zeigt die drei stärksten Gründe und mögliche Konflikte.

### 5.4 Mission-Zustände

| Zustand | Bedeutung |
|---|---|
| Vorgeschlagen | System hat eine Mission vorbereitet, Nutzer hat sie noch nicht bestätigt. |
| Bestätigt | Nutzer akzeptiert Ziel und geplante Reihenfolge. |
| In Arbeit | mindestens eine zugehörige Aktion läuft. |
| Blockiert | externe Entscheidung, fehlende Daten, Kapazität oder Abhängigkeit verhindert Fortschritt. |
| Neu berechnet | eine relevante Veränderung hat Priorität, Umfang oder Route angepasst. |
| Erreicht | Outcome-Kriterium wurde erfüllt oder autorisiert bestätigt. |
| Teilweise erreicht | wesentlicher Fortschritt, aber nicht alle Outcome-Kriterien erfüllt. |
| Verworfen | Mission wurde begründet ersetzt oder war nicht mehr relevant. |

### 5.5 Nutzerkontrolle

Nutzer dürfen Missionen umsortieren, splitten, delegieren oder verwerfen. Bei materialer Abweichung dokumentieren sie einen Grund. Die Plattform lernt aus wiederkehrenden Overrides, ändert aber Priorisierungsregeln nicht automatisch ohne freigegebene Kalibrierung.

## 6. Customer Decision Center

Das Customer Decision Center beantwortet innerhalb einer Minute: Wer ist der Kunde, welches Ziel verfolgt er, wo steht er, was hat sich verändert, was bedroht die Route und welche Entscheidung erzeugt die größte sinnvolle Wirkung?

### 6.1 Kopfbereich: Unternehmenspuls

Der Kopfbereich enthält:

- primäres Zielprofil und Zieltermin,
- Zielerreichung und Trend,
- aktuelle Risikolage ohne Einzahl-Vereinfachung,
- wichtigste Capability unter Ziel,
- Datenvertrauen und letzte relevante Aktualisierung,
- Managed-Service-Anteil,
- Anzahl anstehender Managemententscheidungen,
- Klartextzusammenfassung mit maximal fünf Sätzen.

### 6.2 Entscheidungsblöcke

- **Was braucht Aufmerksamkeit?** drei bis fünf Themen mit höchster Entscheidungsrelevanz.
- **Was hat sich verändert?** Delta seit letztem Login oder gewähltem Stichtag.
- **Warum ist die Lage so?** Kausalpfad von Geschäftsservice bis Signal, Risiko, Control und Maßnahme.
- **Welcher Hebel wirkt am stärksten?** Optionen nach Wirkung pro knapper Ressource.
- **Welche Entscheidung wartet?** freigabefähige Decision Cards.
- **Wie entwickelt sich die Route?** Forecast, kritischer Pfad und Meilensteine.
- **Welchen Wert hat die Zusammenarbeit erzeugt?** umgesetzte Outcomes, vermiedene Verzögerung, Automation, Assurance und Serviceleistung.

### 6.3 Management-Modus

Ein Umschalter **„Wenn ich Geschäftsführer wäre“** reduziert die Seite auf:

- drei geschäftliche Risiken oder Zielabweichungen,
- maximal fünf Entscheidungen,
- Investitions- und Nichtstun-Option,
- erwartete Wirkung und Bandbreite,
- Freigabebedarf,
- Quellen und Confidence.

Technische Details bleiben erreichbar, dominieren aber nicht die Entscheidung.

## 7. Portfolio Mission Control

Das Portfolio Mission Control unterstützt Berater und Serviceverantwortliche bei der Steuerung vieler Mandanten. Der Fokus liegt nicht auf einer maximalen Kundenzahl, sondern auf verlässlicher Skalierung ohne Qualitätsverlust.

### 7.1 Portfolio-Signale

- Kunden mit negativer Zielabweichung,
- neue kritische Risiken oder Bedrohungsrelevanz,
- Audit- und Management-Review-Termine,
- blockierte Maßnahmen und auslaufende Ausnahmen,
- Service-Level-Risiken,
- Überlastung oder Skill-Engpässe,
- notwendige Vor-Ort-Termine und Reisecluster,
- Datenqualitäts- und Evidence-Lücken,
- wiederkehrende Muster über mehrere Mandanten,
- fachlich begründete Servicechancen.

### 7.2 Portfolio-Health darf kein Ampelfriedhof sein

Für jeden Mandanten zeigt die Übersicht mindestens:

- Zielstatus,
- Trend,
- stärksten Handlungsgrund,
- erwartete nächste Managemententscheidung,
- Kapazitätsbedarf der nächsten 30 Tage,
- Datenvertrauen,
- zuständigen Lead,
- Servicezustand.

Eine Ampelfarbe ohne Erklärung ist unzulässig.

### 7.3 Opportunity Intelligence

Eine Opportunity entsteht nur, wenn ein nachgewiesener Bedarf, eine wiederkehrende Kapazitätslücke oder ein gewünschtes Ziel nicht mit der aktuellen Delivery erreicht wird. Die Plattform zeigt:

- fachlichen Auslöser,
- betroffenen Scope,
- interne Umsetzungsalternative,
- Managed-Service-Alternative,
- erwarteten Nutzen,
- Aufwand und Preisannahme,
- Interessenkonflikthinweis,
- erforderliche menschliche Prüfung.

Eine Opportunity wird nie automatisch zum Angebot oder Vertrag.

### 7.4 Muster über Mandanten

Anonymisierte oder berechtigte Cross-Tenant-Analysen können zeigen:

- gleiche Control-Lücke in mehreren Kunden,
- wiederkehrende Audit-Findings,
- häufig ineffiziente Maßnahmen,
- Automatisierungspotenzial,
- wiederverwendbare Workflows,
- gemeinsame Reise- oder Workshoptermine,
- Bedarf an neuen Servicepaketen.

Die Auswertung unterliegt Dokument 19 und darf keine unzulässige Mandantendatenoffenlegung erzeugen.

## 8. Executive Decision Center

Das Executive Decision Center ist eine eigenständige Erlebniswelt für seltene, aber folgenreiche Nutzung. Es beantwortet keine Frage wie „Welche 37 Maßnahmen sind offen?“, sondern „Welche Entscheidung benötigt meine Autorität und welchen geschäftlichen Unterschied macht sie?“

### 8.1 Executive Startansicht

- Zielstatus in Klartext,
- Entwicklung seit dem letzten Management Review,
- Top-Geschäftsrisiken und betroffene Services,
- Entscheidungen innerhalb der nächsten 30 Tage,
- Investitionsbedarf und Konsequenz des Nichtstuns,
- Wirkung bereits genehmigter Investitionen,
- Confidence und wesentliche Datenlücken,
- freigabefähiger Report oder Slide Deck.

### 8.2 Entscheidungsarten

| Entscheidungsart | Beispiel | Mindestinhalt |
|---|---|---|
| Investition | IAM-Programm, zusätzliche Ressourcen, Tooling | Optionen, Kostenband, Wirkung, Termin, Abhängigkeiten |
| Risiko | Akzeptieren, reduzieren, vermeiden, transferieren | Szenario, Restwirkung, Owner, Gültigkeit, Review |
| Ziel | Reifegrad, Readiness, Resilienz oder Scope verändern | Begründung, Auswirkungen, neue Route |
| Service | Managed Service starten, erweitern, reduzieren | Bedarf, Leistungsgrenze, Nutzen, Kosten, Exit |
| Ausnahme | temporäre Abweichung genehmigen | Kompensation, Risiko, Ablaufdatum, Owner |
| Priorität | Programm oder Maßnahmenfolge ändern | Trade-off, verdrängte Arbeit, Zielwirkung |

### 8.3 Executive Sprache

Technische Begriffe werden nicht entfernt, sondern übersetzt. Ein Executive sieht zuerst Geschäftsservice, Ergebnis, finanzielle oder operative Konsequenz und Entscheidungsfrist. Fachliche Details, Controls und Evidence bleiben über Drill-down erreichbar.

## 9. Decision Cards

Die Decision Card ist das kanonische, freigabefähige Entscheidungsobjekt der Plattform.

### 9.1 Pflichtfelder

| Feld | Bedeutung |
|---|---|
| Entscheidungsfrage | ein klarer Satz mit realer Wahlmöglichkeit |
| Zielbezug | welches Zielprofil, Risiko oder Outcome betroffen ist |
| Auslöser | Signal, Frist, Finding, Trend oder Managementauftrag |
| Baseline | erwartete Entwicklung ohne neue Entscheidung |
| Optionen | mindestens eine realistische Handlungsalternative und Nichtstun |
| Wirkung | Risiko, Reife, Ziel, Service, Zeit und nicht monetäre Effekte |
| Ressourcen | Budget, interne Stunden, externe Stunden, Skills, Reise |
| Abhängigkeiten | Voraussetzungen, kritischer Pfad, andere Entscheidungen |
| Confidence | Datenvertrauen und Unsicherheitsband |
| Empfehlung | begründeter Vorschlag, nicht automatisch bindend |
| Owner und Approver | Verantwortlicher und freigabeberechtigte Rolle |
| Frist | spätester sinnvoller Entscheidungszeitpunkt |
| Outcome Check | wie und wann Wirkung überprüft wird |
| Provenance | Quellen, Methoden- und Szenarioversion |

### 9.2 Decision Record

Nach Freigabe wird die Karte zum unveränderbaren Decision Record. Korrekturen erfolgen als neue Version oder Nachtrag. Festgehalten werden Option, Begründung, Freigabe, Bedingungen, erwartete Wirkung, Reviewtermin und spätere Ist-Wirkung.

## 10. KPI-System

KPIs dienen Steuerung, nicht Dekoration. Jede Kennzahl muss eine Entscheidung unterstützen, ein Verhalten sichtbar machen oder eine Zielabweichung früh erkennen.

[[FIGURE:FIG4]]

### 10.1 KPI-Hierarchie

- **Business Outcomes:** Resilienz kritischer Services, Marktzugang, Kundenvertrauen, regulatorische Handlungsfähigkeit.
- **Security Outcomes:** Risikoreduktion, Zielerreichung, Control-Wirksamkeit, reduzierte Exposition.
- **Delivery Outcomes:** Durchlaufzeit, Planstabilität, Assurance-Abdeckung, Servicequalität.
- **Leading Indicators:** überfällige kritische Actions, Control-Test-Fälligkeit, Evidence-Aktualität, Datenlücken, Blocker.
- **Operative Signale:** Tasks, Findings, Incidents, Changes, Tickets, Imports und Tests.

### 10.2 KPI-Vertrag

Jede KPI besitzt:

- eindeutige ID und Bezeichnung,
- fachliche Frage,
- Definition und Formel,
- Einheit und zulässige Werte,
- Scope und Population,
- Datenquelle und Aktualisierungsrhythmus,
- Owner und Nutzerrollen,
- Ziel, Schwellen und Eskalation,
- Confidence-Anforderung,
- erlaubte Interpretation,
- bekannte Fehlinterpretationen,
- Methoden- und Versionshistorie.

### 10.3 Kanonische KPI-Familien

| Familie | Beispielhafte KPI | Entscheidungsnutzen |
|---|---|---|
| Ziel | Goal Proximity, Meilenstein-Treue, kritischer Pfad | Sind wir auf der gewählten Route? |
| Risiko | Top-Risiko-Trend, Risiko oberhalb Toleranz, Konzentration | Wo ist Managementhandeln nötig? |
| Control | belegte Wirksamkeit, Coverage, Teststabilität | Schützen Controls tatsächlich? |
| Assurance | Evidence-Aktualität, Prüfungsabdeckung, Datenvertrauen | Wie belastbar ist die Aussage? |
| Maßnahmen | Impact-weighted Completion, Durchlaufzeit, Blocker | Werden die wirksamsten Dinge erledigt? |
| Service | SLA, Outcome-Erreichung, Kapazität, Wiederholfehler | Liefert der Managed Service Wert? |
| Effizienz | automatisierte Schritte, vermiedene Doppelarbeit, Zykluszeit | Wo wird Arbeit skalierbar? |
| Finanzen | Kosten je Outcome, Forecast, Budgetverbrauch | Welche Option ist wirtschaftlich? |
| Menschen | Skill-Abdeckung, Überlastung, Reiseanteil, Vertretung | Ist die Route realistisch lieferbar? |

### 10.4 Beispielhafte Referenzformeln

`Impact-weighted Completion = Summe (erledigter Maßnahmenimpact) / Summe (geplanter Maßnahmenimpact)`

`Goal Proximity = erreichte gewichtete Zielkriterien / alle gewichteten Zielkriterien`

`Automation Benefit = vermiedene manuelle Zeit - zusätzliche Prüf- und Ausnahmezeit`

`Forecast Variance = prognostizierter Zieltermin - genehmigter Zieltermin`

Diese Formeln sind Startlogiken und müssen mit Scope, Datengrundlage und Methodenversion angezeigt werden.

### 10.5 Anti-KPIs

Die Plattform verbietet oder markiert Kennzahlen mit hohem Fehlsteuerungsrisiko, etwa:

- bloße Anzahl geschlossener Tasks ohne Impact,
- Gesamtzahl hochgeladener Dokumente,
- „100 Prozent compliant“ ohne Scope und Evidence,
- durchschnittlicher Risikoscore, der kritische Ausreißer verdeckt,
- Beraterauslastung ohne Qualitäts- und Outcome-Bezug,
- automatisierte Schritte ohne Fehler- und Reviewquote.

## 11. Trends, Deltas und Frühwarnung

Ein aktueller Wert ohne Entwicklung ist häufig nicht entscheidungsfähig. Die Plattform zeigt daher:

- Veränderung seit letztem Login,
- Veränderung seit Management Review,
- rollierenden 30-, 90- und 365-Tage-Trend,
- Zielpfad versus Ist-Pfad,
- Saisonalität und geplante Sprünge,
- Methoden- oder Scope-Brüche,
- Confidence-Veränderung,
- Prognoseband.

### 11.1 Signifikanz statt Alarmflut

Eine Veränderung wird relevant, wenn mindestens eine Bedingung erfüllt ist:

- Schwelle oder Toleranz verletzt,
- kritischer Pfad beeinflusst,
- erhebliche Zielterminverschiebung,
- neue Geschäftsservice-Betroffenheit,
- stark sinkende Confidence,
- unerwartete Abweichung vom historischen Muster,
- erforderliche menschliche Entscheidung.

### 11.2 Change Story

Das Decision Center erzeugt eine kurze, prüfbare Change Story:

> „Die Zielerreichungsprognose sank von 78 auf 69 Prozent. Hauptursachen sind ein vierwöchiger IAM-Blocker, zwei abgelaufene Evidence-Sets und ein neuer externer Threat mit Relevanz für den Kunden-Scope. Die Methodenversion blieb unverändert; Confidence liegt bei 82.“

## 12. Kausalität statt isolierter Scores

Jede relevante Aussage besitzt einen Explainability Path. Der Nutzer kann von einer Managementaussage bis zu den zugrunde liegenden Objekten navigieren:

`Geschäftsziel -> Geschäftsservice -> Risikoszenario -> Threat/Schwäche -> Control -> Evidence/Test -> Maßnahme -> Entscheidung`

### 12.1 Kausalitätsregeln

- Beziehungen stammen aus dem digitalen Unternehmenszwilling.
- Kausalität und Korrelation werden getrennt gekennzeichnet.
- Vermutete Beziehungen besitzen Confidence und Owner.
- Alternative Ursachen bleiben sichtbar.
- Änderungen an Kausalregeln sind versioniert.
- Ein Score darf nie die einzige Begründung einer Entscheidung sein.

### 12.2 „Warum?“-Interaktion

Jede KPI, Priorität und Simulation besitzt den Befehl **„Warum sehe ich das?“**. Die Antwort enthält maximal drei Hauptursachen, danach Details auf Nachfrage. So bleibt die Oberfläche einfach, ohne Transparenz zu verlieren.

## 13. Zielnavigation und Routenlogik

Die Plattform behandelt ein Zielprofil wie eine Navigation: Ist-Zustand, Ziel, verfügbare Routen, kritischer Pfad, Meilensteine, erwartete Ankunft und Gründe für eine Neuberechnung.

[[FIGURE:FIG3]]

### 13.1 Routentypen

| Route | Optimierungsziel | Typische Konsequenz |
|---|---|---|
| Schnell | kürzeste realistische Zeit bis zum Ziel | höheres Budget, mehr Parallelisierung, höhere Änderungsbelastung |
| Kosteneffizient | beste Wirkung je Gesamtkosten | längere Laufzeit, stärkere interne Mitarbeit, harte Priorisierung |
| Managed Service | geringste interne Last bei definierter Qualität | externe Kosten, klare Servicegrenzen, Governance-Bedarf |
| Risiko-zuerst | schnellste Reduktion der Top-Risiken | Readiness oder Dokumentationsziele können später folgen |
| Evidence-zuerst | schnell belastbare Nachweislage | mögliche technische Wirkungslücken bleiben sichtbar |
| Balanced | gewichteter Kompromiss der Strategie-DNA | keine Dimension wird maximal optimiert |

Die drei Standardrouten im Demonstrator sind Schnell, Kosteneffizient und Managed Service. Weitere Profile sind konfigurierbar.

### 13.2 Route-Bausteine

Eine Route besteht aus:

- Zielkriterien,
- Meilensteinen,
- Maßnahmen und Entscheidungen,
- Abhängigkeiten,
- Kapazitäts- und Skillbedarf,
- Budget und Kostenband,
- interner/externer Delivery-Aufteilung,
- Risiken der Route,
- Outcome- und Evidence-Kriterien,
- Forecast und Confidence.

### 13.3 Kritischer Pfad

Der kritische Pfad zeigt die Elemente, deren Verzögerung den Zieltermin oder ein zwingendes Outcome unmittelbar beeinflusst. Er darf nicht nur Projekttermine berücksichtigen, sondern auch:

- Managementfreigaben,
- Beschaffung,
- technische Abhängigkeiten,
- Evidence-Zyklen,
- Auditfenster,
- externe Lieferanten,
- Skill- und Reiseverfügbarkeit,
- notwendige Betriebsbeobachtungszeit für Wirksamkeit.

## 14. Simulations-Engine

Die Simulations-Engine beantwortet konkrete Managementfragen, nicht mathematische Neugier. Jede Simulation benötigt eine Entscheidungsfrage und einen definierten Verwendungszweck.

### 14.1 Simulationsarten

- **Investitionssimulation:** Welche Wirkung entsteht bei unterschiedlichem Budget?
- **Priorisierungssimulation:** Welche Reihenfolge erreicht das Ziel schneller oder sicherer?
- **Kapazitätssimulation:** Was ändert sich mit zusätzlichen internen oder externen Ressourcen?
- **Service-Mix-Simulation:** Was bleibt intern, was übernimmt ein Managed Service?
- **Risiko-Simulation:** Wie verändert sich das Restrisiko bei ausgewählten Controls oder Maßnahmen?
- **Deadline-Simulation:** Welche Maßnahmen sind für einen Zieltermin zwingend?
- **Scope-Simulation:** Was geschieht bei Erweiterung oder Reduktion des Scopes?
- **Threat-Simulation:** Welche Route ist bei einer veränderten Bedrohungslage noch tragfähig?
- **Nichtstun-Simulation:** Welche erwartete Entwicklung ergibt sich ohne neue Entscheidung?

### 14.2 Kanonischer Ablauf

1. Entscheidungsfrage definieren.
2. Baseline und Stichtag einfrieren.
3. Ziel, Scope und Constraints bestätigen.
4. Optionen konfigurieren.
5. Annahmen, Quellen und Abhängigkeiten anzeigen.
6. Szenarien berechnen.
7. Wirkung, Bandbreite, Confidence und Trade-offs vergleichen.
8. Mensch wählt, ändert oder verwirft eine Option.
9. Freigabe als Decision Record speichern.
10. Route aktualisieren und Outcome Check terminieren.

### 14.3 Simulationsergebnis

Jede Option zeigt mindestens:

- erwarteten Zieltermin,
- Zielerreichungsband,
- Risikoänderung je relevantes Szenario,
- Control- und Evidence-Wirkung,
- Budgetband,
- interne und externe Stunden,
- benötigte Skills,
- Reise- und Terminwirkung,
- kritische Abhängigkeiten,
- Nebenwirkungen und verdrängte Arbeit,
- Confidence,
- Gründe, warum die Option empfohlen oder nicht empfohlen wird.

### 14.4 Unsicherheit

Drei Darstellungen sind zulässig:

- **Punktwert mit hoher Confidence**, wenn Daten und Methode stabil sind,
- **Bandbreite**, wenn Parameter schwanken,
- **Szenarioband** mit optimistisch, erwartet und konservativ.

Eine Simulation mit niedriger Confidence kann trotzdem nützlich sein, muss aber zuerst die Entscheidung über Datenerhebung oder Pilotierung nahelegen.

## 15. Investitionssimulation und Business Impact

Die Investitionssimulation übersetzt fachliche Maßnahmen in Managementoptionen. Sie darf Cyberrisiko nicht künstlich in exakte Euro-Schäden umrechnen, wenn keine belastbare Methode und Datenbasis vorhanden sind.

### 15.1 Wirkungsdimensionen

- Risikoreduktion,
- Reife- oder Zielerreichung,
- Audit- oder regulatorische Handlungsfähigkeit,
- Schutz kritischer Geschäftsservices,
- vermiedene Verzögerung,
- interne Zeitersparnis,
- externe Servicekosten,
- Prozessqualität und Assurance,
- reduzierte Wiederholarbeit,
- verbesserte Entscheidungsfähigkeit,
- nicht monetäre Faktoren wie Vertrauen und Belastung.

### 15.2 Optionendarstellung

| Option | Budget | Zielzeit | Interne Last | Erwartete Wirkung | Hauptrisiko |
|---|---:|---:|---:|---|---|
| Baseline / Nichtstun | 0 zusätzlich | +14 Wochen | mittel | Zielabweichung wächst | Audit- und Risikofristen gefährdet |
| Interne Umsetzung | mittel | +8 Wochen | hoch | hohe Ownership, moderate Geschwindigkeit | Skill- und Kapazitätsengpass |
| Mischmodell | mittel bis hoch | +4 Wochen | mittel | gute Geschwindigkeit und Wissenstransfer | Governance und Schnittstellen |
| Managed Service | hoch | +3 Wochen | niedrig | schnelle Stabilisierung und standardisierte Delivery | Abhängigkeit und Servicegrenzen |

Zahlen in Demo und Konzept sind synthetisch und als Annahmen gekennzeichnet.

### 15.3 Wert nach Umsetzung

Nach Durchführung vergleicht die Plattform:

- erwartete versus tatsächliche Kosten,
- erwartete versus tatsächliche Dauer,
- erwartete versus beobachtete Risiko- und Zielwirkung,
- Evidence-Qualität,
- wiederkehrende Aufwände,
- Lessons Learned für künftige Routen.

## 16. Budget-, Kapazitäts- und Zeitlogik

Routen sind nur glaubwürdig, wenn sie Ressourcenrealität berücksichtigen.

### 16.1 Ressourcenarten

- internes Budget,
- externe Servicekosten,
- interne Stunden nach Rolle und Skill,
- Beraterstunden,
- technische Implementierungskapazität,
- Managementfreigabezeit,
- Reisezeit und Reisekosten,
- Betriebsbeobachtungszeit,
- Beschaffungs- und Lieferzeiten.

### 16.2 Kapazitätskalender

Die Simulation darf keine Kalenderintegration voraussetzen, muss aber ein Kapazitätsmodell unterstützen. Spätere Integrationen können Termine und Verfügbarkeit liefern. Für den Demonstrator reichen synthetische Kapazitäten und blockierte Zeiträume.

### 16.3 Überlastschutz

Eine Route ist nicht zulässig, wenn sie dauerhaft unrealistische Auslastung voraussetzt. Die Plattform markiert Überlast, Skill-Mangel und fehlende Vertretung und schlägt Alternativen vor: Umpriorisierung, Terminverschiebung, Serviceunterstützung oder Scope-Aufteilung.

## 17. Automatische Neuberechnung

Eine Route wird neu berechnet, wenn ein Ereignis die Annahmen oder den kritischen Pfad material verändert.

### 17.1 Auslöser

- neue Bedrohungsrelevanz,
- Incident oder Major Finding,
- Control-Test fehlgeschlagen,
- Evidence abgelaufen,
- Scope oder Geschäftsziel verändert,
- Budget gekürzt oder erweitert,
- Ressource nicht verfügbar,
- Audit- oder Liefertermin verschoben,
- Managed Service aktiviert oder beendet,
- Risikoakzeptanz abgelaufen,
- Datenvertrauen wesentlich gesunken.

### 17.2 Re-Routing-Regeln

- ursprüngliche Route bleibt historisch erhalten,
- Änderung und Ursache werden erklärt,
- Nutzer sieht Delta zu Termin, Kosten und Wirkung,
- bereits freigegebene Entscheidungen werden nicht still überschrieben,
- materiale Änderungen erfordern neue Freigabe,
- kleine operative Anpassungen können innerhalb definierter Toleranzen automatisch erfolgen,
- Benachrichtigung richtet sich nach Rolle und Materialität.

### 17.3 Stabilität gegen „Dashboard-Flattern“

Um ständige unruhige Wechsel zu vermeiden, nutzt die Plattform Schwellen, Mindestdauer, Materialitätsregeln und Ereignisbündelung. Kritische Ereignisse erscheinen sofort; geringfügige Änderungen werden zusammengefasst.

## 18. Priorisierungs-Engine

Die Referenzpriorität einer Handlungsoption ergibt sich nicht aus einer einzigen Formel, sondern aus einem erklärbaren Satz von Faktoren.

### 18.1 Faktorgruppen

| Faktorgruppe | Beispiele |
|---|---|
| Ziel | Abweichung, Restzeit, kritischer Pfad |
| Risiko | Szenarioschwere, Toleranzverletzung, Konzentration |
| Wirkung | erwartete Reduktion, Coverage, mehrere abhängige Outcomes |
| Zeit | Frist, Verzögerungskosten, notwendige Beobachtungsdauer |
| Ressourcen | Aufwand, Skills, Budget, Reise, Verfügbarkeit |
| Abhängigkeit | Blocker, Sequenz, externe Voraussetzung |
| Vertrauen | Confidence, Datenlücke, Methodenstabilität |
| Reversibilität | Korrekturmöglichkeit und Lock-in |
| Service | SLA, Kundenzusage, Delivery-Risiko |

### 18.2 Referenzlogik

Für den Demonstrator kann eine transparente gewichtete Logik genutzt werden. Die Oberfläche zeigt jedoch keine scheinobjektive „Wahrheit“, sondern Prioritätsband und Hauptgründe. Gewichtungen werden je Zielprofil versioniert.

### 18.3 Human Override

Ein Nutzer kann eine niedrigere Empfehlung vorziehen, wenn etwa strategische Abhängigkeiten, Change-Fatigue oder Managementkontext nicht vollständig modelliert sind. Der Override wird begründet, befristet und später ausgewertet.

## 19. Wert- und Nutzenbeweis

Die Plattform muss zeigen, ob sie und der Managed Service tatsächlich Wert erzeugen. Der Nachweis umfasst mehr als Umsatz oder Anzahl erledigter Tasks.

### 19.1 Value Ledger

Das **Value Ledger** verbindet jede relevante Leistung mit:

- Ausgangslage,
- genehmigter Entscheidung,
- investierten Ressourcen,
- durchgeführten Aktionen,
- erzeugter Evidence,
- beobachteten Outcomes,
- verbleibendem Risiko,
- vermiedener oder verkürzter Arbeit,
- Confidence,
- verantwortlicher Rolle.

### 19.2 Nutzenkategorien

- **Risk Value:** beobachtete Reduktion relevanter Risikoszenarien.
- **Goal Value:** Fortschritt zu Reife-, Readiness-, Resilienz- oder Compliance-Zielen.
- **Assurance Value:** höhere Nachweisqualität und geringere Unsicherheit.
- **Efficiency Value:** reduzierte Zykluszeit, Doppelarbeit und manuelle Aufbereitung.
- **Capacity Value:** mehr betreute Kunden oder Outcomes bei stabiler Qualität.
- **Decision Value:** schnellere, besser erklärte und revisionsfähige Entscheidungen.
- **Service Value:** nachweisbare Outcomes aus einem Managed Service.

### 19.3 Vorsicht bei vermiedenen Schäden

„Verhinderter Schaden“ wird nur ausgewiesen, wenn Methode, Datengrundlage und Unsicherheit belastbar sind. Standardmäßig spricht die Plattform von Risikoreduktion, Expositionsreduktion, vermiedener Verzögerung oder verbesserter Assurance.

## 20. Reporting und Deliverables

Jede Decision-Center-Ansicht kann zielgruppengerecht exportiert werden. Die finale Reporting-Engine wird in Dokument 12 definiert.

### 20.1 Sofortausgaben

- Executive One-Pager,
- Management-Review-Paket,
- Monats- oder Quartalsreport,
- Kundenstatusbericht,
- Decision Memo,
- Investitionsvergleich,
- Routen- und Forecastübersicht,
- Berater-Workshop-Deck,
- Audit-Vorbereitungsstatus.

### 20.2 Konsistenzregel

Ein PDF oder PowerPoint enthält dieselben zugrunde liegenden Werte und Decision Records wie die Plattform. Manuelle redaktionelle Anpassungen werden versioniert; keine Folie darf still eine andere Wahrheit erzeugen.

## 21. Benachrichtigungen und Attention Management

Das Decision Center besitzt ein zentrales Aktivitäts- und Benachrichtigungsmodell.

### 21.1 Benachrichtigungsklassen

- **Entscheidung erforderlich:** menschliche Freigabe oder Auswahl nötig.
- **Materiale Veränderung:** Ziel, Risiko, Route oder Confidence verändert sich wesentlich.
- **Frist und Eskalation:** Zeitfenster droht zu reißen.
- **Blocker:** Arbeit kann ohne Eingriff nicht fortgesetzt werden.
- **Information:** relevante Änderung ohne unmittelbare Aktion.
- **Digest:** gebündelte niedrige Prioritäten und Lernhinweise.

### 21.2 Kanalprinzip

Die Plattform ist zentrale Wahrheit. E-Mail, Teams oder Slack sind Zustellkanäle und verlinken zurück. Sensible Details werden kanalabhängig minimiert.

## 22. Daten- und Methodengovernance

### 22.1 Versionierte Bausteine

- KPI-Definitionen,
- Priorisierungsregeln,
- Route- und Simulationsmethoden,
- Gewichtungen,
- Schwellen,
- Zielprofile,
- Datenquellen,
- Confidence-Regeln,
- Reportvorlagen.

### 22.2 Freigaberegeln

Materiale Änderungen an KPI- oder Simulationsmethoden benötigen Method Owner, Impactanalyse, Test gegen Referenzdaten, Freigabe und Migrationshinweis. Historische Ergebnisse werden nicht rückwirkend still neu gerechnet.

### 22.3 Kalibrierung

Kalibrierung nutzt synthetische Referenzfälle, Pilotkunden und später reale Outcome-Daten. Änderungen müssen Fehlanreize, Diskriminierung, verstecktes Upselling und Scheingenauigkeit prüfen.

## 23. Rollen und Entscheidungsrechte

| Rolle | Darf | Darf nicht ohne zusätzliche Freigabe |
|---|---|---|
| Executive | Investition, Ziel, Risikoakzeptanz und Servicefreigabe entscheiden | fachliche Evidence oder Methoden still ändern |
| CISO | Optionen vorbereiten, priorisieren, delegieren, Reviews anstoßen | alleinige Freigabe außerhalb definierter Autorität |
| ISMS-Manager | Missionen und Maßnahmen steuern, Daten prüfen, Simulationen vorbereiten | wesentliche Budgets oder Managementrisiken automatisch akzeptieren |
| Berater | analysieren, empfehlen, Szenarien konfigurieren, Reports vorbereiten | Kundenentscheidung fingieren oder Service automatisch verkaufen |
| Service Lead | Portfolio, Kapazität, Qualität und Delivery steuern | Kundenziele ohne Mandat ändern |
| Control Owner | lokale Umsetzung, Evidence und Outcome bestätigen | globale Zielprofile verändern |
| Auditor | Read-only-Analyse, Evidence und Decision Records prüfen | operative Prioritäten oder Scores ändern |
| Method Owner | KPI-, Priorisierungs- und Simulationsmethoden versionieren | produktive Änderung ohne Review und Freigabe |

## 24. End-to-End-Szenarien

### 24.1 Morning Mission eines Beraters

Ein Berater öffnet um 08:00 Uhr das Portfolio Mission Control. Sechs Mandanten zeigen Veränderungen, aber nur zwei benötigen heute eine menschliche Entscheidung. Die Plattform bündelt 31 Tasks zu drei Missionszielen, berücksichtigt einen Vor-Ort-Termin am Nachmittag und verschiebt zwei niedrige Prioritäten. Der Berater bestätigt die Mission, öffnet eine Decision Card und delegiert Evidence-Nachlieferung.

### 24.2 Executive Investitionsentscheidung

Der CISO bereitet drei Optionen für Identity Governance vor. Das Executive Decision Center zeigt Baseline, interne Umsetzung, Mischmodell und Managed Service. Die Geschäftsführung sieht Kostenband, Zieltermin, Top-Risiko-Wirkung, interne Belastung und Confidence. Sie genehmigt das Mischmodell. Entscheidung, Bedingungen und Outcome Check werden gespeichert.

### 24.3 Neue Bedrohung und Re-Routing

Ein externes Threat-Signal wird für zwei Assets relevant. Dokument 09 aktualisiert Risiko und Control-Impact. Dokument 10 erkennt, dass eine bestehende Route den Zieltermin noch hält, aber das Risiko-zuerst-Profil eine Maßnahme vorziehen sollte. Die Plattform zeigt das Delta, verlangt keine neue Budgetfreigabe und passt die operative Sequenz innerhalb genehmigter Toleranz an.

### 24.4 Datenlücke statt falscher Sicherheit

Eine Management-KPI wirkt stabil, aber mehrere Evidence-Sets sind veraltet. Confidence fällt unter den Schwellenwert. Die Morning Mission priorisiert nicht sofort eine neue technische Maßnahme, sondern ein fokussiertes Assurance-Paket. Der Executive Report zeigt „Bewertung unsicher“ statt eine grüne Ampel.

### 24.5 Servicechance ohne Verkaufsdruck

Bei drei Quartalen wiederkehrender Kapazitätsüberschreitung erkennt die Plattform einen strukturellen Bedarf. Sie zeigt interne Rekrutierung, Prozessautomatisierung und Managed Service als drei Optionen. Der Berater darf daraus nach Prüfung eine Opportunity erstellen. Ohne Kundenfreigabe entsteht kein Angebot.

### 24.6 Wirkung nachweisen

Sechs Wochen nach Umsetzung einer Maßnahme vergleicht der Outcome Check Forecast und Ist. Die Zielwirkung trat teilweise ein, die Risikowirkung ist wegen schwacher Betriebsdaten noch unsicher. Die Plattform aktualisiert das Value Ledger, senkt Confidence nicht still und empfiehlt eine weitere Beobachtungsperiode statt voreiligen Erfolg.

## 25. Demo-Spezifikation

Der klickbare und funktionale Demonstrator soll mindestens folgende Szenen mit synthetischen Daten enthalten:

1. Login als Berater mit Portfolio Morning Mission.
2. Drill-down in einen Kunden mit Unternehmenspuls und Change Story.
3. Öffnen einer Kausalitätsansicht von KPI bis Evidence.
4. Vergleich der drei Standardrouten.
5. Investitionssimulation mit Baseline und drei Optionen.
6. Executive Rollenwechsel und Freigabe einer Decision Card.
7. automatische Neuberechnung durch ein synthetisches Threat- oder Kapazitätsereignis.
8. Value Ledger mit erwarteter und tatsächlicher Wirkung.
9. Export eines Executive One-Pagers und eines PowerPoint-Entwurfs.
10. Anzeige von Confidence, Quellen und Datenlücken.

### 25.1 Demo-Unternehmen

Mindestens drei synthetische Unternehmen sollen unterschiedliche Profile zeigen:

- reguliertes Unternehmen mit hohem Assurance-Bedarf,
- mittelständisches Produktionsunternehmen mit begrenzter Kapazität,
- digitales Wachstumsunternehmen mit dynamischem Scope.

Daten, Namen, Preise und Outcomes sind frei erfunden und deutlich als Demo gekennzeichnet.

## 26. Fehler- und Sonderfälle

- **Keine Daten:** Seite zeigt Onboarding- oder Datenbeschaffungsmission statt leerer KPI.
- **Widersprüchliche Quellen:** Confidence sinkt; Konflikt wird als Aufgabe erzeugt.
- **Simulation nicht lösbar:** System erklärt fehlende Parameter und bietet Minimalmodell an.
- **Keine realistische Route:** Zielkonflikt wird sichtbar, Ziel oder Ressourcen müssen entschieden werden.
- **Abgelaufene Freigabe:** Route bleibt historisch, neue Freigabe wird angefordert.
- **KI nicht verfügbar:** deterministische KPI-, Priorisierungs- und Simulationsfunktionen bleiben nutzbar.
- **Integration verzögert:** letzter Datenstand und Staleness werden angezeigt.
- **Massiver Event-Sturm:** kritische Ereignisse sofort, übrige gebündelt und dedupliziert.
- **Reise oder Ressource fällt aus:** Route und Tagesmission werden neu berechnet.
- **Unzulässiger Cross-Tenant-Zugriff:** Analyse wird blockiert und protokolliert.
- **Manuelle Manipulation eines Reports:** Abweichung zur Plattformquelle wird gekennzeichnet.

## 27. Nicht-Ziele

Das Decision Center ist nicht:

- ein SIEM oder SOC-Ersatz,
- eine autonome Geschäftsführung,
- ein Garantie- oder Zertifizierungsautomat,
- ein Tool zur exakten Vorhersage künftiger Cyberverluste ohne belastbare Datenbasis,
- ein reiner Aufgabenplaner,
- ein BI-Werkzeug für beliebige Unternehmenskennzahlen,
- ein versteckter Verkaufstrichter,
- ein Ersatz für menschliche Risiko- und Budgetverantwortung,
- eine starre Einheitsmethodik für alle Kunden.

## 28. Globale Akzeptanzkriterien

- Jede priorisierte Aussage zeigt mindestens Zielbezug, Ursache, Datenstand und Confidence.
- Morning Mission bündelt Tasks zu Outcomes und ist durch den Nutzer veränderbar.
- Executive View zeigt höchstens fünf primäre Entscheidungen gleichzeitig.
- Jede Simulation enthält Baseline, Annahmen, Optionen, Bandbreite und Versionsinformationen.
- Routen berücksichtigen Abhängigkeiten, Budget, Kapazität, Skills und relevante Reisezeiten.
- Re-Routing überschreibt keine historische Entscheidung still.
- KPI-Definitionen sind versioniert und für Nutzer verständlich abrufbar.
- Ein Drill-down verbindet Managementaussage mit den zugrunde liegenden Objekten und Evidence.
- Managed-Service-Empfehlungen zeigen mindestens eine nicht kommerzielle Alternative.
- Value Ledger vergleicht erwartete und tatsächliche Wirkung.
- Kritische Entscheidungen benötigen definierte menschliche Freigabe.
- Kernfunktionen bleiben ohne generative KI verfügbar.
- Demo-Daten sind synthetisch, konsistent und über Rollen hinweg identisch.
- Exportierte Reports verwenden denselben Datenstand und dieselben Decision Records wie die Plattform.
- Fehlerzustände erklären den nächsten sinnvollen Schritt.

## 29. Festgelegte Entscheidungen

- **ENTSCHEIDUNG 10-01:** Das Decision Center ist die primäre Steuerungslogik der Plattform, nicht nur ein Dashboardmodul.
- **ENTSCHEIDUNG 10-02:** Morning Mission, Customer Decision Center, Portfolio Mission Control und Executive Decision Center nutzen dasselbe Datenmodell mit unterschiedlicher Verdichtung.
- **ENTSCHEIDUNG 10-03:** Jede wesentliche Empfehlung wird als erklärbare Decision Card modelliert.
- **ENTSCHEIDUNG 10-04:** Jede Simulation enthält eine Baseline und zeigt Unsicherheit sichtbar.
- **ENTSCHEIDUNG 10-05:** Schnell, Kosteneffizient und Managed Service sind die drei Standardrouten des Demonstrators.
- **ENTSCHEIDUNG 10-06:** Audit-Readiness ist nur ein mögliches Zielprofil und nicht die universelle Hauptkennzahl.
- **ENTSCHEIDUNG 10-07:** KPIs bleiben mit Geschäftsziel, Scope, Datenquelle, Owner und erlaubter Interpretation verbunden.
- **ENTSCHEIDUNG 10-08:** Priorisierung berücksichtigt Wirkung, Risiko, Ziel, Frist, Abhängigkeit, Confidence und reale Kapazität.
- **ENTSCHEIDUNG 10-09:** Reisezeit und Reisekosten sind zulässige Constraints in Route und Ressourcenplanung.
- **ENTSCHEIDUNG 10-10:** Re-Routing ist ereignisgetrieben, versioniert und freigabesensitiv.
- **ENTSCHEIDUNG 10-11:** Managed-Service-Opportunities entstehen nur aus fachlich begründetem Bedarf und bleiben menschlich geprüft.
- **ENTSCHEIDUNG 10-12:** Das Value Ledger ist der kanonische Ort für erwarteten und realisierten Nutzen.
- **ENTSCHEIDUNG 10-13:** Kernberechnungen dürfen nicht von generativer KI abhängen.
- **ENTSCHEIDUNG 10-14:** Executive Reports und Präsentationen leiten sich aus denselben Daten und Entscheidungen ab.
- **ENTSCHEIDUNG 10-15:** Historische Missionen, KPIs, Simulationen und Entscheidungen sind rekonstruierbar.

## 30. Begründete Annahmen

- **ANNAHME 10-A1:** Nutzer akzeptieren automatisierte Priorisierung eher, wenn Hauptgründe und Overrides sichtbar sind.
- **ANNAHME 10-A2:** Ein Outcome-orientiertes Morning Briefing reduziert Such- und Koordinationsaufwand stärker als eine reine Taskliste.
- **ANNAHME 10-A3:** Drei Standardrouten sind für eine erste produktive Nutzerführung verständlicher als ein vollständig freier Optimierer.
- **ANNAHME 10-A4:** Die meisten Managemententscheidungen können mit Bandbreiten und qualitativen Trade-offs sinnvoll unterstützt werden, ohne exakte Schadenswerte zu behaupten.
- **ANNAHME 10-A5:** Synthetische Demodaten reichen aus, um den integrierten Produktwert und Wow-Effekt zu zeigen.
- **ANNAHME 10-A6:** Portfolioübergreifende Muster sind ein wichtiger Skalierungshebel, sofern Mandantentrennung und Anonymisierung belastbar sind.
- **ANNAHME 10-A7:** Value Ledger und automatisch erzeugte Deliverables erhöhen wahrgenommenen und belegbaren Servicewert.
- **ANNAHME 10-A8:** Kunden bevorzugen konfigurierbare Zielprofile gegenüber einem universellen Audit-Readiness-Modell.
- **ANNAHME 10-A9:** Deterministische Priorisierung mit optionaler KI-Erklärung ist für den Prototyp technisch und vertrauensseitig robuster.
- **ANNAHME 10-A10:** Reise- und Kapazitätsdaten können zunächst synthetisch oder manuell gepflegt werden, bevor Kalenderintegrationen folgen.

## 31. Offene Fragen

- **OFFENE FRAGE 10-Q1:** Welche KPI-Familien sind für den ersten Pilotkunden verbindlich und welche optional?
- **OFFENE FRAGE 10-Q2:** Welche numerische oder qualitative Methode soll die erste Priorisierungslogik verwenden?
- **OFFENE FRAGE 10-Q3:** Welche Confidence-Schwellen verhindern eine Simulation oder erzwingen einen Datenbeschaffungsschritt?
- **OFFENE FRAGE 10-Q4:** Welche Entscheidungen dürfen innerhalb genehmigter Toleranzen automatisch neu geroutet werden?
- **OFFENE FRAGE 10-Q5:** Wie werden interne Kosten, Beraterkosten und Marktpreisannahmen im Demonstrator dargestellt?
- **OFFENE FRAGE 10-Q6:** Welche Cross-Tenant-Analysen sind datenschutzrechtlich, vertraglich und technisch zulässig?
- **OFFENE FRAGE 10-Q7:** Welche Executive-KPIs funktionieren branchenübergreifend, ohne zu generisch zu werden?
- **OFFENE FRAGE 10-Q8:** Wie wird der tatsächliche Zeitgewinn der Plattform im Pilot belastbar gemessen?
- **OFFENE FRAGE 10-Q9:** Welche Routenoptimierung wird technisch zuerst umgesetzt: regelbasiert, Constraint Solver oder heuristisch?
- **OFFENE FRAGE 10-Q10:** Welche Exportformate und Bearbeitungsrechte benötigt die erste produktive Reporting-Version?
- **OFFENE FRAGE 10-Q11:** Welche Materialitätsschwellen verhindern Alarmflut und Dashboard-Flattern?
- **OFFENE FRAGE 10-Q12:** Welche Rollen dürfen Simulationen speichern, teilen, freigeben oder in Angebote überführen?

## 32. Ideen für später

- interaktiver Decision Room für Management Reviews,
- sprachgesteuerte Executive-Fragen mit belegtem Drill-down,
- probabilistische Simulationen und Sensitivitätsanalyse,
- anonymisierte Branchenbenchmarks für Routen und Outcome-Zeit,
- automatische Slide-Story mit rollenbezogener Dramaturgie,
- Value-at-Risk-Modelle bei ausreichend belastbarer Kundendatenbasis,
- Optimierung von Vor-Ort-Terminen und Reiseclustern,
- digitale Verhandlung mehrerer Zielkonflikte mit sichtbarer Pareto-Front,
- persönliche Lernprofile für Berater und ISMS-Verantwortliche,
- Agent, der schwache oder manipulative KPIs erkennt,
- „Was würden ähnliche Unternehmen tun?“-Ansicht mit strenger Vergleichbarkeitsprüfung,
- Simulation von M&A-, Cloud- oder regulatorischen Szenarien,
- kontrollierte automatische Erzeugung neuer Servicepakete aus wiederkehrenden Mustern,
- Live-Board-Modus für Vorstandssitzungen mit protokollierten Entscheidungen.

## 33. Dokumentenabhängigkeiten

- **Dokument 00:** Status, Begriffe, globale Governance und zentrale Wahrheit.
- **Dokument 01:** Produktvision, Nutzen, Skalierung und Business Case.
- **Dokument 02:** Marktlücken, Wettbewerbsdifferenzierung und Nachweisbedarf.
- **Dokument 03/04:** Rollen, Arbeitssituationen, Journeys und Anfängerführung.
- **Dokument 05:** Module, Produktgrenzen und Flagship-Journeys.
- **Dokument 06:** Navigationsmuster, Decision Cards, Trust Layer und rollenbezogene Oberfläche.
- **Dokument 07:** Informationsgraph, Historie, Provenance und Objekt-360.
- **Dokument 08:** ISMS-Prozesse, Freigaben und Betriebsrhythmen.
- **Dokument 09:** Reife-, Risiko-, Threat-, Control- und Confidence-Logik.
- **Dokument 11:** Zusammenarbeit, Aufgaben, Freigaben und Kommunikation.
- **Dokument 12:** PDF-, PowerPoint- und Reporting-Engine.
- **Dokument 13 bis 16:** Managed-Service-Betrieb, Servicekatalog, Portfolio/Ressourcen und Onboarding.
- **Dokument 17:** Integrationen, Events, Workflow-Designer und Automatisierung.
- **Dokument 18:** Simulationsdienste, Eventarchitektur, Persistenz und Skalierung.
- **Dokument 19:** Rechte, Mandantentrennung, Audit Logs und Datenschutz.
- **Dokument 20A:** KI-Erklärungen, Guardrails und Fallback.
- **Dokument 20C:** technische Umsetzung, Tests, Checkpoints und Repository-Regeln.

## 34. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstfassung des Decision-Center-, KPI-, Priorisierungs-, Zielrouten-, Simulations- und Wertnachweiskonzepts | Erstellt |
