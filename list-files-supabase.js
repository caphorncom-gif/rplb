// Script pour lister les fichiers dans Supabase Storage
// À exécuter dans la console du navigateur sur Supabase ou via Node.js

// Option 1: Via Supabase Dashboard
// 1. Allez dans Supabase → Storage → rplb-media → realisations
// 2. Vous verrez tous les fichiers avec leurs noms

// Option 2: Via API (si vous avez les credentials)
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://hgcpddzpqzfxrvfipsii.supabase.co'
const supabaseKey = 'VOTRE_SERVICE_ROLE_KEY' // À remplacer par votre clé service_role

const supabase = createClient(supabaseUrl, supabaseKey)

async function listFiles() {
  const { data, error } = await supabase.storage
    .from('rplb-media')
    .list('realisations', {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' }
    })

  if (error) {
    console.error('Erreur:', error)
    return
  }

  console.log('Fichiers trouvés dans realisations/:\n')
  data.forEach((file, index) => {
    const url = `${supabaseUrl}/storage/v1/object/public/rplb-media/realisations/${file.name}`
    console.log(`${index + 1}. ${file.name}`)
    console.log(`   URL: ${url}\n`)
  })
}

// listFiles()

// Pour utiliser ce script:
// 1. Installez: npm install @supabase/supabase-js
// 2. Remplacez VOTRE_SERVICE_ROLE_KEY par votre clé
// 3. Exécutez: node list-files-supabase.js


