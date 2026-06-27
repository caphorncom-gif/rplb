# 🔧 Correction : Domaine Resend non vérifié

## ❌ Problème identifié

L'erreur indique que le domaine `rplb-electricite.fr` n'est pas vérifié dans Resend :

```
The rplb-electricite.fr domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

## ✅ Solution appliquée

J'ai modifié la fonction pour utiliser le domaine par défaut de Resend : `onboarding@resend.dev`

Cela permet d'envoyer des emails immédiatement sans avoir à vérifier un domaine.

## 🚀 Redéployer la fonction

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
supabase functions deploy send-contact-email
```

## 📧 Option 1 : Utiliser le domaine Resend par défaut (Recommandé pour commencer)

**Avantages :**
- ✅ Fonctionne immédiatement
- ✅ Pas de configuration supplémentaire
- ✅ Parfait pour les tests

**Inconvénients :**
- ⚠️ L'email vient de `onboarding@resend.dev` (pas de votre domaine)

## 🔐 Option 2 : Vérifier votre domaine (Pour la production)

Si vous voulez utiliser votre propre domaine `rplb-electricite.fr` :

1. **Allez sur Resend** : https://resend.com/domains
2. **Ajoutez votre domaine** : `rplb-electricite.fr`
3. **Vérifiez le domaine** : Ajoutez les enregistrements DNS demandés
4. **Attendez la vérification** : Peut prendre quelques minutes
5. **Modifiez la fonction** : Remplacez `onboarding@resend.dev` par `noreply@rplb-electricite.fr`
6. **Redéployez** : `supabase functions deploy send-contact-email`

## ✅ Test après redéploiement

1. **Redéployez la fonction** avec la correction
2. **Testez le formulaire** sur votre site
3. **Vérifiez les emails** : Ils devraient arriver maintenant
4. **Vérifiez les logs** : Plus d'erreur 500

## 🎯 Résultat attendu

Après redéploiement :
- ✅ Plus d'erreur 500
- ✅ Les emails sont envoyés avec `onboarding@resend.dev` comme expéditeur
- ✅ Les deux adresses reçoivent les emails
- ✅ Les données sont sauvegardées dans Supabase

## 📝 Note

Pour la production, vous pouvez vérifier votre domaine dans Resend pour utiliser `noreply@rplb-electricite.fr` comme expéditeur. Mais pour l'instant, `onboarding@resend.dev` fonctionnera parfaitement pour recevoir les emails de contact.

