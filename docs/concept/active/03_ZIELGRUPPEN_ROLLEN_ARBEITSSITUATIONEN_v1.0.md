# Dokument 03 - Zielgruppen, Rollen & reale Arbeitssituationen

> **Re-Ableitung:** 2026-07-23 | Quell-PDF: `Dokument_03_Zielgruppen_Rollen_Arbeitssituationen_v1.0.pdf` | Bei jeder Abweichung zwischen dieser Arbeitsfassung und dem PDF gilt das PDF (DR-0006).
>
> **Nummerierungs-Konkordanz alt → neu** (alte Arbeitsfassung, archiviert als `docs/concept/archive/03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0_abgeloest_2026-07-23.md` → diese Fassung nach PDF-Folientiteln). Die Hauptnummern 1-17 sind unverändert; verschoben bzw. neu ist die zweite Gliederungsebene, außerdem weichen sechs Haupttitel ab:
>
> | Alt (Arbeitsfassung) | Neu (PDF-Folientitel) |
> |---|---|
> | §1, Unterüberschrift „Das Dokument legt fest" (unnummeriert) | §1.1 „Dieses Dokument legt fest" |
> | §1, Unterüberschrift „Abgrenzung" (unnummeriert) | §1.2 „Bewusste Abgrenzung" |
> | §2, Unterüberschrift „Primäre Zielgruppen" (unnummeriert) | §2.1 „Primäre Zielgruppen" |
> | §3, Unterüberschrift „Rollenprinzipien" (unnummeriert) | §3.1 „Rollenprinzipien" |
> | §8 „Reale Arbeitssituationen" | §8 „Reale Arbeitssituationen und Nutzungsmomente" (Titeländerung) |
> | §10 „Adaptive Nutzerführung" | §10 „Kontext, Reife und adaptive Nutzerführung" (Titeländerung) |
> | - (ohne Entsprechung) | §10.1 „Anfängererlebnis" |
> | §10, zweiter Fließtextabsatz | §10.2 „Rollenwechsel und Mehrfachrollen" |
> | §11 „Zusammenarbeit und Entscheidungsrechte" | §11 „Zusammenarbeit, Handoffs und Entscheidungsrechte" (Titeländerung) |
> | - (ohne Entsprechung) | §12.1 „Unabhängigkeit und Interessenkonflikte" |
> | §13, Fließtextsatz zu Demo-Accounts | §13.1 „Verbindliche Demo-Accounts" |
> | §14 „Rollenbezogene Erfolgsindikatoren" | §14 „Rollenbezogene Erfolgs- und Qualitätsindikatoren" (Titeländerung) |
> | §15, Unterüberschriften „Entscheidungen" / „Annahmen" / „Offene Fragen" (unnummeriert) | §15.1 „Globale Entscheidungen dieses Dokuments" / §15.2 „Begründete Annahmen" / §15.3 „Noch offene Fragen" |
> | §16 „Ideenparkplatz" | §16 „Ideenparkplatz und spätere Erweiterungen" (Titeländerung) |
> | - (ohne Entsprechung) | §16.1 „Akzeptanzkriterien für nachfolgende Dokumente" |
> | §17 „Änderungsprotokoll" + unnummerierter Abschnitt „Nächster Schritt" | §17 „Änderungsprotokoll und nächster Schritt" |
>
> **PDF-interne Nummerierungskonflikte:** keine festgestellt. Die Folientitel-Zählung 1-17 ist durchgängig; eine abweichende Navigationsleisten- oder Inhalt-Zeilen-Zählung existiert in diesem PDF nicht.
>
> **Benannte, nicht aufgelöste PDF-interne Auffälligkeiten:**
> - §4 enthält den Steckbrief „Risk / Compliance Leitung" und §7 den Steckbrief „Platform Operations / Support"; beide Rollen tragen keine ID im kanonischen Rollenmodell (§3, R01-R12). Damit stehen 14 Rollensteckbriefe 12 kanonischen Rollen gegenüber.
> - Die Zwischenzeile zu §2 lautet „Drei Erlebniswelten, fünf Rollenfamilien, ein gemeinsames Datenmodell"; das PDF benennt die fünf Rollenfamilien an keiner Stelle. (Die alte Arbeitsfassung hatte hier eine Fünfer-Liste erfunden; sie ist ersatzlos entfallen.)
>
> **Gekennzeichnete Lücken und Transkriptionshinweise:**
> - Abbildung 1 (§2) und Abbildung 2 (§8): Nur die Bildunterschriften sind textlich extrahierbar; der grafische Inhalt ist nicht übertragen (visuelle PDF-Prüfung war in der Re-Ableitungsumgebung nicht möglich). Benannte Quellenlücke, Befund im WP-019-Nachtrag.
> - §9 und §11: Die Spaltengrenzen der Tabellen wurden anhand der Spaltenköpfe rekonstruiert, weil die Textextraktion Zellen verschmilzt; Stichproben gegen die wörtlichen Zitate des Abgleichberichts vom 2026-07-23 sind deckungsgleich.
> - Steckbrief „Engagement Manager" (§6): Die Feldreihenfolge ist auf die einheitliche Kartenreihenfolge (MISSION zuerst) normalisiert; im extrahierten Text war sie durch einen Seitenumbruch verschoben. Wortlaut unverändert.
>
> Zitierregel: immer den **Abschnittstitel** zitieren, nicht nur die Nummer. Diese Kopfnotiz ist Nicht-PDF-Inhalt.

Nutzer- und Rollenmodell für eine Plattform, die Management, Kunden-ISMS und Managed-Service-Delivery in einem gemeinsamen Daten- und Entscheidungsraum verbindet.

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Dokumentstatus:** Erstellt - Version 1.0  
**Stand:** 21. Juli 2026  
**Abhängigkeiten:** Dokument 00 und Dokument 01  
**Zweck:** Verbindliche Definition von Zielgruppen, Produktrollen, Jobs-to-be-done und realen Nutzungskontexten

*Vertraulicher Konzeptentwurf - neutrale Produktentwicklung*

> Dieses Dokument beschreibt Menschen und Arbeit - nicht nur Berechtigungen. Technische Rollen, konkrete Nutzerreisen und UI-Details werden in den Dokumenten 04, 06 und 19 weiter präzisiert.

## 1. Dokumentauftrag und Abgrenzung

*Wer nutzt die Plattform, in welcher Realität und mit welchem Erfolgskriterium?*

Dokument 03 übersetzt die Produktvision in ein belastbares Nutzer- und Rollenmodell. Es definiert nicht nur Personas, sondern auch Verantwortungen, reale Arbeitsbedingungen, Entscheidungsrechte, Übergaben und die Erwartungen an die Plattform. Ziel ist, dass spätere Funktionen nicht für abstrakte „User", sondern für konkrete Arbeitssituationen gestaltet werden.

