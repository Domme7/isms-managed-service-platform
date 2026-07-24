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

## Owner-Bestätigung (2026-07-24) + Iterationswünsche

**Der Owner hat die interaktive Drill-down-/„Eintauch"-Vorschau vom 2026-07-24 gesehen und ausdrücklich
bestätigt: „findet es sehr gut, gefällt so schon gut" — diese Richtung ist die verbindliche Basis für das
Redesign** (kompaktes Dashboard → Klick → Eintauch-Animation → Bereich → tiefer → Objekt, verzweigend, kein
Langscroll). So merken und umsetzen.

**Vor der finalen Festlegung noch ausprobieren (Owner-Wunsch, als Design-Experimente zeigen, dann wählt der
Owner):**
1. **Mehr Charts/Grafiken** auf der Dashboard-Startebene (wo fachlich sinnvoll — datengetragen, kein Deko-Chart).
2. **Unterschiedliche Kachelgrößen — NICHT alle gleich groß:** bewusste Größenhierarchie (Wichtiges größer,
   Nebeninfo kleiner), lebendigeres Raster statt Uniform-Grid.
3. **Andere Grafiktypen wo sinnvoll**, u. a. ein **Radar-/Web-Chart** (z. B. Reifegrad-/Abdeckungsprofil über
   Domänen) sowie ggf. Balken/Donut/Trend — passend zur jeweiligen Kennzahl.
4. **Coolere/stärkere „Eintauch"-Animation** (mehr Tiefe/Wirkung) — weiterhin `prefers-reduced-motion`-fest.

Diese Varianten kommen als nächste Iteration (Design-Vorschauen), bevor der echte Bau des Cockpit-Redesigns
final festgezurrt wird. **Der aktuelle Stand ist bereits owner-abgesegnet und darf gebaut werden**, falls vor
der Experiment-Runde weitergearbeitet wird.

## Nachtrag 3: Modular-Dashboard-Richtung (2026-07-24, owner-abgesegnet)

Der erste Bau (Bento, `be684d0`) war dem Owner **weiterhin zu langgezogen** — Ursache: unter dem kompakten
Grid lagen weiter GESTAPELTE Blöcke (Warnungen, Lebenszyklus-Leiste, „Was fehlt", Seitenbausteine). An einer
polierten Vorschau hat der Owner die **finale Richtung abgesegnet** („so sieht das Dashboard gut aus — bau
genau so um"):

1. **Ein kompaktes Dashboard auf EINEM Screen** (kein Langscroll), viele verschiedene Grafiken in
   verschiedenen Größen. **Alles andere** (Warnungen, Lebenszyklus, „was fehlt", jeder Bereich) wird zu
   **Kacheln, in die man eintaucht** — nichts mehr darunter gestapelt.
2. **Modular N-fach verzweigend:** Kachel → Bereich → tiefer → Objekt; wachsende Brotkrume; „zurück" pro
   Ebene. Bereiche sind selbst Kacheln (Beispiel: „Heute" → Tages-Briefing → einzelne Punkte).
3. **Design-Politur:** Icon je Bereich (getönt nach Status), reicher Briefing-Hero mit Status-Chips, Ringe
   mit Wert in der Mitte, verfeinerter Radar, sauberes Meter; ruhige Typo; flach; Eintauch-Animation
   `prefers-reduced-motion`-fest.
4. **Ehrlichkeit bleibt (Regel Null):** „Nachrichten/Briefing" hat HEUTE keinen Datenträger (Aufgaben-/
   Nachrichtenobjekte fehlen im Modell → benannte Lücke „Morning Mission"). Das Briefing ist deshalb die
   **ehrliche Tageslage** (was ist erfasst, wo Lücken, größte offene Stelle), KEIN erfundener Posteingang;
   ein echtes Postfach wäre eine eigene Daten-Erweiterung (später, Owner-Gate).
5. **Umsetzung:** der bisherige Bento-Bau (Radar/Abdeckungen/Warnungen/Lebenszyklus-Logik) wird in dieses
   modulare N-Ebenen-Schema überführt (Pfad-Stack statt gestapelter Blöcke); Datenlogik bleibt.

**Gate-Befunde vom Bento-Zwischenstand (in den Umbau einzuarbeiten):**
- **A/B/C ist verwaist** (major): die Aussage „A/B/C bleibt unter Heute erreichbar" ist falsch (‚/heute' zeigt
  die Detailtiefe-Ansicht, kein A/B/C). Falsche Aussagen in `page.tsx`, `CockpitBentoContent.tsx`, `WP-034`
  korrigieren; A/B/C **offiziell ausmustern** (schließt O-WP034-01) und `CockpitView`/`CockpitVariantenContent`/
  `varianten.ts` löschen bzw. als archiviert kennzeichnen — keine stille Widerspruchsauflösung (DR-0005).
- **Guard-Abdeckung** (major): die Vokabular-/Sphären-/Leerzustand-Wächter rendern noch die ALTE Ansicht, nicht
  die neue Live-Route. Guards auf die neue Ansicht ausweiten ODER die gemeinsamen Bausteine in ein getestetes
  Modul ziehen (O-WP034-04).

## Nachtrag: Owner-Wahl (2026-07-24)

Aus den zwei gezeigten Design-Varianten hat der Owner **Variante A „Bento-Mosaik"** gewählt (O-Ton „ich liebe
Variante A"): lebendiges Bento-Raster, Radar-Abdeckungsprofil oben groß, **verschiedene Kachelgrößen**, kräftige
Eintauch-Animation, ehrliche datengetragene Kacheln mit echten Drill-downs. **Diese Variante wird full-width ins
Produkt gebaut (WP-034 Slice 2).** Variante B („Radar-Fokus") bleibt als dokumentierte Alternative.
