# WP-017 – Entscheidungen im Zwilling (Seed-Erweiterung + Ort „Entscheidungen", read-only)

## Identität
- **Phase:** 1 (Demo Foundation; erster echter Inhalt für den fünften Ort des Kernwegs)
- **Priorität:** P1 (löst die in WP-016 benannte Datenlücke O-WP016-03 zur Hälfte auf und macht
  `/entscheidungen` vom Platzhalter zu einer belegten Ansicht)
- **Status:** Draft (Aktivierung/Integration durch Orchestrator)
- **Risk Class:** Low (read-only, synthetisch, keine DB/Auth/Kosten) – **aber** mit echtem
  Ripple: die Seed-Erweiterung macht bestehende Wächtertests absichtlich rot (siehe Slice 1).
- **Builder:** Slice 1 `data-graph-analytics` **oder** `backend-engineer` (`packages/demo-seed`,
  Ripple in `packages/db` und `apps/web`); Slice 2 `frontend-engineer` (`apps/web`).
  **Slice 1 muss vollständig grün und committet sein, bevor Slice 2 startet** – ein Builder darf
  nicht auf einem Seed testen, den ein anderer gerade ändert (Briefing §3).
- **Reviewer:** Code-Reviewer + Product-User-Lead (read-only); für den Ehrlichkeitsblock und die
  Konzepttreue der neuen Objekte zusätzlich Concept-Consistency-Reviewer. Builder ≠ Reviewer.
- **Human Gates:** **keiner.** `Decision Record` (F09) und die Beziehungstypen R23/R24/R15/R03
  stehen bereits im kanonischen Vertrag (`packages/contracts/src/vocabularies.ts:103` bzw.
  `RELATIONSHIP_TYPES` R03/R15/R23/R24). Es wird **kein** Contract-Feld, **kein** Objekttyp und
  **kein** Beziehungstyp ergänzt – die Erweiterung ist reine Materialisierung im Demo-Seed.
- **Abhängigkeiten:** WP-003 (`@isms/contracts`, `@isms/demo-seed`), WP-007 (`@isms/db`
  Count-Erwartungen), WP-011 (Session-Simulation, `lib/shell/places.ts`), WP-013/WP-014
  (Wortlaut „Lebenszyklus-Stand", `objectDetailHref`), WP-016 (`/heute`-Ehrlichkeitsblock und
  Historienaussage – beide müssen in diesem WP nachgezogen werden).

## Ziel

Der Ort **„Entscheidungen"** (`/entscheidungen`, Dok. 06 §4/06-D01) hört auf, ein Platzhalter zu
sein – und der Demo-Seed hört auf, entscheidungsfrei zu sein.

**Slice 1** materialisiert im Mandanten **Nordwerk** eine kleine Zahl kanonischer
`Decision Record`-Objekte (F09), die an den **bestehenden** Nordwerk-Graphen andocken:
über **R23 `decided_in`** vom Risiko bzw. vom Managed Service auf die Entscheidung, über
**R15 `evidences`** von einem vorhandenen Nachweis auf eine Entscheidung, über **R03 `owns`**
von der vorhandenen CISO-Rolle – und, ausdrücklich gewollt, über **R24 `supersedes`** als
**Paar aus abgelöster Vorgängerentscheidung und Nachfolgerin**.

**Slice 2** macht `/entscheidungen` read-only echt: ein **Entscheidungsregister** des aktiven
Mandanten, das je Entscheidung ausschließlich Belegtes zeigt – Entscheidungsfrage
(`display_name`), Kontext (`description`), Lebenszyklus-Stand, Owner, fachliche Gültigkeit
(erstmals mit **geschlossenem** Intervall), Erfassungszeitpunkt, die über R23 verknüpften
Bezugsobjekte, die über R15 verknüpften Nachweise und die **Ablösekette** über R24.

### Warum das R24-Paar der eigentliche Gewinn ist

Der Seed trägt bisher ausschließlich `version: 1`, kein `record_time.replaced_at` und **keine
einzige `supersedes`-Kante**. WP-014 und WP-016 mussten deshalb im Produkt „keine
Versionshistorie im Demo-Seed" ausgeben – **abgeleitet, nicht hartkodiert** – und haben dafür
**Wächtertests** gebaut, die absichtlich rot werden, sobald der Seed eine Historie bekommt
(`apps/web/lib/twin/__tests__/object-detail.test.ts:228`,
`apps/web/lib/heute/__tests__/data.test.ts:193`,
`apps/web/components/shell/__tests__/mission-control.test.tsx:731`).

**Diese Tests jetzt rot werden zu lassen ist der Beweis, dass die Ableitung echt war.** Sie
werden **nicht entschärft**, sondern auf die neue, korrekte Aussage umgestellt – und die
Fixture-Negativbeweise (andere Datenlage ⇒ andere Aussage) bleiben unverändert erhalten.
Damit zeigt das Produkt zum ersten Mal eine **belegte** Historie statt einer benannten Lücke.

Dok. 10 §9.2 trägt das fachlich: „Nach Freigabe wird die Karte zum unveränderbaren Decision
Record. Korrekturen erfolgen als neue Version oder Nachtrag." R24 lautet „Explizite Ablösung
**ohne historische Überschreibung**" (Dok. 07 §9) – genau das wird materialisiert.

## Warum hier keine Decision Card steht

Dok. 10 §9 beschreibt die **Decision Card** als „das kanonische, freigabefähige
Entscheidungsobjekt der Plattform" mit **14 Pflichtfeldern**: Entscheidungsfrage, Zielbezug,
Auslöser, Baseline, Optionen (inkl. Nichtstun), Wirkung, Ressourcen, Abhängigkeiten,
Confidence, Empfehlung, Owner **und** Approver, Frist, Outcome Check, Provenance.

**Dieses Work Package baut sie nicht – und darf sie nicht behaupten.** Begründung:

**a) Der Objektvertrag trägt die Mehrheit dieser Felder nicht.** Dok. 07 §7 (umgesetzt in
`packages/contracts/src/object.ts`) kennt: `object_id`, `tenant_id`, `object_type`,
`display_name`, `description`, `lifecycle_status`, `scope_ids`, `owner_ids`, `classification`,
`source_refs`, `valid_time`, `record_time`, `version`, `quality_state`, `tags_custom_fields`.
Daraus lässt sich – ehrlich und nur teilweise – abbilden:

