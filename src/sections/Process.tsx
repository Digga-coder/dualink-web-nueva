import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Pencil, Rocket, Handshake } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Nos cuentas tu problema',
    description: 'Una llamada o un café. Nos explicas qué te frustra de tu día a día: "pierdo tiempo en emails", "no sé qué决策 tomar", "mi web no vende"... Lo que sea.',
  },
  {
    number: '02',
    icon: <Pencil className="w-6 h-6" />,
    title: 'Diseñamos la solución',
    description: 'Te presentamos un plan claro: qué vamos a hacer, cuánto cuesta y cuándo lo tendrás. Sin letra pequeña. Sin sorpresas.',
  },
  {
    number: '03',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Construimos y lanzamos',
    description: 'Nos ponemos manos a la obra. Te enseñamos avances para que veas cómo va tomando forma. Cuando todo está listo, lanzamos juntos.',
  },
  {
    number: '04',
    icon: <Handshake className="w-6 h-6" />,
    title: 'Te acompañamos después',
    description: 'No te dejamos solo. Resolvemos dudas, hacemos ajustes y nos aseguramos de que saques el máximo partido a lo que hemos creado.',
  },
]

const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proceso" ref={ref} className="py-32 md:py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
              Cómo trabajamos
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink max-w-3xl mx-auto">
              De la idea a la realidad en cuatro pasos
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-slate-200 to-transparent" />
              )}

              <div className="mb-6 flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                  {step.icon}
                </div>
                <span className="text-5xl font-display font-bold text-slate-100">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-ink mb-3">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
