/**
 * Warnungen des Cockpits – jede aus einer ECHTEN, erfassten Datenlücke (WP-025, DR-0008/DR-0010).
 *
 * OWNER-GRUNDSATZ „nichts nur Show": Es gibt KEINE erfundene Warnung. Jede Warnung entsteht
 * mechanisch aus dem Datenbestand des AKTIVEN Mandanten; Anzahl, Titel und Begründung kommen aus
 * den Zahlen, nicht aus einer Einschätzung. Die Schwere (Ampel-Status) folgt derselben
 * offengelegten Regel wie die Abdeckungen (`lib/cockpit/ampel.ts`) – nie einem Sicherheitsurteil.
 *
 * VIER QUELLEN (genau die im Auftrag benannten echten Lücken):
 *  1. Controls ohne Nachweis      – `controls.filter(c => c.evidenced_by.length === 0)`.
 *  2. Risiken ohne Minderung      – `risks.filter(r => r.mitigated_by.length === 0)`.
 *  3. Kanonische Katalog-Strukturtypen, die der AKTIVE Mandant NICHT als Objekttyp materialisiert
 *     – abgeleitet aus `getObjectsForTenant(tenantId)` gegen den Kandidatenkatalog
 *     `MATERIALISIERUNGS_LUECKEN` (`lib/kunden/struktur.ts`, u. a. Strategie-DNA, Target Profile).
 *     Die Warnung schrumpft automatisch, sobald ein Typ materialisiert wird; ist keiner der
 *     Katalogtypen mehr offen, entfällt sie (kein statischer Alarm über eine überholte Lücke).
 *  4. Modell-Datenlücke Risiko↔Szenario – der Objektvertrag legt keine direkte Kante fest
 *     (dokumentierte offene Modellfrage; hier BENANNT, nicht konstruiert).
 *
 * SCHWERE = OFFENGELEGTE AMPEL-REGEL (keine zweite Skala): Der Ampel-Status jeder Deckungslücke
 * kommt aus `coverageStatus(covered, total, klein)` (`lib/cockpit/ampel.ts`) – also derselben
 * Regel wie die Deckungskacheln. Damit gilt auch hier die Kleinheitsregel (DR-0013 Nr. 7): eine
 * kleine Grundgesamtheit (n≤2) ist NEUTRAL (`info`), kein Alarm – „0 von 1 Control ohne Nachweis"
 * ist kein roter Alarm, sondern zu wenig Grundgesamtheit für eine Aussage.
 *
 * EHRLICHER LEERZUSTAND (DR-0013 Nr. 11 / Mandantengrenze): Ein Mandant ohne Datenbestand
 * (Finovia/MediCore) erhält KEINE Warnungen – es wird keine Lücke erfunden, und es fällt kein Wort
 * über einen fremden Mandanten. Die Rückgabe ist die leere Liste.
 *
 * FUNKTIONALITÄT (Usability U-09): Jede Warnung führt zu einem REAL existierenden Ziel. Bei
 * Objekt-Lücken (Controls/Risiken) trägt die Warnung zusätzlich die Liste der betroffenen Objekte,
 * je mit direktem Weg auf ihre Objekt-360-Seite (`objectDetailHref`) – die Deckung führt damit ZU
 * den Lückenobjekten, nicht nur zur Gesamtsektion.
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/dashboard.ts`).
 */

import { anzahl } from '../heute/data';
import { istKleineGrundgesamtheit } from '../heute/dashboard';
import { buildIsmsCoreView } from '../isms/data';
import { MATERIALISIERUNGS_LUECKEN } from '../kunden/struktur';
import { getPlace } from '../shell/places';
import { getObjectsForTenant, getRelationshipsForTenant, getTenant } from '../twin/data';
import { objectDetailHref } from '../twin/routes';
import { coverageStatus, type CockpitStatus } from './ampel';

/** Ein betroffenes Lückenobjekt mit direktem Weg auf seine Objekt-360-Seite. */
export interface CockpitWarnungObjekt {
  readonly name: string;
  readonly href: string;
}

export interface CockpitWarnung {
  /** Stabile Kennung (interner Anker, kein UI-Text). */
  readonly id: string;
  /** Ampel-Status nach der offengelegten Regel (keine erfundene Schwere). */
  readonly status: CockpitStatus;
  /** Zahlengebundener Titel („5 Controls ohne Nachweis"). */
  readonly titel: string;
  /** Mechanische Begründung aus den Daten – ohne Sicherheits- oder Wirksamkeitsurteil. */
  readonly begruendung: string;
  /** Primäres, real existierendes Ziel (Sektion/Assistent) – „→ ansehen". */
  readonly ziel: { readonly label: string; readonly href: string };
  /** Betroffene Objekte je mit Objekt-360-Weg (leer, wenn die Lücke keine Objekte hat). */
  readonly objekte: readonly CockpitWarnungObjekt[];
}

/**
 * Baut die Warnungen des aktiven Mandanten vollständig aus dem Seed.
 * `[]` bei unbekanntem Mandanten (keine Existenzaussage) und bei leerem Mandanten (ehrlicher
 * Leerzustand – keine erfundene Warnung, kein fremder Mandant).
 */
