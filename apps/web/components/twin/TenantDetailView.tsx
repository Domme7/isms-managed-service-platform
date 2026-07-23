/**
 * Mandanten-Detailseite des Digital Twin Explorers (read-only, WP-004).
 *
 * Universelle Seitenanatomie (Dok. 06): eigener Leitfrage-Block, „Was ist das? / Warum wichtig?"
 * (Kontextblock aus Seed-Feldern), „Womit hängt es zusammen?" (Objekte nach Familie + Beziehungen).
 * Für Mandanten ohne Objektgraphen wird ein klarer, aus dem Seed abgeleiteter Empty-State gezeigt
 * (frontend.md-Zustände). Rendert innerhalb des `main`-Landmarks aus dem Twin-Layout.
 *
 * Heading-Hierarchie: h1 (Mandant) > h2 (Objekte/Beziehungen bzw. digitaler Zwilling) > h3 (Familie) > h4 (Objekt).
 *
 * EIN LEITBEGRIFF JE KONZEPT (WP-028 Slice 4, DR-0013 Nr. 9): sichtbar heißt der Objektgraph
 * durchgehend „digitaler Zwilling"; „Mandant" bleibt der Organisation vorbehalten. Der
 * Rückweg führt zum Ort „Kunden" – wohin dieser Ort führt, entscheidet die Sphäre der aktiven
 * Rolle (`lib/shell/sphaere.ts`), deshalb ist der Link neutral beschriftet und behauptet
 * keine Mandantenliste.
 */
import Link from 'next/link';
import type { TenantDetailModel } from '../../lib/twin/data';
import { Badge } from './Badge';
import { ObjectCard } from './ObjectCard';
import { RelationshipList } from './RelationshipList';

export function TenantDetailView({ model }: { model: TenantDetailModel }) {
  const { tenant, familyGroups, relationships, objectCount, relationshipCount } = model;
  const hasGraph = objectCount > 0;

  return (
    <>
      <Link className="tw-back" href="/twin">
        ← Zurück zu Kunden
      </Link>

      <p className="tw-eyebrow">Digitaler Zwilling · {tenant.industry}</p>
      <h1>{tenant.display_name}</h1>

      {/* Leitfrage der Seite (Dok. 06 „Frage vor Navigation") */}
      <p className="tw-question">
        Was enthält der digitale Zwilling von {tenant.display_name} und wie hängt es zusammen?
      </p>

      {/* „Was / Warum" – Kontext aus den erfassten Feldern des Mandanten */}
      <p className="tw-lead">{tenant.description}</p>

      {hasGraph ? (
        <TenantGraph
          familyGroups={familyGroups}
          relationships={relationships}
          objectCount={objectCount}
          relationshipCount={relationshipCount}
          tenantId={tenant.tenant_id}
        />
      ) : (
        <EmptyGraphState tenantName={tenant.display_name} />
      )}
    </>
  );
}

/**
 * `tenantId` (WP-014 Slice 2): Mandant dieser Route – wird an Objektkarten und Beziehungsliste
 * durchgereicht, damit jeder Objektlink im Mandanten der Seite bleibt (Dok. 07 §17/P09).
 */
