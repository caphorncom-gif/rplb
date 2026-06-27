import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { ContactCTA } from '../components/ContactCTA'
import { TestimonialCard } from '../components/TestimonialCard'
import { supabase } from '../lib/supabase'
import { CheckCircle } from 'lucide-react'

interface Service {
  id: string
  slug: string
  title: string
  description: string
  features: string[] | null
  price_info: string
  image: string | null
}

interface Testimonial {
  id: string
  client_name: string
  client_location: string | null
  rating: number
  comment: string
  service_type: string | null
  date: string | null
}

export const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      if (!slug || !supabase) return

      try {
        // Charger le service
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (serviceError) throw serviceError

        if (serviceData) {
          const service = serviceData as Service
          setService(service)

          // Charger les avis pour ce service
          const { data: testimonialsData } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_approved', true)
            .ilike('service_type', `%${service.title}%`)
            .limit(3)

          if (testimonialsData) {
            setTestimonials(testimonialsData as Testimonial[])
          }
        }
      } catch (error) {
        console.error('Erreur chargement service:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
          <Link to="/services" className="text-primary hover:underline">
            Retour aux services
          </Link>
        </div>
      </div>
    )
  }

  const features = service.features || []

  return (
    <>
      <SEO
        title={`${service.title} - RPLB Électricité Oise`}
        description={service.description.substring(0, 160)}
        keywords={`${service.title}, électricien, Oise, Longueil-Sainte-Marie`}
        type="service"
        breadcrumbs={[
          { name: 'Accueil', url: 'https://www.rplb-electricite.fr/' },
          { name: 'Services', url: 'https://www.rplb-electricite.fr/services' },
          { name: service.title, url: `https://www.rplb-electricite.fr/services/${service.slug}` }
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-gray-100 mb-2">Service pour particuliers et professionnels</p>
          {service.price_info && (
            <p className="text-xl text-gray-100">À partir de {service.price_info}</p>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {service.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-96"
                objectFit="cover"
                loading="eager"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>

          {/* Liste des prestations */}
          {features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Nos Prestations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quel est le délai d'intervention ?
                </h3>
                <p className="text-gray-600">
                  Pour les urgences, nous intervenons sous 2 heures. Pour les projets, nous planifions un rendez-vous dans les 48h.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Le devis est-il gratuit ?
                </h3>
                <p className="text-gray-600">
                  Oui, tous nos devis sont gratuits et sans engagement.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quels sont vos horaires d'intervention ?
                </h3>
                <p className="text-gray-600">
                  Nous intervenons du lundi au vendredi de 8h à 18h. Le samedi matin de 9h à 12h pour les projets planifiés.
                </p>
              </div>
            </div>
          </div>

          {/* Avis clients */}
          {testimonials.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Avis Clients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    clientName={testimonial.client_name}
                    clientLocation={testimonial.client_location || undefined}
                    rating={testimonial.rating}
                    comment={testimonial.comment}
                    serviceType={testimonial.service_type || undefined}
                    date={testimonial.date || undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Formulaire contact rapide */}
          <div className="bg-primary/10 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Intéressé par ce service ?
            </h2>
            <p className="text-gray-700 mb-6">
              Demandez un devis gratuit et sans engagement
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

