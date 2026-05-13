
const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10">
                <path d="M60 20C75 20 85 35 85 50C85 65 75 80 60 80C45 80 35 65 35 50C35 35 45 20 60 20Z" fill="#334155" />
                <path d="M40 30C55 30 65 45 65 60C65 75 55 90 40 90C25 90 15 75 15 60C15 45 25 30 40 30Z" fill="#1e3a8a" />
              </svg>
              <span className="font-display font-bold text-xl tracking-tight">
                DUALINK
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Tecnología que trabaja por ti. Diseñamos soluciones digitales sin tecnicismos, solo resultados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-slate-500">
              Servicios
            </h4>
            <ul className="space-y-3">
              {['Software a Medida', 'Redes y Conectividad', 'Automatización', 'Datos', 'Diseño'].map((item) => (
                <li key={item}>
                  <a href="#servicios" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-slate-500">
              Empresa
            </h4>
            <ul className="space-y-3">
              {['Sobre nosotros', 'Proceso', 'Casos de éxito', 'Contacto'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'Sobre nosotros' ? 'inicio' : item === 'Proceso' ? 'proceso' : item === 'Casos de éxito' ? 'resultados' : 'contacto'}`} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} DUALINK. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Privacidad</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
