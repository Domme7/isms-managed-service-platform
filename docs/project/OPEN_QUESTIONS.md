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
