import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Pencil, Rocket, Handshake, ShieldCheck } from 'lucide-react'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · PROCESO
   ------------------------------------------------------------
   Dos arreglos aquí:

   1. El paso 01 tenía caracteres chinos incrustados en mitad de
      una frase ("no sé qué决策 tomar"). Estaba publicado así.

   2. Se añade el bloque de pago por fases. Es el argumento más
      fuerte del discurso de venta —"de normal las agencias
      cobran todo por adelantado; nosotros dejamos un 30% sin
      pagar para que lo veas antes"— y la web no lo contaba en
      ninguna parte, aunque se dice en cada llamada.
   ============================================================ */

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Nos cuentas tu problema',
    description:
      'Una llamada o un café. Nos explicas qué te frustra de tu día a día: "pierdo tiempo en emails", "no sé qué decisión tomar", "mi web no vende"... Lo que sea.',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Diseñamos la solución',
    description:
      'Te presentamos un plan claro: qué vamos a hacer, cuánto cuesta y cuándo lo tendrás. Sin letra pequeña. Sin sorpresas.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Construimos y lanzamos',
    description:
      'Nos ponemos manos a la obra. Te enseñamos avances para que veas cómo va tomando forma. Cuando todo está listo, lanzamos juntos.',
  },
  {
    number: '04',
    icon: Handshake,
    title: 'Te acompañamos después',
    description:
      'No te dejamos solo. Resolvemos dudas, hacemos ajustes y nos aseguramos de que saques el máximo partido a lo que hemos creado.',
  },
]

const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proceso" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
              Cómo trabajamos
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink max-w-3xl mx-auto text-balance">
              De la idea a la realidad en cuatro pasos
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Línea conectora */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-slate-200 to-transparent" />
                )}

                <div className="mb-6 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-5xl font-display font-bold text-slate-100 select-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-ink mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* ===== PAGO POR FASES ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl bg-ink text-white p-8 md:p-12 lg:p-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="lg:flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 text-brand-300 text-xs font-semibold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4" />
                Sin riesgo para ti
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight text-balance">
                Pagas por fases.<br />
                Nunca todo por adelantado.
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg max-w-xl">
                Lo normal en las agencias es cobrarte el 100% antes de empezar.
                Nosotros dividimos el proyecto en fases y dejamos alrededor de un
                30% sin cobrar hasta el final, para que puedas ver aquello por lo
                que estás pagando antes de soltar el último euro. Preferimos que
                lo veas funcionando a contártelo.
              </p>
            </div>

            <div className="lg:w-72 shrink-0">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-5xl font-display font-bold text-white">30%</span>
                  <span className="text-sm text-slate-400 text-right leading-tight">
                    sin pagar<br />hasta verlo
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
                  <div className="h-full w-[70%] rounded-full bg-brand-400" />
                </div>
                <a
                  href={whatsappHref(waMessages.budget)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1eb855] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  Pedir presupuesto
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
