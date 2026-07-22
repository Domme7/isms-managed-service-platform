/**
 * Geteilte Wert-Schemas des kanonischen Vertrags (Zeit, Herkunft, Owner, Qualität).
 *
 * QUELLE (verbindlich): Dok. 07 v1.0 – Abschnitte 7 (Objektvertrag), 11 (Zeitmodell),
 * 12 (Herkunft/Datenqualität/Vertrauen). Siehe PROVENANCE.md.
 */

import { z } from 'zod';
import {
  CONFIRMATION_LEVEL,
  DATA_QUALITY_DIMENSION,
  OWNER_KIND,
  SOURCE_KIND,
} from './vocabularies';

/**
 * ISO-8601-Zeitstempel (Zeichenkette). Offsets/UTC erlaubt.
 * Quelle: Dok. 07, Abschnitt 11 ("Zeitmodell") – Systemzeit/Gültigkeit als Zeitpunkte.
 */
export const IsoDateTime = z.iso.datetime({ offset: true });
export type IsoDateTime = z.infer<typeof IsoDateTime>;

/* -----------------------------------------------------------------------------
 * Bitemporalität – fachliche Gültigkeit (valid_time) vs. Systemerfassung (record_time)
 * Quelle: Dok. 07, Abschnitt 7 (Felder valid_time/record_time) und Abschnitt 11
 * ("trennt fachliche Gültigkeit von Zeitpunkt der Systemerfassung"), D07.
 * --------------------------------------------------------------------------- */

/** Fachliche Gültigkeit "von/bis" (valid_time). "bis" offen = null/weggelassen. */
export const ValidTime = z
  .object({
    from: IsoDateTime, // fachlich gültig von
    to: IsoDateTime.nullable().optional(), // fachlich gültig bis (offen bei null/undefined)
  })
  .strict();
export type ValidTime = z.infer<typeof ValidTime>;

/** Systemzeit "erfasst/ersetzt am" (record_time) für Auditierbarkeit/bitemporale Abfragen. */
export const RecordTime = z
  .object({
    recorded_at: IsoDateTime, // im System erfasst am
    replaced_at: IsoDateTime.nullable().optional(), // im System ersetzt am (offen bei null/undefined)
  })
  .strict();
export type RecordTime = z.infer<typeof RecordTime>;

/* -----------------------------------------------------------------------------
 * Scope-Zuordnung (scope_ids)
 * Quelle: Dok. 07, Abschnitt 7 ("scope_ids": "Mehrfachzuordnung mit expliziter Gültigkeit").
 *
 * OFFENE FRAGE: Dok. 07 nennt das Feld "scope_ids", verlangt aber zugleich "explizite
 * Gültigkeit" je Zuordnung. Modellierungsentscheidung (reversibel): jede Zuordnung ist ein
 * Objekt {scope_id, valid_time?}, statt eines reinen ID-Strings.
 * --------------------------------------------------------------------------- */
export const ScopeAssignment = z
  .object({
    scope_id: z.string().min(1),
    valid_time: ValidTime.optional(),
  })
  .strict();
export type ScopeAssignment = z.infer<typeof ScopeAssignment>;

/* -----------------------------------------------------------------------------
 * Owner-Zuordnung (owner_ids)
 * Quelle: Dok. 07, Abschnitt 7 ("owner_ids": "Fachlicher und ggf. technischer Owner; Rolle
 * und Gültigkeitszeitraum sind getrennt gespeichert.").
 * --------------------------------------------------------------------------- */
export const OwnerRef = z
  .object({
    owner_id: z.string().min(1),
    owner_kind: z.enum(OWNER_KIND), // fachlich | technisch
    role: z.string().optional(), // "Rolle ... getrennt gespeichert"
    valid_time: ValidTime.optional(), // "Gültigkeitszeitraum ... getrennt gespeichert"
  })
  .strict();
export type OwnerRef = z.infer<typeof OwnerRef>;

/* -----------------------------------------------------------------------------
 * Quellreferenz (source_refs)
 * Quelle: Dok. 07, Abschnitt 7 ("Quellsystem, Import, Datei oder Nutzer; Mehrere Quellen
 * mit Priorität möglich.") + Abschnitt 12 ("Herkunft").
 * --------------------------------------------------------------------------- */
export const SourceRef = z
  .object({
    source_kind: z.enum(SOURCE_KIND),
    reference: z.string().min(1), // Kennung der Quelle (System, Datei, Nutzer-ID, Job-ID, ...)
    priority: z.number().int().optional(), // "Mehrere Quellen mit Priorität möglich"
  })
  .strict();
export type SourceRef = z.infer<typeof SourceRef>;

/* -----------------------------------------------------------------------------
 * Klassifikation (classification)
 * Quelle: Dok. 07, Abschnitt 7 ("Vertraulichkeit und Schutzbedarf").
 * OFFENE FRAGE: konkrete Stufen sind in Dok. 07 nicht definiert (siehe vocabularies.ts);
 * daher wertoffene Strings statt erfundener Skala.
 * --------------------------------------------------------------------------- */
export const Classification = z
  .object({
    confidentiality: z.string().optional(), // Vertraulichkeit
    protection_need: z.string().optional(), // Schutzbedarf
  })
  .strict();
export type Classification = z.infer<typeof Classification>;

/* -----------------------------------------------------------------------------
 * Datenqualität/Vertrauen (quality_state)
 * Quelle: Dok. 07, Abschnitt 7 ("Dimensionen statt nur Gesamtampel") + Abschnitt 12
 * (7 Dimensionen) + D10 (verdichteter Indikator ersetzt Dimensionen nicht).
 * --------------------------------------------------------------------------- */
export const QualityDimensionAssessment = z
  .object({
    dimension: z.enum(DATA_QUALITY_DIMENSION),
    // Nur 'Bestätigung' besitzt in Dok. 07 §12 eine explizite Werteskala:
    confirmation_level: z.enum(CONFIRMATION_LEVEL).optional(),
    note: z.string().optional(),
  })
  .strict();
export type QualityDimensionAssessment = z.infer<typeof QualityDimensionAssessment>;

export const QualityState = z
  .object({
    dimensions: z.array(QualityDimensionAssessment).default([]),
    // D10/§12: ein verdichteter Vertrauensindikator DARF berechnet werden, ersetzt die
    // Einzeldimensionen aber nie. Skala/Berechnung sind nicht Teil von Slice 1.
    confidence_indicator: z.number().optional(),
  })
  .strict();
export type QualityState = z.infer<typeof QualityState>;
