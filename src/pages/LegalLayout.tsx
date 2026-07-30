import { ArrowLeft, AlertTriangle } from 'lucide-react'
import { legal, legalIncompleto } from '../config/legal'
import { contact } from '../config/site'

/* Marco común de los textos legales. Se mantiene aparte de las
   secciones de venta porque aquí lo único que importa es que se
   lea: medida de línea corta, cuerpo grande y contraste alto.

   El aviso de datos pendientes usa el amarillo de balizado, que
   en esta web significa exactamente eso en todas partes: esto
   está en obra. Es deliberado que se vea. */
const LegalLayout: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <div className="min-h-screen bg-paper-50">
    <div className="max-w-[46rem] mx-auto px-5 sm:px-8 py-16 md:py-24">
      <a
        href="#inicio"
        className="engraved inline-flex items-center gap-2 text-xs font-bold text-ink-600 hover:text-brand-700 transition-colors mb-12 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la web
      </a>

      <h1 className="plate-type font-black text-ink-900 text-4xl md:text-5xl">
        {titulo}
      </h1>
      <p className="mt-3 text-sm font-semibold text-ink-600">
        Última actualización: {legal.ultimaActualizacion}
      </p>

      {legalIncompleto() && (
        <div className="mt-10 border-2 border-ink-800 bg-white">
          <div aria-hidden="true" className="h-2.5 hazard" />
          <div className="flex gap-3 p-5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-ink-800" />
            <p className="text-sm text-ink-700 leading-relaxed">
              <strong className="font-bold text-ink-900">
                Documento en revisión.
              </strong>{' '}
              Estamos actualizando los datos registrales de esta página. Si
              necesitas cualquiera de ellos ahora mismo, escríbenos a{' '}
              <a
                href={`mailto:${contact.email}`}
                className="font-bold text-brand-700 underline underline-offset-2"
              >
                {contact.email}
              </a>{' '}
              y te los facilitamos.
            </p>
          </div>
        </div>
      )}

      <div className="mt-14 space-y-10 text-ink-700 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
)

export const Seccion: React.FC<{ titulo: string; children: React.ReactNode }> = ({
  titulo,
  children,
}) => (
  <section className="space-y-3">
    <h2 className="plate-type font-black text-xl md:text-2xl text-ink-900">
      {titulo}
    </h2>
    {children}
  </section>
)

export const Dato: React.FC<{ etiqueta: string; valor: string }> = ({
  etiqueta,
  valor,
}) => {
  const pendiente = valor.includes('[PENDIENTE')
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-ink-200 last:border-0">
      <dt className="engraved text-xs font-bold text-ink-600 sm:w-56 shrink-0 sm:pt-1">
        {etiqueta}
      </dt>
      <dd className={pendiente ? 'text-ink-800 font-semibold' : 'text-ink-800'}>
        {valor}
      </dd>
    </div>
  )
}

export default LegalLayout
