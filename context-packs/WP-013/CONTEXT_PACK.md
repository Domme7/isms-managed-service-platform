# Context Pack – WP-013 ISMS-Kern-Welt (read-only)

## Ziel
Read-only **Risk & Control-Ansicht** (angelehnt an S06) am Ort „ISMS" der Shell, vollständig aus
`@isms/demo-seed` für den aktiven Mandanten abgeleitet: Risiken (mit Szenario/Threat/Weakness-
Herkunft), Controls (Implementation, Requirement, Evidence-Stand), Maßnahmen, Evidence – plus
Klartext-Kette. Keine DB, keine Auth, kein Scoring, keine Schreibfunktion.

## Verbindliche Prinzipien
- **Nichts erfinden:** ausschließlich belegte Seed-Werte rendern; keine Seed-/Contract-Änderung
  in diesem WP. Fehlt eine fachlich nötige Aussage → `// OFFENE FRAGE` + Finding, nicht erfinden.
- **Getrennte Stände, keine Berechnung:** Risk, Control, Measure und Evidence besitzen getrennte
  Lebenszyklen (Dok. 08 §27); „implementiert" ≠ „wirksam" (08-D07), Prozess- vs. Objektstatus
  getrennt (08-D20). Es werden nur vorhandene `lifecycle_status`-/Kantenwerte angezeigt –
  **keine** Scores, Ampeln, Reifegrade oder Aggregationen (Abgrenzung zu Dok. 09/10).
- **Evidenz statt Behauptung** (Dok. 08 P08): Evidence-Stand nur zeigen, wenn eine
  `evidences`-Kante existiert; nichts implizieren.
- **Tenant-Isolation:** jede Auflösung strikt innerhalb einer `tenant_id`; der Seed enthält
  keine Cross-Tenant-Kanten – das muss so bleiben und getestet sein.
- **Nur synthetische Inhalte** (`.claude/rules/demo-data.md`): der Seed ist die einzige
  Inhaltsquelle; keine realen Firmen/Personen/Preise.
- **UI-Regeln** (`.claude/rules/frontend.md`, Dok. 06): Leitfrage vor Navigation (S06),
  fünfteilige Seitenanatomie (§6), Zustände Loading/Empty/etc. (§17), Klartext statt Jargon
  (deutsche Beziehungslabels wie in `components/twin`), A11y + responsive Kernwege.
- **Session-Simulation ist keine Authz** (WP-011): aktive Rolle/Mandant nur als Demo-Perspektive.

## Pflichtquellen
- `docs/concept/active/08_ISMS_KERNPROZESSE_v1.0.md` — **gezielt lesen**: §10.1/§10.4
  (Risikoszenario, Risiko-Zustände), §11.1/§11.4 (Ebenen Requirement/Control/Implementation/
  Evidence, Control-Lebenszyklus), §12.1 (Maßnahmen-Zustände), §14.2 (Evidence-Vertrag),
  §27/§28 (getrennte Lebenszyklen, 08-D07/08-D20). Nur als Verständnis-/Anzeigehilfe – dieses
  WP baut **keine** Prozesse oder Workflows.
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` — §6 Seitenanatomie,
  §7 **S06 Risk & Control Workspace** (Leitfrage/Kerninhalt), §17 UI-Zustände.
- `docs/concept/active/09_REIFEGRAD_RISIKEN_BEDROHUNGEN_CONTROL_INTELLIGENCE_v1.0.md` —
  **NUR Abgrenzung:** Bewertungs-, Reifegrad-, Confidence- und Intelligence-Logik ist explizit
  NICHT Teil von WP-013 (spätere WPs); nichts daraus implementieren.
- `packages/demo-seed/README.md` + `seed-manifest.json` + `src/nordwerk-graph.ts` — verfügbare
  Objekte/Kanten und die kanonische Kette (processes/exposes/threatens/affects/mitigates/
  implements/satisfies/evidences/remediates/part_of; Serviceschicht mit `covered_by` optional
  als Hinweis). Kantenrichtung folgt strikt Dok. 07 §9, nicht der Leserichtung.
- `apps/web`-Muster: `lib/twin/data.ts` + `lib/services/data.ts` (React-freie, deterministisch
  testbare View-Helfer), `components/twin/*` (Karten/Listen, deutsche Klartext-Labels),
  `components/services/ServicesView.tsx`/`ServicesContent.tsx` (Session-Zustandsrahmen,
  Empty-State-Muster), `app/(shell)/isms/page.tsx` (Platzhalter, wird ersetzt),
  `lib/shell/places.ts` (Ort „ISMS": nach Umsetzung `live: true` statt `plannedScreen`),
  `components/shell/SessionProvider.tsx` + `lib/shell/roles.ts` (aktive Rolle/Mandant).

## Nicht im Context Pack
- Dok. 09/10-Berechnungslogik (Scoring, Reifegrad, Threat-Relevanz, Simulation), Decision
  Center, Reporting-Engine, DB-Anbindung, echte Auth/Rechte (Dok. 19), Schreib-/Behandlungs-
  Workflows, Seed-Erweiterungen — spätere WPs.
