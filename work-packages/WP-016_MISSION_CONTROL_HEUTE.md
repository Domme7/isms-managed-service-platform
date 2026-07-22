# WP-016 – Mission Control „Heute" (read-only, ohne Morning Mission)

## Identität
- **Phase:** 1 (Demo Foundation; erster echter Inhalt für den Standard-Startpunkt)
- **Priorität:** P1 (nächster Baustein nach WP-014; `/heute` ist heute der letzte Platzhalter auf
  dem Kernweg Login → Startpunkt → Zwilling/ISMS/Services)
- **Status:** Draft (Aktivierung/Integration durch Orchestrator)
- **Risk Class:** Low (read-only, synthetisch, keine DB/Auth/Kosten)
- **Builder:** Frontend-Engineer (Slice 1 + Slice 2)
- **Reviewer:** Code-Reviewer + Product-User-Lead (read-only); bei Wording-Zweifeln zusätzlich
  Concept-Consistency-Reviewer
- **Human Gates:** keiner (read-only, ausschließlich synthetische Daten)
- **Abhängigkeiten:** WP-011 (Session-Simulation, `lib/shell/roles.ts`, `SessionProvider`),
  WP-012/WP-013 (Orte „Services"/„ISMS" als Einstiegsziele), WP-014 (`lib/twin/routes.ts`
  `objectDetailHref`, `lib/twin/object-detail.ts`, Wortlaut „Lebenszyklus-Stand"). Fehlt einer
  dieser Bausteine, entfällt genau der zugehörige Einstieg – ohne Scope-Ersatz.

## Ziel
Der Ort **„Heute"** (Dok. 06 §4/06-D01, Standard-Startpunkt 06-D02) hört auf, ein Platzhalter zu
sein. Er beantwortet seine Leitfrage aus Dok. 06 §7 S01 – *„Was hat sich seit meinem letzten Besuch
verändert und was verdient Aufmerksamkeit?"* – so weit, **wie der Demo-Datenbestand es belegt**,
und sagt für den nicht belegten Teil ehrlich, dass und warum er fehlt.

Gebaut wird eine read-only Mission-Control-Seite **ohne jede Berechnung**, gespeist ausschließlich
aus `@isms/demo-seed` für den **aktiven Mandanten** der Session-Simulation, mit vier Abschnitten:

1. **Wo stehe ich?** Aktive Rolle (R-ID, Produktrolle, Sphäre, Kernverantwortung aus
   `lib/shell/roles.ts` / Dok. 03 §3) und aktiver Mandant, plus was dieser Mandant im
   Datenbestand überhaupt trägt (Anzahl Objekte und Beziehungen, aus dem Seed abgeleitet).
   Mandanten ohne Graph (Finovia, MediCore – bewusst leer) erhalten einen ehrlichen Empty-State.
2. **Was ist im Datenbestand erfasst worden?** Die **belegten Erfassungswellen** aus
   `record_time.recorded_at`: der ISMS-Kerngraph ist am **15.01.2026** erfasst, die
   Managed-Service-Schicht am **16.02.2026** (`packages/demo-seed/src/nordwerk-graph.ts`
   `RECORDED_AT`, `src/managed-services.ts` `SERVICE_RECORDED_AT`). Das ist ein **Erfassungs**-
   signal (Dok. 07 §11 Systemachse) und ausdrücklich **kein Veränderungsfeed und keine Historie** –
   dieser Unterschied wird im Produkt benannt, nicht kaschiert.
3. **Was weiß ich über die Datenlage?** Ausschließlich aus dem Graphen **ableitbare, nicht
   bewertete** Beobachtungen mit Zählung und Ermittlungsregel: Objekte ohne Owner,
   Scope-Kennungen ohne eigenes Objekt (bekannte Lücke **O-WP014-03**), Kanten ohne erfassten
   Vertrauensgrad, laut Dok. 07 §9 R15 nachweisfähige Objekte ohne eingehende `evidences`-Kante.
   **Zählungen ja – Bewertung, Score, Ampel, Reifegrad, Priorisierung nein.**
4. **Wo steige ich ein?** Belegte Einstiegspunkte in die vorhandenen Orte (Kunden/Zwilling, ISMS,
   Services) und in konkrete Objekt-360-Seiten des **aktiven** Mandanten – ausschließlich über
   `objectDetailHref` aus `apps/web/lib/twin/routes.ts`, niemals hartkodiert, niemals ein fremder
   Mandant.

**Rollenbezug:** Die zwölf Rollen R01–R12 rahmen dieselbe Seite unterschiedlich (Weltname +
Leitfrage der Erlebniswelt, Dok. 06 §5; Betonung/Reihenfolge der Abschnitte aus den dort
dokumentierten Feldern „Erlebnis"/„Bewusst vermeiden"), arbeiten aber auf **demselben Datenmodell**
(Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02). Rollen sind Demo-Perspektive, **keine Autorisierung**
(Dok. 19 folgt später); keine Rolle sieht mehr oder weniger Daten.

## Warum die Morning Mission hier fehlt

Dok. 06 §8 und Dok. 10 §5 beschreiben in Mission Control die **Morning Mission**. Sie wird in
diesem Work Package **nicht gebaut** – und das ist keine Bequemlichkeit, sondern die einzige mit
den Projektregeln vereinbare Entscheidung:

**a) Die geforderten fünf Ebenen sind im Datenbestand nicht belegt.** Dok. 10 §5.1 verlangt
(1) einen Missions-Ergebnissatz, (2) „Warum heute" (Frist, Eskalation, Zielabweichung, neue
Bedrohung, blockierter Service, Managemententscheidung), (3) erwarteten Impact, (4) eine empfohlene
Reihenfolge unter Berücksichtigung realer Kapazität/Reise/Skills und (5) „Das solltest du wissen".
Dok. 06 §8 wiederholt Mission, Warum-Kontext, Impact, Reihenfolge und reale Kapazität.
Der Demo-Seed (`packages/demo-seed`, Version 1.1.0, 40 Objekte / 54 Beziehungen) trägt davon
**nichts**:

