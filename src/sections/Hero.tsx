import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Logo3D from '../components/Logo3D'

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold tracking-widest uppercase">
            Tecnología que trabaja por ti
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-ink mb-6 leading-[1.1]"
        >
          Conectamos tu<br />
          <span className="text-brand-600">negocio</span> con el<br />
          futuro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 font-light leading-relaxed"
        >
          Diseñamos soluciones digitales que cualquiera puede entender y todos pueden usar.
          Sin tecnicismos. Solo resultados que se ven en tu día a día.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-3xl mx-auto mb-12"
        >
          <Suspense fallback={
            <div className="w-full h-[500px] flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
            </div>
          }>
            <Logo3D />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 transition-all duration-300 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5"
          >
            Hablemos de tu proyecto
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-ink font-semibold rounded-full border border-slate-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-300"
          >
            Ver qué hacemos
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-muted" />
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-40" />
      </div>
    </section>
  )
}

export default Hero
