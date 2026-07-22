# Context Pack – WP-015 Visual Design Uplift

## Ziel
Mehr Erlebnisqualität („etwas futuristischer, mehr Wow — nicht viel") bei **unveränderter** Substanz:
gleiche Inhalte, gleiche Zustände, gleiche Ehrlichkeit, gleiche oder bessere Accessibility.

## Verbindliche Leitplanken
- **Rein visuelle Schicht.** Keine Texte, Daten, Logik, Routen oder Tests inhaltlich ändern — die
  77 bestehenden Web-Tests sind der Beweis (müssen unverändert grün bleiben).
- **Dok. 06 bleibt Grundlage:** Designprinzipien (Entscheidung vor Navigation, Klartext, progressive
  Offenlegung, **keine Dark Patterns**), Farbrolle Navy = Struktur / Teal = aktiv (§18),
  **06-D11: Status nie nur über Farbe** — Chips behalten immer Text.
- **Dok. 12 D-023:** Executive-/Audit-taugliche Anmutung; kein Humor-/Meme-Stil, keine Verspieltheit.
- **`.claude/rules/frontend.md`:** Accessibility ist Teil von Done — Kontrast ≥ AA, sichtbarer Fokus,
  responsive Kernwege; `prefers-reduced-motion` respektieren.
- Keine neue schwere Abhängigkeit; eigenes CSS bleibt die Basis (bisher bewusst frameworkfrei).

## Bestand (Ausgangslage)
- `apps/web/app/globals.css` — bestehende `tw-*`/`sv-*`/`shell-*`-Klassen, Fokus-Stile, responsives Grid.
- Shell: `components/shell/{AppShell,Topbar,ShellNav,LoginForm}.tsx` (Demo-Banner/Badge bleiben inhaltlich unverändert).
- Inhaltsflächen: `components/twin/*`, `components/services/*`, `components/isms/*` (Karten, Item-Listen,
  `<details>`-Disclosures, Empty-States).

## Umsetzungshinweise (reversibel)
- Token-First: CSS-Custom-Properties für Farbe/Elevation/Radius/Spacing/Typo, dann Komponenten darauf umstellen.
- Wirkung bevorzugt über: Typo-Hierarchie, Weißraum-Rhythmus, feine Layer/Verläufe, akzentuierte
  aktive/fokussierte Zustände, ruhige Schatten. Sparsam mit Glow/Blur (Performance + Lesbarkeit).
- Dark Mode nur, wenn Kontrast überall sicher AA erreicht — sonst weglassen und als Folge-WP notieren.

## Nicht im Context Pack
- Inhaltliche UX-Fragen (Wording, Zustände, Datenlücken) — die sind in WP-011..013 entschieden.
- Neue Seiten/Funktionen, Charts/Visualisierungen, Icon-Bibliotheken.
