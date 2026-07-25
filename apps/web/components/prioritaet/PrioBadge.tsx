/**
 * Prio-Badge (DR-0018 Stufe 4): zeigt die ABGELEITETE Priorität + Frist eines Objekts.
 *
 * EHRLICHKEIT (E-02 bleibt gated): Weder Priorität noch Frist sind ein gespeicherter Kunden-Wert –
 * beide werden zur Anzeigezeit aus den echten Feldern des Objekts gerechnet (`ableitenPrioritaet`,
 * offengelegte Regel: Wichtigkeit × Dringlichkeit, Frist = Erfassungsdatum + Horizont). Das Wort
 * „abgeleitet" bleibt deshalb bewusst am Frist-Wert stehen: Es ist ein Vorschlag der Plattform,
 * kein vom Kunden gesetzter Termin. Kein neues Trägerfeld, kein `tags_custom_fields`.
 *
 * Rein präsentational; die Gründe der Ableitung stehen als `title` (Tooltip) zur Nachvollziehbarkeit.
 */
import { type Prioritaet, QUADRANT_LABEL } from '../../lib/portfolio/prioritaet';
import { formatIsoDateDe } from '../../lib/twin/routes';

export function PrioBadge({ prio }: { prio: Prioritaet }) {
  return (
    <span
      className={`prio-badge prio-badge--${prio.quadrant}`}
      title={prio.gruende.length > 0 ? `Abgeleitet aus: ${prio.gruende.join(' · ')}` : undefined}
    >
      <span className="prio-badge-quadrant">{QUADRANT_LABEL[prio.quadrant]}</span>
      <span className="prio-badge-frist">Frist (abgeleitet): {formatIsoDateDe(prio.fristIso)}</span>
    </span>
  );
}
