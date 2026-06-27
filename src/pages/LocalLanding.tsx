import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { ServiceCard } from '../components/ServiceCard'
import { supabase } from '../lib/supabase'
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { getCityBySlug, getAllCities } from '../data/localCities'

interface Service {
  id: string
  slug: string
  title: string
  icon: string
  short_description: string
  price_info: string
  image: string | null
}

export const LocalLanding = () => {
  const { city } = useParams<{ city: string }>()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const cityData = city ? getCityBySlug(city) : null

  useEffect(() => {
    const fetchServices = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })
          .limit(6)

        if (error) throw error

        if (data) {
          setServices(data as Service[])
        }
      } catch (error) {
        console.error('Erreur chargement services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Commune non trouvée</h1>
          <Link to="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Zap
  }

  const cityName = cityData.name
  // Optimisation spéciale pour Compiègne
  const isCompiegne = cityData.slug === 'compiegne'
  const pageTitle = cityData.meta_title
    ?? (isCompiegne
      ? `Électricien Compiègne (60200) | Intervention Rapide 24/7 | RPLB Électricité`
      : `Électricien ${cityName} (${cityData.postalCode}) | RPLB Électricité`)
  const pageDescription = cityData.meta_description
    ?? (isCompiegne
      ? `Électricien professionnel à Compiègne (60200) dans l'Oise. Dépannage électrique urgent, installation neuve, rénovation électrique. Intervention rapide dans tous les quartiers de Compiègne : Centre-ville, Royallieu, Clos des Roses, Saint-Lazare. Devis gratuit. Certifié Qualifelec et RGE.`
      : `Électricien professionnel à ${cityName} dans l'Oise. Dépannage, installation, rénovation électrique. Intervention rapide à ${cityName} et alentours. Devis gratuit.`)
  const pageKeywords = isCompiegne
    ? `électricien compiègne, électricien compiègne 60200, dépannage électrique compiègne, installation électrique compiègne, électricien centre-ville compiègne, électricien royallieu compiègne, électricien compiègne urgence, électricien compiègne devis gratuit, électricien compiègne rénovation, électricien compiègne domotique, électricien compiègne borne recharge, électricien oise`
    : `électricien ${cityName}, dépannage électrique ${cityName}, installation électrique ${cityName}, électricien ${cityData.postalCode}, électricien Oise`

  return (
    <>
      <SEO
        title={pageTitle}
        documentTitleVerbatim={!!cityData.meta_title}
        description={pageDescription}
        keywords={pageKeywords}
        breadcrumbs={[
          { name: 'Accueil', url: 'https://www.rplb-electricite.fr/' },
          { name: `Électricien ${cityName}`, url: `https://www.rplb-electricite.fr/electricien/${city}` }
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isCompiegne ? 'Électricien Compiègne (60200) | Intervention Rapide' : `Électricien à ${cityName}`}
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-6">
            {isCompiegne 
              ? `Électricien professionnel à Compiègne dans l'Oise. Dépannage urgent, installation, rénovation électrique. Intervention dans tous les quartiers de Compiègne.`
              : `Services électriques professionnels à ${cityName} (${cityData.postalCode}) et dans l'Oise`}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{cityName}, {cityData.postalCode}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Intervention rapide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Disponible du lundi au vendredi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description de la ville */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {isCompiegne ? 'Électricien Professionnel à Compiègne (60200)' : `Électricien professionnel à ${cityName}`}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {cityData.description}
            </p>
            {isCompiegne && (
              <>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-8">
                  Intervention dans Tous les Quartiers de Compiègne
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  RPLB Électricité intervient dans tous les quartiers de Compiègne pour répondre à vos besoins électriques :
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
                  <li><strong>Centre-ville de Compiègne</strong> : Rénovation électrique dans le patrimoine historique, mise aux normes des anciens bâtiments</li>
                  <li><strong>Royallieu</strong> : Installation électrique neuve, domotique, borne de recharge véhicule électrique</li>
                  <li><strong>Clos des Roses</strong> : Dépannage électrique urgent, installation et rénovation</li>
                  <li><strong>Saint-Lazare</strong> : Services électriques pour particuliers et professionnels</li>
                  <li><strong>Quartier de la Gare</strong> : Installation électrique, rénovation, dépannage</li>
                  <li><strong>Vieux-Compiègne</strong> : Rénovation électrique respectueuse du patrimoine</li>
                </ul>
              </>
            )}
            <p className="text-lg text-gray-700 leading-relaxed">
              RPLB Électricité intervient à {cityName} et dans un rayon de 30km autour de Longueil-Sainte-Marie. 
              Que vous soyez particulier ou professionnel, nous vous proposons des services électriques de qualité 
              pour tous vos besoins : dépannage urgent, installation neuve, rénovation, domotique, climatisation, 
              alarme et vidéosurveillance, ou encore installation de borne de recharge pour véhicule électrique.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Nos Services à {cityName}
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12">
            Services électriques pour particuliers et professionnels à {cityName}
          </p>
          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = getIcon(service.icon)
                return (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    slug={service.slug}
                    title={service.title}
                    icon={Icon}
                    shortDescription={service.short_description}
                    priceInfo={service.price_info}
                    image={service.image || undefined}
                  />
                )
              })}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-semibold text-lg"
            >
              <span>Voir tous les services</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi choisir RPLB Électricité à {cityName} ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Intervention Rapide</h3>
              <p className="text-gray-600">
                Disponibles du lundi au vendredi pour vos urgences électriques à {cityName}. 
                Intervention rapide en semaine.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professionnels Certifiés</h3>
              <p className="text-gray-600">
                Assurance décennale. Travaux conformes aux normes NF C 15-100. 
                Qualifelec, RGE.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Plus de 25 ans d'expérience</h3>
              <p className="text-gray-600">
                Expertise dans tous les domaines de l'électricité résidentielle 
                et tertiaire à {cityName} et dans l'Oise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Zone d'Intervention
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Nous intervenons à {cityName} et dans un rayon de 30km autour de Longueil-Sainte-Marie
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-gray-600">
              {getAllCities()
                .sort((a, b) => b.priority - a.priority)
                .slice(0, 24)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/electricien/${c.slug}`}
                    className={`bg-white p-3 rounded shadow-sm text-sm text-center hover:bg-primary hover:text-white transition-colors ${c.name === cityName ? 'ring-2 ring-primary font-semibold' : ''}`}
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Et bien d'autres communes dans un rayon de 15 km autour de Longueil-Sainte-Marie
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section avec Schema.org */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {isCompiegne ? 'Questions Fréquentes - Électricien Compiègne (60200)' : `Questions Fréquentes - Électricien à ${cityName}`}
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Combien coûte une intervention d'électricien à {cityName} ?
              </h3>
              <p className="text-gray-700">
                Le coût d'une intervention dépend de la nature des travaux. Pour un dépannage urgent à {cityName}, 
                comptez entre 80€ et 150€ pour le déplacement et la première heure. Pour une installation complète 
                ou une rénovation, nous proposons des devis gratuits adaptés à vos besoins.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Intervenez-vous en urgence à {cityName} ?
              </h3>
              <p className="text-gray-700">
                Oui, nous intervenons en urgence à {cityName} et dans toute l'Oise. Disponibles du lundi au vendredi 
                de 8h à 18h, nous pouvons traiter vos urgences électriques rapidement. Pour les urgences en dehors 
                des horaires, contactez-nous au 07 85 54 70 68.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Êtes-vous certifiés et assurés ?
              </h3>
              <p className="text-gray-700">
                Oui, RPLB Électricité est certifié Qualifelec et RGE (Reconnu Garant de l'Environnement). 
                Nous disposons d'une assurance décennale et tous nos travaux sont conformes aux normes NF C 15-100. 
                Plus de 25 ans d'expérience à votre service à {cityName} et dans l'Oise.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Proposez-vous des devis gratuits à {cityName} ?
              </h3>
              <p className="text-gray-700">
                Oui, tous nos devis sont gratuits et sans engagement. Que ce soit pour une installation neuve, 
                une rénovation électrique, une mise aux normes ou l'installation d'une borne de recharge, 
                nous vous proposons un devis détaillé adapté à vos besoins à {cityName}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens vers autres communes proches */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Nous Intervenons Aussi Dans Ces Communes Proches
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getAllCities()
                .filter(c => c.slug !== cityData.slug && c.priority >= 0.8)
                .sort((a, b) => b.priority - a.priority)
                .slice(0, 12)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/electricien/${c.slug}`}
                    className="bg-white p-3 rounded shadow-sm text-sm text-center hover:bg-primary hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data - LocalBusiness pour cette ville */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `https://www.rplb-electricite.fr/electricien/${cityData.slug}#localbusiness`,
            name: isCompiegne 
              ? 'RPLB Électricité - Électricien Compiègne (60200)'
              : `RPLB Électricité - Électricien à ${cityName}`,
            image: 'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/logo-rplb.png',
            telephone: '07 86 17 22 82',
            email: 'rplb.electricite@gmail.com',
            url: `https://www.rplb-electricite.fr/electricien/${cityData.slug}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: cityName,
              addressLocality: cityName,
              postalCode: cityData.postalCode,
              addressRegion: 'Hauts-de-France',
              addressCountry: 'FR'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: cityData.lat,
              longitude: cityData.lng
            },
            areaServed: isCompiegne ? [
              {
                '@type': 'City',
                name: 'Compiègne'
              },
              {
                '@type': 'Place',
                name: 'Centre-ville de Compiègne'
              },
              {
                '@type': 'Place',
                name: 'Royallieu'
              },
              {
                '@type': 'Place',
                name: 'Clos des Roses'
              },
              {
                '@type': 'Place',
                name: 'Saint-Lazare'
              }
            ] : {
              '@type': 'City',
              name: cityName
            },
            priceRange: '€€',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00'
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '12:00'
              }
            ],
            ...(isCompiegne && {
              description: 'Électricien professionnel à Compiègne (60200). Dépannage électrique urgent, installation neuve, rénovation électrique. Intervention rapide dans tous les quartiers de Compiègne : Centre-ville, Royallieu, Clos des Roses, Saint-Lazare. Certifié Qualifelec et RGE.',
              keywords: 'électricien compiègne, électricien compiègne 60200, dépannage électrique compiègne, installation électrique compiègne, électricien centre-ville compiègne, électricien royallieu compiègne'
            }),
            sameAs: []
          })
        }}
      />

      {/* Structured Data - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `Combien coûte une intervention d'électricien à ${cityName} ?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Le coût d'une intervention dépend de la nature des travaux. Pour un dépannage urgent à ${cityName}, comptez entre 80€ et 150€ pour le déplacement et la première heure. Pour une installation complète ou une rénovation, nous proposons des devis gratuits adaptés à vos besoins.`
                }
              },
              {
                '@type': 'Question',
                name: `Intervenez-vous en urgence à ${cityName} ?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Oui, nous intervenons en urgence à ${cityName} et dans toute l'Oise. Disponibles du lundi au vendredi de 8h à 18h, nous pouvons traiter vos urgences électriques rapidement. Pour les urgences en dehors des horaires, contactez-nous au 07 85 54 70 68.`
                }
              },
              {
                '@type': 'Question',
                name: 'Êtes-vous certifiés et assurés ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Oui, RPLB Électricité est certifié Qualifelec et RGE (Reconnu Garant de l'Environnement). Nous disposons d'une assurance décennale et tous nos travaux sont conformes aux normes NF C 15-100. Plus de 25 ans d'expérience à votre service à ${cityName} et dans l'Oise.`
                }
              },
              {
                '@type': 'Question',
                name: `Proposez-vous des devis gratuits à ${cityName} ?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Oui, tous nos devis sont gratuits et sans engagement. Que ce soit pour une installation neuve, une rénovation électrique, une mise aux normes ou l'installation d'une borne de recharge, nous vous proposons un devis détaillé adapté à vos besoins à ${cityName}.`
                }
              }
            ]
          })
        }}
      />

      <ContactCTA />
    </>
  )
}

