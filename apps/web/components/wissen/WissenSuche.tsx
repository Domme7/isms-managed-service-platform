'use client';

/**
 * Globale Objektsuche im Ort „Wissen" (WP-027 Slice 2). Suchfeld + Trefferliste, angebunden an
 * `sucheObjekte` (`lib/suche`). Die Sicherheitslogik – Sphärengrenze (DR-0012) und
 * Snippet-Leak-Schutz – lebt in der Suchmaschine (dort getestet); diese Komponente macht sie
 * BEDIENBAR und SICHTBAR: vertrauliche Treffer erscheinen mit Name und Typ, aber mit dem
 * Ersatztext „Vorschau ausgeblendet (vertraulich)" statt eines Vorschautexts.
 *
 * Rein präsentational + client-seitig (nur lokaler Query-Zustand, keine Datenmutation). Ohne Query
 * werden KEINE Objektnamen gerendert – der Leerzustand bleibt frei von Bestandstext.
 */
import Link from 'next/link';
import { useId, useState } from 'react';

import type { DemoRole } from '../../lib/shell/roles';
import { SUCHE_MIN_LAENGE, type SuchErgebnis, sucheObjekte } from '../../lib/suche';

export function WissenSuche({ role, tenantId }: { role: DemoRole | null; tenantId: string }) {
  const [query, setQuery] = useState('');
  const feldId = useId();
  const ergebnis = sucheObjekte(query, role, tenantId);
  const getippt = query.trim().length > 0;

  return (
    <section className="wis-suche" aria-labelledby="wis-suche-titel">
      <h2 id="wis-suche-titel">Suche über alle Inhalte</h2>
      <p className="sv-edge-note">
        Findet Objekte des digitalen Zwillings über ihren Namen und Typ. Die Trefferliste zeigt nur,
        was Ihre Sicht umfasst; bei vertraulichen Treffern bleibt der Vorschautext ausgeblendet.
      </p>
      <label className="wis-suche-label" htmlFor={feldId}>
        Suchbegriff
      </label>
      <input
        id={feldId}
        type="search"
        className="wis-suche-feld"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="z. B. Risiko, Control, Auftragsabwicklung"
        autoComplete="off"
      />
      <SucheErgebnis ergebnis={ergebnis} getippt={getippt} />
    </section>
  );
}

function SucheErgebnis({ ergebnis, getippt }: { ergebnis: SuchErgebnis; getippt: boolean }) {
  if (!getippt) {
    return <p className="tw-muted">Tippen Sie einen Begriff, um zu suchen.</p>;
  }
  if (ergebnis.zuKurz) {
    return <p className="tw-muted">Bitte mindestens {SUCHE_MIN_LAENGE} Zeichen eingeben.</p>;
  }
  if (ergebnis.trefferGesamt === 0) {
    return (
      <p className="tw-muted" role="status">
        Keine Treffer für „{ergebnis.query}".
      </p>
    );
  }
  return (
    <div role="status">
      <p className="sv-edge-note">
        {ergebnis.trefferGesamt} Treffer in {ergebnis.gruppen.length}{' '}
        {ergebnis.gruppen.length === 1 ? 'Mandant' : 'Mandanten'}.
      </p>
      {ergebnis.gruppen.map((gruppe) => (
        <div key={gruppe.tenantId} className="wis-suche-gruppe">
          <h3 className="tw-card-title">{gruppe.tenantName}</h3>
          <ul className="sv-items">
            {gruppe.treffer.map((treffer) => (
              <li key={treffer.objectId}>
                <Link className="sv-item-name" href={treffer.href}>
                  {treffer.name}
                </Link>
                <span className="sv-item-meta">{treffer.typLabel}</span>
                {treffer.vertraulich ? (
                  <span className="sv-item-note wis-suche-vertraulich">
                    Vorschau ausgeblendet (vertraulich)
                  </span>
                ) : treffer.snippet ? (
                  <span className="sv-item-note">{treffer.snippet}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
