# Dokument 07 - Digitaler Unternehmenszwilling & Informationsgraph

**Arbeitsbezeichnung:** ISMS Managed Service Platform  
**Version:** 1.0  
**Status:** Erstellt  
**Stand:** 21.07.2026  
**Zweck:** Kanonisches fachliches Objekt-, Beziehungs-, Historien- und Vertrauensmodell der Plattform.

> **Zentrale Festlegung:** Der digitale Unternehmenszwilling ist keine einzelne Visualisierung. Er ist der versionierte semantische Kern, aus dem Rollenansichten, Entscheidungen, Workflows, Reports, Simulationen und Managed Services gespeist werden.

## 1. Dokumentauftrag und Abgrenzung

Dieses Dokument definiert, welche fachlichen Objekte die Plattform kennt, wie sie miteinander verbunden sind, wie Herkunft, Zeit, Qualität und Unsicherheit gespeichert werden und wie aus dem Modell nachvollziehbare Ursache-Wirkungs- und Entscheidungspfade entstehen. Es baut auf Dokument 00 bis 06 auf. ISMS-Prozesslogik folgt in Dokument 08, Risiko-/Reifegradberechnung in 09 und 10, Integrationen in 17, physische Architektur in 18 sowie Rechte und Datenschutz in 19.

## 2. Executive Summary

Der digitale Zwilling bildet das Unternehmen nicht vollständig technisch nach. Er modelliert nur die für Informationssicherheit, Governance, Resilienz, Entscheidungen und Servicebetrieb relevanten Objekte und Beziehungen. Die Plattform kann dadurch erklären, warum ein Zustand besteht, was von einer Veränderung betroffen ist, welche Handlung Wirkung erzeugt und wie belastbar die zugrunde liegenden Daten sind.

## 3. Grundprinzipien

- **P01 - Semantik vor Speichertechnik:** Der Objekt- und Beziehungsvertrag ist fachlich kanonisch; ob relational, graphbasiert oder hybrid gespeichert wird, bleibt Dokument 18 vorbehalten.
- **P02 - Stabile Identität:** Objekte behalten eine unveränderliche ID über Namens-, Owner-, System- und Statuswechsel hinweg.
- **P03 - Beziehungen sind erstklassige Daten:** Jede relevante Beziehung besitzt Typ, Richtung, Gültigkeit, Quelle, Vertrauensgrad und ggf. Owner.
- **P04 - Historie wird nicht überschrieben:** Freigegebene Zustände, Entscheidungen und Nachweise bleiben rekonstruierbar.
- **P05 - Beobachtung, Ableitung und Entscheidung trennen:** Importierte Fakten, berechnete Aussagen und menschliche Freigaben werden getrennt gespeichert und dargestellt.
- **P06 - Eine Wahrheit, mehrere Perspektiven:** Rollen sehen unterschiedliche Verdichtung, nicht unterschiedliche Datenrealitäten.
- **P07 - Unsicherheit ist sichtbar:** Datenlücken, Konflikte, veraltete Quellen und Modellannahmen werden nicht in einem Score versteckt.
- **P08 - Kausalität nur mit Begründung:** Wirkungswege tragen Regelversion, Annahmen und Vertrauen; bloße Korrelation wird nicht als Ursache dargestellt.
- **P09 - Mandantentrennung ohne Metadatenleck:** Auch Suche, Counts, Graphkanten, Exporte und Fehlertexte dürfen keine fremden Objekte verraten.
- **P10 - Erweiterbar ohne Schema-Chaos:** Branchenspezifische Objekte und Attribute verwenden versionierte Erweiterungspakete und Governance.
- **P11 - Menschliche Verantwortung bleibt explizit:** Owner, Entscheider, Reviewer und Serviceverantwortung sind fachliche Beziehungen, keine impliziten Nutzerfelder.
- **P12 - Der Twin ist handlungsorientiert:** Jedes Objekt kann in Entscheidung, Aufgabe, Workflow, Report, Service oder Auditkontext überführt werden.

