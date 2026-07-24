# Context Pack – WP-021 Demo-Welt: fünf reiche Dok-16-Firmen mit synthetischen Bewertungen

**Für:** `data-graph-engineer`/`concept-author` (Seed-Slices 1, 3–7) · `concept-author`
(Slice 2 CCP)
**WP-Definition (maßgeblich):** `work-packages/WP-021_DEMO_WELT_FUENF_FIRMEN.md`
**Stand der Quellen:** 2026-07-24 (Seed 1.2.0 · 43 Objekte/62 Beziehungen · 835 Tests grün ·
Dok. 08/09/16 quellentreu seit WP-023)

## 1. Auftrag in einem Absatz

Die Demo-Welt von den vier Dok-03/07-Firmen auf die **fünf Dok-16-Firmen** umstellen und je Firma
reich ausbauen (Branche, Reifegrad, Storyline, Deckungslücken, synthetische Bewertungen). **IDs
bleiben stabil** (`tenant_id` ist nicht identitätsstiftend) — nur Anzeigenamen/Inhalt ändern sich,
damit die **837 Tests** grün bleiben. **Flaggschiff Nordstern zuerst** (belegte Reichtum,
Slice 1), dann der Trägerschema-CCP als Human Gate (Slice 2), dann die vier weiteren Firmen
belegt (Slices 3–6), dann — **nur nach Freigabe** — die numerischen Bewertungen über alle fünf
(Slice 7). **Read-only, synthetisch, kein Auth/DB, keine Preise.**

## 2. Regel Null und steuernde Entscheidungen

- **Produktwahrheit sind die PDFs** (`docs/concept/pdf/`, DR-0006). Jede Firmen-Eigenschaft, jede
  Skala, jede Zahl vor Übernahme **im PDF** nachlesen; **Abschnittstitel zitieren**.
  Werkzeug: `PYTHONUTF8=1 python scripts/pdf_text.py 16 --suche "Demo-Unternehmen"` (analog 08/09).
  **Bash steht dem Planer nicht zur Verfügung** — dieser Context Pack ist aus dem
  Sitzungs-Volltext-Extrakt + den quellentreuen Markdown-Fassungen kuratiert; **der Builder liest
  jede übernommene Aussage am PDF gegen** (FINDING-0007-Lehre).
- **DR-0015** (`docs/decisions/DR-0015_owner_kursentscheidungen_20260724.md`): Nr. 4 = Dok.-16-
  Fünferliste (**löst O-WP006-01** zugunsten Dok. 16); 4. Runde = „Alle fünf Firmen reich +
  synthetische Bewertungen … Demo-Welt zuerst".
- **DR-0008** (`docs/decisions/DR-0008_ampeln_dashboards_erwuenscht.md`): Ampeln/Bewertungen
  **erwünscht**; die UI darf visualisieren, **was die Daten tragen**; **der Seed DARF synthetische
  Bewertungen tragen** (Risiko-Level, KPI, Zielwerte, Trust-States) — kein „Erfinden", sondern
  gefordert. Verboten bleibt: UI **errechnet/behauptet** eine Bewertung ohne Datenträger; Ampel
  ohne Drill-down; Lebenszyklus-Stand als Prüfergebnis (08-D07).
- **DR-0005:** Konzeptlücken benennen (O-WP021-xx), nie füllen. **`.claude/rules/demo-data.md`:**
  nur synthetisch, stabile IDs, Reset/Regeneration, dokumentierte Storyline.
- **Hartes Gate (nicht autonom):** Contract-/Seed-**Struktur**-Erweiterung (E-02) →
  Slice 7 wartet auf CCP-Freigabe.

## 3. Die fünf Firmen (Dok. 16 §34.1 „Demo-Unternehmen" — am PDF gegenlesen)

