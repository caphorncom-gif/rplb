# Edge Function : Envoi d'emails de contact

Cette fonction Supabase Edge Function envoie automatiquement les emails de contact.

## Configuration

### 1. Variables d'environnement

Dans Supabase Dashboard > Edge Functions > Settings, ajoutez :

```
RESEND_API_KEY=votre_cle_resend
CONTACT_EMAILS=kevin@caphorncom.fr,rplb.electricite@gmail.com
```

**Note :** Pour plusieurs emails, séparez-les par des virgules (sans espaces).

### 2. Obtenir une clé Resend

1. Créez un compte sur https://resend.com
2. Allez dans API Keys
3. Créez une nouvelle clé API
4. Copiez la clé dans les variables d'environnement Supabase

### 3. Déployer la fonction

```bash
# Installer Supabase CLI si nécessaire
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier le projet
supabase link --project-ref votre-project-ref

# Déployer la fonction
supabase functions deploy send-contact-email
```

## Utilisation

La fonction est appelée automatiquement depuis le formulaire de contact.

## Alternative sans Resend

Si vous ne voulez pas utiliser Resend, vous pouvez :
1. Utiliser l'API email de Supabase (si disponible)
2. Utiliser un autre service (SendGrid, Mailgun, etc.)
3. Modifier la fonction pour utiliser un webhook

