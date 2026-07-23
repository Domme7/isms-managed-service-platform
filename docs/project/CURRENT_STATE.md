# Current State

**Stand:** WP-019 **fertig** — die fünf schwerwiegend abweichenden Konzeptfassungen (Dok. 03–07) sind **vollständig aus den PDFs neu abgeleitet** und je Dokument unabhängig freigegeben. Das Gate fing dabei eine Erfindung (rekonstruierte Abbildungen in Dok. 04), und der Prozess korrigierte seinen eigenen Fehler: „Kritikalität“ steht doch im PDF — in der **Abbildung**, nicht im Textlayer (O-WP014-01 bestätigt statt gestrichen)  
**Phase:** 1→2→6 (Demo Foundation + Persistenz + Managed-Service-Vorgeschmack)  
**Aktives Work Package:** keins — als Nächstes **WP-020** verlorene Anforderungen (11-Punkte-Liste im WP-019-Nachtrag, Cross-Tenant-Schutz zuerst)  
**Repository-Root:** `apps/ISMS/` · **Default-Branch:** `main` · **Tags:** `phase-0-baseline`  
**Remote:** privat `Domme7/isms-managed-service-platform` (DR-0002) — CI grün  
**Implementierungsstatus:** Lauffähige Demo-App (Shell + Heute + Zwilling + ISMS + Services + **Entscheidungen** + Objekt-360, read-only, synthetisch); Persistenzschicht vorhanden, noch nicht ans UI angebunden  
**Konzeptstatus:** Produktwahrheit sind die 24 **PDF-Originale** (DR-0006). **Dok. 03–07 sind seit
WP-019 quellentreu nachgezogen** (Vollableitung + Konsistenz-Gate je Dokument, Kopfnotiz mit
Konkordanz); **14 material abweichende Dokumente stehen noch aus** (WP-023), ebenso der
automatische Treue-Check (O-WP019-01/WP-024). Rohbefund + Nachtrag: `docs/concept/abgleich/`.
Manifest per `scripts/update_manifest.py` regenerierbar — Hashes sagen nichts über PDF-Treue.

## Gesichert

