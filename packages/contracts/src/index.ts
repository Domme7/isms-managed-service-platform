/**
 * @isms/contracts – Kanonischer Objekt- und Beziehungsvertrag des digitalen Zwillings.
 *
 * Strikt abgeleitet aus Dok. 07 (Digitaler Unternehmenszwilling & Informationsgraph, v1.0),
 * ergänzt um die kanonischen Lifecycle-Zustände je Objektklasse aus Dok. 05, Abschnitt 7.
 * Herkunft jedes Vertragselements: siehe PROVENANCE.md.
 *
 * Enthält bewusst KEINE Persistenz/ORM/UI/Seed – nur Typen, Zod-Schemas und Vokabulare.
 */

export * from './vocabularies';
export * from './common';
export * from './object';
export * from './relationship';
