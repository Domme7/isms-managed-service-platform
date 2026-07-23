# Dokument 11 - Zusammenarbeit, Aufgaben und Kommunikation

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Zweck:** Verbindliches Konzept für kontextgebundene Zusammenarbeit, Aufgaben, Anfragen, Freigaben, Übergaben, Benachrichtigungen und prüfbare Kommunikation zwischen Kunde, Beratung, Management, Audit und Plattformbetrieb.

> **Zentrale Festlegung:** Zusammenarbeit findet nicht in isolierten Chats, E-Mail-Ketten oder losen To-do-Listen statt. Jede relevante Aufgabe, Frage, Entscheidung, Freigabe, Datei und Nachricht bleibt mit ihrem fachlichen Kontext, Ziel, Owner, Datenstand, Definition of Done und Audit Trail verbunden. Die Plattform koordiniert Arbeit - sie ersetzt nicht die fachliche Verantwortung der Menschen.

## 1. Dokumentauftrag und Abgrenzung

Dieses Dokument definiert die operative Zusammenarbeitsschicht der Plattform. Es konkretisiert insbesondere die Module **M21 Team Workspace & Decision Records**, **M22 Workflow, SLA & Escalation Engine** sowie die kollaborativen Teile von **M14 Evidence & Assurance**, **M15 Audits**, **M23 Reporting** und **M24 Briefings, Notifications & Knowledge** aus Dokument 05.

Es beschreibt:

- kanonische Arbeits- und Kommunikationsobjekte,
- Rollen, Verantwortungen, Delegation und Vertretung,
- Aufgaben, Arbeitspakete, Requests und Definition of Done,
- Kommentare, Rückfragen, Dateien, Erwähnungen und Kontext-Threads,
- Entscheidungen, Konsultationen, Freigaben und Decision Records,
- SLA-, Blocker-, Eskalations- und Wiederaufnahmelogik,
- Evidence Requests und kontrollierte Audit-Arbeitsräume,
- Meetings, Reviews, Protokolle und Follow-up,
- rollenbezogene Benachrichtigungen und Attention Management,
- Übergaben zwischen Personen, Teams, Agenten, Sessions und Organisationen,
- Messung von Zusammenarbeit, Durchlaufzeit und Ergebnisqualität.

Das Dokument legt keine konkrete Collaboration-Suite, E-Mail-Plattform, Chat-Technologie oder Ticketing-Integration fest. Es ersetzt außerdem nicht Dokument 19 für die vollständige Rechte-, Datenschutz- und Sicherheitsarchitektur oder Dokument 20B/20C für die virtuelle KI-Firma und den Claude-Code-Entwicklungsbetrieb.

## 2. Executive Summary

Die Plattform behandelt Zusammenarbeit als kontrollierten Kreislauf:

1. Eine Veränderung, Anfrage oder Datenlücke wird erkannt.
2. Der fachliche Kontext und das gewünschte Ergebnis werden geklärt.
3. Die richtigen Rollen werden eingebunden und Beiträge strukturiert gesammelt.
4. Eine autorisierte Person entscheidet oder gibt frei.
5. Die Entscheidung wird in Aufgaben und Arbeitspakete übersetzt.
6. Ergebnis, Evidence und tatsächliche Wirkung werden verifiziert.

[[FIGURE:FIG1]]

Der Kern ist ein einheitliches **Work-Item-Modell**. Task, Evidence Request, Approval, Meeting Action oder Eskalation sind keine voneinander isolierten Mini-Anwendungen. Sie verwenden dieselbe Grundhülle für Kontext, Verantwortung, Zeit, Kommunikation, Ergebnis, Nachweise und Historie. Dadurch kann ein Nutzer von einer Executive-Entscheidung bis zum konkreten Evidence-Nachweis navigieren, ohne den roten Faden zu verlieren.

Die Plattform soll die Zahl der Nachrichten nicht maximieren, sondern Abstimmungsaufwand reduzieren. Eine gute Zusammenarbeit ist erreicht, wenn:

- der nächste Verantwortliche eindeutig ist,
- die erwartete Leistung verständlich beschrieben ist,
- Rückfragen am richtigen Objekt stattfinden,
- Entscheidungen mit Begründung und Gültigkeit festgehalten werden,
- Blocker früh sichtbar werden,
- Übergaben ohne erneute Rekonstruktion des Kontextes funktionieren,
- Management, Kunde, Beratung und Audit jeweils nur die notwendige Tiefe sehen,
- die tatsächliche Wirkung der Arbeit später nachvollziehbar bleibt.

## 3. Verfassung der Zusammenarbeit

### 3.1 Globale Prinzipien

- **C01 - Kontext vor Kanal:** Der fachliche Kontext ist primär; E-Mail, Teams, Slack oder In-App sind nur Transportkanäle.
- **C02 - Outcome vor Aktivität:** Jede koordinierte Arbeit nennt das erwartete Ergebnis und nicht nur eine Tätigkeit.
- **C03 - Ein verantwortlicher Owner:** Jedes aktive Work Item besitzt genau einen fachlich verantwortlichen Owner; mehrere Bearbeiter sind möglich.
- **C04 - Verantwortung bleibt menschlich:** Automatisierung und KI dürfen vorbereiten und koordinieren, aber keine nicht delegierte fachliche Verantwortung übernehmen.
- **C05 - Entscheidungen sind eigene Objekte:** Eine Entscheidung darf nicht ausschließlich in einem Kommentar, Meeting oder Chat verborgen bleiben.
- **C06 - Freigaben sind granular:** Freigaben beziehen sich auf definierte Version, Scope, Datenstand und Bedingungen.
- **C07 - Kein stilles Überschreiben:** Änderungen an Ziel, Fälligkeit, Owner, Entscheidung oder Definition of Done werden versioniert und begründet.
- **C08 - Kommunikation ist zweckgebunden:** Threads besitzen Typ, Status und erwartete Reaktion; endlose allgemeine Chatkanäle sind nicht der Primärmodus.
- **C09 - Attention ist knapp:** Benachrichtigungen werden nach Rolle, Materialität, Dringlichkeit und gewünschter Reaktion verdichtet.
- **C10 - Eskalation erhöht Entscheidungskompetenz:** Eine Eskalation bedeutet nicht nur mehr Empfänger, sondern einen klaren Wechsel zur notwendigen Autorität.
- **C11 - Übergabe ist ein Produktobjekt:** Bei Rollen-, Team-, Schicht-, Reise-, Agenten- oder Sessionwechsel wird der Kontext strukturiert übergeben.
- **C12 - Evidence ist getrennt von Behauptung:** Ein Kommentar oder eine erledigte Task ist noch kein Wirksamkeitsnachweis.
- **C13 - Externe Zusammenarbeit ist kontrolliert:** Auditoren, Lieferanten und externe Owner erhalten zweckgebundene, zeitlich begrenzte Arbeitsräume.
- **C14 - Mandantengrenzen bleiben sichtbar:** Portfolioarbeit darf niemals dazu führen, dass vertrauliche Informationen eines Mandanten in einen anderen Kontext gelangen.
- **C15 - Wiederaufnahme ist ein Hauptweg:** Das System muss nach Unterbrechung, Urlaub, Chatende oder Personalwechsel verständlich fortsetzbar sein.

### 3.2 Was die Plattform bewusst verhindert

- Aufgaben ohne fachlichen Kontext oder Owner,
- Entscheidungen ohne Begründung und Gültigkeit,
- verdeckte Freigaben durch bloßes Erledigen einer Task,
- Dateien ohne Version, Zweck und Objektbezug,
- Benachrichtigungsflut als Ersatz für Priorisierung,
- Eskalationen ohne Konsequenz oder Entscheidungserwartung,
- unkontrollierte Weitergabe sensibler Inhalte,
- private Wissensinseln einzelner Berater,
- Meetingprotokolle ohne Folgeaktionen,
- automatische Verantwortungsübernahme durch KI.

## 4. Kanonisches Arbeitsobjekt

Alle koordinierten Tätigkeiten werden auf einem gemeinsamen **Work Item** aufgebaut. Spezifische Typen erweitern dieses Basismodell, verändern aber nicht seine Kernsemantik.

[[FIGURE:FIG2]]

### 4.1 Pflichtfelder jedes Work Items

