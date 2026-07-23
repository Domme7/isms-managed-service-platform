# WP-028 – Antwort-Modus statt Rechtfertigung + Produktsprache

> **Nachträglich dokumentiert** (2026-07-24, QA-Gate-Auflage). Das WP entstand aus einem
> Owner-Auftrag mitten im Sprint; die **Spezifikation ist DR-0013**
> (`docs/decisions/DR-0013_antwort_modus_statt_rechtfertigung.md`) samt DR-0011 (Produktsprache)
> und DR-0012 (Sphärenmodell). Dieses Dokument hält Zuschnitt, Slices und Abnahme fest, damit
> die Gates gegen ein schriftliches Zielbild prüfen und nicht gegen Chatwissen.

## Identität

- **Phase:** quer (Produktoberfläche; kein Persistenz-/Auth-Bau)
- **Auslöser:** kritischer Usability-Audit aus vier Fachperspektiven (ux-service-design,
  product-critic, isms-domain-lead, product-user-lead) an 14 echten UI-Screenshots.
  **Konsens-Diagnose:** Fundament stark, aber das Produkt ist im **Rechtfertigungs-Modus** —
  Wände aus Vorbehalten vor jedem Statuswert, Seiten verneinen ihre eigene Überschrift,
  internes Vokabular im UI.
- **Risk Class:** Medium — berührt die gesamte Produktoberfläche und die Ehrlichkeits-Wächter;
  die zentrale Gefahr ist, dass mit der Rechtfertigung auch **Substanz** erodiert.
- **Builder:** `frontend-engineer`, Slices strikt sequenziell, committet nie selbst.
- **Gates:** Code · Product · Domain · QA · **Security & Privacy** · Konzepttreue; zweite Runde
  nach dem Fix-Pass.

## Ziel

Jede Seite führt mit dem, was sie **kann**; Lücken sind eine ruhige, nachgeordnete Zeile statt
einer Wand. Kein internes Vokabular im UI. Konzeptanker: Dok. 06 P06 („die erste Ebene bleibt
ruhig"), P04 („Ursache vor Score"), §18 (Text + Symbol + Farbe), DR-0008 („nicht übertrieben").

## Slices (alle gebaut)

1. **`/heute` im Antwort-Modus** + geteilte Komponenten: Klartext-Stand und Kacheln über der
   Falz; Intro/Ehrlichkeitsklammer als Schlusszeile; Kontextleiste auf belegte Felder;
   Kachel-Boilerplate (Scope/Datenstand 9×) entdoppelt; Detailtiefe kompakt; Sticky-Occlusion.
   *(Commit `11adb73`)*
2. **Internes Vokabular app-weit** → Domänensprache: Dokumentverweise, Feldnamen, Muster-/
   Familiencodes, Beziehungstyp-Codes („mitigates" → „wird gemindert durch"); Register in
   Praxissprache („Ermittlungsregel" → „So wird gezählt"). *(Commit `ca16fc6`)*
3. **`/entscheidungen` + `/isms` im Antwort-Modus**, Rollenfokus ohne Beipackzettel,
   Badge-Sprache präzise, „wirksam"-Widerspruch am Wort gekennzeichnet. *(Commit `8017aa2`)*
4. **Sphäre an Rolle, Leitbegriffe, ehrlicher Header, Demo-Sprache**: Kundenrollen und Auditor
   sehen den eigenen Mandanten; ein Leitbegriff je Konzept; „Ansicht zurücksetzen" statt
   „Abmelden"; Rollencodes raus (löst den Wächter-Regelkonflikt O-WP032-10); Demo-Disclaimer
   app-weit entfernt; drei neue Wächter. *(Commit `bb1e116`)*

## Acceptance (Kurzform, Nachweis in der Review-Notiz)

1. Auf jeder Hauptseite steht über der Falz eine **Antwort** (Zahl/Stand), kein Meta-Text.
2. Keine Seite verneint ihre eigene Leitfrage; gerendert wird die **beantwortbare** Frage, der
   Konzeptanker bleibt in `places.ts` begründet stehen.
3. Kein internes Vokabular im gerenderten Text (Dokumentverweise, Feldnamen, Muster-/Familien-/
   Beziehungscodes) — **mechanisch bewacht**.
4. Keine „synthetisch/Demo/Simulation"-Meta-Disclaimer im Produkt — **mechanisch bewacht**,
   mit belegten Ausnahmen (Seed-Strings, wörtliche Konzeptzitate).
5. **Ehrlichkeits-Substanz unverändert vorhanden und auffindbar**: 08-D07, „x von y" mit
   Grundgesamtheit, benannte Datenlücken, Mandantengrenze, Wirkungsannahme.
6. Sphäre steuert die Reichweite (Kundenrollen/Auditor: eigener Mandant) — als **Perspektive**
   benannt, nie als durchgesetzte Grenze behauptet.
7. Kein Wächter abgeschwächt; jede Regelevolution im Test begründet.
8. `pnpm --filter @isms/web exec vitest run`, `pnpm lint`, `pnpm typecheck` grün;
   `pnpm qa:visual` ohne neue `serious`-Befunde.

## Stop Conditions (galten)

Substanzverlust statt Umordnung · ein Wächter nur durch Abschwächen grün · erfundene
Übersetzung statt Fachbegriff · Behauptung durchgesetzter Sicherheit · `packages/*`-Eingriff.

## Ergebnis

Alle vier Slices gebaut, 666 Tests grün. Gate-Runde 1: 5× Freigabe mit Auflagen, 1× Nacharbeit
(QA). Alle sechs Gates bestätigen unabhängig, dass die Ehrlichkeits-Substanz erhalten ist.
14 Auflagen im gebündelten Fix-Pass; Details und Fundliste in
`docs/project/reviews/WP-028_WP-032_INDEPENDENT_REVIEW.md`.
