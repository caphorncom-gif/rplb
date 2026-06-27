-- Script simple pour corriger les RLS policies pour contact_requests
-- Exécutez ce script dans Supabase Dashboard > SQL Editor

-- 1. Activer RLS (si pas déjà activé)
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer les anciennes policies qui pourraient bloquer
DROP POLICY IF EXISTS "Admin lecture contact_requests" ON contact_requests;
DROP POLICY IF EXISTS "Création contact public" ON contact_requests;
DROP POLICY IF EXISTS "Allow public insert on contact_requests" ON contact_requests;

-- 3. Créer la policy pour permettre l'insertion publique (formulaire de contact)
-- Cette policy permet à n'importe qui (anon) d'insérer des données
CREATE POLICY "Création contact public"
ON contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Créer la policy pour permettre la lecture aux utilisateurs authentifiés (admins)
CREATE POLICY "Admin lecture contact_requests"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);

-- 5. Vérifier que ça fonctionne
SELECT 
  tablename, 
  rowsecurity as "RLS activé"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

SELECT 
  policyname,
  cmd as "Commande",
  roles as "Rôles autorisés"
FROM pg_policies 
WHERE tablename = 'contact_requests';

