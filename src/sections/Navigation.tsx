import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Marca from '../components/Marca'

/* ============================================================
   DUALINK · CABECERA
   ------------------------------------------------------------
   Es el rótulo de entrada de la nave: banda de hormigón, marca
   a la izquierda, destinos grabados y la acción en un bloque
   naranja macizo.

   El botón de WhatsApp permanente se mantiene — era un acierto
   de la versión anterior. Lo que cambia es que ahora lleva letra
   NEGRA sobre naranja. En verde con letra blanca daba 2.0:1 de
   contraste: al sol, en un móvil, ese botón no se leía.
   ============================================================ */

const links = [
  { label: 'Funcionando', href: '#funcionando' },
  { label: 'Qué instalamos', href: '#servicios' },
  { label: 'Cómo se paga', href: '#pago' },
  { label: 'Contacto', href: '#contacto' },
]

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-sm border-b border-ink-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[92rem] mx-auto px-5 sm:px-8 h-16 sm:h-[4.5rem] flex items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 shrink-0 min-h-[44px]"
        >
          <Marca className="w-8 h-8" />
          <span className="plate-type font-black text-lg sm:text-xl text-ink-900">
            DUALINK
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="engraved inline-flex items-center min-h-[44px] text-xs font-bold text-ink-600 hover:text-brand-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref(waMessages.nav)}
            target="_blank"
            rel="noopener noreferrer"
            className="engraved inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 bg-brand-700 text-white text-xs font-black hover:bg-brand-800 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Escríbenos</span>
          </a>

          <button
            className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-ink-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-paper-100 border-t border-ink-200">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="engraved block px-5 py-4 text-xs font-bold text-ink-800 border-b border-ink-200 last:border-0 active:bg-paper-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navigation
