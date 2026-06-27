# 🔧 Instructions pour corriger l'erreur RLS

## ❌ Erreur actuelle

```
new row violates row-level security policy for table "contact_requests"
```

Cette erreur signifie que les RLS policies bloquent l'insertion des données.

## ✅ Solution : Exécuter le script SQL

### Étape 1 : Ouvrir SQL Editor dans Supabase

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Cliquez sur **SQL Editor** dans le menu de gauche
4. Cliquez sur **New query**

### Étape 2 : Copier le script

Ouvrez le fichier `fix-contact-rls-FINAL.sql` et copiez **TOUT le contenu**.

### Étape 3 : Coller et exécuter

1. Collez le script dans l'éditeur SQL
2. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter / Cmd+Enter)
3. Attendez que le script s'exécute

### Étape 4 : Vérifier le résultat

Vous devriez voir :
- ✅ "Success. No rows returned" ou un message de succès
- ✅ Les résultats des requêtes SELECT montrant les policies créées
- ✅ Un message de confirmation

### Étape 5 : Tester le formulaire

1. Allez sur https://www.rplb-electricite.fr/contact
2. Ouvrez la console (F12)
3. Remplissez et soumettez le formulaire
4. Vérifiez la console :
   - ✅ "Données sauvegardées dans Supabase" = SUCCÈS !
   - ❌ "Erreur sauvegarde Supabase" = Le script n'a pas fonctionné

### Étape 6 : Vérifier dans Supabase

Dans Supabase Dashboard > Table Editor > `contact_requests` :
- Les données du formulaire doivent apparaître
- Vous devriez voir une nouvelle ligne avec les informations

## 🔍 Si ça ne fonctionne toujours pas

### Vérifier les policies existantes

Exécutez ce SQL pour voir toutes les policies :

```sql
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_requests';
```

### Vérifier si RLS est activé

```sql
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';
```

Si `rowsecurity` est `false`, RLS n'est pas activé. Exécutez :

```sql
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
```

## 📝 Script alternatif (si le premier ne fonctionne pas)

Si le script principal ne fonctionne pas, essayez ce script minimal :

```sql
-- Désactiver RLS temporairement
ALTER TABLE contact_requests DISABLE ROW LEVEL SECURITY;

-- Supprimer toutes les policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_requests';
    END LOOP;
END $$;

-- Réactiver RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Créer la policy d'insertion
CREATE POLICY "Création contact public"
ON contact_requests
FOR INSERT
TO anon
WITH CHECK (true);
```

## ✅ Résultat attendu

Après avoir exécuté le script :
- ✅ Plus d'erreur RLS
- ✅ Les données sont sauvegardées dans Supabase
- ✅ Vous pouvez voir les demandes dans Table Editor

Exécutez le script et testez le formulaire !