- **keine Aufgaben-, Task- oder Decision-Record-Objekte.** Der Contract kennt die Objekttypen
  `Task` (F08) und `Decision Record` (F09) – der Seed **materialisiert keinen einzigen** davon
  (`packages/contracts/src/vocabularies.ts` vs. `packages/demo-seed/src/*`).
- **keine Fristen, keine Kapazitäten, kein Aufwand, keine Priorität.** Der Objektvertrag
  (`packages/contracts/src/object.ts`, Dok. 07 §7) hat **kein** Feld für Fälligkeit, Aufwand,
  Kapazität oder Priorität; es gibt nur `valid_time`/`record_time`.
- **keine Ereignisse.** Es existiert kein Ereignis-/Änderungsobjekt und kein Feed.
- **keine Versionshistorie** – in WP-014 an den Daten nachgewiesen: alle Objekte tragen
  `version: 1`, kein `record_time.replaced_at`, keine `supersedes`-Kante (R24).

Ohne Aufgaben, Fristen, Kapazität und Ereignisse ist jede „Mission heute", jedes „Warum heute" und
jede „empfohlene Reihenfolge" **erfunden**. Das verletzt die harte Projektregel „aus dem Konzept
ableiten, nie erfinden" (`CLAUDE.md`, `CONTINUATION_BRIEFING.md` §4) und den Grundsatz
„Ehrlichkeit vor Wirkung".

**b) Die dafür nötige Logik ist ausdrücklich späteren Work Packages vorbehalten.** Priorisierung
(Dok. 10 §18 Priorisierungs-Engine, ENTSCHEIDUNG 10-08), Impact/Simulation (§14, §15), KPI- und
Trendlogik (§10, §11) sowie Reifegrad-/Risiko-Intelligence (Dok. 09) sind eigene Bausteine mit
eigenen Akzeptanzkriterien; die Queue führt sie als **WP-008 (Morning Mission – erster
Decision-Center-Pfad, Phase 4)**. Ein vorgezogener Teilbau hier würde ein zweites, konkurrierendes
Priorisierungsmodell erzeugen.

