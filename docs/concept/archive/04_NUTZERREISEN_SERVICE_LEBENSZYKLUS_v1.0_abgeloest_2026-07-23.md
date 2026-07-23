# Dokument 04 - Nutzerreisen & vollständiger Service-Lebenszyklus

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00, 01 und 03  
**Zweck:** Verbindliche Definition der vollständigen Nutzerreisen, Lebenszyklusphasen, Übergaben und Wiederanlaufpfade.

> Dieses Dokument beschreibt nicht nur den Idealweg. Es legt fest, wie die Plattform bei Unsicherheit, Datenlücken, abgelehnten Empfehlungen, Integrationsfehlern, Rollenwechseln und Serviceänderungen verständlich und sicher weiterführt.

## 1. Dokumentauftrag und Verbindlichkeit

Dokument 04 übersetzt Produktvision und Rollenmodell in konkrete, vollständige Abläufe. Es beschreibt, in welcher Situation ein Mensch die Plattform betritt, welche Frage er beantworten will, welche Informationen er benötigt, welche Entscheidung entsteht und wie das System nach Erfolg, Fehler oder Unterbrechung fortsetzt.

**ENTSCHEIDUNG:** Jede zentrale Funktion muss mindestens einer dokumentierten Nutzerreise dienen. Funktionsumfang ohne nachvollziehbaren Nutzer- oder Servicewert gehört nicht in den Produktkern.

### Das Dokument legt fest
- den vollständigen Kunden- und Service-Lebenszyklus vom Erstkontakt bis zur Übergabe;
- dreizehn priorisierte End-to-End-Nutzerreisen mit Rollen, Auslösern, Schritten, Ergebnissen und Fehlerpfaden;
- gemeinsame Erlebnisprinzipien, Zustände, Übergaben, Gates und Decision Records;
- Anfängerführung, Vertrauenssignale, menschliche Freigaben und sichere Wiederaufnahme;
- Messpunkte, Akzeptanzkriterien sowie Abhängigkeiten zu Produkt-, UX-, Technik- und Servicekonzepten.

### Abgrenzung
Konkrete Screenlayouts folgen in Dokument 06. Das fachliche Datenmodell und die ISMS-Objekte werden in Dokument 07 und 08 vertieft. Services, SLAs, Integrationen, Rechte und technische Architektur werden in den Dokumenten 13 bis 19 verbindlich spezifiziert.

### North-Star-Journey
Ein Nutzer soll von einer relevanten Veränderung innerhalb weniger Minuten zu einer verantwortbaren, nachvollziehbar dokumentierten Entscheidung und anschließend zu einer wirksamen Maßnahme gelangen - ohne Medienbruch und ohne den Zusammenhang zu Ziel, Risiko, Service und Nachweis zu verlieren.

## 2. Journey-Architektur

Alle Nutzerreisen folgen demselben Entscheidungsrhythmus:

1. **Orientieren:** Was hat sich verändert und warum betrifft es mich?
2. **Verstehen:** Warum ist das wichtig und womit hängt es zusammen?
3. **Entscheiden:** Welche Option ist unter unseren Rahmenbedingungen verantwortbar?
4. **Handeln:** Wer tut was bis wann - intern, automatisiert oder als Service?
5. **Nachweisen:** Wurde die Maßnahme korrekt und wirksam umgesetzt?
6. **Lernen:** Was ändert sich dadurch an Risiko, Route und Service?

### Übergreifende Prinzipien
- Ein gemeinsamer Datenraum für Kunde, Beratung und Prüfer mit rollen- und scopegerechten Sichten.
- Ein roter Faden aus Ziel, Ursache, Entscheidung, Verantwortlichem, Ergebnis und Nachweis.
- Keine Sackgassen: Abbruch, Fehler, fehlende Daten oder abgelehnte Empfehlungen erzeugen Rückkehrpfade.
- Fortsetzbarkeit nach Gerätewechsel, Vertretung, Reise oder späterem Login.
- Automatisierung darf vorbereiten; kritische Entscheidungen bleiben menschlich freigegeben.

## 3. Vollständiger Kunden- und Service-Lebenszyklus

