# FINDING-0002 – Validator prüft keine Status-Aktualität/Branch/Tag

- Schweregrad: Medium (Tooling-Härtung, kein aktueller Blocker)
- Kategorie: Continuity-Tooling
- Entdeckt: 2026-07-22 (unabhängige QA-Review, WP-001 Slice 6)
- Status: Open

## Beobachtung

`scripts/validate_handoff.py` gibt „[OK] active WP and latest handover are consistent" aus, prüft aber
faktisch nur, dass (a) `LATEST.md` eine existierende `HND-*.md` referenziert und (b) `ACTIVE_WORK_PACKAGE.md`
den String „WP-001" enthält. Es vergleicht **nicht**:

- ob der in `LATEST.md`/HND genannte Commit dem aktuellen HEAD entspricht,
- ob `CURRENT_STATE.md`, `LATEST.md`, `WORK_QUEUE.md` und `ACTIVE_WORK_PACKAGE.md` denselben WP-Status/Next-Step führen,
- ob ein behaupteter Baseline-/Release-Zustand tatsächlich als Branch-Merge oder Git-Tag existiert.

Dadurch konnte während WP-001 kurzzeitig ein Drei-Wege-Statuswiderspruch entstehen, während der
Validator „grün" meldete. Die Repository-Contract-Tests haben dieselbe Lücke.

## Wirkung

Mittel. Ein „grüner" Validator kann inkonsistente Statusdateien maskieren und einen Resume
fehlleiten (Redo einer bereits erledigten Slice), wenn eine Session `LATEST.md` statt der neuesten
`CURRENT_STATE.md` folgt.

## Empfehlung (spätere Tooling-WP)

- Optionale Prüfung: Commit-Referenz in `LATEST.md`/HND gegen `git rev-parse HEAD` (Warnung bei zu großem Abstand).
- Cross-Datei-Konsistenzcheck des aktiven WP-Status und Exact Next Step.
- Optionaler Check, dass ein als „Baseline/Release" markierter Zustand einen entsprechenden Git-Tag besitzt.
- Bis dahin gilt die Protokollregel: `CURRENT_STATE.md` ist bei Divergenz die maßgebliche neueste Wahrheit (CLAUDE.md).
