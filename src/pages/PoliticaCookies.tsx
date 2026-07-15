import LegalLayout, { Seccion } from './LegalLayout'
import { contact } from '../config/site'

/* Política de cookies — art. 22.2 LSSI-CE.
   Plantilla estándar, no asesoramiento jurídico.

   Hoy la web NO usa cookies, y por eso no lleva banner de
   consentimiento: mostrar uno sin cookies que consentir sería
   ruido inútil. Este documento existe igualmente para poder
   afirmarlo por escrito.

   ⚠️ SI ALGÚN DÍA SE AÑADE Google Analytics, Meta Pixel, un
   chat embebido o cualquier medición: hay que actualizar este
   texto Y poner un banner de consentimiento previo. El art. 22.2
   exige consentimiento ANTES de instalar cookies no exentas. */
const PoliticaCookies: React.FC = () => (
  <LegalLayout titulo="Política de cookies">
    <Seccion titulo="1. Qué son las cookies">
      <p>
        Una cookie es un pequeño fichero de texto que un sitio web guarda en tu
        navegador al visitarlo. Sirven, entre otras cosas, para recordar tus
        preferencias, mantener una sesión iniciada o medir el comportamiento de
        los visitantes.
      </p>
    </Seccion>

    <Seccion titulo="2. Cookies que utiliza esta web">
      <p>
        <strong className="text-ink">Ninguna.</strong> Este sitio no instala
        cookies propias ni de terceros en tu navegador. No utilizamos
        herramientas de analítica (como Google Analytics), ni píxeles
        publicitarios, ni botones sociales incrustados, ni ningún sistema de
        seguimiento.
      </p>
      <p>
        Por ese motivo no encontrarás un banner de consentimiento: no hay nada
        que consentir. El artículo 22.2 de la LSSI-CE solo exige consentimiento
        previo cuando se instalan cookies no estrictamente necesarias, y aquí no
        se instala ninguna.
      </p>
    </Seccion>

    <Seccion titulo="3. Servicios de terceros sin cookies">
      <p>
        Aunque no usamos cookies, la web sí carga recursos de terceros que, por
        el propio funcionamiento de internet, reciben tu dirección IP:
      </p>
      <ul className="list-disc pl-5 space-y-2 mt-3">
        <li>
          <strong className="text-ink">Google Fonts</strong> (Google Ireland
          Limited): proporciona la tipografía del sitio. No instala cookies,
          pero recibe tu IP al descargarla.
        </li>
        <li>
          <strong className="text-ink">GitHub Pages</strong> (GitHub, Inc.):
          aloja la web y registra las peticiones por motivos técnicos y de
          seguridad.
        </li>
        <li>
          <strong className="text-ink">WhatsApp</strong> (WhatsApp Ireland
          Limited): solo interviene si pulsas voluntariamente uno de los botones
          de contacto, momento en el que abandonas este sitio y pasas a su
          plataforma, sujeta a sus propias políticas.
        </li>
      </ul>
      <p className="mt-3">
        Puedes consultar cómo tratamos estos casos en nuestra{' '}
        <a href="#/privacidad" className="text-brand-600 font-medium hover:underline">
          Política de Privacidad
        </a>
        .
      </p>
    </Seccion>

    <Seccion titulo="4. Cómo gestionar las cookies en tu navegador">
      <p>
        Aunque esta web no las use, puedes configurar en todo momento tu
        navegador para bloquear o eliminar las cookies de cualquier sitio. Cada
        navegador lo gestiona en su apartado de ajustes de privacidad: Chrome,
        Firefox, Safari, Edge y Opera disponen todos de esta opción en su
        documentación de ayuda.
      </p>
    </Seccion>

    <Seccion titulo="5. Cambios en esta política">
      <p>
        Si en el futuro incorporamos cookies, actualizaremos este documento y
        solicitaremos tu consentimiento previo mediante un banner antes de
        instalarlas. Para cualquier duda puedes escribirnos a{' '}
        <a href={`mailto:${contact.email}`} className="text-brand-600 font-medium hover:underline">
          {contact.email}
        </a>
        .
      </p>
    </Seccion>
  </LegalLayout>
)

export default PoliticaCookies
