# 📰 Guide : Importer les Articles du Site Existant

## 🎯 Méthode 1 : Import Manuel (Recommandé pour débuter)

### ÉTAPE 1 : Accéder à vos Articles Existants

1. Allez sur votre site existant : **https://www.rplb-electricite.fr/blog** (ou l'URL de votre blog)
2. Ouvrez chaque article dans un nouvel onglet
3. Pour chaque article, notez :
   - **Titre**
   - **Date de publication**
   - **Contenu** (texte complet)
   - **Image** (si disponible)
   - **Catégorie** (si applicable)

### ÉTAPE 2 : Ajouter un Article dans Supabase

1. Dans Supabase → **Table Editor** → Table **"articles"**
2. Cliquez sur **"Insert row"**

#### Remplissez le Formulaire :

**Champs Obligatoires :**

- **slug** : `titre-de-l-article-en-minuscules-avec-tirets`
  - Exemple : "installation-domotique-maison" 
  - Pas d'espaces, pas d'accents, tirets à la place

- **title** : `Installation Domotique dans une Maison`
  - Titre complet de l'article

- **content** : 
  ```
  [Copiez tout le contenu de l'article ici]
  Le texte complet de votre article...
  ```
  - Tout le texte de l'article

**Champs Optionnels mais Recommandés :**

- **excerpt** : `Courte description de l'article (2-3 phrases maximum)`
  - Résumé pour l'affichage dans la liste

- **featured_image** : `https://url-de-votre-image.jpg`
  - URL de l'image de l'article (si disponible)

- **category** : `Conseils` ou `Actualités` ou `Réglementation`
  - Catégorie de l'article

- **tags** : Cliquez sur `{}` et collez :
  ```json
  ["domotique", "installation", "conseils"]
  ```
  - Liste de tags (mots-clés)

- **author** : `RPLB Électricité`
  - Auteur (par défaut)

- **published_at** : `2024-01-15T10:00:00Z`
  - Date de publication (format : AAAA-MM-JJTHH:MM:SSZ)

- **seo_title** : (même que title ou version optimisée)
- **seo_description** : (même que excerpt ou version optimisée)

**Important :**

- **is_published** : ✅ **COCHEZ cette case** (sinon l'article ne s'affichera pas)

3. Cliquez sur **"Save"**

### ÉTAPE 3 : Vérifier sur le Site

1. Allez sur : **http://localhost:5174/blog**
2. Rafraîchissez (F5)
3. Votre article devrait apparaître ! 🎉

---

## 🎯 Méthode 2 : Script Automatique (Si vous avez accès technique)

Si vous avez accès à la base de données ou aux fichiers du site existant, je peux créer un script pour importer automatiquement.

**Dites-moi :**
1. Quel type de site avez-vous actuellement ? (WordPress, autre CMS, HTML statique ?)
2. Avez-vous accès à la base de données ou aux fichiers ?

---

## 📋 Template d'Article Exemple

Voici un exemple complet pour vous aider :

```json
{
  "slug": "renovation-electrique-maison-ancienne",
  "title": "Rénovation Électrique d'une Maison Ancienne : Guide Complet",
  "excerpt": "Découvrez comment rénover l'installation électrique de votre maison ancienne. Normes, étapes, et conseils d'un professionnel.",
  "content": "Voici le contenu complet de votre article...\n\nParagraphe 1...\n\nParagraphe 2...",
  "featured_image": "https://votre-url.com/image.jpg",
  "category": "Conseils",
  "tags": ["rénovation", "installation", "normes", "conseils"],
  "author": "RPLB Électricité",
  "published_at": "2024-03-15T09:00:00Z",
  "seo_title": "Rénovation Électrique Maison Ancienne - Guide 2024",
  "seo_description": "Guide complet pour rénover l'installation électrique de votre maison ancienne. Normes NF C 15-100, étapes, coûts.",
  "is_published": true
}
```

---

## 🔄 Migration par Lots

Si vous avez beaucoup d'articles :

1. **Commencez par 3-5 articles** pour tester
2. Vérifiez qu'ils s'affichent correctement
3. Continuez progressivement avec les autres

---

## 💡 Astuces

### Créer un Slug à partir du Titre

Exemple :
- Titre : "Installation Domotique : Guide Complet"
- Slug : `installation-domotique-guide-complet`

Règles :
- Minuscules uniquement
- Espaces → tirets (-)
- Accents → lettres sans accent (é → e, à → a)
- Pas de ponctuation (sauf tirets)

### Formater le Contenu

Vous pouvez copier-coller le HTML brut du site existant, ou simplement le texte. Le site l'affichera tel quel.

Pour un meilleur rendu, vous pouvez utiliser des retours à la ligne (Entrée) pour créer des paragraphes.

---

## 🆘 Problèmes Courants

### L'Article ne S'Affiche Pas

**Vérifiez :**
- ✅ `is_published` est coché
- ✅ `published_at` est rempli
- ✅ Le slug est unique (pas de doublon)

### L'Image ne S'Affiche Pas

- Vérifiez que l'URL est correcte et accessible
- Testez l'URL directement dans votre navigateur
- Si l'image est sur l'ancien site, copiez-la dans Supabase Storage

---

## 📝 Checklist par Article

- [ ] Slug créé (unique, minuscules, tirets)
- [ ] Titre complet
- [ ] Excerpt (2-3 phrases)
- [ ] Contenu complet copié
- [ ] Image (si disponible)
- [ ] Catégorie renseignée
- [ ] Tags ajoutés
- [ ] Date de publication
- [ ] `is_published` coché
- [ ] Article visible sur /blog

---

**Besoin d'aide ?** Dites-moi combien d'articles vous avez et je peux vous aider à les importer plus rapidement !

