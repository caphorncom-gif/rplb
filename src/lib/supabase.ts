import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Client Supabase avec fallback silencieux en cas d'erreur
let supabase: ReturnType<typeof createClient> | null = null

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Variables d\'environnement manquantes. Certaines fonctionnalités peuvent ne pas fonctionner.')
    // Créer un client factice pour éviter les erreurs
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.error('[Supabase] Erreur lors de l\'initialisation:', error)
  // Créer un client factice pour éviter les erreurs
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

// Export avec vérification
export { supabase }

