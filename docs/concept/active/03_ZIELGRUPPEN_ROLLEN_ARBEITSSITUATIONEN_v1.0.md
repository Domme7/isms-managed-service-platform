# Dokument 03 - Zielgruppen, Rollen & reale Arbeitssituationen

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Abhängigkeiten:** Dokument 00 und Dokument 01  
**Zweck:** Verbindliche Definition von Zielgruppen, Produktrollen, Jobs-to-be-done und realen Nutzungskontexten.

> Dieses Dokument beschreibt Menschen und Arbeit - nicht nur Berechtigungen. Technische Rollen, konkrete Nutzerreisen und UI-Details werden in den Dokumenten 04, 06 und 19 weiter präzisiert.

## 1. Dokumentauftrag und Abgrenzung

Dokument 03 übersetzt die Produktvision in ein belastbares Nutzer- und Rollenmodell. Es definiert Verantwortungen, reale Arbeitsbedingungen, Entscheidungsrechte, Übergaben und Erwartungen an die Plattform.

**ENTSCHEIDUNG:** Das Produkt nutzt wenige kanonische Produktrollen mit konfigurierbaren Berechtigungen. Berufsbezeichnungen werden diesen Produktrollen zugeordnet, statt für jede Organisation neue Rollenlogik zu programmieren.

### Das Dokument legt fest
- primäre Käufer-, Betreiber- und Nutzergruppen;
- kanonische Produktrollen und Jobs-to-be-done;
- reale Nutzungssituationen einschließlich Zeitdruck, Reisen, Audits und Managementtermine;
- Zusammenarbeit, Übergaben, Entscheidungs- und Freigaberechte;
- adaptive Komplexität, Rollenwechsel, Demo-Accounts und Erfolgsmessung.

### Abgrenzung
Screenlayouts folgen in Dokument 06, technische Rechte in Dokument 19 und Agentenrollen der Entwicklungsorganisation in Dokument 20B.

## 2. Nutzer- und Betreiberökosystem

Die Plattform wird typischerweise von einem Beratungs- oder Managed-Service-Anbieter betrieben und von mehreren Kundenorganisationen genutzt. Fünf Rollenfamilien arbeiten auf einem gemeinsamen Datenmodell:

1. Executive & Governance;
2. Kunde / ISMS-Betrieb;
3. Beratung / Managed Service;
4. Assurance & Review;
5. Plattform & Betrieb.

### Primäre Zielgruppen

| Zielgruppe | Primärer Wert | Nutzungslogik |
|---|---|---|
| Beratungs- und Managed-Service-Anbieter | Mehr Mandanten pro Team, konsistente Delivery, wiederkehrender Umsatz | Betreiber, Käufer und Leistungserbringer |
| Regulierte oder sicherheitskritische Unternehmen | Kontinuierliche Zielnavigation und nachvollziehbare Entscheidungen | Kunde, Dateninhaber und Entscheider |
| Mittelstand mit begrenzter ISMS-Kapazität | Geführter Betrieb und modularer Support | Kunde mit hohem Managed-Service-Bedarf |
| Komplexe Unternehmensgruppen | Einheitensteuerung, Harmonisierung und Portfolio-Sicht | Mehrstufiger Kunde |

**ANNAHME:** Der erste Pilot eignet sich besonders für einen Serviceanbieter mit mehreren wiederkehrend betreuten Kunden.

## 3. Kanonisches Rollenmodell

| ID | Produktrolle | Sphäre | Kernverantwortung |
|---|---|---|---|
| R01 | Executive Sponsor | Kunde | Risiko-, Budget- und Zielentscheidungen |
| R02 | CISO / Security Lead | Kunde | Sicherheitssteuerung und Eskalation |
| R03 | ISMS Manager | Kunde | operativer ISMS-Betrieb |
| R04 | Business / Process Owner | Kunde | Business Impact und Risikoentscheidung |
| R05 | Asset / Control Owner | Kunde | Umsetzung und Wirksamkeit |
| R06 | Evidence Contributor | Kunde | begrenzte Zuarbeit und Nachweise |
| R07 | Auditor / Assurance Reviewer | Unabhängig | Prüfung und Nachvollziehbarkeit |
| R08 | Managed Service Lead | Betreiber | Serviceportfolio, Qualität und Kapazität |
| R09 | Engagement Manager | Betreiber | Kundenbeziehung, Scope und Delivery |
| R10 | ISMS Consultant | Betreiber | Analyse, Moderation, Steuerung und Reporting |
| R11 | Specialist Consultant | Betreiber | Spezialanalyse und Review |
| R12 | Tenant / Platform Administrator | Beide | Nutzer, Rollen, Konfiguration und Betrieb |

### Rollenprinzipien
- Eine Person kann mehrere Rollen besitzen; die aktive Rolle bleibt sichtbar.
- Zugriff folgt Mandant, Einheit, Objekt, Auftrag, Aufgabe und Zweck.
- Entscheidungsrechte werden als beraten, vorschlagen, bearbeiten, prüfen, freigeben, akzeptieren und administrieren getrennt.
- Vertretung und Delegation sind zeitlich begrenzt und protokolliert.
- Auditoren erhalten kontrollierte Prüfbereiche.
- Serviceanbieter sehen nur Daten innerhalb aktiver Aufträge und Scopes.