| Pflichtfeld (Dok. 10 §9.1) | Träger im heutigen Modell | Einordnung |
|---|---|---|
| Entscheidungsfrage | `display_name` | **teilweise** – ein Name, kein typisiertes Frageobjekt |
| Zielbezug | R23-Kante auf Risiko/Service | **teilweise** – eine Kante, kein Zielprofilbezug |
| Auslöser | – | **fehlt** (siehe O-WP017-04) |
| Baseline | – | **fehlt** |
| Optionen (inkl. Nichtstun) | – | **fehlt** |
| Wirkung | – | **fehlt** |
| Ressourcen | – | **fehlt** (und Budget/Kosten sind im Seed verboten) |
| Abhängigkeiten | – | **fehlt** (kein typisierter Entscheidungs-Vorbedingungstyp) |
| Confidence | `confidence` **der Kante** | **teilweise** – Objekt-Confidence fehlt (O-WP014-02) |
| Empfehlung | – | **fehlt** (und wäre in diesem WP auch verboten) |
| Owner und Approver | `owner_ids` (`fachlich`/`technisch`), R03 | **teilweise** – kein Approver (O-WP017-05) |
| Frist | – | **fehlt** (O-WP016-04) |
| Outcome Check | – | **fehlt** |
| Provenance | `source_refs`, `assertion_kind`, `quality_state` | **teilweise** – keine Methoden-/Szenarioversion |

**Neun** Pflichtfelder haben **keinen Träger**, **fünf** sind **nur teilweise** belegt. Eine
Seite, die das „Decision Card" nennt, würde eine Vollständigkeit behaupten, die es nicht gibt.

> *Korrektur 2026-07-23:* Hier stand „sieben / sechs" — arithmetisch unmöglich (13 von 14) und mit
> „Alternativen" ein Feldname, den Dok. 10 nicht führt. Nachgerechnet gegen das PDF (Abschnitt
> „Decision Cards" / „Pflichtfelder") und gegen `DECISION_CARD_FIELDS`. Genau diese Zahl war der
> Anlass für Review-Finding F-04: die Projektdokumente beschönigten die Lücke, die dieses Work
> Package beweisen soll.

**b) Die Leitfrage des Ortes ist auf dieser Datenlage nicht beantwortbar.** `places.ts` führt für
`entscheidungen` die Leitfrage aus Dok. 06 §7 S03: *„Welche Geschäftsentscheidung ist **jetzt
erforderlich**?"* Das ist – wie „was verdient Aufmerksamkeit" in WP-016 – eine
**Dringlichkeits- und Priorisierungsfrage**. Ohne Frist, Aufwand, Kapazität und Priorität
(Dok. 07 §7 kennt keines dieser Felder, O-WP016-04) und ohne Priorisierungs-Engine
(Dok. 10 §18, ENTSCHEIDUNG 10-08 – eigenes späteres WP) ist jedes „jetzt erforderlich"
**erfunden**. Die Seite zeigt deshalb die Leitfrage des Ortes **und** benennt sichtbar, welche
engere Frage sie tatsächlich beantwortet: *Welche Entscheidungen sind im Datenbestand dieses
Mandanten erfasst, worauf beziehen sie sich, wie sind sie belegt und was hat sie abgelöst?*

**c) Executive- und Customer Decision Center sind eigene Bausteine.** Dok. 10 §6 (Customer
Decision Center), §7 (Portfolio Mission Control), §8 (Executive Decision Center mit
Investitionsbedarf, „Konsequenz des Nichtstuns", Simulation, Freigabe) und §14/§15 (Simulation,
Investitionswirkung) sind eigene Work Packages mit eigenen Akzeptanzkriterien. Ein vorgezogener
Teilbau hier erzeugte ein zweites, konkurrierendes Entscheidungsmodell.

**Konsequenz für das Produkt:** Die Seite trägt einen sichtbaren Abschnitt **„Was eine
Entscheidung hier noch nicht zeigt"**, der die fehlenden Pflichtfelder **benennt** und als
**Datenlücke** nach Dok. 06 §17 (*Partial data*) formuliert – ohne Roadmap, ohne Termin, ohne
„kommt bald", ohne Funktionsversprechen.

## Nicht-Ziele

- **keine Decision Card** im Sinne von Dok. 10 §9, **kein Freigabe-Workflow**, **keine
  Optionen/Baseline/Wirkung/Ressourcen/Frist/Outcome Check** – auch nicht „vorläufig" oder
  „als Beispiel" (Begründung oben),
