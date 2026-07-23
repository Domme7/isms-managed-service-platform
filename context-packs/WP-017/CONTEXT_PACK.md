# Context Pack – WP-017 Entscheidungen im Zwilling (Seed-Erweiterung + Ort „Entscheidungen")

## Ziel

Zwei Slices, strikt nacheinander:

**Slice 1 – `packages/demo-seed`:** Der Demo-Seed erhält für den Mandanten **Nordwerk** eine
kleine Zahl kanonischer **`Decision Record`**-Objekte (F09), die an den **bestehenden**
Nordwerk-Graphen andocken: **R23 `decided_in`** (Risiko/Service → Entscheidung), **R15
`evidences`** (vorhandener Nachweis → Entscheidung), **R03 `owns`** (vorhandene CISO-Rolle →
Entscheidung) und – ausdrücklich gewollt – ein Paar über **R24 `supersedes`** (Nachfolgerin →
abgelöste Vorgängerin, mit **geschlossenem** `valid_time`-Intervall am Vorgänger).
Das ist **keine Contract-Änderung**: `Decision Record` und R03/R15/R23/R24 stehen bereits im
kanonischen Vertrag. Kein Human Gate.

**Slice 2 – `apps/web`:** `/entscheidungen` wird read-only echt – ein **Entscheidungsregister**
des aktiven Mandanten mit Entscheidungsfrage, Kontext, Lebenszyklus-Stand, Owner, getrennten
Zeitachsen, den über R23 verknüpften Bezugsobjekten, den über R15 verknüpften Nachweisen und der
**Ablösekette über R24** – der ersten **belegten** Historie im Produkt.