## 4. Executive- und Governance-Rollen

### Executive Sponsor
**Mission:** Geschäftsrisiken verstehen und rechtzeitig verantwortbare Entscheidungen treffen.  
**Jobs:** Zielerreichung, Top-Risiken, Budget, Risikoakzeptanz, Servicewirkung und Vorstandskommunikation.  
**Frust:** technische Details, scheinpräzise Scores, zu viele Maßnahmen, unklare Konsequenzen.  
**Plattformbedarf:** drei bis fünf Entscheidungen, Business Impact, Optionen, Wirkung, Unsicherheit und Verantwortlichkeit.

### CISO / Security Lead
**Mission:** Sicherheitsstrategie in umsetzbare Prioritäten und Eskalationen übersetzen.  
**Jobs:** Zielroute, Prioritäten, Risiken, Ressourcen, Services und Managementberichte.  
**Plattformbedarf:** Kausalität, Trends, Strategie-DNA, Investitionssimulation, Rollensichten und Reports.

### Risk / Compliance Leitung
**Mission:** Governance-Ziele harmonisieren und Doppelarbeit vermeiden.  
**Jobs:** Anforderungen konsolidieren, Mappings, Evidenzwiederverwendung, Reviews und Ausnahmen.  
**Plattformbedarf:** gemeinsame Control-Bibliothek, Cross-Framework-Status und Scope-Filter.

## 5. Operative Kundenrollen

### ISMS Manager
**Mission:** ISMS kontinuierlich und ohne Audit-Hektik betreiben.  
**Jobs:** Risiken, Maßnahmen, Owner, Nachweise, Reviews, Policies und Datenqualität.  
**Plattformbedarf:** Morning Mission, Wirkungspriorisierung, Eskalationen, integrierte Kommunikation und Deliverables.

### Business / Process Owner
**Mission:** Geschäftsauswirkung und Behandlung verständlich beurteilen.  
**Plattformbedarf:** Klartext, Prozesskontext, wenige Fragen, vorbefüllte Daten und Entscheidungsvorlagen.

### Asset / Control Owner
**Mission:** Controls wirksam umsetzen und belegen.  
**Plattformbedarf:** klare Definition of Done, Beispielnachweise, Objektbezug, Wiederverwendung und sichtbare Wirkung.

### Evidence Contributor
**Mission:** Eine begrenzte Zuarbeit schnell und korrekt erledigen.  
**Plattformbedarf:** One-task Experience, Deep Link, klare Sprache, Beispiele, sichere Uploads und Bestätigung.

## 6. Beratungs- und Managed-Service-Rollen

### Managed Service Lead
Steuert Portfolio, Qualität, Kapazität, Profitabilität, Standardisierung und Eskalationen.

### Engagement Manager
Verbindet Kundenbeziehung, Scope, Termine, Entscheidungen, Reisen und Delivery.

### ISMS Consultant
Betreut mehrere Mandanten, analysiert Risiken, moderiert Workshops, prüft Nachweise, unterstützt Audits und erzeugt Reports.

### Specialist Consultant
Bringt Spezialwissen gezielt und mit kompaktem Expert Briefing ein.

## 7. Assurance-, Administrations- und Supportrollen

### Auditor / Assurance Reviewer
Arbeitet in einem kontrollierten Read-only Audit Workspace mit Scope, Sampling, Evidenz, Herkunft, Q&A und Feststellungen.

### Tenant Administrator
Verwaltet Nutzer, Rollen, Organisation, Integrationen und Konfiguration mit sicheren Defaults, Vorschau und Änderungslog.

### Platform Operations / Support
Betreibt die Plattform über Privacy-preserving Observability und erhält Kundendatenzugriff nur genehmigt, zeitlich begrenzt und protokolliert.

## 8. Reale Arbeitssituationen

- Morgenstart eines Beraters mit vielen Mandanten, Reisen und Auditfristen;
- Vorstandstermin mit 20 Minuten Vorbereitungszeit;
- neue kritische Schwachstelle und automatische Betroffenheitsanalyse;
- Auditvorbereitung 90 Tage vor Start;
- Vor-Ort-Audit mit Reisezeit, Kosten und Vertretung;
- Management Review;
- einmalige Zuarbeit per Deep Link;
- transparente Serviceerweiterung;
- Rollenwechsel und Wissensübergabe;
- Empfehlung mit Datenlücke und sichtbarer Unsicherheit.

## 9. Rollenübergreifende Jobs-to-be-done

1. Orientieren - Veränderungen und Prioritäten sofort verstehen.
2. Erklären - Ursache, Datenbasis und Unsicherheit nachvollziehen.
3. Priorisieren - Optionen nach Wirkung und Machbarkeit vergleichen.
4. Zusammenarbeiten - Verantwortungen, Freigaben und Übergaben im Kontext steuern.
5. Nachweisen - Evidenz zuordnen, validieren und wiederverwenden.
6. Kommunizieren - zielgruppengerechte PDFs und PPTX erzeugen.
7. Service entscheiden - interne Umsetzung und Managed Service transparent vergleichen.
8. Lernen - tatsächliche Wirkung bestätigen und Zielroute neu berechnen.

