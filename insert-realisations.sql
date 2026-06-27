-- Script pour insérer les réalisations avec photos depuis Supabase Storage
-- Base URL: https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/

-- ⚠️ IMPORTANT: Avant d'exécuter ce script, listez vos fichiers dans Supabase Storage
-- et remplacez les URLs ci-dessous par les vraies URLs de vos photos.
-- 
-- Pour lister les fichiers:
-- 1. Allez dans Supabase → Storage → rplb-media → realisations
-- 2. Copiez les noms de fichiers
-- 3. Remplacez les URLs ci-dessous

-- Supprimer les anciennes réalisations si nécessaire (optionnel)
-- DELETE FROM realisations;

-- Insertion des réalisations
-- REMPLACEZ LES URLs PAR LES VRAIES URLs DE VOS PHOTOS
INSERT INTO realisations (title, description, location, date, after_image, before_image, is_featured) VALUES
-- Réalisation 1: Installation Climatisation Murale
(
  'Installation Climatisation Murale',
  'Installation complète d''une climatisation murale dans un appartement à Compiègne. Mise en place du système split avec unité extérieure et unité intérieure, raccordement électrique conforme aux normes NF C 15-100.',
  'Compiègne (60)',
  '2024-07-15',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-climatisation-murale-1.webp',
  NULL,
  true
),

-- Réalisation 2: Rénovation Tableau Électrique
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'Rénovation Tableau Électrique Complet',
  'Rénovation complète d''un tableau électrique ancien. Remplacement de tous les disjoncteurs, ajout d''un dispositif différentiel, mise en conformité avec la norme NF C 15-100. Sécurisation de l''installation électrique.',
  'Longueil-Sainte-Marie (60)',
  '2024-06-20',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/342502610_1604350426713665_5260587436237834486_n.webp',
  NULL,
  true
),

-- Réalisation 3: Installation Électrique Cuisine
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'Installation Électrique Cuisine Neuve',
  'Installation électrique complète pour une cuisine rénovée. Mise en place des prises électriques, éclairage LED sous meubles, prise de gros électroménager, interrupteurs va-et-vient. Conformité totale aux normes.',
  'Verberie (60)',
  '2024-05-10',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-professionnel-particulier-realisation.webp',
  NULL,
  true
),

-- Réalisation 4: Installation Domotique
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'système de chauffage au sol électrique',
  'Implantation dun système de chauffage au sol électrique avant mise en place de la chappe et revêtements',
  'Pont-Sainte-Maxence (60)',
  '2024-04-25',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-plancher-chauffant-electrique.webp',
  NULL,
  false
),

-- Réalisation 6: Installation Électricité Maison Neuve
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'Installation Électrique Maison Individuelle',
  'Installation électrique complète pour une maison neuve. Tableau électrique, mise en place de tous les circuits (éclairage, prises, électroménager), installation des protections et mise en conformité.',
  'Senlis (60)',
  '2024-02-28',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-professionnel-realisation-compteur.webp',
  NULL,
  true
),

-- Réalisation 7: Coffret routeur Bureau
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'Installation coffret routeur Professionnel',
  'implantation d''un coffret routeur dans bureau professionnel. Remplacement des anciens néons par des LED haute performance, installation de variateurs et amélioration de l''efficacité énergétique.',
  'Noyon (60)',
  '2024-01-20',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-professionnel-particulier-routeur-hub.webp',
  NULL,
  false
),

-- Réalisation 10: Rénovation Électricité Appartement
-- ⚠️ REMPLACEZ l'URL ci-dessous par une autre photo de votre bucket
(
  'Rénovation Électricité d''une maison',
  'Rénovation complète de l''électricité d''une maison ancien. Remplacement de tous les fils électriques, nouveau tableau électrique, mise aux normes, installation de prises et éclairages modernes.',
  'Longueil-Sainte-Marie (60)',
  '2023-10-15',
  'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/electricien-compiegne-renovation-instalation-devis-gratuit-professionnel-particulier-passage-gaine.webp',
  NULL,
  true
)

ON CONFLICT DO NOTHING;

