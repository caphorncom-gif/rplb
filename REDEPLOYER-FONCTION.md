# 🚀 Redéployer la Fonction Supabase

## ⚠️ Important

Vous devez exécuter ces commandes **dans votre terminal** (pas via l'assistant).

## 📋 Étapes de déploiement

### Étape 1 : Se connecter à Supabase

Ouvrez votre terminal et exécutez :

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase login
```

Cela ouvrira votre navigateur pour vous connecter à Supabase.

### Étape 2 : Lier le projet (si pas déjà fait)

1. Allez dans Supabase Dashboard > Settings > General
2. Copiez votre **Project Reference ID** (ex: `hgcpddzpqzfxrvfipsii`)
3. Exécutez :

```bash
supabase link --project-ref hgcpddzpqzfxrvfipsii
```

*(Remplacez `hgcpddzpqzfxrvfipsii` par votre Project Reference ID)*

### Étape 3 : Redéployer la fonction

```bash
supabase functions deploy send-contact-email
```

## ✅ Vérification

### Vérifier que la fonction est déployée

1. Allez dans Supabase Dashboard > Edge Functions
2. Vous devriez voir `send-contact-email` dans la liste
3. Cliquez dessus pour voir les détails

### Tester le formulaire

1. Allez sur votre site : https://www.rplb-electricite.fr/contact
2. Remplissez le formulaire
3. Ouvrez la console du navigateur (F12)
4. Vérifiez qu'il n'y a **plus d'erreur CORS**
5. Vérifiez que le message de succès s'affiche

### Vérifier les logs

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Logs, vous devriez voir :
- Les requêtes entrantes
- Les emails envoyés (si Resend est configuré)
- Les erreurs éventuelles

## 🔍 Si vous avez des erreurs

### "Access token not provided"
→ Exécutez `supabase login` d'abord

### "Project not linked"
→ Exécutez `supabase link --project-ref votre-project-ref`

### "Function not found"
→ Vérifiez que vous êtes dans le bon dossier et que le dossier `supabase/functions/send-contact-email` existe

## 📧 Vérifier les variables d'environnement

Avant de tester, assurez-vous que ces variables sont configurées dans Supabase Dashboard > Edge Functions > Settings :

- `RESEND_API_KEY` = votre clé Resend (commence par `re_...`)
- `CONTACT_EMAILS` = `kevin@caphorncom.fr,rplb.electricite@gmail.com`

## 🎯 Résultat attendu

Après redéploiement :
- ✅ Plus d'erreur CORS dans la console
- ✅ Le formulaire fonctionne correctement
- ✅ Les emails sont envoyés automatiquement (si Resend est configuré)
- ✅ Les données sont sauvegardées dans Supabase

## 📝 Commandes complètes

```bash
# 1. Aller dans le dossier du projet
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"

# 2. Se connecter (ouvrira le navigateur)
supabase login

# 3. Lier le projet (remplacez par votre Project Reference ID)
supabase link --project-ref hgcpddzpqzfxrvfipsii

# 4. Déployer la fonction
supabase functions deploy send-contact-email
```

Une fois ces commandes exécutées, testez le formulaire de contact sur votre site !

