# Offene Umsetzungsfragen

Diese Fragen sind aus der Konzeptbibliothek übernommen und dürfen nicht still entschieden werden, wenn sie eine materiale Bindung erzeugen.

| ID | Frage | Blockiert WP-001? | Owner / Gate |
|---|---|---:|---|
| O-TECH-001 | Welcher konkrete App-Stack und Package Manager werden verwendet? | **gelöst (ADR-0001)** | TypeScript/Next.js/NestJS/PostgreSQL, pnpm |
| O-GH-001 | Unter welchem privaten GitHub-Konto oder welcher Organisation liegt das Repository? | **gelöst (DR-0002)** | privat `Domme7/isms-managed-service-platform` |
| O-GH-002 | Welche Branch-Protection-Funktionen stehen im gewählten Plan zur Verfügung? | nein | Capability Check |
| O-CLAUDE-001 | Welche Claude-Code-Version, Agents, Skills und Hooks sind tatsächlich verfügbar? | ja | Capability Check |
| O-COST-001 | Welche kostenpflichtigen CI-/Cloudressourcen sind erlaubt? | nein | Human Product Owner |
| O-DEV-001 | Lokale Containerumgebung oder Dev Container? | **gelöst (ADR-0002)** | PGlite für Dev/Test, Docker-Postgres für Server; ORM = Drizzle |
| O-TEST-001 | Welche UI-/E2E-/Visual-Regression-Tools werden gewählt? | nein | QA + CTO ADR |
| O-REPO-001 | Wer übernimmt reale PR-Approvals in der Ein-Personen-Phase? | nein | Human Product Owner |

## Dokument 07 – Modell- & Konzeptfragen (aus WP-003 Slice 1)

