# Active Work Package

- **ID:** — (kein aktives Work Package)
- **Zuletzt abgeschlossen:** **WP-017 Entscheidungen im Zwilling** (Seed + Ort „Entscheidungen")
  - Datei: `work-packages/WP-017_ENTSCHEIDUNGEN_IM_ZWILLING.md`
  - Context Pack: `context-packs/WP-017/CONTEXT_PACK.md`
  - Review-Notiz: `docs/project/reviews/WP-017_INDEPENDENT_REVIEW.md`
  - Ergebnis: erste belegte Versionshistorie im Seed (R24-Ablösepaar); Register belegter
    Entscheidungen, ausdrücklich **keine** Decision Card; 428 Tests grün; Browser-QA dokumentiert
  - Nebenertrag: Mandantengrenzverletzung in `/isms` (seit WP-013) gefunden, behoben und mit
    Wächtertest `leerzustand-mandantengrenze` gegen Wiederholung abgesichert
  - Offene Fragen: **O-WP017-01…12**, **O-KONZ-01** · Entscheidungen: DR-0006-Nachtrag, DR-0007

## Nächstes Work Package: WP-018 Werkzeuge (DR-0007, Reihenfolge vom Owner bestätigt)

**Inhalt:** Linter/Formatter (schließt FINDING-0005) · Playwright + axe in CI ·
**Screenshots je Work Package** ins Repository (`docs/project/visual/WP-0xx/`) — die wichtigste
Einzelmaßnahme für den Owner (E-03) · Kandidat: getrenntes Build-Verzeichnis (Briefing-Lektion 10).
Neue Abhängigkeiten brauchen einen **ADR**.

Ein WP + Context Pack existiert noch nicht — vom `program-manager` erstellen lassen.

Danach: **WP-019** Konzeptfassungen aus den PDFs nachziehen (FINDING-0007, beginnend Dok. 03–07)
→ **WP-020** verlorene Anforderungen (Cross-Tenant-Schutz zuerst) → **WP-021** Demo-Welt
konzeptkonform (E-01).

> Abgeschlossen: WP-001..004, 007, 011..017.
> Offene Human Gates (nicht blockierend): CCP-001..003, Docker-Engine-Start, FINDING-0004,
> O-WP014-09 (voller Seed im Client-Bundle) vor der DB→UI-Anbindung.
> E-02 (Contract-Erweiterung): Change Proposal in Arbeit, Umsetzung erst nach Owner-Freigabe.
