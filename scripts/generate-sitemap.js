/**
 * Script pour générer un sitemap.xml dynamique
 * Récupère les articles et services depuis Supabase
 * 
 * Usage: node scripts/generate-sitemap.js
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import { join } from 'path'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
const siteUrl = process.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes !')
  console.error('Assurez-vous d\'avoir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Pages statiques
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/realisations', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
  { url: '/urgence', priority: '0.9', changefreq: 'monthly' },
  { url: '/mentions-legales', priority: '0.3', changefreq: 'yearly' }
]

// Landing pages locales pour le SEO - Toutes les communes dans un rayon de 15 km
// Liste complète des communes autour de Longueil-Sainte-Marie
const localLandingPages = [
  // Villes principales (priorité élevée)
  { city: 'longueil-sainte-marie', priority: '1.0', changefreq: 'monthly' },
  { city: 'compiegne', priority: '0.9', changefreq: 'monthly' },
  { city: 'verberie', priority: '0.9', changefreq: 'monthly' },
  { city: 'pont-sainte-maxence', priority: '0.9', changefreq: 'monthly' },
  { city: 'crepy-en-valois', priority: '0.9', changefreq: 'monthly' },
  { city: 'senlis', priority: '0.9', changefreq: 'monthly' },
  { city: 'noyon', priority: '0.9', changefreq: 'monthly' },
  { city: 'montataire', priority: '0.9', changefreq: 'monthly' },
  { city: 'creil', priority: '0.8', changefreq: 'monthly' },
  { city: 'nogent-sur-oise', priority: '0.8', changefreq: 'monthly' },
  { city: 'thourotte', priority: '0.8', changefreq: 'monthly' },
  
  // Communes secondaires (priorité moyenne)
  { city: 'margny-les-compiegne', priority: '0.8', changefreq: 'monthly' },
  { city: 'venette', priority: '0.8', changefreq: 'monthly' },
  { city: 'clairoix', priority: '0.8', changefreq: 'monthly' },
  { city: 'choisy-au-bac', priority: '0.8', changefreq: 'monthly' },
  { city: 'jaux', priority: '0.7', changefreq: 'monthly' },
  { city: 'jonquieres', priority: '0.7', changefreq: 'monthly' },
  { city: 'lachelle', priority: '0.7', changefreq: 'monthly' },
  { city: 'armancourt', priority: '0.7', changefreq: 'monthly' },
  { city: 'janville', priority: '0.7', changefreq: 'monthly' },
  { city: 'le-meux', priority: '0.7', changefreq: 'monthly' },
  { city: 'lacroix-saint-ouen', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-sauveur', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-jean-aux-bois', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-vaast-de-longmont', priority: '0.7', changefreq: 'monthly' },
  { city: 'vieux-moulin', priority: '0.7', changefreq: 'monthly' },
  { city: 'nery', priority: '0.7', changefreq: 'monthly' },
  { city: 'saintines', priority: '0.7', changefreq: 'monthly' },
  { city: 'bethisy-saint-martin', priority: '0.7', changefreq: 'monthly' },
  { city: 'bethisy-saint-pierre', priority: '0.7', changefreq: 'monthly' },
  { city: 'bienville', priority: '0.7', changefreq: 'monthly' },
  { city: 'rivecourt', priority: '0.7', changefreq: 'monthly' },
  { city: 'le-plessis-brion', priority: '0.7', changefreq: 'monthly' },
  { city: 'ribecourt-dreslincourt', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-martin-longueau', priority: '0.7', changefreq: 'monthly' },
  { city: 'sacy-le-grand', priority: '0.7', changefreq: 'monthly' },
  { city: 'sacy-le-petit', priority: '0.7', changefreq: 'monthly' },
  { city: 'vaumoise', priority: '0.7', changefreq: 'monthly' },
  { city: 'orrouy', priority: '0.7', changefreq: 'monthly' },
  { city: 'gondreville', priority: '0.7', changefreq: 'monthly' },
  { city: 'chamant', priority: '0.7', changefreq: 'monthly' },
  { city: 'aumont-en-halatte', priority: '0.7', changefreq: 'monthly' },
  { city: 'fleurines', priority: '0.7', changefreq: 'monthly' },
  { city: 'barbery', priority: '0.7', changefreq: 'monthly' },
  { city: 'sempigny', priority: '0.7', changefreq: 'monthly' },
  { city: 'suzoy', priority: '0.7', changefreq: 'monthly' },
  { city: 'villers-saint-paul', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-leu-d-esserent', priority: '0.7', changefreq: 'monthly' },
  { city: 'coudun', priority: '0.7', changefreq: 'monthly' },
  { city: 'giraumont', priority: '0.7', changefreq: 'monthly' },
  { city: 'cuvilly', priority: '0.7', changefreq: 'monthly' },
  { city: 'lassigny', priority: '0.7', changefreq: 'monthly' },
  { city: 'ressons-sur-matz', priority: '0.7', changefreq: 'monthly' },
  { city: 'elincourt-sainte-marguerite', priority: '0.7', changefreq: 'monthly' },
  { city: 'cannectancourt', priority: '0.7', changefreq: 'monthly' },
  { city: 'sermaize', priority: '0.7', changefreq: 'monthly' },
  { city: 'salency', priority: '0.7', changefreq: 'monthly' },
  { city: 'beaurains-les-noyon', priority: '0.7', changefreq: 'monthly' },
  { city: 'genvry', priority: '0.7', changefreq: 'monthly' },
  { city: 'grandfresnoy', priority: '0.7', changefreq: 'monthly' },
  { city: 'hautefontaine', priority: '0.7', changefreq: 'monthly' },
  { city: 'tracy-le-mont', priority: '0.7', changefreq: 'monthly' },
  { city: 'tracy-le-val', priority: '0.7', changefreq: 'monthly' },
  { city: 'villers-sur-coudun', priority: '0.7', changefreq: 'monthly' },
  { city: 'bailly', priority: '0.7', changefreq: 'monthly' },
  { city: 'cambronne-les-ribecourt', priority: '0.7', changefreq: 'monthly' },
  { city: 'carlepont', priority: '0.7', changefreq: 'monthly' },
  { city: 'machemont', priority: '0.7', changefreq: 'monthly' },
  { city: 'monchy-humieres', priority: '0.7', changefreq: 'monthly' },
  { city: 'pimprez', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-leger-aux-bois', priority: '0.7', changefreq: 'monthly' },
  { city: 'saint-pierre-es-champs', priority: '0.7', changefreq: 'monthly' },
  { city: 'villers-vicomte', priority: '0.7', changefreq: 'monthly' }
]

async function generateSitemap() {
  console.log('🗺️  Génération du sitemap...\n')

  const urls = [...staticPages]

  // Ajouter les landing pages locales
  localLandingPages.forEach(page => {
    urls.push({
      url: `/electricien/${page.city}`,
      priority: page.priority,
      changefreq: page.changefreq
    })
  })

  try {
    // Récupérer les services actifs
    console.log('📋 Récupération des services...')
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('slug, updated_at')
      .eq('is_active', true)

    if (servicesError) {
      console.error('❌ Erreur lors de la récupération des services:', servicesError.message)
    } else if (services) {
      console.log(`✅ ${services.length} service(s) trouvé(s)`)
      services.forEach(service => {
        urls.push({
          url: `/services/${service.slug}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: service.updated_at ? new Date(service.updated_at).toISOString().split('T')[0] : null
        })
      })
    }

    // Récupérer les articles publiés
    console.log('📰 Récupération des articles...')
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, published_at, updated_at')
      .eq('is_published', true)

    if (articlesError) {
      console.error('❌ Erreur lors de la récupération des articles:', articlesError.message)
    } else if (articles) {
      console.log(`✅ ${articles.length} article(s) trouvé(s)`)
      articles.forEach(article => {
        urls.push({
          url: `/blog/${article.slug}`,
          priority: '0.7',
          changefreq: 'weekly',
          lastmod: article.updated_at 
            ? new Date(article.updated_at).toISOString().split('T')[0]
            : article.published_at 
            ? new Date(article.published_at).toISOString().split('T')[0]
            : null
        })
      })
    }

    // Générer le XML
    console.log('\n📝 Génération du XML...')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(page => {
  const lastmod = page.lastmod || new Date().toISOString().split('T')[0]
  return `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
}).join('\n')}
</urlset>`

    // Écrire le fichier
    const publicPath = join(process.cwd(), 'public', 'sitemap.xml')
    writeFileSync(publicPath, xml, 'utf-8')
    
    console.log(`✅ Sitemap généré avec succès !`)
    console.log(`📁 Fichier: ${publicPath}`)
    console.log(`📊 Total: ${urls.length} URL(s)\n`)
    
    // Afficher un résumé
    console.log('📋 Résumé:')
    console.log(`   - Pages statiques: ${staticPages.length}`)
    console.log(`   - Landing pages locales: ${localLandingPages.length}`)
    console.log(`   - Services: ${services?.length || 0}`)
    console.log(`   - Articles: ${articles?.length || 0}`)
    console.log(`   - Total: ${urls.length}\n`)

  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error)
    process.exit(1)
  }
}

// Exécuter
generateSitemap().catch(console.error)


