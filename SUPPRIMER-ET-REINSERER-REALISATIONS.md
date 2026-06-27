# 📋 Guide : Supprimer et Réinsérer les Réalisations

## ⚠️ ÉTAPE 1 : Supprimer TOUTES les Réalisations

1. **Allez dans Supabase** → **SQL Editor** → **New query**
2. **Ouvrez dans Cursor** le fichier : `delete-all-realisations.sql`
3. **Copiez-collez** le contenu dans Supabase
4. **Exécutez** la requête
5. ✅ Vous devriez voir : `DELETE 10` (ou le nombre de réalisations supprimées)

## ✅ ÉTAPE 2 : Réinsérer les Réalisations

1. **Dans Supabase** → **SQL Editor** → **New query** (nouvelle requête)
2. **Ouvrez dans Cursor** le fichier : `insert-realisations.sql`
3. **Copiez-collez** TOUT le contenu dans Supabase
4. **Exécutez** la requête
5. ✅ Vous devriez voir : `INSERT 0 7` (ou le nombre de réalisations insérées)

## 🔍 ÉTAPE 3 : Vérifier

1. Allez dans Supabase → **Table Editor** → Table **"realisations"**
2. Vous devriez voir vos réalisations avec les bonnes photos
3. Allez sur votre site → Page `/realisations`
4. Rafraîchissez la page (F5)

## ⚠️ Note

Le fichier `insert-realisations.sql` contient actuellement 7 réalisations (au lieu de 10). Si vous voulez ajouter plus de réalisations, vous pouvez modifier le fichier SQL et réexécuter l'étape 2.