1. **Entdecken:** Bedarf, Zielbild, Demo und Fit.
2. **Onboarden:** Organisation, Rollen, Scope und Strategie-DNA.
3. **Baselinen:** Ist-Zustand, Datenvertrauen, digitaler Zwilling und Zielroute.
4. **Aktivieren:** Serviceumfang, SLAs, Verantwortungen und Start.
5. **Betreiben:** Morning Mission, Risiken, Maßnahmen, Evidenz und Eskalationen.
6. **Prüfen:** Management Review, Audit, Wirkung und Servicequalität.
7. **Anpassen:** Ziel, Scope, Risiko oder Service ändern und Route neu berechnen.
8. **Übergeben:** Transition, Export, Wissenstransfer, Löschung und Abschluss.

**ENTSCHEIDUNG:** Kein Service beginnt allein durch einen algorithmischen Vorschlag. Aktivierung, Scope, Verantwortungen, Datenzugriffe und Kostenannahmen benötigen eine nachvollziehbare menschliche Freigabe.

## 4. Rollenübergreifender End-to-End-Entscheidungsfluss

Kunde, Plattform und Service-Team durchlaufen gemeinsam Orientieren, Bewerten, Entscheiden, Umsetzen sowie Nachweisen und Lernen. Übergaben enthalten Kontext, erwartetes Ergebnis, Definition of Done, Frist, Datenstand und Eskalationsweg.

### Journey-Zustände
- Entwurf
- Bereit zur Prüfung
- Freigegeben
- In Arbeit
- Blockiert
- Zur Wirksamkeitsprüfung
- Abgeschlossen
- Überholt

## 5. Einstieg, Onboarding und Zielbild

### J01 - Erster Kontakt, Demo und sichere Kontoaktivierung
**Zweck:** Ein neuer Nutzer versteht in wenigen Minuten den konkreten Wert für seine Rolle und betritt eine sichere, glaubwürdige Produktwelt.

**Primäre Rollen:** Executive Sponsor, CISO, Managed Service Lead, Engagement Manager.  
**Auslöser:** Demo-Interesse oder Einladung.  
**Ergebnis:** Aktivierter Account, verstandene Rolle, definierter Einstiegspunkt und nachvollziehbare Einwilligungen.

**Ablauf:**
1. Rolle und Ziel statt langer Featureliste abfragen.
2. Synthetische Beispielwelt oder geführte Demo klar als Demo kennzeichnen.
3. Zustand, nächste Entscheidung und Wirkung in höchstens drei Schritten zeigen.
4. Identität, Organisation, Einladung und Datenraum bestätigen.
5. Tour optional anbieten und späteres Wiederaufnehmen ermöglichen.
6. Datenschutz- und Vertraulichkeitsregeln passend zur Rolle bestätigen.

**Vertrauen:** Demo- und Echtdaten müssen eindeutig getrennt sein.  
**Fehlerpfad:** Abgelaufene Einladung, falsche Organisation oder fehlende Rechte führen zu Diagnose, erneutem Versand oder Admin-Anfrage.  
**Akzeptanz:** Ein Erstnutzer kann nach zwei Minuten Zweck, aktive Rolle und nächsten Schritt erklären.

### J02 - Organisation, Rollen und Scope onboarden
**Zweck:** Daten, Verantwortungen, Grenzen und spätere Services werden von Beginn an belastbar eingerichtet.

**Ablauf:** Organisation und Einheiten anlegen; Schnellstart, Workshop oder Import wählen; Scope und Ausschlüsse erfassen; Produktrollen und Vertretungen zuordnen; Lücken und Konflikte anzeigen; Onboarding Record bestätigen.

**Ergebnis:** Organisationsstruktur, Rollenmatrix, Scope v1, Datenverantwortung und Onboarding Record.

### J03 - Strategie-DNA und individuelles Zielprofil festlegen
**Zweck:** Das Unternehmen folgt einem realistischen, individuellen Zielzustand statt einem generischen Audit-Ideal.

**Ablauf:** Zielarten, Risikobereitschaft, Zeithorizont, Budgetkorridor, Kapazität und Managed-Service-Anteil erfassen; mehrere Zielrouten erzeugen; Konflikte und Annahmen erklären; Route freigeben und versionieren.

**Ergebnis:** Strategie-DNA, Zielprofil, Zielroute, Annahmen und Freigaben.

## 6. Baseline, Serviceaktivierung und täglicher Betrieb

### J04 - Ist-Zustand, Datenvertrauen und digitalen Zwilling aufbauen
Daten aus Importen, Integrationen, Workshops und manueller Erfassung werden mit Herkunft, Zeitpunkt, Owner und Vertrauensgrad zusammengeführt. Dubletten, Widersprüche und Datenlücken werden sichtbar. Ergebnis sind digitaler Zwilling v1, Baseline Report und priorisierte Datenlücken.

