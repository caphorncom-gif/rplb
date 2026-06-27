# Guide : Ajouter des Variables d'Environnement dans Supabase

## 📍 Où ajouter les variables

### Méthode 1 : Via le Dashboard Supabase (Recommandé)

1. **Connectez-vous** à votre projet Supabase : https://supabase.com/dashboard

2. **Allez dans Edge Functions** :
   - Menu de gauche → **Edge Functions**
   - Cliquez sur **Settings** (ou l'icône ⚙️)

3. **Ajoutez les variables d'environnement** :
   - Cliquez sur **"Add new secret"** ou **"Environment Variables"**
   - Ajoutez les variables une par une :

   ```
   Nom de la variable : RESEND_API_KEY
   Valeur : re_votre_cle_resend_ici
   ```

   ```
   Nom de la variable : CONTACT_EMAILS
   Valeur : kevin@caphorncom.fr,rplb.electricite@gmail.com
   ```

4. **Sauvegardez** chaque variable

### Méthode 2 : Via Supabase CLI

```bash
# Ajouter une variable
supabase secrets set RESEND_API_KEY=re_votre_cle_ici

# Ajouter les emails (séparés par des virgules)
supabase secrets set CONTACT_EMAILS=kevin@caphorncom.fr,rplb.electricite@gmail.com

# Vérifier les variables
supabase secrets list
```

## 📧 Configuration des Emails

### Format

Pour **plusieurs emails**, séparez-les par des **virgules** (sans espaces ou avec espaces, c'est géré automatiquement) :

```
kevin@caphorncom.fr,rplb.electricite@gmail.com
```

Ou avec espaces (seront automatiquement nettoyés) :

```
kevin@caphorncom.fr, rplb.electricite@gmail.com
```

### Exemples

**Un seul email :**
```
CONTACT_EMAILS=kevin@caphorncom.fr
```

**Deux emails :**
```
CONTACT_EMAILS=kevin@caphorncom.fr,rplb.electricite@gmail.com
```

**Trois emails ou plus :**
```
CONTACT_EMAILS=kevin@caphorncom.fr,rplb.electricite@gmail.com,autre@email.fr
```

## 🔍 Vérification

### Vérifier que les variables sont bien configurées

1. Dans Supabase Dashboard > Edge Functions > Settings
2. Vous devriez voir :
   - `RESEND_API_KEY` (masquée avec `***`)
   - `CONTACT_EMAILS` (visible)

### Tester

1. Remplissez le formulaire de contact sur le site
2. Vérifiez que les emails arrivent bien aux deux adresses
3. Vérifiez les logs dans Edge Functions > `send-contact-email` > Logs

## ⚠️ Important

- **Les variables sont sensibles** : Ne les partagez jamais publiquement
- **Redéployez la fonction** après avoir ajouté/modifié des variables :
  ```bash
  supabase functions deploy send-contact-email
  ```
- **Les emails doivent être valides** : Vérifiez l'orthographe

## 🆘 Problèmes courants

### Les emails n'arrivent pas

1. Vérifiez que `RESEND_API_KEY` est bien configurée
2. Vérifiez que `CONTACT_EMAILS` contient des emails valides
3. Vérifiez les logs de la fonction
4. Vérifiez que Resend est bien configuré

### Erreur "CONTACT_EMAILS not found"

→ La variable n'est pas définie. Ajoutez-la dans Supabase Dashboard.

### Un seul email reçoit les messages

→ Vérifiez le format : les emails doivent être séparés par des virgules, sans espaces autour.

## 📝 Exemple complet

**Variables à ajouter dans Supabase :**

```
RESEND_API_KEY = re_1234567890abcdef...
CONTACT_EMAILS = kevin@caphorncom.fr,rplb.electricite@gmail.com
```

**Résultat :**
- Les emails seront envoyés à **kevin@caphorncom.fr** ET **rplb.electricite@gmail.com**
- Les deux adresses recevront le même email avec toutes les informations du formulaire

