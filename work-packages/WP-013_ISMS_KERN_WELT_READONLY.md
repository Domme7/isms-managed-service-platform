# WP-013 – ISMS-Kern-Welt (read-only)

## Identität
- **Phase:** 6/7-Vorgeschmack auf Phase-1-Basis
- **Priorität:** P1 (nächste Erlebniswelt nach WP-012)
- **Status:** Draft (Aktivierung/Integration durch Orchestrator)
- **Risk Class:** Low (read-only, synthetisch, keine DB/Auth/Kosten)
- **Builder:** Frontend-Engineer (Slice 1)
- **Reviewer:** Code-Reviewer + Product-User-Lead (Slice 2, read-only)
- **Human Gates:** keiner (read-only, ausschließlich synthetische Daten)

## Ziel
Der Ort **„ISMS"** in der Shell wird eine read-only **Risk & Control-Ansicht** (angelehnt an
**S06 – Risk & Control Workspace**, Dok. 06 §7: „Warum ist das Risiko hoch und welche Controls
wirken?") auf dem synthetischen Seed des **aktiven Mandanten**:
- **Risiken** mit aufgelöster Herkunft (Risk Scenario, Threat via `threatens`, Weakness via
  `exposes`) und Betroffenheit (`affects` auf Prozess/Asset),
- **Controls** mit Control Implementation (`implements`), erfülltem Requirement inkl. Framework
  (`satisfies`/`part_of`) und Evidence-Stand (`evidences`),
- **Maßnahmen** mit Status und Bezug (behebt welche Weakness via `remediates`, mindert welches
  Szenario/Risiko via `mitigates`),
- **Evidence** mit Status,
- die Verbindungen als **Klartext-Kette** mit deutschen Beziehungslabels (Muster `components/twin`).

Empty-State für Mandanten ohne ISMS-Objekte (Finovia, MediCore, Consulting Operator).

## Nicht-Ziele
- **kein Scoring, kein Reifegrad, keine Risiko-/Confidence-Berechnung, keine Simulation** –
  Dok. 09/10 sind ausdrücklich spätere WPs; Dok. 09 dient hier nur der Abgrenzung,
- keine Schreibfunktion, keine Behandlungs-/Akzeptanz-Workflows, keine Statuswechsel,
- keine DB-Anbindung, keine echte Auth/Authz (Rollen-/Mandanten-Simulation aus WP-011 bleibt
  reine Demo-Perspektive),
- **keine Seed- oder Contract-Änderung**: Daten kommen ausschließlich aus `@isms/demo-seed`
  (Nordwerk-Kerngraph genügt); nichts am Modell erfinden – Lücken als OFFENE FRAGE markieren,
- kein Rollen-Gating erforderlich: die Ansicht zeigt nur den aktiven Mandanten, es gibt keine
  mandantenübergreifende Sicht (S06 nennt CISO/ISMS Manager als Primärrollen; in der Demo für
  alle Rollen lesbar).

## Scope

### Slice 1 – View-Helfer + „ISMS"-Seite (`apps/web`)
**React-freie View-Helfer** (Muster `lib/twin/data.ts` / `lib/services/data.ts`, z. B.
`lib/isms/data.ts`): reine, deterministische Ableitung aus `DEMO_SEED` je `tenant_id` –
Risiko-, Control-, Maßnahmen- und Evidence-Sichten mit aufgelösten Kanten
(`threatens`, `exposes`, `affects`, `mitigates`, `implements`, `satisfies`, `evidences`,
`remediates`, `part_of`). Auflösung strikt innerhalb **eines** Mandanten. Optional (kein AC):
Hinweis „im Serviceumfang von …" via vorhandener `covered_by`-Kanten – ohne jede Verkaufslogik.