| # | Firma (Anzeigename wörtlich) | Profil laut §34.1 |
|---|---|---|
| 1 | **Nordstern Manufacturing SE** | europäischer Produzent, **Zielreife 3**, begrenzte interne Kapazität, **zwei Standorte**, **bevorstehender Kunden-Audit** |
| 2 | **AlpenCloud GmbH** | Cloud-Softwareanbieter, schnelles Wachstum, **Zertifizierungsziel**, hohe Automatisierungsbereitschaft |
| 3 | **Rheinbank Digital AG** | stark regulierter Finanzdienstleister, **mehrere Zielprofile**, hohe Nachweistiefe, **strikte Datenresidenz** |
| 4 | **MediNova Clinics Holding** | dezentrale Gesundheitsgruppe, **kritische Verfügbarkeit**, Lieferanten-/Standortkomplexität |
| 5 | **GreenGrid Energy Services** | **M&A-Szenario** mit neu erworbener Tochtergesellschaft und **getrenntem Discovery-Scope** |

§34.1 Schlusssatz: „Alle Personen, Preise, Risiken, Termine, Dokumente, Standorte und
Unternehmensdaten der Demo sind synthetisch." — **Dramaturgie-Kontext** (Dok. 16 §34.2, „Zwölf
verbindliche Demo-Szenen"): Account anlegen · Quickstart · Import/Mapping · Scope-Konflikt als
Decision Card · Strategie-DNA · drei Zielrouten vergleichen · Fast Baseline mit Confidence ·
Serviceempfehlung · Operational Readiness/blockierender Zugriff · Go-live/Hypercare · M&A-Event/
Route neu berechnen · Managed Service reduzieren/Handover. **WP-021 baut die DATENGRUNDLAGE je
Firma, nicht die 12 interaktiven Flows** (O-WP021-05).

## 4. Bewertungsvokabular (am PDF Dok. 08/09 verifizieren)

**Reifegrad — Dok. 09, Abschnitt „Kanonisches Reifegradmodell" (§5):**
- Referenzskala **0–5**: 0 Nicht vorhanden · 1 Initial · 2 Wiederholbar · 3 Definiert · 4
  Gesteuert · 5 Adaptiv. „Stufe 5 ist kein automatisches Ziel"; Zielwert 3–4 oft angemessen; die
  Strategie-DNA legt Zielstufen je Capability fest.
- Vier Facetten: **Design, Implementierung, Betrieb, Wirksamkeit** (09-D03).
- Referenzberechnung (transparent): `0,20×Design + 0,25×Implementierung + 0,20×Betrieb +
  0,35×Wirksamkeit`; fehlende Facette senkt Confidence, wird **nicht** still mit 0 bewertet.
- Reifeaussage enthält mind.: Capability, Scope, Facette, Wert, Begründung, Kriterienversion,
  Evidence-Links, Assessor, Datum, Gültigkeit, **Confidence** (§6.2).

**Risiko — Dok. 09, Abschnitt „Risikobewertungsmethoden" (§9) + „Risikobereitschaft,
Toleranzen und Eskalation" (§10):**
- **Methode A** qualitative **5×5-Matrix** (Likelihood×Impact je 1–5); Impact-Dimensionen:
  Finanzen, Betrieb, Regulierung, Personen, Reputation, Strategie. **Methode B** semi-quantitativ
  **0–100** (Bänder, keine Scheinpräzision). *Eine* Primärmethode je Kunde (O-WP021-03).
- Eskalations-/Toleranzzustände (§10.2) → **die natürliche Ampelabbildung**: **Unter Toleranz**
  (grün) · **Nahe Toleranz** (amber, Trendwarnung) · **Über Toleranz** (rot, Entscheidungspflicht)
  · **Kritische Überschreitung** (rot, sofortige Eskalation) · **Unzureichende Confidence** (keine
  Entwarnung — Datenlücke ist selbst Steuerungsthema).

**KPI/Ziel-Ist-Trend — Dok. 16 §33 „KPIs und Anti-KPIs" + Dok. 06 §19:** KPI zeigt „Ziel, Ist,
Trend, Vertrauensgrad und **nicht nur eine Prozentzahl**". Anti-KPIs (nicht als alleinige
Erfolgszahl): Anzahl Felder/Assets, **maximale Reifegradzahl**, Zahl verkaufter Services, Tempo
ohne Quality Gates.

