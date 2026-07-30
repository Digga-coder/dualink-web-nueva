import { ArrowUpRight } from 'lucide-react'
import { services, type Service } from '../config/services'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · QUÉ INSTALAMOS
   ------------------------------------------------------------
   Antes: siete tarjetas del mismo tamaño, con la misma forma
   (icono en cuadradito redondeado, título, párrafo, lista de
   puntos, botón) puestas en rejilla de tres columnas. Siete
   cosas con el mismo peso visual son siete cosas sin jerarquía:
   el visitante no sabe a qué mirar, así que no mira a nada.

   El catálogo ya marcaba tres servicios como `featured` — los
   que de verdad se venden hoy — pero la rejilla los dibujaba
   casi igual que a los demás. Ahora esa marca decide de verdad:
   los tres destacados ocupan bahía pintada con su detalle
   completo, y los otros cuatro bajan a un índice compacto de
   una línea. Siguen estando todos, y sigue habiendo un enlace
   directo a WhatsApp para cada uno.

   Se van los números 01–07: eran decoración. El orden de esta
   lista no es información que el visitante necesite.

   La lista sale de config/services.ts, que no se toca: es
   verdad de negocio, no diseño.
   ============================================================ */

const Destacado: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = service.icon

  return (
    <article className="bg-white border-2 border-ink-200 flex flex-col">
      <div className="bg-brand-700 text-white px-6 py-5 flex items-start gap-4">
        <Icon className="w-7 h-7 shrink-0 mt-0.5" strokeWidth={2.25} />
        <div>
          <h3 className="plate-type font-black text-2xl leading-tight">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold">
            {service.subtitle}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-ink-700 leading-relaxed">{service.description}</p>

        <ul className="mt-6 space-y-2.5">
          {service.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-3 text-sm text-ink-600"
            >
              <span className="mt-[0.45rem] w-2 h-[2px] bg-brand-700 shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <a
          href={whatsappHref(waMessages.service(service.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="engraved mt-auto inline-flex items-center gap-2 text-xs font-black text-brand-700 hover:text-brand-800 transition-colors min-h-[44px] pt-8 pb-2"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          Preguntar por esto
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </article>
  )
}

const Fila: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = service.icon

  return (
    <a
      href={whatsappHref(waMessages.service(service.title))}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 min-h-[72px] px-5 sm:px-6 border-b-2 border-ink-200 last:border-0 hover:bg-brand-50 transition-colors"
    >
      <Icon
        className="w-6 h-6 shrink-0 text-ink-600 group-hover:text-brand-700 transition-colors"
        strokeWidth={2}
      />
      <div className="flex-1 min-w-0">
        <h3 className="plate-type font-black text-lg text-ink-900">
          {service.title}
        </h3>
        <p className="text-sm text-ink-600 truncate">{service.subtitle}</p>
      </div>
      <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-9000 group-hover:text-brand-700 transition-colors" />
    </a>
  )
}

const Services: React.FC = () => {
  const destacados = services.filter((s) => s.featured)
  const resto = services.filter((s) => !s.featured)

  return (
    <section id="servicios" className="bg-paper-100 py-24 md:py-32">
      <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
        <h2 className="plate-type font-black text-ink-900 text-4xl sm:text-5xl lg:text-6xl max-w-[20ch]">
          Siete formas de quitarte trabajo de encima
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {destacados.map((service) => (
            <Destacado key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="engraved text-xs font-bold text-ink-600 mb-4">
            También instalamos
          </h3>
          <div className="border-2 border-ink-200 bg-paper-50">
            {resto.map((service) => (
              <Fila key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