> **ENTSCHEIDUNG:** Das Produkt nutzt wenige kanonische Produktrollen mit konfigurierbaren Berechtigungen. Berufsbezeichnungen eines Kunden oder Beratungsunternehmens werden diesen Produktrollen zugeordnet, statt für jede Organisation neue Rollenlogik zu programmieren.

### 1.1 Dieses Dokument legt fest

- primäre Käufer-, Betreiber- und Nutzergruppen;
- kanonische Produktrollen und ihre Ziele, Frustpunkte und Jobs-to-be-done;
- reale Nutzungssituationen einschließlich Zeitdruck, Reisen, Audits und Managementtermine;
- Zusammenarbeit, Übergaben, Entscheidungs- und Freigaberechte;
- Prinzipien für adaptive Komplexität, Rollenwechsel, Demo-Accounts und Erfolgsmessung.

### 1.2 Bewusste Abgrenzung

Dokument 03 definiert keine finalen Screenlayouts, kein vollständiges IAM-Berechtigungsmodell und keine Stellenbeschreibungen eines konkreten Unternehmens. UI-Zustände folgen in Dokument 06, technische Rechte in Dokument 19 und Agentenrollen der Entwicklungsorganisation in Dokument 20B.

> **DESIGN-THINKING-REGEL:** Eine Rolle ist nicht durch ihren Titel definiert, sondern durch Situation, Ziel, Informationsbedarf, Verantwortung, Unsicherheit und Konsequenz einer Entscheidung. Das Produkt muss diese Realität abbilden.

## 2. Nutzer- und Betreiberökosystem

*Drei Erlebniswelten, fünf Rollenfamilien, ein gemeinsames Datenmodell*

Die Plattform wird typischerweise von einem Beratungs- oder Managed-Service-Anbieter betrieben und von mehreren Kundenorganisationen genutzt. Innerhalb eines Kunden arbeiten Management, ISMS-Verantwortliche, fachliche Owner, Nachweislieferanten und Auditoren zusammen. Beim Betreiber koordinieren Serviceleitung, Engagement Management und Fachberater ein Portfolio aus Mandanten.

*Abbildung 1: Rollenökosystem der Plattform.* [Grafikinhalt nicht übertragen - siehe Re-Ableitungs-Kopfnotiz]

### 2.1 Primäre Zielgruppen

| Zielgruppe | Primärer Wert | Typische Kauf-/Nutzungslogik |
|---|---|---|
| Beratungs- und Managed-Service-Anbieter | Mehr Mandanten pro Team, konsistente Delivery, wiederkehrender Umsatz, sichtbarer Servicewert | Betreiber, Käufer, Administrator und Leistungserbringer |
| Regulierte oder sicherheitskritische Unternehmen | Kontinuierliche Zielnavigation, nachvollziehbare Entscheidungen, Entlastung durch Services | Kunde, Dateninhaber, Entscheider und Mitwirkender |
| Mittelständische Unternehmen mit begrenzter ISMS-Kapazität | Geführter Betrieb, klare Prioritäten, modularer externer Support | Kunde mit hohem Bedarf an Anleitung und Managed Services |
| Komplexe Unternehmensgruppen | Mandanten-/Einheitensteuerung, harmonisierte Standards, Portfolio- und Benchmark-Sicht | Mehrstufiger Kunde mit zentralen und lokalen Rollen |

> **ANNAHME:** Der erste belastbare Pilot eignet sich besonders für einen Beratungs- oder Managed-Service-Anbieter mit mehreren wiederkehrend betreuten Kunden. Direkter Self-Service für Einzelunternehmen bleibt möglich, ist aber nicht der primäre Startfall.

## 3. Kanonisches Rollenmodell

*Produktrollen statt unkontrollierter Titelsammlung*

Die Plattform trennt fachliche Produktrollen von konkreten Jobtiteln. Ein „CISO" kann je nach Organisation Executive Sponsor, Security Lead oder Freigabeverantwortlicher sein. Ein Berater kann gleichzeitig Engagement Manager und ISMS Specialist sein. Rollen sind kombinierbar, aber ihre Entscheidungsrechte bleiben transparent.

| ID | Produktrolle | Sphäre | Kernverantwortung |
|---|---|---|---|
| R01 | Executive Sponsor | Kunde | Strategische Entscheidungen, Risikoakzeptanz, Budget und Managementkommunikation |
| R02 | CISO / Security Lead | Kunde | Sicherheitssteuerung, Eskalation, Prioritäten und Managementübersetzung |
| R03 | ISMS Manager | Kunde | Operativer ISMS-Betrieb, Koordination, Reviews, Maßnahmen und Nachweise |
| R04 | Business / Process Owner | Kunde | Geschäftsauswirkung, Schutzbedarf, Priorität und Risikoentscheidung |
| R05 | Asset / Control Owner | Kunde | Umsetzung und Wirksamkeit konkreter Assets oder Controls |
| R06 | Evidence Contributor | Kunde | Nachweise, Statusupdates und fachliche Zuarbeit |
| R07 | Auditor / Assurance Reviewer | Unabhängig | Prüfung, Stichprobe, Feststellung und Nachvollziehbarkeit |
| R08 | Managed Service Lead | Betreiber | Serviceportfolio, Qualität, Kapazität, Profitabilität und Eskalation |
| R09 | Engagement Manager | Betreiber | Mandantenbeziehung, Scope, Termine, Entscheidungen und Delivery-Steuerung |
| R10 | ISMS Consultant | Betreiber | Analyse, Moderation, Maßnahmensteuerung, Reporting und Beratung |
| R11 | Specialist Consultant | Betreiber | Spezialanalyse etwa Cloud, IAM, BCM, Supplier Risk oder Threats |
| R12 | Tenant / Platform Administrator | Beide | Nutzer, Rollen, Konfiguration, Integrationen und Betriebsfähigkeit |

### 3.1 Rollenprinzipien

- Eine Person kann mehrere Rollen besitzen; jede Aktion zeigt jedoch, in welcher Rolle sie handelt.
- Zugriff folgt Mandant, Organisationseinheit, Objektbezug, Aufgabe und Zweck - nicht nur einem globalen Rollennamen.
- Entscheidungsrechte sind explizit: beraten, vorschlagen, bearbeiten, prüfen, freigeben, akzeptieren, administrieren.
- Vertretung und Delegation sind zeitlich begrenzt, nachvollziehbar und widerrufbar.
- Externe Auditoren erhalten einen kontrollierten Prüfbereich statt pauschalem Vollzugriff.
- Serviceanbieter sehen nur Kunden und Daten, für die ein aktiver Auftrag und Scope besteht.

## 4. Executive- und Governance-Rollen

*Wenige, hochwertige Entscheidungen statt operativer Tabellen*

