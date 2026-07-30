import { useEffect, useRef, useState } from 'react'
import { conversaciones, type Conversacion, type Turno } from '../config/conversaciones'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · EL AGENTE TRABAJANDO
   ------------------------------------------------------------
   Esta sección es la prueba. El resto de la web dice lo que
   hacemos; esta lo enseña haciéndolo.

   Por qué se reconstruye el hilo en HTML en vez de poner una
   captura de pantalla:

   · Una captura se ve borrosa en pantallas grandes y minúscula
     en el móvil, que es por donde llega casi todo el mundo.
   · Una captura no la lee un lector de pantalla ni Google.
   · Un hilo en HTML puede REPRODUCIRSE: los mensajes van
     apareciendo, y ver a la máquina contestar convence mucho
     más que ver una foto de que contestó.

   El contenido sale de config/conversaciones.ts. Mientras esos
   diálogos estén marcados como reconstruidos, la web lo dice en
   pantalla — decir "conversación real" de algo escrito por
   nosotros sería mentir, y este negocio se vende con la
   confianza como argumento principal.
   ============================================================ */

const Burbuja: React.FC<{ turno: Turno; visible: boolean; retardo: number }> = ({
  turno,
  visible,
  retardo,
}) => {
  /* El resguardo del pedido. Es el momento en que el visitante
     entiende que esto no es un chatbot de juguete: hay una
     comanda cerrada, con número, importe y hora. Se dibuja como
     un ticket porque es lo que es. */
  if (turno.de === 'pedido') {
    return (
      <li
        className={`turno ${visible ? 'turno-visible' : ''} -mx-5 sm:-mx-6`}
        style={{ transitionDelay: `${retardo}ms` }}
      >
        {/* Sin borde propio: va a sangre dentro del hilo y se
            apoya solo en el color de fondo. Una caja con borde
            aquí dentro sería una tarjeta metida en otra tarjeta,
            que es de las pocas cosas que nunca están bien. */}
        <div className="bg-brand-50">
          <p className="engraved px-4 py-2 text-xs font-black bg-brand-700 text-white">
            Pedido confirmado
          </p>
          <div className="px-4 py-4">
            <p className="engraved text-xs font-bold text-brand-800 tabular-nums">
              {turno.referencia}
            </p>
            <ul className="mt-3 space-y-1">
              {turno.lineas.map((linea) => (
                <li
                  key={linea}
                  className="text-[0.95rem] text-ink-800 tabular-nums"
                >
                  {linea}
                </li>
              ))}
            </ul>
            <dl className="mt-4 pt-3 border-t border-brand-200 space-y-1.5">
              <div className="flex justify-between gap-4">
                <dt className="engraved text-xs font-bold text-ink-600">Total</dt>
                <dd className="plate-type font-black text-lg text-ink-900 tabular-nums">
                  {turno.total}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="engraved text-xs font-bold text-ink-600">
                  Recogida
                </dt>
                <dd className="font-bold text-ink-800 tabular-nums">
                  {turno.recogida}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.95rem] font-semibold text-ink-800">
              {turno.cierre}
            </p>
          </div>
        </div>
      </li>
    )
  }

  if (turno.de === 'sistema') {
    return (
      <li
        className={`turno ${visible ? 'turno-visible' : ''} flex justify-center py-1`}
        style={{ transitionDelay: `${retardo}ms` }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-ink-600 bg-ink-100">
          <span className="w-1.5 h-1.5 bg-brand-700 shrink-0" />
          {turno.texto}
        </span>
      </li>
    )
  }

  const esAgente = turno.de === 'agente'

  return (
    <li
      className={`turno ${visible ? 'turno-visible' : ''} flex ${
        esAgente ? 'justify-end' : 'justify-start'
      }`}
      style={{ transitionDelay: `${retardo}ms` }}
    >
      <p
        className={`max-w-[85%] sm:max-w-[78%] px-4 py-3 text-[0.95rem] leading-relaxed whitespace-pre-line ${
          esAgente
            ? 'bg-brand-700 text-white rounded-2xl rounded-br-sm'
            : 'bg-ink-100 text-ink-800 rounded-2xl rounded-bl-sm'
        }`}
      >
        {turno.texto}
      </p>
    </li>
  )
}

