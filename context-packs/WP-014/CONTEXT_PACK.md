# Context Pack – WP-014 Objekt-360-Detailseite (read-only)

## Ziel
Eine **generische read-only Objekt-Detailseite** (`/twin/[tenantId]/objekt/[objectId]`), die für
jedes Seed-Objekt die fünf Fragen der universellen Seitenanatomie (Dok. 06 §6) aus dem
kanonischen Envelope + den Kanten beantwortet und den Demo-Graphen erstmals **durchgängig
navigierbar** macht (Dok. 07 §10 Objekt-360-Navigationsvertrag). Keine DB, keine Auth, kein
Scoring, keine Schreibfunktion, keine Seed-/Contract-Änderung.

## Verbindliche Prinzipien
- **Nichts erfinden:** ausschließlich belegte Envelope-Felder und Seed-Kanten rendern. Fehlt eine
  fachlich nötige Aussage → `// OFFENE FRAGE` + Finding + ehrlicher Leerzustand, **nicht** füllen.
- **Datenlücken nicht verstecken** (Dok. 07 §21): fehlende Historie, fehlende Nachweise, fehlende
  Owner/Scopes werden benannt – nicht still weggelassen und nicht in einen Score verrechnet.
- **Keine Berechnung, keine Empfehlung:** kein Score, kein Reifegrad, kein verdichteter
  Vertrauensindikator (Dok. 07 §12/D10 erlaubt ihn, dieses WP baut ihn **nicht**), kein
  Handlungsvorschlag, kein Upselling (Dok. 13 MS15, Dok. 10 D10). „Was als Nächstes?" zeigt nur
  belegte Objekte/Kanten mit ihrem Status.
- **Aussagearten unterscheidbar** (Dok. 07 D05/§21): `assertion_kind` (assertiert/importiert/
  abgeleitet/freigegeben) und `confidence` sichtbar machen; Vertrauensgrad qualitativ + Wert über
  das vorhandene `confidenceQualitative` (Dok. 06 D08: keine nackte Zahl).
- **Bitemporalität getrennt halten** (Dok. 07 §11/D07): `valid_time` (fachlich) und `record_time`
  (Systemerfassung) nie vermischen oder zu einem „Datum" verschmelzen.
- **Tenant-Isolation ist Sicherheitsgrenze** (Dok. 07 §17/P09): Auflösung strikt innerhalb einer
  `tenant_id`; ein mandantenfremdes Objekt ist „nicht gefunden" – **identische** Antwort wie bei
  unbekannter ID, keine abweichende Meldung, keine Counts, keine Namen im DOM.
- **Liste ist gleichwertiger Zugang** (Dok. 07 D08): kein Kernweg darf eine Graphvisualisierung
  voraussetzen; diese Seite ist bewusst listen-/textbasiert.
- **UI-Regeln** (`.claude/rules/frontend.md`, Dok. 06): eine Seite = eine Nutzerfrage-Struktur
  (§6), Zustände Loading/Empty/Partial data (§17), Klartext statt Jargon (deutsche
  Beziehungslabels aus `lib/twin/data.ts`), A11y (Headings, Tastatur, Skip-Link) + responsive.
- **Session-Simulation ist keine Authz** (WP-011): aktive Rolle/Mandant nur Demo-Perspektive; die
  Detailseite wird **nicht** rollen-gated.
- **Nur synthetische Inhalte** (`.claude/rules/demo-data.md`): `@isms/demo-seed` ist die einzige
  Inhaltsquelle.

