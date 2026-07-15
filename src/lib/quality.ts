/* ============================================================
   Detección de gama de dispositivo.
   ------------------------------------------------------------
   Vive en su propio módulo, separado de Logo3D, y esto es
   deliberado: Logo3D se carga de forma diferida (arrastra
   three.js, ~1 MB). Si esta función viviera allí, importarla
   obligaría a descargar todo three.js sólo para preguntar si el
   móvil es de gama baja — justo lo que queremos evitar.
   ============================================================ */

export type Quality = 'high' | 'low'

export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'high'
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low'
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.matchMedia('(max-width: 820px)').matches
    const cores = navigator.hardwareConcurrency ?? 8
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8
    if (coarse && narrow) return 'low'
    if (cores <= 4 || mem <= 4) return 'low'
  } catch {
    /* matchMedia no disponible: asumimos gama alta */
  }
  return 'high'
}
