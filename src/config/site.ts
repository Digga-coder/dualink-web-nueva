/* ============================================================
   DUALINK · CONFIGURACIÓN DEL SITIO
   ------------------------------------------------------------
   TODOS los datos de contacto viven aquí y en ningún otro sitio.
   Si cambia el teléfono, se cambia una vez y se actualiza en la
   web entera: los 13 botones de WhatsApp, el enlace tel:, el
   pie y los datos estructurados.

   Esto existe porque la versión anterior tenía el teléfono y el
   correo escritos a mano dentro de los componentes — y estaban
   inventados ("+34 600 000 000", "hola@dualink.es"), sin que
   nadie se diera cuenta de que la web pedía contacto por vías
   que no existían.
   ============================================================ */

import { refVisita } from '../lib/tracking'

export const site = {
  name: 'Dualink Solutions',
  shortName: 'DUALINK',
  url: 'https://www.dualinksolutions.com',
} as const

export const contact = {
  /* Formato internacional, sin "+", espacios ni guiones: es lo
     que exige wa.me. Destino de TODOS los botones de la web. */
  whatsapp: '34692918737',

  /* El mismo número, formateado para leerlo en pantalla. */
  phoneDisplay: '+34 692 91 87 37',

  /* Ojo al dominio: es "solutions" en plural, igual que la web.
     El singular (dualinksolution.com) NO es vuestro: cualquier
     correo enviado ahí rebotaría. */
  email: 'info@dualinksolutions.com',

  /* TODO (no bloqueante): dirección exacta de la nave de Tudela
     (calle y número). Acordado en reunión que la nave pasa a ser
     la dirección fiscal. Hasta entonces se muestra la localidad. */
  addressLine: 'Tudela, Navarra',
  addressRegion: 'Navarra, España',
} as const

/* Enlace a WhatsApp con el mensaje prerrellenado.

   Al final del mensaje se cuela la referencia de la visita
   —"(ref: DL-7F3K2)"— para que, cuando la persona pulse enviar,
   podáis unir esa conversación con lo que había leído en la web
   antes de decidirse. Ver src/lib/tracking.ts.

   Va entre paréntesis y en una línea aparte para que se lea como
   lo que es: una referencia, no un texto raro que la persona
   tenga que entender. Nadie borra un "(ref: ...)" antes de dar a
   enviar, y si lo borra tampoco pasa nada. */
export const whatsappHref = (message: string) => {
  const texto = `${message}\n\n(ref: ${refVisita})`
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(texto)}`
}

/* Mensajes prerrellenados. Cada punto de entrada manda un texto
   distinto para que sepáis de qué parte de la web viene el lead
   sin tener que preguntarlo. */
export const waMessages = {
  general: 'Hola, he visto la web de Dualink y me gustaría que me contarais qué podéis hacer por mi negocio.',
  nav: 'Hola, vengo de la web de Dualink y quiero información.',
  service: (serviceTitle: string) =>
    `Hola, he visto en vuestra web el servicio de "${serviceTitle}" y me interesa. ¿Me contáis cómo funciona?`,
  budget: 'Hola, me gustaría pedir un presupuesto sin compromiso.',
} as const
