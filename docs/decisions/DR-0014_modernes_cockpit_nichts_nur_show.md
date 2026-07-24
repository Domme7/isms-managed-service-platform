# DR-0014 – Modernes, farbiges Cockpit: Realisierung von DR-0008, „nichts nur Show"

- Typ: Product / UX
- Status: **Accepted**
- Datum: 2026-07-24
- Decision Owner: **Human Product Owner** („ja viel besser … wichtig ist halt auch, dass nichts
  davon nur Show ist, sondern dass das alles auch gebraucht wird")
- Betroffen: `/cockpit` (WP-025), Design-System (`globals.css`), später alle Ansichten; U-11

## Kontext

Die ersten Cockpit-Varianten (WP-025, A/B/C) waren in der zurückhaltenden **Antwort-Modus-Optik**
(grau, text-lastig, bewusst **keine** Ampeln — aus der zu engen „keine Ampel"-Lesart, Usability-Befund
U-11). Der Owner nach der Ansicht: **„nicht 2026-ready"** — gewünscht ist **modern, Dashboard,
Ampeln, Warnungen, farbig**. Eine moderne Inline-Vorschau (farbige KPI-Kacheln, Deckungsringe,
Warnungen-Panel, Lebenszyklus-Ampelleiste, hell/dunkel) wurde freigegeben („viel besser").

## Entscheidung

1. **Das Cockpit erhält eine moderne 2026-Dashboard-Sprache** (farbige Statuskacheln, Deckungsringe,
   Ampel-Legende, Warnungen-Panel, Lebenszyklus-Ampelleiste, hell/dunkel, responsive). Das ist die
   **konkrete WP-025-Realisierung von [DR-0008]** („Ampeln/Statusanzeigen/Dashboards erwünscht") —
   **keine neue Richtung, sondern dessen Umsetzung**. Die überkonservative „keine Ampel"-Auslegung
   (U-11) ist damit **aufgehoben**.
2. **„NICHTS NUR SHOW"** (Owner-Verfeinerung — deckt sich wörtlich mit DR-0008 Punkt 2 „keine Ampel
   ohne Drill-down in die Begründung", Dok. 09 „keine isolierten Scores"): **jedes** sichtbare Element
   ist (a) **datengetragen** — echte, mandantengescopte Ableitung, kein hartkodierter Wert — **und**
   (b) **funktional** — jede Ampel/Deckung/Warnung/KPI hat einen Drill-down zu den **realen** Objekten
   oder zur Begründung. Kein Deko-Element, kein toter Link. Setzt zugleich Usability-Auflage **U-09**
   um (Deckung führt ZU den Lückenobjekten).
3. **Die Ehrlichkeitsgrenze bleibt Substanz** (DR-0008): keine **erfundene** Bewertung/Severity; Farbe
   folgt einer **offengelegten Regel** und steht nie allein (Text + Form, A11y); „wirksam" = erfasster
   Lebenszyklus-Stand, **kein** Prüf-/Freigabeergebnis (08-D07); Warnungen = **echte** Datenlücken,
   keine Fantasie-Alarme, keine beruhigende/alarmierende Wertung über den Sicherheitszustand.
4. **Cockpit wird die Startseite nach dem Login**; der **A/B/C-Umschalter bleibt** als kuratierte
   **Personalisierung** ([DR-0012]/WP-029), alle drei Varianten in der modernen Sprache.
5. **Design-Tokens wiederverwendbar** (semantische Statusfarben + neutrale Flächenrampe) → die moderne
   Bildsprache wird später über die anderen Seiten gezogen.

## Verhältnis zu bestehenden Entscheidungen

- Setzt **DR-0008** um (Dashboard-Schicht, die dort für WP-020/WP-025 vorgesehen war); löst **U-11**
  auf; löst **DR-0003** (Design minimal) weiter kontrolliert ab.
- **DR-0011** (keine Demo-/Simulations-Etiketten) und **DR-0013** (Antwort-Modus-Substanz, kein internes
  Vokabular) bleiben unverändert in Kraft — modernes Gesicht, ehrliche Substanz.
- Reichere Ampeln (synthetische Risiko-Level/KPI/Trust-States) kommen mit **WP-021**/Dok.-16-Demo-Welt
  (DR-0008 Umsetzungspfad, [DR-0015]).
- Abnahme iterativ per `qa:visual`, Owner entscheidet je Stufe (DR-0008 Punkt 4).
