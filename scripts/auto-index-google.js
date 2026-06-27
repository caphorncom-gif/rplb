/**
 * Script pour automatiser la demande d'indexation dans Google Search Console
 * Utilise l'API Google Indexing
 * 
 * Prérequis :
 * 1. Créer un projet dans Google Cloud Console
 * 2. Activer l'API "Indexing API"
 * 3. Créer des credentials (Service Account)
 * 4. Télécharger la clé JSON
 * 5. Ajouter le service account email dans Google Search Console comme propriétaire
 * 
 * Usage: node scripts/auto-index-google.js
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

// Configuration
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './google-service-account-key.json'
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'

// Lire le sitemap pour obtenir toutes les URLs
function getUrlsFromSitemap() {
  try {
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g)
    
    if (!urlMatches) {
      console.error('❌ Aucune URL trouvée dans le sitemap')
      return []
    }
    
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''))
    
    // Exclure les pages déjà indexées (optionnel)
    const excludedUrls = [
      `${SITE_URL}/`,
      `${SITE_URL}/services`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/urgence`,
      `${SITE_URL}/blog`
    ]
    
    return urls.filter(url => !excludedUrls.includes(url))
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du sitemap:', error)
    return []
  }
}

// Obtenir un token d'accès OAuth2
async function getAccessToken(serviceAccountKey) {
  try {
    // Import dynamique de googleapis
    const { google } = await import('googleapis')
    const key = JSON.parse(serviceAccountKey)
    
    // Vérifier que la clé contient les champs nécessaires
    if (!key.client_email || !key.private_key) {
      throw new Error('Le fichier JSON ne contient pas client_email ou private_key. Vérifiez que c\'est bien une clé de Service Account.')
    }
    
    const jwtClient = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing']
    })
    
    const tokens = await jwtClient.authorize()
    return tokens.access_token
  } catch (error) {
    console.error('❌ Erreur lors de l\'obtention du token:', error.message)
    if (error.message.includes('client_email') || error.message.includes('private_key')) {
      console.error('💡 Vérifiez que le fichier JSON est bien une clé de Service Account valide')
    } else {
      console.error('💡 Assurez-vous d\'avoir installé googleapis : npm install googleapis')
    }
    throw error
  }
}

// Demander l'indexation d'une URL
async function requestIndexing(url, accessToken) {
  try {
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED'
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return { success: true, data }
    } else {
      const error = await response.text()
      return { success: false, error: error, status: response.status }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de l\'indexation automatique...\n')
  
  // Vérifier que la clé de service account existe
  let serviceAccountKey
  try {
    const keyPath = join(process.cwd(), GOOGLE_SERVICE_ACCOUNT_KEY)
    serviceAccountKey = readFileSync(keyPath, 'utf-8')
    console.log('✅ Clé de service account trouvée\n')
  } catch (error) {
    console.error('❌ Erreur : Clé de service account introuvable !')
    console.error(`   Chemin attendu : ${GOOGLE_SERVICE_ACCOUNT_KEY}`)
    console.error('\n📝 Instructions :')
    console.error('1. Créez un projet dans Google Cloud Console')
    console.error('2. Activez l\'API "Indexing API"')
    console.error('3. Créez un Service Account')
    console.error('4. Téléchargez la clé JSON')
    console.error('5. Placez-la dans le projet et configurez GOOGLE_SERVICE_ACCOUNT_KEY_PATH dans .env')
    console.error('6. Ajoutez l\'email du service account dans Google Search Console comme propriétaire')
    process.exit(1)
  }
  
  // Obtenir les URLs du sitemap
  console.log('📋 Récupération des URLs depuis le sitemap...')
  const urls = getUrlsFromSitemap()
  console.log(`✅ ${urls.length} URL(s) trouvée(s)\n`)
  
  if (urls.length === 0) {
    console.error('❌ Aucune URL à indexer')
    process.exit(1)
  }
  
  // Obtenir le token d'accès
  console.log('🔐 Obtention du token d\'accès...')
  let accessToken
  try {
    accessToken = await getAccessToken(serviceAccountKey)
    console.log('✅ Token obtenu\n')
  } catch (error) {
    console.error('❌ Erreur lors de l\'obtention du token:', error)
    process.exit(1)
  }
  
  // Demander l'indexation pour chaque URL (avec délai pour éviter les limites)
  console.log('📤 Demande d\'indexation des URLs...\n')
  const results = {
    success: 0,
    failed: 0,
    errors: []
  }
  
  // Limite : 200 requêtes par 100 secondes (selon Google)
  // On va faire 1 requête toutes les 0.6 secondes pour être sûr
  const delay = 600 // ms
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const progress = `[${i + 1}/${urls.length}]`
    
    console.log(`${progress} Indexation de : ${url}`)
    
    const result = await requestIndexing(url, accessToken)
    
    if (result.success) {
      console.log(`   ✅ Succès`)
      results.success++
    } else {
      console.log(`   ❌ Échec : ${result.error || result.status}`)
      results.failed++
      results.errors.push({ url, error: result.error || result.status })
    }
    
    // Attendre avant la prochaine requête (sauf pour la dernière)
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  // Résumé
  console.log('\n' + '='.repeat(50))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(50))
  console.log(`✅ Succès : ${results.success}`)
  console.log(`❌ Échecs : ${results.failed}`)
  console.log(`📊 Total : ${urls.length}`)
  
  if (results.errors.length > 0) {
    console.log('\n❌ Erreurs :')
    results.errors.forEach(({ url, error }) => {
      console.log(`   - ${url}: ${error}`)
    })
  }
  
  console.log('\n✅ Indexation automatique terminée !')
  console.log('⏱️  Les pages seront indexées dans les prochaines heures/jours.')
}

// Exécuter
main().catch(console.error)