| Feld | Bedeutung |
|---|---|
| Identität | eindeutige ID, Typ, Mandant, Version und Erstellzeit |
| Fachlicher Kontext | verknüpfte Twin-Objekte, Risiko, Control, Finding, Audit, Service, Ziel oder Decision Record |
| Zweck und Outcome | verständlicher Ergebnissatz: Was muss nach Abschluss wahr oder vorhanden sein? |
| Owner | genau eine fachlich verantwortliche Person oder Rolle |
| Bearbeitung | zugewiesene Personen, Teams oder autorisierte Agenten |
| Beteiligte | Reviewer, Approver, Contributor, Informed und externe Beteiligte |
| Status | kanonischer Lebenszykluszustand einschließlich Blocker und Wartezustand |
| Zeit | Start, Fälligkeit, Zeitzone, Geschäftskalender, SLA, Reminder und Reviewdatum |
| Priorität | fachlich begründete Priorität aus Dokument 10, nicht nur manuell gesetzte Farbe |
| Definition of Done | prüfbare Abschlussbedingungen einschließlich erforderlicher Evidence |
| Abhängigkeiten | Vorgänger, Nachfolger, blockierende Entscheidung, Daten oder Ressourcen |
| Kommunikation | strukturierter Kontext-Thread und offene Fragen |
| Artefakte | Dateien, Links, Evidence, Reports und externe Referenzen |
| Vertraulichkeit | Datenklasse, Sichtbarkeit, Export- und Weitergaberegeln |
| Audit Trail | Änderungen, Übergaben, Kommentare, Freigaben, Statuswechsel und Automationen |
| Outcome Review | tatsächliches Ergebnis, Abweichung zur Erwartung und Learnings |

### 4.2 Work-Item-Typen

| Typ | Primärer Zweck | Typisches Ergebnis |
|---|---|---|
| Task | eine klar begrenzte Handlung durchführen | Aktion abgeschlossen und verifiziert |
| Work Package | mehrere abhängige Tasks auf ein gemeinsames Outcome bündeln | fachliches Deliverable oder Meilenstein |
| Request | Information, Beitrag oder Entscheidung von einer anderen Rolle anfordern | beantwortete und akzeptierte Anfrage |
| Evidence Request | Nachweis für Control, Requirement, Audit oder Finding anfordern | geprüfte Evidence oder dokumentierte Lücke |
| Review Item | Inhalt, Design, Ergebnis oder Wirksamkeit unabhängig prüfen | Reviewurteil mit Findings und Freigabestatus |
| Approval | eine konkrete Version innerhalb definierter Autorität freigeben | genehmigt, abgelehnt oder mit Bedingungen genehmigt |
| Decision Item | Optionen bewerten und eine autorisierte Entscheidung herbeiführen | versionierter Decision Record |
| Meeting Action | aus Meeting oder Review entstandene Verpflichtung nachhalten | erledigte und rückverlinkte Folgeaktion |
| Escalation | Blocker oder Toleranzüberschreitung an notwendige Autorität geben | Entscheidung, Ressource oder geänderte Route |
| Handover | Verantwortung und Arbeitsstand kontrolliert übertragen | bestätigte Übernahme ohne Kontextverlust |
| Notification Item | relevante Information mit definierter Reaktion zustellen | gelesen, bestätigt, zurückgestellt oder in Work Item überführt |
| Automation Run | wiederholbaren Workflow nachvollziehbar ausführen | protokollierte Schritte, Ergebnis und Ausnahmen |

### 4.3 Spezialisierung statt Duplikation

Ein Evidence Request ist gleichzeitig ein Work Item, aber mit zusätzlichen Feldern wie Control-Bezug, gewünschtem Zeitraum, Akzeptanzkriterium, Chain of Custody und Reviewer. Ein Approval besitzt zusätzlich Freigabeobjekt, Version, Autorität, Bedingungen und Gültigkeit. Gemeinsame Funktionen wie Kommentare, Owner, SLA, Eskalation, Historie und Suche werden nicht je Modul neu entwickelt.

## 5. Verantwortungs- und Beteiligungsmodell

### 5.1 Rollen innerhalb eines Work Items

| Beteiligungsrolle | Verantwortung |
|---|---|
| Accountable Owner | verantwortet Ergebnis, Priorität und Eskalation; genau eine Rolle |
| Assignee | führt konkrete Arbeit aus; eine oder mehrere Personen/Agenten |
| Contributor | liefert fachlichen Beitrag, Daten oder Evidence |
| Reviewer | prüft Qualität, Vollständigkeit oder Wirksamkeit |
| Approver | trifft die formale Freigabe innerhalb dokumentierter Autorität |
| Consulted | wird vor Entscheidung oder Abschluss fachlich konsultiert |
| Informed | erhält Ergebnis oder materielle Änderung ohne eigene Aktion |
| Observer | zeitlich begrenzter Lesestatus, etwa Auditor oder Support |

**Festlegung:** Accountable Owner, Reviewer und Approver können je nach Risiko getrennt werden. Bei materialer Risikoakzeptanz, kritischer Control-Prüfung, produktiver Sicherheitsänderung oder Serviceabrechnung muss ein definiertes Vier-Augen-Prinzip möglich sein.

### 5.2 Autorität und Entscheidungsschwellen

Autorität wird nicht nur aus der allgemeinen Benutzerrolle abgeleitet. Sie kann zusätzlich von Mandant, Organisationseinheit, Objekt, Risikoschwelle, Budget, Servicevertrag, Auftragsrolle und zeitlicher Delegation abhängen.

Beispiele:

- Ein Control Owner darf Evidence bestätigen, aber nicht zwingend das verbleibende Geschäftsrisiko akzeptieren.
- Ein Engagement Manager darf innerhalb genehmigter Servicekapazität Ressourcen umplanen, aber keinen Kundenscope erweitern.
- Ein CISO darf definierte Risikobehandlungen freigeben; oberhalb einer Materialitätsschwelle ist Executive Approval nötig.
- Ein Auditor darf Requests stellen und Findings bewerten, aber operative Controls oder Kundenprioritäten nicht verändern.

### 5.3 Delegation, Vertretung und Abwesenheit

Delegation ist immer:

- zeitlich begrenzt,
- scopebezogen,
- protokolliert,
- widerrufbar,
- für den Empfänger sichtbar,
- ohne stillen Verlust der ursprünglichen Verantwortung.

Bei Urlaub, Krankheit oder Rollenwechsel zeigt die Plattform aktive Work Items, bevorstehende Freigaben, vertrauliche Kontexte und offene Eskalationen. Eine Vertretung bestätigt die Übernahme. Kritische Aufgaben dürfen nicht allein durch automatische Umleitung als fachlich übernommen gelten.

### 5.4 Segregation of Duties

Konfigurierbare SoD-Regeln verhindern beispielsweise:

- Selbstfreigabe einer eigenen kritischen Implementierung,
- Erstellung und unabhängige Wirksamkeitsprüfung durch dieselbe Rolle,
- Angebot, Leistungserfassung und Abrechnungsfreigabe durch eine einzige Person,
- operative Änderung eines Auditfindings durch den unabhängigen Auditor,
- Freigabe eines externen Datenzugangs durch den beantragenden Nutzer allein.

## 6. Team Workspace

Der Team Workspace ist kein allgemeiner Chatraum. Er ist eine rollen- und kontextbezogene Arbeitsoberfläche über alle aktiven Work Items eines Mandanten, Services, Audits oder Verbesserungsprogramms.

### 6.1 Kernbereiche

- **Heute:** persönliche Mission, fällige Beiträge, Freigaben und Blocker.
- **Gemeinsam in Arbeit:** Work Items nach Outcome, Team, Mandant oder Programm.
- **Entscheidungen:** vorbereitete, konsultierte, wartende und überprüfungsfällige Decision Items.
- **Anfragen:** offene Requests, Evidence Requests und Rückfragen.
- **Blocker & Eskalationen:** Konsequenz, benötigte Autorität und nächster sicherer Schritt.
- **Meetings & Reviews:** Agenda, Vorlagen, Entscheidungen, Aktionen und Protokolle.
- **Aktivität:** relevante, verdichtete Veränderungen mit Filter und Follow-up.
- **Wissen:** gelöste Fälle, genehmigte Vorlagen, Playbooks und wiederverwendbare Arbeitsmuster.

### 6.2 Rollenbezogene Verdichtung

