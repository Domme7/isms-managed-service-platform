/**
 * Unit-Tests der React-freien Register-Helfer des Ortes „Entscheidungen" (WP-017 Slice 2).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` und den kanonischen Vertrag aus `@isms/contracts`
 * (keine Mocks):
 *  1. Kanonische Typen: nur Vertragswerte, keine erfundenen Objekt-/Beziehungstypen.
 *  2. Nordwerk: Entscheidungen in Datenbestandsreihenfolge mit belegten Envelope-Feldern.
 *  3. Getrennte Zeitachsen: geschlossenes `valid_time`-Intervall des abgelösten Stands,
 *     lückenloser Anschluss des Nachfolgestands, Bitemporalität, `version`/`replaced_at`.
 *  4. Kanten richtungstreu: R23 (Bezug), R15 (Nachweis), R03 (Verantwortung) eingehend,
 *     R24 in BEIDE Richtungen getrennt.
 *  5. Mandantentrennung als Sicherheitsgrenze: fremde Objekte/Kanten verändern kein Ergebnis,
 *     unbekannter Mandant liefert `undefined`, alle Links tragen den eigenen Mandanten.
 *  6. Zwei fachlich verschiedene Leerfälle (Graph ohne Entscheidungen / gar kein Graph).
 *  7. Wächter für den Ehrlichkeitsblock: die als „kein Träger" benannten Decision-Card-
 *     Pflichtfelder haben im Contract tatsächlich keinen Träger – entsteht einer, wird der
 *     Test rot, statt dass der Produkttext still falsch wird.
 */
import { describe, expect, it } from 'vitest';

import {
  OBJECT_TYPE,
  ObjectEnvelope,
  RELATIONSHIP_TYPE,
  RelationshipEnvelope,
} from '@isms/contracts';
import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';

import {
  DECISION_CARD_FIELDS,
  DECISION_EVIDENCE_EDGE,
  DECISION_OBJECT_TYPE,
  DECISION_ORDER_RULE,
  DECISION_OWNS_EDGE,
  DECISION_RECORD_CONTENTS,
  DECISION_REFERENCE_EDGE,
  DECISION_SUPERSEDES_EDGE,
  buildDecisionRegister,
  buildDecisionRegisterModel,
  countDecisionCardFields,
  type DecisionEntry,
  type DecisionRegisterModel,
} from '../data';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

function registerOrThrow(tenantId: string): DecisionRegisterModel {
  const model = buildDecisionRegister(tenantId);
  if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return model;
}

function decisionByStatus(model: DecisionRegisterModel, status: string): DecisionEntry {
  const found = model.decisions.find((d) => d.lifecycle_status === status);
  if (!found) throw new Error(`Keine Entscheidung mit Lebenszyklus-Stand „${status}"`);
  return found;
}

const NORDWERK = registerOrThrow(TENANT_ID.NORDWERK);

/* -----------------------------------------------------------------------------
 * 1. Kanonische Typen
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – nur kanonische Typen (Dok. 07 §6/§9)', () => {
  it('nutzt ausschließlich Objekt- und Beziehungstypen aus dem Vertrag', () => {
    const objectTypes: readonly string[] = OBJECT_TYPE;
    const relationshipTypes: readonly string[] = RELATIONSHIP_TYPE;

    expect(objectTypes).toContain(DECISION_OBJECT_TYPE);
    for (const type of [
      DECISION_REFERENCE_EDGE,
      DECISION_EVIDENCE_EDGE,
      DECISION_SUPERSEDES_EDGE,
      DECISION_OWNS_EDGE,
    ]) {
      expect(relationshipTypes, `Beziehungstyp „${type}"`).toContain(type);
    }
  });

  it('führt die Reihenfolgeregel als sichtbaren Text und ohne Rangaussage', () => {
    expect(NORDWERK.orderRule).toBe(DECISION_ORDER_RULE);
    expect(DECISION_ORDER_RULE).toMatch(/Reihenfolge des Datenbestands/);
    expect(DECISION_ORDER_RULE).toMatch(/keine Rangfolge/);
  });
});

/* -----------------------------------------------------------------------------
 * 2. Nordwerk – belegte Envelope-Felder in Datenbestandsreihenfolge
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – Nordwerk', () => {
  it('führt genau die Entscheidungen des Mandanten in Datenbestandsreihenfolge', () => {
    const erwartet = DEMO_SEED.objects
      .filter((o) => o.tenant_id === TENANT_ID.NORDWERK && o.object_type === DECISION_OBJECT_TYPE)
      .map((o) => o.object_id);

    expect(erwartet.length).toBeGreaterThanOrEqual(1);
    expect(NORDWERK.decisions.map((d) => d.object_id)).toEqual(erwartet);
    expect(NORDWERK.isEmpty).toBe(false);
    expect(NORDWERK.hasObjectGraph).toBe(true);
  });

  it('übernimmt Entscheidungsfrage, Kontext und Lebenszyklus-Stand wörtlich aus dem Seed', () => {
    for (const decision of NORDWERK.decisions) {
      const seed = DEMO_SEED.objects.find((o) => o.object_id === decision.object_id);
      expect(seed).toBeDefined();
      expect(decision.question).toBe(seed?.display_name);
      expect(decision.context).toBe(seed?.description);
      expect(decision.lifecycle_status).toBe(seed?.lifecycle_status);
      expect(decision.object_type).toBe(DECISION_OBJECT_TYPE);
      // F09 „Ziele, Entscheidungen & Services" – aus dem Katalog abgeleitet, nicht gesetzt.
      expect(decision.family_id).toBe('F09');
      expect(decision.scope_ids.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('löst den Owner gegen ein Objekt desselben Mandanten auf und ergänzt die R03-Kante', () => {
    for (const decision of NORDWERK.decisions) {
      expect(decision.owners.length).toBeGreaterThanOrEqual(1);
      for (const owner of decision.owners) {
        expect(owner.resolved).toBe(true);
        // Fail-loud-Gegenprobe: bei Auflösung steht der Name, nicht die rohe Kennung.
        expect(owner.name).not.toBe(owner.owner_id);
        expect(owner.href).toBe(
          `/twin/${TENANT_ID.NORDWERK}/objekt/${encodeURIComponent(owner.owner_id)}`,
        );
      }
      expect(decision.owned_by.length).toBeGreaterThanOrEqual(1);
      for (const edge of decision.owned_by) {
        expect(edge.relationship_type).toBe(DECISION_OWNS_EDGE);
        expect(edge.relationship_type_id).toBe('R03');
        expect(edge.orientation).toBe('eingehend');
      }
    }
  });

  it('liest Provenance und Datenqualität unverrechnet (Dok. 07 §12/D10)', () => {
    for (const decision of NORDWERK.decisions) {
      const seed = DEMO_SEED.objects.find((o) => o.object_id === decision.object_id);
      expect(decision.source_refs).toEqual(seed?.source_refs);
      expect(decision.quality_dimensions).toEqual(seed?.quality_state.dimensions);
    }
    // Die Bestätigungsstufe wird gelesen, nicht gebildet.
    const abgeloest = decisionByStatus(NORDWERK, 'Überholt');
    expect(abgeloest.confirmation_level).toBe('freigegeben');
  });
});

/* -----------------------------------------------------------------------------
 * 3. Zwei Zeitachsen (Dok. 07 §11/D07) und die Ablösung als fachliches Ende
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – fachliche Gültigkeit und Systemerfassung getrennt', () => {
  it('führt für den abgelösten Stand ein geschlossenes Intervall, sonst ein offenes', () => {
    const abgeloest = decisionByStatus(NORDWERK, 'Überholt');
    expect(abgeloest.valid_to).not.toBeNull();

    const nachfolger = decisionByStatus(NORDWERK, 'genehmigt');
    expect(nachfolger.valid_to).toBeNull();
    // Der Nachfolgestand beginnt fachlich genau dort, wo der abgelöste endet.
    expect(nachfolger.valid_from).toBe(abgeloest.valid_to);
  });

  it('hält Bitemporalität ein: fachlicher Beginn liegt vor der Systemerfassung', () => {
    for (const decision of NORDWERK.decisions) {
      expect(decision.valid_from < decision.recorded_at).toBe(true);
    }
  });

  it('macht die Ablösung fachlich, nicht als Datensatzversion (O-WP017-07)', () => {
    for (const decision of NORDWERK.decisions) {
      expect(decision.version).toBe(1);
      expect(decision.replaced_at).toBeNull();
    }
  });

  it('weist den Datenstand als Systemachse aus (jüngster Erfassungstag der Entscheidungen)', () => {
    const tage = NORDWERK.decisions.map((d) => d.recorded_at.slice(0, 10)).sort();
    expect(NORDWERK.recordedOn).toBe(tage[tage.length - 1]);
    expect(NORDWERK.recordedOnDisplay).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
  });
});

/* -----------------------------------------------------------------------------
 * 4. Kanten richtungstreu
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – Bezug, Nachweis und Ablösekette richtungstreu', () => {
  it('führt jeden Bezug als EINGEHENDE R23-Kante von einem bestehenden Objekt', () => {
    for (const decision of NORDWERK.decisions) {
      expect(decision.references.length).toBeGreaterThanOrEqual(1);
      for (const edge of decision.references) {
        expect(edge.relationship_type).toBe(DECISION_REFERENCE_EDGE);
        expect(edge.relationship_type_id).toBe('R23');
        expect(edge.relationship_type_label).toBe('entschieden in');
        expect(edge.orientation).toBe('eingehend');
        expect(edge.resolved).toBe(true);
        // Herkunft der Aussage und Status der Beziehung stammen aus der Kante.
        expect(edge.assertion_kind).toBeTruthy();
        expect(edge.edge_status).toBeTruthy();
        // Kein Vertrauensgrad im Seed – die Lücke wird sichtbar gemacht, nicht gefüllt.
        expect(edge.confidence_display).toBeUndefined();
      }
    }
  });

  it('führt den Nachweis als eingehende R15-Kante mit Quelle vom Typ „Evidence"', () => {
    const mitNachweis = NORDWERK.decisions.filter((d) => d.evidence.length > 0);
    expect(mitNachweis.length).toBeGreaterThanOrEqual(1);
    for (const decision of mitNachweis) {
      for (const edge of decision.evidence) {
        expect(edge.relationship_type).toBe(DECISION_EVIDENCE_EDGE);
        expect(edge.relationship_type_id).toBe('R15');
        expect(edge.orientation).toBe('eingehend');
        expect(edge.object_type).toBe('Evidence');
      }
    }
    // Eine fehlende Nachweiskante wird NICHT versteckt: sie bleibt eine leere Liste, die die
    // Komponente ausschreibt (Dok. 07 §21).
    expect(NORDWERK.decisions.some((d) => d.evidence.length === 0)).toBe(true);
  });

  it('trennt die Ablösekette in beide Richtungen und lässt den Vorgänger sichtbar', () => {
    const abgeloest = decisionByStatus(NORDWERK, 'Überholt');
    const nachfolger = decisionByStatus(NORDWERK, 'genehmigt');

    // Nachfolger ist QUELLE der Kante (Dok. 07 §9 R24 „Version/Policy/Decision -> Vorgänger").
    expect(nachfolger.supersedes.map((e) => e.object_id)).toEqual([abgeloest.object_id]);
    expect(nachfolger.superseded_by).toEqual([]);
    expect(nachfolger.supersedes[0]?.orientation).toBe('ausgehend');
    expect(nachfolger.supersedes[0]?.relationship_type_id).toBe('R24');

    // Vorgänger sieht dieselbe Kante als eingehend – und bleibt im Register enthalten.
    expect(abgeloest.superseded_by.map((e) => e.object_id)).toEqual([nachfolger.object_id]);
    expect(abgeloest.supersedes).toEqual([]);
    expect(abgeloest.superseded_by[0]?.orientation).toBe('eingehend');

    // Beide Kantenseiten tragen die fachliche Gültigkeit des GENANNTEN Stands.
    expect(nachfolger.supersedes[0]?.neighbor_valid_from).toBe(abgeloest.valid_from);
    expect(nachfolger.supersedes[0]?.neighbor_valid_to).toBe(abgeloest.valid_to);
    expect(abgeloest.superseded_by[0]?.neighbor_valid_to).toBeNull();

    // Genau ein Ablösepaar im Mandanten – mehr behauptet der Datenbestand nicht.
    const kanten = NORDWERK.decisions.flatMap((d) => d.supersedes);
    expect(kanten).toHaveLength(1);
  });

  it('bildet jede Route über objectDetailHref mit dem aktiven Mandanten', () => {
    const prefix = `/twin/${TENANT_ID.NORDWERK}/objekt/`;
    const eigeneIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    const hrefs: string[] = [];
    for (const decision of NORDWERK.decisions) {
      hrefs.push(decision.href);
      for (const owner of decision.owners) if (owner.href) hrefs.push(owner.href);
      for (const edge of [
        ...decision.owned_by,
        ...decision.references,
        ...decision.evidence,
        ...decision.supersedes,
        ...decision.superseded_by,
      ]) {
        if (edge.href) hrefs.push(edge.href);
      }
    }

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith(prefix)).toBe(true);
      expect(eigeneIds.has(decodeURIComponent(href.slice(prefix.length)))).toBe(true);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 5. Mandantentrennung (Dok. 07 §17/P09) – Sicherheitsgrenze
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – Negativbeweis Mandantentrennung', () => {
  it('liefert für einen unbekannten Mandanten `undefined` (keine Existenzaussage)', () => {
    expect(buildDecisionRegister('tenant-gibt-es-nicht')).toBeUndefined();
  });

  it('ignoriert mandantenfremde Objekte und Kanten in der übergebenen Liste', () => {
    const referenz = buildDecisionRegisterModel(
      tenant(TENANT_ID.NORDWERK),
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK),
      DEMO_SEED.relationships.filter((r) => r.tenant_id === TENANT_ID.NORDWERK),
    );
    // Gleiche Ableitung, aber mit dem VOLLSTÄNDIGEN Seed (alle Mandanten) als Eingabe.
    const mitFremden = buildDecisionRegisterModel(
      tenant(TENANT_ID.NORDWERK),
      DEMO_SEED.objects,
      DEMO_SEED.relationships,
    );

    expect(mitFremden).toEqual(referenz);
    expect(mitFremden.objectCount).toBe(referenz.objectCount);
  });

  it('ignoriert eine konstruierte Kante über die Mandantengrenze', () => {
    const abgeloest = decisionByStatus(NORDWERK, 'Überholt');
    const fremdesObjekt = DEMO_SEED.objects.find(
      (o) => o.tenant_id === TENANT_ID.CONSULTING_OPERATOR,
    );
    expect(fremdesObjekt).toBeDefined();

    // Synthetische Kante eines FREMDEN Mandanten auf eine Nordwerk-Entscheidung: sie darf das
    // Ergebnis nicht verändern (weder als Bezug noch als Nachweis).
    const fremdeKante: RelationshipEnvelope = {
      relationship_id: 'test-fremde-kante',
      tenant_id: TENANT_ID.CONSULTING_OPERATOR,
      relationship_type: DECISION_REFERENCE_EDGE,
      source_id: (fremdesObjekt as { object_id: string }).object_id,
      target_id: abgeloest.object_id,
      direction: 'gerichtet',
      valid_time: { from: '2026-01-01T00:00:00.000Z', to: null },
      record_time: { recorded_at: '2026-03-16T08:00:00.000Z' },
      assertion_kind: 'assertiert',
      source_refs: [],
    };

    const mitFremderKante = buildDecisionRegisterModel(
      tenant(TENANT_ID.NORDWERK),
      DEMO_SEED.objects,
      [...DEMO_SEED.relationships, fremdeKante],
    );

    expect(mitFremderKante).toEqual(NORDWERK);
  });
});

/* -----------------------------------------------------------------------------
 * 6. Zwei fachlich verschiedene Leerfälle
 * --------------------------------------------------------------------------- */

describe('Entscheidungsregister – Leerfälle sind nicht derselbe Fall', () => {
  it('Consulting Operator: Datenbestand vorhanden, aber keine Entscheidungen', () => {
    const model = registerOrThrow(TENANT_ID.CONSULTING_OPERATOR);
    expect(model.isEmpty).toBe(true);
    expect(model.hasObjectGraph).toBe(true);
    expect(model.objectCount).toBeGreaterThan(0);
    expect(model.relationshipCount).toBeGreaterThan(0);
    expect(model.recordedOn).toBeUndefined();
    expect(model.scopeIds).toEqual([]);
  });

  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: gar kein Datenbestand – wohldefiniertes leeres Modell`, () => {
      const model = registerOrThrow(tenantId);
      expect(model.isEmpty).toBe(true);
      expect(model.hasObjectGraph).toBe(false);
      expect(model.objectCount).toBe(0);
      expect(model.relationshipCount).toBe(0);
      expect(model.decisions).toEqual([]);
    });
  }

  it('modelliert Entscheidungen bewusst nur für Nordwerk (O-WP017-08)', () => {
    const mitEntscheidungen = [
      ...new Set(
        DEMO_SEED.objects
          .filter((o) => o.object_type === DECISION_OBJECT_TYPE)
          .map((o) => o.tenant_id),
      ),
    ];
    expect(mitEntscheidungen).toEqual([TENANT_ID.NORDWERK]);
  });

  /**
   * WÄCHTER (Sicherheitsgrenze): Dieses Modul darf keine Funktion anbieten, die über MEHRERE
   * Mandanten zählt. Eine solche Zahl wäre auch ohne fremden Namen eine Aussage über fremde
   * Mandanten – der Leerzustand eines Mandanten verriete die Datenlage eines anderen. Genau das
   * hatte die entfernte `getTenantsWithDecisions()` getan (Review-Fix).
   */
  it('bietet keine mandantenübergreifende Auswertung an', async () => {
    const modul: Record<string, unknown> = await import('../data');
    // Namensmuster einer Auswertung über MEHRERE Mandanten („…Tenants…", „allTenants", …).
    const verdaechtig = /tenants[a-z]|alltenants|acrosstenants/i;
    for (const name of Object.keys(modul)) {
      expect(
        verdaechtig.test(name),
        `Export „${name}" wertet dem Namen nach über mehrere Mandanten aus`,
      ).toBe(false);
    }
    expect(Object.keys(modul)).not.toContain('getTenantsWithDecisions');
  });
});

/* -----------------------------------------------------------------------------
 * 7. Wächter: der Ehrlichkeitsblock kann nicht still veralten
 * --------------------------------------------------------------------------- */

/**
 * Feldnamen-Muster je „kein Träger"-Pflichtfeld. Entsteht im Objekt- ODER Beziehungs-Envelope
 * ein Feld, das zu einem dieser Muster passt, ist die Aussage „kein Träger" nicht mehr wahr –
 * dann wird dieser Test rot, statt dass der Produkttext still falsch wird (WP-017 Acceptance 17,
 * gleiches Wächterprinzip wie in WP-014/WP-016).
 */
const KEIN_TRAEGER_MUSTER: Readonly<Record<string, RegExp>> = {
  Auslöser: /trigger|ausl(oe|ö)ser|signal/i,
  Baseline: /baseline|ausgangslage|nichtstun/i,
  Optionen: /option|alternativ/i,
  Wirkung: /impact|wirkung(?!sannahme)/i,
  Ressourcen: /resource|ressource|aufwand|effort|kapazit|capacity|skill/i,
  Abhängigkeiten: /depend|abh(ae|ä)ngig|voraussetzung|prerequisite/i,
  Empfehlung: /recommend|empfehl/i,
  Frist: /frist|deadline|due_|f(ae|ä)llig/i,
  'Outcome Check': /outcome|(ue|ü)berpr(ue|ü)f|review_/i,
};

describe('Ehrlichkeitsblock – Decision-Card-Pflichtfelder gegen den Contract', () => {
  const objectFields = Object.keys(ObjectEnvelope.shape);
  const relationshipFields = Object.keys(RelationshipEnvelope.shape);

  it('führt genau die 14 Pflichtfelder aus Dok. 10 §9.1, jedes genau einmal', () => {
    expect(DECISION_CARD_FIELDS).toHaveLength(14);
    const namen = DECISION_CARD_FIELDS.map((f) => f.field);
    expect(new Set(namen).size).toBe(namen.length);
    // Die im Produkt gezeigten Anzahlen entstehen aus dieser Liste, nicht aus einer Konstante.
    expect(countDecisionCardFields('kein Träger') + countDecisionCardFields('teilweise')).toBe(14);
    expect(countDecisionCardFields('kein Träger')).toBeGreaterThan(0);
  });

  it('benennt die vom WP geforderten Lücken ausdrücklich als fehlend', () => {
    const ohneTraeger = DECISION_CARD_FIELDS.filter((f) => f.coverage === 'kein Träger').map(
      (f) => f.field,
    );
    for (const feld of [
      'Auslöser',
      'Baseline',
      // Feldname WÖRTLICH aus Dok. 10, Abschnitt „Decision Cards"/„Pflichtfelder": dort steht
      // „Optionen"; „mindestens eine realistische Handlungsalternative und Nichtstun" ist die
      // Bedeutungsspalte, nicht Teil des Namens (Review-Fix).
      'Optionen',
      'Wirkung',
      'Ressourcen',
      'Abhängigkeiten',
      'Empfehlung',
      'Frist',
      'Outcome Check',
    ]) {
      expect(ohneTraeger, `Pflichtfeld „${feld}"`).toContain(feld);
    }
    // „Approver" hat keinen eigenen Feldnamen im Contract: Dok. 10 §9.1 führt „Owner und
    // Approver" als EINE Zeile. Sie bleibt „teilweise" – die fehlende Freigaberolle muss
    // deshalb im Trägertext ausgesprochen sein (O-WP017-05).
    const ownerZeile = DECISION_CARD_FIELDS.find((f) => f.field === 'Owner und Approver');
    expect(ownerZeile?.coverage).toBe('teilweise');
    expect(ownerZeile?.carrier).toMatch(/Approver/);
    expect(relationshipFields).not.toContain('approver_ids');
    expect(objectFields.some((f) => /approv|freigabeberecht/i.test(f))).toBe(false);
  });

  it('belegt für jedes „kein Träger"-Feld, dass der Contract keinen Träger kennt', () => {
    const ohneTraeger = DECISION_CARD_FIELDS.filter((f) => f.coverage === 'kein Träger');
    for (const feld of ohneTraeger) {
      const muster = KEIN_TRAEGER_MUSTER[feld.field];
      // Ein neues „kein Träger"-Feld ohne Muster ist selbst ein Fehler: die Aussage wäre
      // ungeprüft.
      expect(muster, `Kein Prüfmuster für Pflichtfeld „${feld.field}"`).toBeDefined();
      for (const name of [...objectFields, ...relationshipFields]) {
        expect(
          muster.test(name),
          `„${feld.field}" wird als fehlend benannt, aber das Vertragsfeld „${name}" passt dazu`,
        ).toBe(false);
      }
    }
  });

  it('belegt für jedes „teilweise"-Feld den genannten Träger im Contract', () => {
    expect(objectFields).toContain('display_name');
    expect(objectFields).toContain('owner_ids');
    expect(objectFields).toContain('source_refs');
    expect(objectFields).toContain('quality_state');
    // Confidence ist ein Feld der BEZIEHUNG, nicht des Objekts – genau das sagt der Trägertext.
    expect(relationshipFields).toContain('confidence');
    expect(objectFields).not.toContain('confidence');
    const confidenceZeile = DECISION_CARD_FIELDS.find((f) => f.field === 'Confidence');
    expect(confidenceZeile?.coverage).toBe('teilweise');
  });

  it('führt die sieben Decision-Record-Inhalte aus Dok. 10 §9.2 getrennt und ohne Träger', () => {
    // Dok. 10, Abschnitt „Decision Cards" (Unterabschnitt „Decision Record"): „Festgehalten
    // werden Option, Begründung, Freigabe, Bedingungen, erwartete Wirkung, Reviewtermin und
    // spätere Ist-Wirkung." Das ist eine EIGENE Liste neben den 14 Pflichtfeldern.
    expect(DECISION_RECORD_CONTENTS.map((f) => f.field)).toEqual([
      'Option',
      'Begründung',
      'Freigabe',
      'Bedingungen',
      'erwartete Wirkung',
      'Reviewtermin',
      'spätere Ist-Wirkung',
    ]);
    // Getrennt geführt: keine Zeile taucht in beiden Listen auf, es entsteht keine Summe.
    const cardNamen = new Set(DECISION_CARD_FIELDS.map((f) => f.field));
    for (const inhalt of DECISION_RECORD_CONTENTS) {
      expect(cardNamen.has(inhalt.field)).toBe(false);
      expect(inhalt.coverage).toBe('kein Träger');
      expect(inhalt.carrier.length).toBeGreaterThan(0);
    }

    // Und keiner dieser Inhalte hat im Contract einen Träger – sonst wird der Text still falsch.
    const muster: Readonly<Record<string, RegExp>> = {
      Option: /option|alternativ/i,
      Begründung: /begr(ue|ü)ndung|rationale|justif/i,
      Freigabe: /freigabe|approv|sign_?off|release/i,
      Bedingungen: /bedingung|condition|constraint|auflage/i,
      'erwartete Wirkung': /impact|wirkung|expected_/i,
      Reviewtermin: /review|(ue|ü)berpr(ue|ü)f/i,
      'spätere Ist-Wirkung': /actual_|ist_wirkung|realized/i,
    };
    for (const inhalt of DECISION_RECORD_CONTENTS) {
      const regex = muster[inhalt.field];
      expect(regex, `Kein Prüfmuster für „${inhalt.field}"`).toBeDefined();
      for (const name of [...objectFields, ...relationshipFields]) {
        expect(
          regex.test(name),
          `„${inhalt.field}" wird als fehlend benannt, aber „${name}" passt dazu`,
        ).toBe(false);
      }
    }
  });

  it('führt an den Entscheidungen keine Erweiterungsfelder mit sich (kein Feld durch die Hintertür)', () => {
    for (const object of DEMO_SEED.objects.filter((o) => o.object_type === DECISION_OBJECT_TYPE)) {
      expect(object.tags_custom_fields).toBeUndefined();
    }
  });
});
