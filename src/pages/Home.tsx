import { useEffect, useState } from 'react'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { TestimonialCard } from '../components/TestimonialCard'
import { TrustBadges } from '../components/TrustBadges'
import { PartnersCarousel } from '../components/PartnersCarousel'
import { GoogleReviewsCarousel } from '../components/GoogleReviewsCarousel'
import { ContactCTA } from '../components/ContactCTA'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { supabase } from '../lib/supabase'
import { Zap, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as LucideIcons from 'lucide-react'

interface Service {
  id: string
  slug: string
  title: string
  icon: string
  short_description: string
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

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
}

export const Home = () => {
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier que Supabase est disponible
        if (!supabase) {
          console.warn('[Home] Supabase non disponible')
          setLoading(false)
          return
        }

        // Charger services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true })
          .limit(6)

        if (servicesError) {
          console.error('[Home] Erreur chargement services:', servicesError)
        } else if (servicesData) {
          setServices(servicesData as Service[])
        }

        // Charger avis clients
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(3)

        if (testimonialsError) {
          console.error('[Home] Erreur chargement avis:', testimonialsError)
        } else if (testimonialsData) {
          setTestimonials(testimonialsData as Testimonial[])
        }

        // Charger articles de blog
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(3)

        if (articlesError) {
          console.error('[Home] Erreur chargement articles:', articlesError)
        } else if (articlesData) {
          setArticles(articlesData as Article[])
        }
      } catch (error) {
        console.error('[Home] Erreur chargement données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || LucideIcons.Zap
  }

  return (
    <>
      <SEO
        title="Électricien Longueil-Sainte-Marie | RPLB Électricité"
        description="Électricien professionnel à Longueil-Sainte-Marie et Compiègne. Services pour particuliers et professionnels. Dépannage, installation, rénovation électrique. Intervention rapide dans l'Oise."
        keywords="électricien, dépannage électrique, installation électrique, rénovation électrique, Oise, Longueil-Sainte-Marie, Compiègne"
      />

      <Hero />

      {/* Photo professionnelle */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OptimizedImage
              src="https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/services/pagnier-bozo-photo-web.jpg"
              alt="RPLB Électricité - Romain Pagnier et Ludovic Bozo, électriciens professionnels"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Nos Services
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12">
            Services électriques pour particuliers et professionnels
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

      {/* Zone d'intervention */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
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

      {/* Certifications */}
      <TrustBadges />

      {/* Partenaires */}
      <PartnersCarousel />

      {/* Avis Google */}
      <GoogleReviewsCarousel />

      {/* Avis clients */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Ce que disent nos clients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
        </section>
      )}

      {/* Pourquoi nous choisir */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi choisir RPLB Électricité ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Intervention Rapide</h3>
              <p className="text-gray-600">
                Disponibles du lundi au vendredi pour vos urgences électriques. Intervention rapide en semaine.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professionnels Certifiés</h3>
              <p className="text-gray-600">
                Assurance décennale. Travaux conformes aux normes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Plus de 25 ans d'expérience</h3>
              <p className="text-gray-600">
                Expertise dans tous les domaines de l'électricité résidentielle et tertiaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog (3 derniers articles) */}
      {articles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Nos Derniers Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {article.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <OptimizedImage
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{article.title}</h3>
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    )}
                    {article.published_at && (
                      <p className="text-sm text-gray-400">
                        {new Date(article.published_at).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-semibold text-lg"
              >
                <span>Voir tous les articles</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  )
}

