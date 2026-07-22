# Provenance – `@isms/contracts` (WP-003, Slice 1)

Dieses Dokument führt **jedes** Vertragselement (Feld, Enum, Beziehungstyp) auf seine konkrete
Fundstelle zurück. Führende Quelle ist Dokument 07; Lifecycle je Objektklasse stammt aus Dokument 05.

- **Dok. 07** = `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md`
- **Dok. 05** = `docs/concept/active/05_PRODUKTLANDKARTE_FUNKTIONSUMFANG_v1.0.md`

Grundregel: Nichts erfunden. Werte sind wörtlich übernommen. Wo Dok. 07 etwas nicht festlegt,
ist es im Code als `OFFENE FRAGE` markiert und unten unter „Offene Fragen“ gelistet.

---

## 1. Objekt-Envelope (`src/object.ts`, `ObjectEnvelope`)

Quelle: **Dok. 07, Abschnitt 7** („Objektvertrag und Identität“, Feldtabelle), plus §8 (Lifecycle),
§11 (Zeitmodell), §12 (Datenqualität).

| Feld | Herkunft (Dok. 07) | Semantik laut Quelle |
|---|---|---|
| `object_id` | §7 Zeile `object_id`; P02 | Unveränderliche, global eindeutige ID; nie aus Namen/externen IDs ableiten. |
| `tenant_id` | §7 Zeile `tenant_id`; P09; D11; §17 | Primäre Mandantenzuordnung; Pflichtfeld; keine Cross-Tenant-Beziehung außer Plattformreferenz. |
| `object_type` | §7 Zeile `object_type`; §6 Katalog | Kanonischer Typ aus Objektkatalog F01–F09. |
| `display_name` | §7 Zeile `display_name` | Nutzerverständlicher Name; änderbar, nicht identitätsstiftend. |
| `description` | §7 Zeile `description` | Optional; für kritische Objekte empfohlen. |
| `lifecycle_status` | §7 Zeile `lifecycle_status`; §8; Dok. 05 §7 | Kanonischer Zustand; typspezifische Status dürfen ergänzen. |
| `scope_ids` | §7 Zeile `scope_ids` | Geltende ISMS-/Service-/Audit-Scopes; Mehrfachzuordnung mit expliziter Gültigkeit. |
| `owner_ids` | §7 Zeile `owner_ids`; P11 | Fachlicher/technischer Owner; Rolle und Gültigkeit getrennt gespeichert. |
| `classification` | §7 Zeile `classification` | Vertraulichkeit und Schutzbedarf; steuert Anzeige/Export/Retention/Zugriff. |
| `source_refs` | §7 Zeile `source_refs`; §12 „Herkunft“ | Quellsystem/Import/Datei/Nutzer; mehrere Quellen mit Priorität möglich. |
| `valid_time` | §7 Zeile `valid_time`; §11; D07 | Fachlich gültig von/bis (bitemporal). |
| `record_time` | §7 Zeile `record_time`; §11; D07 | Im System erfasst/ersetzt am (bitemporal). |
| `version` | §7 Zeile `version`; D06 | Version des fachlichen Zustands; Freigaben erzeugen unveränderbare Versionen. |
| `quality_state` | §7 Zeile `quality_state`; §12; D10 | Datenqualität als Dimensionen statt Gesamtampel. |
| `tags_custom_fields` | §7 Zeile `tags_custom_fields`; P10; §18 | Konfigurierbare Erweiterungen (governed schema). |

`.strict()` (Ablehnung unbekannter Top-Level-Felder) folgt aus P10 („Erweiterbar ohne Schema-Chaos“)
und §21 („ohne unkontrollierte Custom-Field-Erosion“).

## 2. Geteilte Wert-Schemas (`src/common.ts`)

