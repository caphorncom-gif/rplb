# ✅ Vérification finale : Canonical et RLS

## ✅ 1. Balise Canonical - CONFIRMÉE

### Vérification dans le code source

La balise canonical est **bien présente** dans votre code source :

```html
<link rel="canonical" href="https://www.rplb-electricite.fr/" />
```

### ✅ Fonctionnement

1. **Balise initiale** : Présente dans `index.html` (ligne 37)
2. **Mise à jour dynamique** : Le composant `SEO.tsx` met à jour cette balise pour chaque page
3. **Normalisation** : Les URLs sont automatiquement normalisées (www, HTTPS, pas de trailing slash)

### 📋 Comment vérifier sur d'autres pages

**Test sur une page de service :**
1. Visitez : `https://www.rplb-electricite.fr/services/depannage-electrique`
2. Ouvrez le code source (Ctrl+U ou Cmd+U)
3. Cherchez : `<link rel="canonical"`
4. L'URL devrait être : `https://www.rplb-electricite.fr/services/depannage-electrique` (normalisée)

**Test avec la console :**
```javascript
// Dans la console du navigateur (F12)
document.querySelector('link[rel="canonical"]').href
// Devrait retourner l'URL normalisée de la page actuelle
```

---

## ✅ 2. RLS (Row Level Security) - À VÉRIFIER

### Script SQL exécuté

Vous avez exécuté le script SQL dans Supabase. Vérifions que tout est correct :

### 📋 Vérification dans Supabase

**1. Vérifier que RLS est activé :**
```sql
SELECT 
  tablename, 
  rowsecurity as "RLS activé",
  CASE WHEN rowsecurity THEN '✅ RLS activé' ELSE '❌ RLS désactivé' END as "Statut"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';
```

**2. Vérifier les policies créées :**
```sql
SELECT 
  policyname as "Nom",
  cmd as "Commande",
  roles as "Rôles",
  qual as "Condition SELECT",
  with_check as "Condition INSERT"
FROM pg_policies 
WHERE tablename = 'contact_requests'
ORDER BY policyname;
```

**Résultat attendu :**
- ✅ `Allow public insert for contact_requests` (INSERT, TO public)
- ✅ `Allow authenticated select for contact_requests` (SELECT, TO authenticated)
- ✅ `Allow authenticated update for contact_requests` (UPDATE, TO authenticated)
- ✅ `Allow authenticated delete for contact_requests` (DELETE, TO authenticated)

### 🧪 Test du formulaire

**1. Testez le formulaire de contact :**
1. Visitez : `https://www.rplb-electricite.fr/contact`
2. Remplissez le formulaire
3. Soumettez-le
4. **Vérifiez la console** (F12) :
   - ✅ Pas d'erreur 401
   - ✅ Message : "Données sauvegardées dans Supabase"
   - ✅ Message : "Email envoyé avec succès"

**2. Vérifiez dans Supabase :**
1. Ouvrez Supabase Dashboard > Table Editor > `contact_requests`
2. Vérifiez que la nouvelle demande apparaît
3. Vérifiez que tous les champs sont remplis correctement

---

## 🎯 Checklist finale

### Canonical URLs
- [x] Balise présente dans `index.html`
- [x] Composant SEO met à jour la balise dynamiquement
- [x] URLs normalisées (www, HTTPS, pas de trailing slash)
- [ ] Testé sur plusieurs pages (services, articles, etc.)

### RLS Policies
- [ ] RLS activé sur `contact_requests`
- [ ] Policy INSERT publique créée
- [ ] Policies SELECT/UPDATE/DELETE authentifiées créées
- [ ] Formulaire de contact testé (pas d'erreur 401)
- [ ] Données sauvegardées dans Supabase
- [ ] Emails envoyés (notification + confirmation client)

---

## 🚨 Si le formulaire ne fonctionne toujours pas

### Vérification 1 : RLS est-il activé ?

Exécutez dans Supabase SQL Editor :
```sql
SELECT rowsecurity FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'contact_requests';
```

**Si `false`** : RLS n'est pas activé, exécutez :
```sql
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
```

### Vérification 2 : Policy INSERT existe-t-elle ?

Exécutez dans Supabase SQL Editor :
```sql
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'contact_requests' AND cmd = 'INSERT';
```

**Si aucune policy** : Exécutez :
```sql
CREATE POLICY "Allow public insert for contact_requests"
ON contact_requests
FOR INSERT
TO public
WITH CHECK (true);
```

### Vérification 3 : Erreur dans la console

Ouvrez la console (F12) et regardez :
- **Erreur 401** : RLS bloque → Vérifiez les policies
- **Erreur 403** : Permission refusée → Vérifiez les policies
- **Erreur CORS** : Problème de configuration Supabase → Vérifiez les CORS settings
- **Autre erreur** : Regardez le message d'erreur complet

---

## ✅ Résultat attendu

### Canonical
- ✅ **Balise présente** dans le code source
- ✅ **Mise à jour dynamiquement** par le composant SEO
- ✅ **URLs normalisées** sur toutes les pages
- ✅ **Google peut indexer** correctement

### RLS
- ✅ **RLS activé** (Supabase satisfait)
- ✅ **Policy INSERT publique** (formulaire fonctionne)
- ✅ **Policies SELECT/UPDATE/DELETE authentifiées** (admin peut gérer)
- ✅ **Plus d'erreur 401**

---

## 📝 Prochaines étapes

1. ✅ **Testez le formulaire** de contact
2. ✅ **Vérifiez** que les données sont sauvegardées dans Supabase
3. ✅ **Vérifiez** que les emails sont envoyés
4. ✅ **Vérifiez** la balise canonical sur plusieurs pages
5. ✅ **Attendez 24-48h** pour que Google re-crawle les pages

Tout devrait fonctionner maintenant ! 🎉