Von zwei unabhängigen Reviews (Code + Concept-Consistency) als **echte** Lücken/Widersprüche der Quelle
bestätigt. Nichts wurde still entschieden; reversible Modellierungsentscheidungen sind offengelegt
(siehe `packages/contracts/PROVENANCE.md`). **O-D07-02** und **O-D07-03** sind materiale
Konzeptwidersprüche und benötigen eine Entscheidung (Human Gate / Concept Author) — sie blockieren
Slice 1 nicht (beide Varianten bleiben bis dahin dual erhalten).

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-D07-01 | Klassifikationsskala (Vertraulichkeit/Schutzbedarf) fehlt in Dok. 07 §7 (verweist auf Dok. 19) | Lücke (später) | `classification` wertoffen | klärt sich mit Dok. 19 / Security |
| O-D07-02 | Lifecycle-**Schreibweise** §8 (groß) vs. Dok. 05 §7 (klein) | **Konzeptwiderspruch (Human Gate)** | beide dual erhalten | Master-Index-Owner / Concept Author |
| O-D07-03 | Kanonische Lifecycle-Liste: §7-Kurzform vs. §8-Langform | **Konzeptwiderspruch (Human Gate)** | §8 als kanonisch behandelt, §7 koexistiert | Concept Author |
| O-D07-04 | Werteskalen für 6 der 7 Datenqualitätsdimensionen fehlen (§12; nur „Bestätigung" enumeriert) | Lücke (später) | nur `confirmation_level` enumeriert | Concept Author (vgl. §24 07-O05) |
| O-D07-05 | Beziehungs-`status`: §9 nennt „Status" ohne Werteliste | Lücke | `status` optional/wertoffen | Concept Author |
| O-D07-06 | Vertrauensgrad-Skala (§9) unspezifiziert (07-O05 offen) | Lücke | `confidence` optionale Zahl | Concept Author |
| O-D07-07 | Beziehungs-Richtung-Werteliste (§9) unspezifiziert | reversibler Default | `{gerichtet, ungerichtet}`, Default `gerichtet` | reversibel (CTO/Concept) |
| O-D07-08 | `scope_ids`-Semantik: Feldname (IDs) vs. §7 „explizite Gültigkeit" | reversible Modellierung | `{scope_id, valid_time?}` | reversibel |
| O-D07-09 | Kardinalitäts-/Zyklenregeln für Beziehungen (§24 07-O02 offen) | Lücke (späteres WP) | nicht als Constraint erzwungen | Concept / CTO |
| O-D07-10 | Objektseitige Assertion-Art: §7 kennt kein objektseitiges `assertion_kind` (nur Beziehung §9); P05/§21 verlangt die Unterscheidung auch für Objekte | Beobachtung | indirekt über `quality_state.Bestätigung` + `source_refs` | Concept Author |
| O-D07-11 | `confirmation_level` derzeit auf jeder Qualitätsdimension erlaubt (§12 ordnet Skala nur „Bestätigung" zu) | Refinement (später) | als bekannte Unter-Constraint notiert | Builder / CTO |

## Dokument 13–15 vs. Contract – Managed-Service-Modellfragen (aus WP-012 Slice 1)

Beim Ausmodellieren der Managed-Service-Demo-Schicht (nur kanonische Typen, nichts erfunden) wurden
folgende echte Lücken zwischen Dok. 13–15 und dem kanonischen Objektmodell (Dok. 07 / `@isms/contracts`)
sichtbar. Details: `packages/demo-seed/seed-manifest.json` (open_questions) und README.

| ID | Frage | Aktueller Umgang | Owner / Gate |
|---|---|---|---|
| O-WP012-01 | Dok. 13 trennt Service **Definition/Offer/Instance**; kanonisch existiert nur `Managed Service` | nur die Service Instance materialisiert | Concept Author (Dok. 07/13-Abgleich) |
| O-WP012-02 | **Service Run** (Dok. 13 §4.5) und **Work Package** (Dok. 15 §4.4) haben keinen Objekttyp | Deliverables hängen direkt an der Service Instance | Concept Author |
| O-WP012-03 | **Portfolio** (Dok. 15 §4.1, mandantenübergreifend) und **Engagement** (§4.2, je Kunde) haben keinen kanonischen Typ — wird Engagement Twin-Objekt oder M27-Modulobjekt? | Portfolio nur als UI-Aggregation je Mandant, nie per Kante | Concept Author / CTO |
| O-WP012-04 | R21 `delivered_by` zielt auf „Provider Team"; Dok. 07 §7/§17 sieht dafür **freigegebene Plattformobjekte/Plattformreferenzen** vor, die im Contract noch nicht ausgeprägt sind | Übergang: Delivery-Team je Mandant als tenant-eigenes `Team` (reversibel) | Concept Author / Security |
| O-WP012-05 | Keine typisierten SLA-/KPI-Felder im Objektvertrag (Betriebszeit, Reaktionszeit, Zielwert) | Werte als Klartext in `description`; keine erfundenen Felder | Concept Author (Dok. 07 §7-Erweiterung?) |
| O-WP012-06 | **F09-Komposition via `part_of`** (SLA/Deliverable/Review → Managed Service) und `evidences`-Quelldomäne `Deliverable`: nur durch Regel-, nicht Beispielspalte von Dok. 07 §9 gedeckt (verallgemeinert per Concept-Review) | verwendet, als bestätigungsbedürftig markiert | Concept Author |
| O-WP013-01 | **Keine kanonische Kante zwischen `Risk` und `Risk Scenario`** (Dok. 07 §9): ein bewertetes Szenario lässt sich nicht formal einem Risiko zuordnen — Dok. 08 setzt diese Beziehung fachlich aber voraus | ISMS-Ansicht zeigt Risk, Szenario und Weakness als eigenständige Karten mit ihren tatsächlichen Kanten; **keine** Zuordnung konstruiert | Concept Author (Ergänzung zu CCP-002) |

## Objekt-360-Detailseite – offene Fragen (aus WP-014, Bau + drei unabhängige Reviews)

Die Objekt-360-Seite ist die erste **generische** Hauptseite über **alle** 40 Seed-Objekte. Dadurch
werden Lücken sichtbar, die spezialisierte Ansichten (ISMS, Services) umgehen konnten. Keine davon
wurde im Code geraten — jede erscheint im Produkt als ehrlicher Leer-/Lückenzustand.

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-WP014-01 | **Kritikalität** *(präzisiert 2026-07-23, WP-019)*: Die **Abbildung** der PDF-Folie „Objekt-360 und Navigationsvertrag" (Dok. 07) nennt Kritikalität ausdrücklich („Was ist das und warum ist es wichtig? Klartext, Scope, **Kritikalität**, Zielbezug…", visuell verifiziert), und „Kritikalität" ist Kernobjekt der Familie F03 — der Objektvertrag kennt aber **kein** Feld dafür. Kein Ableitungsartefakt: der Textlayer trug das Wort nicht, die Grafik schon | **Konzeptlücke (bestätigt)** | nur die belegte `classification` wird gezeigt; Lücke im Produkt benannt | Concept Author (Feld, eigener Objekttyp oder spätere Ableitung nach Dok. 09?) |
| O-WP014-02 | **Vertrauensgrad je Objekt**: Dok. 06 §6 verlangt ihn querschnittlich; `quality_state.confidence_indicator` ist im Seed nicht gesetzt und darf laut WP-014-Nicht-Ziel nicht berechnet werden (Dok. 07 D10 erlaubt die Berechnung, ordnet sie aber keinem WP zu) | **Konzeptlücke** | ersatzweise wird die belegte Dimension „Bestätigung" gezeigt; Kanten tragen echtes `confidence` | Concept Author + Product (Seed belegen, berechnen oder dauerhaft ersetzen?) |
| O-WP014-03 | **Scopes sind keine Objekte**: `scope_ids` verweist auf Kennungen (`scope-nordwerk-isms-core` u. a.), die nicht als Seed-Objekte vom Typ „ISMS-Scope" (F01) existieren | Datenlücke | Scope-Zuordnung bleibt sichtbar rohe ID (Fail-loud) und wird in der UI als Lücke ausgesprochen; per Test belegt | Concept Author / Seed (Ergänzung zu CCP-002) |
| O-WP014-04 | **Session-Mandant vs. Routen-Mandant**: `/twin/[tenantId]/…` ist parameter-gebunden, `/isms` und `/services` sind session-gebunden. Nach einem Portfolio-Klick zeigt die Topbar den aktiven, die Kontextzeile den verlinkten Mandanten — zwei Kontextaussagen auf einem Bildschirm | Produktfrage (heute keine Sicherheitsgrenze) | dokumentiert in **DR-0004**; kein Code-Umbau, Acceptance 10 verlangt den Mandanten des Objekts | Product + Security **vor Dok. 19 (echte Authz)**: mandantenübergreifender Deep-Link erlaubt? Mit welcher Berechtigung und welchem Audit Record? |
| O-WP014-05 | **Ungerichtete Beziehungen**: `RELATIONSHIP_DIRECTION` lässt neben `gerichtet` weitere Werte zu; die Objekt-360-Seite sortiert jede Kante in „eingehend" oder „ausgehend" und würde „Richtung: ausgehend (ungerichtet)" anzeigen | Lücke (latent, Seed nutzt nur `gerichtet`) | keine Sonderbehandlung gebaut | Concept Author (dritte Liste, beidseitig, oder Richtungsangabe unterdrücken?) — vgl. O-D07-07 |
| O-WP014-06 | **„Hilfe" als Querschnittselement**: Dok. 06 §6 nennt Hilfe neben Rolle, Mandant, Scope, Datenstand, Vertrauensgrad und Version. Es gibt keinen Erklärzugang zu Objekttypen, Lebenszyklus-Ständen, Bestätigungsstufen oder R-IDs | Lücke (späteres WP) | nicht gebaut; Klartext-Labels mildern das teilweise | Product / UX (eigenes Glossar-/Hilfe-WP oder bewusst später?) |
| O-WP014-07 | **Keine Kante Evidence ↔ Measure im Seed**: der in WP-014 formulierte Navigationspfad (Prozess → Asset → Risiko → Control → Evidence → Maßnahme → Service) ist nur über Zwischenschritte begehbar | Datenbefund | im Navigationspfad-Test ehrlich ausgewiesen statt kaschiert; keine Kante erfunden | Concept Author / Seed (fehlt die Kante fachlich, oder ist die WP-Reihenfolge nur eine Aufzählung von Stationen?) |
| O-WP014-08 | **„Ohne Kontextverlust navigieren" (Dok. 07 §21)** ist derzeit nur über den Browser-Zurück-Button erfüllt: kein Breadcrumb, kein Pfad der besuchten Objekte | Produktfrage | Rücklink führt immer auf die Mandantenseite (bewusst, siehe DR-0004) | Product / UX (gehört ein Objektpfad zum Navigationsvertrag oder erst zu Suche/gespeicherten Sichten, Dok. 07 §16?) |
| O-WP014-09 | **Client-Bundle enthält den vollständigen `DEMO_SEED` aller Mandanten**: `/isms` und `/services` rendern client-seitig (dokumentierte WP-012/013-Entscheidung). Mit **echten** Daten wäre das eine Mandantengrenzverletzung | **Security-relevant, sobald echte Daten** | WP-014 verschärft es nicht, macht es aber breiter sichtbar; `objectDetailHref` wurde deshalb in ein seed-freies Modul ausgelagert | Security / CTO: Umstellungszeitpunkt auf serverseitige Ableitung (Muster `/twin`) terminieren — **spätestens mit der DB→UI-Anbindung**, zusammen mit FINDING-0004 |
| O-WP014-10 | **Beispielspalte von Dok. 07 §9 als Einschränkung**: WP-014 begrenzt die Beobachtung „kein Nachweis verknüpft" auf die laut R15 nachweisfähigen Objekttypen (Evidence → Control/Measure/Decision). WP-012 (O-WP012-06) hatte dieselbe Beispielspalte umgekehrt als **nicht abschließend** behandelt | **Methodische Inkonsistenz** | beide Stellen im Code mit Quelle und Begründung kommentiert; die Einschränkung ist eine reversible Anzeigeentscheidung | Concept Author: ist die Beispielspalte normativ oder illustrativ? (Ergänzung zu CCP-002) |
| O-WP014-11 | **Deutsche Glossen nur für 7 von 22 genutzten Objekttypen**: Die Objekt-360-Seite übernimmt die bereits im Produkt sichtbaren Glossen (z. B. „Schwachstelle (Weakness)"). Für 11 weitere im Seed genutzte Typen (Control, Control Implementation, Threat, Requirement, Framework, Information Asset, Team, Managed Service, SLA, Deliverable, Review) existiert **keine freigegebene deutsche Bezeichnung** — der Nutzer liest sie roh englisch in einer deutschen Oberfläche | Lücke (Terminologie) | keine Übersetzung erfunden (Regel „nichts erfinden"); Fallback = kanonischer Typ | Product / ISMS-Domain-Lead: verbindliches deutsches Glossar der Objekttypen (vgl. O-WP014-06 Hilfe/Glossar) |

## Mission Control „Heute" – offene Fragen (aus WP-016, Planung)

Beim Zuschnitt von WP-016 wurde geprüft, was Dok. 06 §7 S01/§8 und Dok. 10 §5 für den Ort „Heute"
verlangen und was der Datenbestand davon trägt. Ergebnis: die **Morning Mission ist auf der
heutigen Datenlage nicht baubar, ohne sie zu erfinden** — sie wird deshalb bewusst **nicht** gebaut
(Begründung im WP, Abschnitt „Warum die Morning Mission hier fehlt"; im Produkt sichtbar gemacht).

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-WP016-01 | Dok. 06 §7 S01/§8 definiert die **Inhalte** von Mission Control, aber **keine rollenabhängige Reihenfolge**; rollenbezogen dokumentiert sind nur „Erlebnis"/„Bewusst vermeiden" je **Welt** (§5), nicht je Rolle (R01–R12) | Lücke | Betonung/Reihenfolge wird aus §5 abgeleitet, als reversible Anzeigeentscheidung mit Quellzeile im Code belegt; **keine** rollenabhängigen Daten | Product / UX |
| O-WP016-02 | **„Seit meinem letzten Besuch"** (Dok. 06 §7 S01, §16, 06-D09): es existiert kein Besuchszeitpunkt, kein bestätigter Zustand, kein Entwurf und kein Ereignis — die Session speichert nur `roleId`/`tenantId` | Lücke (Daten + Produkt) | Wiederaufnahme wird **nicht** gebaut; im Produkt als Datenlücke benannt | Product + Concept Author (gehört Wiederaufnahme zu WP-008 oder in ein eigenes WP?) |
| O-WP016-03 | **Aufgaben und Entscheidungen fehlen im Seed:** die Objekttypen `Task` (F08) und `Decision Record` (F09) existieren im **Contract**, sind aber in **keinem** Mandanten materialisiert — damit fehlt die Grundlage für Morning Mission *und* Decision Center | Datenlücke | nichts erfunden; die Begründung ist im Produkt sichtbar | Concept / Seed-Owner: **Seed-Erweiterung als eigenes WP vor WP-008?** |
| O-WP016-04 | Dok. 10 §5.1/§18 verlangen **Frist, Aufwand, Kapazität und Priorität**; der Objektvertrag (Dok. 07 §7) kennt **kein** solches Feld — offen, ob das Envelope-Felder, eigene Objekttypen oder Moduldaten außerhalb des Zwillings werden | **Konzeptlücke** | nichts erfunden, nichts abgeleitet | Concept Author (Ergänzung zu CCP-002/003?) |
| O-WP016-05 | Gehört zu jeder Datenlage-Beobachtung ein **Drilldown** auf die betroffenen Objekte (Dok. 06 §17 verlangt „Auswirkungen sichtbar")? Eine gekürzte Liste wäre eine implizite Priorisierung, eine vollständige kann sehr lang werden | Produktfrage | WP-016 zeigt nur Zählung + Ermittlungsregel und verlinkt in den Zwilling | Product / UX |
| O-WP016-06 | **Faktenkorrektur (erledigt):** `CURRENT_STATE.md` und die WP-014-Review-Notiz sprachen von „41 Objekten"; belegt sind **40 Objekte / 54 Beziehungen** (Nordwerk 31/43, Consulting Operator 9/11) | Dokumentationsfehler | **korrigiert** in `CURRENT_STATE.md`, `ACTIVE_WORK_PACKAGE.md` und `reviews/WP-014_INDEPENDENT_REVIEW.md`; Zahlen am Seed nachgerechnet statt aus Agentenberichten übernommen | erledigt (Orchestrator) |
| O-WP016-07 | **Kein Vertragsfeld benennt eine Erfassungswelle fachlich:** WP-016 AC 4 verlangte wörtlich die Zuordnung „15.01.2026 ISMS-Kerngraph / 16.02.2026 Managed-Service-Schicht". Diese Namen sind Fakten der Seed-**Quelldateien**, nicht der Envelopes — und sie wären zusätzlich **faktisch unscharf**: die zweite Nordwerk-Welle trägt Objekte **beider** Scopes | **Konzeptlücke + bewusste AC-Abweichung** | statt eines erfundenen Wellennamens werden die belegten `scope_ids` ausgewiesen; die Abweichung von AC 4 ist im Code begründet und hier festgehalten | Concept Author (Dok. 07 §7: Feld für Erfassungs-/Ladekontext?) + Product-Gate: Abweichung akzeptieren oder belegbare Wellenbenennung schaffen |
| O-WP016-08 | **Querschnittsfelder ohne Mandantenwert:** Dok. 06 §6 verlangt „Vertrauensgrad" und „Version" querschnittlich auf jeder Hauptseite. Beide sind Objekt- bzw. Kantenfelder — für eine **Mandantenseite** wie `/heute` existiert kein belegter Wert, und ein aggregierter wäre eine verbotene Verdichtung | Lücke | beide Felder bleiben auf `/heute` leer statt berechnet; im Code als offene Frage markiert | Product / UX + Concept Author (Dok. 06 §6 vs. Dok. 07 D10) |

## Konzeptquellen und Entscheidungsschicht (aus WP-017 und dem PDF-Abgleich)

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| **O-KONZ-01** | **Die Konzeptdokumente bestimmen im Deckblatt das Markdown zur „Quelle der Wahrheit"** („PDF/DOCX sind geprüfte Lesefassungen", verifiziert an Dok. 07). DR-0006 stellt dem die PDFs voran — weil die Voraussetzung „geprüft" nachweislich nie eingelöst wurde (FINDING-0007) | **Konzeptwiderspruch, bewusst offen** | PDF gilt für den **Inhalt**, bis die Markdown-Fassungen quellentreu sind (WP-019). Danach übernimmt das Markdown wieder die im Konzept vorgesehene Rolle — abgesichert durch einen Treue-Check statt durch Behauptung. Nachtrag in **DR-0006** | Owner: Ist das die gewünschte Auflösung, oder soll das Markdown sofort wieder autoritativ sein? |
| O-WP017-01 | **`Task` hat keinen einzigen Beziehungstyp** in Dok. 07 (R01–R25) — weder als Quelle noch als Ziel. Aufgaben wären beziehungslose Waisen | **Konzeptlücke, blockierend** | Tasks **nicht** materialisiert; damit bleibt **WP-008 Morning Mission blockiert** | Concept Author — vgl. O-WP016-03 |
| O-WP017-02 | **Neun der 14 Decision-Card-Pflichtfelder** (Dok. 10 „Decision Cards" §9.1) haben **keinen Träger** im Objektvertrag, fünf nur teilweise | **Konzeptlücke** | Register zeigt nur Belegtes und benennt den Feldabgleich sichtbar; keine Decision Card behauptet | Concept Author + Owner (E-02, DR-0007) |
| O-WP017-03 | Der Entscheidungs-Lebenszyklus kennt **keinen Ablösezustand**; verwendet wird der generische Stand „Überholt" (Dok. 07 Lebenszyklus) | reversible Modellierung | im Code mit Quelle kommentiert | Concept Author |
| O-WP017-04 | **R23 `decided_in`**: ist die Kante der *Zielbezug* oder der *Auslöser* der Entscheidung? Dok. 10 §9.1 führt beide als eigene Pflichtfelder | Lücke | als belegter Bezug gezeigt, ohne die Rolle zu behaupten | Concept Author |
| O-WP017-05 | Dok. 10 §9.1 verlangt „Owner **und** Approver". Der Contract kennt nur `owner_kind` (`fachlich`/`technisch`) und R03 `owns` — **ein Approver ist nicht abbildbar** | **Konzeptlücke** | Verantwortung wird gezeigt, Freigabe ausdrücklich **nicht** behauptet | Concept Author + Security (Freigaben sind Human Gates) |
| O-WP017-06 | Die Leitfrage des Ortes lautet „Welche Geschäftsentscheidung ist **jetzt erforderlich**?" — eine Dringlichkeitsfrage, die die Datenlage nicht beantwortet | Produktfrage | Seite sagt direkt unter der Leitfrage, dass sie diese nicht beantwortet | Product/UX: Leitfrage anpassen oder doppelte Verneinung dauerhaft hinnehmen? |
| O-WP017-07 | **Datensatzversion vs. fachliche Ablösung:** R24 `supersedes` ist eine *fachliche* Ablösung „ohne historische Überschreibung"; `record_time.replaced_at` wäre eine *Datensatz*ersetzung. Beides bleibt bewusst getrennt | Modellfrage | `version: 1` und kein `replaced_at`; nur die R24-Kante trägt die Ablösung | Concept Author |
| O-WP017-08 | Entscheidungen sind nur für **einen** Mandanten ausmodelliert; ein Betreiber-Nutzer sieht an diesem Ort dauerhaft nur den Leerzustand | Datenlücke | ehrlicher, **mandantenlokaler** Leerzustand | löst sich mit **WP-021** (Demo-Welt, DR-0007 E-01) |
| O-WP017-09 | Für `Decision Record` existiert **keine freigegebene deutsche Glosse**; auf einer deutschsprachigen Seite steht „Objekttyp: Decision Record" | Lücke (Terminologie) | keine Übersetzung erfunden | Product/ISMS-Domain-Lead — vgl. O-WP014-11 |
| O-WP017-10 | **Kein fachliches Ende der Kanten eines abgelösten Stands:** das Objekt endet (`valid_time.to`), seine Bezugs-, Nachweis- und Verantwortungskanten bleiben offen. Ob eine Ablösung die Kanten beendet, sagt das Konzept nicht | Lücke | Kanten bleiben offen, im Produkt als Beobachtung benannt | Concept Author |
| O-WP017-11 | **Zweite Decision-Card-Definition:** Dok. 06 „Collaboration" führt im PDF eine **eigene** Pflichtfeldliste (u. a. Gegenargument, Vertretung, Freigabestufe, Erfolgskriterium, Review-Datum), die im Markdown vollständig fehlte und von der Dok.-10-Liste abweicht | **Konzeptwiderspruch** | WP-017 folgt Dok. 10 §9.1 und benennt die Abweichung | Concept Author: welche Liste ist kanonisch? |
| O-WP017-12 | **„Freigabe" ist Pflichtinhalt des Decision Record** (Dok. 10, Abschnitt „Decision Cards", Unterabschnitt „Decision Record"): festgehalten werden u. a. *Freigabe* und *spätere Ist-Wirkung*. Der Objektvertrag kennt **weder Freigebenden noch Freigabezeitpunkt** — und `lifecycle_status: 'genehmigt'` darf laut Dok. 08 (08-D07) **nicht** dafür stehen, weil ein Lebenszyklus-Stand kein Prüf- oder Freigabeergebnis ist | **Konzeptlücke**, enger als O-WP017-05 (dort nur der Approver als *Rolle*) | Register zeigt den Lebenszyklus-Stand ausdrücklich als „kein Prüf- oder Freigabeergebnis"; eine Freigabe wird **nirgends** behauptet | Concept Author + Security (Freigaben sind Human Gates) — gehört in dasselbe Change Proposal wie E-02 |

## Werkzeuge und sichtbare Abnahme (aus WP-018)

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-WP018-01 | Dok. 20C „CI- und Quality-Gate-Pipeline" verlangt im Fast-/PR-Gate weit mehr als Lint: Secret Scan, Datei-/Größenprüfung, Supply-Chain-Prüfung, statische Securityanalyse, visuelle Regression, Docs-/Linkprüfung, Seed-Validierung in CI | Prozess-/CI-Lücke (20C-Soll) | nur Formatprüfung + Lint gebaut; Rest benannt | program-manager (Queue-Schnitt), Security-Anteile mit Security |
| O-WP018-02 | „Reproduzierbar" bei Screenshots heißt gleiche Motive/Namen/Datenstand — **nicht** pixelidentisch. Echte visuelle Regression (Baseline + Diff) fehlt | Lücke (Werkzeug) | ehrlich benannt; Screenshots sind Abnahme-Artefakte für Menschen | program-manager (eigenes WP bei Bedarf) |
| O-WP018-03 | axe misst nur den automatisierbaren Teil von A11y; Tastatur und Screenreader-Semantik bleiben manuell | Lücke (Methode) | axe-Ergebnis wird nie als „A11y vollständig" ausgegeben; manuelle QA bleibt Pflicht | QA / UX |
| O-WP018-04 | QA-Lauf in GitHub Actions = Browser-Download + CI-Minuten = **Kosten** | **Owner-Entscheidung** (vgl. O-COST-001) | QA-Lauf bleibt lokal; CI schlank | Human Product Owner |
| O-WP018-05 | `docs/project/visual/WP-0xx/` wächst mit jedem WP — alles behalten, ablösen, nur letzter Stand? | Prozessfrage (Repo-Größe) | nur WP-018/ angelegt (~1,1 MB je Lauf); Strategie ab dem zweiten Ordner offen | Owner + program-manager |
| O-WP018-06 | Abnahme zeigt die Default-Perspektive R01/Nordwerk — will der Owner je WP weitere Perspektiven sehen (leerer Mandant, Operator, andere Rolle)? | Produkt-/Prozessfrage | Default im Skript dokumentiert | Human Product Owner |
| O-WP018-07 | Reichweite des Prozessvokabular-Wächters: geprüft werden die Inhaltskomponenten der echten Orte — **nicht** 404-/Fehlerzustände, nicht die View-Shell-Zustände („Lade Kontext …", „Nicht angemeldet"), nicht Topbar/LoginForm, nicht `aria-*`-Attributwerte, nicht Platzhalterseiten | Lücke (Reichweite, bewusst) | im Testkommentar benannt statt Vollständigkeit behauptet | QA (Erweiterung bei Bedarf) |

## Konzeptfassungen und PDF-Ableitung (aus WP-019)

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-WP019-01 | **Automatisierter Treue-Check PDF↔Markdown fehlt** — Voraussetzung für die Rückgabe der Autorität ans Markdown (DR-0006-Nachtrag, O-KONZ-01) | Werkzeug-Lücke | Kopfnotizen sind maschinenfreundlich als Vorarbeit formatiert | program-manager (eigenes Mini-WP) |
| O-WP019-02 | **PDF-interne Nummerierungskonflikte** (Dok. 06: Folientitel 1–26 vs. Inhalt-Leiste 01–10, doppelte Folie „3"; Dok. 07: Inhalt-Leiste +1 vs. Folientitel) | PDF-Befund | in den Kopfnotizen benannt, nicht aufgelöst; Zitierregel = Abschnittstitel | Owner (nur falls die PDFs je korrigiert werden) |
| O-WP019-03 | **Zitierdrift:** Bestandszitate in Code/Tests/WPs nutzen die alte Markdown-Zählung; die Konkordanzen in den Kopfnotizen lösen sie auf | Prozessfrage | bewusst **nicht** umgeschrieben | Orchestrator (Bereinigung bei Gelegenheit, kein eigenes WP) |
| O-WP019-04 | **Nicht verifizierbare Abbildungen:** Dok. 03 (§2, §8), Dok. 04 (§3, §4), Dok. 06 (§17 teilweise) — Textlayer trägt keinen Abbildungstext, visuelle Prüfung war in der Umgebung teils unmöglich | Lücke | als benannte Lücken in den Fassungen; **nichts geraten** | **Owner: Sichtprüfung am Original** — der einzige saubere Abschluss |
| O-WP019-05 | Nach der Vollableitung ist „treu" über Review + Stichprobe belegt, **nicht** über ein zweites Vollinventar | Methodische Ehrlichkeit | im Nachtrag ausgewiesen | erledigt sich mit O-WP019-01 (Treue-Check) |
| O-WP019-06 | **Dok. 03: 14 Rollensteckbriefe vs. 12 kanonische Rollen** — „Risk / Compliance Leitung" und „Platform Operations / Support" haben Steckbriefe, aber keine R-ID | **Konzeptlücke** | beide Steckbriefe übernommen, Zuordnung offen gelassen | Concept Author |
| O-WP019-07 | **Dok. 03: „Fünf Rollenfamilien" unbenannt** — die Namensliste der Alt-Fassung war erfunden und steht noch in `archive/PROJECT_UNDERSTANDING.md` | Konzeptlücke + Doku-Altlast | neue Fassung behauptet keine Namen; `archive/PROJECT_UNDERSTANDING.md` wird als historisch markiert | Concept Author |
| O-WP019-08 | **Dok. 04: Verdacht** auf abbildungsgetragenen Phasenrhythmus-Widerspruch („Bewerten/Umsetzen" vs. verbindlicher 04-D01-Rhythmus) — **unverifiziert**, stammt möglicherweise nur aus der Alt-Fassung | Verdacht, kein Befund | in der Kopfnotiz klar als unverifizierter Verdacht gekennzeichnet | Owner-Sichtprüfung (zusammen mit O-WP019-04) |

## Kundenwelt (aus DR-0009)

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-KUNDE-01 | **Preise-Guardrail vs. Buchung:** Der Seed-Guardrail-Test verbietet jede Währungs-/Preisangabe; Dok. 14 §9 definiert eine Preisverfassung und die Demo-Welt (Dok. 05 §12) nennt „Preise … als Beispiele gekennzeichnet". Für Katalog + Buchung muss der Guardrail auf „nur synthetische, gekennzeichnete Preise; keine realen PwC-Preise" umgestellt werden | Regel-Anpassung | Guardrail bleibt bis zum WP-021/WP-006-Schnitt unverändert streng | Owner + Security beim WP-Schnitt |
| O-KUNDE-02 | **Echter Kundenlogin** (Konten, Passwörter) braucht echte Authentisierung nach Dok. 19 — die heutige Anmeldung ist Simulation | Auth-Lücke (bekannt) | jeder „Login" bleibt als Simulation beschriftet, bis das Auth-WP kommt | eigenes WP mit Security Review |

## WP-020 – Verdichtung, Dashboard, Einstiegsfluss (aus dem WP-Zuschnitt + Slice 1)

Vollständige Herleitung: `work-packages/WP-020_VERDICHTUNG_DASHBOARD_EINSTIEG.md`
(Abschnitt „Benannte Lücken und offene Fragen").

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-WP020-01 | Granularität der gespeicherten bevorzugten Detailtiefe (je Ort? je Nutzer? — 06-O09 offen) | Konzeptlücke | lokale Voreinstellung, versionierter localStorage-Schlüssel, reversibel | Product / UX |
| O-WP020-02 | 06-D03 „fünfteilige Seitenanatomie" vs. neun „Verbindliche Seitenbausteine"; §6-Einstiegsabbildung im Textlayer unlesbar | Konzeptspannung | Neuner-Liste als normativ behandelt, Konflikt benannt | Concept Author + Owner-Sichtprüfung |
| O-WP020-03 | Rollenvarianten nur für 4 von 12 Rollen normiert | Konzeptlücke | Welt-Ableitung (Muster O-WP016-01), reversibel | Product / UX + Concept Author |
| O-WP020-04 | „Kritische Aktionen speichern die aktive Rolle mit" hat im read-only-Produkt keinen Träger | Anforderungsanker | Code-Anker am Rollenwechsel-Handler (WP-020 Slice 1); Pflicht-AC jedes künftigen Schreib-WP | program-manager je Schreib-WP |
| O-WP020-05 | Snippet-Leak-Schutz der globalen Suche — es existiert keine Suche (obwohl 06-D09 sie zur Kernnavigation erklärt) | verlorene Anforderung | Pflicht-AC des Such-WP (WP-027) | program-manager, Security |
| O-WP020-06 | Trust-Layer-Angaben ohne Träger: Modell-/Regelversion, Annahmen, menschliche Reviews, Auswirkung von Datenlücken | Datenlücke | zugeordnet was belegt ist, Rest sichtbar benannt (Slice 5) | Concept Author / Seed (WP-021) |
| O-WP020-07 | Welche erfassten Zustände tragen welches Ampel-Badge (Zuordnung ohne Konzeptzahl)? | Produktfrage | nur regelbasierte, offengelegte Zuordnungen; Strittiges unmarkiert + hier gesammelt | Product + Owner (qa:visual) |
| O-WP020-08 | 06-D02 „Kundennutzer starten im Customer Workspace" vs. neutraler Einstieg (DR-0009) | offen bis Kundenwelt | neutraler Einstieg für alle; Sonderfall mit WP-006 entscheiden | Product (WP-006) |
| O-WP020-09 | Dok. 06 „Onboarding …" fragt Einstieg „nach Rolle, Ziel und aktueller Aufgabe"; DR-0009 verschiebt die Rollenwahl hinter den Einstieg | benannte Spannung (DR-gedeckt) | Owner-Schicht geht vor; Prüfpunkt für Konzeptpflege (WP-023-Umfeld) | Concept Author |
| O-WP020-10 | Dok.-04-Steuerungsvokabular (Journey-Zustände, Handlungsoptionen, Betroffenheitsgrade) fehlt in `packages/` | verlorene Anforderung | benanntes Folge-WP (WP-026), gekoppelt an E-02/Task-Träger | program-manager + Concept Author |
| O-WP020-11 | Portfolio-Sichten (`/twin`-Übersicht, `/services`-Portfolio) zeigen bewusst Mandantenübergreifendes, während die Kontextleiste den aktiven Mandanten nennt — brauchen Portfolio-Sichten eine eigene Kontext-Kennzeichnung? | Konzeptlücke | als benannter „Objektkontext dieser Seite: Übersicht …" gelöst, reversibel (Slice 1) | Product / Concept Author |
| O-WP020-12 | Bewertungsvokabular-Wächter von „Heute" verbietet `bewertet` — kollidiert mit dem kanonischen Lebenszyklus-Stand `'bewertet'`; volle Verteilung deshalb nur auf `/isms`. Dokumentierte Ausnahme für erfasste Stand-Namen? | Wächter-Regelfrage | Verteilung bewusst auf `/isms`; „Heute" zählt nur Stände (Slice 3/4); Regelevolution nur per Gate | QA + Product Gate |
| O-WP020-13 | Baustein-Zuordnung der Mandanten-Detailseite `/twin/[tenantId]` — Drill-down-Ziel der Konvention, aber kein eigener Baustein-Ort | Konventionslücke | sechs Live-Orte tragen die Konvention; Detailseite benannt offen | Product / UX |

## Konzeptbibliothek (aus WP-023)

| ID | Frage | Art | Aktueller Umgang | Owner / Gate |
|---|---|---|---|---|
| O-KONZ-02 | Dok. 20C (D20C-002, „Entwicklungsverfassung" Regel 2) verlangt „Markdown vor PDF" — Widerspruch zu DR-0006 (PDF-Originale sind Produktwahrheit) | Konzeptkonflikt (PDF vs. Owner-Schicht) | DR-0006 ist die spätere, bewusste Owner-Entscheidung nach FINDING-0007 und geht vor; Konflikt in der 20C-Kopfnotiz und im WP-023-Nachtrag benannt, nicht still aufgelöst | Concept Author / Owner (CCP oder PDF-Revision) |
