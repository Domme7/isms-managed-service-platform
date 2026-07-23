# IDEA-003 – Entwicklung zu einem intelligenten Arbeitsassistenten („JARVIS"-Vision)

| Feld | Inhalt |
|---|---|
| Status | **Dokumentiert — Konzeptarbeit angefordert, Umsetzung nicht freigegeben** |
| Quelle | Human Product Owner, 2026-07-23 |
| Art | Langfrist-Vision / Ambitionsstufe der Plattform |
| Reifegrad | Vision — Owner wünscht zuerst **Konzeptdokumente** (Anwendungsfälle, technische Konzepte, Integrationen, Umsetzungsphasen) |
| Berührt | Dok. 20A (KI-Verfassung — zentrale Grundlage), Dok. 20B (Agentenorganisation), Dok. 10 (Empfehlungen/Priorisierung), Dok. 11 (Zusammenarbeit), Dok. 17 (Integrationen), Dok. 21 (Research-Prozess) |
| Nächster Schritt | eigenes Research-WP (in der Work Queue als **WP-022** vorgemerkt) |

## Owner-Anforderung (sinngemäß vollständig)

Langfristig soll sich die Plattform in Richtung eines **„JARVIS" aus Iron Man** entwickeln: ein
intelligenter Assistent, der nicht nur Informationen anzeigt, sondern **aktiv unterstützt**, ISMS
zu steuern und zu verbessern. Beispiele:

- erklären, was aktuell zu tun ist,
- Aufgaben priorisieren und nächste Schritte empfehlen,
- Risiken, Abhängigkeiten und Fristen erkennen,
- Konzepte und Umsetzungsvorschläge erstellen,
- Recherchen und kreative Vorarbeiten übernehmen,
- Konzept- und Projektdokumente vorbereiten,
- bei der Umsetzung einzelner Maßnahmen unterstützen,
- mit vorhandenen Unternehmenssystemen und Teams zusammenarbeiten.

Zuerst sollen **Anwendungsfälle, technische Konzepte, Integrationen und Umsetzungsphasen**
erarbeitet und als Konzeptdokumente im Repository abgelegt werden; danach schrittweise Umsetzung.

## Wichtigste Einordnung: Die Vision ist im Konzept bereits angelegt

Die JARVIS-Idee ist weniger ein neues Feature als eine **Ambitionsstufe** über Bausteinen, die die
24 Konzeptdokumente schon definieren. Mapping der Owner-Punkte auf bestehende Anker:

| Owner-Wunsch | Existiert bereits im Konzept | Delta |
|---|---|---|
| „erklären, was zu tun ist" | Dok. 10 Morning Mission + Decision Cards („Empfehlung: begründeter Vorschlag, nicht automatisch bindend"); Trust Layer/Kausalität (Dok. 06/07) | Dialog-/Assistenzform statt Seiten |
| „priorisieren, nächste Schritte" | Dok. 10 „Priorisierungs-Engine" (§18) | blockiert durch O-WP016-04 (Frist/Aufwand/Kapazität fehlen im Contract → E-02) |
| „Risiken, Abhängigkeiten, Fristen erkennen" | Dok. 09 (Threat/Control Intelligence), Dok. 07 (Wirkungspropagation) | Fristen: E-02 |
| „Konzepte/Vorschläge erstellen" | Dok. 20A §7 KI-Funktionskatalog (Entwurfserstellung), §15 Output Contracts | Umfang/Tiefe |
| „Recherchen übernehmen" | Dok. 21 (Research-Prozess mit Signals/Briefs) | Automatisierungsgrad |
| „mit Systemen/Teams zusammenarbeiten" | Dok. 17 (Integrationen, Workflow), Dok. 11 (Zusammenarbeit) | Assistent als Akteur statt nur Kanal |
| „aktiv steuern" | **Dok. 20A §5 Autonomie- und Wirkungsebenen + §18 „Tool Use und bounded Agency"** — die Verfassung dafür existiert | die Ebenen tatsächlich beschreiten |

**Die Leitplanken sind nicht verhandelbar** und bereits verbindlich: Human Gates für materielle
Entscheidungen (Dok. 20A §17 — Risikoakzeptanz, Freigaben, Exporte bleiben menschlich), „KI-gestützt,
nicht KI-abhängig" (deterministische Kernwege, CLAUDE.md), Quellen/Provenance/Confidence-Pflicht
(§16), Kostenkontrolle (§21). Ein JARVIS dieser Plattform **empfiehlt und bereitet vor — er
entscheidet nicht autonom über Sicherheit, Budget oder Freigaben.** Das unterscheidet die
seriöse Fassung dieser Vision von der Filmvorlage und ist ihr Verkaufsargument, nicht ihre Schwäche.

Interessante Zweitperspektive: **Dok. 20B beschreibt bereits eine „virtuelle KI-Firma" für den
BAU der Plattform.** Die JARVIS-Vision überträgt dasselbe Muster auf den BETRIEB — Agentenrollen,
Gates und Artefaktmodell aus 20B sind wiederverwendbare Blaupausen für die Assistenzarchitektur.

## Architektur-Andockpunkte (heute schon berücksichtigt)

| Baustein | Andockpunkt | Stand |
|---|---|---|
| Wissensbasis | Der kanonische Graph (`@isms/contracts`, Seed → später DB) ist die RAG-Grundlage (Dok. 20A §13); jede Aussage rückführbar auf Objekt/Kante — genau die Provenance-Pflicht | ✅ Fundament steht |
| Erklärbarkeit | Objekt-360, Trust-Layer-Felder, `decided_in`/Ablöseketten — der Assistent kann auf belegbare Strukturen zeigen statt zu halluzinieren | ✅ wächst je WP |
| API-Schicht | `apps/api` (NestJS) als Ort für Assistenz-Endpunkte und AI Control Plane (Dok. 20A §10) | ⚠️ Skeleton; **erst nach FINDING-0004 (RLS)** |
| Aufgaben/Fristen | Voraussetzung fast aller „steuernden" Fähigkeiten | ❌ E-02-Change-Proposal (Human Gate) |
| Tool Use | bounded Agency (§18): Werkzeugkatalog, Wirkungsebenen, Audit | ❌ Konzept vorhanden, nichts gebaut |
| Kosten | Modell-/Providerstrategie §11, Verbrauchskontrolle §21 → **Owner-Gates** | ❌ offen |

## Auftrag an WP-022 (Research, vorgemerkt)

Ergebnis sind **Entwürfe** unter `research/` (Aktivierung als Konzeptdokument nur via CCP + Human
Gate, Dok. 21):

1. **Use-Case-Katalog** nach dem Muster von Dok. 20A §6 (AI Use Case Register): je Fall Nutzer,
   Auslöser, Eingaben, Output Contract, Autonomieebene, Human Gate, Kostenklasse.
2. **Technisches Konzept**: Assistenz-Schicht über der AI Control Plane (§10), RAG über den
   Graphen (§13), Tool-Use-Katalog mit Wirkungsebenen (§18).
3. **Integrationskonzept**: Teams/E-Mail als Kanäle (Dok. 10), Quellsysteme über Dok.-17-Connectoren;
   Schreibaktionen nur mit Policy + Gate.
4. **Phasenmodell**: von „erklärt und verlinkt" (rein lesend, früh möglich) über „bereitet vor"
   (Entwürfe mit Freigabe) bis „führt aus" (bounded, auditiert, spät) — je Phase mit
   Voraussetzungen (E-02, RLS, Integrationen) und Ausstiegskriterien.
