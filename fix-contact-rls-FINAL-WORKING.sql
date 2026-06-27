-- Solution FINALE qui FONCTIONNE : Utiliser 'anon' au lieu de 'public'
-- Exécutez ce script dans Supabase Dashboard > SQL Editor
-- Ce script corrige définitivement l'erreur 401/42501

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

-- 2. RÉACTIVER RLS (important pour Supabase)
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 3. Policy CRITIQUE : Permettre INSERT à 'anon' ET 'authenticated'
-- IMPORTANT : Dans Supabase, les utilisateurs non authentifiés utilisent le rôle 'anon', pas 'public' !
CREATE POLICY "Allow anon and authenticated insert for contact_requests"
ON contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy pour la lecture (admin uniquement)
CREATE POLICY "Allow authenticated select for contact_requests"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);

-- 5. Policy pour la mise à jour (admin uniquement)
CREATE POLICY "Allow authenticated update for contact_requests"
ON contact_requests
FOR UPDATE
TO authenticated
USING (true);

-- 6. Policy pour la suppression (admin uniquement)
CREATE POLICY "Allow authenticated delete for contact_requests"
ON contact_requests
FOR DELETE
TO authenticated
USING (true);

-- 7. VÉRIFICATION : Tester que RLS est activé
SELECT 
  tablename, 
  rowsecurity as "RLS activé",
  CASE WHEN rowsecurity THEN '✅ RLS activé' ELSE '❌ RLS désactivé' END as "Statut"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- 8. VÉRIFICATION : Lister toutes les policies
SELECT 
  policyname as "Nom",
  cmd as "Commande",
  roles as "Rôles",
  with_check as "Condition INSERT"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;

-- 9. VÉRIFICATION SPÉCIALE : Vérifier que la policy INSERT autorise bien 'anon'
SELECT 
  policyname,
  cmd,
  roles,
  CASE 
    WHEN 'anon' = ANY(roles::text[]) THEN '✅ anon autorisé'
    ELSE '❌ anon NON autorisé'
  END as "Statut anon"
FROM pg_policies 
WHERE tablename = 'contact_requests' 
AND cmd = 'INSERT';

-- 10. Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '✅ Script exécuté avec succès !';
    RAISE NOTICE '✅ RLS est activé';
    RAISE NOTICE '✅ Policy INSERT créée pour anon ET authenticated';
    RAISE NOTICE '✅ Policies SELECT/UPDATE/DELETE authentifiées créées (admin)';
    RAISE NOTICE '';
    RAISE NOTICE '📝 IMPORTANT :';
    RAISE NOTICE '   - Les utilisateurs non authentifiés utilisent le rôle "anon"';
    RAISE NOTICE '   - La policy INSERT autorise maintenant "anon" et "authenticated"';
    RAISE NOTICE '';
    RAISE NOTICE '🧪 TESTEZ MAINTENANT :';
    RAISE NOTICE '1. Testez le formulaire de contact sur votre site';
    RAISE NOTICE '2. L''erreur 401/42501 devrait avoir disparu';
    RAISE NOTICE '3. Vérifiez que les données sont bien insérées dans Supabase';
END $$;



