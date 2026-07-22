# WP-012 – Berater-/Managed-Service-Welt (read-only)

## Identität
- **Phase:** 6/7-Vorgeschmack auf Phase-1-Basis
- **Priorität:** P1 (Owner-Wahl: erste Erlebniswelt)
- **Status:** Active
- **Risk Class:** Low (read-only, synthetisch, keine DB/Auth/Kosten)
- **Builder:** Slice 1 Data-Graph-Analytics · Slice 2 Frontend-Engineer
- **Reviewer:** Code-Reviewer + Concept-Consistency-Reviewer bzw. Product-User-Lead (read-only)
- **Human Gates:** keiner

## Ziel
Die **Consulting & Service World** (Rollen R08/R09) im Ort „Services" der Shell erlebbar machen:
ein read-only Portfolio-/Service-Blick auf synthetische Managed-Service-Daten — welche Services laufen
für welchen Mandanten, mit welchem Leistungsversprechen und welchem Stand.

## Nicht-Ziele
- keine DB-Anbindung, keine echte Auth, keine Preisverhandlung/Buchung, keine Schreibfunktion,
- **keine realen Preise/Kunden/Verträge** (nur synthetisch; D-015),
- keine Erfindung am Datenmodell: ausschließlich kanonische Objekt-/Beziehungstypen aus `@isms/contracts`.

## Scope

### Slice 1 – Managed-Service-Demo-Daten (`@isms/demo-seed`)
Erweitere den Seed um **F09-Objekte** (im Contract vorhanden: `Managed Service`, `SLA`, `Deliverable`)
sowie ggf. `Review`/`Objective`, verknüpft über kanonische Beziehungen (z. B. `delivered_by`, `covered_by`,
`part_of`, `contributes_to`), fachlich abgeleitet aus:
- **Dok. 13** (Service Definition/Offer/Instance/Run, Shared Responsibility, Service Charter, Quality Gates),
- **Dok. 14** (Servicekatalog/Pakete/SLA-Logik — **synthetische** Werte, illustrative Anker),
- **Dok. 15** (Berater-Operations: Portfolio, Engagement, Work Package, Kapazität) — nur soweit über
  kanonische Objekttypen abbildbar.
Mindestens: 2–4 Managed Services für Nordwerk + mindestens ein weiterer Mandant mit Service (damit die
Portfolio-Sicht mehrere Mandanten zeigt), je mit SLA und mindestens einem Deliverable/Nachweis.
Tenant-Isolation, stabile IDs, Determinismus und Manifest-Counts wie in WP-003 beibehalten.

### Slice 2 – „Services"-Ansicht in der Shell (`apps/web`)
Der Ort **Services** zeigt read-only: Service-Liste je Mandant (Name, Typ, Status/Lifecycle, SLA-Kurzinfo,
Deliverables) und — für R08/R09 — eine mandantenübergreifende **Portfolio-Übersicht** (welcher Mandant hat
welche Services). Zustände (Empty für Mandanten ohne Services), Klartext-Labels, barrierearm, responsiv.

## Acceptance Criteria
1. Seed enthält synthetische Managed-Service-Objekte + SLA + Deliverables, **nur kanonische Typen**; alle Envelopes validieren.
2. Tenant-Isolation, referenzielle Integrität, stabile IDs, Manifest-Counts weiterhin per Test bewiesen.
3. Ort „Services" rendert Services je Mandant + Portfolio-Sicht; Empty-State für Mandanten ohne Service.
4. Keine realen Preise/Kunden; nichts am Modell erfunden (Unklarheiten als OFFENE FRAGE markiert).
5. Tests grün (Seed + UI), Monorepo grün; visuelle QA bestanden.
6. Unabhängige Reviews dokumentiert (Builder ≠ Reviewer).

## Stop Conditions
- ein benötigter Objekt-/Beziehungstyp fehlt im Contract (→ OFFENE FRAGE/Finding, nicht erfinden),
- Bedarf an DB/Auth/echten Preisen, Scope über read-only Service-/Portfolio-Sicht hinaus.

## Done Evidence
- grüne Tests + CI, DOM/Screenshot-QA, Commit/Push, Checkpoints, Review-Notizen, Statusdateien.
