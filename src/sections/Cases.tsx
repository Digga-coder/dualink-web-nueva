import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'

type CaseStudy = {
  client: string
  industry: string
  tags?: string[]
  challenge: string
  solution: string
  result: string
  metric: string
  metricLabel: string
}

const cases: CaseStudy[] = [
  {
    client: 'JMV Logística',
    industry: 'Logística y transporte',
    challenge: 'Gestionaban inventario a mano con hojas de cálculo. Errores constantes, pérdida de tiempo y clientes insatisfechos.',
    solution: 'Sistema de gestión centralizado con control de stock en tiempo real y alertas automáticas.',
    result: 'Redujeron un 70% el tiempo de gestión y eliminaron errores de inventario.',
    metric: '-70%',
    metricLabel: 'Tiempo de gestión',
  },
  {
    client: 'Frecuenzy',
    industry: 'Hostelería y ocio nocturno',
    tags: ['SaaS', 'Tiempo real', 'PWA', 'POS móvil'],
    challenge: 'Gestionaban las comandas y los cobros de la barra sobre la marcha, sin control en tiempo real de las ventas ni del rendimiento de cada camarero.',
    solution: 'SaaS de punto de venta (POS) en tiempo real: app móvil para los camareros con lógica de combinados, panel de administración con métricas de ventas y módulos de control de acceso y tickets.',
    result: 'El equipo de sala cobra desde el móvil y la dirección ve las ventas al instante, con todo el local conectado en una sola app instalable.',
    metric: 'Tiempo real',
    metricLabel: 'Control de ventas y comandas',
  },
  {
    client: 'Smash Gorry',
    industry: 'Agente de IA · Hostelería',
    tags: ['Inteligencia Artificial', 'Automatización', 'Integración de APIs'],
    challenge: 'Recibían los pedidos por mensajes sueltos: confusiones en la comanda, errores frecuentes y alguien siempre pendiente del móvil.',
    solution: 'Agente de IA conversacional en Telegram (Gemini) que entiende los pedidos en lenguaje natural, los confirma y los envía a cocina y a Firebase de forma automática.',
    result: 'Los clientes piden a cualquier hora y la comanda llega a cocina sin intervención manual.',
    metric: '24/7',
    metricLabel: 'Pedidos atendidos por IA',
  },
  {
    client: 'Three Inmobiliaria',
    industry: 'Agente de IA · PropTech',
    tags: ['PropTech', 'Inteligencia Artificial', 'Agentes Autónomos', 'NLP'],
    challenge: 'El equipo dedicaba horas a filtrar contactos, responder las mismas dudas sobre propiedades y coordinar las presentaciones una a una.',
    solution: 'Embudo agéntico en WhatsApp que cualifica cada lead, resuelve consultas sobre las propiedades y agenda las presentaciones por Zoom de forma autónoma.',
    result: 'Cada lead se cualifica y se atiende al instante; al equipo solo llegan los contactos realmente interesados.',
    metric: 'Auto',
    metricLabel: 'Cualificación de leads',
  },
  {
    client: 'Thermocork',
    industry: 'Construcción y aislamiento ecológico',
    tags: ['Transformación digital', 'Web premium', 'Agente RAG (IA)', 'Automatización'],
    challenge: 'El crecimiento de la facturación estaba atado a la carga de trabajo manual de la dirección: el papeleo y las tareas repetitivas frenaban el escalado del negocio.',
    solution: 'Plan Director de Transformación Digital 2026: web corporativa premium "Industrial Luxury" con galería de obras reales y zona B2B restringida, un Agente RAG que funciona como cerebro corporativo de consulta, un agente de inteligencia de reuniones y la automatización de pedidos omnicanal con trazabilidad.',
    result: 'El objetivo: una empresa donde el material sea físico pero la gestión sea 100% digital, rápida y sin papeleo. Proyecto en desarrollo.',
    metric: '100%',
    metricLabel: 'Gestión digital, sin papeleo',
  },
]

const Cases: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="resultados" ref={ref} className="py-32 md:py-40 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
              Resultados reales
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink">
              Casos de éxito
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted mt-4 md:mt-0 max-w-md"
          >
            Historias de clientes que dejaron de perder tiempo y empezaron a ganar eficiencia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className="group bg-white rounded-3xl p-8 md:p-12 border border-slate-100 hover:border-brand-200 transition-all duration-500 hover:shadow-xl hover:shadow-brand-900/5"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted block mb-2">
                    {item.industry}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-ink">
                    {item.client}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  {item.metric}
                </div>
              </div>

              {item.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-6 mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-red-400 block mb-2">
                    El problema
                  </span>
                  <p className="text-muted leading-relaxed">
                    {item.challenge}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-brand-300 rotate-90 md:rotate-0" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-brand-600 block mb-2">
                    Nuestra solución
                  </span>
                  <p className="text-ink leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl md:text-5xl font-display font-bold text-brand-600 block">
                      {item.metric}
                    </span>
                    <span className="text-sm text-muted">{item.metricLabel}</span>
                  </div>
                  <p className="text-sm text-muted max-w-xs text-right">
                    {item.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cases
