import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    /* Vite no lee PORT del entorno por su cuenta. Leerlo aquí
       permite levantar el dev server en un puerto libre cuando el
       5173 ya está ocupado por otro proyecto. */
    port: Number(process.env.PORT) || 5173,
  },
})
