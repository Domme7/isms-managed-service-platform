# Active Work Package

- **ID:** WP-017
- **Titel:** Entscheidungen im Zwilling (Seed-Erweiterung + Ort „Entscheidungen", read-only)
- **Datei:** `work-packages/WP-017_ENTSCHEIDUNGEN_IM_ZWILLING.md`
- **Context Pack:** `context-packs/WP-017/CONTEXT_PACK.md`
- **Führende Quellen:** Dok. 07 §9 (R23 `decided_in`, R15, R24) · Dok. 10 §9 **nur zur Abgrenzung**
  · Dok. 06 §7/§17
- **Status:** Active — Slice 1 (Seed: Decision Records + Ablösepaar)
- **Builder:** Frontend-/Data-Engineer · **Reviewer:** Code-Reviewer + Product-User-Lead
- **Human Gates:** keiner — `Decision Record` steht bereits im Contract-Vokabular, die
  Materialisierung im Seed ist **keine** Contract-Änderung
- **Ziel des WP:** Der Ort „Entscheidungen" wird echt, und der Seed bekommt seine **erste belegte
  Versionshistorie** (R24 `supersedes`) — damit wird beweisbar, dass die Historien-Aussagen aus
  WP-014/WP-016 wirklich abgeleitet und nicht hartkodiert sind.

## Zwei Befunde, die den Zuschnitt bestimmt haben

1. **`Task` hat keinen einzigen Beziehungstyp** in Dok. 07 §9 (R01–R25) — weder als Quelle noch als
   Ziel. Aufgaben wären beziehungslose Waisen im Graphen. Sie werden deshalb **nicht** materialisiert
   (O-WP017-01). Damit bleibt die **Morning Mission weiterhin blockiert**.
2. **Eine Decision Card (Dok. 10, Abschnitt „Decision Cards") ist nicht baubar:** von 14
   Pflichtfeldern haben **neun keinen** Träger im Objektvertrag (Auslöser, Baseline, Optionen,
   Wirkung, Ressourcen, Abhängigkeiten, Empfehlung, Frist, Outcome Check), **fünf** nur teilweise
   (O-WP017-02, -05). Die Seite zeigt deshalb ein **Register belegter Entscheidungen**, keine
   Decision Card — und sagt das sichtbar. *(Zahl am 2026-07-23 gegen das PDF und gegen
   `DECISION_CARD_FIELDS` nachgerechnet; die frühere Angabe „7 / 6" war falsch — sie ergab
   zusammen 13 statt 14 und nannte „Alternativen", ein Feld, das es in Dok. 10 nicht gibt.)*

> Abgeschlossen: WP-001..004, 007, 011..016.
> Offene Human Gates (nicht blockierend): CCP-001..003, Docker-Engine-Start, FINDING-0004,
> O-WP014-09 (voller Seed im Client-Bundle) vor der DB→UI-Anbindung, FINDING-0005 (kein Linter).