## 4. Definition und bewusste Grenzen

**Der digitale Unternehmenszwilling ist:** ein mandantenbezogenes, zeitabhängiges und nachvollziehbares Modell aus Objekten, Beziehungen, Ereignissen, Quellen, Bewertungen und Entscheidungen.  
**Er ist nicht:** eine vollständige Echtzeitkopie jeder technischen Ressource, kein CMDB-Ersatz, kein Data Lake, kein SIEM und keine magische Wahrheit ohne Owner und Datenqualität.

### 4.1 Modellierungstiefe
- **Mindestkern:** Organisation, Scope, Prozesse, Informationen, kritische Assets, Risiken, Controls, Maßnahmen, Evidence und Owner.
- **Empfohlene Tiefe:** Lieferanten, Services, Anforderungen, Tests, Audits, Ziele und Managed Services.
- **Expertentiefe:** Komponenten, Schnittstellen, Bedrohungsszenarien, bitemporale Historie, Regel- und Simulationsartefakte.

## 5. Fünfschichtige Architektur

1. Erlebnis- und Entscheidungsschicht; 2. semantischer Informationsgraph; 3. Zeit, Herkunft und Vertrauen; 4. Integration und Automatisierung; 5. Persistenz und Sicherheit. Der semantische Vertrag ist stabiler als die konkrete Technologie.

## 6. Objektfamilien und kanonischer Katalog

| ID | Familie | Kernobjekte | Leitfrage |
|---|---|---|---|
| F01 | Tenant & Unternehmenskontext | Tenant, Organisation, Rechtseinheit, ISMS-Scope, Ausschluss, Strategie-DNA | Abgrenzung der Daten, Ziele und Verantwortung. |
| F02 | Organisation & Verantwortung | Organisationseinheit, Standort, Team, Person, Produktrolle, fachliche Rolle, Vertretung | Wer trägt wofür Verantwortung und in welchem Kontext? |
| F03 | Geschäft & Information | Business Capability, Geschäftsprozess, Produkt/Service, Information Asset, Datenklasse, Kritikalität | Was erzeugt Wert und was muss geschützt werden? |
| F04 | Technologie & Infrastruktur | Anwendung, IT-Service, System, Komponente, Cloud-Ressource, Endpoint, Netzwerkzone, Schnittstelle | Welche technischen Abhängigkeiten tragen das Geschäft? |
| F05 | Dritte & Lieferkette | Lieferant, Unterauftragnehmer, Vertrag, externe Leistung, Datenverarbeitung, Abhängigkeit | Welche externen Parteien und Leistungen beeinflussen Sicherheit und Resilienz? |
| F06 | Governance & Anforderungen | Framework, Requirement, Control Objective, Control, Control Implementation, Policy, Ausnahme | Welche Vorgaben gelten und wie werden sie umgesetzt? |
| F07 | Risiko & Veränderung | Threat, Vulnerability, Weakness, Risk Scenario, Risk, Incident, Finding, Change Signal | Was kann passieren, warum und mit welcher Auswirkung? |
| F08 | Arbeit, Nachweis & Assurance | Measure, Task, Evidence, Control Test, Assessment, Audit, Finding, Remediation | Was wird getan, geprüft und belegt? |
| F09 | Ziele, Entscheidungen & Services | Target Profile, Objective, KPI, Decision Record, Managed Service, SLA, Deliverable, Review | Wohin soll sich das Unternehmen entwickeln und wer unterstützt dabei? |

## 7. Objektvertrag und Identität

