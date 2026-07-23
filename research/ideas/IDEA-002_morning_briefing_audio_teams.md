# IDEA-002 – Persönliches Morning Briefing (Audio, ~5 Minuten, Teams-Zustellung)

| Feld | Inhalt |
|---|---|
| Status | **Dokumentiert — nicht zur Umsetzung freigegeben** |
| Quelle | Human Product Owner, 2026-07-23 |
| Art | Produkt-Feature, baut auf Morning Mission (Dok. 10) auf |
| Reifegrad | Idee — fachliche Basis existiert im Konzept, Datenbasis fehlt noch |
| Berührt | Dok. 10 („Morning Mission", „Benachrichtigungen und Attention Management"), Dok. 17 (Integrationen), Dok. 20A (KI-Funktionen & Guardrails), Dok. 19 (Datenschutz) |
| Blocker | **O-WP016-03/-04** (keine Task-/Frist-/Prioritätsdaten im Modell → Morning Mission unbaubar, E-02-Change-Proposal läuft) |

## Owner-Anforderung (sinngemäß vollständig)

Ein tägliches Morning Briefing von ungefähr **fünf Minuten**, das die wichtigsten Informationen,
Aufgaben, Risiken und Veränderungen zusammenfasst. Es soll:

- **als Audio** verfügbar sein,
- **automatisch über Microsoft Teams** bereitgestellt werden,
- während der Autofahrt oder auf dem Weg zur Arbeit angehört werden können,
- die wichtigsten Prioritäten und offenen Punkte des Tages zusammenfassen.

## Was das bestehende Konzept bereits trägt (viel!)

- **Dok. 10 „Morning Mission"** ist die fachliche Basis: priorisierter Tagesplan mit „Warum heute",
  Impact und Reihenfolge. ANNAHME 10-A2 formuliert genau die Briefing-Hypothese („Outcome-orientiertes
  Morning Briefing reduziert Such- und Koordinationsaufwand stärker als eine Taskliste").
- **Dok. 10 „Benachrichtigungen und Attention Management"** legt die Kanalarchitektur bereits fest:
  > „Die Plattform ist zentrale Wahrheit. E-Mail, **Teams** oder Slack sind **Zustellkanäle** und
  > verlinken zurück. Sensible Details werden **kanalabhängig minimiert**."
  Die Teams-Zustellung ist also konzeptkonform — als Kanal, nicht als zweite Wahrheit.
- **Dok. 20A** liefert die Leitplanken für die generierte Zusammenfassung: Output Contracts,
  Quellen/Provenance/Confidence, Human Gates, Kostenkontrolle. „KI-gestützt, nicht KI-abhängig"
  (CLAUDE.md): der deterministische Kern (welche Punkte im Briefing stehen) darf nicht von einem
  Sprachmodell abhängen — nur die Formulierung/Vertonung.
- **Dok. 17 + `.claude/rules/integrations.md`**: eine automatische Teams-Zustellung ist eine
  **externe Schreibaktion** → Policy, Human Gate, Audit Record, Mock-Connector vor
  Produktivintegration.

## Was neu ist (der eigentliche Idee-Kern)

1. **Audio als Ausgabeformat** — Text-to-Speech ist in Dok. 20A nicht als Funktion katalogisiert →
   Ergänzung des KI-Funktionskatalogs nötig (CCP-Weg).
2. **Konsumkontext „unterwegs"** — daraus folgen harte Datenschutzregeln: Audio im Auto/ÖPNV ist
   ein offener Kanal. Die „kanalabhängige Minimierung" aus Dok. 10 muss für Audio besonders streng
   ausgelegt werden (keine Kundennamen? keine konkreten Findings? → Produktentscheidung).
3. **Tagesrhythmus/Automatik** — ein Scheduler, der ohne Nutzeraktion erzeugt und zustellt.

## Architektur-Andockpunkte (heute schon berücksichtigt)

| Baustein | Andockpunkt | Stand |
|---|---|---|
| Inhaltsquelle | `buildMissionControl` (`lib/heute/data.ts`) liefert bereits die belegten Tagesinhalte (Standort, Erfassung, Datenlage, Einstiege) — das Text-Briefing ist eine Serialisierung dieses Modells | ✅ vorhanden |
| Priorisierung | fehlt bewusst (kein Scoring); braucht E-02 (Frist/Aufwand/Priorität im Contract) + WP-008 | ❌ blockiert |
| Erzeugung | NestJS-API (`apps/api`) ist der natürliche Ort für Scheduler + Rendering; heute Skeleton | ⚠️ vorbereitet |
| Vertonung | externer TTS-Dienst = neue Abhängigkeit + **Kosten** → ADR + Owner (O-COST) | ❌ offen |
| Teams-Zustellung | Dok.-17-Connector-Muster: Idempotenz, Retry, Dead Letter, **Mock zuerst** | ❌ offen |
| Audit | jede Zustellung braucht einen Audit Record (externe Schreibaktion) | Muster existiert konzeptionell |

## Sinnvolle Umsetzungsphasen (wenn aktiviert)

1. **Text-Briefing in-App** („Heute" bekommt eine verdichtete Briefing-Ansicht) — erst nach
   E-02/WP-008, sonst gibt es nichts zu priorisieren.
2. **Audio-Rendering** (TTS, ADR + Kostenfreigabe), Download/Abspielen in-App.
3. **Teams-Zustellung** — Mock-Connector → Policy + Human Gate → echte Integration.
   Jede Phase einzeln abnehmbar; keine Phase erfordert die nächste.
