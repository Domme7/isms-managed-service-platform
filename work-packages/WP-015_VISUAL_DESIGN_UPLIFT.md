# WP-015 – Visual Design Uplift (Erlebnisqualität ohne Substanzverlust)

## Identität
- **Phase:** 1 (Product Shell / Designsystem)
- **Priorität:** P1 (Owner-Feedback: „etwas futuristischer, mehr Wow — nicht viel, aber nicht so langweilig")
- **Status:** Active
- **Risk Class:** Low (rein visuelle Schicht, keine Fachlogik/Daten)
- **Builder:** Frontend-Engineer · **Reviewer:** Product-User-Lead + Code-Reviewer (read-only)
- **Human Gates:** keiner

## Problem
Die Oberfläche ist inhaltlich stark (ehrliche Zustände, Klartext, A11y), wirkt aber visuell nüchtern.
Der Owner erwartet mehr Erlebnisqualität — ohne dass das Produkt „verspielt" oder für Executive-/
Audit-Zielgruppen unseriös wirkt.

## Ziel
Ein moderner, ruhiger „Enterprise-Futurismus": mehr Tiefe, Charakter und Rhythmus in der Fläche,
**ohne** Inhalte, Zustände oder Ehrlichkeitsregeln zu verändern. Wirkung soll aus Typografie, Farbe,
Tiefe und Feinheiten entstehen — nicht aus Effekten um ihrer selbst willen.

## Nicht-Ziele
- **keine** Änderung an Texten, Daten, Logik, Routen oder Testaussagen (rein visuelle Schicht),
- kein Dark Pattern, keine Effekthascherei, die Status verschleiert,
- **keine** Verschlechterung von Accessibility (Kontrast, Fokus, Reduced Motion) — harte Grenze,
- keine schwere UI-Bibliothek, kein CSS-Framework, keine neue Abhängigkeit ohne Notwendigkeit,
- kein Humor/Meme-Stil (Dok. 12 D-023: Executive/Audit bleibt formal).

## Scope
1. **Design-Token-Schicht** in `globals.css`: abgestimmte Farbskala (Grundton aus Dok. 06 §18 beibehalten:
   Navy = Struktur, Teal = aktiv), Elevation-/Schatten-Stufen, Radius-Skala, Spacing-Rhythmus,
   Typo-Skala mit klarer Hierarchie (größere, ruhigere Headlines; bessere Zeilenlänge/-höhe).
2. **Tiefe & Charakter (dezent):** subtile Verläufe/Glow in Kopfbereichen, leichte Glas-/Layer-Wirkung
   in Topbar und Karten, feine Trennlinien statt harter Kästen, akzentuierte aktive Zustände.
3. **Statuselemente aufwerten:** Status als klar lesbare „Chips" (weiterhin **immer mit Text**,
   nie nur Farbe), Kanten-/Metazeilen visuell beruhigen (weniger Textwüste, klare Sekundärhierarchie).
4. **Micro-Interaktionen:** sanfte Hover-/Fokus-/Aufklapp-Übergänge — vollständig deaktiviert unter
   `@media (prefers-reduced-motion: reduce)`.
5. **Dark Mode** (optional, wenn ohne Risiko machbar): über `prefers-color-scheme` mit denselben Tokens.
6. **Login & Startseite** als „Schaufenster": der erste Eindruck darf am deutlichsten gestalterisch sein.

## Acceptance Criteria
1. Alle bestehenden **77 Web-Tests bleiben grün ohne inhaltliche Anpassung** (Beweis, dass nur die
   visuelle Schicht verändert wurde). Textänderungen sind nicht Teil dieses WP.
2. **Kontrast ≥ AA** für Text und Bedienelemente (auch im Dark Mode, falls umgesetzt); Fokus jederzeit
   deutlich sichtbar; Status niemals nur farbcodiert.
3. `prefers-reduced-motion: reduce` schaltet Übergänge/Animationen ab.
4. Responsive Kernwege unverändert nutzbar (mobil bis Desktop), kein horizontales Scrollen.
5. Keine neue Laufzeitabhängigkeit; `pnpm build`/`typecheck`/`test` grün.
6. Browser-QA über Login, Heute, Zwilling, Services, ISMS und einen Empty-State; unabhängiger Review
   (UX + Code) dokumentiert.

## Stop Conditions
- ein Effekt würde Lesbarkeit, Kontrast oder Statusklarheit verschlechtern,
- Scope driftet in Inhalts-/Logikänderungen,
- eine schwere Abhängigkeit wäre nötig.

## Done Evidence
- grüne Tests + Build, Browser-QA (mehrere Seiten), Review-Notiz, Checkpoint, Commit/Push.
