import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { TrustBadges } from '../components/TrustBadges'
import { Zap, Users, Award, Heart } from 'lucide-react'

export const About = () => {
  return (
    <>
      <SEO
        title="À Propos - RPLB Électricité | Votre Électricien dans l'Oise"
        description="Découvrez RPLB Électricité : plus de 25 ans d'expérience, professionnels certifiés. Services pour particuliers et professionnels. Électricien de confiance à Longueil-Sainte-Marie."
        keywords="à propos, électricien Longueil-Sainte-Marie, histoire RPLB, équipe électricien Oise"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À Propos de RPLB Électricité
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Votre partenaire de confiance pour tous vos projets électriques - Particuliers et professionnels
          </p>
        </div>
      </div>

      {/* Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Notre Histoire
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Fondée il y a plus de 10 ans, <strong>RPLB Électricité</strong> est devenue une référence 
              dans le domaine de l'électricité dans l'Oise. Basée à Longueil-Sainte-Marie, notre entreprise 
              intervient dans toute la région pour répondre aux besoins des particuliers et des professionnels.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Notre mission est de fournir des services électriques de haute qualité, en respectant les 
              normes les plus strictes et en garantissant la satisfaction de nos clients. Que ce soit 
              pour une installation neuve, une rénovation complète ou une intervention d'urgence, nous 
              mettons notre expertise à votre service.
            </p>
            <p className="text-lg leading-relaxed">
              Notre équipe de professionnels certifiés est formée régulièrement aux dernières technologies 
              et normes en vigueur. Nous sommes fiers de notre réputation basée sur la qualité, la 
              ponctualité et l'écoute de nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
            En Quelques Chiffres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-gray-700">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-700">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-700">Conformité normes</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">Lun-Ven</div>
              <div className="text-gray-700">Disponibilité urgences</div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Qualité</h3>
              <p className="text-gray-600">
                Nous utilisons uniquement des matériaux de qualité et respectons scrupuleusement 
                les normes NF C 15-100.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Réactivité</h3>
              <p className="text-gray-600">
                Intervention rapide pour les urgences, délais respectés pour les projets. 
                Votre temps compte.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Transparence</h3>
              <p className="text-gray-600">
                Devis détaillés et transparents, pas de surprise. Nous vous conseillons toujours 
                la meilleure solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <TrustBadges />

      {/* Zone d'intervention */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            Zone d'Intervention
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Nous intervenons dans un rayon de 30km autour de Longueil-Sainte-Marie
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
              {['Longueil-Sainte-Marie', 'Compiègne', 'Verberie', 'Pont-Sainte-Maxence', 'Crépy-en-Valois', 'Senlis', 'Noyon', 'Montataire'].map((city) => (
                <div key={city} className="bg-white p-3 rounded shadow-sm">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

