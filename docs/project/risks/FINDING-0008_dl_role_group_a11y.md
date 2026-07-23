# FINDING-0008 – `<dl role="group">` entfernt die Listensemantik (3× serious, axe-gemessen)

- **Severity:** Medium (Barrierefreiheit; WCAG 1.3.1, Level A)
- **Status:** **GESCHLOSSEN** am 2026-07-24 im WP-028-Fix-Pass (Code-Gate-Auflage) — axe-belegt
  mit 0 critical/serious/moderate/minor über alle 15 Motive; Beleg unten
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

## Update 2026-07-23 (WP-020 Fix-Pass — Kontextleisten saniert)

Der Fix-Pass hat `PageContextBar` und `TwinContextBar` von `<dl role="group">` auf valide
Struktur gehoben (sichtbarer Wortlaut und Sechser-Reihenfolge der Kontextelemente unverändert).
Der erneute `qa:visual WP-020`-Lauf belegt: `dlitem` (serious) ist auf **allen sieben
umgebauten Seiten** verschwunden (heute, heute-neutral, twin, twin-tenant-nordwerk, isms,
services, entscheidungen → je serious 0). **Verbleibend:** genau **1 serious (`dlitem`) auf
Objekt-360** — die `ObjectDetailView`-Kontextzeile ist WP-014-Altbestand und wurde nach der
WP-020-Regel „nur beheben, wo ohnehin neu gebaut wird" bewusst nicht angetastet. Dieser Rest
bleibt das **Folge-WP** (Product Gate). Damit ist die WP-020-Verbreiterung des Findings
zurückgenommen; der ursprüngliche Altbestand (1 Seite statt vormals 3) ist eingegrenzt.

## Abschluss 2026-07-24 (WP-028-Fix-Pass — Objekt-360-Altbestand saniert, Finding geschlossen)

Der letzte verbliebene `serious`-Befund ist behoben. Die Kontextzeile in
`components/twin/ObjectDetailView.tsx` (`ContextBar`) ist auf dasselbe Muster wie die
`PageContextBar` gehoben: **benannte Region (`<section aria-label="Kontext dieser Objektseite">`)
mit nativer `<dl>` darin, ohne jeden ARIA-Rollen-Override**. Damit behalten `<dt>`/`<dd>` ihre
Begriff/Wert-Beziehung (WCAG 1.3.1) und der Container bleibt trotzdem benannt.

- **Sichtbarer Text und Reihenfolge der sechs Kontextelemente sind unverändert** (Product-Auflage
  aus dem WP-020-Fix-Pass, hier eingehalten). Der zugängliche Name ist wortgleich geblieben,
  weshalb die bestehenden Wächter (`object-detail.test.tsx` via `getByLabelText`) ohne Anpassung
  weiter greifen — die Regel wurde nicht abgeschwächt, nur die Struktur repariert.
- **Beide `biome-ignore`-Kommentare zum dl-Muster sind entfallen** (Punkt 4 der Korrekturliste
  oben). In der Datei existiert keine A11y-Suppression mehr; `pnpm lint` ist grün.
- **Messung:** `pnpm qa:visual WP-028` (2026-07-24),
  `docs/project/visual/WP-028/axe-report.json` — **alle 15 Motive** (11 Orte + Objekt-360 +
  drei Zusatzmotive) melden `critical: 0 · serious: 0 · moderate: 0 · minor: 0`. Die Regel
  `dlitem` erscheint nirgends mehr.

Damit ist die Korrekturliste (Schritte 1–4) vollständig abgearbeitet und das Finding geschlossen.
Es bleibt als Lehrstück stehen: **zwei manuelle Reviewrunden haben den Trade-off nicht gesehen,
die erste Messung sofort.** Das dl-Muster ist jetzt an genau zwei Stellen zentral gelöst
(`PageContextBar`, `ObjectDetailView.ContextBar`); ein künftiger dritter Kontextbereich soll
`PageContextBar` benutzen, statt das Muster erneut zu kopieren.
