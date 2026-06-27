# 🔍 Debug : Données et emails ne fonctionnent pas

## ❌ Problèmes identifiés

1. **Les données ne sont pas dans Supabase** (table `contact_requests`)
2. **Les emails n'arrivent pas** même si `email_sent: true`

## 🔍 Vérifications à faire

### 1. Vérifier les erreurs dans la console

Ouvrez la console du navigateur (F12) et regardez :
- Y a-t-il des erreurs lors de la sauvegarde Supabase ?
- Y a-t-il des erreurs lors de l'appel de la fonction ?

### 2. Vérifier les RLS (Row Level Security)

Les données peuvent être bloquées par les RLS policies. Vérifiez dans Supabase Dashboard :

1. Allez dans **Authentication** > **Policies**
2. Cherchez la table `contact_requests`
3. Vérifiez qu'il y a une policy qui permet l'INSERT pour les utilisateurs anonymes

**Si pas de policy :** Créez-en une avec ce SQL :

```sql
-- Permettre l'insertion pour tous (formulaire public)
CREATE POLICY "Allow public insert on contact_requests"
ON contact_requests
FOR INSERT
TO anon
WITH CHECK (true);
```

### 3. Vérifier les logs Resend

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Logs :
- Regardez si vous voyez "Email envoyé via Resend"
- Regardez s'il y a des erreurs Resend

### 4. Vérifier Resend Dashboard

Allez sur https://resend.com/emails :
- Vérifiez si les emails sont listés
- Vérifiez leur statut (envoyé, en attente, échoué)

### 5. Vérifier les adresses email

Dans Supabase Dashboard > Edge Functions > Settings :
- Vérifiez que `CONTACT_EMAILS` contient bien : `kevin@caphorncom.fr,rplb.electricite@gmail.com`
- Vérifiez l'orthographe des adresses

## 🔧 Solutions

### Solution 1 : Créer la policy RLS

Exécutez ce SQL dans Supabase Dashboard > SQL Editor :

```sql
-- Vérifier si RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';

-- Si RLS est activé, créer une policy pour permettre l'insertion
CREATE POLICY IF NOT EXISTS "Allow public insert on contact_requests"
ON contact_requests
FOR INSERT
TO anon
WITH CHECK (true);

-- Vérifier les policies existantes
SELECT * FROM pg_policies WHERE tablename = 'contact_requests';
```

### Solution 2 : Vérifier les logs

1. **Console navigateur** : Regardez les erreurs lors de la soumission
2. **Logs Supabase** : Edge Functions > `send-contact-email` > Logs
3. **Resend Dashboard** : Vérifiez si les emails sont envoyés

### Solution 3 : Tester manuellement

Dans Supabase Dashboard > Table Editor > `contact_requests` :
- Essayez d'insérer manuellement une ligne
- Si ça ne fonctionne pas, c'est un problème de RLS

## 📋 Checklist

- [ ] Vérifier les erreurs dans la console navigateur
- [ ] Vérifier les RLS policies pour `contact_requests`
- [ ] Vérifier les logs de la fonction Edge Function
- [ ] Vérifier Resend Dashboard pour voir les emails
- [ ] Vérifier les adresses email dans les variables d'environnement
- [ ] Tester l'insertion manuelle dans Supabase

## 🎯 Prochaines étapes

1. **Vérifiez les erreurs** dans la console navigateur
2. **Créez la policy RLS** si elle n'existe pas
3. **Vérifiez les logs** Resend
4. **Partagez les erreurs** que vous trouvez

