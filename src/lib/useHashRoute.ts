import { useState, useEffect } from 'react'
import { nichos } from '../config/nichos'

/* ============================================================
   Enrutado mínimo por hash.
   ------------------------------------------------------------
   Los textos legales y las landings de nicho necesitan URL
   propia y enlazable. La web se sirve desde GitHub Pages, que es
   hosting estático: no hay servidor que reescriba /hosteleria
   hacia index.html, así que una ruta "normal" daría 404 al
   recargar o al abrir el enlace directo — y estas URLs se van a
   pegar en anuncios y en mensajes, donde un 404 es un lead
   perdido. El hash lo resuelve sin trucos y sin dependencias:
   son ~30 líneas frente a los ~15 kB de react-router.

   Rutas:
     #/aviso-legal · #/privacidad · #/cookies
     #/hosteleria · #/inmobiliaria · #/logistica

   Cualquier otra cosa (incluidos los anclajes #servicios,
   #contacto...) cae en la home, que es lo que se quiere.
   ============================================================ */

export type Route =
  | { tipo: 'home' }
  | { tipo: 'legal'; pagina: 'aviso-legal' | 'privacidad' | 'cookies' }
  | { tipo: 'nicho'; slug: string }

const RUTAS_LEGALES = ['aviso-legal', 'privacidad', 'cookies'] as const

function leerRuta(): Route {
  if (typeof window === 'undefined') return { tipo: 'home' }
  const hash = window.location.hash.replace(/^#\/?/, '')

  if ((RUTAS_LEGALES as readonly string[]).includes(hash)) {
    return { tipo: 'legal', pagina: hash as (typeof RUTAS_LEGALES)[number] }
  }
  if (nichos.some((n) => n.slug === hash)) {
    return { tipo: 'nicho', slug: hash }
  }
  return { tipo: 'home' }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(leerRuta)

  useEffect(() => {
    const onChange = () => {
      const siguiente = leerRuta()
      setRoute(siguiente)
      /* Al cambiar de página se sube arriba. Sin esto, se abriría
         a la altura a la que estuviera el scroll. Los anclajes de
         la home no se tocan: los gestiona el navegador. */
      if (siguiente.tipo !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
