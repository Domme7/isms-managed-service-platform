# DR-0017 – Das ganze Produkt als Eintauch-Dashboard (drill-only IA, kein Sidebar-Reiter)

- Typ: Product / UX / Informationsarchitektur (groß) · Status: **Accepted (Owner-Richtung)** · Datum: 2026-07-24
- Decision Owner: **Human Product Owner**
- O-Ton: *„das projekt soll krass umgebaut werden — man landet am Anfang an der Berater-Dashboardseite
  (Überblick über alle Kunden), von dort klickt man sich tiefer rein (z. B. ein Kunde), und im Kunden
  kann man sich in Heute / Kunden / ISMS / Entscheidungen / Services / Reports / Wissen / Administration
  weiterklicken — grafisch geil im Dashboard, dann tiefer und tiefer, bis in den digitalen Zwilling.
  Keine Klick-Reiter an den Seiten mehr; das funktioniert nur noch über tiefer reinklicken im Dashboard."*

## Entscheidung
1. **Einstieg = Portfolio-/Berater-Dashboard** (alle Kunden auf einen Blick). Für das **Kunde-Profil**
   ist der Einstieg das **eigene Kunde-Dashboard** (Sphärengrenze bleibt: Kunde sieht nur sich).
2. **Navigation ausschließlich durch Eintauchen** — **kein Sidebar-/Seitenreiter mehr**. Der Weg ist:
   Portfolio → Kunde → Bereich → Detail → digitaler Zwilling/Objekt. **Brotkrume + „zurück"** ersetzen die
   Sidebar.
3. **Die acht Bereiche bleiben** (Heute, Kunden, ISMS, Entscheidungen, Services, Reports, Wissen,
   Administration) — aber als **grafische Kacheln im Kunde-Dashboard**, in die man eintaucht (nicht gelöscht,
   sondern re-präsentiert). Ihre bestehenden Inhaltskomponenten werden als Dive-Ziele wiederverwendet.
4. **Alles im Cockpit-Dashboard-Stil** (Bento-Kacheln unterschiedlicher Größe, Graphik, Eintauch-Animation,
   Brotkrume). Eine durchgehende Sprache über das ganze Produkt.
5. **Der ehrliche Kern bleibt vollständig:** digitaler Zwilling, alle Ableitungen (jede Zahl/Ampel/Grafik aus
   echten Daten), Konzepttreue (24 PDFs), ~835 Tests. **Nur Präsentation + IA werden neu.** „Nichts nur Show"
   (DR-0008/DR-0014) gilt unverändert: jede Dashboard-Kachel ist datengetragen, jeder Dive führt zu Realem.

## Verhältnis zu bestehenden Entscheidungen (Konzept-Tension, bewusst benannt)
- **Dok. 06-D01 / DR-0010** legen die **acht Orte als feste Hauptnavigation (Sidebar)** fest. DR-0017 **löst
  diese Navigations-Mechanik ab** (Owner-Entscheidung geht vor Konzept, Schichtenmodell DR-0006). Die
  **Substanz** des Konzepts bleibt gewahrt: die acht Bereiche existieren weiter und sind navigierbar — nur
  über Eintauchen statt Reiter. Kein stiller Widerspruch (DR-0005): hier dokumentiert.
- **DR-0016** (Cockpit-Redesign, modulares Eintauch-Dashboard) ist der **Prototyp** dieser Sprache und wird
  zur produktweiten Vorlage.
- **DR-0012** (Sphären Kunde/Betreiber) bleibt tragend: Berater = Portfolio-Einstieg, Kunde = eigener Einstieg.

## Umsetzung — staged, nie kaputt (WP-035 ff.)
- **Stage 0:** Cockpit als **perfekte Vorlage** fertig (Bausteine wegräumen/einklappen, breiter, Radar-Fix) —
  es wird das Design-System.
- **Stage 1:** **Berater-Portfolio-Dashboard** als Einstieg bauen (echte Kunden-Rangliste; braucht gefüllte
  Mandanten) → Dive in einen Kunden.
- **Stage 2:** **Kunde-Dashboard** mit den acht Bereichen als Kacheln → Dive in den jeweiligen Bereich
  (bestehende Inhaltskomponente als Ziel).
- **Stage 3:** Bereiche schrittweise in den Dashboard-Stil überführen; Dive bis in den Zwilling.
- **Stage 4:** **Sidebar entfernen**, Routing auf Drill-Modell umstellen, Guard-Tests anpassen.
- Jede Stage: bauen → verifizieren (Tests/axe) → committen; die App bleibt jederzeit lauffähig.

## Offene Fragen
- O-DR17-01: Landet ein Kunde-Profil direkt auf seinem Dashboard, ein Berater auf dem Portfolio? (Default: ja.)
- O-DR17-02: Bereiche wie Administration/Wissen als Dashboard oder als schlichtes Dive-Detail? (Default: Dive-
  Detail im selben Rahmen.)
- O-DR17-03: Brauchen wir eine minimale globale Rückkehr („zum Portfolio")? (Default: ja, in der Brotkrume.)
