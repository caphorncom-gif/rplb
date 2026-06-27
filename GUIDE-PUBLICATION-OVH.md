# 📤 Guide de Publication sur OVH via FileZilla

## ✅ ÉTAPE 1 : Build Réussi !

Le build a été créé avec succès ! Les fichiers de production se trouvent dans le dossier **`dist/`**.

## 📁 ÉTAPE 2 : Localiser les Fichiers à Uploader

Les fichiers à uploader sont dans :
```
rplb-electricite/dist/
```

Contenu du dossier `dist/` :
- `index.html` (fichier principal)
- `assets/` (dossier contenant les CSS et JS)

## 🔌 ÉTAPE 3 : Connexion FileZilla

1. **Ouvrez FileZilla**
2. **Dans la barre d'adresse en haut**, entrez :
   - **Hôte** : `ftp.` + votre nom de domaine (ex: `ftp.rplb-electricite.fr`)
   - **Nom d'utilisateur** : Votre identifiant FTP OVH
   - **Mot de passe** : Votre mot de passe FTP OVH
   - **Port** : `21` (par défaut)
3. **Cliquez sur "Connexion rapide"**

## 📂 ÉTAPE 4 : Naviguer vers le Dossier Web

Une fois connecté, naviguez vers le dossier web de votre hébergement :
- Généralement : `/www` ou `/www/` ou `/htdocs` ou `/public_html`
- **Vérifiez dans votre espace OVH** le chemin exact du dossier web

## 🗑️ ÉTAPE 5 : Vider le Dossier Web (Optionnel mais Recommandé)

1. **Sélectionnez tous les fichiers existants** dans le dossier web
2. **Supprimez-les** (ou faites une sauvegarde avant)
3. ⚠️ **Attention** : Ne supprimez PAS les fichiers `.htaccess` ou autres fichiers de configuration si vous en avez

## 📤 ÉTAPE 6 : Uploader les Fichiers

1. **Dans FileZilla, côté gauche** : Naviguez vers `rplb-electricite/dist/`
2. **Sélectionnez TOUS les fichiers** du dossier `dist/` :
   - `index.html`
   - Le dossier `assets/` (avec tout son contenu)
3. **Glissez-déposez** ou **Clic droit → Upload** vers le dossier web (côté droit)

## ⏱️ ÉTAPE 7 : Attendre la Fin de l'Upload

Attendez que tous les fichiers soient uploadés (barre de progression en bas de FileZilla).

## ✅ ÉTAPE 8 : Vérifier le Site

1. **Ouvrez votre navigateur**
2. **Allez sur** : `https://www.rplb-electricite.fr` (ou votre nom de domaine)
3. **Vérifiez que le site fonctionne**

## ⚙️ ÉTAPE 9 : Configuration .htaccess (Important pour React Router)

Pour que les routes React fonctionnent correctement, créez un fichier `.htaccess` dans le dossier web avec ce contenu :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Comment faire :**
1. Dans FileZilla, **côté droit** (serveur), **clic droit** dans le dossier web
2. **Créer un nouveau fichier** → Nommez-le `.htaccess`
3. **Collez le contenu ci-dessus**
4. **Sauvegardez**

## 🔧 ÉTAPE 10 : Variables d'Environnement

⚠️ **IMPORTANT** : Les variables d'environnement dans `.env` ne sont PAS incluses dans le build.

Pour que le site fonctionne en production, vous devez :
1. **Vérifier que Supabase est accessible** depuis le site (les URLs sont hardcodées)
2. **Si nécessaire**, modifiez les URLs Supabase directement dans le code source et rebuilder

## 📝 Checklist de Publication

- [ ] Build créé avec succès (`dist/` existe)
- [ ] Connexion FileZilla établie
- [ ] Dossier web localisé (`/www`, `/htdocs`, etc.)
- [ ] Anciens fichiers supprimés (sauf configuration)
- [ ] Fichiers `dist/` uploadés
- [ ] Fichier `.htaccess` créé et configuré
- [ ] Site accessible et fonctionnel
- [ ] Toutes les pages chargent correctement
- [ ] Supabase connecté (vérifier dans la console du navigateur)

## 🆘 Problèmes Courants

### Le site affiche une page blanche
- Vérifiez la console du navigateur (F12) pour les erreurs
- Vérifiez que tous les fichiers sont bien uploadés
- Vérifiez que `.htaccess` est présent

### Les routes ne fonctionnent pas (erreur 404)
- Vérifiez que `.htaccess` est bien créé avec le bon contenu
- Vérifiez que le module `mod_rewrite` est activé sur OVH

### Supabase ne fonctionne pas
- Vérifiez que les variables d'environnement sont correctes
- Vérifiez que l'URL Supabase est accessible
- Vérifiez les clés API dans Supabase

### Les images ne s'affichent pas
- Vérifiez que les URLs Supabase Storage sont correctes
- Vérifiez que le bucket est public

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. Les logs d'erreur dans la console du navigateur (F12)
2. Les logs serveur dans votre espace OVH
3. La configuration FileZilla et les permissions des fichiers

---

**Bon déploiement ! 🚀**

