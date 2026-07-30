import { ArrowDown } from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { whatsappHref, waMessages } from '../config/site'

/* ============================================================
   DUALINK · BAHÍA DE ENTRADA
   ------------------------------------------------------------
   Lo que se ha quitado y por qué:

   1. El clip 3D del logo. Arrastraba three.js + fiber + drei —
      cerca de 1 MB — para poner una figura girando de adorno
      detrás del texto, y encima había que taparlo con un velo
      blanco para que el titular se leyera. Un adorno que hay
      que tapar no es un adorno: es un obstáculo. Fuera, y con
      él tres dependencias enteras.

   2. El antetítulo ("AGENTES DE IA · AUTOMATIZACIÓN · SOFTWARE
      A MEDIDA" en mayúsculas dentro de una píldora de cristal).
      Había uno encima de CADA titular de la web — siete en
      total. El titular se sostiene solo.

   Lo que entra: la placa del 30%. Es el argumento más fuerte
   del discurso comercial y estaba enterrado a dos tercios de
   la página. Ahora se ve sin scrollear, que es donde se decide
   si esta gente es de fiar.
   ============================================================ */

const Hero: React.FC = () => (
  <section
    id="inicio"
    className="relative min-h-[100svh] flex items-center bg-paper-50 overflow-hidden pt-24 pb-16"
  >
    {/* Calle pintada: entra por el borde izquierdo y marca la
        altura del titular. Se dibuja una vez y se queda. */}
    <div
      aria-hidden="true"
      className="absolute left-0 top-[38%] h-1.5 w-[42vw] bg-brand-700 lane lane-draw"
    />

    <div className="relative z-10 w-full max-w-[92rem] mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-12 lg:gap-16 items-end">
        <div>
          <h1 className="plate-type font-black text-ink-900 text-[2.6rem] sm:text-6xl lg:text-[4.25rem] leading-[0.95] max-w-[16ch]">
            El trabajo que te come el día lo puede hacer una máquina
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-ink-700 leading-relaxed max-w-[52ch]">
            Montamos agentes que atienden a tus clientes por WhatsApp,
            programas que sustituyen tus hojas de cálculo y automatismos que
            hacen solos lo que hoy haces a mano. Te lo explicamos sin
            tecnicismos y lo ves funcionando antes de pagarlo entero.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappHref(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="engraved inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 bg-brand-700 text-white text-sm font-black hover:bg-brand-800 transition-colors shadow-plate"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Cuéntanos tu problema
            </a>
            <a
              href="#agente"
              className="engraved inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 border-2 border-ink-400 text-ink-800 text-sm font-black hover:border-brand-700 hover:text-brand-700 transition-colors"
            >
              Ver una atendiendo
              <ArrowDown className="w-4 h-4 shrink-0" />
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              'Agentes en producción 24/7',
              'Tudela, Navarra',
              'Sin formularios: se habla y ya',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm font-semibold text-ink-700"
              >
                <span className="w-2 h-2 bg-brand-700 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ===== PLACA DE CARGA =====
            Grabada como la chapa de capacidad de una estantería:
            la cifra manda, la explicación va debajo en pequeño. */}
        <aside className="bg-white border-2 border-ink-300 shadow-plate">
          <div className="engraved text-xs font-bold text-white bg-brand-700 px-4 py-2">
            Condición de pago
          </div>
          <div className="p-6">
            <div className="flex items-baseline gap-2">
              <span className="plate-type font-black text-6xl text-ink-900 tabular-nums">
                30
              </span>
              <span className="plate-type font-black text-3xl text-brand-700">%</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink-700 leading-snug">
              sin cobrar hasta que
              <br />
              lo veas funcionando
            </p>
            <hr className="my-5 border-ink-300" />
            <p className="text-sm text-ink-700 leading-relaxed">
              Lo normal en el sector es cobrar el 100% antes de empezar.
              Nosotros partimos el proyecto en fases y dejamos el tramo final
              sin pagar.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
)

export default Hero
