/* ============================================================
   DUALINK · MEDICIÓN Y ATRIBUCIÓN
   ------------------------------------------------------------
   Esto responde a la pregunta que hoy no tiene respuesta:
   "este lead que me acaba de escribir por WhatsApp, ¿de dónde
   ha salido y qué había leído antes?".

   CÓMO FUNCIONA

   Cada visita recibe una referencia corta en memoria, tipo
   DL-7F3K2. Esa referencia:

     1. Viaja con cada evento que mandamos al bot.
     2. Se cuela al final del mensaje prerrellenado de WhatsApp.

   Cuando la persona pulsa "Enviar", el bot recibe un mensaje
   que termina en "(ref: DL-7F3K2)" y ya puede unir la
   conversación con todo lo que esa persona hizo en la web:
   por dónde entró, hasta dónde bajó, si vio la conversación
   del agente y desde qué sección decidió escribir.

   SIN COOKIES Y SIN ALMACENAMIENTO. NO SE TOCA.

   La referencia vive en una variable de JavaScript y muere al
   cerrar la pestaña. No hay cookie, ni localStorage, ni
   sessionStorage, ni huella de navegador.

   Es deliberado: el artículo 22.2 de la LSSI obliga a pedir
   consentimiento para guardar cualquier cosa en el dispositivo
   que no sea imprescindible. Guardando nada, no hay banner que
   poner, no hay política de cookies que cambiar y no hay nada
   que un visitante pueda reclamar. El precio es que si alguien
   recarga la página empieza una referencia nueva. Merece la
   pena: un banner de cookies en la primera pantalla cuesta más
   leads que los que se pierden por recargar.

   Tampoco se manda nada personal. Ni nombre, ni teléfono, ni
   correo, ni IP (esa la ve el servidor de todas formas). Solo
   qué se ha mirado.

   PARA ENCENDERLO

   Rellena OD_TRACKING_ENDPOINT abajo con la URL de tu bot:

     https://TU-BOT.seenode.app/tracking/web

   Mientras esté vacío, todo esto no hace absolutamente nada:
   ni una petición, ni un error en consola. La web funciona
   igual. Es a propósito — que la medición no pueda tumbar la
   página nunca.
   ============================================================ */

/* Pega aquí la URL de tu bot para encender la medición. */
const OD_TRACKING_ENDPOINT = ''

const activo = () => OD_TRACKING_ENDPOINT.length > 0

/* ── Referencia de visita ─────────────────────────────────────
   Cinco caracteres sin vocales, para que no salgan palabras
   por accidente, y sin los que se confunden al leerlos en voz
   alta por teléfono (0/O, 1/I). */
const ALFABETO = '23456789BCDFGHJKLMNPQRSTVWXYZ'

function generarRef(): string {
  const n = new Uint8Array(5)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(n)
  } else {
    for (let i = 0; i < n.length; i++) n[i] = Math.floor(Math.random() * 256)
  }
  let s = ''
  for (const b of n) s += ALFABETO[b % ALFABETO.length]
  return `DL-${s}`
}

export const refVisita = generarRef()

/* ── Envío de eventos ─────────────────────────────────────────
   sendBeacon primero: sobrevive a que el navegador cambie de
   página, que es justo lo que pasa al pulsar el botón de
   WhatsApp. Si no está, fetch con keepalive. Si falla, se
   traga el error: la medición nunca rompe la visita. */
export function evento(tipo: string, meta?: Record<string, unknown>): void {
  if (!activo()) return

  const cuerpo = JSON.stringify({
    ref: refVisita,
    tipo,
    meta: meta || null,
    url: window.location.pathname + window.location.hash,
    referrer: document.referrer || null,
    ancho: window.innerWidth,
  })

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        OD_TRACKING_ENDPOINT,
        new Blob([cuerpo], { type: 'application/json' })
      )
      return
    }
    void fetch(OD_TRACKING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: cuerpo,
      keepalive: true,
      mode: 'cors',
    }).catch(() => {})
  } catch {
    /* silencio deliberado */
  }
}

/* ── Profundidad de lectura ───────────────────────────────────
   Marca hasta qué sección llegó el visitante. Es el dato que
   dice DÓNDE se cae la gente, que es lo que hay que arreglar.
   Cada sección se avisa una sola vez. */
export function observarSecciones(): () => void {
  if (!activo()) return () => {}
  if (typeof IntersectionObserver === 'undefined') return () => {}

  const vistas = new Set<string>()
  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const id = (e.target as HTMLElement).id
        if (!e.isIntersecting || !id || vistas.has(id)) continue
        vistas.add(id)
        evento('seccion_vista', { seccion: id })
      }
    },
    { threshold: 0.4 }
  )

  document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
  return () => obs.disconnect()
}

/* ── Salida ───────────────────────────────────────────────────
   Al cerrar, manda cuánto tiempo estuvo y hasta dónde bajó.
   Con `visibilitychange`, no con `unload`: es el único que los
   navegadores móviles disparan de verdad. */
export function medirSalida(): () => void {
  if (!activo()) return () => {}

  const inicio = Date.now()
  let maxScroll = 0

  const alScroll = () => {
    const alto = document.documentElement.scrollHeight - window.innerHeight
    if (alto <= 0) return
    const pct = Math.round((window.scrollY / alto) * 100)
    if (pct > maxScroll) maxScroll = Math.min(pct, 100)
  }

  const alOcultar = () => {
    if (document.visibilityState !== 'hidden') return
    evento('salida', {
      segundos: Math.round((Date.now() - inicio) / 1000),
      scrollMaximo: maxScroll,
    })
  }

  window.addEventListener('scroll', alScroll, { passive: true })
  document.addEventListener('visibilitychange', alOcultar)

  return () => {
    window.removeEventListener('scroll', alScroll)
    document.removeEventListener('visibilitychange', alOcultar)
  }
}