#### Executive Sponsor

**KUNDENROLLE**

**MISSION:** Geschäftsrisiken verstehen und rechtzeitig verantwortbare Entscheidungen treffen.

**ARBEITSKONTEXT:** Nutzt die Plattform vor Management Reviews, Budgetrunden, Eskalationen oder nach relevanten Veränderungen. Meist wenige Minuten, oft mobil oder zwischen Terminen.

**WICHTIGSTE JOBS:** Zielerreichung verstehen; Top-Risiken bewerten; Budget- oder Risikoentscheidungen freigeben; Servicewirkung nachvollziehen; Vorstandsfähige Unterlagen erhalten.

**FRUST & RISIKEN:** Technische Details ohne Geschäftskontext; scheinpräzise Scores; zu viele offene Maßnahmen; unklare Konsequenzen des Nichtstuns.

**WAS DIE PLATTFORM LIEFERN MUSS:** Executive Summary, drei bis fünf Entscheidungen, Business Impact, Optionen, erwartete Wirkung, Unsicherheit und klare Verantwortlichkeit.

**ENTSCHEIDUNGEN / FREIGABEN:** Budget, Zielprofil, Risikoakzeptanz, strategische Prioritäten, wesentliche Scope- und Serviceänderungen.

**ERFOLGSSIGNALE:** Entscheidungen werden schneller und mit nachvollziehbarer Begründung getroffen; weniger Rückfragen; Managementunterlagen sind sofort nutzbar.

#### CISO / Security Lead

**KUNDENROLLE**

**MISSION:** Sicherheitsstrategie in umsetzbare Prioritäten, Entscheidungen und Eskalationen übersetzen.

**ARBEITSKONTEXT:** Arbeitet regelmäßig im System, wechselt zwischen Executive-, Portfolio- und Detailperspektive. Muss Management, IT und Fachbereiche verbinden.

**WICHTIGSTE JOBS:** Sicherheitslage steuern; Zielroute überwachen; Prioritäten setzen; Risiken eskalieren; Ressourcen argumentieren; Managed Services bewerten.

**FRUST & RISIKEN:** Fragmentierte Daten; Konflikt zwischen Fachlichkeit, Budget und Kapazität; fehlende Wirkungssicht; Berichte werden manuell neu gebaut.

**WAS DIE PLATTFORM LIEFERN MUSS:** Kausalität, Trends, Strategie-DNA, Investitionssimulation, Rollen-Drill-down, Managementberichte und transparente Serviceoptionen.

**ENTSCHEIDUNGEN / FREIGABEN:** Priorisierung, Eskalationsschwellen, Risikoempfehlungen, Freigabe von Reports; formale Risikoakzeptanz je Governance-Modell.

**ERFOLGSSIGNALE:** Verbesserte Zielerreichung, geringere Zeit für Konsolidierung, sichtbare Risikoreduktion und verlässliche Managementkommunikation.

#### Risk / Compliance Leitung

**KUNDENROLLE**

**MISSION:** Mehrere Governance-Ziele harmonisieren und widersprüchliche Anforderungen vermeiden.

**ARBEITSKONTEXT:** Nutzt Mapping-, Portfolio- und Reporting-Sichten periodisch; arbeitet häufig mit mehreren Standards, Einheiten und Prüfern.

**WICHTIGSTE JOBS:** Anforderungen konsolidieren; Überschneidungen erkennen; Governance-Reviews vorbereiten; Evidenzen wiederverwenden; Ausnahmen überwachen.

**FRUST & RISIKEN:** Doppelte Controls und Nachweise; unterschiedliche Taxonomien; unklare Verantwortlichkeit; Audit- und Regulierungsinseln.

**WAS DIE PLATTFORM LIEFERN MUSS:** Gemeinsame Control-Bibliothek, Mapping, Scope-Filter, wiederverwendbare Evidenz, Cross-Framework-Status und Ausnahmenlogik.

**ENTSCHEIDUNGEN / FREIGABEN:** Governance-Methodik, Kontrollrahmen, Ausnahmeprozess und Berichtsanforderungen.

**ERFOLGSSIGNALE:** Weniger Doppelarbeit, konsistente Aussagen über Frameworks und schnellere Prüfvorbereitung.

## 5. Operative Kundenrollen

*Der tägliche Betrieb muss geführt, nicht nur dokumentiert werden*

#### ISMS Manager

**KUNDENROLLE**

**MISSION:** Das ISMS kontinuierlich, nachweisbar und ohne permanente Audit-Hektik betreiben.

**ARBEITSKONTEXT:** Beginnt mit Morning Mission, koordiniert über den Tag Owner und Berater, prüft Veränderungen und bereitet Reviews vor.

**WICHTIGSTE JOBS:** Risiken und Maßnahmen steuern; Owner koordinieren; Nachweise prüfen; Reviews planen; Policies lenken; Datenlücken schließen; Status kommunizieren.

**FRUST & RISIKEN:** Listen in mehreren Tools; Nachweise per E-Mail; unklare Priorität; Erinnerungsschleifen; Fortschritt ohne Wirkung; starke Abhängigkeit von Einzelpersonen.

**WAS DIE PLATTFORM LIEFERN MUSS:** Geführter Arbeitsfluss, Wirkungspriorisierung, Vorlagen, Eskalationen, integrierte Kommunikation, Zielroute und automatisch vorbereitete Deliverables.

**ENTSCHEIDUNGEN / FREIGABEN:** Operative Priorität, fachliche Plausibilisierung, Review-Freigabe, Eskalation; strategische Entscheidungen werden vorbereitet.

**ERFOLGSSIGNALE:** Weniger Koordinationszeit, geringere Überfälligkeit, höhere Nachweisqualität und kontinuierliche statt stichtagsbezogene Pflege.

#### Business / Process Owner

**KUNDENROLLE**

**MISSION:** Geschäftsauswirkung und notwendige Behandlung verständlich beurteilen.

**ARBEITSKONTEXT:** Wird ereignis- oder terminbezogen eingebunden: Schutzbedarf, Risikoentscheidung, Ausfallwirkung, Freigabe oder Ausnahme.

**WICHTIGSTE JOBS:** Auswirkung beschreiben; Kritikalität bestätigen; Risikooptionen bewerten; Ressourcen bereitstellen; Ausnahme oder Akzeptanz begründen.

**FRUST & RISIKEN:** Sicherheitsjargon; lange Formulare; unklarer eigener Beitrag; wiederholte Datenerhebung; fehlende Verbindung zum Prozess.

**WAS DIE PLATTFORM LIEFERN MUSS:** Klartext, Prozesskontext, wenige relevante Fragen, vorbefüllte Daten, Entscheidungsvorlage und sichtbare Konsequenz.

