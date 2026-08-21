/**
 * Prerender des balises SEO par route (post-build).
 *
 * Problème corrigé : le site est une SPA Vite. Vercel réécrit toutes les routes
 * vers `index.html`, qui porte un canonical codé en dur vers la page d'accueil et
 * un `robots: index, follow`. Résultat, avant exécution du JavaScript, chaque URL
 * annonce aux robots « ma version canonique est la page d'accueil » — et le
 * `noindex` des communes secondaires n'existe que côté client.
 *
 * Ce script écrit, pour chaque route connue, un `dist/<route>/index.html` : même
 * application, mais avec title / description / canonical / robots corrects dès la
 * réponse HTTP. Vercel sert un fichier statique existant avant d'appliquer les
 * rewrites, donc ces fichiers priment sans changer le routage.
 *
 * Les métadonnées des communes sont lues depuis `src/data/localCities.ts`
 * (transpilé à la volée avec esbuild) : pas de duplication de la liste.
 *
 * Usage : node scripts/prerender-seo.js   (lancé par `npm run build`)
 */

import { build } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { pathToFileURL } from 'url'

const ROOT = process.cwd()
const DIST = join(ROOT, 'dist')
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'
const SITE_NAME = process.env.VITE_COMPANY_NAME || 'RPLB Électricité'

/** Charge localCities.ts (source unique de vérité) via esbuild. */
async function loadCities() {
  const tmp = join(DIST, '.localCities.prerender.mjs')
  await build({
    entryPoints: [join(ROOT, 'src', 'data', 'localCities.ts')],
    outfile: tmp,
    format: 'esm',
    platform: 'node',
    bundle: false,
    logLevel: 'silent',
  })
  const mod = await import(pathToFileURL(tmp).href)
  rmSync(tmp, { force: true })
  return mod
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Réécrit les balises SEO du template.
 * Les balises visées existent toutes dans index.html : on remplace en place.
 */
function renderHtml(template, { title, description, canonical, index }) {
  const robots = index
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, follow'

  let html = template
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`
    )
    .replace(
      /<meta name="robots" content="[^"]*" \/>/,
      `<meta name="robots" content="${robots}" />`
    )
    .replace(
      /<meta name="googlebot" content="[^"]*" \/>/,
      `<meta name="googlebot" content="${robots}" />`
    )
    .replace(
      /<meta name="bingbot" content="[^"]*" \/>/,
      `<meta name="bingbot" content="${robots}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeAttr(title)}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeAttr(description)}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeAttr(canonical)}" />\n    <meta property="og:url" content="${escapeAttr(canonical)}" />`
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)

  return html
}

/** Écrit dist/<route>/index.html (ou dist/index.html pour la racine). */
function writeRoute(route, html) {
  const target =
    route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf-8')
}

/** Routes statiques : title/description alignés sur les composants React. */
const STATIC_ROUTES = [
  {
    route: '/',
    title: `${SITE_NAME} - Électricien Longueil-Sainte-Marie (60)`,
    description:
      "Électricien professionnel à Longueil-Sainte-Marie. Installation, dépannage, rénovation électrique. Intervention rapide dans l'Oise. Devis gratuit.",
  },
  {
    route: '/services',
    title: `Nos services d'électricité | ${SITE_NAME}`,
    description:
      "Dépannage, installation neuve, rénovation électrique, domotique, climatisation, alarme et borne de recharge. Électricien certifié Qualifelec et RGE dans l'Oise.",
  },
  {
    route: '/realisations',
    title: `Nos réalisations | ${SITE_NAME}`,
    description:
      "Découvrez nos chantiers d'électricité réalisés à Longueil-Sainte-Marie, Compiègne et dans tout l'Oise : rénovation, installation neuve, domotique, bornes de recharge.",
  },
  {
    route: '/blog',
    title: `Conseils d'électricien | ${SITE_NAME}`,
    description:
      "Guides et conseils pratiques d'un électricien de l'Oise : normes NF C 15-100, rénovation électrique, domotique, bornes de recharge, dépannage.",
  },
  {
    route: '/about',
    title: `Qui sommes-nous | ${SITE_NAME}`,
    description:
      "RPLB Électricité, électricien à Longueil-Sainte-Marie (60). Plus de 25 ans d'expérience, certifié Qualifelec et RGE, assurance décennale.",
  },
  {
    route: '/contact',
    title: `Contact & devis gratuit | ${SITE_NAME}`,
    description:
      "Contactez RPLB Électricité pour un devis gratuit. Électricien à Longueil-Sainte-Marie et dans tout l'Oise. Réponse rapide, intervention en semaine.",
  },
  {
    route: '/urgence',
    title: `Dépannage électrique urgent | ${SITE_NAME}`,
    description:
      "Panne de courant, disjoncteur qui saute, court-circuit ? Dépannage électrique rapide dans l'Oise par un électricien certifié. Appelez le 07 86 17 22 82.",
  },
  {
    route: '/mentions-legales',
    title: `Mentions légales | ${SITE_NAME}`,
    description: `Mentions légales du site ${SITE_NAME}, électricien à Longueil-Sainte-Marie (60).`,
    index: false,
  },
]