**c) Auch „seit meinem letzten Besuch" ist nicht belegbar.** Die Session-Simulation (WP-011,
`lib/shell/session.ts`) speichert ausschließlich `roleId` und `tenantId` – keinen Besuchszeitpunkt,
keinen bestätigten Zustand, keinen Entwurf. Und selbst mit einem gespeicherten Zeitstempel gäbe es
nichts zu vergleichen, weil der Seed statische, feste `record_time`-Werte hat. Der universelle
Wiederaufnahmepunkt (Dok. 06 §16, 06-D09) wird deshalb ebenfalls **nicht** gebaut.

**Konsequenz für das Produkt:** Die Seite sagt an genau einer Stelle sichtbar, was hier **noch
nicht** steht (Morning Mission, Veränderungsfeed, Wiederaufnahme) und **warum** (fehlende
Aufgaben-, Frist-, Kapazitäts- und Ereignisdaten) – als benannte Datenlücke nach Dok. 06 §17
(*Partial data*), nicht als Marketingversprechen und nicht als leerer Platzhalter.

## Nicht-Ziele
- **keine Morning Mission, kein Missionszustand, kein „Warum heute", kein Impact, keine empfohlene
  Reihenfolge, keine Kapazitäts-/Reiselogik** (Dok. 10 §5, §16 – Begründung oben),
- **kein Veränderungsfeed, keine Timeline, kein Delta, kein Trend, kein „neu seit …"** – der Seed
  hat weder Ereignisse noch Versionshistorie (WP-014-Befund); es wird keine synthetische
  Veränderung erzeugt,
