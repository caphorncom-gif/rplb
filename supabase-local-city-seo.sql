-- Optionnel : SEO des pages /electricien/:slug si vous migrez les villes vers Supabase.
-- Aujourd'hui le site lit les villes depuis src/data/localCities.ts (pas cette table).

CREATE TABLE IF NOT EXISTS local_city_seo (
  slug TEXT PRIMARY KEY,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE local_city_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lecture publique local_city_seo" ON local_city_seo;
CREATE POLICY "Lecture publique local_city_seo"
  ON local_city_seo FOR SELECT
  USING (true);

INSERT INTO local_city_seo (slug, meta_title, meta_description) VALUES
  (
    'le-meux',
    'Électricien au Meux (60) | SARL RPLB Électricité',
    'Électricien à Le Meux et environs. Installation, dépannage, rénovation électrique. Devis gratuit sous 24h — SARL RPLB, artisan qualifié Oise. ☎ 07 86 17 22 82'
  ),
  (
    'saint-sauveur',
    'Électricien à Saint-Sauveur (60) | SARL RPLB Électricité',
    'Votre électricien à Saint-Sauveur (60). Installation électrique, dépannage urgent, mise aux normes. Artisan certifié — Devis gratuit ☎ 07 86 17 22 82'
  ),
  (
    'ressons-sur-matz',
    'Électricien à Ressons-sur-Matz (60) | SARL RPLB Électricité',
    'RPLB, électricien à Ressons-sur-Matz (60). Dépannage, rénovation électrique, tableau électrique. Intervention rapide — Devis gratuit ☎ 07 86 17 22 82'
  ),
  (
    'noyon',
    'Électricien à Noyon (60) | Dépannage & Installation | RPLB',
    'RPLB électricien à Noyon (60400). Dépannage électrique, installation, rénovation, tableaux, prises. Intervention rapide — Devis gratuit ☎ 07 86 17 22 82'
  ),
  (
    'senlis',
    'Électricien à Senlis (60) | SARL RPLB Électricité',
    'Électricien à Senlis (60300). Installation, dépannage et rénovation électrique. Artisan qualifié, devis gratuit, intervention sous 48h ☎ 07 86 17 22 82'
  ),
  (
    'creil',
    'Électricien à Creil (60) | Installation & Dépannage | RPLB',
    'Votre électricien à Creil (60100). Mise aux normes, tableau électrique, domotique. SARL RPLB — Artisan certifié Oise ☎ 07 86 17 22 82'
  ),
  (
    'margny-les-compiegne',
    'Électricien à Margny-lès-Compiègne (60) | SARL RPLB',
    'RPLB, électricien à Margny-lès-Compiègne (60280). Installation, dépannage, rénovation. Devis gratuit — ☎ 07 86 17 22 82'
  )
ON CONFLICT (slug) DO UPDATE SET
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = NOW();
