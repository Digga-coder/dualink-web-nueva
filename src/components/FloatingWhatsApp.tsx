import { useState, useEffect } from 'react'
import { whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from './WhatsAppIcon'

/* Botón flotante de contacto.
   Aparece al pasar el primer viewport: en el hero sobra (ya hay
   un CTA grande) y taparía el mensaje principal. A partir de
   ahí acompaña al visitante hasta el final, para que nunca esté
   a más de un toque de escribir. */
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
      aria-label="Hablar por WhatsApp"
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#1eb855] hover:scale-105 active:scale-95 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  )
}

export default FloatingWhatsApp
