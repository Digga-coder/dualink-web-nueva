import { useState, useEffect } from 'react'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from './WhatsAppIcon'

/* Acción flotante. Aparece pasado el primer viewport: en la
   bahía de entrada sobra, porque el bloque naranja ya está
   ahí y este taparía la placa del 30%.

   Deja de ser un círculo verde con icono blanco (2.0:1 de
   contraste) y pasa a ser un bloque naranja con letra negra,
   que es la forma que tiene una acción en toda esta web. Con
   etiqueta: un círculo con un icono obliga a adivinar. */
const FloatingWhatsApp: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappHref(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      className={`engraved fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 min-h-[52px] px-5 bg-brand-700 text-white text-xs font-black shadow-plate transition-all duration-300 hover:bg-brand-800 ${
        show
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      Escríbenos
    </a>
  )
}

export default FloatingWhatsApp
