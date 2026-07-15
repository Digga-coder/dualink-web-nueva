/* ============================================================
   DUALINK · DATOS FISCALES PARA LOS TEXTOS LEGALES
   ------------------------------------------------------------
   ⚠️ LEE ESTO ANTES DE PUBLICAR

   El artículo 10 de la LSSI-CE obliga a que un sitio web de una
   empresa española muestre de forma "permanente, fácil, directa
   y gratuita" su denominación social, NIF, domicilio y datos de
   inscripción en el Registro Mercantil.

   Los campos marcados con TODO son los únicos que faltan. NO los
   he inventado a propósito: un aviso legal con datos falsos no
   protege de nada y es peor que no tenerlo. Rellénalos y el
   aviso queda conforme.

   Ojo también: estos textos son una plantilla estándar basada en
   la LSSI y el RGPD, no asesoramiento jurídico. Si manejáis
   datos de clientes a través de los agentes de IA (y los
   manejáis), merece la pena que un asesor le eche un ojo.
   ============================================================ */

export const legal = {
  /* TODO: denominación social exacta tal y como figura en el CIF.
     Ej.: "Dualink Solutions S.L." */
  razonSocial: '[PENDIENTE: denominación social]',

  /* TODO: NIF/CIF de la sociedad. Ej.: "B12345678" */
  nif: '[PENDIENTE: NIF]',

  /* TODO: domicilio social completo (calle, número, CP, localidad).
     Acordado en reunión que sea la nave de Tudela. */
  domicilio: '[PENDIENTE: domicilio social completo] · Tudela, Navarra',

  /* TODO: datos registrales. Ej.: "Registro Mercantil de Navarra,
     Tomo X, Folio Y, Hoja NA-Z, Inscripción 1ª".
     Si sois autónomos y no S.L., pon `registro: null` y el aviso
     omitirá este apartado automáticamente. */
  registro: '[PENDIENTE: datos de inscripción en el Registro Mercantil]',

  /* Fecha de última actualización de los textos legales.
     Actualízala si cambias su contenido. */
  ultimaActualizacion: '15 de julio de 2026',
} as const

/* Devuelve true si aún quedan campos sin rellenar: lo usa la web
   para avisar en pantalla en vez de fingir que el aviso es válido. */
export const legalIncompleto = () =>
  Object.values(legal).some((v) => typeof v === 'string' && v.includes('[PENDIENTE'))
