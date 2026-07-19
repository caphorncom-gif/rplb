import { useEffect, useState } from 'react'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { TrustBadges } from '../components/TrustBadges'
import { GoogleReviewsCarousel } from '../components/GoogleReviewsCarousel'
import { ContactCTA } from '../components/ContactCTA'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { supabase } from '../lib/supabase'
import { CheckCircle, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getServiceIcon } from '../lib/serviceIcons'

interface Service {
  id: string
  slug: string
  title: string
  icon: string
  short_description: string
  price_info: string
  image: string | null
}

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
}

const interventionCities = [
  { slug: 'longueil-sainte-marie', name: 'Longueil-Sainte-Marie' },
  { slug: 'compiegne', name: 'Compiègne' },
  { slug: 'verberie', name: 'Verberie' },
  { slug: 'pont-sainte-maxence', name: 'Pont-Sainte-Maxence' },
  { slug: 'crepy-en-valois', name: 'Crépy-en-Valois' },
  { slug: 'senlis', name: 'Senlis' },
  { slug: 'noyon', name: 'Noyon' },
  { slug: 'montataire', name: 'Montataire' },
]

const brands = ['Schneider Electric', 'Legrand', 'Hager', 'Somfy', 'Siemens', 'ABB']

const engagements = [
  'Un devis gratuit et détaillé, sans surprise',
  'Des installations conformes NF C 15-100, garanties 10 ans',
  'Un chantier propre, nettoyé au fur et à mesure',
  'Un point d\'avancement chaque jour sur les chantiers longs',
]

export const Home = () => {
  const [services, setServices] = useState<Service[]>([])
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

  return (
    <>
      <SEO
        title="Électricien dans l'Oise — Compiègne & Senlis"
        description="Électricien dans l'Oise : RPLB intervient à Compiègne, Senlis, Noyon, Crépy-en-Valois et alentours. Dépannage, installation, rénovation et mise aux normes électriques. Devis gratuit, artisans certifiés."
        keywords="électricien Oise, électricien Compiègne, électricien Senlis, dépannage électrique, installation électrique, rénovation électrique, mise aux normes NF C 15-100"
      />

      <Hero
        title={
          <>
            Électricien dans l'Oise,{' '}
            <span className="text-accent">l'électricité dans les règles de l'art</span>
          </>
        }
      />

      <TrustBadges />

      {/* Services */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-secondary-dark font-semibold uppercase tracking-widest text-sm mb-2">
                Nos services
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink text-balance">
                Du dépannage à la domotique,
                <br className="hidden md:block" /> un seul interlocuteur
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary-dark font-semibold shrink-0 transition-colors"
            >
              Voir tous les services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">Chargement…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = getServiceIcon(service.icon)
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
        </div>
      </section>

      {/* L'équipe & engagements */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div
                className="absolute inset-0 -translate-x-4 translate-y-4 rounded-2xl bg-paper border border-ink/10"
                aria-hidden="true"
              />
              <OptimizedImage
                src="https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/services/pagnier-bozo-photo-web.jpg"
                alt="Romain Pagnier et Ludovic Bozo, électriciens RPLB Électricité"
                className="relative w-full h-auto rounded-2xl shadow-card"
              />
            </div>
            <div>
              <p className="text-secondary-dark font-semibold uppercase tracking-widest text-sm mb-2">
                Qui sommes-nous ?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6 text-balance">
                Deux artisans, plus de 25 ans de métier
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Romain Pagnier et Ludovic Bozo interviennent dans toute l'Oise pour vos travaux
                d'électricité, du simple dépannage à la rénovation complète. Une entreprise à taille
                humaine : ceux qui établissent le devis sont ceux qui font le chantier.
              </p>
              <ul className="space-y-4">
                {engagements.map((engagement) => (
                  <li key={engagement} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 shrink-0" />
                    <span className="text-gray-700">{engagement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <GoogleReviewsCarousel />

      {/* Zone d'intervention */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-secondary-dark font-semibold uppercase tracking-widest text-sm mb-2">
              Zone d'intervention
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 text-balance">
              À moins de 30 minutes de chez vous
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Basés à Longueil-Sainte-Marie, nous intervenons dans un rayon de 30 km : Compiègne,
              Senlis, Pont-Sainte-Maxence, Crépy-en-Valois et toutes les communes alentour.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {interventionCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/electricien/${city.slug}`}
                  className="inline-flex items-center gap-2 bg-paper border border-ink/10 hover:border-secondary hover:bg-secondary/5 text-ink px-4 py-2.5 rounded-full font-medium transition-colors"
                >
                  <MapPin className="w-4 h-4 text-secondary-dark" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marques installées */}
      <section className="py-10 bg-paper border-y border-ink/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-6">
            Nous installons du matériel de grandes marques
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {brands.map((brand) => (
              <span key={brand} className="font-display font-bold text-lg text-ink/40">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog (3 derniers articles) */}
      {articles.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="text-secondary-dark font-semibold uppercase tracking-widest text-sm mb-2">
                  Conseils &amp; actualités
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-ink">Nos derniers articles</h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary-dark font-semibold shrink-0 transition-colors"
              >
                Voir tous les articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl border border-ink/10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {article.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <OptimizedImage
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-ink group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
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
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  )
}
