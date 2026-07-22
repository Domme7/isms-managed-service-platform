# Context Pack – WP-003 Kanonische Datenverträge & Demo-Seed

## Ziel

Getippter, getesteter Objekt-/Beziehungsvertrag (`@isms/contracts`) + synthetische Demo-Seed-Grundlage,
**strikt abgeleitet aus Dokument 07**. Keine DB/ORM/UI/Auth.

## Verbindliche Prinzipien

- Konzept vor Erfindung: jedes Feld/Vokabular ist auf Dok. 07 rückführbar; Unklarheiten werden als
  OFFENE FRAGE/Finding markiert, nicht geraten.
- Semantik vor Speichertechnik (Dok. 07 P01): der Vertrag ist speicherunabhängig.
- Stabile, unveränderliche IDs; Historie nicht überschreiben; Bitemporalität.
- Mandantentrennung ohne Metadatenleck (Dok. 07 P09, Dok. 19): `tenant_id` in jedem Objekt, keine
  Cross-Tenant-Referenzen außer zu versionierten Plattformreferenzen.
- Nur synthetische Demo-Daten (`.claude/rules/demo-data.md`): stabile IDs, Reset-fähig, dokumentierte Storyline.
- Tests aus Acceptance Criteria + Risiken (`.claude/rules/testing.md`); Tenant-Isolation + Fehlerpfade explizit.

## Pflichtquellen

### Dokument 07 v1.0 (FÜHREND)
Pfad: `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md`
Relevant: Grundprinzipien P01–P12; Objektvertrag/Pflichtfelder; Objektfamilien F01–F09 und die dort
benannten konkreten Objekttypen; Beziehungstypen R01–R25 (Semantik, Richtung, Assertion-Art);
Datenqualitäts-/Vertrauensdimensionen; Bitemporalität (valid_time/record_time); Objekt-360; die vier
synthetischen Demo-Tenants und ihre Ketten.

### Dokument 05 v1.0
Pfad: `docs/concept/active/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md`
Relevant: kanonische Zustände (Objekt/Risiko/Control/Maßnahme/Evidence) für `lifecycle_status`-Vokabulare.

### Dokument 16 v1.0
Pfad: `docs/concept/active/16_KUNDEN_ONBOARDING_ZIELPROFIL_LIFECYCLE_v1.0.md`
Relevant: nur die Demo-/Tenant-/Scope-Objekte, soweit für die Seed nötig (Strategie-DNA/Target Profile
NICHT ausmodellieren — spätere WP).

### Dokument 19 v1.0
Pfad: `docs/concept/active/19_SICHERHEIT_DATENSCHUTZ_RECHTE_AUDITIERBARKEIT_v1.0.md`
Relevant: Tenant-Isolation als Testkriterium (Deny by Default, kein Cross-Tenant-Leak).

## Umsetzungshinweise (reversibel)

- Sprache/Tooling: TypeScript, Zod für Laufzeit-Schemas, Vitest (ADR-0001).
- Paket: `packages/contracts` → Name `@isms/contracts`, exportiert Typen + Schemas + Vokabulare.
- Seed unter `demo/seed/` als reine Daten (TS/JSON), Manifest `demo/seed-manifest.json`.
- KEINE Persistenz: Seed ist In-Memory-/Datei-Fixture, das später auf Repositories gemappt wird.

## Nicht im Context Pack enthalten

- Persistenz/Migrationen, ISMS-Prozesslogik (Dok. 08), Intelligence/Scoring (Dok. 09/10), UI (Dok. 06),
  Managed-Service-/Pricing-Objekte (Dok. 13/14) — spätere, gezielt geladene Work Packages.
