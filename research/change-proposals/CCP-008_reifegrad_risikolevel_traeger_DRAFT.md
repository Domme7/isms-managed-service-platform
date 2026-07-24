# CCP-008 (ENTWURF) – Bewertungs-Trägerfelder: Reifegrad + Risiko-Level (governed Erweiterungsschema)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-008 – Bewertungs-Trägerfelder: Reifegrad + Risiko-Level |
| Status | **ENTWURF (DRAFT) — NICHT-BINDEND; Owner-Freigabe ausstehend** |
| Datum | 2026-07-24 |
| Autor (Rolle) | Concept Author (Prozess nach Dok. 21 §21). Dies ist ein **Change-Proposal-Entwurf**, kein Konzeptbeschluss: Concept Consistency Review und Security Review sind **nachgelagert** und erfolgen erst nach Owner-Freigabe. |
| Auslöser | **WP-021 Slice 2** (Trägerschema-CCP als Human-Gate-Vorlage) und **WP-021 Slice 7** (synthetische Bewertungen der fünf Dok-16-Firmen). Ohne erfasste Träger für **Reifegrad** und **Risiko-Level** können die fünf Firmen keine echten, unterschiedlichen Cockpit-Ampeln tragen (nur die heutige Kanten-/Feld-/Lebenszyklus-Lage). Steuernde Entscheidungen: **DR-0008** (Ampeln erwünscht; der Seed **darf** synthetische Bewertungen tragen; UI erfindet nichts), **DR-0007 E-02** (Contract-Struktur-Erweiterung = Human Gate), **DR-0015 Nr. 4** (fünf reiche Firmen + synthetische Bewertungen). Frage-IDs: **O-WP021-03** (Risiko-Primärmethode), **O-WP014-02** (`confidence_indicator` nicht berechnen), **09-O01** (Primärmethode je Firma). |
| Betroffene Dokumente (nur benannt, **NICHT geändert**) | Dok. 09 „Reifegrad, Risiken, Bedrohungen & Control Intelligence" (Abschnitte „Kanonisches Reifegradmodell", „Reifegrad-Assessment und Evidence", „Risikobewertungsmethoden", „Risikobereitschaft, Toleranzen und Eskalation"); Dok. 08 „ISMS-Kernprozesse" (Abschnitt „ISMS-05 – Risikomanagement" → „Risikoszenario"); Dok. 07 „Digitaler Unternehmenszwilling / Informationsgraph" (Abschnitte „Objektvertrag", „APIs, Events und Erweiterbarkeit", „Globale Akzeptanzkriterien") |
| Betroffene Artefakte (nur benannt, **NICHT geändert**) | `packages/contracts/src/object.ts` (`ObjectEnvelope.tags_custom_fields`, heute `.strict()`), `packages/contracts/src/vocabularies.ts`, `packages/contracts/PROVENANCE.md`; `packages/demo-seed` (die fünf Firmengraphen, Slice 7); `apps/web/lib/heute` / `apps/web/lib/cockpit` (Konsum: Ampel-Ableitung, Drill-down) — **nur als Konsument benannt** |

