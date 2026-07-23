# DR-0008 – Ampeln, Statusanzeigen und Dashboards sind erwünscht (datengestützt, nicht übertrieben)

- Typ: Product / UX
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** („so Zeug ist prinzipiell erstmal nicht schlecht …
  ändere es überall so, dass ich sage: das ist jetzt okay")
- Betroffen: alle Ansichten, WP-020 (Verdichtungs-Umbau), WP-021 (Demo-Welt), Dok. 08/09/10

## Klarstellung (räumt eine zu enge Auslegung aus)

Die Projektregel lautete nie „keine Ampeln", sondern **„keine *erfundenen* Bewertungen/Ampeln/
Scores"** (Ehrlichkeit vor Wirkung, Dok. 08). In der Umsetzung wurde daraus in Ton und Scoping
mehrerer Work Packages faktisch ein Ampel-/Dashboard-Verbot — das war **enger als das Konzept**:
Dok. 09 und Dok. 10 definieren Reifegrade, Risiko-Bewertungen, KPI-Systeme und verdichtete
Statusanzeigen ausdrücklich als Kernprodukt. Der Owner hat das nach der Live-Ansicht klargestellt.

## Entscheidung

1. **Ampeln, Statusanzeigen, Kennzahlen-Kacheln und Dashboard-Grafiken sind erwünscht** — als
   Standardmittel der Verdichtung, nicht als Ausnahme.
2. **Die Ehrlichkeitsgrenze bleibt, wird aber präzise gefasst:**
   - Die UI darf **alles visualisieren, was die Daten tragen** — Lebenszyklus-Verteilungen,
     Abdeckungen („3 von 5 Controls mit Nachweis"), Zählungen, Kanten-Vertrauensgrade,
     erfasste Bewertungen. Farbe + Form + **Text** (nie nur Farbe, A11y).
   - Der **Demo-Seed darf synthetische Bewertungen tragen** (Risiko-Level, KPI-Werte, Zielwerte,
     Trust-States) — das ist kein „Erfinden", sondern gefordert (Dok. 07 „Synthetische
     Demo-Graphen": mindestens ein Konflikt, eine veraltete Quelle, ein erklärbarer Trust-State
     je Tenant; Dok. 09/10 liefern die Vokabulare).
   - Verboten bleibt nur: die UI **errechnet oder behauptet** eine Bewertung, die im Datenbestand
     nicht existiert; eine Ampel ohne Drill-down in die Begründung (Dok. 09: „Keine isolierten
     Scores — bis zu Ursachen, Datenquellen und Annahmen erklärbar"); Lebenszyklus-Stand als
     Prüfergebnis verkleidet (08-D07 unverändert).
3. **„Nicht absolut übertrieben"** ist die Stilleitplanke (Owner-Wortlaut) — Verdichtung und
   Signalfarben ja, Effekthascherei nein. Konkretisierung über die Design-Exploration (WP-025),
   der Owner wählt.
4. **Abnahmekriterium ist der Owner:** iterativ bauen, jede Stufe per `qa:visual` zeigen, bis der
   Owner sagt „das ist jetzt okay". Kein Big-Bang.

## Umsetzungspfad

| Schritt | Inhalt | Datenbasis |
|---|---|---|
| **WP-020** | Verdichtungs-Umbau + **erste Dashboard-Schicht aus heutigen Daten**: Statuskacheln, Lebenszyklus-Verteilungen, Abdeckungsbalken, Ampel-Badges auf erfassten Zuständen — je mit Drill-down | heutiger Seed (belegt) |
| **WP-021** | Demo-Welt (E-01) **inklusive synthetischer Bewertungsdaten**: Risiko-Level, KPI-Werte mit Zielwert, Trust-States, Konflikte — nach den Vokabularen aus Dok. 08/09/10 | erweiterter Seed |
| danach | echte Bewertungs-/Aggregationslogik (Dok. 09) | **erst nachdem Dok. 09 im PDF gegengelesen/nachgezogen ist** (gehört zu den 14 material abweichenden — FINDING-0007-Lehre nicht wiederholen) |

## Verhältnis zu bestehenden Entscheidungen

- **DR-0003** (Design minimal): wird durch die Owner-Steuerung vom 2026-07-23 schrittweise
  abgelöst — kontrolliert über WP-020/WP-025 mit Owner-Abnahme je Stufe, nicht still.
- **IDEA-001**: dieser DR ist die Freigabe der Richtung; die Idea Card bleibt die Sammelstelle
  für die Gestaltungswünsche.
- Die harte Regel in `CLAUDE.md`/Briefing („keine **erfundenen** Bewertungen") bleibt wörtlich
  unverändert in Kraft — sie war immer richtig formuliert; zu eng war nur die Anwendung.
