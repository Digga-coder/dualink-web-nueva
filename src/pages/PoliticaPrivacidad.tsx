import LegalLayout, { Seccion } from './LegalLayout'
import { legal } from '../config/legal'
import { contact } from '../config/site'

/* Política de privacidad — RGPD (UE 2016/679) y LOPDGDD (3/2018).
   Plantilla estándar, no asesoramiento jurídico.

   Describe lo que la web hace HOY, que es deliberadamente poco:
   no hay formulario, ni analítica, ni cookies propias. Si algún
   día se añade Google Analytics, Meta Pixel o se recupera un
   formulario, HAY QUE ACTUALIZAR ESTE TEXTO y añadir un banner
   de consentimiento. */
const PoliticaPrivacidad: React.FC = () => (
  <LegalLayout titulo="Política de privacidad">
    <Seccion titulo="1. Responsable del tratamiento">
      <p>
        El responsable del tratamiento de los datos personales es{' '}
        <strong className="text-ink">{legal.razonSocial}</strong>, con NIF{' '}
        {legal.nif} y domicilio en {legal.domicilio}. Puedes contactar en{' '}
        <a href={`mailto:${contact.email}`} className="text-brand-600 font-medium hover:underline">
          {contact.email}
        </a>{' '}
        o en el teléfono {contact.phoneDisplay}.
      </p>
    </Seccion>

    <Seccion titulo="2. Qué datos recogemos">
      <p>
        Este sitio web <strong className="text-ink">no dispone de formularios</strong>,
        no utiliza cookies propias y no incorpora herramientas de analítica ni
        de publicidad. Navegar por él no requiere facilitar ningún dato
        personal.
      </p>
      <p>Solo tratamos datos personales cuando tú decides contactar con nosotros:</p>
      <ul className="list-disc pl-5 space-y-2 mt-3">
        <li>
          <strong className="text-ink">Por WhatsApp.</strong> Al pulsar cualquiera
          de los botones de la web se abre una conversación en WhatsApp. Ahí
          tratamos tu número de teléfono, tu nombre de perfil y el contenido de
          los mensajes que nos envíes.
        </li>
        <li>
          <strong className="text-ink">Por correo electrónico o teléfono.</strong>{' '}
          Tratamos los datos de contacto y la información que decidas incluir en
          tu mensaje o comunicarnos en la llamada.
        </li>
      </ul>
    </Seccion>

    <Seccion titulo="3. Con qué finalidad y con qué base legal">
      <p>
        Los datos se utilizan únicamente para atender tu consulta, elaborar el
        presupuesto que nos solicites y mantener la relación comercial que
        pueda derivarse. No se emplean para ninguna otra finalidad ni se
        elaboran perfiles con ellos.
      </p>
      <p>
        La base jurídica es la aplicación de medidas precontractuales a
        petición del interesado y la ejecución del contrato, cuando lo haya
        (art. 6.1.b RGPD), así como nuestro interés legítimo en responder a
        quien nos escribe (art. 6.1.f RGPD).
      </p>
    </Seccion>

    <Seccion titulo="4. Cuánto tiempo los conservamos">
      <p>
        Conservamos los datos mientras dure la relación comercial y, después,
        durante los plazos legalmente exigidos para atender posibles
        responsabilidades (con carácter general, seis años según el Código de
        Comercio y cuatro años en materia fiscal). Si tu consulta no deriva en
        una contratación, los datos se eliminan cuando dejan de ser necesarios.
      </p>
    </Seccion>

    <Seccion titulo="5. Quién más accede a tus datos">
      <p>No cedemos tus datos a terceros, salvo obligación legal. No obstante:</p>
      <ul className="list-disc pl-5 space-y-2 mt-3">
        <li>
          <strong className="text-ink">WhatsApp Ireland Limited</strong> (grupo
          Meta) trata los datos de la conversación conforme a sus propias
          condiciones y política de privacidad, que te recomendamos consultar.
          Al escribirnos por este canal aceptas dicho tratamiento.
        </li>
        <li>
          <strong className="text-ink">GitHub, Inc.</strong> aloja este sitio y,
          como cualquier servidor web, registra la dirección IP de las visitas
          por motivos técnicos y de seguridad.
        </li>
        <li>
          <strong className="text-ink">Google Ireland Limited</strong> presta el
          servicio de tipografías (Google Fonts) que usa esta web; al cargarlas,
          tu dirección IP se comunica a Google.
        </li>
      </ul>
      <p className="mt-3">
        Algunos de estos proveedores pueden realizar transferencias
        internacionales de datos fuera del Espacio Económico Europeo, amparadas
        en las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o
        en decisiones de adecuación.
      </p>
    </Seccion>

    <Seccion titulo="6. Tus derechos">
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso,
        rectificación, supresión, oposición, limitación del tratamiento y
        portabilidad, escribiendo a{' '}
        <a href={`mailto:${contact.email}`} className="text-brand-600 font-medium hover:underline">
          {contact.email}
        </a>{' '}
        e indicando el derecho que deseas ejercer. Para verificar tu identidad
        podemos solicitarte una copia de un documento identificativo.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tu solicitud, puedes
        presentar una reclamación ante la Agencia Española de Protección de
        Datos (
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 font-medium hover:underline"
        >
          www.aepd.es
        </a>
        ).
      </p>
    </Seccion>

    <Seccion titulo="7. Seguridad">
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger los
        datos frente a pérdida, uso indebido o acceso no autorizado. Este sitio
        se sirve íntegramente cifrado mediante HTTPS.
      </p>
    </Seccion>

    <Seccion titulo="8. Cambios en esta política">
      <p>
        Podemos actualizar esta política para adaptarla a cambios normativos o
        en los servicios que prestamos. La fecha de la última revisión figura al
        inicio del documento.
      </p>
    </Seccion>
  </LegalLayout>
)

export default PoliticaPrivacidad
