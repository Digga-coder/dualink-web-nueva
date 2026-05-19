import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Logo3D from '../components/Logo3D'

/* ============================================================
   DUALINK HERO — Scrollytelling con cámara cinemática
   ------------------------------------------------------------
   El clip 3D permanece fijo. El scroll del usuario hace de
   trigger: la cámara ejecuta un "zoom in" + paneo hacia una
   cara concreta del modelo, y al llegar aparece la UI del
   servicio acoplado a esa cara.

   Estado de inactividad (idle): si el usuario no hace scroll
   tras IDLE_MS, se activa un auto-play que recorre las caras
   del modelo solo para garantizar que todos los servicios
   se vean. Cualquier interacción cancela el auto-play.
   ============================================================ */

const services = [
  {
    title: 'Software a Medida',
    subtitle: 'Aplicaciones que se adaptan exactamente a tu negocio.',
    align: 'left' as const,
    accent: '#1e3a8a',
  },
  {
    title: 'Redes Profesionales',
    subtitle: 'Conectividad rápida, segura y sin cortes.',
    align: 'right' as const,
    accent: '#334155',
  },
  {
    title: 'Automatización Inteligente',
    subtitle: 'Que las máquinas hagan las tareas repetitivas por ti.',
    align: 'left' as const,
    accent: '#1e3a8a',
  },
  {
    title: 'Datos Organizados',
    subtitle: 'Tu información, donde y cuando la necesites.',
    align: 'right' as const,
    accent: '#334155',
  },
  {
    title: 'Diseño & Multimedia',
    subtitle: 'Imagen que vende y transmite confianza.',
    align: 'left' as const,
    accent: '#1e3a8a',
  },
  {
    title: 'Consultoría Estratégica',
    subtitle: 'Te guiamos en cada paso de la transformación digital.',
    align: 'right' as const,
    accent: '#334155',
  },
]

/* Proporción del scroll reservada a la intro */
const INTRO_PORTION = 0.14
/* Inactividad antes de activar el auto-play (ms) */
const IDLE_MS = 7000
/* Cadencia del auto-play entre caras (ms) */
const AUTOPLAY_MS = 4200

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [inIntro, setInIntro] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  /* Índice cuya cámara YA llegó a destino -> habilita su UI */
  const [settledIndex, setSettledIndex] = useState(-1)

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* La intro se desvanece al empezar el tour (por scroll) */
  const introScrollOpacity = useTransform(scrollYProgress, [0, INTRO_PORTION], [1, 0])
  const introScrollY = useTransform(scrollYProgress, [0, INTRO_PORTION], [0, -60])

  /* Sincroniza el servicio activo con el progreso de scroll */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < INTRO_PORTION) {
        setInIntro(true)
        setActiveIndex(0)
        return
      }
      setInIntro(false)
      const t = (v - INTRO_PORTION) / (1 - INTRO_PORTION)
      const idx = Math.min(Math.floor(t * services.length), services.length - 1)
      setActiveIndex(idx)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  /* ----- Temporizador de inactividad -----
     Cualquier gesto de scroll/teclado cancela el auto-play y
     reinicia la cuenta atrás. */
  useEffect(() => {
    const armIdleTimer = () => {
      setAutoPlay(false)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setAutoPlay(true), IDLE_MS)
    }
    armIdleTimer()
    window.addEventListener('wheel', armIdleTimer, { passive: true })
    window.addEventListener('touchmove', armIdleTimer, { passive: true })
    window.addEventListener('keydown', armIdleTimer)
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      window.removeEventListener('wheel', armIdleTimer)
      window.removeEventListener('touchmove', armIdleTimer)
      window.removeEventListener('keydown', armIdleTimer)
    }
  }, [])

  /* ----- Auto-play: recorre las caras del modelo en bucle ----- */
  useEffect(() => {
    if (!autoPlay) return
    setInIntro(false)
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [autoPlay])

  /* Al cambiar de cara, la UI espera a que la cámara llegue */
  useEffect(() => {
    setSettledIndex(-1)
  }, [activeIndex, inIntro])

  /* La cámara avisa cuando termina el movimiento hacia una cara */
  const handleShotSettled = useCallback((index: number) => {
    setSettledIndex(index)
  }, [])

  const introVisible = inIntro && !autoPlay

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative"
      style={{ height: `${100 + services.length * 95}vh` }}
    >
      {/* ===== ESCENARIO FIJO ===== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-white via-paper to-slate-100">
        {/* Halo decorativo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

        {/* ===== CLIP 3D — cámara controlada por scroll ===== */}
        <div className="absolute inset-0 z-10">
          <Logo3D
            activeIndex={activeIndex}
            inIntro={inIntro}
            autoPlayActive={autoPlay}
            onShotSettled={handleShotSettled}
          />
        </div>

        {/* ===== INTRO ===== */}
        <motion.div
          animate={{ opacity: introVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <motion.div
            style={{ opacity: introScrollOpacity, y: introScrollY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-muted text-xs font-semibold tracking-widest uppercase"
            >
              Tecnología que trabaja por ti
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-ink mb-6 leading-[1.1]"
            >
              Conectamos tu<br />
              <span className="text-brand-600">negocio</span> con el<br />
              futuro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-light leading-relaxed"
            >
              Diseñamos soluciones digitales que cualquiera puede entender.
              Sin tecnicismos. Solo resultados.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ===== SERVICIO ACTIVO — acoplado a una cara del clip =====
            Aparece SÓLO cuando la cámara ha llegado a esa cara. */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {services.map((service, i) => {
            const visible = !inIntro && settledIndex === i
            return (
              <motion.div
                key={service.title}
                className={`absolute top-1/2 -translate-y-1/2 w-[86%] sm:w-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 ${
                  service.align === 'left'
                    ? 'sm:left-8 md:left-16 lg:left-24'
                    : 'sm:right-8 md:right-16 lg:right-24'
                } sm:max-w-sm`}
                initial={false}
                animate={{
                  opacity: visible ? 1 : 0,
                  x: visible ? 0 : service.align === 'left' ? -50 : 50,
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200 shadow-2xl shadow-slate-900/10">
                  <span
                    className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2"
                    style={{ color: service.accent }}
                  >
                    Servicio {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ===== INDICADOR DE PROGRESO (un punto por servicio) ===== */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {services.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                !inIntro && activeIndex === i
                  ? 'w-2.5 h-6 bg-brand-600'
                  : 'w-2.5 h-2.5 bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* ===== AVISO DE AUTO-PLAY (modo inactividad) ===== */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
          animate={{ opacity: autoPlay ? 1 : 0, y: autoPlay ? 0 : -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted">
              Recorrido automático · desliza para tomar el control
            </span>
          </div>
        </motion.div>

        {/* ===== INDICADOR DE SCROLL ===== */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          animate={{ opacity: introVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-muted">
              Desliza para explorar
            </span>
            <ChevronDown className="w-5 h-5 text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
