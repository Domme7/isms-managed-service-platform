/**
 * „Meine Ablage" (DR-0018 Stufe 3) – Verwaltungsordner über die ECHTEN Objekte des Kunden.
 *
 * Die Ordner sind die kanonischen Objektfamilien (F01..F09, `buildAblage` → `groupObjectsByFamily`),
 * nicht erfunden. Jedes Objekt führt per `objectDetailHref` auf seine 360°-Seite – die Ablage ist
 * eine geordnete Sicht auf denselben digitalen Zwilling, kein zweiter Datentopf.
 *
 * EHRLICHKEIT: gezeigt wird nur, was erfasst ist; jeder Ordner nennt seinen Nenner (Objektzahl).
 * Echter Datei-Upload ist Backend (FINDING-0004) und hier bewusst noch nicht behauptet — die
 * Ablage ordnet und findet, sie speichert (noch) keine hochgeladene Datei.
 *
 * Rein präsentational (keine Hooks, keine Session) – deterministisch testbar.
 */
import Link from 'next/link';

import type { DemoTenant } from '@isms/demo-seed';
import { type AblageModell, buildAblage } from '../../lib/kunde/welt';
import { objectDetailHref } from '../../lib/twin/routes';
import { objectTypeDisplay } from '../../lib/twin/data';

export function KundeAblageContent({ tenant }: { tenant: DemoTenant }) {
  const ablage: AblageModell = buildAblage(tenant.tenant_id);

  return (
    <section className="kw-ablage" aria-labelledby="kw-ablage-titel">
      <header className="kw-page-head">
        <p className="tw-eyebrow">Meine Ablage</p>
        <h1 id="kw-ablage-titel">Meine Ablage</h1>
        <p className="kw-page-lead">
          Ihre {ablage.objekteGesamt} erfassten Objekte, geordnet in {ablage.ordner.length}{' '}
          Verwaltungsordner. Jeder Eintrag führt auf seine vollständige Objektseite.
        </p>
      </header>

      {ablage.ordner.length === 0 ? (
        <div className="tw-empty" role="note">
          <p>Für diesen Mandanten ist noch kein Objektbestand erfasst.</p>
        </div>
      ) : (
        <ul className="kw-ordner-grid" aria-label="Verwaltungsordner">
          {ablage.ordner.map((ordner) => (
            <li key={ordner.id} className="kw-ordner">
              <div className="kw-ordner-kopf">
                <h2 className="kw-ordner-name">{ordner.name}</h2>
                <span className="kw-ordner-zahl">{ordner.objects.length} Objekte</span>
              </div>
              <p className="kw-ordner-frage">{ordner.leitfrage}</p>
              <ul className="kw-ordner-liste">
                {ordner.objects.map((o) => (
                  <li key={o.object_id} className="kw-ablage-eintrag">
                    <Link
                      className="kw-ablage-link"
                      href={objectDetailHref(tenant.tenant_id, o.object_id)}
                    >
                      <span className="kw-ablage-name">{o.display_name}</span>
                      <span className="kw-ablage-meta">
                        {objectTypeDisplay(o.object_type)} · {o.lifecycle_status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