**ENTSCHEIDUNGEN / FREIGABEN:** Business Impact, Priorität, Akzeptanz innerhalb Schwellenwerten, fachlicher Owner und Umsetzungsfenster.

**ERFOLGSSIGNALE:** Hohe Rücklaufquote, belastbare Business-Impact-Daten und weniger Schleifen mit ISMS-Team.

#### Asset / Control Owner

**KUNDENROLLE**

**MISSION:** Controls wirksam umsetzen und ihren Zustand glaubwürdig belegen.

**ARBEITSKONTEXT:** Arbeitet in Aufgaben, Objekt-360-Ansichten und Integrationssignalen. Oft technische oder organisatorische Nebenrolle mit begrenzter Zeit.

**WICHTIGSTE JOBS:** Status aktualisieren; Maßnahmen durchführen; Wirksamkeit erklären; Nachweise liefern; Abweichungen melden; Folgeaufgaben planen.

**FRUST & RISIKEN:** Unklare Anforderungen; doppelte Nachweise; Aufgaben ohne Kontext; Bewertung nach Checkbox statt Wirksamkeit.

**WAS DIE PLATTFORM LIEFERN MUSS:** Konkrete Definition of Done, Beispielnachweise, Objektbezug, Wiederverwendung, automatisierte Evidenz und sichtbare Wirkung.

**ENTSCHEIDUNGEN / FREIGABEN:** Umsetzungsstatus, Nachweis, fachliche Wirksamkeitseinschätzung und Eskalation von Blockern.

**ERFOLGSSIGNALE:** Höhere First-time-right-Quote, weniger Rückfragen und aktuellere Control-Daten.

#### Evidence Contributor

**KUNDENROLLE**

**MISSION:** Eine klar begrenzte Zuarbeit schnell und korrekt erledigen.

**ARBEITSKONTEXT:** Seltene Nutzung per Deep Link oder Benachrichtigung; kennt weder das gesamte ISMS noch die Plattform im Detail.

**WICHTIGSTE JOBS:** Ein Dokument hochladen; Frage beantworten; Termin bestätigen; Nachweis erneuern; Kommentar geben.

**FRUST & RISIKEN:** Komplexe Navigation, unklare Sprache, zu große Berechtigungen, fehlende Beispiele, keine Rückmeldung nach Abgabe.

**WAS DIE PLATTFORM LIEFERN MUSS:** One-task Experience, klarer Zweck, minimale Felder, sichere Uploads, Beispiele, Frist, Bestätigung und Ansprechpartner.

**ENTSCHEIDUNGEN / FREIGABEN:** Nur Zuarbeit im zugewiesenen Scope; keine Risiko- oder Freigabeentscheidung.

**ERFOLGSSIGNALE:** Kurze Bearbeitungszeit, hohe Vollständigkeit, wenige Supportanfragen und nachvollziehbare Herkunft.

## 6. Beratungs- und Managed-Service-Rollen

*Portfolio-Management, Delivery und Kundenbeziehung müssen gemeinsam skalieren*

#### Managed Service Lead

**BETREIBERROLLE**

**MISSION:** Qualität, Kapazität, Profitabilität und Weiterentwicklung des Serviceportfolios steuern.

**ARBEITSKONTEXT:** Blickt über viele Mandanten, Teams und Servicepakete. Arbeitet in Wochen-, Monats- und Quartalszyklen sowie bei Eskalationen.

**WICHTIGSTE JOBS:** Portfoliozustand überwachen; Kapazität verteilen; SLA/Qualität prüfen; Standardisierung treiben; Serviceangebote entwickeln; Eskalationen steuern.

**FRUST & RISIKEN:** Fehlende Vergleichbarkeit; unsichtbare Delivery-Kosten; manuelle Ressourcenplanung; Qualität hängt von Einzelpersonen ab.

**WAS DIE PLATTFORM LIEFERN MUSS:** Portfolio Heatmap, Kapazitäts- und Reiseplanung, Service-KPIs, Profitabilitätstreiber, Standardisierungs- und Automatisierungschancen.

**ENTSCHEIDUNGEN / FREIGABEN:** Ressourcen, Servicevarianten, Eskalation, Qualitätsmaßnahmen und operative Prioritäten innerhalb Governance.

**ERFOLGSSIGNALE:** Mehr Mandanten pro Team bei stabiler Qualität, weniger Firefighting und sichtbarer Servicewert.

#### Engagement Manager

**BETREIBERROLLE**

**MISSION:** Kundenbeziehung, Scope, Entscheidungen und Delivery verlässlich zusammenführen.

**ARBEITSKONTEXT:** Wechselt täglich zwischen Kundenterminen, interner Steuerung, Reiseplanung und Managementkommunikation.

**WICHTIGSTE JOBS:** Mandantenlage verstehen; Termine und Entscheidungen vorbereiten; Scope steuern; Risiken eskalieren; Reports freigeben; Opportunities qualifizieren.

**FRUST & RISIKEN:** Informationen über Chats, Mails und Dateien verteilt; Folienarbeit; unklare nächste Schritte; Reisezeit nicht eingeplant.

**WAS DIE PLATTFORM LIEFERN MUSS:** Kunden-Executive-Summary, Decision Log, Termin-/Auditkalender, Reise- und Kapazitätssicht, Report-Generator und begründete Serviceoptionen.

**ENTSCHEIDUNGEN / FREIGABEN:** Kundenkommunikation, operative Scope-Interpretation, Deliverable-Freigabe und Eskalation an Serviceleitung.

**ERFOLGSSIGNALE:** Weniger Vorbereitungszeit, höhere Termintrefferquote, klarere Entscheidungen und bessere Kundenzufriedenheit.

#### ISMS Consultant

**BETREIBERROLLE**

**MISSION:** Mehrere Mandanten fachlich hochwertig betreuen, ohne Routinearbeit jedes Mal neu zu erzeugen.

**ARBEITSKONTEXT:** Startet mit Portfolio-Morning-Briefing, arbeitet in Kunden-360-Ansichten, moderiert Workshops, reist zu Audits und erstellt Deliverables.

**WICHTIGSTE JOBS:** Risiken analysieren; Workshops vorbereiten; Maßnahmen priorisieren; Nachweise prüfen; Audits unterstützen; Reports erzeugen; Kunden beraten.

**FRUST & RISIKEN:** Excel-Konsolidierung, Copy-Paste, Nachweisjagd, Präsentationsbau, Kontextwechsel und identische Arbeit über Mandanten hinweg.

**WAS DIE PLATTFORM LIEFERN MUSS:** Wiederverwendbare Workflows, Vorlagen, Kausalitätsansicht, automatisierte Reports, klare Übergaben, Wissensvorschläge und realistische Tagesplanung.

**ENTSCHEIDUNGEN / FREIGABEN:** Fachliche Empfehlung und Bewertung; kritische Kundenentscheidungen bleiben beim Kunden oder benannten Freigeber.