### J05 - Managed Service auswählen, abgrenzen und aktivieren
Für jeden Bedarf werden interne, unterstützte und Managed-Service-Optionen mit Ergebnis, Scope, Verantwortung, Datenzugriff, Frequenz, SLA-Annahme und Nutzen verglichen. Aktivierung erzeugt Service Charter, Missionen, Verantwortungen und Review-Termin.

### J06 - Morning Mission und täglicher ISMS-/Portfolio-Betrieb
Die Startseite beantwortet: Was hat sich verändert? Was ist heute wichtig? Welche Wirkung kann ich erzielen? Priorisierung berücksichtigt Zielbezug, Risiko, Frist, Abhängigkeiten, Datenvertrauen, Kapazität, Reise und SLA. Missionen bleiben Empfehlungen und dürfen keine verdeckte Mitarbeiterüberwachung bilden.

## 7. Veränderung, Umsetzung und Assurance

### J07 - Neue Bedrohung oder relevante Veränderung in eine Entscheidung übersetzen
Ein Signal wird mit Quelle und Verlässlichkeit aufgenommen, auf potenziell betroffene Objekte abgebildet, kausal erklärt und in Handlungsoptionen übersetzt. Ergebnis sind Decision Record, aktualisierte Risikolage, Maßnahmen und Review-Plan.

### J08 - Maßnahme, Control und Evidenz bis zur bestätigten Wirksamkeit steuern
Eine freigegebene Behandlung wird als Arbeitspaket mit Definition of Done, Owner, Abhängigkeiten und erwarteter Wirkung umgesetzt. Nachweise werden geprüft; Wirksamkeit wird getrennt von Umsetzung bestätigt. Risiko, Reifegrad und Zielroute werden aktualisiert.

### J09 - Audit planen, vorbereiten, vor Ort durchführen und nachbereiten
90/60/30-Tage-Missionen, kontrollierter Audit Workspace, Reise- und Ressourcenplanung, Findings-Mapping und direkte Überführung in Maßnahmen bilden einen durchgängigen Audit-Lebenszyklus. Audit-Readiness bleibt eine mögliche Zielperspektive, nicht das einzige Produktziel.

## 8. Management, Kommunikation und Veränderung

### J10 - Management Review und Investitionsentscheidung
Management erhält Zielstatus, Top-Geschäftsrisiken, Servicewirkung und wenige konkrete Entscheidungen. Optionen werden mit Nichtstun, Zeit, Budgetannahme, Risikowirkung und Abhängigkeiten verglichen. Simulationen sind Entscheidungshilfen, keine Garantien.

### J11 - PDF, PowerPoint und zielgruppengerechte Kommunikation erzeugen
Aus demselben Datenmodell entstehen Executive-Präsentation, Monatsbericht, Auditbericht oder Workshop-Unterlage. Anlass, Zielgruppe, Zeitraum, Scope, Sprache, Vertraulichkeit und Format sind konfigurierbar. Exporte werden freigegeben, versioniert und protokolliert.

### J12 - Ziel, Scope, Organisation oder Serviceumfang ändern
Ein Change Request löst Auswirkungsanalyse, Entscheidung, Migration und Versionierung aus. Historische Entscheidungen werden nicht rückwirkend verändert. Ein Rollback- oder Zwischenzustand schützt bei abgebrochener Migration.

### J13 - Service beenden, Anbieter wechseln oder Kundenwissen übergeben
Exit-Scope, Datenklassen, offene Risiken und Verantwortungen werden festgelegt. Ein Exit Package enthält Datenexport, Decision Records, Audit Trail, offene Maßnahmen und Betriebswissen. Rechte und Integrationen werden kontrolliert reduziert; Löschung und Aufbewahrung werden nachgewiesen.

## 9. Anfängererlebnis, Vertrauen und Wiederaufnahme

Ein vollständiger Anfänger erhält keine Fachbegriffs- oder Dashboardwand, sondern eine konkrete Aufgabe in Klartext. Die Oberfläche bietet Beispiele, „Ich weiß es nicht“, sichere Rückfrage, Bestätigung und einen sichtbaren nächsten Verantwortlichen.

### Vertrauenssignale
- Datenherkunft und Aktualität;
- sichtbarer Rollen- und Mandantenkontext;
- menschliche Freigabe kritischer Entscheidungen;
- Reversibilität und Versionen;
- sichtbare Unsicherheit;
- fachlich begründete Serviceoptionen ohne Verkaufsfalle.

