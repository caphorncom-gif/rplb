import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Zap } from 'lucide-react'

export const Footer = () => {
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || '03 XX XX XX XX'
  const mobileNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'
  const email = 'rplb.electricite@gmail.com'
  const address = import.meta.env.VITE_BUSINESS_ADDRESS || 'Longueil-Sainte-Marie, 60126'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">
                RPLB <span className="text-primary">Électricité</span>
              </span>
            </Link>
            <p className="text-sm mb-4">
              Votre électricien de confiance dans l'Oise. Installation, dépannage, rénovation électrique et domotique.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/rplb-electricite"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="hover:text-primary transition-colors">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/urgence" className="hover:text-primary transition-colors">
                  Urgence
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/depannage-electrique" className="hover:text-primary transition-colors">
                  Dépannage Électrique
                </Link>
              </li>
              <li>
                <Link to="/services/installation-electrique-neuve" className="hover:text-primary transition-colors">
                  Installation Neuve
                </Link>
              </li>
              <li>
                <Link to="/services/renovation-electrique" className="hover:text-primary transition-colors">
                  Rénovation
                </Link>
              </li>
              <li>
                <Link to="/services/domotique" className="hover:text-primary transition-colors">
                  Domotique
                </Link>
              </li>
              <li>
                <Link to="/services/climatisation" className="hover:text-primary transition-colors">
                  Climatisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Romain Pagnier :</span>{' '}
                    <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="hover:text-primary">
                      {phoneNumber}
                    </a>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Ludovic Bozo :</span>{' '}
                    <a href={`tel:${mobileNumber.replace(/\s/g, '')}`} className="hover:text-primary">{mobileNumber}</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-sm hover:text-primary break-all">
                  {email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">{address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left">
              <p className="mb-2">
                © {currentYear} RPLB Électricité. Tous droits réservés.
              </p>
              <p className="text-gray-400">
                Conception web :{' '}
                <a
                  href="https://www.caphorncom.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  caphorncom.fr
                </a>
                {' '}- Compiègne
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

