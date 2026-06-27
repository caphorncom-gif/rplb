# ⚡ Configuration Rapide - Indexation Automatique

## 🚨 Étape Nécessaire Avant de Lancer

Le script nécessite une **clé Google Service Account**. Voici comment l'obtenir en 10 minutes :

---

## 📋 Étapes Rapides (10 minutes)

### 1. Créer un Projet Google Cloud (2 min)

1. Allez sur : https://console.cloud.google.com/
2. Cliquez sur **"Sélectionner un projet"** → **"Nouveau projet"**
3. Nom : `rplb-electricite-indexing`
4. Cliquez **"Créer"**

### 2. Activer l'API Indexing (1 min)

1. Menu → **"APIs & Services"** → **"Library"**
2. Recherchez **"Indexing API"**
3. Cliquez **"Enable"**

### 3. Créer un Service Account (2 min)

1. **"APIs & Services"** → **"Credentials"**
2. **"Create Credentials"** → **"Service Account"**
3. Nom : `indexing-service`
4. Cliquez **"Create and Continue"**
5. Rôle : **"Editor"**
6. Cliquez **"Done"**

### 4. Télécharger la Clé JSON (1 min)

1. Cliquez sur le Service Account créé
2. Onglet **"Keys"**
3. **"Add Key"** → **"Create new key"**
4. Sélectionnez **"JSON"**
5. Cliquez **"Create"**
6. **Le fichier JSON se télécharge automatiquement**

### 5. Placer le Fichier dans le Projet (1 min)

1. **Renommez** le fichier téléchargé : `google-service-account-key.json`
2. **Placez-le** à la racine du projet :
   ```
   /Users/kevin/Documents/RPLC - new site/rplb-electricite/google-service-account-key.json
   ```

### 6. Ajouter dans Google Search Console (2 min)

1. Ouvrez : https://search.google.com/search-console
2. Sélectionnez votre propriété : `https://www.rplb-electricite.fr`
3. **"Paramètres"** → **"Propriétaires et utilisateurs"**
4. **"Ajouter un utilisateur"**
5. **Copiez l'email** du Service Account (dans le fichier JSON, c'est `"client_email"`)
   - Exemple : `indexing-service@rplb-electricite-indexing.iam.gserviceaccount.com`
6. Collez l'email et donnez le rôle **"Propriétaire"**
7. Cliquez **"Ajouter"**

### 7. Vérifier le Fichier (1 min)

Vérifiez que le fichier est bien présent :
```bash
ls -la google-service-account-key.json
```

---

## ✅ Une Fois Configuré

Lancez simplement :
```bash
npm run index:google
```

Le script va :
- ✅ Lire toutes les URLs du sitemap
- ✅ Exclure les 5 pages déjà indexées
- ✅ Indexer automatiquement les 88 pages restantes
- ✅ Afficher un résumé

**Temps d'exécution :** ~1-2 minutes

---

## 🎯 Résultat Attendu

```
🚀 Démarrage de l'indexation automatique...

✅ Clé de service account trouvée

📋 Récupération des URLs depuis le sitemap...
✅ 88 URL(s) trouvée(s)

🔐 Obtention du token d'accès...
✅ Token obtenu

📤 Demande d'indexation des URLs...

[1/88] Indexation de : https://www.rplb-electricite.fr/realisations
   ✅ Succès
[2/88] Indexation de : https://www.rplb-electricite.fr/about
   ✅ Succès
...

==================================================
📊 RÉSUMÉ
==================================================
✅ Succès : 88
❌ Échecs : 0
📊 Total : 88

✅ Indexation automatique terminée !
⏱️  Les pages seront indexées dans les prochaines heures/jours.
```

---

## ⚠️ Important

- **Ne commitez JAMAIS** le fichier JSON dans Git (déjà dans .gitignore)
- **Gardez le fichier JSON secret** (c'est une clé d'accès)
- **Le fichier JSON est unique** : si vous le perdez, créez-en un nouveau

---

## 🚀 Après la Configuration

Une fois le fichier `google-service-account-key.json` placé dans le projet, relancez :

```bash
npm run index:google
```

**C'est tout ! Les 88 pages seront indexées automatiquement.** 🎉

---

## 📞 Besoin d'Aide ?

Si vous avez des problèmes :
1. Vérifiez que le fichier JSON est bien à la racine du projet
2. Vérifiez que l'API Indexing est bien activée
3. Vérifiez que le Service Account est bien ajouté dans Google Search Console
4. Consultez `GUIDE-INDEXATION-AUTOMATIQUE.md` pour plus de détails

