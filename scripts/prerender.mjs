#!/usr/bin/env node
/**
 * Pré-rendu HTML statique des routes SEO (étape post-build).
 *
 * POURQUOI
 * Le site est une SPA Vite : Vercel sert le même `index.html` (3,8 ko) pour
 * TOUTES les URLs. Titre, meta description, canonical, robots, H1, contenu et
 * données structurées sont injectés par React APRÈS chargement du JS. Sans
 * exécution du JS, Google voit donc 80 pages strictement identiques, portant
 * toutes le titre de l'accueil — y compris les pages censées être en `noindex`,
 * dont la balise n'apparaît qu'après rendu.
 * Constat mesuré (GSC, 28 j au 2026-07-28) : l'accueil, seule page dont le HTML
 * est réellement servi, est en position ~6-10 ; les pages communes, pourtant
 * dotées de 700 à 1 100 caractères de contenu unique, plafonnent entre 21 et 44.
 *
 * CE QUE FAIT LE SCRIPT
 * Pour chaque route SEO, il écrit `dist/<route>/index.html` : un clone de
 * `dist/index.html` dont le <head> porte les vraies balises de la page et dont
 * `#root` contient une version HTML du contenu (H1, texte, FAQ, liens internes,
 * JSON-LD). Vercel sert ce fichier en priorité (le filesystem passe avant les
 * rewrites), donc crawlers et navigateurs reçoivent du HTML complet.
 *
 * POURQUOI C'EST SANS RISQUE POUR L'APPLI
 * `main.tsx` monte React avec `createRoot(...).render(...)` et non
 * `hydrateRoot(...)` : au montage, React remplace intégralement le contenu de
 * `#root`. Aucun risque de « hydration mismatch ». Le contenu pré-rendu n'est
 * qu'un état initial, visible le temps du chargement du JS — ce qui améliore
 * aussi le premier affichage.
 *
 * IMPORTANT : le texte pré-rendu doit rester le MÊME que celui rendu par React
 * (mêmes titres, même contenu). Il est donc dérivé des mêmes sources
 * (`src/data/localCities.ts`) plutôt que réécrit à la main.
 *
 * Usage : node scripts/prerender.mjs   (appelé par `npm run build`)
 */
import { build } from 'esbuild'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { pathToFileURL } from 'url'

dotenv.config()

const DIST = 'dist'
const SITE = process.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'
const SITE_NAME = process.env.VITE_COMPANY_NAME || 'RPLB Électricité'
const PHONE = process.env.VITE_CONTACT_PHONE || '07 86 17 22 82'
const BRAND_IMAGE =
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/logo-rplb.png'

const DEFAULT_DESCRIPTION =
  "Électricien professionnel à Longueil-Sainte-Marie. Installation, dépannage, rénovation électrique. Intervention rapide dans l'Oise. Devis gratuit."

/** Échappe le texte destiné à un nœud HTML ou à un attribut. */
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Échappe une chaîne insérée dans un <script type="application/ld+json">. */
const escJsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

/**
 * Charge `src/data/localCities.ts` depuis Node en le transpilant à la volée
 * avec esbuild (déjà installé comme dépendance de Vite).
 */
async function loadCities() {
  const tmp = join(DIST, '.prerender-cities.mjs')
  await build({
    entryPoints: ['src/data/localCities.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tmp,
    logLevel: 'silent',
  })
  // pathToFileURL : le chemin du projet contient des espaces (« Sites clients »).
  const mod = await import(pathToFileURL(resolve(tmp)).href)
  rmSync(tmp, { force: true })
  return mod
}

/** Récupère services et articles publiés (optionnel : sans credentials, on saute). */
async function loadDynamicContent() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn(
      '⚠️  VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY absentes : services et articles non pré-rendus.'
    )
    return { services: [], articles: [] }
  }
  const supabase = createClient(url, key)
  const [svc, art] = await Promise.all([
    supabase.from('services').select('*').eq('is_active', true),
    supabase.from('articles').select('*').eq('is_published', true),
  ])
  if (svc.error) console.warn('⚠️  Services non récupérés :', svc.error.message)
  if (art.error) console.warn('⚠️  Articles non récupérés :', art.error.message)
  return { services: svc.data || [], articles: art.data || [] }
}

