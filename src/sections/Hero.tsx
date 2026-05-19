import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Logo3D, { detectQuality, type SceneState } from '../components/Logo3D'

/* ============================================================
   DUALINK HERO — Scrollytelling con cámara cinemática
   ------------------------------------------------------------
   RENDIMIENTO:
   - El scroll NUNCA mueve la cámara de forma síncrona. Sólo
     escribe un "target value" en `sceneStateRef` (objeto
     mutable). La cámara persigue ese target dentro del bucle
     rAF de Three.js (ver Logo3D / CameraRig).
   - El árbol del Canvas 3D no se vuelve a renderizar al hacer
     scroll: Logo3D está memoizado y recibe un ref estable.
   - Los listeners de scroll/táctiles son PASIVOS.
   - IntersectionObserver pausa el render WebGL (culling) y el
     auto-play cuando el Hero sale del viewport.
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

  /* Estado de RENDER (UI). Sólo cambia en eventos discretos,
     nunca en cada píxel de scroll. */
  const [activeIndex, setActiveIndex] = useState(0)
  const [inIntro, setInIntro] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [settledIndex, setSettledIndex] = useState(-1)
  const [visible, setVisible] = useState(true)

  /* "Target value" desacoplado: lo lee la cámara dentro de rAF,
     sin provocar renders de React. */
  const sceneStateRef = useRef<SceneState>({
    activeIndex: 0,
    inIntro: true,
    autoPlay: false,
  })

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Gama del dispositivo: se calcula una sola vez */
  const quality = useMemo(() => detectQuality(), [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* La intro se desvanece al empezar el tour (por scroll) */
  const introScrollOpacity = useTransform(scrollYProgress, [0, INTRO_PORTION], [1, 0])
  const introScrollY = useTransform(scrollYProgress, [0, INTRO_PORTION], [0, -60])

  /* ----- Scroll => sólo actualiza el TARGET VALUE -----
     `scrollYProgress.on` usa internamente listeners pasivos.
     El ref se actualiza siempre; el estado de React sólo si el
     valor discreto cambia (React descarta el set redundante). */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < INTRO_PORTION) {
        sceneStateRef.current.inIntro = true
        sceneStateRef.current.activeIndex = 0
        setInIntro(true)
        setActiveIndex(0)
        return
      }
      const t = (v - INTRO_PORTION) / (1 - INTRO_PORTION)
      const idx = Math.min(Math.floor(t * services.length), services.length - 1)
      sceneStateRef.current.inIntro = false
      sceneStateRef.current.activeIndex = idx
      setInIntro(false)
      setActiveIndex(idx)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  /* ----- Culling: pausa el render WebGL fuera del viewport ----- */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ----- Temporizador de inactividad (listeners PASIVOS) ----- */
  useEffect(() => {
    const armIdleTimer = () => {
      setAutoPlay(false)
      sceneStateRef.current.autoPlay = false
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setAutoPlay(true), IDLE_MS)
    }
    armIdleTimer()
    window.addEventListener('wheel', armIdleTimer, { passive: true })
    window.addEventListener('touchmove', armIdleTimer, { passive: true })
    window.addEventListener('touchstart', armIdleTimer, { passive: true })
    window.addEventListener('keydown', armIdleTimer)
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      window.removeEventListener('wheel', armIdleTimer)
      window.removeEventListener('touchmove', armIdleTimer)
      window.removeEventListener('touchstart', armIdleTimer)
      window.removeEventListener('keydown', armIdleTimer)
    }
  }, [])

  /* ----- Auto-play: recorre las caras (sólo si el Hero es visible) ----- */
  useEffect(() => {
    if (!autoPlay || !visible) {
      sceneStateRef.current.autoPlay = false
      return
    }
    sceneStateRef.current.autoPlay = true
    sceneStateRef.current.inIntro = false
    setInIntro(false)
    const id = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % services.length
        sceneStateRef.current.activeIndex = next
        return next
      })
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [autoPlay, visible])

  /* Al cambiar de cara, la UI espera a que la cámara llegue */
  useEffect(() => {
    setSettledIndex(-1)
  }, [activeIndex, inIntro])

  /* La cámara avisa (desde rAF) cuando termina el movimiento */
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

        {/* ===== CLIP 3D — cámara controlada por scroll =====
            Logo3D está memoizado: recibe un ref estable, así que
            el scroll no provoca renders de este subárbol. */}
        <div className="absolute inset-0 z-10">
          <Logo3D
            stateRef={sceneStateRef}
            quality={quality}
            visible={visible}
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
            {/* Velo de contraste: aclara el fondo tras el texto para
                que sea legible aunque el clip 3D oscuro quede detrás */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[85vh] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.78) 42%, rgba(248,250,252,0) 74%)',
              }}
            />

            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative inline-block px-4 py-1.5 mb-6 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-muted text-xs font-semibold tracking-widest uppercase"
            >
              Tecnología que trabaja por ti
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-ink mb-6 leading-[1.1] [text-shadow:0_2px_22px_rgba(248,250,252,0.95),0_0_8px_rgba(248,250,252,0.9)]"
            >
              Conectamos tu<br />
              <span className="text-brand-600">negocio</span> con el<br />
              futuro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto font-light leading-relaxed [text-shadow:0_1px_12px_rgba(248,250,252,0.95)]"
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
            const cardVisible = !inIntro && settledIndex === i
            return (
              /* Posicionamiento (div externo): en móvil la tarjeta
                 se ancla abajo, a lo ancho con márgenes seguros; en
                 sm+ pasa a un lateral y se centra en vertical.
                 La animación va en el motion.div interno para no
                 mezclar transforms de layout con los de animación. */
              <div
                key={service.title}
                className={`absolute left-4 right-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-auto sm:max-w-sm ${
                  service.align === 'left'
                    ? 'sm:right-auto sm:left-8 md:left-16 lg:left-24'
                    : 'sm:left-auto sm:right-8 md:right-16 lg:right-24'
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: cardVisible ? 1 : 0,
                    y: cardVisible ? 0 : 24,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-white/85 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-200 shadow-2xl shadow-slate-900/10"
                >
                  <span
                    className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase block mb-2"
                    style={{ color: service.accent }}
                  >
                    Servicio {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-ink mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {service.subtitle}
                  </p>
                </motion.div>
              </div>
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
          className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 w-max max-w-[92vw]"
          animate={{ opacity: autoPlay ? 1 : 0, y: autoPlay ? 0 : -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-[0.65rem] sm:text-xs font-medium tracking-widest uppercase text-muted whitespace-nowrap">
              Recorrido automático
              <span className="hidden sm:inline"> · desliza para tomar el control</span>
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