> **Dieser Entwurf ändert nichts.** Er ist ein **nicht-bindender** Vorschlag an den Owner
> (`.claude/rules/research.md`: „Materiale Änderungen benötigen Research Brief, Change Proposal und
> Consistency Review"; DR-0005). Keine aktive Konzeptdatei, kein Contract, kein Seed und kein
> Produktcode wird durch dieses Dokument verändert. Umsetzung (Slice 7) erst nach Owner-Freigabe +
> nachgelagertem Concept Consistency + Security Review. **Bis dahin bleibt `tags_custom_fields`
> ungetypt und Slice 7 ungebaut** (WP-021 Stop Condition).

> **Regel-Null-Ehrlichkeit dieser Session:** In diesem Kontext war `python scripts/pdf_text.py`
> **nicht** ausführbar (kein Bash-Zugriff für den Planer). **Es wurde nichts direkt am PDF
> verifiziert.** Alle unten zitierten Skalen, Facetten, Wertebereiche und Abschnittstitel stammen
> aus den **quellentreuen Markdown-Arbeitsfassungen** `docs/concept/active/09_*` und `…/08_*`
> (beide durch WP-023/DR-0010 quellentreu neu abgeleitet, Kopfnotiz je Datei) sowie `…/07_*`
> (WP-019). Diese Fassungen gelten als quellennah, sind aber laut DR-0006/FINDING-0007 **nicht**
> die Produktwahrheit. Jede in Slice 7 übernommene Skala/Eigenschaft ist deshalb ausdrücklich als
> **„vor Umsetzung am PDF gegenlesen"** markiert (§6 Regel-Null-Verifikationsliste). Zitiert wird
> der **Abschnittstitel**, nicht die Nummer — die PDF-Foliennummerierung weicht nachweislich ab
> (siehe §5, Befund zur „§18"-Zitierung).

---

## 1. Problem und Evidenz

**Die einzige echte Trägerlücke der Demo-Welt.** Der Objekt-Envelope (`@isms/contracts`) ist
`.strict()` — er weist unbekannte Top-Level-Felder ab, „damit der Vertrag nicht still erodiert"
(`packages/contracts/src/object.ts`, Kommentar zu §7, Prinzip **P10 „Erweiterbar ohne
Schema-Chaos"**). Die **einzige** vorgesehene, governte Erweiterung ist `tags_custom_fields`
(„Governed Schema; keine unkontrollierte Freitextdatenbank", Dok. 07 Abschnitt „Objektvertrag").
Heute ist dieses Feld **ungetypt** (`z.record(z.string(), z.unknown()).optional()`), also technisch
offen, fachlich aber ungoverned — genau der Zustand, den P10 verbietet.

Für die fünf Dok-16-Firmen (WP-021) bedeutet das: die Firmen können über **belegte** Felder bereits
echte, dezente Ampeln tragen (Lebenszyklus-Verteilung, Abdeckungen „x von y", Kanten-Vertrauensgrad,
Datenqualitätsdimensionen — die WP-020-Dashboard-Schicht). **Was fehlt, ist ein erfasster Träger
für zwei Bewertungen, die Dok. 08/09 als Kernprodukt definieren:**

| Bewertung | Als erfasstes Contract-Feld heute? | Folge ohne Träger |
|---|---|---|
| **Reifegrad** (Skala 0–5, vier Facetten, Zielwert je Capability) | **nein** | Reifegrad-Ampel/-Balken nur als Prosa in `description` — nicht maschinell ableitbar, nicht prüfbar, nicht per Contract-Test gegen Wertebereich absicherbar |
| **Risiko-Level** (Methode + Likelihood/Impact bzw. Band + Toleranzzustand) | **nein** | Risiko-Ampel (grün/amber/rot) nicht aus Daten ableitbar; der natürliche Toleranz→Ampel-Pfad (Dok. 09 „Eskalationslogik") hat keinen Datenpunkt |

**Was NICHT die Lücke ist (kein Doppelvorschlag):**

- **KPI Zielwert/Ist/Trend + SLA-Felder** und **Datenqualitäts-/Confidence-Skalen** sind bereits in
  **CCP-003** vorgeschlagen (K7-A für KPI/SLA über dasselbe governte Erweiterungsschema; K2-A/K4-A
  für Confidence-/Qualitätsbänder). CCP-008 **erfindet sie nicht neu**, sondern **verweist** (§7).
- **Trust-State** ist Gegenstand von **CCP-005** (Stufe 1 ganz ohne Contract-Eingriff, nur über
  belegte Träger). CCP-008 **verweist** und grenzt ab (§7).

**Evidenz, dass der Träger erwünscht und der Seed der richtige Ort ist (DR-0008):** Der Owner hat
entschieden, dass „der **Demo-Seed** synthetische Bewertungen tragen **darf** — das ist kein
‚Erfinden', sondern gefordert" (DR-0008, Entscheidung 2). Verboten bleibt allein, dass „die UI eine
Bewertung **errechnet oder behauptet**, die im Datenbestand nicht existiert" und „eine Ampel ohne
Drill-down in die Begründung". CCP-008 schließt genau die Vertragslücke, die aus „der Seed darf"
ein „der Seed **kann governed**" macht.

## 2. Ziel

Für **Reifegrad** und **Risiko-Level** ist festgelegt, **wo** und **wie** der synthetische Wert im
Contract erfasst wird — **oder** es ist bewusst dokumentiert, dass eine Facette offen bleibt (nicht
erfunden). Ziel ist der **kleinste** additive, `.strict()`-erhaltende, versioniert-testbare Träger,
der ausreicht, damit Slice 7 die fünf Firmen mit **unterschiedlichen** grün/amber/rot-Ampeln
belegen kann — jeder Wert mit Herkunft/Confidence, nichts von der UI behauptet.

## 3. Fachlicher Beleg (aus quellentreuem Markdown; PDF-Gegenlesen ist Vorbedingung — §6)

### 3.1 Reifegrad — Dok. 09, Abschnitt „Kanonisches Reifegradmodell"

- **Referenzskala 0–5** (Unterabschnitt „Referenzskala 0 bis 5"): 0 Nicht vorhanden · 1 Initial ·
  2 Wiederholbar · 3 Definiert · 4 Gesteuert · 5 Adaptiv. Ausdrücklich: **„Stufe 5 ist kein
  automatisches Ziel"**; Zielwert 3 oder 4 oft angemessen; die **Strategie-DNA legt Zielstufen je
  Capability fest** (⇒ es gibt einen **Zielwert** je Capability, nicht nur einen Ist-Wert).
  · *vor Umsetzung am PDF gegenlesen:* `python scripts/pdf_text.py 09 --suche "Referenzskala"`
- **Vier Bewertungsfacetten** (Unterabschnitt „Vier Bewertungsfacetten"): **Design,
  Implementierung, Betrieb, Wirksamkeit** — je 0–5. „Reife nicht allein aus Dokumentation ableiten"
  (09-D03 bestätigt Skala 0–5 + diese vier Facetten). · *am PDF gegenlesen:*
  `python scripts/pdf_text.py 09 --suche "Bewertungsfacetten"`
- **Referenzberechnung** (Unterabschnitt „Referenzberechnung"):
  `Maturity = 0,20×Design + 0,25×Implementierung + 0,20×Betrieb + 0,35×Wirksamkeit`;
  **fehlende Facette wird nicht still mit 0 bewertet — Confidence sinkt, Status „unvollständig"**.
  *Wichtig für WP-021:* Slice 7 trägt **fertige, statische** Werte (Nicht-Ziel „keine
  Aggregationslogik"); die Formel ist Beleg für die Facetten-Struktur, **nicht** zur Laufzeit zu
  implementieren. · *am PDF gegenlesen:* `python scripts/pdf_text.py 09 --suche "Referenzberechnung"`
- **Pflichtinhalt einer Reifeaussage** (Abschnitt „Reifegrad-Assessment und Evidence" →
  „Evidence-Anforderungen"): mindestens **Capability, Scope, Facette, Wert, Begründung,
  Kriterienversion, Evidence-Links, Assessor, Bewertungsdatum, Gültigkeitsdauer und Confidence**.
  ⇒ Der Reifegrad-Träger ist **nie eine nackte Zahl** — Herkunft/Confidence sind konzeptseitig schon
  Pflicht (deckt DR-0008 exakt). · *am PDF gegenlesen:*
  `python scripts/pdf_text.py 09 --suche "Evidence-Anforderungen"`

### 3.2 Risiko-Level — Dok. 09, Abschnitte „Risikobewertungsmethoden" + „Risikobereitschaft, Toleranzen und Eskalation"

- **Methode A – qualitative 5×5-Matrix:** Likelihood und Impact je **1–5**; Matrixwert dient
  Priorisierung; Impact-Dimensionen (transparent ausgewiesen): **Finanzen, Betrieb, Regulierung,
  Personen, Reputation, Strategie**. „verständlich, schnell, workshopfähig". · *am PDF gegenlesen:*
  `python scripts/pdf_text.py 09 --suche "Risikobewertungsmethoden"`
- **Methode B – semi-quantitativ 0–100:** Bänder, **keine scheinpräzise Schadenswahrscheinlichkeit**;
  Komponenten getrennt angezeigt. **Methode C (finanzielle Quantifizierung)** ist ausdrücklich
  **nicht** Voraussetzung des ersten Produkts (Ideenparkplatz) — für WP-021 **außen vor**.
- **Eine Primärmethode je Kunde** (Abschnitt-Einleitung: „Ein Kunde wählt eine Primärmethode;
  parallele Methoden dürfen nur zu Analysezwecken genutzt werden"; 09-O01 offen). ⇒ Der Träger muss
  die **gewählte Methode ausweisen**, damit kein gemischtes Methoden-Portfolio ohne Kennzeichnung
  entsteht (O-WP021-03: Empfehlung **A** für die Demo, final im Domain-Gate).
- **Toleranz- und Eskalationslogik** (Abschnitt „Risikobereitschaft, Toleranzen und Eskalation" →
  „Eskalationslogik") — die **natürliche Ampel-Ableitung**:
  **Unter Toleranz** (grün) · **Nahe Toleranz** (amber, Trendwarnung) · **Über Toleranz** (rot,
  Entscheidungspflicht) · **Kritische Überschreitung** (rot, sofortige Eskalation) ·
  **Unzureichende Confidence** (keine automatische Entwarnung — Datenlücke ist selbst
  Steuerungsthema). ⇒ Der Toleranzzustand ist der Datenpunkt, aus dem die Ampel **ableitbar** ist
  (die UI mappt Zustand→Farbe, sie **erfindet** keine Farbe). · *am PDF gegenlesen:*
  `python scripts/pdf_text.py 09 --suche "Eskalationslogik"`
- **Risikoszenario-Kontext** — Dok. 08, Abschnitt „ISMS-05 – Risikomanagement" → „Risikoszenario":
  ein Szenario verbindet u. a. **inhärentes Risiko, bestehende Controls/Wirksamkeit, Restrisiko,
  Bewertungszeitpunkt, Quellen**. Dok. 08 sagt selbst, die **konkrete mathematische Risiko-/
  Reifegradlogik gehört in Dok. 09** — d. h. der numerische Träger ist eine Dok-09-Sache, die
  Szenario-Struktur eine Dok-08-Sache. · *am PDF gegenlesen:*
  `python scripts/pdf_text.py 08 --suche "Risikoszenario"`

### 3.3 Ehrlichkeitsregeln (bindend für jeden Trägerentwurf)

- **„Keine isolierten Scores — bis zu Ursachen, Datenquellen und Annahmen erklärbar"** (Dok. 09).
- **„Reifegrad darf nicht steigen, nur weil ein Risikoscore gesunken ist … jede Dimension braucht
  eigene Evidence"** ⇒ Reifegrad und Risiko-Level sind **getrennt** zu tragen (09-AC02: „getrennt
  speicher- und darstellbar"), nie voneinander abgeleitet.
- **08-D07 / DR-0008:** Lebenszyklus-Stand ist **kein** Prüfergebnis; eine Ampel braucht Drill-down.

## 4. Vorgeschlagener Träger — Optionen (Empfehlung klar als Empfehlung markiert, nicht vorentschieden)

Der Mechanismus ist bewusst **derselbe**, den CCP-003 K7-A für SLA/KPI vorschlägt — ein einziges
Muster für alle Bewertungsträger statt drei Erfindungen.

### T1 – Governed `tags_custom_fields`-Sub-Schema (EMPFOHLEN)

Ein **typisiertes, versioniertes Sub-Schema** unter `tags_custom_fields` (Mechanik: Dok. 07
Abschnitt „APIs, Events und Erweiterbarkeit", Zeilen „Schema Registry" / „Extension Pack" — governed,
mit Namensräumen, Tests, Kompatibilitätsprüfung), das für die Reifegrad- und Risiko-tragenden
F09-/F07-Objekte (z. B. `Target Profile`/`Objective`/`Capability`-nahe Objekte bzw.
`Risk`/`Risk Scenario`) zwei Feldgruppen definiert:

- **`maturity_assessment`** (Reifegrad): `capability_ref`, `scope_ref`, Facetten
  `{design, implementation, operation, effectiveness}` je **∈ [0,5]**, abgeleiteter/erfasster
  `value` **∈ [0,5]**, **`target_value` ∈ [0,5]** (Zielstufe je Capability), `is_incomplete`
  (fehlende Facette), plus **Pflicht-Herkunft**: `assessor`, `assessment_kind` (Self/moderiert/
  unabhängig/Audit/…), `assessed_at`, `valid_until`, `evidence_refs`, `rationale`,
  `criteria_version`, **`confidence`** (Band aus CCP-003 K2-A/K4-A bzw. Dok. 16 §18.2
  Low/Moderate/High/Assured).
- **`risk_level`** (Risiko-Level): `method` (`qualitative_5x5` | `semi_quant_0_100` — **eine**
  Primärmethode ausgewiesen), bei A: `likelihood ∈ [1,5]`, `impact ∈ [1,5]` (+ `impact_dimension`),
  bei B: `band` / `score ∈ [0,100]`; **`tolerance_state`** (`under` | `near` | `over` |
  `critical_breach` | `insufficient_confidence` → die Ampel-Ableitung); plus Pflicht-Herkunft:
  `assessed_at`, `evidence_refs`, `rationale`, **`confidence`**, ggf. `residual_vs_inherent`.

**Trade-offs.**
+ `.strict()` bleibt unangetastet; **keine DB-Migration erzwungen** (Feld existiert, wird nur
  typisiert); additiv; versioniert und testbar (Dok. 07 „Globale Akzeptanzkriterien":
  „Schema-Erweiterungen sind versioniert, testbar und ohne unkontrollierte Custom-Field-Erosion");
  identisches Muster wie CCP-003 K7-A → ein Governance-Konzept für alle Bewertungsträger.
+ Rücknahme = ein Commit (Refinement lockern), da rein additiv.
− Zwei Definitionsorte (Dok. 09 fachlich, Dok. 07 „Erweiterbarkeit" mechanisch) → Querverweis
  nötig, sonst Semantik-Drift.
− `tags_custom_fields` akzeptiert heute schon **beliebige** Werte; ohne die Typisierung erodiert
  der Vertrag genau wie P10 warnt — die governte Typisierung ist deshalb **notwendig**, nicht
  Kür.

### T2 – Neue Top-Level-Kernfelder auf `ObjectEnvelope`

Reifegrad-/Risiko-Felder direkt in den `.strict()`-Envelope aufnehmen.
+ Ein Definitionsort, maximal explizit.
− Widerspricht dem Muster „Erweiterungen laufen **ausschließlich** über `tags_custom_fields`"
  (Dok. 07 „Objektvertrag"); **jede** neue Bewertung würde den Kernvertrag aufblähen
  (Katalog-Erosion); harte Änderung an einem von 837 Tests referenzierten Schema.

### T3 – Eigene Assessment-Objekttypen (F09-artig)

Reifegrad/Risiko als **eigene Objekte** (`Maturity Assessment`, `Risk Rating`) mit Kanten zum
bewerteten Objekt.
+ Konzeptuell sauber (eine Reifeaussage ist laut Dok. 09 ohnehin ein reiches Objekt mit Assessor/
  Evidence/Gültigkeit); versionierbar wie jedes Objekt.
− **Neue Objekttypen im Vokabular** = größerer Contract-/Seed-/Test-Eingriff; verschiebt die
  Ampel-Ableitung in Kanten-Traversierung; für die **statische** Demo (WP-021 Nicht-Ziel „keine
  Aggregationslogik") überdimensioniert. Kandidat für die **spätere echte Bewertungslogik-WP**
  (nach vollständigem Dok-09-Gegenlesen), nicht für Slice 7.

### T0 – Status quo (Klartext in `description`)

+ Kein Aufwand.
− Ampeln bleiben Prosa, nicht maschinell/ableitbar, nicht per Wertebereich testbar; die fünf
  Firmen könnten **keine** unterschiedlichen, erfassten Reifegrad-/Risiko-Ampeln tragen — das WP-021-
  Kernziel scheitert (DR-0008 „was die Daten tragen").

**Empfehlung: T1** (governed Sub-Schema), mit **T3 als benannter späterer Aufwertungspfad** für die
echte Bewertungslogik. Begründung: minimal-disruptiv, `.strict()`-erhaltend, migrationsfrei,
identisch zum bereits vorgeschlagenen CCP-003-K7-A-Muster.

## 5. Auswirkungen und Abhängigkeiten (Cross-Document Impact Matrix)

| Artefakt | Stelle | Art der Änderung (erst nach Freigabe) |
|---|---|---|
| `@isms/contracts` | `object.ts` `tags_custom_fields` | governtes Sub-Schema `maturity_assessment` / `risk_level` **additiv** ergänzen; `.strict()` bleibt; bestehende Objekte ohne die Felder bleiben parsebar |
| `@isms/contracts` | `vocabularies.ts` | Enums `risk_method`, `tolerance_state`, `maturity_facet`, `assessment_kind`, Confidence-Band (mit CCP-003 K2-A/K4-A abgleichen — **kein** Zweitvokabular) |
| `@isms/contracts` | `PROVENANCE.md` | Herkunft der Skalen (Dok. 09 „Reifegradmodell"/„Risikobewertungsmethoden"/„Eskalationslogik") dokumentieren; Wertebereichs-Refinements ausweisen |
| `@isms/demo-seed` | fünf Firmengraphen (Slice 7) | synthetische Reifegrad-/Risiko-Werte je Firma **differenziert** setzen; jeder Wert mit Herkunft/Confidence; keine Stufe-5-Automatik; **eine** Risiko-Primärmethode je Firma |
| `@isms/demo-seed` | `seed.spec.ts` | **positive und negative** Wertebereichstests (`maturity ∈ [0,5]`, `likelihood/impact ∈ [1,5]`, `score ∈ [0,100]`, gültiger `tolerance_state`); Test „keine Bewertung ohne Herkunft/Confidence"; **Preis-** und **WP-017-Decision-Guardrail unverändert scharf** |
| `apps/web/lib/heute` / `lib/cockpit` | Ampel-Ableitung + Drill-down | **Konsum, nicht Teil dieses CCP:** mappt `tolerance_state`→Farbe und Reifegrad-Band→Farbe; zeigt **nur** Erfasstes, Drill-down in Begründung Pflicht (Folge-WP, O-WP021-04) |
| Dok. 09 | „Reifegradmodell" / „Risikobewertungsmethoden" / „Eskalationslogik" | Querverweis: fachliche Quelle der Trägerskalen |
| Dok. 08 | „ISMS-05 – Risikomanagement" → „Risikoszenario" | Querverweis: Szenario-Struktur (inhärent/Restrisiko) |
| Dok. 07 | „APIs, Events und Erweiterbarkeit" / „Objektvertrag" / „Globale Akzeptanzkriterien" | Querverweis: governter Erweiterungsmechanismus + Versionierungs-/Testbarkeitszusage |
| `docs/project/OPEN_QUESTIONS.md` | O-WP021-03, O-WP014-02, 09-O01 | Status gemäß Gate-Entscheid |

**Regel-Null-Befund zur Zitierung (nicht still bereinigt):** CCP-003 K7-A und der WP-021 Context
Pack zitieren den Erweiterungsmechanismus als **„Dok. 07 §18"**. In der quellentreuen
Markdown-Fassung (`07_…INFORMATIONSGRAPH_v1.0.md`, WP-019) trägt **§18** jedoch den Titel
**„End-to-End-Szenarien"**; der governte Mechanismus steht in **„APIs, Events und Erweiterbarkeit"**
(Markdown §17, Zeilen „Schema Registry"/„Extension Pack"), der `tags_custom_fields`-Governance-Satz
im **„Objektvertrag"** (§6.1) und die Versionierungs-/Testbarkeitszusage in **„Globale
Akzeptanzkriterien"** (§20). Das ist die von DR-0006 vorhergesagte Nummerierungs-Drift.
**Konsequenz:** Alle CCP-008-Belege sind nach **Abschnittstitel** zitiert; die exakte
PDF-Nummerierung ist vor Umsetzung zu bestätigen (§6, Punkt 4).

**Abhängigkeiten:** **CCP-002** (F09-/F07-Typen, an denen die Sub-Schemata hängen); **CCP-003**
(K7-A liefert das identische Mechanik-Muster; K2-A/K4-A liefern die Confidence-/Qualitätsbänder,
die CCP-008 **wiederverwendet** statt neu zu erfinden); **CCP-005** (Trust-State — orthogonaler
Träger). Die **echte Bewertungs-/Aggregationslogik** (Roll-up nach „Reifegradmodell", Risiko-
aggregation) bleibt eigenständig späteres WP (WP-021 Nicht-Ziel).

## 6. Regel-Null-Verifikationsliste (vor JEDER Umsetzung am PDF zu prüfen)

> Diese Session hat **nichts** am PDF verifiziert (Banner oben). Vor Slice 7 ist jede Zeile am
> **PDF-Original** gegenzulesen; zitiert wird der **Abschnittstitel**.

1. **Dok. 09 Reifegrad** (`python scripts/pdf_text.py 09 --suche "Reifegrad"`,
   `--suche "Referenzskala"`, `--suche "Bewertungsfacetten"`): Skala 0–5 (Bezeichnungen), die vier
   Facetten Design/Implementierung/Betrieb/Wirksamkeit, „Stufe 5 kein automatisches Ziel", Zielwert
   je Capability, Referenzberechnungsgewichte, „fehlende Facette nicht still 0".
2. **Dok. 09 Reifeaussage-Pflichtfelder** (`--suche "Evidence-Anforderungen"`): Capability, Scope,
   Facette, Wert, Begründung, Kriterienversion, Evidence-Links, Assessor, Datum, Gültigkeit,
   **Confidence** — bestätigen, dass Herkunft/Confidence Pflicht sind (deckt DR-0008).
3. **Dok. 09 Risiko** (`--suche "Risikobewertungsmethoden"`, `--suche "Eskalationslogik"`):
   Methode A (Likelihood/Impact 1–5, Impact-Dimensionen), Methode B (0–100, „keine
   Scheinpräzision"), „eine Primärmethode", Toleranzzustände Unter/Nahe/Über/Kritisch/Unzureichende
   Confidence → Ampel-Zuordnung.
4. **Dok. 07 Erweiterungsmechanismus** (`python scripts/pdf_text.py 07 --suche "tags_custom_fields"`,
   `--suche "Extension Pack"`, `--suche "Erweiterung"`): den governten `tags_custom_fields`-Satz und
   die Schema-Registry-/Extension-Pack-Governance am PDF verorten **und die tatsächliche
   PDF-Abschnittsnummer** festhalten (Klärung des „§18"-vs-Titel-Befunds aus §5).
5. **Dok. 08 Risikoszenario** (`python scripts/pdf_text.py 08 --suche "Risikoszenario"`):
   inhärentes/Restrisiko, Wirksamkeit, Bewertungszeitpunkt, Quellen — Szenario-Struktur bestätigen.
6. **Grundsatz-Check:** Bestätigen, dass das PDF **keinen** verdichteten Gesamt-Score als
   Pflichtfunktion verlangt (09-AC02 „getrennt speicher-/darstellbar"; „keine isolierten Scores")
   und dass Reifegrad **nicht** aus Risiko (oder umgekehrt) abgeleitet werden darf. Bei Abweichung:
   OFFENE FRAGE, nicht füllen (DR-0005).

## 7. Verhältnis zu CCP-003, CCP-005 und E-02 (keine Duplikation)

| Baustein | Deckt | CCP-008 |
|---|---|---|
| **CCP-003 K7-A** | KPI Zielwert/Ist/Trend + SLA — governtes Erweiterungsschema (Dok. 14 §8) | **verweist**; CCP-008 nutzt **dasselbe** Mechanik-Muster für Reifegrad/Risiko |
| **CCP-003 K2-A/K4-A** | Datenqualitäts-Ordinalskala + Vertrauensband [0,1] / Confidence-Bänder | **wiederverwendet** als `confidence`-Band der Träger — **kein** Zweitvokabular |
| **CCP-005** | Trust-/Confidence-Layer (Stufe 1 **ohne** Contract-Eingriff) | **orthogonal**; Trust-State bleibt CCP-005, Reifegrad/Risiko sind CCP-008 |
| **DR-0007 E-02** | Frist/Aufwand/Kapazität/Priorität für Decision Cards (Dok. 10/11) | **inhaltlich verschieden**, aber **gleiche Gate-Klasse**: „Contract-/Seed-Struktur-Erweiterung = Human Gate" (`ACTIVE_WORK_PACKAGE.md`, WP-021 „E-02-Kopplung"). CCP-008 trägt **keine** Fristen/Tasks |

**Konsolidierte Owner-Vorlage:** CCP-008 ist der **fehlende dritte Baustein** neben CCP-003 (KPI/SLA/
Confidence) und CCP-005 (Trust). Gemeinsam beantworten sie die eine WP-021-Slice-2-Frage: „Wie trägt
der Seed synthetische Bewertungen im Contract?" — als **eine** Owner-Entscheidung über **ein**
Muster (governtes `tags_custom_fields`-Sub-Schema).

## 8. Offene Fragen (bewusst nicht in diesem Proposal entschieden)

- **OF-1 (= O-WP021-03 / 09-O01):** Welche **eine** Risiko-Primärmethode ist die Demo-Standardmethode
  (A qualitative 5×5 vs. B semi-quantitativ 0–100)? Empfehlung **A** (verständlich, workshopfähig),
  final im Domain-Gate (Slice 7). Der Träger muss **beide** darstellen können, aber je Firma **eine**
  ausweisen.
- **OF-2:** Sollen Reifegrad und Risiko-Level am **bewerteten Objekt** (`tags_custom_fields`, T1)
  oder an **eigenen Assessment-Objekten** (T3) hängen? T1 für die statische Demo; T3 als späterer
  Aufwertungspfad — Owner/Domain entscheiden die Zielrichtung.
- **OF-3:** Welche `assessment_kind`-/`method`-Enums werden ausgeliefert (Teilmenge der Dok-09-Listen)
  und teilen sie das Casing/Vokabular mit CCP-001/CCP-003 (keine Vokabulardrift)?
- **OF-4 (= O-WP014-02):** Der verdichtete `confidence_indicator` bleibt **nicht** berechnet; der
  Träger führt **Bänder** (Low/Moderate/High/Assured), nicht einen erfundenen Gesamtscore.
- **OF-5 (= 09-O07):** Welche Standard-Toleranzkategorien/Eskalationsstufen liefert die Demo aus?
  CCP-008 nutzt vorerst die fünf `tolerance_state`-Zustände der „Eskalationslogik" 1:1.
- **OF-6:** Roll-up/Aggregation (Domänen-/Zielprofil-Verdichtung nach „Roll-up und Aggregation")
  ist **ausdrücklich nicht** Teil dieses CCP — späteres Bewertungslogik-WP.

## 9. Benötigte Owner-Entscheidung

1. **Freigabe (ja/nein/verschoben):** Reifegrad- und Risiko-Level-Träger als **governtes
   `tags_custom_fields`-Sub-Schema** (T1) für WP-021 Slice 7 einführen — additiv, `.strict()`-erhaltend,
   migrationsfrei? (Kopplung an CCP-003 K7-A/K2-A/K4-A und CCP-005 als **eine** Trägerschema-Runde.)
2. **Methode (OF-1):** Freigabe der Risiko-Primärmethode **A** als Demo-Standard (oder B), damit
   Slice 7 kein gemischtes Portfolio ohne Ausweis baut.
3. **Trägerort (OF-2):** T1 (Feld am Objekt) für die Demo bestätigen; T3 (eigene Assessment-Objekte)
   als späteren Pfad vormerken?

Ohne (1) bleibt **Slice 7 ungebaut** (WP-021 Stop Condition); die Firmen tragen bis dahin nur
belegte Ampeln (Slices 1/3–6).

## 10. Risiken und Rücknahmeplan

- **Erfindungsrisiko:** Die konkreten Enum-Werte/Feldnamen in §4 sind **Vorschläge**; sie werden
  erst durch das Human Gate + PDF-Gegenlesen (§6) zu Produktwahrheit. Ohne Freigabe bleibt
  `tags_custom_fields` ungetypt.
- **Doppelquellen-Risiko:** fachliche (Dok. 09) und mechanische (Dok. 07 „Erweiterbarkeit")
  Definition per Querverweis koppeln, sonst Semantik-Drift.
- **Vokabulardrift-Risiko:** Confidence-Band, `risk_method`, `tolerance_state` **mit CCP-003
  abstimmen** — nicht zweimal definieren.
- **Rücknahmeplan:** rein additiv → Refinement lockern = **ein Commit**; keine DB-Migration, da
  `tags_custom_fields` bereits existiert; Dokumentversionen archivieren statt löschen.

## 11. Freigaben

| Gate | Status |
|---|---|
| Regel-Null-PDF-Verifikation (§6) | **offen — Vorbedingung** |
| Concept Consistency Reviewer (Dok. 07/08/09, nachgelagert) | ausstehend |
| Security & Privacy Review (neue Träger, keine PII, Tenant-Isolation unberührt) | ausstehend |
| Human/Product Gate (**Owner** — E-02-Gate-Klasse) | **offen** |
