// Treści podstron usługowych. Jedno źródło dla routera, sitemap i prerenderu.
// UWAGA: stawki w cenniku są ORIENTACYJNE — do potwierdzenia z Irkiem.

export const SITE = {
  base: 'https://superirek.pl',
  phone: '+48 603 721 050',
  phoneHref: 'tel:+48603721050',
};

export const pages = [
  {
    slug: 'cennik',
    nav: 'Cennik',
    title: 'Cennik – Złota Rączka Racibórz | Super Irek',
    description:
      'Ile kosztuje złota rączka w Raciborzu? Cennik: roboczogodzina, montaż mebli, hydraulika, lampy. Wycena przed pracą: 603 721 050.',
    h1: 'Cennik usług złotej rączki w Raciborzu',
    intro:
      'Poniżej znajdziesz orientacyjne ceny moich najczęstszych usług. Ostateczną wycenę podaję zawsze PRZED rozpoczęciem pracy — po rozmowie telefonicznej albo po zdjęciu, które wyślesz. Bez niespodzianek i dopisywania pozycji na koniec. Dojazd na terenie Raciborza jest wliczony w cenę.',
    prices: [
      ['Roboczogodzina (drobne prace)', 'od 80 zł'],
      ['Minimalna wartość zlecenia', '150 zł'],
      ['Montaż szafy przesuwnej / PAX', '200–450 zł'],
      ['Montaż komody, łóżka, regału', '100–250 zł'],
      ['Montaż kuchni z paczek', 'wycena indywidualna'],
      ['Wymiana baterii łazienkowej lub kuchennej', '120–180 zł'],
      ['Wymiana syfonu, wężyków, silikonu', '80–150 zł'],
      ['Montaż lampy lub żyrandola', '80–150 zł'],
      ['Wymiana gniazdka lub włącznika', '60–100 zł'],
      ['Montaż karnisza, rolety', '60–120 zł'],
      ['Zawieszenie lustra, półki, obrazu', '60–150 zł'],
      ['Montaż uchwytu i zawieszenie TV', '120–220 zł'],
      ['Regulacja okna lub drzwi (za sztukę)', '50–80 zł'],
      ['Dojazd poza Racibórz (powiat raciborski)', '1,50 zł/km'],
    ],
    sections: [
      {
        h2: 'Od czego zależy cena?',
        text: 'Na koszt wpływa głównie czas pracy, rodzaj ściany lub instalacji oraz to, czy potrzebne są dodatkowe materiały (kołki, uszczelki, silikon — zwykle mam je ze sobą). Prace łączone są tańsze: jeśli przy okazji montażu lampy poprosisz o wymianę gniazdka i zawieszenie półki, zapłacisz za łączny czas, a nie za trzy osobne wizyty.',
      },
      {
        h2: 'Jak wygląda wycena?',
        text: 'Zadzwoń lub napisz i opisz, co jest do zrobienia — najlepiej z jednym lub dwoma zdjęciami. Podaję cenę lub widełki od razu, a przy większych pracach (kuchnia, kilka pomieszczeń) umawiam się na krótkie bezpłatne oględziny. Cena podana przed pracą jest ceną końcową.',
      },
    ],
    faq: [
      {
        q: 'Czy dojazd jest płatny?',
        a: 'W Raciborzu dojazd jest wliczony w cenę usługi. Poza miastem (powiat raciborski) doliczam 1,50 zł za kilometr w obie strony.',
      },
      {
        q: 'Czy mogę zapłacić kartą lub BLIKIEM?',
        a: 'Przyjmuję gotówkę, przelew i BLIK — jak Ci wygodniej.',
      },
      {
        q: 'Czy materiały są w cenie?',
        a: 'Drobne materiały montażowe (kołki, wkręty, silikon) zwykle mam ze sobą i doliczam po kosztach. Baterie, lampy czy karnisze kupujesz sam albo — jeśli wolisz — kupię je za Ciebie po przedstawieniu paragonu.',
      },
    ],
  },
  {
    slug: 'montaz-mebli-raciborz',
    nav: 'Montaż mebli',
    title: 'Montaż mebli Racibórz – IKEA, BRW, Agata | Super Irek',
    description:
      'Montaż i skręcanie mebli w Raciborzu: szafy, kuchnie, komody, łóżka. IKEA, BRW, Agata. Mocowanie do ściany: 603 721 050.',
    h1: 'Montaż mebli w Raciborzu — szafy, kuchnie, komody',
    intro:
      'Paczki stoją w przedpokoju, a instrukcja ma sześćdziesiąt kroków? Składanie mebli to moja codzienność. Montuję meble wszystkich popularnych producentów — IKEA, BRW, Agata Meble, Jysk i innych — w Raciborzu i całym powiecie raciborskim. Przyjeżdżam z własnymi narzędziami, po pracy zabieram kartony.',
    sections: [
      {
        h2: 'Co montuję najczęściej?',
        list: [
          'Szafy przesuwne i systemy typu PAX — z regulacją prowadnic i domykaniem',
          'Kuchnie z paczek — zabudowa, blaty, podłączenie sprzętu AGD do gotowych przyłączy',
          'Komody, regały, łóżka (także z pojemnikiem), stoły i krzesła',
          'Meble biurowe i dziecięce — zawsze z mocowaniem do ściany',
          'Regulacja frontów i zawiasów w meblach już złożonych',
        ],
      },
      {
        h2: 'Dlaczego warto zlecić montaż?',
        text: 'Źle skręcona szafa skrzypi, szuflady się zacinają, a fronty rozjeżdżają po miesiącu. Składam meble „co do milimetra”: sprawdzam poziomicą każdą płaszczyznę, reguluję zawiasy i prowadnice, a wysokie meble mocuję do ściany, żeby były bezpieczne dla dzieci. Typowa szafa zajmuje mi 2–3 godziny, komoda — niecałą godzinę.',
      },
    ],
    faq: [
      {
        q: 'Ile kosztuje złożenie szafy w Raciborzu?',
        a: 'Zwykle 200–450 zł w zależności od wielkości; komoda lub łóżko to 100–250 zł. Dokładną cenę podam po zdjęciu paczek lub nazwie modelu — przed rozpoczęciem pracy.',
      },
      {
        q: 'Czy zabierasz kartony po montażu?',
        a: 'Tak, składam kartony i zabieram je ze sobą albo znoszę do wiaty śmietnikowej — jak wolisz.',
      },
      {
        q: 'Czy montujesz meble kupione z drugiej ręki?',
        a: 'Tak — rozbiórka, przewóz we własnym zakresie klienta, ponowny montaż i regulacja to częste zlecenie przy przeprowadzkach.',
      },
    ],
  },
  {
    slug: 'hydraulik-drobne-naprawy-raciborz',
    nav: 'Drobna hydraulika',
    title: 'Drobne naprawy hydrauliczne Racibórz | Super Irek',
    description:
      'Cieknący kran, wymiana baterii, syfonu lub silikonu w Raciborzu. Prace, na które duże firmy nie przyjeżdżają: 603 721 050.',
    h1: 'Drobne naprawy hydrauliczne w Raciborzu',
    intro:
      'Kapiący kran potrafi w miesiąc nalać do rachunku więcej, niż kosztuje jego naprawa. Zajmuję się drobną hydrauliką — dokładnie tymi pracami, na które „duzi” hydraulicy nie mają czasu. Nie prowadzę dużych instalacji, dzięki czemu na cieknący syfon umawiam się w dzień lub dwa, a nie za trzy tygodnie.',
    sections: [
      {
        h2: 'Zakres prac',
        list: [
          'Wymiana baterii kuchennych i łazienkowych (także podtynkowych)',
          'Wymiana syfonów, wężyków, zaworów kątowych i uszczelek',
          'Montaż umywalek, zlewozmywaków i odpływów',
          'Usuwanie przecieków przy WC, spłuczkach i pralkach',
          'Wymiana spękanego silikonu przy wannie, brodziku i blacie',
        ],
      },
      {
        h2: 'Czego nie robię?',
        text: 'Nie wykonuję nowych instalacji wodno-kanalizacyjnych, przeróbek w ścianach ani przyłączy gazowych — do tego potrzebna jest firma instalacyjna z uprawnieniami. Jeśli problem przerasta zakres drobnej naprawy, powiem Ci to szczerze przy wycenie i podpowiem, kogo szukać.',
      },
    ],
    faq: [
      {
        q: 'Jak szybko przyjedziesz do cieknącego kranu?',
        a: 'Przy przeciekach staram się być tego samego lub następnego dnia. Do tego czasu zakręć zawór kątowy pod umywalką — pokażę Ci przez telefon, gdzie go szukać.',
      },
      {
        q: 'Czy mam kupić baterię przed Twoim przyjazdem?',
        a: 'Możesz kupić sam (podpowiem, na co zwrócić uwagę) albo kupię ją za Ciebie i rozliczę po paragonie.',
      },
      {
        q: 'Ile kosztuje wymiana baterii?',
        a: 'Zwykle 120–180 zł za robociznę. Cenę końcową potwierdzam przed pracą.',
      },
    ],
  },
  {
    slug: 'montaz-lamp-gniazdek-raciborz',
    nav: 'Lampy i gniazdka',
    title: 'Montaż lamp i gniazdek Racibórz – oświetlenie | Super Irek',
    description:
      'Montaż lamp, żyrandoli, kinkietów i taśm LED oraz wymiana gniazdek i włączników w Raciborzu. Bezpiecznie i estetycznie. Super Irek — zadzwoń: 603 721 050.',
    h1: 'Montaż lamp i gniazdek w Raciborzu',
    intro:
      'Nowa lampa leży w pudełku od tygodni, bo nikt nie chce wchodzić na drabinę przy kostce na suficie? Montuję oświetlenie i osprzęt elektryczny w mieszkaniach i domach — od pojedynczego kinkietu po oświetlenie całego mieszkania po remoncie. Zawsze przy wyłączonym zasilaniu i ze sprawdzeniem połączeń.',
    sections: [
      {
        h2: 'Zakres prac',
        list: [
          'Montaż żyrandoli, plafonów, kinkietów i lamp wiszących',
          'Taśmy LED pod szafkami kuchennymi i w zabudowach',
          'Wymiana gniazdek i włączników (także na serie dotykowe)',
          'Podłączanie lamp z czujnikiem ruchu i opraw zewnętrznych',
          'Oświetlenie wewnątrz szaf i witryn',
        ],
      },
      {
        h2: 'Bezpieczeństwo przede wszystkim',
        text: 'Każdy montaż zaczynam od wyłączenia obwodu i sprawdzenia próbnikiem, a kończę testem działania. Dbam też o estetykę: ramki równo, przewody schowane, sufit bez śladów po wierceniu. Przy poważniejszych usterkach instalacji (iskrzenie, wybijające korki) skieruję Cię do elektryka z uprawnieniami SEP — bezpieczeństwo jest ważniejsze niż zlecenie.',
      },
    ],
    faq: [
      {
        q: 'Ile kosztuje montaż lampy?',
        a: 'Zwykle 80–150 zł za sztukę; przy kilku lampach w jednym terminie liczę łączny czas pracy, co wychodzi taniej.',
      },
      {
        q: 'Czy wymienisz gniazdko w łazience?',
        a: 'Tak, montuję osprzęt bryzgoszczelny odpowiedni do stref wilgotnych.',
      },
      {
        q: 'Mam sufit podwieszany — czy to problem?',
        a: 'Nie, używam odpowiednich kołków do karton-gipsu, a cięższe lampy mocuję do konstrukcji nośnej.',
      },
    ],
  },
  {
    slug: 'wieszanie-luster-karniszy-tv-raciborz',
    nav: 'Lustra, karnisze, TV',
    title: 'Wieszanie luster, karniszy i TV Racibórz | Super Irek',
    description:
      'Zawieszenie lustra, obrazów, półek, karniszy i telewizora w Raciborzu. Dobór kołków do każdej ściany: 603 721 050.',
    h1: 'Wieszanie luster, karniszy, półek i telewizorów w Raciborzu',
    intro:
      'Ciężkie lustro nad komodą, galeria zdjęć na całą ścianę albo telewizor, który ma wisieć równo i się nie urwać — to prace, przy których liczy się dobór kołka do ściany. Beton, cegła, pustak, karton-gips czy płytka w łazience: do każdego podłoża mam właściwe mocowanie i wiertło.',
    sections: [
      {
        h2: 'Co wieszam?',
        list: [
          'Lustra — także duże i ciężkie, na klej montażowy lub uchwyty',
          'Karnisze, rolety, żaluzje i moskitiery',
          'Półki, szafki wiszące i galerie obrazów',
          'Uchwyty TV (stałe, uchylne, obrotowe) z ukryciem przewodów w listwie',
          'Suszarki łazienkowe, wieszaki, akcesoria łazienkowe — także na płytce, bez pęknięć',
        ],
      },
      {
        h2: 'Równo znaczy równo',
        text: 'Wszystko montuję przy poziomicy laserowej — nie „na oko”. Przed wierceniem sprawdzam wykrywaczem, czy w ścianie nie biegną przewody albo rury. Po pracy odkurzam pył po wierceniu; w domu zostaje zawieszony obraz, nie bałagan.',
      },
    ],
    faq: [
      {
        q: 'Ile kosztuje powieszenie telewizora?',
        a: 'Montaż uchwytu i zawieszenie TV to zwykle 120–220 zł, zależnie od przekątnej, rodzaju uchwytu i ściany. Uchwyt możesz kupić sam albo doradzę właściwy model.',
      },
      {
        q: 'Czy wiercisz w płytkach bez ryzyka pęknięcia?',
        a: 'Tak, używam wierteł diamentowych i odpowiedniej techniki — płytka zostaje cała.',
      },
      {
        q: 'Mam ścianę z karton-gipsu — czy utrzyma telewizor?',
        a: 'W większości przypadków tak, przy zastosowaniu odpowiednich kołków albo mocowaniu do profili. Ocenię to na miejscu, zanim zacznę wiercić.',
      },
    ],
  },
  {
    slug: 'poprawki-po-fachowcach-raciborz',
    nav: 'Poprawki po fachowcach',
    title: 'Poprawki po fachowcach Racibórz | Super Irek',
    description:
      'Ekipa zniknęła, listwy krzywe, drzwi się nie domykają? Kończę prace po innych fachowcach w Raciborzu: 603 721 050.',
    h1: 'Poprawki po fachowcach w Raciborzu',
    intro:
      'To najczęstszy telefon, jaki odbieram: ekipa skończyła (albo zniknęła w połowie), a w mieszkaniu zostały krzywe listwy, niedocięte progi i drzwi, które szorują o podłogę. Specjalizuję się w ratowaniu takich sytuacji — poprawiam i kończę cudzą pracę tak, żeby efekt wyglądał, jakby od początku zrobił ją ktoś, komu zależy.',
    sections: [
      {
        h2: 'Typowe poprawki',
        list: [
          'Krzywo zamontowane listwy przypodłogowe i progowe',
          'Drzwi i fronty meblowe, które się nie domykają lub szorują',
          'Niedokończone obróbki: akryl, silikon, narożniki, zaślepki',
          'Poprawki po montażu drzwi, paneli i sztukaterii',
          'Dokończenie prac porzuconych w połowie',
        ],
      },
      {
        h2: 'Jak działam?',
        text: 'Przyjeżdżam, oglądam i mówię wprost, co da się poprawić, a co wymaga wymiany elementu. Dostajesz listę prac z ceną przed rozpoczęciem — bez komentowania poprzedniej ekipy, po prostu robię swoje. Większość poprawek zamyka się w jednej wizycie.',
      },
    ],
    faq: [
      {
        q: 'Czy podejmiesz się dokończenia remontu po innej firmie?',
        a: 'Jeśli to prace wykończeniowe i montażowe — tak. Dużych prac budowlanych (tynki całych ścian, wylewki) nie prowadzę i powiem to od razu przy oględzinach.',
      },
      {
        q: 'Ile kosztują poprawki?',
        a: 'To najbardziej indywidualna z moich usług, dlatego wyceniam po obejrzeniu — na miejscu albo po zdjęciach. Oględziny w Raciborzu są bezpłatne.',
      },
      {
        q: 'Czy wystawiasz potwierdzenie wykonania prac?',
        a: 'Tak, na życzenie otrzymasz rachunek z zakresem wykonanych prac.',
      },
    ],
  },
];

export const routes = ['/', ...pages.map((p) => `/${p.slug}`)];
