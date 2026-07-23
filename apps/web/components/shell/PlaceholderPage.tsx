/**
 * Ehrliche Platzhalterseite für die noch nicht ausgebauten Orte (WP-011).
 *
 * KEIN Fake-Inhalt (`.claude/rules/frontend.md`, Dok. 06 §17 „Empty"): Der Ort ist real und stabil
 * (Dok. 06 06-D01), aber seine Erlebniswelt entsteht in einer späteren Phase / eigenem Work Package.
 * Zeigt Leitfrage, geplanten Screen (Dok. 06 §7) und eine klare Empty-Message.
 */
import type { NavPlace } from '../../lib/shell/places';

export function PlaceholderPage({ place }: { place: NavPlace }) {
  return (
    <>
      <p className="tw-eyebrow">Ort · {place.label}</p>
      <h1>{place.label}</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation"). */}
      <p className="tw-question">{place.question}</p>

      <p className="tw-lead">{place.hint}.</p>

      <div className="tw-empty" role="note">
        <h2 id="status" style={{ marginTop: 0, border: 'none', padding: 0 }}>
          Diese Ansicht entsteht in einer späteren Phase
        </h2>
        <p style={{ marginTop: 0 }}>
          „{place.label}" ist einer der acht stabilen Orte der Anwendung. Der Ort ist bereits
          navigierbar, seine volle Erlebniswelt folgt jedoch in einem späteren Ausbauschritt.
          {place.plannedScreen ? (
            <>
              {' '}
              Geplanter Screen: <strong>{place.plannedScreen}</strong>.
            </>
          ) : null}
        </p>
        <p className="tw-muted" style={{ marginBottom: 0 }}>
          Bewusst kein Platzhalter-Inhalt: hier erscheinen echte, aus dem gemeinsamen Datenmodell
          abgeleitete Ansichten, sobald der zugehörige Ausbauschritt umgesetzt ist.
        </p>
      </div>
    </>
  );
}