**ZENTRALER JOB:** Hilf mir, unter realen Einschränkungen die nächste verantwortbare Entscheidung mit der größten erwarteten Wirkung zu treffen - und mache nachvollziehbar, wie wir dorthin gekommen sind.

## 10. Adaptive Nutzerführung

Die Plattform passt Tiefe an Fachreife, Nutzungsfrequenz, Entscheidungsebene, Datenqualität, Kundenziel und Gerät an. Anfänger erhalten Klartext, Beispiele und geführte Schritte. Power User erhalten Analyse, Mappings, Bulk-Aktionen und gespeicherte Sichten.

Mehrfachrollen werden unterstützt. Der aktive Modus ist sichtbar; Aktionen tragen Rolle, Mandant, Zeitpunkt und Datenstand.

## 11. Zusammenarbeit und Entscheidungsrechte

Jede relevante Aktivität besitzt fachlichen Owner, Bearbeiter, Prüfer/Freigeber und Eskalationsweg. Kritische Entscheidungen werden als strukturierte Decision Records gespeichert: Optionen, Begründung, Datenstand, Unsicherheit, Wirkung, Entscheider und spätere Überprüfung.

## 12. Zugriff, Datenschutz und Vertrauensgrenzen

- scope-basierter Zugriff;
- Need-to-know;
- temporäre und protokollierte Support- oder Auditorfreigabe;
- sichere und klassifizierte Exporte;
- sichtbare Trennung von Beratung, Betrieb und unabhängiger Prüfung.

**OFFENE FRAGE:** Welche Unabhängigkeitsregeln müssen im ersten Zielmarkt technisch erzwungen werden?

## 13. Demo-, Test- und Beispielrollen

Vier synthetische Organisationen:
- Nordwerk Manufacturing SE;
- Finovia Digital Bank AG;
- MediCore Health Services GmbH;
- Consulting Operator Demo.

Neun Demo-Accounts decken Service Lead, Engagement Manager, Berater, Executive, CISO, ISMS Manager, Control Owner, Auditor und Tenant Admin ab.

**ENTSCHEIDUNG:** Keine nichtöffentlichen PwC-Daten, realen Kundendaten, internen Preise oder geschützten Vorlagen.

## 14. Rollenbezogene Erfolgsindikatoren

Erfolg wird pro Rolle über Nutzungs- und Ergebnisindikatoren gemessen, etwa Entscheidungszeit, Koordinationsaufwand, Nachweisqualität, Mandanten pro Team, SLA, Auditdauer und Betriebsstabilität. Kennzahlen dienen nicht zur verdeckten individuellen Mitarbeiterüberwachung.

## 15. Entscheidungen, Annahmen und offene Fragen

### Entscheidungen
- 03-D01 Drei Erlebniswelten.
- 03-D02 Kanonische, kombinierbare Produktrollen.
- 03-D03 Getrennte Entscheidungsrechte.
- 03-D04 One-task Experience für seltene Nutzer.
- 03-D05 Reise, Vor-Ort, Kapazität und Vertretung werden berücksichtigt.
- 03-D06 Kontrollierter Audit Workspace.
- 03-D07 Transparente Serviceempfehlung mit interner Alternative.
- 03-D08 Mehrere synthetische Demo-Unternehmen.
- 03-D09 Strukturierte Decision Records.
- 03-D10 Keine verdeckte Mitarbeiterüberwachung.

### Annahmen
- Serviceanbieter ist erster Betreiber und Käufer.
- ISMS Manager und Consultant sind Power User.
- Executives bevorzugen wenige Entscheidungsoptionen.
- Evidence Contributors brauchen radikale Vereinfachung.
- Kanonische Rollen reduzieren Sonderentwicklung.
- Mehrfachrollen und Vertretungen sind unvermeidbar.
- Demo-Personas müssen später interviewbasiert validiert werden.

### Offene Fragen
- erster Pilottyp;
- fünf vollständig produktive Rollen in Version 1;
- größte reale Beraterzeitfresser;
- typische Mandantenzahl;
- Reise- und Offline-Anforderungen;
- formale Freigaben und Vier-Augen-Prinzip;
- Unabhängigkeitsregeln;
- Benchmark-Rechte;
- mobile Kernhandlungen;
- Barrierefreiheit und Sprachen.

## 16. Ideenparkplatz

- persönlicher Arbeitsmodus;
- Skill- und Staffing-Matching;
- Shadowing / Lernmodus;
- Community of Practice;
- Voice Briefing;
- Offline Audit Companion;
- Delegationsassistent;
- Stakeholder Sentiment.

## 17. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming, Dokument 00/01 und AI-Builder-Arbeitsmodell. |

## Nächster Schritt

Dokument 04 - Nutzerreisen und vollständiger Service-Lebenszyklus.