/**
 * Produit le HTML d'une page à partir du template `dist/index.html`.
 * Remplace les balises du <head> déjà présentes (elles portent les valeurs de
 * l'accueil) et injecte le contenu dans `#root`.
 */
function renderPage(template, { path, title, description, keywords, noindex, bodyHtml, jsonLd }) {
  const canonical = path === '/' ? `${SITE}/` : `${SITE}${path}`
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  let html = template

  const replaceOrWarn = (regex, replacement, label) => {
    if (!regex.test(html)) {
      throw new Error(
        `Pré-rendu impossible : balise « ${label} » introuvable dans dist/index.html. ` +
          `Le template a changé — mettre à jour scripts/prerender.mjs.`
      )
    }
    html = html.replace(regex, replacement)
  }

  replaceOrWarn(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, 'title')
  replaceOrWarn(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`,
    'meta description'
  )
  replaceOrWarn(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    'canonical'
  )
  replaceOrWarn(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`, 'robots')

  // googlebot / bingbot portent les mêmes directives d'indexation.
  html = html
    .replace(/<meta name="googlebot"[^>]*>/, `<meta name="googlebot" content="${robots}" />`)
    .replace(/<meta name="bingbot"[^>]*>/, `<meta name="bingbot" content="${robots}" />`)
    .replace(
      /<meta name="keywords"[^>]*>/,
      keywords ? `<meta name="keywords" content="${esc(keywords)}" />` : ''
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${esc(title)}" />`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${esc(description)}" />\n    ` +
        `<meta property="og:url" content="${esc(canonical)}" />\n    ` +
        `<meta property="og:image" content="${esc(BRAND_IMAGE)}" />`
    )
    .replace(
      /<meta name="twitter:card"[^>]*>/,
      `<meta name="twitter:card" content="summary_large_image" />\n    ` +
        `<meta name="twitter:title" content="${esc(title)}" />\n    ` +
        `<meta name="twitter:description" content="${esc(description)}" />\n    ` +
        `<meta name="twitter:image" content="${esc(BRAND_IMAGE)}" />`
    )

  // Les JSON-LD sont placés DANS #root : React les remplace au montage, ce qui
  // évite d'avoir en double ceux qu'émettent les composants côté client.
  const schemas = (jsonLd || [])
    .map((s) => `<script type="application/ld+json">${escJsonLd(s)}</script>`)
    .join('\n')

  const shell = `<div id="root">${bodyHtml || ''}${schemas}</div>`
  if (!/<div id="root"><\/div>/.test(html)) {
    throw new Error('Pré-rendu impossible : <div id="root"></div> introuvable dans dist/index.html.')
  }
  return html.replace(/<div id="root"><\/div>/, shell)
}

function writePage(path, html) {
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html, 'utf8')
}

/** Enveloppe de mise en page du contenu pré-rendu (visible avant le montage React). */
const shellLayout = (inner) => `
<div style="font-family:Archivo,system-ui,-apple-system,sans-serif;color:#0A1B2E;max-width:960px;margin:0 auto;padding:2rem 1.25rem;line-height:1.6">
${inner}
<p style="margin-top:2rem"><a href="/contact">Demander un devis gratuit</a> &middot; <a href="tel:+33786172282">${esc(PHONE)}</a></p>
</div>`

/** Schéma de l'établissement, identique à celui du composant SEO (#organization). */
const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': `${SITE}#organization`,
  name: SITE_NAME,
  image: BRAND_IMAGE,
  telephone: PHONE,
  email: 'rplb.electricite@gmail.com',
  url: SITE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Longueil-Sainte-Marie',
    addressLocality: 'Longueil-Sainte-Marie',
    postalCode: '60126',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '49.2667', longitude: '2.8833' },
  areaServed: [
    { '@type': 'City', name: 'Longueil-Sainte-Marie' },
    { '@type': 'City', name: 'Compiègne' },
    { '@type': 'State', name: 'Oise' },
  ],
  priceRange: '€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [],
})

const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
})

/**
 * FAQ des pages communes — doit rester le miroir exact de celle affichée par
 * `src/pages/LocalLanding.tsx`.
 */
