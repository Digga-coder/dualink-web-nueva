import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { contact, whatsappHref, waMessages } from '../config/site'
import WhatsAppIcon from '../components/WhatsAppIcon'

/* ============================================================
   DUALINK · CONTACTO
   ------------------------------------------------------------
   ⚠️ AQUÍ ESTABA EL AGUJERO PRINCIPAL DE LA WEB.

   El formulario anterior NO enviaba nada. Su handleSubmit hacía
   `e.preventDefault()` y `setSubmitted(true)`, con un comentario
   "// Aquí iría la lógica de envío real" — y acto seguido le
   enseñaba al visitante un tick verde y "Mensaje enviado. Te
   responderemos en menos de 24 horas".

   Es decir: todo lead que rellenó ese formulario se perdió en
   silencio, y la persona se fue creyendo que había escrito y que
   no le contestamos. Peor que no tener formulario.

   Sustituido por WhatsApp, que además es el canal por el que ya
   se trabajan los leads. Sin backend que mantener y sin nada que
   pueda fallar en silencio: si el enlace se rompe, se ve.
   ============================================================ */

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Halo decorativo */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80vw] h-[40vw] max-w-[900px] rounded-full bg-brand-50/60 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
            Contacto
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-ink mb-6 leading-tight text-balance">
            Cuéntanos tu problema.<br />
            <span className="text-brand-600">Nosotros diseñamos la solución.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Escríbenos por WhatsApp y te decimos en la misma conversación si
            podemos ayudarte, cómo y cuánto cuesta. Sin formularios, sin
            compromiso y sin marearte con tecnicismos.
          </p>
        </motion.div>

        {/* ===== ACCIÓN PRINCIPAL ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={whatsappHref(waMessages.budget)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white text-lg font-semibold rounded-2xl hover:bg-[#1eb855] transition-all duration-300 shadow-xl shadow-[#25D366]/25 hover:shadow-2xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            Pedir presupuesto por WhatsApp
          </a>

          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Clock className="w-4 h-4 shrink-0" />
            Solemos responder el mismo día
          </span>
        </motion.div>

        {/* ===== VÍAS ALTERNATIVAS =====
            Para quien no use WhatsApp. Todo enlazado de verdad:
            los datos salen de config/site.ts. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-12 border-t border-slate-100"
        >
          <a
            href={`mailto:${contact.email}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted">Email</span>
            <span className="text-ink font-medium break-all">{contact.email}</span>
          </a>

          <a
            href={`tel:${contact.phoneDisplay.replace(/\s/g, '')}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted">Teléfono</span>
            <span className="text-ink font-medium">{contact.phoneDisplay}</span>
          </a>

          <div className="flex flex-col items-center gap-3 p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted">Dónde estamos</span>
            <span className="text-ink font-medium">{contact.addressLine}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
