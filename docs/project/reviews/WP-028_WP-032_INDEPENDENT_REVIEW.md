# WP-028 (Antwort-Modus) + WP-032 (Reports · Wissen · Administration) – Unabhängige Reviews

**Gate-Runde 1:** 2026-07-24 · sechs Fachgates parallel, jedes mit eigenem Fokus
**Grundlage:** DR-0013 (Antwort-Modus), DR-0011 (Produktsprache), DR-0012 (Sphärenmodell),
`work-packages/WP-032_REPORTS_WISSEN_ADMINISTRATION.md`
**Stand bei Runde 1:** web 666 Tests grün, lint + typecheck grün, axe: alle Motive `serious 0`
außer Objekt-360-Altbestand.

## Urteile

| Gate | Urteil |
|---|---|
| Code Quality (`code-reviewer`) | Freigabe mit Auflagen |
| Product (`product-user-lead`) | Freigabe mit Auflagen |
| Domain (`isms-domain-lead`) | Freigabe mit Auflagen |
| **QA (`qa-test-engineer`)** | **Nacharbeit** |
| Security & Privacy (`product-security-privacy`) | Freigabe mit Auflagen |
| Konzepttreue (`concept-consistency-reviewer`) | Freigabe mit Auflagen |

## Die zentrale Frage dieses Umbaus — beantwortet

Der Antwort-Modus verschiebt Ehrlichkeitsaussagen aus der Sichtachse. **Die Gefahr war, dass mit
der Rechtfertigungs-Wand auch Substanz verschwindet.** Alle sechs Gates haben das unabhängig
geprüft und **entwarnt**: 08-D07-Glosse unverkürzt und immer sichtbar, „x von y" mit
Grundgesamtheit, benannte Datenlücken, Mandantengrenze und die Wirkungsannahme-Kennzeichnung sind
vollständig erhalten und auffindbar — nur ruhiger platziert. Die Kontextleisten-Regel wurde
nachweislich **geschärft** statt abgeschwächt.

## Die wertvollsten Funde

1. **Der neue snake_case-Wächter war blind für genau seine Kernklasse** (QA + Code, unabhängig).
   `SEED_SNAKE_MASKEN` wird rekursiv aus allen Seed-Strings gebildet — darin stehen die blanken
   Beziehungstyp-Werte (`part_of`, `delivered_by`, …). Ein UI-Text „delivered_by" — das wörtliche
   DR-0013-Beispiel — wäre vor der Prüfung weggeschnitten worden. Der Negativbeweis prüfte nur die
   Regex, nicht die maskierte Pipeline, und verdeckte das Loch. **Lehre: einen Wächter immer über
   seine echte Pipeline beweisen, nicht über sein Muster.**
2. **`/heute` behielt als einziger Ort die aspirative Leitfrage** — der prominenteste Einstieg
   trug weiter genau das Muster, das der Umbau überall sonst beseitigt hat (drei Gates unabhängig).
3. **Zwei divergierende Sphären-Regeln:** `/twin` entscheidet über die Sphäre, `/services` über
   die Erlebniswelt. Folge: Kundenrollen lasen auf `/services` „Portfolio über alle Mandanten …
   der Service-Organisation vorbehalten" — eine Reichweitenaussage genau in der Sphäre, die davon
   frei sein soll (Code + Security).
4. **Familiencodes F01–F09 standen weiter sichtbar** (Badge, Objektkarte, `aria-label`) — die
   app-weite Jargon-Bereinigung hatte sie übersehen, und kein Wächter deckte sie ab.
5. **Sicherheits-Nuance:** Das rollenabhängig **verschwindende** Mandanten-Select ist die stärkste
   nonverbale Durchsetzungsbehauptung, die eine Oberfläche machen kann — obwohl die Sphärenwahl
   nur Perspektive ist (Security).
6. **Der Auditor (R07) wurde der Ein-Unternehmens-Sicht zugeordnet** — vom Domain-Gate als „im
   Zweifel die richtige, weil engere Wahl" bestätigt, mit Beleg „kontrollierter Prüfbereich statt
   pauschalem Vollzugriff" (Dok. 03).

## Konzepttreue-Auflage: Dok.-19-Zitate der Administrationsseite — **verifiziert**

Das Konzepttreue-Gate wies zu Recht darauf hin, dass `/administration` rund 60 wörtliche
Listeneinträge aus **Dok. 19** reproduziert — dem einzigen benutzten Quelldokument, das **nicht**
quellentreu neu abgeleitet ist (Dok. 19 gehört zu den vier bewusst unkorrigierten Fassungen).
Die Zitate wurden deshalb **direkt am PDF gegengelesen** (`python scripts/pdf_text.py 19 --suche …`):

- §7.1 **Identitätstypen** — acht Einträge wörtlich bestätigt (inkl. „kurzlebige Demo- oder
  Testidentitäten", das damit ein **Konzeptbegriff des Zielprodukts** ist und kein Demo-Disclaimer
  über unseren Datenbestand — O-WP032-11 bestätigt).
- §7.2 **Joiner, Mover, Leaver** — Stationen wörtlich bestätigt.
- §11.1 **Mehrschichtige Isolation** — Isolationsschichten wörtlich bestätigt.
- §11.3 **Metadatenlecks** — Prüfflächen wörtlich bestätigt.

**Ergebnis:** Die Inhalte sind PDF-gedeckt; die Auflage ist erfüllt. Bestehen bleibt, dass die
Markdown-Fassung von Dok. 19 nicht quellentreu ist — wer dort weiterbaut, liest am PDF gegen
(Regel Null, unverändert).

## Fix-Pass (Runde 1 → Runde 2)

14 gebündelte Punkte, geordnet nach Schwere: `/heute`-Leitfrage · snake_case-Wächter schärfen ·
Familiencodes · **eine** Sphären-Regel (auch `/services`) · Objekt-360-Altbestand (schließt
FINDING-0008) · präzisierte Rollenaussage seit der Sphärenkopplung · Hinweis am verschwindenden
Mandanten-Select · Design-Theorie-Wörter · `STAND_HINWEIS` erschöpfend typisieren · Glossar
„Tenant" → „Mandant" · Singular/Plural · `/kunden` im Antwort-Modus · Seitenbausteine-Hinweis in
Nutzersprache · Scope-Kennungen in den Aufklappteil.

**Bewusst nicht im Fix-Pass** (als offene Frage bzw. eigener Pass registriert): die
`PageContextBar`-Halbfassung zu DR-0013 Nr. 4 (Owner-Entscheidung, siehe O-WP028-02) und die
`/services`-Seed-Beschreibungen mit internem Vokabular (WP-033 Seed-Textpass — liegt in
`packages/demo-seed` und ist damit außerhalb jedes Frontend-Slices).