## Pflichtquellen
- `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md` — **gezielt
  lesen**: §7 (Objektvertrag/Feldsemantik), §8 (Lebenszyklus), §9 (Beziehungstypen R01–R25 inkl.
  Richtung), **§10 Objekt-360 und Navigationsvertrag** (die fünf Fragen + Pflichtinhalte:
  Identität, Scope, Owner, Kritikalität, Beziehungen, Datenvertrauen, Historie, Evidence),
  §11 (Zeitmodell/Bitemporalität), **§12 (sieben Datenqualitäts-/Herkunftsdimensionen)**,
  §17 (Mandantenfähigkeit), **§21 (Akzeptanzkriterien** – u. a. „ohne Kontextverlust navigieren",
  „jede sichtbare Beziehung zeigt Typ, Richtung, Gültigkeit und Herkunft", „Datenlücken werden
  nicht still verborgen").
  *Hinweis zur Zitierung:* Der Navigationsvertrag steht in **§10**; §21 macht ihn als
  Akzeptanzkriterium testbar. Beide Stellen sind für dieses WP führend – im WP-Auftrag war nur
  §21 genannt, das ist hier bewusst präzisiert (keine stille Auflösung, `.claude/rules/docs.md`).
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md` — **§6 universelle
  Seitenanatomie (fünf Fragen + Querschnitt: Rolle, Mandant, Scope, Datenstand, Vertrauensgrad,
  Version)**, §7 S05 Digital Twin Explorer (Leitfrage „Was ist betroffen und wie hängt es
  zusammen?"), §12 (Graph/Liste gleichberechtigt, jede Beziehung mit Typ/Richtung/Herkunft/
  Aktualität), **§17 UI-Zustände** (Empty, Partial data, Stale), §19 (A11y/Responsive).
- `docs/concept/active/09_...` und `10_...` — **NUR Abgrenzung:** Bewertungs-, Reifegrad-,
  Confidence- und Simulationslogik ist ausdrücklich **nicht** Teil von WP-014.
- `packages/contracts/src/object.ts`, `common.ts` (`ValidTime`, `RecordTime`, `Classification`,
  `ScopeAssignment`, `OwnerRef`, `SourceRef`, `QualityState`/`QualityDimensionAssessment`),
  `relationship.ts` (`assertion_kind`, `status`, `confidence`, `effectiveness_assumption`,
  `valid_time`/`record_time`), `vocabularies.ts` (F01–F09, R01–R25, Lifecycle-Status).
- `packages/demo-seed/README.md` + `seed-manifest.json` + `src/nordwerk-graph.ts` +
  `src/managed-services.ts` — verfügbarer Datenumfang: **40 Objekte / 54 Beziehungen** über zwei
  bespielte Mandanten (Nordwerk 31/43, Consulting Operator 9/11; Finovia/MediCore bewusst leer),
  ISMS-Kerngraph + Managed-Service-Schicht, dokumentierte Kantenrichtungen und die offenen Fragen
  O-WP012-01..06. **Wichtig für „Wie entwickelt es sich?":** alle Objekte tragen `version: 1`,
  kein `record_time.replaced_at`, keine `supersedes`-Kante – Bitemporalität ist sichtbar
  (Kerngraph gültig ab 2026-01-01/erfasst 2026-01-15; Serviceschicht gültig ab 2026-02-01/erfasst
  2026-02-16), eine Versionshistorie existiert jedoch **nicht** und darf nicht erfunden werden.
- `apps/web`-Muster:
  - `lib/twin/data.ts` — **wiederverwenden**: `getTenant`, `getObjectsForTenant`,
    `getRelationshipsForTenant`, `familyForType`, `relationshipTypeId`, `relationshipTypeLabel`,
    `confidenceQualitative` (nicht duplizieren, ggf. behutsam erweitern),
  - `lib/services/data.ts` und `lib/isms/data.ts` — Stil React-freier, deterministisch testbarer
    View-Helfer inkl. Fail-loud-Fallback auf rohe IDs,
  - `app/(shell)/twin/[tenantId]/page.tsx` — Routing-Muster: `params` als Promise,
    `generateStaticParams`, `generateMetadata`, `notFound()`,
  - `app/(shell)/twin/not-found.tsx` — Muster für den bereichseigenen deutschen 404,
  - `components/twin/ObjectCard.tsx` / `RelationshipList.tsx` — bestehende Darstellung von
    Envelope-Feldern, Datenqualität und Kanten (CSS-Klassen `tw-card`, `tw-meta`, `tw-quality`),
  - `components/isms/IsmsCards.tsx` (`IsmsLink` trägt bereits `object_id`),
    `components/services/ServiceCard.tsx`, `components/services/PortfolioOverview.tsx` —
    Linkquellen für Slice 2,
  - `components/shell/SessionProvider.tsx` — aktiver Mandant für Links aus session-gebundenen
    Ansichten.
- Regeln: `.claude/rules/frontend.md`, `.claude/rules/testing.md`, `.claude/rules/demo-data.md`,
  `.claude/rules/security.md`.

## Nicht im Context Pack
- Dok. 09/10-Berechnungslogik (Scoring, Reifegrad, Threat-Relevanz, Impact-Simulation),
  Decision Center, Reporting-Engine, Kommentare/Aufgaben/Freigaben am Objekt (Dok. 06 §13),
  Graphvisualisierung, Suche/Filter/gespeicherte Sichten (Dok. 07 §16), DB-Anbindung
  (`@isms/db`), echte Auth/Rechte (Dok. 19), Seed-/Contract-Erweiterungen — spätere WPs.
