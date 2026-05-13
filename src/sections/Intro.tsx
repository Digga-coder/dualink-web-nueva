import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Intro: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-muted text-sm font-medium mb-10">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Porque la tecnología debe servirte, no complicarte
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-10 leading-tight">
            Dejamos de hablar en<br />
            <span className="text-brand-600">código</span>. Empezamos a<br />
            hablar en <span className="text-brand-600">resultados</span>.
          </h2>

          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed font-light">
            En DUALINK creemos que la mejor tecnología es la que no se nota. 
            La que hace que tu negocio funcione más rápido, venda más, 
            ahorre tiempo y deje de depender de procesos manuales.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { number: '01', title: 'Claridad', desc: 'Te explicamos todo sin jerga. Sabrás exactamente qué hacemos, por qué lo hacemos y cuánto cuesta.' },
              { number: '02', title: 'Compromiso', desc: 'No desaparecemos cuando entregamos el proyecto. Te acompañamos para que saques el máximo provecho.' },
              { number: '03', title: 'Calidad', desc: 'Construimos para que dure. Nada de parches que se rompen al mes. Soluciones sólidas desde el primer día.' },
            ].map((item) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + parseInt(item.number) * 0.15 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors duration-300"
              >
                <span className="text-5xl font-display font-bold text-brand-100 block mb-4">
                  {item.number}
                </span>
                <h3 className="text-xl font-semibold text-ink mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  )
}

export default Intro
