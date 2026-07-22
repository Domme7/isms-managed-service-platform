/**
 * Drizzle-Schema für die Twin-Kernobjekte — STRIKT abgeleitet aus `@isms/contracts`
 * (kanonischer Objekt-/Beziehungsvertrag, Dok. 07 v1.0). Es wird KEIN Feld erfunden.
 *
 * Spaltenstrategie (WP-007, Context Pack):
 *   - Envelope-Kernfelder (Identität, Typ, Lebenszyklus, Bitemporalität, Version) als
 *     eigene Spalten → indizierbar, tenant-scopebar.
 *   - verschachtelte/erweiterbare Vertragsteile als `jsonb` → Vertragstreue ohne Schema-Erosion.
 *
 * Bitemporalität (Dok. 07 §11): fachliche Gültigkeit (`valid_time.from/to`) und Systemzeit
 * (`record_time.recorded_at/replaced_at`) werden als eigene Spalten geführt. Sie sind als
 * `text` modelliert und tragen die kanonische ISO-8601-Zeichenkette VERBATIM (der Vertrag
 * definiert diese Felder als `IsoDateTime`-String, inkl. optionalem Offset). Damit bleibt der
 * exakte Vertragswert erhalten (Roundtrip-Treue); echte `timestamptz`-Spalten mit temporalem
 * Bereichsindex sind eine spätere Härtung (analog RLS), reversibel per Migration.
 *
 * ACHTUNG (Range-Queries): Die lexikografische Sortierung/Vergleich über diese `text`-Zeitfelder
 * ist NUR bei normalisierten UTC-Strings (`...Z`, feste Länge) chronologisch korrekt. Der Vertrag
 * erlaubt jedoch Offsets (`common.ts`: `z.iso.datetime({ offset: true })`) — dann kann String-
 * Vergleich falsch ordnen. Vor künftigen temporalen Range-/Sort-Queries daher zuerst nach UTC
 * normalisieren (Teil der `timestamptz`-Härtung, FINDING-0004). Der Seed nutzt bewusst nur UTC.
 *
 * Mandantentrennung (Dok. 18 TA04 / Dok. 19 SP03): `tenant_id` ist Teil des Primärschlüssels
 * und führendes Feld jedes Index — Tenant-Scope ist damit auf DB-Ebene strukturell verankert;
 * erzwungen wird er im Repository-Layer (Deny by Default), RLS folgt als Härtung.
 */

