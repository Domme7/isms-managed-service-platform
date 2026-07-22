# Context Pack – WP-016 Mission Control „Heute" (read-only, ohne Morning Mission)

## Ziel
Der Ort **„Heute"** (`/heute`, Dok. 06 §4/06-D01, Standard-Startpunkt 06-D02) wird vom Platzhalter
zu einer read-only Mission-Control-Seite **ohne jede Berechnung**. Sie beantwortet die Leitfrage
aus Dok. 06 §7 S01 („Was hat sich seit meinem letzten Besuch verändert und was verdient
Aufmerksamkeit?") genau so weit, wie der Demo-Seed es belegt – in vier Abschnitten: **Wo stehe
ich?** (aktive Rolle + aktiver Mandant + dessen Bestand), **Was ist erfasst worden?** (die beiden
belegten Erfassungswellen aus `record_time.recorded_at`), **Was weiß ich über die Datenlage?**
(vier gezählte, unbewertete Beobachtungen) und **Wo steige ich ein?** (belegte Einstiege in Orte
und Objekt-360-Seiten des aktiven Mandanten).

Die **Morning Mission nach Dok. 10 §5 ist ausdrücklich NICHT Teil dieses WP** und darf nicht gebaut
werden: der Seed trägt keine Aufgaben-/Decision-Record-Objekte, der Objektvertrag kein Frist-,
Aufwands-, Kapazitäts- oder Prioritätsfeld, es gibt keine Ereignisse und – in WP-014 an den Daten
nachgewiesen – keine Versionshistorie. Priorisierungs- und Impact-Logik gehören zu späteren Work
Packages (Dok. 10 §14/§15/§18, Dok. 09; Queue: WP-008). Keine DB, keine Auth, kein Scoring, keine
Schreibfunktion, keine Seed-/Contract-Änderung.

## Verbindliche Prinzipien
- **Nichts erfinden:** ausschließlich belegte Seed-Werte und das kanonische Rollenmodell rendern.
  Fehlt eine fachlich nötige Aussage → `// OFFENE FRAGE` im Code + Eintrag `O-WP016-*` in
  `docs/project/OPEN_QUESTIONS.md` + ehrlicher Leerzustand. **Nicht raten, nicht füllen.**
- **Datenlücken nicht verstecken** (Dok. 07 §21, Dok. 06 §17 *Partial data*): fehlende Morning
  Mission, fehlender Veränderungsfeed, fehlende Wiederaufnahme, fehlende Owner/Scopes/Nachweise
  werden **benannt** – nicht weggelassen, nicht durch synthetische Inhalte ersetzt und nicht in
  eine Kennzahl verrechnet.
- **Erfassung ist keine Veränderung:** `record_time` ist die Systemachse, `valid_time` die
  fachliche Achse (Dok. 07 §11/D07). Beide nie vermischen, und aus einem Erfassungsdatum niemals
  ein „neu"/„geändert"/„seit Ihrem letzten Besuch" machen.
- **Keine Berechnung, keine Empfehlung, keine Priorisierung:** kein Score, Reifegrad, Ampelwert,
  Trend, Prozentwert, Schwellenwert, Rang, keine Frist, keine Handlungsempfehlung, kein
  Serviceangebot (Dok. 09 und Dok. 10 §10/§11/§14/§15/§18 sind spätere WPs; Dok. 13 MS15).
  Zählungen sind erlaubt, Wertungen nicht; Beobachtungen werden nicht nach „Schwere" sortiert.
- **Lebenszyklus ≠ Prüfergebnis** (Dok. 08 08-D07): Falls Stände angezeigt werden, gilt der in
  WP-013/WP-014 etablierte Wortlaut „Lebenszyklus-Stand" (Objekt) und „Status der Beziehung"
  (Kante) plus der **wortgleiche** seitenweite Rahmungssatz aus `components/isms/IsmsContent.tsx`
  bzw. `components/twin/ObjectDetailView.tsx`.
- **Eine Wahrheit, mehrere Rahmungen** (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02): Rollen und
  Erlebniswelten ändern Sprache, Betonung und Reihenfolge – **nie** die angezeigten Daten. Die
  Session-Simulation ist Perspektive, **keine Authz** und kein Rollen-Gating (WP-011, Dok. 19).
- **Tenant-Isolation ist Sicherheitsgrenze** (Dok. 07 §17/P09): alle Zahlen, Wellen, Beobachtungen
  und Links entstehen strikt aus dem **aktiven** Mandanten. Kein mandantenübergreifender Vergleich,
  keine fremden Namen/IDs im DOM; Negativbeweis im Test.
- **Orte bleiben stabil** (Dok. 06 06-D01): ein Einstieg mit leerem Bestand wird **benannt**, nicht
  ausgeblendet.
- **Liste statt Visualisierung** (Dok. 07 D08): kein Kernweg darf ein Diagramm voraussetzen; diese
  Seite ist bewusst text-/listenbasiert.
- **UI-Regeln** (`.claude/rules/frontend.md`, Dok. 06): eine Seite = eine Nutzerfrage (§6),
  Zustände Loading/Empty/Partial data (§17), Klartext statt Jargon, A11y (Heading-Hierarchie,
  Tastatur, Fokus, Status nie nur über Farbe – 06-D11) und responsive Kernwege sind Teil von Done.
- **Minimal gestalten** (DR-0003): bestehendes CSS-Vokabular weiterverwenden, kein neues
  Designsystem, keine visuelle Aufwertung „nebenbei".
- **Muster wiederverwenden statt duplizieren:** React-freie, deterministisch testbare View-Helfer
  nach dem Vorbild von `lib/twin/data.ts`, `lib/isms/data.ts`, `lib/services/data.ts`,
  `lib/twin/object-detail.ts`; vorhandene Funktionen importieren, nicht nachbauen.
- **Nur synthetische Inhalte** (`.claude/rules/demo-data.md`): `@isms/demo-seed` ist die einzige
  Inhaltsquelle; keine realen Namen, Preise, Kunden oder Prozesse.

## Pflichtquellen
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` — **gezielt lesen**:
  **§4** (acht stabile Orte, Ort „Heute": „Mission Control, Wiederaufnahme, persönliche
  Entscheidungen und Aufgaben"), **§5** (vier Erlebniswelten mit Leitfrage, **„Erlebnis"** und
  **„Bewusst vermeiden"** – die einzige dokumentierte Grundlage der rollenbezogenen Rahmung),
  **§6** (universelle Seitenanatomie + Querschnitt: Rolle, Mandant, Scope, Datenstand,
  Vertrauensgrad, Version, Hilfe), **§7 S01 Mission Control** (Leitfrage + Kerninhalt),
  **§8** (Mission Control & Morning Mission – **nur zur Abgrenzung**, siehe „Nicht im Context
  Pack"), **§16** (Wiederaufnahmepunkt – **nur zur Abgrenzung**, nicht gebaut),
  **§17** (UI-Zustände, insbesondere *Empty* und *Partial data*), **§19** (A11y/Responsive),
  **§22** (06-D01 acht Orte, 06-D02 Mission Control als Startpunkt, 06-D04 sichtbarer Kontext,
  06-D05 vier Welten/ein Datenmodell, 06-D11 Farbe nie allein).
- `docs/concept/active/10_DECISION_CENTER_KPIS_SIMULATIONEN_v1.0.md` — **nur diese Stellen, und
  nur als Abgrenzung/Begründung**: **§5.1** (fünf Ebenen der Morning Mission: Mission, „Warum
  heute", Impact, Strategie/Reihenfolge, „Das solltest du wissen"), **§5.3** (Priorisierungs-
  signale), **§5.4** (Missionszustände), **§18** (Priorisierungs-Engine), **§14/§15** (Simulation,
  Investitionswirkung), **§29 ENTSCHEIDUNG 10-02** (ein Datenmodell, unterschiedliche Verdichtung)
  und **§29 ENTSCHEIDUNG 10-08** (Priorisierung berücksichtigt u. a. Frist, Confidence, reale
  Kapazität). Ergänzend **§24.4** („Datenlücke statt falscher Sicherheit") als Haltungsanker.
  **Es wird aus Dok. 10 nichts implementiert.**
- `docs/concept/active/03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0.md` — **§3** kanonisches
  Rollenmodell R01–R12 (Produktrolle, Sphäre, Kernverantwortung). Bereits vollständig in
  `apps/web/lib/shell/roles.ts` übernommen: **von dort lesen, nichts neu übersetzen oder ergänzen**.
- `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md` — **§7**
  (Objektvertrag/Feldsemantik – Beleg dafür, dass es kein Frist-/Aufwands-/Kapazitäts-/
  Prioritätsfeld gibt), **§9** (Beziehungstypen, insbesondere **R15 `evidences`** für die
  Nachweis-Beobachtung und **R24 `supersedes`** für die Historienaussage), **§11** (Bitemporalität:
  `valid_time` vs. `record_time`), **§12** (Datenqualitätsdimensionen), **§17** (Mandantenfähigkeit),
  **§21** (Akzeptanzkriterien, u. a. „Datenlücken werden nicht still verborgen").
- `docs/concept/active/08_ISMS_KERNPROZESSE_v1.0.md` — nur **08-D07** (Lebenszyklus-Stand ist kein
  Prüfergebnis) als Wording-Grundlage.
- **Datenbasis** `packages/demo-seed/` — `README.md`, `seed-manifest.json`, `src/seed.ts`,
  `src/tenants.ts`, `src/nordwerk-graph.ts`, `src/managed-services.ts`, `src/seed.spec.ts`.
  Belegter Umfang (Seed 1.1.0): **40 Objekte / 54 Beziehungen**, davon Nordwerk **31/43** und
  Consulting Operator Demo **9/11**; Finovia und MediCore sind bewusst leer (`has_object_graph`).
  **Für dieses WP entscheidend:**
  - **zwei Erfassungswellen**: `RECORDED_AT = 2026-01-15T08:00:00.000Z` (ISMS-Kerngraph,
    `nordwerk-graph.ts`) und `SERVICE_RECORDED_AT = 2026-02-16T08:00:00.000Z`
    (Managed-Service-Schicht, `managed-services.ts`, für Nordwerk **und** Consulting Operator);
    fachliche Gültigkeit getrennt davon ab `2026-01-01` bzw. `2026-02-01`,
  - **keine Versionshistorie**: alle Objekte `version: 1`, kein `record_time.replaced_at`, keine
    `supersedes`-Kante,
  - **keine Aufgaben und keine Entscheidungen**: `Task` (F08) und `Decision Record` (F09) sind im
    Contract vorhanden, im Seed jedoch **nicht materialisiert**,
  - **Beobachtungsgrundlagen**: viele Objekte haben leere `owner_ids`; alle `scope_ids` verweisen
    auf Kennungen (`scope-nordwerk-isms-core`, `scope-nordwerk-managed-service`,
    `scope-consulting-operator-service-betrieb`) **ohne** eigenes Seed-Objekt (O-WP014-03); nur ein
    Teil der Kanten trägt `confidence`.
- `packages/contracts/src/object.ts`, `src/common.ts` (`ValidTime`, `RecordTime`, `QualityState`),
  `src/relationship.ts`, `src/vocabularies.ts` (F01–F09 inkl. `Task`/`Decision Record`, R01–R25
  inkl. R15/R24, Lifecycle-Status) — Beleg für vorhandene und **nicht** vorhandene Felder.
- `apps/web`-Muster (**wiederverwenden, nicht duplizieren**):
  - `lib/shell/roles.ts` — `DEMO_ROLES` (R01–R12), `EXPERIENCE_WORLDS`, `worldForRole`; einzige
    Quelle der Rollen-/Weltrahmung,
  - `lib/shell/session.ts` + `components/shell/SessionProvider.tsx` — aktive Rolle/Mandant
    (`resolved`, `hydrated`); speichert **nur** `roleId`/`tenantId` (Beleg: kein „letzter Besuch"),
  - `lib/shell/places.ts` — Ort „heute" mit Leitfrage (`question`) und `plannedScreen`/`live`
    (in Slice 2 auf `live` umstellen; `ShellNav` liest das Flag),
  - `lib/twin/data.ts` — `getTenant`, `getObjectsForTenant`, `getRelationshipsForTenant`,
    `groupObjectsByFamily`, `familyForType`, `objectTypeDisplay`, `confidenceQualitative`,
  - `lib/twin/routes.ts` — **`objectDetailHref`** (einzige Stelle der Objekt-Route) und
    `formatIsoDateDe`; bewusst **seed-frei** und deshalb der einzige zulässige Import für
    Client-Komponenten (siehe O-WP014-09),
  - `lib/twin/object-detail.ts` — `EVIDENCE_TARGET_TYPES` (R15-Zielarten) und das Muster der
    **aus den Daten abgeleiteten** Historienaussage,
  - `lib/isms/data.ts` — `buildIsmsCoreView`, `getIsmsCoreTenants`, `hasManagedServices` für die
    Bestandsangabe an den Einstiegen; zugleich Stilvorbild für React-freie Helfer,
  - `components/isms/IsmsView.tsx` — Sitzungsrahmen (Loading / „nicht angemeldet" / Inhalt),
  - `components/isms/IsmsContent.tsx` — Seitenaufbau, Empty-States mit Nutzen + nächstem Schritt
    und der **wortgleiche** Rahmungssatz zu Lebenszyklus-Ständen,
  - `components/shell/HeuteView.tsx` — der heutige Platzhalter (wird ersetzt),
  - `components/twin/ObjectDetailView.tsx` — Wording und Darstellung von Datenlücken.
- **Projektregeln und Statuswahrheit:** `CLAUDE.md`, `docs/project/CONTINUATION_BRIEFING.md`
  (§4 harte Regeln, §7 gelernte Lektionen), `docs/project/CURRENT_STATE.md`,
  `docs/project/OPEN_QUESTIONS.md` (bestehende IDs O-D07-*, O-WP012-*, O-WP013-01, O-WP014-01..11 –
  neue Fragen als `O-WP016-*` anschließen), `docs/decisions/` (DR-0003 minimales Design, DR-0004
  Session- vs. Routen-Mandant), `.claude/rules/frontend.md`, `.claude/rules/testing.md`,
  `.claude/rules/demo-data.md`, `.claude/rules/security.md`, `.claude/rules/docs.md`.

## Nicht im Context Pack
- **Morning Mission und ihre Bausteine** (Dok. 10 §5 Umsetzung, §13 Zielnavigation/Routen, §16
  Budget-/Kapazitäts-/Zeitlogik, §17 Neuberechnung, §18 Priorisierungs-Engine, §19 Value Ledger)
  sowie **Decision Cards/Decision Records** (Dok. 10 §9, Dok. 06 §13) — Queue: WP-008.
- **Bewertungs-, Reifegrad-, Threat- und Simulationslogik** (Dok. 09, Dok. 10 §14/§15) und
  **KPI-/Trend-/Frühwarnlogik** (Dok. 10 §10/§11).
- **Executive-Verdichtung / Decision Center / Portfolio Mission Control** (Dok. 06 §10/§11,
  Dok. 10 §6–§8) und der Ort „Entscheidungen".
- **Wiederaufnahme, Benachrichtigungen, globale Suche, gespeicherte Sichten** (Dok. 06 §16,
  Dok. 07 §16).
- **Zusammenarbeit** (Dok. 11: Aufgaben, Kommentare, Freigaben), **Reporting/Presentation-as-Code**
  (Dok. 12), **Integrationen/Workflow** (Dok. 17), **KI-Funktionen/Guardrails** (Dok. 20A).
- **DB-Anbindung** (`@isms/db`, blockiert durch FINDING-0004), **echte Auth/Rechte** (Dok. 19),
  **Seed- oder Contract-Erweiterungen** — jeweils eigene spätere Work Packages.
