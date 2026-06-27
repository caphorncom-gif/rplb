-- ============================================
-- FIX RLS SECURITY - RPLB ÉLECTRICITÉ
-- ============================================
-- Ce script active le Row Level Security (RLS) sur les tables
-- urgent_numbers et admin_users pour corriger les alertes de sécurité Supabase
-- 
-- IMPORTANT : Ce script ne crée PAS les tables, il active seulement le RLS
-- Les tables doivent déjà exister dans votre base de données

-- 1. Activer RLS sur urgent_numbers
ALTER TABLE urgent_numbers ENABLE ROW LEVEL SECURITY;

-- 2. Activer RLS sur admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Supprimer les politiques existantes si elles existent (pour éviter les erreurs)
DROP POLICY IF EXISTS "Numéros d'urgence publics" ON urgent_numbers;
DROP POLICY IF EXISTS "Admin accès admin_users" ON admin_users;

-- 4. Politique pour urgent_numbers : Lecture publique des numéros actifs
CREATE POLICY "Numéros d'urgence publics" 
ON urgent_numbers 
FOR SELECT 
USING (is_active = true);

-- 5. Politique pour admin_users : Aucun accès public (seulement pour admins authentifiés)
-- Pas de politique SELECT publique = aucun accès pour les utilisateurs non authentifiés

-- 6. Politique pour admin_users : Accès complet pour les admins authentifiés
CREATE POLICY "Admin accès admin_users" 
ON admin_users 
FOR ALL 
USING (auth.role() = 'authenticated');

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Après exécution, vérifiez dans Supabase Dashboard > Database > Linter
-- Les alertes RLS devraient disparaître

