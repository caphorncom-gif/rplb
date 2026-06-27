# Commandes de Déploiement

## ✅ Build terminé avec succès

Le build du site est terminé. Tous les fichiers sont dans le dossier `dist/`.

## 🚀 Déployer la fonction Supabase Edge Function

### Étape 1 : Vérifier que Supabase CLI est installé

```bash
supabase --version
```

Si ce n'est pas installé :
```bash
npm install -g supabase
```

### Étape 2 : Se connecter à Supabase

```bash
supabase login
```

### Étape 3 : Lier le projet

1. Allez dans Supabase Dashboard > Settings > General
2. Copiez votre **Project Reference ID** (ex: `abcdefghijklmnop`)
3. Exécutez :

```bash
supabase link --project-ref votre-project-ref
```

### Étape 4 : Déployer la fonction

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

### Étape 5 : Vérifier les variables d'environnement

Assurez-vous que ces variables sont configurées dans Supabase Dashboard > Edge Functions > Settings :

- `RESEND_API_KEY` = votre clé Resend
- `CONTACT_EMAILS` = kevin@caphorncom.fr,rplb.electricite@gmail.com

## 📦 Déployer le site

### Option 1 : Via FTP (FileZilla)

1. Connectez-vous à votre serveur OVH
2. Uploadez tous les fichiers du dossier `dist/` vers la racine du site
3. Assurez-vous que `.htaccess` est bien uploadé

### Option 2 : Via SSH

```bash
# Se connecter au serveur
ssh votre-utilisateur@votre-serveur

# Aller dans le dossier du site
cd /chemin/vers/votre/site

# Uploader les fichiers (depuis votre machine locale)
scp -r dist/* votre-utilisateur@votre-serveur:/chemin/vers/votre/site/
```

## ✅ Vérification

1. **Tester le formulaire de contact** sur le site
2. **Vérifier les emails** : Les deux adresses doivent recevoir l'email
3. **Vérifier Supabase** : Les données doivent être dans `contact_requests`
4. **Vérifier les logs** : Supabase Dashboard > Edge Functions > `send-contact-email` > Logs

## 🆘 En cas d'erreur

### "Function not found"
→ La fonction n'est pas déployée. Déployez-la avec `supabase functions deploy send-contact-email`

### "RESEND_API_KEY not found"
→ Ajoutez la variable dans Supabase Dashboard > Edge Functions > Settings

### Les emails n'arrivent pas
1. Vérifiez les logs de la fonction
2. Vérifiez que Resend est bien configuré
3. Vérifiez que les emails dans `CONTACT_EMAILS` sont valides

