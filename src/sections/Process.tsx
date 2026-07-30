import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · CÓMO SE PAGA Y CÓMO SE TRABAJA
   ------------------------------------------------------------
   El 30% retenido deja de ser una caja al final de la sección
   de proceso y pasa a ser el bloque de color de toda la web.
   Es la única sección naranja a sangre, y va aquí a propósito:
   después de haber visto las máquinas funcionando y antes de
   pedir la conversación. Es el momento en que se responde a la
   pregunta que este visitante se está haciendo de verdad —
   "¿y si me la dan con queso?".

   Los cuatro pasos van sobre una calle pintada, no en cuatro
   tarjetas iguales. La secuencia importa (es lo que pasa, en
   orden), pero no necesita cuatro números gigantes de adorno:
   la calle ya dice que hay recorrido.

   Se conserva el arreglo de la versión anterior: el paso 01
   tenía caracteres chinos incrustados en mitad de una frase.
   ============================================================ */

const pasos = [
  {
    titulo: 'Nos cuentas tu problema',
    texto:
      'Una llamada o un café. Nos explicas qué te frustra del día a día: "pierdo el tiempo en emails", "no sé qué decisión tomar", "mi web no vende". Lo que sea.',
  },
  {
    titulo: 'Diseñamos la solución',
    texto:
      'Te presentamos un plan claro: qué vamos a hacer, cuánto cuesta y cuándo lo tendrás. Sin letra pequeña.',
  },
  {
    titulo: 'Construimos y lanzamos',
    texto:
      'Te enseñamos avances mientras va tomando forma. Cuando está listo, lo lanzamos juntos.',
  },
  {
    titulo: 'Te acompañamos después',
    texto:
      'Resolvemos dudas y hacemos ajustes. No desaparecemos al entregar.',
  },
]

const Process: React.FC = () => (
  <section id="pago">
    {/* ===== EL BLOQUE NARANJA ===== */}
    <div className="bg-brand-700 text-white">
      <div className="max-w-[92rem] mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">
          <div>
            <h2 className="plate-type font-black text-[2.75rem] sm:text-6xl lg:text-7xl leading-[0.92] max-w-[14ch]">
              Pagas por fases. Nunca todo por adelantado.
            </h2>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed max-w-[54ch]">
              Lo normal en las agencias es cobrarte el 100% antes de empezar.
              Nosotros partimos el proyecto en fases y dejamos alrededor de un
              30% sin cobrar hasta el final, para que veas aquello por lo que
              estás pagando antes de soltar el último euro. Preferimos que lo
              veas funcionando a contártelo.
            </p>
            <a
              href={whatsappHref(waMessages.budget)}
              target="_blank"
              rel="noopener noreferrer"
              className="engraved mt-10 inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 bg-white text-brand-700 text-sm font-black hover:bg-brand-50 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Pedir presupuesto
            </a>
          </div>

          {/* Barra de fases: lo pagado macizo, el tramo retenido
              rayado. Es la misma información que el texto, dicha
              con el material del mundo. */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="flex h-14 border-2 border-white">
              <div className="w-[70%] bg-white" />
              <div className="w-[30%] hazard-invert border-l-2 border-white" />
            </div>
            <div className="mt-3 flex justify-between engraved text-xs font-black">
              <span>70% por fases</span>
              <span>30% al verlo</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ===== LOS CUATRO PASOS ===== */}
    <div className="bg-paper-50 py-24 md:py-32">
      <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
        <h3 className="plate-type font-black text-ink-900 text-3xl sm:text-4xl max-w-[20ch]">
          De la primera llamada a la máquina puesta
        </h3>

        <ol className="mt-14 relative grid gap-10 md:grid-cols-4 md:gap-8">
          {/* La calle que une los cuatro puntos */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-0 right-0 top-[7px] h-1 bg-ink-100"
          />

          {pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative">
              <div
                aria-hidden="true"
                className={`w-4 h-4 mb-6 ${i === 0 ? 'bg-brand-700' : 'bg-ink-400'}`}
              />
              <h4 className="plate-type font-black text-xl text-ink-900">
                {paso.titulo}
              </h4>
              <p className="mt-3 text-ink-600 leading-relaxed">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
)

export default Process
