import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Zap } from 'lucide-react'

const serviceLinks = [
  { path: '/services/depannage-electrique', label: 'Dépannage électrique' },
  { path: '/services/installation-electrique-neuve', label: 'Installation neuve' },
  { path: '/services/renovation-electrique', label: 'Rénovation' },
  { path: '/services/domotique', label: 'Domotique' },
  { path: '/services/climatisation', label: 'Climatisation' },
]

// Maillage interne vers les pages locales (SEO)
const cityLinks = [
  { slug: 'longueil-sainte-marie', name: 'Longueil-Sainte-Marie' },
  { slug: 'compiegne', name: 'Compiègne' },
  { slug: 'verberie', name: 'Verberie' },
  { slug: 'pont-sainte-maxence', name: 'Pont-Sainte-Maxence' },
  { slug: 'crepy-en-valois', name: 'Crépy-en-Valois' },
  { slug: 'senlis', name: 'Senlis' },
  { slug: 'noyon', name: 'Noyon' },
  { slug: 'montataire', name: 'Montataire' },
]

export const Footer = () => {
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || '03 XX XX XX XX'
  const mobileNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'
  const email = 'rplb.electricite@gmail.com'
  const address = import.meta.env.VITE_BUSINESS_ADDRESS || 'Longueil-Sainte-Marie, 60126'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-ink text-white/70 overflow-hidden">
      <div className="absolute inset-0 bg-circuit" aria-hidden="true" />
      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo et description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="bg-secondary/15 border border-secondary/30 rounded-lg p-1.5">
                <Zap className="w-6 h-6 text-accent" />
              </span>
              <span className="text-xl font-display font-bold text-white">
                RPLB <span className="text-accent">Électricité</span>
              </span>
            </Link>
            <p className="text-sm mb-4 leading-relaxed">
              Artisans électriciens dans l'Oise depuis plus de 25 ans. Installation, dépannage,
              rénovation électrique et domotique — travail soigné, devis gratuit.
            </p>
            <a
              href="https://facebook.com/rplb-electricite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-bold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="hover:text-accent transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/realisations" className="hover:text-accent transition-colors">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-colors">
                  Blog &amp; conseils
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone d'intervention */}
          <div>
            <h3 className="text-white font-display font-bold mb-4">Zone d'intervention</h3>
            <ul className="space-y-2 text-sm">
              {cityLinks.map((c) => (
                <li key={c.slug}>
                  <Link to={`/electricien/${c.slug}`} className="hover:text-accent transition-colors">
                    Électricien {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-white/90">Romain Pagnier :</span>{' '}
                    <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="hover:text-accent">
                      {phoneNumber}
                    </a>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium text-white/90">Ludovic Bozo :</span>{' '}
                    <a href={`tel:${mobileNumber.replace(/\s/g, '')}`} className="hover:text-accent">
                      {mobileNumber}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-sm hover:text-accent break-all">
                  {email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">{address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left">
              <p className="mb-2">© {currentYear} RPLB Électricité. Tous droits réservés.</p>
              <p className="text-white/40">
                Conception web :{' '}
                <a
                  href="https://www.caphorncom.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/80 hover:text-accent transition-colors"
                >
                  caphorncom.fr
                </a>{' '}
                - Compiègne
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/mentions-legales" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
