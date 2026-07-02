import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X, Clock, MapPin, FileText } from 'lucide-react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY !== undefined) {
        setIsScrolled(window.scrollY > 20)
      }
    }

    if (typeof window !== 'undefined') {
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
      {/* Bandeau : zone + horaires + téléphone */}
      <div className="bg-ink text-white/90 text-xs sm:text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 gap-4">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate">Longueil-Sainte-Marie · Compiègne · Oise (60)</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 text-accent" />
            Lun–Ven · 8h–18h
          </span>
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 font-semibold text-accent hover:text-white transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* Header principal */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ink/10 transition-shadow duration-300 ${
          isScrolled ? 'shadow-card' : ''
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
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span')
                    fallback.className = 'logo-fallback text-primary font-display font-bold text-xl'
                    fallback.textContent = 'RPLB Électricité'
                    parent.appendChild(fallback)
                  }
                }}
              />
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-secondary after:origin-left after:transition-transform after:duration-300 ${
                    isActive(link.path)
                      ? 'text-primary after:scale-x-100'
                      : 'text-gray-700 hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA : appel + devis */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white pl-4 pr-5 py-2.5 rounded-full font-bold transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>{phoneNumber}</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full font-semibold transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Devis gratuit</span>
              </Link>
            </div>

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
            <div className="md:hidden py-4 border-t border-ink/10">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isActive(link.path)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-paper'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-3 rounded-full font-bold mt-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>{phoneNumber}</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
