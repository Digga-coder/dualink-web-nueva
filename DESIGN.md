# Design

Sistema visual de la web de Dualink Solutions, escrito a partir de lo que
está construido, no de lo que se pretendía construir.

**Mundo:** el almacén rotulado. Hormigón, pintura de suelo, placas grabadas
y balizado de obra. Sale del sitio físico donde viven las máquinas que
Dualink instala — naves, cocinas, almacenes — y del mundo que el visitante
reconoce sin que se lo expliquen.

**Lo que este sistema rechaza explícitamente:** la landing de IA por defecto
(degradado azul-morado, tarjetas de cristal, esfera 3D girando, Inter en
todo, un antetítulo en mayúsculas encima de cada titular). Era exactamente
lo que había antes.

## 1. Color

Sólo hay dos colores, y son los del logo. **Ningún color inventado.**

| Papel | Valor | Uso |
|---|---|---|
| Azul de marca | `#1E3A8A` (`brand-700`) | Bloques macizos, acciones, la calle pintada, el estado "funcionando" |
| Pizarra | `#1E293B` (`ink-800`) | Todo el texto de lectura y el balizado |
| Hormigón | `#F7F8FA` (`paper-50`) | Suelo de la página |
| Papel | `#FFFFFF` | Bahías, placas y tarjetas |

Las rampas `brand-*` e `ink-*` son tintes y sombras de esos dos valores. Si
un color no deriva del logo, no entra.

**Estrategia: comprometida.** El azul ocupa regiones enteras — el bloque de
pago va a sangre — no acentos sueltos sobre un fondo neutro.

**El suelo es claro por una razón, no por gusto.** El azul marino es un
color oscuro: sobre fondo negro se apaga y deja de poder mandar. Con el
suelo claro puede ocupar bloques macizos con letra blanca, que da 11:1.

**Regla de contraste:** sobre azul, siempre blanco. Nunca gris, nunca un
azul más claro. Sobre hormigón, `ink-800` para lectura e `ink-600` como
mínimo para texto secundario.

## 2. Tipografía

**Archivo**, una sola familia, variable en anchura. Sustituye a Inter, que
el detector marcaba como `overused-font` al 100% del texto: es la cara que
todos los modelos generativos producen por defecto, y con ella puesta la
web no puede parecer de nadie.

- **Rótulo de placa** (`.plate-type`): `wdth 125`, peso 900, tracking
  `-0.03em`, `text-wrap: balance`. Titulares y cifras.
- **Cuerpo**: `wdth 100`. Medida máxima de 52–54 caracteres en los párrafos
  de venta.
- **Grabado** (`.engraved`): mayúsculas, tracking `+0.1em`, cifras
  tabulares. **Sólo etiquetas cortas.** Las mayúsculas sobre una frase
  larga frenan la lectura; el detector lo marca como `all-caps-body`.
- **Suelo de tamaño: 12 px.** Nada funcional por debajo. Es lo que rompió
  la primera versión de este rediseño: una clase de placa a 10,4 px
  repetida por toda la web.

## 3. Espacio y ritmo

Secciones a `py-24` / `md:py-32`. Contenedor `max-w-[92rem]`, márgenes
laterales `px-5` / `sm:px-8`. Más espacio encima de un titular que debajo.

El scroll alterna densidad a propósito: bahía de entrada abierta → rejilla
densa de casos → catálogo en dos niveles → bloque de color a sangre →
cierre abierto.

## 4. Materiales

- **Bahía**: fondo blanco, borde `2px ink-200`, sin redondeo. El mundo es de
  chapa y pintura; el redondeo es de interfaz.
- **Placa**: bahía con banda azul de rótulo arriba y contenido grabado.
- **Calle pintada**: barra azul de 6 px que entra por un borde. Marca el
  recorrido de lectura.
- **Balizado** (`.hazard` / `.hazard-invert`): diagonales a 45°. **Un solo
  significado en toda la web: esto todavía no está entregado.** Marca el
  caso Thermocork, el tramo del 30% sin cobrar y el aviso legal incompleto.
  Nunca es decoración.
- **Elevación**: se declara una vez. O borde o sombra, nunca las dos. La
  sombra (`shadow-plate`) lleva desplazamiento y desenfoque; el halo de
  color a offset cero está prohibido.

## 5. Componentes

- **Acción principal**: bloque azul macizo, letra blanca, mayúsculas
  grabadas, mínimo 56 px de alto. Nunca redondeado, nunca con degradado.
- **Acción secundaria**: mismo bloque con borde de 2 px y sin relleno.
- **Toque mínimo 44 px** en todo lo pulsable, pie y navegación incluidos.
- **Foco visible**: anillo azul de 3 px con 3 px de separación. No se
  suprime nunca.
- **Iconos**: `lucide-react`, un solo grosor de trazo. Nunca emoji.

## 6. Movimiento

**Un solo momento autorizado**: la calle pintada del primer viewport se
dibuja una vez al entrar (`scaleX`, 1100 ms, ease-out exponencial) y se
queda quieta.

No hay entrada en fundido por sección. La versión anterior tenía la misma
animación `opacity: 0, y: 30` en cada bloque de cada sección, que es la
firma de una web generada. El contenido está visible por defecto.

`prefers-reduced-motion: reduce` deja la calle ya dibujada. Se eliminó
`framer-motion` entera: no queda ninguna animación que la necesite.

## 7. Anti-patrones (prohibidos en este sistema)

- Antetítulo o etiqueta en mayúsculas encima de un titular. **No hay brief
  que lo recupere.** Había siete.
- Rejillas de tarjetas idénticas como estructura de página. La jerarquía se
  expresa con tamaños distintos.
- Numeración decorativa de secciones (01 / 02 / 03) cuando el orden no es
  información que el visitante necesite.
- Texto con degradado, cristal esmerilado como adorno, sombras duras sin
  desenfoque, bordes de color gruesos en un costado.
- Blanco sobre verde de WhatsApp (daba 2.0:1). El icono se conserva; el
  bloque va en azul de marca.
- Cualquier color fuera de las dos rampas del logo.

## 8. Verificación

Detector de Impeccable, 59 reglas deterministas, sobre la web en marcha:

| | Antes | Ahora |
|---|---|---|
| Avisos totales | 25 | 1 |
| `overused-font` (Inter) | 1 | 0 |
| `kicker-above-heading` | 7 | 0 |
| `low-contrast` | 10 | 0 |
| `undersized-ui-text` | 3 | 0 |
| `all-caps-body` | 2 | 0 |
| `oversized-h1` | 1 | 0 |
| `skipped-heading` | 1 | 0 |

El aviso que queda es `repeating-stripes-gradient`, por el balizado. Es una
excepción deliberada y documentada: en este mundo las diagonales son el
objeto real y llevan significado. La exención está declarada en línea en
`src/index.css`.

Móvil (375 px) y escritorio (1440 px): sin desbordes horizontales y sin
toques por debajo de 44 px.
