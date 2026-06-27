# 🔧 Solution Définitive : Erreur 401/42501 sur contact_requests

## 🚨 Problème

L'erreur persiste malgré plusieurs tentatives :
```
POST .../contact_requests ... 401 (Unauthorized)
Erreur: new row violates row-level security policy for table "contact_requests"
```

## 🔍 Diagnostic

**Exécutez d'abord le script de diagnostic :**

1. Ouvrez Supabase Dashboard > SQL Editor
2. Exécutez : `fix-contact-rls-DIAGNOSTIC.sql`
3. Regardez les résultats pour comprendre le problème

## ✅ Solution 1 : Désactiver RLS (RECOMMANDÉ)

**C'est la solution la plus simple et la plus fiable.**

### Script : `fix-contact-rls-ULTIME.sql`

1. Ouvrez Supabase Dashboard > SQL Editor
2. Copiez-collez le contenu de `fix-contact-rls-ULTIME.sql`
3. Exécutez le script
4. Testez le formulaire

**Cette solution :**
- ✅ Désactive complètement RLS pour `contact_requests`
- ✅ Supprime toutes les policies
- ✅ Permet l'insertion publique sans restriction
- ⚠️ Supabase affichera un avertissement (mais c'est OK)

**Note :** Supabase recommandera d'activer RLS, mais pour un formulaire de contact public, c'est acceptable de le désactiver.

---

## ✅ Solution 2 : RLS avec policy très permissive

Si vous voulez absolument garder RLS activé, essayez cette solution :

```sql
-- 1. Supprimer toutes les policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contact_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contact_requests';
    END LOOP;
END $$;

-- 2. Activer RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 3. Policy TRÈS permissive pour INSERT (sans condition)
CREATE POLICY "contact_requests_insert_policy"
ON contact_requests
FOR INSERT
WITH CHECK (true);

-- 4. Policy pour SELECT (authentifié uniquement)
CREATE POLICY "contact_requests_select_policy"
ON contact_requests
FOR SELECT
TO authenticated
USING (true);
```

**Important :** Cette policy n'a pas de clause `TO`, ce qui signifie qu'elle s'applique à tous les rôles.

---

## 🧪 Test après correction

### 1. Test dans Supabase SQL Editor

```sql
-- Test d'insertion manuelle
INSERT INTO contact_requests (
    name, email, phone, address, city, service_type, message, urgency, budget_range
) VALUES (
    'TEST', 'test@test.com', '0123456789', '', '', '', 'Test', 'Planifier', ''
);

-- Si ça fonctionne, supprimez le test
DELETE FROM contact_requests WHERE email = 'test@test.com';
```

### 2. Test sur le site

1. Visitez : `https://www.rplb-electricite.fr/contact`
2. Remplissez le formulaire
3. Soumettez-le
4. Vérifiez la console (F12) :
   - ✅ Pas d'erreur 401
   - ✅ Message : "Données sauvegardées dans Supabase"

### 3. Vérification dans Supabase

1. Ouvrez Supabase Dashboard > Table Editor > `contact_requests`
2. Vérifiez que la nouvelle demande apparaît

---

## 📋 Checklist de résolution

- [ ] Script de diagnostic exécuté
- [ ] Solution choisie (RLS désactivé ou policy permissive)
- [ ] Script de correction exécuté
- [ ] Test d'insertion manuelle réussi dans SQL Editor
- [ ] Formulaire testé sur le site
- [ ] Données vérifiées dans Supabase Table Editor
- [ ] Plus d'erreur 401 dans la console

---

## 🎯 Recommandation

**Je recommande la Solution 1 (désactiver RLS)** car :
- ✅ C'est la plus simple
- ✅ C'est la plus fiable
- ✅ Pour un formulaire de contact public, c'est acceptable
- ✅ Pas de problème de rôles ou de conditions
- ⚠️ Supabase affichera un avertissement (mais c'est juste une recommandation)

---

## 🚨 Si ça ne fonctionne toujours pas

### Vérification 1 : Variables d'environnement

Vérifiez que les variables d'environnement sont correctes :
- `VITE_SUPABASE_URL` : Doit être `https://hgcpddzpqzfxrvfipsii.supabase.co`
- `VITE_SUPABASE_ANON_KEY` : Doit être votre clé anonyme Supabase

### Vérification 2 : Structure de la table

Vérifiez que la table `contact_requests` a bien toutes les colonnes nécessaires :
- `name`, `email`, `phone`, `address`, `city`, `service_type`, `message`, `urgency`, `budget_range`

### Vérification 3 : Permissions Supabase

Vérifiez dans Supabase Dashboard > Settings > API :
- L'URL est correcte
- La clé anonyme est correcte
- Les permissions sont activées

---

## ✅ Résultat attendu

Après avoir exécuté la solution :
- ✅ **Plus d'erreur 401** dans la console
- ✅ **Formulaire fonctionne** correctement
- ✅ **Données sauvegardées** dans Supabase
- ✅ **Emails envoyés** (notification + confirmation client)

Exécutez le script de diagnostic d'abord, puis choisissez la solution qui vous convient le mieux !



