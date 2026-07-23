import { describe, it, expect } from 'vitest';
import {
  ALL_LIFECYCLE_STATUS,
  ASSERTION_KIND,
  CONFIRMATION_LEVEL,
  DATA_QUALITY_DIMENSION,
  LIFECYCLE_BY_CLASS,
  OBJECT_FAMILIES,
  OBJECT_FAMILY_ID,
  OBJECT_LIFECYCLE_STATUS,
  OBJECT_TYPE,
  RELATIONSHIP_TYPE,
  RELATIONSHIP_TYPE_ID,
  RELATIONSHIP_TYPES,
} from './vocabularies';

describe('Objektfamilien F01–F09 (Dok. 07 §6)', () => {
  it('kennt genau die neun Familien F01–F09', () => {
    expect([...OBJECT_FAMILY_ID]).toEqual([
      'F01',
      'F02',
      'F03',
      'F04',
      'F05',
      'F06',
      'F07',
      'F08',
      'F09',
    ]);
    expect(Object.keys(OBJECT_FAMILIES)).toEqual([...OBJECT_FAMILY_ID]);
  });

  it('bildet die Kernobjekte je Familie wörtlich aus Dok. 07 §6 ab', () => {
    expect([...OBJECT_FAMILIES.F01.types]).toEqual([
      'Tenant',
      'Organisation',
      'Rechtseinheit',
      'ISMS-Scope',
      'Ausschluss',
      'Strategie-DNA',
    ]);
    expect([...OBJECT_FAMILIES.F02.types]).toEqual([
      'Organisationseinheit',
      'Standort',
      'Team',
      'Person',
      'Produktrolle',
      'fachliche Rolle',
      'Vertretung',
    ]);
    expect([...OBJECT_FAMILIES.F03.types]).toEqual([
      'Business Capability',
      'Geschäftsprozess',
      'Produkt/Service',
      'Information Asset',
      'Datenklasse',
      'Kritikalität',
    ]);
    expect([...OBJECT_FAMILIES.F04.types]).toEqual([
      'Anwendung',
      'IT-Service',
      'System',
      'Komponente',
      'Cloud-Ressource',
      'Endpoint',
      'Netzwerkzone',
      'Schnittstelle',
    ]);
    expect([...OBJECT_FAMILIES.F05.types]).toEqual([
      'Lieferant',
      'Unterauftragnehmer',
      'Vertrag',
      'externe Leistung',
      'Datenverarbeitung',
      'Abhängigkeit',
    ]);
    expect([...OBJECT_FAMILIES.F06.types]).toEqual([
      'Framework',
      'Requirement',
      'Control Objective',
      'Control',
      'Control Implementation',
      'Policy',
      'Ausnahme',
    ]);
    expect([...OBJECT_FAMILIES.F07.types]).toEqual([
      'Threat',
      'Vulnerability',
      'Weakness',
      'Risk Scenario',
      'Risk',
      'Incident',
      'Finding',
      'Change Signal',
    ]);
    expect([...OBJECT_FAMILIES.F08.types]).toEqual([
      'Measure',
      'Task',
      'Evidence',
      'Control Test',
      'Assessment',
      'Audit',
      'Finding',
      'Remediation',
    ]);
    expect([...OBJECT_FAMILIES.F09.types]).toEqual([
      'Target Profile',
      'Objective',
      'KPI',
      'Decision Record',
      'Managed Service',
      'SLA',
      'Deliverable',
      'Review',
    ]);
  });

  it('flacht alle Familientypen in OBJECT_TYPE zusammen', () => {
    for (const familyId of OBJECT_FAMILY_ID) {
      for (const type of OBJECT_FAMILIES[familyId].types) {
        expect(OBJECT_TYPE).toContain(type);
      }
    }
  });

  it('führt "Finding" in F07 und F08 (dokumentierte Überschneidung)', () => {
    expect(OBJECT_FAMILIES.F07.types).toContain('Finding');
    expect(OBJECT_FAMILIES.F08.types).toContain('Finding');
  });
});

describe('Beziehungstypen R01–R25 (Dok. 07 §9)', () => {
  it('kennt genau 25 IDs R01–R25', () => {
    expect(RELATIONSHIP_TYPE_ID).toHaveLength(25);
    expect(Object.keys(RELATIONSHIP_TYPES)).toEqual([...RELATIONSHIP_TYPE_ID]);
  });

  it('bildet die kanonischen Beziehungstyp-Namen wörtlich ab', () => {
    expect([...RELATIONSHIP_TYPE]).toEqual([
      'part_of',
      'located_at',
      'owns',
      'operates',
      'supports',
      'depends_on',
      'processes',
      'exposes',
      'threatens',
      'affects',
      'caused_by',
      'mitigates',
      'implements',
      'satisfies',
      'evidences',
      'tests',
      'finds',
      'remediates',
      'requires',
      'contributes_to',
      'delivered_by',
      'covered_by',
      'decided_in',
      'supersedes',
      'related_to',
    ]);
  });

  it('ordnet jede R-ID ihrem Typnamen zu', () => {
    for (const id of RELATIONSHIP_TYPE_ID) {
      expect(RELATIONSHIP_TYPE).toContain(RELATIONSHIP_TYPES[id].type);
      expect(RELATIONSHIP_TYPES[id].id).toBe(id);
    }
  });

  it('hat 25 eindeutige Typnamen', () => {
    expect(new Set(RELATIONSHIP_TYPE).size).toBe(25);
  });
});

describe('Lifecycle-Vokabulare (Dok. 07 §8, Dok. 05 §7)', () => {
  it('hat 8 generische Objektzustände (Dok. 07 §8)', () => {
    expect([...OBJECT_LIFECYCLE_STATUS]).toEqual([
      'Entwurf',
      'Beobachtet',
      'Geprüft',
      'Freigegeben',
      'In Änderung',
      'Überholt',
      'Stillgelegt',
      'Archiviert',
    ]);
  });

  it('kennt Lifecycle je Objektklasse (Dok. 05 §7)', () => {
    expect(Object.keys(LIFECYCLE_BY_CLASS)).toEqual([
      'object_information',
      'risk',
      'control',
      'measure',
      'evidence',
      'decision',
      'service',
      'audit',
    ]);
    expect([...LIFECYCLE_BY_CLASS.control]).toEqual([
      'nicht bewertet',
      'geplant',
      'implementiert',
      'wirksam',
      'eingeschränkt',
      'unwirksam',
    ]);
    expect([...LIFECYCLE_BY_CLASS.risk]).toEqual([
      'identifiziert',
      'bewertet',
      'entschieden',
      'behandelt',
      'überwacht',
      'geschlossen',
    ]);
  });

  it('ALL_LIFECYCLE_STATUS ist die deduplizierte Union aus generisch + je Klasse', () => {
    const expected = new Set<string>([
      ...OBJECT_LIFECYCLE_STATUS,
      ...Object.values(LIFECYCLE_BY_CLASS).flatMap((states) => [...states]),
    ]);
    expect(new Set(ALL_LIFECYCLE_STATUS)).toEqual(expected);
  });
});

describe('Qualitäts-, Provenance- und Quellenvokabulare (Dok. 07 §9/§12)', () => {
  it('hat die 7 Datenqualitäts-Dimensionen (Dok. 07 §12)', () => {
    expect([...DATA_QUALITY_DIMENSION]).toEqual([
      'Herkunft',
      'Aktualität',
      'Vollständigkeit',
      'Konsistenz',
      'Bestätigung',
      'Verlässlichkeit',
      'Zweckeignung',
    ]);
  });

  it('hat die 4 Bestätigungsstufen (Dok. 07 §12)', () => {
    expect([...CONFIRMATION_LEVEL]).toEqual([
      'Ungeprüft',
      'maschinell plausibilisiert',
      'reviewed',
      'freigegeben',
    ]);
  });

  it('hat die 4 Assertion-Arten (Dok. 07 §9)', () => {
    expect([...ASSERTION_KIND]).toEqual(['assertiert', 'importiert', 'abgeleitet', 'freigegeben']);
  });
});