| Schema | Herkunft (Dok. 07) |
|---|---|
| `IsoDateTime` | §11 (Zeitpunkte). |
| `ValidTime {from,to?}` | §7 `valid_time` („Fachlich gültig von/bis“); §11. |
| `RecordTime {recorded_at,replaced_at?}` | §7 `record_time` („Im System erfasst/ersetzt am“); §11. |
| `ScopeAssignment {scope_id,valid_time?}` | §7 `scope_ids` („Mehrfachzuordnung mit expliziter Gültigkeit“). |
| `OwnerRef {owner_id,owner_kind,role?,valid_time?}` | §7 `owner_ids` („Fachlicher und ggf. technischer Owner; Rolle und Gültigkeitszeitraum getrennt“). |
| `SourceRef {source_kind,reference,priority?}` | §7 `source_refs`; §12 „Herkunft“. |
| `Classification {confidentiality?,protection_need?}` | §7 `classification` („Vertraulichkeit und Schutzbedarf“). |
| `QualityDimensionAssessment {dimension,confirmation_level?,note?}` | §12 (Dimensionen; „Bestätigung“-Skala). |
| `QualityState {dimensions,confidence_indicator?}` | §7 `quality_state`; §12; D10 (verdichteter Indikator ersetzt Dimensionen nicht). |

Strukturelle Zusätze mit Begründung (kein erfundener Inhalt):
- `SourceRef.reference` – eine Quelle braucht eine Kennung; das Feld `source_refs` referenziert per
  Definition eine Quelle (§7/§12). Werteliste offen.

## 3. Vokabulare (`src/vocabularies.ts`)

| Vokabular | Herkunft (Dok. 07 / Dok. 05) |
|---|---|
| `OBJECT_FAMILY_ID` F01–F09 + `OBJECT_FAMILIES` (Name, Leitfrage, Typen) | Dok. 07 §6 Tabelle. |
| `OBJECT_TYPES_F01..F09` / `OBJECT_TYPE` | Dok. 07 §6 Spalte „Kernobjekte“ (wörtlich). |
| `OBJECT_LIFECYCLE_STATUS` (8 Zustände) | Dok. 07 §8. |
| `LIFECYCLE_BY_CLASS` (object_information/risk/control/measure/evidence/decision/service/audit) | Dok. 05 §7 „Kanonische Zustände“. |
| `ALL_LIFECYCLE_STATUS` | Union aus §8 + Dok. 05 §7 (Dok. 07 §7: „Typspezifische Status dürfen ergänzen“). |
| `DATA_QUALITY_DIMENSION` (7) | Dok. 07 §12 Tabelle. |
| `CONFIRMATION_LEVEL` (4) | Dok. 07 §12, Zeile „Bestätigung“ („Ungeprüft, maschinell plausibilisiert, reviewed, freigegeben“). |
| `ASSERTION_KIND` (4) | Dok. 07 §9 („assertiert, importiert, abgeleitet oder freigegeben“); P05; D05. |
| `SOURCE_KIND` (8) | Dok. 07 §7 + §12 „Herkunft“. |
| `OWNER_KIND` (fachlich/technisch) | Dok. 07 §7 („Fachlicher und ggf. technischer Owner“). |
| `RELATIONSHIP_TYPES` R01–R25 + `RELATIONSHIP_TYPE` | Dok. 07 §9 Tabelle (Typ, Beispiel, Regel wörtlich). |
| `RELATIONSHIP_DIRECTION` (gerichtet/ungerichtet) | §9 nennt „Richtung“; Werteliste nicht spezifiziert (OFFENE FRAGE). |

### Beziehungstypen R01–R25 (Dok. 07 §9)

R01 `part_of`, R02 `located_at`, R03 `owns`, R04 `operates`, R05 `supports`, R06 `depends_on`,
R07 `processes`, R08 `exposes`, R09 `threatens`, R10 `affects`, R11 `caused_by`, R12 `mitigates`,
R13 `implements`, R14 `satisfies`, R15 `evidences`, R16 `tests`, R17 `finds`, R18 `remediates`,
R19 `requires`, R20 `contributes_to`, R21 `delivered_by`, R22 `covered_by`, R23 `decided_in`,
R24 `supersedes`, R25 `related_to`.

