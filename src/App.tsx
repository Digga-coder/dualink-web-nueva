import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Cases from './sections/Cases'
import Process from './sections/Process'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

/* Orden deliberado: qué hacemos (Services) → que ya lo hemos
   hecho (Cases) → cómo trabajamos y por qué no hay riesgo
   (Process, con el pago por fases) → contactar. La prueba va
   antes que el proceso: convence más lo que ya funciona que
   cómo se construye. */
function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Intro />
      <Services />
      <Cases />
      <Process />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
