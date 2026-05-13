import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const LogoPrism: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-[1000px]">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(80px)' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
              <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Dark link */}
            <path d="M120 40C150 40 170 70 170 100C170 130 150 160 120 160C90 160 70 130 70 100C70 70 90 40 120 40Z" fill="url(#darkGrad)" filter="url(#glow)" />
            {/* Blue link */}
            <path d="M80 60C110 60 130 90 130 120C130 150 110 180 80 180C50 180 30 150 30 120C30 90 50 60 80 60Z" fill="url(#blueGrad)" filter="url(#glow)" />
            {/* Intersection highlight */}
            <ellipse cx="100" cy="110" rx="25" ry="18" fill="#1e3a8a" opacity="0.8" />
          </svg>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-900 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(80px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-4xl font-bold mb-2">Software</p>
            <p className="text-brand-200">A medida</p>
          </div>
        </div>

        {/* Right face */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-ink rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(90deg) translateZ(80px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-4xl font-bold mb-2">Redes</p>
            <p className="text-slate-400">Profesionales</p>
          </div>
        </div>

        {/* Left face */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-600 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(-90deg) translateZ(80px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-4xl font-bold mb-2">Datos</p>
            <p className="text-brand-100">Organizados</p>
          </div>
        </div>

        {/* Top face */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-700 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(90deg) translateZ(80px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-4xl font-bold mb-2">Automatización</p>
            <p className="text-slate-300">Inteligente</p>
          </div>
        </div>

        {/* Bottom face */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-800 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(-90deg) translateZ(80px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-4xl font-bold mb-2">Consultoría</p>
            <p className="text-brand-200">Estratégica</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

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
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
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
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Diseñamos soluciones digitales que cualquiera puede entender y todos pueden usar.
          Sin tecnicismos. Solo resultados que se ven en tu día a día.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mb-16"
        >
          <LogoPrism />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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
        transition={{ delay: 1.5, duration: 1 }}
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
