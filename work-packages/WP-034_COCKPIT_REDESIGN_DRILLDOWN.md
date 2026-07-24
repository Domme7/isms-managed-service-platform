# WP-034 – Cockpit-Redesign: Drill-down-Dashboard mit „Eintauch"-Animation (DR-0016)

## Identität
- **Typ:** Product/UX (Präsentations-/Navigationsschicht des Cockpits neu; Datenlogik bleibt)
- **Quelle:** [DR-0016](../docs/decisions/DR-0016_cockpit_redesign_drilldown_dashboard.md) (Owner-Feedback „Cockpit
  viel zu lang" + interaktive Dive-Vorschau **owner-abgesegnet 2026-07-24**), DR-0014, DR-0008.
- **Owner-Stand:** Die Drill-down-/Eintauch-Richtung ist **freigegeben (darf gebaut werden)**. Vor der finalen
  Festlegung zeigt Slice 1 dem Owner **Design-Varianten zur Auswahl** (siehe unten).
- **✅ Slice-1-Ergebnis (2026-07-24):** zwei Varianten gezeigt (A „Bento-Mosaik", B „Radar-Fokus"); **der Owner
  wählte Variante A** („ich liebe Variante A"). **Slice 2 (Umsetzung full-width ins echte Cockpit) ist jetzt der
  aktive Schritt.**

## Ziel
Das lange Scroll-Cockpit wird ein **kompaktes Grafik-Dashboard**, in das man sich per Klick **progressiv tiefer
klickt** (Übersicht → Bereich → Objekt) — mit einer **„Eintauch"-Übergangsanimation**, verzweigend, mit
Brotkrumen + Zurück. Kein Langscroll. „Nichts nur Show" bleibt: jede Grafik datengetragen, jeder Drill-down zu
realem Ziel.

## Slice 1 – Design-Varianten zur Owner-Auswahl (Vorschauen, dann Wahl)
Der Owner will vor der Festlegung ausprobieren (aus DR-0016):
1. **Mehr Charts/Grafiken** auf der Startebene (datengetragen, kein Deko-Chart).
2. **Unterschiedliche Kachelgrößen** — NICHT uniform: bewusste Größenhierarchie (Wichtiges groß, Nebeninfo klein).
3. **Andere Grafiktypen wo sinnvoll:** insb. ein **Radar-/Web-Chart** (z. B. Abdeckungs-/Reifegradprofil über
   Domänen), dazu Donut/Balken/Trend passend zur Kennzahl.
4. **Coolere/stärkere Eintauch-Animation** (mehr Tiefe/Wirkung), `prefers-reduced-motion`-fest.
→ Als 2–3 Design-Vorschauen zeigen (Muster: die inline-Vorschau 2026-07-24), Owner wählt Stil, DANN Bau.

## Slice 2 – Umsetzung des gewählten Stils
- **Kompaktes Dashboard „über der Falz"** (Chart-/Ampel-/KPI-Kacheln, Größenhierarchie), **Drill-down-Router**
  (Ebenen Übersicht→Bereich→Objekt, URL-/State-getragen, Zurück + Brotkrumen), **Dive-Transition** (Zoom/Tiefe,
  reduced-motion-Fallback).
- **Datenlogik wiederverwenden:** `apps/web/lib/cockpit/{ampel,warnungen,lebenszyklus}.ts`, `buildHeuteDashboard`,
  Coverage/Warnungen/Drilldowns — **unverändert**; Drill-down-Ziele = bestehende Bereichssichten (`/isms` etc.)
  bzw. Objekt-360. Charts additiv (react-frei ableitbar, kein neuer Datenträger; Radar aus belegten Abdeckungen).
- **A/B/C-Personalisierung neu bewerten** (evtl. abgelöst durch das Dashboard-Erlebnis, DR-0012 — offene Frage).

## Ehrlichkeit & Grenzen (bleiben)
- Jede Grafik/Ampel datengetragen nach **offengelegter Regel** (DR-0008); keine erfundene Bewertung; „wirksam" =
  Lebenszyklus-Stand, kein Prüfergebnis (08-D07). Keine Demo-Etiketten (DR-0011). Sphären-/Mandantengrenze.
- **Barrierefreiheit:** Drill-down ohne Animation voll bedienbar; `prefers-reduced-motion` reduziert/aus; **axe 0**;
  Fokus-Management über die Ebenen; Tastaturbedienung; Charts mit Text-/Tabellen-Alternative (nicht Farbe allein).

## Acceptance Criteria (Kurz)
- Startebene kompakt (kein Langscroll), Charts + Größenhierarchie; Drill-down Übersicht→Bereich→Objekt mit
  Dive-Transition, Brotkrumen, Zurück; jeder Drill-down zu realem Ziel (Test: kein toter Link).
- Jede sichtbare Zahl/Grafik aus echter Ableitung (Test gegen die Ableitung, kein hartkodierter Wert).
- `prefers-reduced-motion` respektiert (Test/QA); axe 0 (hell+dunkel); vitest/typecheck/lint/build grün.
- Gates: Code, Product/UX, Konzepttreue (Ehrlichkeit), Security (Sphäre), QA (a11y/keine tote Kacheln); 2. Runde.

## Stop Conditions
- Eine Grafik ließe sich nur mit erfundenem Wert/Score darstellen → als benannte Lücke, nicht erfinden (Scores =
  WP-021 Slice 7/CCP-008, gated). · Animation bricht `prefers-reduced-motion` oder axe → stoppen.

## Offene Fragen
- O-WP034-01: Ablösung der A/B/C-Personalisierung durch das Dashboard-Erlebnis? · O-WP034-02: Welche Charttypen je
  Kennzahl fachlich korrekt (Radar-Achsen = welche Domänen)? · O-WP034-03: Drill-down als eigene Routen vs.
  In-Page-Ebenen?
