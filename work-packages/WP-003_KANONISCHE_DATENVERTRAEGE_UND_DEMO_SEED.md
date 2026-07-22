# WP-003 – Kanonische Datenverträge & synthetische Demo-Seed-Grundlage

## Identität

- **Phase:** 1 (Demo Foundation) / Vorbereitung Phase 2 (Digitaler Zwilling)
- **Priorität:** P1
- **Status:** Active
- **Risk Class:** Low
- **Accountable Owner:** CTO-/Architecture-Agent (Orchestrator)
- **Builder:** Data-Graph-Analytics-Agent
- **Reviewer:** Code-Reviewer + Concept-Consistency-Reviewer (unabhängig, read-only)
- **Human Gates:** keiner erforderlich (keine Kosten, keine DB, keine realen Daten, reversibel)

## Problem

Die Plattform benötigt einen **einheitlichen, typisierten Objekt- und Beziehungsvertrag** als
gemeinsame Grundlage aller Module (Dok. 05, D-004 „einheitliches Datenmodell"). Ohne diesen Vertrag
würden spätere Module (Zwilling, ISMS-Kern, Decision Center) divergierende Datenformen erzeugen.
Zugleich braucht die Demo eine **synthetische, konsistente Datenbasis** (Demo-Datenregeln), die
später ohne Umbau in Persistenz überführt werden kann.

## Ziel

Ein getippter, getesteter **`@isms/contracts`**-Paketkern, der den Objektvertrag, die Objektfamilien
F01–F09, die Beziehungstypen R01–R25, Datenqualitäts-/Confidence-Dimensionen und Bitemporalität aus
**Dokument 07** abbildet — plus eine erste **synthetische Demo-Seed-Grundlage** (vier Demo-Mandanten,
ein kohärenter Objektgraph für einen Mandanten) mit Seed-Manifest und Integritätstests. Alles **ohne
Datenbank/ORM**, damit spätere Persistenz nur noch ein Mapping ist.

## Nicht-Ziele

- **keine** Datenbank, kein ORM, keine Migrationen (folgt in eigenem WP nach Docker/ORM-Human-Gate),
- keine UI, keine API-Endpunkte, keine Authentisierung/Autorisierung (spätere WPs),
- keine vollständige Modellierung *aller* Objekttypen — nur der Vertrag + ein kohärenter Demo-Ausschnitt,
- keine realen Unternehmens-, Personen- oder Preisdaten (nur synthetisch),
- keine Erfindung von Modellinhalten, die nicht in Dok. 07 (bzw. referenzierten Dokumenten) stehen.

## Scope

1. **Objektvertrag (Envelope):** Pflichtfelder aus Dok. 07 als TypeScript-Typen/Zod-Schemas:
   `object_id`, `tenant_id`, `object_type`, `display_name`, `lifecycle_status`, `scope_ids`,
   `owner_ids`, `classification`, `source_refs`, `valid_time`, `record_time`, `version`,
   `quality_state`, konfigurierbare Erweiterungen.
2. **Enums/Vokabulare:** Objektfamilien F01–F09, kanonische Objekttypen (soweit in Dok. 07 benannt),
   Lifecycle-Zustände (kanonische Zustände aus Dok. 05/07), Klassifikationsstufen, Datenqualitäts-
   Dimensionen (Herkunft, Aktualität, Vollständigkeit, Konsistenz, Bestätigung, Verlässlichkeit,
   Zweckeignung), Provenance/Assertion-Art (assertiert/importiert/abgeleitet/freigegeben).
3. **Beziehungsvertrag:** Relationship-Envelope + Beziehungstypen R01–R25 (Typ, Richtung, Gültigkeit,
   Quelle, Vertrauen, Assertion-Art) aus Dok. 07.
4. **Bitemporalität:** `valid_time` (fachlich) vs. `record_time` (Systemzeit) im Vertrag verankert.
5. **Synthetische Demo-Mandanten:** Nordwerk Manufacturing SE, Finovia Digital Bank AG, MediCore
   Health Services GmbH, Consulting Operator Demo — als stabile Seed-Definitionen (feste IDs).
6. **Kohärenter Demo-Objektgraph** für **einen** Mandanten (z. B. Nordwerk): einige F02/F03/F06/F07-
   Objekte + Beziehungen, die eine nachvollziehbare Kette (Prozess → Asset → Control → Risk → Evidence)
   ergeben — als Beleg, dass der Vertrag trägt.
7. **Seed-Manifest** (`demo/seed-manifest.json`) + Reset-fähige, deterministische Struktur.
8. **Tests:** Schema-Validierung, stabile IDs, **Tenant-Scope-Isolation** (kein Cross-Tenant-Leak),
   referenzielle Integrität der Seed (jede Beziehung zeigt auf existierende, tenant-gleiche Objekte).

## Abhängigkeiten

- **Dokument 07** v1.0 (führende Quelle: Objekt-/Beziehungs-/Historien-/Vertrauensmodell)
- Dokument 05 v1.0 (kanonische Zustände, Modulbezug)
- Dokument 16 v1.0 (Demo-Mandanten/Onboarding-Objekte, nur soweit relevant)
- Dokument 19 v1.0 (Tenant-Isolation-Anforderung)
- `.claude/rules/demo-data.md`, `.claude/rules/testing.md`, `.claude/rules/architecture.md`
- ADR-0001 (Stack: TypeScript, pnpm-Workspace, Vitest)
- `context-packs/WP-003/CONTEXT_PACK.md`

## Slices und Checkpoint-Plan

### Slice 1 – Contract-Kern (`@isms/contracts`)
- Objekt-Envelope + Enums/Vokabulare + Beziehungsvertrag + Bitemporalität als Typen + Zod-Schemas.
- Unit-Tests: Schema akzeptiert gültige, weist ungültige Objekte/Beziehungen ab.
- **Micro Checkpoint 1.**

### Slice 2 – Synthetische Demo-Seed-Grundlage
- Vier Demo-Mandanten + kohärenter Objektgraph für einen Mandanten + Seed-Manifest.
- Tests: stabile IDs, Tenant-Scope-Isolation, referenzielle Integrität.
- **Verified Checkpoint.**

### Slice 3 – Abschluss & Review
- Unabhängiger Code-Review + Concept-Consistency-Review (Treue zu Dok. 07).
- Status-, Queue-, Handover-Update; Push ins Backup.
- **Release/Handover Checkpoint.**

## Acceptance Criteria

1. `@isms/contracts` baut, typecheckt und exportiert Objekt-/Beziehungsvertrag + Vokabulare.
2. Zod-Schemas validieren gültige Objekte/Beziehungen und lehnen ungültige ab (Tests grün).
3. Jedes Vertragselement ist auf **Dokument 07** rückführbar (kein erfundenes Feld/Vokabular).
4. Vier synthetische Demo-Mandanten mit stabilen IDs vorhanden; nur synthetische Daten.
5. Seed hat referenzielle Integrität und **keine Cross-Tenant-Referenzen** (Test beweist Isolation).
6. `pnpm test`, `pnpm typecheck`, `pnpm build` grün; CI grün.
7. Unabhängiger Review dokumentiert (Builder ≠ Reviewer).
8. Keine DB/ORM/Docker-Bindung eingeführt.

## Test Plan

- Zod-Schema-Positiv-/Negativtests (Objekt, Beziehung)
- Stabile-ID-Test (Seed-IDs deterministisch)
- Tenant-Scope-Isolationstest (keine Referenz über `tenant_id`-Grenze)
- Referenzielle-Integritäts-Test (jede R-Kante zeigt auf existierende Objekte)
- Bitemporalitäts-Test (valid_time/record_time getrennt handhabbar)

## Deliverables

- `packages/contracts` (`@isms/contracts`) mit Typen, Schemas, Vokabularen, Tests
- `demo/seed/*` synthetische Demo-Daten + `demo/seed-manifest.json`
- WP-003-Review-Notiz (QA + Concept Consistency)
- aktualisierte Status-/Queue-/Handover-Dateien

## Stop Conditions

- ein Vertragsteil ließe sich nicht auf Dok. 07 zurückführen (→ Finding/OFFENE FRAGE, nicht erfinden),
- Bedarf an DB/ORM/Docker entsteht (→ nächstes WP + Human Gate),
- reale Daten/Secrets, irreversible/destruktive Aktion, Kostenbindung,
- Scope wächst über „Vertrag + ein kohärenter Demo-Ausschnitt" hinaus.

## Done Evidence

- grüne Tests + CI, Commit/Push, Checkpoint-Records, Review-Notiz, aktualisierte Statusdateien.
