# Work Queue

| Priorität | ID | Titel | Phase | Status | Abhängigkeiten | Human Gate |
|---:|---|---|---:|---|---|---|
| P0 | WP-001 | Repository & Continuity Bootstrap | 0 | **Done (Phase-0-Baseline)** | keine | GitHub-Remote nur bei Veröffentlichung |
| P0 | WP-002 | Technologie-ADR und ausführbares App-Grundgerüst | 0–1 | **Done (ADR-0001, lauffähiges Grundgerüst)** | WP-001 ✓, Capability Check ✓ | Stack freigegeben (ADR-0001) |
| P1 | WP-003 | Kanonische Datenverträge (`@isms/contracts`) & synthetische Demo-Seed | 1 | **Done (Slices 1–3, 2× Review, 79 Tests)** | WP-002 ✓, Dok. 07 | keine DB/ORM/Docker, keine realen Daten |
| P1 | WP-004 | Digital Twin Explorer (read-only) — Demo-Seed im Browser | 1 | **Done (2× Review + visuelle QA, 94 Tests)** | WP-003 ✓, Dok. 06/07 | keiner (kein DB/Auth/Docker) |
| P1 | WP-011 | App-Shell, Navigation & Rollen-/Mandantenwechsel (Simulation) | 1 | **Done (Code+UX Review + Browser-QA, 36 Web-Tests)** | WP-004 ✓, Dok. 06/03 | keiner (synthetisch, keine echte Auth) |
| P1 | WP-012 | Berater-/Managed-Service-Welt (read-only): Service-Demo-Daten + „Services"-Ansicht | 1/6 | **Done (4× Review + Browser-QA, 170 Tests)** | WP-011 ✓, Dok. 13–15 | CCP-002 (Konzeptfragen, Human Gate) |
| P1 | WP-013 | ISMS-Kern-Welt (read-only): Ort „ISMS" mit Risiken/Controls/Maßnahmen/Evidence | 1/3 | **Done (Code+UX Review + Browser-QA, 77 Web-Tests)** | WP-012 ✓, Dok. 08/06 | keiner (read-only, synthetisch) |
| P1 | WP-014 | Objekt-360-Detailseite (read-only): fünf Fragen je Objekt, navigierbarer Graph | 1/2 | **Done (3× Review + 2 Nachprüfungen + Browser-QA, 151 Web-Tests)** | WP-013 ✓, Dok. 07 §10 / Dok. 06 | keiner (read-only, synthetisch) |
| P1 | WP-015 | Visuelles Design (minimal) — Uplift zurückgenommen, nur dezenter Hintergrund | 1 | **Done (DR-0003, Owner-Entscheidung)** | WP-011..013 ✓, Dok. 06 §18 | keiner (rein visuell) |
| P1 | WP-016 | Mission Control „Heute" (read-only, **ohne** Morning Mission) | 1 | **Done (2 Reviews + 2 Gegenpruefungen + Browser-QA, 229 Web-Tests)** | WP-011…014 ✓, Dok. 06 §7 S01/§5/§17 | keiner (read-only, synthetisch) |
| P1 | WP-017 | Entscheidungen im Zwilling: Decision Records im Seed + Ort „Entscheidungen“ | 1/4 | **Done (2 Reviews + 2 Gegenprüfungen + Browser-QA, 307 Web-Tests)** | WP-016 ✓, Dok. 07 (R23/R15/R24) | keiner (Typ steht im Contract) |
| P1 | WP-018 | Werkzeuge: Linter/Formatter, Playwright + axe, Screenshots je WP (DR-0007 E-03) | quer | **Done (3 Gates + Gegenprüfung + Produkt-Sondergate, 448 Tests, ADR-0003/-0004)** | WP-017 ✓ | erledigt |
| P1 | WP-019 | Konzeptfassungen aus den PDFs nachziehen (FINDING-0007), Dok. 03–07 | quer | **Done (Konsistenz-Gate je Dokument, Dok. 04 in Runde 2; Nachtrag + 11 WP-020-Punkte)** | DR-0006 | erledigt |
| P2 | WP-025 | Design-Exploration Cockpit (IDEA-001): 2–3 statische Stilvarianten, Owner wählt (DR-0003: kleinste Variante zeigen) | quer | Planned (Owner-bekräftigt) | WP-020-Struktur, `qa:visual` | Owner wählt die Variante |
| P2 | WP-023 | Konzeptfassungen Teil 2: die 14 material abweichenden Dokumente | quer | Planned | WP-019-Muster, Abgleichbericht | keiner |
| P2 | WP-024 | Treue-Check PDF↔Markdown automatisieren (O-WP019-01) — Voraussetzung für O-KONZ-01-Auflösung | quer | Planned | WP-019 Kopfnotiz-Konvention | keiner |
| P1 | WP-020 | **Verdichtungs-Umbau + Dashboard-Schicht + neuer Einstiegsfluss** (DR-0008/0009): strategisch → Drill-down (Detailtiefe §6.2, Rollenvarianten, Seitenbausteine §6.1); Statuskacheln/Ampel-Badges/Abdeckungsbalken aus heutigen Daten je mit Drill-down; **Einstieg: Mandant → neutrale strategische Ebene 1 → Rollenwahl in der App**; Cross-Tenant-Schutz als Sicherheits-Slice vorweg; Punkt 8 (`weight`) nur als Change Proposal | 1/2 | **Active** (Definition + Context Pack liegen vor) | WP-019 ✓, DR-0008, DR-0009 | Security-Slice: Security Review; Owner-Abnahme je Stufe via qa:visual |
| P1 | WP-021 | Demo-Welt konzeptkonform: 5 benannte Unternehmen, 9 Accounts, Mindestgrößen **inkl. synthetischer Bewertungsdaten (Risiko-Level, KPI-Werte, Trust-States — DR-0008)** | 1 | Planned | WP-019 ✓, DR-0007 E-01, DR-0008 | entschieden (E-01); Bewertungs-**Logik** erst nach Dok.-09-Gegenlesen |
| P2 | WP-022 | Research: Assistenz-Vision (IDEA-003) — Use-Case-Katalog, techn. Konzept, Integrationen, Phasenmodell als Entwürfe unter research/ | quer | Planned (Owner-Auftrag 2026-07-23) | Dok. 20A/20B/21, IDEA-003 | Aktivierung als Konzept nur via CCP + Human Gate |
| P1 | WP-005 | Lokale Authentisierungssimulation, Rollen- und Tenant-Wechsel | 1 | Planned | WP-002, Security ADR | Security Review |
| P1 | WP-006 | **Kundenwelt Stufe 1 (DR-0009):** Kunden-Startseite „verwalten", Servicekatalog (Dok. 14 §5–7), geführtes Onboarding/Zielprofil als Struktur-Assistent (Dok. 16); Stufe 2 Buchung mit Human Gate — echte Persistenz erst nach FINDING-0004 | 1–2 | Planned (**Owner-priorisiert**, nach WP-021) | WP-021 (Demo-Accounts!), Dok. 14/16 | Product + ISMS Review; Buchung: Human Gate; O-KUNDE-01 Preise-Guardrail |
| P2 | WP-007 | Persistenz der Twin-Kernobjekte (PostgreSQL + Drizzle) | 2 | **Done (Code+Security Review, 18 DB-Tests, 112 gesamt)** | WP-003 ✓, ADR-0002 | RLS-Härtung: FINDING-0004 |
| P2 | WP-026 | Dok.-04-Steuerungsvokabular in den Contracts: Journey-Zustandsmaschine (8 Zustände + Übergänge), sechs Handlungsoptionen, drei Betroffenheitsgrade (WP-019-Nachtrag Punkt 10, O-WP020-10) | 2/4 | Planned | E-02-Entscheidung / Task-Träger, WP-020 | Contract-berührend → Human Gate |
| P2 | WP-027 | Globale Suche als Kernnavigation (06-D09) **inkl. Snippet-Leak-Schutz als Pflicht-AC** (WP-019-Nachtrag Punkt 6, O-WP020-05) | 2 | Planned | WP-020, Dok. 06 „Suche, Benachrichtigungen & Wiederaufnahme" | Security Review (Leak-Schutz) |
| P2 | WP-008 | Morning Mission – erster Decision-Center-Pfad | 4 | Planned | WP-006, WP-007 | Product Review |
| P2 | WP-009 | Report Package + erstes reproduzierbares Executive Deck | 5 | Planned | WP-006–008 | Presentation Review |
| P2 | WP-010 | Research-/Concept-Change-Pipeline im Repository | kontinuierlich | Planned | WP-001 | Human Gate bei aktiver Konzeptänderung |

**Als Nächstes: WP-020** (verlorene Anforderungen, 11-Punkte-Liste im WP-019-Nachtrag). Abgeschlossen sind WP-001…004, 007 und 011…019 —
die Statusspalte oben ist maßgeblich, dieser Absatz nur Orientierung.

Persistenz (`@isms/db`, WP-007) existiert, ist aber bewusst **noch nicht** ans UI angebunden; das
geschieht erst nach FINDING-0004 (DB-RLS) und O-WP014-09 (voller Seed im Client-Bundle).
Die Reihenfolge darf der Orchestrator verfeinern, ohne die Produktvision zu verkleinern.
