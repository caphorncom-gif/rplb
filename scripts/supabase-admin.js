/**
 * Script d'administration Supabase pour RPLB Électricité
 * Permet de lire, modifier et gérer les données Supabase
 * 
 * Utilisation:
 * node scripts/supabase-admin.js [commande] [options]
 * 
 * Commandes disponibles:
 * - list [table] : Lister les données d'une table
 * - get [table] [id] : Obtenir un élément spécifique
 * - update [table] [id] : Mettre à jour un élément
 * - delete [table] [id] : Supprimer un élément
 * - insert [table] : Insérer un nouvel élément
 * - stats : Afficher les statistiques de la base
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import readline from 'readline'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes !')
  console.error('Assurez-vous d\'avoir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

// Tables disponibles
const TABLES = {
  articles: 'articles',
  services: 'services',
  realisations: 'realisations',
  testimonials: 'testimonials',
  contact_requests: 'contact_requests',
  pages: 'pages',
  certifications: 'certifications',
  site_settings: 'site_settings'
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

async function listTable(tableName) {
  console.log(`\n📋 Liste des ${tableName}...\n`)
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return
  }

  if (!data || data.length === 0) {
    console.log(`ℹ️  Aucun élément trouvé dans ${tableName}`)
    return
  }

  console.log(`✅ ${data.length} élément(s) trouvé(s):\n`)
  data.forEach((item, index) => {
    console.log(`${index + 1}. ${JSON.stringify(item, null, 2)}\n`)
  })
}

async function getItem(tableName, id) {
  console.log(`\n🔍 Recherche de ${id} dans ${tableName}...\n`)
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return
  }

  if (!data) {
    console.log(`ℹ️  Aucun élément trouvé avec l'ID ${id}`)
    return
  }

  console.log(`✅ Élément trouvé:\n`)
  console.log(JSON.stringify(data, null, 2))
}

async function updateItem(tableName, id, updates) {
  console.log(`\n✏️  Mise à jour de ${id} dans ${tableName}...\n`)
  
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return
  }

  console.log(`✅ Élément mis à jour:\n`)
  console.log(JSON.stringify(data, null, 2))
}

async function deleteItem(tableName, id) {
  console.log(`\n🗑️  Suppression de ${id} dans ${tableName}...\n`)
  
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return
  }

  console.log(`✅ Élément supprimé:\n`)
  console.log(JSON.stringify(data, null, 2))
}

async function insertItem(tableName, item) {
  console.log(`\n➕ Insertion dans ${tableName}...\n`)
  
  const { data, error } = await supabase
    .from(tableName)
    .insert([item])
    .select()

  if (error) {
    console.error(`❌ Erreur:`, error.message)
    return
  }

  console.log(`✅ Élément inséré:\n`)
  console.log(JSON.stringify(data, null, 2))
}

async function getStats() {
  console.log(`\n📊 Statistiques de la base de données...\n`)
  
  const stats = {}
  
  for (const [key, tableName] of Object.entries(TABLES)) {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
    
    if (!error) {
      stats[key] = count || 0
    }
  }

  console.log('✅ Statistiques:\n')
  for (const [table, count] of Object.entries(stats)) {
    console.log(`  ${table}: ${count} élément(s)`)
  }
}

// ============================================
// GESTION DES COMMANDES
// ============================================

async function handleCommand() {
  const args = process.argv.slice(2)
  const command = args[0]
  const tableName = args[1]
  const id = args[2]

  switch (command) {
    case 'list':
      if (!tableName || !TABLES[tableName]) {
        console.error('❌ Table invalide. Tables disponibles:', Object.keys(TABLES).join(', '))
        process.exit(1)
      }
      await listTable(TABLES[tableName])
      break

    case 'get':
      if (!tableName || !TABLES[tableName]) {
        console.error('❌ Table invalide. Tables disponibles:', Object.keys(TABLES).join(', '))
        process.exit(1)
      }
      if (!id) {
        console.error('❌ ID requis. Usage: node scripts/supabase-admin.js get [table] [id]')
        process.exit(1)
      }
      await getItem(TABLES[tableName], id)
      break

    case 'update':
      if (!tableName || !TABLES[tableName]) {
        console.error('❌ Table invalide. Tables disponibles:', Object.keys(TABLES).join(', '))
        process.exit(1)
      }
      if (!id) {
        console.error('❌ ID requis. Usage: node scripts/supabase-admin.js update [table] [id]')
        process.exit(1)
      }
      console.log('📝 Entrez les modifications au format JSON:')
      const updatesJson = await question('> ')
      try {
        const updates = JSON.parse(updatesJson)
        await updateItem(TABLES[tableName], id, updates)
      } catch (error) {
        console.error('❌ JSON invalide:', error.message)
      }
      break

    case 'delete':
      if (!tableName || !TABLES[tableName]) {
        console.error('❌ Table invalide. Tables disponibles:', Object.keys(TABLES).join(', '))
        process.exit(1)
      }
      if (!id) {
        console.error('❌ ID requis. Usage: node scripts/supabase-admin.js delete [table] [id]')
        process.exit(1)
      }
      console.log('⚠️  Êtes-vous sûr de vouloir supprimer cet élément ? (oui/non)')
      const confirm = await question('> ')
      if (confirm.toLowerCase() === 'oui' || confirm.toLowerCase() === 'o') {
        await deleteItem(TABLES[tableName], id)
      } else {
        console.log('❌ Suppression annulée')
      }
      break

    case 'insert':
      if (!tableName || !TABLES[tableName]) {
        console.error('❌ Table invalide. Tables disponibles:', Object.keys(TABLES).join(', '))
        process.exit(1)
      }
      console.log('📝 Entrez les données au format JSON:')
      const itemJson = await question('> ')
      try {
        const item = JSON.parse(itemJson)
        await insertItem(TABLES[tableName], item)
      } catch (error) {
        console.error('❌ JSON invalide:', error.message)
      }
      break

    case 'stats':
      await getStats()
      break

    default:
      console.log(`
📖 Utilisation: node scripts/supabase-admin.js [commande] [options]

Commandes disponibles:
  list [table]        - Lister les éléments d'une table
  get [table] [id]    - Obtenir un élément spécifique
  update [table] [id] - Mettre à jour un élément
  delete [table] [id] - Supprimer un élément
  insert [table]      - Insérer un nouvel élément
  stats               - Afficher les statistiques

Tables disponibles:
  ${Object.keys(TABLES).join(', ')}

Exemples:
  node scripts/supabase-admin.js list articles
  node scripts/supabase-admin.js get articles abc123
  node scripts/supabase-admin.js stats
      `)
  }

  rl.close()
}

// Exécuter
handleCommand().catch(console.error)

