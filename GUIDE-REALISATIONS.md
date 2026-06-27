# Guide d'Ajout des Réalisations

## 📋 ÉTAPE 1 : Lister vos Photos dans Supabase

**Avant tout, vous devez voir quelles photos sont disponibles :**

1. **Allez dans Supabase** → **Storage** → **rplb-media** → **realisations**
2. **Vous verrez tous les fichiers** avec leurs noms exacts
3. **Notez les noms** de tous les fichiers (ex: `photo-1.webp`, `tableau-electrique.webp`, etc.)

## 📋 ÉTAPE 2 : Remplacer les URLs dans le Script SQL

1. **Ouvrez le fichier** `insert-realisations.sql` dans Cursor
2. **Pour chaque réalisation**, remplacez `NOM_FICHIER_X.webp` par le vrai nom de votre fichier
3. **Exemple** :
   - Si votre fichier s'appelle `tableau-electrique-renove.webp`
   - Remplacez : `NOM_FICHIER_2.webp`
   - Par : `tableau-electrique-renove.webp`

**Base URL** : `https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/`

**Format complet** : `https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/realisations/VOTRE_FICHIER.webp`

## 📋 ÉTAPE 3 : Exécuter le Script

1. **Ouvrez Supabase** → Allez dans "SQL Editor"
2. **Copiez-collez le contenu** du fichier `insert-realisations.sql` (modifié avec vos noms de fichiers)
3. **Exécutez la requête** pour insérer les réalisations

## 🖼️ Astuce : Récupérer l'URL Complète d'une Photo

1. Dans Supabase Storage → **rplb-media** → **realisations**
2. **Cliquez sur le nom du fichier**
3. Vous verrez l'**URL publique** → **Copiez-la complètement**
4. Collez-la dans le script SQL

## 📝 Réalisations Créées

Le script crée 10 réalisations avec des descriptions adaptées :

1. **Installation Climatisation Murale** - Compiègne
2. **Rénovation Tableau Électrique** - Longueil-Sainte-Marie
3. **Installation Électrique Cuisine** - Verberie
4. **Installation Domotique** - Pont-Sainte-Maxence
5. **Dépannage Prise** - Crépy-en-Valois
6. **Installation Maison Neuve** - Senlis
7. **Rénovation Éclairage Bureau** - Noyon
8. **Borne Recharge VE** - Montataire
9. **Dépannage Urgence** - Compiègne
10. **Rénovation Appartement** - Longueil-Sainte-Marie

## ✅ Vérification

Après insertion, vérifiez que les réalisations s'affichent sur la page `/realisations` de votre site.

## 🔄 Ajouter Plus de Réalisations

Pour ajouter d'autres réalisations, utilisez ce format :

```sql
INSERT INTO realisations (title, description, location, date, after_image, is_featured) VALUES
(
  'Titre de la réalisation',
  'Description détaillée du projet...',
  'Ville (60)',
  '2024-01-01',
  'URL_de_la_photo',
  true
);
```
