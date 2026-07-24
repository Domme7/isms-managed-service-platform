# WP-021 – Demo-Welt: fünf reiche Dok-16-Firmen mit synthetischen Bewertungen (DR-0015 Nr. 4, DR-0008)

## Identität

- **Phase:** 1 (Demo Foundation) — primäres Modul **`@isms/demo-seed`**; minimaler UI-Touch
  (Default-Mandant) in `apps/web`; **kein** Auth-/DB-Bau.
- **Priorität:** P1 (Queue: **Next großer Schwerpunkt** nach der WP-028/032-Abnahme und den
  Usability-Quick-Wins — DR-0015 4. Terminal-Runde: „Demo-Welt zuerst (WP-021) … größter
  sichtbarer Effekt").
- **Status:** Draft (Aktivierung durch Orchestrator).
- **Risk Class:** **Medium–High.** Read-only und synthetisch, aber: (a) berührt **837
  bestehende Tests**, die die heutigen vier Mandanten referenzieren (Umbau muss die Testsuite
  grün halten, ohne Schutz-/Isolationsbeweise abzuschwächen); (b) **Slice 2 + Slice 7 berühren
  `@isms/contracts`** über ein Bewertungs-Trägerschema → **hartes Human Gate (E-02-Kopplung),
  nicht autonom überschreitbar** (`ACTIVE_WORK_PACKAGE.md`: „Contract-/Seed-**Struktur**-
  Erweiterungen (E-02)"); (c) die synthetischen Bewertungen arbeiten an der Ehrlichkeitsgrenze
  aus DR-0008 (die UI darf visualisieren, **was die Daten tragen** — der Seed **darf** die
  Bewertungen tragen, die UI **erfindet** nichts).
- **Builder:**
  - **Slices 1, 3–6, 7** (Seed-Reichtum + gatete Bewertungen): **ein** Datengraph-Builder
    (`data-graph-engineer` / `concept-author` mit Seed-Zuständigkeit) — alles berührt
    `packages/demo-seed`; **strikt sequenziell**, kein Parallel-Writer auf demselben Modul
    (Briefing §3). Der minimale UI-Default-Mandant-Touch (Slice 1) ist ein separater, klar
    abgegrenzter Commit in `apps/web`.
  - **Slice 2** (Carrier-CCP, **kein Bau**): `concept-author`, Schreibbereich **nur**
    `research/change-proposals/` — laut Briefing §3 parallel zu den belegten Seed-Slices
    zulässig.
  - Builder ≠ finaler Reviewer; der Builder committet nie selbst (Briefing §2), der
    Orchestrator committet je Slice; nach dem Fix-Pass eine **zweite Runde** derselben Reviewer.
- **Reviewer/Gates (risikobasiert nach Dok. 20B §36 / FINDING-0006):**
  - **Code Quality:** `code-reviewer` (immer),
  - **Domain (ISMS):** `isms-domain-lead` — **Pflicht**: die synthetischen Bewertungen nutzen
    das Bewertungsvokabular aus Dok. 08/09 (Reifegrad, Risiko-Methoden, Toleranz-/Eskalations-
    zustände); jede Skala wird am **PDF** gegengelesen (Regel Null),
  - **Product:** `product-user-lead` — die Ampel-Verteilung je Firma und die Storylines sind
    Produktoberfläche (30-Sekunden-Verständlichkeit, DR-0015 3. Runde),
  - **Security & Privacy:** `product-security-privacy` — **Pflicht**: neue Mandanten +
    Objektgraphen; Tenant-Isolation/Cross-Tenant-Negativbeweise müssen erhalten bleiben; der
    M&A-Fall (GreenGrid, getrennter Discovery-Scope) berührt die Mandanten-/Scope-Grenze,
  - **QA:** `qa-test-engineer` — die hart kodierten Seed-Zählungen und Manifest-Konsistenz
    ändern sich; Isolations-/Guardrail-Negativbeweise müssen intakt bleiben,
  - **Konzepttreue:** `concept-consistency-reviewer` — Firmenprofile (Dok. 16 §34.1) und
    Bewertungsvokabular (Dok. 08/09) am PDF; **Slice 2** zusätzlich als CCP-Konsistenzprüfung.
- **Human Gates:**
  - **Firmenliste ist entschieden** (DR-0015 Nr. 4 — Dok.-16-Fünferliste; löst O-WP006-01
    zugunsten Dok. 16). **Kein** neues Firmen-Gate.
  - **Dass der Seed synthetische Bewertungen trägt, ist entschieden** (DR-0008 „Der Demo-Seed
    **darf** synthetische Bewertungen tragen").
  - **Offen und hart: WIE die Bewertungen im Contract getragen werden** (Trägerfelder/-schema).
    Das ist **E-02-Territorium** und **blockiert Slice 7** (die numerischen Bewertungen) bis zur
    Owner-/Concept-/Security-Freigabe der Trägerschema-CCPs (**CCP-003 K7/K2/K4**, **CCP-005**,
    **CCP-008 neu**). **Slice 2 erstellt/konsolidiert die CCPs, entscheidet sie nicht.**
  - **Preisband-Guardrail (O-KUNDE-01/O-WP006-05):** WP-021 führt **keine** Preise ein; der
    strenge Preis-Guardrail bleibt in `seed.spec.ts` unverändert scharf. Illustrative Preisbänder
    sind Kundenwelt-Territorium (WP-006), nicht dieses WP.
- **Abhängigkeiten:** DR-0015 Nr. 4 (Firmenliste + reiche Bewertungen), DR-0008 (Ampeln/
  Bewertungen erwünscht + Ehrlichkeitsgrenze), DR-0007 E-01 (Demo-Welt konzeptkonform),
  DR-0006 (Regel Null), DR-0005 (Konzeptfehler benennen statt füllen), WP-019/WP-023 ✓
  (Dok. 08/09/16 quellentreu), WP-020 ✓ (belegte Dashboard-/Ampel-Schicht, die die belegten
  Firmengraphen **ohne neue UI** zum Leuchten bringt). **Slice 7 zusätzlich:** Freigabe von
  CCP-003/005/008 (Human Gate).

## Ziel

Die Demo-Welt wird von den heutigen vier Dok-03/07-Firmen (Nordwerk, Consulting Operator,
Finovia, MediCore) auf die **fünf Dok-16-Firmen** umgestellt und je Firma **reich** ausgebaut —
eigene Branche, Reifegrad, Storyline und **synthetische Bewertungen** (Risiko-Level, KPI mit
Zielwert/Ist/Trend, Reifegrad, Trust-States) nach den Vokabularen aus Dok. 08/09 und der
Demo-Dramaturgie aus Dok. 16 §34. Ergebnis: die Cockpit-Ampeln leuchten **echt und
unterschiedlich** über ein Portfolio — statt eines reichen und dreier leerer Mandanten.

**Quelle der Firmenliste (Regel Null, Dok. 16, Abschnitt „Synthetische Demo-Daten und
Demo-Dramaturgie" → §34.1 „Demo-Unternehmen"):**

1. **Nordstern Manufacturing SE** — europäischer Produzent, **Zielreife 3**, begrenzte interne
   Kapazität, **zwei Standorte**, **bevorstehender Kunden-Audit**.
2. **AlpenCloud GmbH** — Cloud-Softwareanbieter, schnelles Wachstum, **Zertifizierungsziel**,
   hohe Automatisierungsbereitschaft.
3. **Rheinbank Digital AG** — stark regulierter Finanzdienstleister, **mehrere Zielprofile**,
   hohe Nachweistiefe, **strikte Datenresidenz**.
4. **MediNova Clinics Holding** — dezentrale Gesundheitsgruppe, **kritische Verfügbarkeit**,
   Lieferanten- und Standortkomplexität.
5. **GreenGrid Energy Services** — **M&A-Szenario** mit neu erworbener Tochtergesellschaft und
   **getrenntem Discovery-Scope**.

Dok. 16 §34.1 Schlusssatz (verbindlich): „Alle Personen, Preise, Risiken, Termine, Dokumente,
Standorte und Unternehmensdaten der Demo sind synthetisch." (= `.claude/rules/demo-data.md`.)

## Der zentrale Konflikt und die minimal-disruptive Auflösung

**Problem:** Der heutige Seed trägt vier Mandanten. `TENANT_ID.NORDWERK` u. a. werden von **837
Tests** referenziert; `packages/demo-seed/src/seed.spec.ts` prüft **hart kodierte Zählungen**
(`toHaveLength(34)`/`(51)` Nordwerk, `FINOVIA`/`MEDICORE` `toEqual([])`, `tenants.toHaveLength(4)`,
`withGraph === [NORDWERK, CONSULTING_OPERATOR]`, Managed-Services 3/2). Ein simpler Austausch der
Mandanten-IDs zerlegt die Suite.

**Auflösung (empfohlen — „Anzeige umbenennen + auf leere Slots aufsatteln, IDs stabil"):**
Der `tenant_id` ist laut Contract eine **stabile, nicht identitätsstiftende** Grenze (Dok. 07 §7:
`display_name` ist „änderbar, nicht identitätsstiftend"; `tenant_id` ist die stabile ID, P02).
Deshalb ändert WP-021 **Anzeigenamen und Inhalt, aber lässt alle heute existierenden ID-Strings
unverändert.** Damit bleiben Symbol- **und** String-Referenzen der 837 Tests grün; nur die
wenigen Zusicherungen auf Zähl-Werte und Anzeigenamen werden **aktualisiert** (nicht gelöscht,
nicht abgeschwächt).

| Dok-16-Firma | Branche / Dramaturgie (Dok. 16 §34.1) | Slot heute | ID-Strategie | Slice |
|---|---|---|---|---|
| **Nordstern Manufacturing SE** (Flaggschiff) | Fertigung, Zielreife 3, 2 Standorte, Kunden-Audit, knappe Kapazität | Nordwerk (reich 34/51) | **`tenant-nordwerk` bleibt**, `display_name`→Nordstern | **1** |
| **AlpenCloud GmbH** | Cloud, Wachstum, Zertifizierungsziel, Automatisierung | — (neu) | **neu `tenant-alpencloud`** | 3 |
| **Rheinbank Digital AG** | reg. Finanz, mehrere Zielprofile, Datenresidenz | Finovia (leer) | **`tenant-finovia` bleibt**, `display_name`→Rheinbank | 4 |
| **MediNova Clinics Holding** | Gesundheit, kritische Verfügbarkeit, Standort-/Lieferantenkomplexität | MediCore (leer) | **`tenant-medicore` bleibt**, `display_name`→MediNova | 5 |
| **GreenGrid Energy Services** | M&A, neu erworbene Tochter, getrennter Discovery-Scope | — (neu) | **neu `tenant-greengrid`** | 6 |
| *(Consulting Operator Demo = Provider)* | Managed-Service-Betreiber (Dok. 13–15, **keine** Kundenfirma) | bleibt | **`tenant-consulting-operator` bleibt** | — |

**Bewusster, benannter Nebeneffekt (keine stille Auflösung):** Für die drei wiederverwendeten
Slots weicht der interne `tenant_id`-String (`tenant-nordwerk`/`-finovia`/`-medicore`) vom neuen
Anzeigenamen ab. Das ist **rein intern** (die vier Demo-Zielgruppen sehen den `tenant_id` nie;
der Contract erklärt ihn ausdrücklich als nicht identitätsstiftend). Der Preis dafür ist **Null
Testbruch durch ID-Churn**. Eine spätere, optionale „saubere ID-Umbenennung" (mit stabilem
ID-Map + Reset) wird als **O-WP021-01** registriert, **nicht** in diesem WP entschieden. Ebenso
benannt: der Consulting Operator ist **keine** der fünf Kundenfirmen, sondern der Provider-Kontext
(WP-012 hängt an ihm) — ob er als sechster Mandant bleibt oder in die Provider-Seite von GreenGrid
faltet, ist **O-WP021-02** (Empfehlung: **bleibt** — Entfernen bräche die WP-012-Portfolio-Tests).

## Nicht-Ziele

- **Keine Bewertungs-/Aggregationslogik** (Reifegrad-Rollup, Risiko-Aggregation, KPI-Berechnung,
  Trend-Ableitung, Simulation nach Dok. 09/10) — der Seed trägt **fertige, statische** synthetische
  Werte; **die UI errechnet nichts** (DR-0008-Grenze). Die echte Berechnungslogik ist ein späteres
  WP nach vollständigem Dok.-09-Gegenlesen.
- **Keine eigenmächtige Contract-Struktur-Entscheidung.** WIE die Bewertungen getragen werden,
  entscheidet der Owner über die Trägerschema-CCPs (Slice 2). Slice 7 baut **erst nach Freigabe**.
- **Keine Preise / keine Preisbänder / keine Buchung.** Der Preis-Guardrail (`seed.spec.ts`)
  bleibt scharf. (Illustrative Preisbänder = WP-006/DR-0015 Nr. 8, eigenes WP mit Security.)
- **Keine echte Auth, keine getrennten echten Logins** (WP-030), **keine DB→UI-Anbindung**
  (FINDING-0004 zuerst). Der Login bleibt beschriftete Simulation.
- **Kein Cockpit-/Design-Umbau.** WP-021 setzt nur den **Default-Mandanten** auf das Flaggschiff,
  damit die (bereits gebaute) WP-020-Dashboard-Schicht sofort leuchtet. Assessment-getriebene
  Ampeln (aus den gateten Slice-7-Werten) benötigen eine **UI-Konsumschicht** — die ist als
  **tightly-coupled Folge** benannt (WP-021-UI bzw. Cockpit-WP), nicht Primärscope hier.
- **Keine erfundene Bewertung ohne Datenträger, keine erfundene Skala.** Jede Skala stammt
  wörtlich aus Dok. 08/09 (am PDF), jeder Wert ist synthetisch und im Seed **erfasst**, nie von
  der UI behauptet.
- **Keine Decision Cards / Morning Mission** (Task/Frist-Träger fehlen — E-02; O-WP016-03/-04,
  O-WP017-01). Die Firmen können `Decision Record`-Objekte tragen (Typ existiert), aber **keine**
  Frist-/Aufwand-/Prioritätsfelder (der WP-017-Guardrail in `seed.spec.ts` bleibt scharf).

## Scope

### Slice 1 – Flaggschiff **Nordstern** tief (belegte Reichtum, KEIN Contract-Gate)

**Owner-Anweisung „Flaggschiff zuerst, Muster festzurren."** Diese Slice zurrt alles fest, was
**ohne** die Contract-Träger-Entscheidung buildbar ist — der belegte Reichtum, die Deckungslücken,
die Reset-/ID-/Manifest-Mechanik und die belegten Ampeln.

Quellen (Regel Null, am PDF): Dok. 16 §34.1 (Nordstern-Profil), Dok. 07 Abschnitt **„Synthetische
Demodaten"** (Demo-Graph-Mindestforderung: **je Tenant mindestens ein Konflikt, eine veraltete
Quelle, ein erklärbarer Trust-State** — von DR-0008 wörtlich als „gefordert" zitiert),
Dok. 08 (Risiko-/Control-/Lebenszyklus-Semantik), `.claude/rules/demo-data.md`.

Umsetzung:

- **Anzeige umbenennen:** `tenants.ts` — `display_name` „Nordwerk Manufacturing SE" → **„Nordstern
  Manufacturing SE"**; `industry`/`description` an das Dok-16-Profil angleichen (Fertigung,
  Zielreife 3, zwei Standorte, bevorstehender Kunden-Audit, begrenzte Kapazität). **`tenant_id`
  bleibt `tenant-nordwerk`.** Alle heute existierenden `object_id`/`relationship_id`-Strings
  bleiben unverändert (Teststabilität).
- **Graph anreichern** (reiche Objektzahl über F01–F09, an den bestehenden 34/51-Graphen
  **additiv** angedockt): zweiter Standort, weitere Assets/Prozesse, weitere Controls und
  Nachweise, ein zweites Risiko-Szenario, mindestens eine `Audit`-nahe Struktur (bevorstehender
  Kunden-Audit als `Audit`/`Review`-Objekt mit Lebenszyklus-Stand). Neue IDs folgen der Konvention
  `nordwerk-<typ>-<slug>` (Namespace bleibt beim stabilen `tenant_id`).
- **Deckungslücken bewusst setzen** (damit die belegten Ampeln **unterschiedlich** ausschlagen):
  mindestens ein Control **ohne** Nachweis-Kante (R15), mindestens ein Risiko **ohne** mitigierende
  Control (R12), mindestens ein kritisches Objekt **ohne** benannten Owner — je als „x von y" auf
  dem Dashboard sichtbar (WP-020-Muster, kein Score).
- **Demo-Graph-Pflicht (Dok. 07):** mindestens **ein Konflikt** (z. B. widersprüchliche
  Quellen über `source_refs` + `quality_state`-Dimension „Konsistenz"), **eine veraltete Quelle**
  (über `record_time`/`valid_time` + Dimension „Aktualität"), **ein erklärbarer Trust-State**
  (über `quality_state.dimensions` + `confirmation_level` bzw. Kanten-`confidence`) — **alles über
  bereits belegte Contract-Felder**, ohne neue Träger.
- **Default-Mandant setzen** (`apps/web`): der Cockpit-/Login-Default zeigt auf das Flaggschiff
  (`defaultTenantId` in der Login-/Session-Wiring; da der `tenant_id` `tenant-nordwerk` stabil
  bleibt, ist der Eingriff minimal — nur sicherstellen, dass der reiche Mandant **vorbelegt** ist).
- **Seed-Konsistenz nachziehen:** `seed.spec.ts`-Zählungen für Nordwerk auf die neuen Werte
  **aktualisieren** (nicht löschen); `has_object_graph` bleibt `true`; `python
  scripts/update_manifest.py` + `python scripts/seed_facts.py` regenerieren (nie abschreiben).
- **Muster dokumentieren:** in der `packages/demo-seed/README.md` die Firmen-Storyline +
  erwartete belegte Ampel-Verteilung des Flaggschiffs festhalten (Vorlage für Slices 3–6).

### Slice 2 – Bewertungs-Trägerschema-CCP (Human Gate; KEIN Bau)

Builder: `concept-author`, Schreibbereich **nur** `research/change-proposals/`.

**Auftrag:** Die Frage „**Wie** trägt der Seed synthetische Risiko-Level, Reifegrade, KPI
(Zielwert/Ist/Trend) und Trust-States im Contract?" als **eine kohärente Owner-Entscheidung**
aufbereiten — konsolidiert über die bestehenden und einen neuen Change Proposal:

- **KPI/SLA-Trägerfelder:** bereits in **CCP-003 K7-A** empfohlen (governed Erweiterungsschema
  nach Dok. 07 §18 / `tags_custom_fields`; fachlich KPI aus Dok. 09/16 §33, SLA aus Dok. 14 §8).
  Status: Entwurf, Human Gate ausstehend → **auf WP-021-Bedarf verweisen, nicht neu erfinden.**
- **Datenqualitäts-/Confidence-Skalen:** **CCP-003 K2-A/K4-A** (Confidence-Bänder; Dok. 16 §18.2
  „Low/Moderate/High/Assured"). → verweisen.
- **Trust-State-Konvention:** **CCP-005** (Stufe 1 **ohne** Contract-Eingriff, nutzt belegte
  Träger). → verweisen; klären, was Slice 7 zusätzlich als **erfassten** Trust-State braucht.
- **NEU — CCP-008 „Bewertungs-Trägerfelder: Reifegrad + Risiko-Level":** die einzige echte Lücke.
  Kein bestehender CCP trägt einen **Reifegrad (0–5)** oder ein **Risiko-Level** als erfasstes
  Feld. Fachlich am **PDF**: Dok. 09 §5 (Referenzskala 0–5, vier Facetten Design/Implementierung/
  Betrieb/Wirksamkeit, Zielwert je Capability, Referenzberechnung), §9 (Methode A qualitative
  5×5-Matrix Likelihood×Impact; Methode B semi-quantitativ 0–100, Bänder), §10 (Toleranz-/
  Eskalationszustände „Unter/Nahe/Über Toleranz, Kritische Überschreitung, Unzureichende
  Confidence" → die natürliche grün/amber/rot-Zuordnung).
- **Empfehlung (klar als Empfehlung markiert, nicht vorentschieden):** **minimal-disruptiv** —
  ein **governed Erweiterungsschema** (Mechanik Dok. 07 §18 / typisiertes `tags_custom_fields`-
  Sub-Schema) statt neuer Top-Level-Kernfelder. Begründung: `.strict()` bleibt erhalten, **keine
  DB-Migration erzwungen**, additiv, versioniert/testbar (Dok. 07 §21), passt exakt zum Muster,
  das CCP-003 K7-A schon für SLA/KPI vorschlägt. Alternativen (Top-Level-Kernfelder;
  eigene Assessment-Objekttypen) mit Trade-offs benennen.
- **Auswirkungsanalyse** (Contracts, DB-Schema, Seed, Tests, Guardrails), **Rücknahmeplan**
  (additiv → Refinement lockern = ein Commit), **Freigabe-Matrix** (Owner + Concept Consistency
  + Security). **Kein Code, kein Contract-, kein Seed-Umbau in dieser Slice.**

### Slices 3–6 – die vier weiteren Firmen (belegte Reichtum, KEIN Contract-Gate)

Je Firma **dasselbe Muster wie Slice 1**: Anzeige/Branche/Storyline nach Dok. 16 §34.1, reicher
Objektgraph über F01–F09, bewusste Deckungslücken, Dok.-07-Demo-Graph-Pflicht (Konflikt/veraltete
Quelle/Trust-State über belegte Felder), Storyline + erwartete belegte Ampel-Verteilung in der
README, `seed.spec.ts` + Manifest + Facts nachgezogen. **Kein** Contract-Eingriff.

- **Slice 3 – AlpenCloud GmbH** (neuer Mandant `tenant-alpencloud`): Cloud, schnelles Wachstum,
  Zertifizierungsziel, hohe Automatisierung. Storyline: viele Cloud-Ressourcen/Schnittstellen
  (F04), Zertifizierungs-`Framework`/`Requirement` (F06), gute Control-Abdeckung, aber
  Wachstums-Lücken (neue Assets ohne Owner/Nachweis). Erwartete Ampel-Note: überwiegend grün mit
  einzelnen amber-Deckungslücken.
- **Slice 4 – Rheinbank Digital AG** (Slot `tenant-finovia`, Anzeige/Inhalt neu): reg. Finanz,
  **mehrere Zielprofile** (mehrere `Target Profile`/`ISMS-Scope`), hohe Nachweistiefe (viele
  `Evidence`/`Control Test`), **strikte Datenresidenz** (F04 `Cloud-Ressource`/`Netzwerkzone` +
  `classification`). Erwartete Ampel-Note: hohe Abdeckung, aber sichtbare Nachweis-Aktualität als
  Trust-Thema.
- **Slice 5 – MediNova Clinics Holding** (Slot `tenant-medicore`, Anzeige/Inhalt neu):
  dezentrale Gesundheitsgruppe, **kritische Verfügbarkeit**, **Standort-/Lieferantenkomplexität**
  (mehrere `Standort` F02, mehrere `Lieferant`/`Abhängigkeit` F05). Erwartete Ampel-Note:
  Verfügbarkeits-/Lieferantenrisiken sichtbar, mehrere Deckungslücken (amber/rot).
- **Slice 6 – GreenGrid Energy Services** (neuer Mandant `tenant-greengrid`): **M&A** mit neu
  erworbener Tochter und **getrenntem Discovery-Scope**. Storyline: zwei `ISMS-Scope`-Objekte
  (Mutter + Tochter), die Tochter überwiegend im Lebenszyklus-Frühstand („Beobachtet"/„Entwurf"),
  bewusst **niedrige** Datenqualität/Confidence (Discovery). **Security-relevant:** die
  Scope-Trennung darf **keine** Cross-Tenant-Kante erzeugen — die Isolationsbeweise in
  `seed.spec.ts` bleiben grün. Erwartete Ampel-Note: heterogen (Mutter reifer, Tochter im
  Discovery = viele Lücken/niedrige Confidence).

### Slice 7 – Synthetische Bewertungen über alle fünf Firmen (GATED — nach Slice-2-Freigabe)

**Vorbedingung:** Freigabe der Trägerschema-CCPs (CCP-003 K7/K2/K4, CCP-005, CCP-008) durch
Owner + Concept Consistency + Security. **Ohne Freigabe wird diese Slice nicht gebaut** (Stop
Condition). Erst hier reisen die numerischen Bewertungen ein — das ist die Slice, die
**assessment-getriebene** grün/amber/rot erzeugt.

Umsetzung (nach dem freigegebenen Träger, am PDF gegengelesen):

- **Reifegrad je Capability** (Dok. 09 §5): Wert **0–5** + vier Facetten + **Zielwert** je Firma
  differenziert (Nordstern Zielreife 3, AlpenCloud Zertifizierungsambition höher, Rheinbank
  auditintensiv, MediNova heterogen, GreenGrid-Tochter niedrig). **Nie** Stufe 5 als Automatik.
- **Risiko-Level** (Dok. 09 §9): eine **konsistente Primärmethode** wählen (Empfehlung A =
  qualitative 5×5, workshopfähig, für die Demo am verständlichsten — final durch Domain-Gate);
  Likelihood/Impact erfasst, Toleranz-Zustand (Dok. 09 §10) → grün/amber/rot. **Kein**
  gemischtes Methoden-Portfolio ohne Ausweis.
- **KPI mit Zielwert/Ist/Trend** (Dok. 16 §33, Dok. 09 §25): je Firma einige `KPI`-Objekte (F09,
  Typ existiert) mit erfasstem Zielwert, Ist und Trend-Richtung — Dok. 06 §19: „Ziel, Ist, Trend,
  Vertrauensgrad und **nicht nur eine Prozentzahl**".
- **Trust-States** (Dok. 06 „Trust Layer", CCP-005): je Firma ein erklärbarer, erfasster
  Trust-Zustand mit Herkunft/Aktualität/Vollständigkeit/Konflikten.
- **Unterschiedliche Ampel-Verteilung je Firma** (das Kernziel): die Werte werden **je Firma
  bewusst verschieden** gesetzt, damit das Portfolio ein glaubwürdiges grün/amber/rot-Spektrum
  zeigt (Ampel-Verteilungstabelle je Firma dokumentiert, s. u.).
- **Ehrlichkeit:** jeder Wert trägt Herkunft/Confidence im Seed; die UI-Konsumschicht (Folge-WP)
  darf **nur** anzeigen, was erfasst ist, und muss den Drill-down in die Begründung tragen
  (Dok. 09: „Keine isolierten Scores"). WP-021 liefert die **Daten**; die assessment-lesende
  UI ist die benannte Folge.
- `seed.spec.ts` um **positive und negative** Assessment-Tests erweitern (Wert im erlaubten
  Wertebereich; keine Bewertung ohne Herkunft/Confidence; kein verbotenes Bewertungsvokabular in
  der Decision-Schicht); Manifest/Facts regenerieren.

## Acceptance Criteria

Jedes Kriterium nennt Kommando und erwartetes Ergebnis. „Frisch" = ohne Turbo-Cache
(`pnpm --filter <pkg> exec vitest run`).

**Slice 1 – Flaggschiff Nordstern (belegt)**

1. **Anzeige umgestellt, ID stabil:** `DEMO_TENANTS` zeigt „Nordstern Manufacturing SE" bei
   unverändertem `tenant_id: 'tenant-nordwerk'`; ein Test belegt beides. Alle Tests, die
   `TENANT_ID.NORDWERK` oder den String `tenant-nordwerk` referenzieren, bleiben grün.
2. **Reicher, angedockter Graph mit Deckungslücken:** der Flaggschiff-Graph ist gegenüber heute
   gewachsen (neue Objekte/Kanten über F01–F09), enthält mindestens je eine Deckungslücke
   (Control ohne R15, Risiko ohne R12, Objekt ohne Owner); `seed.spec.ts`-Zählungen auf die neuen
   Werte **aktualisiert**; `python scripts/seed_facts.py` als Referenz (keine Zahl hartkodiert im
   UI). Alle Isolations-/Integritäts-/Owner-Negativbeweise bleiben grün.
3. **Dok.-07-Demo-Graph-Pflicht belegt:** ein Test weist je einen **Konflikt**, eine **veraltete
   Quelle** und einen **erklärbaren Trust-State** im Flaggschiff nach — ausschließlich über
   belegte Contract-Felder (kein neuer Träger).
4. **Default-Mandant leuchtet sofort:** nach Login landet die (WP-020-)Dashboard-Schicht auf dem
   Flaggschiff und zeigt belegte Ampeln (Lebenszyklus-Verteilung, Abdeckungen x-von-y); per Test
   belegt, dass der Default-Mandant der reiche Flaggschiff-Mandant ist. `pnpm qa:visual WP-021`
   zeigt leuchtende, **belegte** Ampeln.
5. **Manifest/Facts konsistent:** `python scripts/update_manifest.py` regeneriert ohne Diff-Drift;
   die Manifest-Konsistenztests (`seed.spec.ts`) sind grün; Guardrail „keine Preise/Währung"
   unverändert grün.

**Slice 2 – Trägerschema-CCP**

6. **CCP-008 liegt vor** (`research/change-proposals/CCP-008_*.md`) mit PDF-Beleg (Dok. 09
   §5/§9/§10), Optionen, klar markierter Empfehlung (governed Erweiterungsschema), Auswirkungs-
   analyse, Rücknahmeplan, Freigabe-Matrix; **verweist** auf CCP-003 K7/K2/K4 und CCP-005 als die
   übrigen Trägerbausteine; als Human-Gate-Vorlage gekennzeichnet. **Kein Code geändert**
   (`git diff --stat` enthält nur `research/change-proposals/`).

**Slices 3–6 – vier weitere Firmen (belegt)**

7. **Fünf Kundenfirmen live, Provider erhalten:** `DEMO_TENANTS` enthält die fünf Dok-16-Firmen
   (Anzeigenamen wörtlich nach §34.1) **plus** den Provider (Consulting Operator); `tenants`-
   Zählung und `withGraph`-Liste in `seed.spec.ts` **aktualisiert**; jeder Kundenmandant trägt
   einen belegten Graphen (kein leerer Mandant mehr, außer bewusst benannt).
8. **Je Firma Deckungslücken + Demo-Graph-Pflicht:** pro neuem/gefülltem Mandanten belegt ein
   Test je eine Deckungslücke sowie Konflikt/veraltete Quelle/Trust-State über belegte Felder.
9. **GreenGrid-Isolation:** der getrennte Discovery-Scope erzeugt **keine** Cross-Tenant-Kante;
   `findCrossTenantRelationships` bleibt `[]`; der konstruierte Cross-Tenant-Negativbeweis bleibt
   intakt; Security-Gate bestätigt.
10. **Storylines dokumentiert:** `packages/demo-seed/README.md` führt je Firma Branche, Storyline
    und **erwartete belegte Ampel-Verteilung**; die Zahlen stimmen mit `seed_facts.py` überein.

**Slice 7 – Synthetische Bewertungen (gated)**

11. **Nur nach Freigabe gebaut:** ohne Owner-/Concept-/Security-Freigabe von CCP-003/005/008
    existiert **kein** Assessment-Feld im Seed; der Zustand ist als „gated, nicht gebaut" im
    Statusbericht dokumentiert (Stop Condition, kein Alleingang).
12. **Bewertungen aus dem Vokabular, am PDF:** Reifegrad ∈ 0–5 mit vier Facetten + Zielwert
    (Dok. 09 §5); Risiko-Level in **einer** ausgewiesenen Methode (Dok. 09 §9) mit Toleranz-
    Zustand (§10); KPI mit Zielwert/Ist/Trend (Dok. 16 §33 / Dok. 06 §19); Trust-State (CCP-005).
    Contract-Tests: Wertebereiche positiv **und** negativ (out-of-range wird abgewiesen).
13. **Jede Bewertung trägt Herkunft/Confidence:** ein Test weist nach, dass kein Assessment-Wert
    ohne erfasste Herkunft/Confidence existiert (keine nackte Zahl); Decision-Schicht-Guardrail
    (`Reifegrad|Score|Ampel|Schwellenwert|…`) bleibt scharf und grün.
14. **Unterschiedliche Ampel-Verteilung je Firma:** die erwartete grün/amber/rot-Verteilung je
    Firma ist dokumentiert und aus den erfassten Werten ableitbar (Portfolio zeigt echtes
    Spektrum, kein Einheitsbild).

**Übergreifend**

15. **Gates besetzt:** Code + Domain + Product + Security & Privacy + QA + Konzepttreue; zweite
    Runde nach dem Fix-Pass; Review-Notiz unter `docs/project/reviews/WP-021_*` mit Besetzung,
    Findings und Verbleib; Security-Urteil zu neuen Mandanten/GreenGrid-Scope explizit.
16. **Regel Null belegt:** jede Firmen-Eigenschaft (Dok. 16 §34.1) und jede Bewertungsskala
    (Dok. 08/09) ist am **PDF** gegengelesen; der `concept-consistency-reviewer` prüft gegen;
    Zitate nennen den **Abschnittstitel**.
17. **Gesamtverifikation:** `pnpm lint`, `pnpm typecheck`, `pnpm test` (frisch je Paket),
    `pnpm build`, `python scripts/validate_handoff.py`, `python scripts/treue_check.py` grün;
    `packages/contracts` **unverändert** in den Slices 1/3–6 (`git diff --stat` ohne
    `packages/contracts`-Pfade außer in der gateten Slice 7 nach Freigabe).
18. **Offene Fragen registriert:** alle O-WP021-Einträge stehen in
    `docs/project/OPEN_QUESTIONS.md`; neu gefundene Lücken werden benannt statt gefüllt (DR-0005).

## Test-Impact (wie die Suite grün bleibt)

Kern der Risikobeherrschung: **IDs stabil, Negativbeweise unangetastet, Zähl-Zusicherungen
aktualisiert (nicht abgeschwächt), Manifest/Facts regeneriert.**

| Ort | Was passiert | Grün-Halten |
|---|---|---|
| **~837 Web-/DB-Tests mit `TENANT_ID.*` / `tenant-nordwerk`** | Symbole + ID-Strings **bleiben** | keine Änderung nötig; nur wenige `display_name`-Zusicherungen (z. B. „Nordwerk Manufacturing SE") aktualisieren |
| `packages/demo-seed/src/seed.spec.ts` – Zählungen | `toHaveLength(34)/(51)` Nordstern, `FINOVIA/MEDICORE toEqual([])`, `tenants.toHaveLength(4)`, `withGraph`, Managed-Services 3/2 | **aktualisieren** auf die neue Seed-Form (5 Firmen + Provider; gefüllte Slots); **Isolations-/Integritäts-/Owner-/Cross-Tenant-Negativbeweise bleiben 1:1 erhalten** |
| `packages/demo-seed/seed-manifest.json` | Counts/Tenants/Families ändern sich | `python scripts/update_manifest.py`; Manifest-Konsistenztests recomputen aus dem Seed |
| `scripts/seed_facts.py` / `seed-facts.ts` + Web-Wächter | Dashboard-Zahlen ändern sich | regenerieren; Web-Dashboard leitet ab (nicht hartkodieren) |
| `packages/db` (`seed-loader`, `tenant-isolation`, `roundtrip`) | lädt `DEMO_SEED` | neue Mandanten/Objekte müssen parsen + isoliert bleiben; db-Tests frisch laufen |
| Preis-Guardrail (`seed.spec.ts`) | WP-021 führt keine Preise ein | **unverändert scharf** lassen |
| WP-017-Decision-Guardrail (`Frist|Reifegrad|Score|Ampel|…`) | Bewertungen dürfen **nicht** als Klartext in Decision-Objekte lecken | scharf lassen; Bewertungen als **Felder**, nicht als Decision-Text |
| **Slice 7** neue Contract-Refinements | nur nach Gate | additiv + Deprecation-freundlich; positive **und** negative Wertebereichstests |

**Warum ein simpler Austausch scheitert und der gewählte Weg nicht:** ein ID-Austausch würde
hunderte Symbol-/String-Referenzen brechen; das Umbenennen der Anzeige bei stabiler ID lässt die
Referenzen unberührt und beschränkt die Testarbeit auf die (ohnehin wahrheitsgemäß geänderten)
Zähl- und Namenszusicherungen plus Manifest/Facts-Regeneration.

## Stop Conditions

- **Slice 7 ohne Freigabe** von CCP-003/005/008 → stoppen; **keine** Contract-Struktur eigenmächtig
  ändern (E-02-Gate, `ACTIVE_WORK_PACKAGE.md`).
- Eine Firma/Ampel ließe sich **nur** mit einer erfundenen Skala oder einem Wert ohne Datenträger
  füllen → stoppen, als Lücke zeigen, O-WP021-xx ergänzen (DR-0005/DR-0008-Grenze).
- Ein Isolations-, Integritäts-, Owner- oder Cross-Tenant-**Negativbeweis** ließe sich nur
  grün bekommen, indem seine Regel abgeschwächt/übersprungen wird → stoppen (WP-017-Prinzip).
- Der Umbau **erzwingt** eine Preis-/Währungsangabe → stoppen (Guardrail; Preise sind WP-006).
- Der M&A-Scope (GreenGrid) würde eine Cross-Tenant-Existenzaussage oder -Kante sichtbar machen
  → stoppen, Security-Gate (Leerzustands-Leak-Klasse, Lektion 12).
- Ein Firmen-Merkmal oder eine Skala lässt sich **nicht** am PDF belegen → als OFFENE FRAGE
  registrieren, nicht aus dem Markdown/Gedächtnis füllen (Regel Null, FINDING-0007-Lehre).
- Scope-Drift Richtung **echte Bewertungslogik (Dok. 09/10), Preisbänder, Kundenwelt (WP-006),
  echte Auth (WP-030), DB→UI, Decision Cards, Cockpit-Redesign** → stoppen, Stand sichern, an
  Queue/Owner.

## Offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID | Frage | Art | Umgang in WP-021 | Owner / Gate |
|---|---|---|---|---|
| **O-WP021-01** | Sollen die internen `tenant_id`-Strings der wiederverwendeten Slots (`tenant-nordwerk/-finovia/-medicore`) später an die neuen Firmennamen angeglichen werden (saubere ID-Umbenennung mit stabilem ID-Map + Reset)? | Konsistenz/Aufräumen | vorerst **nein** (Teststabilität, ID ist nicht identitätsstiftend); als optionale Härtung registriert | program-manager (späteres WP) |
| **O-WP021-02** | Bleibt der Consulting Operator als sechster (Provider-)Mandant, oder faltet er in die Provider-Seite von GreenGrid? | Modellfrage | **bleibt** (WP-012-Portfolio hängt an ihm; Entfernen bräche Tests) | Product + Domain |
| **O-WP021-03** | Welche **eine** Risiko-Methode ist die Demo-Primärmethode (Dok. 09 §9 A 5×5 vs. B 0–100)? | Produkt/Fach | Empfehlung **A** (verständlich, workshopfähig); final im Domain-Gate/Slice 7 | Domain (Slice 7) |
| **O-WP021-04** | Wie tief geht die **UI-Konsumschicht** für assessment-getriebene Ampeln (eigenes WP-021-UI vs. Cockpit-WP)? | Scope/Sequenz | WP-021 liefert die Daten; UI-Konsum als tightly-coupled Folge benannt | program-manager |
| **O-WP021-05** | Welche Zielprofil-/Reifegrad-Vorlagen werden je Firma vollständig ausmodelliert (Dok. 16 §34 12 Szenen sind das Vollbild; die Demo-Welt-Slice baut die **Datengrundlage**, nicht alle 12 interaktiven Szenen)? | Umfang | Datengrundlage je Firma; interaktive Szenen (Onboarding-Flows) sind Kundenwelt/spätere WPs | Product |
| **O-WP021-06** | Trust-State-Verdichtung: welche der acht Trust-Layer-Angaben dürfen in **eine** Demo-Zeile verdichtet werden, ohne 07-D10 („Dimensionen einzeln sichtbar") zu verletzen (= CCP-005 OF-2, O-WP020-06)? | Konzeptlücke | offen; Slice 7 zeigt nur erfasste Angaben, verdichtet nichts ohne Freigabe | Concept Author (CCP-005) |

## Done Evidence

- Kommandoprotokolle in der Review-Notiz: `pnpm lint`, `pnpm typecheck`, frische Testläufe je
  Paket, `pnpm build`, `python scripts/validate_handoff.py`, `python scripts/treue_check.py`,
  `python scripts/seed_facts.py`, `python scripts/update_manifest.py`, finaler
  `pnpm qa:visual WP-021`;
- Screenshots + axe-Report committet unter `docs/project/visual/WP-021/`; Portfolio-Ansicht mit
  **unterschiedlichen** Ampeln je Firma sichtbar; Owner-Reaktion im Abschlussbericht;
- Review-Notiz `docs/project/reviews/WP-021_INDEPENDENT_REVIEW.md` (sechs Gates + zweite Runde,
  Security-Urteil zu neuen Mandanten/GreenGrid, Verbleib jedes Findings);
- `research/change-proposals/CCP-008_*.md` (Slice 2) als Human-Gate-Vorlage; Verweis auf
  CCP-003/005;
- `packages/demo-seed/README.md` mit Firmen-Storylines + erwarteter Ampel-Verteilung;
  regeneriertes `seed-manifest.json`;
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md` (WP-021-Slice-Plan +
  UI-Konsum-Folge), `docs/project/OPEN_QUESTIONS.md` (O-WP021-01…06 + Neufunde),
  `docs/project/handovers/LATEST.md` (Exact Next Step, Do Not Repeat: „IDs stabil, nicht
  austauschen");
- getrennte Commits je Slice (explizit gestaged, nie `git add -A` — Lektion 9), Verified
  Checkpoint, Commit + Push.
