# CCP-005 (ENTWURF) – Trust-/Confidence-Layer sichtbar machen (Provenance-/Confidence-Konvention + Anti-Agentic-Hype-Positionierung)

| Feld | Inhalt |
|---|---|
| CCP ID / Titel | CCP-005 – Trust-/Confidence-Layer sichtbar machen |
| Status | **ENTWURF (DRAFT) — NICHT-BINDEND; Owner-Freigabe ausstehend** |
| Datum | 2026-07-24 |
| Autor (Rolle) | Research-/Innovations-Track (`idea-innovation`). Dies ist ein **Research-Signal**, kein Konzeptbeschluss: Konzept-Autorschaft (Dok. 21 §21) und Concept Consistency Review sind **nachgelagert** und erfolgen erst nach Owner-Freigabe. |
| Auslöser | `research/ideas/IDEEN_BACKLOG_2026-07-24.md` **BL-01** (Prioritäts-Score 9, non-invasiv), Top-5-Ranking Platz 1; Briefs `MARKT_WEB_2026-07-24.md` §2.3/§4/§5.3, `WETTBEWERB_2026-07-24.md` D7, `REGULATORIK_2026-07-24.md` §2.5/§3 |
| Betroffene Dokumente (nur benannt, **NICHT geändert**) | Dok. 20A „KI-Funktionen und Guardrails"; Dok. 06 „UX/UI, Navigation, Erlebniswelten"; Dok. 19 „Sicherheit, Datenschutz, Rechte, Auditierbarkeit"; Dok. 12 v1.1 „Reporting/Präsentations-Engine" (Claim-Freigabestatus); Dok. 01/02 (Positionierung/Differenzierung) |
| Betroffene Artefakte (nur benannt) | `apps/web/lib/twin/trust-layer.ts` (+ Test); `apps/web` Confidence-/Herkunfts-Anzeigen; ggf. `apps/web/components` gemeinsame Badge-Konvention; **kein** `@isms/contracts`-Eingriff nötig für Stufe 1 |

> **⚠️ Dieser Entwurf ändert nichts.** Er ist ein nicht-bindender Vorschlag an den Owner
> (`.claude/rules/research.md`: „Materiale Änderungen benötigen Research Brief, Change Proposal
> und Consistency Review"; DR-0005). Keine aktive Konzeptdatei, kein Contract, kein Seed und kein
> Produkttext wird durch dieses Dokument verändert. Umsetzung erst nach Owner-Freigabe und
> nachgelagertem Concept Consistency Review.

> **Regel-Null-Ehrlichkeit dieser Session:** In diesem Kontext waren **weder** `python
> scripts/pdf_text.py` (Bash nicht verfügbar) **noch** das PDF-Rendering (poppler fehlt) nutzbar.
> **Es wurde nichts am PDF verifiziert.** Alle unten zitierten Abschnittstitel und Formulierungen
> stammen aus den **Markdown-Arbeitskopien** (`docs/concept/active/`), die nachweislich nicht
> verlustfrei aus den PDFs abgeleitet sind (FINDING-0007, DR-0006). **Dok. 20A trägt die Kopfnotiz
> `[Konzept-unkorrigiert]`** — hier ist die PDF-Nachprüfung ohnehin offen. Die
> Regel-Null-Verifikationsliste (§7) ist damit **verbindliche Vorbedingung** jeder Umsetzung.

---

## 1. Problem und Evidenz

Der Markt flutet mit „agentic-AI"-Autonomie-Claims; genau daraus entsteht Käufer- **und**
Auditoren-Skepsis. Wer Herkunft, Unsicherheit und menschliche Freigabe **sichtbar und einheitlich**
macht, gewinnt zugleich ein Kauf- und ein Audit-Argument. Unsere Haltung ist konzeptseitig bereits
führend und app-seitig bereits gebaut — sie ist nur nicht als **eine benannte, app-weit
einheitliche Vertrauenskonvention** ausgewiesen.

| Signal | Fundstelle | Confidence (Brief) |
|---|---|---|
| 67 % der GRC-Käufer halten Autonomie-Claims für „overstated"; 42 % hatten Audit-Findings zur AI-Entscheidungsqualität; 31 % der SOC-2-Auditoren prüfen AI-Logs; 73 % ohne publizierte Accuracy-Benchmarks | MARKT §2.3/§4/§5.3 `[WEB-STAT, mittel]` | mittel (Einzelzahlen), **hoch** in der Konvergenz |
| „Haltung führend" als Differenzierer | WETTBEWERB D7 `[Dok02]` | hoch |
| „ehrliche Löschung" + Human Authority als regulatorischer Rückenwind | REGULATORIK §2.5/§3 `[Konzept-unkorrigiert]` | mittel–hoch |

**Was bereits gebaut ist (Umsetzungsstand, nicht Produktwahrheit):** Der **Antwort-Modus** (WP-028,
DR-0013: „Zahl/Stand zuerst, Lücke als ruhige Zeile", kein internes Vokabular im UI) und der
**Trust-Layer-Abgleich** (`apps/web/lib/twin/trust-layer.ts`) ordnen die acht Trust-Layer-Angaben
den heute belegten Vertrauensanzeigen zu und weisen **unbelegte Angaben sichtbar** als „kein
Träger"/„teilweise" aus — nichts wird berechnet oder erfunden (O-WP020-06 offen). Das ist genau die
Substanz, die BL-01 sichtbar und konsistent machen will.

**Konzeptbeleg (aus Markdown, PDF-Nachprüfung offen):**
- Dok. 20A §16.2 „Confidence ist berechnet, nicht behauptet": Die Plattform berechnet einen
  **erklärbaren Vertrauensstatus** (Bänder „hoch/mittel/niedrig/nicht ausreichend" plus stärkste
  Gründe); „Niedrige Confidence darf nicht durch selbstbewusste Sprache verdeckt werden."
- Dok. 20A §27.2 „Keine künstliche Autorität": vermeidet „Die KI hat entschieden"; nennt Quellen,
  Confidence-Band und erforderlichen menschlichen Reviewstatus.
- Dok. 19 „SP16 – Human Authority": KI/Automation/Agenten dürfen kritische Freigaben nicht autonom
  finalisieren.
- Dok. 06 §17.1 „Sonder-, Fehler- und Vertrauenszustände", Absatz „Trust Layer" (in
  `trust-layer.ts` bereits als **PDF-gegengelesen** vermerkt): Herkunft, letzter Datenzeitpunkt,
  Vollständigkeit, widersprüchliche Quellen, Modell-/Regelversion, Annahmen, menschliche Reviews,
  Auswirkung von Datenlücken.

## 2. Vorgeschlagene Änderung (nicht-bindend)

**Eine benannte, app-weit einheitliche Vertrauenskonvention** — als Konvention/Positionierung, ohne
Datenmodell- oder Außenwirkung. Zwei Bausteine:

1. **Konventions-Schicht (Produkt):** Eine konsistente, dezente Kennzeichnung (Design-Leitplanke
   DR-0003 „dezent, hochwertig") für vertrauensrelevante Aussagen, die die **bereits vorhandenen**
   Träger bündelt: Quelle/Herkunft · Vertrauensband (nicht Scheinpräzision) · menschlicher
   Reviewstatus · Freigabestatus. Grundsatz „nur zeigen, was belegt ist; Lücke ruhig benennen"
   (Antwort-Modus/Trust-Layer-Abgleich) bleibt strikt erhalten — **keine erfundenen Scores.**
2. **Positionierungs-Narrativ (Research/Marketing-Input, kein Bau):** „Vertrauen statt
   Autonomie-Behauptung / Killable by Design / Human Authority" als bewusste Gegenposition zum
   Agentic-Hype. Dies ist ein **Vorschlag für Owner-Positionierung**, keine Produktänderung.

**Bewusst NICHT Teil dieses Vorschlags:** Ein berechneter, verdichteter Gesamt-Vertrauensindikator
(widerspräche Dok. 07 07-D10 „Dimensionen bleiben einzeln sichtbar" und O-WP014-02); neue
Contract-Felder; jede Aussage über tatsächlich gemessene Modell-Accuracy (die Golden-Set-Werte aus
Dok. 20A §16.2 existieren im Demo-Modus nicht → dürfen nicht behauptet werden).

## 3. Betroffene Konzeptdokumente (nur benannt, nicht geändert)

| Dok. | Abschnittstitel (aus Markdown; **am PDF zu bestätigen**) | Bezug |
|---|---|---|
| 20A | §16 „Quellen, Provenance und Confidence" (§16.1 „AI Provenance Record", §16.2 „Confidence ist berechnet, nicht behauptet"); §17 „Human Gates und Verantwortlichkeit"; §27 „UX, Transparenz und AI Literacy" (§27.1 „Kennzeichnung", §27.2 „Keine künstliche Autorität"); §33 „Globale Akzeptanzkriterien"; §37 „Ideenparkplatz" | normative Confidence-/Kennzeichnungsregeln |
| 06 | §17.1 „Sonder-, Fehler- und Vertrauenszustände" (Absatz „Trust Layer"); §19 „Datenvisualisierung, Accessibility & Responsive Design" (Reifegrad zeigt „Ziel, Ist, Trend, Vertrauensgrad und nicht nur eine Prozentzahl"); 06-D08 | Vertrauensebene, keine Scheinpräzision |
| 19 | „SP16 – Human Authority" | menschliche Letztverantwortung |
| 12 v1.1 | Claim-Freigabestatus/geschützte Regionen | Freigabestatus als Teil der Konvention (Reporting) |
| 01/02 | Positionierung/Differenzierung | Anti-Hype-Narrativ (Owner-Hoheit) |

## 4. Wirkung auf Datenmodell / Contracts / UI (grob)

- **Datenmodell / `@isms/contracts`:** **keine Änderung** für Stufe 1. Die Konvention verwendet
  ausschließlich bereits belegte Felder (Herkunft/Quellreferenzen, Datenqualitätsdimensionen,
  Bestätigungsstufe, Kanten-Vertrauensgrad).
- **UI (`apps/web`):** Vereinheitlichung bestehender Anzeigen zu **einer** dezenten
  Badge-/Zeilenkonvention; Kandidat für einen gemeinsamen Baustein neben dem existierenden
  Trust-Layer-Abgleich. Loading/Empty/Error/„kein Träger" bleiben ehrlich (Frontend-Regeln).
- **Reporting:** Claims tragen weiterhin Quelle/Methodik/Confidence/Freigabestatus
  (`.claude/rules/reporting.md`) — die Konvention macht diesen Status app-übergreifend
  wiedererkennbar.
- **Security/Privacy:** kein neuer Datenfluss; keine PII; keine externe Aktion. Non-invasiv.

## 5. Warum non-invasiv (kein Human Gate für den Bau, aber Consistency Review)

Kein Contract, keine Persistenz, keine externe Schreibaktion, keine Cross-Tenant-Wirkung. Der Bau
selbst bräuchte **kein** Human Gate; der **Owner-Entscheid** betrifft (a) die Freigabe der Konvention
als Produktstandard und (b) das Positionierungs-Narrativ. Ein Concept Consistency Review über
Dok. 20A/06/19 bleibt Pflicht, weil die Konvention normative Aussagen dieser Dokumente sichtbar
zusammenführt.

## 6. Offene Fragen

- **OF-1:** Ist der „Killable by Design"-Begriff im PDF von Dok. 20A ein **eigener
  Abschnitt/Zusage** oder eine Formulierung? (Im Markdown existiert die Sache als „Kill Switch",
  §18.1 Toolvertrag, und Autonomie-/Wirkungsebenen §5 — **kein** Heading „Killable by Design"
  gefunden.) → am PDF klären, nicht als Zitat behaupten.
- **OF-2:** Welche der acht Trust-Layer-Angaben (Dok. 06) dürfen in Demo-Sprache in **eine**
  Konventionszeile verdichtet werden, ohne die Regel „Dimensionen einzeln sichtbar" (07-D10) zu
  verletzen? (Verwandt mit O-WP020-06, O-WP014-02.)
- **OF-3:** Soll das Freigabe-/Reviewstatus-Signal aus Dok. 12 (Reporting) und aus Dok. 20A §17
  (Human Gates) **dieselbe** visuelle Konvention teilen? (Konsistenz vs. Kontext-Differenzierung.)
- **OF-4:** Positionierungs-Narrativ ist **Owner-Hoheit** — welche Claims dürfen extern verwendet
  werden, ohne publizierte Accuracy-Benchmarks (die im Demo-Modus fehlen)?

## 7. Regel-Null-Verifikationsliste (vor JEDER Umsetzung am PDF zu prüfen)

> Diese Session hat **nichts** am PDF verifiziert (§ Banner). Vor Umsetzung ist jede Zeile am
> **PDF-Original** gegenzulesen; zitiert wird der **Abschnittstitel**, nicht die Nummer.

1. **Dok. 20A** (`python scripts/pdf_text.py 20A`), `[Konzept-unkorrigiert]` → vollständig
   gegenlesen: Abschnitte „Quellen, Provenance und Confidence" (v. a. „Confidence ist berechnet,
   nicht behauptet"), „Human Gates und Verantwortlichkeit", „UX, Transparenz und AI Literacy"
   (Kennzeichnung / Keine künstliche Autorität), „Globale Akzeptanzkriterien" **und**
   „Ideenparkplatz" (`--suche "Killable"`, `--suche "Confidence"`, `--suche "Ideenparkplatz"`).
2. **Dok. 06** (`python scripts/pdf_text.py 06 --suche "Trust Layer"`, `--suche "Vertrauensgrad"`):
   Absatz „Trust Layer" (acht Angaben) und „Datenvisualisierung …" („nicht nur eine Prozentzahl") —
   **plus** Abgleich der Kopfnotiz-Drift (PDF-Folientitel „Datenvisualisierung, Barrierefreiheit und
   Responsive Design" vs. Markdown „… Accessibility & Responsive Design").
3. **Dok. 19** (`python scripts/pdf_text.py 19 --suche "Human Authority"`): Wortlaut „SP16 – Human
   Authority" bestätigen.
4. **Dok. 12 v1.1** (`python scripts/pdf_text.py 12 --suche "Freigabe"`): Claim-Freigabestatus /
   geschützte Regionen — Feldnamen exakt übernehmen.
5. **Grundsatz-Check:** Bestätigen, dass das PDF **keinen** verdichteten Gesamt-Vertrauensscore als
   Pflichtfunktion verlangt (07-D10 „einzeln sichtbar"); sonst OFFENE FRAGE, nicht füllen (DR-0005).

## 8. Owner-Entscheidung, die gebraucht wird

1. **Freigabe (ja/nein/verschoben):** BL-01 als kleines, non-invasives WP umsetzen (einheitliche
   Vertrauenskonvention auf Basis bereits belegter Träger)?
2. **Umfang OF-2:** Verdichtung in **eine** Konventionszeile erlaubt, oder strikt getrennte
   Anzeigen?
3. **Positionierung OF-4:** Anti-Agentic-Hype-Narrativ als Owner-Positionierung freigeben — und mit
   welchen belegbaren Claims (ohne Accuracy-Behauptung)?

## 9. Freigaben

| Gate | Status |
|---|---|
| Regel-Null-PDF-Verifikation (§7) | **offen — Vorbedingung** |
| Concept Consistency Reviewer (nachgelagert) | ausstehend |
| Human/Product Gate (**Owner**) | **offen** |
