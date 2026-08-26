import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServicePage from './pages/ServicePage.jsx'
import { pages } from './pages/pagesData.js'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Sekcje renderuja sie z opoznieniem (animacje) - ponawiamy do skutku
      const id = hash.slice(1)
      let tries = 0
      const jump = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else if (tries++ < 20) setTimeout(jump, 100)
      }
      jump()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        {pages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<ServicePage page={p} />} />
        ))}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