- **kein Scoring, keine Ampel, kein Reifegrad, keine Kritikalität, keine Priorisierung, keine
  Sortierung nach Schwere, keine Frist, keine Empfehlung, kein Serviceangebot** (Dok. 09, Dok. 10
  §14/§15/§18 sind spätere WPs; Dok. 13 MS15 „keine versteckte Verkaufslogik"),
- **keine Executive-Verdichtung / kein Decision Center** (Dok. 06 §10, Dok. 10 §6–§8) – der Ort
  „Entscheidungen" bleibt Platzhalter,
- **keine Wiederaufnahme / kein „letzter Besuch" / keine Benachrichtigungen** (Dok. 06 §16),
- keine Schreibfunktion, keine Aufgaben/Kommentare/Freigaben (Dok. 06 §13, Dok. 11 – später),
- keine mandantenübergreifende Portfolio-Sicht auf `/heute` (die Portfolio-Aggregation lebt in der
  Services-Ansicht, WP-012); `/heute` zeigt **ausschließlich den aktiven Mandanten**,
- keine DB-Anbindung, keine echte Auth/Authz, **kein Rollen-Gating** (Rollen sind Perspektive,
  keine Rechte – Dok. 19 folgt),
- **keine Seed- oder Contract-Änderung**: fehlt eine fachlich nötige Aussage → OFFENE FRAGE
  (`docs/project/OPEN_QUESTIONS.md`, IDs `O-WP016-*`) + ehrlicher Leerzustand, nicht erfinden.

## Scope

### Slice 1 – React-freie View-Helfer + Rollenrahmung + Unit-Tests (`apps/web/lib/heute/`)
Muster: `lib/twin/data.ts`, `lib/isms/data.ts`, `lib/services/data.ts`, `lib/twin/object-detail.ts`
(deterministisch, ohne React/Next, testbar). **Vorhandene Helfer wiederverwenden statt duplizieren**:
`getTenant`, `getObjectsForTenant`, `getRelationshipsForTenant`, `groupObjectsByFamily`,
`familyForType`, `objectTypeDisplay` (`lib/twin/data.ts`), `EVIDENCE_TARGET_TYPES`
(`lib/twin/object-detail.ts`), `objectDetailHref` + `formatIsoDateDe` (`lib/twin/routes.ts`),
`hasManagedServices` / `buildIsmsCoreView` (`lib/isms/data.ts`), `worldForRole` +
`EXPERIENCE_WORLDS` (`lib/shell/roles.ts`).

**`lib/heute/data.ts`** – ein `MissionControlModel` für **einen** `tenant_id`:
- `tenantStanding`: Mandant + `objectCount` / `relationshipCount`, strikt aus dem einen Mandanten
  (Nordwerk 31/43, Consulting Operator 9/11, Finovia/MediCore 0/0 – aus dem Seed abgeleitet,
  **nie** hartkodiert).
- `recordingWaves`: Gruppierung von Objekten **und** Kanten nach `record_time.recorded_at`
  (Kalendertag über `formatIsoDateDe`), je Welle Datum + Anzahl Objekte + Anzahl Kanten, stabil
  sortiert. Nordwerk ergibt zwei Wellen, der Consulting Operator genau eine – **abgeleitet, nicht
  angenommen**.
- `historyState`: aus den Daten abgeleitete Aussage zur fehlenden Versionshistorie (max. `version`,
  Vorhandensein von `record_time.replaced_at`, Vorhandensein von `supersedes`-Kanten) – gleiches
  Muster wie die Historien-Ableitung in `lib/twin/object-detail.ts`, **kein konstanter Text**.
- `observations`: vier gezählte, unbewertete Beobachtungen, je mit `count`, `total` (Grundgesamtheit)
  und `method` (Ermittlungsregel im Klartext):
  (a) Objekte mit leerem `owner_ids`,
  (b) verschiedene `scope_ids`-Kennungen ohne gleichnamiges Seed-Objekt (O-WP014-03),
  (c) Kanten ohne `confidence`,
  (d) Objekte der Typen aus `EVIDENCE_TARGET_TYPES` ohne eingehende `evidences`-Kante.
  Eine Zählung von 0 wird ausgewiesen, nicht unterdrückt.
- `entryPoints`: die drei belegten Orte (`/twin/[tenantId]`, `/isms`, `/services`) mit
  Bestandsangabe des aktiven Mandanten, plus je Objektfamilie (F01–F09, kanonische Reihenfolge;
  innerhalb der Familie Seed-Reihenfolge) **ein** Objekt-Einstieg über `objectDetailHref`.
  Ausdrücklich **keine** Priorisierung – die Regel steht als Text an der Liste, die vollständige
  Objektliste bleibt der Zwilling.

**Reine Funktionen zuerst:** Wellen-, Historien- und Beobachtungsableitung arbeiten über
`(objects, relationships)` als Parameter; nur eine dünne `buildMissionControl(tenantId)` holt die
Daten aus `DEMO_SEED`. Dadurch lassen sich die Aussagen mit **synthetischen Fixtures** gegenprüfen
(Negativbeweis: eine Fixture mit `version: 2` / `replaced_at` / `supersedes` liefert eine **andere**
Historienaussage – die Aussage ist also abgeleitet und nicht hartkodiert).

**`lib/heute/framing.ts`** – Rollenrahmung ohne Erfindung: je Erlebniswelt (Dok. 06 §5) Weltname,
Leitfrage (beides bereits in `lib/shell/roles.ts`), das dort dokumentierte **„Erlebnis"** und
**„Bewusst vermeiden"** als Quellzitat im Code sowie die daraus abgeleitete Reihenfolge/Betonung der
vier Abschnitte. Die Ableitung ist eine **reversible Anzeigeentscheidung** und im Code mit
Quellenzeile belegt; es entstehen **keine** neuen Rollenrechte und keine rollenabhängigen Daten.

**Tests mit der Funktion** (Vitest, `lib/heute/__tests__/`): Wellen-Ableitung (Nordwerk zwei,
Consulting Operator eine, leerer Mandant keine), Historienaussage inkl. Fixture-Negativbeweis, alle
vier Beobachtungen gegen den echten Seed und gegen Fixtures, Einstiegspunkte (Familienreihenfolge,
korrekte `tenant_id` in jedem Href), Rollenrahmung für **alle zwölf** Rollen, sowie der
**Tenant-Negativbeweis**: Objekte/Kanten fremder Mandanten beeinflussen kein Ergebnis; ein
unbekannter `tenant_id` liefert ein leeres, aber wohldefiniertes Modell.

### Slice 2 – Seite, Zustände, Verlinkung, Reviews, Browser-QA, Abschluss (`apps/web/components/shell/`)
- **`HeuteView.tsx`** behält den Sitzungsrahmen (Muster `IsmsView`/`ServicesView`): nicht hydriert →
  Ladehinweis; nicht angemeldet → Hinweis + Link auf `/login`; sonst Inhalt für den aktiven
  Mandanten. Der Inhalt zieht in eine eigene Komponente (`MissionControlContent.tsx`, Muster
  `IsmsContent.tsx`), damit die Präsentation ohne Session-Mock testbar bleibt.
- **Darstellung:** Question Header mit der Leitfrage aus Dok. 06 §7 S01 (Quelle: `places.ts`,
  `question`), Kontextzeile (Rolle, Mandant, Datenstand) nach Dok. 06 §6/06-D04, vier `<section>`
  mit sauberer Heading-Hierarchie (h1 Ort, h2 Abschnitt, h3 Block), bestehendes CSS-Vokabular
  (`tw-card`, `tw-meta`, `tw-empty`, `tw-question`, `tw-lead`, `tw-muted`, `tw-cta`)
  weiterverwenden – **kein neues Designsystem** (DR-0003).
- **Ehrlichkeitsblock:** ein sichtbarer Abschnitt „Was hier bewusst nicht steht" mit Morning
  Mission, Veränderungsfeed und Wiederaufnahme samt **Begründung aus der Datenlage** (keine
  Aufgaben-/Frist-/Kapazitäts-/Ereignisdaten, keine Versionshistorie) – Formulierung als
  Datenlücke (Dok. 06 §17 *Partial data*), nicht als Roadmap-Versprechen.
- **Wortlaut verbindlich (WP-014/WP-013):** Falls Lebenszyklus-Stände angezeigt werden, heißen sie
  „Lebenszyklus-Stand" (Objekt) bzw. „Status der Beziehung" (Kante), und der seitenweite
  Rahmungssatz wird **wortgleich** aus `components/isms/IsmsContent.tsx` /
  `components/twin/ObjectDetailView.tsx` übernommen (Dok. 08 08-D07: Lebenszyklus ≠ Prüfergebnis).
- **`lib/shell/places.ts`:** der Ort `heute` verliert `plannedScreen` und erhält `live: true`
  (`ShellNav` markiert sonst weiterhin einen Platzhalter). **Ripple mitziehen** (Briefing §7.4):
  abhängige Shell-Tests im selben Pass anpassen.
- **Bundle-Grenze beachten (O-WP014-09):** `/heute` ist session-gebunden und damit client-gerendert
  wie `/isms` und `/services` – dieselbe dokumentierte Demo-Entscheidung, **nicht verschärfen**.
  Für Routen/Datumsformat ausschließlich das seed-freie `lib/twin/routes.ts` importieren, nie
  `lib/twin/object-detail.ts`.
- **Render-Tests** (`components/shell/__tests__/`): vier Abschnitte belegt; Wellen mit Datum und
  Anzahl; Beobachtungen mit Zählung + Methode; Einstiegs-Links tragen die `tenant_id` des aktiven
  Mandanten; Empty-States für Finovia/MediCore; identische Datenmenge über alle zwölf Rollen;
  Negativbeweis „kein Name und keine ID eines fremden Mandanten im DOM".
- Danach: **zwei unabhängige Reviews** (Code-Reviewer + Product-User-Lead; bei Wording-Zweifeln
  Concept-Consistency gegen Dok. 06 §7 S01/§8 und Dok. 10 §5), Browser-QA (Nordwerk, Consulting
  Operator, ein leerer Mandant, ein Rollenwechsel, responsive Stichprobe, A11y-Stichprobe),
  Findings gebündelt in **einem** Pass fixen, Builder ≠ Reviewer, Verified Checkpoint +
  Statusabschluss (`CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`).

## Acceptance Criteria
1. `/heute` ist kein Platzhalter mehr: die Seite zeigt die Leitfrage aus Dok. 06 §7 S01 und vier
   klar benannte Abschnitte („Wo stehe ich?", „Was ist erfasst worden?", „Was weiß ich über die
   Datenlage?", „Wo steige ich ein?"); **jeder** sichtbare Wert ist aus `@isms/demo-seed` bzw.
   `lib/shell/roles.ts` abgeleitet – nichts hartkodiert, nichts erfunden. `NAV_PLACES.heute` ist
   `live`, und die abhängigen Shell-Tests sind angepasst.
2. **Wo stehe ich?** nennt die aktive Rolle mit R-ID, Produktrolle, Sphäre und Kernverantwortung
   (Dok. 03 §3 über `lib/shell/roles.ts`), den aktiven Mandanten mit Anzeigename und Branche sowie
   die **aus dem Seed abgeleitete** Anzahl Objekte und Beziehungen dieses Mandanten (per Test:
   Nordwerk 31/43, Consulting Operator 9/11).
3. **Empty-State bei leerem Mandanten:** Für Finovia und MediCore erscheint statt Zahlen ein
   ehrlicher Empty-State nach Dok. 06 §17 (Nutzen + nächster Schritt, z. B. Mandantenwechsel in der
   Anmelde-Simulation). Es erscheinen **keine** Zahlen, Namen oder IDs anderer Mandanten.
4. **Was ist erfasst worden?** listet die Erfassungswellen des aktiven Mandanten, je mit deutschem
   Datum (`formatIsoDateDe`), Anzahl der in dieser Welle erfassten Objekte und Kanten und der
   fachlichen Zuordnung. Die Wellen sind aus `record_time.recorded_at` **abgeleitet**: Nordwerk
   ergibt genau zwei (15.01.2026 ISMS-Kerngraph, 16.02.2026 Managed-Service-Schicht), der
   Consulting Operator genau eine (16.02.2026) – per Test belegt.
5. **Abgrenzung im Produkt sichtbar:** Der Abschnitt erklärt in Klartext, dass ein
   Erfassungszeitpunkt (Systemachse, Dok. 07 §11) **keine Änderung, kein Veränderungsfeed und keine
   Historie** ist, und begründet dies mit der Datenlage. Die Historienaussage ist **aus den Daten
   abgeleitet** (höchste `version`, kein `replaced_at`, keine `supersedes`-Kante) und **nicht
   konstant** – belegt durch einen Fixture-Test, in dem eine abweichende Datenlage eine abweichende
   Aussage erzeugt.
6. **Was weiß ich über die Datenlage?** zeigt genau die vier definierten Beobachtungen, je mit
   Zählung, Grundgesamtheit und Ermittlungsregel im Klartext: Objekte ohne Owner; Scope-Kennungen
   ohne eigenes Objekt (mit Verweis auf die bekannte Lücke O-WP014-03); Kanten ohne erfassten
   Vertrauensgrad; nach Dok. 07 §9 R15 nachweisfähige Objekte ohne eingehende `evidences`-Kante.
   Eine Zählung von 0 wird sichtbar ausgewiesen.
7. **Keine Bewertung:** In der gesamten Ansicht erscheinen **kein** Score, Reifegrad, Ampelwert,
   Trend, Prozentwert, Schwellenwert, Prioritätsrang, Frist, Empfehlung und kein Serviceangebot;
   Beobachtungen sind nicht nach „Schwere" sortiert und tragen keine Wertung (per Test über den
   gerenderten Text belegt).
