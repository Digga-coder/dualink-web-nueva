import { useState, useEffect } from 'react'

/* ============================================================
   Enrutado mínimo por hash.
   ------------------------------------------------------------
   Los textos legales necesitan URL propia y enlazable. La web se
   sirve desde GitHub Pages, que es hosting estático: no hay
   servidor que reescriba /aviso-legal hacia index.html, así que
   una ruta "normal" daría 404 al recargar o al abrir el enlace
   directo. El hash lo resuelve sin trucos y sin dependencias:
   son ~20 líneas frente a los ~15 kB de react-router.

   Rutas: #/aviso-legal, #/privacidad, #/cookies. Cualquier otra
   cosa (incluidos los anclajes #servicios, #contacto...) cae en
   la home, que es el comportamiento deseado.
   ============================================================ */

export type Route = 'home' | 'aviso-legal' | 'privacidad' | 'cookies'

const RUTAS_LEGALES: Route[] = ['aviso-legal', 'privacidad', 'cookies']

function leerRuta(): Route {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace(/^#\/?/, '')
  return (RUTAS_LEGALES as string[]).includes(hash) ? (hash as Route) : 'home'
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(leerRuta)

  useEffect(() => {
    const onChange = () => {
      const siguiente = leerRuta()
      setRoute(siguiente)
      /* Al entrar en un texto legal se sube arriba. Sin esto, se
         abriría a la altura a la que estuviera el scroll. Los
         anclajes de la home no se tocan: los gestiona el
         navegador. */
      if (siguiente !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
