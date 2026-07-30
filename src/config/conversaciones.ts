/* ============================================================
   DUALINK · CONVERSACIONES DE AGENTE
   ------------------------------------------------------------
   Lo más importante de la web. Un visitante no quiere leer que
   "automatizamos la atención al cliente": quiere VER a la
   máquina cogiendo un pedido sin equivocarse. Es lo único que
   un competidor no puede copiar, porque para copiarlo tendría
   que tener agentes funcionando.

   ── Smash Gorry: CONVERSACIÓN REAL ──────────────────────────
   Transcrita del bot @smashgorrybot en Telegram. Se ha quitado:
   el nombre y la foto de quien escribe, la hora de cada mensaje
   y el enlace de sesión de la webapp (lleva un session_id). No
   se ha cambiado ni una palabra de lo que dicen agente y
   cliente.

   El turno que más vende es el tercero. El cliente escribe
   "queria peir 3 by gorry" —con la errata— y el agente lo
   entiende igual. Eso es lo que distingue a un agente de un
   menú de botones, y es la razón de que esta conversación esté
   en la web y no un texto explicando lo que hace.

   ── Three Inmobiliaria: TODAVÍA RECONSTRUIDA ────────────────
   Escrita a partir de lo que hace el agente real, pero no es
   una transcripción. La web lo dice en pantalla mientras
   `reconstruida` siga en true. Para sustituirla: pega la
   conversación real anonimizada y pon `reconstruida: false`.
   El cartel cambia solo.
   ============================================================ */

export type Turno =
  | { de: 'cliente'; texto: string }
  | { de: 'agente'; texto: string }
  | { de: 'sistema'; texto: string }
  /* El resguardo de pedido que suelta el agente al cerrar.
     Va aparte porque tiene estructura propia — número, líneas,
     total, hora — y merece leerse como un ticket, no como un
     párrafo. */
  | {
      de: 'pedido'
      referencia: string
      lineas: string[]
      total: string
      recogida: string
      cierre: string
    }

export type Conversacion = {
  id: string
  canal: 'Telegram' | 'WhatsApp'
  cliente: string
  sector: string
  /* Qué se demuestra. Titular del bloque. */
  demuestra: string
  reconstruida: boolean
  turnos: Turno[]
}

export const conversaciones: Conversacion[] = [
  {
    id: 'comanda',
    canal: 'Telegram',
    cliente: 'Smash Gorry',
    sector: 'Hostelería',
    demuestra: 'Entiende el pedido aunque se escriba con prisa y erratas',
    reconstruida: false,
    turnos: [
      { de: 'cliente', texto: 'hola buenas noches' },
      {
        de: 'agente',
        texto: '¡Genial! ¿Cuál te apetece? Hoy tenemos: La Ahumadita 2.0, By Gorry.',
      },
      { de: 'cliente', texto: 'queria peir 3 by gorry' },
      {
        de: 'agente',
        texto:
          'Vale, 3 By Gorry sumadas. ¿Te pongo algún entrante? Tenemos Nachos BY:GORRY.',
      },
      { de: 'cliente', texto: 'no' },
      { de: 'agente', texto: '¿Quieres postre? Tenemos Tarta de tres leches.' },
      { de: 'cliente', texto: 'no gracias' },
      {
        de: 'pedido',
        referencia: '#WEB-202607302310-306',
        lineas: ['3 × By Gorry', '1 × Agua'],
        total: '36,00 €',
        recogida: '21:00',
        cierre: 'Ya está en cocina. ¡Nos vemos!',
      },
      { de: 'sistema', texto: 'Comanda en cocina · sin tocarla nadie' },
    ],
  },
  {
    id: 'lead',
    canal: 'WhatsApp',
    cliente: 'Three Inmobiliaria',
    sector: 'Inmobiliaria',
    demuestra: 'Descarta a quien no encaja y agenda al que sí',
    reconstruida: true,
    turnos: [
      {
        de: 'cliente',
        texto: 'Buenas, he visto el piso de la calle Yanguas. ¿Sigue disponible?',
      },
      {
        de: 'agente',
        texto:
          'Buenas. Sí, sigue disponible: 3 habitaciones, segunda planta con ascensor, 168.000 €. ¿Lo buscas para vivir o como inversión?',
      },
      { de: 'cliente', texto: 'Para vivir. Necesitaríamos hipoteca' },
      {
        de: 'agente',
        texto: '¿Tenéis ya la financiación aprobada o estáis empezando a mirarla?',
      },
      { de: 'cliente', texto: 'Aprobada, hasta 190.000' },
      {
        de: 'agente',
        texto:
          'Perfecto, entonces encaja. Te puedo agendar una visita: mañana a las 17:00 o el jueves a las 11:00. ¿Cuál te viene mejor?',
      },
      { de: 'sistema', texto: 'Lead cualificado · visita agendada' },
    ],
  },
]