/** Routes dynamiques (services, articles) listées dans le sitemap déjà généré. */
function routesFromSitemap() {
  const sitemapPath = join(DIST, 'sitemap.xml')
  if (!existsSync(sitemapPath)) return []
  const xml = readFileSync(sitemapPath, 'utf-8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE_URL, ''))
    .filter((route) => route.startsWith('/services/') || route.startsWith('/blog/'))
}

/** Titre/description d'une commune — même logique que src/pages/LocalLanding.tsx. */
function cityMeta(city) {
  const isCompiegne = city.slug === 'compiegne'
  const title =
    city.meta_title ??
    (isCompiegne
      ? `Électricien Compiègne (60200) | Intervention Rapide 24/7 | ${SITE_NAME}`
      : `Électricien ${city.name} (${city.postalCode}) | ${SITE_NAME}`)
  const description =
    city.meta_description ??
    (isCompiegne
      ? "Électricien professionnel à Compiègne (60200) dans l'Oise. Dépannage électrique urgent, installation neuve, rénovation électrique. Intervention rapide dans tous les quartiers de Compiègne. Devis gratuit. Certifié Qualifelec et RGE."
      : `Électricien professionnel à ${city.name} dans l'Oise. Dépannage, installation, rénovation électrique. Intervention rapide à ${city.name} et alentours. Devis gratuit.`)
  return { title, description }
}

async function main() {
  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    console.error('❌ dist/index.html introuvable — lancer `vite build` avant.')
    process.exit(1)
  }
  const template = readFileSync(templatePath, 'utf-8')

  const { LOCAL_CITIES, shouldIndexCity } = await loadCities()

  let indexed = 0
  let noindexed = 0

  // Pages statiques
  for (const page of STATIC_ROUTES) {
    const index = page.index !== false
    writeRoute(
      page.route,
      renderHtml(template, {
        title: page.title,
        description: page.description,
        canonical: page.route === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.route}`,
        index,
      })
    )
    index ? indexed++ : noindexed++
  }

  // Services et articles (canonical + robots corrects ; le titre précis reste
  // posé par React, ces contenus vivant dans Supabase).
  for (const route of routesFromSitemap()) {
    const label = route.startsWith('/blog/') ? 'Conseils' : 'Services'
    writeRoute(
      route,
      renderHtml(template, {
        title: `${label} | ${SITE_NAME}`,
        description:
          "Électricien certifié Qualifelec et RGE à Longueil-Sainte-Marie et dans tout l'Oise. Dépannage, installation, rénovation électrique. Devis gratuit.",
        canonical: `${SITE_URL}${route}`,
        index: true,
      })
    )
    indexed++
  }

  // Communes : toutes, y compris celles en noindex (c'est justement là que le
  // signal doit être fiable sans dépendre de l'exécution du JavaScript).
  for (const city of Object.values(LOCAL_CITIES)) {
    const { title, description } = cityMeta(city)
    const index = shouldIndexCity(city)
    writeRoute(
      `/electricien/${city.slug}`,
      renderHtml(template, {
        title,
        description,
        canonical: `${SITE_URL}/electricien/${city.slug}`,
        index,
      })
    )
    index ? indexed++ : noindexed++
  }

  console.log(
    `✅ Prerender SEO : ${indexed + noindexed} route(s) — ${indexed} indexable(s), ${noindexed} en noindex.`
  )
}

main().catch((error) => {
  console.error('❌ Erreur prerender SEO :', error)
  process.exit(1)
})
