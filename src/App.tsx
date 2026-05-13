import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Services from './sections/Services'
import Process from './sections/Process'
import Cases from './sections/Cases'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Cases />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
