"""Selbsttest fuer scripts/treue_check.py an einem synthetischen Fixture-Paar.

Bewusst NICHT gegen die echten 24 Dokumente: das waere langsam und wuerde bei jeder legitimen
Konzeptkorrektur rot werden. Geprueft wird stattdessen, dass das Werkzeug die drei Faelle
auseinanderhaelt, auf die es ankommt (FINDING-0007):

  1. ein treues Paar meldet keinen harten Befund,
  2. eine fehlende Kennung ist ein HARTER Befund (Exit-Code-relevant),
  3. ein erfundener Satz ist ein VERDACHT (kein harter Befund).

Ein CLI-Rauchtest an einem einzigen echten Dokument sichert Argumentparsing, UTF-8-Ausgabe und
Exit-Code ab.
"""

from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))

import treue_check  # noqa: E402

# --------------------------------------------------------------------- Fixtures

# Vier Seiten mit derselben laufenden Kopfzeile (der Filter greift ab drei Seiten) und einer
# Seitenzahl, damit auch die Ziffernmaskierung mitgeprueft wird.
_KOPF = 'ISMS DEMO  |  KONZEPT 99'

PDF_SEITEN = [
    f"""{_KOPF}
Dokument 99  |  Demo  |  Version 1.0  |  Seite 1
1. Executive Summary
Die Demoplattform buendelt Entscheidungen, Nachweise und Services an einem einzigen Ort und
erklaert jede Bewertung ueber ihre Ursache statt ueber eine blosse Zahl.
""",
    f"""{_KOPF}
Dokument 99  |  Demo  |  Version 1.0  |  Seite 2
2. Verbindliche Designprinzipien
 P01 - Entscheidung vor Navigation: Die Oberflaeche startet mit der Frage, die der Nutzer
beantworten muss, nicht mit dem Modulnamen.
 P02 - Eine Wahrheit, mehrere Perspektiven: Alle Rollen sehen dieselben verknuepften Objekte,
jedoch mit anderer Verdichtung und Handlungslogik.
""",
    f"""{_KOPF}
Dokument 99  |  Demo  |  Version 1.0  |  Seite 3
3. Globale Akzeptanzkriterien
Ein Wechsel zwischen Mandanten muss sichtbar sein und darf nicht still im Hintergrund
geschehen. Entwuerfe und Freigaben bleiben an ihren Mandanten gebunden.
""",
    f"""{_KOPF}
Dokument 99  |  Demo  |  Version 1.0  |  Seite 4
4. Verbindliche Entscheidungen
 99-D01: Der Mandantenkontext bleibt in der globalen Shell jederzeit sichtbar.
 99-D02: Kritische Aktionen speichern die aktive Rolle mit und bleiben nachvollziehbar.
""",
]

MD_TREU = """# Dokument 99 - Demo

## 1. Executive Summary

Die Demoplattform buendelt Entscheidungen, Nachweise und Services an einem einzigen Ort und
erklaert jede Bewertung ueber ihre Ursache statt ueber eine blosse Zahl.

## 2. Verbindliche Designprinzipien

- **P01 - Entscheidung vor Navigation:** Die Oberflaeche startet mit der Frage, die der Nutzer
  beantworten muss, nicht mit dem Modulnamen.
- **P02 - Eine Wahrheit, mehrere Perspektiven:** Alle Rollen sehen dieselben verknuepften
  Objekte, jedoch mit anderer Verdichtung und Handlungslogik.

## 3. Globale Akzeptanzkriterien

Ein Wechsel zwischen Mandanten muss sichtbar sein und darf nicht still im Hintergrund
geschehen. Entwuerfe und Freigaben bleiben an ihren Mandanten gebunden.

## 4. Verbindliche Entscheidungen

- **99-D01:** Der Mandantenkontext bleibt in der globalen Shell jederzeit sichtbar.
- **99-D02:** Kritische Aktionen speichern die aktive Rolle mit und bleiben nachvollziehbar.
"""