| Feld | Zweck | Regel |
|---|---|---|
| `object_id` | Unveränderliche, global eindeutige ID | Nie aus Namen oder externen IDs ableiten. |
| `tenant_id` | Primäre Mandantenzuordnung | Pflichtfeld; keine Cross-Tenant-Beziehung ohne freigegebenes Plattformobjekt. |
| `object_type` | Kanonischer Typ aus dem Objektkatalog | Versionierter Typvertrag. |
| `display_name` | Nutzerverständlicher Name | Änderbar; nicht identitätsstiftend. |
| `description` | Klartextzweck und Kontext | Optional, aber für kritische Objekte empfohlen. |
| `lifecycle_status` | Entwurf, aktiv, in Review, stillgelegt, archiviert | Typspezifische Status dürfen ergänzen, nicht widersprechen. |
| `scope_ids` | Geltende ISMS-/Service-/Audit-Scopes | Mehrfachzuordnung mit expliziter Gültigkeit. |
| `owner_ids` | Fachlicher und ggf. technischer Owner | Rolle und Gültigkeitszeitraum sind getrennt gespeichert. |
| `classification` | Vertraulichkeit und Schutzbedarf | Steuert Anzeige, Export, Retention und Zugriff. |
| `source_refs` | Quellsystem, Import, Datei oder Nutzer | Mehrere Quellen mit Priorität möglich. |
| `valid_time` | Fachlich gültig von/bis | Unterstützt historische Wahrheit. |
| `record_time` | Im System erfasst/ersetzt am | Unterstützt Auditierbarkeit und bitemporale Abfragen. |
| `version` | Version des fachlichen Zustands | Wichtige Freigaben erzeugen unveränderbare Versionen. |
| `quality_state` | Vollständigkeit, Aktualität, Konsistenz, Review | Dimensionen statt nur Gesamtampel. |
| `tags_custom_fields` | Konfigurierbare Erweiterungen | Governed Schema; keine unkontrollierte Freitextdatenbank. |

## 8. Lebenszyklus und Status

- **Entwurf:** Noch nicht belastbar; darf nicht still in Managementberichte einfließen.
- **Beobachtet:** Aus Quelle übernommen, aber fachlich noch nicht bestätigt.
- **Geprüft:** Plausibilität, Scope und Beziehungen fachlich geprüft.
- **Freigegeben:** Für den definierten Zweck verbindlicher Zustand.
- **In Änderung:** Geplante oder laufende Änderung mit Übergangszustand.
- **Überholt:** Durch neue Version ersetzt; historisch sichtbar.
- **Stillgelegt:** Nicht mehr aktiv, aber für Historie und Abhängigkeiten relevant.
- **Archiviert:** Außerhalb des Regelbetriebs; nur nach Berechtigung abrufbar.

## 9. Beziehungsmodell

Beziehungen sind eigenständige Datensätze. Sie besitzen Quelle, Ziel, kanonischen Typ, Richtung, fachliche Gültigkeit, Erfassungszeit, Status, Quelle, Vertrauensgrad, Owner und optional Gewicht oder Wirksamkeitsannahme. Jede Beziehung wird als **assertiert**, **importiert**, **abgeleitet** oder **freigegeben** gekennzeichnet.

