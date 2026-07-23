# Dokumentationsregeln

- Entscheidung, Annahme, offene Frage und spätere Idee klar trennen.
- Keine stille Widerspruchsauflösung.
- Aktive Quellen versionieren; Vorgänger archivieren, nicht löschen.
- Jeder materiale Fortschritt aktualisiert Status, Work Package und Handover.
- Chatwissen ist erst nach Übertragung in das Repository verbindlich.

## Quellenhierarchie (DR-0006)

- **`docs/concept/pdf/` ist die Produktwahrheit.** Bei Abweichung gilt das PDF, nicht das Markdown.
- `docs/concept/active/` ist Arbeitskopie und nachweislich nicht verlustfrei abgeleitet
  (FINDING-0007). Eine Aussage, die nur dort steht, ist begruendungspflichtig.
- Anforderungen, Pflichtfelder, Vokabulare und Zahlen werden **im PDF** nachgelesen:
  `python scripts/pdf_text.py <nr> [--suche "..."]`.
- Zitiert wird der **Abschnittstitel**, nicht nur die Nummer — die Nummerierung weicht ab.
- Eine gefundene Abweichung wird korrigiert **und** als Befund festgehalten, nie still bereinigt.
