import { Mail, Phone, MapPin } from 'lucide-react'
import { contact, whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · CIERRE
   ------------------------------------------------------------
   Se mantiene la decisión que ya estaba tomada y que era la
   correcta: no hay formulario. El anterior hacía preventDefault
   y enseñaba un tick verde sin enviar nada, así que todo lead
   que lo rellenó se perdió en silencio y encima se fue creyendo
   que no le habíamos contestado.

   Lo que cambia es el peso. Antes esto era un párrafo centrado
   con un botón. Ahora es el muelle de carga: la última bahía,
   con la acción a tamaño de puerta. Y las tres vías
   alternativas dejan de ser tres tarjetas con iconito en
   cuadradito redondeado para ser tres líneas de placa.
   ============================================================ */

const vias = [
  {
    icono: Phone,
    etiqueta: 'Teléfono',
    valor: contact.phoneDisplay,
    href: `tel:${contact.phoneDisplay.replace(/\s/g, '')}`,
  },
  {
    icono: Mail,
    etiqueta: 'Correo',
    valor: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icono: MapPin,
    etiqueta: 'Dónde estamos',
    valor: contact.addressLine,
    href: null,
  },
]

const Contact: React.FC = () => (
  <section id="contacto" className="relative bg-paper-100 py-24 md:py-32 overflow-hidden">
    <div
      aria-hidden="true"
      className="absolute right-0 top-[22%] h-1.5 w-[34vw] bg-brand-700"
    />

    <div className="relative max-w-[92rem] mx-auto px-5 sm:px-8">
      <h2 className="plate-type font-black text-ink-900 text-[2.75rem] sm:text-6xl lg:text-7xl leading-[0.92] max-w-[16ch]">
        Cuéntanos qué te come el día
      </h2>

      <p className="mt-8 text-lg sm:text-xl text-ink-700 leading-relaxed max-w-[52ch]">
        Escríbenos por WhatsApp y te decimos en la misma conversación si
        podemos ayudarte, cómo y cuánto cuesta. Sin formularios, sin
        compromiso y sin marearte con tecnicismos. Solemos contestar el mismo
        día.
      </p>

      <a
        href={whatsappHref(waMessages.budget)}
        target="_blank"
        rel="noopener noreferrer"
        className="engraved mt-12 inline-flex items-center justify-center gap-4 w-full sm:w-auto min-h-[72px] px-10 bg-brand-700 text-white text-base sm:text-lg font-black hover:bg-brand-800 transition-colors shadow-plate"
      >
        <WhatsAppIcon className="w-6 h-6 shrink-0" />
        Abrir WhatsApp
      </a>

      <dl className="mt-16 border-t-2 border-ink-200 grid sm:grid-cols-3">
        {vias.map(({ icono: Icono, etiqueta, valor, href }) => {
          const contenido = (
            <>
              <dt className="engraved flex items-center gap-2.5 text-xs font-bold text-ink-600">
                <Icono className="w-4 h-4 shrink-0" />
                {etiqueta}
              </dt>
              <dd className="mt-2 text-ink-800 font-semibold break-words">
                {valor}
              </dd>
            </>
          )

          return href ? (
            <a
              key={etiqueta}
              href={href}
              className="py-6 sm:px-6 sm:first:pl-0 border-b sm:border-b-0 sm:border-l first:border-l-0 border-ink-200 hover:bg-paper-100 transition-colors"
            >
              {contenido}
            </a>
          ) : (
            <div
              key={etiqueta}
              className="py-6 sm:px-6 sm:border-l border-ink-200"
            >
              {contenido}
            </div>
          )
        })}
      </dl>
    </div>
  </section>
)

export default Contact