**Ausdrücklich NICHT Teil dieses WP:** die **Decision Card** nach Dok. 10 (Abschnitt
„Decision Cards", 14 Pflichtfelder, davon **neun** ohne Träger im Objektvertrag und fünf nur
teilweise — am 2026-07-23 gegen das PDF nachgerechnet), jede Dringlichkeits-/Priorisierungsaussage
(„jetzt erforderlich" ist ohne Frist und Priorität nicht beantwortbar), Optionen, Baseline,
Wirkung, Ressourcen, Kostenband, Empfehlung, Freigabe-Workflow, Simulation, Executive- oder
Customer Decision Center – und **keine `Task`-Objekte** (Begründung siehe „Verbindliche
Prinzipien"). Keine DB, keine Auth, kein Rollen-Gating, keine Schreibfunktion, keine
Contract-Änderung.

## Verbindliche Prinzipien

- **Nichts erfinden, alles aus Konzept + Contract ableiten.** Fehlt eine fachlich nötige
  Aussage → `// OFFENE FRAGE` im Code + Eintrag `O-WP017-*` in
  `docs/project/OPEN_QUESTIONS.md` + ehrlicher Leerzustand. **Nicht raten, nicht füllen, nicht
  „sinngemäß" aus Dok. 10 ableiten.**
- **Nur kanonische Typen.** Objekttypen ausschließlich aus `OBJECT_TYPE` (F01–F09),
  Beziehungstypen ausschließlich aus `RELATIONSHIP_TYPE` (R01–R25), Richtungen exakt wie in
  Dok. 07 §9 dokumentiert: R23 `Risk/Change/Service -> Decision Record`,
  R24 `Version/Policy/Decision -> Vorgänger` (**Nachfolger ist die Quelle**),
  R15 `Evidence -> Control/Measure/Decision`, R03 `Person/Rolle/Einheit -> Objekt`.
  **Kein Kantentyp wird zweckentfremdet**, um eine fehlende Verbindung zu ersetzen.
- **`Task` wird nicht materialisiert.** Der Typ steht in Dok. 07 §6 (F08), hat dort aber in §9
  **keine einzige** Beziehungszeile – er wäre ein beziehungsloses Waisenobjekt. Das ist eine
  echte Konzeptlücke (analog zu O-WP012-02) und wird als **O-WP017-01 benannt, nicht umgangen**.
  Folge: die Morning Mission (Dok. 10 §5, WP-008) bleibt blockiert – bewusst.
- **Keine Preise, Beträge, Währungen, Kostenbänder, Budgets, Service Credits, Tages-/Stundensätze.**
  Dok. 10 §8.2 nennt für Investitionsentscheidungen ein „Kostenband" – das wird hier **nicht**
  umgesetzt. Es existiert ein Guardrail-Test im Seed (`packages/demo-seed/src/seed.spec.ts:309`,
  `.claude/rules/demo-data.md`), der grün bleiben muss.
- **Keine Bewertung, keine Priorisierung, keine Empfehlung.** Kein Score, Reifegrad, Ampelwert,
  Trend, Prozentwert, Schwellenwert, Rang, keine Frist, keine Handlungsempfehlung, kein
  Serviceangebot (Dok. 09 und Dok. 10 §10/§11/§14/§15/§18 sind spätere WPs; Dok. 13 MS15).
  Reihenfolge = Datenbestandsreihenfolge, und die Regel steht sichtbar an der Liste.
- **Datenlücken benennen, nicht verstecken** (Dok. 07 §21, Dok. 06 §17 *Partial data*):
  Die fehlenden Decision-Card-Pflichtfelder werden **feldweise** ausgesprochen – als Aussage
  über den heutigen Datenbestand, **ohne** Roadmap, Termin oder „kommt bald".
- **Lebenszyklus ≠ Prüfergebnis** (Dok. 08 08-D07): Objektstatus heißt „**Lebenszyklus-Stand**",
  Kantenstatus „**Status der Beziehung**"; der seitenweite Rahmungssatz wird **wortgleich** aus
  `apps/web/components/isms/IsmsContent.tsx` übernommen. Ein „genehmigt" ist ein Stand im
  Datenbestand, **keine** erteilte Freigabe.
- **Zwei Zeitachsen, nie vermischt** (Dok. 07 §11/D07): `valid_time` ist die fachliche,
  `record_time` die System-Achse. Aus einem Erfassungszeitpunkt wird niemals eine Änderung.
  Die abgelöste Entscheidung endet **fachlich** (`valid_time.to`) – ihr Datensatz wird **nicht**
  ersetzt (`record_time.replaced_at` bleibt leer, `version` bleibt 1; siehe O-WP017-07).
- **Ablösung ohne Überschreibung** (Dok. 07 §9 R24, Dok. 10 §9.2): die Vorgängerentscheidung
  bleibt sichtbar, verlinkt und vollständig – sie wird nicht ausgeblendet und nicht überschrieben.
- **Ripple im selben Pass** (Briefing §7.4): Die Seed-Erweiterung macht Wächtertests und
  Count-Erwartungen in `packages/demo-seed`, `packages/db` und `apps/web` **absichtlich rot**.
  Sie werden auf die **neue, korrekte** Aussage umgestellt – **nicht** entschärft, gelöscht oder
  übersprungen; die Fixture-Negativbeweise bleiben unverändert. Die vollständige Liste steht im
  Work Package (Abschnitt „Ripple", A–E).
- **Zahlen nachrechnen, nicht übernehmen** (Briefing §7.6): neue Counts werden am Seed ermittelt
  und dann in Manifest, README, `packages/db` und `apps/web` identisch geführt.
- **Tenant-Isolation ist Sicherheitsgrenze** (Dok. 07 §17/P09): keine Cross-Tenant-Kante im Seed,
  keine fremden Namen/IDs im DOM, Negativbeweis in Helfer- **und** Render-Test.
- **Orte bleiben stabil** (Dok. 06 06-D01): ein Mandant ohne Entscheidungen bekommt einen
  **ehrlichen, unterscheidenden** Empty-State (Graph vorhanden, aber keine Entscheidungen ≠ gar
  kein Datenbestand) – nicht Verstecken, nicht Füllen.
- **Eine Wahrheit, mehrere Rahmungen** (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02): Rollen
  ändern Sprache und Betonung, **nie** die Daten. Die Session-Simulation ist Perspektive,
  **keine** Authz (WP-011, Dok. 19).
- **Muster wiederverwenden statt duplizieren:** React-freie, deterministisch testbare Helfer nach
  dem Vorbild von `lib/isms/data.ts`, `lib/heute/data.ts`, `lib/twin/object-detail.ts`;
  Sitzungsrahmen/Präsentation getrennt wie `IsmsView`/`IsmsContent`.
- **Minimal gestalten** (DR-0003): bestehendes CSS-Vokabular, kein neues Designsystem, keine
  visuelle Aufwertung „nebenbei".
- **Bundle-Grenze O-WP014-09 nicht verschärfen:** für Routen/Datumsformat ausschließlich das
  seed-freie `lib/twin/routes.ts` importieren, **nie** `lib/twin/object-detail.ts`.
- **Verifikation ohne „Lint":** es gibt keinen Linter im Stack (FINDING-0005). Verifiziert wird
  mit frischem Test-/Typecheck-/Build-Lauf **ohne Turbo-Cache** plus
  `python scripts/validate_handoff.py`.

## Pflichtquellen

### Konzept (gezielt lesen – nicht ganze Dokumente)

- `docs/concept/active/10_DECISION_CENTER_KPIS_SIMULATIONEN_v1.0.md`
  - **§9 Decision Cards** – **die wichtigste Stelle dieses WP**: §9.1 die **14 Pflichtfelder**
    (Entscheidungsfrage, Zielbezug, Auslöser, Baseline, Optionen inkl. Nichtstun, Wirkung,
    Ressourcen, Abhängigkeiten, Confidence, Empfehlung, Owner **und** Approver, Frist,
    Outcome Check, Provenance) und **§9.2 Decision Record** („Nach Freigabe wird die Karte zum
    unveränderbaren Decision Record. Korrekturen erfolgen als neue Version oder Nachtrag.") –
    fachliche Grundlage der R24-Ablösekette.
  - **§8.2 Entscheidungsarten** (Risiko, Service, Priorität …) – **nur als Muster** für
    plausible synthetische Entscheidungsgegenstände. **Das dort genannte „Kostenband" wird
    ausdrücklich nicht umgesetzt.**
  - **§6, §7, §8.1, §8.3** (Customer/Portfolio/Executive Decision Center, Executive Sprache) –
    **nur zur Abgrenzung**: was hier NICHT gebaut wird.
  - **§18 Priorisierungs-Engine**, **§14/§15 Simulation/Investitionswirkung**,
    **§29 ENTSCHEIDUNG 10-02** (ein Datenmodell, unterschiedliche Verdichtung) und
    **10-08** (Priorisierung braucht Frist, Confidence, reale Kapazität) – **nur als Beleg**,
    warum „jetzt erforderlich" hier nicht beantwortbar ist.
  - **§24.4 „Datenlücke statt falscher Sicherheit"** – Haltungsanker für den Ehrlichkeitsblock.
  - **Aus Dok. 10 wird nichts implementiert.**
- `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md`
  - **§6** Objektfamilien (F09 enthält `Decision Record`; F08 enthält `Task`),
  - **§7 Objektvertrag** – der vollständige Feldkatalog; **Beleg**, dass es kein Frist-,
    Aufwands-, Options-, Baseline-, Wirkungs-, Approver- oder Outcome-Check-Feld gibt,
  - **§8 Lebenszyklus** – insbesondere „**Überholt:** Durch neue Version ersetzt; historisch
    sichtbar" (Zustand der abgelösten Entscheidung, siehe O-WP017-03),
  - **§9 Beziehungsmodell** – die Zeilen **R03, R15, R23, R24** wörtlich; zugleich der Beleg,
    dass **`Task` in keiner einzigen Zeile** vorkommt (O-WP017-01),
  - **§11 Bitemporalität**, **§12 Datenqualität/Vertrauen**, **§17 Mandantenfähigkeit**,
    **§10/§21** (Objekt-360- und Navigationsvertrag, „Datenlücken werden nicht still verborgen").
- `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md`
  - **§4** (acht stabile Orte; „**Entscheidungen:** Decision Records, Freigaben,
    Risikoakzeptanz, Investitionsoptionen"), **§5** (Erlebniswelten – Rahmung, keine
    Datenunterschiede), **§6** (universelle Seitenanatomie + Querschnitt: Rolle, Mandant, Scope,
    Datenstand, Vertrauensgrad, Version), **§7 S03** (Leitfrage des Ortes und ihr Kerninhalt –
    **nur zur Abgrenzung**), **§13** (Entscheidungen/Freigaben leben am Objekt – **nicht**
    gebaut), **§17** (UI-Zustände, insbesondere *Empty* und *Partial data*), **§19**
    (A11y/Responsive), **§22** (06-D01 acht Orte, 06-D04 sichtbarer Kontext, 06-D05 vier Welten/
    ein Datenmodell, 06-D11 Farbe nie allein).
- `docs/concept/active/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md` – **§7** „Kanonische
  Zustände", Zeile **Entscheidung** („vorbereitet, zur Freigabe, genehmigt/abgelehnt, umgesetzt,
  überprüft") – belegt zugleich, dass ein Zustand „abgelöst" fehlt (O-WP017-03).
- `docs/concept/active/08_ISMS_KERNPROZESSE_v1.0.md` – nur **08-D07** (Lebenszyklus-Stand ist
  kein Prüfergebnis) als Wording-Grundlage.
- `docs/concept/active/03_ZIELGRUPPEN_ROLLEN_ARBEITSSITUATIONEN_v1.0.md` – **§3** Rollenmodell
  R01–R12; bereits vollständig in `apps/web/lib/shell/roles.ts` – **von dort lesen**, nichts neu
  übersetzen.

### Contract und Daten

- `packages/contracts/src/vocabularies.ts` – `OBJECT_TYPES_F08` (`Task`, Zeile 90),
  `OBJECT_TYPES_F09` (`Decision Record`, Zeile 103), `RELATIONSHIP_TYPES` (R03 Zeile 412,
  R15 Zeile 424, R23 Zeile 432, R24 Zeile 433), `LIFECYCLE_STATUS_DECISION` (Zeile 264),
  `OBJECT_LIFECYCLE_STATUS` (Zeile 205, enthält `Überholt`).
- `packages/contracts/src/object.ts`, `src/common.ts` (`ValidTime` mit optionalem `to`,
  `RecordTime` mit optionalem `replaced_at`, `QualityState`), `src/relationship.ts` – Beleg für
  vorhandene **und nicht vorhandene** Felder.
- `packages/demo-seed/`
  - `src/nordwerk-graph.ts` – Anknüpfungspunkte: `NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG`,
    `.CTRL_BACKUP`, `.MEASURE_PATCH`, `.WEAK_ERP_SCHNITTSTELLE`, `.EVIDENCE_RESTORE_TEST`,
    `.ROLE_CISO`; Konstanten `VALID_FROM = 2026-01-01`, `RECORDED_AT = 2026-01-15`,
    Scope `scope-nordwerk-isms-core`; typisierte Fabriken als Stilvorbild.
  - `src/managed-services.ts` – **das Muster für eine Seed-Erweiterung** (WP-012): eigene Datei,
    eigene Zeitkonstanten (`SERVICE_VALID_FROM = 2026-02-01`,
    `SERVICE_RECORDED_AT = 2026-02-16`), tenant-parametrisierte Fabriken, Kopfkommentar mit
    fachlicher Herleitung **und** `OFFENE FRAGE`-Block, Anknüpfung an den Kerngraphen über
    `covered_by`/`requires`; Anknüpfungspunkt für R23:
    `NORDWERK_SERVICE_OBJECT_ID.SERVICE_MANAGEMENT_REPORTING` (Zustand `Review`).
  - `src/seed.ts` – Aggregation und `SEED_VERSION` (die neue Schicht **hinter** der
    Managed-Service-Schicht anhängen, damit die Objektreihenfolge innerhalb von F09 und damit
    die Objekt-Einstiege auf `/heute` stabil bleiben).
  - `src/index.ts`, `src/integrity.ts`, `seed-manifest.json`, `README.md`, `src/seed.spec.ts` –
    alle vier werden mitgezogen (Counts, `layers`, `relationship_types_used`, Storyline,
    Kantendiagramm, Erfassungswellen, Exporte, offene Fragen, Tests).
  - **Belegter Ausgangsstand (Seed 1.1.0):** 40 Objekte / 54 Beziehungen; Nordwerk 31/43,
    Consulting Operator Demo 9/11, Finovia/MediCore bewusst leer. **Alle** Objekte `version: 1`,
    **kein** `record_time.replaced_at`, **keine** `supersedes`-Kante, **kein** `Task`- und
    **kein** `Decision Record`-Objekt. Zwei Erfassungswellen (15.01.2026, 16.02.2026).
    **Diese Zahlen sind der Ausgangspunkt – die neuen sind am Seed nachzurechnen.**

### Code-Muster in `apps/web` (wiederverwenden, nicht duplizieren)

- `components/isms/IsmsView.tsx` – Sitzungsrahmen (Loading / „nicht angemeldet" + `/login` /
  Inhalt); `components/isms/IsmsContent.tsx` – Seitenaufbau, Empty-States mit Nutzen + nächstem
  Schritt und der **wortgleiche** Rahmungssatz zu Lebenszyklus-Ständen (Zeilen 55–61).
- `components/shell/MissionControlContent.tsx` – Kontextzeile, Abschnittsaufbau, `anzahl()`-Helfer
  und der **Ehrlichkeitsblock** `HonestySection` (Zeilen 574–623) als Vorbild **und** als
  Ripple-Stelle (der Satz „keine Objekte der Typen „Task" und „Decision Record"" wird nach
  Slice 1 falsch).
- `components/twin/ObjectDetailView.tsx` – Darstellung von Kanten, getrennten Zeitachsen,
  geschlossenen Intervallen („fachlich gültig bis") und benannten Datenlücken.
- `lib/twin/object-detail.ts` – `ObjectHistoryState`/`buildObjectDetail` (Zeilen 208–225,
  547–585): das etablierte Muster der **aus den Daten abgeleiteten** Historienaussage sowie
  `EVIDENCE_TARGET_TYPES` (enthält bereits `Decision Record` – dadurch ändert die
  Seed-Erweiterung die Beobachtung „ohne Nachweisbezug" auf `/heute`).
- `lib/heute/data.ts` – `deriveHistoryState`/`historyStatement` (Zeilen 159–254): der bislang nur
  gegen Fixtures gelaufene `hasHistory === true`-Zweig wird jetzt Produkttext (Numerus prüfen).
- `lib/twin/data.ts` – `OBJECT_TYPE_LABEL_DE` (Zeile 82, ohne Glosse für `Decision Record`),
  `REL_TYPE_TO_LABEL_DE` (Zeile 161, **ohne** Label für `decided_in`), `familyForType`,
  `objectTypeDisplay`, `relationshipTypeId/Label`, `confidenceQualitative`,
  `getObjectsForTenant`, `getRelationshipsForTenant`, `getTenant`.
- `lib/twin/routes.ts` – **`objectDetailHref`** und `formatIsoDateDe`; bewusst seed-frei und
  deshalb der **einzige** zulässige Import für Client-Komponenten (O-WP014-09).
- `lib/isms/data.ts` – React-freie Helfer als Stilvorbild (`ofType`, aufgelöste Kanten,
  Fail-loud bei nicht auflösbaren IDs).
- `lib/shell/places.ts` – Ort `entscheidungen` (Zeilen 77–85) mit `question` und
  `plannedScreen`; in Slice 2 auf `live: true` umstellen. `ShellNav` liest das Flag.
- `lib/shell/session.ts`, `components/shell/SessionProvider.tsx` – aktive Rolle/Mandant
  (`resolved`, `hydrated`).
- `app/(shell)/entscheidungen/page.tsx` – heutiger Platzhalter (wird ersetzt);
  `components/shell/PlaceholderPage.tsx` als Kontrast.

### Tests, die den Ripple definieren (vor dem Bau lesen)

- `packages/demo-seed/src/seed.spec.ts` – Zeilen 85/97 (Counts je Mandant), 232/239
  (Bitemporalität), 309 (Preis-/Währungs-Guardrail), 351/357/384 (Manifest-Konsistenz).
- `packages/db/src/seed-loader.spec.ts` (Zeilen 12–24) und
  `packages/db/src/tenant-isolation.spec.ts` (Zeilen 13–18) – hart kodierte Count-Erwartungen.
- `apps/web/lib/twin/__tests__/object-detail.test.ts:228-245` – **Historien-Wächter über alle
  Objekte**.
- `apps/web/lib/heute/__tests__/data.test.ts` – Zeilen 82–109/148 (Erfassungswellen),
  193–209 (Historienaussage), 211–267 (**Fixture-Negativbeweise – unverändert lassen**),
  300–303 (Beobachtungswerte), 457–462 und 518–519 (Bestandszahlen).
- `apps/web/components/shell/__tests__/mission-control.test.tsx` – Zeilen 160–172, 208,
  251–266, 303–332, 362, 487, 718–723, 731–740.
- `apps/web/lib/shell/__tests__/shell-logic.test.ts:41-65` – `live`-Orte und Platzhalterzahl.
- `apps/web/components/twin/__tests__/object-detail.test.tsx:103-112` – Render-Aussage
  „Keine Versionshistorie im Demo-Seed" (bleibt gültig, weil dort ein Objekt **ohne** Ablösung
  gerendert wird – im Review gegenprüfen).

### Projektregeln und Statuswahrheit

- `CLAUDE.md`, `docs/project/CONTINUATION_BRIEFING.md` (**§3** Parallelität, **§4** harte Regeln,
  **§7** gelernte Lektionen – insbesondere 4 „Ripple mitziehen", 5 „Turbo-Cache täuscht",
  6 „Zahlen nachrechnen", 8 „zweiter Reviewdurchgang"),
- `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md`,
  `docs/project/handovers/LATEST.md`,
- `docs/project/OPEN_QUESTIONS.md` – bestehende IDs O-D07-*, O-WP012-*, O-WP013-01,
  O-WP014-01..11, O-WP016-01..08 (**O-WP016-03/-04 sind der direkte Vorlauf dieses WP**);
  neue Fragen als `O-WP017-*` anschließen,
- `docs/project/risks/` – **FINDING-0005** (kein Linter im Stack), FINDING-0004 (DB-RLS),
- `docs/decisions/` – DR-0003 (minimales Design), DR-0004 (Session- vs. Routen-Mandant),
- `.claude/rules/demo-data.md`, `.claude/rules/testing.md`, `.claude/rules/frontend.md`,
  `.claude/rules/security.md`, `.claude/rules/docs.md`, `.claude/rules/architecture.md`.

## Nicht im Context Pack

- **Decision Card als Funktion** (Dok. 10 §9.1 als Bauauftrag), **Freigabe-/Approval-Workflow**,
  **Optionen/Baseline/Wirkung/Ressourcen/Frist/Outcome Check** – kein Träger im Objektvertrag.
- **Morning Mission und ihre Bausteine** (Dok. 10 §5, §13, §16, §17, §18, §19) – blockiert durch
  O-WP017-01/O-WP016-04; Queue: WP-008.
- **Executive Decision Center / Customer Decision Center / Portfolio Mission Control**
  (Dok. 10 §6–§8, Dok. 06 §10/§11) und jede Executive-Verdichtung.
- **Bewertungs-, Reifegrad-, Threat- und Simulationslogik** (Dok. 09, Dok. 10 §14/§15) sowie
  **KPI-/Trend-/Frühwarnlogik** (Dok. 10 §10/§11).
- **Preis-, Paket- und Kostenlogik** (Dok. 14 §9 ff., Dok. 10 §8.2 „Kostenband").
- **Zusammenarbeit** (Dok. 11: Aufgaben, Kommentare, Freigaben), **Reporting/
  Presentation-as-Code** (Dok. 12), **Integrationen/Workflow** (Dok. 17),
  **KI-Funktionen/Guardrails** (Dok. 20A).
- **Wiederaufnahme, Benachrichtigungen, globale Suche, gespeicherte Sichten**
  (Dok. 06 §16, Dok. 07 §16).
- **DB-Anbindung ans UI** (`@isms/db`, blockiert durch FINDING-0004 und O-WP014-09),
  **echte Auth/Rechte** (Dok. 19) – eigene spätere Work Packages.
- **Contract-Erweiterungen jeder Art** (neues Feld, neuer Objekttyp, neuer Beziehungstyp, neue
  Lifecycle-Werteliste) – Concept Author + Human Gate, nicht dieses WP.
