import { useRef, useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { detectQuality } from '../lib/quality'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { whatsappHref, waMessages } from '../config/site'

/* El clip 3D arrastra three.js (~1 MB). Cargándolo aparte, el
   mensaje y el botón de WhatsApp se pintan de inmediato y el
   adorno llega cuando llega. Si nunca llegase, la web sigue
   siendo perfectamente usable. */
const Logo3D = lazy(() => import('../components/Logo3D'))

/* ============================================================
   DUALINK HERO
   ------------------------------------------------------------
   Este hero medía 765vh (100 + 7 servicios × 95vh) y secuestraba
   el scroll: había que atravesar casi 8 pantallas de logo 3D
   antes de llegar a nada vendible, y las tarjetas de servicio
   sólo aparecían cuando la cámara "aterrizaba", cosa que no
   ocurre si el visitante scrollea seguido. La mayoría no llegaba
   a leer un solo servicio.

   Ahora ocupa UNA pantalla: propuesta, prueba y llamada a la
   acción visibles sin scrollear. El 3D se queda como fondo
   decorativo — que es lo que aporta — pero ya no bloquea la venta.
   ============================================================ */

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  /* Gama del dispositivo: se calcula una sola vez */
  const quality = useMemo(() => detectQuality(), [])

  /* Culling: pausa el bucle WebGL cuando el hero sale de pantalla */
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

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-b from-white via-paper to-slate-100"
    >
      {/* Halo decorativo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

      {/* ===== CLIP 3D — decorativo =====
          Oculto en móvil: allí gasta batería, tapa el texto y el
          mensaje importa más que el adorno. */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <Logo3D quality={quality} visible={visible} />
        </Suspense>
      </div>

      {/* Velo de contraste: garantiza que el texto se lea por
          encima del clip 3D oscuro */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 28% 50%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.86) 45%, rgba(255,255,255,0) 80%)',
        }}
      />

      {/* ===== CONTENIDO ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-muted text-xs font-semibold tracking-widest uppercase"
          >
            Agentes de IA · Automatización · Software a medida
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-ink mb-6 leading-[1.08] text-balance"
          >
            Agentes de <span className="text-brand-600">IA</span> que atienden a
            tus clientes mientras tú haces tu trabajo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed mb-10"
          >
            Automatizamos lo que te hace perder el día: atender consultas,
            filtrar contactos, tomar pedidos y agendar citas. Te lo explicamos
            sin tecnicismos y lo ves funcionando antes de pagarlo entero.
          </motion.p>

          {/* ===== LLAMADAS A LA ACCIÓN ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href={whatsappHref(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1eb855] transition-all duration-300 shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Hablar por WhatsApp
            </a>
            <a
              href="#resultados"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/80 backdrop-blur-md text-ink font-semibold rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-white transition-all duration-300"
            >
              Ver casos reales
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* ===== BARRA DE CONFIANZA ===== */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-muted"
          >
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              Agentes funcionando 24/7 en producción
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              Pagas por fases, nunca todo por adelantado
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              Tudela, Navarra
            </li>
          </motion.ul>
        </div>
      </div>

      {/* ===== INDICADOR DE SCROLL ===== */}
      <motion.a
        href="#servicios"
        aria-label="Ver servicios"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-muted hover:text-brand-600 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Qué hacemos</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero
