/**
 * Beziehungs-Envelope – Beziehungen als erstklassige, eigenständige Datensätze.
 *
 * QUELLE (verbindlich): Dok. 07 v1.0, Abschnitt 9 ("Beziehungsmodell"), P03, D04, D05.
 * Beziehungen besitzen laut §9: Quelle, Ziel, kanonischen Typ, Richtung, fachliche
 * Gültigkeit, Erfassungszeit, Status, Quelle (Datenherkunft), Vertrauensgrad, Owner und
 * optional Gewicht oder Wirksamkeitsannahme; jede Beziehung ist als assertiert/importiert/
 * abgeleitet/freigegeben gekennzeichnet.
 */

import { z } from 'zod';
import { OwnerRef, RecordTime, SourceRef, ValidTime } from './common';
import { ASSERTION_KIND, RELATIONSHIP_DIRECTION, RELATIONSHIP_TYPE } from './vocabularies';

/**
 * Beziehungs-Envelope (Dok. 07 §9). `.strict()` weist unbekannte Top-Level-Felder ab.
 *
 * Hinweis zu `relationship_id`: Dok. 07 §9 definiert Beziehungen als "eigenständige
 * Datensätze" und D04 als "eigenständige, versionierte Datensätze". Eine stabile ID ist
 * damit strukturell impliziert (analog object_id, P02), auch wenn §9 keinen expliziten
 * Feldnamen nennt.
 */
export const RelationshipEnvelope = z
  .object({
    // Stabile ID des Beziehungsdatensatzes (impliziert durch §9 "eigenständige Datensätze"/D04).
    relationship_id: z.string().min(1),
    // Mandantenzuordnung; Cross-Tenant-Beziehungen sind verboten außer zu Plattformreferenzen (D11).
    tenant_id: z.string().min(1),
    // Kanonischer Beziehungstyp R01–R25.
    relationship_type: z.enum(RELATIONSHIP_TYPE),
    // Quelle (Quellobjekt) und Ziel (Zielobjekt) der Beziehung.
    source_id: z.string().min(1),
    target_id: z.string().min(1),
    // Richtung; primär durch source_id -> target_id kodiert (Default: gerichtet).
    direction: z.enum(RELATIONSHIP_DIRECTION).default('gerichtet'),
    // Fachliche Gültigkeit (bitemporal).
    valid_time: ValidTime,
    // Erfassungszeit / Systemzeit (bitemporal).
    record_time: RecordTime,
    // Assertion-Art: assertiert | importiert | abgeleitet | freigegeben (§9, D05).
    assertion_kind: z.enum(ASSERTION_KIND),
    // Status der Beziehung.
    // OFFENE FRAGE: §9 nennt "Status", enumeriert aber keine Beziehungs-Statuswerte -> wertoffen.
    status: z.string().optional(),
    // Datenherkunft der Beziehung (analog Objekt-source_refs).
    source_refs: z.array(SourceRef).optional(),
    // Vertrauensgrad.
    // OFFENE FRAGE: §9 nennt "Vertrauensgrad", aber keine Skala -> optionale Zahl, Skala offen.
    confidence: z.number().optional(),
    // Owner der Beziehung (optional).
    owner_ids: z.array(OwnerRef).optional(),
    // Optionales Gewicht (§9 "optional Gewicht").
    weight: z.number().optional(),
    // Optionale Wirksamkeitsannahme (§9 "optional ... Wirksamkeitsannahme"), z. B. für mitigates.
    effectiveness_assumption: z.string().optional(),
    // Version des Beziehungsdatensatzes (D04: "versionierte Datensätze"); optional.
    version: z.number().int().positive().optional(),
    // Konfigurierbare Erweiterungen (governed schema).
    tags_custom_fields: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type RelationshipEnvelope = z.infer<typeof RelationshipEnvelope>;