**ERFOLGSSIGNALE:** Mehr Beratungszeit, weniger Aufbereitung, konsistente Qualität, schnellere Kundenorientierung und weniger Kontextverlust.

#### Specialist Consultant

**BETREIBERROLLE**

**MISSION:** Spezialwissen gezielt einbringen, ohne den gesamten Mandantenkontext neu aufzubauen.

**ARBEITSKONTEXT:** Wird für konkrete Fragen zu IAM, Cloud, BCM, Supplier Risk, Threats oder Architektur hinzugezogen - oft kurz und über mehrere Mandanten.

**WICHTIGSTE JOBS:** Kontext verstehen; Spezialanalyse durchführen; Empfehlung und Evidenz liefern; Abhängigkeiten kennzeichnen; Review beantworten.

**FRUST & RISIKEN:** Unvollständiger Kontext, unklare Fragestellung, fehlende Datenherkunft, wiederholte Interviews, Empfehlungen ohne Umsetzungspfad.

**WAS DIE PLATTFORM LIEFERN MUSS:** Kompaktes Expert Briefing, relevante Objekte und Historie, Datenvertrauen, klare Frage, erwartetes Ergebnis und Rückgabeformat.

**ENTSCHEIDUNGEN / FREIGABEN:** Spezialempfehlung und Review; keine automatische Änderung des Kundenrisikos ohne definierte Freigabe.

**ERFOLGSSIGNALE:** Kurze Time-to-Context, hohe Wiederverwendbarkeit und klare Integration der Empfehlung in Zielroute und Maßnahmen.

## 7. Assurance-, Administrations- und Supportrollen

#### Auditor / Assurance Reviewer

**UNABHÄNGIGE ROLLE**

**MISSION:** Aussagen, Nachweise, Historie und Wirksamkeit effizient und unabhängig prüfen.

**ARBEITSKONTEXT:** Arbeitet in zeitlich begrenzten Prüfphasen, benötigt Stichproben und nachvollziehbare Datenherkunft, darf aber den Betrieb nicht verändern.

**WICHTIGSTE JOBS:** Scope verstehen; Evidenz prüfen; Stichproben auswählen; Feststellungen dokumentieren; Änderungen nachverfolgen; Audit Trail exportieren.

**FRUST & RISIKEN:** Unstrukturierte Datenräume; fehlende Versionen; Screenshots ohne Herkunft; zu breite Zugriffe; Antworten außerhalb des Tools.

**WAS DIE PLATTFORM LIEFERN MUSS:** Read-only Audit Workspace, Evidenzpakete, Versionen, Herkunft, Sampling, Q&A, Feststellungen und vollständiger Audit Trail.

**ENTSCHEIDUNGEN / FREIGABEN:** Prüffeststellung und Bewertung; keine operative Änderung. Konflikte und Unabhängigkeit müssen sichtbar sein.

**ERFOLGSSIGNALE:** Weniger Nachforderung, schnelleres Sampling, höhere Nachvollziehbarkeit und klare Trennung von Prüfung und Betrieb.

#### Tenant Administrator

**KUNDEN- ODER BETREIBERROLLE**

**MISSION:** Mandant, Nutzer, Rollen und Konfiguration sicher und wartbar betreiben.

**ARBEITSKONTEXT:** Tritt beim Onboarding, Rollenwechsel, Integration, Reorganisation und Supportfall auf.

**WICHTIGSTE JOBS:** Nutzer verwalten; Rollen zuordnen; Organisation abbilden; Integrationen konfigurieren; Vorlagen und Benachrichtigungen steuern.

**FRUST & RISIKEN:** Komplexe Rechte, riskante globale Änderungen, fehlende Vorschau, unklare Mandantengrenzen und schwer reproduzierbare Konfiguration.

**WAS DIE PLATTFORM LIEFERN MUSS:** Geführte Administration, Vorabprüfung, Änderungslog, Rollen-Simulation, Konfigurationsversionen und sichere Defaults.

**ENTSCHEIDUNGEN / FREIGABEN:** Administrative Konfiguration im eigenen Scope; keine fachliche Risikoentscheidung.

**ERFOLGSSIGNALE:** Wenige Fehlkonfigurationen, schnelle Nutzerbereitstellung, nachvollziehbare Änderungen und geringer Supportaufwand.

#### Platform Operations / Support

**BETREIBERROLLE**

**MISSION:** Plattform zuverlässig betreiben und Probleme lösen, ohne unnötigen Zugriff auf Kundendaten.

**ARBEITSKONTEXT:** Überwacht technische Gesundheit, Integrationen, Jobs, Exporte und Supportfälle über Mandanten hinweg.

**WICHTIGSTE JOBS:** Störungen erkennen; Jobs wiederholen; Integration diagnostizieren; Support koordinieren; Service Health kommunizieren.

**FRUST & RISIKEN:** Fehlende Telemetrie; Support braucht Vollzugriff; unklare Fehlerursache; nicht reproduzierbare Export- oder Sync-Probleme.

**WAS DIE PLATTFORM LIEFERN MUSS:** Privacy-preserving Observability, Correlation IDs, Health Dashboards, sichere Supportfreigabe, Runbooks und Wiederanlauf.

**ENTSCHEIDUNGEN / FREIGABEN:** Technischer Betrieb; Kundendatenzugriff nur zeitlich begrenzt, genehmigt und protokolliert.

**ERFOLGSSIGNALE:** Kurze Wiederherstellungszeit, geringe Fehlerrate, weniger Datenzugriffe und transparente Service Health.

## 8. Reale Arbeitssituationen und Nutzungsmomente

*Das Produkt muss den Arbeitsrhythmus verstehen - nicht nur den Prozess*

Nutzer öffnen die Plattform selten „um Daten zu pflegen". Sie öffnen sie, weil eine Entscheidung, Frist, Veränderung, Besprechung oder Zuarbeit ansteht. Das Produkt muss deshalb ereignis- und missionsorientiert führen.

*Abbildung 2: Typischer Arbeitsfluss als kontinuierliche Entscheidungs- und Lernschleife.* [Grafikinhalt nicht übertragen - siehe Re-Ableitungs-Kopfnotiz]

| Situation | Realität | Erwartetes Plattformverhalten |
|---|---|---|
| Morgenstart eines Beraters | 08:00, 45 Mandanten, zwei Reisen und ein Audit in 9 Tagen | Morning Mission verdichtet Veränderungen, Wirkung, Fristen, Kapazität, Reisezeit und Kundenpriorität. |
| Vorstandstermin | CISO hat 20 Minuten für Vorbereitung | Executive Report mit drei Entscheidungen, Business Impact, Optionen, Unsicherheit und erwarteter Wirkung. |
| Neue kritische Schwachstelle | Security-Tool meldet Betroffenheit | Betroffene Assets, Prozesse, Controls, Risiken, Owner und Services werden verknüpft; Route und Mission werden neu berechnet. |
| Auditvorbereitung | 90 Tage vor Prüfungsstart | Workflow erzeugt Scope, Evidence Requests, Verantwortliche, Termine, Qualitätsprüfungen und Audit-Paket. |
| Vor-Ort-Audit | Berater reist zwei Tage zum Kunden | Planung berücksichtigt Reisezeit, Kosten, Offline-/Mobile-Bedarf, Termincluster und Vertretung. |
| Management Review | Quartalsweise Steuerung | System bereitet Trend, Zielerreichung, Wirksamkeit, Abweichungen, Entscheidungen und Maßnahmen automatisch vor. |
| Einmalige Zuarbeit | Fachbereich soll Nachweis liefern | Deep Link führt direkt zur einen Aufgabe; Kontext, Beispiel und Datenschutz sind verständlich. |
| Serviceerweiterung | Interne Kapazität reicht dauerhaft nicht | Plattform zeigt Bedarf, Alternative „intern umsetzen", Serviceumfang, Ergebnis und erwarteten Nutzen transparent. |
| Rollenwechsel | ISMS Manager verlässt das Unternehmen | Vertretung, Übergabe, offene Entscheidungen, Wissen und Verantwortungen werden strukturiert übertragen. |
| Datenlücke | Empfehlung beruht auf veralteten Daten | Vertrauensindikator zeigt Unsicherheit und priorisiert die kleinste Datenerhebung mit höchstem Erkenntniswert. |

## 9. Rollenübergreifende Jobs-to-be-done

| Job | Wenn ... | möchte ich ... | damit ... |
|---|---|---|---|
| Orientierung | ich mich einlogge | sofort Veränderungen und Prioritäten sehen | ich ohne Sucharbeit handlungsfähig bin |
| Erklärung | ein Score oder Status kritisch ist | Ursache, Datenbasis und Unsicherheit verstehen | ich die Bewertung vertreten kann |
| Priorisierung | Zeit, Budget oder Kapazität knapp sind | Optionen nach Wirkung und Machbarkeit vergleichen | ich den besten nächsten Schritt wähle |
| Zusammenarbeit | mehrere Rollen beitragen müssen | Verantwortung, Freigabe und Übergabe im Kontext steuern | nichts in E-Mails verloren geht |
| Nachweis | eine Umsetzung belegt werden muss | gültige Evidenz einfach zuordnen und wiederverwenden | Prüfbarkeit ohne Dokumentenjagd entsteht |
| Kommunikation | ein Termin oder Gremium ansteht | zielgruppengerechte PDFs oder PPTX erzeugen | ich Zeit spare und konsistent kommuniziere |
| Serviceentscheidung | interne Umsetzung nicht reicht | interne und Managed-Service-Optionen transparent vergleichen | ich bewusst Make-or-Buy entscheide |
| Lernen | eine Maßnahme abgeschlossen ist | tatsächliche Wirkung bestätigen und Route anpassen | Fortschritt nicht mit Aktivität verwechselt wird |

> **ZENTRALER JOB:** Hilf mir, unter realen Einschränkungen die nächste verantwortbare Entscheidung mit der größten erwarteten Wirkung zu treffen - und mache nachvollziehbar, wie wir dorthin gekommen sind.

## 10. Kontext, Reife und adaptive Nutzerführung

Die gleiche Rolle kann je nach Erfahrung, Reifegrad, Unternehmensgröße und Situation völlig unterschiedliche Tiefe benötigen. Die Plattform darf deshalb weder Anfänger überfordern noch erfahrene Nutzer ausbremsen.

| Dimension | Einfacher Modus | Vertiefter Modus | Regel |
|---|---|---|---|
| Fachreife | geführte Fragen, Beispiele, Klartext | Taxonomien, Mappings, Bulk-Operationen, Analyse | Komplexität wird schrittweise freigegeben |
| Nutzungsfrequenz | Deep Links und One-task Experience | Shortcuts, gespeicherte Sichten, Batch-Aktionen | seltene Nutzer sehen keine interne Systemkomplexität |
| Entscheidungsebene | Business Impact und Optionen | Objekte, Evidenz, Kausalität und Historie | jede Ebene kann in die Begründung drillen |
| Datenqualität | Hinweise, fehlende Daten, kleine nächste Erhebung | Confidence, Lineage, Validierungsregeln | Unsicherheit wird sichtbar, nicht versteckt |
| Kundenziel | Mindestniveau oder geführter Aufbau | mehrere Standards, individuelle Modelle | Zielprofil steuert Oberfläche und Priorität |
| Gerät / Ort | mobile Freigabe, Terminbriefing | Desktop-Analyse und Administration | kritische Kernhandlungen sind mobil möglich |

### 10.1 Anfängererlebnis

- Der erste Login erklärt in einem Satz Rolle, Ziel und nächsten Schritt.
- Neue Nutzer sehen keine leere Plattform, sondern realistische Startdaten, geführte Aufgaben oder eine klare Einladung.
- Fachbegriffe besitzen kurze Erklärungen und Beispiele; Detaildefinitionen sind optional.
- Fehlerzustände erklären Konsequenz und Korrektur, nicht nur einen Fehlercode.
- Jede abgegebene Zuarbeit bestätigt, was als Nächstes passiert und wer verantwortlich ist.

### 10.2 Rollenwechsel und Mehrfachrollen

Mehrfachrollen werden bewusst unterstützt. Ein CISO kann zwischen Executive- und operativer Sicht wechseln; ein Berater zwischen Portfolio- und Mandantensicht. Der aktive Modus ist immer sichtbar. Aktionen, Freigaben und Exporte tragen Rolle, Mandant, Zeitpunkt und Datenstand.

## 11. Zusammenarbeit, Handoffs und Entscheidungsrechte

Die Plattform muss Verantwortungsdiffusion verhindern. Jede relevante Aktivität besitzt einen fachlichen Owner, einen Bearbeiter, einen Prüfer oder Freigeber sowie einen Eskalationsweg. Kommentare allein ersetzen keine Entscheidung.