import { index, integer, jsonb, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import type {
  Classification,
  OwnerRef,
  QualityState,
  ScopeAssignment,
  SourceRef,
} from '@isms/contracts';

/* =============================================================================
 * objects — Objekt-Envelope (Dok. 07 §7)
 * ============================================================================= */
export const objects = pgTable(
  'objects',
  {
    // Kernfelder als Spalten -----------------------------------------------------
    // Dok. 07 §7: unveränderliche, global eindeutige ID (P02).
    object_id: text('object_id').notNull(),
    // Dok. 07 §7 / §P09 / Dok. 19: primäre Mandantenzuordnung (harte Grenze).
    tenant_id: text('tenant_id').notNull(),
    // Dok. 07 §7: kanonischer Typ aus dem Objektkatalog F01–F09.
    object_type: text('object_type').notNull(),
    // Dok. 07 §7: nutzerverständlicher Name (nicht identitätsstiftend).
    display_name: text('display_name').notNull(),
    // Dok. 07 §8: kanonischer Lebenszyklus-Zustand.
    lifecycle_status: text('lifecycle_status').notNull(),
    // Dok. 07 §11: fachliche Gültigkeit (valid_time.from / .to). "to" offen = NULL.
    valid_from: text('valid_from').notNull(),
    valid_to: text('valid_to'),
    // Dok. 07 §11: Systemzeit (record_time.recorded_at / .replaced_at). "replaced" offen = NULL.
    recorded_at: text('recorded_at').notNull(),
    replaced_at: text('replaced_at'),
    // Dok. 07 §7: Version des fachlichen Zustands (positive Ganzzahl).
    version: integer('version').notNull(),

    // Verschachtelte / erweiterbare Vertragsteile als jsonb -----------------------
    // Dok. 07 §7: Mehrfach-Scope-Zuordnung mit expliziter Gültigkeit.
    scope_ids: jsonb('scope_ids').$type<ScopeAssignment[]>().notNull(),
    // Dok. 07 §7: fachlicher/technischer Owner (Rolle/Gültigkeit getrennt).
    owner_ids: jsonb('owner_ids').$type<OwnerRef[]>().notNull(),
    // Dok. 07 §7: Vertraulichkeit / Schutzbedarf.
    classification: jsonb('classification').$type<Classification>().notNull(),
    // Dok. 07 §7 / §12: Datenherkunft (mehrere Quellen mit Priorität).
    source_refs: jsonb('source_refs').$type<SourceRef[]>().notNull(),
    // Dok. 07 §7 / §12: Datenqualität als Dimensionen (nicht nur Gesamtampel).
    quality_state: jsonb('quality_state').$type<QualityState>().notNull(),
    // Dok. 07 §7: optionaler Klartextzweck. Per WP-007-Vorgabe als jsonb geführt.
    description: jsonb('description').$type<string>(),
    // Dok. 07 §7: konfigurierbare Erweiterungen (governed schema).
    tags_custom_fields: jsonb('tags_custom_fields').$type<Record<string, unknown>>(),
  },
  (t) => [
    // Mandant + Objekt-ID bilden die harte Identitätsgrenze.
    primaryKey({ columns: [t.tenant_id, t.object_id] }),
    // Häufigster Zugriffspfad: Objekte eines Mandanten nach Typ (Context Pack).
    index('objects_tenant_type_idx').on(t.tenant_id, t.object_type),
  ],
);

/* =============================================================================
 * relationships — Beziehungs-Envelope (Dok. 07 §9)
 * ============================================================================= */
export const relationships = pgTable(
  'relationships',
  {
    // Kernfelder als Spalten -----------------------------------------------------
    // Dok. 07 §9 / D04: stabile ID des eigenständigen Beziehungsdatensatzes.
    relationship_id: text('relationship_id').notNull(),
    // Dok. 07 §9 / D11 / Dok. 19: Mandantenzuordnung (keine Cross-Tenant-Kanten).
    tenant_id: text('tenant_id').notNull(),
    // Dok. 07 §9: kanonischer Beziehungstyp R01–R25.
    relationship_type: text('relationship_type').notNull(),
    // Dok. 07 §9: Quelle/Ziel der Beziehung.
    source_id: text('source_id').notNull(),
    target_id: text('target_id').notNull(),
    // Dok. 07 §9: Richtung (Default "gerichtet"; source_id -> target_id).
    direction: text('direction').notNull().default('gerichtet'),
    // Dok. 07 §9 / D05: assertiert | importiert | abgeleitet | freigegeben.
    assertion_kind: text('assertion_kind').notNull(),
    // Dok. 07 §11: Bitemporalität (siehe objects; ISO-Strings verbatim).
    valid_from: text('valid_from').notNull(),
    valid_to: text('valid_to'),
    recorded_at: text('recorded_at').notNull(),
    replaced_at: text('replaced_at'),
    // Dok. 07 §9 / D04: Version des Beziehungsdatensatzes (optional → nullable).
    version: integer('version'),

    // Optionale / skalare Vertragsteile als jsonb (WP-007-Vorgabe) ---------------
    // Dok. 07 §9: Status (wertoffen, keine kanonische Enumeration).
    status: jsonb('status').$type<string>(),
    // Dok. 07 §9: Vertrauensgrad (Skala offen).
    confidence: jsonb('confidence').$type<number>(),
    // Dok. 07 §9: Datenherkunft der Beziehung (optional).
    source_refs: jsonb('source_refs').$type<SourceRef[]>(),
    // Dok. 07 §9: Owner der Beziehung (optional).
    owner_ids: jsonb('owner_ids').$type<OwnerRef[]>(),
    // Dok. 07 §9: optionales Gewicht.
    weight: jsonb('weight').$type<number>(),
    // Dok. 07 §9: optionale Wirksamkeitsannahme (z. B. für mitigates).
    effectiveness_assumption: jsonb('effectiveness_assumption').$type<string>(),
    // Dok. 07 §9: konfigurierbare Erweiterungen (governed schema).
    tags_custom_fields: jsonb('tags_custom_fields').$type<Record<string, unknown>>(),
  },
  (t) => [
    primaryKey({ columns: [t.tenant_id, t.relationship_id] }),
    // Navigation von Quell-/Zielobjekt ausgehend (Graph-Traversierung), stets tenant-scoped.
    index('relationships_tenant_source_idx').on(t.tenant_id, t.source_id),
    index('relationships_tenant_target_idx').on(t.tenant_id, t.target_id),
  ],
);

export type ObjectRow = typeof objects.$inferSelect;
export type NewObjectRow = typeof objects.$inferInsert;
export type RelationshipRow = typeof relationships.$inferSelect;
export type NewRelationshipRow = typeof relationships.$inferInsert;
