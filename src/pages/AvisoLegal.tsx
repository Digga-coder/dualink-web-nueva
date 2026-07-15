import LegalLayout, { Seccion, Dato } from './LegalLayout'
import { legal } from '../config/legal'
import { site, contact } from '../config/site'

/* Aviso legal — art. 10 LSSI-CE (Ley 34/2002).
   Plantilla estándar, no asesoramiento jurídico. */
const AvisoLegal: React.FC = () => (
  <LegalLayout titulo="Aviso legal">
    <Seccion titulo="1. Datos identificativos del titular">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
        ponen a disposición de los usuarios los datos identificativos del
        titular de este sitio web:
      </p>
      <dl className="mt-4">
        <Dato etiqueta="Denominación social" valor={legal.razonSocial} />
        <Dato etiqueta="Nombre comercial" valor={site.name} />
        <Dato etiqueta="NIF" valor={legal.nif} />
        <Dato etiqueta="Domicilio social" valor={legal.domicilio} />
        {legal.registro && <Dato etiqueta="Registro Mercantil" valor={legal.registro} />}
        <Dato etiqueta="Correo electrónico" valor={contact.email} />
        <Dato etiqueta="Teléfono" valor={contact.phoneDisplay} />
        <Dato etiqueta="Sitio web" valor={site.url} />
      </dl>
    </Seccion>

    <Seccion titulo="2. Objeto y condiciones de uso">
      <p>
        Este sitio web tiene por objeto informar sobre los servicios que presta{' '}
        {site.name}: desarrollo de agentes de inteligencia artificial,
        automatización de procesos, software a medida, diseño web y gestión de
        redes sociales.
      </p>
      <p>
        El acceso al sitio es gratuito y no requiere registro. La navegación
        atribuye la condición de usuario e implica la aceptación de las
        condiciones recogidas en este aviso legal. El usuario se compromete a
        hacer un uso adecuado de los contenidos y a no emplearlos para
        actividades ilícitas o lesivas para terceros.
      </p>
    </Seccion>

    <Seccion titulo="3. Propiedad intelectual e industrial">
      <p>
        Los contenidos de este sitio —textos, diseño gráfico, código fuente,
        logotipos, marcas e imágenes— son titularidad de {legal.razonSocial} o de
        terceros que han autorizado su uso, y están protegidos por la normativa
        de propiedad intelectual e industrial.
      </p>
      <p>
        Queda prohibida su reproducción, distribución, comunicación pública o
        transformación sin autorización expresa del titular. El acceso al sitio
        no otorga al usuario ningún derecho sobre ellos.
      </p>
    </Seccion>

    <Seccion titulo="4. Responsabilidad">
      <p>
        {legal.razonSocial} no garantiza la disponibilidad continuada del sitio,
        aunque hará lo razonable por mantenerlo operativo. No se responsabiliza
        de los daños derivados de fallos técnicos, interrupciones del servicio o
        de la presencia de virus u otros elementos lesivos introducidos por
        terceros.
      </p>
      <p>
        La información publicada tiene carácter divulgativo y no constituye
        oferta contractual vinculante. Las condiciones concretas de cada
        proyecto se pactan por escrito con el cliente.
      </p>
    </Seccion>

    <Seccion titulo="5. Enlaces a terceros">
      <p>
        Este sitio incluye enlaces a servicios de terceros, como WhatsApp
        (WhatsApp Ireland Limited). {legal.razonSocial} no controla dichos
        servicios ni responde de sus contenidos ni de sus políticas de
        privacidad, que el usuario debe consultar por su cuenta.
      </p>
    </Seccion>

    <Seccion titulo="6. Protección de datos">
      <p>
        El tratamiento de los datos personales facilitados a través de este
        sitio se rige por la{' '}
        <a href="#/privacidad" className="text-brand-600 font-medium hover:underline">
          Política de Privacidad
        </a>
        .
      </p>
    </Seccion>

    <Seccion titulo="7. Legislación aplicable y jurisdicción">
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución
        de cualquier controversia, las partes se someten a los juzgados y
        tribunales del domicilio del titular, salvo que la normativa de consumo
        aplicable disponga otro fuero.
      </p>
    </Seccion>
  </LegalLayout>
)

export default AvisoLegal
