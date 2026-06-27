import { Link } from 'react-router-dom'
import { Phone, FileText, Zap } from 'lucide-react'

interface HeroProps {
  title?: string
  subtitle?: string
  image?: string
  showBadge?: boolean
}

export const Hero = ({ 
  title = "Votre électricien de confiance dans l'Oise",
  subtitle = "Installation • Dépannage • Rénovation • Domotique - Pour particuliers et professionnels - Intervention rapide du lundi au vendredi",
  image,
  showBadge = true
}: HeroProps) => {
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'

  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      {image ? (
        <img
          src={image}
          alt="Électricien professionnel"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      )}
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Badge intervention rapide */}
      {showBadge && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center space-x-2 bg-accent text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg">
            <Zap className="w-5 h-5" />
            <span>Intervention rapide</span>
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/contact"
            className="flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <FileText className="w-5 h-5" />
            <span>Devis gratuit</span>
          </Link>
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
            <span>Urgence</span>
          </a>
        </div>
      </div>
    </div>
  )
}

