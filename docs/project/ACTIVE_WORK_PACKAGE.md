# Active Work Package

- **ID:** — (kein aktives Work Package)
- **Zuletzt abgeschlossen:** **WP-016 Mission Control „Heute"** (read-only, **ohne** Morning Mission)
  - Datei: `work-packages/WP-016_MISSION_CONTROL_HEUTE.md`
  - Context Pack: `context-packs/WP-016/CONTEXT_PACK.md`
  - Review-Notiz: `docs/project/reviews/WP-016_INDEPENDENT_REVIEW.md`
  - Ergebnis: `/heute` ist kein Platzhalter mehr; 343 Tests grün; Browser-QA dokumentiert
  - Offene Fragen: **O-WP016-01…08** · Findings: **FINDING-0005** (kein Linter im Stack)

## Nächster Schritt — Owner-Entscheidung sinnvoll, nicht blockierend

WP-016 hat eine harte Grenze sichtbar gemacht: der Seed trägt **keine Aufgaben und keine
Entscheidungen**, und der Objektvertrag kennt **keine Frist-/Aufwand-/Kapazitäts-/Prioritätsfelder**
(O-WP016-03, O-WP016-04). Das blockiert **Morning Mission und Decision Center gleichermaßen** —
also Dok. 10 als Ganzes.

1. **Seed-/Contract-Erweiterung um Aufgaben und Entscheidungen** — eigenes WP, Voraussetzung für
   WP-008. Berührt den Objektvertrag → Concept Author + vermutlich Human Gate.
2. **Executive-Welt** (Dok. 06 §10 / Dok. 10 §8) — weicht dem Problem vorerst aus, läuft aber in
   dieselbe Grenze, sobald verdichtete Entscheidungen gefordert sind.

Ein WP + Context Pack existiert für **beide** Wege noch nicht und muss vom `program-manager`
erstellt werden.

> Abgeschlossen: WP-001..004, 007, 011, 012, 013, 014, 015, **016**.
> Offene Human Gates (nicht blockierend): CCP-001..003, Docker-Engine-Start, FINDING-0004,
> O-WP014-09 (voller Seed im Client-Bundle) vor der DB→UI-Anbindung.