- **Executive:** wenige Entscheidungen, überfällige Management Actions und Auswirkungen auf Ziel, Risiko und Investition.
- **CISO / ISMS Manager:** Risiken, Freigaben, Owner-Lücken, Control- und Evidence-Fortschritt, Eskalationen.
- **Control Owner:** eigene Verpflichtungen, klare Definition of Done, Rückfragen und benötigte Vorleistungen.
- **Berater:** mehrere Mandanten, nächste sinnvolle Intervention, Abhängigkeiten, Kapazität und Übergaben.
- **Service Lead:** SLA, Quality Gates, Auslastung, wiederkehrende Blocker und Delivery-Risiken.
- **Auditor:** kontrollierter Scope, Requests, Evidence, Klarstellungen, Findings und unveränderbare Entscheidungen.
- **Administrator:** Zugriffsanfragen, Rollenänderungen, technische Störungen und Audit Trail - ohne fachliche Inhaltsverantwortung.

### 6.3 Fokusmodus

Ein Nutzer kann ein Work Item in einen Fokusmodus öffnen. Dort sind nur Kontext, Outcome, nächste Aktion, offene Fragen, relevante Artefakte und Definition of Done sichtbar. Fachliche Graphbeziehungen bleiben als Drill-down verfügbar. Der Modus verhindert, dass seltene Nutzer durch die Gesamtplattform navigieren müssen.

## 7. Lebenszyklus von Aufgaben und Work Items

### 7.1 Kanonischer Lebenszyklus

`Entwurf -> vorgeschlagen -> zugewiesen -> angenommen -> in Arbeit -> wartet/blockiert -> zur Prüfung -> abgeschlossen -> verifiziert -> geschlossen`

Alternative Endzustände sind `abgelehnt`, `storniert`, `ersetzt` und `archiviert`.

### 7.2 Bedeutung der wichtigsten Zustände

| Zustand | Verbindliche Bedeutung |
|---|---|
| Entwurf | noch nicht verbindlich; Owner und Scope können fehlen |
| Vorgeschlagen | vollständig genug für Prüfung, aber noch nicht aktiviert |
| Zugewiesen | Empfänger wurde benannt, hat Übernahme noch nicht bestätigt |
| Angenommen | Empfänger bestätigt Verständnis und Verpflichtung |
| In Arbeit | aktive Bearbeitung oder automatische Ausführung läuft |
| Wartet | legitim wartend auf Termin, externe Rückmeldung oder geplante Bedingung |
| Blockiert | Fortschritt ist ohne konkrete Entscheidung, Ressource, Berechtigung oder Daten nicht möglich |
| Zur Prüfung | Bearbeitung meldet Abschluss; Reviewer prüft DoD und Evidence |
| Abgeschlossen | Bearbeitung beendet, aber Outcome noch nicht unabhängig verifiziert |
| Verifiziert | definierte Erfolgs- und Evidence-Kriterien erfüllt |
| Geschlossen | keine weitere operative Aktion; Aufbewahrung und Review geregelt |

### 7.3 Statuswechselregeln

- Statuswechsel können Pflichtfelder, Evidence oder Freigaben voraussetzen.
- `Abgeschlossen` darf nicht automatisch `Verifiziert` bedeuten.
- Ein blockiertes Work Item benötigt Blockertyp, Auswirkung, Owner des Blockers und vorgeschlagene Lösung.
- Eine materielle Änderung an Scope oder DoD kann das Work Item in `vorgeschlagen` oder `zur Prüfung` zurücksetzen.
- Wiedereröffnung erzeugt eine neue Version oder einen nachvollziehbaren Reopen-Event.
- Automationen dürfen Status ändern, wenn Regel, Berechtigung und Ergebnis nachvollziehbar sind; kritische Freigaben bleiben menschlich.

## 8. Tasks und Arbeitspakete

### 8.1 Gute Task-Definition

Eine gute Task beantwortet:

- Warum gibt es diese Aufgabe?
- Welches Ergebnis wird erwartet?
- Was gehört ausdrücklich nicht dazu?
- Wer verantwortet und wer bearbeitet sie?
- Welche Eingaben und Abhängigkeiten bestehen?
- Woran erkennt ein Reviewer die Fertigstellung?
- Welche Evidence ist nötig?
- Welche Auswirkung entsteht bei Verspätung oder Nichtumsetzung?

Beispiel:

> **Schwach:** „MFA prüfen.“  
> **Gut:** „Für alle privilegierten Entra-ID-Konten des Produktionsscopes MFA-Coverage erfassen, Ausnahmen begründen und einen freigabefähigen Maßnahmenplan erstellen. Fertig, wenn Coverage, Ausnahmeliste, Owner, Zieltermine und Datenquelle geprüft vorliegen.“

### 8.2 Arbeitspakete

Ein Work Package bündelt Tasks, Reviews und Entscheidungen um ein gemeinsames Outcome. Es besitzt:

- Outcome und Business-/Zielbezug,
- Sponsor und Accountable Owner,
- Scope und Nicht-Scope,
- Meilensteine,
- kritischen Pfad,
- Ressourcen- und Skillbedarf,
- Reise- oder Vor-Ort-Anteile,
- Kosten- und Kapazitätsannahmen,
- Definition of Done,
- Outcome Review und Nutzenmessung.

Arbeitspakete sind die bevorzugte Einheit für Maßnahmenprogramme, Auditvorbereitung, Policy-Rollout, Lieferantenkampagnen und Managed-Service-Deliverables.

### 8.3 Abhängigkeiten

Unterstützte Beziehungstypen sind mindestens:

- blockiert durch,
- benötigt Entscheidung,
- benötigt Evidence,
- startet nach,
- kann parallel laufen,
- erzeugt,
- ersetzt,
- verifiziert,
- ist Teil von,
- wird ausgelöst durch.

Die Plattform zeigt den kritischen Pfad und erklärt, welche Verzögerung tatsächlich das Ziel gefährdet.

## 9. Entscheidungs- und Freigabearbeit

Dokument 10 definiert Decision Cards und Decision Records. Dokument 11 definiert die Zusammenarbeit, die zu einer belastbaren Entscheidung führt.

### 9.1 Entscheidungsfluss

`Vorbereiten -> Konsultieren -> Rückfragen klären -> Optionen aktualisieren -> Freigabe anfordern -> genehmigen/ablehnen/bedingt genehmigen -> umsetzen -> Outcome prüfen`

### 9.2 Konsultation

Eine Konsultation ist kein unstrukturierter Kommentaraufruf. Der Initiator formuliert konkrete Fragen, Antwortfrist, benötigte Perspektive und Auswirkung bei ausbleibender Antwort. Beiträge können als:

- Zustimmung,
- Einwand,
- Alternative,
- Datenkorrektur,
- Risiko-/Compliance-Hinweis,
- Bedingung,
- Kenntnisnahme

klassifiziert werden. Offene Einwände sind vor Freigabe sichtbar; ein Entscheider kann sie akzeptieren, auflösen oder begründet überstimmen.

### 9.3 Approval Contract

Jede formale Freigabe enthält:

| Feld | Beispiel |
|---|---|
| Freigabegegenstand | Risikobehandlungsplan IAM v3 |
| Scope und Version | Produktionsscope, Datenstand 21.07.2026 |
| Entscheiderrolle | CISO, ab Schwelle zusätzlich CFO |
| Optionen | interne Umsetzung, Managed Service, Verschiebung |
| Empfehlung | Managed-Service-Route |
| Bedingungen | Budgetobergrenze, monatlicher Review, Exit nach sechs Monaten |
| Gültigkeit | bis Zielerreichung oder 31.01.2027 |
| Review | Outcome Review nach 90 Tagen |
| Ergebnis | genehmigt / abgelehnt / bedingt / zurückgestellt |

### 9.4 Gruppenfreigaben

Unterstützte Muster:

- eine Freigabe aus einer Rolle,
- alle benannten Approver,
- mindestens `n` aus `m`,
- sequenzielle Freigabe,
- parallele Freigabe,
- Freigabe mit Veto-Rolle,
- Freigabe oberhalb Schwellenwert,
- zeitlich befristete Notfallfreigabe mit nachträglichem Review.

Die Plattform zeigt jederzeit, welche Zustimmung fehlt und warum sie erforderlich ist.

## 10. Kontextgebundene Kommunikation

### 10.1 Threads statt freier Chatkanäle

