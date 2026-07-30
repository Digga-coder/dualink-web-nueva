import { ArrowLeft } from 'lucide-react'
import type { Nicho } from '../config/nichos'
import { conversaciones } from '../config/conversaciones'
import { contact, whatsappHref } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'
import Marca from '../components/Marca'
import { Hilo } from '../sections/Agente'
import Process from '../sections/Process'
import Footer from '../sections/Footer'

/* ============================================================
   DUALINK · LANDING DE NICHO
   ------------------------------------------------------------
   Misma web, mismo mundo visual, pero hablándole a UN gremio.

   El orden cambia respecto a la madre y cambia a propósito:
   aquí la prueba del sector va inmediatamente después del
   titular. Quien llega a /#/hosteleria ya sabe lo que quiere;
   no hay que convencerle de que existe la automatización, hay
   que enseñarle que funciona en una cocina.

   Se reutiliza el bloque del pago por fases tal cual: el 30%
   retenido vale igual para todos los sectores y mantenerlo en
   un solo sitio evita que las versiones se separen.

   Cada landing lleva su propio mensaje de WhatsApp, así que el
   lead llega ya etiquetado por sector sin preguntar nada.
   ============================================================ */

const NichoLanding: React.FC<{ nicho: Nicho }> = ({ nicho }) => {
  const Icono = nicho.icono
  const conv = nicho.conversacion
    ? conversaciones.find((c) => c.id === nicho.conversacion)
    : null
  const href = whatsappHref(nicho.mensajeWa)

  return (
    <div className="bg-paper-50">
      {/* Cabecera mínima: aquí no hay menú que distraiga. Solo
          la marca, la vuelta a la web y la acción. */}
      <header className="border-b border-ink-200 bg-paper/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[92rem] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* El sector va aquí, en la cabecera, y no encima del
              titular. Una etiqueta en mayúsculas sobre un titular
              es el antetítulo que se eliminó de toda la web: el
              titular se sostiene solo. Aquí, en cambio, es
              orientación — dice en qué página estás. */}
          <a href="#inicio" className="flex items-center gap-2.5 min-h-[44px]">
            <Marca className="w-8 h-8" />
            <span className="plate-type font-black text-lg text-ink-900">
              DUALINK
            </span>
            <span
              aria-hidden="true"
              className="hidden sm:block w-px h-5 bg-ink-300"
            />
            <span className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ink-600">
              <Icono className="w-4 h-4 shrink-0" strokeWidth={2.25} />
              {nicho.sector}
            </span>
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="engraved inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 bg-brand-700 text-white text-xs font-black hover:bg-brand-800 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Escríbenos</span>
          </a>
        </div>
      </header>

      {/* ===== TITULAR DEL GREMIO ===== */}
      <section id="inicio" className="relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden="true"
          className="absolute left-0 top-16 h-1.5 w-[38vw] bg-brand-700 lane lane-draw"
        />
        <div className="relative max-w-[92rem] mx-auto px-5 sm:px-8">
          <h1 className="plate-type font-black text-ink-900 text-[2.5rem] sm:text-6xl lg:text-[4rem] leading-[0.95] max-w-[18ch]">
            {nicho.titular}
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-ink-700 leading-relaxed max-w-[54ch]">
            {nicho.entradilla}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="engraved inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 bg-brand-700 text-white text-sm font-black hover:bg-brand-800 transition-colors shadow-plate"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Hablar por WhatsApp
            </a>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-3 max-w-4xl">
            {nicho.hace.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-2 w-3 h-[3px] bg-brand-700 shrink-0" />
                <span className="text-ink-700 leading-snug">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== LA PRUEBA DEL SECTOR ===== */}
      {conv ? (
        <section className="bg-paper-100 py-20 md:py-28">
          <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
            <h2 className="plate-type font-black text-ink-900 text-3xl sm:text-5xl max-w-[18ch] mb-12">
              Esto es de un cliente de tu gremio
            </h2>
            <div className="max-w-2xl">
              <Hilo conv={conv} />
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-paper-100 py-20 md:py-28">
          <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
            <h2 className="plate-type font-black text-ink-900 text-3xl sm:text-5xl max-w-[20ch]">
              Ya lo hemos montado en {nicho.clientes.join(' y ')}
            </h2>
            <p className="mt-6 text-lg text-ink-700 max-w-[54ch] leading-relaxed">
              Puedes ver qué les cambió, con nombre y sector, en la página
              principal. Y si quieres, te ponemos en contacto con ellos.
            </p>
            <a
              href="#inicio"
              className="inline-flex items-center min-h-[44px] mt-6 text-sm font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800"
            >
              Ver todos los casos →
            </a>
          </div>
        </section>
      )}

      {/* ===== LA OBJECIÓN DEL GREMIO ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] gap-6 lg:gap-14 items-start">
            <h2 className="plate-type font-black text-ink-900 text-2xl sm:text-3xl">
              {nicho.objecion.p}
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed max-w-[62ch]">
              {nicho.objecion.r}
            </p>
          </div>
        </div>
      </section>

      {/* El pago por fases, reutilizado tal cual de la madre */}
      <Process />

      {/* ===== CIERRE ===== */}
      <section className="bg-paper-100 py-20 md:py-28">
        <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
          <h2 className="plate-type font-black text-ink-900 text-[2.5rem] sm:text-5xl lg:text-6xl leading-[0.95] max-w-[16ch]">
            Cuéntanos cómo lo llevas ahora
          </h2>
          <p className="mt-7 text-lg sm:text-xl text-ink-700 leading-relaxed max-w-[52ch]">
            Nos dices cómo funciona hoy tu {nicho.sector.toLowerCase()} y te
            decimos en la misma conversación si podemos quitarte trabajo, cómo
            y cuánto cuesta. Sin formularios y sin compromiso.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="engraved mt-10 inline-flex items-center justify-center gap-4 w-full sm:w-auto min-h-[72px] px-10 bg-brand-700 text-white text-base sm:text-lg font-black hover:bg-brand-800 transition-colors shadow-plate"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            Abrir WhatsApp
          </a>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 text-ink-700">
            O llámanos:
            <a
              href={`tel:${contact.phoneDisplay.replace(/\s/g, '')}`}
              className="inline-flex items-center min-h-[44px] font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800"
            >
              {contact.phoneDisplay}
            </a>
          </p>

          <a
            href="#inicio"
            className="inline-flex items-center gap-2 min-h-[44px] mt-12 text-sm font-bold text-ink-600 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todo lo que hace Dualink
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default NichoLanding
