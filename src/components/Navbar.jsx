import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { pages, SITE } from '../pages/pagesData.js';

// Pelna nawigacja dla podstron uslugowych. Pozycje sekcyjne prowadza na
// strone glowna przez /#kotwica (pelne przeladowanie = start z prerenderu).
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const close = () => { setIsMenuOpen(false); setIsServicesOpen(false); };

  return (
    <nav className="navbar scrolled">
      <div className="container nav-content">
        <Link to="/" className="brand" onClick={close}>
          <img
            src={`${import.meta.env.BASE_URL}assets/branding/super-irek-branding-logo.webp`}
            alt="Super Irek - Logo Złota Rączka Racibórz"
            className="nav-logo"
          />
          <span className="brand-name">Super Irek</span>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li
            className={`nav-dropdown ${isServicesOpen ? 'open' : ''}`}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-expanded={isServicesOpen}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Usługi <ChevronDown size={16} className="nav-dropdown-chevron" />
            </button>
            <ul className="nav-dropdown-menu">
              {pages.filter((p) => p.slug !== 'cennik').map((p) => (
                <li key={p.slug}>
                  <Link to={`/${p.slug}`} onClick={close}>{p.nav}</Link>
                </li>
              ))}
              <li>
                <a href="/#uslugi" onClick={close}>Wszystkie usługi</a>
              </li>
            </ul>
          </li>
          <li><a href="/#o-mnie" onClick={close}>Moja Historia</a></li>
          <li><a href="/#opinie" onClick={close}>Opinie Sąsiadów</a></li>
          <li><a href="/#galeria" onClick={close}>Galeria Realizacji</a></li>
          <li><Link to="/cennik" onClick={close}>Cennik</Link></li>
          <li><a href={SITE.phoneHref} className="btn-small" onClick={close}>{SITE.phone}</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
