import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Cases from './sections/Cases'
import Services from './sections/Services'
import Process from './sections/Process'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import AvisoLegal from './pages/AvisoLegal'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import PoliticaCookies from './pages/PoliticaCookies'
import { useHashRoute } from './lib/useHashRoute'

/* ============================================================
   Orden de la home.

   Cambia respecto a la versión anterior: la PRUEBA sube al
   segundo lugar, justo detrás del primer viewport. Antes iba
   la cuarta, y para llegar a ella había que atravesar una
   sección de valores genéricos y siete tarjetas de servicio.

   El razonamiento: este visitante no llega preguntándose qué
   servicios existen, llega preguntándose si esta gente es de
   fiar. Se le enseña primero una máquina funcionando en un
   negocio como el suyo, y sólo después el catálogo.

   Se elimina la sección Intro ("Dejamos de hablar en código /
   Claridad · Compromiso · Calidad"). Eran tres valores que
   cualquier empresa del mundo podría firmar, y ocupaban una
   pantalla entera repitiendo lo que el resto de la web ya
   demuestra. La frase de posicionamiento sobrevive en el pie,
   que es donde una declaración de intenciones no le quita el
   sitio a una prueba.
   ============================================================ */
function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Cases />
      <Services />
      <Process />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

function App() {
  const route = useHashRoute()

  return (
    <div className="relative">
      {route === 'aviso-legal' && <AvisoLegal />}
      {route === 'privacidad' && <PoliticaPrivacidad />}
      {route === 'cookies' && <PoliticaCookies />}
      {route === 'home' && <Home />}
    </div>
  )
}

export default App
