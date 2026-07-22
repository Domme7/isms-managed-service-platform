/**
 * Objekt-Envelope – der kanonische Objektvertrag des digitalen Zwillings.
 *
 * QUELLE (verbindlich): Dok. 07 v1.0, Abschnitt 7 ("Objektvertrag und Identität"),
 * Abschnitt 8 (Lebenszyklus) und Abschnitt 12 (Datenqualität). Siehe PROVENANCE.md.
 *
 * Regel: Genau die in Dok. 07 §7 benannten Feldnamen/Semantiken. Keine erfundenen Felder.
 */

import { z } from 'zod';
import {
  Classification,
  OwnerRef,
  QualityState,
  RecordTime,
  ScopeAssignment,
  SourceRef,
  ValidTime,
} from './common';
import { ALL_LIFECYCLE_STATUS, OBJECT_TYPE } from './vocabularies';

/**
 * Objekt-Envelope (Dok. 07 §7). Pflichtfelder sind vorhanden; Erweiterungen laufen
 * ausschließlich über `tags_custom_fields` (governed schema, §7). `.strict()` weist
 * unbekannte Top-Level-Felder ab, damit der Vertrag nicht still erodiert (P10).
 */
export const ObjectEnvelope = z
  .object({
    // Unveränderliche, global eindeutige ID (P02); nie aus Namen/externen IDs ableiten.
    object_id: z.string().min(1),
    // Primäre Mandantenzuordnung; Pflichtfeld (P09, D11, Dok. 19).
    tenant_id: z.string().min(1),
    // Kanonischer Typ aus dem Objektkatalog F01–F09.
    object_type: z.enum(OBJECT_TYPE),
    // Nutzerverständlicher Name; änderbar, nicht identitätsstiftend.
    display_name: z.string().min(1),
    // Klartextzweck/Kontext; optional (für kritische Objekte empfohlen).
    description: z.string().optional(),
    // Kanonischer Lebenszyklus-Zustand (Dok. 07 §8 generisch + typspezifisch aus Dok. 05 §7).
    lifecycle_status: z.enum(ALL_LIFECYCLE_STATUS),
    // Geltende ISMS-/Service-/Audit-Scopes mit expliziter Gültigkeit (Mehrfachzuordnung).
    scope_ids: z.array(ScopeAssignment),
    // Fachlicher und ggf. technischer Owner; Rolle/Gültigkeit getrennt gespeichert.
    owner_ids: z.array(OwnerRef),
    // Vertraulichkeit und Schutzbedarf (steuert Anzeige, Export, Retention, Zugriff).
    classification: Classification,
    // Quellsystem, Import, Datei oder Nutzer; mehrere Quellen mit Priorität möglich.
    source_refs: z.array(SourceRef),
    // Bitemporal: fachlich gültig von/bis.
    valid_time: ValidTime,
    // Bitemporal: im System erfasst/ersetzt am.
    record_time: RecordTime,
    // Version des fachlichen Zustands; wichtige Freigaben erzeugen unveränderbare Versionen.
    version: z.number().int().positive(),
    // Datenqualität als Dimensionen (nicht nur Gesamtampel).
    quality_state: QualityState,
    // Konfigurierbare Erweiterungen (governed schema; keine unkontrollierte Freitext-DB).
    tags_custom_fields: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type ObjectEnvelope = z.infer<typeof ObjectEnvelope>;