**Confidence-Bänder — Dok. 16 §18.2:** **Low** (Annahmen/Selbstauskunft/veraltet) · **Moderate**
(mehrere Quellen, wesentliche Lücken) · **High** (aktuell, konsistent, bestätigt, Evidence) ·
**Assured** (unabhängig/methodisch vertieft; keine Garantie).

**Ehrlichkeitsregel (Dok. 09):** „Keine isolierten Scores — bis zu Ursachen, Datenquellen und
Annahmen erklärbar." „Reifegrad darf nicht steigen, nur weil ein Risikoscore gesunken ist" —
jede Dimension braucht **eigene** Evidence (§23). **08-D07:** Lebenszyklus-Stand ist kein
Prüfergebnis.

## 5. Contract-Landkarte: was existiert vs. was für Bewertungen fehlt

**`@isms/contracts` heute** (`packages/contracts/src/`):
- `object.ts` – `ObjectEnvelope` ist **`.strict()`** (weist unbekannte Top-Level-Felder ab).
  Felder: `object_id, tenant_id, object_type, display_name, description?, lifecycle_status,
  scope_ids, owner_ids, classification, source_refs, valid_time, record_time, version,
  quality_state, tags_custom_fields?`. **Erweiterungen laufen laut §7 ausschließlich über
  `tags_custom_fields` (governed schema).**
- `common.ts` – `quality_state.dimensions` (7 Dok-07-Dimensionen; nur „Bestätigung" hat eine
  Skala: `CONFIRMATION_LEVEL`), `quality_state.confidence_indicator?` (Zahl, **im Seed nicht
  gesetzt** — O-WP014-02, nicht berechnen); `classification` = freie Strings; `source_refs`,
  `valid_time`/`record_time` (Bitemporalität).
- `relationship.ts` – Kanten tragen `status?`, `confidence?` (Vertrauensgrad, im Twin-Explorer
  gezeigt), `direction`, `weight?`/`effectiveness_assumption?` (**nicht PDF-gedeckt**, CCP-004).
- `vocabularies.ts` – F01–F09 Objekttypen (u. a. `KPI, Target Profile, Objective, Decision
  Record, Review, Audit` in F09; `Risk, Risk Scenario` in F07), R01–R25, Lebenszyklen je Klasse.

**Was für synthetische Bewertungen als erfasstes Feld FEHLT:**

| Bewertung | Träger heute? | Coupling |
|---|---|---|
| **KPI Zielwert/Ist/Trend, SLA-Felder** | nein (Klartext in `description`) | **CCP-003 K7-A** (governed Erweiterungsschema, Dok. 07 §18) — Entwurf, Gate offen |
| **Datenqualitäts-/Confidence-Skalen** | nur `confirmation_level` | **CCP-003 K2-A/K4-A** — Gate offen |
| **Trust-State (verdichtet)** | belegte Träger (Qualität/Herkunft/Kanten-Confidence) | **CCP-005** (Stufe 1 **ohne** Contract-Eingriff) — Draft, Gate offen |
| **Reifegrad 0–5 + Facetten + Zielwert** | **nein** | **CCP-008 NEU** (Slice 2) — Dok. 09 §5 |
| **Risiko-Level (5×5 / 0–100 + Toleranzzustand)** | **nein** | **CCP-008 NEU** (Slice 2) — Dok. 09 §9/§10 |

**Minimal-disruptive Empfehlung (Slice 2, nicht entscheiden — vorschlagen):** ein **governed
Erweiterungsschema** über `tags_custom_fields` (Mechanik Dok. 07 §18), wie CCP-003 K7-A es für
SLA/KPI schon vorschlägt — `.strict()` bleibt, keine DB-Migration erzwungen, additiv,
versioniert/testbar. Alternativen (Top-Level-Kernfelder; eigene Assessment-Objekttypen) mit
Trade-offs benennen. **Hinweis:** technisch akzeptiert `tags_custom_fields` heute schon beliebige
Werte — genau deshalb braucht es die **governed** Typisierung, sonst erodiert der Vertrag still
(P10). **Kein Bau ohne Gate.**

