# CCP-003 – Wertfelder und Skalen (Klassifikation, Datenqualität, Beziehungsattribute, SLA/KPI)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-003 – Wertfelder und Skalen |
| Status | **Entwurf — Human Gate ausstehend** |
| Datum | 2026-07-22 |
| Autor (Rolle) | Concept Author (Prozess nach Dok. 21 §21) |
| Auslöser | WP-003 Slice 1 (Contract-Ableitung) und WP-012 Slice 1 (Managed-Service-Seed); Frage-IDs **O-D07-01**, **O-D07-04**, **O-D07-05**, **O-D07-06**, **O-D07-07**, **O-D07-08**, **O-WP012-05** (`docs/project/OPEN_QUESTIONS.md`) |
| Betroffene Dokumente | Dok. 07 v1.0 §7 (`classification`, `scope_ids`), §9 (Status, Vertrauensgrad, Richtung), §12 (Qualitätsdimensionen), §18 (Erweiterungspakete), §24 (07-O05); Dok. 19 v1.0 §6.1 (Kanonische Klassen); Dok. 14 v1.0 §8.2–§8.4 (Messdimensionen, Prioritätsklassen, Service-Level-Bänder) |
| Betroffene Artefakte | `packages/contracts/src/common.ts` (`Classification`, `QualityDimensionAssessment`, `ScopeAssignment`), `packages/contracts/src/relationship.ts` (`status`, `confidence`, `direction`), `packages/contracts/src/vocabularies.ts`, `packages/contracts/PROVENANCE.md` (Offene Fragen 1, 5–9), `packages/demo-seed` (SLA-Werte derzeit als Klartext in `description`), `docs/project/OPEN_QUESTIONS.md` |

> **Keine Änderung aktiver Spezifikationen durch dieses Dokument; Umsetzung erst nach
> Freigabe (Human Gate) via Concept-Author-WP.**

---

## 1. Problem und Evidenz

Mehrere Wertfelder des kanonischen Objekt-/Beziehungsvertrags sind in Dok. 07 benannt, aber
ohne Werteskala. Der Contract hält sie bewusst wertoffen (keine erfundene Skala,
`packages/contracts/PROVENANCE.md`, Offene Fragen 1, 5–9). Ohne definierte Skalen sind
Filter, Quality Gates, Reports und der Vertrauensindikator (07-D10) nicht verlässlich
auswertbar.

| Frage | Evidenz (Fundstelle) | Status quo im Contract/Seed |
|---|---|---|
| O-D07-01 Klassifikationsskala | Dok. 07 §7 `classification`: „Vertraulichkeit und Schutzbedarf" — keine Stufen. **Dok. 19 §6.1 definiert inzwischen kanonische Klassen:** Public, Internal, Confidential, Highly Confidential, Restricted Evidence, Secret Material. Für **Schutzbedarf** existiert weiterhin keine Skala. | `classification` wertoffen (freie Strings) |
| O-D07-04 Qualitätsskalen | Dok. 07 §12: 7 Dimensionen; nur „Bestätigung" enumeriert („Ungeprüft, maschinell plausibilisiert, reviewed, freigegeben"); übrige 6 nennen nur „sichtbare Nachweise" | nur `confirmation_level` enumeriert |
| O-D07-05 Beziehungs-`status` | Dok. 07 §9 nennt „Status" ohne Werteliste | `status` optional/wertoffen |
| O-D07-06 Vertrauensgrad | Dok. 07 §9 „Vertrauensgrad"; §24 07-O05 offen (Dimensionen je Anwendungsfall) | `confidence` optionale Zahl ohne definierte Skala |
| O-D07-07 Richtung | Dok. 07 §9 „Richtung" ohne Werte | reversibler Default `{gerichtet, ungerichtet}`, Default `gerichtet` |
| O-D07-08 `scope_ids`-Form | Dok. 07 §7: Feldname suggeriert IDs, Regel verlangt „Mehrfachzuordnung mit expliziter Gültigkeit" | reversibel als `{scope_id, valid_time?}` modelliert |
| O-WP012-05 SLA-/KPI-Felder | Dok. 07 §7 kennt keine typisierten SLA-/KPI-Felder; Dok. 14 §8.2 (Messdimensionen), §8.3 (P1–P4), §8.4 (illustrative Service-Level-Bänder: Betriebszeit, Acknowledgement-Zeiten je Priorität) liefern die fachliche Struktur | SLA-/KPI-Werte als Klartext in `description` (Demo-Seed) |

