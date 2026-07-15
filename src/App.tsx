import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Cases from './sections/Cases'
import Process from './sections/Process'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import AvisoLegal from './pages/AvisoLegal'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import PoliticaCookies from './pages/PoliticaCookies'
import { useHashRoute } from './lib/useHashRoute'

/* Orden deliberado de la home: qué hacemos (Services) → que ya lo
   hemos hecho (Cases) → cómo trabajamos y por qué no hay riesgo
   (Process, con el pago por fases) → contactar. La prueba va antes
   que el proceso: convence más lo que ya funciona que cómo se
   construye. */
function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Intro />
      <Services />
      <Cases />
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
