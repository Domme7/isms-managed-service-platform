# DR-0002 – GitHub-Remote als privates Backup/Continuity-Ziel

- Typ: Operations
- Status: Accepted
- Datum: 2026-07-22
- Decision Owner: Human Product Owner (GitHub-Account `Domme7`, in Session freigegeben), umgesetzt durch Claude Code

## Kontext

Nach Abschluss der Phase-0-Baseline (WP-001) wurde ein GitHub-Remote gewünscht, damit nichts
verloren geht (Backup/Fortsetzbarkeit). Ein GitHub-Owner/Remote-Ziel ist im Projekt ein Human Gate
(offene Frage O-GH-001). Die Sicherheits-Review bestätigte zuvor: nur synthetische Daten, keine
Secrets oder realen/PwC-Daten.

## Optionen

1. Privates Repo unter dem eigenen Account (Backup, nicht öffentlich).
2. Öffentliches Repo (gesamtes Produktkonzept weltweit sichtbar).
3. Kein Remote (nur lokales Git).

## Entscheidung

Option 1. Privates Repository **`Domme7/isms-managed-service-platform`** über GitHub CLI 2.96.0
(HTTPS). Gepusht: `main` (Default-Branch), annotierter Tag `phase-0-baseline`, sowie der
History-Branch `wp-001-continuity-bootstrap`. Die vorhandene GitHub-Action „Repository Contract"
läuft beim Push automatisch und war **grün** (3 Läufe success).

## Gründe

- Erfüllt das Backup-/Continuity-Ziel ohne Datenverlustrisiko.
- **Privat**, weil das Repository das vollständige Produktkonzept enthält (Projektregel „privater
  Demonstrator"); öffentliche Exposition ist nicht gewollt.
- gh-CLI-Weg vom Owner authentisiert (Claude authentifiziert nicht selbst).

## Auswirkungen

- Offene Frage **O-GH-001 (Owner/Remote) aufgelöst**: privates Repo unter `Domme7`.
- **O-GH-002 (Branch-Protection)** bleibt offen (im Free-Tier eingeschränkt; für reines Backup nicht nötig).
- GitHub Actions verbraucht geringe Free-Tier-Minuten; **kein** kostenpflichtiges/produktives Deployment.
- Kein Secret-/Token-Material im Repo (Security-Review PASS, Secret-Scan grün).

## Offene Folgearbeit

- Optional: Branch-Protection/Required-Checks auf `main`, sobald sinnvoll.
- Optional: PDFs (~26 MB) per Git LFS oder Ignore auslagern (siehe DR-0001), reversibel.
- Optional: Collaborators/CODEOWNERS aktivieren, falls weitere Personen mitarbeiten.

## Supersede-Regel

Wird durch einen neuen DR ersetzt bei Wechsel von Owner, Host, Sichtbarkeit oder Backup-Strategie.
