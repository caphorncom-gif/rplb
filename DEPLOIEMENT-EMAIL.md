# 🚀 Déploiement de l'envoi d'emails automatique

## 📋 Résumé

Le formulaire de contact envoie maintenant les emails **automatiquement** via une Supabase Edge Function au lieu d'utiliser `mailto:`.

## ✅ Ce qui a été fait

1. ✅ **Edge Function créée** : `supabase/functions/send-contact-email/index.ts`
2. ✅ **Formulaire mis à jour** : Appelle la fonction au lieu de `mailto:`
3. ✅ **Sauvegarde dans Supabase** : Les données sont toujours sauvegardées dans la table `contact_requests`

## 🔧 Configuration Requise

### Étape 1 : Installer Supabase CLI

```bash
npm install -g supabase
```

### Étape 2 : Se connecter à Supabase

```bash
supabase login
```

### Étape 3 : Lier votre projet

1. Allez dans Supabase Dashboard > Settings > General
2. Copiez votre **Project Reference ID**
3. Exécutez :
```bash
supabase link --project-ref votre-project-ref
```

### Étape 4 : Créer un compte Resend (Gratuit)

1. Allez sur https://resend.com
2. Créez un compte (100 emails/jour gratuits)
3. Allez dans API Keys
4. Créez une nouvelle clé API
5. Copiez la clé (commence par `re_...`)

### Étape 5 : Configurer les variables d'environnement

Dans Supabase Dashboard :
1. Allez dans **Edge Functions** > **Settings** (ou l'icône ⚙️)
2. Cliquez sur **"Add new secret"** ou **"Environment Variables"**
3. Ajoutez les variables une par une :

   **Variable 1 :**
   - Nom : `RESEND_API_KEY`
   - Valeur : `re_votre_cle_ici` (votre clé Resend)

   **Variable 2 :**
   - Nom : `CONTACT_EMAILS`
   - Valeur : `kevin@caphorncom.fr,rplb.electricite@gmail.com` (séparés par une virgule)

4. **Sauvegardez** chaque variable

**Note :** Pour ajouter plus d'emails, séparez-les par des virgules dans `CONTACT_EMAILS`.

### Étape 6 : Déployer la fonction

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

## ✅ Vérification

### Tester le formulaire

1. Allez sur votre site
2. Remplissez le formulaire de contact
3. Soumettez
4. Vérifiez que l'email arrive à `kevin@caphorncom.fr`

### Vérifier les logs

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Logs

## 🔄 Fonctionnement

1. **Utilisateur remplit le formulaire** → Clic sur "Envoyer"
2. **Sauvegarde dans Supabase** → Données dans `contact_requests`
3. **Appel Edge Function** → `send-contact-email`
4. **Envoi email automatique** → Via Resend à `kevin@caphorncom.fr`
5. **Confirmation** → Message de succès à l'utilisateur

## ⚠️ Important

**Sans configuration Resend :**
- Les emails ne seront PAS envoyés automatiquement
- Les données seront toujours sauvegardées dans Supabase
- Vous devrez consulter Supabase Dashboard pour voir les demandes

**Avec configuration Resend :**
- Les emails sont envoyés automatiquement
- Vous recevez les demandes par email ET dans Supabase

## 🆘 Dépannage

### "Function not found"
→ La fonction n'est pas déployée. Déployez-la avec `supabase functions deploy send-contact-email`

### "RESEND_API_KEY not found"
→ Ajoutez la variable dans Supabase Dashboard > Edge Functions > Settings

### L'email n'arrive pas
1. Vérifiez les logs de la fonction
2. Vérifiez que Resend est bien configuré
3. Vérifiez votre domaine dans Resend (doit être vérifié)

## 📧 Emails envoyés

- **À** : Tous les emails configurés dans `CONTACT_EMAILS` (séparés par des virgules)
- **Exemple** : `kevin@caphorncom.fr,rplb.electricite@gmail.com` → Les deux recevront l'email
- **Reply-To** : Email du client (pour répondre directement)

## 🎉 Avantages

- ✅ Envoi automatique (plus besoin de confirmer)
- ✅ Fonctionne sur tous les appareils
- ✅ Emails formatés en HTML
- ✅ Double sauvegarde (email + Supabase)
- ✅ Pas de dépendance au client email de l'utilisateur

