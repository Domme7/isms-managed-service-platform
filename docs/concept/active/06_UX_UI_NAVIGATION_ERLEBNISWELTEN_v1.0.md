# Dokument 06 - UX/UI, Navigation & rollenbezogene Erlebniswelten

> **Re-Ableitung:** 2026-07-23 vollständig neu abgeleitet aus dem PDF-Original
> `docs/concept/pdf/Dokument_06_UX_UI_Navigation_Erlebniswelten_v1.0.pdf` (WP-019).
> Bei jeder Abweichung zwischen dieser Arbeitsfassung und dem PDF gilt das PDF (DR-0006).
> Dieser gesamte Kopfnotiz-Block ist Nicht-PDF-Inhalt; alles nach ihm ist aus dem PDF abgeleitet.
>
> **Nummerierungs-Konkordanz alt→neu** (alte Arbeitsfassung bis 2026-07-23 → diese Fassung nach
> PDF-Folientiteln; nur verschobene oder neu aufgenommene Abschnitte gelistet, §4-§26 behalten
> ihre Nummern):
>
> | Alt (Arbeitsfassung) | Neu (PDF-Folientitel) |
> |---|---|
> | §1 „Dokumentauftrag und Abgrenzung" | unnummeriert: „Dokumentauftrag & Verbindlichkeit" |
> | §2 „Executive Summary" | §1 „Executive Summary" |
> | §3 „UX-Vision und Designprinzipien" | §2 „UX-Vision" und §3 „Zwölf verbindliche Designprinzipien" |
> | §8 „Kernscreen: Mission Control & Morning Mission" | §8 „Mission Control & Morning Mission" |
> | §9 „Kernscreen: Customer Workspace" | §9 „Customer Workspace" |
> | §12 „Digital Twin, ISMS Workspaces und Graphnavigation" | §12 „Digital Twin & ISMS Workspaces" |
> | §17 „UI-Zustände, Fehler und Vertrauen" | §17 „Erlebnisfluss & UI-Zustände" und §17.1 „Sonder-, Fehler- und Vertrauenszustände" |
> | §19 „Datenvisualisierung, Barrierefreiheit und Responsive Design" | §19 „Datenvisualisierung, Accessibility & Responsive Design" |
> | - (fehlte) | §4.1, §4.2, §5.1, §5.2, §6.1, §6.2, §17.1 (Unterabschnitte des PDF, in der alten Fassung nicht vorhanden) |
>
> Zitierregel bleibt: **Abschnittstitel** nennen, nicht nur die Nummer.
>
> **PDF-interne Nummerierungskonflikte (benannt, nicht aufgelöst):**
>
> 1. Die Folientitel zählen 1-26; die „Inhalt"-Leiste der Folie „Dokumentauftrag &
>    Verbindlichkeit" zählt dagegen zehn Themenblöcke 01-10 (z. B. „05 Kernscreens &
>    Arbeitsflächen"). Diese Fassung folgt den Folientiteln; die Inhalt-Leiste ist unter
>    „Dokumentauftrag & Verbindlichkeit" wörtlich wiedergegeben.
> 2. Zwei Folien tragen die Nummer 3: „3. Zwölf verbindliche Designprinzipien" (P01-P06) und
>    „3. Designprinzipien - Fortsetzung" (P07-P12, „Bewusst vermiedene Muster", NICHT-ZIEL).
>    Beide sind hier unter §3 geführt; die Fortsetzungsfolie ist als Zwischenüberschrift kenntlich.
>
> **Lesehinweis (kein PDF-interner Widerspruch):** Die Dokumentensteuerung legt fest „Quelle der
> Wahrheit: Markdown-Datei 06 im Repository; PDF/DOCX sind freigegebene Lesefassungen." Diese
> Rollenverteilung ist derzeit durch DR-0006 suspendiert: Bis zum bestandenen Treue-Check
> (O-KONZ-01) sind die PDF-Originale die Produktwahrheit. Die Zeile wird unten unverändert
> wiedergegeben, weil sie PDF-Inhalt ist.
>
> **Abbildungstranskriptionen:** Vier Abbildungen des PDF sind visuell geprüft und als
> gekennzeichnete Transkription übernommen (Marker „Abbildung (visuell transkribiert)"):
> Deckblatt und §5 „Rollenbezogene Erlebniswelten auf einem gemeinsamen Produktkern",
> §4 „Navigationsarchitektur: wenige stabile Orte, viele kontextuelle Wege",
> §6 „Universelle Seitenanatomie: fünf Fragen statt wechselnder Bedienlogik",
> §17 „Erlebnisfluss: orientieren, verstehen, entscheiden, handeln, nachweisen, lernen".
>
> **Benannte Lücke (nicht geraten, O-WP019-Kandidat):** In der §17-Abbildung „Erlebnisfluss"
> sind die Untertexte der Stufen ENTSCHEIDEN, NACHWEISEN und LERNEN im PDF angeschnitten und
> nicht sicher lesbar; nur die lesbaren Fragmente sind transkribiert und mit „[...]" markiert.

## Deckblatt

**PRODUKTKONZEPT 06**

**UX/UI, Navigation & rollenbezogene Erlebniswelten**

Wie aus einem komplexen ISMS- und Managed-Service-System eine klare, vertrauenswürdige und entscheidungsorientierte Produkterfahrung wird.

**ARBEITSBEZEICHNUNG** ISMS Managed Service Platform  
**VERSION** 1.0 | **STATUS** Erstellt | **STAND** 21.07.2026  
**ABHÄNGIGKEITEN** Dokument 00 bis 05

**Abbildung (visuell transkribiert): Rollenbezogene Erlebniswelten auf einem gemeinsamen Produktkern**

*Nicht vier Produkte, sondern vier Perspektiven auf dieselben verknüpften Objekte, Entscheidungen und Services.*

| Welt | Fragen | Stichworte |
|---|---|---|
| EXECUTIVE WORLD | Bin ich auf Kurs? Was muss ich entscheiden? | Klartext, Business Impact, Optionen |
| CUSTOMER OPERATIONS | Was muss heute getan werden? Wer ist verantwortlich? | Mission, Risiken, Maßnahmen, Evidence |
| CONSULTING WORLD | Welcher Mandant braucht mich? Wo skaliert die Delivery? | Portfolio, Kapazität, Chancen, Reports |
| ASSURANCE & ADMIN | Ist es belastbar und kontrolliert? Wer darf was? | Audit, Datenqualität, Rechte, Betrieb |

Zentrum der Abbildung: **GEMEINSAMER PRODUKTKERN** - Digital Twin, Decision Records, Services & Evidence.

Fußzeile der Abbildung: **Rollenwechsel ist sichtbar, protokolliert und ändert Prioritäten - nicht die Wahrheit der Daten.**

## Dokumentauftrag & Verbindlichkeit

Dokument 06 übersetzt Rollen, Nutzerreisen und Produktmodule in ein konsistentes Nutzungserlebnis. Es beschreibt Informationsarchitektur, Navigation, rollenbezogene Perspektiven, Seitenlogik, Zustände, visuelle Prinzipien und globale Akzeptanzkriterien. Pixelgenaue Mockups und technische Implementierung folgen später.

> **ENTSCHEIDUNG:** Die UI ist eine entscheidungsorientierte Schicht auf einem gemeinsamen Datenmodell. Rollen erhalten unterschiedliche Verdichtung, Sprache und Startpunkte, aber keine voneinander getrennten Wahrheiten.

### Dokumentensteuerung

| Merkmal | Festlegung |
|---|---|
| Zweck | Verbindliche UX-/UI- und Navigationsspezifikation |
| Owner | Produkt / UX / Informationsarchitektur |
| Abhängigkeiten | Dokument 00-05 |
| Folgedokumente | 07 Datenmodell; 19 Rechte/Sicherheit; 20C Umsetzung |
| Änderungsregel | Neue Hauptnavigation, Rollenwelt oder globale UI-Regel benötigt Decision Record. |
| Quelle der Wahrheit | Markdown-Datei 06 im Repository; PDF/DOCX sind freigegebene Lesefassungen. |

### Inhalt

- 01 UX-Vision & Prinzipien
- 02 Informationsarchitektur & Navigation
- 03 Rollenbezogene Erlebniswelten
- 04 Universelle Seitenanatomie
- 05 Kernscreens & Arbeitsflächen
- 06 Onboarding, Suche & Wiederaufnahme
- 07 Zustände, Vertrauen & Fehler
- 08 Designsystem, Datenvisualisierung & Accessibility
- 09 Demo-Spezifikation
- 10 Entscheidungen, Annahmen & offene Fragen

## 1. Executive Summary

Die Zielplattform besitzt eine stabile globale Shell, acht Hauptorte und vier Erlebniswelten. Jede Hauptseite beantwortet eine konkrete Nutzerfrage und folgt demselben Denkfluss. Ein Anfänger lernt damit ein Prinzip statt 33 unterschiedliche Module. Experten öffnen kontrolliert weitere Tiefe, ohne dass die Oberfläche für seltene Nutzer zu einer GRC-Tabellenwand wird.

Die Oberfläche priorisiert Wirkung und Entscheidungen. Scores werden kausal erklärt, Empfehlungen zeigen Annahmen und Vertrauensgrad, und kritische Aktionen sind reversibel oder freigabepflichtig. Mandant, aktive Rolle, Scope und Datenstand bleiben sichtbar. Die Plattform darf intelligent wirken, aber nie unvorhersehbar oder von generativer KI abhängig sein.

## 2. UX-Vision

> **LEITBILD:** Die Plattform fühlt sich an wie ein ruhiger Sicherheitsnavigator: Sie erklärt den aktuellen Zustand, macht Ursachen verständlich, vergleicht verantwortbare Wege und führt bis zur bestätigten Wirkung.

## 3. Zwölf verbindliche Designprinzipien

- P01 - Entscheidung vor Navigation: Die Oberfläche startet mit der Frage, die der Nutzer beantworten muss, nicht mit dem Modulnamen.
- P02 - Eine Wahrheit, mehrere Perspektiven: Alle Rollen sehen dieselben verknüpften Objekte, jedoch mit anderer Verdichtung, Sprache und Handlungslogik.
- P03 - Klartext vor Fachsprache: Fachbegriffe bleiben verfügbar, werden aber erklärt und nicht als Voraussetzung für Orientierung verwendet.
- P04 - Ursache vor Score: Bewertungen zeigen Gründe, Beziehungen, Datenlage und Unsicherheit - nie nur eine Zahl oder Ampelfarbe.
- P05 - Wirkung vor Aktivität: Priorität und Fortschritt richten sich nach erwarteter bzw. bestätigter Wirkung, nicht nach Anzahl erledigter Aufgaben.
- P06 - Progressive Offenlegung: Die erste Ebene bleibt ruhig. Tiefe, Graphen, Rohdaten und Bulk-Aktionen öffnen sich kontrolliert.

### 3. Designprinzipien - Fortsetzung

- P07 - Sichtbarer Kontext: Mandant, Rolle, Scope, Datenstand und Vertraulichkeit sind bei kritischen Aktionen immer erkennbar.
- P08 - Sichere Reversibilität: Entwürfe, Vorschauen, Versionen, Undo und Freigaben schützen vor irreversiblen Fehlaktionen.
- P09 - Erklärbare Intelligenz: Empfehlungen besitzen Begründung, Alternativen, Vertrauensgrad und menschliche Übersteuerung.
- P10 - Wiederaufnahme statt Neustart: Nach Unterbrechung zeigt die Plattform den letzten bestätigten Zustand und den nächsten sinnvollen Schritt.
- P11 - Barrierearm und gerätebewusst: Lesbarkeit, Tastaturbedienung, Screenreader, Kontrast und mobile Kernwege sind Produktanforderungen.
- P12 - Keine Dark Patterns: Serviceempfehlungen sind fachlich begründet, optional, vergleichbar und klar von verpflichtenden Maßnahmen getrennt.

### Bewusst vermiedene Muster

- Dashboard- oder Ampelwände ohne erkennbare nächste Entscheidung.
- Modulnamen als primäre Orientierung für seltene Nutzer.
- Unerklärte Reifegrad-, Risiko- oder KI-Scores.
- Serviceangebote, die wie verpflichtende Sicherheitsmaßnahmen wirken.
- Rollenwechsel oder Mandantenwechsel ohne sichtbaren Kontext.
- Endlose Tabellen als einzige Darstellung komplexer Beziehungen.
- Erfolgsmeldungen ohne Hinweis, welche Wirkung tatsächlich bestätigt wurde.
- Automatische Personalisierung, die Navigation oder Verantwortung überraschend verändert.

> **NICHT-ZIEL:** Die Plattform ersetzt weder SIEM noch Ticketing, Schwachstellenscanner oder Dokumentenablage. Sie verbindet deren Signale und übersetzt sie in Governance, Entscheidungen, Nachweise und Services.

## 4. Informationsarchitektur & globale Navigation

Die globale Shell bleibt über alle Rollen und Mandanten konsistent. Sie trennt stabile Orte von kontextuellen Wegen. Die Navigation beantwortet nicht jede Fachstruktur des Datenmodells, sondern unterstützt die häufigsten Arbeitsabsichten: orientieren, Kunden verstehen, ISMS steuern, entscheiden, Services betreiben, kommunizieren, Wissen finden und administrieren.

**Abbildung (visuell transkribiert): Navigationsarchitektur: wenige stabile Orte, viele kontextuelle Wege**

*Die globale Shell bleibt konstant. Rollen, Mandanten und Objekte verändern Inhalt und Priorität - nicht die grundlegende Orientierung.*

- Kopfzeile der Shell: Produktlogo | Mandant | aktive Rolle | globale Suche | Benachrichtigungen | Hilfe
- Navigationsleiste (im Mockup links): Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen, Administration
- Arbeitsbereich: „Seitentitel als Nutzerfrage"; darunter „Kontext: Rolle, Mandant, Scope, Datenstand und Zielprofil"
- Drei Fragen-Boxen: „Was hat sich geändert?" (Veränderungen und Ursachen) | „Was ist wichtig?" (Priorität und Wirkung) | „Was entscheide ich?" (Optionen und Freigabe)
- „Primäre Arbeitsfläche": Klartext-Zusammenfassung, Ursache-Wirkung, Objektbeziehungen und nächster sinnvoller Schritt.
- „Entscheidungsleiste": Freigeben, Delegieren, Simulieren, Exportieren
- Fußzeile der Abbildung: Kontextuelle Wege: Deep Links, Objektbeziehungen, Suche, letzte Aktivität und „Weiter, wo ich aufgehört habe".

### 4.1 Acht stabile Hauptorte

| Ort | Inhalt | Navigationsregel |
|---|---|---|
| Heute | Mission Control, Wiederaufnahme, persönliche Entscheidungen und Aufgaben | Rollenabhängig; Standard-Startpunkt. |
| Kunden | Portfolio und Customer Workspaces | Für Kundenrollen ggf. direkt der eigene Workspace. |
| ISMS | Digital Twin, Scope, Risiken, Controls, Maßnahmen, Policies, Evidence, Audits | Objekt- und zielbezogene Fachnavigation. |
| Entscheidungen | Decision Records, Freigaben, Risikoakzeptanz, Investitionsoptionen | Rollen- und scopegefiltert. |
| Services | Katalog, aktive Services, Delivery, SLA, Wert und Reviews | Managed-Service-Schicht. |
| Reports | Briefings, PDF/PPTX, Management Review, Exporte | Zielgruppen- und freigabebezogen. |
| Wissen | Suche, Glossar, Vorlagen, Best Practices, Lernhinweise | Kontextsensitiv und rollenbezogen. |
| Administration | Nutzer, Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb | Nur bei entsprechender Berechtigung. |

### 4.2 Sichtbarer Kontext

- Aktiver Mandant und ggf. Organisationseinheit
- Aktive Produktrolle und zeitlich begrenzte Vertretung
- Scope oder Objektkontext
- Datenstand / letzter Synchronisationszeitpunkt
- Vertraulichkeitsstufe und Exportrestriktion
- Vertrauensgrad bei abgeleiteten Aussagen

> **CROSS-TENANT-SCHUTZ:** Ein Wechsel zwischen Mandanten benötigt eine klare visuelle Kontextänderung. Entwürfe, Uploads und Freigaben dürfen nicht still in einen anderen Mandanten übernommen werden.

## 5. Rollenbezogene Erlebniswelten

Die Erlebniswelten verändern Verdichtung, Sprache, Startpunkt und empfohlene Aktionen. Das zugrunde liegende Objekt, seine Historie und seine fachliche Wahrheit bleiben identisch.

**Abbildung (visuell transkribiert): Rollenbezogene Erlebniswelten auf einem gemeinsamen Produktkern** - identisch mit der Deckblatt-Abbildung (siehe Deckblatt): vier Welten (EXECUTIVE WORLD, CUSTOMER OPERATIONS, CONSULTING WORLD, ASSURANCE & ADMIN) um den GEMEINSAMEN PRODUKTKERN (Digital Twin, Decision Records, Services & Evidence); Fußzeile: „Rollenwechsel ist sichtbar, protokolliert und ändert Prioritäten - nicht die Wahrheit der Daten."

### 5.1 Erlebniswelten im Detail

| Welt | Leitfrage | Erlebnis | Bewusst vermeiden |
|---|---|---|---|
| Executive World (Executive Sponsor, CISO) | Bin ich auf Kurs, welche Geschäftsrisiken bedrohen Ziele und was muss ich entscheiden? | Klartext, 3-5 Entscheidungen, Business Impact, Optionen, Investitionswirkung, Unsicherheit. | Keine Roh-Control-Listen, keine operative Task-Wand. |
| Customer Operations World (ISMS Manager, Owner, Contributor) | Was ist heute zu tun, warum und wie belege ich Wirksamkeit? | Morning Mission, Kundenpuls, Maßnahmen, Evidence, Freigaben, Datenlücken, Wiederaufnahme. | Keine Portfolio- oder Vertriebsmetriken ohne Zweck. |
| Consulting & Service World (Service Lead, Engagement Manager, Consultant) | Welcher Mandant benötigt Aufmerksamkeit und wie skaliert die Delivery? | Portfolio, SLA, Kapazität, Reise, wiederverwendbare Workflows, Deliverables, Opportunity mit Begründung. | Keine verdeckte Mitarbeiterüberwachung oder rein umsatzgetriebene Empfehlungen. |
| Assurance & Administration World (Auditor, Admin, Platform Ops) | Ist die Aussage belastbar, der Zugriff kontrolliert und der Betrieb nachvollziehbar? | Audit Workspace, Datenherkunft, Versionen, Rechte, Integrationsgesundheit, Logs und Supportzugriff. | Kein uneingeschränkter Support- oder Auditorzugriff. |

### 5.2 Rollenwechsel

Eine Person kann mehrere Rollen besitzen. Der aktive Modus wird in der globalen Shell angezeigt. Ein Rollenwechsel ändert Prioritäten, Sprache, Aktionen und erlaubte Verdichtung. Er ändert nicht rückwirkend Daten, Verantwortlichkeiten oder Decision Records. Kritische Aktionen speichern die aktive Rolle mit.

> **DESIGNREGEL:** Rollenwelten dürfen niemals zu vier getrennten Anwendungen oder widersprüchlichen Dashboards werden. Jede Aussage muss auf dasselbe Objekt und denselben Datenstand zurückführbar sein.

## 6. Universelle Seitenanatomie

Jede Hauptseite verwendet dieselbe kognitive Reihenfolge. Dadurch entsteht ein lernbares System: erst verstehen, dann Kontext und Beziehungen erfassen, anschließend Entwicklung prüfen und verantwortbar handeln.

**Abbildung (visuell transkribiert): Universelle Seitenanatomie: fünf Fragen statt wechselnder Bedienlogik**

*Jede Hauptseite folgt demselben Denkfluss. Dadurch lernt ein Anfänger ein Prinzip - nicht 33 unterschiedliche Module.*

1. WAS IST DAS? - Klartext-Zusammenfassung, Zustand, Scope und Owner
2. WARUM IST ES WICHTIG? - Business-Kontext, Zielbezug, Risiko und Frist
3. WOMIT HÄNGT ES ZUSAMMEN? - Objekte, Ursachen, Auswirkungen und Evidenz
4. WIE ENTWICKELT ES SICH? - Trend, Historie, Veränderung und Datenvertrauen
5. WAS SOLL ALS NÄCHSTES PASSIEREN? - Optionen, Empfehlung, Wirkung, Freigabe und Fallback

Fußzeile der Abbildung: Querschnitt: aktive Rolle | Mandant | Scope | Datenstand | Vertrauensgrad | Änderungsverlauf | Hilfe

### 6.1 Verbindliche Seitenbausteine

| Baustein | Zweck | Pflichtinhalt |
|---|---|---|
| Question Header | Orientiert über die primäre Nutzerfrage. | Frage, Objekt/Scope, Status, Owner. |
| Context Bar | Verhindert Fehlkontext. | Mandant, Rolle, Scope, Datenstand, Vertraulichkeit. |
| Summary / Pulse | Verdichtet Zustand in Klartext. | Trend, Veränderung, wichtigste Ursache. |
| Relationship Panel | Zeigt Kausalität und Abhängigkeit. | Verknüpfte Objekte, Richtung, Herkunft. |
| Impact Panel | Erklärt Business- und Zielwirkung. | Ziel, Risiko, Zeit, Budget, Services. |
| Decision Card | Bereitet verantwortbare Wahl vor. | Optionen, Nichtstun, Annahmen, Unsicherheit. |
| Action Rail | Bündelt kontextuelle Aktionen. | Freigeben, delegieren, simulieren, exportieren. |
| History / Decision Record | Erhält Nachvollziehbarkeit. | Version, Änderung, Entscheider, Review. |
| Trust Layer | Macht Aussagequalität sichtbar. | Quelle, Aktualität, Vollständigkeit, Konflikte. |

### 6.2 Detailtiefe

Ebene 1 zeigt Klartext, Zustand und Handlung. Ebene 2 öffnet Ursachen, Beziehungen und Alternativen. Ebene 3 zeigt Rohdaten, Mappings, Historie und technische Nachweise. Nutzer können eine bevorzugte Tiefe speichern; sicherheitskritische Warnungen bleiben jedoch immer sichtbar.

## 7. Seiten- und Screenkatalog

| ID / Screen | Leitfrage | Kerninhalt | Rollen |
|---|---|---|---|
| S01 Mission Control | Was hat sich seit meinem letzten Besuch verändert und was verdient Aufmerksamkeit? | Morning Mission, Veränderungsfeed, Entscheidungen, Risiken, Service-/SLA-Signale, Wiederaufnahme. | Alle Rollen, rollenspezifisch |
| S02 Customer Workspace | Wie verstehe ich diesen Kunden in einer Minute? | Strategie-DNA, Zielstatus, Puls, Top-Ursachen, Hebel, Zeitachse, Servicewirkung. | Kunde und Beratung |
| S03 Executive Experience | Welche Geschäftsentscheidung ist jetzt erforderlich? | Top-Entscheidungen, Business Impact, Optionen, Simulation, Freigabe, Management Narrative. | Executive, CISO |
| S04 Portfolio Cockpit | Welche Mandanten, Services oder Termine kippen? | Health Map, SLA, Trends, Audits, Kapazität, Reise, Eskalation, Opportunities. | Service Lead, Engagement Manager |
| S05 Digital Twin Explorer | Was ist betroffen und wie hängt es zusammen? | Graph/Listen-Hybrid, Fokusmodus, Beziehungen, Historie, Datenvertrauen, Auswirkungsanalyse. | Power User, Auditor |
| S06 Risk & Control Workspace | Warum ist das Risiko hoch und welche Controls wirken? | Szenario, Business Impact, Ursachen, Controls, Evidence, Behandlung, Akzeptanz. | CISO, ISMS Manager |
| S07 Measure / Improvement Workspace | Welche Veränderung erzeugt die größte Wirkung? | Definition of Done, Aufwand, Abhängigkeiten, Owner, Evidence, Wirkungsprüfung. | Owner, Consultant |
| S08 Audit Workspace | Was braucht die Prüfung und wie belastbar ist die Antwort? | Scope, Requests, Evidence, Sampling, Findings, Reise, Q&A, Abschluss. | Auditor, ISMS Manager |
| S09 Service Workspace | Was wird geliefert, mit welcher Qualität und welchem Wert? | Service Charter, Betriebszyklus, SLA, Deliverables, Wirkung, Review, Änderung. | Service Lead, Kunde |
| S10 Reporting Studio | Welche Geschichte soll aus demselben Datenstand entstehen? | Zielgruppe, Zeitraum, Narrative, Module, Vorschau, Freigabe, PDF/PPTX. | Consultant, CISO |
| S11 Administration & Integration Health | Ist der Tenant sicher, korrekt konfiguriert und verbunden? | Nutzer, Rollen, Scope, Connectoren, Jobs, Fehler, Audit Log, Supportzugriff. | Admin, Platform Ops |

## 8. Mission Control & Morning Mission

Mission Control ist der Standard-Startpunkt. Es beantwortet vier Fragen: Was hat sich verändert? Was braucht Aufmerksamkeit? Welche Entscheidung wartet? Wo kann ich heute die größte Wirkung erzielen? Es ist kein aggregiertes Reporting-Dashboard, sondern ein rollenspezifischer Arbeitsplatz.

### Morning Mission - fünf Ebenen

- Mission: Ein messbares Tagesziel statt einer offenen To-do-Sammlung.
- Warum heute: Audit, SLA, Risiko, Abhängigkeit, Veränderung oder Managementtermin.
- Impact: erwartete Wirkung auf Ziel, Risiko, Zeit, Service oder Datenqualität.
- Strategie: empfohlene Reihenfolge unter Kapazität, Reise, Fristen und Abhängigkeiten.
- Das solltest du wissen: neue Signale, Muster, erfolgreiche Maßnahmen und Unsicherheiten.

### Rollenvarianten

| Rolle | Missionsfokus | Ausblendung |
|---|---|---|
| Executive | Freigaben, Top-Risiken, Zielabweichung, Investition | Operative Taskdetails |
| ISMS Manager | Risiken, Maßnahmen, Evidence, Reviews, Datenlücken | Portfolio-/Umsatzsicht |
| Consultant | Mandantenpriorität, Audits, Deliverables, Kapazität, Reise | Unbegründete Vertriebsimpulse |
| Service Lead | SLA, Eskalationen, Qualität, Auslastung, Profitabilität | Objektdetails ohne Eskalationsbezug |

> **WOW-MOMENT:** Der Nutzer erkennt innerhalb von 30 Sekunden, wo seine knappe Zeit heute die größte erwartete Wirkung erzeugt - und warum.

## 9. Customer Workspace

Die Kundendetailansicht soll ein Unternehmen in einer Minute verständlich machen. Oben stehen Strategie-DNA, Zielprofil, Managed-Service-Anteil und aktueller Trend. Darunter folgen Unternehmenspuls, Veränderungen, wichtigste Ursache-Wirkungs-Ketten, Hebel mit größter Wirkung, Servicebeitrag und Zeitachse seit Beginn der Zusammenarbeit.

- Executive Lens: Geschäftsrisiko, Ziel, Optionen, Budget und Entscheidung.
- ISMS Lens: Datenqualität, Risiken, Controls, Maßnahmen, Evidence und Reviews.
- Consulting Lens: offene Entscheidungen, Delivery, Termine, Services und Deliverables.
- Audit Lens: Scope, Nachweise, Versionen, Requests, Findings und Herkunft.

## 10. Executive Experience

Die Executive Experience ist fast ein eigenes Produkt, nutzt jedoch dieselben Daten. Sie zeigt höchstens drei bis fünf entscheidungsreife Themen. Jede Decision Card enthält Problem in Klartext, Business Impact, Optionen einschließlich Nichtstun, Zeit-/Budgetannahmen, erwartete Wirkung, Datenvertrauen, Empfehlung und Freigabeverlauf.

> **MANAGEMENT-FRAGE:** Wenn ich nur eine Sache heute entscheiden könnte: Welche Option schützt Geschäftsziele am stärksten und ist unter unseren realen Einschränkungen verantwortbar?

## 11. Consulting & Portfolio Experience

Die Beraterwelt behandelt einen Consultant als Manager eines Kundenportfolios. Das Portfolio Cockpit zeigt Mandanten, Services und Termine nach Handlungsbedarf - nicht nach alphabetischer Liste. Planung berücksichtigt Auditfenster, Vor-Ort-Anforderungen, Reisezeit, Reisekosten, Skills, Vertretung, Kapazität und SLA.

### Verbindliche Portfolio-Signale

- Kunde kippt: Zieltrend, Risiko, Datenqualität oder SLA verschlechtert sich.
- Terminrisiko: Audit, Management Review oder Deliverable nähert sich ohne belastbare Vorbereitung.
- Kapazitätskonflikt: Arbeit und Reise überschreiten realistische Verfügbarkeit.
- Wiederverwendung: ähnlicher Workflow, Bericht oder Maßnahmenpaket ist verfügbar.
- Service Opportunity: interne Kapazität oder dauerhafte Lücke begründet eine optionale Unterstützung.
- Value Proof: Zeitersparnis, Risikowirkung und Servicequalität werden nachvollziehbar sichtbar.

## 12. Digital Twin & ISMS Workspaces

Der Digital Twin Explorer kombiniert Graph, Liste und Detailpanel. Ein Fokusmodus blendet Beziehungen um ein ausgewähltes Objekt ein. Jede Beziehung nennt Typ, Richtung, Quelle, Aktualität und Vertrauensgrad. Nutzer können Ursache-Wirkungs-Ketten öffnen, ohne sich durch Modulgrenzen zu bewegen.

> **DESIGNREGEL:** Graphvisualisierung ist eine zusätzliche Erkenntnisebene. Jede Beziehung bleibt alternativ als strukturierte Liste und über die globale Suche zugänglich.

## 13. Collaboration, Entscheidungen & Freigaben

Zusammenarbeit findet am fachlichen Objekt statt. Ein Kommentar zu einem Risiko, eine Evidence-Anfrage oder eine Freigabe bleibt mit Scope, Version und Rollenbezug verbunden. Aufgaben sind keine losgelösten Tickets, sondern abgeleitete Arbeitspakete mit Wirkung und Definition of Done.

### Decision Card - Pflichtfelder

- Entscheidungsfrage und Frist
- Optionen einschließlich Nichtstun
- Business-/Zielwirkung und Risiken
- Kosten-, Zeit- und Kapazitätsannahmen
- Datenquellen, Lücken und Vertrauensgrad
- Empfehlung und Gegenargument
- Entscheider, Vertretung und Freigabestufe
- Review-Datum und Erfolgskriterium

## 14. Reporting-, PDF- und Präsentationserlebnis

Reporting Studio beginnt mit Anlass und Zielgruppe. Nutzer wählen Zeitraum, Scope, Narrative, Berichtsmodule, Sprache, Vertraulichkeit und Format. Die Plattform erzeugt einen Entwurf aus verifizierten Daten. Vor Export zeigt eine Vorschau fehlende Daten, Quellen, Versionsstand und sensible Inhalte. PDF und PPTX werden versioniert und protokolliert.

> **ZIELGRUPPENLOGIK:** Executive: Entscheidung und Business Impact. CISO: Risiko, Zielroute und Ressourcen. Auditor: Scope, Evidence und Historie. Berater: Storyline, Empfehlungen und nächste Schritte.

## 15. Onboarding, adaptive Komplexität & Hilfe

Der Einstieg fragt nach Rolle, Ziel und aktueller Aufgabe - nicht nach allen Produktfunktionen. Geführte Journeys verwenden Klartext, Beispiele, sichere Defaults, „Ich weiß es nicht" und eine sichtbare Rückfragemöglichkeit. Experten erhalten Filter, gespeicherte Sichten, Bulk-Aktionen, Tastatursteuerung und Rohdaten.

## 16. Suche, Benachrichtigungen & Wiederaufnahme

Globale Suche ist ein primärer Navigationsweg. Sie findet Unternehmen, Einheiten, Prozesse, Assets, Risiken, Controls, Services, Dokumente, Personen und Entscheidungen. Ergebnisse werden mandanten- und rollenbezogen gruppiert; vertrauliche Treffer werden nicht über Snippets geleakt.

### Benachrichtigungsprinzipien

- In-App Inbox als zentrale Quelle; E-Mail/Teams/Slack als konfigurierbare Kanäle.
- Dringlichkeit, Rolle, SLA, Frist und Abhängigkeit bestimmen Bündelung.
- Digest statt Einzelalarm für niedrige Relevanz.
- Jede Nachricht erklärt warum der Nutzer adressiert ist und welche Aktion erwartet wird.
- Ruhestunden, Vertretung und Abwesenheit werden berücksichtigt.
- Keine Erfolgs- oder Aktivitätsgamification auf Personenebene ohne klaren Zweck.

> **UNIVERSELLER WIEDERAUFNAHMEPUNKT:** Letzter bestätigter Zustand, Änderungen seitdem, offener Entwurf, Blocker, nächster Schritt und mögliche Vertretung werden nach Unterbrechung zusammengeführt.

## 17. Erlebnisfluss & UI-Zustände

**Abbildung (visuell transkribiert): Erlebnisfluss: orientieren, verstehen, entscheiden, handeln, nachweisen, lernen**

*Die UI führt durch Wirkung - nicht durch Organigramme oder Tabellenstrukturen.*

Sechs Stufen in Folge (Untertexte der Stufen ENTSCHEIDEN, NACHWEISEN und LERNEN sind im PDF angeschnitten und nicht sicher lesbar; nur lesbare Fragmente wiedergegeben, siehe Kopfnotiz):

1. ORIENTIEREN - „Was hat sich geändert?"
2. VERSTEHEN - „Warum ist das relevant?"
3. ENTSCHEIDEN - „[...]he Option ist verantwor[...]"
4. HANDELN - „Wer tut was bis wann?"
5. NACHWEISEN - „[...]es umgesetzt und wirksa[...]"
6. LERNEN - „[...]ndert sich an Ziel und R[...]"

Fußzeile der Abbildung: Jeder Abschluss aktualisiert Daten, Wirkung, Priorität, Zielroute und das nächste Briefing.

Zustände sind Teil der Produktlogik. Sie müssen erklären, was passiert, was gespeichert wurde, welche Wirkung die Situation hat und wie sicher fortgesetzt werden kann.

| Zustand | Verhalten |
|---|---|
| Loading | Skeletons statt springender Layouts; Fortschritt und erwartete Dauer bei langen Jobs. |
| Empty | Erklärt Nutzen, nächsten Schritt, Beispiel und verantwortliche Rolle; keine leere Tabellenwüste. |
| Partial data | Datenlücken, Quelle, Aktualität und Auswirkungen auf Aussagen sichtbar. |
| Success | Bestätigt Ergebnis, Wirkung, erzeugte Folgeaktionen und Rückgängig-/Versionierungsoption. |
| Warning | Erklärt Konsequenz, Schwellenwert und sichere Alternative. |
| Error | Diagnose in Klartext, was gespeichert wurde, Wiederholung, Fallback und Supportpfad. |
| Blocked | Blocker, Owner, Abhängigkeit, Eskalation und mögliche Zwischenlösung. |

### 17.1 Sonder-, Fehler- und Vertrauenszustände

| Zustand | Verhalten |
|---|---|
| Conflict | Widersprüchliche Daten nebeneinander; Quelle, Zeitpunkt, Owner und Auflösungsworkflow. |
| Permission denied | Zweck und zuständige Rolle erklären, ohne vertrauliche Inhalte zu leaken. |
| AI unavailable | Regelbasierter/manueller Kernweg bleibt funktionsfähig; Entwurf wird nicht als Ergebnis ausgegeben. |
| Offline / poor connection | Lesezustand und sichere lokale Entwürfe für ausgewählte Auditwege; klare Sync-Anzeige. |
| Stale | Überholte Bewertung nicht still weiterverwenden; Review anfordern und Wirkung auf Reports markieren. |

### Trust Layer

Bei Risiko, Reifegrad, Empfehlung, Simulation und Report kann der Nutzer eine Vertrauensebene öffnen. Sie zeigt Herkunft, letzten Datenzeitpunkt, Vollständigkeit, widersprüchliche Quellen, Modell-/Regelversion, Annahmen, menschliche Reviews und die Auswirkung von Datenlücken.

> **GRUNDSATZ:** Unsicherheit wird nicht versteckt. Die Plattform darf eine Entscheidung vorbereiten, muss aber kenntlich machen, wann Datenlage, Modell oder Scope keine belastbare Aussage zulassen.

## 18. Visuelles Designsystem

Das neutrale Enterprise-Design soll hochwertig, ruhig und kontrolliert wirken. Es unterstützt spätere Betreiber- oder Kundenbrands, ohne Informationsarchitektur, Semantik oder Kontraste zu verändern.

| Element | Festlegung | Begründung |
|---|---|---|
| Farbe | Navy für Struktur; Teal für aktive Orientierung/Wirkung; Warnfarben sparsam. | Verhindert Ampelwand und schafft ruhige Hierarchie. |
| Typografie | Klare Sans-Serif, starke Überschriften, gut lesbare Tabellen. | Enterprise-Lesbarkeit und Exportkonsistenz. |
| Abstand | Großzügige Weißräume auf Überblicksebene; dichter nur in Expertansichten. | Komplexität wird dosiert. |
| Karten | Nur für eigenständige Aussage, Entscheidung oder Objektgruppe. | Keine dekorative Card-Flut. |
| Icons | Konsistent, mit Textlabel bei kritischen Aktionen. | Keine Bedeutungsrate-Spiele. |
| Status | Text + Symbol/Form + optional Farbe. | Barrierefreiheit und Eindeutigkeit. |
| Animation | Nur zur Orientierung, Statusänderung oder Relationship-Fokus. | Keine Showeffekte, keine Verzögerung. |
| Branding | Logo, Farben und Vorlagen konfigurierbar innerhalb sicherer Tokens. | White-label/Betreiberfähigkeit ohne UX-Bruch. |

### Kernkomponenten

Question Header, Context Bar, Summary/Pulse, Insight Card, Decision Card, Confidence Badge, Route/Scenario Card, Timeline, Relationship Panel, Action Rail, Filter Bar, Table/List, Drawer, Modal, Toast, Export Preview, Empty State und Help Pattern.

## 19. Datenvisualisierung, Accessibility & Responsive Design

### Datenvisualisierung

- Jedes Diagramm beantwortet eine benannte Frage und nennt Scope sowie Datenstand.
- Trendlinien verwenden Vergleichszeitraum und markieren Datenlücken oder Methodenwechsel.
- Risiko-Heatmaps sind optional; Listen und Ursachenketten bleiben verfügbar.
- Reifegrad zeigt Ziel, Ist, Trend, Vertrauensgrad und nicht nur eine Prozentzahl.
- Route Planner zeigt Alternativen, Annahmen und erwartete Wirkung, nicht scheinpräzise Prognosen.
- Portfolio-Visualisierungen vermeiden personenbezogene Rankings.

### Accessibility

- Semantische Überschriften, Landmarken, Labels und Tabellenköpfe.
- Vollständige Tastaturbedienung und sichtbarer Fokus.
- Kontrast und Skalierung ohne Informationsverlust.
- Textalternativen für Diagramme und Graphen.
- Fehlermeldungen nennen Feld, Ursache und Korrektur.
- Keine Bedeutung ausschließlich durch Farbe, Position oder Bewegung.

### Responsive / Mobile

Mobile ist kein verkleinertes Desktop. Kernwege sind Briefing, Freigaben, Aufgaben, Kommentare, Evidence Capture und Reise-/Auditbegleitung. Komplexe Graphmodellierung, Bulk-Bearbeitung und Reportdesign bleiben Desktop-first. Sensible Freigaben können zusätzliche Authentifizierung benötigen.

## 20. Demo- und Prototyp-Spezifikation

Die Präsentationsfassung soll wie ein fertiges Produkt wirken. Sie enthält mehrere synthetische Unternehmen, realistische Accounts und verknüpfte Daten. Jeder Demo-Account besitzt einen plausiblen Arbeitskontext, offene Entscheidungen, historische Entwicklung und eine klar markierte Demo-Identität.

### Verbindliche Demo-Szenen

- Consultant Login -> Morning Mission -> Portfolio-Priorität -> Kundendetail.
- Neue Bedrohung -> Betroffenheitsanalyse -> Risiko/Control-Kette -> Maßnahme/Serviceoption.
- Executive Lens -> Investitionssimulation -> Freigabe -> Decision Record.
- Auditvorbereitung -> Evidence Request -> Reiseplanung -> Finding -> Maßnahme.
- Reporting Studio -> Executive PPTX/PDF -> Vorschau -> Freigabe -> Export.
- Rollenwechsel und Mandantenwechsel mit sichtbarer Kontextänderung.
- Fehler-/Datenlückenfall mit Trust Layer und sicherem Fallback.

## 21. Globale Akzeptanzkriterien

- Erstnutzer erklärt nach zwei Minuten Rolle, Mandant, Zweck und nächsten Schritt.
- Jede Hauptseite hat Leitfrage, sichtbaren Kontext und nachvollziehbare Aktion.
- Keine kritische Bewertung ist nur Farbe oder unerklärter Score.
- Empfehlungen zeigen Gründe, Wirkung, Datenstand, Unsicherheit und Übersteuerung.
- Kritische Aktionen haben Vorschau, Freigabe oder Reversibilität.
- Cross-Tenant-Fehlaktionen werden visuell und technisch verhindert.
- Leere, partielle, fehlerhafte und veraltete Zustände sind gestaltet.
- Kernwege sind tastatur- und screenreaderfähig.
- Exporte zeigen Scope, Stand, Vertraulichkeit und Version.
- Kernreisen funktionieren ohne generative KI.
- Mobile unterstützt die definierten Kernmomente eigenständig.
- Service Opportunities sind begründet, optional und klar getrennt.

## 22. Verbindliche Entscheidungen

| ID | Entscheidung |
|---|---|
| 06-D01 | Die Hauptnavigation besteht aus acht stabilen Orten: Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen und Administration. |
| 06-D02 | Mission Control ist der Standard-Startpunkt; Kundennutzer können tenantbezogen direkt im eigenen Customer Workspace starten. |
| 06-D03 | Jede Hauptseite beantwortet eine primäre Nutzerfrage und folgt der fünfteiligen Seitenanatomie. |
| 06-D04 | Mandant, aktive Rolle, Scope, Datenstand und Vertraulichkeit sind bei kritischen Aktionen sichtbar. |
| 06-D05 | Die Plattform besitzt vier rollenbezogene Erlebniswelten, aber nur ein gemeinsames Daten- und Objektmodell. |
| 06-D06 | Executive Experience zeigt wenige entscheidbare Optionen mit Business Impact und keine technische Detailwand. |
| 06-D07 | Einsteiger- und Expertenmodus sind keine getrennten Produkte; progressive Offenlegung steuert Tiefe und Dichte. |
| 06-D08 | Scores, Empfehlungen und Simulationen zeigen Ursache, Datenherkunft, Annahmen und Vertrauensgrad. |
| 06-D09 | Globale Suche, Deep Links und universelle Wiederaufnahme sind Kernnavigation und keine spätere Komfortfunktion. |
| 06-D10 | PDF/PPTX-Generierung besitzt eine Vorschau- und Freigabestrecke; Exporte zeigen Scope, Stand und Vertraulichkeit. |
| 06-D11 | Farbe ist nie alleiniger Informationsträger; Status wird zusätzlich durch Text, Form oder Symbol vermittelt. |
| 06-D12 | Mobile Nutzung fokussiert Briefing, Freigaben, Aufgaben, Evidence Capture und Reise-/Auditbegleitung; komplexe Modellierung bleibt Desktop-first. |
| 06-D13 | Serviceempfehlungen werden fachlich begründet und visuell von verpflichtenden Compliance-/Risikomaßnahmen unterschieden. |
| 06-D14 | Die Demo zeigt vollständige rollenbezogene Produktwelten mit synthetischen Unternehmen und realistischen Zuständen. |
| 06-D15 | Alle kritischen Nutzerwege besitzen Fehler-, Abbruch-, Wiederaufnahme- und sichere Fallback-Zustände. |

## 23. Begründete Annahmen

- 06-A01: Desktop-Web ist die primäre Arbeitsoberfläche für Power User; mobile Nutzung ergänzt ausgewählte Kernmomente.
- 06-A02: Die erste Produktfassung verwendet Deutsch und Englisch, wobei konkrete Sprachen noch bestätigt werden müssen.
- 06-A03: ISMS Manager und Consultants arbeiten häufig mit mehreren Tabs, Filtern und gespeicherten Sichten.
- 06-A04: Executives nutzen die Plattform unregelmäßig und müssen Kontext ohne Schulung innerhalb weniger Minuten erfassen.
- 06-A05: Kunden starten mit unvollständigen Daten; die UI muss Unsicherheit produktiv darstellen können.
- 06-A06: Ein neutrales Designsystem wird später mandanten- oder betreiberbezogen gebrandet, ohne Informationsarchitektur zu verändern.
- 06-A07: Graphvisualisierungen sind hilfreich, dürfen aber nie der einzige Zugang zu Beziehungen sein.
- 06-A08: Tastaturbedienung, Screenreader-Kompatibilität und hohe Kontraste sind für Enterprise-Tauglichkeit relevant.
- 06-A09: Bei langen Report-, Import- oder Simulationsjobs ist asynchrone Verarbeitung mit Status und Benachrichtigung notwendig.
- 06-A10: Synthetische Demodaten dürfen dramatische, aber logisch konsistente Veränderungen zeigen, wenn sie eindeutig als Demo markiert sind.

## 24. Offene Fragen

- 06-O01: Welche konkrete visuelle Markenrichtung und welcher Produktname werden für den neutralen Demonstrator gewählt?
- 06-O02: Welche Sprachen sind in der ersten präsentierbaren Version vollständig unterstützt?
- 06-O03: Welches Zielniveau der Barrierefreiheit wird verbindlich festgelegt, z. B. WCAG 2.2 AA?
- 06-O04: Welche Offline-Tiefe benötigt der Audit Companion für Vor-Ort-Einsätze?
- 06-O05: Wie stark darf die UI automatisch an Rolle, Reifegrad und Nutzungshäufigkeit angepasst werden, ohne Vorhersehbarkeit zu verlieren?
- 06-O06: Welche Diagrammtypen werden als verbindliche Referenz für Risiko, Reifegrad, Zielroute und Portfolio genutzt?
- 06-O07: Welche mobilen Freigaben gelten als sicherheits- oder haftungsrelevant und benötigen zusätzliche Bestätigung?
- 06-O08: Wie werden Cross-Tenant-Ansichten für Beratungen gestaltet, ohne Datenvermischung oder Fehlkontext zu riskieren?
- 06-O09: Welche Personalisierung darf ein Nutzer speichern: Layout, Filter, Briefing, Benachrichtigungen, Startseite?
- 06-O10: Welche UI-Komponenten werden als eigene Designbibliothek gebaut und welche aus einem Framework übernommen?
- 06-O11: Wie werden regulatorisch oder vertraglich eingeschränkte Serviceempfehlungen visuell behandelt?
- 06-O12: Welche Datenvisualisierungen sind in PDF/PPTX identisch zur Webansicht und welche werden exportoptimiert neu gesetzt?

## 25. Ideenparkplatz

| Idee | Nutzenhypothese |
|---|---|
| Focus Mode | Blendet alles außer einer Entscheidung, ihrer Ursache-Wirkungs-Kette und den nötigen Freigaben aus. |
| Role Lens | Wechselt dieselbe Kundenseite live zwischen Executive-, ISMS-, Berater- und Auditorperspektive. |
| Journey Replay | Spielt zeitlich ab, wie ein Risiko erkannt, bewertet, entschieden, behandelt und wirksam bestätigt wurde. |
| Command Palette | Tastaturgeste für Suche, Navigation, Objektanlage und häufige Aktionen. |
| Voice Briefing | 30-Sekunden-Briefing mit optionaler Rückfrage; erzeugt danach schriftlichen Kontext. |
| Presentation Mode | Verwandelt eine Kundenseite in eine moderierbare Managementansicht ohne sensible Betriebsdetails. |
| Evidence Capture Mobile | Foto/Scan/Notiz mit Klassifikation, Objektzuordnung und späterer Prüfung im Audit Companion. |
| Explain This View | Erklärt die Seite, Begriffe, Scores und nächsten Schritte in der Sprache der aktiven Rolle. |
| Trust Overlay | Einblendbare Ebene, die Quelle, Aktualität, Datenlücken und Unsicherheit aller Kernaussagen hervorhebt. |
| Service Sandbox | Vergleicht visuell interne, unterstützte und vollständig gemanagte Delivery-Routen. |
| Cross-Customer Pattern Cards | Zeigt anonymisierte Muster und bewährte Maßnahmen als klar gekennzeichnete Inspiration. |
| Ambient Status | Sehr ruhige visuelle Signale für Stabilität oder Veränderung, ohne Ampelwand und Alarmmüdigkeit. |

## 26. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming und Dokument 00 bis 05. |

## Nächster Schritt

> **DOKUMENT 07:** Digitaler Unternehmenszwilling und Informationsgraph: kanonische Objekte, Beziehungen, Historie, Datenherkunft, Vertrauensgrad und Kausalität.
