import { Mail, Phone, MapPin } from 'lucide-react'
import { services } from '../config/services'
import { contact, site, whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · PIE
   ------------------------------------------------------------
   El footer listaba 5 servicios a mano mientras la sección de
   servicios tenía 6 y el hero 7, todos distintos. Ahora lee del
   catálogo común. Los datos de contacto tampoco estaban aquí:
   se añaden, enlazados de verdad, desde config/site.ts.
   ============================================================ */

const companyLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Casos de éxito', href: '#resultados' },
  { label: 'Contacto', href: '#contacto' },
]

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10" aria-hidden="true">
                <path
                  d="M60 20C75 20 85 35 85 50C85 65 75 80 60 80C45 80 35 65 35 50C35 35 45 20 60 20Z"
                  fill="#334155"
                />
                <path
                  d="M40 30C55 30 65 45 65 60C65 75 55 90 40 90C25 90 15 75 15 60C15 45 25 30 40 30Z"
                  fill="#1e3a8a"
                />
              </svg>
              <span className="font-display font-bold text-xl tracking-tight">DUALINK</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Agentes de IA, automatización y software a medida. Dejamos de
              hablar en código y empezamos a hablar en resultados.
            </p>

            <a
              href={whatsappHref(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1eb855] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              Hablar por WhatsApp
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-slate-500">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicios"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {service.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-slate-500">
              Contacto
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneDisplay.replace(/\s/g, '')}`}
                  className="flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {contact.addressLine}
              </li>
            </ul>

            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-slate-500">
              Empresa
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
