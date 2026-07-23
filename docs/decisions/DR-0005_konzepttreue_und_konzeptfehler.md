# DR-0005 – Konzepttreue: das Zielbild gilt vollständig, ein Konzeptfehler aber nicht

- Typ: Product / Governance
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** (Aussage in Session)
- Betroffen: `CLAUDE.md`, `docs/project/CONTINUATION_BRIEFING.md`, alle künftigen Work Packages,
  `research/change-proposals/`

## Kontext

Bisher galt im Projekt eine strenge Regel: **aus dem Konzept ableiten, nie erfinden.** Fehlt eine
Aussage in `docs/concept/active/`, wird sie als OFFENE FRAGE dokumentiert und **nicht** ergänzt.
Diese Regel hat sich bewährt — sie hat in WP-012 bis WP-017 rund dreißig echte Konzeptlücken
sichtbar gemacht, statt sie durch geratene Inhalte zu verdecken.

Sie beantwortete aber eine Frage **nicht**: Was gilt, wenn das Konzept nicht *lückenhaft*, sondern
*falsch* ist? Bisher wurde ein Konzeptfehler entweder wortgetreu umgesetzt oder als „Lücke"
behandelt — beides ist unbefriedigend.

## Aussage des Owners

> „Ich möchte, dass das Endprodukt so wird, wie ich es detailliert in den Dokus beschrieben habe —
> oder besser. Wenn ich in der Doku einen Fehler gemacht habe, dann muss der nicht zwingend rein."

## Entscheidung

1. **Das Zielbild der Konzeptdokumente gilt vollständig und wird nie verkleinert.** Umfang, Anspruch
   und Detailtiefe aus `docs/concept/active/` sind das Ziel — auch dann, wenn ein Baustein erst
   viele Work Packages später erreichbar ist. Scope-Verkleinerung aus Bequemlichkeit ist verboten.

2. **Ein erkannter Konzeptfehler muss nicht umgesetzt werden.** Erkennt eine Rolle beim Bauen oder
   Reviewen, dass eine Konzeptaussage
   - sich mit einer anderen Konzeptaussage widerspricht,
   - fachlich nachweisbar falsch ist,
   - oder gegenüber einer offensichtlichen Alternative klar schlechter ist,

   dann wird sie **nicht stillschweigend gebaut** — und **auch nicht stillschweigend korrigiert**.

3. **Der Weg ist immer derselbe: benennen, begründen, besser vorschlagen.**
   - Befund als **OFFENE FRAGE** (`docs/project/OPEN_QUESTIONS.md`) mit Belegstelle,
   - bei materialer Wirkung zusätzlich als **Change Proposal** (`research/change-proposals/`,
     Muster CCP-001…003) mit Problem, Evidenz, Vorschlag und Auswirkung,
   - im Produkt bis zur Freigabe der **ehrliche Zustand**: Lücke benennen, nichts erfinden,
   - **Umsetzung der Korrektur erst nach Owner-Freigabe** (Human Gate).

4. **„Oder besser" ist ausdrücklich erlaubt — als Vorschlag, nicht als Alleingang.** Eine bessere
   Lösung als die dokumentierte darf vorgeschlagen werden, mit Begründung und Alternativen. Sie
   wird gebaut, wenn der Owner zustimmt.

5. **Die Grenze bleibt scharf:** Diese Entscheidung ist **keine** Lizenz zum Erfinden. Sie gilt für
   *erkannte und belegte Fehler*, nicht für Geschmacksfragen, nicht für Bequemlichkeit und nicht
   für Lücken. Für Lücken gilt unverändert: dokumentieren, nicht füllen.

## Warum das die Regeln stärkt statt schwächt

Die alte Regel schützte vor erfundenen Inhalten, zwang aber im Extremfall dazu, einen bekannten
Fehler ins Produkt zu bauen — was der übergeordneten Projektregel „Ehrlichkeit vor Wirkung"
widerspricht. Mit DR-0005 ist der Ausweg definiert und **dokumentationspflichtig**: der Fehler
verschwindet nicht still, sondern wird sichtbar, begründet und entscheidbar.

## Bereits nach diesem Muster behandelte Fälle

Diese Entscheidung formalisiert, was in Einzelfällen schon so gehandhabt wurde:

- **O-D07-02/-03** (Lifecycle-Schreibweise und -Liste widersprechen sich zwischen Dok. 07 §7/§8 und
  Dok. 05 §7) → CCP-001, beide Fassungen dual erhalten statt eine still zu wählen.
- **O-WP014-10** (Dok. 07 §9 Beispielspalte einmal als abschließend, einmal als illustrativ
  behandelt) → als methodische Inkonsistenz benannt statt aufgelöst.
- **O-WP017-01** (`Task` steht in Dok. 07 §6 als Objekttyp, kommt in §9 in **keiner** der
  25 Beziehungszeilen vor) → Aufgaben werden nicht materialisiert, weil sie Waisen wären.

## Folgen

- Jede Rolle darf und soll Konzeptfehler aktiv melden — Reviewer ausdrücklich eingeschlossen.
- Work Packages, die auf einem strittigen Konzeptteil aufsetzen, benennen das im WP-Text.
- `OPEN_QUESTIONS.md` unterscheidet weiterhin **Lücke**, **Konzeptwiderspruch** und
  **reversible Anzeigeentscheidung** — diese Typisierung wird mit DR-0005 wichtiger, nicht weniger.
