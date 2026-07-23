# CCP-004 – Beziehungs-Zusatzfelder `weight` und `effectiveness_assumption` (nicht PDF-gedeckt) + Prüfauftrag „Herkunft als eigenes Konzept"

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-004 – Beziehungs-Zusatzfelder `weight` und `effectiveness_assumption` |
| Status | **Entwurf — Human Gate: Owner offen** |
| Datum | 2026-07-23 |
| Autor (Rolle) | Concept Author (Prozess nach Dok. 21 §21) |
| Auslöser | **WP-020 Slice 6**; Befund aus `docs/concept/abgleich/NACHTRAG_WP-019_2026-07-23.md`, Übergabeliste Punkt 8 („Contract-berührend → E-02-Umfeld, Human Gate", vgl. DR-0007); FINDING-0007 / DR-0006 (PDF = Produktwahrheit) |
| Betroffene Dokumente | Dok. 07 v1.0 (PDF), Abschnitte „Beziehungen als erstklassige Daten" (+ „Kanonischer Beziehungskatalog - Teil 2"), „Grundprinzipien - Teil 1" (P03), „Verbindliche Entscheidungen - Teil 1" (07-D04), „Globale Akzeptanzkriterien", „Herkunft, Datenqualität und Vertrauen" (07-D10), „Objektvertrag - Teil 2" (`tags_custom_fields`) |
| Betroffene Artefakte | `packages/contracts/src/relationship.ts`, `packages/contracts/PROVENANCE.md`, `packages/contracts/src/relationship.spec.ts`, `packages/db/src/schema.ts` (+ Drizzle-Migration/Snapshot), `packages/db/src/repositories/mappers.ts`, `packages/db/src/roundtrip.spec.ts`, `packages/demo-seed/src/nordwerk-graph.ts`, `packages/demo-seed/src/managed-services.ts`, `packages/demo-seed/src/seed.spec.ts`, `apps/web` (10 Dateien, siehe §3), `docs/project/OPEN_QUESTIONS.md` |
| Verwandte offene Fragen | **O-D07-05/-06/-07** (Beziehungs-`status`, Vertrauensgrad, Richtung — betreffen *andere* §-„Beziehungen"-Felder, decken `weight`/`effectiveness_assumption` **nicht** ab); **O-WP019-02** (PDF-interne Nummerierungskonflikte Dok. 07), **O-WP019-03** (Zitierdrift alte Markdown-Zählung) |

> **Keine Änderung aktiver Spezifikationen durch dieses Dokument; Umsetzung erst nach
> Freigabe (Human Gate) via eigenes WP.** Dieses Proposal ist die Human-Gate-Vorlage.

---

## 1. Befund mit PDF-Beleg

Die Felder `weight` und `effectiveness_assumption` im Beziehungsvertrag (`@isms/contracts`)
und im DB-Schema (`@isms/db`) sind **nicht durch das PDF von Dok. 07 gedeckt**.

**PDF, Abschnitt „8. Beziehungen als erstklassige Daten"** (Folientitel; die Inhalt-Leiste
zählt denselben Abschnitt als „9 Beziehungen" — Nummerierungskonflikt O-WP019-02), wörtlich:

> „Eine Beziehung ist nicht nur eine Linie im Diagramm. Sie ist ein versionierter fachlicher
> Datensatz mit **Quelle, Ziel, Typ, Richtung, Gültigkeit, Herkunft, Status, Vertrauen und
> ggf. Owner**. Assertierte, importierte, abgeleitete und freigegebene Beziehungen bleiben
> unterscheidbar."

Kein „Gewicht", keine „Wirksamkeitsannahme". Die übrigen normativen Stellen bestätigen das:

- **Abschnitt „2. Grundprinzipien - Teil 1", P03:** „Jede relevante Beziehung besitzt Typ,
  Richtung, Gültigkeit, Quelle, Vertrauensgrad und ggf. Owner."
- **Abschnitt „21. Verbindliche Entscheidungen - Teil 1", 07-D04:** „Beziehungen werden als
  eigenständige, versionierte Datensätze mit Typ, Richtung, Gültigkeit, Quelle und Vertrauen
  modelliert."
- **Abschnitt „20. Globale Akzeptanzkriterien":** „Jede sichtbare Beziehung zeigt Typ,
  Richtung, Gültigkeit und Herkunft; kritische Beziehungen zusätzlich Vertrauensgrad und
  Reviewstatus."
- Die in WP-019 visuell verifizierte **Abbildung** der Beziehungsfolie (Bildunterschrift,
  transkribiert in `docs/concept/active/07_..._v1.0.md`, Z. 149): „Beziehungen tragen Typ,
  Richtung, Gültigkeit, Herkunft, Vertrauensgrad und Owner." — auch die Abbildung trägt die
  Felder nicht.

Die Begriffe „Gewicht"/„Wirksamkeitsannahme" kommen im gesamten Textlayer von Dok. 07 nicht
vor. Die *Semantik* der Wirksamkeit existiert im PDF nur als **Typregel**, nicht als Feld
(Abschnitt „Beziehungen als erstklassige Daten", Tabellenzeile R12 `mitigates`: „Erwartete
oder bestätigte Risikowirkung."; Abschnitt „8.1 Kanonischer Beziehungskatalog - Teil 2",
R20 `contributes_to`: „Begründeter Wirkungsbeitrag ohne Garantie.").

## 2. Ursprung der Abweichung (Übertragungsfehler, kein Konzeptfehler)

Die abgelöste Markdown-Fassung
(`docs/concept/archive/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0_abgeloest_2026-07-23.md`,
§9 „Beziehungsmodell", Z. 95) hatte die PDF-Liste verfälscht:

> „Sie besitzen Quelle, Ziel, kanonischen Typ, Richtung, fachliche Gültigkeit, Erfassungszeit,
> Status, **Quelle**, Vertrauensgrad, Owner **und optional Gewicht oder Wirksamkeitsannahme**."

Zwei Verfälschungen in einem Satz: (1) der erfundene Zusatz „optional Gewicht oder
Wirksamkeitsannahme"; (2) das PDF-Wort **„Herkunft"** wurde durch ein zweites „Quelle"
ersetzt (relevant für §7 dieses Proposals). WP-003 hat den Contract in gutem Glauben aus
dieser Fassung abgeleitet; `packages/contracts/PROVENANCE.md` (Z. 101–102) belegt die Felder
mit „§9 ‚optional Gewicht'" / „§9 ‚optional ... Wirksamkeitsannahme'" — **diese
Provenance-Belege zitieren eine Formulierung, die im PDF nie existiert hat** (Kategorie
FINDING-0007: „Anforderungen standen im Markdown, die im PDF nie existierten"). Auch der
Kopfkommentar von `packages/contracts/src/relationship.ts` (Z. 4–8) wiederholt die falsche
Liste. Das ist ein Übertragungsfehler, kein bewusster Produktentscheid.

## 3. Ist-Zustand im Code

### 3.1 `weight` — definiert, aber fachlich ungenutzt

| Stelle | Fundort |
|---|---|
| Contract-Feld | `packages/contracts/src/relationship.ts:53` (`weight: z.number().optional()`) |
| Provenance-Fehlbeleg | `packages/contracts/PROVENANCE.md:101` |
| DB-Spalte | `packages/db/src/schema.ts:125` (jsonb); Migration `packages/db/drizzle/0000_daily_siren.sql:39`; Snapshot `packages/db/drizzle/meta/0000_snapshot.json:253` |
| Mapper | `packages/db/src/repositories/mappers.ts:108` (toRow), `:131` (fromRow) |
| Tests | `packages/contracts/src/relationship.spec.ts:40` (Optionalfeld-Test, Wert `2`); `packages/db/src/roundtrip.spec.ts:58,94` (Fixture `0.5` + Assertion) |
| Seed | **keine Nutzung** (0 Kanten) |
| UI (`apps/web`) | **keine Nutzung** (Treffer sind ausschließlich CSS `font-weight`) |

Es gibt keinerlei Semantik-Definition (Gewicht *wovon*? Skala? Bezug?). Eine Entfernung
reißt: 2 Testdateien (je 1 Testfall anzupassen), Schema + Migration, 2 Mapper-Stellen,
1 Provenance-Zeile. **Kein Demo-Inhalt und keine Oberfläche betroffen.**

### 3.2 `effectiveness_assumption` — real genutzt, inkl. Ehrlichkeits-UI

| Stelle | Fundort |
|---|---|
| Contract-Feld | `packages/contracts/src/relationship.ts:55` |
| Provenance-Fehlbeleg | `packages/contracts/PROVENANCE.md:102` |
| DB-Spalte | `packages/db/src/schema.ts:127`; Migration `...0000_daily_siren.sql:40`; Snapshot `:259` |
| Mapper | `packages/db/src/repositories/mappers.ts:109`, `:132–134` |
| DB-/Contract-Tests | `roundtrip.spec.ts:59` (Fixture); `relationship.spec.ts:41` |
| Seed (Builder) | `packages/demo-seed/src/nordwerk-graph.ts:136,152`; `managed-services.ts:156,172` |
| Seed (Daten) | **5 Kanten:** `nordwerk-rel-10-mitigates-ctrl-risk` (`:442`), `nordwerk-rel-11-mitigates-measure-scenario` (`:452`); `nordwerk-rel-37/-38/-39-contributes_to-…` (`managed-services.ts:614,625,635`) — exakt die Typen R12/R20, deren PDF-Typregeln von „Wirkung" sprechen |
| Seed-Guardrail-Tests | `seed.spec.ts:321` (Preis-/Währungsverbot prüft den Feldtext), `:443` (Verbotsbegriffe) |
| UI-Anzeige | `apps/web/components/twin/ObjectDetailView.tsx:152–155` und `components/isms/IsmsCards.tsx:115–118` (jeweils „Wirkungsannahme (nicht nachgewiesen): …"); `components/services/ServiceCard.tsx:230–231` |
| UI-Datenmapper | `apps/web/lib/twin/object-detail.ts:119,377`; `lib/isms/data.ts:87,205`; `lib/services/data.ts:66,201` |
| UI-Tests | `apps/web/lib/twin/__tests__/object-detail.test.ts:191`; `lib/isms/__tests__/data.test.ts:61`; `lib/services/__tests__/data.test.ts:115` |
| Narrative Referenz | `apps/web/lib/entscheidungen/data.ts:476` (Decision-Card-Abdeckungsanalyse: Feld „Wirkung" hat „kein[en] Träger … kennt nur eine Wirkungsannahme") |

Eine Entfernung reißt: 3 Anzeige-Komponenten, 3 UI-Datenmapper, 3 UI-Tests, 5 Seed-Kanten
(verlieren ihren Erklärtext), 2 Guardrail-Tests (verlieren einen Prüf-Input, bleiben grün),
1 narrativen Analysetext, plus Contract/DB/Mapper/Tests wie bei `weight`. Insgesamt
**11 Dateien in `packages/` + 10 Dateien in `apps/web`** tragen mindestens eines der Felder.
Bemerkenswert: Die UI-Formulierung „Wirkungsannahme (nicht nachgewiesen)" leistet genau die
Ehrlichkeitsarbeit, die P07/07-D05 verlangen — nur eben über ein Feld, das der PDF-Vertrag
nicht kennt.

## 4. Optionen

### Option (a) — Felder ersatzlos entfernen

Contract, DB-Schema, Mapper, Seed und UI werden bereinigt; die 5 Seed-Erklärtexte entfallen
oder wandern in `description`-Prosa der beteiligten Objekte.

- **+** Maximale Konzepttreue (Regel Null); der Beziehungsvertrag entspricht wieder wörtlich
  dem Abschnitt „Beziehungen als erstklassige Daten".
- **+** Für `weight` praktisch kostenlos (keine fachliche Nutzung).
- **−** Für `effectiveness_assumption`: Verlust eines real genutzten, ehrlich beschrifteten
  UI-Bausteins in 3 Erlebniswelten; Demo wird erklärungsärmer.
- **−** Spaltenentfernung in der DB ist destruktiv (eigenes Gate; alternativ additive
  Deprecation: Feld aus Contract nehmen, Spalte zunächst stehen lassen).

### Option (b) — als gekennzeichnete Nicht-PDF-Erweiterung deklarieren

Das PDF liefert den Mechanismus selbst: Abschnitt „6.1 Objektvertrag - Teil 2",
`tags_custom_fields`: „Konfigurierbare Erweiterungen — Governed Schema; keine unkontrollierte
Freitextdatenbank"; der `RelationshipEnvelope` trägt dieses Feld bereits
(`relationship.ts:59`).

- **(b1) Kennzeichnungs-Minimum:** Felder bleiben technisch top-level, werden aber in
  `relationship.ts`, `PROVENANCE.md` und OPEN_QUESTIONS ausdrücklich als
  **„Nicht-PDF-Erweiterung (Herkunft: Alt-Markdown-Übertragungsfehler; bewusst beibehalten)"**
  markiert; der falsche §9-Beleg wird gestrichen.
  **+** Null Codebruch. **−** Top-level-Position suggeriert weiterhin Kanon; die Grenze
  „Kanon vs. Erweiterung" ist nur dokumentarisch, nicht strukturell.
- **(b2) Struktur-konform:** `effectiveness_assumption` wandert in ein governed
  Erweiterungsschema unter `tags_custom_fields` (z. B. Namespace
  `ext.effectiveness_assumption`); `weight` wird entfernt (siehe Empfehlung).
  **+** PDF-konformer Erweiterungsweg; Kanon bleibt strukturell rein; UI-Funktion bleibt
  erhalten. **−** Umbau von Mappern, Seed und 3 UI-Datenmappern; Erweiterungs-Governance
  (Schema, Version) muss erstmalig definiert werden.

### Option (c) — über Konzeptpflege ins Konzept heben

Der Owner erklärt eines oder beide Felder zum gewollten Bestandteil des Beziehungsvertrags.
Die PDF-„Dokumentensteuerung" von Dok. 07 nennt die Änderungsregel selbst: „Neue Kernobjekte,
Beziehungstypen oder **globale Semantik benötigen Decision Record und Schema-Version**."

- **+** Wenn die Wirkungsannahme produktstrategisch gewollt ist (sie passt zum Geist von
  R12/R20, P07 und 07-D05), ist das der ehrliche Weg, sie zu legalisieren.
- **−** Aufwändigster Pfad: Decision Record, Schema-Version, Fortschreibung von Dok. 07
  (Prozess der Konzeptfortschreibung PDF↔Markdown ist ungeklärt, solange die PDFs
  Produktwahrheit sind — DR-0006); Definitionspflicht (für `weight`: Semantik + Skala, die
  bisher niemand benannt hat).
- Hinweis: „Gewicht(ung)" in Dok. 09/10 (aktive Markdown-Fassungen) bezeichnet
  Score-/Methodik-Gewichte, **kein** Kantenattribut — taugt nicht als Beleg; falls (c)
  verfolgt wird, wären die PDFs 09/10 gegenzulesen (deren Markdowns sind nicht quellentreu
  geprüft).

## 5. Empfehlung

**Empfehlung (klar als Empfehlung markiert, Entscheid liegt beim Owner):** getrennt je Feld.

1. **`weight`: Option (a) — entfernen.** Nirgendwo fachlich genutzt (0 Seed-Kanten, 0
   UI-Stellen), keine definierte Semantik oder Skala, reine Altlast eines
   Übertragungsfehlers. Beibehalten hieße, ein bedeutungsloses Feld als scheinbaren Kanon
   weiterzutragen. DB-Spalte zunächst per Deprecation stilllegen statt destruktiv droppen.
2. **`effectiveness_assumption`: Option (b2)** — als gekennzeichnete Nicht-PDF-Erweiterung
   über den PDF-gedeckten governed-Schema-Mechanismus erhalten (Zwischenschritt (b1)
   zulässig, falls der Umbau nicht sofort priorisiert wird). Das Feld leistet sichtbare
   Ehrlichkeitsarbeit („nicht nachgewiesen") im Sinn von P07/07-D05 und deckt die
   R12-/R20-Typsemantik ab; **falls** der Owner es als Kernfeld will, ist Option (c) mit
   Decision Record + Schema-Version der richtige Weg — nicht der stille Status quo.
3. **Unabhängig vom Feld-Entscheid (Übertragungsreparatur nach Regel Null, kein
   Produktentscheid):** der Kopfkommentar `relationship.ts:4–8` und die Belege
   `PROVENANCE.md:101–102` behaupten einen PDF-Wortlaut, der nicht existiert — sie werden
   auf die echten Abschnittstitel/Zitate korrigiert. Empfohlen: gebündelt im Umsetzungs-WP,
   damit Beleg- und Feldstand konsistent bleiben.

## 6. Auswirkungsanalyse (Cross-Document Impact Matrix)

| Artefakt | Stelle | (a) entfernen | (b1) kennzeichnen | (b2) Erweiterung | (c) Konzept heben |
|---|---|---|---|---|---|
| `contracts/src/relationship.ts` | Z. 4–8, 53, 55 | 2 Felder raus; Kommentar korrigieren | Kommentar + Kennzeichnung | `weight` raus; Feld → Erweiterungsschema | Kommentar korrigieren; Felder bleiben |
| `contracts/PROVENANCE.md` | Z. 101–102 | Zeilen streichen + Befundnotiz | Beleg ersetzen durch „Nicht-PDF-Erweiterung" | wie b1 + Erweiterungsabschnitt | Beleg = neuer Decision Record |
| `contracts/src/relationship.spec.ts` | Z. 36–47 | 1 Testfall anpassen | unverändert | Testfall auf `tags_custom_fields` umstellen | unverändert |
| `db/src/schema.ts` + Drizzle | Z. 125, 127 / SQL Z. 39–40 | 2 Spalten deprecaten/droppen (**destruktiv → eigenes Gate**) | unverändert | `weight`-Spalte deprecaten; Feld liegt in `tags_custom_fields`-jsonb | Schema-Version erhöhen |
| `db/src/repositories/mappers.ts` | Z. 108–109, 131–134 | 4 Stellen raus | unverändert | umbauen | unverändert |
| `db/src/roundtrip.spec.ts` | Z. 58–59, 94 | Fixture/Assertion anpassen | unverändert | Fixture umbauen | unverändert |
| `demo-seed` (2 Builder, 5 Kanten, 2 Guardrail-Tests) | siehe §3.2 | 5 Erklärtexte entfallen/umziehen; Guardrail-Input anpassen | unverändert | Builder + 5 Kanten auf Erweiterungsfeld; Guardrail-Regex nachziehen | unverändert |
| `apps/web` (3 Komponenten, 3 Mapper, 3 Tests, 1 Narrativ) | siehe §3.2 | Anzeigen + Tests entfernen; Narrativ in `entscheidungen/data.ts:476` umformulieren | unverändert | 3 Datenmapper lesen Erweiterungsfeld; Komponenten unverändert | unverändert |
| Dok. 07 | Abschnitt „Beziehungen als erstklassige Daten" | unverändert | unverändert | ggf. Verweis auf Erweiterungsmechanik | Fortschreibung + Decision Record + Schema-Version |
| `docs/project/OPEN_QUESTIONS.md` | O-D07-Block | Befund als erledigt austragen | Kennzeichnung nachführen | dito | neue DR-Referenz |

Aufwandsindikation: `weight`-Entfernung ≈ 6 Dateien + Migrationsartefakte, kein
Fachinhalt. `effectiveness_assumption` betrifft in Summe **15 Dateien** (5 in `packages/`
über §3.1 hinaus, 10 in `apps/web`), davon bei (b1) **0** Codeänderungen, bei (b2) ca. 9
(Mapper/Seed/Tests), bei (a) alle 15.

## 7. Prüfauftrag „Herkunft als eigenes Konzept" — Befund

**Frage:** Trägt der Contract „Herkunft" (Provenance) als eigenständige Dimension, wie der
Abschnitt „Beziehungen als erstklassige Daten" („… Gültigkeit, **Herkunft**, Status …") und
der Abschnitt „11. Herkunft, Datenqualität und Vertrauen" (07-D10) es verlangen — oder
vermengt er sie?

**Befund: strukturell NICHT vermengt, aber drei Präzisierungspunkte.**

Der Contract trennt sauber: `source_id`/`target_id` = „Quelle, Ziel" (Endpunkte);
`source_refs` (`SourceRef { source_kind, reference, priority }`,
`contracts/src/common.ts:83–90`) = Datenherkunft; `confidence` = Vertrauen;
`assertion_kind` = Herkunfts-*Klasse* (assertiert/importiert/abgeleitet/freigegeben, 07-D05).
Die `SOURCE_KIND`-Werte (`vocabularies.ts:398–408`) sind wörtlich aus den sichtbaren
Nachweisen der Dimension „Herkunft" übernommen („Quelle, Connector, Importjob, Nutzer,
Dokument, Extraktionsregel" — Abschnitt „Herkunft, Datenqualität und Vertrauen"). Herkunft
ist also als eigenständige Dimension vorhanden und nicht mit Endpunkten oder Vertrauen
verschmolzen.

Präzisierungspunkte (keine stille Korrektur; Behandlung siehe §8):

1. **Beleg-Drift „Quelle" statt „Herkunft":** `PROVENANCE.md:98` belegt `source_refs` mit
   „§9 ‚Quelle' (Datenherkunft)" — das PDF-Wort an dieser Listenposition ist „Herkunft";
   das doppelte „Quelle" stammt aus der verfälschten Alt-Markdown-Liste (§2). Redaktionelle
   Korrektur zusammen mit §5 Punkt 3.
2. **Pflichtigkeit offen:** `source_refs` ist optional; das Globale Akzeptanzkriterium
   „Jede sichtbare Beziehung zeigt Typ, Richtung, Gültigkeit und **Herkunft**" legt eine
   Pflichtanzeige nahe. Ungeklärt ist, ob dafür `assertion_kind` (immer Pflicht) als
   Herkunfts-Minimum genügt oder mindestens ein `source_refs`-Eintrag verpflichtend werden
   muss → neue offene Frage (Vorschlag **O-D07-12**).
3. **Kein `quality_state` an Beziehungen:** Objekte tragen die 7 Qualitätsdimensionen
   (inkl. „Herkunft") als `QualityState`; Beziehungen tragen nur `confidence` +
   `source_refs`. 07-D10 („Ein Gesamtvertrauensscore darf nur als Verdichtung genutzt
   werden; Herkunft, Aktualität, Vollständigkeit, Konsistenz und Review bleiben einzeln
   sichtbar") ist generisch formuliert; ob eine einzelne `confidence`-Zahl an einer
   kritischen Beziehung ohne Einzeldimensionen dem widerspricht, ist eine Konzeptfrage
   → neue offene Frage (Vorschlag **O-D07-13**), verwandt mit O-D07-06/07-O05, dort aber
   nicht enthalten.

## 8. Offene Fragen (Referenz statt Duplikat)

- Bestehende O-D07-Fragen bleiben unberührt; **keine** deckt `weight`/
  `effectiveness_assumption` ab (geprüft: O-D07-01 bis O-D07-11 in
  `docs/project/OPEN_QUESTIONS.md`). O-D07-05/-06/-07 betreffen `status`/`confidence`/
  `direction` und werden in **CCP-003** behandelt.
- **Neu vorgeschlagen (Eintrag erst nach Gate, durch das Umsetzungs-WP):**
  - **O-D07-12** — Ist Herkunft je sichtbarer Beziehung Pflicht (mind. 1 `source_refs`)
    oder genügt `assertion_kind` als Minimum? (Globale Akzeptanzkriterien)
  - **O-D07-13** — Verlangt 07-D10 Qualitätsdimensionen auch an (kritischen) Beziehungen,
    oder genügt `confidence` + `source_refs`?

## 9. Validierung (nach Umsetzung, je nach Gate-Entscheid)

- Contract-Tests: `RelationshipEnvelope` weist `weight` nach Entfernung ab (`.strict()`),
  bzw. akzeptiert die Erweiterungsform; Provenance-Test gegen die korrigierten Fundstellen.
- DB: Roundtrip grün ohne `weight`; bei (b2) Roundtrip der Erweiterungsform über
  `tags_custom_fields`.
- Seed: 5 betroffene Kanten valide; Guardrail-Tests (Preis-/Verbotsbegriffe) prüfen
  weiterhin die Wirkungsannahmen-Texte, egal wo sie liegen.
- UI: „Wirkungsannahme (nicht nachgewiesen)"-Anzeigen in Objekt-360, ISMS-Karten und
  Service-Karten unverändert sichtbar (bei b1/b2/c) bzw. sauber entfernt (bei a);
  3 UI-Tests entsprechend.
- Concept Consistency Review über Dok. 07-Bezüge (Beziehungs-Feldliste, 07-D04, Globale
  Akzeptanzkriterien).

## 10. Risiken und Rücknahmeplan

- **Präzedenz-Risiko (b1):** „gekennzeichnete Nicht-PDF-Erweiterung" darf kein Freibrief
  werden, weitere ungedeckte Felder top-level zu halten — Kennzeichnung nur mit
  Owner-Entscheid und Registereintrag.
- **Destruktivitäts-Risiko (a):** Spalten-Drop ist irreversibel → zweistufig (Contract
  zuerst, Spalte per späterer Migration), Demo-Daten sind reproduzierbar per Seed.
- **Doppelarbeit-Risiko:** Beziehungsfelder werden auch von CCP-003 (K3/K4/K5) berührt —
  Umsetzung beider CCPs im selben Contract-WP bündeln.
- **Rücknahmeplan:** Alle Schritte additiv/deprecation-basiert planbar; das Feld ließe sich
  aus der Migrationshistorie und diesem Proposal jederzeit wiederherstellen. Dokumente
  werden versioniert/archiviert, nicht gelöscht.

## 11. Freigaben

| Gate | Status |
|---|---|
| Concept Consistency Reviewer | ausstehend |
| Human/Product Gate (**Owner**) — Entscheid je Feld: (a)/(b1)/(b2)/(c) | **offen** |
| Zusätzliches Gate bei Spalten-Drop (destruktive Migration) | offen (nur bei Option a) |