| ID | Typ | Beispiel | Semantische Regel |
|---|---|---|---|
| R01 | `part_of` | Organisationseinheit -> Organisation | Hierarchie; verhindert Zyklen innerhalb derselben Hierarchie. |
| R02 | `located_at` | Asset/Team -> Standort | Physische oder primäre Betriebszuordnung. |
| R03 | `owns` | Person/Rolle/Einheit -> Objekt | Fachliche Verantwortung mit Gültigkeitszeitraum. |
| R04 | `operates` | Team/Lieferant -> System/Service | Operative Verantwortung; kann von Ownership abweichen. |
| R05 | `supports` | Capability/Prozess/Asset -> Capability/Prozess | Unterstützungsbeziehung ohne harte Laufzeitabhängigkeit. |
| R06 | `depends_on` | Prozess/Service/Asset -> Asset/Lieferant | Ausfall oder Qualitätsverlust kann Zielobjekt beeinträchtigen. |
| R07 | `processes` | Prozess/System/Lieferant -> Information Asset | Datenverarbeitung mit Zweck und Datenklasse. |
| R08 | `exposes` | Schwäche/Vulnerability -> Asset | Angriffs- oder Fehlermöglichkeit am Zielobjekt. |
| R09 | `threatens` | Threat -> Risk Scenario/Asset | Relevante Bedrohung für einen konkreten Kontext. |
| R10 | `affects` | Risk/Incident/Change -> Prozess/Information/Objective | Beschreibt mögliche oder bestätigte Wirkung. |
| R11 | `caused_by` | Risk/Finding/Incident -> Ursache | Kausale Hypothese oder bestätigte Ursache, mit Vertrauensgrad. |
| R12 | `mitigates` | Control/Measure -> Risk Scenario/Risk | Erwartete oder bestätigte Risikowirkung. |
| R13 | `implements` | Control Implementation -> Control | Lokale Umsetzung eines generischen Controls. |
| R14 | `satisfies` | Control/Evidence -> Requirement | Beitrag zur Anforderungserfüllung; partiell oder vollständig. |
| R15 | `evidences` | Evidence -> Control/Measure/Decision | Nachweisbezug mit Zeitraum und Prüfstatus. |
| R16 | `tests` | Control Test/Assessment -> Control Implementation | Prüft Design, Umsetzung oder Wirksamkeit. |
| R17 | `finds` | Audit/Assessment -> Finding | Herkunft eines Findings. |
| R18 | `remediates` | Measure -> Finding/Weakness | Behandelt konkrete Feststellung oder Schwäche. |
| R19 | `requires` | Objective/Service/Audit -> Control/Measure/Evidence | Verbindliche Abhängigkeit im jeweiligen Scope. |
| R20 | `contributes_to` | Measure/Control/Service -> Objective/KPI | Begründeter Wirkungsbeitrag ohne Garantie. |
| R21 | `delivered_by` | Managed Service/Deliverable -> Provider Team | Delivery-Verantwortung und Servicekontext. |
| R22 | `covered_by` | Object -> Managed Service/Contract | Zeigt, welche Objekte im Serviceumfang liegen. |
| R23 | `decided_in` | Risk/Change/Service -> Decision Record | Verknüpft fachlichen Zustand mit menschlicher Entscheidung. |
| R24 | `supersedes` | Version/Policy/Decision -> Vorgänger | Explizite Ablösung ohne historische Überschreibung. |
| R25 | `related_to` | Objekt -> Objekt | Nur als zeitlich begrenzter Fallback; muss später typisiert werden. |

## 10. Objekt-360 und Navigationsvertrag

Jede Objektseite beantwortet: Was ist das? Warum ist es wichtig? Womit hängt es zusammen? Wie entwickelt es sich? Was soll als Nächstes passieren? Sie zeigt Identität, Scope, Owner, Kritikalität, Beziehungen, Ursache/Wirkung, Datenvertrauen, Historie, Evidence und Aktionen.

## 11. Zeitmodell, Versionierung und Rekonstruktion

Die Plattform trennt **fachliche Gültigkeit** von **Zeitpunkt der Systemerfassung**. Dadurch kann sie beantworten: Wie war der freigegebene Zustand am Stichtag? Was wusste die Organisation damals? Welche Information wurde später rückwirkend korrigiert? Wichtige Zustände werden versioniert; Ereignisse verweisen auf Vorher/Nachher, Auslöser, Akteur, Quelle und Decision Record.

## 12. Herkunft, Datenqualität und Vertrauen

| Dimension | Kernfrage | Sichtbare Nachweise |
|---|---|---|
| Herkunft | Ist die Quelle bekannt, zulässig und nachvollziehbar? | Quelle, Connector, Importjob, Nutzer, Dokument, Extraktionsregel. |
| Aktualität | Ist die Information für den Zweck noch frisch genug? | Letzte Beobachtung, erwartete Frequenz, TTL, Stale-State. |
| Vollständigkeit | Sind Pflichtattribute und erwartete Beziehungen vorhanden? | Schema- und Scope-bezogene Regeln. |
| Konsistenz | Widersprechen sich Quellen, Status oder Beziehungen? | Konfliktregeln, Duplikate, Hierarchie- und Kardinalitätschecks. |
| Bestätigung | Wurde die Aussage fachlich geprüft oder freigegeben? | Ungeprüft, maschinell plausibilisiert, reviewed, freigegeben. |
| Verlässlichkeit | Wie belastbar ist Quelle oder Ableitungsregel? | Quellenklasse, Historie, Fehlerrate, Modell-/Regelversion. |
| Zweckeignung | Reicht die Qualität für diese Entscheidung oder diesen Report? | Kontextabhängiger Mindestschwellenwert statt Universalampel. |