- Phase-0-Baseline (WP-001) abgeschlossen, getaggt, privat auf GitHub gesichert,
- **Stack entschieden (ADR-0001): TypeScript · Next.js · NestJS · PostgreSQL · pnpm + Turborepo**,
- **lauffähiges Grundgerüst:** `apps/api` (NestJS, `GET /health` live geprüft) + `apps/web` (Next.js App-Shell),
- **Vitest-Smoke-Test grün; typecheck + build für beide Apps grün; App-CI auf GitHub**,
- Continuity-Tooling, Checkpoints, Handover, unabhängige QA-/Security-Review (WP-001),
- **`docs/project/archive/PROJECT_UNDERSTANDING.md`** *(historisch)* — destilliertes Gesamtverständnis aus allen 24 Konzeptdokumenten (schneller Einstieg für neue Sessions; nicht autoritativ),
- **`@isms/contracts`** (WP-003 Slice 1): kanonischer Objekt-/Beziehungsvertrag (F01–F09 / R01–R25) aus Dok. 07, Zod-Schemas, **55 Tests**; zwei unabhängige Reviews (KONZEPTTREU / Freigabe mit Minor-Fixes), `PROVENANCE.md` + offene Fragen O-D07-01…11,
- **`@isms/demo-seed`** (WP-003 Slice 2): 4 synthetische Demo-Mandanten + kohärenter Nordwerk-Objektgraph (17 Objekte / 15 Beziehungen), validiert gegen die Contracts, **24 Tests** mit Negativbeweisen für Tenant-Isolation, referenzielle Integrität, Owner-Refs; Seed-Manifest + Storyline; zwei unabhängige Reviews (KONZEPTTREU / Freigabe),
- **Digital Twin Explorer** (WP-004): read-only Ansicht in `apps/web` (`/twin`, `/twin/[tenantId]`), rendert den Demo-Seed (Objekte nach Familie F01–F09, Beziehungen mit deutschen Klartext-Labels + Vertrauensgrad, Datenqualität), Empty-State, deutsches 404, barrierearm (main/Skip-Link/Headings); zwei unabhängige Reviews + visuelle Browser-QA,
- **App-Shell** (WP-011): acht Orte, Login-/Rollensimulation (R01–R12), Rollen-/Mandantenwechsel, eingebetteter Explorer,
- **Managed-Service-Welt** (WP-012): Seed-Schicht (+23 Objekte/+39 Kanten, kanonische F09-Typen aus Dok. 13–15) + „Services"-Ansicht (Outcome-first-Karten, SLA/Deliverables/Wirkungsbeitrag, Portfolio für Consulting World, Empty-States); 4 Reviews (inkl. KONZEPTTREU) + Browser-QA; Konzeptlücken als O-WP012-01..06 + CCP-002 dokumentiert,
- **ISMS-Kern-Welt** (WP-013): Ort „ISMS" mit Risiken (Threat-/Weakness-Herkunft), Controls (Umsetzung, erfülltes Requirement + Framework, Nachweis-Stand), Maßnahmen und Nachweisen — Dok.-08-Ehrlichkeitsregeln im Produkt erklärt („wirksam" = Lebenszyklus-Stand, kein Prüfergebnis); Datenlücke Risiko↔Szenario sichtbar (O-WP013-01); 2 Reviews + Browser-QA,
- **3 Concept Change Proposals** (`research/change-proposals/CCP-001..003`) als Human-Gate-Vorlagen für die 8 Konzeptlücken; **WP-013-Entwurf** (ISMS-Kern-Welt) liegt bereit,
- **Objekt-360-Detailseite** (WP-014): generische read-only Route `/twin/[tenantId]/objekt/[objectId]` für **jedes** der 40 Seed-Objekte, beantwortet die fünf Fragen der universellen Seitenanatomie (Dok. 06 §6) aus Envelope + Kanten; ein-/ausgehende Kanten richtungstreu und verlinkt (Objekt-360-Navigationsvertrag Dok. 07 §10/§21), Bitemporalität als getrennte Achsen, Historienlücke **aus den Daten abgeleitet**; Tenant-Isolation im Routing per Test belegt (mandantenfremde ID == unbekannte ID, auch im Seitentitel); Verlinkung aus Twin-Explorer, ISMS- und Services-Ansicht; **3 unabhängige Reviews + 2 Nachprüfungsrunden** (die zweite fand eine vom Fix erzeugte Regression) + Browser-QA; 10 Konzeptlücken als O-WP014-01..11 benannt statt gefüllt, Abweichungen in DR-0004. **Monorepo gesamt: 265 Tests grün.**
- **Mission Control „Heute"** (WP-016): `/heute` beantwortet seine Leitfrage (Dok. 06 §7 S01) so weit, wie der Datenbestand sie trägt — Standort (Rolle/Mandant/Bestand), belegte **Erfassungswellen** (ausdrücklich kein Änderungsfeed), vier **gezählte, unbewertete** Beobachtungen mit Grundgesamtheit und Ermittlungsregel, Einstiegspunkte. Rollenrahmung ordnet nur die Abschnitte, alle zwölf Rollen sehen dieselben Daten (per Test). **Die Morning Mission (Dok. 10 §5) wurde bewusst nicht gebaut** — der Seed trägt keine `Task`-/`Decision Record`-Objekte, der Objektvertrag keine Frist-/Aufwand-/Kapazitätsfelder, es gibt keine Ereignisse und keine Versionshistorie; die Lücke ist im Produkt benannt statt gefüllt. 2 Reviews + 2 Gegenprüfungen + Browser-QA; O-WP016-01..08, FINDING-0005 (kein Linter im Stack). **Monorepo gesamt: 343 Tests grün.**
- **Entscheidungen im Zwilling** (WP-017): Seed um 3 `Decision Record`-Objekte + 8 Kanten erweitert (R23 `decided_in`, R15, R03, **R24 `supersedes`-Ablösepaar = erste Versionshistorie des Seeds**, eigene dritte Erfassungswelle 16.03.2026); Ort `/entscheidungen` als read-only Register belegter Entscheidungen mit beidseitiger Ablösekette — ausdrücklich **keine** Decision Card (von 14 Pflichtfeldern aus Dok. 10 haben **9 keinen Träger**, 5 teilweise; feldweiser Abgleich im Produkt sichtbar, inkl. der 7 Decision-Record-Inhalte aus Dok. 10 §9.2). 2 Reviews + 2 Gegenprüfungen + Browser-QA; O-WP017-01..12, O-KONZ-01. **Nebenertrag: Mandantengrenzverletzung in `/isms` (seit WP-013) gefunden und behoben; Wächtertest `leerzustand-mandantengrenze` prüft alle leeren Orte.** Seed jetzt 43 Objekte / 62 Beziehungen (Nordwerk 34/51). **Monorepo gesamt: 428 Tests grün.**
- **Werkzeuge & sichtbare Abnahme** (WP-018): Biome-Linter über alle Pakete + CI (ADR-0003, FINDING-0005 geschlossen); `pnpm qa:visual <WP>` erzeugt **committete Screenshots + axe-Report** je Work Package (`docs/project/visual/`, ADR-0004) — QA-Build strikt getrennt in `.next-qa`/Port 3100 mit Build-Ziel-Wache (Lektion 10 mechanisch abgesichert); drei Wächter: Prozessvokabular im Produkt (64 Render-Varianten), erschöpfende Glossen-Typen (fehlende deutsche Labels = Compilefehler), `seed_facts` (Zahlen generiert statt abgeschrieben). Erste Umsetzung der Gate-Matrix (Code + DevOps + QA + Produkt-Sondergate für AC-24). Erster axe-Lauf → **FINDING-0008**. **Monorepo gesamt: 448 Tests grün.**
- **Konzeptfassungen Dok. 03–07 quellentreu** (WP-019): Vollableitung aus den PDF-Originalen nach Folientiteln, Kopfnotiz mit Re-Ableitungsdatum/Quell-PDF/Nummerierungs-Konkordanz, alle Tabellen und verbindlichen Kästen, stabile Kennungen unverändert, Vorgänger archiviert; Konsistenz-Gate je Dokument gegen den PDF-Text (Dok. 04: Nacharbeit → Freigabe Runde 2 — das Gate fing **rekonstruierte Abbildungstranskriptionen aus der Alt-Fassung**); `scripts/update_manifest.py` (Code-Review Freigabe); Nachtrag mit Verbleib aller Befunde und **11 WP-020-Übergabepunkten**; O-WP019-01..08; O-WP014-01 präzisiert; `PROJECT_UNDERSTANDING.md` historisch markiert und archiviert. **448 Tests grün.**
- **`@isms/db`** (WP-007): Persistenzschicht PostgreSQL/Drizzle — Schema/Migration/tenant-scoped Repos/Seed-Loader aus den Contracts, getestet gegen **PGlite** (kein Docker), serverseitige Tenant-Isolation mit Negativbeweisen; Code- + Security-Review (SICHER FÜR DEMO-SCOPE); RLS-Härtung → FINDING-0004. **Monorepo gesamt: 112 Tests grün.**