**„ISMS"-Seite**: `app/(shell)/isms/page.tsx` ersetzt den Platzhalter durch eine `IsmsView`
mit dem Session-Zustandsrahmen der bestehenden Orte (Loading vor Hydration, „nicht angemeldet"
mit Link zur Login-Simulation, sonst Inhalt für aktiven Mandanten). Seitenanatomie und
Leitfrage nach Dok. 06 §6/§7 (S06); Zustände nach Dok. 06 §17 (insb. Empty); Klartext-Labels,
saubere Heading-Hierarchie/A11y, responsive Kernwege. „Implementiert" und „wirksam" bzw.
Prozess- und Objektstatus werden nie zusammengerechnet – es werden nur belegte Seed-Stände
angezeigt (08-D07, 08-D20).

**Tests mit der Funktion**: Vitest-Unit-Tests der Helfer (Auflösung der Kette, Tenant-Isolation
inkl. Negativ-Beweis, Empty-Ergebnis für leere Mandanten) + Render-Tests der Seite (Loading,
nicht angemeldet, Inhalt Nordwerk, Empty Finovia).

### Slice 2 – Unabhängiger Review + Browser-QA + Abschluss
Code-Review (Code-Reviewer) und fachlicher Review (Product-User-Lead) gegen S06/Acceptance
Criteria; Browser-QA der Kernwege (Nordwerk mit Inhalt, Mandantenwechsel → Empty-State,
responsive, A11y-Stichprobe); Findings dokumentieren und beheben; Builder ≠ Reviewer;
Verified Checkpoint + Statusabschluss.

## Acceptance Criteria
1. Ort „ISMS" rendert für den aktiven Mandanten read-only **Listen je Objektklasse**
   (Risiken, Controls, Maßnahmen, Evidence), jede mit Name und `lifecycle_status` aus dem Seed;
   ausschließlich belegte Seed-Werte, nichts hartkodiert oder erfunden.
2. **Risiken** zeigen ihre Herkunft als Klartext-Kette: Risk Scenario, Threat (`threatens`),
   Weakness (`exposes`) sowie betroffene Prozesse/Assets (`affects`) – mit deutschen
   Beziehungslabels.
3. **Controls** zeigen Control Implementation (`implements`), erfülltes Requirement inkl.
   Framework (`satisfies`/`part_of`) und Evidence-Stand (`evidences` mit Evidence-Status);
   Implementierungs- und Wirksamkeits-/Nachweisaussagen bleiben getrennt (08-D07).
4. **Maßnahmen** zeigen Status und Bezug: welche Weakness sie beheben (`remediates`) bzw.
   welches Szenario/Risiko sie mindern (`mitigates`).
5. Auflösung strikt je Mandant: kein Objekt/keine Kante eines fremden Mandanten erscheint;
   per Unit-Test (inkl. Negativ-Beweis) belegt.
6. **Empty-State** nach Dok. 06 §17 für Mandanten ohne ISMS-Objekte (Finovia, MediCore,
   Consulting Operator) mit Nutzen und nächstem Schritt; Loading-/Nicht-angemeldet-Zustände
   wie in den bestehenden Orten.
7. Tests grün (Helfer + Render), Monorepo grün (Lint/Typecheck/Test/Build); Browser-QA
   dokumentiert.
8. Unabhängige Reviews dokumentiert (Builder ≠ Reviewer; Code + Product-User-Lead); keine
   erfundenen Inhalte, fachliche Lücken als OFFENE FRAGE/Finding markiert.

## Stop Conditions
- eine fachlich nötige Aussage ist im Seed/Contract nicht vorhanden (→ OFFENE FRAGE/Finding,
  nicht erfinden; **keine** Seed-Erweiterung in diesem WP),
- Scope-Drift Richtung Scoring/Reifegrad/Simulation (Dok. 09/10), Schreibfunktionen, DB oder Auth,
- Konflikt mit parallelen Änderungen an Shell/Session, der nicht sicher integrierbar ist.

## Done Evidence
- grüne Tests + CI, DOM/Screenshot-QA, Commit/Push, Checkpoints, Review-Notizen, Statusdateien.
