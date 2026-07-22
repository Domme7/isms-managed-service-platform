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
| O-WP014-01 | **Kritikalität**: Dok. 07 §10 nennt sie als Pflichtinhalt jeder Objektseite; der Objektvertrag (§7) kennt kein Kritikalitätsfeld, und die Objektfamilie F03 „Kritikalität" ist im Seed nicht materialisiert | **Konzeptlücke** | nur die belegte `classification` wird gezeigt; nichts abgeleitet, Lücke im Produkt benannt | Concept Author (Feld, eigener Objekttyp oder spätere Ableitung nach Dok. 09?) |
| O-WP014-02 | **Vertrauensgrad je Objekt**: Dok. 06 §6 verlangt ihn querschnittlich; `quality_state.confidence_indicator` ist im Seed nicht gesetzt und darf laut WP-014-Nicht-Ziel nicht berechnet werden (Dok. 07 D10 erlaubt die Berechnung, ordnet sie aber keinem WP zu) | **Konzeptlücke** | ersatzweise wird die belegte Dimension „Bestätigung" gezeigt; Kanten tragen echtes `confidence` | Concept Author + Product (Seed belegen, berechnen oder dauerhaft ersetzen?) |
| O-WP014-03 | **Scopes sind keine Objekte**: `scope_ids` verweist auf Kennungen (`scope-nordwerk-isms-core` u. a.), die nicht als Seed-Objekte vom Typ „ISMS-Scope" (F01) existieren | Datenlücke | Scope-Zuordnung bleibt sichtbar rohe ID (Fail-loud) und wird in der UI als Lücke ausgesprochen; per Test belegt | Concept Author / Seed (Ergänzung zu CCP-002) |
| O-WP014-04 | **Session-Mandant vs. Routen-Mandant**: `/twin/[tenantId]/…` ist parameter-gebunden, `/isms` und `/services` sind session-gebunden. Nach einem Portfolio-Klick zeigt die Topbar den aktiven, die Kontextzeile den verlinkten Mandanten — zwei Kontextaussagen auf einem Bildschirm | Produktfrage (heute keine Sicherheitsgrenze) | dokumentiert in **DR-0004**; kein Code-Umbau, Acceptance 10 verlangt den Mandanten des Objekts | Product + Security **vor Dok. 19 (echte Authz)**: mandantenübergreifender Deep-Link erlaubt? Mit welcher Berechtigung und welchem Audit Record? |
| O-WP014-05 | **Ungerichtete Beziehungen**: `RELATIONSHIP_DIRECTION` lässt neben `gerichtet` weitere Werte zu; die Objekt-360-Seite sortiert jede Kante in „eingehend" oder „ausgehend" und würde „Richtung: ausgehend (ungerichtet)" anzeigen | Lücke (latent, Seed nutzt nur `gerichtet`) | keine Sonderbehandlung gebaut | Concept Author (dritte Liste, beidseitig, oder Richtungsangabe unterdrücken?) — vgl. O-D07-07 |
| O-WP014-06 | **„Hilfe" als Querschnittselement**: Dok. 06 §6 nennt Hilfe neben Rolle, Mandant, Scope, Datenstand, Vertrauensgrad und Version. Es gibt keinen Erklärzugang zu Objekttypen, Lebenszyklus-Ständen, Bestätigungsstufen oder R-IDs | Lücke (späteres WP) | nicht gebaut; Klartext-Labels mildern das teilweise | Product / UX (eigenes Glossar-/Hilfe-WP oder bewusst später?) |
| O-WP014-07 | **Keine Kante Evidence ↔ Measure im Seed**: der in WP-014 formulierte Navigationspfad (Prozess → Asset → Risiko → Control → Evidence → Maßnahme → Service) ist nur über Zwischenschritte begehbar | Datenbefund | im Navigationspfad-Test ehrlich ausgewiesen statt kaschiert; keine Kante erfunden | Concept Author / Seed (fehlt die Kante fachlich, oder ist die WP-Reihenfolge nur eine Aufzählung von Stationen?) |
| O-WP014-08 | **„Ohne Kontextverlust navigieren" (Dok. 07 §21)** ist derzeit nur über den Browser-Zurück-Button erfüllt: kein Breadcrumb, kein Pfad der besuchten Objekte | Produktfrage | Rücklink führt immer auf die Mandantenseite (bewusst, siehe DR-0004) | Product / UX (gehört ein Objektpfad zum Navigationsvertrag oder erst zu Suche/gespeicherten Sichten, Dok. 07 §16?) |
| O-WP014-09 | **Client-Bundle enthält den vollständigen `DEMO_SEED` aller Mandanten**: `/isms` und `/services` rendern client-seitig (dokumentierte WP-012/013-Entscheidung). Mit **echten** Daten wäre das eine Mandantengrenzverletzung | **Security-relevant, sobald echte Daten** | WP-014 verschärft es nicht, macht es aber breiter sichtbar; `objectDetailHref` wurde deshalb in ein seed-freies Modul ausgelagert | Security / CTO: Umstellungszeitpunkt auf serverseitige Ableitung (Muster `/twin`) terminieren — **spätestens mit der DB→UI-Anbindung**, zusammen mit FINDING-0004 |
| O-WP014-10 | **Beispielspalte von Dok. 07 §9 als Einschränkung**: WP-014 begrenzt die Beobachtung „kein Nachweis verknüpft" auf die laut R15 nachweisfähigen Objekttypen (Evidence → Control/Measure/Decision). WP-012 (O-WP012-06) hatte dieselbe Beispielspalte umgekehrt als **nicht abschließend** behandelt | **Methodische Inkonsistenz** | beide Stellen im Code mit Quelle und Begründung kommentiert; die Einschränkung ist eine reversible Anzeigeentscheidung | Concept Author: ist die Beispielspalte normativ oder illustrativ? (Ergänzung zu CCP-002) |
