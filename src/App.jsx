import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hammer, Paintbrush, Droplets, Zap, ShieldCheck, 
  Clock, MapPin, Phone, Mail, ChevronRight, 
  Star, Quote, CheckCircle2, Sparkles, FileText, X,
  Menu, ArrowUp, ChevronLeft, Maximize2, Eye
} from 'lucide-react';
import './App.css';

const galleryItems = [
  {
    id: 1,
    img: "WhatsApp Image 2026-05-17 at 09.46.44.jpeg",
    category: "wykonczenie",
    title: "Precyzyjny montaż wykończeniowy",
    desc: "Każdy element dopasowany z milimetrową dokładnością."
  },
  {
    id: 2,
    img: "WhatsApp Image 2026-05-17 at 09.46.46.jpeg",
    category: "montaz",
    title: "Montaż szaf i kuchni",
    desc: "Stabilna konstrukcja i perfekcyjnie wyregulowane fronty."
  },
  {
    id: 3,
    img: "WhatsApp Image 2026-05-17 at 09.46.53.jpeg",
    category: "wykonczenie",
    title: "Prace kafelkarskie i wykończeniowe",
    desc: "Czystość linii i dbałość o każdy detal spoinowania."
  },
  {
    id: 4,
    img: "WhatsApp Image 2026-05-17 at 09.46.45.jpeg",
    category: "wykonczenie",
    title: "Stylowa łazienka z podświetleniem",
    desc: "Wyjątkowa dbałość o oświetlenie LED i detale."
  },
  {
    id: 5,
    img: "WhatsApp Image 2026-05-17 at 09.46.54.jpeg",
    category: "instalacje",
    title: "Precyzyjne prace hydrauliczne",
    desc: "Szczelne podłączenia i estetyczny biały montaż."
  },
  {
    id: 6,
    img: "WhatsApp Image 2026-05-17 at 09.46.56.jpeg",
    category: "montaz",
    title: "Nowoczesne instalacje sanitarne",
    desc: "Bezpieczne i fachowe ułożenie instalacji."
  },
  {
    id: 7,
    img: "WhatsApp Image 2026-05-17 at 09.46.53 (1).jpeg",
    category: "wykonczenie",
    title: "Drobne poprawki instalacji",
    desc: "Szybka i skuteczna pomoc w nagłych awariach."
  },
  {
    id: 8,
    img: "WhatsApp Image 2026-05-17 at 09.46.52.jpeg",
    category: "wykonczenie",
    title: "Profesjonalne układanie płytek",
    desc: "Idealnie równe płaszczyzny i perfekcyjne kąty."
  },
  {
    id: 9,
    img: "WhatsApp Image 2026-05-17 at 09.46.44 (1).jpeg",
    category: "instalacje",
    title: "Nowoczesna łazienka",
    desc: "Trwałe materiały i nowoczesny styl wykonania."
  },
  {
    id: 10,
    img: "WhatsApp Image 2026-05-17 at 09.46.57.jpeg",
    category: "instalacje",
    title: "Montaż baterii i ceramiki",
    desc: "Brak przecieków i pełne uszczelnienie silikonowe."
  },
  {
    id: 11,
    img: "WhatsApp Image 2026-05-17 at 09.46.46 (1).jpeg",
    category: "wykonczenie",
    title: "Elegancka toaleta",
    desc: "Estetyczna zabudowa i wykończenie w drewnie."
  },
  {
    id: 12,
    img: "WhatsApp Image 2026-05-17 at 09.46.55.jpeg",
    category: "wykonczenie",
    title: "Montaż kabiny prysznicowej",
    desc: "Precyzyjne osadzenie szkła i idealna spoinówka."
  },
  {
    id: 13,
    img: "WhatsApp Image 2026-05-17 at 09.46.54 (2).jpeg",
    category: "instalacje",
    title: "Armatura sanitarna klasy premium",
    desc: "Sprawne i bezpieczne podłączenie każdego elementu."
  },
  {
    id: 14,
    img: "WhatsApp Image 2026-05-17 at 09.46.56 (2).jpeg",
    category: "montaz",
    title: "Montaż szafek podumywalkowych",
    desc: "Odpowiednie kotwienie i idealne wyregulowanie szuflad."
  },
  {
    id: 15,
    img: "WhatsApp Image 2026-05-17 at 09.46.57 (2).jpeg",
    category: "instalacje",
    title: "Odpływy i przyłącza",
    desc: "Szczelne i bezpieczne odprowadzenie wody."
  },
  {
    id: 16,
    img: "WhatsApp Image 2026-05-17 at 09.46.55 (2).jpeg",
    category: "wykonczenie",
    title: "Szczegóły wykończenia łazienki",
    desc: "Czyste cięcia kafli pod kątem 45 stopni i gładkie fugi."
  }
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Gallery States
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('wszystkie');
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(8);
  const [selectedGalleryImgIndex, setSelectedGalleryImgIndex] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVisibleGalleryCount(3);
    }
  }, []);

  const filteredGallery = activeGalleryFilter === 'wszystkie' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryFilter);

  const handleNextImage = () => {
    setSelectedGalleryImgIndex((prev) => 
      prev === filteredGallery.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedGalleryImgIndex((prev) => 
      prev === 0 ? filteredGallery.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tworzenie wiadomości WhatsApp
    const whatsappNumber = "48603721050"; // Numer Irka
    const text = `Cześć Irek! Nazywam się ${formData.name}. %0A%0AProśba o pomoc: ${formData.message} %0A%0AMój numer telefonu: ${formData.phone}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Otwarcie WhatsApp w nowym oknie
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', message: '', phone: '' });
    }, 3000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };



  const services = [
    {
      title: "Poprawki po Fachowcach",
      shortDesc: "Ktoś zaczął remont i zniknął? Poprawiam krzywe płytki, źle spasowane elementy i inne niedociągnięcia.",
      desc: "Zdarza się, że ekipa remontowa nie podołała zadaniu, zostawiła niedokończoną pracę lub po prostu popełniła błędy. Specjalizuję się w ratowaniu takich sytuacji. Poprawiam krzywo zamontowane listwy, źle osadzone drzwi, poprawiam niedoróbki montażowe i wykończeniowe. Dbam o to, aby ostateczny efekt wyglądał perfekcyjnie i cieszył oko, bez konieczności ponownego zaczynania całego remontu.",
      details: [
        "Precyzyjne wykańczanie porzuconych lub niedokończonych prac",
        "Korekta krzywych listew przypodłogowych i montażowych",
        "Naprawa niepoprawnie spasowanych drzwi, frontów i elementów",
        "Drobne poprawki wykończeniowe i stolarskie w miejscach ubytków"
      ],
      icon: <Sparkles className="icon" />
    },
    {
      title: "Montaż Mebli bez Stresu",
      shortDesc: "Złożę Twoją nową szafę czy kuchnię sprawnie i solidnie. Skupiam się na idealnym spasowaniu.",
      desc: "Montaż mebli z paczek to dla wielu osób zmora, dla mnie to czysta przyjemność i wyzwanie konstrukcyjne. Składam meble wszystkich popularnych producentów (IKEA, BRW, Agata Meble i inne). Dbam o to, by każda szuflada chodziła płynnie, a fronty były idealnie wyregulowane co do milimetra. Jeśli trzeba, przymocuję meble do ściany dla pełnego bezpieczeństwa.",
      details: [
        "Kompleksowy montaż kuchni, szaf i komód",
        "Precyzyjna regulacja frontów i wszystkich zawiasów",
        "Podłączanie oświetlenia wewnątrz szaf i witryn",
        "Mocowanie mebli do ściany (zabezpieczenie przed przewróceniem)"
      ],
      icon: <Hammer className="icon" />
    },
    {
      title: "Hydraulika i Naprawy",
      shortDesc: "Cieknący kran czy wymiana syfonu? Rozwiążę te problemy szybko, zostawiając po sobie porządek.",
      desc: "Małe awarie hydrauliczne potrafią zepsuć humor i zniszczyć podłogę. Pomagam przy wymianie kranów, baterii, syfonów czy wężyków. Montuję również armaturę łazienkową i kuchenną. Nie zajmuję się dużymi instalacjami, dzięki czemu mam czas na te 'drobiazgi', na które inni fachowcy często nie chcą przyjechać.",
      details: [
        "Wymiana baterii kuchennych i łazienkowych",
        "Naprawa lub wymiana syfonów i uszczelek",
        "Montaż umywalek, zlewozmywaków i baterii podtynkowych",
        "Uszczelnianie i odświeżanie silikonów"
      ],
      icon: <Droplets className="icon" />
    },
    {
      title: "Twoje Oświetlenie",
      shortDesc: "Zamontuję lampy i gniazdka, dbając o bezpieczeństwo i estetykę. Światło musi być idealne.",
      desc: "Prawidłowy montaż oświetlenia to nie tylko estetyka, to przede wszystkim bezpieczeństwo Twojego domu. Montuję żyrandole, kinkiety, listwy LED oraz wymieniam stare gniazdka i przełączniki. Dbam o to, by wszystko było estetycznie wykończone, bez wystających kabli i krzywo zamontowanych ramek.",
      details: [
        "Bezpieczny montaż lamp, żyrandoli i kinkietów",
        "Wymiana gniazdek elektrycznych i włączników światła",
        "Instalacja energooszczędnych taśm LED pod szafkami",
        "Sprawdzanie poprawności połączeń elektrycznych"
      ],
      icon: <Zap className="icon" />
    },
    {
      title: "Drobne Prace Montażowe",
      shortDesc: "Lustra, obrazy, karnisze – powieszę je tak, by cieszyły oko. Precyzja to mój znak rozpoznawczy.",
      desc: "Masz do powieszenia ciężkie lustro, galerię obrazów lub karnisze? Dobiorę odpowiednie kołki do rodzaju Twojej ściany (beton, karton-gips, cegła), abyś mógł spać spokojnie. Wszystko montuję przy użyciu profesjonalnej poziomicy laserowej – u mnie nie ma miejsca na montaż 'na oko'.",
      details: [
        "Solidny montaż karniszy, rolet i żaluzji",
        "Wieszanie luster, półek i galerii obrazów",
        "Montaż uchwytów TV i systemów audio",
        "Wiercenie w twardym betonie, gresie i ceramice"
      ],
      icon: <ShieldCheck className="icon" />
    },
    {
      title: "Konserwacja Domu",
      shortDesc: "Regularnie sprawdzę stan Twoich instalacji. Zapobiegnę awariom, zanim w ogóle się pojawią.",
      desc: "Dom wymaga stałej opieki, aby służył lata. Oferuję przeglądy techniczne Twojego mieszkania. Wyreguluję okna, sprawdzę uszczelki, dokręcę luźne klamki. Takie drobne działania prewencyjne oszczędzą Ci dużych wydatków na poważne naprawy w przyszłości i zwiększą komfort życia.",
      details: [
        "Fachowa regulacja okien i drzwi (zima/lato)",
        "Wymiana zużytych uszczelek i okuć",
        "Dokręcanie i konserwacja elementów stolarki",
        "Drobne poprawki wykończeniowe i stolarskie"
      ],
      icon: <Clock className="icon" />
    }
  ];

  const testimonials = [
    {
      name: "Marek z Raciborza",
      text: "Irek to rzadki przypadek fachowca, który sprząta po pracy lepiej niż było przed. Prace wykończeniowe i poprawki wyszły idealnie.",
      rating: 5
    },
    {
      name: "Anna, ul. Rudzka",
      text: "Nareszcie ktoś, kto nie narzeka na 'krzywe ściany', tylko po prostu robi swoją robotę. Bardzo polecam!",
      rating: 5
    },
    {
      name: "Janusz z Pietrowic",
      text: "Solidny gość. Złożył mi całą sypialnię w kilka godzin. Wszystko prosto, nic nie skrzypi.",
      rating: 5
    }
  ];

  const slogans = [
    "Musisz złożyć szafę? – Wezwij Super Irka!",
    "Cieknie Ci kran? – Wezwij Super Irka!",
    "Gniazdko nie kontaktuje? – Wezwij Super Irka!",
    "Lampa czeka na montaż? – Wezwij Super Irka!",
    "Półka wisi krzywo? – Wezwij Super Irka!",
    "Karnisz spadł na głowę? – Wezwij Super Irka!",
    "Lustro szuka miejsca na ścianie? – Wezwij Super Irka!"
  ];


  const [sloganIndex, setSloganIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slogans.length]);

  return (
    <div className="app">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="brand"
          >
            <img src={`${import.meta.env.BASE_URL}assets/branding/super-irek-branding-logo.png`} alt="Super Irek - Logo Złota Rączka Racibórz" className="nav-logo" />
            <span className="brand-name">Super Irek</span>
          </motion.div>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="menu-overlay"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#uslugi" onClick={() => setIsMenuOpen(false)}>W czym pomogę?</a></li>
            <li><a href="#o-mnie" onClick={() => setIsMenuOpen(false)}>Moja Historia</a></li>
            <li><a href="#opinie" onClick={() => setIsMenuOpen(false)}>Opinie Sąsiadów</a></li>
            <li><a href="#galeria" onClick={() => setIsMenuOpen(false)}>Galeria Realizacji</a></li>
            <li><a href="tel:+48603721050" className="btn-small" onClick={() => setIsMenuOpen(false)}>+48 603 721 050</a></li>
          </ul>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-grid">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="hero-text"
          >
            <motion.span variants={staggerItem} className="hero-badge">Rzemiosło z Serca • Racibórz</motion.span>
            <motion.div variants={staggerItem} className="slogan-rotator">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={sloganIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {slogans[sloganIndex]}
                </motion.h1>
              </AnimatePresence>
            </motion.div>
            <motion.p variants={staggerItem}>
              Cześć, nazywam się Irek. Znasz to uczucie, gdy coś w domu odmawia posłuszeństwa w najmniej odpowiednim momencie? 
              Pomogę Ci opanować te małe awarie i większe wyzwania. Naprawiam to, co się zepsuło i montuję to, co nowe, 
              dbając o Twój dom tak, jak o własny. Bez pośpiechu, bez fuszerki – po prostu po ludzku.
            </motion.p>
            <motion.div variants={staggerItem} className="hero-btns">
              <a href="#kontakt" className="btn">Opowiedz mi o swoim problemie</a>
              <a href="#uslugi" className="btn-outline">Sprawdź co mogę zrobić <ChevronRight size={18} /></a>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-img"
          >
            <div className="image-wrapper">
              <img src={`${import.meta.env.BASE_URL}irek-victory.png`} alt="Super Irek - Profesjonalna Złota Rączka Racibórz i okolice" title="Super Irek - Naprawy Domowe Racibórz" />
              <motion.div 
                className="experience-badge"
                animate={{ 
                  scale: [1, 1.08, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="years">20+</span>
                <span className="label">Lat Praktyki</span>
              </motion.div>
            </div>
            <motion.div 
              className="hero-circle-bg"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            ></motion.div>
          </motion.div>
        </div>
      </header>

      <section id="dlaczego" className="why-me">
        <div className="container">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="why-grid"
          >
            <motion.div variants={staggerItem} className="why-item">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="why-icon-wrapper">
                <ShieldCheck className="why-icon" />
              </motion.div>
              <h3>Osobista Odpowiedzialność</h3>
              <p>Zawsze pracuję sam. Masz pewność, że to ja biorę pełną odpowiedzialność za efekt końcowy.</p>
            </motion.div>
            <motion.div variants={staggerItem} className="why-item">
              <motion.div whileHover={{ rotate: -15, scale: 1.1 }} className="why-icon-wrapper">
                <Sparkles className="why-icon" />
              </motion.div>
              <h3>Czystość i Porządek</h3>
              <p>Mój dzień pracy kończy się dopiero wtedy, gdy Twoje mieszkanie lśni czystością.</p>
            </motion.div>
            <motion.div variants={staggerItem} className="why-item">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="why-icon-wrapper">
                <FileText className="why-icon" />
              </motion.div>
              <h3>Jasne Zasady</h3>
              <p>Wycenę ustalamy przed startem. Żadnych ukrytych kosztów ani niespodzianek na koniec.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="uslugi" className="services">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="section-title">Jak mogę Ci pomóc?</h2>
            <p className="section-subtitle">Skupiam się na zadaniach, które wymagają rzemieślniczej precyzji i cierpliwości.<br />Oto w czym czuję się najlepiej:</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="services-grid"
          >
            {services.map((s, i) => (
              <motion.div 
                key={i}
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="service-card"
                onClick={() => setSelectedService(s)}
              >
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.shortDesc}</p>
                <span className="learn-more">Dowiedz się więcej <ChevronRight size={16} /></span>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedService && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="modal-overlay"
                onClick={() => setSelectedService(null)}
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="service-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close" onClick={() => setSelectedService(null)}>
                    <X size={24} />
                  </button>
                  
                  <div className="modal-scroll-area">
                    <div className="modal-header">
                      <div className="modal-icon">{selectedService.icon}</div>
                      <h2>{selectedService.title}</h2>
                    </div>
                    
                    <div className="modal-body">
                      <div className="modal-description">
                        <h3>O usłudze</h3>
                        <p>{selectedService.desc}</p>
                      </div>
                      
                      <div className="modal-details">
                        <h3>Co konkretnie wykonuję:</h3>
                        <ul>
                          {selectedService.details.map((detail, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={18} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="modal-footer-cta">
                        <p>Potrzebujesz tej usługi? Chętnie pomogę!</p>
                        <a href="#kontakt" onClick={() => setSelectedService(null)} className="btn">Zapytaj o termin</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      <section id="o-mnie" className="about">
        <div className="container about-grid">
          <motion.div {...fadeInUp} className="about-content">
            <h2 className="section-title left">Moja Droga do Perfekcji</h2>
            <p>
              Przez ponad dwie dekady pracowałem na dużych projektach budowlanych. 
              Dziś jednak wiem, że to w drobnych detalach kryje się prawdziwe rzemiosło. 
              Uraz kręgosłupa nauczył mnie jednego – szacunku do czasu i precyzji ruchów. 
              Nie biegam już po rusztowaniach, ale z tą samą pasją sprawiam, że gniazdka są prosto, a farba nie ma ani jednej smugi.
            </p>
            <div className="about-quote">
              <Quote className="quote-icon" />
              <p>„Dla mnie nie ma zbyt małych zadań. Każdy problem w Twoim domu traktuję tak, jakbym naprawiał go u siebie.”</p>
              <span>— Irek</span>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="about-visual">
             <div className="stat-grid">
                <div className="stat-item">
                  <span className="number">100%</span>
                  <span className="label">Zaangażowania</span>
                </div>
                <div className="stat-item">
                  <span className="number">Racibórz</span>
                  <span className="label">Moje Miasto</span>
                </div>
             </div>
             <div className="about-image-container">
               <img src={`${import.meta.env.BASE_URL}assets/branding/super-irek-fachowiec-w-locie.png`} alt="Irek - Twój zaufany fachowiec w Raciborzu" className="about-img" />
             </div>
          </motion.div>
        </div>
      </section>

      <section id="opinie" className="testimonials">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="section-title">Zadowoleni Sąsiedzi</h2>
            <p className="section-subtitle">Zaufanie buduje się latami. Oto co mówią osoby, u których miałem przyjemność pracować.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="testimonials-grid"
          >
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                variants={staggerItem}
                className="testimonial-card"
              >
                <div className="rating">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">— {t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="zasieg" className="area">
        <div className="container">
          <motion.div {...fadeInUp} className="area-box">
            <MapPin className="pin" size={40} />
            <h3>Działam w całym powiecie raciborskim</h3>
            <p>Mój warsztat mieści się przy <strong>ul. Sejmowej 2a w Raciborzu</strong>, skąd wyruszam do moich sąsiadów. Z przyjemnością dojadę do Kuźni Raciborskiej, Pietrowic, Krzanowic, Krzyżanowic, Nędzy, Rudnika czy Kornowaca.</p>
          </motion.div>
        </div>
      </section>

      <section id="galeria" className="gallery">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="section-title">Galeria Realizacji</h2>
            <p className="section-subtitle">
              Zobacz efekty moich ostatnich prac. Każde zadanie wykonuję z pełnym skupieniem, dbając o czystość i rzemieślniczą precyzję.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="gallery-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.slice(0, visibleGalleryCount).map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-item-card"
                  onClick={() => setSelectedGalleryImgIndex(index)}
                >
                  <div className="gallery-img-wrapper">
                    <img 
                      src={`${import.meta.env.BASE_URL}assets/galeria/${item.img}`} 
                      alt="" 
                      className="gallery-img"
                    />
                    <div className="gallery-hover-overlay">
                      <div className="gallery-hover-content">
                        <div className="gallery-zoom-icon">
                          <Eye size={26} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More Button */}
          {filteredGallery.length > visibleGalleryCount && (
            <motion.div {...fadeInUp} className="text-center gallery-more-wrapper">
              <button 
                className="btn-outline"
                onClick={() => setVisibleGalleryCount(prev => prev + (window.innerWidth < 768 ? 6 : 8))}
              >
                Pokaż więcej realizacji <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedGalleryImgIndex(null)}
          >
            <button 
              className="lightbox-close"
              onClick={() => setSelectedGalleryImgIndex(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ChevronLeft size={36} />
            </button>

            <button 
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/galeria/${filteredGallery[selectedGalleryImgIndex].img}`} 
                alt="" 
                className="lightbox-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="kontakt" className="contact">
        <div className="container contact-grid">
          <motion.div {...fadeInUp} className="contact-info">
            <h2 className="section-title left">Usiądźmy do Twojego projektu</h2>
            <p>Napisz do mnie lub zadzwoń. Chętnie podpowiem, jak najlepiej podejść do naprawy czy odświeżenia Twojego wnętrza. Konsultacja nic nie kosztuje.</p>
            <div className="contact-methods">
              <a href="tel:+48603721050" className="method phone-link">
                <div className="method-icon"><Phone size={24} /></div>
                <div className="method-text">
                  <label>Zadzwoń bezpośrednio</label>
                  <span>+48 603 721 050</span>
                </div>
              </a>
              <a href="mailto:irek@superirek.pl" className="method email-link">
                <div className="method-icon"><Mail size={24} /></div>
                <div className="method-text">
                  <label>Wyślij e-mail</label>
                  <span>irek@superirek.pl</span>
                </div>
              </a>
              <a href="https://maps.google.com/?q=Super+Irek+ul.+Sejmowa+2a,+Racibórz" target="_blank" rel="noopener noreferrer" className="method maps-link">
                <div className="method-icon"><MapPin size={24} /></div>
                <div className="method-text">
                  <label>Mój warsztat &amp; Dojazd</label>
                  <span>ul. Sejmowa 2a, Racibórz</span>
                </div>
              </a>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="contact-form-box">
            {isSubmitted ? (
              <div className="success-msg">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <ShieldCheck size={80} color="#00704A" />
                </motion.div>
                <h3>Wiadomość odebrana!</h3>
                <p>Dziękuję za zaufanie. Odezwię się do Ciebie tak szybko, jak tylko odłożę narzędzia.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Twoje Imię</label>
                    <input 
                      type="text" 
                      placeholder="Np. Marek"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Numer Telefonu</label>
                    <input 
                      type="tel" 
                      placeholder="+48..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Opisz mi swoje wyzwanie</label>
                  <textarea 
                    rows="5"
                    placeholder="W czym mogę Ci dzisiaj pomóc?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn full">Wyślij mi wiadomość</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
                <img src={`${import.meta.env.BASE_URL}assets/branding/super-irek-naprawy-domowe.png`} alt="Super Irek - Złota Rączka Racibórz" className="footer-logo" />
               <p className="footer-tagline">Rzemieślnicza pasja, ludzkie podejście i dbałość o każdy detal w Twoim domu.</p>
               <a href="https://maps.google.com/?q=Super+Irek+ul.+Sejmowa+2a,+Racibórz" target="_blank" rel="noopener noreferrer" className="footer-location">
                  <MapPin size={18} />
                  <span>ul. Sejmowa 2a, Racibórz</span>
                </a>
                 <div className="footer-socials">
                  <a href="https://facebook.com/profil-super-irek" target="_blank" rel="noopener noreferrer" className="social-link" title="Odwiedź mój profil na Facebooku">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <span>Facebook</span>
                  </a>
                </div>
            </div>
            
            <div className="footer-col">
              <h4>Mapa Strony</h4>
              <ul>
                <li><a href="#uslugi">Moje Usługi</a></li>
                <li><a href="#o-mnie">O mnie</a></li>
                <li><a href="#opinie">Opinie Sąsiadów</a></li>
                <li><a href="#galeria">Galeria Realizacji</a></li>
                <li><a href="#kontakt">Zadaj pytanie</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Usługi</h4>
              <ul>
                <li><a href="#uslugi">Poprawki po fachowcach</a></li>
                <li><a href="#uslugi">Montaż mebli</a></li>
                <li><a href="#uslugi">Naprawy domowe</a></li>
                <li><a href="#uslugi">Elektryka i lampy</a></li>
              </ul>
            </div>

            <div className="footer-col contact-col">
              <h4>Kontakt</h4>
              <div className="footer-contact-item">
                <Phone size={20} />
                <a href="tel:+48603721050">+48 603 721 050</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={20} />
                <a href="mailto:irek@superirek.pl">irek@superirek.pl</a>
              </div>
              <a href="#kontakt" className="btn-small full-width">Darmowa wycena</a>
            </div>
          </div>

        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} Super Irek. Wszystkie prawa zastrzeżone.</p>
            </div>
            
            <div className="footer-webstudio">
              <span>Strona dla Super Irka od</span>
              <a href="https://webstudio47.pl" target="_blank" rel="noopener noreferrer">
                <img src={`${import.meta.env.BASE_URL}assets/branding/webstudio-logo-v2.png`} alt="WebStudio47 Logo" className="webstudio-logo" />
              </a>
            </div>

            <div className="footer-legal">
              <a href="#">Twój Fachowiec w Raciborzu</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Dane dla robotów Google (SEO) */}
      <div style={{ display: 'none' }} itemScope itemType="http://schema.org/LocalBusiness">
        <span itemProp="name">Super Irek - Złota Rączka Racibórz</span>
        <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
          <span itemProp="streetAddress">ul. Sejmowa 2a</span>
          <span itemProp="postalCode">47-400</span>
          <span itemProp="addressLocality">Racibórz</span>
        </div>
        <span itemProp="telephone">+48603721050</span>
        <span itemProp="url">https://superirek.pl</span>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="scroll-to-top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
