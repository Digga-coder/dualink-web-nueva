import { ArrowLeft, AlertTriangle } from 'lucide-react'
import { legal, legalIncompleto } from '../config/legal'

/* Marco común de los textos legales: cabecera, botón de vuelta y
   tipografía legible. Se mantiene aparte de las secciones de
   venta porque aquí lo único que importa es que se lea. */
const LegalLayout: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <div className="min-h-screen bg-white">
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <a
        href="#inicio"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-600 transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la web
      </a>

      <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-ink mb-3">
        {titulo}
      </h1>
      <p className="text-sm text-muted mb-12">
        Última actualización: {legal.ultimaActualizacion}
      </p>

      {/* Aviso en pantalla mientras falten los datos fiscales.
          Es deliberado que se vea: un aviso legal incompleto no
          cumple la LSSI, y esconderlo sólo haría que se olvidara. */}
      {legalIncompleto() && (
        <div className="flex gap-3 p-5 mb-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong className="font-semibold">Documento pendiente de completar.</strong>{' '}
            Faltan los datos fiscales de la empresa (denominación social, NIF,
            domicilio y datos registrales). Hasta rellenarlos en{' '}
            <code className="px-1 py-0.5 rounded bg-amber-100 font-mono text-xs">
              src/config/legal.ts
            </code>{' '}
            este texto no cumple el artículo 10 de la LSSI-CE.
          </div>
        </div>
      )}

      <div className="prose-legal space-y-8 text-muted leading-relaxed">{children}</div>
    </div>
  </div>
)

export const Seccion: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <section className="space-y-3">
    <h2 className="text-xl md:text-2xl font-display font-bold text-ink">{titulo}</h2>
    {children}
  </section>
)

export const Dato: React.FC<{ etiqueta: string; valor: string }> = ({ etiqueta, valor }) => {
  const pendiente = valor.includes('[PENDIENTE')
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3 py-2 border-b border-slate-100 last:border-0">
      <dt className="font-medium text-ink sm:w-52 shrink-0">{etiqueta}</dt>
      <dd className={pendiente ? 'text-amber-700 font-medium' : ''}>{valor}</dd>
    </div>
  )
}

export default LegalLayout
