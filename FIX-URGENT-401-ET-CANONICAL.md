# 🚨 Correction URGENTE : Erreur 401 et Vérification Canonical

## ❌ Problème 1 : Erreur 401 sur Supabase

### Erreur
```
hgcpddzpqzfxrvfipsii.supabase.co/rest/v1/contact_requests?columns=... Failed to load resource: the server responded with a status of 401
Erreur sauvegarde Supabase: Object
```

### 🔍 Cause
RLS (Row Level Security) bloque l'insertion dans `contact_requests`. Le formulaire essaie d'insérer des données mais n'a pas la permission.

### ✅ Solution URGENTE

**Exécutez IMMÉDIATEMENT ce script SQL dans Supabase :**

1. **Ouvrez** Supabase Dashboard > SQL Editor
2. **Copiez-collez** le contenu de `fix-contact-rls-URGENT.sql`
3. **Exécutez** le script
4. **Vérifiez** que les policies sont créées

Le script :
- ✅ **Réactive RLS** (pour satisfaire Supabase)
- ✅ **Crée une policy INSERT publique** (pour que le formulaire fonctionne)
- ✅ **Crée des policies SELECT/UPDATE/DELETE authentifiées** (pour l'admin)

### 📋 Vérification après exécution

1. **Testez le formulaire** sur votre site
2. **Vérifiez** que l'erreur 401 a disparu
3. **Vérifiez** dans Supabase Dashboard > Table Editor > `contact_requests` que les données sont bien insérées

---

## ✅ Problème 2 : Vérification de la balise canonical

### 🔍 Vérification effectuée

**La balise canonical est bien présente et fonctionnelle !**

1. ✅ **Dans `index.html`** (ligne 37) :
   ```html
   <link rel="canonical" href="https://www.rplb-electricite.fr/" />
   ```

2. ✅ **Dans `src/components/SEO.tsx`** (ligne 100) :
   ```typescript
   updateLinkTag('canonical', pageUrl)
   ```

3. ✅ **Fonction de normalisation** (lignes 42-60) :
   - Supprime les paramètres de requête
   - Supprime le trailing slash (sauf racine)
   - Force `www` pour la cohérence
   - Force `HTTPS` pour la sécurité

### 📋 Comment vérifier sur le site

**Méthode 1 : Code source**
1. Ouvrez votre site : `https://www.rplb-electricite.fr/services`
2. Ouvrez le code source (Ctrl+U ou Cmd+U)
3. Cherchez : `<link rel="canonical"`
4. Vérifiez que l'URL est normalisée : `https://www.rplb-electricite.fr/services` (pas de trailing slash, pas de paramètres)

**Méthode 2 : Outils en ligne**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

**Méthode 3 : Console navigateur**
1. Ouvrez la console (F12)
2. Tapez : `document.querySelector('link[rel="canonical"]')`
3. Vérifiez que l'élément existe et que l'URL est correcte

---

## 🚀 Actions à effectuer

### 1. Corriger l'erreur 401 (URGENT)

```bash
# 1. Ouvrez Supabase Dashboard > SQL Editor
# 2. Exécutez le script fix-contact-rls-URGENT.sql
# 3. Testez le formulaire de contact
```

### 2. Vérifier la balise canonical

```bash
# 1. Visitez votre site
# 2. Ouvrez le code source (Ctrl+U)
# 3. Cherchez <link rel="canonical"
# 4. Vérifiez que l'URL est normalisée
```

### 3. Rebuild et redéployer (si nécessaire)

Si vous avez modifié le code, rebuild :

```bash
npm run build
# Puis redéployez sur OVH
```

---

## ✅ Résultat attendu

### Erreur 401
- ✅ **RLS activé** sur `contact_requests`
- ✅ **Policy INSERT publique** créée
- ✅ **Formulaire fonctionne** (plus d'erreur 401)
- ✅ **Données sauvegardées** dans Supabase

### Balise canonical
- ✅ **Présente** dans le code source
- ✅ **Mise à jour dynamiquement** par le composant SEO
- ✅ **URLs normalisées** (www, HTTPS, pas de trailing slash)
- ✅ **Google peut l'indexer** correctement

---

## 📝 Notes importantes

### RLS
- **RLS doit être activé** pour satisfaire Supabase
- **La policy INSERT doit être publique** (`TO public`) pour que le formulaire fonctionne
- **Les policies SELECT/UPDATE/DELETE doivent être authentifiées** pour la sécurité

### Canonical
- **La balise est générée dynamiquement** par le composant SEO
- **Elle est normalisée** automatiquement (www, HTTPS, pas de trailing slash)
- **Elle est présente sur toutes les pages** grâce au composant SEO

---

## 🎯 Prochaines étapes

1. ✅ **Exécutez le script SQL** pour corriger l'erreur 401
2. ✅ **Testez le formulaire** de contact
3. ✅ **Vérifiez** que les données sont bien sauvegardées
4. ✅ **Vérifiez** la balise canonical dans le code source
5. ✅ **Attendez 24-48h** pour que Google re-crawle les pages

Tout devrait être corrigé ! 🎉

