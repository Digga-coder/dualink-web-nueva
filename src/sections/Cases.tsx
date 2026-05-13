import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'

const cases = [
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
    industry: 'Tecnología y eventos',
    challenge: 'El equipo de soporte pasaba 40 horas semanales respondiendo las mismas preguntas una y otra vez.',
    solution: 'Sistema de tickets inteligente con respuestas automáticas para consultas frecuentes.',
    result: 'Liberaron 35 horas semanales para enfocarse en mejorar el producto.',
    metric: '-35h',
    metricLabel: 'Ahorro semanal',
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
                <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {item.metric}
                </div>
              </div>

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
