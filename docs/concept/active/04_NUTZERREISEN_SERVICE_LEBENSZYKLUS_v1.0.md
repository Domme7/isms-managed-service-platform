# Dokument 04 - Nutzerreisen & vollständiger Service-Lebenszyklus

> **Re-Ableitung:** Nicht-PDF-Inhalt (Ableitungs-Metadaten, WP-019). Alles unterhalb dieser Notiz ist Wiedergabe des PDF-Originals.
>
> - **Re-Ableitungsdatum:** 2026-07-23
> - **Quell-PDF:** `docs/concept/pdf/Dokument_04_Nutzerreisen_Service_Lebenszyklus_v1.0.pdf`
> - **Autorität:** Bei jeder Abweichung zwischen dieser Arbeitsfassung und dem PDF gilt das PDF (DR-0006).
> - **Nummerierungs-Konkordanz alt→neu:** Die Hauptabschnitte 1-16 sind gegenüber der alten Arbeitsfassung unverschoben (Titel und Nummern identisch). Verschiebungen betreffen nur die Unterebene von Abschnitt 9 und den Schlussblock:
>
> | Alt (Arbeitsfassung bis 2026-07-23) | Neu (PDF-Folientitel) |
> |---|---|
> | 9 - Fließtext „Anfängererlebnis …" (unnummeriert) | 9.1 Der erste Kontakt eines vollständigen Anfängers |
> | 9 - „Vertrauenssignale" (unnummerierte Zwischenüberschrift) | 9.2 Vertrauenssignale |
> | 9 - „Universeller Wiederaufnahmepunkt" (unnummerierte Zwischenüberschrift) | 9.3 Universeller Wiederaufnahmepunkt |
> | „Nächster Schritt" (eigener Abschnitt nach 16) | unnummerierter Block „Nächster Schritt / Folgedokument" innerhalb des Schlussteils (wie PDF) |
>
> - **PDF-interne Nummerierungskonflikte:** keine. Dokument 04 hat keine von den Folientiteln abweichende Navigationsleisten-Zählung (Rohbefund 2026-07-23, Abschnitt „Dokument 04", Absatz „Nummerierung").
> - **PDF-interne inhaltliche Widersprüche:** keine im extrahierbaren PDF-Text festgestellt. Ein unverifizierter Verdacht zu möglichen Abbildungsinhalten ist unten dokumentiert; er ist keine Feststellung über das PDF.
> - **Benannte Lücke - Abbildungen (nicht geraten, O-WP019-Kandidat; Befund im WP-019-Nachtrag):** Ob und mit welchem Inhalt die Abschnitte „Vollständiger Kunden- und Service-Lebenszyklus" und „Rollenübergreifender End-to-End-Entscheidungsfluss" Abbildungen enthalten, war in der Re-Ableitungsumgebung nicht feststellbar: Die Textextraktion (`scripts/pdf_text.py 04`) enthält in beiden Abschnitten keinen Abbildungstext, und die visuelle PDF-Prüfung war nicht möglich (Rendering-Werkzeug fehlt). Diese Fassung enthält deshalb **keine** Abbildungstranskription; eine Wiedereinsetzung ist nur nach visueller Verifikation am PDF zulässig.
> - **Unverifizierter Verdacht (keine Feststellung):** Die alte Arbeitsfassung enthielt in Abschnitt 3 eine Phasen-Themen-Liste (u. a. „Onboarden: Organisation, Rollen, Scope und Strategie-DNA", „Baselinen: Ist-Zustand, Datenvertrauen, digitaler Zwilling und Zielroute") und in Abschnitt 4 den Satz „Kunde, Plattform und Service-Team durchlaufen gemeinsam Orientieren, Bewerten, Entscheiden, Umsetzen sowie Nachweisen und Lernen" - ein von 04-D01 („Orientieren - Verstehen - Entscheiden - Handeln - Nachweisen - Lernen") abweichender Rhythmus. Der Rohbefund 2026-07-23 (Abschnitt „Dokument 04") führt beides als nur im Markdown, nicht im PDF-Text belegt; diese Inhalte wurden nicht übernommen. Ob sie aus den nicht prüfbaren Abbildungen stammen, ist offen - erst eine visuelle Verifikation könnte daraus benennbare PDF-interne Widersprüche machen.
> - **Fußzeile aller PDF-Seiten (Seiten-Rahmeninhalt, hier statt im Fließtext geführt):** „Vertraulicher Konzeptentwurf - neutrale Produktentwicklung".
> - **Nur-im-MD-Zusätze der alten Fassung:** keine übernommen (vollständige Neuableitung; die alte Fassung liegt unter `docs/concept/archive/04_NUTZERREISEN_SERVICE_LEBENSZYKLUS_v1.0_abgeloest_2026-07-23.md`).
> - **Zitierregel:** nach Abschnittstitel zitieren, nicht nur nach Nummer.
>
> **Ende der Re-Ableitungsnotiz - ab hier PDF-Inhalt.**

**DOKUMENT 04 - NUTZERREISEN & VOLLSTÄNDIGER SERVICE-LEBENSZYKLUS**

End-to-End-Erlebnis vom ersten Kontakt über den laufenden ISMS- und Managed-Service-Betrieb bis zur überprüfbaren Verbesserung, Anpassung und geordneten Übergabe.

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Dokumentstatus:** Erstellt - Version 1.0  
**Stand:** 21. Juli 2026  
**Abhängigkeiten:** Dokument 00, 01 und 03  
**Zweck:** Verbindliche Definition der vollständigen Nutzerreisen, Lebenszyklusphasen, Übergaben und Wiederanlaufpfade

*Dieses Dokument beschreibt nicht nur den Idealweg. Es legt fest, wie die Plattform bei Unsicherheit, Datenlücken, abgelehnten Empfehlungen, Integrationsfehlern, Rollenwechseln und Serviceänderungen verständlich und sicher weiterführt.*

## 1. Dokumentauftrag und Verbindlichkeit

*Die Nutzerreise ist die eigentliche Produktlogik - Screens und Module dienen ihr.*

Dokument 04 übersetzt Produktvision und Rollenmodell in konkrete, vollständige Abläufe. Es beschreibt, in welcher Situation ein Mensch die Plattform betritt, welche Frage er beantworten will, welche Informationen er benötigt, welche Entscheidung entsteht und wie das System nach Erfolg, Fehler oder Unterbrechung fortsetzt.

> **ENTSCHEIDUNG:** Jede zentrale Funktion muss mindestens einer dokumentierten Nutzerreise dienen. Funktionsumfang ohne nachvollziehbaren Nutzer- oder Servicewert gehört nicht in den Produktkern.

### Das Dokument legt fest

- den vollständigen Kunden- und Service-Lebenszyklus vom Erstkontakt bis zur Übergabe;
- dreizehn priorisierte End-to-End-Nutzerreisen mit Rollen, Auslösern, Schritten, Ergebnissen und Fehlerpfaden;
- gemeinsame Erlebnisprinzipien, Zustände, Übergaben, Gates und Decision Records;
- Anfängerführung, Vertrauenssignale, menschliche Freigaben und sichere Wiederaufnahme;
- Messpunkte, Akzeptanzkriterien sowie Abhängigkeiten zu Produkt-, UX-, Technik- und Servicekonzepten.

### Abgrenzung

Konkrete Screenlayouts folgen in Dokument 06. Das fachliche Datenmodell und die ISMS-Objekte werden in Dokument 07 und 08 vertieft. Services, SLAs, Integrationen, Rechte und technische Architektur werden in den Dokumenten 13 bis 19 verbindlich spezifiziert.

> **North-Star-Journey:** Ein Nutzer soll von einer relevanten Veränderung innerhalb weniger Minuten zu einer verantwortbaren, nachvollziehbar dokumentierten Entscheidung und anschließend zu einer wirksamen Maßnahme gelangen - ohne Medienbruch und ohne den Zusammenhang zu Ziel, Risiko, Service und Nachweis zu verlieren.

## 2. Journey-Architektur

Alle Nutzerreisen folgen demselben Entscheidungsrhythmus. Dadurch lernt der Nutzer nicht für jedes Modul eine neue Bedienlogik, sondern erkennt ein wiederkehrendes Muster.

| Phase | Leitfrage | Plattformleistung |
|---|---|---|
| Orientieren | Was hat sich verändert und warum betrifft es mich? | Rollenbezogenes Briefing, Datenstand, Priorität und Kontext. |
| Verstehen | Warum ist das wichtig und womit hängt es zusammen? | Kausalität, Business Impact, Zielbezug und sichtbare Unsicherheit. |
| Entscheiden | Welche Option ist unter unseren Rahmenbedingungen verantwortbar? | Optionen, Wirkung, Kosten-/Zeitannahmen und Freigabeweg. |
| Handeln | Wer tut was bis wann - intern, automatisiert oder als Service? | Workflow, Owner, SLAs, Reise-/Kapazitätsbezug und Eskalation. |
| Nachweisen | Wurde die Maßnahme korrekt und wirksam umgesetzt? | Evidenz, Review, Wirksamkeit, Audit Trail und Decision Record. |
| Lernen | Was ändert sich dadurch an Risiko, Route und Service? | KPI-Update, Zielroute, Musterlernen und nächste Mission. |

**Ein Datenraum**  
Kunde, Berater und Prüfer arbeiten auf denselben Objekten, jedoch mit rollen- und scopegerechten Sichten.

**Ein roter Faden**  
Jede Aktion bleibt mit Ziel, Ursache, Entscheidung, Verantwortlichem, Ergebnis und Nachweis verbunden.

**Keine Sackgassen**  
Abbruch, Fehler, fehlende Daten oder abgelehnte Empfehlungen erzeugen verständliche Rückkehrpfade.

**Fortsetzbar**  
Jede Reise kann nach Gerätewechsel, Vertretung oder späterem Login am letzten sicheren Zustand fortgesetzt werden.

## 3. Vollständiger Kunden- und Service-Lebenszyklus

Der Lebenszyklus ist nicht linear. Nach Review, Zieländerung, neuem Risiko oder Servicewechsel wird die Route neu berechnet. Die Plattform bewahrt die Historie und unterscheidet klar zwischen aktuellem Zielbild, vergangener Entscheidung und zukünftigem Plan.

| Phase | Eintrittskriterium | Austritts-Gate | Verbindlicher Output |
|---|---|---|---|
| Entdecken | Bedarf oder Demo-Interesse | Fit und zulässiger Demo-/Pilot-Scope bestätigt | Discovery Summary |
| Onboarden | Organisation angelegt | Rollen, Scope, Datenschutz und Verantwortungen bestätigt | Onboarding Record |
| Baselinen | Mindestdaten verfügbar | Ist-Zustand und Datenvertrauen fachlich akzeptiert | Baseline v1 |
| Aktivieren | Zielroute und Serviceoptionen vorhanden | Verantwortung, Serviceumfang und Startdatum freigegeben | Service Charter |
| Betreiben | Aktiver Kunde / aktiver Scope | Regelbetrieb, Tasks, Evidenz und Eskalationen funktionieren | Betriebsjournal |
| Prüfen | Review-, Audit- oder Entscheidungsanlass | Ergebnis, Abweichungen und Entscheidungen dokumentiert | Review Record |
| Anpassen | Ziel-, Scope-, Risiko- oder Serviceänderung | Neue Route und Auswirkungen bestätigt | Change Decision |
| Übergeben | Kündigung, Anbieterwechsel oder Abschluss | Export, Wissenstransfer, Löschung und Nachweis abgeschlossen | Exit Package |

> **ENTSCHEIDUNG:** Kein Service beginnt allein durch einen algorithmischen Vorschlag. Aktivierung, Scope, Verantwortungen, Datenzugriffe und Kostenannahmen benötigen eine nachvollziehbare menschliche Freigabe.

## 4. Rollenübergreifender End-to-End-Entscheidungsfluss

### Übergabeprinzipien

- Der nächste Verantwortliche erhält nicht nur eine Aufgabe, sondern Kontext, erwartetes Ergebnis, Definition of Done, Frist, Datenstand und Eskalationsweg.
- Übergaben sind sichtbar angenommen, abgelehnt, delegiert oder überfällig. Stille Verantwortungswechsel sind nicht zulässig.
- Automatisierung darf vorbereiten, erinnern, klassifizieren und vorbefüllen; risikorelevante Entscheidungen bleiben rollenbasiert freigegeben.
- Vor-Ort-Termine, Reisezeit, Abwesenheit, Vertretung und Kapazität beeinflussen Termin- und Missionsvorschläge.
- Jede freigegebene Entscheidung erzeugt einen Decision Record und kann später anhand tatsächlicher Wirkung überprüft werden.

### Journey-Zustände

| Zustand | Bedeutung | Erlaubte nächste Schritte |
|---|---|---|
| Entwurf | Noch nicht verbindlich; Daten oder Verantwortungen können fehlen. | Vervollständigen, verwerfen, zur Prüfung senden. |
| Bereit zur Prüfung | Mindestinformationen und Owner vorhanden. | Prüfen, Rückfrage, Freigabe, ablehnen. |
| Freigegeben | Entscheidung oder Scope verbindlich. | Aktivieren, umsetzen, terminieren. |
| In Arbeit | Verantwortlicher arbeitet; Fortschritt und Hindernisse sichtbar. | Nachweis ergänzen, eskalieren, delegieren. |
| Blockiert | Abhängigkeit, Datenlücke oder Kapazitätsproblem. | Blocker lösen, Route ändern, Frist neu entscheiden. |
| Zur Wirksamkeitsprüfung | Umsetzung erfolgt, Wirkung noch nicht bestätigt. | Testen, Evidenz prüfen, nacharbeiten. |
| Abgeschlossen | Definition of Done und Review erfüllt. | Wirkung lernen, Route aktualisieren, archivieren. |
| Überholt | Ziel, Scope oder Datenlage hat sich verändert. | Neue Version erzeugen; Historie erhalten. |

## 5. Einstieg, Onboarding und Zielbild

### J01 - Erster Kontakt, Demo und sichere Kontoaktivierung

> **ZWECK:** Ein neuer Nutzer versteht in wenigen Minuten den konkreten Wert für seine Rolle und betritt eine sichere, glaubwürdige Produktwelt.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, Managed Service Lead, Engagement Manager | Ein Unternehmen prüft Plattform oder Managed Service; ein eingeladener Nutzer erhält Zugang. | Aktivierter Account, verstandene Rolle, definierter Einstiegspunkt und nachvollziehbare Einwilligungen. |

**Ablauf**

1. Die Einstiegsseite fragt nach Rolle und Ziel, nicht nach einer langen Featureliste.
2. Die Plattform zeigt eine kurze, synthetische Beispielwelt oder eine geführte Demo mit klarer Kennzeichnung als Demo-Daten.
3. Der Nutzer sieht in maximal drei Schritten: aktueller Zustand, nächste relevante Entscheidung und erwartbare Wirkung.
4. Bei echtem Onboarding werden Identität, Organisation, Einladung und zulässiger Datenraum bestätigt.
5. Die Startmission erklärt den nächsten Schritt und bietet eine Tour, Überspringen und späteres Wiederaufnehmen.
6. Der Nutzer bestätigt Datenschutz-, Vertraulichkeits- und Nutzungsbedingungen passend zu Rolle und Organisation.

**Vertrauen & Emotion**  
Der Nutzer muss sofort erkennen, ob er Demo- oder Echtdaten sieht. Keine scheinbar echte KI-Aussage ohne Datenbasis. Kein erzwungener Rundgang.

**Fehler- und Rückkehrpfad**  
Abgelaufene Einladung, falsche Organisation oder fehlende Rechte führen zu einem sicheren Diagnoseweg mit erneutem Versand, Admin-Anfrage oder Abbruch ohne Datenverlust.

> **Akzeptanzkriterien:** Ein Erstnutzer kann innerhalb von zwei Minuten erklären, wofür die Plattform dient, welche Rolle aktiv ist und was er als Nächstes tun soll.

### J02 - Organisation, Rollen und Scope onboarden

> **ZWECK:** Eine Kundenorganisation wird so eingerichtet, dass Daten, Verantwortungen, Grenzen und spätere Services von Beginn an belastbar sind.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Tenant Administrator, ISMS Manager, Engagement Manager, Datenschutz-/Security-Verantwortliche | Pilot, Kundenauftrag oder interner Start wurde grundsätzlich freigegeben. | Bestätigte Organisationsstruktur, Rollenmatrix, Scope v1, Datenverantwortung und Onboarding Record. |

**Ablauf**

1. Organisation, Einheiten, Standorte, Hauptansprechpartner und Datenregion werden angelegt oder importiert.
2. Der Nutzer wählt einen geführten Einstieg: Schnellstart, strukturierter Workshop oder Import aus vorhandenen Quellen.
3. Scope-Grenzen, relevante Geschäftsprozesse, kritische Informationen und Ausschlüsse werden als Entwurf erfasst.
4. Kanonische Produktrollen werden Personen zugeordnet; Vertretungen, Vier-Augen-Prinzip und Auditorzugriffe werden vorbereitet.
5. Die Plattform zeigt fehlende Mindestangaben, widersprüchliche Rollen und Risiken des gewählten Scopes.
6. Verantwortliche bestätigen Scope, Datenzugriffe, Aufbewahrung und Startbereitschaft in einem Onboarding Record.

**Vertrauen & Emotion**  
Der Kunde behält Daten- und Entscheidungshoheit. Beratung und Plattform dürfen fehlende Angaben markieren, aber den Scope nicht stillschweigend festlegen.

**Fehler- und Rückkehrpfad**  
Unvollständige Daten erlauben einen eingeschränkten Start mit sichtbarem Vertrauensgrad. Kritische Lücken blockieren nur betroffene Funktionen, nicht das gesamte Onboarding.

> **Akzeptanzkriterien:** Alle Pflichtrollen, Scope-Grenzen und Datenverantwortungen sind nachvollziehbar; ein neuer Nutzer kann erkennen, was innerhalb und außerhalb des ISMS liegt.

### J03 - Strategie-DNA und individuelles Zielprofil festlegen

> **ZWECK:** Das Unternehmen definiert seinen realistischen Zielzustand statt einem generischen Audit-Ideal zu folgen.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, ISMS Manager, Managed Service Lead | Organisation und Scope sind ausreichend beschrieben; strategische Ziele müssen festgelegt werden. | Versionierte Strategie-DNA, Zielprofil, Zielroute, Annahmen und Freigaben. |

**Ablauf**

1. Die Plattform erhebt Zielarten: regulatorische Mindestanforderung, Reifegrad, Zertifizierung, Resilienz, branchenspezifische oder frei definierte Ziele.
2. Risikobereitschaft, Zeithorizont, Budgetkorridor, interne Kapazität, Automatisierungsgrad und gewünschter Managed-Service-Anteil werden strukturiert erfasst.
3. Das System erzeugt mehrere Zielrouten, beispielsweise schnell, kosteneffizient, risikooptimiert oder serviceunterstützt.
4. Annahmen, Datenlücken, Zielkonflikte und nicht erreichbare Kombinationen werden transparent erklärt.
5. Management und Fachverantwortliche wählen eine Route oder kombinieren Optionen; Abweichungen benötigen Begründung.
6. Das bestätigte Zielprofil wird versioniert und dient künftig als Referenz für Missionen, KPIs, Empfehlungen und Reviews.

**Vertrauen & Emotion**  
Die Plattform darf keine scheinbar objektiv perfekte Strategie vortäuschen. Empfehlungen müssen Zielkonflikte, Unsicherheit und Alternativen sichtbar machen.

**Fehler- und Rückkehrpfad**  
Wenn Management keine endgültige Route freigibt, kann ein zeitlich begrenztes Arbeitsprofil genutzt werden. Es bleibt deutlich als Annahme markiert und löst eine Wiedervorlage aus.

> **Akzeptanzkriterien:** Alle Rollen sehen denselben bestätigten Zielzustand in ihrer Sprache; spätere Empfehlungen lassen sich auf diesen Zielzustand zurückführen.

## 6. Baseline, Serviceaktivierung und täglicher Betrieb

### J04 - Ist-Zustand, Datenvertrauen und digitalen Zwilling aufbauen

> **ZWECK:** Aus vorhandenen Daten, Workshops und Integrationen entsteht eine belastbare Baseline mit sichtbarer Qualität und Herkunft.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| ISMS Manager, Consultant, Asset/Control Owner, Tenant Administrator | Scope und Zielprofil sind bestätigt; der aktuelle Zustand muss erhoben werden. | Digitaler Zwilling v1, Datenqualitätsprofil, Baseline Report und priorisierte Datenlücken. |

**Ablauf**

1. Daten werden über Import, Integration, Fragebogen, Workshop oder manuelle Erfassung aufgenommen.
2. Die Plattform erkennt Dubletten, Widersprüche, veraltete Angaben, fehlende Owner und unklare Beziehungen.
3. Objekte werden im digitalen Zwilling mit Quelle, Zeitpunkt, Verantwortlichem und Vertrauensgrad angelegt.
4. Risikobezogene Annahmen und automatische Mappings werden fachlich geprüft, akzeptiert oder korrigiert.
5. Die Plattform erzeugt eine Baseline-Zusammenfassung: Was wissen wir, was vermuten wir, was fehlt und was ist kritisch?
6. ISMS Manager und Engagement Manager akzeptieren Baseline v1 und priorisieren Datenlücken nach Entscheidungsrelevanz.

**Vertrauen & Emotion**  
Herkunft und Aktualität sind immer sichtbar. Importierte oder KI-abgeleitete Daten werden nicht als bestätigte Wahrheit dargestellt.

**Fehler- und Rückkehrpfad**  
Fehlerhafte Integration stoppt nicht die Reise: Daten werden als veraltet markiert, letzte verlässliche Version bleibt verfügbar und eine Wiederherstellungsmission entsteht.

> **Akzeptanzkriterien:** Für jedes kritische Objekt sind Quelle, Owner, Aktualität und Vertrauensgrad sichtbar; Entscheidungen können Datenlücken explizit berücksichtigen.

### J05 - Managed Service auswählen, abgrenzen und aktivieren

> **ZWECK:** Kunde und Anbieter teilen transparent auf, welche Leistungen intern, gemeinsam, automatisiert oder als Managed Service erbracht werden.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, Managed Service Lead, Engagement Manager, Procurement optional | Baseline und Zielroute zeigen wiederkehrende Aufgaben, Kapazitätslücken oder fachlichen Unterstützungsbedarf. | Freigegebener Serviceumfang, Service Charter, Startplan, Verantwortungsmatrix und Review-Rhythmus. |

**Ablauf**

1. Die Plattform zeigt pro Bedarf mindestens interne Umsetzung, unterstützte Umsetzung und Managed-Service-Option.
2. Jede Option beschreibt Ergebnis, Scope, Verantwortlichkeiten, Datenzugriff, Frequenz, Abhängigkeiten, SLA-Annahme und messbaren Nutzen.
3. Kapazitäts-, Reise-, Termin- und Skillbedarf werden in die Machbarkeit einbezogen.
4. Der Kunde kann Module kombinieren, reduzieren, pausieren oder für einen Pilotzeitraum aktivieren.
5. Vor Aktivierung werden Shared Responsibility, Ausschlüsse, Eskalationen, Reporting und Exit-Regeln bestätigt.
6. Die Aktivierung erzeugt Service Charter, operative Missionen, Verantwortlichkeiten und ersten Review-Termin.

**Vertrauen & Emotion**  
Serviceempfehlungen müssen fachlich begründet sein und dürfen nicht wie verdeckte Verkaufsmanipulation wirken. Interne Alternativen bleiben sichtbar.

**Fehler- und Rückkehrpfad**  
Wenn Preis, SLA oder Vertrag noch nicht final sind, kann ein nicht produktiver Simulationsmodus genutzt werden. Produktive Aufgaben starten erst nach Freigabe.

> **Akzeptanzkriterien:** Der Kunde kann exakt erklären, was übernommen wird, was nicht, wer entscheidet und wie Erfolg sowie Exit funktionieren.

### J06 - Morning Mission und täglicher ISMS-/Portfolio-Betrieb

> **ZWECK:** Jeder Nutzer beginnt mit wenigen relevanten Entscheidungen und Aufgaben statt einer unpriorisierten Liste.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| ISMS Manager, ISMS Consultant, Engagement Manager, Managed Service Lead; Executive in Kurzsicht | Täglicher Login, relevante Änderung, anstehender Termin oder automatisch berechnete Priorität. | Priorisierte, realistische Mission; sichtbarer Fortschritt; nachvollziehbare Abweichungen und nächste Schritte. |

**Ablauf**

1. Die Startseite beantwortet: Was hat sich verändert? Was ist heute wichtig? Welche Wirkung kann ich erzielen?
2. Prioritäten werden aus Zielbezug, Risiko, Frist, Abhängigkeiten, Datenvertrauen, Kapazität, Reise und Service-SLA abgeleitet.
3. Jede Mission erklärt Warum, erwartete Wirkung, Aufwand, Owner und Datenbasis.
4. Der Nutzer übernimmt, delegiert, terminiert, verwirft mit Begründung oder passt die vorgeschlagene Reihenfolge an.
5. Fortschritt aktualisiert Kundenpuls, Portfolio, Serviceleistung und persönliche Mission in Echtzeit.
6. Am Tages- oder Arbeitsblockende werden erledigte Wirkung, neue Blocker und nächster sinnvoller Einstieg zusammengefasst.

**Vertrauen & Emotion**  
Missionen sind Empfehlungen, keine verdeckte Leistungsüberwachung. Persönliche Produktivität wird nicht ohne transparenten Zweck zur Mitarbeiterbewertung genutzt.

**Fehler- und Rückkehrpfad**  
Bei Überlastung schlägt die Plattform Umpriorisierung, Vertretung, Serviceunterstützung oder Fristentscheidung vor. Kritische Aufgaben dürfen nicht still nach hinten rutschen.

> **Akzeptanzkriterien:** Ein Nutzer kann innerhalb von 30 Sekunden seine drei wichtigsten Handlungen und deren erwartete Wirkung benennen.

## 7. Veränderung, Umsetzung und Assurance

### J07 - Neue Bedrohung oder relevante Veränderung in eine Entscheidung übersetzen

> **ZWECK:** Ein neues Signal wird nicht nur angezeigt, sondern auf betroffene Geschäftsprozesse, Assets, Controls, Ziele und Services abgebildet.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| CISO, ISMS Manager, Consultant, Specialist, Executive Sponsor bei Eskalation | Neue Schwachstelle, Bedrohungslage, regulatorische Änderung, Incident, Lieferantenänderung oder Integrationssignal. | Decision Record, aktualisierte Risikolage, priorisierte Maßnahmen, Kommunikations- und Review-Plan. |

**Ablauf**

1. Das Signal wird aufgenommen, klassifiziert und mit Quelle, Aktualität und Verlässlichkeit versehen.
2. Der digitale Zwilling ermittelt potenziell betroffene Objekte und unterscheidet bestätigt, wahrscheinlich und ungeklärt.
3. Die Plattform erklärt Kausalität und Business Impact in Rollenansichten.
4. Optionen werden simuliert: beobachten, kompensieren, behandeln, akzeptieren, transferieren oder Service aktivieren.
5. Fachreview und erforderliche Managementfreigabe erfolgen abhängig von Schwelle und Scope.
6. Entscheidung, Owner, Frist, Maßnahmen, Kommunikationsbedarf und spätere Wirksamkeitsprüfung werden erzeugt.

**Vertrauen & Emotion**  
Keine automatische Eskalation ohne nachvollziehbare Quelle und Betroffenheit. Unsicherheit wird als Teil der Entscheidung gezeigt, nicht versteckt.

**Fehler- und Rückkehrpfad**  
Bei unzureichender Datenlage entsteht eine zeitlich begrenzte Schutzentscheidung plus Auftrag zur Verifikation. Falschpositive Signale können erklärt verworfen werden.

> **Akzeptanzkriterien:** Vom Signal bis zum dokumentierten Handlungspfad bleiben Quelle, Betroffenheit, Annahmen, Entscheidung und Verantwortlichkeit lückenlos nachvollziehbar.

### J08 - Maßnahme, Control und Evidenz bis zur bestätigten Wirksamkeit steuern

> **ZWECK:** Eine Entscheidung wird in eine umsetzbare, prüfbare und messbar wirksame Veränderung übersetzt.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Control Owner, Asset Owner, ISMS Manager, Consultant, Evidence Contributor, Reviewer | Freigegebene Risikobehandlung, Auditabweichung, Zielrouten-Meilenstein oder wiederkehrende Control-Aktivität. | Abgeschlossene Maßnahme, geprüfte Evidenz, bestätigte Control-Wirksamkeit und aktualisierte Zielroute. |

**Ablauf**

1. Die Plattform erzeugt ein Arbeitspaket mit Ziel, Scope, Owner, Definition of Done, Abhängigkeiten und erwarteter Wirkung.
2. Owner plant Umsetzung; Integration oder Workflow übernimmt geeignete Routineaufgaben und Erinnerungen.
3. Nachweise werden direkt am Objekt hochgeladen, verlinkt oder automatisiert erfasst; Herkunft und Klassifikation bleiben erhalten.
4. Ein fachlicher Reviewer prüft Qualität, Vollständigkeit und Aktualität der Evidenz.
5. Wirksamkeit wird separat von bloßer Umsetzung getestet; bei Bedarf entstehen Nacharbeit und erneute Prüfung.
6. Nach Abschluss werden Risiko, Reifegrad, Control-Status, Zielroute, KPIs und Lessons Learned aktualisiert.

**Vertrauen & Emotion**  
Ein hochgeladenes Dokument ist noch kein Beweis für Wirksamkeit. Die Oberfläche trennt Umsetzung, Nachweis und Wirksamkeitsbestätigung sichtbar.

**Fehler- und Rückkehrpfad**  
Ungeeignete Evidenz wird mit konkreter Begründung zurückgegeben. Owner verliert keine Eingaben; Frist und Eskalation werden kontrolliert angepasst.

> **Akzeptanzkriterien:** Jede Maßnahme besitzt eine testbare Definition of Done, einen nachvollziehbaren Review und einen sichtbaren Effekt auf mindestens ein Ziel oder Risiko.

### J09 - Audit planen, vorbereiten, vor Ort durchführen und nachbereiten

> **ZWECK:** Audits werden als kontrollierter Lebenszyklus betrieben und nicht als hektische Dokumentensuche kurz vor dem Termin.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| ISMS Manager, Consultant, Engagement Manager, Auditor, Control Owner, Executive Sponsor | Auditkalender, Zertifizierungsplan, Managemententscheidung oder regulatorische Prüfanforderung. | Auditplan, kontrollierter Workspace, Reise-/Ressourcenplan, Findings, Maßnahmen und Abschlussbericht. |

**Ablauf**

1. 90/60/30 Tage vor dem Audit erzeugt die Plattform readinessbasierte Missionen, Evidenzanforderungen und Terminvorschläge.
2. Scope, Auditorzugriff, Sampling, Reise, Vor-Ort-Tage, Räume, Interviewpartner und Vertretungen werden geplant.
3. Ein Audit Workspace stellt nur freigegebene, aktuelle und scopegerechte Evidenz bereit.
4. Während des Audits werden Fragen, Anfragen, Beobachtungen und Nachreichungen kontextgebunden erfasst.
5. Feststellungen werden gegen Ursachen, Controls, Risiken und Maßnahmen gemappt; Verantwortliche und Fristen werden freigegeben.
6. Nach Abschluss entstehen Audit Report, Management Summary, Lessons Learned, Zielrouten-Update und Folgeprüfungen.

**Vertrauen & Emotion**  
Auditorunabhängigkeit, Zugriffstrennung und unveränderte Evidenzhistorie sind sichtbar. Readiness ist eine gewählte Zielperspektive, nicht das einzige Produktziel.

**Fehler- und Rückkehrpfad**  
Bei Reiseausfall, Terminverschiebung oder fehlender Evidenz berechnet die Plattform Alternativen, Auswirkungen und notwendige Freigaben. Offline-Zuarbeit wird synchronisierbar vorbereitet.

> **Akzeptanzkriterien:** Alle Auditbeteiligten kennen Scope, Status, offene Nachweise, Termine und Verantwortungen; nach dem Audit gehen Findings ohne Medienbruch in den Betrieb über.

## 8. Management, Kommunikation und Veränderung

### J10 - Management Review und Investitionsentscheidung

> **ZWECK:** Management erhält wenige, geschäftsrelevante Entscheidungen mit nachvollziehbaren Optionen und erwarteter Wirkung.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, ISMS Manager, Managed Service Lead | Geplanter Management Review, Budgetrunde, Zielabweichung, kritisches Risiko oder strategische Veränderung. | Management Review Record, freigegebene Entscheidungen, Budget-/Ressourcenrahmen und angepasste Zielroute. |

**Ablauf**

1. Die Plattform fasst Zielstatus, Trend, Top-Geschäftsrisiken, Servicewirkung, Datenvertrauen und erforderliche Entscheidungen zusammen.
2. Für jede Entscheidung werden Handlungsoptionen, Nichtstun, Zeit, Budgetannahme, Risikowirkung und Abhängigkeiten gezeigt.
3. Was-wäre-wenn-Simulationen vergleichen beispielsweise interne Umsetzung, zeitliche Verschiebung und Managed Service.
4. Management prüft, kommentiert, fordert Ergänzung an oder gibt Option und Budgetrahmen frei.
5. Die Entscheidung wird als Decision Record mit Annahmen, Verantwortlichem und Reviewdatum gespeichert.
6. Zielroute, Ressourcen, Services, Missionen und Reports werden auf Basis der Freigabe aktualisiert.

**Vertrauen & Emotion**  
Simulationen sind Entscheidungshilfen, keine garantierten Prognosen. Bandbreiten, Datenlücken und Modellannahmen sind sichtbar.

**Fehler- und Rückkehrpfad**  
Bei fehlender Entscheidung bleibt der bisherige Zustand aktiv; die Plattform zeigt Konsequenz, spätesten Entscheidungszeitpunkt und Eskalationspfad.

> **Akzeptanzkriterien:** Ein Executive kann innerhalb von fünf Minuten die wichtigsten Risiken, Optionen, Konsequenzen und erforderlichen Entscheidungen verstehen.

### J11 - PDF, PowerPoint und zielgruppengerechte Kommunikation erzeugen

> **ZWECK:** Aus dem gemeinsamen Datenmodell entstehen ohne manuelle Doppelarbeit belastbare Kommunikationsartefakte für Vorstand, CISO, Audit und Delivery.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| CISO, ISMS Manager, Consultant, Engagement Manager, Executive Sponsor | Vorstandstermin, Monatsbericht, Service Review, Audit, Workshop oder spontane Eskalation. | Freigegebene, versionierte Präsentation oder Bericht mit nachvollziehbarer Datenbasis. |

**Ablauf**

1. Der Nutzer wählt Anlass, Zielgruppe, Zeitraum, Scope, Sprache, Vertraulichkeit und gewünschtes Format.
2. Die Reporting Engine schlägt eine Gliederung und relevante Inhalte auf Basis der aktuellen Daten vor.
3. Aussagen enthalten Datenstand, Quelle, Unsicherheit und Drill-down-Verweis; sensible Inhalte werden geprüft.
4. Der Nutzer bearbeitet Narrative, blendet Inhalte ein oder aus und fordert fachliche Freigabe an.
5. Die Plattform erzeugt PPTX und/oder PDF im neutralen Standarddesign oder in konfigurierbarem Corporate Design.
6. Export, Empfänger, Version, Freigabe und spätere Aktualisierung werden protokolliert.

**Vertrauen & Emotion**  
Keine automatische Veröffentlichung. KI-generierte Formulierungen sind als Entwurf behandelt; Zahlen und Aussagen müssen auf Plattformdaten zurückführbar sein.

**Fehler- und Rückkehrpfad**  
Bei fehlenden Daten wird kein scheinbar vollständiger Bericht erzeugt. Lücken erscheinen als klarer Platzhalter, Ausschluss oder offene Prüfaufgabe.

> **Akzeptanzkriterien:** Ein Berater kann aus derselben Datenbasis innerhalb weniger Minuten eine Executive-Präsentation und einen detaillierten Fachbericht erzeugen.

### J12 - Ziel, Scope, Organisation oder Serviceumfang ändern

> **ZWECK:** Veränderungen werden kontrolliert umgesetzt, ohne Historie, Verantwortungen oder laufende Pflichten zu verlieren.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, ISMS Manager, Engagement Manager, Managed Service Lead, Tenant Administrator | Akquisition, neue Regulierung, Standortwechsel, Budgetänderung, Reorganisation, Serviceausbau/-abbau oder geänderte Risikobereitschaft. | Freigegebener Change Record, neue Versionen, Migrationsplan und nachvollziehbare Historie. |

**Ablauf**

1. Der Änderungsanlass und gewünschte Zielzustand werden als Change Request erfasst.
2. Die Plattform analysiert Auswirkungen auf Risiken, Controls, Rollen, Daten, Services, Preise/SLA-Annahmen, Audits und Zieltermine.
3. Betroffene Owner und Entscheider erhalten eine verständliche Impact Summary.
4. Optionen und Übergangsplan werden geprüft; laufende Aufgaben werden übernommen, ersetzt, pausiert oder beendet.
5. Freigabe erzeugt eine neue Version von Scope, Zielprofil oder Service Charter; alte Versionen bleiben unverändert nachvollziehbar.
6. Missionen, Integrationen, Rechte, Reports und Review-Termine werden kontrolliert migriert.

**Vertrauen & Emotion**  
Die Plattform darf Änderungen nicht rückwirkend in alte Entscheidungen hineinbearbeiten. Historische Wahrheit und aktueller Plan bleiben getrennt.

**Fehler- und Rückkehrpfad**  
Bei abgebrochener Migration gilt ein definierter Rollback- oder Zwischenzustand. Nutzer sehen deutlich, welche Version produktiv ist.

> **Akzeptanzkriterien:** Alle betroffenen Objekte und Verantwortlichen werden identifiziert; kein kritischer Task, Nachweis oder Zugriff geht durch die Änderung verloren.

### J13 - Service beenden, Anbieter wechseln oder Kundenwissen übergeben

> **ZWECK:** Der Kunde kann die Zusammenarbeit geordnet beenden oder übertragen, ohne Lock-in, Wissensverlust oder unkontrollierten Datenrest.

| Primäre Rollen | Auslöser | Erfolg / Ergebnis |
|---|---|---|
| Executive Sponsor, CISO, Engagement Manager, Managed Service Lead, Tenant Administrator, Datenschutz-/Security-Verantwortliche | Vertragsende, Anbieterwechsel, interne Übernahme, Fusion, Projektabschluss oder regulatorisch erforderliche Übergabe. | Vollständiges Exit Package, bestätigte Übergabe, abgeschlossene Zugriffe und Lösch-/Aufbewahrungsnachweis. |

**Ablauf**

1. Exit-Scope, Datum, Verantwortliche, Datenklassen, laufende Aufgaben, offene Risiken und Zielsystem werden festgelegt.
2. Die Plattform erstellt ein Exit Package aus Datenexport, Dokumenten, Decision Records, Audit Trail, offenen Maßnahmen und Betriebswissen.
3. Rechte und Integrationen werden stufenweise reduziert; notwendige Übergabezugriffe bleiben zeitlich begrenzt erhalten.
4. Offene Services und SLAs werden abgeschlossen, übertragen oder mit dokumentierter Entscheidung beendet.
5. Kunde bestätigt Datenübernahme und Funktionsfähigkeit; Löschung, Aufbewahrung und rechtliche Holds werden ausgeführt.
6. Ein Abschlussreview dokumentiert Zustand, Restverantwortungen, Lessons Learned und Lösch-/Übergabenachweise.

**Vertrauen & Emotion**  
Datenportabilität und Kundeneigentum sind Grundprinzipien. Die Plattform darf keinen operativen Lock-in durch unlesbare Exporte erzeugen.

**Fehler- und Rückkehrpfad**  
Wenn Zielsystem oder Empfänger nicht bereit sind, kann eine kontrollierte Übergangsphase aktiviert werden. Kritische Pflichten bleiben mit Owner und Frist sichtbar.

> **Akzeptanzkriterien:** Der Kunde kann nachweisen, welche Daten, Entscheidungen, offenen Pflichten und Zugriffe übergeben, aufbewahrt oder gelöscht wurden.

## 9. Anfängererlebnis, Vertrauen und Wiederaufnahme

### 9.1 Der erste Kontakt eines vollständigen Anfängers

Ein neuer Evidence Contributor oder Business Owner kennt weder ISMS-Begriffe noch die Plattformlogik. Die Oberfläche darf deshalb nicht mit Scope, SoA, Control Mapping oder Risikomatrix beginnen. Sie beginnt mit dem konkreten Anliegen: „Bitte bestätige bis Freitag, ob dieser Prozess personenbezogene Daten verarbeitet“ oder „Lade einen aktuellen Nachweis hoch und prüfe das Beispiel“.

| Moment | Nutzer denkt / fühlt | Erforderliche Gestaltung |
|---|---|---|
| Einladung | Ist das echt? Warum brauche ich das? | Absender, Organisation, Zweck, Frist und Datenschutz klar erklären. |
| Erste Seite | Was muss ich hier tun? | Nur eine Aufgabe, Klartext, Fortschritt und Hilfe anzeigen. |
| Eingabe | Was ist die richtige Antwort? | Beispiele, Tooltips, „Ich weiß es nicht“ und sichere Rückfrage bieten. |
| Abgabe | Ist das jetzt erledigt? | Bestätigung, Ergebnis, nächste Verantwortung und Änderungsmöglichkeit zeigen. |
| Rückfrage | Habe ich etwas falsch gemacht? | Konkrete fachliche Begründung statt generischem Fehler. |
| Späterer Login | Wo war ich? | Letzten sicheren Zustand, offene Punkte und Änderungen seitdem zeigen. |

### 9.2 Vertrauenssignale

**Datenherkunft**  
Quelle, Zeitpunkt, Owner, Aktualität und Vertrauensgrad sind dort sichtbar, wo sie entscheidungsrelevant sind.

**Rollen- und Mandantenkontext**  
Aktive Rolle, Organisation und Scope bleiben sichtbar; Rollenwechsel wird bewusst bestätigt.

**Menschliche Entscheidung**  
Kritische Empfehlungen zeigen Freigabepflicht, Entscheider und Folgen einer Ablehnung.

**Reversibilität**  
Entwürfe, Versionen, Rollback und Änderungsprotokoll verhindern Angst vor irreversiblen Klicks.

**Unsicherheit**  
Die Plattform darf „nicht ausreichend belegt“ sagen und konkrete nächste Verifikationsschritte vorschlagen.

**Keine Verkaufsfalle**  
Managed-Service-Optionen sind fachlich begründet; interne oder alternative Pfade bleiben sichtbar.

### 9.3 Universeller Wiederaufnahmepunkt

> **Session Handover für Menschen:** Nach Unterbrechung zeigt die Plattform: letzter bestätigter Zustand, seitdem eingetretene Änderungen, offene Entscheidung, gespeicherte Entwürfe, nächster sinnvoller Schritt und mögliche Vertretung. Dies ist das menschliche Gegenstück zum späteren Claude-/GitHub-Checkpoint-Modell.

## 10. Fehler-, Sonder- und Eskalationsreisen

Fehlerfälle sind Teil des Produktkerns. Ein System für Informationssicherheit verliert Vertrauen, wenn es gerade bei Datenlücken, Integrationsausfall oder Konflikten nur einen technischen Fehlercode zeigt.

| Situation | Sicheres Standardverhalten | Eskalation / Wiederanlauf |
|---|---|---|
| Integration ausgefallen | Letzten verlässlichen Stand anzeigen, Aktualität sichtbar senken, abhängige Empfehlungen kennzeichnen. | Connector-Owner informieren, Retry, manueller Ersatzweg, nach Wiederherstellung Differenzprüfung. |
| Daten widersprechen sich | Keine automatische Überschreibung; beide Quellen und Konflikt markieren. | Fachlichen Owner bestimmen, Entscheidung dokumentieren, Quelle priorisieren. |
| Empfehlung wird abgelehnt | Begründung, Alternative und Konsequenz erfassen; keine versteckte Wiederaktivierung. | Reviewdatum oder Schwellenwert für erneute Vorlage definieren. |
| Owner reagiert nicht | Erinnerung nach Regel; danach Vertretung oder Eskalation. | SLA-/Governancepfad, aber keine öffentliche Bloßstellung. |
| Rolle oder Person verlässt Organisation | Zugriff sofort kontrollieren; offene Verantwortungen sichtbar halten. | Vertretung, Übergabepaket, neue Ownerfreigabe. |
| Audit verschoben / Reise fällt aus | Plan nicht löschen; Termine und abhängige Aufgaben neu simulieren. | Remote-Alternative, Umbuchung, Managemententscheidung bei Zielrisiko. |
| KI/API nicht verfügbar | Deterministische Kernfunktion und manuelle Eingabe bleiben nutzbar. | Entwurf später neu erzeugen; keine kritische Reise blockieren. |
| Export enthält sensible Daten | Export vor Freigabe blockieren oder klassifizieren. | Berechtigten Freigeber, Redaction oder sicheren Kanal verlangen. |
| Mandantenkontext unklar | Schreibaktionen sperren; aktiven Kontext erneut bestätigen. | Admin-/Supportweg mit protokolliertem Zugriff. |
| Budget oder Kapazität reicht nicht | Route nach Wirkung und Pflicht neu priorisieren. | Risikoakzeptanz, Scopeänderung, Serviceoption oder Fristentscheidung. |

> **ENTSCHEIDUNG:** Kritische Kernreisen müssen ohne generative KI funktionsfähig bleiben. KI darf Qualität und Geschwindigkeit erhöhen, aber nicht die grundlegende Fortsetzungsfähigkeit bestimmen.

## 11. Journey-Messung und Service-Erfolg

Erfolg wird nicht nur über Klicks oder Aktivität gemessen. Entscheidend ist, ob die Reise schneller, verständlicher, sicherer und wirksamer zu einem verantwortbaren Ergebnis führt.

| Messbereich | Beispielkennzahlen | Nicht zulässige Fehlinterpretation |
|---|---|---|
| Time to Value | Zeit bis erster verständlicher Kundenstatus; Zeit bis erste freigegebene Mission. | Schnelligkeit darf nicht zulasten von Scope- oder Datenqualität gehen. |
| Time to Decision | Zeit vom Signal bis Decision Record; Anteil ohne Medienbruch. | Kurze Zeit ist nicht automatisch gute Entscheidung. |
| Time to Evidence | Zeit von Anforderung bis geprüfter Evidenz; Rückfragequote. | Viele Uploads bedeuten nicht hohe Nachweisqualität. |
| Wirksamkeit | Anteil umgesetzter Maßnahmen mit bestätigter Wirkung; Zielroutenfortschritt. | Reifegrad oder Auditstatus sind nicht das einzige Sicherheitsziel. |
| Servicequalität | SLA, First-time-right, Eskalationen, Review-Ergebnis, Kundennutzen. | Mitarbeiter dürfen nicht über rohe Aktivitätsmengen überwacht werden. |
| Verständlichkeit | Aufgabenabschluss ohne Support; Fehlklick-/Abbruchquote; Nutzererklärung. | Wenig Support kann auch auf Nichtnutzung hindeuten. |
| Vertrauen | Anteil nachvollziehbarer Empfehlungen; Korrekturen; Datenvertrauen. | Hohe Akzeptanz darf nicht durch versteckte Defaults erzwungen sein. |
| Portabilität | Vollständigkeit von Exit Package und Wiederanlauf. | Bindung durch Exporthürden ist kein Erfolgsindikator. |

> **Journey Review:** Für jede produktive Reise werden mindestens ein Nutzertest, ein Fehlerfalltest, ein Rechte-/Mandantentest, ein Datenqualitätsfall und ein Wiederaufnahmetest definiert. Journey-Erfolg fließt später in Definition of Done und Claude-Aufgaben ein.

## 12. Verbindliche Entscheidungen

- 04-D01: Die Produktlogik folgt dem wiederkehrenden Rhythmus Orientieren - Verstehen - Entscheiden - Handeln - Nachweisen - Lernen.
- 04-D02: Der Kunden- und Service-Lebenszyklus umfasst Entdecken, Onboarden, Baselinen, Aktivieren, Betreiben, Prüfen, Anpassen und Übergeben.
- 04-D03: Jede kritische Nutzerreise besitzt einen sicheren Fehler-, Abbruch- und Wiederaufnahmepfad.
- 04-D04: Zielprofile sind kundenindividuell; Audit-Readiness ist nur eine mögliche Zielperspektive.
- 04-D05: Managed Services werden transparent mit internen und unterstützten Alternativen verglichen.
- 04-D06: Aktivierung, Scope, risikorelevante Entscheidungen und sensible Exporte benötigen menschliche Freigaben.
- 04-D07: Datenherkunft, Aktualität, Unsicherheit und Vertrauensgrad sind Bestandteil der Reise.
- 04-D08: Umsetzung, Evidenz und Wirksamkeit werden getrennt behandelt.
- 04-D09: Reisen, Vor-Ort-Termine, Abwesenheiten, Vertretung und Kapazität beeinflussen Planung und Priorisierung.
- 04-D10: Berichte und Präsentationen werden aus demselben Datenmodell erzeugt und vor Veröffentlichung freigegeben.
- 04-D11: Kritische Kernreisen funktionieren ohne generative KI.
- 04-D12: Exit, Export, Wissenstransfer und Löschung sind Produktfunktionen und keine spätere Betriebsnotiz.
- 04-D13: Historische Entscheidungen und frühere Scopes werden nicht rückwirkend überschrieben.
- 04-D14: Journey-Metriken dienen der Produkt- und Serviceverbesserung, nicht verdeckter Mitarbeiterüberwachung.

## 13. Begründete Annahmen

- Die erste produktive Nutzung erfolgt wahrscheinlich mit einem Serviceanbieter und mehreren synthetischen oder Pilotmandanten.
- ISMS Manager und Consultants nutzen die Plattform täglich; Executives, Auditoren und Contributors ereignisbezogen.
- Ein vollständiger digitaler Zwilling entsteht schrittweise und beginnt mit einer bewusst unvollständigen Baseline.
- Kunden akzeptieren Serviceempfehlungen eher, wenn interne Alternative, Nutzen, Datenbasis und Exit sichtbar sind.
- Automatisierte Priorisierung ist nur vertrauenswürdig, wenn Nutzer Gründe sehen und Reihenfolgen übersteuern können.
- PPTX- und PDF-Generierung erzeugt besonders hohen Demo- und Alltagsnutzen.
- Reiseplanung und Vor-Ort-Audits bleiben in vielen Beratungsmodellen relevant.
- Konkrete SLA-, Preis- und Vertragslogik wird erst in Dokument 14 markt- und anbieterneutral vertieft.

## 14. Offene Fragen

| ID | Frage | Spätestens zu klären in |
|---|---|---|
| 04-O01 | Welcher Pilot- und Kundentyp dient als primäre Referenzjourney? | Dokument 05 / Pilotplanung |
| 04-O02 | Welche fünf Reisen müssen im ersten lauffähigen Build vollständig produktiv sein? | Dokument 05 und 20C |
| 04-O03 | Welche formalen Managementfreigaben und Schwellenwerte gelten im ersten Zielmarkt? | Dokument 09 und 19 |
| 04-O04 | Wie tief wird Offline-Unterstützung für Vor-Ort-Audits benötigt? | Dokument 06, 17 und 18 |
| 04-O05 | Welche Kalender-, Reise- und Ressourcenintegrationen sind im ersten Ausbau realistisch? | Dokument 15 und 17 |
| 04-O06 | Welche Daten müssen in einem Exit Package zwingend maschinenlesbar exportiert werden? | Dokument 18 und 19 |
| 04-O07 | Welche Journey-Metriken dürfen auf Personenebene sichtbar sein? | Dokument 15 und 19 |
| 04-O08 | Welche Sprachen und Barrierefreiheitsstufe sind für Version 1 verbindlich? | Dokument 06 |
| 04-O09 | Welche Teile der Strategie-DNA dürfen Benchmarking nutzen? | Dokument 09 und 19 |
| 04-O10 | Wie werden Preise und Vertragsstatus im Demo-Modus realistisch, aber nicht erfunden dargestellt? | Dokument 14 und Demo-Konzept |

## 15. Ideenparkplatz

**Voice Briefing**  
Rollenbezogene Audio-Zusammenfassung der Morning Mission und Änderungen.

**Offline Audit Companion**  
Temporär verschlüsselter Vor-Ort-Modus mit kontrollierter Synchronisation.

**Journey Replay**  
Zeitliche Wiedergabe einer Entscheidungskette für Audit, Lernen und Onboarding.

**Service Sandbox**  
Simulation eines Managed Service mit synthetischen Daten vor Aktivierung.

**Stakeholder Sentiment**  
Strukturiertes Erfassen von Akzeptanz, Blockern und Kommunikationsbedarf.

**Adaptive Lernreise**  
Anfänger erhalten kontextbezogene Mini-Lernschritte statt getrenntes Schulungsportal.

**Cross-Customer Pattern**  
Anonymisierte Muster zeigen bewährte Wege bei ähnlichen Kundenprofilen.

**Executive Scenario Room**  
Gemeinsame Live-Simulation von Budget-, Risiko- und Zielentscheidungen.

## 16. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming, Dokument 00-03 und AI-Builder-Arbeitsmodell. |

### Nächster Schritt

> **Folgedokument:** Dokument 05 - Produktlandkarte und vollständiger Funktionsumfang. Dort werden alle beschriebenen Reisen auf Module, Funktionen, Zustände, Abhängigkeiten und Prioritäten abgebildet.
