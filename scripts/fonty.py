# Buduje wlasny wykroj fontow: tylko znaki uzywane na stronie (polski alfabet,
# cyfry, interpunkcja, kilka symboli). Zrodlo: pliki @fontsource w node_modules,
# scalane z podzbiorow latin + latin-ext, potem przyciete i zapisane jako woff2.
import io, os, sys
from fontTools.ttLib import TTFont
from fontTools.merge import Merger
from fontTools.subset import Subsetter, Options

PROJ = r'C:\Users\life-ratownictwo\.antigravity\supek-irek-modern'
FILES_I = os.path.join(PROJ, 'node_modules', '@fontsource', 'inter', 'files')
FILES_M = os.path.join(PROJ, 'node_modules', '@fontsource', 'montserrat', 'files')
WYJ = os.path.join(PROJ, 'public', 'fonts')
os.makedirs(WYJ, exist_ok=True)

ZNAKI = (
    'abcdefghijklmnopqrstuvwxyz'
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    'ąćęłńóśżźĄĆĘŁŃÓŚŻŹ'
    '0123456789'
    ' .,;:!?—–-…„”“"\'’‘()[]{}/\\|@#%&*+=<>~^_'
    '€$°·•→←↑↓✓✔★☆©®№'
    'áàâäãåéèêëíìîïñòôöõúùûüçšžÁÀÂÄÉÈÊËÍÎÏÑÓÔÖÚÜÇ'   # nazwiska i obce nazwy
)

ZADANIA = [
    ('inter-400', [os.path.join(FILES_I, 'inter-latin-400-normal.woff2'),
                   os.path.join(FILES_I, 'inter-latin-ext-400-normal.woff2')]),
    ('inter-600', [os.path.join(FILES_I, 'inter-latin-600-normal.woff2'),
                   os.path.join(FILES_I, 'inter-latin-ext-600-normal.woff2')]),
    ('montserrat-700', [os.path.join(FILES_M, 'montserrat-latin-700-normal.woff2'),
                        os.path.join(FILES_M, 'montserrat-latin-ext-700-normal.woff2')]),
    ('montserrat-800', [os.path.join(FILES_M, 'montserrat-latin-800-normal.woff2'),
                        os.path.join(FILES_M, 'montserrat-latin-ext-800-normal.woff2')]),
]

lacznie_przed = lacznie_po = 0
raport = []

for nazwa, zrodla in ZADANIA:
    przed = sum(os.path.getsize(z) for z in zrodla)

    # woff2 -> ttf w pamieci, bo merge nie lubi skompresowanych
    tmp = []
    for z in zrodla:
        f = TTFont(z)
        p = os.path.join(WYJ, f'_tmp_{os.path.basename(z)}.ttf')
        f.flavor = None
        f.save(p)
        tmp.append(p)

    if len(tmp) > 1:
        merger = Merger()
        font = merger.merge(tmp)
    else:
        font = TTFont(tmp[0])

    opcje = Options()
    opcje.layout_features = ['*']
    opcje.name_IDs = ['*']
    opcje.notdef_outline = True
    opcje.recalc_bounds = True
    sub = Subsetter(options=opcje)
    sub.populate(text=ZNAKI)
    sub.subset(font)

    font.flavor = 'woff2'
    wyjscie = os.path.join(WYJ, f'{nazwa}.woff2')
    font.save(wyjscie)
    for p in tmp:
        os.remove(p)

    po = os.path.getsize(wyjscie)
    lacznie_przed += przed
    lacznie_po += po
    raport.append((nazwa, przed, po))

    # kontrola: czy polskie znaki przetrwaly
    sprawdz = TTFont(wyjscie).getBestCmap()
    brakuje = [c for c in 'ąćęłńóśżźĄĆĘŁŃÓŚŻŹ' if ord(c) not in sprawdz]
    print(f'{nazwa:16s} {przed/1024:6.0f} KB -> {po/1024:5.0f} KB  | brakujace polskie znaki: {brakuje or "brak"}')

print(f'\nRAZEM: {lacznie_przed/1024:.0f} KB -> {lacznie_po/1024:.0f} KB '
      f'(oszczednosc {100 - lacznie_po/lacznie_przed*100:.0f}%)')

css = """/* Wykroj wlasny: tylko znaki uzywane na stronie (polski alfabet + interpunkcja).
   Pelne paczki @fontsource wazyly 232 KB w osmiu plikach; te cztery wazą ok. %d KB.
   Generator: scratchpad/fonty.py - przy zmianie tekstow o nietypowych znakach
   (np. obce nazwiska) trzeba dopisac je do ZNAKI i wygenerowac ponownie. */
""" % (lacznie_po / 1024)

for nazwa, _, _ in raport:
    rodzina, waga = nazwa.rsplit('-', 1)
    nazwa_css = 'Inter' if rodzina == 'inter' else 'Montserrat'
    css += f"""
@font-face {{
  font-family: '{nazwa_css}';
  font-style: normal;
  font-weight: {waga};
  font-display: swap;
  src: url('/fonts/{nazwa}.woff2') format('woff2');
}}
"""

io.open(os.path.join(PROJ, 'src', 'fonty.css'), 'w', encoding='utf-8', newline='\n').write(css)
print('zapisano src/fonty.css')
