-- Solution SÉCURISÉE : Réactiver RLS avec des politiques permissives
-- Cette solution réactive RLS mais avec des politiques qui permettent l'insertion publique
-- Exécutez ce script dans Supabase Dashboard > SQL Editor

-- 1. Supprimer TOUTES les policies existantes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_requests';
        RAISE NOTICE 'Policy supprimée: %', r.policyname;
    END LOOP;
END $$;

-- 2. RÉACTIVER RLS pour cette table
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 3. Créer une policy pour permettre l'INSERTION PUBLIQUE (pour le formulaire)
CREATE POLICY "Allow public insert for contact requests"
ON contact_requests
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Créer une policy pour permettre la LECTURE aux utilisateurs authentifiés (pour l'admin)
CREATE POLICY "Allow authenticated select for contact requests"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);

-- 5. Créer une policy pour permettre la MISE À JOUR aux utilisateurs authentifiés (pour l'admin)
CREATE POLICY "Allow authenticated update for contact requests"
ON contact_requests
FOR UPDATE
TO authenticated
USING (true);

-- 6. Créer une policy pour permettre la SUPPRESSION aux utilisateurs authentifiés (pour l'admin)
CREATE POLICY "Allow authenticated delete for contact requests"
ON contact_requests
FOR DELETE
TO authenticated
USING (true);

-- 7. Vérifier que RLS est bien activé
SELECT 
  tablename, 
  rowsecurity as "RLS activé (true = activé)",
  CASE WHEN rowsecurity THEN '✅ RLS est activé' ELSE '❌ RLS est désactivé' END as "Statut"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- 8. Vérifier les policies créées
SELECT 
  policyname as "Nom de la policy",
  cmd as "Commande",
  roles as "Rôles"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;

-- 9. Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ RLS réactivé pour contact_requests !';
    RAISE NOTICE '✅ Policy INSERT publique créée (formulaire de contact) !';
    RAISE NOTICE '✅ Policies SELECT/UPDATE/DELETE authentifiées créées (admin) !';
    RAISE NOTICE '✅ Le formulaire de contact devrait fonctionner ET Supabase sera content !';
END $$;

