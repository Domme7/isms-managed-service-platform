# CCP-001 – Lifecycle-Vereinheitlichung (kanonische Liste und Casing)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-001 – Lifecycle-Vereinheitlichung (kanonische Liste und Casing) |
| Status | **Entwurf — Human Gate ausstehend** |
| Datum | 2026-07-22 |
| Autor (Rolle) | Concept Author (Prozess nach Dok. 21 §21) |
| Auslöser | WP-003 Slice 1 (Contract-Ableitung aus Dok. 07); Frage-IDs **O-D07-02**, **O-D07-03** (`docs/project/OPEN_QUESTIONS.md`) |
| Betroffene Dokumente | Dok. 07 v1.0 §7 (Zeile `lifecycle_status`), §8; Dok. 05 v1.0 §7 („Kanonische Zustände") |
| Betroffene Artefakte | `packages/contracts/src/vocabularies.ts` (`OBJECT_LIFECYCLE_STATUS`, `LIFECYCLE_BY_CLASS`, `ALL_LIFECYCLE_STATUS`), `packages/contracts/PROVENANCE.md` (Offene Fragen 2–4), `packages/demo-seed` (verwendete `lifecycle_status`-Werte, z. B. `aktiv`, `Review`, `konfiguriert`), `docs/project/OPEN_QUESTIONS.md` |

> **Keine Änderung aktiver Spezifikationen durch dieses Dokument; Umsetzung erst nach
> Freigabe (Human Gate) via Concept-Author-WP.**

---

## 1. Problem und Evidenz

Zwei unabhängige Reviews (Code + Concept Consistency, WP-003) haben zwei **materiale
Konzeptwidersprüche** im Lifecycle-Vokabular bestätigt. Beide Varianten werden bis zur
Entscheidung dual im Contract erhalten (keine stille Widerspruchsauflösung).

### 1.1 Widerspruch A – Kanonische Liste (O-D07-03)

- **Dok. 07 §7**, Feldtabelle, Zeile `lifecycle_status`, Spalte „Zweck":
  „Entwurf, aktiv, in Review, stillgelegt, archiviert" (**5 Werte, Kurzform**).
- **Dok. 07 §8** („Lebenszyklus und Status") definiert dediziert **8 Zustände** mit Semantik:
  „Entwurf, Beobachtet, Geprüft, Freigegeben, In Änderung, Überholt, Stillgelegt, Archiviert".
- Die Kurzform enthält „aktiv" und „in Review", die in §8 nicht existieren; §8 enthält
  „Beobachtet", „Geprüft", „Freigegeben", „In Änderung", „Überholt", die in der §7-Zeile fehlen.

### 1.2 Widerspruch B – Schreibweise/Casing (O-D07-02)

- **Dok. 07 §8** schreibt Zustände groß: „Geprüft", „Freigegeben", „Überholt".
- **Dok. 05 §7** schreibt dieselben Zustände klein: „Entwurf -> geprüft -> freigegeben ->
  überholt" (Information/Objekt); analog in den klassenspezifischen Lebenszyklen (Risiko,
  Control, Maßnahme, Evidence, Entscheidung, Service, Audit).

### 1.3 Folgen im Umsetzungsstand (Evidenz)

- `@isms/contracts` hält beide Varianten dual: `OBJECT_LIFECYCLE_STATUS` (8 Zustände, groß,
  aus Dok. 07 §8) und `LIFECYCLE_BY_CLASS` (aus Dok. 05 §7, klein); `ALL_LIFECYCLE_STATUS`
  ist die Union und enthält dadurch **Casing-Duplikate** (z. B. „Geprüft" und „geprüft").
- `@isms/demo-seed` verwendet Dok.-05-Servicezustände (`aktiv`, `Review`, `konfiguriert`).
- `packages/contracts/PROVENANCE.md`, Offene Fragen 2–4, dokumentiert den Zustand.

Ohne Entscheidung bleibt jede Status-Auswertung (Filter, Reports, Quality Gates) mehrdeutig
(„Geprüft" ≠ „geprüft" auf Datenebene) und der Concept Consistency Reviewer (Dok. 21 §22.2,
„uneinheitliche Statusmodelle") wird den Befund wiederholt melden.

## 2. Ziel

Ein einziges, dokumentübergreifend eindeutiges Lifecycle-Vokabular: eine kanonische
generische Zustandsliste, eine Casing-Konvention, ein geklärtes Verhältnis zwischen
generischem Lifecycle (Dok. 07 §8) und klassenspezifischen Lifecycles (Dok. 05 §7).

## 3. Optionen

### Kernfrage K1 – Welche Liste ist der kanonische generische Lifecycle? (O-D07-03)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K1-A** | **Dok.-07-§8-Langform (8 Zustände) ist kanonisch.** Die §7-Zeile `lifecycle_status` wird redaktionell zum Verweis auf §8 (keine eigene, abweichende Aufzählung mehr). | + §8 ist der dedizierte, definierende Abschnitt mit Semantik je Zustand. + „Freigegeben"/„Überholt" werden von 07-D06 (unveränderbare Versionen) und R24 `supersedes` vorausgesetzt; „Beobachtet" trägt die Import-Semantik (07-D05). + Deckungsgleich mit dem bereits umgesetzten Contract-Default. − §7 muss redaktionell angepasst werden. |
| K1-B | §7-Kurzform (5 Werte) ist kanonisch; §8 wird reduziert. | − Verliert „Beobachtet", „Freigegeben", „In Änderung", „Überholt" und widerspricht damit 07-D05/07-D06 sowie §21-Akzeptanzkriterien (Unterscheidung importiert/freigegeben, Stichtagsrekonstruktion). − Größerer Konzepteingriff als K1-A. |
| K1-C | Nichtstun (dual belassen). | − Dauerhafte Mehrdeutigkeit, Duplikate im Contract, wiederkehrende Review-Findings. + Kein Änderungsaufwand. |

### Kernfrage K2 – Welche Casing-Konvention gilt? (O-D07-02)

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K2-A** | **Jeder kanonische Statuswert beginnt mit Großbuchstaben** (Schreibweise Dok. 07 §8, z. B. „Geprüft", „In Arbeit"). Dok. 05 §7 wird redaktionell angepasst (`geprüft` → `Geprüft` usw.). | + Einfache, mechanisch prüfbare Regel. + §8 (definierende Quelle) bleibt unverändert; Contract-Kern (`OBJECT_LIFECYCLE_STATUS`) bleibt stabil. − Redaktionelle Anpassung in Dok. 05 §7 und Folgeanpassung in `LIFECYCLE_BY_CLASS` + Seed nötig. |
| K2-B | Natürliche deutsche Orthographie (Substantive groß, Partizipien/Adjektive klein — Stil Dok. 05); Dok. 07 §8 wird angepasst. | + Sprachlich „natürlicher" im Fließtext. − Konvention ist eine Regel statt eines Musters (fehleranfälliger in Enums/Vergleichen, z. B. „in Arbeit" vs. „In Änderung"). − Ändert die definierende Quelle §8. |
| K2-C | Maschinenwert (lowercase-Slug, z. B. `freigegeben`, `in_aenderung`) von Anzeigelabel trennen. | + Technisch sauberste Trennung Wert/Label, i18n-fähig. − Neues Übersetzungsartefakt; eher Architektur-/Implementierungsentscheidung (ADR, Dok. 18) als Konzeptfrage; kann später **zusätzlich** zu K2-A/B eingeführt werden, ersetzt die Konzeptentscheidung nicht. |

### Kernfrage K3 – Verhältnis generischer Lifecycle ↔ klassenspezifische Lifecycles

| Option | Beschreibung | Trade-offs |
|---|---|---|
| **K3-A** | Dok.-05-§7-Lifecycles bleiben als **typspezifische Ergänzungen** gültig (Regel Dok. 07 §7: „Typspezifische Status dürfen ergänzen, nicht widersprechen"); dies wird in Dok. 07 §8 mit einem Verweissatz explizit gemacht. | + Kein Bedeutungsverlust der Fachlifecycles (Risiko, Control, Service …). − Das Mapping (z. B. Service „aktiv" ↔ generisch „Freigegeben"?) bleibt zunächst undefiniert; siehe Offene Punkte. |
| K3-B | Klassenspezifische Lifecycles werden als Zustandsautomaten unterhalb der 8 generischen Zustände formal gemappt (jede Fachphase gehört zu genau einem §8-Zustand). | + Maximale Auswertbarkeit. − Materialer Mehrumfang; Mapping-Tabelle wäre eine neue Produktentscheidung und braucht ein eigenes Gate; nicht nötig, um O-D07-02/03 zu schließen. |

## 4. Empfehlung (klar als Empfehlung markiert, keine Entscheidung)

**Empfohlen: K1-A + K2-A + K3-A.**

1. Dok. 07 §8 (8 Zustände) ist die kanonische generische Lifecycle-Liste; die §7-Zeile
   `lifecycle_status` verweist auf §8 statt eine eigene Kurzliste zu führen.
2. Ein Casing: Jeder kanonische Statuswert beginnt mit Großbuchstaben (Schreibweise §8);
   Dok. 05 §7 wird entsprechend redaktionell angepasst.
3. Die klassenspezifischen Zustände aus Dok. 05 §7 bleiben als typspezifische Ergänzungen
   gültig; ein formales Mapping auf §8-Zustände wird **nicht** still eingeführt (separater,
   späterer Vorschlag, falls benötigt).

Begründung: minimalinvasiv, deckungsgleich mit den bereits im Contract als kanonisch
behandelten Werten, kompatibel mit 07-D05/07-D06/§21 und mechanisch validierbar.

## 5. Auswirkungen und Abhängigkeiten (Cross-Document Impact Matrix)

| Artefakt | Stelle | Art der Änderung (nach Freigabe) |
|---|---|---|
| Dok. 07 §7 | Zeile `lifecycle_status` | redaktionell: Kurzliste durch Verweis auf §8 ersetzen |
| Dok. 07 §8 | Einleitung | Klarstellungssatz: kanonische Liste + Verhältnis zu Dok. 05 §7 |
| Dok. 05 §7 | alle 8 Klassen-Lifecycles | Casing-Anpassung gemäß K2-A; inhaltlich unverändert |
| Dok. 05 §15 / Dok. 07 §26 | Änderungsprotokolle | Versionseintrag (v1.0 → v1.1), Vorgänger archivieren |
| `@isms/contracts` | `vocabularies.ts` | Konsolidierung: kanonische Werte gemäß K2-A; **Deprecation statt Bruch** — kleingeschriebene Duplikate bleiben in einem Übergangsfenster parsebar (z. B. `DEPRECATED_LIFECYCLE_ALIASES` + Normalisierungsfunktion), `ALL_LIFECYCLE_STATUS` wird dedupliziert |
| `@isms/contracts` | `PROVENANCE.md` | Offene Fragen 2–4 als entschieden markieren, Fundstellen aktualisieren |
| `@isms/demo-seed` | `managed-services.ts` u. a. | Statuswerte normalisieren (`aktiv` → gemäß Entscheid), `seed-manifest.json`/Tests nachziehen |
| `docs/project/OPEN_QUESTIONS.md` | Zeilen O-D07-02/03 | auf „gelöst (CCP-001)" setzen |

Abhängigkeiten: keine zu CCP-002; CCP-003 (Beziehungs-`status`, Kernfrage K2 dort) sollte
dieselbe Casing-Konvention übernehmen — bei gemeinsamer Freigabe konsistent entscheiden.

## 6. Validierung (nach Umsetzung)

- `packages/contracts`: `vocabularies.spec.ts`-Herkunftstests gegen die neuen Fundstellen;
  neuer Test „keine Casing-Duplikate in `ALL_LIFECYCLE_STATUS`".
- `packages/demo-seed`: `seed.spec.ts` (Schema-Validität, Manifest-Konsistenz) grün.
- Concept Consistency Review über Dok. 05 + Dok. 07 (Statusmodelle, Dok. 21 §22.2).
- Grep-Prüfung über `docs/concept/active/` auf abweichende Statusschreibweisen an
  normativen Stellen.

## 7. Risiken und Rücknahmeplan

- **Risiko Bedeutungsverschiebung:** „aktiv" (Dok. 05 Service) ist kein §8-Zustand; bei der
  Konsolidierung darf keine stillschweigende Gleichsetzung (z. B. mit „Freigegeben")
  erfolgen. Mitigation: K3-A hält Fachzustände explizit als Ergänzung.
- **Risiko redaktioneller Welleneffekt:** Dokumente 08–16 nutzen Statusbegriffe im Fließtext.
  Mitigation: nur normative Stellen (Listen/Tabellen) ändern; Fließtext folgt normaler
  Orthographie und ist nicht wertbildend.
- **Rücknahmeplan:** Deprecation-Aliase erlauben die Rückkehr zum Dualzustand ohne
  Datenverlust; Dokumentversionen werden archiviert, nicht gelöscht (`.claude/rules/docs.md`).

## 8. Offene Punkte (bewusst nicht Teil dieses Proposals)

- **Slash-Zustände** aus Dok. 05 §7 („akzeptiert/abgelehnt", „genehmigt/abgelehnt",
  „geändert/pausiert"): die Aufteilung in Einzelzustände (PROVENANCE, Offene Frage 4) ist
  eine reversible Modellierungsentscheidung; Bestätigung kann im selben Human Gate
  miterfolgen, wird hier aber nicht vorentschieden.
- Formales Mapping Fachlifecycle ↔ generischer Lifecycle (K3-B) — nur bei Bedarf.
- O-D07-09 (Kardinalitäts-/Zyklenregeln) bleibt unberührt.

## 9. Freigaben

| Gate | Status |
|---|---|
| Concept Consistency Reviewer | ausstehend |
| Human/Product Gate (Master-Index-Owner) | **ausstehend** |