const cityFaq = (cityName) => [
  {
    q: `Combien coûte une intervention d'électricien à ${cityName} ?`,
    a: `Le coût d'une intervention dépend de la nature des travaux. Pour un dépannage urgent à ${cityName}, comptez entre 80€ et 150€ pour le déplacement et la première heure. Pour une installation complète ou une rénovation, nous proposons des devis gratuits adaptés à vos besoins.`,
  },
  {
    q: `Intervenez-vous en urgence à ${cityName} ?`,
    a: `Oui, nous intervenons en urgence à ${cityName} et dans toute l'Oise. Disponibles du lundi au vendredi de 8h à 18h, nous pouvons traiter vos urgences électriques rapidement. Pour les urgences en dehors des horaires, contactez-nous au 07 85 54 70 68.`,
  },
  {
    q: 'Êtes-vous certifiés et assurés ?',
    a: `Oui, RPLB Électricité est certifié Qualifelec et RGE (Reconnu Garant de l'Environnement). Nous disposons d'une assurance décennale et tous nos travaux sont conformes aux normes NF C 15-100. Plus de 25 ans d'expérience à votre service à ${cityName} et dans l'Oise.`,
  },
  {
    q: `Proposez-vous des devis gratuits à ${cityName} ?`,
    a: `Oui, tous nos devis sont gratuits et sans engagement. Que ce soit pour une installation neuve, une rénovation électrique, une mise aux normes ou l'installation d'une borne de recharge, nous vous proposons un devis détaillé adapté à vos besoins à ${cityName}.`,
  },
]