## 4. Beziehungs-Envelope (`src/relationship.ts`, `RelationshipEnvelope`)

Quelle: **Dok. 07, Abschnitt 9** (Beziehungen als eigenständige Datensätze), P03, D04, D05.

| Feld | Herkunft (Dok. 07) |
|---|---|
| `relationship_id` | §9 „eigenständige Datensätze“; D04 „eigenständige, versionierte Datensätze“ (ID strukturell impliziert). |
| `tenant_id` | P09; D11; §17. |
| `relationship_type` | §9 kanonischer Typ (R01–R25). |
| `source_id` / `target_id` | §9 „Quelle, Ziel“. |
| `direction` | §9 „Richtung“ (Werteliste offen – OFFENE FRAGE). |
| `valid_time` | §9 „fachliche Gültigkeit“; §11. |
| `record_time` | §9 „Erfassungszeit“; §11. |
| `assertion_kind` | §9 „assertiert/importiert/abgeleitet/freigegeben“; D05. |
| `status` | §9 „Status“ (Werteliste offen – OFFENE FRAGE). |
| `source_refs` | §9 „Quelle“ (Datenherkunft). |
| `confidence` | §9 „Vertrauensgrad“ (Skala offen – OFFENE FRAGE). |
| `owner_ids` | §9 „Owner“. |
| `weight` | §9 „optional Gewicht“. |
| `effectiveness_assumption` | §9 „optional ... Wirksamkeitsannahme“. |
| `version` | D04 „versionierte Datensätze“. |
| `tags_custom_fields` | P10; §18 (governed schema). |

---

## Offene Fragen (nicht geraten, im Code als `OFFENE FRAGE` markiert)

1. **Klassifikationsskala.** Dok. 07 §7 nennt nur „Vertraulichkeit und Schutzbedarf“, keine Stufen.
   Konkrete Skala wird in Dok. 19 erwartet. → `classification` bleibt wertoffen (Strings).
2. **Lifecycle-Casing.** Dok. 07 §8 („Geprüft/Freigegeben/Überholt“, groß) vs. Dok. 05 §7
   („geprüft/freigegeben/überholt“, klein). Beide Schreibweisen bewusst erhalten; kanonischer
   Casing-Entscheid steht aus.
3. **Lifecycle §7 vs. §8.** Die Feldtabelle §7 nennt die Kurzform „Entwurf, aktiv, in Review,
   stillgelegt, archiviert“, §8 die 8 kanonischen Zustände. §8 wird als kanonisch behandelt.
4. **Slash-Zustände (Dok. 05 §7).** „akzeptiert/abgelehnt“, „genehmigt/abgelehnt“,
   „geändert/pausiert“ wurden je in zwei Einzelzustände aufgeteilt.
5. **Datenqualitäts-Skalen.** Nur „Bestätigung“ hat in §12 eine explizite Werteskala; die übrigen
   6 Dimensionen bleiben wertoffen (keine erfundene Skala).
6. **Beziehungs-Status.** §9 nennt „Status“, ohne Werte zu enumerieren → wertoffen.
7. **Vertrauensgrad-Skala.** §9 nennt „Vertrauensgrad“, ohne Skala → optionale Zahl, Skala offen
   (vgl. §24 07-O05).
8. **Richtungs-Werteliste.** §9 nennt „Richtung“, ohne Werte → Modellierungsentscheidung
   {gerichtet, ungerichtet}, Default „gerichtet“.
9. **scope_ids-Form.** Feldname suggeriert reine IDs, §7 verlangt zugleich „explizite Gültigkeit“ →
   modelliert als `{scope_id, valid_time?}`.
10. **Kardinalität/Zyklenregeln je Beziehungstyp** (§24 07-O02) sind nicht Teil von Slice 1 und
    hier bewusst nicht als Constraints erzwungen.
