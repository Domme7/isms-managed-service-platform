# Active Work Package

- **ID:** WP-016
- **Titel:** Mission Control „Heute" (read-only, **ohne** Morning Mission)
- **Datei:** `work-packages/WP-016_MISSION_CONTROL_HEUTE.md`
- **Context Pack:** `context-packs/WP-016/CONTEXT_PACK.md`
- **Führende Quellen:** Dok. 06 §7 S01 (Leitfrage) + §5 (Erlebniswelten) + §17 (Zustände);
  Dok. 10 §5 **nur zur Abgrenzung**
- **Status:** Active — Slice 1 (View-Helfer + Rollenrahmung + Unit-Tests)
- **Builder:** Frontend-Engineer · **Reviewer:** Code-Reviewer + Product-User-Lead
- **Human Gates:** keiner (read-only, synthetisch)
- **Ziel des WP:** `/heute` ist der letzte Platzhalter auf dem Kernweg Login → Startpunkt →
  Zwilling/ISMS/Services. Er beantwortet seine Leitfrage so weit, **wie der Datenbestand es belegt**,
  und sagt für den Rest ehrlich, dass und warum er fehlt.

## Bewusste Abgrenzung (nicht verhandelbar in diesem WP)

Die **Morning Mission** (Dok. 10 §5) wird **nicht** gebaut. Sie verlangt Mission, „Warum heute"
(Frist, Eskalation), erwarteten Impact, empfohlene Reihenfolge und reale Kapazität. Der Seed trägt
davon nichts: keine `Task`- und keine `Decision Record`-Objekte, keine Fristen/Kapazitäten/Aufwände
im Objektvertrag, keine Ereignisse, keine Versionshistorie. Jede Mission wäre erfunden. Die dafür
nötige Priorisierungs- und Impact-Logik ist ohnehin **WP-008** (Phase 4) vorbehalten.
Offene Fragen dazu: **O-WP016-02, -03, -04**.

> Abgeschlossen: WP-001..004, 007, 011, 012, 013, 014, 015.
> Offene Human Gates (nicht blockierend): CCP-001..003, Docker-Engine-Start, FINDING-0004,
> O-WP014-09 (voller Seed im Client-Bundle) vor der DB→UI-Anbindung.
