-- Script de DIAGNOSTIC pour comprendre le problème RLS
-- Exécutez ce script dans Supabase Dashboard > SQL Editor
-- Il affichera toutes les informations nécessaires pour comprendre le problème

-- 1. Vérifier l'état de RLS
SELECT 
  tablename, 
  rowsecurity as "RLS activé",
  CASE WHEN rowsecurity THEN '✅ RLS est activé' ELSE '❌ RLS est désactivé' END as "Statut"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- 2. Lister TOUTES les policies existantes
SELECT 
  policyname as "Nom de la policy",
  cmd as "Commande (INSERT/SELECT/etc.)",
  roles as "Rôles autorisés",
  qual as "Condition SELECT (USING)",
  with_check as "Condition INSERT (WITH CHECK)"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;

-- 3. Vérifier la structure de la table
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'contact_requests'
ORDER BY ordinal_position;

-- 4. Vérifier les contraintes
SELECT 
  conname as "Nom de la contrainte",
  contype as "Type (c=check, f=foreign key, etc.)",
  pg_get_constraintdef(oid) as "Définition"
FROM pg_constraint
WHERE conrelid = 'public.contact_requests'::regclass;

-- 5. Tester une insertion manuelle (simule ce que fait le formulaire)
-- Cette requête devrait fonctionner si RLS est correctement configuré
DO $$
DECLARE
    test_result TEXT;
BEGIN
    BEGIN
        INSERT INTO contact_requests (
            name, email, phone, address, city, service_type, message, urgency, budget_range
        ) VALUES (
            'TEST', 'test@test.com', '0123456789', '', '', '', 'Test RLS', 'Planifier', ''
        );
        test_result := '✅ INSERT réussi - RLS fonctionne';
    EXCEPTION WHEN OTHERS THEN
        test_result := '❌ INSERT échoué - Erreur: ' || SQLERRM;
    END;
    
    RAISE NOTICE '%', test_result;
END $$;

-- 6. Nettoyer le test (supprimer l'enregistrement de test)
DELETE FROM contact_requests WHERE email = 'test@test.com';

-- 7. Résumé des informations
DO $$
DECLARE
    rls_status BOOLEAN;
    policy_count INTEGER;
BEGIN
    -- Récupérer le statut RLS
    SELECT rowsecurity INTO rls_status
    FROM pg_tables 
    WHERE schemaname = 'public' AND tablename = 'contact_requests';
    
    -- Compter les policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'contact_requests';
    
    RAISE NOTICE '';
    RAISE NOTICE '═══════════════════════════════════════════════════════════';
    RAISE NOTICE '📊 RÉSUMÉ DU DIAGNOSTIC';
    RAISE NOTICE '═══════════════════════════════════════════════════════════';
    RAISE NOTICE 'RLS Status: %', CASE WHEN rls_status THEN 'ACTIVÉ' ELSE 'DÉSACTIVÉ' END;
    RAISE NOTICE 'Nombre de policies: %', policy_count;
    RAISE NOTICE '';
    
    IF rls_status AND policy_count = 0 THEN
        RAISE NOTICE '⚠️  PROBLÈME DÉTECTÉ : RLS est activé mais aucune policy !';
        RAISE NOTICE '   → Solution : Désactiver RLS ou créer une policy INSERT';
    ELSIF rls_status AND policy_count > 0 THEN
        RAISE NOTICE '✅ RLS est activé avec des policies';
        RAISE NOTICE '   → Vérifiez que la policy INSERT autorise "anon"';
    ELSIF NOT rls_status THEN
        RAISE NOTICE '✅ RLS est désactivé - Le formulaire devrait fonctionner';
    END IF;
    
    RAISE NOTICE '═══════════════════════════════════════════════════════════';
END $$;



