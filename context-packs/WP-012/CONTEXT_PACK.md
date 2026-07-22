# Context Pack – WP-012 Berater-/Managed-Service-Welt (read-only)

## Ziel
Synthetische Managed-Service-Daten im Seed + read-only „Services"-Ansicht in der Shell (Rollen R08/R09).
Keine DB, keine Auth, keine realen Preise.

## Verbindliche Prinzipien
- **Nichts am Modell erfinden:** nur kanonische Objekt-/Beziehungstypen aus `@isms/contracts` (Dok. 07).
  F09 enthält bereits `Managed Service`, `SLA`, `Deliverable`, `Review`, `Objective`, `KPI`, `Decision Record`.
  Fehlt etwas fachlich Nötiges → `// OFFENE FRAGE` + Finding, nicht erfinden.
- **Nur synthetische Inhalte** (`.claude/rules/demo-data.md`, D-015): erfundene Services/SLAs/Preise;
  keine realen Kunden, Verträge, internen Preise oder Templates. Preise nur illustrativ, klar als synthetisch markiert.
- **Outcome vor Aktivität** (Dok. 13 MS01): Services über Ergebnis/Leistungsversprechen beschreiben, nicht über Tätigkeitslisten.
- **Kein verstecktes Upselling** (Dok. 13 MS15, Dok. 10 D10): keine Verkaufslogik in der Ansicht.
- Tenant-Isolation, stabile IDs, Determinismus (wie WP-003); UI-Regeln aus `.claude/rules/frontend.md` (Zustände, A11y, responsive).

## Pflichtquellen
- `docs/concept/active/13_MANAGED_SERVICE_BETRIEBSMODELL_v1.0.md` — Service Definition/Offer/Instance/Run,
  Shared Responsibility, Service Charter, Quality Gates, Value/Exit (führend fürs Service-Verständnis).
- `docs/concept/active/14_SERVICEKATALOG_PAKETE_SLAS_PREISLOGIK_v1.0.md` — Katalog/Pakete/SLA-Logik/Preistreiber
  (nur **synthetische** Werte übernehmen; keine realen Preise).
- `docs/concept/active/15_BERATER_OPERATIONS_PORTFOLIO_RESSOURCENPLANUNG_v1.0.md` — Portfolio/Engagement/
  Work Package/Kapazität (nur soweit über kanonische Typen abbildbar).
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` — Consulting & Service World, Portfolio Cockpit (S04), Zustände.
- `packages/contracts/src/*` (kanonische Typen), `packages/demo-seed/src/*` (bestehender Seed/Manifest/Integritätshelfer),
  `apps/web/components/shell/*` + `app/(shell)/services/page.tsx` (bestehender Platzhalter).

## Nicht im Context Pack
- DB-Anbindung, echte Auth/Authz, Preiskalkulation/Buchung, Decision Center, Reporting-Engine — spätere WPs.