Ein verdichteter Vertrauensindikator darf kontextabhängig berechnet werden, ersetzt aber nie die sichtbaren Dimensionen. Eine Datenlage kann für ein operatives Briefing ausreichend und für eine Vorstandsinvestition unzureichend sein.

## 13. Dateneingang und Synchronisation

Daten gelangen über manuelle Erfassung, geführte Workshops, Dateiimporte, API-Konnektoren, Event-Streams, Evidence Uploads und kontrollierte KI-Unterstützung in den Twin. Der Ablauf lautet: aufnehmen -> normalisieren -> identifizieren -> validieren -> Beziehungen bilden -> Konflikte markieren -> prüfen/freigeben -> veröffentlichen. Rohdaten und kanonischer Zustand bleiben getrennt.

## 14. Matching, Dubletten und Konfliktauflösung

Externe IDs, stabile Schlüssel und konfigurierbare Matchingregeln werden bevorzugt. Heuristische Matches erzeugen Kandidaten mit Begründung und Vertrauen. Ein Golden Record ist kein stilles Überschreiben: Quellen bleiben erhalten, Prioritätsregeln sind sichtbar und manuelle Merges reversibel.

## 15. Kausalität, Betroffenheit und Wirkung

Ein Signal wird über explizite Beziehungen und versionierte Regeln auf betroffene Objekte abgebildet. Die Plattform unterscheidet mögliche Betroffenheit, bestätigte Betroffenheit und tatsächlichen Impact. Wirkungspropagation stoppt bei fehlender Datenqualität, nicht unterstützter Regel oder Berechtigungsgrenze und fordert Review statt Scheingenauigkeit.

## 16. Abfragen, Suche und Perspektiven

Kernzugänge sind globale Suche, Objekt-360, Graph Explorer, Listen/Tabellen, gespeicherte Sichten, Impact View, Timeline und Scope View. Nutzer können z. B. fragen: Welche kritischen Prozesse hängen von diesem Lieferanten ab? Welche Risiken besitzen keine wirksame Control? Welche Evidence deckt mehrere Anforderungen ab? Welche Änderungen seit dem letzten Management Review beeinflussen die Zielroute?

## 17. Mandantenfähigkeit, Rechte und Datenschutz

Tenant ist harte Sicherheitsgrenze. Plattformreferenzen werden getrennt versioniert. Berechtigungen wirken auf Objekt, Beziehung, Attribut, Scope und Zweck. Verdeckte Beziehungen dürfen nicht über Trefferzahlen oder Fehlermeldungen erkennbar sein. Personenbezogene Daten werden minimiert; Rollen- und Teambezug wird bevorzugt. Details folgen in Dokument 19.

## 18. APIs, Events und Erweiterbarkeit

Der Objektvertrag benötigt CRUD-/Query-APIs, Batchimport, Change Events, Schema-Registry, Typ- und Beziehungsversionen sowie Export. Erweiterungspakete definieren zusätzliche Typen, Attribute, Validierungen, Visualisierungen und Mappings, ohne kanonische IDs oder Kernsemantik zu brechen.

## 19. End-to-End-Szenarien