export function buildCockpitWarnungen(tenantId: string): CockpitWarnung[] {
  const tenant = getTenant(tenantId);
  if (!tenant) return [];

  const objects = getObjectsForTenant(tenantId);
  const relationships = getRelationshipsForTenant(tenantId);
  if (objects.length === 0 && relationships.length === 0) return [];

  const core = buildIsmsCoreView(tenantId);
  const ismsHref = getPlace('isms').href;
  const warnungen: CockpitWarnung[] = [];

  // (1) Controls ohne eingehende Nachweis-Beziehung.
  const controlsLuecke = core.controls.filter((c) => c.evidenced_by.length === 0);
  if (controlsLuecke.length > 0) {
    warnungen.push({
      id: 'controls_ohne_nachweis',
      // Schwere aus der offengelegten Ampel-Regel (inkl. Kleinheitsregel): x = Controls MIT
      // Nachweis, y = alle Controls. Kleine Grundgesamtheit → neutral (info), kein Alarm.
      status: coverageStatus(
        core.controls.length - controlsLuecke.length,
        core.controls.length,
        istKleineGrundgesamtheit(core.controls.length),
      ),
      titel: anzahl(controlsLuecke.length, 'Control ohne Nachweis', 'Controls ohne Nachweis'),
      begruendung:
        `Von ${anzahl(core.controls.length, 'erfassten Control', 'erfassten Controls')} ` +
        `trägt diese Auswahl keine eingehende Nachweis-Beziehung. Ob ein Nachweis fachlich ` +
        `nötig ist, sagt der Datenbestand nicht.`,
      ziel: { label: 'Zum Control-Abschnitt', href: `${ismsHref}#isms-controls` },
      objekte: controlsLuecke.map((c) => ({
        name: c.control.name,
        href: objectDetailHref(tenantId, c.control.object_id),
      })),
    });
  }

  // (2) Risiken ohne eingehende Minderungs-Beziehung.
  const risikenLuecke = core.risks.filter((r) => r.mitigated_by.length === 0);
  if (risikenLuecke.length > 0) {
    warnungen.push({
      id: 'risiken_ohne_minderung',
      // Schwere aus der offengelegten Ampel-Regel (inkl. Kleinheitsregel): x = Risiken MIT
      // Minderung, y = alle Risiken. Kleine Grundgesamtheit → neutral (info), kein Alarm.
      status: coverageStatus(
        core.risks.length - risikenLuecke.length,
        core.risks.length,
        istKleineGrundgesamtheit(core.risks.length),
      ),
      titel: anzahl(risikenLuecke.length, 'Risiko ohne Minderung', 'Risiken ohne Minderung'),
      begruendung:
        `Von ${anzahl(core.risks.length, 'erfassten Risiko', 'erfassten Risiken')} ` +
        `trägt diese Auswahl keine eingehende Minderungs-Beziehung von einem Control oder einer ` +
        `Maßnahme. Über die Wirksamkeit einer Minderung sagt die Beziehung nichts aus.`,
      ziel: { label: 'Zum Risiko-Abschnitt', href: `${ismsHref}#isms-risiken` },
      objekte: risikenLuecke.map((r) => ({
        name: r.risk.name,
        href: objectDetailHref(tenantId, r.risk.object_id),
      })),
    });
  }

  // (3) Kanonische Katalog-Strukturtypen, die der AKTIVE Mandant nicht als Objekttyp trägt
  //     (neutraler Stand). Abgeleitet aus den tatsächlichen Objekttypen von
  //     `getObjectsForTenant` gegen den Kandidatenkatalog `MATERIALISIERUNGS_LUECKEN`: Sobald
  //     ein Typ materialisiert wird, verschwindet er aus der Liste; ist keiner mehr offen,
  //     entfällt die Warnung ganz (kein statischer Alarm über eine überholte Lücke).
  const vorhandeneObjekttypen = new Set<string>(objects.map((o) => o.object_type));
  const fehlendeStrukturtypen = MATERIALISIERUNGS_LUECKEN.filter(
    (typ) => !vorhandeneObjekttypen.has(typ),
  );
  if (fehlendeStrukturtypen.length > 0) {
    warnungen.push({
      id: 'strukturtypen_nicht_angelegt',
      status: 'info',
      titel: 'Kanonische Strukturtypen nicht angelegt',
      begruendung:
        `Der Datenbestand dieses Mandanten legt ` +
        `${anzahl(fehlendeStrukturtypen.length, 'kanonischen Strukturtyp', 'kanonische Strukturtypen')} ` +
        `des Modells nicht an: ${fehlendeStrukturtypen.join(', ')}. Diese Strukturen erklärt der ` +
        `Struktur-Assistent, statt leere Objekte oder Beispielwerte zu erfinden.`,
      ziel: { label: 'Struktur-Assistent öffnen', href: '/kunden/struktur' },
      objekte: [],
    });
  }

  // (4) Modell-Datenlücke Risiko↔Szenario – nur benennen, wenn beide Seiten erfasst sind.
  if (core.risks.length > 0 && core.scenarios.length > 0) {
    warnungen.push({
      id: 'risiko_szenario_modelluecke',
      status: 'info',
      titel: 'Risiko und Szenario nicht direkt verknüpft',
      begruendung:
        `Der Datenbestand führt ${anzahl(core.risks.length, 'Risiko', 'Risiken')} und ` +
        `${anzahl(core.scenarios.length, 'Szenario', 'Szenarien')}, aber keine direkte ` +
        `Beziehung zwischen ihnen. Das Modell legt diese Zuordnung heute nicht als Kante fest; ` +
        `sie wird deshalb nicht konstruiert.`,
      ziel: { label: 'Zum Risiko-Abschnitt', href: `${ismsHref}#isms-risiken` },
      objekte: [],
    });
  }

  return warnungen;
}
