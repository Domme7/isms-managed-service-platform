# WP-012 – Unabhängiger Review (Done Evidence)

**Gegenstand:** Berater-/Managed-Service-Welt (read-only): Slice 1 = synthetische Managed-Service-Schicht
in `@isms/demo-seed` (aus Dok. 13–15, nur kanonische Typen); Slice 2 = „Services"-Ansicht in der Shell
(Mandanten-Sicht + Portfolio, Rollen-Gating Consulting World). **Builder:** Data-Graph-Analytics (S1),
Frontend-Engineer (S2). **Reviewer (getrennt):** Code-Reviewer ×2, Concept-Consistency-Reviewer,
Product-User-Lead. **Datum:** 2026-07-22.

## Verdikte (4 unabhängige Reviews)

- **Slice 1 Code-Review: FREIGABE MIT MINOR-FIXES.** Counts/Richtungen/Vokabular statisch vollständig
  nachgerechnet — alles korrekt; tenant-parametrisierte Fabriken machen Cross-Tenant-Kanten konstruktiv unmöglich.
- **Slice 1 Concept-Review: KONZEPTTREU** (Freigabe ohne Auflage). Alle 39 Kanten richtungs-/domänenkonform
  (Dok. 07 §9); SLA-Werte wertidentisch mit der illustrativen Dok.-14-§8.4-Tabelle und als synthetisch
  deklariert; alle 6 offenen Fragen als echte Konzeptlücken bestätigt (O-WP012-01 in Dok. 13 selbst als
  13-Q12 vorgezeichnet).
- **Slice 2 Code-Review: FREIGABE MIT MINOR-FIXES.** Kantenauflösung richtungstreu (inkl. korrektem
  Ausschluss Deliverable→Team, Control→KPI); Cross-Tenant-Auflösung konstruktiv unmöglich; Portfolio liest
  keine Kanten (nur Aggregation je Mandant).
- **Slice 2 UX-Review: FREIGABE MIT MINOR-FIXES.** Outcome zuerst (MS01), ehrliches Rollen-Gating ohne
  Sicherheitsillusion, Synthetik-Kennzeichnung, kein Upselling (MS15), A11y solide.

## Findings umgesetzt

- **Seed:** Preis-Guardrail gehärtet (case-insensitive; Euro/Cent/GBP; Beziehungs- + Mandantentexte);
  Bitemporalitätstest auf Beziehungen ausgeweitet; MS03-Shared-Responsibility-Satz in allen 5 Services;
  Dok.-13-Zitat §11→§15 korrigiert.
- **Web:** deutsche Labels für `covered_by`/`delivered_by`/`requires`/`contributes_to`; Überschrift
  „Aktive Services"→„Managed Services" (Zustandstreue); interne Arbeits-ID aus UI-Text entfernt;
  Empty-State mit nächstem Schritt (Login-Link); Bundle-Entscheidung (~76 kB Client-Seed) als Kommentar
  materialisiert; Fail-loud-Lücke im part_of-Zweig dokumentiert; R08–R11-Auslegung im WP dokumentiert.
- Konzept-Präzisierungen in `OPEN_QUESTIONS.md` (O-WP012-03/04/06 geschärft).

## Bewusst offen (nicht blockierend)

- UX-LOW-1..3 (Skeleton-Loading, Synthetik-Marker auf Item-Ebene, R-ID vor Klartext in Kanten-Notiz) —
  Muster-konsistent mit Bestand, für Folge-Slices notiert.
- O-WP012-01..06 → Human Gate via `research/change-proposals/CCP-002` (Entwurf liegt vor).

## Unabhängige Re-Verifikation (Orchestrator)

- Frisch: demo-seed **38**, web **56**; Monorepo build/test/typecheck grün — **170 Tests** gesamt
  (api 2, contracts 55, demo-seed 38, web 56, db 19); `validate_handoff.py` OK.
- **Browser-QA bestanden:** R08/Nordwerk → 3 Service-Karten (Outcome, SLA-Details, Deliverables inkl.
  ehrlichem Entwurfsstatus, Serviceumfang, Wirkungsbeitrag mit qualitativem Vertrauensgrad) + Portfolio
  „Alle Mandanten" (3/0/0/2); R03/Finovia → Empty-State mit nächstem Schritt + ehrlicher
  Portfolio-Vorbehaltshinweis; Fix-Verifikation live (neue Überschrift, keine interne ID).

## Ergebnis

**WP-012 angenommen (Done).** Die erste rollenbezogene Erlebniswelt (Consulting & Service World) ist
im Browser erlebbar; Managed Services sind Teil des Zwillings-Datenmodells; Builder ≠ Reviewer über
4 unabhängige Reviews eingehalten.
