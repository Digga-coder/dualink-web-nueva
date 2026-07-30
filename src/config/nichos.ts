import { UtensilsCrossed, Home, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ============================================================
   DUALINK · NICHOS
   ------------------------------------------------------------
   Una landing por sector. La página madre le habla a "pymes",
   que no es nadie; estas le hablan a un hostelero, a un
   inmobiliario y a un transportista, cada uno con su dolor y
   con la prueba de SU sector arriba del todo.

   Para qué sirven de verdad: para mandar tráfico dirigido.
   Un anuncio o un mensaje a un hostelero lleva a /#/hosteleria
   y lo primero que ve es un agente cogiendo comandas, no un
   catálogo de siete servicios.

   REGLA QUE NO SE SALTA: cada nicho tiene que apoyarse en un
   cliente REAL de ese sector. Sin caso, no hay landing. Por eso
   hay tres y no siete: hostelería (Smash Gorry, Frecuenzy),
   inmobiliaria (Three) y logística (JMV). Cuando haya un cliente
   de construcción entregado, se añade el cuarto.

   Cada landing manda su propio mensaje de WhatsApp, así que en
   cuanto entre un lead ya sabéis de qué sector viene sin
   preguntarlo.
   ============================================================ */

export type Nicho = {
  slug: string
  icono: LucideIcon
  /* Nombre del sector, para menús y rótulos */
  sector: string
  /* Titular. Su dolor, en sus palabras, no en las nuestras. */
  titular: string
  entradilla: string
  /* id de la conversación en conversaciones.ts que se enseña
     primero. Es la prueba del sector.

     Se deja vacío cuando ese sector todavía no tiene un agente
     conversacional que enseñar. NO se pone la de otro sector
     para rellenar: a un transportista no le prueba nada ver a
     un agente cogiendo hamburguesas, y el visitante nota
     enseguida cuándo le están enseñando algo que no es lo suyo. */
  conversacion?: string
  /* Clientes de config interno de Cases que pertenecen al sector */
  clientes: string[]
  /* Tres cosas concretas que el agente hace en ESE sector */
  hace: string[]
  /* La objeción propia del gremio */
  objecion: { p: string; r: string }
  mensajeWa: string
}

export const nichos: Nicho[] = [
  {
    slug: 'hosteleria',
    icono: UtensilsCrossed,
    sector: 'Hostelería',
    titular: 'Deja de coger comandas por WhatsApp mientras se te quema la plancha',
    entradilla:
      'Los pedidos entran por mensajes sueltos, alguien tiene que estar pendiente del móvil y en hora punta se lía. Montamos un agente que coge la comanda, la confirma y la manda a cocina sin que nadie suelte lo que está haciendo.',
    conversacion: 'comanda',
    clientes: ['Smash Gorry', 'Frecuenzy'],
    hace: [
      'Coge el pedido aunque se escriba con prisa y con erratas',
      'Ofrece entrante y postre en cada pedido, sin olvidarse nunca',
      'Cierra la comanda con número, importe y hora de recogida',
    ],
    objecion: {
      p: '¿Y si el cliente pide algo raro o se lía?',
      r: 'El agente pregunta hasta que lo tiene claro, igual que haríais vosotros. Y cuando algo se le escapa, no inventa: lo pasa a una persona. Lo que se acaba es tener a alguien pegado al móvil toda la noche, no el trato.',
    },
    mensajeWa:
      'Hola, tengo un negocio de hostelería y he visto vuestro agente que coge comandas. ¿Cómo funcionaría con mi carta?',
  },
  {
    slug: 'inmobiliaria',
    icono: Home,
    sector: 'Inmobiliaria',
    titular: 'Que no te llegue un solo contacto que no pueda comprar',
    entradilla:
      'Las horas se van filtrando curiosos, repitiendo las mismas respuestas sobre los mismos pisos y cuadrando visitas una a una. Montamos un agente que pregunta, descarta a quien no encaja y agenda solo a quien puede firmar.',
    conversacion: 'lead',
    clientes: ['Three Inmobiliaria'],
    hace: [
      'Responde dudas de cada propiedad con tus fichas dentro',
      'Pregunta por la financiación antes de gastar tiempo de nadie',
      'Agenda la visita en el calendario del agente que toque',
    ],
    objecion: {
      p: '¿No se va a notar que es un robot y voy a perder al cliente?',
      r: 'Se nota que responde al instante, que es lo que la gente quiere a las once de la noche. Y quien va en serio agradece que le pregunten por el presupuesto antes de hacerle perder una tarde. El que se va porque le contestan rápido no iba a comprar.',
    },
    mensajeWa:
      'Hola, soy de una inmobiliaria y he visto el agente que cualifica compradores por WhatsApp. ¿Me contáis cómo va?',
  },
  {
    slug: 'logistica',
    icono: Truck,
    sector: 'Logística y almacén',
    titular: 'Saca el almacén de las hojas de cálculo',
    entradilla:
      'El stock se lleva a mano, cada error se paga con una entrega mal servida y nadie sabe qué hay hasta que va a mirarlo. Montamos el sistema que lo centraliza, avisa solo cuando algo baja y lo deja consultable desde el móvil.',
    clientes: ['JMV Logística'],
    hace: [
      'Stock en tiempo real, con avisos automáticos cuando algo falta',
      'Consultas desde el móvil, sin abrir el ordenador de la oficina',
      'Conectado con lo que ya usáis, sin cambiar de herramientas',
    ],
    objecion: {
      p: 'Llevamos años con nuestras hojas. ¿Hay que empezar de cero?',
      r: 'No. Se migra lo que tenéis, con vuestras referencias y vuestros nombres de siempre. El objetivo es que el almacén se maneje igual que ahora pero sin que dependa de que alguien se acuerde de apuntarlo.',
    },
    mensajeWa:
      'Hola, tengo un almacén y llevo el stock a mano. He visto el caso de JMV Logística y me interesa.',
  },
]

export const nichoPorSlug = (slug: string) =>
  nichos.find((n) => n.slug === slug) || null
