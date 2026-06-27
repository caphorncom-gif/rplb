# 🔧 Correction de l'erreur CORS et Email

## ❌ Problème identifié

L'erreur CORS indique que la fonction Edge Function n'est pas correctement configurée ou pas déployée.

## ✅ Corrections apportées

### 1. Headers CORS améliorés

La fonction a été mise à jour avec des headers CORS complets :
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: POST, OPTIONS, GET`
- `Access-Control-Allow-Headers` avec tous les headers nécessaires
- `Access-Control-Max-Age: 86400`

### 2. Image Hager corrigée

L'URL de l'image Hager a été mise à jour pour utiliser un lien valide.

## 🚀 Actions à faire

### Étape 1 : Redéployer la fonction

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

### Étape 2 : Vérifier que la fonction est bien déployée

1. Allez dans Supabase Dashboard > Edge Functions
2. Vous devriez voir `send-contact-email` dans la liste
3. Cliquez dessus pour voir les logs

### Étape 3 : Vérifier les variables d'environnement

Dans Supabase Dashboard > Edge Functions > Settings, vérifiez :
- `RESEND_API_KEY` est bien configurée
- `CONTACT_EMAILS` est bien configurée

### Étape 4 : Rebuild et redéployer le site

```bash
npm run build
```

Puis uploadez les fichiers de `dist/` sur votre serveur.

## 🔍 Vérification

### Tester la fonction manuellement

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Invoke, testez avec :

```json
{
  "name": "Test",
  "email": "test@example.com",
  "phone": "0123456789",
  "message": "Test de la fonction"
}
```

### Vérifier les logs

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Logs, vous devriez voir :
- Les requêtes entrantes
- Les erreurs éventuelles
- Les emails envoyés

## ⚠️ Si l'erreur persiste

### Vérifier que la fonction est bien appelée

Dans la console du navigateur, vérifiez :
1. L'URL appelée : `https://hgcpddzpqzfxrvfipsii.supabase.co/functions/v1/send-contact-email`
2. Les headers de la requête
3. La réponse de la fonction

### Vérifier les permissions Supabase

1. Allez dans Supabase Dashboard > Settings > API
2. Vérifiez que "Enable Edge Functions" est activé
3. Vérifiez les RLS policies si nécessaire

### Alternative : Utiliser directement l'API Supabase

Si la fonction Edge Function ne fonctionne pas, vous pouvez temporairement utiliser un webhook ou une autre méthode d'envoi d'email.

## 📧 Test final

1. Remplissez le formulaire de contact sur le site
2. Vérifiez la console du navigateur (F12) pour les erreurs
3. Vérifiez les logs de la fonction dans Supabase
4. Vérifiez que les emails arrivent bien

## 🎯 Résultat attendu

Après redéploiement :
- ✅ Plus d'erreur CORS
- ✅ Les emails sont envoyés automatiquement
- ✅ Les deux adresses reçoivent les emails
- ✅ Les données sont sauvegardées dans Supabase