function TenantGraph({
  familyGroups,
  relationships,
  objectCount,
  relationshipCount,
  tenantId,
}: Pick<
  TenantDetailModel,
  'familyGroups' | 'relationships' | 'objectCount' | 'relationshipCount'
> & {
  tenantId: string;
}) {
  const familyCount = familyGroups.length;

  return (
    <>
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: Bestandszustand (`aria-label` auf
          generischem `div` ist laut ARIA nicht zugesichert). Eine Korrektur (Rolle ergänzen oder
          Label entfernen) wäre eine Produktänderung außerhalb von WP-018 – als A11y-Befund für
          die sichtbare Abnahme (Slice 2) vorgemerkt, nicht still behoben. */}
      <div className="tw-summary" aria-label="Kennzahlen des digitalen Zwillings">
        <div className="tw-stat">
          <span className="tw-stat-num">{objectCount}</span>
          <span className="tw-stat-label">Objekte</span>
        </div>
        <div className="tw-stat">
          <span className="tw-stat-num">{familyCount}</span>
          <span className="tw-stat-label">Objektfamilien</span>
        </div>
        <div className="tw-stat">
          <span className="tw-stat-num">{relationshipCount}</span>
          <span className="tw-stat-label">Beziehungen</span>
        </div>
      </div>

      <h2 id="objekte">Objekte nach Familie</h2>
      {familyGroups.map((group) => (
        /* KEIN FAMILIENCODE IM ANZEIGETEXT (WP-028-Fixpass, DR-0013 Nr. 2 nennt Familiencodes
           namentlich unter „weg"): Bis hierher trug das Badge „F01" und der `aria-label`
           „F01 Tenant & Unternehmenskontext" – interne Katalogkennung im Produkttext, auf jedem
           Familienabschnitt und auf jeder Objektkarte. Sichtbar ist jetzt ausschließlich der
           deutsche Familienname aus dem Vertrag (`OBJECT_FAMILIES[].name`, Dok. 07, Abschnitt
           „Objektfamilien und kanonischer Katalog"). Die Kennung `group.id` bleibt unverändert
           technischer Schlüssel (React-`key`, Zuordnung Objekttyp → Familie) – sie ist Kennung,
           kein Anzeigetext. Der Wächter `components/__tests__/produktsprache.test.tsx` prüft die
           Abwesenheit jetzt app-weit. */
        <section key={group.id} aria-label={group.name}>
          <div className="tw-family-head">
            <h3>
              <Badge variant="family">{group.name}</Badge>
            </h3>
          </div>
          <p className="tw-family-leitfrage">{group.leitfrage}</p>
          <ul className="tw-grid">
            {group.objects.map((object) => (
              <ObjectCard
                key={object.object_id}
                object={object}
                familyName={group.name}
                tenantId={tenantId}
              />
            ))}
          </ul>
        </section>
      ))}

      <h2 id="beziehungen">Beziehungen</h2>
      <p className="tw-muted">
        Gerichtete Beziehungen (Quelle —Typ→ Ziel) im kanonischen Beziehungsmodell.
      </p>
      <RelationshipList relationships={relationships} tenantId={tenantId} />
    </>
  );
}

/**
 * Ehrlicher, MANDANTENLOKALER Leerzustand (Review-Pass WP-020, Security-Finding).
 *
 * Hier stand bis zum Fix: „Ausmodelliert ist bislang <Namen fremder Mandanten>; die übrigen
 * Mandanten folgen in späteren Ausbaustufen" – samt Links auf fremde Mandanten-Detailseiten.
 * Das war die VIERTE unabhängige Fundstelle der Leerzustands-Leak-Klasse (nach /isms,
 * /entscheidungen, /services): eine Existenzaussage über FREMDE Mandanten im Leerzustand
 * (Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" / P09). Der Leerzustand
 * sagt jetzt ausschließlich etwas über DIESEN Mandanten; der nächste Schritt führt in die
 * Mandanten-ÜBERSICHT – die ist als Portfolio-Seite BEWUSST mandantenübergreifend
 * (O-WP020-11) und der legitime Ort für „wer ist modelliert". Der Wächter
 * `components/__tests__/leerzustand-mandantengrenze.test.tsx` prüft das mechanisch.
 */
function EmptyGraphState({ tenantName }: { tenantName: string }) {
  return (
    <>
      <h2 id="objektgraph">Digitaler Zwilling</h2>
      <div className="tw-empty" role="note">
        <h3>Kein digitaler Zwilling für {tenantName} erfasst</h3>
        <p style={{ marginTop: 0 }}>
          Für <strong>{tenantName}</strong> ist im aktuellen Datenbestand kein digitaler Zwilling
          modelliert. Die Seite bleibt erreichbar und zeigt ausschließlich, was für diesen Mandanten
          belegt ist.
        </p>
        <p className="tw-muted">
          Bewusst kein Platzhalter-Inhalt: hier erscheinen ausschließlich aus dem Datenbestand
          abgeleitete Objekte und Beziehungen – keine erfundenen.
        </p>
        {/* Nächster Schritt (Dok. 06 §17): zurück zum Ort „Kunden". Wohin dieser Ort führt,
            entscheidet die Sphäre der aktiven Rolle – der Link behauptet deshalb keine
            Mandantenliste (Mandantengrenze). */}
        <p className="tw-empty-actions" style={{ marginBottom: 0 }}>
          <Link className="tw-cta" href="/twin">
            ← Zurück zu Kunden
          </Link>
        </p>
      </div>
    </>
  );
}