8. **Wo steige ich ein?** enthält die drei belegten Orte (Zwilling des aktiven Mandanten, ISMS,
   Services), jeweils mit dem belegten Bestand des aktiven Mandanten annotiert (leere Orte werden
   **benannt, nicht versteckt** – die acht Orte bleiben stabil, 06-D01), sowie je belegter
   Objektfamilie **einen** Objekt-360-Einstieg in kanonischer Familienreihenfolge. Die Auswahlregel
   steht sichtbar an der Liste und ist ausdrücklich keine Priorisierung.
9. **Links korrekt und mandantentreu:** Jeder Objekt-Link wird über `objectDetailHref` aus
   `lib/twin/routes.ts` gebildet (nie hartkodiert) und trägt **immer** die `tenant_id` des aktiven
   Mandanten; per Test belegt, inklusive Negativbeweis, dass keine fremde `tenant_id` und kein
   fremder Objektname im DOM erscheint.
10. **Rollenrahmung ohne Datenunterschied:** Alle zwölf Rollen R01–R12 lösen auf genau eine
    Erlebniswelt auf; die Seite zeigt Weltname und Leitfrage (Dok. 06 §5). Reihenfolge/Betonung der
    Abschnitte ist aus den in Dok. 06 §5 dokumentierten Feldern „Erlebnis"/„Bewusst vermeiden"
    abgeleitet und im Code mit Quelle belegt. **Die angezeigten Daten sind für alle zwölf Rollen
    identisch** (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02): ein Test vergleicht über alle Rollen
    die Menge der gerenderten Objekt-IDs und Zählwerte und weist Gleichheit nach. Es gibt kein
    Rollen-Gating.
