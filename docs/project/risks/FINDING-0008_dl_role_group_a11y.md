# FINDING-0008 – `<dl role="group">` entfernt die Listensemantik (3× serious, axe-gemessen)

- **Severity:** Medium (Barrierefreiheit; WCAG 1.3.1, Level A)
- **Status:** Offen — Korrektur als Folge-WP mit Product Gate, **nicht** still fixen
- **Gefunden:** 2026-07-23, erster `pnpm qa:visual`-Lauf (WP-018, axe-core)
- **Beleg:** `docs/project/visual/WP-018/axe-report.json` — Regel `dlitem`, je 1× **serious** auf
  `/heute` (10 Stellen), `/entscheidungen` (10 Stellen) und der Objekt-360-Seite (12 Stellen)
- **Betroffen:** `MissionControlContent.tsx` (Kontextzeile), `EntscheidungenContent.tsx`
  (Kontextzeile), `ObjectDetailView.tsx` (Kontextzeile)

## Befund

Die Kontextzeilen der drei Seiten verwenden das Muster `<dl className="od-context" role="group"
aria-label="…">`. Das `role="group"` war selbst ein **A11y-Review-Fix** aus WP-014: ein
`aria-label` auf einem `<dl>` ohne verlässliche implizite Rolle wird von manchen Screenreadern
ignoriert; `role="group"` gab dem Element einen benennbaren Container.

Der erste maschinelle axe-Lauf zeigt die Kehrseite, die damals niemand gemessen hat: **der
role-Override entfernt die Listensemantik des `<dl>`** — die `<dt>`/`<dd>`-Kinder verwaisen
(WCAG 1.3.1 „Info and Relationships"). Ein Screenreader-Nutzer bekommt zwar den benannten
Container, verliert aber die Begriff/Wert-Struktur darin.

Das ist ein ehrliches Beispiel für den Wert der neuen Werkzeuge: **zwei manuelle Review-Runden
haben diesen Trade-off nicht gesehen; die erste Messung hat ihn sofort gezeigt.**

## Warum nicht sofort gefixt

Die naheliegende Korrektur (z. B. `<section aria-label>` um ein natives `<dl>`, oder
`role="term"`/`role="definition"` je Kind) ändert die zugängliche Semantik von drei zentralen
Seiten — das ist eine **Produktänderung** und braucht das Product Gate, das WP-018 für sich
ausdrücklich ausgeschlossen hat (Werkzeuge, keine Produktlogik). Ein stiller Fix im Werkzeug-WP
wäre genau der Scope-Drift, den die Stop Conditions verbieten.

## Korrektur (Folge-Arbeit)

1. Muster einmal sauber lösen (Kandidat: umschließendes `<section aria-labelledby>` mit nativem
   `<dl>` ohne role-Override), an **einer** Stelle mit axe verifizieren.
2. Auf alle drei Kontextzeilen anwenden (gleiches Muster, eine Quelle erwägen).
3. `qa:visual` erneut laufen lassen — Ziel: 0 serious/critical.
4. Die drei `biome-ignore`-Kommentare zum dl-Muster (Slice 1) entfallen dann mit.

Moderate/minor-Verstöße des Laufs: **0** — der Report weist das mit aus.

## Update 2026-07-23 (WP-020 qa:visual-Lauf)

Der axe-Lauf `docs/project/visual/WP-020/axe-report.json` zeigt die Regel `dlitem` (serious)
jetzt auf **6 Seiten** statt 3: Die neue Kontextleiste (`PageContextBar`, WP-020 Slice 1) hat
das bestehende `<dl role="group">`-Muster übernommen und damit auf `/twin`, `/isms` und
`/services` verbreitert. Da die Kontextleiste eine **neu gebaute** Struktur ist, fällt ihre
Korrektur unter die WP-020-Regel „FINDING-0008 nur dort beheben, wo ohnehin neu gebaut wird"
→ **in den WP-020-Fix-Pass aufgenommen** (Product Gate prüft mit). Die Altbestände
(WP-014/016/017-Strukturen) bleiben beim Folge-WP.
