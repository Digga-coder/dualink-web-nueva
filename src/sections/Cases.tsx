/* ============================================================
   DUALINK · LO QUE HAY FUNCIONANDO
   ------------------------------------------------------------
   Esta sección sube de la cuarta posición a la segunda. Antes
   el visitante tenía que atravesar una sección de valores
   genéricos ("Claridad · Compromiso · Calidad") y siete
   tarjetas de servicio antes de ver una sola prueba de que
   esta gente ha hecho algo alguna vez.

   Cambia también la forma. Eran cinco tarjetas idénticas con
   la plantilla de métrica: cifra grande, etiqueta pequeña,
   acento de color. Ahora son bahías de estantería rotuladas y
   NO tienen todas el mismo tamaño: los dos agentes que están
   atendiendo clientes ahora mismo ocupan bahía ancha, porque
   son la prueba que vende. El resto va en bahía normal.

   Thermocork lleva balizado amarillo-negro. Es el único que no
   está entregado — está en desarrollo — y decirlo cuesta menos
   que un cliente que se sienta engañado en la primera reunión.
   ============================================================ */

type Estado = 'produccion' | 'obra'

type Caso = {
  cliente: string
  sector: string
  ancha?: boolean
  estado: Estado
  problema: string
  maquina: string
  cifra: string
  cifraPie: string
}

const casos: Caso[] = [
  {
    cliente: 'Smash Gorry',
    sector: 'Hostelería',
    ancha: true,
    estado: 'produccion',
    problema:
      'Los pedidos llegaban por mensajes sueltos. Comandas confundidas, errores continuos y siempre alguien pendiente del móvil.',
    maquina:
      'Un agente en Telegram que entiende el pedido escrito como lo escribe el cliente, lo confirma y lo manda a cocina y a la base de datos sin que nadie toque nada.',
    cifra: '24/7',
    cifraPie: 'Pedidos atendidos sin intervención',
  },
  {
    cliente: 'Three Inmobiliaria',
    sector: 'Inmobiliaria',
    ancha: true,
    estado: 'produccion',
    problema:
      'El equipo se iba las horas filtrando contactos, repitiendo las mismas respuestas sobre pisos y cuadrando visitas una a una.',
    maquina:
      'Un embudo en WhatsApp que pregunta, descarta a quien no encaja, resuelve las dudas de cada propiedad y agenda la presentación por Zoom él solo.',
    cifra: 'Auto',
    cifraPie: 'Al equipo solo le llega quien interesa',
  },
  {
    cliente: 'JMV Logística',
    sector: 'Logística',
    estado: 'produccion',
    problema:
      'Llevaban el inventario a mano en hojas de cálculo. Errores constantes y tiempo perdido.',
    maquina:
      'Sistema de gestión centralizado con el stock en tiempo real y avisos automáticos.',
    cifra: '−70%',
    cifraPie: 'Tiempo de gestión',
  },
  {
    cliente: 'Frecuenzy',
    sector: 'Ocio nocturno',
    estado: 'produccion',
    problema:
      'Cobraban en barra sobre la marcha, sin control de las ventas ni de lo que hacía cada camarero.',
    maquina:
      'TPV propio en el móvil de cada camarero, con lógica de combinados, panel de ventas en directo y control de acceso. App instalable.',
    cifra: 'Directo',
    cifraPie: 'La dirección ve la barra al instante',
  },
  {
    cliente: 'Thermocork',
    sector: 'Construcción',
    estado: 'obra',
    problema:
      'La facturación crecía atada al papeleo de la dirección: cada pedido y cada trámite frenaba el escalado.',
    maquina:
      'Plan Director 2026: web con zona B2B, un agente que responde consultas con la documentación de la empresa dentro, y pedidos automatizados con trazabilidad.',
    cifra: '2026',
    cifraPie: 'En desarrollo, todavía no entregado',
  },
]

const Bahia: React.FC<{ caso: Caso }> = ({ caso }) => {
  const enObra = caso.estado === 'obra'

  return (
    <article
      className={`relative bg-white border-2 border-ink-200 flex flex-col ${
        caso.ancha ? 'lg:col-span-3' : 'lg:col-span-2'
      }`}
    >
      {/* Rótulo de bahía */}
      <div className="flex items-stretch border-b-2 border-ink-200">
        <span className="engraved flex items-center px-4 py-2.5 text-xs font-bold bg-ink-100 text-ink-700">
          {caso.sector}
        </span>
        <span className="engraved flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-ink-600">
          {enObra ? (
            <>
              <span className="w-2 h-2 bg-ink-500 shrink-0" />
              En obra
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-brand-700 shrink-0" />
              Funcionando
            </>
          )}
        </span>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3
          className={`plate-type font-black text-ink-900 ${
            caso.ancha ? 'text-4xl sm:text-5xl' : 'text-3xl'
          }`}
        >
          {caso.cliente}
        </h3>

        <p className="mt-5 text-ink-600 leading-relaxed">{caso.problema}</p>

        <p
          className={`mt-5 text-ink-800 leading-relaxed ${
            caso.ancha ? 'text-lg' : ''
          }`}
        >
          {caso.maquina}
        </p>

        <div className="mt-auto pt-8 flex items-end gap-5">
          <span className="plate-type font-black text-brand-700 text-4xl sm:text-5xl tabular-nums leading-none">
            {caso.cifra}
          </span>
          <span className="text-sm font-semibold text-ink-600 leading-snug pb-1.5">
            {caso.cifraPie}
          </span>
        </div>
      </div>

      {enObra && <div aria-hidden="true" className="h-2.5 hazard" />}
    </article>
  )
}

const Cases: React.FC = () => (
  <section id="funcionando" className="bg-paper-50 py-24 md:py-32">
    <div className="max-w-[92rem] mx-auto px-5 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <h2 className="plate-type font-black text-ink-900 text-4xl sm:text-5xl lg:text-6xl max-w-[18ch]">
          Esto ya está instalado y funcionando
        </h2>
        <p className="text-ink-600 leading-relaxed max-w-[38ch]">
          Cinco negocios de la zona. Cuatro con la máquina puesta y girando;
          uno todavía en obra, y lo decimos.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-6">
        {casos.map((caso) => (
          <Bahia key={caso.cliente} caso={caso} />
        ))}
      </div>
    </div>
  </section>
)

export default Cases