ERFUNDENER_SATZ = (
    'Zusaetzlich verlangt diese Arbeitsfassung fuer jedes Objekt eine Kritikalitaetsstufe, '
    'die im Originaldokument an keiner Stelle gefordert wird.'
)


def pruefe(md: str, **kwargs) -> dict:
    return treue_check.pruefe_paar('99', PDF_SEITEN, md, pdf_name='fixture.pdf',
                                   md_name='fixture.md', **kwargs)


class TreueCheckFixtureTests(unittest.TestCase):
    def test_treues_paar_ist_unauffaellig(self):
        b = pruefe(MD_TREU)
        self.assertEqual([], b['hart'], b['hart'])
        self.assertEqual([], b['kennungen']['fehlend'])
        self.assertEqual([], b['abschnitte']['fehlend'])
        self.assertEqual(1.0, b['abdeckung_pdf']['quote'])
        self.assertEqual(0, b['abdeckung_md']['unerklaert_woerter'])

    def test_laufende_kopfzeile_wird_gefiltert(self):
        b = pruefe(MD_TREU)
        muster = [z for z in b['laufende_kopfzeilen'] if 'KONZEPT' in z]
        self.assertTrue(muster, b['laufende_kopfzeilen'])
        # Die Seitenzahl ist ausmaskiert, sonst waere jede Fusszeile eine eigene "Luecke".
        self.assertTrue(any('Seite #' in z for z in b['laufende_kopfzeilen']),
                        b['laufende_kopfzeilen'])

    def test_fehlende_kennung_ist_harter_befund(self):
        b = pruefe(MD_TREU.replace('99-D02', '99-D99'))
        self.assertIn('99-D02', b['kennungen']['fehlend'])
        self.assertTrue(any('99-D02' in h for h in b['hart']), b['hart'])
        # Die erfundene Kennung ist Verdacht, nicht hart.
        self.assertIn('99-D99', b['kennungen']['zusaetzlich'])
        self.assertFalse(any('99-D99' in h for h in b['hart']), b['hart'])

    def test_fehlender_abschnitt_ist_harter_befund(self):
        gekuerzt = MD_TREU.split('## 3. Globale Akzeptanzkriterien')[0] \
            + MD_TREU.split('## 4. Verbindliche Entscheidungen')[1]
        b = pruefe(gekuerzt)
        self.assertTrue(any('Globale Akzeptanzkriterien' in h for h in b['hart']), b['hart'])

    def test_erfundener_satz_ist_verdacht_ohne_harten_befund(self):
        b = pruefe(MD_TREU + '\n' + ERFUNDENER_SATZ + '\n')
        self.assertEqual([], b['hart'], b['hart'])
        self.assertGreater(b['abdeckung_md']['unerklaert_woerter'], 10)
        unerklaert = ' '.join(l['text'] for l in b['abdeckung_md']['luecken']
                              if l['zone'] == 'unerklaert')
        self.assertIn('kritikalitaetsstufe', unerklaert)
        self.assertTrue(any('ohne PDF-Beleg' in v for v in b['verdacht']), b['verdacht'])

    def test_abgeschwaechtes_verbot_faellt_in_der_normativitaets_bilanz_auf(self):
        # Genau der WP-019-Befundtyp: aus "darf nicht" wird "sollte moeglichst nicht".
        b = pruefe(MD_TREU.replace('darf nicht still', 'sollte moeglichst nicht still'))
        self.assertLess(b['normativ']['darf/duerfen nicht'][1],
                        b['normativ']['darf/duerfen nicht'][0])
        self.assertTrue(any('normative Sprache' in v for v in b['verdacht']), b['verdacht'])

    def test_deklarierte_abbildungstranskription_gilt_nicht_als_erfindung(self):
        md = MD_TREU + (
            '\n## 5. Abbildung\n\n'
            '**Abbildung (visuell transkribiert): Rollenwelten auf gemeinsamem Produktkern**\n\n'
            '- Vier Welten liegen um einen gemeinsamen Produktkern aus Zwilling, Entscheidungen '
            'und Nachweisen herum angeordnet.\n'
        )
        b = pruefe(md)
        self.assertEqual([], b['hart'], b['hart'])
        self.assertGreater(b['abdeckung_md']['abbildung_woerter'], 10)
        self.assertEqual(0, b['abdeckung_md']['unerklaert_woerter'])

    def test_kopfnotiz_konvention(self):
        ein_echtes_pdf = sorted((ROOT / 'docs/concept/pdf').glob('Dokument_00_*.pdf'))[-1].name

        ohne = pruefe(MD_TREU)
        self.assertEqual('fehlt', ohne['kopfnotiz']['status'])
        self.assertEqual([], ohne['hart'])  # fehlende Kopfnotiz ist nur ein Hinweis

        gut = pruefe(MD_TREU.replace(
            '# Dokument 99 - Demo\n',
            '# Dokument 99 - Demo\n\n> **Re-Ableitung:** 2026-07-23 aus dem PDF-Original\n'
            f'> `docs/concept/pdf/{ein_echtes_pdf}` (Fixture).\n'))
        self.assertEqual('ok', gut['kopfnotiz']['status'], gut['kopfnotiz'])
        self.assertEqual('2026-07-23', gut['kopfnotiz']['datum'])
        self.assertEqual([], gut['hart'])

        falsch = pruefe(MD_TREU.replace(
            '# Dokument 99 - Demo\n',
            '# Dokument 99 - Demo\n\n> **Re-Ableitung:** 2026-07-23 aus dem PDF-Original\n'
            '> `docs/concept/pdf/Dokument_99_Gibt_Es_Nicht_v1.0.pdf`.\n'))
        self.assertEqual('fehler', falsch['kopfnotiz']['status'])
        self.assertTrue(any('Quell-PDF' in h for h in falsch['hart']), falsch['hart'])

    def test_listenzaehler_artefakt_wird_als_artefakt_erkannt(self):
        # Die Extraktion setzt die Zaehlung der Vorseite fort, das Markdown beginnt bei 1.
        seiten = list(PDF_SEITEN) + [
            f"{_KOPF}\nDokument 99  |  Demo  |  Version 1.0  |  Seite 5\n"
            "11 Scope festlegen 12 Risiken bewerten 13 Massnahmen planen 14 Wirkung "
            "nachweisen 15 Lernen verankern 16\n"
        ]
        md = MD_TREU + (
            '\n## 5. Ablauf\n\n'
            '1. Scope festlegen\n2. Risiken bewerten\n3. Massnahmen planen\n'
            '4. Wirkung nachweisen\n5. Lernen verankern\n6.\n')
        b = treue_check.pruefe_paar('99', seiten, md, pdf_name='f.pdf', md_name='f.md')
        self.assertEqual([], b['hart'], b['hart'])
        artefakte = [l for l in b['abdeckung_pdf']['luecken'] if l['artefakt'] == 'listenzaehler']
        self.assertTrue(artefakte, b['abdeckung_pdf']['luecken'])
        self.assertEqual(0, b['abdeckung_md']['unerklaert_woerter'])


class TreueCheckCliTests(unittest.TestCase):
    """Rauchtest an einem einzigen echten Dokument - Argumentparsing, UTF-8, Exit-Code."""

    def test_cli_json_fuer_ein_dokument(self):
        ergebnis = subprocess.run(
            [sys.executable, str(ROOT / 'scripts/treue_check.py'), '00', '--json'],
            cwd=str(ROOT), capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(0, ergebnis.returncode, ergebnis.stderr)
        daten = json.loads(ergebnis.stdout)
        self.assertEqual('00', daten['dokumente'][0]['dokument'])
        self.assertTrue(any('Textlayer' in z for z in daten['reichweite']))

    def test_cli_meldet_unbekanntes_dokument_mit_code_2(self):
        ergebnis = subprocess.run(
            [sys.executable, str(ROOT / 'scripts/treue_check.py'), '99'],
            cwd=str(ROOT), capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(2, ergebnis.returncode, ergebnis.stdout)


if __name__ == '__main__':
    unittest.main()
