# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños y gerentes de pymes de la Ribera de Navarra y alrededores: hostelería y ocio nocturno, logística y transporte, construcción y materiales, inmobiliaria. No son técnicos y no quieren serlo. Gestionan el negocio desde el móvil, muchas veces de pie y a media tarea. Llegan a la web con un dolor concreto ("pierdo el día contestando lo mismo", "llevo el stock a mano y me equivoco"), no buscando "inteligencia artificial". Evalúan por confianza y por proximidad antes que por tecnología: quieren saber quién responde al teléfono y si esa gente existe de verdad.

Segundo público, minoritario pero real: empresas ya en marcha que buscan un socio tecnológico para un plan de transformación de varios frentes (el caso Thermocork).

## Product Purpose

Dualink Solutions construye y opera automatización a medida para pymes: agentes de IA conversacionales, software propio, integración de herramientas, datos y redes. Existe porque la pyme local está atrapada entre el software enlatado que no encaja y las consultoras que le cobran por encima de su tamaño. Éxito para la web es una sola cosa: que el visitante abra una conversación de WhatsApp. No hay carrito, no hay registro, no hay formulario.

## Positioning

Tres cosas que un competidor no puede copiar sin cambiar su negocio:

1. **Pago por fases con un ~30% retenido hasta el final.** Lo normal en el sector es cobrar el 100% por adelantado. Dualink deja aproximadamente un 30% sin cobrar hasta que el cliente ve la cosa funcionando. Es el argumento más fuerte del discurso comercial y hoy está enterrado al final de la página.
2. **Agentes en producción, no pilotos.** Hay agentes de IA atendiendo clientes reales 24/7 (Smash Gorry en Telegram, Three Inmobiliaria en WhatsApp). Se puede enseñar el mecanismo funcionando.
3. **Proximidad física.** Tudela, Navarra. Nave propia. Para este público, que exista una dirección y una persona a la que ir a ver es parte del producto.

## Operating Context

Toda la venta ocurre en WhatsApp. La web no captura leads: los deriva. Cada punto de entrada manda un mensaje prerrellenado distinto (`waMessages` en `src/config/site.ts`) para que el equipo sepa de qué parte de la web viene el contacto sin preguntarlo.

Decisión ya tomada y que no se revierte: no hay formulario de contacto. El anterior hacía `preventDefault()` y enseñaba un tick verde sin enviar nada; todo lead que lo rellenó se perdió en silencio. WhatsApp se eligió porque si el enlace se rompe, se ve.

El visitante llega mayoritariamente desde el móvil.

## Capabilities and Constraints

Siete servicios, en `src/config/services.ts` como fuente única de verdad; el orden es deliberado (agentes de IA primero porque es lo que se vende hoy, no lo que se construyó primero). Tres van marcados `featured`: agentes de IA, software a medida, automatización.

Stack existente: React 18 + Vite 5 + TypeScript + Tailwind 3 + framer-motion. `three` / `@react-three/fiber` / `drei` cargan un clip 3D decorativo del logo (~1 MB) en carga diferida, oculto en móvil. Enrutado por hash (`useHashRoute`), tres páginas legales estáticas.

Datos de contacto centralizados en `src/config/site.ts`. WhatsApp `+34 692 91 87 37`, `info@dualinksolutions.com`, `dualinksolutions.com` (el dominio en singular NO es suyo). Dirección: Tudela, Navarra — la calle y el número siguen pendientes.

**Sin resolver, no inventar:** denominación social, NIF, domicilio fiscal completo y datos registrales (`src/config/legal.ts`, todos marcados `[PENDIENTE]`). El aviso legal no es conforme a la LSSI hasta que se rellenen, y la web lo avisa en pantalla en vez de fingir que lo es.

## Brand Commitments

Nombre: Dualink Solutions; en pantalla, DUALINK. Logo actual: dos formas de gota solapadas, la de detrás oscura y la de delante azul — el "dual" del nombre. Es el único activo de marca comprometido.

Voz confirmada y no negociable: sin jerga. La web habla de lo que el cliente pierde y gana, nunca de la tecnología por su nombre. "Dejamos de hablar en código y empezamos a hablar en resultados" es la frase de posicionamiento del propio negocio.

## Evidence on Hand

Cinco clientes reales, con nombre y sector, en `src/sections/Cases.tsx`:

- **JMV Logística** — inventario a mano en hojas de cálculo → sistema centralizado con stock en tiempo real. Redujeron un 70% el tiempo de gestión.
- **Frecuenzy** (ocio nocturno) — SaaS de TPV en tiempo real, app móvil para camareros, panel de métricas, control de acceso. PWA instalable.
- **Smash Gorry** (hostelería) — agente de IA en Telegram con Gemini que entiende pedidos en lenguaje natural y los manda a cocina y a Firebase. En producción 24/7.
- **Three Inmobiliaria** — embudo agéntico en WhatsApp que cualifica leads, resuelve dudas de propiedades y agenda presentaciones por Zoom de forma autónoma.
- **Thermocork** (aislamiento ecológico) — Plan Director de Transformación Digital 2026: web premium, zona B2B, agente RAG corporativo, automatización de pedidos omnicanal. **En desarrollo, no entregado** — hay que decirlo así.

**Lo que no existe y no se puede fabricar:** testimonios con nombre y cara, logos de clientes autorizados para mostrar, capturas de los agentes reales conversando, fotos del equipo o de la nave, precios, número de empleados, año de fundación, certificaciones. Las métricas que hay ("-70%", "24/7", "100%") son las únicas cifras verificadas.

## Product Principles

1. **El destino es una conversación, no una conversión.** Cada elemento se juzga por si acerca o aleja de abrir WhatsApp. Nada de pasos intermedios.
2. **Enseñar antes que afirmar.** Hay agentes funcionando; el mecanismo se demuestra, no se describe. Una captura real de un agente pidiendo la comanda vale más que tres adjetivos.
3. **El riesgo invertido es la tesis comercial.** El 30% retenido no es un detalle del proceso: es la razón por la que un desconocido se fía. Merece estar arriba, no abajo.
4. **Hablar en pérdidas y ganancias, nunca en tecnología.** "RAG", "agéntico" y "NLP" son palabras del vendedor, no del cliente. Sobreviven solo donde el propio cliente las usaría.
5. **La cercanía es producto.** Tudela, la nave, el nombre de quien contesta. Un competidor remoto no puede copiarlo.

## Accessibility & Inclusion

Público de edad media-alta leyendo al sol y desde el móvil. Contraste real y tamaños de toque cómodos no son un extra: el detector encontró 10 fallos de contraste y texto funcional a 10,4 px en el estado actual. Interfaz íntegramente en español.