| Entscheidung / Ergebnis | Accountable | Responsible | Freigabe / Gate | Consulted / Informed |
|---|---|---|---|---|
| Zielprofil ändern | Executive Sponsor | CISO / ISMS Manager | Engagement Manager | betroffene Owner |
| Risiko fachlich bewerten | Process Owner / CISO | ISMS Manager / Consultant | Executive Sponsor bei Schwellenwert | Control Owner |
| Maßnahme umsetzen | Asset / Control Owner | Evidence Contributor | ISMS Manager | Berater / CISO |
| Control-Wirksamkeit bestätigen | Control Owner | ISMS Manager / Specialist | CISO oder Assurance je Modell | Auditor |
| Risiko akzeptieren | benannter Risk Owner | CISO / Consultant | Executive Sponsor nach Schwellenwert | Auditor / Compliance |
| Report freigeben | CISO oder Engagement Manager | ISMS Manager / Consultant | Executive Sponsor bei Board-Bericht | relevante Owner |
| Managed Service aktivieren | Kunden-Sponsor + Betreiber | Engagement / Service Lead | Beschaffung / Governance nach Modell | ISMS Manager |
| Auditfeststellung schließen | Finding Owner | ISMS Manager / Consultant | Auditor / Assurance | CISO |

> **ENTSCHEIDUNG:** Kritische Entscheidungen werden als strukturierte Decision Records gespeichert: Entscheidung, Optionen, Begründung, Datenstand, Unsicherheit, Wirkung, Entscheider, Freigabe und spätere Überprüfung.

## 12. Zugriff, Datenschutz und Vertrauensgrenzen

Personas dürfen nicht mit pauschalen Vollzugriffen umgesetzt werden. Insbesondere bei Beratungsportfolios, Auditoren, Support und organisationsübergreifender Zusammenarbeit sind Zweckbindung und Mandantentrennung Teil des Nutzererlebnisses.

**Scope-basiert:** Zugriff folgt Mandant, Einheit, Objekt, Auftrag, Aufgabe und Zeitraum - nicht nur Rolle.

**Need-to-know:** Nutzer sehen standardmäßig nur Informationen, die sie für ihre Aufgabe benötigen.

**Transparente Freigabe:** Temporärer Support-, Auditor- oder Spezialistenzugriff wird genehmigt, protokolliert und beendet.

**Sichere Exporte:** PDF, PPTX und Datenexporte tragen Scope, Datenstand, Klassifizierung und Freigabestatus.

### 12.1 Unabhängigkeit und Interessenkonflikte

Prüf- und Beratungsrollen können in realen Organisationen Unabhängigkeitsanforderungen unterliegen. Das Produkt muss Rollen- und Auftragskonflikte sichtbar machen, getrennte Workspaces ermöglichen und verhindern, dass ein Nutzer dieselbe Kontrolle unbemerkt implementiert und unabhängig bestätigt.

> **OFFENE FRAGE:** Welche konkreten Unabhängigkeitsregeln, regulatorischen Grenzen und organisatorischen Modelle für Beratung, Prüfung und Managed Services müssen im ersten Zielmarkt technisch erzwungen werden?

## 13. Demo-, Test- und Beispielrollen

*Der Prototyp zeigt ein glaubwürdiges Produkt - keine leere Oberfläche*

Für Entwicklung und Präsentation werden vollständig synthetische Nutzer, Unternehmen, Risiken, Services und Historien benötigt. Die Demo muss mehrere Perspektiven und Reifegrade zeigen, damit Rollenwechsel, Portfolioarbeit und End-to-End-Abläufe erlebbar sind.

| Demo-Organisation | Profil | Ziel / Situation | Wichtige Rollen |
|---|---|---|---|
| Nordwerk Manufacturing SE | Mittelständischer Produktionsverbund, mehrere Standorte | Reifegrad 3 erreichen, OT/IT-Risiken priorisieren, begrenzte interne Kapazität | Executive Sponsor, CISO, ISMS Manager, Plant Owner, Berater |
| Finovia Digital Bank AG | Reguliertes Finanzunternehmen, hohe Reife | DORA-orientierte Resilienz, komplexe Lieferanten und Management Reporting | CRO/CISO, Control Owner, Auditor, Specialist Consultant |
| MediCore Health Services GmbH | Wachsender Gesundheitsdienstleister | ISMS aufbauen, kritische Prozesse schützen, Managed-Service-Anteil erhöhen | Geschäftsführung, ISMS Manager, Process Owner, Engagement Manager |
| Consulting Operator Demo | Neutraler Managed-Service-Anbieter | Portfolio aus Kunden steuern, Kapazität, Reisen, Reports und Services demonstrieren | Service Lead, Engagement Manager, ISMS Consultant, Platform Admin |

### 13.1 Verbindliche Demo-Accounts

| Demo-Login | Produktrolle | Demonstrierter Nutzen |
|---|---|---|
| alex.meyer | Managed Service Lead | Portfolio, Qualität, Kapazität, Servicewirkung |
| julia.koch | Engagement Manager | Mandantensteuerung, Termine, Reports, Opportunities |
| samir.wolff | ISMS Consultant | Morning Mission, Kundenarbeit, Risiko, Nachweis, Audit |
| dr.lena.hartmann | Executive Sponsor | Managemententscheidungen und Investitionssimulation |
| tobias.klein | CISO / Security Lead | Strategie-DNA, Zielroute, Eskalationen, Reports |
| maria.santos | ISMS Manager | Tagesbetrieb, Maßnahmen, Reviews, Evidenz |
| oliver.brandt | Control Owner | Umsetzung, Wirksamkeit und Nachweise |
| eva.schulz | Auditor | Audit Workspace, Sampling und Feststellungen |
| nina.becker | Tenant Administrator | Nutzer, Rollen, Organisation und Konfiguration |

> **ENTSCHEIDUNG:** Alle Demo-Daten sind erfunden, konsistent, versioniert und als synthetisch gekennzeichnet. Es werden keine nichtöffentlichen PwC-Daten, realen Kundendaten, internen Preise oder geschützten Vorlagen verwendet.

## 14. Rollenbezogene Erfolgs- und Qualitätsindikatoren

| Rolle / Gruppe | Frühe Nutzungsindikatoren | Ergebnisindikatoren |
|---|---|---|
| Executive | Entscheidungen geöffnet, Optionen verglichen, Report genutzt | Entscheidungszeit, weniger Rückfragen, bestätigte Wirkung |
| CISO / ISMS Lead | regelmäßige Nutzung, Eskalationen bearbeitet, Simulationen genutzt | Zielerreichung, Risikotransparenz, Managementakzeptanz |
| ISMS Manager | Morning Mission abgeschlossen, Owner aktiviert, Nachweise geprüft | weniger Überfälligkeit, weniger Koordination, bessere Datenaktualität |
| Owner / Contributor | Deep-Link-Abschluss, First-time-right, Reaktionszeit | Nachweisqualität, geringere Rückfragen, klare Verantwortlichkeit |
| Berater | Zeit in Beratung vs. Aufbereitung, Wiederverwendung, Report-Automation | Mandanten pro Team, Qualität, Kundenzufriedenheit, Marge |
| Service Lead | Portfolioabdeckung, Kapazitätsplanung, Workflow-Nutzung | SLA, Profitabilität, Standardisierung, geringe Eskalation |
| Auditor | Zeit bis Scope-Verständnis, digitale Stichproben, Nachforderungen | Auditdauer, Nachvollziehbarkeit, geringere Finding-Rework |
| Admin / Operations | Provisioning-Zeit, Supportfälle, Sync-Health | Fehlkonfigurationen, MTTR, Datenschutzkonformität |

