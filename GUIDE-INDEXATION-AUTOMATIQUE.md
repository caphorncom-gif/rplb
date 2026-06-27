# 🤖 Guide : Indexation Automatique avec Google Indexing API

## 🎯 Avantages

- ✅ **Automatique** : Indexe toutes les pages en une seule fois
- ✅ **Rapide** : 88 pages en ~1 minute (au lieu de plusieurs heures manuellement)
- ✅ **Officiel** : Utilise l'API officielle de Google
- ✅ **Fiable** : Moins d'erreurs que la méthode manuelle

---

## 📋 Prérequis

1. **Compte Google Cloud** (gratuit)
2. **Projet Google Cloud** créé
3. **API Indexing activée**
4. **Service Account créé**
5. **Clé JSON téléchargée**

---

## 🔧 Configuration Étape par Étape

### Étape 1 : Créer un Projet Google Cloud (5 min)

1. Allez sur : https://console.cloud.google.com/
2. Cliquez sur **"Sélectionner un projet"** → **"Nouveau projet"**
3. Nommez le projet : `rplb-electricite-indexing`
4. Cliquez sur **"Créer"**

### Étape 2 : Activer l'API Indexing (2 min)

1. Dans Google Cloud Console, allez dans **"APIs & Services"** → **"Library"**
2. Recherchez **"Indexing API"**
3. Cliquez sur **"Indexing API"**
4. Cliquez sur **"Enable"** (Activer)

### Étape 3 : Créer un Service Account (5 min)

1. Allez dans **"APIs & Services"** → **"Credentials"**
2. Cliquez sur **"Create Credentials"** → **"Service Account"**
3. Nommez-le : `indexing-service`
4. Cliquez sur **"Create and Continue"**
5. Rôle : **"Editor"** (ou "Indexing API User" si disponible)
6. Cliquez sur **"Done"**

### Étape 4 : Télécharger la Clé JSON (2 min)

1. Cliquez sur le Service Account créé
2. Allez dans l'onglet **"Keys"**
3. Cliquez sur **"Add Key"** → **"Create new key"**
4. Sélectionnez **"JSON"**
5. Cliquez sur **"Create"**
6. **SAUVEGARDEZ le fichier JSON** (vous ne pourrez plus le télécharger)

### Étape 5 : Ajouter le Service Account dans Google Search Console (3 min)

1. Ouvrez Google Search Console : https://search.google.com/search-console
2. Sélectionnez votre propriété (`https://www.rplb-electricite.fr`)
3. Allez dans **"Paramètres"** (Settings)
4. Cliquez sur **"Propriétaires et utilisateurs"** (Owners and users)
5. Cliquez sur **"Ajouter un utilisateur"** (Add user)
6. **Copiez l'email du Service Account** (dans le fichier JSON, c'est `client_email`)
   - Exemple : `indexing-service@rplb-electricite-indexing.iam.gserviceaccount.com`
7. Collez l'email et donnez le rôle **"Propriétaire"** (Owner)
8. Cliquez sur **"Ajouter"**

### Étape 6 : Installer les Dépendances (1 min)

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
npm install googleapis
```

### Étape 7 : Configurer le Fichier .env (2 min)

1. Placez le fichier JSON téléchargé dans le projet
   - Exemple : `google-service-account-key.json`
2. Ajoutez dans votre `.env` :
   ```
   GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account-key.json
   ```

### Étape 8 : Ajouter le Fichier JSON au .gitignore (1 min)

**IMPORTANT :** Ne commitez JAMAIS le fichier JSON dans Git !

```bash
echo "google-service-account-key.json" >> .gitignore
echo "*-service-account-key.json" >> .gitignore
```

---

## 🚀 Utilisation

### Lancer l'Indexation Automatique

```bash
node scripts/auto-index-google.js
```

Le script va :
1. Lire toutes les URLs du sitemap
2. Exclure les 5 pages déjà indexées
3. Demander l'indexation de chaque URL automatiquement
4. Afficher un résumé des résultats

**Temps estimé :** ~1-2 minutes pour 88 pages

---

## 📊 Résultats Attendus

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

## ⚠️ Limitations

1. **Limite Google** : 200 requêtes par 100 secondes
   - Le script respecte cette limite automatiquement (délai de 0.6s entre chaque requête)

2. **Quota quotidien** : ~200 URLs par jour
   - Si vous avez plus de 200 URLs, lancez le script sur plusieurs jours

3. **Première utilisation** : Peut prendre quelques minutes pour que Google valide le service account

---

## 🔍 Vérification

### Après l'Exécution

1. **Attendez 24-48h** pour que Google indexe les pages
2. **Vérifiez dans Google Search Console** :
   - Allez dans **"Couverture"** → **"Pages"**
   - Vérifiez le nombre de pages indexées
   - Devrait passer de 4-5 à 80-90 pages

### Si des Erreurs

**Erreur : "Permission denied"**
- Vérifiez que le Service Account est bien ajouté dans Google Search Console
- Vérifiez que le rôle est "Propriétaire" (Owner)

**Erreur : "API not enabled"**
- Vérifiez que l'API Indexing est bien activée dans Google Cloud Console

**Erreur : "Invalid credentials"**
- Vérifiez que le fichier JSON est au bon endroit
- Vérifiez le chemin dans `.env`

---

## 🎯 Alternative : Service Tiers (Plus Simple)

Si la configuration Google Cloud vous semble complexe, vous pouvez utiliser :

### 1. **IndexNow API** (Gratuit, mais moins efficace)
- Service simple pour notifier les moteurs de recherche
- Supporte Bing, Yandex, mais pas Google directement

### 2. **Services Payants**
- **Indexing API Services** : ~10-20€/mois
- Gèrent toute la configuration pour vous

---

## ✅ Checklist

- [ ] Projet Google Cloud créé
- [ ] API Indexing activée
- [ ] Service Account créé
- [ ] Clé JSON téléchargée
- [ ] Service Account ajouté dans Google Search Console
- [ ] Dépendances installées (`npm install googleapis`)
- [ ] Fichier JSON placé dans le projet
- [ ] `.env` configuré
- [ ] `.gitignore` mis à jour
- [ ] Script testé avec quelques URLs

---

## 🚀 Action Immédiate

1. **Suivez les étapes 1-8** ci-dessus (environ 20 minutes)
2. **Lancez le script** : `node scripts/auto-index-google.js`
3. **Attendez 24-48h** et vérifiez dans Google Search Console

**C'est beaucoup plus rapide que de le faire manuellement !** 🎉

---

## 📝 Notes

- Le script exclut automatiquement les 5 pages déjà indexées
- Vous pouvez modifier la liste des pages exclues dans le script
- Le script respecte automatiquement les limites de Google
- Les pages seront indexées progressivement (pas instantanément)

**Besoin d'aide ?** Consultez la documentation Google : https://developers.google.com/search/apis/indexing-api/v3/using-api


