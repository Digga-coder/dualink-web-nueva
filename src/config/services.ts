import { Bot, Code2, Workflow, Palette, Share2, Database, Wifi } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ============================================================
   DUALINK · CATÁLOGO DE SERVICIOS (fuente única de verdad)
   ------------------------------------------------------------
   Antes cada sección tenía su propia lista y no coincidían:
   el hero mostraba 7 servicios, la sección de servicios 6, el
   footer 5 y el desplegable del formulario otros 5. Ahora todas
   leen de aquí, así que no se pueden volver a desincronizar.

   El orden es deliberado: primero lo que se está vendiendo hoy
   (agentes de IA), no lo que se construyó primero.
   ============================================================ */

export type Service = {
  id: string
  number: string
  title: string
  /* Título corto para menús y listas compactas */
  short: string
  subtitle: string
  description: string
  details: string[]
  icon: LucideIcon
  /* Destacado: se muestra primero y con más peso visual */
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'agentes-ia',
    number: '01',
    title: 'Agentes de IA',
    short: 'Agentes de IA',
    subtitle: 'Atienden a tus clientes cuando tú no puedes',
    description:
      'Un agente que habla con tus clientes por WhatsApp o Telegram a cualquier hora: resuelve dudas, filtra los contactos que no interesan, toma pedidos y agenda citas. A ti solo te llega lo que merece tu tiempo.',
    details: [
      'Agente conversacional en WhatsApp y Telegram',
      'Cualificación automática de leads',
      'Pedidos, reservas y citas 24/7',
      'Agente RAG: responde con la información de tu empresa',
      'Integrado con tu CRM y tus herramientas',
    ],
    icon: Bot,
    featured: true,
  },
  {
    id: 'software',
    number: '02',
    title: 'Software a Medida',
    short: 'Software a medida',
    subtitle: 'Programas que se adaptan a ti',
    description:
      '¿Usas hojas de cálculo para gestionar tu negocio? Creamos aplicaciones hechas a tu medida que automatizan exactamente lo que necesitas, sin pagar por funciones que no usarás.',
    details: [
      'Aplicaciones web y móviles',
      'Sistemas de gestión interna',
      'Integración con tus herramientas actuales',
      'Escalable a medida que creces',
    ],
    icon: Code2,
    featured: true,
  },
  {
    id: 'automatizacion',
    number: '03',
    title: 'Automatización Inteligente',
    short: 'Automatización',
    subtitle: 'Que las máquinas trabajen por ti',
    description:
      'Imagina que las tareas repetitivas de tu negocio se hicieran solas. Respondemos emails, organizamos citas, gestionamos pedidos y más, mientras tú te enfocas en lo importante.',
    details: [
      'Respuesta automática a clientes',
      'Gestión de citas y pedidos',
      'Flujos de trabajo automáticos',
      'Conexión entre tus apps favoritas',
    ],
    icon: Workflow,
    featured: true,
  },
  {
    id: 'multimedia',
    number: '04',
    title: 'Diseño Web y Multimedia',
    short: 'Diseño y web',
    subtitle: 'Imagen que vende',
    description:
      'Desde tu web hasta tus redes sociales. Creamos diseños profesionales que transmiten confianza y hacen que los clientes te elijan antes que a la competencia.',
    details: [
      'Diseño web profesional y landing pages',
      'Identidad visual de marca',
      'Edición de vídeo y fotografía',
    ],
    icon: Palette,
  },
  {
    id: 'redes-sociales',
    number: '05',
    title: 'Gestión de Redes Sociales',
    short: 'Redes sociales',
    subtitle: 'Llevamos todas tus redes',
    description:
      'Nos encargamos de toda tu presencia en redes: creamos el contenido, lo publicamos y cuidamos tu comunidad. Tú te centras en tu negocio y nosotros hacemos que se note.',
    details: [
      'Instagram, Facebook, TikTok y LinkedIn',
      'Calendario de contenidos y publicaciones',
      'Diseño de posts, reels y stories',
      'Informes de resultados y crecimiento',
    ],
    icon: Share2,
  },
  {
    id: 'datos',
    number: '06',
    title: 'Organización de Datos',
    short: 'Datos',
    subtitle: 'Tu información, cuando la necesites',
    description:
      'Tus datos son oro. Los organizamos, limpiamos y ponemos a tu disposición para que puedas tomar mejores decisiones en segundos, no en días.',
    details: [
      'Bases de datos centralizadas',
      'Informes automáticos',
      'Migración de datos segura',
      'Copias de seguridad en la nube',
    ],
    icon: Database,
  },
  {
    id: 'redes',
    number: '07',
    title: 'Redes y Conectividad',
    short: 'Redes y conectividad',
    subtitle: 'Conexión sin interrupciones',
    description:
      'Instalamos y mantenemos redes rápidas, seguras y estables para tu oficina, almacén o negocio. Olvídate de cortes, lentitud y zonas sin cobertura.',
    details: [
      'Instalación de redes cableadas y WiFi',
      'Configuración de servidores',
      'Seguridad y protección de datos',
      'Mantenimiento continuo',
    ],
    icon: Wifi,
  },
]
