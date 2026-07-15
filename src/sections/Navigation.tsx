import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · NAVEGACIÓN
   ------------------------------------------------------------
   Se añade un botón de WhatsApp permanente. Antes, para
   contactar había que scrollear hasta el final del todo y
   encontrarse un formulario que no enviaba nada: quien decidía
   escribir a mitad de página no tenía dónde hacerlo.
   ============================================================ */

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contacto', href: '#contacto' },
]

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    /* Pasivo: este listener no llama a preventDefault, así que
       marcarlo evita que el navegador retrase cada scroll. */
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="w-full h-full drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              <path
                d="M60 20C75 20 85 35 85 50C85 65 75 80 60 80C45 80 35 65 35 50C35 35 45 20 60 20Z"
                fill="#1e293b"
              />
              <path
                d="M40 30C55 30 65 45 65 60C65 75 55 90 40 90C25 90 15 75 15 60C15 45 25 30 40 30Z"
                fill="#1e3a8a"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-ink">DUALINK</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-brand-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA siempre visible, también en móvil */}
          <a
            href={whatsappHref(waMessages.nav)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#1eb855] transition-colors shadow-md shadow-[#25D366]/20"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute top-full left-0 right-0 shadow-xl">
          <div className="flex flex-col p-6 gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-ink hover:text-brand-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation
