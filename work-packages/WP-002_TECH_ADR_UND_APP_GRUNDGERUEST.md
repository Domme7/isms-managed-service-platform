# WP-002 – Technologie-ADR und ausführbares App-Grundgerüst (Entwurf)

- Phase: 0–1
- Priorität: P0
- Status: **Draft / Blocked** (benötigt Human Gate zur Stack-Bindung)
- Risk Class: Medium
- Accountable Owner: CTO-/Architecture-Agent
- Builder: Platform/DevOps, Backend Engineer, Frontend Engineer
- Reviewer: QA/Test (read-only), Product Security & Privacy (read-only)
- Human Gates: **finale Stack-/Package-Manager-/Hosting-Entscheidung**, kostenpflichtige CI-/Cloud-Ressourcen

## Problem

Nach WP-001 existiert ein validiertes, fortsetzbares Repository, aber **kein ausführbares
App-Grundgerüst** und **keine entschiedene Technologiebasis**. Ohne eine ADR-gestützte,
menschlich freigegebene Stack-Entscheidung kann kein vertikaler Produktpfad (WP-004+) sicher
beginnen. Der Stack darf laut Projektverfassung (O-003/O-005, D-011) nicht still festgelegt werden.

## Ziel

1. Eine **CTO-Architecture-Decision-Record (ADR)**, die den initialen App-Stack, Package Manager,
   Test-/Build-Toolchain und lokales Umgebungsmodell **vorschlägt und nach Human Gate entscheidet** —
   auf Basis des Capability-Checks (Node v24 ✓, Docker ✗, gh ✗) und Dokument 18.
2. Ein **minimales, lauffähiges, getestetes App-Grundgerüst** (modularer Monolith gem. D-011):
   ein startbares `apps/api`-Skelett mit Health-Endpoint und ein `apps/web`-Shell-Platzhalter —
   **ohne** Produktfeatures, Auth, Tenant-Logik oder reale Daten.
3. Erweiterung der Basis-CI um Build/Lint/Unit für das Grundgerüst.

## Nicht-Ziele

- keine Produktmodule (Digital Twin, ISMS, Decision Center, Reporting, Managed Service),
- keine UI-Feature-Implementierung, kein Designsystem-Ausbau (→ WP-004),
- keine Authentisierung/Tenant-Trennung (→ WP-005),
- keine realen Daten, Secrets oder produktiven Cloud-/CI-Kosten,
- keine Microservice-Aufspaltung ohne dokumentiertes Extraktionskriterium.

## Scope

1. Capability-informierte Stack-Optionen (2–3 Kandidaten) mit Trade-offs dokumentieren.
2. ADR-Entwurf erstellen; materiale Bindung erst nach Human Gate.
3. Minimales Monolith-Skelett + Health-Check + ein Unit-/Contract-Smoke-Test.
4. CI-Erweiterung (Build/Lint/Test) neben dem bestehenden Repository-Contract-Job.
5. `packages/`-Grenzen (domain/ui/contracts/test-support) nur als leere, versionierte Verträge belassen.

## Abhängigkeiten

- WP-001 (abgeschlossen), `docs/project/capability/CAPABILITY_CHECK_RESULT.md`
- Dokument 18 (Technische Architektur), Dokument 19 (Security), Dokument 20C (Bauplan)

## Slices und Checkpoint-Plan (Entwurf)

- Slice 1: Stack-Optionen + ADR-Entwurf → Micro Checkpoint (keine Bindung).
- Slice 2: **Human Gate** – Stack-Entscheidung freigeben; ADR auf Accepted.
- Slice 3: minimales Skelett + Health-Endpoint + Smoke-Test → Verified Checkpoint.
- Slice 4: CI-Erweiterung + Doku/Status/Handover → Release-Checkpoint.

## Acceptance Criteria (Entwurf)

1. ADR mit Optionen, Entscheidung, Security/Tenant-Auswirkung und Rollback-Regel liegt vor und ist **Human-Gate-freigegeben**.
2. `apps/api`-Skelett startet lokal und liefert einen Health-Endpoint.
3. Mindestens ein automatisierter Smoke-/Unit-Test ist grün; Repository-Contract-Tests bleiben grün.
4. CI baut und testet das Grundgerüst reproduzierbar (ohne kostenpflichtige Ressourcen).
5. Keine Secrets/realen Daten; keine Auth-/Tenant-Logik vorgezogen.
6. Status, WORK_QUEUE, Handover aktualisiert; nächste Session ohne Chatwissen fortsetzbar.

## Test Plan (Entwurf)

- Repository Contract Tests (weiterhin grün)
- Grundgerüst-Smoke-/Unit-Test
- CI-Dry-Run des neuen Build/Test-Jobs
- Secret Pattern Scan

## Deliverables

- CTO-Stack-ADR (Accepted nach Human Gate)
- lauffähiges minimales App-Grundgerüst
- erweiterte CI
- aktualisierte Statusdateien + Handover

## Stop Conditions

- Stack-Bindung ohne Human Gate,
- kostenpflichtige Cloud-/CI-Ressourcen,
- Auth/Tenant/Datenmodell würde vorgezogen,
- Scope wächst Richtung Produktfeatures.

## Done Evidence

- Accepted ADR + Human-Gate-Notiz,
- grüne Grundgerüst- und Repository-Tests,
- CI-Lauf,
- Verified/Release Checkpoint,
- aktualisierte Statusdateien und Handover.
