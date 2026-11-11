import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { SEO } from '../components/SEO'
import { notFoundPage } from '../data/pagesContent'

/**
 * Page introuvable. Rendue par la route `*` et par les fiches dynamiques
 * (service, article, commune) quand le slug n'existe pas.
 *
 * Le statut HTTP 404 est donné par Vercel : `scripts/prerender.mjs` écrit
 * `dist/404.html` avec ce même contenu (textes dans `pagesContent.ts`), et
 * `vercel.json` ne contient plus de réécriture attrape-tout vers index.html.
 */
export const NotFound = () => {
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || '07 86 17 22 82'

  return (
    <>
      <SEO title={notFoundPage.title} noindex />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-secondary-dark font-semibold uppercase tracking-widest text-sm mb-2">
            Erreur 404
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">{notFoundPage.h1}</h1>
          <p className="text-lg text-gray-700 mb-8">{notFoundPage.text}</p>
          <ul className="space-y-3 mb-10">
            {notFoundPage.links.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-primary font-semibold hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-gray-700">
            {notFoundPage.callLead}{' '}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Phone className="w-4 h-4" />
              {phoneNumber}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
