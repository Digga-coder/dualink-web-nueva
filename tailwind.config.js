/* ============================================================
   DUALINK · TOKENS DEL MUNDO VISUAL
   ------------------------------------------------------------
   PALETA: la del logo. No hay ningún color inventado.

     #1e3a8a  azul marino  → la gota de delante
     #1e293b  pizarra      → la gota de detrás

   Todo lo demás son rampas de esos dos y neutros de papel. Si
   un color no sale de la marca, no está aquí.

   El mundo es el almacén rotulado: hormigón, pintura de suelo,
   placas grabadas y balizado. Como el azul de la marca es un
   color OSCURO, no puede hacer de pintura brillante sobre negro
   — se apagaría. Así que el suelo va claro y es el azul el que
   ocupa los bloques macizos con letra blanca. Contraste real:
   blanco sobre #1e3a8a da 11:1.

   Lo que se fue: Inter. El detector la marcó como
   "overused-font: 100% del texto". Es la cara que todos los
   modelos escupen por defecto; con ella puesta la web no puede
   parecer de nadie. Entra Archivo, un grotesco industrial con
   eje de anchura variable: la misma familia da el cuerpo de
   lectura y el rótulo ancho de placa.
   ============================================================ */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Azul de la marca. El 700 es el del logo, exacto. */
        brand: {
          900: '#0F1D45',
          800: '#162C68',
          700: '#1E3A8A',
          600: '#2B4DA8',
          500: '#3D63C4',
          200: '#C3CFE9',
          100: '#DFE6F4',
          50:  '#EEF2FA',
        },
        /* Pizarra de la marca. El 800 es el del logo, exacto. */
        ink: {
          900: '#131C2B',
          800: '#1E293B',
          700: '#33415A',
          600: '#4C5A73',
          500: '#6B7893',
          400: '#94A0B5',
          300: '#BFC7D4',
          200: '#DCE1E8',
          100: '#EBEEF2',
        },
        /* Hormigón y papel. Neutros, sin tinte propio. */
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#F7F8FA',
          100: '#F0F2F5',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        /* El suelo de tracking es -0.04em. Se queda en -0.03. */
        plate: '-0.03em',
        stencil: '0.1em',
      },
      boxShadow: {
        /* Toda sombra lleva desplazamiento y desenfoque suave.
           El halo de color a offset cero es decoración. */
        plate: '0 2px 0 0 rgba(30,41,59,0.18), 0 12px 28px -14px rgba(30,41,59,0.45)',
      },
      keyframes: {
        lane: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        lane: 'lane 1100ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