Ein Thread gehört immer zu einem Work Item, fachlichen Objekt, Reportabschnitt, Decision Item, Evidence Request oder Meeting. Er besitzt Thema, Typ, Beteiligte, Status und erwartete Reaktion.

Thread-Typen:

- Frage,
- Statusupdate,
- Vorschlag,
- Einwand / Risiko,
- Datenkorrektur,
- Entscheidungsbegründung,
- Evidence-Hinweis,
- Review-Kommentar,
- Übergabehinweis,
- allgemeine Kontextnotiz.

### 10.2 Funktionen

- Erwähnungen und gezielte Reaktionsanforderung,
- Antwortfrist und Reminder,
- Umwandlung einer Nachricht in Task, Request, Decision Item oder Finding,
- Zitieren des relevanten Datenstands oder Artefaktabschnitts,
- Markierung als beantwortet, gelöst, übernommen oder abgelehnt,
- Thread-Zusammenfassung mit Quellenlinks,
- Versionsbezug bei Dokumenten, Controls und Reports,
- vertrauliche Teilthreads innerhalb erlaubter Rollen,
- Export in Audit- oder Handover-Paket, sofern zulässig.

### 10.3 E-Mail und Collaboration Tools

E-Mail, Teams und Slack können Zustellungen, Replies oder Deep Links unterstützen. Die Plattform bleibt jedoch die kanonische Quelle. Eine externe Antwort wird dem richtigen Thread zugeordnet, mit Absender, Zeit, Kanal und Originalreferenz protokolliert. Unsicheres Matching erzeugt eine Zuordnungsaufgabe statt einer stillen falschen Verknüpfung.

### 10.4 Kommunikationshygiene

- Kein Reply-all als Eskalationsstrategie.
- Kein Pflicht-CC für Personen ohne erwartete Aktion.
- Keine Freigabe nur durch Emoji oder informelles „passt“ bei materialem Inhalt.
- Keine sensible Information in Push-Vorschau oder Betreff, wenn die Datenklasse dies verbietet.
- Automatische Zusammenfassungen müssen Originalbeiträge verlinken und Unsicherheit kennzeichnen.

## 11. Requests und Evidence Collaboration

### 11.1 Allgemeiner Request

Ein Request fordert eine klar definierte Leistung von einer anderen Rolle an. Pflichtfelder sind Fragestellung, gewünschtes Ergebnis, Kontext, Empfänger, Fälligkeit, Akzeptanzkriterium und Eskalationsweg.

Der Empfänger kann:

- annehmen,
- Rückfrage stellen,
- mit Begründung ablehnen,
- zuständige Person vorschlagen,
- Teilantwort liefern,
- Erfüllung melden.

### 11.2 Evidence Request

Ein Evidence Request enthält zusätzlich:

- betroffene Requirement-/Control-/Audit-Beziehung,
- Prüfzeitraum und Scope,
- akzeptierte Evidenzarten,
- Qualitäts- und Aktualitätskriterien,
- Klassifikation und Uploadregeln,
- Reviewer und Unabhängigkeitsanforderung,
- Wiederverwendbarkeit und Ablaufdatum,
- Chain of Custody.

Ergebniszustände:

- akzeptiert,
- akzeptiert mit Einschränkung,
- unzureichend,
- veraltet,
- widersprüchlich,
- nicht verfügbar,
- nicht anwendbar mit Begründung.

### 11.3 Evidence-Wiederverwendung

Vor einer neuen Anfrage prüft die Plattform, ob bereits geeignete Evidence existiert. Wiederverwendung ist nur zulässig, wenn Scope, Zeitraum, Quelle, Integrität, Aktualität und Control-Bezug passen. Der Owner sieht, warum Evidence wiederverwendbar oder ungeeignet ist.

### 11.4 Anfragekampagnen

Für Lieferantenbewertungen, Awareness-Nachweise, Quartalsreviews oder Auditvorbereitung können standardisierte Kampagnen erstellt werden. Sie besitzen Template, Empfängerkohorte, Fälligkeiten, Erinnerungspolitik, Eskalation, Fortschritt, Antwortqualität und Abschlussbericht.

## 12. Workflow, SLA, Blocker und Eskalation

### 12.1 SLA-Vertrag

Ein SLA oder interner OLA definiert:

- Startsignal,
- Zielzeit oder Reaktionszeit,
- Geschäftskalender und Zeitzone,
- zulässige Pausengründe,
- Servicezeiten,
- Prioritätsklasse,
- Warnschwellen,
- Eskalationsstufen,
- Ausschlüsse,
- Messpunkt und Abschlusskriterium.

Die Plattform unterscheidet Reaktionszeit, Bearbeitungszeit, Wartezeit, aktive Arbeitszeit und End-to-End-Durchlaufzeit.

### 12.2 Blockertypen

- fehlende Information oder Evidence,
- fehlende fachliche Entscheidung,
- fehlende Berechtigung,
- technische Störung,
- externe Abhängigkeit,
- Ressourcen- oder Skillengpass,
- Reise-/Terminproblem,
- Budget- oder Beschaffungsblocker,
- Scopekonflikt,
- Compliance-/Unabhängigkeitskonflikt.

Ein Blocker benötigt Auswirkung, Blocker-Owner, nächsten Lösungsversuch und Eskalationsdatum.

### 12.3 Eskalationsleiter

[[FIGURE:FIG3]]

Eine Eskalation enthält:

- was blockiert ist,
- welche Konsequenz droht,
- was bereits versucht wurde,
- welche Entscheidung oder Ressource benötigt wird,
- wer die nötige Autorität besitzt,
- bis wann eine Reaktion nötig ist,
- welche sichere Fallback-Option besteht.

### 12.4 Deeskalation und Rückkehr

Nach Lösung wird dokumentiert:

- Entscheidung oder Ressource,
- veränderte Annahmen,
- neue Fälligkeit oder Route,
- verbleibendes Risiko,
- Learnings und mögliche Workflow-Verbesserung.

Die Eskalation bleibt historisch erhalten, verschwindet aber aus dem aktiven Attention-Bereich.

## 13. Benachrichtigungen und Attention Management

### 13.1 Notification Classes

| Klasse | Erwartete Reaktion | Beispiel |
|---|---|---|
| Entscheidung erforderlich | auswählen oder freigeben | Risikoakzeptanz wartet |
| Beitrag erforderlich | Information, Evidence oder Review liefern | Evidence Request |
| Blocker / Eskalation | Autorität oder Ressource bereitstellen | Auditkritischer Owner reagiert nicht |
| Materiale Veränderung | Lage prüfen und Route bestätigen | neue Bedrohung betrifft kritischen Service |
| Frist / SLA | handeln oder Termin begründet ändern | SLA-Warnschwelle erreicht |
| Status / Ergebnis | Kenntnis nehmen | Work Package verifiziert |
| Information / Lernen | optional lesen | neues Playbook oder Best Practice |

### 13.2 Zustelllogik

- In-App Inbox ist kanonisch.
- Push, E-Mail, Teams oder Slack sind konfigurierbare Zustellkanäle.
- Kritische Inhalte können eine sichere Deep-Link-Zustellung ohne sensitive Vorschau verwenden.
- Doppelte Ereignisse werden gebündelt.
- Nutzer können nichtkritische Hinweise als Digest erhalten.
- Ruhezeiten, Vertretung, Zeitzone und Rolle werden berücksichtigt.
- Eine Notification kann bestätigt, zurückgestellt, delegiert, in Work Item überführt oder als nicht relevant gemeldet werden.

### 13.3 Digest und Morning Briefing

Der Digest beantwortet:

- Was benötigt heute meine Aktion?
- Was wurde seit meiner letzten Aktivität entschieden?
- Welche Work Items sind neu blockiert?
- Welche Fristen oder Reisen beeinflussen meinen Plan?
- Wo wurde ich ersetzt, erwähnt oder als Reviewer benötigt?
- Welche relevante Information kann warten?

Er enthält keine ungefilterte Aktivitätschronik.

### 13.4 Anti-Noise-Regeln

- Maximal eine aktive Notification pro identischem Ereignis und Nutzer.
- Statusupdates ohne erwartete Aktion werden standardmäßig gebündelt.
- Materialitätsschwellen sind je Rolle und Mandant konfigurierbar.
- Eskalationen ersetzen vorherige Reminder, statt zusätzliche parallele Nachrichten zu erzeugen.
- Nutzer können Benachrichtigungsqualität melden; die Regel wird analysiert, nicht individuell still ignoriert.