### Universeller Wiederaufnahmepunkt
Nach Unterbrechung zeigt die Plattform letzten bestätigten Zustand, Änderungen seitdem, offene Entscheidung, gespeicherte Entwürfe, nächsten Schritt und mögliche Vertretung.

## 10. Fehler-, Sonder- und Eskalationsreisen

Wesentliche Fälle sind Integrationsausfall, widersprüchliche Daten, abgelehnte Empfehlung, nicht reagierender Owner, Rollenwechsel, Auditverschiebung, KI/API-Ausfall, sensibler Export, unklarer Mandantenkontext und fehlendes Budget oder Kapazität.

**ENTSCHEIDUNG:** Kritische Kernreisen müssen ohne generative KI funktionsfähig bleiben.

## 11. Journey-Messung und Service-Erfolg

Messbereiche sind Time to Value, Time to Decision, Time to Evidence, bestätigte Wirksamkeit, Servicequalität, Verständlichkeit, Vertrauen und Portabilität. Rohe Aktivität oder Uploadmenge sind keine ausreichenden Erfolgsindikatoren.

Für jede produktive Reise werden mindestens ein Nutzertest, Fehlerfalltest, Rechte-/Mandantentest, Datenqualitätsfall und Wiederaufnahmetest definiert.

## 12. Verbindliche Entscheidungen

- 04-D01: Rhythmus Orientieren - Verstehen - Entscheiden - Handeln - Nachweisen - Lernen.
- 04-D02: Lebenszyklus Entdecken bis Übergeben.
- 04-D03: Sichere Fehler-, Abbruch- und Wiederaufnahmepfade.
- 04-D04: Kundenindividuelle Zielprofile; Audit-Readiness ist nur eine Zielart.
- 04-D05: Transparenter Vergleich interner, unterstützter und Managed-Service-Pfade.
- 04-D06: Menschliche Freigabe für Scope, Aktivierung und risikorelevante Entscheidungen.
- 04-D07: Datenherkunft, Aktualität, Unsicherheit und Vertrauensgrad sind Teil der Reise.
- 04-D08: Umsetzung, Evidenz und Wirksamkeit sind getrennte Zustände.
- 04-D09: Reise, Vor-Ort, Abwesenheit, Vertretung und Kapazität beeinflussen Planung.
- 04-D10: PDF/PPTX entstehen aus demselben Datenmodell und werden freigegeben.
- 04-D11: Kritische Kernreisen funktionieren ohne generative KI.
- 04-D12: Exit und Datenportabilität sind Produktfunktionen.
- 04-D13: Historische Entscheidungen werden nicht überschrieben.
- 04-D14: Journey-Metriken dienen nicht verdeckter Mitarbeiterüberwachung.

## 13. Begründete Annahmen

- Erste Nutzung wahrscheinlich mit Serviceanbieter und mehreren Pilotmandanten.
- ISMS Manager und Consultants sind tägliche Power User.
- Der digitale Zwilling wächst schrittweise aus einer unvollständigen Baseline.
- Transparente Alternativen erhöhen Akzeptanz von Serviceempfehlungen.
- Automatisierte Priorisierung braucht Gründe und Übersteuerbarkeit.
- PPTX/PDF-Generierung erzeugt hohen Alltags- und Demo-Nutzen.
- Reise und Vor-Ort-Audit bleiben relevant.
- SLA-, Preis- und Vertragslogik folgt in Dokument 14.

## 14. Offene Fragen

- primärer Pilot- und Kundentyp;
- fünf zuerst vollständig produktive Reisen;
- Managementfreigaben und Schwellenwerte;
- Offline-Tiefe für Vor-Ort-Audits;
- Kalender-, Reise- und Ressourcenintegrationen;
- maschinenlesbares Exit Package;
- zulässige Journey-Metriken auf Personenebene;
- Sprachen und Barrierefreiheit;
- Benchmark-Rechte;
- realistische Preis- und Vertragsdarstellung im Demo-Modus.

## 15. Ideenparkplatz

- Voice Briefing;
- Offline Audit Companion;
- Journey Replay;
- Service Sandbox;
- Stakeholder Sentiment;
- adaptive Lernreise;
- anonymisierte Cross-Customer Patterns;
- Executive Scenario Room.

## 16. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming, Dokument 00-03 und AI-Builder-Arbeitsmodell. |

## Nächster Schritt

Dokument 05 - Produktlandkarte und vollständiger Funktionsumfang.