const Hilo: React.FC<{ conv: Conversacion }> = ({ conv }) => {
  const ref = useRef<HTMLDivElement>(null)
  const total = conv.turnos.length
  /* `armado` es lo que autoriza a esconder los mensajes. Sin él,
     el hilo se ve entero: la conversación nunca depende de que
     una animación funcione. */
  const [armado, setArmado] = useState(false)
  const [mostrados, setMostrados] = useState(total)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const temporizadores: number[] = []
    let disparado = false

    const reproducir = () => {
      if (disparado) return
      disparado = true
      obs.disconnect()
      window.clearTimeout(seguro)
      conv.turnos.forEach((_, i) => {
        temporizadores.push(
          window.setTimeout(() => setMostrados(i + 1), i * 700)
        )
      })
    }

    /* Red de seguridad: si el observador no llega a disparar en
       cinco segundos (pestaña en segundo plano, navegador raro),
       se enseña la conversación entera y se acabó. */
    const seguro = window.setTimeout(() => {
      disparado = true
      obs.disconnect()
      setMostrados(total)
    }, 5000)

    const obs = new IntersectionObserver(
      ([entrada]) => entrada.isIntersecting && reproducir(),
      { threshold: 0.15 }
    )

    setArmado(true)
    setMostrados(0)
    obs.observe(el)

    return () => {
      obs.disconnect()
      window.clearTimeout(seguro)
      temporizadores.forEach(window.clearTimeout)
    }
  }, [conv.turnos, total])

  return (
    <article
      ref={ref}
      className={`bg-white border-2 border-ink-200 flex flex-col shadow-plate ${
        armado ? 'hilo-armado' : ''
      }`}
    >
      {/* Rótulo del hilo */}
      <header className="border-b-2 border-ink-200">
        <div className="flex items-stretch">
          <span className="engraved flex items-center px-4 py-2.5 text-xs font-bold bg-ink-100 text-ink-700">
            {conv.sector}
          </span>
          <span className="engraved flex items-center px-4 py-2.5 text-xs font-bold text-ink-600">
            {conv.canal}
          </span>
        </div>
        <div className="px-5 sm:px-6 py-5">
          <h3 className="plate-type font-black text-xl sm:text-2xl text-ink-900">
            {conv.demuestra}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-ink-600">
            Agente de {conv.cliente}
          </p>
        </div>
      </header>

      {/* El hilo */}
      <ul className="p-5 sm:p-6 space-y-3 flex-1">
        {conv.turnos.map((turno, i) => (
          <Burbuja
            key={i}
            turno={turno}
            visible={i < mostrados}
            retardo={0}
          />
        ))}
      </ul>

      {/* Honestidad sobre el material.
          En cuanto se peguen las conversaciones reales
          anonimizadas y se ponga `reconstruida: false`, esta
          nota cambia sola. */}
      <footer className="px-5 sm:px-6 py-4 border-t border-ink-200">
        <p className="text-xs text-ink-600 leading-relaxed max-w-[68ch]">
          {conv.reconstruida ? (
            <>
              <strong className="font-bold text-ink-800">
                Conversación reconstruida.
              </strong>{' '}
              Reproduce lo que hace el agente que tiene {conv.cliente} en
              producción, pero no es una transcripción literal.
            </>
          ) : (
            <>
              <strong className="font-bold text-ink-800">
                Conversación real
              </strong>{' '}
              del agente de {conv.cliente}, con los datos personales
              cambiados.
            </>
          )}
        </p>
      </footer>
    </article>
  )
}

const Agente: React.FC = () => (
  <section id="agente" className="bg-paper-100 py-24 md:py-32">
    <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
        <h2 className="plate-type font-black text-ink-900 text-4xl sm:text-5xl lg:text-6xl max-w-[17ch]">
          Así atiende la máquina cuando tú no estás
        </h2>
        <p className="text-ink-700 leading-relaxed max-w-[42ch] text-lg">
          Dos agentes que están contestando ahora mismo, cada uno en el canal
          donde su cliente ya escribe. Ninguno de estos mensajes lo toca una
          persona.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {conversaciones.map((conv) => (
          <Hilo key={conv.id} conv={conv} />
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5">
        <a
          href={whatsappHref(waMessages.service('Agentes de IA'))}
          target="_blank"
          rel="noopener noreferrer"
          className="engraved inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 bg-brand-700 text-white text-sm font-black hover:bg-brand-800 transition-colors shadow-plate"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          Quiero uno para mi negocio
        </a>
        <p className="text-ink-700 max-w-[38ch]">
          Te montamos uno con tu carta, tu catálogo o tus pisos dentro.
        </p>
      </div>
    </div>
  </section>
)

export default Agente
