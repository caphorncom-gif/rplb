# 🔍 Vérifier pourquoi les données et emails ne fonctionnent pas

## 📋 Checklist de vérification

### 1. Vérifier les erreurs dans la console navigateur

1. Ouvrez votre site : https://www.rplb-electricite.fr/contact
2. Ouvrez la console (F12 > Console)
3. Remplissez et soumettez le formulaire
4. Regardez les messages dans la console :
   - ✅ "Données sauvegardées dans Supabase" = Les données sont bien insérées
   - ❌ "Erreur sauvegarde Supabase" = Problème avec Supabase
   - ✅ "Email envoyé avec succès" = La fonction a réussi
   - ❌ "Erreur envoi email" = Problème avec la fonction

### 2. Vérifier les RLS policies dans Supabase

**Exécutez ce script SQL** dans Supabase Dashboard > SQL Editor :

```sql
-- Vérifier si RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'contact_requests';
```

**Si RLS n'est pas activé ou si les policies manquent**, exécutez le fichier `fix-contact-rls.sql` que j'ai créé.

### 3. Vérifier les logs de la fonction Edge Function

Dans Supabase Dashboard > Edge Functions > `send-contact-email` > Logs :
- Regardez les logs les plus récents
- Cherchez "Email envoyé via Resend" ou des erreurs

### 4. Vérifier Resend Dashboard

1. Allez sur https://resend.com/emails
2. Vérifiez si les emails sont listés
3. Vérifiez leur statut :
   - ✅ "Delivered" = Email envoyé
   - ⏳ "Pending" = En attente
   - ❌ "Failed" = Échec

### 5. Vérifier les variables d'environnement

Dans Supabase Dashboard > Edge Functions > Settings :
- `RESEND_API_KEY` = votre clé Resend (commence par `re_...`)
- `CONTACT_EMAILS` = `kevin@caphorncom.fr,rplb.electricite@gmail.com` (vérifiez l'orthographe)

### 6. Vérifier les spams

Les emails peuvent être dans les spams :
- Vérifiez le dossier spam de `kevin@caphorncom.fr`
- Vérifiez le dossier spam de `rplb.electricite@gmail.com`

## 🔧 Solutions

### Solution 1 : Corriger les RLS policies

Exécutez le fichier `fix-contact-rls.sql` dans Supabase Dashboard > SQL Editor.

### Solution 2 : Vérifier les logs

Partagez avec moi :
1. Les messages de la console navigateur
2. Les logs de la fonction Edge Function
3. Les emails dans Resend Dashboard

### Solution 3 : Tester manuellement

Dans Supabase Dashboard > Table Editor > `contact_requests` :
- Essayez d'insérer manuellement une ligne
- Si ça ne fonctionne pas, c'est un problème de RLS

## 📝 Prochaines étapes

1. **Vérifiez la console navigateur** et partagez les messages
2. **Exécutez `fix-contact-rls.sql`** dans Supabase SQL Editor
3. **Vérifiez les logs** de la fonction Edge Function
4. **Vérifiez Resend Dashboard** pour voir les emails
5. **Vérifiez les spams** dans vos boîtes mail

Partagez ce que vous trouvez et je pourrai corriger le problème !

