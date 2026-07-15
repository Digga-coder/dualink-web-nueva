import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services, type Service } from '../config/services'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · SERVICIOS
   ------------------------------------------------------------
   Antes: 6 tarjetas `sticky h-screen` = 600vh de scroll para ver
   seis servicios, uno cada vez, y ninguna forma de compararlos.
   Quien buscaba algo concreto tenía que atravesarlos todos.

   Ahora: rejilla. Los siete servicios se ven a la vez, se
   escanean en segundos y cada uno abre WhatsApp con el servicio
   ya mencionado en el mensaje, así sabéis de qué viene el lead.

   La lista sale de config/services.ts — no se define aquí, para
   que hero, footer y esta sección no vuelvan a discrepar.
   ============================================================ */

const ServiceCard: React.FC<{ service: Service; index: number; inView: boolean }> = ({
  service,
  index,
  inView,
}) => {
  const Icon = service.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className={`group relative flex flex-col rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
        service.featured
          ? 'bg-white border-brand-200 shadow-lg shadow-brand-900/5 hover:shadow-xl hover:shadow-brand-900/10'
          : 'bg-slate-50 border-slate-100 hover:border-brand-200 hover:bg-white'
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-brand-600 text-white text-[0.65rem] font-semibold tracking-widest uppercase">
          Lo que más nos piden
        </span>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100">
          <Icon className="w-7 h-7" />
        </div>
        <span className="text-4xl font-display font-bold text-slate-100 select-none">
          {service.number}
        </span>
      </div>

      <h3 className="text-2xl font-display font-bold text-ink mb-1 leading-tight">
        {service.title}
      </h3>
      <p className="text-brand-600 text-sm font-medium mb-4">{service.subtitle}</p>

      <p className="text-muted leading-relaxed mb-6">{service.description}</p>

      <ul className="space-y-2.5 mb-8">
        {service.details.map((detail) => (
          <li key={detail} className="flex items-start gap-3 text-sm text-muted">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto: los botones quedan alineados aunque las tarjetas
          tengan distinta cantidad de texto.
          min-h-[44px]: antes era un enlace de texto de 24px de alto,
          incómodo de acertar con el dedo. 44px es el mínimo cómodo. */}
      <a
        href={whatsappHref(waMessages.service(service.title))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-brand-200 bg-white font-semibold text-brand-600 hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-colors"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        Me interesa
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.article>
  )
}

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
            Qué hacemos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink max-w-3xl mx-auto text-balance">
            Siete formas de quitarte trabajo de encima
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
