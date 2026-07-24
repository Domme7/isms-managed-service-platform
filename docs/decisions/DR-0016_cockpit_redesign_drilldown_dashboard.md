# DR-0016 – Cockpit-Redesign: kompaktes Grafik-Dashboard mit Drill-down statt Langscroll

- Typ: Product / UX
- Status: **Accepted** (Owner-Richtung; Umsetzung als eigenes WP)
- Datum: 2026-07-24
- Decision Owner: **Human Product Owner** („ich finde das Cockpit viel zu lang; besser mit einem
  Dashboard aus vielen Grafiken starten und sich dann immer tiefer in die einzelnen Bereiche klicken
  … eine Animation wie als ob man tiefer eintaucht … immer tiefer verzweigen, nicht so langgezogen")
- Betroffen: `/cockpit` (WP-025 → Redesign), später die Detailseiten; DR-0014, DR-0008

## Kontext

Das moderne Cockpit (DR-0014) ist inhaltlich richtig (farbig, Ampeln, Warnungen, ehrlich, „nichts nur
Show"), aber als **eine lange Scroll-Seite** aufgebaut. Der Owner will das Gegenteil der Länge:
**oben ein kompaktes, grafikreiches Dashboard-Bild**, von dem aus man sich per Klick **progressiv
tiefer** in die einzelnen Bereiche bewegt — mit einer **immersiven „Eintauch"-Animation** beim
Drill-down. Erlebnis: „von der Übersicht immer tiefer verzweigen", nicht scrollen.

## Entscheidung

1. **Das Cockpit wird ein kompaktes Grafik-Dashboard „über der Falz"** — Kennzahl-/Ampel-/Chart-Kacheln
   auf einen Blick (keine lange Detailliste auf der Startebene). Die heutige Detailtiefe wandert **hinter
   den Drill-down**.
2. **Progressiver Drill-down statt Langscroll:** ein Klick auf eine Kachel/einen Bereich taucht **tiefer**
   (Übersicht → Bereich → Objekt), mit einer **„Eintauch"-Übergangsanimation** (Zoom/Tiefe). Von dort
   weiter verzweigen; Rückweg klar. Ziel ist eine **verzweigende Navigation**, keine endlose Seite.
3. **Ehrlichkeit bleibt Substanz (DR-0008/DR-0014):** jede Grafik/Ampel ist **datengetragen** (echte
   Ableitung, kein Fake), jeder Drill-down führt zu **realem** Detail (Bereichssicht/Objekt-360). Farbe
   nach offengelegter Regel; „nichts nur Show" gilt weiter — jetzt auch für die Charts.
4. **Barrierefreiheit:** die „Eintauch"-Animation respektiert `prefers-reduced-motion` (reduziert/aus),
   Drill-down ist auch ohne Animation voll bedienbar, axe 0 bleibt Pflicht.
5. **Umsetzung als eigenes WP** (Cockpit-Redesign, „WP-034" o. ä.): die gebaute Datenlogik
   (`lib/cockpit/{ampel,warnungen,lebenszyklus}.ts`, `buildHeuteDashboard`) bleibt; **nur die
   Präsentations-/Navigationsschicht wird neu** (kompaktes Chart-Dashboard + Drill-down-Router +
   Transition). Iterativ, per `qa:visual` gezeigt, Owner wählt (DR-0008 Punkt 4).

## Verhältnis

- **DR-0014** (modernes, farbiges, ehrliches Cockpit) bleibt gültig — DR-0016 ändert **Layout/Navigation**,
  nicht die Ehrlichkeits- oder Datenprinzipien.
- **DR-0008** (Ampeln/Charts/Dashboards erwünscht, datengestützt) wird hier weiter ausgebaut (mehr Grafik).
- Die A/B/C-Stil-Personalisierung (DR-0012) wird im Redesign neu bewertet (evtl. hinfällig, wenn das
  Dashboard-Erlebnis die Varianten ablöst) — offene Frage im Redesign-WP.