## 6. Code-Landkarte des Seeds (Ist-Zustand `packages/demo-seed/src/`)

| Datei | Inhalt | WP-021-Relevanz |
|---|---|---|
| `tenants.ts` | `TENANT_ID` (4 Konstanten) + `DEMO_TENANTS` (display_name/industry/description/has_object_graph) | **Slice 1/3–6**: Anzeige umbenennen (IDs stabil), 2 neue Mandanten, `has_object_graph` gefüllter Slots → `true` |
| `nordwerk-graph.ts` | reicher Flaggschiff-Graph (17/15 Kern) via `makeObject`-Helper | **Slice 1**: additiv anreichern; bestehende IDs unverändert |
| `managed-services.ts` | Serviceschicht Nordwerk + Consulting Operator (F09) | Provider bleibt; nicht brechen |
| `decisions.ts` | 3 Decision Records (nur Nordwerk) + `NORDWERK_DECISION_OBJECT_ID` | unverändert; Guardrail scharf |
| `seed.ts` | `DEMO_SEED = { tenants, objects, relationships }`, `SEED_VERSION` | Version anheben (z. B. 1.3.0) |
| `integrity.ts` | `findCrossTenantRelationships`, `findDangling…`, `findDuplicateIds`, `findUnresolvedOwnerRefs` | **nicht ändern** — die Isolationsbeweise |
| `seed-facts.ts` | react-freie Faktenableitung | regenerieren |
| `seed.spec.ts` | **hart kodierte Zählungen + Negativbeweise** | **Zählungen aktualisieren, Beweise erhalten** (s. §7) |
| `index.ts` | Public API | ggf. neue Exports |
| `../seed-manifest.json` | generiert | `python scripts/update_manifest.py` |

**Web-Default-Mandant (Slice 1, minimaler UI-Touch):**
`apps/web/components/shell/LoginForm.tsx` nimmt `defaultTenantId` (State-Init `useState(defaultTenantId)`,
Fallback `tenants[0]`). Den Default auf das Flaggschiff (`tenant-nordwerk`) setzen bzw. bestätigen,
damit die (WP-020-)Dashboard-Schicht sofort belegte Ampeln zeigt. Post-Login-Mandant kommt aus
der Session (`apps/web/lib/shell/session.ts`).

## 7. Test-Impact im Detail (Grün-Halten)

**Symbole/Strings NICHT ändern** → die ~837 Referenzen auf `TENANT_ID.NORDWERK`/`tenant-nordwerk`
u. a. bleiben grün. Konkret zu aktualisieren (wahrheitsgemäß, nie abschwächen):

- `seed.spec.ts` „Objekte verteilen sich exakt …": `toHaveLength(34)`/`(51)` → neue
  Flaggschiff-Werte; `FINOVIA/MEDICORE toEqual([])` → jetzt gefüllt (Rheinbank/MediNova);
  neue Mandanten (AlpenCloud/GreenGrid) mit ihren Counts ergänzen.
- „genau vier Demo-Mandanten" `tenants.toHaveLength(4)` → **6** (5 Kunden + Provider) bzw. der
  final entschiedene Wert (O-WP021-02).
- „ausmodelliert sind Nordwerk und Consulting Operator …" `withGraph.toEqual([...])` → alle
  gefüllten Mandanten.
- „mehrere Mandanten tragen Managed Services" 3/2 → nur anpassen, falls neue Firmen Services
  tragen (sonst unverändert).
- **Unverändert erhalten:** Duplikat-Detektor-Negativbeweis, Cross-Tenant-Negativbeweis,
  Dangling-Negativbeweis, Owner-Ref-Negativbeweis, Bitemporalitäts-Invariante, Preis-Guardrail,
  WP-017-Decision-Guardrail, Manifest-Konsistenz (recomputet aus dem Seed).
- `packages/db`: `seed-loader.spec.ts`/`tenant-isolation.spec.ts`/`roundtrip.spec.ts` laden
  `DEMO_SEED` → frisch laufen; neue Objekte müssen parsen + isoliert bleiben.
