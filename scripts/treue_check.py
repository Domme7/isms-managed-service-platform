"""Treue-Check: Markdown-Arbeitsfassung gegen den PDF-Textlayer pruefen.

Die 24 PDF-Originale unter `docs/concept/pdf/` sind die Produktwahrheit (DR-0006). Die
Markdown-Fassungen unter `docs/concept/active/` sind Arbeitskopien, die nachweislich schon
einmal nicht verlustfrei abgeleitet waren (FINDING-0007). `validate_handoff.py` und
`MANIFEST.json` sichern nur die Markdown-Hashes - sie sagen NICHTS ueber die Treue zum PDF.
Diese Luecke schliesst dieses Werkzeug maschinell, soweit ein Werkzeug das ehrlich kann.

    python scripts/treue_check.py            # alle 24 Dokumente
    python scripts/treue_check.py 06         # nur Dokument 06
    python scripts/treue_check.py --details  # Verdachtslisten vollstaendig statt gekuerzt
    python scripts/treue_check.py --json     # Maschinenausgabe
    python scripts/treue_check.py --streng   # fehlende normative PDF-Passagen zaehlen als hart

REICHWEITE - was dieses Werkzeug NICHT kann
-------------------------------------------
Geprueft wird ausschliesslich der **Textlayer** des PDF. Abbildungen tragen in diesen
Dokumenten nachweislich normative Inhalte (WP-019-Lehre: "Kritikalitaet" steht in der
Abbildung von Dok. 07, nicht im Text). Was nur im Bild steht, kann dieses Werkzeug weder
finden noch vermissen. Ein Lauf ohne Befund heisst deshalb **"im Textlayer keine Abweichung
gefunden"** - nie "treu".

Ausserdem erzeugt die Textextraktion systematische Artefakte, die zu Falsch-Positiven fuehren:
verschmolzene Tabellen-Zellgrenzen, umgebrochene Zeilen mitten im Satz, neu gezaehlte
Listenzaehler, Kopf-/Fusszeilen. Die Verdachtslisten sind deshalb Verdachtslisten und keine
Befunde - sie steuern den Exit-Code nicht.

Exit-Code
---------
0  = keine harten Befunde (Verdachtslisten koennen trotzdem Eintraege haben)
1  = harter Befund: fehlende Kennung, fehlender Abschnitt oder falsche Quell-PDF-Angabe
     (mit --streng zusaetzlich: fehlende normative PDF-Passage)
2  = Aufrufproblem (Dokument unbekannt, Datei fehlt)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path

# sys.path[0] ist beim direkten Aufruf das scripts/-Verzeichnis; beim Import aus tests/ nicht.
sys.path.insert(0, str(Path(__file__).resolve().parent))
import pdf_text  # noqa: E402  (bewusst nach dem sys.path-Eintrag)

ROOT = Path(__file__).resolve().parents[1]
ACTIVE_DIR = ROOT / 'docs/concept/active'
PDF_DIR = ROOT / 'docs/concept/pdf'

# Laenge eines n-Gramms fuer den Passagenabgleich. 6 Woerter: kurz genug, um Umformulierungen
# nicht zu uebersehen, lang genug, damit zufaellige Floskeln nicht als Beleg durchgehen.
NGRAMM = 6
# Kuerzere Luecken sind fast immer Extraktionsrauschen (Zellverschmelzung, Zeilenumbruch).
MIN_LUECKE = 10

# Normative Sprache. Gezaehlt wird auf dem normalisierten Wortstrom, damit Zeilenumbrueche
# ("darf \n nicht") nicht zu Scheinverlusten fuehren.
NORMATIVE_MUSTER = {
    'muss/muessen': r'\b(?:muss|muessen|müssen)\b',
    'darf/duerfen nicht': r'\b(?:darf|duerfen|dürfen)\s+(?:\w+\s+){0,3}?(?:nicht|niemals|nie|kein\w*)\b',
    'unzulaessig': r'\bunzul[aä]ssig\w*\b',
    'verbindlich': r'\bverbindlich\w*\b',
    'zwingend': r'\bzwingend\w*\b',
    'pflicht': r'\bpflicht\w*\b',
    'niemals/keinesfalls': r'\b(?:niemals|keinesfalls)\b',
    'verboten': r'\bverboten\b',
}
NORMATIV_IN_PASSAGE = re.compile('|'.join(NORMATIVE_MUSTER.values()), re.I)

# Kennungsschemata der Dokumente: 06-D01, 09-AC15, 20A-Q02, D20C-014, P01, R12, MS03, CP07 ...
KENNUNG_MUSTER = [
    re.compile(r'(?<![0-9A-Za-zÄÖÜäöü])\d{2}[A-C]?-[A-ZÄÖÜ]{1,3}\d{2,3}(?![0-9A-Za-zÄÖÜäöü])'),
    re.compile(r'(?<![0-9A-Za-zÄÖÜäöü])[A-ZÄÖÜ]\d{2}[A-C]-\d{2,3}(?![0-9A-Za-zÄÖÜäöü])'),
    re.compile(r'(?<![0-9A-Za-zÄÖÜäöü])[A-ZÄÖÜ]{1,3}\d{2,3}(?![0-9A-Za-zÄÖÜäöü])'),
]
# Projektinterne Kennungen (Repository-Vokabular, nicht Konzeptvokabular). Sie duerfen in der
# Kopfnotiz und in Luecken-Markierungen auftauchen, ohne als "erfunden" zu gelten.
PROJEKT_KENNUNG = re.compile(r'^(?:WP|DR|ADR|HND|CCP|FINDING|O)\d*$')

# Markdown-Zeilen, die eine Abbildung markieren oder eine benannte Abbildungsluecke setzen.
# Der Textlayer kann Abbildungsinhalte nicht belegen - solche Passagen sind deklariert
# nicht pruefbar und gehoeren nicht in die Erfindungs-Verdachtsliste.
ABBILDUNG_MARKER = re.compile(
    r'(?:^|[\s*\[(>_])Abbildung\s*\d*\s*[:\(\)\-–—\]]|'
    r'\bAbbildung\s*\((?:visuell\s+)?transkribiert\)|'
    r'Grafikinhalt nicht (?:uebertragen|übertragen)|'
    r'^\s*!\[',          # eingebettetes Bild
    re.I,
)

SEVERITAET = {'hart': '[HART]   ', 'verdacht': '[VERDACHT]', 'hinweis': '[HINWEIS] ', 'ok': '[OK]      '}


# ---------------------------------------------------------------- Normalisierung

_ERSETZUNGEN = {
    '­': '',            # weiches Trennzeichen
    '': ' ', '': ' ', '': ' ',  # Wingdings-Aufzaehlungszeichen der PDFs
    ' ': ' ', ' ': ' ', ' ': ' ',
    '‘': "'", '’': "'", '‚': "'", '‛': "'",
    '“': '"', '”': '"', '„': '"', '‟': '"',
    '‐': '-', '‑': '-', '‒': '-', '–': '-', '—': '-', '−': '-',
}


def normalisiere(text: str) -> str:
    text = unicodedata.normalize('NFC', text)
    for alt, neu in _ERSETZUNGEN.items():
        text = text.replace(alt, neu)
    return text


_WORT = re.compile(r'[0-9A-Za-zÄÖÜäöüß]+')


def worte(text: str) -> list[str]:
    """Wortstrom: klein, ohne Satzzeichen, ohne Markdown-Syntax, ohne Zeilenstruktur.

    Der Vergleich laeuft bewusst auf diesem Strom: PDF-Zeilenumbrueche, Markdown-Tabellenstriche
    und Fettschrift sind Formatierung, keine Aussage.
    """
    return _WORT.findall(normalisiere(text).lower())


def ngramme(ws: list[str], n: int = NGRAMM) -> set[tuple[str, ...]]:
    return {tuple(ws[i:i + n]) for i in range(len(ws) - n + 1)}


def luecken(quelle: list[str], ziel_ngramme: set[tuple[str, ...]],
            n: int = NGRAMM, mindestlaenge: int = MIN_LUECKE) -> list[tuple[int, int]]:
    """Zusammenhaengende Wortfolgen der Quelle, die in keinem n-Gramm des Ziels vorkommen."""
    abgedeckt = [False] * len(quelle)
    for i in range(len(quelle) - n + 1):
        if tuple(quelle[i:i + n]) in ziel_ngramme:
            for j in range(i, i + n):
                abgedeckt[j] = True
    spannen: list[tuple[int, int]] = []
    i = 0
    while i < len(quelle):
        if abgedeckt[i]:
            i += 1
            continue
        j = i
        while j < len(quelle) and not abgedeckt[j]:
            j += 1
        if j - i >= mindestlaenge:
            spannen.append((i, j))
        i = j
    return spannen


# ---------------------------------------------------------------- PDF-Aufbereitung

def _muster(zeile: str) -> str:
    """Zeile mit ausmaskierten Ziffern - erkennt laufende Kopfzeilen mit Seitenzahl."""
    return re.sub(r'\d+', '#', zeile.strip())


def pdf_aufbereiten(seiten: list[str]) -> tuple[str, list[str]]:
    """Seitentexte -> (Inhaltstext, erkannte laufende Kopf-/Fusszeilen).

    Zwei Extraktionsartefakte werden hier entfernt, weil sie sonst jeden Vergleich vergiften:
    1. laufende Kopf-/Fusszeilen (auf >= 60 % der Seiten, Seitenzahl ausmaskiert),
    2. Trennstriche am Zeilenende ("21-\\nQ02" -> "21-Q02", "Manage-\\nment" -> "Management").
    """
    zaehler: Counter[str] = Counter()
    for seite in seiten:
        for zeile in {_muster(z) for z in seite.splitlines() if z.strip()}:
            zaehler[zeile] += 1
    schwelle = max(3, 0.6 * max(1, len(seiten)))
    laufend = {z for z, n in zaehler.items() if n >= schwelle}

    zeilen: list[str] = []
    for seite in seiten:
        for zeile in seite.splitlines():
            if zeile.strip() and _muster(zeile) not in laufend:
                zeilen.append(zeile.rstrip())

    zusammengefuegt: list[str] = []
    for zeile in zeilen:
        if (zusammengefuegt
                and re.search(r'[0-9A-Za-zÄÖÜäöüß]-$', zusammengefuegt[-1])
                and re.match(r'^[0-9A-Za-zÄÖÜäöüß]', zeile.lstrip())):
            zusammengefuegt[-1] = zusammengefuegt[-1] + zeile.lstrip()
        else:
            zusammengefuegt.append(zeile)
    return '\n'.join(zusammengefuegt), sorted(laufend)


# ---------------------------------------------------------------- Markdown-Zonen

def md_zonen(text: str) -> list[str]:
    """Zone je Markdown-Zeile: 'kopfnotiz', 'abbildung' oder 'text'.

    - kopfnotiz: der Blockquote-Block direkt hinter der H1. Er ist per Konvention (WP-019/023)
      ausdruecklich Nicht-PDF-Inhalt und darf nicht als Erfindung gelten.
    - abbildung: ab einer Abbildungsmarkierung bis zur naechsten Ueberschrift. Der Textlayer
      kann diese Passagen prinzipiell nicht belegen.
    """
    zeilen = text.splitlines()
    zonen = ['text'] * len(zeilen)

    i = 0
    while i < len(zeilen) and not zeilen[i].lstrip().startswith('# '):
        i += 1
    i += 1
    while i < len(zeilen) and not zeilen[i].strip():
        i += 1
    if i < len(zeilen) and zeilen[i].lstrip().startswith('>'):
        while i < len(zeilen):
            roh = zeilen[i]
            if roh.lstrip().startswith('>'):
                zonen[i] = 'kopfnotiz'
                i += 1
            elif not roh.strip() and i + 1 < len(zeilen) and zeilen[i + 1].lstrip().startswith('>'):
                zonen[i] = 'kopfnotiz'
                i += 1
            else:
                break

    in_abbildung = False
    for nr, roh in enumerate(zeilen):
        if zonen[nr] == 'kopfnotiz':
            continue
        if re.match(r'^\s{0,3}#{1,6}\s', roh):
            in_abbildung = False
            continue
        if ABBILDUNG_MARKER.search(roh):
            in_abbildung = True
        if in_abbildung:
            zonen[nr] = 'abbildung'
    return zonen


def md_wortstrom(text: str) -> tuple[list[str], list[str]]:
    """(Woerter, Zone je Wort) - erhaelt die Reihenfolge, damit n-Gramme nicht zerreissen."""
    zonen = md_zonen(text)
    ws: list[str] = []
    wz: list[str] = []
    for zeile, zone in zip(text.splitlines(), zonen):
        for wort in worte(zeile):
            ws.append(wort)
            wz.append(zone)
    return ws, wz


# ---------------------------------------------------------------- Einzelpruefungen

def kennungen(text: str) -> set[str]:
    gefunden: set[str] = set()
    for muster in KENNUNG_MUSTER:
        gefunden |= set(muster.findall(normalisiere(text)))
    return gefunden


def _enthalten(kennung: str, text: str) -> bool:
    return re.search(r'(?<![0-9A-Za-z])' + re.escape(kennung) + r'(?![0-9A-Za-z])', text) is not None


def pdf_ueberschriften(text: str) -> list[tuple[str, str]]:
    """(Nummer, Titel) je Zeile im Folientitel-Format.

    Bewusst grosszuegig: die Heuristik sammelt auch nummerierte Listenpunkte ein. Das ist
    unschaedlich - jede eingesammelte Zeile ist PDF-Text und muss ohnehin im Markdown stehen.
    Die Zahl "PDF-Ueberschriftenkandidaten" ist deshalb KEINE Abschnittszahl des Dokuments.
    """
    paare: list[tuple[str, str]] = []
    for zeile in pdf_text.abschnitte(normalisiere(text)):
        m = re.match(r'^(\d{1,2}(?:\.\d+)?)\.?\s+(.*)$', zeile)
        if m:
            paare.append((m.group(1), m.group(2).strip()))
    return paare


def md_ueberschriften(text: str) -> list[str]:
    zonen = md_zonen(text)
    titel = []
    for nr, zeile in enumerate(text.splitlines()):
        if zonen[nr] == 'kopfnotiz':
            continue
        m = re.match(r'^\s{0,3}#{2,6}\s+(.+?)\s*$', zeile)
        if m:
            titel.append(m.group(1).strip())
    return titel


def kopfnotiz_pruefen(md_inhalt: str, erwartetes_pdf: str | None) -> dict:
    """WP-019/023-Konvention: H1, Blockquote mit Re-Ableitungsdatum und existierendem Quell-PDF."""
    zeilen = md_inhalt.splitlines()
    zonen = md_zonen(md_inhalt)
    block = '\n'.join(z for z, zone in zip(zeilen, zonen) if zone == 'kopfnotiz')
    if not block.strip():
        return {'status': 'fehlt', 'datum': None, 'quell_pdf': None,
                'meldung': 'keine Re-Ableitungs-Kopfnotiz (Dokument wurde nicht neu abgeleitet)'}
    if 'Re-Ableitung' not in block:
        return {'status': 'unvollstaendig', 'datum': None, 'quell_pdf': None,
                'meldung': 'Kopfnotiz-Block vorhanden, aber ohne Stichwort "Re-Ableitung"'}
    m_datum = re.search(r'(\d{4}-\d{2}-\d{2})', block)
    m_pdf = re.search(r'(Dokument_[^\s`)\]]+?\.pdf)', block)
    if not m_datum:
        return {'status': 'unvollstaendig', 'datum': None,
                'quell_pdf': m_pdf.group(1) if m_pdf else None,
                'meldung': 'Kopfnotiz ohne Re-Ableitungsdatum (Format JJJJ-MM-TT)'}
    if not m_pdf:
        return {'status': 'unvollstaendig', 'datum': m_datum.group(1), 'quell_pdf': None,
                'meldung': 'Kopfnotiz nennt kein Quell-PDF'}
    genannt = m_pdf.group(1)
    if not (PDF_DIR / genannt).exists():
        return {'status': 'fehler', 'datum': m_datum.group(1), 'quell_pdf': genannt,
                'meldung': f'genanntes Quell-PDF existiert nicht: docs/concept/pdf/{genannt}'}
    if erwartetes_pdf and genannt != erwartetes_pdf:
        return {'status': 'fehler', 'datum': m_datum.group(1), 'quell_pdf': genannt,
                'meldung': f'Kopfnotiz nennt {genannt}, aufgeloest wurde {erwartetes_pdf}'}
    return {'status': 'ok', 'datum': m_datum.group(1), 'quell_pdf': genannt,
            'meldung': f'Re-Ableitung {m_datum.group(1)}, Quell-PDF {genannt}'}


def normativ_bilanz(pdf_ws: list[str], md_ws: list[str]) -> dict:
    pdf_j = ' '.join(pdf_ws)
    md_j = ' '.join(md_ws)
    bilanz = {}
    for name, muster in NORMATIVE_MUSTER.items():
        bilanz[name] = [len(re.findall(muster, pdf_j)), len(re.findall(muster, md_j))]
    return bilanz


# ---------------------------------------------------------------- Kernpruefung

def pruefe_paar(nummer: str, pdf_seiten: list[str], md_inhalt: str, *,
                pdf_name: str | None = None, md_name: str | None = None,
                erwartetes_pdf: str | None = None) -> dict:
    """Kern des Werkzeugs - arbeitet nur auf Texten, damit er mit Fixtures testbar ist."""
    pdf_inhalt, laufend = pdf_aufbereiten(pdf_seiten)
    pdf_ws = worte(pdf_inhalt)
    md_ws, md_wz = md_wortstrom(md_inhalt)
    md_ws_ohne_kopf = [w for w, z in zip(md_ws, md_wz) if z != 'kopfnotiz']

    befund: dict = {
        'dokument': nummer,
        'pdf': pdf_name,
        'markdown': md_name,
        'pdf_seiten': len(pdf_seiten),
        'laufende_kopfzeilen': laufend,
        'pdf_woerter': len(pdf_ws),
        'md_woerter': len(md_ws),
        'hart': [],
        'verdacht': [],
        'hinweis': [],
    }

    # 1 - Kopfnotiz-Konvention
    kopf = kopfnotiz_pruefen(md_inhalt, erwartetes_pdf)
    befund['kopfnotiz'] = kopf
    if kopf['status'] == 'fehler':
        befund['hart'].append(f"Kopfnotiz: {kopf['meldung']}")
    elif kopf['status'] != 'ok':
        befund['hinweis'].append(f"Kopfnotiz: {kopf['meldung']}")

    # 2 - Abschnittsinventar
    md_join = ' ' + ' '.join(md_ws) + ' '
    pdf_join = ' ' + ' '.join(pdf_ws) + ' '
    pdf_titel = pdf_ueberschriften(pdf_inhalt)
    fehlende_titel = [f'{n} {t}' for n, t in pdf_titel
                      if worte(t) and ' ' + ' '.join(worte(t)) + ' ' not in md_join]
    md_titel = md_ueberschriften(md_inhalt)
    titel_ohne_pdf = [t for t in md_titel
                      if worte(t) and ' ' + ' '.join(worte(t)) + ' ' not in pdf_join]
    befund['abschnitte'] = {
        'pdf_kandidaten': len(pdf_titel), 'fehlend': fehlende_titel,
        'md_ueberschriften': len(md_titel), 'ohne_pdf_beleg': titel_ohne_pdf,
    }
    for t in fehlende_titel:
        befund['hart'].append(f'Abschnitt fehlt im Markdown: "{t}"')
    for t in titel_ohne_pdf:
        befund['hinweis'].append(f'Markdown-Ueberschrift ohne PDF-Beleg: "{t}"')

    # 3 - Kennungsinventar
    pdf_kenn = kennungen(pdf_inhalt)
    md_inhalt_ohne_kopf = '\n'.join(
        z for z, zone in zip(md_inhalt.splitlines(), md_zonen(md_inhalt)) if zone != 'kopfnotiz')
    md_kenn = {k for k in kennungen(md_inhalt_ohne_kopf) if not PROJEKT_KENNUNG.match(k)}
    # Suche im normalisierten Text: sonst verhindert ein weiches Trennzeichen oder ein
    # typografischer Bindestrich einen Treffer und erzeugt einen falschen HARTEN Befund.
    fehlende_kenn = sorted(k for k in pdf_kenn if not _enthalten(k, normalisiere(md_inhalt)))
    zusatz_kenn = sorted(k for k in md_kenn if not _enthalten(k, normalisiere(pdf_inhalt)))
    befund['kennungen'] = {'pdf': len(pdf_kenn), 'fehlend': fehlende_kenn, 'zusaetzlich': zusatz_kenn}
    for k in fehlende_kenn:
        befund['hart'].append(f'Kennung fehlt im Markdown: {k}')
    for k in zusatz_kenn:
        befund['verdacht'].append(f'Kennung ohne PDF-Beleg im Markdown: {k}')

    # 4 - Normativitaets-Bilanz
    bilanz = normativ_bilanz(pdf_ws, md_ws_ohne_kopf)
    befund['normativ'] = bilanz
    unterdeckt = {k: v for k, v in bilanz.items() if v[1] < v[0]}
    if unterdeckt:
        befund['verdacht'].append(
            'weniger normative Sprache als im PDF: '
            + ', '.join(f'{k} {v[0]}->{v[1]}' for k, v in sorted(unterdeckt.items())))

    # 5 - Textabdeckung PDF -> Markdown
    md_ng = ngramme(md_ws)
    pdf_luecken = []
    for a, b in luecken(pdf_ws, md_ng):
        passage = ' '.join(pdf_ws[a:b])
        pdf_luecken.append({'woerter': b - a, 'normativ': bool(NORMATIV_IN_PASSAGE.search(passage)),
                            'artefakt': None, 'text': passage})

    # 6 - Erfindungsprobe Markdown -> PDF
    pdf_ng = ngramme(pdf_ws)
    md_luecken = []
    for a, b in luecken(md_ws, pdf_ng):
        zonen_span = Counter(md_wz[a:b])
        deklariert = zonen_span['kopfnotiz'] + zonen_span['abbildung']
        if deklariert >= 0.8 * (b - a):
            zone = 'kopfnotiz' if zonen_span['kopfnotiz'] >= zonen_span['abbildung'] else 'abbildung'
        else:
            zone = 'unerklaert'
        md_luecken.append({'woerter': b - a, 'zone': zone, 'artefakt': None,
                           'text': ' '.join(md_ws[a:b])})

    _listenzaehler_markieren(pdf_luecken, md_luecken)

    fehlend_w = sum(l['woerter'] for l in pdf_luecken)
    befund['abdeckung_pdf'] = {
        'quote': 1.0 - fehlend_w / max(1, len(pdf_ws)),
        'fehlende_woerter': fehlend_w,
        'luecken': pdf_luecken,
    }
    for l in pdf_luecken:
        if l['artefakt']:
            continue
        marke = 'normativ, ' if l['normativ'] else ''
        befund['verdacht'].append(
            f"PDF-Passage ohne Markdown-Entsprechung ({marke}{l['woerter']} Woerter)")

    befund['abdeckung_md'] = {
        'kopfnotiz_woerter': sum(l['woerter'] for l in md_luecken if l['zone'] == 'kopfnotiz'),
        'abbildung_woerter': sum(l['woerter'] for l in md_luecken if l['zone'] == 'abbildung'),
        'artefakt_woerter': sum(l['woerter'] for l in md_luecken if l['artefakt']),
        'unerklaert_woerter': sum(l['woerter'] for l in md_luecken
                                  if l['zone'] == 'unerklaert' and not l['artefakt']),
        'luecken': md_luecken,
    }
    for l in md_luecken:
        if l['zone'] == 'unerklaert' and not l['artefakt']:
            befund['verdacht'].append(
                f"Markdown-Passage ohne PDF-Beleg ({l['woerter']} Woerter)")

    return befund


def _listenzaehler_markieren(pdf_luecken: list[dict], md_luecken: list[dict]) -> None:
    """Luecken-Paare erkennen, die beide Richtungen aus demselben Extraktionsartefakt melden.

    Zwei Muster treten in diesen PDFs systematisch auf:

    - `listenzaehler`: Die Textextraktion setzt fortlaufende Listen mit den Zaehlern der Vorseite
      fort ("25., 26., ..."), waehrend das Markdown wieder bei 1 beginnt. Nach Abzug der reinen
      Zahlen ist die Passage identisch.
    - `wortumstellung`: Bei verschmolzenen Tabellen-Zellgrenzen liest die Extraktion die Zellen
      in anderer Reihenfolge als das Markdown sie in Spalten aufloest. Wortbestand gleich,
      Reihenfolge anders.

    Beides wird markiert statt versteckt: die Woerter bleiben in den Zaehlungen sichtbar, nur
    aus der Verdachtsliste fallen sie heraus. `wortumstellung` kann im Einzelfall auch eine
    echte Umstellung sein - deshalb steht die Zahl im Bericht.
    """
    def ohne_zahlen(text: str) -> str:
        return ' '.join(w for w in text.split() if not w.isdigit())

    for pl in pdf_luecken:
        p_rein = ohne_zahlen(pl['text'])
        p_worte = p_rein.split()
        if len(p_worte) < 6:
            continue
        for ml in md_luecken:
            m_rein = ohne_zahlen(ml['text'])
            m_worte = m_rein.split()
            if len(m_worte) < 6:
                continue
            if p_rein in m_rein or m_rein in p_rein:
                pl['artefakt'] = ml['artefakt'] = 'listenzaehler'
                continue
            klein, gross = (p_worte, m_worte) if len(p_worte) <= len(m_worte) else (m_worte, p_worte)
            if len(klein) >= 8:
                gemeinsam = sum((Counter(klein) & Counter(gross)).values())
                if gemeinsam >= 0.9 * len(klein):
                    pl['artefakt'] = ml['artefakt'] = 'wortumstellung'


def dokumentnummern() -> list[str]:
    return sorted({p.name.split('_')[0] for p in ACTIVE_DIR.glob('*.md')})


def markdown_pfad(nummer: str) -> Path:
    treffer = sorted(ACTIVE_DIR.glob(f'{nummer}_*.md'))
    if not treffer:
        raise SystemExit(f'FEHLER: keine Markdown-Arbeitsfassung fuer Dokument {nummer} '
                         f'in {ACTIVE_DIR.relative_to(ROOT)}')
    return treffer[-1]


def pruefe_dokument(nummer: str) -> dict:
    md = markdown_pfad(nummer)
    pdf = pdf_text.finde_pdf(nummer)
    return pruefe_paar(
        nummer, pdf_text.seiten_von(pdf), md.read_text(encoding='utf-8'),
        pdf_name=str(pdf.relative_to(ROOT)).replace('\\', '/'),
        md_name=str(md.relative_to(ROOT)).replace('\\', '/'),
        erwartetes_pdf=pdf.name,
    )


# ---------------------------------------------------------------- Ausgabe

REICHWEITE = [
    'REICHWEITE dieses Laufs (bitte mitlesen, bevor ein Ergebnis zitiert wird):',
    '  - Geprueft wurde der TEXTLAYER der PDFs. Abbildungen tragen in diesen Dokumenten',
    '    normative Inhalte (WP-019-Lehre); was nur im Bild steht, sieht dieses Werkzeug nicht.',
    '  - "keine harten Befunde" heisst "im Textlayer keine Abweichung gefunden" - nicht "treu".',
    '  - Verdachtslisten enthalten planmaessig Falsch-Positive (Tabellen-Zellverschmelzung,',
    '    umgebrochene Zeilen, neu gezaehlte Listenzaehler) und steuern den Exit-Code nicht.',
]


def _kuerze(text: str, laenge: int = 220) -> str:
    return text if len(text) <= laenge else text[:laenge - 3] + '...'


def bericht(befund: dict, details: bool, streng: bool) -> None:
    limit = 10 ** 6 if details else 3
    print()
    print(f"== Dokument {befund['dokument']}  ->  {befund['markdown']}")
    print(f"   PDF: {befund['pdf']}  ({befund['pdf_seiten']} Seiten, "
          f"{befund['pdf_woerter']} Textwoerter nach Kopfzeilenfilter)")

    kopf = befund['kopfnotiz']
    stufe = 'ok' if kopf['status'] == 'ok' else ('hart' if kopf['status'] == 'fehler' else 'hinweis')
    print(f"   {SEVERITAET[stufe]} Kopfnotiz: {kopf['meldung']}")

    ab = befund['abschnitte']
    if ab['fehlend']:
        print(f"   {SEVERITAET['hart']} Abschnittsinventar: {len(ab['fehlend'])} von "
              f"{ab['pdf_kandidaten']} PDF-Ueberschriftenzeilen fehlen im Markdown")
        for t in ab['fehlend'][:limit]:
            print(f"                 - {_kuerze(t)}")
    else:
        print(f"   {SEVERITAET['ok']} Abschnittsinventar: alle {ab['pdf_kandidaten']} "
              f"PDF-Ueberschriftenzeilen im Markdown wiedergefunden")
    if ab['ohne_pdf_beleg']:
        print(f"   {SEVERITAET['hinweis']} {len(ab['ohne_pdf_beleg'])} Markdown-Ueberschrift(en) "
              f"ohne PDF-Beleg: " + ', '.join(f'"{t}"' for t in ab['ohne_pdf_beleg'][:limit]))

    kn = befund['kennungen']
    if kn['fehlend']:
        print(f"   {SEVERITAET['hart']} Kennungen: {len(kn['fehlend'])} von {kn['pdf']} "
              f"PDF-Kennungen fehlen im Markdown: " + ', '.join(kn['fehlend'][:limit]))
    else:
        print(f"   {SEVERITAET['ok']} Kennungen: alle {kn['pdf']} PDF-Kennungen im Markdown")
    if kn['zusaetzlich']:
        print(f"   {SEVERITAET['verdacht']} {len(kn['zusaetzlich'])} Kennung(en) ohne PDF-Beleg: "
              + ', '.join(kn['zusaetzlich'][:limit]))

    unterdeckt = {k: v for k, v in befund['normativ'].items() if v[1] < v[0]}
    if unterdeckt:
        print(f"   {SEVERITAET['verdacht']} Normativitaets-Bilanz (PDF->Markdown): "
              + ', '.join(f'{k} {v[0]}->{v[1]}' for k, v in sorted(unterdeckt.items())))
        if not [l for l in befund['abdeckung_pdf']['luecken'] if not l['artefakt']]:
            print('                 (kein Passagenverlust gemessen - dann ist die Differenz mit '
                  'hoher Wahrscheinlichkeit eine im')
            print('                  Extrakt doppelte Zeile, typisch: ein ueber den Seitenumbruch '
                  'wiederholter Tabellenkopf)')
    else:
        print(f"   {SEVERITAET['ok']} Normativitaets-Bilanz: kein Verlust normativer Sprache")

    ap = befund['abdeckung_pdf']
    echte = [l for l in ap['luecken'] if not l['artefakt']]
    artefakte = [l for l in ap['luecken'] if l['artefakt']]
    if echte:
        normativ = [l for l in echte if l['normativ']]
        stufe = 'hart' if (streng and normativ) else 'verdacht'
        print(f"   {SEVERITAET[stufe]} Textabdeckung PDF->Markdown: {ap['quote']:.1%} "
              f"({len(echte)} Luecke(n) >= {MIN_LUECKE} Woerter, "
              f"{sum(l['woerter'] for l in echte)} Woerter; davon {len(normativ)} normativ; "
              f"zusaetzlich {len(artefakte)} als Extraktionsartefakt erkannt)")
        for l in echte[:limit]:
            marke = 'NORMATIV ' if l['normativ'] else ''
            print(f"                 - {marke}[{l['woerter']}] {_kuerze(l['text'])}")
        if len(echte) > limit:
            print(f"                 ... {len(echte) - limit} weitere (--details)")
    else:
        print(f"   {SEVERITAET['ok']} Textabdeckung PDF->Markdown: {ap['quote']:.1%} "
              f"(keine Luecke >= {MIN_LUECKE} Woerter ausserhalb erkannter "
              f"Extraktionsartefakte: {len(artefakte)})")

    am = befund['abdeckung_md']
    unerklaert = [l for l in am['luecken'] if l['zone'] == 'unerklaert' and not l['artefakt']]
    print(f"   {SEVERITAET['verdacht'] if unerklaert else SEVERITAET['ok']} Erfindungsprobe "
          f"Markdown->PDF: {am['unerklaert_woerter']} Woerter unerklaert "
          f"(+{am['kopfnotiz_woerter']} Kopfnotiz, +{am['abbildung_woerter']} deklarierte "
          f"Abbildungstranskription - beides nicht am Textlayer pruefbar; "
          f"+{am['artefakt_woerter']} Extraktionsartefakt)")
    for l in unerklaert[:limit]:
        print(f"                 - [{l['woerter']}] {_kuerze(l['text'])}")
    if len(unerklaert) > limit:
        print(f"                 ... {len(unerklaert) - limit} weitere (--details)")


def zusammenfassung(befunde: list[dict], streng: bool) -> int:
    print()
    print('=' * 100)
    print('ZUSAMMENFASSUNG')
    print(f"{'Dok':5s} {'hart':>5s} {'Verdachtsposten':>16s} {'Abdeckung PDF':>14s} "
          f"{'MD unerklaert':>14s}  Kopfnotiz")
    harte_docs = []
    for b in befunde:
        hart = list(b['hart'])
        if streng:
            hart += [f"normative PDF-Passage fehlt ({l['woerter']} W)"
                     for l in b['abdeckung_pdf']['luecken']
                     if l['normativ'] and not l['artefakt']]
        if hart:
            harte_docs.append(b['dokument'])
        print(f"{b['dokument']:5s} {len(hart):5d} {len(b['verdacht']):16d} "
              f"{b['abdeckung_pdf']['quote']:13.1%} "
              f"{b['abdeckung_md']['unerklaert_woerter']:14d}  {b['kopfnotiz']['status']}")
    print('-' * 100)
    ohne = [b['dokument'] for b in befunde if b['dokument'] not in harte_docs]
    print(f'{len(befunde)} Dokumente geprueft | ohne harten Befund: {len(ohne)} | '
          f'mit hartem Befund: {len(harte_docs)}'
          + (f" ({', '.join(harte_docs)})" if harte_docs else ''))
    print()
    for zeile in REICHWEITE:
        print(zeile)
    return 1 if harte_docs else 0


def main() -> None:
    for strom in (sys.stdout, sys.stderr):
        if hasattr(strom, 'reconfigure'):
            strom.reconfigure(encoding='utf-8', errors='replace')

    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('dokument', nargs='?', help='Dokumentnummer, z. B. 06 oder 20B; leer = alle')
    ap.add_argument('--details', action='store_true', help='Verdachtslisten vollstaendig ausgeben')
    ap.add_argument('--json', action='store_true', help='Maschinenausgabe statt Bericht')
    ap.add_argument('--streng', action='store_true',
                    help='fehlende normative PDF-Passagen ebenfalls als harten Befund werten')
    args = ap.parse_args()

    nummern = [args.dokument.upper()] if args.dokument else dokumentnummern()
    try:
        befunde = [pruefe_dokument(nr) for nr in nummern]
    except SystemExit as exc:  # Pfad-/Aufrufprobleme klar von Befunden trennen
        print(str(exc.code), file=sys.stderr)
        raise SystemExit(2)

    if args.json:
        print(json.dumps({'dokumente': befunde, 'reichweite': REICHWEITE,
                          'streng': args.streng}, ensure_ascii=False, indent=2))
    else:
        for zeile in REICHWEITE:
            print(zeile)
        for b in befunde:
            bericht(b, args.details, args.streng)

    code = 0
    for b in befunde:
        hart = list(b['hart'])
        if args.streng:
            hart += [l for l in b['abdeckung_pdf']['luecken']
                     if l['normativ'] and not l['artefakt']]
        if hart:
            code = 1
    if not args.json and len(befunde) > 1:
        code = zusammenfassung(befunde, args.streng)
    raise SystemExit(code)


if __name__ == '__main__':
    main()
