# ✅ Connexion réussie ! Prochaines étapes

## 🎉 Vous êtes maintenant connecté à Supabase

## 📋 Commandes suivantes à exécuter

### Étape 1 : Lier le projet

Dans votre terminal, exécutez :

```bash
supabase link --project-ref hgcpddzpqzfxrvfipsii
```

**Note :** Si votre Project Reference ID est différent, remplacez `hgcpddzpqzfxrvfipsii` par le vôtre (trouvable dans Supabase Dashboard > Settings > General).

### Étape 2 : Déployer la fonction

Une fois le projet lié, exécutez :

```bash
supabase functions deploy send-contact-email
```

## ✅ Vérification

Après le déploiement, vous devriez voir un message de succès. Ensuite :

1. **Testez le formulaire** sur https://www.rplb-electricite.fr/contact
2. **Vérifiez la console** (F12) - plus d'erreur CORS
3. **Vérifiez Supabase Dashboard** > Edge Functions > `send-contact-email` est bien listée

## 🎯 Résultat attendu

- ✅ Plus d'erreur CORS
- ✅ Les emails sont envoyés automatiquement
- ✅ Les données sont sauvegardées dans Supabase

