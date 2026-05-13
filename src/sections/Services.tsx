import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Wifi, Bot, Database, Palette, ArrowUpRight } from 'lucide-react'

interface ServiceData {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  details: string[]
  icon: React.ReactNode
  color: string
  bgColor: string
  textColor: string
}

const services: ServiceData[] = [
  {
    id: 'software',
    number: '01',
    title: 'Software a Medida',
    subtitle: 'Programas que se adaptan a ti',
    description: '¿Usas hojas de cálculo para gestionar tu negocio? Creamos aplicaciones hechas a tu medida que automatizan exactamente lo que necesitas, sin pagar por funciones que no usarás.',
    details: ['Aplicaciones web y móviles', 'Sistemas de gestión interna', 'Integración con tus herramientas actuales', 'Escalable a medida que creces'],
    icon: <Code2 className="w-8 h-8" />,
    color: 'bg-white',
    bgColor: 'bg-white',
    textColor: 'text-ink',
  },
  {
    id: 'redes',
    number: '02',
    title: 'Redes y Conectividad',
    subtitle: 'Conexión sin interrupciones',
    description: 'Instalamos y mantenemos redes rápidas, seguras y estables para tu oficina, almacén o negocio. Olvídate de cortes, lentitud y zonas sin cobertura.',
    details: ['Instalación de redes cableadas y WiFi', 'Configuración de servidores', 'Seguridad y protección de datos', 'Mantenimiento continuo'],
    icon: <Wifi className="w-8 h-8" />,
    color: 'bg-brand-900',
    bgColor: 'bg-brand-900',
    textColor: 'text-white',
  },
  {
    id: 'automatizacion',
    number: '03',
    title: 'Automatización Inteligente',
    subtitle: 'Que las máquinas trabajen por ti',
    description: 'Imagina que las tareas repetitivas de tu negocio se hicieran solas. Respondemos emails, organizamos citas, gestionamos pedidos y más, mientras tú te enfocas en lo importante.',
    details: ['Respuesta automática a clientes', 'Gestión de citas y pedidos', 'Flujos de trabajo automáticos', 'Conexión entre tus apps favoritas'],
    icon: <Bot className="w-8 h-8" />,
    color: 'bg-slate-100',
    bgColor: 'bg-slate-100',
    textColor: 'text-ink',
  },
  {
    id: 'datos',
    number: '04',
    title: 'Organización de Datos',
    subtitle: 'Tu información, donde y cuando la necesites',
    description: 'Tus datos son oro. Los organizamos, limpiamos y ponemos a tu disposición para que puedas tomar mejores decisiones en segundos, no en días.',
    details: ['Bases de datos centralizadas', 'Informes automáticos', 'Migración de datos segura', 'Copias de seguridad en la nube'],
    icon: <Database className="w-8 h-8" />,
    color: 'bg-ink',
    bgColor: 'bg-ink',
    textColor: 'text-white',
  },
  {
    id: 'multimedia',
    number: '05',
    title: 'Diseño y Multimedia',
    subtitle: 'Imagen que vende',
    description: 'Desde tu web hasta tus redes sociales. Creamos diseños profesionales que transmiten confianza y hacen que los clientes elijan verte antes que a la competencia.',
    details: ['Diseño web profesional', 'Identidad visual de marca', 'Edición de video y fotografía', 'Gestión de redes sociales'],
    icon: <Palette className="w-8 h-8" />,
    color: 'bg-brand-50',
    bgColor: 'bg-brand-50',
    textColor: 'text-ink',
  },
]

const ServiceCard: React.FC<{ service: ServiceData; index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity }}
        className={`w-full h-full ${service.bgColor} ${service.textColor} flex flex-col justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden shadow-2xl`}
      >
        {/* Background number */}
        <div className="absolute top-8 right-8 md:top-16 md:right-16 text-[12rem] md:text-[20rem] font-display font-bold opacity-[0.03] leading-none select-none pointer-events-none">
          {service.number}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold tracking-widest uppercase opacity-50">
                  Servicio {service.number} / 05
                </span>
              </div>

              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 ${
                service.id === 'redes' || service.id === 'datos' ? 'bg-white/10' : 'bg-brand-100'
              }`}>
                <div className={service.id === 'redes' || service.id === 'datos' ? 'text-white' : 'text-brand-600'}>
                  {service.icon}
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 leading-tight">
                {service.title}
              </h3>
              <p className={`text-xl md:text-2xl font-light mb-8 ${
                service.id === 'redes' || service.id === 'datos' ? 'text-slate-300' : 'text-muted'
              }`}>
                {service.subtitle}
              </p>
            </div>

            <div className="lg:w-2/5 lg:pt-24">
              <p className={`text-lg leading-relaxed mb-10 ${
                service.id === 'redes' || service.id === 'datos' ? 'text-slate-300' : 'text-muted'
              }`}>
                {service.description}
              </p>

              <ul className="space-y-4 mb-10">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      service.id === 'redes' || service.id === 'datos' ? 'bg-brand-400' : 'bg-brand-600'
                    }`} />
                    <span className={service.id === 'redes' || service.id === 'datos' ? 'text-slate-300' : 'text-muted'}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 group ${
                  service.id === 'redes' || service.id === 'datos'
                    ? 'text-white hover:text-brand-300'
                    : 'text-brand-600 hover:text-brand-800'
                }`}
              >
                Solicitar información
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Services: React.FC = () => {
  return (
    <section id="servicios" className="relative">
      <div className="bg-white py-20 px-6 text-center">
        <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
          Qué hacemos
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink max-w-3xl mx-auto">
          Cinco formas de hacer crecer tu negocio
        </h2>
      </div>

      <div className="relative">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Services
