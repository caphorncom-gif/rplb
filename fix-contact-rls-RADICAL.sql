-- Solution RADICALE : Désactiver RLS pour contact_requests
-- Cette solution désactive complètement RLS pour permettre l'insertion publique
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

-- 2. DÉSACTIVER RLS complètement pour cette table
ALTER TABLE contact_requests DISABLE ROW LEVEL SECURITY;

-- 3. Vérifier que RLS est bien désactivé
SELECT 
  tablename, 
  rowsecurity as "RLS activé (false = désactivé)",
  CASE WHEN rowsecurity THEN '❌ RLS est activé' ELSE '✅ RLS est désactivé' END as "Statut"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- 4. Vérifier qu'il n'y a plus de policies
SELECT 
  COUNT(*) as "Nombre de policies restantes"
FROM pg_policies 
WHERE tablename = 'contact_requests';

-- 5. Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ RLS désactivé pour contact_requests !';
    RAISE NOTICE '✅ Toutes les policies ont été supprimées !';
    RAISE NOTICE '✅ Le formulaire de contact devrait maintenant fonctionner !';
END $$;

