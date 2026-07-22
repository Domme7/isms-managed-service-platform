# WP-003 Slice 2 – Unabhängiger Review (Done Evidence)

**Gegenstand:** `packages/demo-seed` (`@isms/demo-seed`) — synthetische Demo-Seed-Grundlage (4 Mandanten,
Nordwerk-Objektgraph), validiert gegen `@isms/contracts`. **Builder:** Data-Graph-Analytics-Agent.
**Reviewer (getrennt):** Code-Reviewer + Concept-Consistency-Reviewer. **Datum:** 2026-07-22.

## Verdikte

- **Concept-Consistency: KONZEPTTREU.** Tenant-Namen exakt aus Dok. 07 §20; alle Objekttypen in korrekten
  Familien F01–F09; alle 15 Beziehungen richtungs-/domänenkonform zu §9 (u. a. `mitigates` Control→Risk,
  `evidences` Evidence→Control, `satisfies` Control→Requirement, `remediates` Measure→Weakness);
  Nordwerk-Kette schlüssig; nur synthetischer Inhalt, keine Modell-Erfindung; Datenminimierung (Rollen
  statt Personen). Beobachtungen B1 (`part_of` Requirement→Framework, durch generische R01-Regel gedeckt),
  B2 (Owner-Refs) — nicht blockierend.
- **Code-Review: FREIGABE MIT MINOR-FIXES.** Keine blockierenden/major Findings. Positiv: Validierung gegen
  die kanonischen Contract-Schemas, echte Negativbeweise (Tenant-Isolation, Dangling), Determinismus, korrekte
  und notwendige `turbo.json`-Anpassung (`typecheck` → `dependsOn ^build`).

## Findings umgesetzt (und re-verifiziert)

- **M1** — Negativbeweis für den Duplikat-Detektor ergänzt.
- **M2** — Owner-Ref-Kohärenz: `nordwerk-role-ciso` (fachliche Rolle) und `nordwerk-team-it-betrieb`
  (Organisationseinheit) als echte F02-Seed-Objekte materialisiert (Objekte 15→17); neuer Helfer
  `findUnresolvedOwnerRefs` + Positiv-/Negativtest; alle `owner_ids` lösen jetzt auf Seed-Objekte auf.
- **N1** — Bitemporalität geschärft (`valid_time.from` < `record_time.recorded_at`).
- **N3** — Dangling-Negativbeweis auch für `source_id`.
- **N4** — Manifest-Pfad aus Testdatei-Verzeichnis (`__dirname`) statt `process.cwd()`.
- B1/B2/N2/N5 dispositioniert (nicht blockierend; B2 durch M2 geschlossen).

## Unabhängige Re-Verifikation (Orchestrator)

- Frisch (ohne Turbo-Cache): `@isms/demo-seed` **24/24**, `@isms/contracts` **55/55** (keine Regression).
- `pnpm build` 4/4, `pnpm typecheck` 5/5; `validate_handoff.py` OK; 6/6 Repository-Tests grün.
- Monorepo gesamt **79 Tests grün**.

## Ergebnis

**Slice 2 angenommen → WP-003 vollständig (Slices 1–3).** Acceptance Criteria erfüllt: getippter Vertrag
+ synthetische Seed, Dok.-07-treu, stabile IDs, Tenant-Isolation und referenzielle Integrität mit
Negativbeweisen, keine DB/ORM/Docker, zwei unabhängige Reviews dokumentiert. Offene Konzeptpunkte
O-D07-01…11 in `OPEN_QUESTIONS.md`.
