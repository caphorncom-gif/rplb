/**
 * Script pour exécuter des requêtes SQL personnalisées sur Supabase
 * Utilise la clé anonyme (lecture seule) ou peut être adapté pour des opérations spécifiques
 * 
 * Usage: node scripts/supabase-query.js
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import readline from 'readline'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes !')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

async function queryTable(tableName, filters = {}) {
  let query = supabase.from(tableName).select('*')

  // Appliquer les filtres
  if (filters.eq) {
    for (const [key, value] of Object.entries(filters.eq)) {
      query = query.eq(key, value)
    }
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.orderBy) {
    query = query.order(filters.orderBy.column, { ascending: filters.orderBy.ascending !== false })
  }

  const { data, error } = await query

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return null
  }

  return data
}

async function interactiveQuery() {
  console.log('\n📊 Requête interactive Supabase\n')
  console.log('Tables disponibles: articles, services, realisations, testimonials, contact_requests, pages\n')

  const tableName = await question('Quelle table voulez-vous interroger ? ')
  
  if (!tableName) {
    console.log('❌ Table requise')
    rl.close()
    return
  }

  console.log('\nFiltres (laissez vide pour ignorer):')
  const filterColumn = await question('Colonne à filtrer (ex: is_published): ')
  const filterValue = await question('Valeur (ex: true): ')
  
  const limit = await question('Limite (défaut: 10): ')
  
  const orderBy = await question('Colonne de tri (ex: created_at): ')
  const orderDirection = await question('Ordre (asc/desc, défaut: desc): ')

  const filters = {}
  
  if (filterColumn && filterValue) {
    filters.eq = { [filterColumn]: filterValue === 'true' ? true : filterValue === 'false' ? false : filterValue }
  }
  
  if (limit) {
    filters.limit = parseInt(limit) || 10
  } else {
    filters.limit = 10
  }
  
  if (orderBy) {
    filters.orderBy = {
      column: orderBy,
      ascending: orderDirection !== 'desc'
    }
  }

  console.log(`\n🔍 Exécution de la requête...\n`)
  
  const data = await queryTable(tableName, filters)

  if (data) {
    console.log(`✅ ${data.length} résultat(s):\n`)
    console.log(JSON.stringify(data, null, 2))
  }

  rl.close()
}

// Exécuter
interactiveQuery().catch(console.error)

