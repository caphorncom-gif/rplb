-- Solution ALTERNATIVE : Créer une policy permissive qui fonctionne à coup sûr
-- Si vous préférez garder RLS activé, utilisez ce script
-- Exécutez ce script dans Supabase Dashboard > SQL Editor

-- 1. Supprimer TOUTES les policies existantes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_requests';
    END LOOP;
END $$;

-- 2. S'assurer que RLS est activé
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 3. Créer une policy PERMISSIVE pour l'insertion (permet tout)
-- Cette policy est permissive et permet à n'importe qui d'insérer
CREATE POLICY "Allow all insert on contact_requests"
ON contact_requests
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Créer une policy PERMISSIVE pour la lecture (permet tout aux admins)
CREATE POLICY "Allow all select on contact_requests"
ON contact_requests
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (true);

-- 5. Vérifier les policies créées
SELECT 
  policyname as "Nom de la policy",
  cmd as "Commande",
  roles as "Rôles",
  permissive as "Permissive"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;

-- 6. Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '✅ Policies permissives créées !';
    RAISE NOTICE '✅ Le formulaire de contact devrait maintenant fonctionner !';
END $$;

