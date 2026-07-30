import { useEffect } from 'react'
import { evento, observarSecciones, medirSalida } from './tracking'

/* ============================================================
   DUALINK · ENGANCHE DE MEDICIÓN
   ------------------------------------------------------------
   Un solo sitio donde se enciende todo. Si algún día hay que
   quitar la medición, se borra la llamada a este hook y no
   queda ni rastro repartido por los componentes.

   Los clics de WhatsApp se capturan por delegación, con UN
   listener en el documento, en vez de tocar los doce enlaces
   uno a uno. Así el enlace número trece que alguien añada
   mañana ya queda medido sin acordarse de nada.
   ============================================================ */

export function useMedicion(): void {
  useEffect(() => {
    evento('llegada')

    const pararSecciones = observarSecciones()
    const pararSalida = medirSalida()

    /* Captura en fase de captura (`true`) para que el evento salga
       aunque algo más adelante detenga la propagación. */
    const alClic = (e: MouseEvent) => {
      const destino = e.target as HTMLElement | null
      const enlace = destino?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null
      if (!enlace) return

      const seccion = enlace.closest('section')?.id || 'cabecera-o-pie'
      evento('whatsapp_clic', {
        seccion,
        etiqueta: (enlace.innerText || '').trim().slice(0, 60),
      })
    }

    document.addEventListener('click', alClic, true)

    return () => {
      pararSecciones()
      pararSalida()
      document.removeEventListener('click', alClic, true)
    }
  }, [])
}
