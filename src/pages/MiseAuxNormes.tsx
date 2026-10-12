import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { miseAuxNormes, MISE_AUX_NORMES_PATH } from '../data/miseAuxNormes'
import { getAllCities, shouldIndexCity } from '../data/localCities'

const SITE = 'https://www.rplb-electricite.fr'

export const MiseAuxNormes = () => {
  const { title, description, h1, intro, sections, faq } = miseAuxNormes
  const pageUrl = `${SITE}${MISE_AUX_NORMES_PATH}`
  const cities = getAllCities()
    .filter(shouldIndexCity)
    .sort((a, b) => b.priority - a.priority)

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="mise aux normes électrique, mise aux normes électrique oise, mise en sécurité électrique, norme NF C 15-100, électricien oise"
        breadcrumbs={[
          { name: 'Accueil', url: `${SITE}/` },
          { name: 'Mise aux normes électrique', url: pageUrl },
        ]}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{h1}</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">{intro}</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{section.heading}</h2>
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

          <p className="text-lg text-gray-700 leading-relaxed">
            Pour aller plus loin, lisez notre guide sur{' '}
            <Link to="/blog/installation-electrique-normes-nf-c-15-100" className="text-primary font-semibold hover:underline">
              la norme NF C 15-100
            </Link>{' '}
            et celui consacré à{' '}
            <Link to="/blog/renovation-electrique-maison-ancienne-guide" className="text-primary font-semibold hover:underline">
              la rénovation électrique d'une maison ancienne
            </Link>
            , ou découvrez notre service de{' '}
            <Link to="/services/renovation-electrique" className="text-primary font-semibold hover:underline">
              rénovation électrique
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Questions fréquentes</h2>
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Mise aux normes électrique près de chez vous</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link to={`/electricien/${c.slug}`} className="text-primary hover:underline">
                  Électricien à {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service : le prestataire est l'établissement unique #organization (émis par <SEO />). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${pageUrl}#service`,
            name: 'Mise aux normes électrique',
            serviceType: 'Mise aux normes électrique',
            description,
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
