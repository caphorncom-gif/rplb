/**
 * Script pour importer des articles dans Supabase
 * 
 * Utilisation :
 * 1. Modifiez le tableau ARTICLES ci-dessous avec vos articles
 * 2. Configurez vos variables d'environnement Supabase
 * 3. Exécutez : node scripts/import-articles.js
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes !')
  console.error('Assurez-vous d\'avoir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// MODIFIEZ CE TABLEAU AVEC VOS ARTICLES
// ============================================
const ARTICLES = [
  {
    slug: 'exemple-article-1',
    title: 'Titre de votre premier article',
    excerpt: 'Courte description de l\'article...',
    content: `
Contenu complet de votre article.

Paragraphe 1 avec vos informations...

Paragraphe 2 avec plus de détails...

Liste à puces :
- Point 1
- Point 2
- Point 3
    `.trim(),
    featured_image: 'https://exemple.com/image.jpg', // URL de l'image
    category: 'Conseils', // ou 'Actualités', 'Réglementation'
    tags: ['conseils', 'installation'],
    author: 'RPLB Électricité',
    published_at: '2024-01-15T10:00:00Z', // Format ISO
    seo_title: 'Titre SEO optimisé',
    seo_description: 'Description SEO pour Google',
    is_published: true
  },
  // Ajoutez d'autres articles ici...
]

// ============================================
// Fonction d'importation
// ============================================

async function importArticles() {
  console.log('🚀 Début de l\'importation des articles...\n')

  let successCount = 0
  let errorCount = 0

  for (const article of ARTICLES) {
    try {
      // Vérifier si l'article existe déjà (par slug)
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', article.slug)
        .single()

      if (existing) {
        console.log(`⚠️  Article "${article.title}" existe déjà (slug: ${article.slug})`)
        continue
      }

      // Insérer l'article
      const { data, error } = await supabase
        .from('articles')
        .insert([article])
        .select()

      if (error) {
        throw error
      }

      console.log(`✅ Article importé : "${article.title}"`)
      successCount++
    } catch (error) {
      console.error(`❌ Erreur pour "${article.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Succès : ${successCount} article(s)`)
  console.log(`❌ Erreurs : ${errorCount} article(s)`)
  console.log('='.repeat(50))
}

// Exécuter
importArticles()
  .then(() => {
    console.log('\n✨ Importation terminée !')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Erreur fatale :', error)
    process.exit(1)
  })

