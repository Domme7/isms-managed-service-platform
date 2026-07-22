/**
 * @isms/demo-seed – Synthetische, deterministische Demo-Seed-Grundlage des digitalen Zwillings.
 *
 * STRUKTUR/VOKABULAR strikt aus `@isms/contracts` (Dok. 07 v1.0: Objekttypen F01–F09,
 * Beziehungstypen R01–R25). INHALT bewusst synthetisch (`.claude/rules/demo-data.md`).
 * KEINE DB/ORM/UI – reine typisierte Daten + Integritätshelfer.
 */

export * from './tenants';
export * from './nordwerk-graph';
export * from './managed-services';
export * from './integrity';
export * from './seed';
