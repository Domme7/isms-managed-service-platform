# Roadmap — Phasen 0–9, aktuelle Position und nächste Schritte

**Aktualisiert: 2026-07-23** (nach WP-019 und der Owner-Steuerung DR-0008/DR-0009).
Statuswahrheit bleibt `CURRENT_STATE.md`/`WORK_QUEUE.md`; diese Datei ist die Orientierung darüber.
Die Phasen priorisieren die Integrationsreihenfolge — sie entfernen nichts aus der Produktvision.

## Die neun Phasen (aus dem Master-Index)

| Phase | Ziel | Stand |
|---:|---|---|
| 0 | Repository und Entwicklungsbetriebssystem | ✅ plus Nachrüstung: Linter, `qa:visual`, Wächtertests, Manifest-Tool (WP-018/019) |
| 1 | Product Shell und Demo Foundation | ✅ ~99 % — sechs echte Orte, Objekt-360, Rollen-/Mandantensimulation |
| 2 | Digitaler Unternehmenszwilling | ◕ ~30 % — Graph + 360°-Ansichten + erste Historie (R24); Persistenz (`@isms/db`) gebaut, **nicht** ans UI angebunden (FINDING-0004 davor) |
| 3 | ISMS Core | ◔ Ansicht vorhanden; Prozesse/Audits fehlen |
| 4 | Intelligence und Decision Center | ◔ ~12 % — Entscheidungsregister; KPIs/Mission brauchen E-02 |
| 5 | Collaboration und Reporting | ○ |
| 6 | Managed-Service-Betrieb | ◔ ~20 % — Servicesicht; **Kundenwelt jetzt priorisiert (DR-0009)** |
| 7 | Berater-/Portfolio-Operations | ○ |
| 8 | Integrationen und Automatisierung | ○ |
| 9 | KI, Hardening und Produktdemo | ○ — Vision dazu: IDEA-003 (JARVIS), WP-022 |

## Nächste Work Packages (verbindliche Reihenfolge in `WORK_QUEUE.md`)

1. **WP-020 — Verdichtungs-Umbau + Dashboard-Schicht + neuer Einstiegsfluss** (DR-0008/0009):
   strategische Ebene 1 → Drill-down; Statuskacheln/Ampeln aus belegten Daten; Anmelden →
   neutrales Dashboard → Rollenwahl in der App; Cross-Tenant-Schutz vorweg.
2. **WP-021 — Demo-Welt konzeptkonform** (E-01): fünf benannte Unternehmen, neun Accounts,
   Mindestgrößen, **synthetische Bewertungsdaten** (DR-0008), Trust-States, Konflikte.
3. **WP-006 — Kundenwelt Stufe 1** (DR-0009, Owner-priorisiert): verwalten + Servicekatalog +
   Struktur-Assistent (Onboarding/Zielprofil); danach Stufe 2 Buchung (Human Gate; Persistenz
   erst nach FINDING-0004).
4. **WP-025 — Design-Exploration Cockpit** (parallel möglich): 2–3 Stilvarianten, Owner wählt.
5. Danach: WP-022 (Research Assistenz-Vision) · WP-023 (Konzeptfassungen Teil 2) ·
   WP-024 (Treue-Check) · WP-008 (Morning Mission — braucht E-02) · WP-005 (Auth) ·
   API/DB→UI (**erst nach FINDING-0004 + O-WP014-09**).

## Owner-Steuerung, die diese Roadmap prägt

- **DR-0008:** Ampeln/Dashboards erwünscht — datengestützt, mit Drill-down, „nicht übertrieben";
  Abnahme je Stufe durch den Owner („das ist jetzt okay").
- **DR-0009:** strategischer Einstieg vor Rollenwahl; Kundenwelt (verwalten, dazubuchen,
  Struktur-Assistent) wird Kernpfad.
- **DR-0007:** E-01 Demo-Welt ja (nach Konzeptkorrektur) · E-02 Contract-Erweiterung als Change
  Proposal (Human Gate) · E-03 sichtbare Abnahme ✅ gebaut.
- **Ideen-Schicht** (`research/ideas/`): UI-Modernisierung, Morning Briefing (Audio/Teams),
  JARVIS-Vision — bei Architekturentscheidungen mitdenken, nicht nebenbei bauen.

## Was den Weg begrenzt (unverändert gültig)

Human Gates: CCP-001…003 · FINDING-0004 (RLS vor DB→UI) · FINDING-0008 (Product Gate) ·
E-02 nur als Change Proposal · O-KUNDE-01 (Preise-Guardrail) · Kosten/Cloud/Prod immer Owner.