Kennzahlen dienen nicht zur Überwachung einzelner Personen. Produkt- und Serviceanalysen werden bevorzugt aggregiert, zweckgebunden und transparent eingesetzt. Individuelle Leistungsbewertung ist kein Produktziel.

## 15. Entscheidungen, Annahmen und offene Fragen

### 15.1 Globale Entscheidungen dieses Dokuments

| ID | Entscheidung |
|---|---|
| 03-D01 | Drei primäre Erlebniswelten: Executive, Kunde/ISMS und Beratung/Operations. |
| 03-D02 | Kanonische Produktrollen werden auf Organisationstitel gemappt; Rollen sind kombinierbar. |
| 03-D03 | Rollenmodell trennt Vorschlag, Bearbeitung, Prüfung, Freigabe, Akzeptanz und Administration. |
| 03-D04 | Seltene Nutzer erhalten One-task Experiences; häufige Nutzer erhalten tiefe Arbeitsbereiche. |
| 03-D05 | Reisezeit, Vor-Ort-Termine, Kapazität und Vertretung gehören zur Beraterrealität. |
| 03-D06 | Auditoren arbeiten in einem kontrollierten Read-only Audit Workspace. |
| 03-D07 | Serviceempfehlungen zeigen fachlichen Bedarf, interne Alternative und erwarteten Nutzen. |
| 03-D08 | Demo umfasst mehrere synthetische Unternehmen, Rollen, Reifegrade und Historien. |
| 03-D09 | Kritische Entscheidungen werden als strukturierte Decision Records gespeichert. |
| 03-D10 | Nutzungsanalysen dürfen nicht als verdeckte individuelle Mitarbeiterüberwachung gestaltet werden. |

### 15.2 Begründete Annahmen

| ID | Annahme |
|---|---|
| 03-A01 | Der Serviceanbieter ist im ersten Zielbild Betreiber und primärer wirtschaftlicher Käufer. |
| 03-A02 | ISMS Manager und ISMS Consultant sind die häufigsten operativen Power User. |
| 03-A03 | Executives akzeptieren die Plattform eher, wenn sie wenige entscheidbare Optionen statt Kontrolllisten sehen. |
| 03-A04 | Evidence Contributors benötigen eine radikal vereinfachte Oberfläche und keine vollständige Navigation. |
| 03-A05 | Ein konsistentes Rollenmodell reduziert spätere kundenspezifische Sonderentwicklung. |
| 03-A06 | Mehrfachrollen und zeitlich begrenzte Vertretungen sind in realen Organisationen unvermeidbar. |
| 03-A07 | Synthetische Demo-Personas reichen für den ersten klickbaren Produktentwurf, müssen aber später interviewbasiert validiert werden. |

### 15.3 Noch offene Fragen

| ID | Offene Frage |
|---|---|
| 03-Q01 | Welcher Betreiber- und Kundentyp wird erster Pilot? |
| 03-Q02 | Welche fünf Rollen müssen in Version 1 vollständig produktiv sein? |
| 03-Q03 | Welche Aufgaben kosten Beratern heute nachweislich am meisten Zeit? |
| 03-Q04 | Wie viele Mandanten betreut eine typische Beraterrolle und wie variiert dies nach Service? |
| 03-Q05 | Welche Vor-Ort-, Reise- und Offline-Anforderungen sind im ersten Zielmarkt real? |
| 03-Q06 | Welche Managemententscheidungen benötigen formale Freigaben oder Vier-Augen-Prinzip? |
| 03-Q07 | Welche Unabhängigkeitsregeln gelten zwischen Beratung, Service und Audit? |
| 03-Q08 | Welche Rollen dürfen mandantenübergreifende Benchmarks sehen? |
| 03-Q09 | Welche mobilen Kernhandlungen sind zwingend? |
| 03-Q10 | Welche Barrierefreiheits- und Sprachziele gelten für den Pilot? |

## 16. Ideenparkplatz und spätere Erweiterungen

| Spätere Idee | Nutzen |
|---|---|
| Persönlicher Arbeitsmodus | Nutzer kann Fokus, Benachrichtigungen und bevorzugte Entscheidungstiefe konfigurieren. |
| Skill- und Staffing-Matching | Portfolioarbeit berücksichtigt Fähigkeiten, Zertifizierungen, Verfügbarkeit, Standort und Reiseaufwand. |
| Shadowing / Lernmodus | Neue Berater oder ISMS Manager folgen erklärten Beispielen und simulierten Entscheidungen. |
| Community of Practice | Anonymisierte Muster, Vorlagen und Lessons Learned werden kontrolliert geteilt. |
| Voice Briefing | Morning Mission und Terminbriefing können als kurze Audiozusammenfassung ausgegeben werden. |
| Offline Audit Companion | Vor-Ort-Prüfung mit sicherem Offline-Zugriff, Notizen und späterer Synchronisation. |
| Delegationsassistent | Erkennt drohende Überlastung und schlägt Vertretung oder Neuverteilung vor. |
| Stakeholder Sentiment | Strukturiertes Feedback aus Reviews erkennt Verständlichkeits- und Akzeptanzprobleme. |

### 16.1 Akzeptanzkriterien für nachfolgende Dokumente

- Jede Kernfunktion in Dokument 05 nennt mindestens eine primäre Rolle und eine reale Nutzungssituation.
- Jede Nutzerreise in Dokument 04 enthält Startsignal, Ziel, Gedanken/Unsicherheiten, Rollenübergaben, Ergebnis und Fehlerfall.
- Dokument 06 zeigt für Executive, Kunde und Berater unterschiedliche Informationsdichte bei gleichem Datenmodell.
- Dokument 15 berücksichtigt Kapazität, Reisezeit, Vor-Ort-Termine, Vertretung und reale Tagesplanung.
- Dokument 19 übersetzt die Rollen in ein mandanten-, objekt-, auftrags- und zweckgebundenes Rechtekonzept.
- Demo-Daten bilden mindestens drei Kundenprofile und neun Rollen glaubwürdig ab.

## 17. Änderungsprotokoll und nächster Schritt

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming, Dokument 00/01 und dem AI-Builder-Arbeitsmodell. |

> **NÄCHSTER SCHRITT:** Dokument 04 - Nutzerreisen und vollständiger Service-Lebenszyklus. Es baut auf den hier definierten Rollen und Arbeitssituationen auf und beschreibt die End-to-End-Erlebnisse vom ersten Kontakt bis zur kontinuierlichen Verbesserung.
