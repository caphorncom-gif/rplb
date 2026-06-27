-- Script FINAL pour corriger les RLS policies pour contact_requests
-- Exécutez ce script dans Supabase Dashboard > SQL Editor
-- Ce script supprime TOUTES les policies existantes et en crée de nouvelles

-- 1. Désactiver temporairement RLS pour nettoyer
ALTER TABLE contact_requests DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer TOUTES les policies existantes (au cas où)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_requests';
    END LOOP;
END $$;

-- 3. Réactiver RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 4. Créer la policy pour permettre l'insertion publique (formulaire de contact)
-- Cette policy permet à n'importe qui (anon) d'insérer des données
CREATE POLICY "Création contact public"
ON contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Créer la policy pour permettre la lecture aux utilisateurs authentifiés (admins)
CREATE POLICY "Admin lecture contact_requests"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);

-- 6. Vérifier que ça fonctionne
SELECT 
  tablename, 
  rowsecurity as "RLS activé"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

SELECT 
  policyname as "Nom de la policy",
  cmd as "Commande",
  roles as "Rôles autorisés"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;

-- 7. Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ RLS policies créées avec succès !';
    RAISE NOTICE 'Vous pouvez maintenant tester le formulaire de contact.';
END $$;

