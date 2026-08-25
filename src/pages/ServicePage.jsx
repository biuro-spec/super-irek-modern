import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronRight, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import { pages, SITE } from './pagesData.js';

// Ustawia title/description/canonical/JSON-LD dla podstrony. Prerender
// (scripts/prerender.mjs) zapisuje ten stan do plaskiego pliku HTML.
function useSeo(page) {
  useEffect(() => {
    const url = `${SITE.base}/${page.slug}`;
    document.title = page.title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', page.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    document.querySelectorAll('script[data-page-ld]').forEach((s) => s.remove());
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-page-ld', '1');
    ld.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.h1,
        description: page.description,
        url,
        areaServed: { '@type': 'City', name: 'Racibórz' },
        provider: { '@id': `${SITE.base}/#business` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Super Irek', item: `${SITE.base}/` },
          { '@type': 'ListItem', position: 2, name: page.nav, item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]);
    document.head.appendChild(ld);

    return () => {
      document.querySelectorAll('script[data-page-ld]').forEach((s) => s.remove());
      canonical.setAttribute('href', `${SITE.base}/`);
    };
  }, [page]);
}

const ServicePage = ({ page }) => {
  useSeo(page);
  const related = pages.filter((p) => p.slug !== page.slug);

  return (
    <div className="app subpage">
      <Navbar />

      <main className="subpage-main container">
        <nav className="breadcrumb" aria-label="Okruszki">
          <Link to="/"><ArrowLeft size={14} /> Strona główna</Link>
          <span aria-hidden="true">/</span>
          <span>{page.nav}</span>
        </nav>

        <h1>{page.h1}</h1>
        <p className="subpage-intro">{page.intro}</p>

        {page.prices && (
          <div className="price-table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Usługa</th>
                  <th>Cena orientacyjna</th>
                </tr>
              </thead>
              <tbody>
                {page.prices.map(([name, price]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="price-note">
              Ceny orientacyjne brutto. Ostateczna wycena — zawsze przed rozpoczęciem pracy.
            </p>
          </div>
        )}

        {page.sections.map((s) => (
          <section key={s.h2} className="subpage-section">
            <h2>{s.h2}</h2>
            {s.text && <p>{s.text}</p>}
            {s.list && (
              <ul className="subpage-list">
                {s.list.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} className="li-icon" /> {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="subpage-cta">
          <h2>Umów termin</h2>
          <p>
            <MapPin size={16} className="li-icon" /> Racibórz i cały powiat raciborski — Kuźnia
            Raciborska, Pietrowice Wielkie, Krzanowice, Krzyżanowice, Nędza, Rudnik, Kornowac.
          </p>
          <a href={SITE.phoneHref} className="btn-primary">
            <Phone size={18} /> Zadzwoń: {SITE.phone}
          </a>
          <a href="/#kontakt" className="btn-outline">
            Napisz przez formularz <ChevronRight size={16} />
          </a>
        </div>

        <section className="subpage-section">
          <h2>Najczęstsze pytania</h2>
          <div className="faq-list">
            {page.faq.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>
                  <span>{f.q}</span>
                  <ChevronRight className="faq-chevron" size={20} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="subpage-section related">
          <h2>Zobacz też</h2>
          <ul className="related-links">
            {related.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`}>{p.nav}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="subpage-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Super Irek — Złota Rączka Racibórz ·{' '}
            <a href={SITE.phoneHref}>{SITE.phone}</a> ·{' '}
            <a href="mailto:irek@superirek.pl">irek@superirek.pl</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
