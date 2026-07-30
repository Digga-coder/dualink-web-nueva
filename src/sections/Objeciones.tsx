import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · LO QUE NOS PREGUNTAN SIEMPRE
   ------------------------------------------------------------
   La web contaba lo que hacemos y enseñaba que funciona, pero
   no respondía a lo que el visitante se está preguntando de
   verdad mientras lee. Y esas preguntas no las hace: se va con
   ellas puestas.

   Aquí están las cuatro que se repiten en cada primera llamada.
   Ninguna respuesta inventa nada:

   · El tamaño se responde con los clientes que ya hay. Una
     hamburguesería y un bar de noche no son empresas grandes.
   · El riesgo se responde con el 30% retenido, que ya es la
     tesis de la web.
   · La dificultad se responde con dónde vive el agente: en
     WhatsApp y en Telegram, que el cliente ya usa.
   · El precio se responde con el proceso, no con una cifra.
     No hay tarifa publicada y ponerla inventada sería peor
     que no responder.

   NO ESTÁN AQUÍ, Y ES A PROPÓSITO: cuánto se tarda en montar
   uno, qué pasa con los datos de los clientes y qué ocurre si
   el cliente quiere marcharse. Son tres preguntas que también
   se hacen, pero sus respuestas no están en ningún sitio del
   repositorio y no me las voy a inventar. Cuando las tengáis,
   se añaden aquí y esta sección gana bastante.

   FORMA: lista con separadores, no rejilla de tarjetas. Cuatro
   tarjetas iguales harían que las cuatro preguntas pesaran lo
   mismo, y no pesan lo mismo: la del precio es la que frena.
   ============================================================ */

const preguntas = [
  {
    p: '¿Esto no es para empresas grandes?',
    r: 'Nuestros clientes son una hamburguesería, un bar de noche, una empresa de transporte, una inmobiliaria y una empresa de aislamientos. Ninguna tiene departamento de informática. Si tu negocio pierde horas repitiendo lo mismo, tienes el tamaño suficiente.',
  },
  {
    p: '¿Y si me gasto el dinero y no funciona?',
    r: 'Por eso dejamos alrededor de un 30% sin cobrar hasta el final. Lo ves funcionando con tus cosas dentro —tu carta, tus pisos, tu stock— y entonces pagas el último tramo. Si no llega a funcionar, ese tramo no se paga.',
    ancla: '#pago',
    anclaTexto: 'Cómo funciona el pago por fases',
  },
  {
    p: 'Yo de tecnología no entiendo. ¿Me va a dar más trabajo?',
    r: 'No tienes que aprender ningún programa. El agente vive dentro de WhatsApp o de Telegram, que es donde tu cliente ya te escribe. Tú sigues mirando el móvil igual; lo que cambia es que ya no tienes que contestar tú todo.',
  },
  {
    p: '¿Cuánto cuesta?',
    r: 'Depende de lo que haya que montar, y no tenemos tarifa cerrada porque no montamos dos cosas iguales. Lo que sí hacemos es decírtelo en la primera conversación, con el precio y el plazo por escrito antes de empezar. Preguntar no cuesta nada y no compromete a nada.',
    destacada: true,
  },
]

const Objeciones: React.FC = () => (
  <section id="dudas" className="bg-paper-50 py-24 md:py-32">
    <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
      <h2 className="plate-type font-black text-ink-900 text-4xl sm:text-5xl lg:text-6xl max-w-[16ch]">
        Lo que nos preguntáis siempre
      </h2>

      <dl className="mt-14 border-t-2 border-ink-200">
        {preguntas.map((item) => (
          <div
            key={item.p}
            className={`grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-3 lg:gap-12 py-9 border-b-2 border-ink-200 ${
              item.destacada ? 'bg-brand-50 -mx-5 sm:-mx-8 px-5 sm:px-8' : ''
            }`}
          >
            <dt className="plate-type font-black text-xl sm:text-2xl text-ink-900">
              {item.p}
            </dt>
            <dd>
              <p className="text-lg text-ink-700 leading-relaxed max-w-[62ch]">
                {item.r}
              </p>
              {item.ancla && (
                <a
                  href={item.ancla}
                  className="inline-flex items-center min-h-[44px] mt-3 text-sm font-bold text-brand-700 underline underline-offset-4 hover:text-brand-800 transition-colors"
                >
                  {item.anclaTexto} →
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5">
        <a
          href={whatsappHref(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="engraved inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 bg-brand-700 text-white text-sm font-black hover:bg-brand-800 transition-colors shadow-plate"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          Preguntar lo mío
        </a>
        <p className="text-ink-700 max-w-[40ch]">
          Si tu duda no está aquí, es la que más nos interesa oír.
        </p>
      </div>
    </div>
  </section>
)

export default Objeciones