- Neue Schwachstelle: Signal -> Asset Matching -> Szenario -> Prozessimpact -> Controlprüfung -> Decision Record -> Maßnahme/Service -> Wirksamkeitsprüfung.
- Audit: Scope -> Anforderungen -> Controls -> Evidence -> Sampling -> Finding -> Remediation -> historischer Abschlussstand.
- Lieferantenausfall: Lieferant -> Services -> Anwendungen -> Prozesse -> Ziele -> Notfalloptionen und Managemententscheidung.
- Scope Change: neue Einheit -> Datenimport -> Beziehungsprüfung -> Risikobaseline -> Zielroute -> Service- und Reportanpassung.

## 20. Synthetische Demodaten

Die Demoumgebung nutzt Nordwerk Manufacturing SE, Finovia Digital Bank AG, MediCore Health Services GmbH und Consulting Operator Demo. Jeder Tenant erhält konsistente Prozess-, Asset-, Risiko-, Control-, Audit-, Service- und Historienketten. Cross-Tenant-Analysen dürfen nur anonymisierte, freigegebene Benchmarks oder Plattformreferenzen verwenden.

## 21. Akzeptanzkriterien

- Jedes Kernobjekt besitzt stabile ID, Tenant, Typ, Status, Scope, Owner, Quelle, Klassifikation und Historie.
- Jede sichtbare Beziehung zeigt Typ, Richtung, Gültigkeit und Herkunft; kritische Beziehungen zusätzlich Vertrauensgrad und Reviewstatus.
- Ein Nutzer kann von Prozess zu Asset, Risiko, Control, Evidence, Maßnahme, Entscheidung und Service navigieren, ohne den Kontext zu verlieren.
- Die Plattform kann einen freigegebenen Stichtagszustand rekonstruieren und spätere Korrekturen davon unterscheiden.
- Importierte, manuelle, abgeleitete und freigegebene Aussagen sind visuell und technisch unterscheidbar.
- Datenlücken, Konflikte und veraltete Quellen werden nicht still in Scores oder Reports verborgen.
- Ein Objekt kann mehrere Quellen besitzen; Konflikt und Quellpriorität sind nachvollziehbar.
- Kausalitätswege nennen Regelversion, Input-Snapshot, Annahmen und menschliche Bestätigung.
- Graph- und Listenansicht liefern dieselbe fachliche Wahrheit und dieselben Berechtigungsgrenzen.
- Cross-Tenant-Daten werden weder über Suche, Counts, Kanten, Exporte noch Fehlermeldungen geleakt.
- Personenbezogene Daten sind auf den fachlich erforderlichen Mindestumfang beschränkt.
- Schema-Erweiterungen sind versioniert, testbar und ohne unkontrollierte Custom-Field-Erosion möglich.
- Die vier synthetischen Demo-Organisationen besitzen konsistente Objekt-, Risiko-, Control-, Audit- und Serviceketten.
- Kritische Änderungen erzeugen Version, Ereignis, Audit Trail und ggf. neuen Reviewbedarf.
- Kernfunktionen des Twins bleiben ohne generative KI nutzbar.

## 22. Verbindliche Entscheidungen

