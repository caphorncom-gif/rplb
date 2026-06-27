# 🔍 Vérifier et Ajouter le Contenu

## 📋 ÉTAPE 1 : Vérifier dans Supabase

### Vérifier les Articles

1. Dans Supabase → **Table Editor** → Table **"articles"**
2. Regardez si vous voyez des articles dans la liste
3. Si la liste est vide → il faut ajouter les articles

### Vérifier les Réalisations

1. Dans Supabase → **Table Editor** → Table **"realisations"**
2. Regardez si vous voyez des réalisations dans la liste
3. Si la liste est vide → il faut ajouter les réalisations

---

## 📰 ÉTAPE 2 : Ajouter les 5 Articles SEO

### Méthode Simple (SQL)

1. Dans Supabase → **SQL Editor** → **New query**
2. Dans Cursor, ouvrez le fichier : **`articles-seo-insert.sql`**
3. **Sélectionnez TOUT** (Cmd+A) → **Copiez** (Cmd+C)
4. Dans Supabase : **Collez** (Cmd+V) → **Run**
5. ✅ Les 5 articles sont maintenant dans Supabase !

### Vérifier après Insertion

Après avoir exécuté le SQL, vous devriez voir en bas :
```
✅ 5 lignes insérées
```

Et dans Table Editor → articles, vous devriez voir 5 articles.

---

## 📸 ÉTAPE 3 : Ajouter vos Réalisations

### Si vous avez déjà uploadé les photos dans Supabase Storage

1. Dans Supabase → **Table Editor** → Table **"realisations"**
2. Cliquez sur **"Insert row"**

#### Remplissez pour chaque réalisation :

- **title** : `Rénovation Tableau Électrique - Compiègne`
- **description** : `Description de vos travaux...`
- **location** : `Compiègne, Oise`
- **date** : `2024-01-15` (format AAAA-MM-JJ)
- **after_image** : Collez l'URL de votre photo depuis Supabase Storage
  - Exemple : `https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/photo1.jpg`
- **before_image** : (optionnel, laissez vide si pas d'avant)
- **is_featured** : (optionnel, cochez si vous voulez mettre en avant)

3. Cliquez sur **"Save"**
4. Répétez pour chaque réalisation

### Comment Récupérer l'URL d'une Photo

1. Dans Supabase → **Storage** → **rplb-media** → **realisations**
2. Cliquez sur le nom de votre photo
3. Vous verrez l'**URL publique** → **Copiez-la**
4. Collez-la dans `after_image`

---

## ✅ ÉTAPE 4 : Vérifier sur le Site

### Vérifier les Articles

1. Allez sur : **http://localhost:5174/blog**
2. Rafraîchissez (F5)
3. Vous devriez voir les 5 articles

### Vérifier les Réalisations

1. Allez sur : **http://localhost:5174/realisations**
2. Rafraîchissez (F5)
3. Vous devriez voir vos réalisations

---

## 🆘 Si Ça Ne Fonctionne Pas

### Les Articles ne S'Affichent Pas

1. Vérifiez dans Supabase que `is_published = true` ✅
2. Vérifiez que `published_at` est rempli
3. Ouvrez la console du navigateur (F12) → Regardez les erreurs

### Les Réalisations ne S'Affichent Pas

1. Vérifiez que `after_image` contient une URL valide
2. Testez l'URL de l'image directement dans votre navigateur
3. Vérifiez que le bucket `rplb-media` est bien public

### Erreur dans la Console

Si vous voyez des erreurs en rouge dans la console (F12), copiez-les et partagez-les.

---

## 💡 Astuce

Pour vérifier rapidement si Supabase fonctionne :
- Ouvrez la console (F12)
- Allez dans l'onglet "Network" (Réseau)
- Rechargez la page
- Cherchez les requêtes vers Supabase
- Si vous voyez des erreurs 401 ou 403 → problème de permissions/clés

