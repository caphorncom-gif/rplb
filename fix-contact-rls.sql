-- Script pour vérifier et corriger les RLS policies pour contact_requests

-- 1. Vérifier si RLS est activé
SELECT 
  tablename, 
  rowsecurity as "RLS activé"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- 2. Activer RLS si ce n'est pas déjà fait
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 3. Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Admin lecture contact_requests" ON contact_requests;
DROP POLICY IF EXISTS "Création contact public" ON contact_requests;
DROP POLICY IF EXISTS "Allow public insert on contact_requests" ON contact_requests;

-- 4. Créer la policy pour permettre l'insertion publique (formulaire de contact)
CREATE POLICY "Création contact public"
ON contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Créer la policy pour permettre la lecture aux admins
CREATE POLICY "Admin lecture contact_requests"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);

-- 6. Vérifier les policies créées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_requests';

-- 7. Tester l'insertion (optionnel - à exécuter manuellement)
-- INSERT INTO contact_requests (name, email, phone, message)
-- VALUES ('Test', 'test@example.com', '0123456789', 'Test de la policy RLS');