async function main() {
  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    throw new Error(`${templatePath} introuvable : lancer \`vite build\` avant le pré-rendu.`)
  }
  const template = readFileSync(templatePath, 'utf8')

  const { LOCAL_CITIES, shouldIndexCity } = await loadCities()
  const cities = Object.values(LOCAL_CITIES)
  const indexedCities = cities.filter(shouldIndexCity).sort((a, b) => b.priority - a.priority)

  let count = 0

  // --- Pages statiques ------------------------------------------------------
  const staticPages = [
    {
      path: '/',
      title: `${SITE_NAME} - Électricien Longueil-Sainte-Marie (60)`,
      description: DEFAULT_DESCRIPTION,
      h1: `Électricien à Longueil-Sainte-Marie et dans l'Oise`,
      intro: `RPLB Électricité est votre artisan électricien dans l'Oise, basé à Longueil-Sainte-Marie (60126). Installation électrique neuve, rénovation, mise aux normes NF C 15-100, dépannage électrique, domotique, climatisation, alarme et vidéosurveillance, borne de recharge pour véhicule électrique. Certifié Qualifelec et RGE, plus de 25 ans d'expérience, devis gratuit.`,
    },
    {
      path: '/services',
      title: `Nos services d'électricité dans l'Oise | ${SITE_NAME}`,
      description: `Tous les services de RPLB Électricité dans l'Oise : installation électrique neuve, rénovation, dépannage, mise aux normes, domotique, climatisation, alarme et borne de recharge. Devis gratuit.`,
      h1: `Nos services d'électricité`,
      intro: `RPLB Électricité intervient pour les particuliers et les professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie.`,
    },
    {
      path: '/realisations',
      title: `Nos réalisations d'électricité dans l'Oise | ${SITE_NAME}`,
      description: `Découvrez les chantiers réalisés par RPLB Électricité dans l'Oise : installations neuves, rénovations électriques, mises aux normes, domotique et bornes de recharge.`,
      h1: 'Nos réalisations',
      intro: `Quelques chantiers menés par RPLB Électricité chez des particuliers et des professionnels de l'Oise.`,
    },
    {
      path: '/blog',
      title: `Conseils d'électricien — le blog | ${SITE_NAME}`,
      description: `Conseils pratiques d'un électricien de l'Oise : normes NF C 15-100, rénovation électrique, dépannage, domotique, borne de recharge pour véhicule électrique.`,
      h1: `Conseils d'électricien`,
      intro: `Nos articles pour comprendre vos installations électriques et faire les bons choix.`,
    },
    {
      path: '/about',
      title: `À propos de RPLB Électricité, électricien dans l'Oise | ${SITE_NAME}`,
      description: `RPLB Électricité, artisan électricien à Longueil-Sainte-Marie (60126). Plus de 25 ans d'expérience, certifié Qualifelec et RGE, assurance décennale.`,
      h1: 'À propos de RPLB Électricité',
      intro: `Artisan électricien installé à Longueil-Sainte-Marie, RPLB Électricité accompagne particuliers et professionnels de l'Oise depuis plus de 25 ans.`,
    },
    {
      path: '/contact',
      title: `Contact et devis gratuit | ${SITE_NAME}`,
      description: `Contactez RPLB Électricité, électricien à Longueil-Sainte-Marie (60126). Devis gratuit sous 24h. Téléphone ${PHONE}.`,
      h1: 'Contact et devis gratuit',
      intro: `Une question, un projet, un dépannage ? Appelez le ${PHONE} ou décrivez-nous votre besoin : nous répondons sous 24h et le devis est gratuit.`,
    },
    {
      path: '/urgence',
      title: `Dépannage électrique urgent dans l'Oise | ${SITE_NAME}`,
      description: `Panne électrique, disjoncteur qui saute, coupure de courant ? RPLB Électricité intervient en urgence dans l'Oise du lundi au vendredi de 8h à 18h.`,
      h1: `Dépannage électrique urgent dans l'Oise`,
      intro: `Panne de courant, disjoncteur qui saute, tableau électrique hors service : nous intervenons rapidement dans l'Oise, du lundi au vendredi de 8h à 18h.`,
    },
    {
      path: '/mentions-legales',
      title: `Mentions légales | ${SITE_NAME}`,
      description: `Mentions légales du site de RPLB Électricité, électricien à Longueil-Sainte-Marie (60126).`,
      h1: 'Mentions légales',
      intro: `Informations légales relatives au site rplb-electricite.fr.`,
      noindex: false,
    },
  ]

  for (const page of staticPages) {
    const links = indexedCities
      .map((c) => `<li><a href="/electricien/${c.slug}">Électricien à ${esc(c.name)}</a></li>`)
      .join('')
    const bodyHtml = shellLayout(`
<h1>${esc(page.h1)}</h1>
<p>${esc(page.intro)}</p>
<h2>Nos zones d'intervention</h2>
<ul>${links}</ul>`)

    writePage(
      page.path,
      renderPage(template, {
        path: page.path,
        title: page.title,
        description: page.description,
        noindex: false,
        bodyHtml,
        jsonLd: [organizationSchema()],
      })
    )
    count++
  }

  // --- Pages communes -------------------------------------------------------
  for (const city of cities) {
    const isCompiegne = city.slug === 'compiegne'
    const noindex = !shouldIndexCity(city)

    // Miroir de la logique de src/pages/LocalLanding.tsx.
    const rawTitle =
      city.meta_title ??
      (isCompiegne
        ? 'Électricien Compiègne (60200) | Dépannage & Rénovation'
        : `Électricien ${city.name} (${city.postalCode})`)
    const title = city.meta_title ? rawTitle : `${rawTitle} | ${SITE_NAME}`
    const description =
      city.meta_description ??
      (isCompiegne
        ? `Électricien professionnel à Compiègne (60200) dans l'Oise. Dépannage électrique urgent, installation neuve, rénovation électrique. Intervention rapide dans tous les quartiers de Compiègne : Centre-ville, Royallieu, Clos des Roses, Saint-Lazare. Devis gratuit. Certifié Qualifelec et RGE.`
        : `Électricien professionnel à ${city.name} dans l'Oise. Dépannage, installation, rénovation électrique. Intervention rapide à ${city.name} et alentours. Devis gratuit.`)
    const keywords = isCompiegne
      ? 'électricien compiègne, électricien compiègne 60200, dépannage électrique compiègne, installation électrique compiègne, électricien oise'
      : `électricien ${city.name}, dépannage électrique ${city.name}, installation électrique ${city.name}, électricien ${city.postalCode}, électricien Oise`

    const faq = cityFaq(city.name)
    const faqHtml = faq
      .map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`)
      .join('')
    const cityLinks = indexedCities
      .filter((c) => c.slug !== city.slug)
      .map((c) => `<li><a href="/electricien/${c.slug}">Électricien à ${esc(c.name)}</a></li>`)
      .join('')

    const bodyHtml = shellLayout(`
<h1>Électricien à ${esc(city.name)} (${esc(city.postalCode)})</h1>
<p>Services électriques professionnels à ${esc(city.name)} (${esc(city.postalCode)}) et dans l'Oise.</p>
<h2>Électricien professionnel à ${esc(city.name)}</h2>
<p>${esc(city.description)}</p>
<p>RPLB Électricité intervient à ${esc(city.name)} et dans un rayon de 30 km autour de Longueil-Sainte-Marie. Que vous soyez particulier ou professionnel, nous vous proposons des services électriques de qualité pour tous vos besoins : dépannage urgent, installation neuve, rénovation, domotique, climatisation, alarme et vidéosurveillance, ou encore installation de borne de recharge pour véhicule électrique.</p>
<h2>Pourquoi choisir RPLB Électricité à ${esc(city.name)} ?</h2>
<ul>
<li>Intervention rapide, du lundi au vendredi de 8h à 18h.</li>
<li>Artisan certifié Qualifelec et RGE, assurance décennale, travaux conformes à la norme NF C 15-100.</li>
<li>Plus de 25 ans d'expérience en électricité résidentielle et tertiaire.</li>
</ul>
<h2>Questions fréquentes — Électricien à ${esc(city.name)}</h2>
${faqHtml}
<h2>Nous intervenons aussi dans ces communes</h2>
<ul>${cityLinks}</ul>`)

    const jsonLd = [
      organizationSchema(),
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE}/` },
        { name: `Électricien ${city.name}`, url: `${SITE}/electricien/${city.slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE}/electricien/${city.slug}#service`,
        name: `Électricien à ${city.name} (${city.postalCode})`,
        serviceType: "Travaux d'électricité",
        description,
        provider: { '@id': `${SITE}#organization` },
        url: `${SITE}/electricien/${city.slug}`,
        areaServed: { '@type': 'City', name: city.name },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]

    writePage(
      `/electricien/${city.slug}`,
      renderPage(template, {
        path: `/electricien/${city.slug}`,
        title,
        description,
        keywords,
        noindex,
        bodyHtml,
        jsonLd,
      })
    )
    count++
  }

  // --- Services et articles (contenu Supabase) ------------------------------
  const { services, articles } = await loadDynamicContent()

  for (const s of services) {
    if (!s.slug) continue
    const title = `${s.title || s.slug} dans l'Oise | ${SITE_NAME}`
    const description =
      s.meta_description || s.short_description || `${s.title || s.slug} par RPLB Électricité, artisan électricien dans l'Oise. Devis gratuit.`
    const bodyHtml = shellLayout(`
<h1>${esc(s.title || s.slug)}</h1>
<p>${esc(description)}</p>
<p><a href="/services">Voir tous nos services</a></p>`)
    writePage(
      `/services/${s.slug}`,
      renderPage(template, {
        path: `/services/${s.slug}`,
        title,
        description,
        noindex: false,
        bodyHtml,
        jsonLd: [
          organizationSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${SITE}/services/${s.slug}#service`,
            name: s.title || s.slug,
            description,
            provider: { '@id': `${SITE}#organization` },
            url: `${SITE}/services/${s.slug}`,
            areaServed: { '@type': 'State', name: 'Oise' },
          },
        ],
      })
    )
    count++
  }

  for (const a of articles) {
    if (!a.slug) continue
    const title = `${a.title || a.slug} | ${SITE_NAME}`
    const description =
      a.meta_description || a.excerpt || `${a.title || a.slug} — conseils de RPLB Électricité, électricien dans l'Oise.`
    const bodyHtml = shellLayout(`
<h1>${esc(a.title || a.slug)}</h1>
<p>${esc(description)}</p>
<p><a href="/blog">Retour au blog</a></p>`)
    writePage(
      `/blog/${a.slug}`,
      renderPage(template, {
        path: `/blog/${a.slug}`,
        title,
        description,
        noindex: false,
        bodyHtml,
        jsonLd: [organizationSchema()],
      })
    )
    count++
  }

  console.log(`✅ Pré-rendu : ${count} page(s) HTML écrite(s) dans ${DIST}/`)
}

main().catch((e) => {
  console.error('❌ Pré-rendu échoué :', e.message)
  process.exit(1)
})
