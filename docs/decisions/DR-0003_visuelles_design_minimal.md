# DR-0003 – Visuelles Design bleibt minimal (Uplift zurückgenommen)

- Typ: Product / UX
- Status: **Accepted**
- Datum: 2026-07-22
- Decision Owner: Human Product Owner (Entscheidung in Session), umgesetzt durch Orchestrator
- Betroffen: `apps/web/app/globals.css`, WP-015

## Kontext

Der Owner meldete, das Design wirke „etwas zu langweilig" und wünschte sich „etwas futuristischer mit
mehr Wow — **nicht viel**". Daraufhin wurde in WP-015 ein umfassender Uplift gebaut (dunkler Navy-Modus,
Glas-Topbar, Glows, Grid-Textur, Status-Chips, Micro-Interaktionen; Commit `f363147`).

Rückmeldung des Owners nach Sichtung: **„viel zu futuristisch, das alte war besser; ich wollte ganz
minimal — vielleicht nur ein kleines bisschen Hintergrunddesign, aber nur ein bisschen."**

## Entscheidung

1. Der visuelle Uplift wird **vollständig zurückgenommen**; das vorherige, helle und nüchterne Design
   ist wieder der Stand (`globals.css` auf Stand `67c9c77` zurückgesetzt).
2. **Einzige Ergänzung:** ein sehr leiser, kühler Radial-Verlauf am oberen Seitenrand (Deckkraft **4 %**,
   rein dekorativ). Netto-Differenz zum alten Design: **+13 / −1 Zeilen**, eine Datei.
3. **Kein** Dark Mode, keine Glows/Glas, keine Chips, keine Animationen, keine Typo-Umstellung.

## Begründung

- Produktentscheidung des Owners; das nüchterne Enterprise-Erscheinungsbild passt zur Zielgruppe
  (Executive/Audit, Dok. 12 D-023) und zur Dok.-06-Vorgabe eines **neutralen** Designsystems.
- Ursache der Fehlentwicklung war **die Auftragsformulierung des Orchestrators**, nicht die Umsetzung:
  „nicht viel Wow" wurde in einen Brief mit „dunkle Navy-Basis, Glow, Glas-Topbar" übersetzt.
  **Lehre:** Bei subjektiven Gestaltungswünschen zuerst die *kleinste* Variante bauen und zeigen,
  statt die Zielrichtung zu maximieren.

## Folgen

- Risiko war gering, weil der Uplift **CSS-only** war (eine Datei, keine JSX-/Text-/Teständerung) —
  die 77 Web-Tests blieben durchgängig grün, das Zurückdrehen war risikolos.
- Der Ein-Modus-/Dark-Mode-Vorschlag und die zugehörigen Kontrastmessungen sind mit dem Revert
  gegenstandslos; ein heller Modus bleibt der Standard.
- Aus dem (nach dem Revert eingetroffenen) UX-Review bleibt **ein** Finding gültig und wurde behoben:
  das globale 404 nutzte `tw-card-link` statt `tw-back` — der einzige Rückweg sah nicht wie ein Link aus.
  Alle übrigen Findings (Print-Block, Login-Hero, Fokus auf Teal, Token-Aliase) betrafen ausschließlich
  das verworfene Design.

## Supersede-Regel

Weitere Gestaltungsänderungen nur in kleinen, einzeln sichtbaren Schritten und nach Sichtung durch den
Owner. Ein neuer DR ersetzt diesen, falls das visuelle Konzept grundsätzlich neu entschieden wird.
