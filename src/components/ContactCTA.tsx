import { Link } from 'react-router-dom'
import { Phone, FileText } from 'lucide-react'

export const ContactCTA = () => {
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || '03 XX XX XX XX'

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Un projet ? Une urgence ?
        </h2>
        <p className="text-xl mb-8 text-gray-100">
          Contactez-nous dès maintenant pour un devis gratuit ou une intervention rapide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/contact"
            className="flex items-center space-x-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            <FileText className="w-5 h-5" />
            <span>Devis gratuit</span>
          </Link>
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span>{phoneNumber}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