11. **Ehrlichkeitsblock:** Die Seite benennt sichtbar, dass Morning Mission, Veränderungsfeed und
    Wiederaufnahme hier **nicht** enthalten sind, und nennt die Ursache aus der Datenlage (keine
    Aufgaben-/Decision-Record-Objekte, keine Fristen/Kapazitäten/Aufwände im Objektvertrag, keine
    Ereignisse, keine Versionshistorie). Formuliert als Datenlücke, ohne Termin- oder
    Funktionsversprechen.
12. **Zustände, A11y, Responsive:** Loading (vor Hydration), „nicht angemeldet" mit Link auf
    `/login`, Empty je Abschnitt mit Nutzen + nächstem Schritt, Partial data sichtbar (Dok. 06 §17);
    Heading-Hierarchie h1>h2>h3, Status nie nur über Farbe (06-D11), Tastaturbedienbarkeit und
    sichtbarer Fokus, responsive Kernweg – als Teil von Done geprüft und dokumentiert.
13. **Tenant-Isolation:** Alle Zahlen, Beobachtungen, Wellen und Links stammen ausschließlich aus
    dem aktiven Mandanten; Negativbeweis im Helfer-Test (fremde Objekte/Kanten verändern kein
    Ergebnis) **und** im Render-Test (kein fremder Name/keine fremde ID im DOM).
