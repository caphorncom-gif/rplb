import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { OptimizedImage } from '../components/OptimizedImage'
import { ContactCTA } from '../components/ContactCTA'
import { TestimonialCard } from '../components/TestimonialCard'
import { supabase } from '../lib/supabase'
import { CheckCircle } from 'lucide-react'
import { NotFound } from './NotFound'
import { getServiceContent, serviceDetailLabels, servicePriceLabel } from '../data/servicesContent'

const SITE = 'https://www.rplb-electricite.fr'

interface Service {
  id: string
  slug: string
  title: string
  description: string
  short_description?: string | null
  features: string[] | null
  price_info: string
  image: string | null
}

// Meta description : coupe au dernier mot entier sous la limite (même règle
// que scripts/prerender.mjs, pour que le HTML brut et le rendu JS concordent).
function metaDescription(text: string | null | undefined, max = 158): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.—-]+$/, '') + '…'
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
  // Erreur de chargement (réseau, Supabase) : à ne pas confondre avec un
  // service qui n'existe pas, seul cas où l'on affiche la page 404 (noindex).
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      if (!slug || !supabase) return

      setLoadError(false)
      try {
        // Charger le service
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle()

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
        setLoadError(true)
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

  if (!service && loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service momentanément indisponible</h1>
          <p className="text-gray-600 mb-4">Rechargez la page dans un instant.</p>
          <Link to="/services" className="text-primary hover:underline">
            Retour aux services
          </Link>
        </div>
      </div>
    )
  }

  if (!service) {
    return <NotFound />
  }

  const features = service.features || []
  // Sections, FAQ et liens propres au service : même source que le HTML
  // pré-rendu (src/data/servicesContent.ts).
  const { sections, faq, links } = getServiceContent(service.slug)
  const pageUrl = `${SITE}/services/${service.slug}`
  const pageDescription = metaDescription(service.description || service.short_description)

  return (
    <>
      <SEO
        title={`${service.title} dans l'Oise`}
        description={pageDescription}
        keywords={`${service.title}, électricien, Oise, Longueil-Sainte-Marie`}
        type="service"
        breadcrumbs={[
          { name: 'Accueil', url: `${SITE}/` },
          { name: 'Services', url: `${SITE}/services` },
          { name: service.title, url: pageUrl }
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-gray-100 mb-2">{serviceDetailLabels.subtitle}</p>
          {service.price_info && (
            <p className="text-xl text-gray-100">{servicePriceLabel(service.price_info)}</p>
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

          {/* Sections éditoriales (src/data/servicesContent.ts) */}
          {sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="text-lg text-gray-700 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg text-gray-700">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Liste des prestations */}
          {features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {serviceDetailLabels.featuresHeading}
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

          {/* Liens internes */}
          {links && links.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {serviceDetailLabels.linksHeading}
              </h2>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className="text-primary font-semibold hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ propre au service */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {serviceDetailLabels.faqHeading}
            </h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                  <p className="text-gray-600">{f.a}</p>
                </div>
              ))}
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
              {serviceDetailLabels.ctaHeading}
            </h2>
            <p className="text-gray-700 mb-6">
              {serviceDetailLabels.ctaText}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {serviceDetailLabels.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Service et FAQPage : mêmes schémas que dans le HTML pré-rendu. Le
          prestataire est l'établissement unique #organization (émis par <SEO />). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${pageUrl}#service`,
            name: service.title,
            description: pageDescription,
            provider: { '@id': `${SITE}#organization` },
            url: pageUrl,
            areaServed: { '@type': 'State', name: 'Oise' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <ContactCTA />
    </>
  )
}