- **kein Scoring, keine Ampel, kein Reifegrad, keine Kritikalität, keine Priorisierung, keine
  Sortierung nach Dringlichkeit oder Schwere, keine Empfehlung, kein Serviceangebot**
  (Dok. 09, Dok. 10 §14/§15/§18; Dok. 13 MS15 „keine versteckte Verkaufslogik"),
- **keine Preise, Beträge, Währungen, Kostenbänder oder Budgets.** Dok. 10 §8.2 nennt für
  Investitionsentscheidungen ein „Kostenband" – das wird hier **ausdrücklich nicht** umgesetzt;
  der Guardrail-Test gegen Währungs-/Preisangaben (`packages/demo-seed/src/seed.spec.ts:309`)
  bleibt unverändert grün,
- **keine `Task`-Objekte** (F08). Begründung: `Task` besitzt in Dok. 07 §9 **keine einzige**
  Beziehungszeile in R01–R25 – der Typ ist im Katalog (F08, Zeile 59), im Beziehungsmodell aber
  nirgends. Eine Aufgabe wäre ein **beziehungsloses Waisenobjekt**, nicht an Maßnahme, Control,
  Person oder Entscheidung anbindbar. Diese Lücke wird als **O-WP017-01 benannt, nicht umgangen**;
  insbesondere wird **kein** vorhandener Kantentyp zweckentfremdet. Damit bleibt die **Morning
  Mission (WP-008) weiterhin blockiert** – das ist ein bewusstes, dokumentiertes Ergebnis,
- **keine Contract-Änderung**: kein neues Feld, kein neuer Objekttyp, kein neuer Beziehungstyp,
  keine neue Lifecycle-Werteliste,
- **keine Executive-Verdichtung, kein Portfolio, keine mandantenübergreifende Sicht** – der Ort
  zeigt ausschließlich den **aktiven** Mandanten,
- **keine Entscheidungen für Finovia/MediCore** (bleiben bewusst leer) und **keine für den
  Consulting Operator** (siehe O-WP017-08) – die Empty-States sind Teil des Nachweises,
- keine DB-Anbindung, keine echte Auth/Authz, **kein Rollen-Gating**, keine Schreibfunktion,
  keine Kommentare/Freigaben (Dok. 11, Dok. 19 – spätere WPs),
- **kein neues Designsystem** (DR-0003): bestehendes CSS-Vokabular weiterverwenden.

## Scope

### Slice 1 – Entscheidungsschicht im Demo-Seed (`packages/demo-seed`) + Ripple

**Muster:** die Managed-Service-Erweiterung aus WP-012
(`packages/demo-seed/src/managed-services.ts` – eigene Datei, eigene Zeitkonstanten, typisierte
Fabriken, Kopfkommentar mit fachlicher Herleitung und `OFFENE FRAGE`-Block, Aggregation in
`src/seed.ts`, Mitpflege von `seed-manifest.json`, `README.md` und `src/seed.spec.ts`).

**Neue Datei `src/decisions.ts`** mit einer eigenen Erfassungswelle
(`DECISION_RECORDED_AT`, nach `SERVICE_RECORDED_AT`) und – anders als die beiden bestehenden
Schichten – **je Objekt/Kante setzbarer fachlicher Gültigkeit**, weil die abgelöste
Vorgängerentscheidung ein **geschlossenes** `valid_time`-Intervall braucht. Bitemporalität
bleibt gewahrt: `valid_time.from < record_time.recorded_at` für **jedes** Objekt und **jede**
Kante (bestehender Test `seed.spec.ts:232/239`).

**Inhalt (verbindliche Struktur, Wortlaut frei und synthetisch – storyline-konsistent zum
vorhandenen Ransomware-/Betriebsunterbrechungs-Strang):** drei `Decision Record`-Objekte im
Mandanten Nordwerk, stabile IDs im vorhandenen Schema (`nordwerk-decision-…`), Scope
`scope-nordwerk-isms-core` (bzw. zusätzlich der Service-Scope, wo es trägt):

| Rolle im Graphen | Lebenszyklus-Stand | Anbindung |
|---|---|---|
| **D1 – abgelöste Risikobehandlungs-Entscheidung** (Absicherung allein über Backup/Wiederherstellung), fachlich gültig **von … bis** | `Überholt` (Dok. 07 §8, siehe O-WP017-03) | R23 vom Risiko; R15 vom vorhandenen Nachweis; R03 von der CISO-Rolle |
| **D2 – Nachfolgerin** (Risikobehandlung erweitern: zusätzlich Härtung der ERP-Schnittstelle), fachlich gültig ab dem Ende von D1 | `genehmigt` (Dok. 05 §7, Entscheidungs-Lifecycle) | **R24 `supersedes`: D2 → D1**; R23 vom Risiko; R03 von der CISO-Rolle |
| **D3 – offene Entscheidung** zum Berichtsrhythmus des Reporting-Service (der Service steht bereits im Zustand `Review`) | `zur Freigabe` (Dok. 05 §7) | R23 vom Managed Service „Management- & Entscheidungsreporting"; R03 von der CISO-Rolle |

**Harte Regeln für den Seed:**
- **nur kanonische Objekttypen und nur kanonische Beziehungstypen** aus `@isms/contracts`;
  R24 in der dokumentierten Richtung **Nachfolger → Vorgänger** („Version/Policy/Decision ->
  Vorgänger", Dok. 07 §9), R23 in der Richtung **Risk/Service → Decision Record**,
  R15 in der Richtung **Evidence → Decision**,
- die R15-Quelle ist ein Objekt vom Typ **`Evidence`** (der vorhandene Restore-Test), damit die
  Kante der **Beispielspalte** von R15 folgt und **keine** zweite Abweichung nach Muster
  O-WP012-06 entsteht,
- `owner_ids` jeder Entscheidung verweist auf ein **existierendes** Seed-Objekt (die vorhandene
  CISO-Rolle) – der Owner-Ref-Test (`seed.spec.ts:175`) bleibt grün,
- **keine Preise, Beträge, Währungen, Kostenbänder, Service Credits, Tages-/Stundensätze**,
- **keine Fristen, Aufwände, Kapazitäten, Prioritäten, Optionen, Baselines oder Wirkungswerte**
  – auch nicht als Klartext in `description` (das wäre eine Decision Card durch die Hintertür).
  `description` beschreibt **Kontext und Gegenstand** der Entscheidung, nicht ihre Bewertung,
- ausschließlich synthetische Inhalte (`.claude/rules/demo-data.md`).

**Aggregation und Dokumentation mitziehen:** `src/seed.ts` (Schicht **hinter** der
Managed-Service-Schicht anhängen, damit die Reihenfolge innerhalb von F09 und damit die
Objekt-Einstiege auf `/heute` stabil bleiben), `src/index.ts` (Exporte),
`SEED_VERSION` → **1.2.0**, `seed-manifest.json` (Counts gesamt und je Mandant, `layers`,
`relationship_types_used` um `decided_in`/`supersedes` ergänzt, `storyline`,
`decision_chain`, `open_questions` um `O-WP017-*`), `README.md` (Kopfzeile, Mandantentabelle,
neuer Abschnitt „Entscheidungsschicht", Kantendiagramm, Determinismus-Absatz um die dritte
Erfassungswelle, Exportliste, Testliste).

**Zahlen nicht abschreiben (Briefing §7.6):** alle neuen Counts werden **am Seed nachgerechnet**
und danach in Manifest, README, `packages/db` und `apps/web` **identisch** geführt. Dieses
Work Package nennt bewusst keine Zielzahlen.

#### Ripple, der im SELBEN Pass mitgezogen werden muss (Briefing §7.4)

Die folgenden Stellen werden durch die Seed-Erweiterung rot. Sie werden **auf die neue,
korrekte Aussage umgestellt – nicht abgeschwächt, nicht gelöscht, nicht `skip`**:

**A. Count-Erwartungen**
1. `packages/demo-seed/src/seed.spec.ts:85/97` – Objekte/Kanten je Mandant (Nordwerk).
2. `packages/demo-seed/seed-manifest.json` – `counts`, `layers`, `relationship_types_used`
   (Manifest-Konsistenztests `seed.spec.ts:351/357/384` prüfen das).
3. `packages/db/src/seed-loader.spec.ts:17-24` (`EXPECTED`) und der Kopfkommentar :12-15.
4. `packages/db/src/tenant-isolation.spec.ts:13-18` (`NORDWERK_OBJECT_COUNT` /
   `NORDWERK_RELATIONSHIP_COUNT`).
5. `apps/web/lib/heute/__tests__/data.test.ts:518-519` (Nordwerk 31/43),
   `:457-462` (Bestand am Zwilling-Einstieg),
   `:300-303` (Beobachtungswerte 22/31, 32/43 und **`ohne_nachweisbezug` 1/2** – die
   nachweisfähigen Typen umfassen laut `EVIDENCE_TARGET_TYPES` auch `Decision Record`).
6. `apps/web/components/shell/__tests__/mission-control.test.tsx:160-172` (31/43),
   `:303-320` (die vier Zählwerte), `:362` („31 Objekte · 43 Beziehungen").

**B. Erfassungswellen (dritte Welle)**
7. `apps/web/lib/heute/__tests__/data.test.ts:82-109` und `:148` – Nordwerk hat künftig **drei**
   Wellen; die Summenprobe (`:109`) bleibt unverändert gültig.
8. `apps/web/components/shell/__tests__/mission-control.test.tsx:208` (`wellen` → 3).

**C. Historien-Wächter (der eigentliche Beweis)**
9. `apps/web/lib/twin/__tests__/object-detail.test.ts:228-245` – der Wächter „keine Historie"
   iteriert über **alle** Objekte. Er wird umgestellt auf: die Objekte **ohne** R24-Kante haben
   weiterhin `has_history === false`, das **Paar D1/D2** hat `has_history === true` mit
   korrekt getrennter `supersedes`/`superseded_by`-Richtung. Die Aussage bleibt damit
   *abgeleitet* – und ist erstmals in **beiden** Ausprägungen belegt.
10. `apps/web/lib/heute/__tests__/data.test.ts:193-209` – `deriveHistoryState` für Nordwerk
    liefert künftig `hasHistory === true`; die vier Fixture-Negativbeweise (`:211`, `:224`,
    `:243`, `:261`) bleiben **unverändert**.
11. `apps/web/components/shell/__tests__/mission-control.test.tsx:251-266` – die Erwartung
    `/keine „supersedes"-Beziehung/` wird zur Erwartung an die **belegte** Aussage.
12. `apps/web/components/shell/__tests__/mission-control.test.tsx:731-740` – der Datenbestands-
    Wächter („keine Task-/Decision-Record-Objekte, keine supersedes-Kante") wird **geteilt**:
    `Task` bleibt hart auf „nicht materialisiert" (das ist weiterhin wahr und der Beleg für
    O-WP017-01), für `Decision Record` und `supersedes` wird die neue Lage festgenagelt.

**D. Produkttext auf `/heute`, der sonst still falsch wird (Ehrlichkeit vor Bequemlichkeit)**
13. `apps/web/components/shell/MissionControlContent.tsx:591-596` behauptet: „Der Demo-Datenbestand
    enthält keine Objekte der Typen „Task" und „Decision Record"". Das ist nach Slice 1
    **falsch**. Der Satz wird auf `Task` verengt; die Begründung der fehlenden Morning Mission
    bleibt tragfähig (fehlende `Task`-Objekte **und** fehlende Frist-/Aufwands-/Kapazitäts-/
    Prioritätsfelder). Der zugehörige Render-Test `:718-723` wird mitgezogen.
14. `apps/web/components/shell/MissionControlContent.tsx:599-605` (Veränderungsfeed) bezieht die
    Historienaussage ein. Der Rahmensatz muss klarstellen: eine **Ablösung** ist belegt, ein
    **Ereignis-/Änderungsfeed** existiert weiterhin nicht – beides darf nicht verschmelzen.
15. **Bekannter Grammatikfehler, der erst jetzt sichtbar wird:**
    `apps/web/lib/heute/data.ts:248-251` erzeugt bei einer einzelnen Kante den Text
    „**1 „supersedes"-Beziehungen** sind erfasst" (Plural bei Eins). Der `hasHistory === true`-Zweig
    lief bisher nur gegen Fixtures und wird mit WP-017 **Produkttext**. Numerus über den
    vorhandenen `anzahl()`-Helfer korrigieren – gilt sinngemäß auch für die beiden anderen
    Belege in `:236-247`.

**E. Sonstiges**
16. `apps/web/lib/twin/data.ts:161-181` – `REL_TYPE_TO_LABEL_DE` hat kein deutsches Label für
    `decided_in`. Ergänzen (reine Präsentationsschicht, Dok. 06 D08 „Klartext vor Fachsprache");
    `supersedes` ist bereits gemappt („löst ab").
17. `apps/web/lib/twin/data.ts:82-90` – `OBJECT_TYPE_LABEL_DE` führt für `Decision Record`
    bewusst **keine** Glosse. Es wird **keine erfunden**; `objectTypeDisplay` fällt korrekt auf
    den kanonischen Namen zurück. Falls eine Glosse gewünscht ist, ist das eine Produktfrage,
    kein Bau-Detail.

### Slice 2 – Ort „Entscheidungen" (`apps/web`)

**Muster:** `components/isms/IsmsView.tsx` (Sitzungsrahmen: nicht hydriert → Ladehinweis; nicht
angemeldet → Hinweis + Link `/login`; sonst Inhalt) **getrennt von**
`components/isms/IsmsContent.tsx` (Präsentation, ohne Session-Mock testbar), React-freie Helfer
nach dem Vorbild von `lib/isms/data.ts` / `lib/heute/data.ts`, Aufbau und Ehrlichkeitsblock nach
`components/shell/MissionControlContent.tsx`.

**`apps/web/lib/entscheidungen/data.ts`** – ein `DecisionRegisterModel` für **einen**
`tenant_id`, reine Funktionen über `(objects, relationships)`, dünne Seed-Anbindung obenauf
(damit alles gegen synthetische Fixtures gegenprüfbar bleibt). Je Entscheidung:
- Identität: `object_id`, `display_name` (= Entscheidungsfrage), `description` (= Kontext),
  `lifecycle_status`, Objekttyp/Familie,
- Owner: `owner_ids`, gegen Objekte **desselben** Mandanten aufgelöst (Fail-loud: rohe ID),
  ergänzt um eingehende R03-Kanten,
- Zeit: `valid_time.from`/`.to` (geschlossenes Intervall sichtbar machen) und
  `record_time.recorded_at` als **getrennte** Achsen (Dok. 07 §11),
- **Bezugsobjekte über R23** (eingehende `decided_in`-Kanten): Nachbarobjekt, Typ,
  Lebenszyklus-Stand, Herkunft der Aussage, ggf. Vertrauensgrad und Status der Beziehung,
- **Nachweise über R15** (eingehende `evidences`-Kanten): Nachbarobjekt + Status der Beziehung,
- **Ablösekette über R24**: `supersedes` (ausgehend: löst ab) und `superseded_by` (eingehend:
  wurde abgelöst) **getrennt und richtungstreu**,
- Provenance: `source_refs` und `quality_state`-Dimensionen (gelesen, **nicht** verrechnet).

Reihenfolge = **Datenbestandsreihenfolge**; die Regel steht sichtbar an der Liste und ist
ausdrücklich **keine** Priorisierung. Vorhandene Helfer wiederverwenden statt duplizieren
(`getTenant`, `getObjectsForTenant`, `getRelationshipsForTenant`, `familyForType`,
`objectTypeDisplay`, `relationshipTypeId/Label`, `confidenceQualitative` aus `lib/twin/data.ts`;
`objectDetailHref` + `formatIsoDateDe` aus `lib/twin/routes.ts`).

**`apps/web/components/entscheidungen/EntscheidungenView.tsx` +
`EntscheidungenContent.tsx`** – Question Header mit der Leitfrage des Ortes aus `places.ts`,
darunter der **Rahmungssatz**, welche engere Frage diese Seite tatsächlich beantwortet;
Kontextzeile (Rolle, Mandant, Datenstand) nach Dok. 06 §6/06-D04; saubere Heading-Hierarchie
(h1 Ort > h2 Abschnitt > h3 Entscheidung > h4 Block); bestehendes CSS-Vokabular
(`tw-card`, `tw-meta`, `tw-empty`, `tw-question`, `tw-lead`, `tw-muted`, `tw-cta`, `sv-*`).

**Ehrlichkeitsblock „Was eine Entscheidung hier noch nicht zeigt"** – benennt die nach
Dok. 10 §9.1 fehlenden bzw. nur teilweise belegten Pflichtfelder (Tabelle oben) und die Grenze
der Leitfrage („jetzt erforderlich" ist ohne Frist und Priorität nicht beantwortbar), formuliert
als **Datenlücke** (Dok. 06 §17 *Partial data*) – **ohne** Roadmap-, Termin- oder
Funktionsversprechen.

**Wortlaut verbindlich (aus WP-013/WP-014/WP-016):** „**Lebenszyklus-Stand**" für Objektstatus,
„**Status der Beziehung**" für Kantenstatus, und der seitenweite Rahmungssatz zu
Lebenszyklus ≠ Prüfergebnis wird **wortgleich** aus `components/isms/IsmsContent.tsx:55-61`
übernommen (Dok. 08 08-D07).

**`lib/shell/places.ts`:** `entscheidungen` verliert `plannedScreen` und erhält `live: true`.
**Ripple im selben Pass:** `apps/web/lib/shell/__tests__/shell-logic.test.ts:56-65`
(`placeholders` 4 → 3, `live`-Liste ergänzen) und alles, was `PlaceholderPage` für diesen Ort
erwartet. `apps/web/app/(shell)/entscheidungen/page.tsx` rendert künftig die View.

**Bundle-Grenze O-WP014-09 nicht verschärfen:** `/entscheidungen` ist session-gebunden und damit
client-gerendert wie `/isms` und `/services` – dieselbe dokumentierte Demo-Entscheidung. Für
Routen und Datumsformat ausschließlich das **seed-freie** `lib/twin/routes.ts` importieren,
**nie** `lib/twin/object-detail.ts`.

**Tests mit der Funktion** (`lib/entscheidungen/__tests__/`, `components/entscheidungen/__tests__/`)
– siehe Acceptance Criteria; danach zwei unabhängige Reviews, Browser-QA (Nordwerk,
Consulting Operator, ein leerer Mandant, ein Rollenwechsel, responsive Stichprobe,
A11y-Stichprobe), Findings gebündelt in **einem** Pass, Verified Checkpoint, Statusabschluss.

## Acceptance Criteria

**Slice 1 – Seed**

1. **Entscheidungen sind materialisiert:** Der Demo-Seed enthält für den Mandanten **Nordwerk**
   `Decision Record`-Objekte (F09) mit stabilen IDs im vorhandenen Namensschema. Alle
   Schema-, Vokabular-, ID-, Integritäts-, Owner-Ref- und Tenant-Isolationstests aus
   `packages/demo-seed/src/seed.spec.ts` sind grün – einschließlich der Negativbeweise.
   Kein anderer Mandant erhält Entscheidungen.
2. **Anbindung über R23:** Jede Entscheidung ist über mindestens eine **eingehende**
   `decided_in`-Kante an ein **bestehendes** Nordwerk-Objekt (Risiko bzw. Managed Service)
   angebunden; Richtung `Risk/Service → Decision Record` wie in Dok. 07 §9 R23. Kein
   Waisenobjekt, keine Dangling-Kante (per Test).
3. **Ablösekette über R24 (Pflicht):** Es existiert genau ein Paar aus abgelöster
   Vorgängerentscheidung und Nachfolgerin mit einer `supersedes`-Kante in der Richtung
   **Nachfolger → Vorgänger**. Die Vorgängerentscheidung trägt ein **geschlossenes**
   `valid_time`-Intervall (`to` gesetzt), die Nachfolgerin beginnt fachlich dort, wo die
   Vorgängerin endet – per Test belegt. `version` bleibt bei beiden `1` und
   `record_time.replaced_at` bleibt ungesetzt (siehe O-WP017-07).
4. **Nachweisbezug über R15:** Mindestens eine Entscheidung trägt eine eingehende
   `evidences`-Kante, deren **Quelle ein Objekt vom Typ `Evidence`** ist (Beispielspalte R15) –
   keine neue Typpaarungs-Abweichung nach Muster O-WP012-06.
5. **Owner belegt:** Jede Entscheidung trägt `owner_ids` auf eine **existierende** Rolle
   desselben Mandanten **und** eine eingehende R03-`owns`-Kante von derselben Rolle.
6. **Keine verbotenen Inhalte:** Der Guardrail-Test gegen Währungs-/Preis-/Betragsangaben
   (`seed.spec.ts:309`) bleibt unverändert und grün; die neuen Objekte enthalten außerdem
   **keine** Frist-, Aufwands-, Kapazitäts-, Prioritäts-, Options-, Baseline- oder
   Wirkungsangaben – auch nicht als Klartext in `description` (per Test über eine
   Begriffsliste belegt).
7. **Bitemporalität:** Für **jedes** neue Objekt und **jede** neue Kante gilt weiterhin
   `valid_time.from < record_time.recorded_at`; die Entscheidungsschicht trägt einen **eigenen**
   Erfassungszeitpunkt, sodass der Seed drei belegte Erfassungswellen hat.
8. **Manifest, README und Version konsistent:** `SEED_VERSION` ist erhöht,
   `seed-manifest.json` und `README.md` sind vollständig nachgezogen (Counts gesamt und je
   Mandant, `layers`, `relationship_types_used` inkl. `decided_in` und `supersedes`, Storyline,
   Kantendiagramm, Erfassungswellen, Exporte, offene Fragen). Die Manifest-Konsistenztests sind
   grün. **Alle Zahlen sind am Seed nachgerechnet, nicht aus einem Bericht übernommen.**
9. **Ripple vollständig im selben Pass:** Alle unter „Ripple" (A–E) gelisteten 17 Stellen sind
   angepasst; `pnpm test` ist über **alle** Pakete grün. **Kein Wächtertest wurde entschärft,
   gelöscht oder übersprungen** – die Historien-Wächter prüfen künftig **beide** Ausprägungen
   (Objekte ohne Ablösung: keine Historie; das R24-Paar: belegte Historie), und die
   Fixture-Negativbeweise sind unverändert erhalten (per Review bestätigt).
10. **Produktwahrheit auf `/heute` bleibt wahr:** Der Ehrlichkeitsblock von `/heute` behauptet
    nach diesem WP **nicht mehr**, es gäbe keine `Decision Record`-Objekte. Er nennt weiterhin
    korrekt die fehlenden `Task`-Objekte und die fehlenden Frist-/Aufwands-/Kapazitäts-/
    Prioritätsfelder als Ursache der fehlenden Morning Mission; die Abgrenzung „Ablösung ≠
    Änderungsfeed" ist explizit. Die Historienaussage ist grammatisch korrekt (Numerus bei
    genau einem Beleg).

**Slice 2 – Ort „Entscheidungen"**

11. **`/entscheidungen` ist kein Platzhalter mehr:** Die Seite zeigt die Leitfrage des Ortes aus
    `lib/shell/places.ts` **und** den Rahmungssatz, welche engere Frage sie tatsächlich
    beantwortet. `NAV_PLACES` führt `entscheidungen` als `live` ohne `plannedScreen`; die
    abhängigen Shell-Tests sind angepasst.
12. **Register je Entscheidung – ausschließlich Belegtes:** Für jede Entscheidung des **aktiven**
    Mandanten erscheinen Entscheidungsfrage (`display_name`), Kontext (`description`),
    **Lebenszyklus-Stand**, Owner (aufgelöst, Fail-loud bei nicht auflösbarer ID), fachliche
    Gültigkeit **und** Erfassungszeitpunkt als **getrennte** Achsen sowie die Provenance
    (`source_refs`, Bestätigungsstufe). Jeder sichtbare Wert stammt aus `@isms/demo-seed` –
    nichts hartkodiert, nichts erfunden, nichts berechnet.
13. **Bezug und Nachweis sind sichtbar und richtungstreu:** Die über **R23** verknüpften
    Bezugsobjekte (Risiko/Service) und die über **R15** verknüpften Nachweise erscheinen je mit
    Nachbarname, Objekttyp, Lebenszyklus-Stand, kanonischer R-ID, deutschem Klartextlabel,
    Herkunft der Aussage (`assertion_kind`), **Status der Beziehung** und – falls belegt –
    Vertrauensgrad. Fehlt ein Nachweis, wird das **benannt**, nicht weggelassen.
14. **Ablösekette (der Kern):** Für das R24-Paar zeigt die Seite bei der Nachfolgerin „löst ab"
    und bei der Vorgängerin „wurde abgelöst durch" – **getrennt**, richtungstreu, beidseitig
    verlinkt, jeweils mit der fachlichen Gültigkeit beider Stände. Die abgelöste Entscheidung
    wird **nicht ausgeblendet** (Dok. 07 §9 R24 „ohne historische Überschreibung"; Dok. 10 §9.2).
    Ein Test belegt, dass beide Richtungen im DOM erscheinen und auf die jeweils andere
    Entscheidung verlinken.
15. **Links korrekt und mandantentreu:** Jeder Objekt-Link wird über `objectDetailHref` aus
    `lib/twin/routes.ts` gebildet (nie hartkodiert) und trägt **immer** die `tenant_id` des
    aktiven Mandanten; Negativbeweis, dass keine fremde `tenant_id`, kein fremder Objektname und
    keine fremde Objekt-ID im DOM erscheint.
16. **Ehrlichkeitsblock „Was eine Entscheidung hier noch nicht zeigt":** Die Seite benennt
    sichtbar die nach Dok. 10 §9.1 **fehlenden** Pflichtfelder (mindestens Auslöser, Baseline,
    Optionen inkl. Nichtstun, Wirkung, Ressourcen, Abhängigkeiten, Approver, Frist, Outcome Check)
    und die **nur teilweise** belegten, jeweils mit dem heutigen Träger. Sie sagt außerdem, dass
    die Leitfrage „jetzt erforderlich" auf dieser Datenlage nicht beantwortbar ist. Formuliert
    als Datenlücke – **kein** Termin, **kein** „kommt bald", **kein** Funktionsversprechen
    (per Test über den gerenderten Text belegt).
17. **Der Ehrlichkeitsblock kann nicht still veralten:** Ein Test prüft gegen
    `packages/contracts` (Objekt-Envelope) und den Seed, dass die als fehlend benannten Felder
    tatsächlich **keinen Träger** haben – sobald ein solches Feld entsteht, wird der Test rot
    (gleiches Wächterprinzip wie in WP-014/WP-016).
18. **Keine Bewertung, keine Priorisierung:** In der gesamten Ansicht erscheinen **kein** Score,
    Reifegrad, Ampelwert, Trend, Prozentwert, Schwellenwert, Prioritätsrang, keine Frist, keine
    Empfehlung, kein Serviceangebot und **keine** Preis-/Währungsangabe. Die Entscheidungen sind
    **nicht** nach Dringlichkeit oder Wichtigkeit sortiert; die Reihenfolgeregel steht sichtbar
    an der Liste (per Test über den gerenderten Text belegt).
19. **Wortlaut:** Objektstatus heißen „Lebenszyklus-Stand", Kantenstatus „Status der Beziehung",
    und der seitenweite Rahmungssatz zu Lebenszyklus ≠ Prüfergebnis ist **wortgleich** aus
    `components/isms/IsmsContent.tsx` übernommen (Dok. 08 08-D07). Ein Lebenszyklus-Stand wird
    an keiner Stelle als Prüf-, Freigabe- oder Auditergebnis dargestellt.
20. **Zustände, A11y, Responsive:** Loading (vor Hydration), „nicht angemeldet" mit Link auf
    `/login`, **Empty-State für Mandanten ohne Entscheidungen** mit Nutzen + nächstem Schritt
    (Consulting Operator trägt einen Graphen, aber keine Entscheidungen; Finovia/MediCore tragen
    gar nichts – beide Fälle werden **unterschiedlich und ehrlich** benannt), Partial data
    sichtbar (Dok. 06 §17); Heading-Hierarchie h1>h2>h3>h4, Status nie nur über Farbe (06-D11),
    Tastaturbedienbarkeit und sichtbarer Fokus, responsive Kernweg – geprüft und dokumentiert.
21. **Tenant-Isolation:** Alle Entscheidungen, Kanten, Nachbarn und Links stammen ausschließlich
    aus dem aktiven Mandanten; Negativbeweis im **Helfer-Test** (fremde Objekte/Kanten verändern
    kein Ergebnis; ein unbekannter `tenant_id` liefert ein wohldefiniertes leeres Modell) **und**
    im **Render-Test** (kein fremder Name, keine fremde ID im DOM).
22. **Kein Rollen-Gating:** Alle zwölf Rollen R01–R12 sehen **dieselben** Daten (Dok. 06 06-D05,
    Dok. 10 ENTSCHEIDUNG 10-02); ein Test vergleicht über alle Rollen die Menge der gerenderten
    Objekt-IDs und weist Gleichheit nach.

**Übergreifend**

23. **Tests und Verifikation:** Helfer- und Render-Tests grün; Monorepo grün über
    **Typecheck, Test und Build – frisch, ohne Turbo-Cache**
    (`pnpm --filter <pkg> exec vitest run`, `pnpm typecheck`, `pnpm build`), zusätzlich
    `python scripts/validate_handoff.py`. **„Lint" ist ausdrücklich kein Kriterium** – es gibt
    keinen Linter im Stack (FINDING-0005); die Anforderung wird hier weder erfunden noch still
    übersprungen. Browser-QA dokumentiert (Nordwerk, Consulting Operator, ein leerer Mandant,
    ein Rollenwechsel, responsive Stichprobe).
24. **Reviews und Lücken:** Zwei unabhängige Reviews dokumentiert (Builder ≠ Reviewer), bei
    Wording-/Konzeptzweifeln zusätzlich Concept-Consistency gegen Dok. 10 §9 und Dok. 06 §7 S03.
    Jede beim Bauen gefundene fachliche Lücke steht als `O-WP017-*` in
    `docs/project/OPEN_QUESTIONS.md` **und** als Kommentar am Code – geraten wird nichts.

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

Beim Prüfen von Konzept, Contract, Seed und Code für dieses WP sichtbar geworden; keine davon
darf im Code still entschieden werden.

| ID (Vorschlag) | Frage | Art | Umgang in WP-017 | Owner / Gate |
|---|---|---|---|---|
| **O-WP017-01** | **`Task` (F08) hat in Dok. 07 §9 keine einzige Beziehungszeile.** Der Typ steht im Objektkatalog (§6, F08), kommt aber in **keiner** der 25 Beziehungszeilen R01–R25 vor – weder als Quelle noch als Ziel. Eine Aufgabe wäre damit nicht an Maßnahme, Control, Person, Risiko oder Entscheidung anbindbar | **Konzeptlücke** (blockierend für Dok. 10 §5 / WP-008) | **Tasks werden nicht materialisiert.** Kein vorhandener Kantentyp wird zweckentfremdet; die Lücke wird im Seed-Kommentar und im Produkt (`/heute`) benannt | Concept Author (fehlt eine Zeile in §9, oder lebt „Task" bewusst außerhalb des Graphen – vgl. Dok. 11?) |
| **O-WP017-02** | **Decision Card vs. Objektvertrag:** Dok. 10 §9.1 verlangt 14 Pflichtfelder; der Objektvertrag trägt **neun** davon gar nicht (Auslöser, Baseline, Optionen, Wirkung, Ressourcen, Abhängigkeiten, Empfehlung, Frist, Outcome Check) und **fünf** nur teilweise | **Konzeptlücke** (erweitert O-WP016-04) | nichts erfunden; die Lücke ist im Produkt feldweise benannt und per Wächtertest gegen den Contract abgesichert | Concept Author (Envelope-Felder, eigener Objekttyp „Decision Card" oder Moduldaten außerhalb des Zwillings? Ergänzung zu CCP-002/003) |
| **O-WP017-03** | **Lebenszyklus einer abgelösten Entscheidung:** `LIFECYCLE_STATUS_DECISION` (Dok. 05 §7) kennt nur „vorbereitet, zur Freigabe, genehmigt, abgelehnt, umgesetzt, überprüft" – **keinen** Zustand für „abgelöst/überholt". Der generische Katalog (Dok. 07 §8) kennt „Überholt: durch neue Version ersetzt; historisch sichtbar" | **Konzeptlücke** (verwandt mit O-D07-02/03) | die Vorgängerentscheidung erhält den **generischen** Zustand `Überholt`; die Union der Vokabulare lässt das zu, eine kanonische Bestätigung steht aus | Concept Author (Entscheidungs-Lifecycle ergänzen oder generischen Zustand offiziell zulassen?) |
| **O-WP017-04** | **Zielbezug vs. Auslöser:** Dok. 10 §9.1 führt beide als getrennte Pflichtfelder; kanonisch existiert nur **R23 `decided_in`** („Verknüpft fachlichen Zustand mit menschlicher Entscheidung"). Offen, welches der beiden Felder R23 abbildet – und wodurch das jeweils andere belegt würde | **Konzeptlücke** | die R23-Kante wird neutral als „Bezug" dargestellt und **nicht** als „Auslöser" ausgegeben; „Auslöser" bleibt im Ehrlichkeitsblock als fehlend benannt | Concept Author |
| **O-WP017-05** | **Approver fehlt im Modell:** Dok. 10 §9.1 verlangt „Owner **und** Approver"; der Objektvertrag kennt nur `owner_ids` mit `owner_kind ∈ {fachlich, technisch}` – keine freigabeberechtigte Rolle. Auch R03 `owns` trägt nur Verantwortung, nicht Freigabe | **Konzeptlücke** | kein erfundener Approver, keine Umdeutung von `owner_kind`; im Produkt als fehlend benannt | Concept Author + Product (neue `owner_kind`-Ausprägung, eigenes Feld oder eigener Kantentyp?) |
| **O-WP017-06** | **Die Leitfrage des Ortes ist nicht beantwortbar:** „Welche Geschäftsentscheidung ist **jetzt erforderlich**?" (Dok. 06 §7 S03) setzt Frist, Priorität und Kapazität voraus – alle drei fehlen (O-WP016-04) | Lücke (Produkt + Daten) | der Ort zeigt die Leitfrage **und** benennt sichtbar die engere Frage, die er belegen kann; **keine** Dringlichkeitsaussage, **keine** Sortierung | Product / UX + Concept Author (bleibt die Leitfrage, oder gehört sie erst zum Decision Center, Dok. 10 §6/§8?) |
| **O-WP017-07** | **Ablösung: Objektversion oder eigenständiges Objekt?** Dok. 10 §9.2 sagt „Korrekturen erfolgen als neue Version oder Nachtrag"; Dok. 07 §7 kennt `version` + `record_time.replaced_at`, Dok. 07 §9 R24 dagegen eine Kante zwischen zwei **eigenständigen** Objekten. Beide Mechanismen existieren nebeneinander ohne Regel, wann welcher gilt | **Konzeptlücke** | WP-017 nutzt **R24** (zwei eigenständige, historisch sichtbare Entscheidungen), lässt `version: 1` und setzt **kein** `replaced_at`; die Wahl ist im Seed-Kommentar begründet und reversibel | Concept Author (Regel „Datensatzversion vs. fachliche Ablösung" fehlt) |
| **O-WP017-08** | **Entscheidungen nur bei Nordwerk:** Ob der Betreiber-Mandant („Consulting Operator Demo") eigene Entscheidungen tragen soll – und ob eine spätere Portfolio-Sicht Entscheidungen mehrerer Mandanten nebeneinander zeigen darf, ohne die Mandantengrenze zu verletzen – ist offen (vgl. O-WP012-03) | Produktfrage | nur Nordwerk wird ausmodelliert; der Consulting Operator erhält einen **ehrlichen** Empty-State, der ihn nicht wie einen leeren Mandanten aussehen lässt | Product + Concept Author |
| **O-WP017-09** | **Keine deutsche Glosse für `Decision Record`:** `OBJECT_TYPE_LABEL_DE` (`apps/web/lib/twin/data.ts:82`) führt bewusst keine Übersetzung; die Anzeige fällt auf den kanonischen Namen zurück | Produktfrage (klein) | **keine Glosse erfunden**; kanonischer Name bleibt sichtbar | Product / UX |

## Stop Conditions

- eine Aussage der Seite lässt sich mit Seed **und** Contract nicht belegen (→ `O-WP017-*` +
  ehrlicher Leerzustand; **nicht** erfinden, **nicht** aus Dok. 10 „sinngemäß" ableiten),
- Druck, doch eine Decision Card, Optionen, Baseline, Wirkung, Frist, Empfehlung, Priorisierung
  oder ein Kostenband zu zeigen (Scope-Drift Richtung Dok. 09/10, WP-008/WP-009),
- Bedarf, **Contract oder Vokabular zu ändern** (neues Feld, neuer Objekttyp, neuer
  Beziehungstyp, neue Lifecycle-Werteliste) – das ist Concept Author + Human Gate, nicht dieses WP,
- Bedarf, `Task` doch zu materialisieren, indem ein vorhandener Kantentyp zweckentfremdet wird
  (→ O-WP017-01 bleibt offen; **stoppen**),
- ein Wächtertest lässt sich nur „grün bekommen", indem seine Aussage abgeschwächt, entfernt
  oder übersprungen wird (das wäre der Verlust genau des Beweises, den dieses WP führen will),
- Preise, Beträge, Währungen, Kostenbänder oder reale Inhalte im Seed,
- Bedarf, mandantenübergreifend zu zählen, zu vergleichen oder zu verlinken (verboten,
  Dok. 07 §17/P09),
- Bedarf, Rollen tatsächlich Daten zu entziehen oder freizuschalten (das wäre Authz – Dok. 19,
  eigenes WP mit Security Review),
- Verschärfung der bekannten Bundle-Lücke O-WP014-09 (neue seed-abhängige Client-Importe
  jenseits des bestehenden Musters),
- Slice 2 würde starten, während Slice 1 noch nicht grün und committet ist (fremde Fehler im
  Testlauf, Briefing §3).

## Done Evidence

- grüne Tests über **alle** Pakete (`contracts`, `demo-seed`, `db`, `web`, `api`) – frischer
  Lauf ohne Turbo-Cache – plus `pnpm typecheck` und `pnpm build`,
- die neuen Seed-Zahlen sind **am Seed nachgerechnet** und in `seed-manifest.json`,
  `packages/demo-seed/README.md`, `packages/db` und `apps/web` identisch geführt,
- die umgestellten Wächtertests belegen **beide** Ausprägungen der Historienableitung; die
  Fixture-Negativbeweise sind unverändert,
- DOM-/Screenshot-QA für `/entscheidungen` (Nordwerk, Consulting Operator, leerer Mandant,
  Rollenwechsel, responsive Stichprobe) **und** eine Gegenprüfung von `/heute`, dass dessen
  Ehrlichkeitsblock nach der Seed-Änderung noch wahr ist,
- Review-Notiz unter `docs/project/reviews/`, `O-WP017-*` in `docs/project/OPEN_QUESTIONS.md`,
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md`,
  `docs/project/handovers/LATEST.md` und `docs/project/CONTINUATION_BRIEFING.md` (Testzahl,
  Ortsstatus, verbleibende Blocker für Dok. 10),
- Micro-/Verified-Checkpoints, `python scripts/validate_handoff.py`, Commit + Push.