## 14. Übergaben und Kontinuität

Übergaben sind besonders relevant bei Urlaub, Rollenwechsel, Schichtwechsel, Anbieterwechsel, Auditphasen, Reisen, Agentenwechsel und Context-Limits in Entwicklungs- oder Supportprozessen.

[[FIGURE:FIG4]]

### 14.1 Handover Packet

Ein Handover Packet enthält mindestens:

- Ziel und Scope,
- aktuellen Status und zuletzt erreichten Outcome,
- offene Work Items nach Priorität,
- anstehende Entscheidungen und Freigaben,
- aktuelle Blocker und Eskalationen,
- relevante Datenänderungen,
- Dateien, Evidence und Decision Records,
- bekannte Risiken und Unsicherheiten,
- Termine, SLA, Reise- und Vor-Ort-Verpflichtungen,
- exakten empfohlenen Einstiegspunkt,
- Ansprechpartner und Rückfrageweg.

### 14.2 Übernahmebestätigung

Der Empfänger bestätigt:

- gelesen,
- Kontext verstanden,
- Zugriff vorhanden,
- Verantwortungsumfang akzeptiert,
- offene Fragen dokumentiert.

Ohne Bestätigung bleibt die ursprüngliche Verantwortung sichtbar. Eine automatische Zuweisung darf keine fiktive Übernahme erzeugen.

### 14.3 Wiederaufnahme nach Unterbrechung

Beim erneuten Login zeigt die Plattform:

- was sich seit dem letzten aktiven Zeitpunkt verändert hat,
- welche eigenen Entscheidungen oder Zusagen noch gelten,
- welche Aufgaben neu zugewiesen oder eskaliert wurden,
- welche Threads beantwortet wurden,
- wo die letzte Bearbeitung sicher fortgesetzt werden kann.

## 15. Meetings, Reviews und Management-Routinen

### 15.1 Meeting-Objekt

Ein Meeting ist ein kontrollierter Container für:

- Zweck und gewünschtes Ergebnis,
- Teilnehmende und Rollen,
- Agenda aus offenen Decisions, Blockern und Reviews,
- vorbereitende Unterlagen,
- Datenstand,
- Notizen und Einwände,
- getroffene Entscheidungen,
- Folgeaktionen und Owner,
- Protokollfreigabe.

### 15.2 Meeting-Typen

- Daily / Weekly Delivery Sync,
- Kundenstatus- oder Steering Meeting,
- Risk Review,
- Control Assurance Review,
- Audit Kick-off und Closing,
- Management Review,
- Service Review,
- Incident-/Post-Implementation Review,
- Architektur- oder Security Review,
- Handover-Meeting.

### 15.3 Vor und nach dem Meeting

Vor dem Meeting erzeugt die Plattform eine rollenbezogene Agenda mit entscheidungsreifen Punkten und Datenlücken. Nach dem Meeting werden Aussagen nicht nur als Protokolltext gespeichert. Entscheidungen werden zu Decision Records, Verpflichtungen zu Work Items und offene Fragen zu Requests. Das Protokoll verlinkt diese Objekte und bleibt selbst versioniert.

## 16. Externe Zusammenarbeit und kontrollierte Datenräume

### 16.1 Audit Workspace

Ein Audit Workspace bietet:

- klaren Scope und Zeitraum,
- unabhängige Auditorrollen,
- Request List,
- kontrollierte Evidence-Bereitstellung,
- Frage-/Klarstellungsthreads,
- Findings und Management Responses,
- Vor-Ort-Planung,
- exportierbares Audit Package,
- zeitlich begrenzte Zugriffe.

Auditoren sehen nur freigegebene Inhalte und nachvollziehbare Historie. Interne Entwürfe, Privilegien oder andere Mandanten bleiben verborgen.

### 16.2 Lieferanten- und Contributor Portal

Externe Lieferanten oder Fachbereiche erhalten eine stark vereinfachte Oberfläche:

- Was wird benötigt?
- Warum wird es benötigt?
- Bis wann?
- Welche Formate sind zulässig?
- Wer kann Rückfragen beantworten?
- Wurde die Einreichung akzeptiert?

Sie müssen nicht das gesamte ISMS oder die komplette Risikoanalyse sehen.

### 16.3 Sichere Gastzugriffe

Gastzugriff benötigt Sponsor, Zweck, Scope, Ablaufdatum, Datenklasse, zulässige Aktionen und Review. Download, Weitergabe und Export können eingeschränkt werden. Ablauf oder Rollenänderung entzieht Zugriff automatisch, ohne Audit Trail zu löschen.

## 17. Berater- und Multi-Mandanten-Zusammenarbeit

### 17.1 Portfolioarbeit

Berater und Service Leads können Work Items über mehrere Mandanten nach Rolle, SLA, Thema, Reise, Skill und Eskalation verdichten. Mandanteninhalte bleiben getrennt. Eine Portfolioansicht zeigt nur die Informationen, die für Steuerung benötigt werden.

### 17.2 Wiederverwendbare Arbeitspakete

Genehmigte Templates können enthalten:

- Workflow,
- Aufgabenstruktur,
- Definition of Done,
- Rollenmodell,
- Evidence Request List,
- Meeting-Rhythmus,
- Reportvorlage,
- SLA und Eskalation.

Bei Instanziierung werden Mandant, Scope, Zielprofil, Vertragsleistung und Verantwortungen geprüft. Ein Template darf niemals still eine Kundenentscheidung oder Risikoakzeptanz erzeugen.

### 17.3 Practice Intelligence

Anonymisierte Muster können zeigen:

- häufige Blocker,
- durchschnittliche Durchlaufzeiten,
- Evidence-Qualitätsprobleme,
- wiederkehrende Eskalationsursachen,
- erfolgreiche Workflow-Varianten,
- Kapazitäts- und Skillengpässe.

Cross-Tenant-Lernen benötigt dokumentierte Vergleichbarkeit, Datenschutzfreigabe und technische Mandantentrennung.

## 18. Suche, Wissen und Lernschleife

### 18.1 Globale Suche

Die Suche umfasst berechtigungsgefiltert:

- Work Items,
- Personen und Rollen,
- fachliche Objekte,
- Entscheidungen,
- Threads,
- Dateien und Evidence-Metadaten,
- Meetings,
- Vorlagen und Playbooks.

Treffer zeigen Mandant, Objektkontext, Status, Owner, Aktualität und erlaubte Aktion. Volltexttreffer in vertraulichen Artefakten dürfen keine unzulässigen Snippets offenlegen.

### 18.2 Wissensartefakte

Aus abgeschlossener Arbeit können kuratierte Wissensobjekte entstehen:

- Best Practice,
- Troubleshooting Guide,
- Entscheidungspräzedenz,
- genehmigte Vorlage,
- Anti-Pattern,
- Lessons Learned,
- FAQ.

Die Veröffentlichung benötigt Owner, Gültigkeit, Zielgruppe, Quellen und Reviewdatum. Rohkommentare werden nicht automatisch zu verbindlichem Wissen.

### 18.3 Lernen aus Outcomes

Nach verifizierten Work Packages kann die Plattform fragen:

- Hat die Maßnahme die erwartete Wirkung erreicht?
- Welche Annahme war falsch?
- Wo entstand unnötige Wartezeit?
- Welche Kommunikation oder Übergabe funktionierte schlecht?
- Soll Workflow, Template oder SLA angepasst werden?

Ergebnisse fließen in Dokument 10 Value Ledger und Dokument 13 Serviceverbesserung ein.

## 19. KI-Unterstützung und Guardrails

KI ist Assistenz, nicht Kommunikations- oder Verantwortungsersatz.

### 19.1 Zulässige Assistenz

- lange Threads mit Quellenlinks zusammenfassen,
- offene Fragen, Entscheidungen und Zusagen extrahieren,
- Task- oder Request-Entwurf aus freigegebenem Kontext vorschlagen,
- Handover Packet oder Meetingagenda vorstrukturieren,
- ähnliche gelöste Fälle und genehmigte Templates suchen,
- unklare Definition of Done oder fehlende Pflichtfelder markieren,
- Antwortentwürfe und zielgruppengerechte Erklärungen erzeugen,
- potenzielle doppelte oder widersprüchliche Work Items erkennen.

### 19.2 Grenzen

KI darf nicht selbstständig:

- materiale Risiken akzeptieren,
- Freigaben vortäuschen,
- Verantwortungen ohne Bestätigung übertragen,
- vertrauliche Inhalte mandantenübergreifend verwenden,
- Beiträge sinnverändernd zusammenfassen und Originale ersetzen,
- Evidenz als ausreichend bestätigen,
- regulatorische oder juristische Interpretation verbindlich festlegen,
- SLA oder Entscheidungshistorie manipulieren.

Jeder KI-Vorschlag zeigt Modell-/Regelherkunft, Quellen, Erstellzeit und Unsicherheit. Fallback ohne KI bleibt verfügbar.

## 20. Integrationen und Ereignisse

### 20.1 Integrationsziele

- Identity und Abwesenheit aus Verzeichnis-/HR-Systemen,
- Termine und Reisen aus Kalendern,
- Aufgabenabgleich mit Jira, ServiceNow oder anderen Ticket-Systemen,
- Zustellung über E-Mail, Teams oder Slack,
- Audit- und Reportexport,
- Evidence- und Dokumentlinks aus DMS/Cloudspeichern,
- Events aus SIEM, CMDB, Scanner oder Workflow-Systemen.

### 20.2 System of Record

Für jedes integrierte Objekt wird definiert, welches System die führende Quelle ist. Die Plattform darf externe Tasks spiegeln oder verknüpfen, muss aber Statuskonflikte sichtbar behandeln. Kritische ISMS-Semantik, Decision Records, Freigaben, Objektbeziehungen und Audit Trail bleiben in der Plattform kanonisch, sofern keine explizite Governance etwas anderes festlegt.

### 20.3 Ereignismodell

Relevante Events sind unter anderem:

- Work Item erstellt/zugewiesen/angenommen,
- Status oder Priorität geändert,
- Kommentar oder Einwand hinzugefügt,
- Approval angefordert/entschieden,
- Evidence eingereicht/geprüft/abgelaufen,
- SLA-Warnung oder Eskalation ausgelöst,
- Handover erstellt/übernommen,
- Meeting abgeschlossen,
- Outcome verifiziert,
- externer Sync fehlgeschlagen.

Events besitzen Mandant, Objekt, Actor, Zeit, Quelle, Version und Idempotency-Key.

## 21. Vertraulichkeit, Auditierbarkeit und Aufbewahrung

Dieses Dokument definiert fachliche Mindestregeln; Dokument 19 konkretisiert technische Sicherheitskontrollen.

- Sichtbarkeit folgt Mandant, Datenraum, Objekt, Work Item und Beteiligungsrolle.
- Kommentare und Dateien erben nicht blind jede Berechtigung; besonders vertrauliche Teilkontexte sind möglich.
- Freigaben, Decision Records und wesentliche Statuswechsel werden revisionsfähig protokolliert.
- Löschung, Aufbewahrung und Legal Hold gelten auch für Threads, Exporte und Anhänge.
- Bearbeitungen an Protokollen, Kommentaren oder Dateiversionen bleiben historisch nachvollziehbar.
- Export zeigt Datenstand, Klassifikation und erlaubten Zweck.
- Supportzugriff ist zeitlich begrenzt, genehmigt und protokolliert.
- Private Entwürfe dürfen nicht unkontrolliert in Audit- oder Kundenpakete gelangen.

## 22. Kennzahlen für Zusammenarbeit und Delivery

Kennzahlen dürfen keine Überwachungskultur oder reine Aktivitätsoptimierung erzeugen. Primär sind Outcome, Flow, Qualität und Verlässlichkeit.

### 22.1 Empfohlene KPI-Familien

| Familie | Beispiele | Zweck |
|---|---|---|
| Flow | End-to-End-Durchlaufzeit, aktive Zeit, Wartezeit, Blockerzeit | Prozessengpässe erkennen |
| Verlässlichkeit | SLA-Erfüllung, Termintreue, Handover-Erfolg | Delivery planbar machen |
| Qualität | Review-Rework, Evidence-Akzeptanz, Reopen-Rate | Ergebnisqualität verbessern |
| Entscheidung | Zeit bis Entscheidung, offene Einwände, Review-Erfüllung | Governance wirksam machen |
| Attention | Notification-to-Action, gebündelte Ereignisse, Noise-Feedback | Informationslast reduzieren |
| Zusammenarbeit | Antwortzeit, ungeklärte Requests, Owner-Lücken | Koordination verbessern |
| Nutzen | Outcome-Erreichung, eingesparte Aufbereitung, wiederverwendete Assets | Wert belegen |

### 22.2 Anti-KPIs

Nicht als Leistungsziel verwenden:

- Anzahl gesendeter Nachrichten,
- Anzahl geschlossener Tasks ohne Outcome,
- permanente Onlinezeit,
- rohe Kommentaranzahl,
- pauschal kürzeste Bearbeitungszeit bei Qualitätseinbuße,
- Zahl der Eskalationen ohne Ursachenanalyse.

### 22.3 Team Health Signals

Die Plattform kann warnen bei:

- dauerhaft überlasteten Owners,
- Aufgaben ohne akzeptierte Zuweisung,
- wiederkehrenden Übergabefehlern,
- ungewöhnlich hoher Rework-Rate,
- vielen Tasks ohne Definition of Done,
- strukturell verspäteten Freigaben,
- Notification-Noise,
- ungleich verteilter kritischer Verantwortung.

Diese Signale dienen Prozessverbesserung und benötigen angemessene Datenschutz- und Mitbestimmungsregeln.

## 23. Vollständige End-to-End-Szenarien

### 23.1 Neue Bedrohung wird zur koordinierten Entscheidung

1. Threat-Signal betrifft zwei kritische Assets.
2. Plattform erstellt einen vorgeschlagenen Investigation Request.
3. ISMS Manager bestätigt Scope und Owner.
4. Control Owner liefert technischen Status; Berater ergänzt Risikokontext.
5. CISO erhält Decision Card mit drei Optionen.
6. Ein Einwand des Betriebs wird dokumentiert und als Bedingung übernommen.
7. CISO genehmigt eine zeitlich befristete Maßnahme.
8. Work Package mit Tasks, SLA und Evidence entsteht.
9. Ergebnis wird geprüft; Decision Record erhält Outcome Review.

### 23.2 Audit Evidence Request

1. Auditor stellt Request für privilegierte Zugriffsreviews.
2. Control Owner erhält vereinfachte Anfrage mit Scope und Akzeptanzkriterium.
3. Vorhandene Evidence wird vorgeschlagen; ein Zeitraum passt nicht.
4. Owner ergänzt fehlende Evidence und stellt Rückfrage.
5. Auditor akzeptiert zwei Nachweise, markiert einen als unzureichend.
6. Finding-Entwurf und Nachforderung werden verknüpft.
7. Audit Lead sieht Fortschritt, SLA und offene Blocker.

### 23.3 Managementfreigabe mit mehreren Rollen

1. CISO bereitet Investitionsentscheidung vor.
2. Finance wird als Consulted, Executive als Approver eingebunden.
3. Finance korrigiert Kostenannahme; Route wird neu berechnet.
4. Executive genehmigt mit Budgetgrenze und 90-Tage-Review.
5. Decision Record erzeugt Work Package und Reportabschnitt.
6. Tatsächliche Wirkung wird später im Value Ledger geprüft.

### 23.4 Beraterübergabe vor Vor-Ort-Audit

1. Lead-Berater fällt kurzfristig aus.
2. Plattform erstellt Handover Packet mit Auditplan, Reise, offenen Requests, Kundenkontext und Risiken.
3. Vertretung bestätigt Zugriff und Verständnis.
4. Zwei offene Fragen werden als Requests an ursprünglichen Lead und Kunden gestellt.
5. Vor-Ort-Termin wird ohne Rekonstruktion aus E-Mail-Ketten fortgesetzt.
6. Nach Rückkehr erfolgt Rückübergabe und Lessons Learned.

### 23.5 Nicht reagierender Owner

1. Evidence Request erreicht Warnschwelle.
2. Nudge an Bearbeiter bleibt erfolglos.
3. Owner wird mit Konsequenz informiert.
4. Team Lead erkennt Kapazitätsproblem und weist Contributor zu.
5. Fälligkeit wird begründet angepasst; Auditroute aktualisiert.
6. Wiederkehrendes Muster erzeugt Prozessverbesserung statt weiterer Reminder.

