/* ============================================================
   DUALINK · MARCA
   ------------------------------------------------------------
   Las dos gotas solapadas: la de detrás en pizarra #1e293b, la
   de delante en azul #1e3a8a. Son los colores exactos del logo
   y de ellos sale toda la paleta de la web.

   Estaba duplicado a mano en la cabecera y en el pie, con
   colores distintos en cada sitio. Ahora vive aquí una vez.

   `invertido` sólo cambia la gota de detrás a blanco, para
   cuando la marca va sobre un bloque azul macizo.
   ============================================================ */

const Marca: React.FC<{ className?: string; invertido?: boolean }> = ({
  className = 'w-9 h-9',
  invertido = false,
}) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    <path
      d="M60 20C75 20 85 35 85 50C85 65 75 80 60 80C45 80 35 65 35 50C35 35 45 20 60 20Z"
      fill={invertido ? '#FFFFFF' : '#1E293B'}
    />
    <path
      d="M40 30C55 30 65 45 65 60C65 75 55 90 40 90C25 90 15 75 15 60C15 45 25 30 40 30Z"
      fill="#1E3A8A"
    />
  </svg>
)

export default Marca