- **07-D01:** Der digitale Unternehmenszwilling ist das kanonische fachliche Modell der Plattform und keine optionale Visualisierung.
- **07-D02:** Der Informationsgraph ist ein semantischer Vertrag unabhängig von der später gewählten Datenbanktechnologie.
- **07-D03:** Jedes Objekt besitzt stabile ID, Tenant, Typ, Status, Scope, Owner, Klassifikation, Historie, Quelle und Qualitätszustand.
- **07-D04:** Beziehungen werden als eigenständige, versionierte Datensätze mit Typ, Richtung, Gültigkeit, Quelle und Vertrauen modelliert.
- **07-D05:** Assertierte, importierte, abgeleitete und menschlich freigegebene Aussagen werden getrennt gekennzeichnet.
- **07-D06:** Freigegebene historische Zustände werden nicht überschrieben; Änderungen erzeugen Versionen und Ereignisse.
- **07-D07:** Fachliche Gültigkeit und Zeitpunkt der Systemerfassung werden getrennt gespeichert, damit historische Sichtweisen rekonstruierbar sind.
- **07-D08:** Graph und Listen-/Tabellensichten sind gleichwertige Zugänge; kein Kernworkflow darf eine Graphvisualisierung voraussetzen.
- **07-D09:** Kausalitäts- und Wirkungsbeziehungen sind erklärbar und dürfen nur mit expliziter Regel, Quelle oder menschlicher Bestätigung propagieren.
- **07-D10:** Ein Gesamtvertrauensscore darf nur als Verdichtung genutzt werden; Herkunft, Aktualität, Vollständigkeit, Konsistenz und Review bleiben einzeln sichtbar.
- **07-D11:** Cross-Tenant-Beziehungen sind grundsätzlich verboten, außer zu versionierten Plattformreferenzen wie Frameworks oder öffentlichen Bedrohungsobjekten.
- **07-D12:** Personenbezogene Daten werden minimiert; fachliche Rollen und Teams werden bevorzugt gegenüber unnötiger Einzelpersonenmodellierung.
- **07-D13:** Jede kritische Objektseite folgt der Objekt-360-Logik: Kontext, Bedeutung, Beziehungen, Entwicklung, Vertrauen und nächster Schritt.
- **07-D14:** Generische Beziehung `related_to` ist nur ein temporärer Import- oder Migrationszustand und kein Zielmodell.
- **07-D15:** Abgeleitete Scores, Routen und Empfehlungen speichern Regel-/Modellversion, Input-Snapshot und Erklärungsartefakt.
- **07-D16:** Die Demoumgebung verwendet logisch konsistente synthetische Graphen für vier Organisationen und mehrere Rollen.
- **07-D17:** Datenkonflikte werden sichtbar verwaltet; die Plattform wählt nicht stillschweigend eine scheinbare Wahrheit.
- **07-D18:** Die physische Speicher-, Such- und Eventarchitektur wird in Dokument 18 festgelegt, ohne den semantischen Vertrag dieses Dokuments zu verändern.

## 23. Begründete Annahmen

- **07-A01:** Ein hybrides Persistenzmodell aus relationalen Daten, Suchindex, Objektspeicher und Graphzugriff ist wahrscheinlich sinnvoll.
- **07-A02:** Die Mehrzahl der Kunden startet mit unvollständigen, widersprüchlichen und unterschiedlich aktuellen Daten.
- **07-A03:** Konnektoren liefern sowohl stabile externe IDs als auch Daten, die nur heuristisch abgeglichen werden können.
- **07-A04:** Framework- und Bedrohungsobjekte können als versionierte Plattformreferenzen mehreren Tenants bereitgestellt werden.
- **07-A05:** Für kritische Daten braucht es fachliche Data Stewards oder Owner; Vollautomatisierung ist nicht belastbar.
- **07-A06:** Objekttypen und Beziehungen werden im Laufe der Produktentwicklung erweitert, weshalb Migrationen und Schema-Versionen notwendig sind.
- **07-A07:** Nicht jeder Kunde modelliert dieselbe Tiefe; Mindestkern, empfohlene Tiefe und Expertenmodell müssen unterschieden werden.
- **07-A08:** Bitemporale Historie ist für Entscheidungen, Audits und rückwirkende Analysen wertvoll, erhöht aber technische Komplexität.
- **07-A09:** KI kann Klassifikation, Matching und Zusammenfassung unterstützen, darf aber kritische Beziehungen nicht unbemerkt als Fakten setzen.
- **07-A10:** Externe technische Assets können hohe Änderungsfrequenz haben und brauchen andere Lebenszyklen als Policies oder Organisationsobjekte.
- **07-A11:** Rechte werden später tenant-, scope-, objekt-, beziehungs- und zweckbezogen differenziert.
- **07-A12:** Synthetische Demo-Graphen dürfen Komplexität verdichten, müssen aber fachlich konsistent und eindeutig als Demo markiert sein.

## 24. Offene Fragen

- **07-O01:** Welche Objekt- und Beziehungstypen sind für den ersten Build verbindlicher Mindestkern?
- **07-O02:** Welche konkreten Kardinalitäts- und Zyklenregeln gelten je Beziehungstyp?
- **07-O03:** Welche externe ID- und Matchingstrategie wird pro Konnektor verwendet?
- **07-O04:** Wie wird bitemporale Historie technisch umgesetzt und für Nutzer verständlich dargestellt?
- **07-O05:** Welche Datenqualitätsdimensionen fließen je Anwendungsfall in einen verdichteten Vertrauensindikator ein?
- **07-O06:** Welche Plattformreferenzobjekte dürfen tenantübergreifend geteilt werden und wie erfolgt Versionierung?
- **07-O07:** Welche personenbezogenen Attribute sind für Rollen, Audit und Evidence wirklich erforderlich?
- **07-O08:** Wie werden große, kurzlebige Cloud- und Endpoint-Bestände aggregiert, ohne den Graph unbedienbar zu machen?
- **07-O09:** Welche Konflikte dürfen automatisch nach Quellpriorität gelöst werden und welche benötigen menschliche Freigabe?
- **07-O10:** Welche Kausalitätsregeln sind deterministisch, welche statistisch und welche rein fachlich bestätigt?
- **07-O11:** Wie granular werden Evidence-Artefakte versioniert und gehasht?
- **07-O12:** Welche Graphabfragen und gespeicherten Sichten müssen in der ersten Demo echt funktionieren?
- **07-O13:** Wie werden Schema-Erweiterungen durch Branchenpakete genehmigt, getestet und migriert?
- **07-O14:** Welche Exportformate bilden Objekte, Beziehungen, Historie und Provenance portabel ab?
- **07-O15:** Wie werden Mandantenwechsel, Fusionen, Carve-outs und Serviceproviderwechsel im Twin modelliert?

## 25. Ideenparkplatz

- **Temporal Replay:** Zeitregler, der zeigt, wie der Twin zu einem früheren Stichtag aussah und welche Informationen damals bekannt waren.
- **Graph Diff:** Visueller Vergleich zweier Stände mit hinzugefügten, entfernten und geänderten Objekten sowie Auswirkungen.
- **Data Debt Map:** Landkarte der Datenlücken, veralteten Quellen und ungeklärten Ownership mit geschätztem Entscheidungsrisiko.
- **Twin Health Mission:** Tägliche Mission speziell zur Verbesserung von Datenqualität und Modellabdeckung.
- **Explain This Path:** Ein Klick erklärt eine komplette Wirkungskette in Klartext und nennt alle Quellen und Annahmen.
- **Scope Sandbox:** Änderungen am ISMS-Scope simulieren, ohne den freigegebenen Twin zu verändern.
- **Merger / Carve-out Mode:** Zwei Unternehmensgraphen kontrolliert zusammenführen oder einen Teilgraphen ausgliedern.
- **Knowledge Pattern Library:** Wiederverwendbare, anonymisierte Objekt- und Beziehungsmuster für Branchen und typische Architekturen.
- **Evidence Reuse Radar:** Zeigt, welche Nachweise mehrere Controls, Audits oder Kundenanforderungen abdecken können.
- **Graph Copilot with Guardrails:** Natürlichsprachige Abfragen, die nur auf berechtigte, zitierbare Graphdaten zugreifen und Abfragen offenlegen.
- **Resilience Blast Radius:** Schnelle Darstellung, welche Geschäftsprozesse und Ziele bei Ausfall eines Assets oder Lieferanten betroffen wären.
- **Twin Quality Benchmark:** Vergleich der Modellqualität gegen einen definierten Mindestkern, nicht gegen andere Kunden ohne Einwilligung.

## 26. Änderungsprotokoll

| Version | Datum | Status | Änderung |
|---|---|---|---|
| 1.0 | 21.07.2026 | Erstellt | Erstfassung aus Brainstorming und Dokument 00 bis 06. |

## Nächster Schritt
Dokument 08 - ISMS-Kernprozesse.
