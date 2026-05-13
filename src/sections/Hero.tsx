import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const LogoSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
      <defs>
        {/* Gradientes para simular volumen 3D con luz superior-izquierda */}
        <radialGradient id="blueGrad" cx="35%" cy="30%" r="75%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" /> {/* Brillo azul claro */}
          <stop offset="20%" stopColor="#3b82f6" />
          <stop offset="45%" stopColor="#1e3a8a" /> {/* Azul corporativo */}
          <stop offset="75%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0a1445" /> {/* Azul muy oscuro */}
        </radialGradient>

        <radialGradient id="darkGrad" cx="35%" cy="30%" r="75%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" /> {/* Brillo gris claro */}
          <stop offset="20%" stopColor="#64748b" />
          <stop offset="45%" stopColor="#334155" /> {/* Gris oscuro */}
          <stop offset="75%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" /> {/* Casi negro */}
        </radialGradient>

        {/* Reflejo de luz superficial */}
        <linearGradient id="blueHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="40%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="darkHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="40%" stopColor="white" stopOpacity="0.03" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Sombra proyectada */}
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="25" stdDeviation="25" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Eslabón AZUL (inferior-izquierda, rotado -45°) */}
      <g transform="translate(175, 245) rotate(-40)" filter="url(#shadow)">
        {/* Exterior del eslabón */}
        <path
          d="M -60 -40
             A 40 40 0 0 1 -60 40
             L 60 40
             A 40 40 0 0 1 60 -40
             Z
             M -60 -22
             A 22 22 0 0 1 -60 22
             L 60 22
             A 22 22 0 0 1 60 -22
             Z"
          fill="url(#blueGrad)"
          fillRule="evenodd"
        />
        {/* Reflejo de luz */}
        <path
          d="M -60 -40
             A 40 40 0 0 1 -60 40
             L 60 40
             A 40 40 0 0 1 60 -40
             Z
             M -60 -22
             A 22 22 0 0 1 -60 22
             L 60 22
             A 22 22 0 0 1 60 -22
             Z"
          fill="url(#blueHighlight)"
          fillRule="evenodd"
        />
      </g>

      {/* Eslabón NEGRO (superior-derecha, rotado 40°) */}
      <g transform="translate(235, 165) rotate(40)" filter="url(#shadow)">
        {/* Exterior del eslabón */}
        <path
          d="M -60 -40
             A 40 40 0 0 1 -60 40
             L 60 40
             A 40 40 0 0 1 60 -40
             Z
             M -60 -22
             A 22 22 0 0 1 -60 22
             L 60 22
             A 22 22 0 0 1 60 -22
             Z"
          fill="url(#darkGrad)"
          fillRule="evenodd"
        />
        {/* Reflejo de luz */}
        <path
          d="M -60 -40
             A 40 40 0 0 1 -60 40
             L 60 40
             A 40 40 0 0 1 60 -40
             Z
             M -60 -22
             A 22 22 0 0 1 -60 22
             L 60 22
             A 22 22 0 0 1 60 -22
             Z"
          fill="url(#darkHighlight)"
          fillRule="evenodd"
        />
      </g>
    </svg>
  )
}

const LogoPrism: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80" style={{ perspective: '1200px' }}>
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===== CARA FRONTAL: Logo ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(120px)' }}
        >
          <div className="w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8 border border-slate-100">
            <LogoSVG />
          </div>
        </div>

        {/* ===== CARA TRASERA: Software ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-900 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(120px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-300 mb-3">Servicio</p>
            <p className="text-5xl font-display font-bold mb-2">Software</p>
            <p className="text-2xl font-light text-brand-200">a medida</p>
          </div>
        </div>

        {/* ===== CARA DERECHA: Redes ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-ink rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(90deg) translateZ(120px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-400 mb-3">Servicio</p>
            <p className="text-5xl font-display font-bold mb-2">Redes</p>
            <p className="text-2xl font-light text-slate-400">Profesionales</p>
          </div>
        </div>

        {/* ===== CARA IZQUIERDA: Automatización ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-600 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(-90deg) translateZ(120px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-200 mb-3">Servicio</p>
            <p className="text-5xl font-display font-bold mb-2">Automatización</p>
            <p className="text-2xl font-light text-brand-100">Inteligente</p>
          </div>
        </div>

        {/* ===== CARA SUPERIOR: Datos ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-700 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(90deg) translateZ(120px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-300 mb-3">Servicio</p>
            <p className="text-5xl font-display font-bold mb-2">Datos</p>
            <p className="text-2xl font-light text-slate-300">Organizados</p>
          </div>
        </div>

        {/* ===== CARA INFERIOR: Diseño ===== */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-brand-800 rounded-3xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(-90deg) translateZ(120px)' }}
        >
          <div className="text-center text-white p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-brand-200 mb-3">Servicio</p>
            <p className="text-5xl font-display font-bold mb-2">Diseño</p>
            <p className="text-2xl font-light text-brand-200">& Multimedia</p>
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
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-16 font-light leading-relaxed"
        >
          Diseñamos soluciones digitales que cualquiera puede entender y todos pueden usar.
          Sin tecnicismos. Solo resultados que se ven en tu día a día.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mb-20"
        >
          <LogoPrism />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
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