- **Slice 7:** neue Contract-Refinements mit **positiven und negativen** Wertebereichstests
  (z. B. Reifegrad ∈ [0,5], Risiko-Band gültig; out-of-range wird abgewiesen).

## 8. Ehrlichkeits- und Gestaltungsregeln (kompakt)

1. Jede Firmen-Eigenschaft/Skala am **PDF** (Dok. 16 §34.1, Dok. 08/09) — Abschnittstitel zitieren.
2. Nur synthetisch; stabile IDs; keine Preise/Währung; keine realen Firmen/Personen/Prozesse.
3. Belegte Ampeln (Slice 1/3–6): Lebenszyklus-Verteilung, Abdeckungen „x von y", Kanten-Confidence,
   Datenqualitäts-Dimensionen — **ohne** neuen Träger, über die WP-020-Dashboard-Schicht.
4. Deckungslücken bewusst setzen, damit Ampeln **unterschiedlich** ausschlagen (nicht alles grün).
5. Dok.-07-Demo-Graph-Pflicht je Tenant: ≥ 1 Konflikt, 1 veraltete Quelle, 1 erklärbarer
   Trust-State — über belegte Felder.
6. Gatete Bewertungen (Slice 7): jeder Wert trägt Herkunft + Confidence; **UI erfindet/errechnet
   nichts**; Drill-down in die Begründung ist Pflicht der (Folge-)UI.
7. „Reifegrad ≠ Prüfergebnis", „keine isolierten Scores", Stufe 5 nie automatisch.
8. Manifest/Facts regenerieren (nie abschreiben — Lektion 6); Zahlen aus dem Seed ableiten.
9. Getrennte Commits je Slice; der Builder committet nie selbst.

## 9. Relevante offene Fragen / Findings (referenzieren, nicht neu lösen)

- **O-WP006-01** (Dok. 03 vier vs. Dok. 16 fünf Firmen) → **durch DR-0015 Nr. 4 zugunsten
  Dok. 16 gelöst**; WP-021 setzt es um.
- **O-KUNDE-01 / O-WP006-05** (Preis-Guardrail) → in WP-021 **nicht** anfassen (keine Preise).
- **O-WP014-02** (`confidence_indicator` nicht gesetzt) → in Slice 1–6 nicht berechnen.
- **O-WP020-06 / CCP-005 OF-2** (Trust-Layer-Verdichtung) → Slice 7/CCP-005.
- **E-02** (Task/Frist/Kapazität) → separat; WP-021 baut **keine** Decision Cards/Fristen.
- **FINDING-0004** (kein DB→UI), **FINDING-0007/Regel Null** (am PDF gegenlesen).

## 10. Kommandos

```bash
pnpm install
pnpm --filter @isms/demo-seed exec vitest run      # Seed-Tests frisch
pnpm --filter @isms/db exec vitest run             # DB lädt den Seed
pnpm --filter @isms/web exec vitest run            # 837-Referenzen grün?
pnpm lint && pnpm typecheck && pnpm build
python scripts/seed_facts.py                       # kanonische Seed-Zahlen (nachrechnen)
python scripts/update_manifest.py                  # Manifest regenerieren
python scripts/validate_handoff.py
python scripts/treue_check.py                      # Konzepttreue
PYTHONUTF8=1 python scripts/pdf_text.py 16 --suche "Demo-Unternehmen"   # Regel Null
PYTHONUTF8=1 python scripts/pdf_text.py 09 --suche "Reifegradmodell"
PYTHONUTF8=1 python scripts/pdf_text.py 09 --suche "Risikobewertungsmethoden"
pnpm qa:visual WP-021                              # Screenshots + axe → docs/project/visual/WP-021/
```

**Nie:** `pnpm build` bei laufendem Dev-Server (Lektion 10; qa:visual nutzt `.next-qa`/Port 3100).
**Immer:** IDs stabil lassen; Negativbeweise erhalten; Slice 7 nur nach CCP-Freigabe.
