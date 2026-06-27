import { SEO } from '../components/SEO'
import { Phone, AlertTriangle, Zap, Shield, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Urgence = () => {
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'

  const urgences = [
    {
      icon: Zap,
      title: 'Panne totale',
      description: 'Aucune électricité dans toute la maison'
    },
    {
      icon: AlertTriangle,
      title: 'Disjoncteur qui saute',
      description: 'Le disjoncteur ne reste pas enclenché'
    },
    {
      icon: AlertTriangle,
      title: 'Odeur de brûlé',
      description: 'Odeur suspecte provenant d\'une prise ou d\'un tableau'
    },
    {
      icon: Shield,
      title: 'Risque d\'électrocution',
      description: 'Danger immédiat, coupure d\'urgence nécessaire'
    },
    {
      icon: AlertTriangle,
      title: 'Court-circuit',
      description: 'Étincelles ou fumée visible'
    }
  ]

  return (
    <>
      <SEO
        title="Urgence Électrique - RPLB Électricité Oise"
        description="Intervention d'urgence électrique du lundi au vendredi dans l'Oise. Pour particuliers et professionnels. Panne totale, disjoncteur, court-circuit. Intervention rapide en semaine."
        keywords="urgence électrique, dépannage électrique urgent, électricien urgence, Oise"
      />

      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            URGENCE ÉLECTRIQUE
          </h1>
          <p className="text-2xl mb-8 text-red-100">
            Intervention rapide pour vos urgences électriques - Particuliers et professionnels
          </p>
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="inline-flex items-center space-x-3 bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-2xl transition-colors shadow-xl"
          >
            <Phone className="w-8 h-8" />
            <span>{phoneNumber}</span>
          </a>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Temps de réponse */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="bg-primary/10 rounded-lg p-8 mb-8">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Temps de réponse garanti
              </h2>
              <p className="text-xl text-gray-700">
                Intervention rapide pour toutes les urgences électriques dans l'Oise (du lundi au vendredi)
              </p>
            </div>
          </div>

          {/* Types d'urgences */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Types d'urgences que nous gérons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {urgences.map((urgence, index) => {
                const Icon = urgence.icon
                return (
                  <div
                    key={index}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-6 flex items-start space-x-4"
                  >
                    <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {urgence.title}
                      </h3>
                      <p className="text-gray-700">{urgence.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Instructions sécurité */}
          <div className="max-w-4xl mx-auto bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <span>En cas d'urgence</span>
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Cessez d'utiliser l'installation électrique concernée</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Si possible, coupez le disjoncteur principal</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Ne touchez pas aux fils électriques ou aux installations endommagées</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Appelez-nous immédiatement : <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-red-600 font-semibold underline">{phoneNumber}</a></span>
              </li>
            </ul>
          </div>

          {/* Formulaire contact rapide */}
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Ou remplissez ce formulaire rapide
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Nous vous rappelons dans les 5 minutes
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Votre téléphone *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <textarea
                placeholder="Décrivez rapidement l'urgence"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Envoyer - Nous vous rappelons immédiatement
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Ou appelez directement :{' '}
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-red-600 font-semibold">
                {phoneNumber}
              </a>
            </p>
          </div>

          {/* Lien vers page contact complète */}
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Formulaire de contact complet →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