## Verifikations-Evidence (WP-002)

- `pnpm test` → 2/2 grün · `pnpm typecheck` → grün (api+web) · `pnpm build` → grün (api+web)
- API live: `GET /health` → `{"status":"ok","service":"isms-api","phase":"phase-0-skeleton",...}`; unbekannte Route → 404
- `validate_handoff.py` OK · 6/6 Repository-Tests grün · GitHub Actions „Repository Contract" + „App CI"

## Noch nicht gesichert oder entschieden

- **Docker-Engine startet beim Owner noch nicht** (CLI v29.6.2 vorhanden, Daemon antwortet mit 500) — blockiert nur die reale Postgres-Validierung; PGlite deckt Dev/Test vollständig ab,
- **Lifecycle-Konzeptwidersprüche O-D07-02/03** (Schreibweise §8 vs. Dok. 05 §7; §7-Kurzform vs. §8) — Concept-Author/Human Gate, nicht blockierend,
- Authentisierung/Tenant-Trennung (WP-005), produktive Cloud/CI, reale Daten,
- Branch-Protection auf `main` (O-GH-002).

## Offene Owner-Entscheidungen

Drei Karten in `docs/project/OWNER_DECISIONS.md` (Demo-Welt, Objektvertrag-Erweiterung,
sichtbare Abnahme). Jede mit Empfehlung und Default — **keine blockiert den Weiterbau**.

## Offene Findings

