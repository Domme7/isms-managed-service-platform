# DR-0015 – Owner-Kursentscheidungen 2026-07-24 (Terminal-Frage-Runden)

- Typ: Product / Program
- Status: **Accepted**
- Datum: 2026-07-24
- Decision Owner: **Human Product Owner** (Antworten auf zwei strukturierte Terminal-Fragerunden,
  im Rahmen des Auftrags „setz alles um, achte auf usability first")
- Betroffen: WORK_QUEUE, WP-021, WP-025/029/030/033, E-02, O-WP006-01, O-KUNDE-01, die Research-Ideen

## Entscheidungen

| # | Frage | Entscheidung | Wirkung |
|---|---|---|---|
| 1 | Nächster großer Schwerpunkt | **Produkt-Tiefe auf heutiger Datenbasis zuerst** (nicht echtes Auth/DB-Fundament) | FINDING-0004/RLS und WP-030 echte Auth bleiben vorerst zurückgestellt; Decision Center / Trust-Layer / Ampeln / Presentation-as-Code werden vorgezogen |
| 2 | Datenmodell E-02 (Task/Decision-Record/Frist/Kapazität) | **Change Proposal → bauen** (green-lit; DR-0007 E-02 „ja, nach Gegenlesen Dok. 10" bestätigt) | Contract-Erweiterung + Seed über CP + Human Gate; schaltet Decision Center, Morning Mission, Fristen frei |
| 3 | Welche Research-Verbesserungen | **Alle vier**: Trust-Layer (BL-01/CCP-005), Regulatory Change Record (BL-03/CCP-006), Register of Information (BL-04/CCP-007), AIMS-Cockpit ISO 42001 (BL-05) | CCP-005/006/007 werden zur Umsetzung freigegeben (nach PDF-Gegenlesen / je Contract-Anteil Human Gate); AIMS braucht zusätzlich die 20A-Q09-Zusage |
| 4 | Demo-Firmenliste | **Dok.-16-Fünferliste** (Nordstern Manufacturing, AlpenCloud, Rheinbank Digital, MediNova Clinics, GreenGrid Energy) | **löst O-WP006-01 zugunsten Dok. 16**; größerer Seed-Umbau (WP-021), inkl. synthetischer Bewertungsdaten (DR-0008) für reichere Ampeln |
| 5 | Cockpit als Startseite | **Ja, Cockpit wird Landing nach Login** | Routing-Umstellung Login → `/cockpit`; `/heute` bleibt erreichbar (siehe [DR-0014]) |
| 6 | A/B/C-Umschalter nach Wahl | **Bleibt als Personalisierung** (jeder Account wählt Stil) | WP-029 kuratierte Personalisierung wird jetzt aktiv gebaut, nicht verworfen |
| 7 | Getrennte Berater-/Kunden-Anmeldewelten | **Jetzt schon sichtbar (simuliert)** | Getrennte „Berater"/„Kunden"-Einstiege auf `/login`, non-invasiv; echte Konten/Passwörter erst mit WP-030 (echte Auth) |
| 8 | Preise in der Demo | **Synthetische Beispielpreise einführen** | **Guardrail-Umstellung O-KUNDE-01**: gekennzeichnete, synthetische Beispielpreise im Servicekatalog/den Paketen erlaubt (mit Security); keine realen Preise, DR-0011-konform ohne „Demo"-Etikett. Präzisiert O-WP006-05 |

## Konsequenzen / Sequenzierung

- **Zurückgestellt (Owner):** echtes Auth-Fundament (WP-030) und DB→UI (FINDING-0004/RLS) — kommen
  nach der Produkt-Tiefe. Die simulierten getrennten Anmeldewelten (Nr. 7) sind der non-invasive
  Vorgriff.
- **Freigegeben (mit den je zugehörigen Gates/PDF-Gegenlesungen):** E-02 (Nr. 2), Dok.-16-Demo-Welt
  (Nr. 4), synthetische Preise (Nr. 8), die vier Research-Verbesserungen (Nr. 3).
- **Preis-Guardrail:** `O-KUNDE-01` wird von „strikt preisfrei" auf „synthetische, gekennzeichnete
  Preise erlaubt" umgestellt — vor Umsetzung Security-Sichtung + `.claude/rules/demo-data.md`
  (nur synthetisch, keine realen PwC-Preise).
- **Regel Null bleibt:** jede E-02-Feldliste, jede Dok.-16-Firmenstruktur, jedes Preisband wird vor
  Umsetzung am **PDF** gegengelesen (kein Bau aus ungeprüftem Markdown).