### 23.6 Meeting wird in ausführbare Arbeit übersetzt

1. Management Review erhält automatisch vorgeschlagene Agenda.
2. Teilnehmende prüfen Decision Cards vor dem Termin.
3. Im Meeting werden zwei Entscheidungen und drei Actions festgehalten.
4. Decisions werden formal freigegeben, Actions erhalten Owner und DoD.
5. Protokoll verweist auf die kanonischen Objekte.
6. Im nächsten Review wird Outcome statt bloßer Taskerledigung geprüft.

## 24. Demonstrator und synthetische Daten

Der Demonstrator muss Zusammenarbeit über mehrere Rollen und Unternehmen glaubwürdig zeigen. Mindestens folgende Accounts sind vorbereitet:

- Executive,
- CISO,
- ISMS Manager,
- Control Owner,
- Service Lead,
- Engagement Manager,
- Consultant,
- Auditor,
- Tenant Administrator.

### 24.1 Verbindliche Demo-Szenen

1. Berater öffnet Morning Mission mit drei priorisierten Mandantenaktionen.
2. Ein Work Item zeigt Kontext, Owner, DoD, Thread und Evidence auf einer Seite.
3. CISO konsultiert Finance und genehmigt eine Decision Card mit Bedingung.
4. Control Owner beantwortet einen Evidence Request in vereinfachter Sicht.
5. Auditor akzeptiert Evidence und erstellt ein Finding.
6. Blocker eskaliert von Owner zu Governance, ohne Notification-Flut.
7. Service Lead sieht portfolioübergreifend SLA, Kapazität und wiederkehrende Blocker.
8. Handover Packet ermöglicht Wechsel des Beraters vor einem Vor-Ort-Termin.
9. Meetingprotokoll erzeugt Decision Records und Follow-up-Tasks.
10. PDF/PPTX-Report verwendet denselben Datenstand, dieselben Entscheidungen und Verantwortungen.

### 24.2 Demo-Datenkonsistenz

- Alle Rollen sehen denselben fachlichen Kern in erlaubter Verdichtung.
- Status, Kommentare und Decision Records ändern sich synchron.
- Keine reale Kunden- oder PwC-Information wird verwendet.
- Preise, SLAs und Serviceannahmen sind als synthetische Marktbeispiele markiert.
- Historie umfasst mindestens sechs Monate, damit Übergaben, Eskalationen und Outcome Reviews sichtbar sind.

## 25. Fehler-, Sonder- und Missbrauchsfälle

- **Falscher Empfänger:** Empfänger kann zuständige Rolle vorschlagen; Originalverantwortung bleibt bis bestätigter Übergabe.
- **Owner verlässt Organisation:** aktive Verpflichtungen werden in einen Übergabeprozess überführt; keine automatische fachliche Übernahme.
- **Widersprüchliche Antworten:** Konflikt bleibt sichtbar und wird an Reviewer oder Entscheider gegeben.
- **E-Mail kann nicht zugeordnet werden:** Nachricht landet in kontrollierter Zuordnungswarteschlange.
- **Integration doppelt Event:** Idempotency verhindert doppelte Tasks oder Kommentare.
- **Freigabe auf veralteter Version:** System stoppt Freigabe oder fordert explizite Bestätigung der Änderung.
- **SLA während genehmigter Pause:** Timer pausiert mit Grund und Verantwortlichem.
- **Notification nicht zugestellt:** In-App Item bleibt aktiv; alternative Route und Adminhinweis möglich.
- **Vertraulicher Kommentar versehentlich geteilt:** Rechteprüfung vor Versand; nachträgliche Korrektur bleibt im Audit Trail.
- **KI-Zusammenfassung lässt Einwand aus:** Nutzer sieht Quellen und kann Zusammenfassung ablehnen; Originalthread bleibt maßgeblich.
- **Auditorzugriff abgelaufen:** Zugriff endet automatisch; Audit Trail und zulässige Exporte bleiben erhalten.
- **Task erledigt ohne Evidence:** Status höchstens `abgeschlossen`, nicht `verifiziert`.
- **Eskalation ohne zuständige Autorität:** System zeigt Governance-Lücke als eigenes Work Item.
- **Massenupload unsicherer Dateien:** Quarantäne, Scan, Klassifikation und manuelle Klärung.
- **Offline-/Reisesituation:** sichere Zwischennotiz kann als Entwurf gespeichert werden; produktive Entscheidung erfordert synchronisierten Kontext.

## 26. Nicht-Ziele

Die Zusammenarbeitsschicht ist nicht:

- ein vollwertiger Ersatz für allgemeine Unternehmenskommunikation,
- ein soziales Netzwerk,
- ein beliebiges Projektmanagementtool für alle Unternehmensprozesse,
- ein Ersatz für SIEM, ITSM oder Quellcodeverwaltung,
- ein Personalüberwachungs- oder Produktivitätsranking-System,
- eine autonome Entscheidungsinstanz,
- eine unkontrollierte Dokumenten- und Chatablage,
- ein öffentliches Kundenportal ohne Zweck- und Rechtebegrenzung,
- ein Mechanismus zur Umgehung formaler Governance.

## 27. Globale Akzeptanzkriterien

- Jedes aktive Work Item besitzt Kontext, Outcome, Owner, Status und Definition of Done.
- Zugewiesene Verantwortung gilt erst nach Annahme oder definierter organisatorischer Regel als übernommen.
- Kritische Freigaben beziehen sich auf konkrete Version, Scope und Datenstand.
- Kommentare und Dateien sind vom fachlichen Objekt aus auffindbar.
- Eine Nachricht kann in Task, Request, Decision Item oder Finding überführt werden.
- Erledigt und verifiziert sind getrennte Zustände.
- Blocker zeigen Auswirkung, Blocker-Owner, nächste Option und Eskalationsdatum.
- Eskalationen adressieren die erforderliche Autorität und ersetzen reine Reminder-Kaskaden.
- Benachrichtigungen sind nach Materialität gebündelt und besitzen eine erwartete Reaktion.
- Externe Beteiligte erhalten zeitlich und fachlich begrenzte Arbeitsräume.
- Meetingentscheidungen werden als Decision Records und Actions als Work Items gespeichert.
- Handover Packets ermöglichen nachvollziehbare Wiederaufnahme in einem neuen Nutzer-, Agenten- oder Sessionkontext.
- Integrationen erzeugen keine stillen Freigaben oder doppelte Work Items.
- Audit Trail ist für wesentliche Status-, Owner-, Freigabe- und Inhaltsänderungen rekonstruierbar.
- Kernabläufe funktionieren ohne generative KI.
- Demo-Szenen sind mit synthetischen, rollenübergreifend konsistenten Daten ausführbar.

## 28. Festgelegte Entscheidungen

- **ENTSCHEIDUNG 11-01:** Zusammenarbeit ist objekt- und outcomezentriert, nicht kanalzentriert.
- **ENTSCHEIDUNG 11-02:** Alle koordinierten Tätigkeiten basieren auf einem gemeinsamen Work-Item-Modell.
- **ENTSCHEIDUNG 11-03:** Jedes aktive Work Item besitzt genau einen Accountable Owner.
- **ENTSCHEIDUNG 11-04:** Zugewiesen, angenommen, abgeschlossen und verifiziert sind unterschiedliche Zustände.
- **ENTSCHEIDUNG 11-05:** Entscheidungen und Freigaben sind eigene versionierte Objekte.
- **ENTSCHEIDUNG 11-06:** Threads gehören immer zu einem fachlichen Kontext und können in ausführbare Objekte überführt werden.
- **ENTSCHEIDUNG 11-07:** Evidence Requests verwenden definierte Scope-, Qualitäts-, Aktualitäts- und Reviewkriterien.
- **ENTSCHEIDUNG 11-08:** Eskalation erhöht Autorität und Entscheidungskompetenz; sie ist keine reine Reminder-Kaskade.
- **ENTSCHEIDUNG 11-09:** In-App Inbox ist die kanonische Notification-Quelle; externe Kanäle sind Zustellwege.
- **ENTSCHEIDUNG 11-10:** Übergaben und Wiederaufnahme sind verbindliche Hauptwege der Plattform.
- **ENTSCHEIDUNG 11-11:** Meetingergebnisse werden in Decision Records, Work Items und Requests materialisiert.
- **ENTSCHEIDUNG 11-12:** Externe Zusammenarbeit erfolgt über kontrollierte, zeitlich begrenzte Datenräume.
- **ENTSCHEIDUNG 11-13:** Cross-Tenant-Zusammenarbeit darf nur aggregierte oder ausdrücklich freigegebene Informationen verwenden.
- **ENTSCHEIDUNG 11-14:** Zusammenarbeit wird primär über Flow, Outcome, Qualität und Verlässlichkeit gemessen, nicht über Nachrichtenmenge.
- **ENTSCHEIDUNG 11-15:** KI unterstützt Zusammenfassung und Vorbereitung, übernimmt aber keine fachliche Verantwortung oder Freigabe.

