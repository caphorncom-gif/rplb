import { Award, Shield } from 'lucide-react'

interface Certification {
  name: string
  description: string
  icon?: 'award' | 'shield'
}

interface TrustBadgesProps {
  certifications?: Certification[]
}

const defaultCertifications: Certification[] = [
  {
    name: 'Assurance Décennale',
    description: 'Garantie décennale',
    icon: 'shield'
  }
]

const iconMap = {
  award: Award,
  shield: Shield
}

export const TrustBadges = ({ certifications = defaultCertifications }: TrustBadgesProps) => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Certifications & Garanties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon ? iconMap[cert.icon] : Award
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

