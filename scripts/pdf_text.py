"""Text aus den Konzept-PDF-Originalen lesen.

Die PDFs unter `docs/concept/pdf/` sind die Produktwahrheit (DR-0006). Dieses Skript macht sie
zugänglich, damit die Regel "alles kommt aus den PDFs" auch praktisch befolgbar ist statt nur
gut gemeint.

Beispiele:
    python scripts/pdf_text.py                       # alle Dokumente auflisten
    python scripts/pdf_text.py 07                    # Dokument 07 vollstaendig als Text
    python scripts/pdf_text.py 06 --suche "Trust Layer"
    python scripts/pdf_text.py 06 --suche "Cross-Tenant" --umfeld 1200
    python scripts/pdf_text.py 20B --abschnitte      # nur die Abschnittsueberschriften

Hinweis zur Nummerierung: In einigen PDFs weicht die Nummerierung der Folientitel von der
Navigationsleiste am Seitenkopf ab, und das Markdown folgt teils der einen, teils der anderen.
Zitiere deshalb immer den ABSCHNITTSTITEL, nicht nur die Nummer.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / 'docs/concept/pdf'

# Nur diese Fassungen sind aktiv; ältere Versionen liegen daneben und werden bewusst ignoriert.
AKTIVE_FASSUNG = {
    '00': 'Dokument_00_Master_Index_Projektverfassung_v1.2.pdf',
    '12': 'Dokument_12_Reporting_PDF_Praesentations_Engine_v1.1.pdf',
}


def finde_pdf(nummer: str) -> Path:
    """PDF zu einer Dokumentnummer ('07', '20B', ...) auflösen."""
    nummer = nummer.upper()
    if nummer in AKTIVE_FASSUNG:
        pfad = PDF_DIR / AKTIVE_FASSUNG[nummer]
        if pfad.exists():
            return pfad
    treffer = sorted(PDF_DIR.glob(f'Dokument_{nummer}_*.pdf'))
    if not treffer:
        raise SystemExit(f'Kein PDF fuer Dokument {nummer} in {PDF_DIR}')
    if len(treffer) > 1:
        # Neuere Version gewinnt (v1.2 > v1.1 > v1.0); Dateiname sortiert korrekt.
        print(f'[Hinweis] mehrere Fassungen gefunden, nutze die letzte: {treffer[-1].name}',
              file=sys.stderr)
    return treffer[-1]


def text_von(pfad: Path) -> str:
    try:
        import pypdf
    except ImportError:
        raise SystemExit('pypdf fehlt. Installieren mit: pip install pypdf')
    leser = pypdf.PdfReader(str(pfad))
    return '\n'.join((seite.extract_text() or '') for seite in leser.pages)


def abschnitte(text: str) -> list[str]:
    """Abschnittsueberschriften im Folienstil ("7. Lebenszyklus und Status")."""
    gefunden = []
    for m in re.finditer(r'^\s*(\d{1,2}(?:\.\d+)?)\.?\s+([A-ZÄÖÜ][^\n]{4,80})$', text, re.M):
        zeile = m.group(0).strip()
        if zeile not in gefunden:
            gefunden.append(zeile)
    return gefunden


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('dokument', nargs='?', help="Dokumentnummer, z. B. 07 oder 20B")
    ap.add_argument('--suche', help='nur Fundstellen dieses Begriffs ausgeben (case-insensitive)')
    ap.add_argument('--umfeld', type=int, default=900, help='Zeichen Kontext je Fundstelle (Default 900)')
    ap.add_argument('--abschnitte', action='store_true', help='nur die Abschnittsueberschriften')
    args = ap.parse_args()

    if not args.dokument:
        for pfad in sorted(PDF_DIR.glob('*.pdf')):
            print(pfad.name)
        return

    pfad = finde_pdf(args.dokument)
    text = text_von(pfad)
    print(f'# Quelle: {pfad.relative_to(ROOT)}\n', file=sys.stderr)

    if args.abschnitte:
        for zeile in abschnitte(text):
            print(zeile)
        return

    if args.suche:
        treffer = [m.start() for m in re.finditer(re.escape(args.suche), text, re.I)]
        if not treffer:
            print(f'Kein Treffer fuer "{args.suche}" in {pfad.name}.')
            return
        for i, pos in enumerate(treffer, 1):
            start = max(0, pos - args.umfeld // 3)
            print(f'\n----- Treffer {i}/{len(treffer)} -----')
            print(text[start:pos + args.umfeld])
        return

    print(text)


if __name__ == '__main__':
    main()