## 2. Ziel

Für jedes wertoffene Feld ist festgelegt, **wo** die Skala normativ definiert wird
(Dok. 19, Dok. 07 §12, Dok. 07 §7/§18 oder Erweiterungsschema) und **welche** Werte gelten
— oder es ist bewusst dokumentiert, dass das Feld wertoffen bleibt.

## 3. Optionen und Empfehlungen je Kernfrage

Empfehlungen sind **klar als Empfehlung markiert**; keine Option ist vorentschieden.

### K1 – Klassifikationsskala (O-D07-01)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K1-A** | **Dok. 19 §6.1 ist die normative Quelle für `classification.confidentiality`** (Public … Secret Material); Dok. 07 §7 erhält einen normativen Verweis. Für `protection_need` (Schutzbedarf) wird **keine Skala erfunden**, sondern eine Folgefrage an Dok. 19/Security gestellt (z. B. Stufen wie normal/hoch/sehr hoch — nur als Beispielkandidat genannt). | + Keine Duplikation, keine Widerspruchsquelle; Dok. 19 existiert bereits. − Schutzbedarf bleibt vorerst offen (ehrlich dokumentiert). |
| K1-B | Eigene Skala in Dok. 07 §7 definieren. | − Zwei normative Quellen für dasselbe Vokabular; Widerspruchsrisiko mit Dok. 19 §6.1. |
| K1-C | Wertoffen belassen. | − Klassifikation „steuert Anzeige, Export, Retention und Zugriff" (§7) — ohne Skala nicht durchsetzbar. |

**Empfehlung: K1-A.**

### K2 – Skalen der Datenqualitätsdimensionen (O-D07-04)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K2-A** | **Eine gemeinsame, generische Ordinalskala für die 6 nicht enumerierten Dimensionen in Dok. 07 §12 definieren** (z. B. `unbewertet / unzureichend / ausreichend / gut` — Wertekandidaten, final im Gate), während „Bestätigung" ihre bestehende Spezialskala behält; „Zweckeignung" bleibt zusätzlich kontextabhängig geschwellt (§12: „Kontextabhängiger Mindestschwellenwert statt Universalampel"). | + Einheitlich auswertbar, minimale Erfindung (eine Skala statt sechs). + Kompatibel mit 07-D10 (Dimensionen bleiben einzeln sichtbar). − Generische Stufen sind je Dimension interpretationsbedürftig (durch „sichtbare Nachweise" je Dimension abzustützen). |
| K2-B | Je Dimension eine eigene Fachskala definieren (z. B. Aktualität über TTL-Bänder, Vollständigkeit über Pflichtfeldquote). | + Präziser. − Sechs neue Produktentscheidungen; teils messmethodische Festlegungen, die eher in Modul-/Regelkonfiguration gehören als in den Kernvertrag. |
| K2-C | Wertoffen belassen; nur „Bestätigung" bleibt enumeriert (Status quo formalisieren). | + Kein Eingriff. − Quality Gates und Twin-Health-Auswertungen bleiben unvergleichbar. |

**Empfehlung: K2-A** (Definition in **Dok. 07 §12**, nicht im Contract erfinden).

