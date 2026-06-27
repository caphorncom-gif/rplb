# ✅ Correction : Utiliser le domaine vérifié

## 🎉 Bonne nouvelle

Les DNS sont connectés et le domaine est vérifié dans Resend ! ✅

## ❌ Problème

La fonction utilise encore `onboarding@resend.dev` comme expéditeur au lieu d'utiliser votre domaine vérifié `rplb-electricite.fr`.

## ✅ Solution appliquée

J'ai modifié la fonction pour :
- ✅ Utiliser `noreply@rplb-electricite.fr` comme expéditeur (votre domaine vérifié)
- ✅ Envoyer aux adresses configurées dans `CONTACT_EMAILS` (`kevin@caphorncom.fr`, `rplb.electricite@gmail.com`)
- ✅ Plus d'utilisation de `onboarding@resend.dev`

## 🚀 Redéployer la fonction

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

## 📧 Configuration des variables d'environnement

Dans Supabase Dashboard > Edge Functions > Settings, vérifiez que vous avez :

- `RESEND_API_KEY` = votre clé Resend
- `CONTACT_EMAILS` = `kevin@caphorncom.fr,rplb.electricite@gmail.com`
- `RESEND_DOMAIN` = `rplb-electricite.fr` (optionnel, valeur par défaut)
- `FROM_EMAIL` = `noreply@rplb-electricite.fr` (optionnel, valeur par défaut)

**Note** : `RESEND_DOMAIN` et `FROM_EMAIL` ont des valeurs par défaut, vous n'avez pas besoin de les ajouter si vous utilisez `noreply@rplb-electricite.fr`.

## ✅ Résultat attendu

Après redéploiement :
- ✅ Les emails sont envoyés depuis `noreply@rplb-electricite.fr` (votre domaine vérifié)
- ✅ Les emails arrivent à `kevin@caphorncom.fr` et `rplb.electricite@gmail.com`
- ✅ Plus d'erreur dans les logs
- ✅ Les données sont toujours sauvegardées dans Supabase

## 🔍 Vérification

1. **Redéployez la fonction** : `supabase functions deploy send-contact-email`
2. **Testez le formulaire** sur votre site
3. **Vérifiez les emails** : Ils devraient arriver aux deux adresses
4. **Vérifiez les logs** : Plus d'erreur 403

## 📝 Note

Si vous voulez utiliser une autre adresse expéditrice (par exemple `contact@rplb-electricite.fr`), ajoutez la variable `FROM_EMAIL` dans Supabase Dashboard > Edge Functions > Settings.

Redéployez la fonction et testez - les emails devraient maintenant arriver correctement !


