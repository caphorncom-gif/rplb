# Guide : Configuration de l'envoi d'emails automatique

## 📧 Système d'envoi d'emails

Le formulaire de contact envoie maintenant automatiquement les emails via une **Supabase Edge Function**.

## ✅ Avantages

- ✅ **Envoi automatique** : Plus besoin que l'utilisateur confirme
- ✅ **Fonctionne partout** : Pas besoin de client email configuré
- ✅ **Double sauvegarde** : Dans Supabase ET par email
- ✅ **Emails formatés** : HTML avec toutes les informations

## 🔧 Configuration

### Option 1 : Avec Resend (Recommandé)

**Étape 1 : Créer un compte Resend**
1. Allez sur https://resend.com
2. Créez un compte gratuit (100 emails/jour gratuits)
3. Vérifiez votre domaine ou utilisez le domaine Resend

**Étape 2 : Obtenir la clé API**
1. Dans Resend Dashboard > API Keys
2. Cliquez sur "Create API Key"
3. Copiez la clé (commence par `re_...`)

**Étape 3 : Configurer dans Supabase**
1. Allez dans Supabase Dashboard > Edge Functions
2. Cliquez sur "Settings" ou "Environment Variables"
3. Ajoutez les variables :
   ```
   RESEND_API_KEY=re_votre_cle_ici
   CONTACT_EMAIL=kevin@caphorncom.fr
   COMPANY_EMAIL=rplb.electricite@gmail.com
   ```

**Étape 4 : Déployer la fonction**
```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet (trouvez votre project-ref dans Supabase Dashboard > Settings > General)
supabase link --project-ref votre-project-ref

# Déployer la fonction
supabase functions deploy send-contact-email
```

### Option 2 : Sans Resend (Alternative)

Si vous ne voulez pas utiliser Resend, vous pouvez :

1. **Utiliser un webhook** : Modifier la fonction pour appeler votre propre API
2. **Utiliser SendGrid** : Remplacer Resend par SendGrid dans le code
3. **Utiliser Mailgun** : Remplacer Resend par Mailgun dans le code

## 📝 Vérification

### Tester la fonction

1. Remplissez le formulaire de contact sur le site
2. Vérifiez que l'email arrive bien à `kevin@caphorncom.fr`
3. Vérifiez dans Supabase Dashboard > Table Editor > `contact_requests` que la donnée est sauvegardée

### Logs

Les logs de la fonction sont disponibles dans :
- Supabase Dashboard > Edge Functions > `send-contact-email` > Logs

## 🔍 Dépannage

### L'email n'arrive pas

1. **Vérifier les variables d'environnement** dans Supabase
2. **Vérifier les logs** de la fonction Edge Function
3. **Vérifier la clé Resend** (doit commencer par `re_`)
4. **Vérifier le domaine** dans Resend (doit être vérifié)

### Erreur "Function not found"

La fonction n'est pas déployée. Déployez-la avec :
```bash
supabase functions deploy send-contact-email
```

### Erreur CORS

La fonction gère automatiquement CORS. Si vous avez des erreurs, vérifiez que la fonction est bien déployée.

## 📊 Emails envoyés

Les emails sont envoyés à :
- **Destinataire principal** : `kevin@caphorncom.fr` (configurable via `CONTACT_EMAIL`)
- **Copie** : `rplb.electricite@gmail.com` (configurable via `COMPANY_EMAIL`)
- **Reply-To** : L'email du client (pour répondre directement)

## 🎯 Format de l'email

L'email contient :
- **Sujet** : "Nouvelle demande de contact - [Service]"
- **Contenu HTML** : Formaté avec toutes les informations
- **Informations client** : Nom, email, téléphone, adresse, ville
- **Message** : Le message du client
- **Métadonnées** : Date, source

## 🔐 Sécurité

- La fonction vérifie que tous les champs requis sont présents
- Les emails sont envoyés depuis un serveur sécurisé
- Pas d'exposition de clés API côté client
- Validation des données avant envoi

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez les logs dans Supabase Dashboard
2. Vérifiez que Resend est bien configuré
3. Testez la fonction manuellement via Supabase Dashboard > Edge Functions > Invoke