14. **Wortlaut:** Werden Lebenszyklus-Stände angezeigt, heißen sie „Lebenszyklus-Stand" (Objekt)
    bzw. „Status der Beziehung" (Kante), mit dem wortgleich übernommenen Rahmungssatz aus
    `IsmsContent`/`ObjectDetailView` (Dok. 08 08-D07). Werden keine angezeigt, entfällt der Satz –
    ein „Prüfergebnis" wird in keinem Fall behauptet.
15. **Tests und Verifikation:** Helfer- und Render-Tests grün; Monorepo grün (Lint, Typecheck,
    Test, Build – frisch, ohne Turbo-Cache); Browser-QA dokumentiert (Nordwerk, Consulting Operator,
    ein leerer Mandant, ein Rollenwechsel, responsive Stichprobe).
16. **Reviews und Lücken:** Zwei unabhängige Reviews dokumentiert (Builder ≠ Reviewer); jede beim
    Bauen gefundene fachliche Lücke steht als `O-WP016-*` in `docs/project/OPEN_QUESTIONS.md` und
    als Kommentar am Code – geraten wird nichts.

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)
Beim Prüfen von Seed und Code für dieses WP sichtbar geworden; keine davon darf im Code still
entschieden werden.

| ID (Vorschlag) | Frage | Art | Umgang in WP-016 | Owner / Gate |
|---|---|---|---|---|
| O-WP016-01 | Dok. 06 §7 S01/§8 definiert **Inhalte** von Mission Control, aber **keine rollenabhängige Reihenfolge**; rollenbezogen dokumentiert sind nur „Erlebnis"/„Bewusst vermeiden" je **Welt** (§5), nicht je Rolle | Lücke | Betonung/Reihenfolge wird aus §5 abgeleitet und als reversible Anzeigeentscheidung mit Quelle im Code belegt; keine rollenspezifischen Daten | Product/UX |
| O-WP016-02 | **„Seit meinem letzten Besuch"** (Dok. 06 §7 S01, §16, 06-D09): es existiert kein Besuchszeitpunkt, kein bestätigter Zustand, kein Entwurf und kein Ereignis | Lücke (Daten + Produkt) | nicht gebaut; im Produkt als Datenlücke benannt | Product + Concept Author (gehört Wiederaufnahme zu WP-008 oder in ein eigenes WP?) |
| O-WP016-03 | **Aufgaben/Entscheidungen fehlen im Seed:** die Objekttypen `Task` (F08) und `Decision Record` (F09) existieren im Contract, sind aber in keinem Mandanten materialisiert; damit fehlt jede Grundlage für Morning Mission und Decision Center | Datenlücke | keine Erfindung; Begründung im Produkt sichtbar | Concept/Seed-Owner (Seed-Erweiterung als eigenes WP vor WP-008?) |
| O-WP016-04 | Dok. 10 §5.1/§18 verlangen **Frist, Aufwand, Kapazität und Priorität**; der Objektvertrag (Dok. 07 §7) kennt kein solches Feld – offen, ob dies Envelope-Felder, eigene Objekttypen oder Modul-Daten außerhalb des Zwillings werden | **Konzeptlücke** | nichts erfunden, nichts abgeleitet | Concept Author (Ergänzung zu CCP-002/003?) |
| O-WP016-05 | Gehört zu jeder Datenlage-Beobachtung ein **Drilldown** auf die betroffenen Objekte (Dok. 06 §17 verlangt „Auswirkungen sichtbar")? Eine gekürzte Liste wäre eine implizite Priorisierung, eine vollständige Liste kann sehr lang werden | Produktfrage | WP-016 zeigt nur Zählung + Ermittlungsregel und verlinkt in den Zwilling | Product/UX |
| O-WP016-06 | **Faktenkorrektur:** `CURRENT_STATE.md` spricht von „41 Objekte"; Seed-Manifest, README und Tests belegen **40 Objekte / 54 Beziehungen** (Nordwerk 31/43, Consulting Operator 9/11) | Dokumentationsfehler | WP-016 verwendet die belegten Zahlen und rechnet nichts hart | Program-Manager/Orchestrator (Statusdatei korrigieren) |

## Stop Conditions
- ein Abschnitt lässt sich mit dem vorhandenen Seed/Contract **nicht** belegen (→ OFFENE FRAGE +
  ehrlicher Leerzustand; **keine** Seed-Erweiterung und keine Erfindung in diesem WP),
- Druck, doch eine Mission, Priorisierung, Frist, Ampel, Empfehlung oder ein Delta zu zeigen
  (Scope-Drift Richtung Dok. 09/10 und WP-008),
- Bedarf, mandantenübergreifend zu zählen, zu vergleichen oder zu verlinken (verboten,
  Dok. 07 §17/P09),
- Bedarf, Rollen tatsächlich Daten zu entziehen oder freizuschalten (das wäre Authz – Dok. 19,
  eigenes WP mit Security Review),
- ein Konflikt mit parallelen Änderungen an Shell/`places.ts`/Session, der nicht sicher
  integrierbar ist,
- Verschärfung der bekannten Bundle-Lücke O-WP014-09 (z. B. neue seed-abhängige Client-Importe
  jenseits des bestehenden Musters).

## Done Evidence
- grüne Tests (Helfer + Render + Negativbeweise) und CI; frischer Lauf ohne Turbo-Cache,
- DOM-/Screenshot-QA für Nordwerk, Consulting Operator, leeren Mandanten, Rollenwechsel und
  responsive Stichprobe,
- Review-Notiz unter `docs/project/reviews/`, `O-WP016-*` in `OPEN_QUESTIONS.md`,
- aktualisierte `CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`,
- Micro-/Verified-Checkpoints, Commit + Push.
