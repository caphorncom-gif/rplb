import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY !== undefined) {
        setIsScrolled(window.scrollY > 20)
      }
    }
    
    // Vérifier que window est disponible
    if (typeof window !== 'undefined') {
      // Déclencher une première fois pour définir l'état initial
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Services' },
    { path: '/realisations', label: 'Réalisations' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Bandeau zone d'intervention */}
      <div className="bg-primary text-white text-center py-2 text-sm">
        <span>Zone d'intervention : Longueil-Sainte-Marie, Compiègne, Oise (60)</span>
      </div>

      {/* Header principal */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/logo-rplb.png" 
                alt="RPLB Électricité" 
                className="h-12 w-auto group-hover:opacity-80 transition-opacity"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  // Optionnel : afficher un texte à la place
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span')
                    fallback.className = 'logo-fallback text-primary font-bold text-xl'
                    fallback.textContent = 'RPLB Électricité'
                    parent.appendChild(fallback)
                  }
                }}
              />
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bouton Contactez-nous */}
            <Link
              to="/contact"
              className="hidden md:flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
            >
              <Phone className="w-5 h-5" />
              <span>Contactez-nous</span>
            </Link>

            {/* Menu hamburger mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-md font-medium ${
                      isActive(link.path)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold mt-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Contactez-nous</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