### K3 – Beziehungs-`status` (O-D07-05)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K3-A** | **Beziehungen verwenden die kanonischen Objektzustände aus Dok. 07 §8** (ggf. dokumentierte Teilmenge, z. B. ohne „Stillgelegt"). Begründung: Beziehungen sind laut 07-D04 „eigenständige, versionierte Datensätze" wie Objekte. | + Ein Statusvokabular für das ganze Modell; harmoniert mit CCP-001. − §8-Semantik ist objektbezogen formuliert; Teilmengen-Auswahl ist zu entscheiden. |
| K3-B | Eigene minimale Beziehungsliste (z. B. `vorgeschlagen / aktiv / beendet`), Review-/Freigabesemantik verbleibt in `assertion_kind` + Qualität. | + Schlank, überschneidungsfrei zu `assertion_kind`. − Zweites Statusvokabular; Abgrenzung zu `assertion_kind` („freigegeben" existiert dort bereits) muss sauber definiert werden. |
| K3-C | Wertoffen belassen. | − §21 verlangt für kritische Beziehungen „Vertrauensgrad und Reviewstatus" — ohne Skala nicht prüfbar. |

**Empfehlung: K3-A**, gemeinsam mit CCP-001 entscheiden (gleiche Casing-Konvention).

### K4 – Vertrauensgrad-Skala (O-D07-06)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K4-A** | **`confidence` als Zahl im Intervall [0,1] normieren und in Dok. 07 §9 dokumentierte Anzeige-Bänder definieren** (z. B. niedrig < 0,4 ≤ mittel < 0,7 ≤ hoch — Bandgrenzen final im Gate). | + Kein Bruch (Contract hat bereits eine Zahl); maschinell verrechenbar für den Vertrauensindikator (07-O05/07-D10). − Scheingenauigkeit möglich; Bänder müssen die Kommunikation dominieren. |
| K4-B | Reine Ordinalskala (`niedrig / mittel / hoch`) statt Zahl. | + Ehrlicher bei heuristischen Quellen. − Bruch mit bestehender Modellierung; Verdichtung/Propagation (§15) schwerer. |
| K4-C | Wertoffen belassen. | − §21: kritische Beziehungen müssen Vertrauensgrad zeigen; unvergleichbare Werte helfen nicht. |

**Empfehlung: K4-A.**

### K5 – Richtungs-Werteliste (O-D07-07)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K5-A** | **Reversiblen Default bestätigen:** `{gerichtet, ungerichtet}`, Default `gerichtet`; `related_to` (R25) als typischer ungerichteter Fall; Aufnahme in Dok. 07 §9. | + Bereits implementiert und getestet; minimal. − Richtung bleibt pro Kante wählbar, obwohl sie faktisch eine Typ-Eigenschaft ist. |
| K5-B | `direction` als Feld streichen; Richtung wird Eigenschaft des Beziehungstyps (R01–R24 gerichtet, R25 ungerichtet). | + Weniger Redundanz, keine widersprüchlichen Kanten. − Schema-Änderung (Feld entfernen = Bruch, nur mit Deprecation); §9 nennt „Richtung" als Kantenattribut. |
| K5-C | Erweiterte Liste (z. B. bidirektional). | − Kein Bedarf aus R01–R25 belegt; Erfindungsgefahr. |

**Empfehlung: K5-A** (K5-B als spätere Vereinfachung im Ideenparkplatz notieren).

### K6 – `scope_ids`-Form (O-D07-08)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K6-A** | **Struktur `{scope_id, valid_time?}` bestätigen** und Dok. 07 §7 redaktionell präzisieren (Regeltext nennt die Strukturform explizit). | + Entspricht wörtlich „Mehrfachzuordnung mit expliziter Gültigkeit"; bereits umgesetzt. − Feldname `scope_ids` bleibt leicht irreführend (Liste von Strukturen, nicht von IDs). |
| K6-B | Reine ID-Liste; Gültigkeit wird über eine Beziehung zum Scope-Objekt (z. B. R01/R19) mit `valid_time` abgebildet. | + Name und Inhalt deckungsgleich. − Verschiebt Pflichtinformation in Kanten; Objekt allein ist nicht mehr selbsterklärend; Migrationsaufwand. |

**Empfehlung: K6-A.**

### K7 – Typisierte SLA-/KPI-Felder (O-WP012-05)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K7-A** | **Kein Ausbau des generischen §7-Objektvertrags.** Stattdessen ein **governed Erweiterungsschema** (Mechanik: Dok. 07 §18 Erweiterungspakete / `tags_custom_fields` mit governed Schema) für die F09-Typen `SLA` und `KPI`; die fachliche Feldsemantik wird normativ aus **Dok. 14** abgeleitet: Service-Level-Band (§8.4), Betriebszeit, Acknowledgement-/Reaktionszeit je Prioritätsklasse P1–P4 (§8.3), Messdimension (§8.2), für KPI Zielwert/Schwelle/Einheit/Messmethode. Werte bleiben Designannahmen, keine Vertragszusagen (§8.4-Hinweis). | + Kernvertrag bleibt schlank; Erweiterung versioniert und testbar (§21: „Schema-Erweiterungen sind versioniert, testbar"). + Demo-Seed kann Klartext aus `description` in typisierte Felder überführen. − Zwei Definitionsorte (Dok. 14 fachlich, Dok. 07 §18 mechanisch) — Querverweise nötig. |
| K7-B | Dok. 07 §7 um typspezifische Feldgruppen für SLA/KPI erweitern (Kernvertrag wächst). | + Ein Definitionsort. − Widerspricht dem Muster „Governed Schema; keine unkontrollierte Freitextdatenbank" (§7) weniger modular; Präzedenz für weitere typspezifische Kernfelder (Katalog-Erosion). |
| K7-C | Status quo (Klartext in `description`). | + Kein Aufwand. − SLA-Überwachung, Service Health (Dok. 13 §13) und Reporting sind nicht maschinell auswertbar; Demo bleibt auf Prosa angewiesen. |

**Empfehlung: K7-A.**

## 4. Zusammenfassung der empfohlenen Definitionsorte

| Skala/Feld | Empfohlener normativer Ort |
|---|---|
| Vertraulichkeitsklassen | **Dok. 19 §6.1** (Verweis aus Dok. 07 §7) |
| Schutzbedarf | offen — Folgefrage an Dok. 19/Security (nicht erfinden) |
| Qualitätsdimensions-Skala | **Dok. 07 §12** |
| Beziehungs-`status` | **Dok. 07 §8/§9** (gemeinsam mit CCP-001) |
| Vertrauensgrad | **Dok. 07 §9** ([0,1] + Bänder) |
| Richtung | **Dok. 07 §9** (Default bestätigen) |
| `scope_ids`-Form | **Dok. 07 §7** (redaktionelle Präzisierung) |
| SLA-/KPI-Felder | **Erweiterungsschema nach Dok. 07 §18**, fachlich aus **Dok. 14 §8** |

## 5. Auswirkungen und Abhängigkeiten (Cross-Document Impact Matrix)

| Artefakt | Stelle | Art der Änderung (nach Freigabe) |
|---|---|---|
| Dok. 07 §7 | `classification`, `scope_ids` | normativer Verweis auf Dok. 19 §6.1; Strukturpräzisierung |
| Dok. 07 §9 | Status/Vertrauensgrad/Richtung | Wertelisten/Skalen ergänzen |
| Dok. 07 §12 | Qualitätsdimensionen | gemeinsame Ordinalskala ergänzen |
| Dok. 07 §18 | Erweiterungspakete | SLA/KPI-Erweiterungsschema als erstes governed Beispiel referenzieren |
| Dok. 14 §8 | Querverweis | Kennzeichnung als fachliche Quelle der SLA-Feldsemantik |
| Dok. 19 §6.1 | Querverweis | Kennzeichnung als normative Quelle der Vertraulichkeitsklassen; offene Schutzbedarfsfrage aufnehmen |
| `@isms/contracts` | `common.ts`, `relationship.ts`, `vocabularies.ts` | Enums/Refinements ergänzen — **additiv mit Deprecation-Fenster**, bestehende wertoffene Daten bleiben parsebar |
| `@isms/contracts` | `PROVENANCE.md` | Offene Fragen 1, 5–9 aktualisieren |
| `@isms/demo-seed` | Service-Schicht | SLA-/KPI-Klartext in typisierte Erweiterungsfelder überführen; Guardrail „keine Preise" bleibt |
| `docs/project/OPEN_QUESTIONS.md` | O-D07-01/04..08, O-WP012-05 | Status gemäß Gate-Entscheid |

Abhängigkeiten: **CCP-001** (Casing/Statusvokabular für K3); **CCP-002** (F09-Typen, an
denen das SLA/KPI-Schema hängt); Dok. 19/Security für Schutzbedarf; 07-O05 (Zusammensetzung
des Vertrauensindikators) bleibt eigenständig offen.

## 6. Validierung (nach Umsetzung)

- Contract-Tests: Enum-/Bereichs-Refinements (`confidence` ∈ [0,1], Klassifikationswerte,
  Qualitätsstufen) positiv und negativ; Provenance-Tests gegen neue Fundstellen.
- Seed-Tests: typisierte SLA-Felder parsen; Guardrail-Test „keine Währungs-/Preisangabe"
  bleibt grün; Manifest-Konsistenz.
- Concept Consistency Review über Dok. 07/14/19 (Dok. 21 §22.2: „abweichende KPI-Formeln",
  „uneinheitliche Statusmodelle").
- Stichprobe: eine Quality-Gate-Auswertung (z. B. „Risiken ohne wirksame Control", §16)
  gegen die neuen Skalen ausführbar.

## 7. Risiken und Rücknahmeplan

- **Erfindungsrisiko:** Wertekandidaten in K2-A/K4-A sind Vorschläge; sie werden erst durch
  das Human Gate zu Produktwahrheit. Ohne Freigabe bleibt alles wertoffen.
- **Doppelquellen-Risiko (K7-A):** fachliche (Dok. 14) und mechanische (Dok. 07 §18)
  Definition müssen per Querverweis gekoppelt werden, sonst driftet die Semantik.
- **Migrationsrisiko:** bestehende freie Strings (z. B. `classification`) können ungültig
  werden → Deprecation-Fenster mit Normalisierung statt hartem Bruch.
- **Rücknahmeplan:** alle Skalen werden additiv eingeführt (Refinement lockern = ein
  Commit); Dokumentversionen archivieren statt löschen.

## 8. Offene Punkte (bewusst nicht Teil dieses Proposals)

- **Schutzbedarfsskala** (Teil von O-D07-01): explizit offen, Owner Dok. 19/Security.
- **07-O05** (welche Dimensionen fließen je Anwendungsfall in den verdichteten
  Vertrauensindikator ein): bleibt offen; K4-A schafft nur die Eingangsskala.
- **O-D07-09** (Kardinalitäts-/Zyklenregeln), **O-D07-10** (objektseitiges
  `assertion_kind`), **O-D07-11** (`confirmation_level` je Dimension): verwandt, aber
  eigenständige spätere Klärungen.
- Konkrete SLA-Feldnamen/-typen des Erweiterungsschemas: erst im Umsetzungs-WP nach
  Freigabe von K7-A spezifizieren (mit eigenem Review).

## 9. Freigaben

| Gate | Status |
|---|---|
| Concept Consistency Reviewer | ausstehend |
| Security Review (K1, Schutzbedarf, Klassifikationswirkung auf Export/Retention) | ausstehend |
| Human/Product Gate | **ausstehend** |