| ID | Kurz | Schwere | blockiert? |
|---|---|---|---|
| **FINDING-0007** | **Markdown-Ableitung der Konzeptdokumente nicht verlustfrei** — es wurde aus einer ungeprüften Interpretation gebaut | **hoch** | blockiert nichts sofort, aber **jedes neue WP muss ab jetzt am PDF gegenlesen** |
| FINDING-0008 | `<dl role="group">` entfernt die Listensemantik — 3× serious (axe, WCAG 1.3.1) auf den Kontextzeilen von /heute, /entscheidungen, Objekt-360; der A11y-Fix aus WP-014 hatte eine ungemessene Kehrseite | mittel | nein — Korrektur als Folge-WP mit Product Gate |
| FINDING-0006 | Domain Gate und QA Gate waren nie besetzt (4 von 9 Gates aus Dok. 20B §36) | mittel | in Behebung ab WP-017 |
| FINDING-0005 | Kein Linter im Stack | niedrig | **geschlossen 2026-07-23** (WP-018: Biome, ADR-0003) |
| FINDING-0004 | DB-RLS + least-privilege-Rolle fehlen | mittel | **ja** — vor der DB→UI-Anbindung |
| FINDING-0003 | Twin-Explorer Narrative Chain | niedrig | nein |
| FINDING-0002 | `validate_handoff.py` prüfte Status-Aktualität nicht | mittel | **teilweise behoben** 2026-07-23: Statuskonsistenz und offene Findings werden jetzt erzwungen |
| FINDING-0001 | Master-Index-Einstiegspfad weicht von der gebauten Struktur ab | niedrig | nein |

## Frühere Notizen zu Findings

- FINDING-0001: Master-Index-Einstiegspfad weicht von gebauter Struktur ab (Low).
- FINDING-0002: `validate_handoff.py` prüft keine Status-Aktualität/Branch/Tag (Med); aktive-WP-Prüfung inzwischen WP-agnostisch gemacht.
- FINDING-0005: **Kein Linter im Stack**, obwohl „Lint" in den Acceptance Criteria steht (Low) — Entscheidung offen: Linter einführen oder die Anforderung streichen. Bis dahin wird sie nicht still übersprungen.

## Exact Next Step

**WP-014 und WP-016 sind abgeschlossen** (Review-Notizen: `reviews/WP-014_INDEPENDENT_REVIEW.md`,
`reviews/WP-016_INDEPENDENT_REVIEW.md`). Der Demo-Graph ist durchgängig begehbar, und `/heute` ist
kein Platzhalter mehr — alle vier Orte des Kernwegs (Heute · Zwilling · ISMS · Services) sind echt.

**Nächster Schritt — hier ist eine Owner-Entscheidung sinnvoll, aber nicht blockierend:**

WP-016 hat eine harte Grenze sichtbar gemacht: **der Demo-Seed trägt keine Aufgaben und keine
Entscheidungen** (`Task` F08 und `Decision Record` F09 stehen im Contract, sind aber in keinem
Mandanten materialisiert), und der Objektvertrag kennt **keine Frist-, Aufwand-, Kapazitäts- oder
Prioritätsfelder** (O-WP016-03, O-WP016-04). Das blockiert **Morning Mission und Decision Center
gleichermaßen** — also Dok. 10 als Ganzes.

Zwei sinnvolle Wege:
1. **Seed-/Contract-Erweiterung um Aufgaben und Entscheidungen** (eigenes WP, Voraussetzung für
   WP-008). Berührt den Objektvertrag → braucht Concept Author und vermutlich ein Human Gate.
2. **Executive-Welt** (Dok. 06 §10 / Dok. 10 §8) — geht dem Problem vorerst aus dem Weg, läuft aber
   in dieselbe Grenze, sobald verdichtete Entscheidungen gefordert sind.

Danach: API-Schicht + DB→UI — **erst nach FINDING-0004** und O-WP014-09.

Offene Human Gates (nicht blockierend): CCP-001/002/003 (Konzeptentscheidungen), Docker-Desktop-Start
beim Owner (reale Postgres-Validierung von `@isms/db`), FINDING-0004 (DB-RLS vor DB→UI-Anbindung).
Neu hinzugekommen: **O-WP014-09** (voller `DEMO_SEED` im Client-Bundle) ist spätestens mit der
DB→UI-Anbindung gemeinsam mit FINDING-0004 zu lösen.
Ausrichtung: alle 9 Phasen; Checkpoints + Push nach jedem WP.