## 29. Begründete Annahmen

- **ANNAHME 11-A1:** Ein gemeinsames Work-Item-Modell reduziert doppelte Funktionen und inkonsistente Statuslogik.
- **ANNAHME 11-A2:** Owner akzeptieren Aufgaben eher, wenn Outcome, Kontext und Definition of Done verständlich sind.
- **ANNAHME 11-A3:** Kontextgebundene Threads verringern Zeit für Rekonstruktion gegenüber E-Mail- und Chatketten.
- **ANNAHME 11-A4:** Getrennte Zustände für Abschluss und Verifikation verbessern Evidence- und Auditqualität.
- **ANNAHME 11-A5:** Rollenbezogene Digests reduzieren Notification-Noise, ohne kritische Reaktionen zu verzögern.
- **ANNAHME 11-A6:** Ein sichtbarer Eskalationspfad führt schneller zur richtigen Entscheidung als häufigere Reminder.
- **ANNAHME 11-A7:** Handover Packets sind ein wesentlicher Qualitätshebel für Beratung, Audit, Support und Agentenbetrieb.
- **ANNAHME 11-A8:** Externe Contributor benötigen eine deutlich vereinfachte Oberfläche statt vollständiger Plattformnavigation.
- **ANNAHME 11-A9:** Wiederverwendbare Work Packages erhöhen Managed-Service-Skalierung, wenn Kundenentscheidungen nicht automatisch vorweggenommen werden.
- **ANNAHME 11-A10:** Kernworkflows können im Demonstrator mit synthetischen Kalender-, Reise-, SLA- und Kommunikationsdaten glaubwürdig simuliert werden.

## 30. Offene Fragen

- **OFFENE FRAGE 11-Q1:** Welche Work-Item-Typen werden in der ersten produktiven Version nativ unterstützt und welche über Templates abgebildet?
- **OFFENE FRAGE 11-Q2:** Welche Autoritäts- und Vier-Augen-Schwellen gelten je Zielbranche und Servicepaket?
- **OFFENE FRAGE 11-Q3:** Welche externen Kanäle werden zuerst integriert: E-Mail, Teams, Slack, Jira oder ServiceNow?
- **OFFENE FRAGE 11-Q4:** Welches System ist je Task-Typ führend, wenn Kunden bereits ITSM- oder Projekttools verwenden?
- **OFFENE FRAGE 11-Q5:** Welche Kommentare dürfen nachträglich bearbeitet oder gelöscht werden und wie wird dies angezeigt?
- **OFFENE FRAGE 11-Q6:** Welche Geschäftskalender, Pausenregeln und SLA-Definitionen werden im ersten Demonstrator umgesetzt?
- **OFFENE FRAGE 11-Q7:** Welche Gast- und Auditorfunktionen benötigen Download-, Wasserzeichen- oder View-only-Beschränkungen?
- **OFFENE FRAGE 11-Q8:** Welche Betriebsrats-, Datenschutz- und Arbeitsrechtanforderungen gelten für personenbezogene Collaboration-KPIs?
- **OFFENE FRAGE 11-Q9:** Welche Handover-Felder sind für Claude Code, Beratung, Audit und Servicebetrieb jeweils verpflichtend?
- **OFFENE FRAGE 11-Q10:** Welche Notification-Materialitätsschwellen sind für Executive, Berater und Owner sinnvoll?
- **OFFENE FRAGE 11-Q11:** Welche Offline-Funktionen werden für Vor-Ort-Audits und Reisen wirklich benötigt?
- **OFFENE FRAGE 11-Q12:** Wie werden vertrauliche interne Beratungsnotizen von kundenfreigabefähigen Inhalten getrennt?
- **OFFENE FRAGE 11-Q13:** Welche Meeting- und Kalenderintegration ist für die erste Version realistisch?
- **OFFENE FRAGE 11-Q14:** Welche Practice-Intelligence-Metriken sind mandantenübergreifend rechtlich und fachlich vertretbar?
- **OFFENE FRAGE 11-Q15:** Welche Regeln bestimmen, wann KI einen Thread zusammenfassen darf und welche Inhalte ausgeschlossen sind?

## 31. Ideen für später

- kollaborativer Decision Room für Management Reviews,
- sichere mobile Vor-Ort-Erfassung mit späterer Synchronisation,
- Sprachmemo zu strukturiertem Meeting Action Draft,
- automatische Erkennung wiederkehrender Blocker und Prozess-Mining,
- Skill-basierte Vorschläge für Reviewer und Vertretungen,
- anonymisierte Practice Benchmarks für Flow und Evidence-Qualität,
- visuelle Collaboration Map: Wer wartet worauf und warum?
- gemeinsame Lieferantenkampagnen mit kontrollierter Datenwiederverwendung,
- virtuelle War Rooms für kritische Veränderungen oder Audits,
- Konfliktmoderations-Assistent mit sichtbaren Positionen und offenen Einwänden,
- automatische Prüfung von SoD-Konflikten vor Zuweisung,
- persönlicher Fokusmodus mit Kalender- und Reiseoptimierung,
- „Warum wurde ich benachrichtigt?“-Erklärung für jedes Attention Item,
- organisationsübergreifende Handover-Standards für Anbieterwechsel,
- automatische Generierung von Lessons Learned aus verifizierten Outcomes,
- Digital-Signature-Unterstützung für besonders formale Freigaben,
- Service- und Audit-Chatbots nur als kontrollierte Frontends auf Work Items,
- simulationsgestützte Kapazitäts- und Eskalationsprognose.

## 32. Dokumentenabhängigkeiten

- **Dokument 00:** Master-Index, Projektverfassung, Status und zentrale Wahrheit.
- **Dokument 01:** Produktvision, Nutzen und skalierbarer Managed-Service-Business-Case.
- **Dokument 02:** Marktanforderungen und Differenzierung durch Decision- und Service-Orientierung.
- **Dokument 03:** Rollen, Arbeitskontexte und Entscheidungsrechte.
- **Dokument 04:** Nutzerreisen, Lifecycle, Übergaben und Fehlerreisen.
- **Dokument 05:** Module M21 bis M24 und vollständige Produktlandkarte.
- **Dokument 06:** Team Workspace, Decision Cards, Navigation, Trust Layer und Zustände.
- **Dokument 07:** fachlicher Objektkontext, Provenance, Historie und Graphbeziehungen.
- **Dokument 08:** ISMS-Workflows, Owner, Evidence, Audit, Freigabe und Eskalation.
- **Dokument 09:** Risiko-, Control-, Threat-, Reife- und Confidence-Semantik.
- **Dokument 10:** Priorisierung, Decision Cards, Missionen, KPIs und Value Ledger.
- **Dokument 12:** Berichtserstellung, Freigabe, Kommentare und Export derselben Datenbasis.
- **Dokument 13 bis 16:** Servicebetrieb, SLAs, Servicekatalog, Ressourcen und Onboarding.
- **Dokument 17:** Integrationen, Workflow-Designer, Events und Automatisierung.
- **Dokument 18:** technische Work-Item-, Event-, Notification- und Collaboration-Architektur.
- **Dokument 19:** Rollen, Rechte, Mandantentrennung, Datenschutz und Audit Logs.
- **Dokument 20A:** KI-Assistenz und Guardrails.
- **Dokument 20B:** virtuelle KI-Firma, Agentenrollen und Entscheidungsrechte.
- **Dokument 20C:** GitHub, Checkpoints, Handover und Claude-Code-Arbeitsweise.

## 33. Änderungsprotokoll

| Version | Datum | Änderung | Status |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstfassung des Kollaborations-, Work-Item-, Aufgaben-, Request-, Freigabe-, Kommunikations-, SLA-, Eskalations-, Handover- und Attention-Konzepts | Erstellt |
