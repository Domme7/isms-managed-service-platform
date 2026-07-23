# DR-0010 – Produktkorrektur-Sprint: Dashboard zuerst, dann Einstieg, dann sichtbare Kundenwelt; Varianten-Stopp; paralleles Konzept-Nachziehen

- Typ: Product / Roadmap / Prozess
- Status: **Accepted**
- Datum: 2026-07-23
- Decision Owner: **Human Product Owner** (Steuerung während des laufenden WP-020)
- Betroffen: WP-020 (Slice-Reihenfolge), WP-006 (vorgezogen als Sprint-Bestandteil),
  WP-025 (Cockpit-Varianten in den Sprint gezogen), WP-023 (parallel aktiviert),
  WP-026/WP-027 (bleiben reine Queue-Anker), Arbeitsregel für alle künftigen Fachmodule

## Owner-Anweisung (sinngemäß vollständig)

1. Keine neuen Nebenmodule starten.
2. WP-020 als **Produktkorrektur-Sprint** durchführen.
3. Reihenfolge: **zuerst** ein strategisches Dashboard mit klarer Informationsverdichtung,
   **danach** der neue Einstieg Login → neutrales Dashboard → Rollenwahl,
   **anschließend** eine **sichtbare Kundenwelt**.
4. Die PDFs sind die fachliche Basis; die akzeptierten Decision Records sind die spätere
   Präzisierung.
5. **Zwei bis drei Cockpit-Varianten** erstellen und **anschließend stoppen** für die
   visuelle Freigabe des Owners.
6. Parallel dürfen die **übrigen 14 Markdown-Dokumente** aus den PDFs korrigiert werden.
7. **Kein neues größeres Fachmodul darf ausschließlich aus ungeprüftem Markdown gebaut
   werden.**

## Entscheidungen und Konsequenzen

1. **WP-020-Slice-Reihenfolge geändert** (Definition bleibt gültig, Reihenfolge neu):
   Slice 1 (Cross-Tenant-Schutz) war beim Eintreffen der Anweisung bereits gebaut und
   committet (`7971bc6`) — er bleibt (Sicherheitskorrektur, kein Nebenmodul). Danach:
   **Slice 3+4 (Verdichtung + Dashboard) → Slice 2 (Einstiegsfluss) → Slice 5
   (Rollenvarianten/Abgleiche) → sichtbare Kundenwelt → Cockpit-Varianten → STOPP.**
2. **Sichtbare Kundenwelt wird Sprint-Bestandteil** (WP-006 Stufe 1 vorgezogen).
   **Benannte Spannung zu DR-0009** („Voraussetzung WP-021 bleibt davor"): Die Demo-Accounts
   und Konzept-Unternehmen (WP-021) existieren noch nicht. Stufe 1 wird deshalb **read-only
   aus den PDFs Dok. 14/16** auf dem heutigen Seed gebaut; fehlende Träger (Demo-Accounts,
   Preise → O-KUNDE-01) werden sichtbar benannt statt erfunden. Keine stille Auflösung —
   diese DR dokumentiert die Owner-Priorisierung „sichtbar jetzt, Datenfülle mit WP-021".
3. **Cockpit-Varianten (WP-025-Kern) in den Sprint gezogen:** 2–3 Stilvarianten des
   strategischen Dashboards, per `pnpm qa:visual` als Screenshots belegt. **Danach hält der
   Sprint an** — visuelle Freigabe des Owners ist das Gate für alles Weitere.
4. **WP-023 parallel aktiviert:** die 14 material abweichenden Markdown-Fassungen
   (Dok. 00, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20B, 20C) werden nach dem
   WP-019-Muster (Vollableitung aus dem PDF + Konsistenz-Gate je Dokument + Kopfnotiz)
   neu abgeleitet. **Priorität: Dok. 14 und 16 zuerst** — fachliche Basis der Kundenwelt.
5. **Neue Bauregel (verallgemeinert Regel Null):** Ein neues größeres Fachmodul wird nur
   aus PDF-Originalen oder aus nachweislich quellentreu nachgezogenen Markdown-Fassungen
   gebaut — nie ausschließlich aus ungeprüftem Markdown. Für die Kundenwelt heißt das:
   Dok.-14/16-Anteile werden am PDF belegt (Extrakt/`pdf_text.py`), unabhängig vom Stand
   der Markdown-Korrektur.
6. **Keine neuen Nebenmodule bis zum Varianten-Stopp:** WP-026 (Dok.-04-Vokabular) und
   WP-027 (Suche) bleiben Queue-Anker; keine Tooling-/Infrastruktur-Nebenstränge.

## Verhältnis zu bestehenden Entscheidungen

- **DR-0008** unverändert in Kraft (Ehrlichkeitsgrenze der Dashboard-Schicht, Owner-Abnahme
  je Stufe). Diese DR konkretisiert den Abnahmepunkt: Varianten-Stopp.
- **DR-0009** unverändert in Kraft (Einstiegsfluss, Kundenwelt als Kernpfad); nur die
  **Reihenfolge** WP-021 → WP-006 wird für Stufe 1 überstimmt (siehe Nr. 2).
- **DR-0006/Regel Null** wird durch Nr. 5 verschärft, nicht ersetzt.
