# FINDING-0001 – Master-Index nennt abweichenden Einstiegspfad

- Schweregrad: Low (kein Blocker)
- Kategorie: Dokumentkonsistenz
- Entdeckt: 2026-07-22 (WP-001 Slice 1/2)
- Status: Open (bewusst nicht still aufgelöst, siehe `.claude/rules/docs.md`)

## Beobachtung

`docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md` verweist in der
„Zentralen Wahrheit" (Abschnitt oben) und in der Beispielstruktur (Abschnitt 11.1)
auf einen Einstiegspfad `docs/00_master-index/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG.md`
(unversionierter Dateiname unter `docs/00_master-index/`).

Die tatsächlich ausgelieferte und getestete Struktur nutzt jedoch
`docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`
(versionierter Dateiname unter `docs/concept/active/`), konsistent mit
`docs/concept/MANIFEST.json`, `scripts/validate_handoff.py` und den Repository-Tests.

## Wirkung

Gering. Das gebaute Repository ist in sich konsistent und vollständig validiert.
Risiko: Eine spätere Session oder ein Tool, das dem im Master-Index genannten Pfad
folgt, findet die Datei dort nicht.

## Optionen (nicht jetzt entscheiden)

1. Master-Index-Text an die gebaute Struktur (`docs/concept/active/…_vX.Y.md`) angleichen.
2. Struktur an die im Master-Index empfohlene Form (`docs/00_master-index/…`) angleichen.
3. Belassen und nur als bekannte Abweichung führen.

## Empfehlung

Option 1 (Textangleichung im Master-Index) als kleinen Doku-Fix in einem späteren
Work Package über einen Concept Change Proposal (Regel: aktive Spezifikation nicht
still ändern). Kein WP-001-Blocker.
