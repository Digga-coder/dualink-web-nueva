import { services } from '../config/services'
import { nichos } from '../config/nichos'
import { contact, site } from '../config/site'
import Marca from '../components/Marca'

/* ============================================================
   DUALINK · PLACA DE CARACTERÍSTICAS
   ------------------------------------------------------------
   El pie es la chapa atornillada al costado de la máquina: qué
   es, quién la hizo, dónde y cómo se le reclama.

   Los enlaces legales existen de verdad (antes apuntaban a
   href="#" y no llevaban a ninguna parte) y la LSSI exige que
   sean alcanzables desde cualquier página.

   Los servicios se leen del catálogo común. Esto ya estaba
   arreglado en la versión anterior y se respeta: el pie
   listaba cinco a mano mientras la sección tenía seis y el
   hero siete, todos distintos.
   ============================================================ */

const enlacesLegales = [
  { label: 'Aviso legal', href: '#/aviso-legal' },
  { label: 'Privacidad', href: '#/privacidad' },
  { label: 'Cookies', href: '#/cookies' },
]

const enlacesEmpresa = [
  { label: 'Verlo funcionar', href: '#agente' },
  { label: 'Clientes', href: '#funcionando' },
  { label: 'Qué instalamos', href: '#servicios' },
  { label: 'Cómo se paga', href: '#pago' },
  { label: 'Contacto', href: '#contacto' },
]

const Columna: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <div>
    <h2 className="engraved text-xs font-bold text-ink-600 pb-3 mb-4 border-b border-ink-200">
      {titulo}
    </h2>
    {children}
  </div>
)

const Footer: React.FC = () => (
  <footer className="bg-white">
    {/* Franja de la marca. Es un bloque pintado, no un borde:
        un borde de color grueso en un costado es un tic que el
        detector marca, y aquí además el material correcto es
        pintura sobre el suelo. */}
    <div aria-hidden="true" className="h-1.5 bg-brand-700" />
    <div className="max-w-[92rem] mx-auto px-5 sm:px-8 py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <Marca className="w-9 h-9" />
            <span className="plate-type font-black text-xl text-ink-900">
              DUALINK
            </span>
          </div>
          <p className="text-ink-600 leading-relaxed max-w-[34ch]">
            Agentes de IA, automatización y software a medida para pymes.
            Dejamos de hablar en código y empezamos a hablar en resultados.
          </p>
        </div>

        <Columna titulo="Qué instalamos">
          {/* min-h-[44px]: en el pie estos enlaces medían 15 px de
              alto. Con el pulgar, en un móvil, eso no se acierta. */}
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#servicios"
                  className="flex items-center min-h-[44px] text-sm text-ink-600 hover:text-brand-700 transition-colors"
                >
                  {service.short}
                </a>
              </li>
            ))}
          </ul>
        </Columna>

        {/* Las landings de sector cuelgan del pie para que Google
            las encuentre desde la madre. El tráfico dirigido entra
            por su URL directa, no por aquí. */}
        <Columna titulo="Por sector">
          <ul>
            {nichos.map((n) => (
              <li key={n.slug}>
                <a
                  href={`#/${n.slug}`}
                  className="flex items-center min-h-[44px] text-sm text-ink-600 hover:text-brand-700 transition-colors"
                >
                  {n.sector}
                </a>
              </li>
            ))}
          </ul>
        </Columna>

        <Columna titulo="La web">
          <ul>
            {enlacesEmpresa.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center min-h-[44px] text-sm text-ink-600 hover:text-brand-700 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Columna>

        <Columna titulo="Dónde encontrarnos">
          <ul>
            <li>
              <a
                href={`tel:${contact.phoneDisplay.replace(/\s/g, '')}`}
                className="flex items-center min-h-[44px] text-sm text-ink-800 font-semibold hover:text-brand-700 transition-colors"
              >
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center min-h-[44px] text-sm text-ink-800 font-semibold hover:text-brand-700 transition-colors break-all"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-center min-h-[44px] text-sm text-ink-600">
              {contact.addressLine}
            </li>
          </ul>
        </Columna>
      </div>

      <div className="mt-16 pt-6 border-t border-ink-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="engraved text-xs font-bold text-ink-600">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav className="flex flex-wrap gap-x-6">
          {enlacesLegales.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="engraved inline-flex items-center min-h-[44px] text-xs font-bold text-ink-600 hover:text-brand-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>
)

export default Footer
