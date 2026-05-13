import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío real
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contacto" className="py-32 md:py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">
                Contacto
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink mb-6 leading-tight">
                Hablemos de tu<br />próximo proyecto
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-12 max-w-md">
                Cuéntanos qué necesitas. Te respondemos en menos de 24 horas con una propuesta clara y sin compromiso.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted block">Email</span>
                  <span className="text-ink font-medium">hola@dualink.es</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted block">Teléfono</span>
                  <span className="text-ink font-medium">+34 600 000 000</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted block">Ubicación</span>
                  <span className="text-ink font-medium">España · Trabajamos remoto</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="bg-brand-50 rounded-3xl p-12 text-center border border-brand-100">
                <CheckCircle className="w-16 h-16 text-brand-600 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold text-ink mb-3">
                  Mensaje enviado
                </h3>
                <p className="text-muted">
                  Gracias por contactar con nosotros. Te responderemos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Nombre *</label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-ink placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-ink placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Empresa</label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-ink placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Servicio de interés</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-ink focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all appearance-none"
                      >
                        <option value="">Selecciona uno</option>
                        <option value="software">Software a Medida</option>
                        <option value="redes">Redes y Conectividad</option>
                        <option value="automatizacion">Automatización Inteligente</option>
                        <option value="datos">Organización de Datos</option>
                        <option value="multimedia">Diseño y Multimedia</option>
                        <option value="otro">Otro / No lo tengo claro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Cuéntanos qué necesitas *</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-ink placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all resize-none"
                      placeholder="Describe brevemente tu proyecto o problema..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all duration-300 shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </button>

                  <p className="text-xs text-muted text-center">
                    Al enviar este formulario aceptas nuestra política de privacidad. No compartimos tus datos con terceros.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
